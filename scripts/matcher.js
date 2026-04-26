// Smart command matcher for the Command Master mode.
// Tolerant of: flag-order, short/long synonyms (-d <-> --detach), -it == -i -t,
// extra whitespace, smart quotes, and equals-style flags (-p=80:80 vs -p 80:80).

(function () {
  'use strict';

  // Map of short <-> long flag synonyms used across Docker labs.
  const FLAG_SYNONYMS = [
    ['-d', '--detach'],
    ['-p', '--publish'],
    ['-e', '--env'],
    ['-v', '--volume'],
    ['-i', '--interactive'],
    ['-t', '--tty'],
    ['-f', '--file'],
    ['-n', '--name'],         // not really standard, but sometimes used
    ['--name', '--name'],
    ['-h', '--help'],
    ['-a', '--all'],
    ['-q', '--quiet']
  ];

  function normaliseFlag(tok) {
    for (const pair of FLAG_SYNONYMS) {
      if (tok === pair[0]) return pair[1];
      if (tok === pair[1]) return pair[1];
    }
    return tok;
  }

  // Replace fancy quotes / em-dashes etc. with plain ones, collapse whitespace.
  function normaliseString(s) {
    return s
      .replace(/[\u2018\u2019\u2032\u02BC]/g, "'")
      .replace(/[\u201C\u201D\u2033]/g, '"')
      .replace(/[\u2013\u2014]/g, '-')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Tokenize a shell-like command into argv tokens, respecting single/double quotes.
  function tokenize(s) {
    const out = [];
    let cur = '';
    let quote = null;
    for (let i = 0; i < s.length; i++) {
      const ch = s[i];
      if (quote) {
        if (ch === quote) { quote = null; }
        else { cur += ch; }
      } else if (ch === '"' || ch === "'") {
        quote = ch;
      } else if (/\s/.test(ch)) {
        if (cur) { out.push(cur); cur = ''; }
      } else {
        cur += ch;
      }
    }
    if (cur) out.push(cur);
    return out;
  }

  // Expand combined short flags like -it -> -i -t. Leave -p, -d alone.
  function expandShort(tok) {
    if (/^-[a-zA-Z]{2,}$/.test(tok) && !tok.startsWith('--')) {
      return tok.slice(1).split('').map(c => '-' + c);
    }
    return [tok];
  }

  // Convert -p=80:80 to ['-p','80:80']
  function splitEquals(tok) {
    const m = tok.match(/^(--?[a-zA-Z][\w-]*)=(.+)$/);
    if (m) return [m[1], m[2]];
    return [tok];
  }

  function preprocess(tokens) {
    let out = [];
    for (const t of tokens) {
      const split = splitEquals(t);
      for (const s of split) {
        const exp = expandShort(s);
        for (const e of exp) out.push(e);
      }
    }
    return out;
  }

  // Known command prefixes (longest-prefix wins).
  // We use these to extract the "command path" cleanly and treat the rest as positional/flags.
  const KNOWN_COMMANDS = [
    // docker management form
    'docker container run','docker container exec','docker container ls','docker container stop',
    'docker container rm','docker container start','docker container logs','docker container inspect',
    'docker container top','docker container stats',
    'docker image build','docker image pull','docker image ls','docker image inspect','docker image history','docker image run',
    'docker network create','docker network ls','docker network inspect','docker network connect',
    'docker network disconnect','docker network rm','docker network prune',
    'docker volume create','docker volume ls','docker volume inspect',
    // docker old/short form
    'docker version','docker info','docker commit',
    'docker pull','docker run','docker exec','docker logs','docker ps','docker rm','docker stop','docker start',
    'docker images','docker inspect','docker build',
    // compose
    'docker-compose up','docker-compose down','docker-compose build','docker-compose',
    'docker compose up','docker compose down','docker compose build','docker compose',
    // kubectl
    'kubectl run','kubectl get','kubectl describe','kubectl delete','kubectl create','kubectl apply',
    'kubectl replace','kubectl rollout','kubectl api-resources','kubectl explain','kubectl exec','kubectl logs',
    // apt
    'sudo apt-get update','sudo apt-get install','sudo apt-get upgrade','sudo apt-get remove','sudo apt-get purge',
    'sudo apt update','sudo apt install',
    'apt-get update','apt-get install','apt-get upgrade','apt-get remove','apt-get purge',
    'apt-cache search','apt update','apt install',
    // shell utils
    'mkdir','cd','ls','pwd','cp','mv','rm','rmdir','echo','cat','touch','chmod','chown','sudo','whoami','date','grep','ps','ping','exit'
  ].sort((a,b) => b.split(' ').length - a.split(' ').length); // longest first

  // Aliases: short form -> canonical management form (used to canonicalise the head for comparison)
  const HEAD_ALIASES = {
    'docker run':     'docker container run',
    'docker exec':    'docker container exec',
    'docker ps':      'docker container ls',
    'docker stop':    'docker container stop',
    'docker start':   'docker container start',
    'docker rm':      'docker container rm',
    'docker logs':    'docker container logs',
    'docker inspect': 'docker container inspect',
    'docker pull':    'docker image pull',
    'docker build':   'docker image build',
    'docker images':  'docker image ls',
    'docker compose up':    'docker-compose up',
    'docker compose down':  'docker-compose down',
    'docker compose build': 'docker-compose build',
    'docker compose':       'docker-compose'
  };

  // Always-boolean flags - never consume the next token as a value.
  const BOOLEAN_FLAGS = new Set([
    '-d','--detach','-i','--interactive','-t','--tty',
    '-a','--all','-q','--quiet','-h','--help','--rm','--build'
  ]);

  // Match longest known command prefix from token list. Returns {head, headLength}.
  function findHead(tokens) {
    for (const cmd of KNOWN_COMMANDS) {
      const parts = cmd.split(' ');
      if (parts.length > tokens.length) continue;
      let ok = true;
      for (let i = 0; i < parts.length; i++) if (tokens[i] !== parts[i]) { ok = false; break; }
      if (ok) return { head: cmd, headLength: parts.length };
    }
    // Fallback: take first non-flag token as head
    if (tokens.length && !tokens[0].startsWith('-')) return { head: tokens[0], headLength: 1 };
    return { head: '', headLength: 0 };
  }

  function canonicaliseHead(h) { return HEAD_ALIASES[h] || h; }

  // Build a normalised structure: { head, flags: { '--detach':[true], '--publish':['80:80'] }, positional: ['nginx'] }
  function parse(tokens) {
    tokens = preprocess(tokens);
    const { head, headLength } = findHead(tokens);
    let i = headLength;
    const flags = {};
    const positional = [];
    while (i < tokens.length) {
      const tok = tokens[i];
      if (tok.startsWith('-')) {
        const name = normaliseFlag(tok);
        if (BOOLEAN_FLAGS.has(name)) {
          flags[name] = flags[name] || [];
          flags[name].push(true);
          i += 1;
        } else {
          const next = tokens[i + 1];
          if (next !== undefined && !next.startsWith('-')) {
            flags[name] = flags[name] || [];
            flags[name].push(next);
            i += 2;
          } else {
            // flag with no obvious value (rare)
            flags[name] = flags[name] || [];
            flags[name].push(true);
            i += 1;
          }
        }
      } else {
        positional.push(tok);
        i += 1;
      }
    }
    return { head: canonicaliseHead(head), flags, positional };
  }

  // Heuristic: ensure flags use a normalised key & sorted values (so order doesn't matter).
  function flagsEqual(a, b) {
    const keysA = Object.keys(a).sort();
    const keysB = Object.keys(b).sort();
    if (keysA.length !== keysB.length) return false;
    for (const k of keysA) {
      if (!(k in b)) return false;
      const va = (a[k] || []).map(String).sort();
      const vb = (b[k] || []).map(String).sort();
      if (va.length !== vb.length) return false;
      for (let i = 0; i < va.length; i++) if (va[i] !== vb[i]) return false;
    }
    return true;
  }

  function arrayEqualUnordered(a, b) {
    if (a.length !== b.length) return false;
    const ax = a.slice().sort();
    const bx = b.slice().sort();
    for (let i = 0; i < ax.length; i++) if (ax[i] !== bx[i]) return false;
    return true;
  }

  // Public matcher.
  function matchCommand(userInput, expected) {
    if (!userInput) return false;
    const u = parse(tokenize(normaliseString(userInput)));
    const e = parse(tokenize(normaliseString(expected)));
    if (u.head !== e.head) return false;
    if (!flagsEqual(u.flags, e.flags)) return false;
    if (!arrayEqualUnordered(u.positional, e.positional)) return false;
    return true;
  }

  // Plain text matcher used for `fill` answers.
  function matchFill(userInput, accept) {
    if (!userInput) return false;
    if (!Array.isArray(accept)) accept = [accept];
    const u = normaliseString(userInput).toLowerCase();
    return accept.some(a => normaliseString(a).toLowerCase() === u);
  }

  window.Matcher = { matchCommand, matchFill, normaliseString, tokenize, parse };
})();
