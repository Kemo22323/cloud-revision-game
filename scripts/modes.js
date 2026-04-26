// Cloud Exam Quest - all gameplay modes.
// Modes: cram, quick, lab, command, review, exam, sheets, sheet (single-lab cheatsheet view)

(function () {
  'use strict';

  const Q = () => window.QUESTIONS;
  const labMeta = (id) => window.LABS.find(l => l.id === id);

  // Map section.id -> question.topic prefixes, per lab.
  // This lets Cram Mode pick questions that match each cheat-sheet section.
  const SECTION_TOPIC_MAP = {
    1: {
      'intro':       ['intro'],
      'models':      ['iaas', 'paas', 'saas', 'examples', 'responsibility', 'models'],
      'os-recap':    ['virt', 'os'],
      'physical-vm': ['vm-def', 'vm-vs-pm', 'host-guest'],
      'hypervisors': ['hypervisor', 'type1', 'type2', 'cloud-hyper', 'vm-drawback'],
      'vbox':        ['vbox', 'vdi', 'vhd', 'vmdk', 'vbox-disk', 'vm-files']
    },
    2: {
      'linux-intro':    ['cli', 'syntax', 'options', 'ls'],
      'basic-commands': ['echo','pwd','cd','ls','cat','create-file','touch','cp','mv','rm','mkdir','rmdir','grep','ps','ping','ls -l'],
      'perms':          ['perms','chmod','chmod-octal','chown','sudo','whoami'],
      'apt':            ['apt','handson']
    },
    3: {
      'shell':        ['shell','scripting','shells','bash','shebang'],
      'echo-comments':['echo','comments','date'],
      'vars':         ['vars','special','exit-status','arrays'],
      'ops':          ['arith-ops','arith-expand','cmd-sub','bc','pipes','rel-ops','string-ops','file-test','array-len'],
      'ctrl':         ['if','case','for','for-break','while','until'],
      'fn':           ['fn','fn-args','fn-local','handson1','handson2']
    },
    4: {
      'problem':       ['problem','vm-soln','runtime','containers','compare'],
      'what-docker':   ['docker','why','docker-def','pros','cons'],
      'engine':        ['engine','arch','arch-os'],
      'cli':           ['cli','version','info','mgmt'],
      'vm-vs-docker':  ['image','container','hub','image-vs-container']
    },
    5: {
      'run-flow':       ['run-flow','demo'],
      'lifecycle-cli':  ['pull','startstop','ls','ls-a','rm','inspect-stats','flag-d','port-format','run-detached','-it','env'],
      'shell-inside':   ['-it','exec','run-bash','env','naming'],
      'handson-multi':  ['handson','cleanup','logs'],
      'persistence':    ['mysql-md']
    },
    6: {
      'intro':  ['why-net','multi-net','best-practice','isolation'],
      'types':  ['bridge','host-net','none','types','custom'],
      'cli':    ['cli','demo'],
      'dns':    ['dns','demo'],
      'vols':   ['volumes','volumes-vs-bind','mount']
    },
    7: {
      'image':       ['image','methods','commit','workflow'],
      'dockerfile':  ['dockerfile','from','env','run','workdir','add-vs-copy','expose','cmd','entrypoint','cmd-vs-docker-run'],
      'layers':      ['layers','cache','build','history','inspect','image-ls','run','handson'],
      'compose':     ['why-compose','compose','compose-yml','cli','compose-ex1','compose-ex2','build','why']
    },
    8: {
      'intro':         ['intro','why','pod','node','cluster'],
      'master':        ['apiserver','etcd','controller-mgr','cloud-cm','scheduler','reconcile'],
      'node':          ['kubelet','kube-proxy','runtime'],
      'core':          ['core','selectors','minikube'],
      'cluster-setup': ['cluster-setup','kubectl','kubectl-cmd','shortnames','namespaced','rollout'],
      'workloads':     ['replicaset','deployment','strategy-recreate','strategy-rolling','strategy-shadow','strategy-canary','strategy-bg','strategy-ab','stateful-vs-stateless','daemonset','job','cronjob','handson'],
      'network':       ['net-rules','cni','service-types','svc-vs','ingress','ingress-ctrl','net-ip'],
      'storage':       ['volume','pv','access-modes','reclaim','pvc','storageclass'],
      'config-rbac':   ['configmap','secret','rbac-role','rbac-clusterrole','rbac-rb','rbac-crb','rbac-sa'],
      'deploy-flow':   ['deploy-flow','scheduler','pause','cni','pod-status']
    }
  };

  function questionsForSection(labId, sectionId) {
    const map = SECTION_TOPIC_MAP[labId] || {};
    const allowed = new Set(map[sectionId] || []);
    if (allowed.size === 0) return Q().filter(q => q.lab === labId);
    return Q().filter(q => q.lab === labId && q.topic && allowed.has(q.topic));
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Build session UI: page header, progress bar, question card, answer area.
  // session = { items: [...questions], i: index, correct, missed: [ids], onFinish() }
  function runSession(session, opts) {
    opts = opts || {};
    const total = session.items.length;
    if (session.i >= total) {
      // session done
      return finishSession(session, opts);
    }
    const q = session.items[session.i];
    const main = document.getElementById('app');
    main.innerHTML = '';
    const header = window.UI.pageHeader(opts.title || 'Quiz', opts.subtitle, {
      extra: opts.extraHeader || null
    });
    main.appendChild(header);

    const progressRow = window.UI.el('div', { class: 'mb-3' }, [
      window.UI.progressBar(session.i, total)
    ]);
    main.appendChild(progressRow);

    const card = window.UI.el('div', { class: 'card p-5 sm:p-6' });
    card.appendChild(window.UI.metaPills(q));
    card.appendChild(window.UI.stemBlock(q));

    main.appendChild(card);

    // Answer area
    const answerHost = window.UI.el('div', { class: 'mt-2' });
    main.appendChild(answerHost);

    const finalize = (ok) => {
      window.App.recordAnswer(q, ok);
      if (!ok) {
        if (!session.missed.includes(q.id)) session.missed.push(q.id);
      } else {
        session.correct++;
      }
      // Append explanation
      answerHost.appendChild(window.UI.explanationPanel(q, ok));
      const nextLabel = (session.i + 1 >= total) ? 'See results ⏎' : 'Next ⏎';
      const next = window.UI.nextButton(nextLabel, () => {
        session.i++;
        runSession(session, opts);
      });
      answerHost.appendChild(next);
      // Allow Enter / number keys (1-4) for fast pace
      window.App._setHotkeys({
        Enter: () => { session.i++; runSession(session, opts); }
      });
    };

    // Render based on type
    switch (q.type) {
      case 'mcq':
      case 'predict':
        answerHost.appendChild(window.UI.renderMCQ(q, (picked, wrap) => {
          const ok = picked.length === 1 && picked[0] === q.answer;
          window.UI.lockChoicesMCQ(wrap, q, picked);
          finalize(ok);
        }, false));
        // hot-keys 1-4 select option
        window.App._setHotkeys({
          '1': () => clickChoice(answerHost, 0),
          '2': () => clickChoice(answerHost, 1),
          '3': () => clickChoice(answerHost, 2),
          '4': () => clickChoice(answerHost, 3),
        });
        break;

      case 'multi': {
        answerHost.appendChild(window.UI.renderMCQ(q, (picked, wrap) => {
          const correct = (q.answers || []).slice().sort();
          const got = picked.slice().sort();
          const ok = correct.length === got.length && correct.every((v, i) => v === got[i]);
          window.UI.lockChoicesMCQ(wrap, q, picked);
          finalize(ok);
        }, true));
        break;
      }

      case 'truefalse':
        answerHost.appendChild(window.UI.renderTrueFalse(q, (val, wrap) => {
          const ok = val === q.bool;
          window.UI.lockTrueFalse(wrap, q, val);
          finalize(ok);
        }));
        window.App._setHotkeys({
          '1': () => clickChoice(answerHost, 0),
          '2': () => clickChoice(answerHost, 1),
          't': () => clickChoice(answerHost, 0),
          'f': () => clickChoice(answerHost, 1),
        });
        break;

      case 'fill':
        answerHost.appendChild(window.UI.renderTextInput(q, (val, wrap) => {
          const ok = window.Matcher.matchFill(val, q.accept || []);
          // Disable & show comparison
          [...wrap.querySelectorAll('input, button')].forEach(b => b.disabled = true);
          if (!ok && q.accept && q.accept.length) {
            answerHost.appendChild(window.UI.expectedBox(q.accept[0]));
          }
          finalize(ok);
        }, 'Type the answer (case-insensitive)…'));
        break;

      case 'command':
        answerHost.appendChild(window.UI.renderTextInput(q, (val, wrap) => {
          const ok = window.Matcher.matchCommand(val, q.cmd);
          [...wrap.querySelectorAll('input, button')].forEach(b => b.disabled = true);
          if (!ok && q.cmd) {
            answerHost.appendChild(window.UI.expectedBox(q.cmd));
          }
          finalize(ok);
        }, 'Type the docker / kubectl command…'));
        break;

      case 'match':
        answerHost.appendChild(window.UI.renderMatch(q, (perfect, mistakes) => {
          finalize(perfect);
        }));
        break;

      default:
        answerHost.appendChild(window.UI.el('div', { class: 'text-bad text-sm' }, 'Unsupported question type: ' + q.type));
        finalize(false);
    }
  }

  function clickChoice(host, idx) {
    const btns = host.querySelectorAll('button.choice');
    if (btns[idx] && !btns[idx].classList.contains('is-disabled')) btns[idx].click();
  }

  function finishSession(session, opts) {
    const total = session.items.length;
    const correct = session.correct;
    const wrong = session.missed.length;
    const acc = total ? Math.round((correct / total) * 100) : 0;
    window.App.bumpStreak(0); // reset streak indicator at session end (handled by recordAnswer too)

    const main = document.getElementById('app');
    main.innerHTML = '';
    main.appendChild(window.UI.pageHeader(opts.finishTitle || 'Session complete', null, {}));

    const grade = opts.grade ? opts.grade(correct, total) : null;

    const card = window.UI.el('div', { class: 'card p-6' }, [
      window.UI.el('div', { class: 'flex items-center justify-between flex-wrap gap-3' }, [
        window.UI.el('div', null, [
          window.UI.el('div', { class: 'text-4xl font-extrabold text-neon' }, acc + '%'),
          window.UI.el('div', { class: 'text-sm text-slate-400' }, correct + ' correct · ' + wrong + ' missed · ' + total + ' total')
        ]),
        grade ? window.UI.el('div', { class: 'text-right' }, [
          window.UI.el('div', { class: 'text-xs text-slate-400' }, 'Grade'),
          window.UI.el('div', { class: 'text-3xl font-bold text-gold' }, grade)
        ]) : null
      ]),
      window.UI.el('div', { class: 'mt-4' }, [window.UI.progressBar(correct, total)]),
      window.UI.el('div', { class: 'flex flex-wrap gap-2 mt-5' }, [
        opts.onContinue
          ? window.UI.el('button', { class: 'btn btn-primary', on: { click: opts.onContinue } }, opts.continueLabel || 'Continue ⏎')
          : window.UI.el('button', { class: 'btn btn-primary', on: { click: () => window.App.go('dashboard') } }, '🏠 Back to dashboard'),
        opts.onContinue
          ? window.UI.el('button', { class: 'btn btn-ghost', on: { click: () => window.App.go('dashboard') } }, '🏠 Dashboard')
          : null,
        wrong > 0 ? window.UI.el('button', { class: 'btn btn-ghost', on: { click: () => window.Modes.review(session.missed.slice()) } }, '🩹 Review missed (' + wrong + ')') : null,
        opts.replay ? window.UI.el('button', { class: 'btn btn-ghost', on: { click: opts.replay } }, '🔁 Replay') : null
      ])
    ]);
    main.appendChild(card);

    // Hot-keys: Enter goes to continue (if any) else home; R for review missed
    window.App._setHotkeys({
      Enter: () => { if (opts.onContinue) opts.onContinue(); else window.App.go('dashboard'); },
      r: () => { if (wrong > 0) window.Modes.review(session.missed.slice()); }
    });
  }

  // ---------- MODES ----------

  // ---- Cram Mode navigation helpers ----
  // Move to the next section. If we're already on the last section, surface the
  // "Lab complete!" interstitial instead of jumping straight into the next lab.
  function cramSkipSection(state) {
    const labs = window.LABS;
    const lab = labs[state.labIdx];
    if (!lab) return cramRun(state);
    const sheet = window.CHEATSHEETS[lab.id];
    const total = sheet ? sheet.sections.length : 0;
    if (state.sectionIdx + 1 >= total) {
      state.sectionIdx = total;
      state.phase = 'lab-complete';
    } else {
      state.sectionIdx++;
      state.phase = 'sheet';
    }
    cramRun(state);
  }
  // Advance from the lab-complete screen to the next lab's first section.
  function cramAdvanceLab(state) {
    state.labIdx++;
    state.sectionIdx = 0;
    state.phase = 'sheet';
    cramRun(state);
  }
  function cramPrevSection(state) {
    if (state.sectionIdx > 0) {
      state.sectionIdx--;
    } else if (state.labIdx > 0) {
      state.labIdx--;
      const prevLab = window.LABS[state.labIdx];
      const prevSheet = window.CHEATSHEETS[prevLab.id];
      state.sectionIdx = (prevSheet ? prevSheet.sections.length : 1) - 1;
    } else {
      window.UI.toast('Already at the first section', 'bad');
      return;
    }
    state.phase = 'sheet';
    cramRun(state);
  }
  function cramSkipLab(state) {
    state.labIdx++;
    state.sectionIdx = 0;
    state.phase = 'sheet';
    cramRun(state);
  }
  function cramJumpTo(state, labIdx, sectionIdx) {
    state.labIdx = labIdx;
    state.sectionIdx = sectionIdx;
    state.phase = 'sheet';
    cramRun(state);
  }

  // Toolbar with Prev / Skip-section / Skip-lab buttons + section <select>.
  // Used on both cheat-sheet and quiz views.
  function cramNavBar(state, lab, sections) {
    const isFirst = state.labIdx === 0 && state.sectionIdx === 0;
    const isLastLab = state.labIdx >= window.LABS.length - 1;
    const isLastSection = state.sectionIdx >= sections.length - 1;

    const prevBtn = window.UI.el('button', {
      class: 'btn btn-ghost' + (isFirst ? ' opacity-40 cursor-not-allowed' : ''),
      title: 'Previous section (B)',
      on: { click: () => { if (!isFirst) cramPrevSection(state); } }
    }, '◀ Prev');

    const skipSecBtn = window.UI.el('button', {
      class: 'btn btn-ghost',
      title: 'Skip this section (S)',
      on: { click: () => cramSkipSection(state) }
    }, isLastSection && isLastLab ? '⏭ Finish' : '⤼ Skip section');

    const skipLabBtn = window.UI.el('button', {
      class: 'btn btn-ghost' + (isLastLab ? ' opacity-40 cursor-not-allowed' : ''),
      title: 'Skip rest of this lab (L)',
      on: { click: () => { if (!isLastLab) cramSkipLab(state); } }
    }, '⏭ Skip lab');

    // Section dropdown for direct jump within current lab
    const select = window.UI.el('select', {
      class: 'cram-jump',
      title: 'Jump to section',
      on: { change: (e) => {
        const idx = parseInt(e.target.value, 10);
        if (!isNaN(idx)) cramJumpTo(state, state.labIdx, idx);
      } }
    });
    sections.forEach((s, i) => {
      const opt = window.UI.el('option', { value: String(i) }, (i + 1) + '. ' + s.title);
      if (i === state.sectionIdx) opt.selected = true;
      select.appendChild(opt);
    });

    return window.UI.el('div', { class: 'flex flex-wrap items-center gap-2 mb-3' }, [
      prevBtn, skipSecBtn, skipLabBtn,
      window.UI.el('span', { class: 'text-xs text-slate-500 ml-1 mr-1' }, 'Jump:'),
      select
    ]);
  }

  // ---- Cram Mode progress persistence ----
  // We save a stable resume point (cheat-sheet of the current section, or the
  // lab-complete interstitial) to localStorage so the user can pick up where
  // they left off instead of always restarting from Lab 1, Section 1.
  function saveCramProgress(state) {
    if (!state) return;
    if (state.labIdx >= window.LABS.length) { clearCramProgress(); return; }
    // Only persist stable navigation points; we never resume mid-quiz, so a
    // mid-quiz exit will resume from this section's cheat sheet next time.
    const stablePhase = state.phase === 'lab-complete' ? 'lab-complete' : 'sheet';
    window.App.setSetting('cramProgress', {
      labIdx: state.labIdx,
      sectionIdx: state.sectionIdx,
      phase: stablePhase,
      savedAt: Date.now()
    });
  }
  function clearCramProgress() { window.App.setSetting('cramProgress', null); }
  function loadCramProgress() {
    const p = window.App.getSetting && window.App.getSetting('cramProgress');
    if (!p || typeof p.labIdx !== 'number' || typeof p.sectionIdx !== 'number') return null;
    if (p.labIdx === 0 && p.sectionIdx === 0 && (p.phase === 'sheet' || !p.phase)) return null;
    if (p.labIdx >= window.LABS.length) return null;
    const lab = window.LABS[p.labIdx];
    if (!lab) return null;
    const sheet = window.CHEATSHEETS[lab.id];
    const sections = sheet ? sheet.sections : [];
    if (p.phase !== 'lab-complete' && (p.sectionIdx < 0 || p.sectionIdx >= sections.length)) return null;
    return p;
  }

  // Total number of cheat-sheet sections across all labs (for the progress meter).
  function totalCramSections() {
    let n = 0;
    for (const lab of window.LABS) {
      const cs = window.CHEATSHEETS[lab.id];
      if (cs && cs.sections) n += cs.sections.length;
    }
    return n;
  }
  function sectionsCompletedBefore(labIdx, sectionIdx) {
    let n = 0;
    for (let i = 0; i < labIdx && i < window.LABS.length; i++) {
      const cs = window.CHEATSHEETS[window.LABS[i].id];
      if (cs && cs.sections) n += cs.sections.length;
    }
    return n + Math.max(0, sectionIdx);
  }

  // Resume prompt shown when the user re-enters Cram Mode and has a saved spot.
  function showCramResumePrompt(saved) {
    const main = document.getElementById('app');
    main.innerHTML = '';
    const lab = window.LABS[saved.labIdx];
    const sheet = window.CHEATSHEETS[lab.id];
    const sections = sheet ? sheet.sections : [];
    const section = sections[saved.sectionIdx];
    const total = totalCramSections();
    const done = sectionsCompletedBefore(saved.labIdx, saved.sectionIdx);
    const pct = total ? Math.round((done / total) * 100) : 0;
    const where = saved.phase === 'lab-complete'
      ? 'Lab complete · ' + lab.icon + ' Lab ' + lab.id + ' · ' + lab.title
      : (lab.icon + ' Lab ' + lab.id + ' · ' + lab.title +
         (section ? ' · section ' + (saved.sectionIdx + 1) + ' / ' + sections.length + ' (' + section.title + ')' : ''));
    const when = saved.savedAt ? new Date(saved.savedAt).toLocaleString() : null;

    main.appendChild(window.UI.pageHeader('Cram Mode', 'Pick up where you left off', {}));

    const continueFn = () => {
      cramRun({ labIdx: saved.labIdx, sectionIdx: saved.sectionIdx, phase: saved.phase || 'sheet' });
    };
    const startOverFn = () => {
      clearCramProgress();
      cramRun({ labIdx: 0, sectionIdx: 0, phase: 'sheet' });
    };

    main.appendChild(window.UI.el('div', { class: 'card p-6' }, [
      window.UI.el('div', { class: 'flex flex-wrap items-center gap-4 mb-3' }, [
        window.UI.el('div', { class: 'text-3xl' }, lab.icon),
        window.UI.el('div', null, [
          window.UI.el('div', { class: 'text-xs text-slate-400 uppercase tracking-wide' }, 'You left off at'),
          window.UI.el('div', { class: 'text-base font-semibold text-slate-100 mt-0.5' }, where),
          when ? window.UI.el('div', { class: 'text-xs text-slate-500 mt-0.5' }, 'Saved ' + when) : null
        ])
      ]),
      window.UI.el('div', { class: 'mt-2' }, [window.UI.progressBar(done, total)]),
      window.UI.el('div', { class: 'text-xs text-slate-400 mt-2' }, done + ' of ' + total + ' sections done · ' + pct + '%'),
      window.UI.el('div', { class: 'flex flex-wrap gap-2 mt-5' }, [
        window.UI.el('button', { class: 'btn btn-primary', on: { click: continueFn } }, '🚀 Continue from here ⏎'),
        window.UI.el('button', { class: 'btn btn-ghost', on: { click: startOverFn } }, '🔄 Start over'),
        window.UI.el('button', { class: 'btn btn-ghost', on: { click: () => window.App.go('dashboard') } }, '🏠 Dashboard')
      ])
    ]));

    window.App._setHotkeys({ Enter: continueFn });
  }

  // Public Cram entry point - shows resume prompt if applicable, else starts fresh.
  function cramEntry() {
    const saved = loadCramProgress();
    if (saved) return showCramResumePrompt(saved);
    cramRun({ labIdx: 0, sectionIdx: 0, phase: 'sheet' });
  }

  // Wire up the cram navigation hotkeys (merge with whatever hot-keys the page sets).
  function cramHotkeys(state, extras) {
    const keys = Object.assign({
      s: () => cramSkipSection(state),
      S: () => cramSkipSection(state),
      l: () => { if (state.labIdx < window.LABS.length - 1) cramSkipLab(state); },
      L: () => { if (state.labIdx < window.LABS.length - 1) cramSkipLab(state); },
      b: () => cramPrevSection(state),
      B: () => cramPrevSection(state)
    }, extras || {});
    window.App._setHotkeys(keys);
  }

  // Cram Mode (FLAGSHIP) - linear walkthrough by lab and section.
  // For each lab section: show cheat sheet card, then a small batch of related questions (4-6).
  function cramRun(state) {
    saveCramProgress(state);
    const labs = window.LABS;
    if (state.labIdx >= labs.length) {
      clearCramProgress();
      const main = document.getElementById('app');
      main.innerHTML = '';
      main.appendChild(window.UI.pageHeader('Cram Mode complete!', 'You scrolled through every lab.', {}));
      main.appendChild(window.UI.el('div', { class: 'card p-6' }, [
        window.UI.el('p', { class: 'text-slate-300' }, 'Now run the Smart Review on missed questions, then take the Exam Simulator for a timed dry-run.'),
        window.UI.el('div', { class: 'flex flex-wrap gap-2 mt-4' }, [
          window.UI.el('button', { class: 'btn btn-primary', on: { click: () => window.App.go('dashboard') } }, '🏠 Dashboard'),
          window.UI.el('button', { class: 'btn btn-ghost', on: { click: () => window.Modes.review() } }, '🩹 Review missed'),
          window.UI.el('button', { class: 'btn btn-ghost', on: { click: () => window.Modes.exam() } }, '⏱ Exam Simulator')
        ])
      ]));
      return;
    }
    const lab = labs[state.labIdx];
    const sheet = window.CHEATSHEETS[lab.id];
    const sections = sheet ? sheet.sections : [];
    // Lab-complete interstitial: the user just finished the last section.
    if (state.phase === 'lab-complete' || state.sectionIdx >= sections.length) {
      return renderLabComplete(state, lab, sections);
    }
    const section = sections[state.sectionIdx];

    if (state.phase === 'sheet') {
      const main = document.getElementById('app');
      main.innerHTML = '';
      const subtitle = lab.icon + ' ' + lab.title + ' · section ' + (state.sectionIdx + 1) + ' / ' + sections.length;
      main.appendChild(window.UI.pageHeader('Cram Mode', subtitle, {}));
      main.appendChild(cramNavBar(state, lab, sections));
      main.appendChild(window.UI.el('div', { class: 'mb-3' }, [window.UI.progressBar(state.sectionIdx, sections.length)]));
      main.appendChild(window.UI.renderCheatSheetSection(lab.id, section));
      const goBtn = window.UI.nextButton('Got it - quiz me ⏎', () => { state.phase = 'quiz'; cramRun(state); });
      main.appendChild(goBtn);
      cramHotkeys(state, { Enter: () => { state.phase = 'quiz'; cramRun(state); } });
      return;
    }

    // Build batch of 4-6 questions for this section
    const pool = questionsForSection(lab.id, section.id);
    let items = pool.length >= 3 ? pool : Q().filter(q => q.lab === lab.id);
    items = shuffle(items).slice(0, Math.min(6, Math.max(4, items.length)));

    runCramBatch(items, state, lab, section);
  }

  function runCramBatch(items, state, lab, section) {
    const session = { items, i: 0, correct: 0, missed: [] };
    runCramSessionStep(session, state, lab, section);
  }

  // "Lab complete!" interstitial - shown after the last section of a lab.
  function renderLabComplete(state, lab, sections) {
    const main = document.getElementById('app');
    main.innerHTML = '';
    const isLastLab = state.labIdx >= window.LABS.length - 1;
    const acc = window.App.labAccuracy(lab.id);
    const labTotal = Q().filter(q => q.lab === lab.id).length;
    const seenInLab = Q().filter(q => q.lab === lab.id && window.App.getState().seen[q.id]).length;
    const seenPct = labTotal ? Math.round((seenInLab / labTotal) * 100) : 0;
    const allMissed = window.App.getMissedIds().filter(id => {
      const q = Q().find(qq => qq.id === id);
      return q && q.lab === lab.id;
    });

    main.appendChild(window.UI.pageHeader('Lab complete!', lab.icon + ' Lab ' + lab.id + ' · ' + lab.title, {}));

    const card = window.UI.el('div', { class: 'card p-6' }, [
      window.UI.el('div', { class: 'flex flex-wrap items-center gap-6 mb-4' }, [
        window.UI.el('div', null, [
          window.UI.el('div', { class: 'text-4xl font-extrabold text-neon' }, (acc != null ? acc : '—') + (acc != null ? '%' : '')),
          window.UI.el('div', { class: 'text-xs text-slate-400' }, 'Lab accuracy')
        ]),
        window.UI.el('div', null, [
          window.UI.el('div', { class: 'text-4xl font-extrabold text-slate-100' }, sections.length.toString()),
          window.UI.el('div', { class: 'text-xs text-slate-400' }, 'Sections cleared')
        ]),
        window.UI.el('div', null, [
          window.UI.el('div', { class: 'text-4xl font-extrabold text-gold' }, seenPct + '%'),
          window.UI.el('div', { class: 'text-xs text-slate-400' }, 'Lab coverage (' + seenInLab + '/' + labTotal + ')')
        ]),
        allMissed.length ? window.UI.el('div', null, [
          window.UI.el('div', { class: 'text-4xl font-extrabold text-bad' }, String(allMissed.length)),
          window.UI.el('div', { class: 'text-xs text-slate-400' }, 'Still missed')
        ]) : null
      ]),
      window.UI.el('p', { class: 'text-sm text-slate-300' }, isLastLab
        ? 'That was the last lab! Run Smart Review to clean up missed questions, then take the Exam Simulator.'
        : 'Great work. Ready to keep going?'),
      window.UI.el('div', { class: 'flex flex-wrap gap-2 mt-5' }, (function () {
        const continueFn = isLastLab
          ? () => { state.labIdx++; cramRun(state); }
          : () => cramAdvanceLab(state);
        const continueLabel = isLastLab ? '🏁 Finish Cram ⏎' : '🚀 Continue Cram - next lab → ⏎';
        return [
          isLastLab
            ? window.UI.el('button', { class: 'btn btn-primary', on: { click: continueFn } }, '🏁 Finish Cram ⏎')
            : window.UI.el('button', { class: 'btn btn-primary', on: { click: continueFn } }, 'Next lab → ⏎'),
          window.UI.el('button', { class: 'btn btn-ghost', on: { click: () => { state.sectionIdx = 0; state.phase = 'sheet'; cramRun(state); } } }, '🔁 Replay this lab'),
          allMissed.length ? window.UI.el('button', { class: 'btn btn-ghost', on: { click: () => window.Modes.review(allMissed, { onContinue: continueFn, continueLabel }) } }, '🩹 Review missed (' + allMissed.length + ')') : null,
          window.UI.el('button', { class: 'btn btn-ghost', on: { click: () => window.App.go('dashboard') } }, '🏠 Dashboard')
        ];
      })())
    ]);
    main.appendChild(card);

    // Optional: list of remaining labs for context
    if (!isLastLab) {
      const rest = window.LABS.slice(state.labIdx + 1);
      const upNext = window.UI.el('div', { class: 'mt-4 text-xs text-slate-500' }, [
        'Up next: ',
        ...rest.map((l, i) => window.UI.el('span', { class: i === 0 ? 'text-neon font-semibold' : '' }, (i ? ' · ' : '') + l.icon + ' Lab ' + l.id + ' · ' + l.short))
      ]);
      main.appendChild(upNext);
    }

    const continueFn = isLastLab
      ? () => { state.labIdx++; cramRun(state); }
      : () => cramAdvanceLab(state);
    const continueLabel = isLastLab ? '🏁 Finish Cram ⏎' : '🚀 Continue Cram - next lab → ⏎';
    window.App._setHotkeys({
      Enter: continueFn,
      r: () => { if (allMissed.length) window.Modes.review(allMissed, { onContinue: continueFn, continueLabel }); },
      R: () => { if (allMissed.length) window.Modes.review(allMissed, { onContinue: continueFn, continueLabel }); }
    });
  }

  // Last-lab marker for nicer end-of-cram UX (currently inline)
  function runCramSessionStep(session, state, lab, section) {
    const sheet = window.CHEATSHEETS[lab.id];
    const sections = sheet ? sheet.sections : [];
    const total = session.items.length;
    if (session.i >= total) {
      // batch finished → small recap card with "next section" button
      const acc = total ? Math.round((session.correct / total) * 100) : 0;
      const isLastSection = state.sectionIdx >= sections.length - 1;
      const isLastLab = state.labIdx >= window.LABS.length - 1;
      const primaryLabel = isLastSection
        ? (isLastLab ? '🏁 Finish Cram ⏎' : '🎉 Finish lab ⏎')
        : 'Next section ⏎';
      const main = document.getElementById('app');
      main.innerHTML = '';
      main.appendChild(window.UI.pageHeader('Section recap', lab.icon + ' ' + lab.title + ' · ' + section.title, {}));
      main.appendChild(cramNavBar(state, lab, sections));
      const continueLabel = isLastSection
        ? (isLastLab ? '🏁 Continue Cram - finish ⏎' : '🎉 Continue Cram - finish lab ⏎')
        : '🚀 Continue Cram - next section ⏎';
      const continueFn = () => cramSkipSection(state);
      main.appendChild(window.UI.el('div', { class: 'card p-6' }, [
        window.UI.el('div', { class: 'text-3xl font-extrabold text-neon' }, acc + '%'),
        window.UI.el('div', { class: 'text-sm text-slate-400' }, session.correct + ' correct · ' + session.missed.length + ' missed · ' + total + ' total'),
        window.UI.el('div', { class: 'flex flex-wrap gap-2 mt-4' }, [
          window.UI.el('button', { class: 'btn btn-primary', on: { click: continueFn } }, primaryLabel),
          session.missed.length ? window.UI.el('button', { class: 'btn btn-ghost', on: { click: () => window.Modes.review(session.missed.slice(), { onContinue: continueFn, continueLabel }) } }, '🩹 Review missed') : null
        ])
      ]));
      cramHotkeys(state, { Enter: () => cramSkipSection(state) });
      return;
    }
    const q = session.items[session.i];
    const main = document.getElementById('app');
    main.innerHTML = '';
    main.appendChild(window.UI.pageHeader('Cram Mode', lab.icon + ' ' + lab.title + ' · ' + section.title, {}));
    main.appendChild(cramNavBar(state, lab, sections));
    main.appendChild(window.UI.el('div', { class: 'mb-3' }, [window.UI.progressBar(session.i, total)]));

    const card = window.UI.el('div', { class: 'card p-5 sm:p-6' });
    card.appendChild(window.UI.metaPills(q));
    card.appendChild(window.UI.stemBlock(q));
    main.appendChild(card);

    const answerHost = window.UI.el('div', { class: 'mt-2' });
    main.appendChild(answerHost);

    const finalize = (ok) => {
      window.App.recordAnswer(q, ok);
      if (!ok) { if (!session.missed.includes(q.id)) session.missed.push(q.id); }
      else session.correct++;
      answerHost.appendChild(window.UI.explanationPanel(q, ok));
      const next = window.UI.nextButton(session.i + 1 >= total ? 'See section recap ⏎' : 'Next ⏎', () => {
        session.i++;
        runCramSessionStep(session, state, lab, section);
      });
      answerHost.appendChild(next);
      cramHotkeys(state, { Enter: () => { session.i++; runCramSessionStep(session, state, lab, section); } });
    };

    renderQuestionAnswers(q, answerHost, finalize);
    // renderQuestionAnswers may have set 1-4 / t-f hotkeys; preserve those AND ensure s/l/b still work.
    window.App._extendHotkeys({
      s: () => cramSkipSection(state),
      S: () => cramSkipSection(state),
      l: () => { if (state.labIdx < window.LABS.length - 1) cramSkipLab(state); },
      L: () => { if (state.labIdx < window.LABS.length - 1) cramSkipLab(state); },
      b: () => cramPrevSection(state),
      B: () => cramPrevSection(state)
    });
  }

  // Helper that renders the answer area for any question type.
  function renderQuestionAnswers(q, answerHost, finalize) {
    switch (q.type) {
      case 'mcq':
      case 'predict':
        answerHost.appendChild(window.UI.renderMCQ(q, (picked, wrap) => {
          const ok = picked.length === 1 && picked[0] === q.answer;
          window.UI.lockChoicesMCQ(wrap, q, picked);
          finalize(ok);
        }, false));
        window.App._setHotkeys({
          '1': () => clickChoice(answerHost, 0),
          '2': () => clickChoice(answerHost, 1),
          '3': () => clickChoice(answerHost, 2),
          '4': () => clickChoice(answerHost, 3),
        });
        break;
      case 'multi':
        answerHost.appendChild(window.UI.renderMCQ(q, (picked, wrap) => {
          const correct = (q.answers || []).slice().sort();
          const got = picked.slice().sort();
          const ok = correct.length === got.length && correct.every((v, i) => v === got[i]);
          window.UI.lockChoicesMCQ(wrap, q, picked);
          finalize(ok);
        }, true));
        break;
      case 'truefalse':
        answerHost.appendChild(window.UI.renderTrueFalse(q, (val, wrap) => {
          const ok = val === q.bool;
          window.UI.lockTrueFalse(wrap, q, val);
          finalize(ok);
        }));
        window.App._setHotkeys({
          '1': () => clickChoice(answerHost, 0),
          '2': () => clickChoice(answerHost, 1),
          't': () => clickChoice(answerHost, 0),
          'f': () => clickChoice(answerHost, 1),
        });
        break;
      case 'fill':
        answerHost.appendChild(window.UI.renderTextInput(q, (val, wrap) => {
          const ok = window.Matcher.matchFill(val, q.accept || []);
          [...wrap.querySelectorAll('input, button')].forEach(b => b.disabled = true);
          if (!ok && q.accept && q.accept.length) answerHost.appendChild(window.UI.expectedBox(q.accept[0]));
          finalize(ok);
        }, 'Type the answer (case-insensitive)…'));
        break;
      case 'command':
        answerHost.appendChild(window.UI.renderTextInput(q, (val, wrap) => {
          const ok = window.Matcher.matchCommand(val, q.cmd);
          [...wrap.querySelectorAll('input, button')].forEach(b => b.disabled = true);
          if (!ok && q.cmd) answerHost.appendChild(window.UI.expectedBox(q.cmd));
          finalize(ok);
        }, 'Type the docker / kubectl command…'));
        break;
      case 'match':
        answerHost.appendChild(window.UI.renderMatch(q, (perfect, mistakes) => finalize(perfect)));
        break;
      default:
        answerHost.appendChild(window.UI.el('div', { class: 'text-bad text-sm' }, 'Unsupported question type: ' + q.type));
        finalize(false);
    }
  }

  // Quick Quiz - 10 random MCQs across all labs (only types supported on hot-keys: mcq/truefalse/multi/predict/fill)
  function quick() {
    const items = shuffle(Q()).filter(q => q.type !== 'match').slice(0, 10);
    runSession({ items, i: 0, correct: 0, missed: [] }, {
      title: 'Quick Quiz', subtitle: '10 random questions across all labs',
      finishTitle: 'Quick Quiz complete',
      replay: () => quick()
    });
  }

  // Lab Quest - pick a lab, play through all of its questions
  function labPick() {
    const main = document.getElementById('app');
    main.innerHTML = '';
    main.appendChild(window.UI.pageHeader('Lab Quest', 'Pick a lab to play through every question', {}));
    const grid = window.UI.el('div', { class: 'grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2' });
    window.LABS.forEach(lab => {
      const count = Q().filter(q => q.lab === lab.id).length;
      const acc = window.App.labAccuracy(lab.id);
      const tile = window.UI.el('button', { class: 'lab-tile text-left', on: { click: () => labRun(lab.id) } }, [
        window.UI.el('div', { class: 'flex items-center gap-3' }, [
          window.UI.el('div', { class: 'text-2xl' }, lab.icon),
          window.UI.el('div', null, [
            window.UI.el('div', { class: 'font-bold text-slate-100' }, 'Lab ' + lab.id + ' · ' + lab.title),
            window.UI.el('div', { class: 'text-xs text-slate-400 mt-0.5' }, lab.summary)
          ])
        ]),
        window.UI.el('div', { class: 'flex flex-wrap gap-1.5 mt-3 text-xs' }, [
          window.UI.pill(count + ' questions', 'pill-neon'),
          acc != null ? window.UI.pill('Last accuracy: ' + acc + '%', acc >= 80 ? 'pill-good' : (acc < 50 ? 'pill-bad' : '')) : null
        ])
      ]);
      grid.appendChild(tile);
    });
    main.appendChild(grid);
  }

  function labRun(labId) {
    const items = Q().filter(q => q.lab === labId);
    const lab = labMeta(labId);
    runSession({ items: shuffle(items), i: 0, correct: 0, missed: [] }, {
      title: 'Lab Quest · ' + lab.icon + ' Lab ' + labId,
      subtitle: lab.title + ' · ' + items.length + ' questions',
      finishTitle: 'Lab Quest complete',
      replay: () => labRun(labId)
    });
  }

  // Command Master - only command-type questions (drawn from labs 5/6/7/8)
  function command() {
    const items = Q().filter(q => q.type === 'command' || q.type === 'fill');
    if (items.length === 0) {
      const main = document.getElementById('app');
      main.innerHTML = '';
      main.appendChild(window.UI.pageHeader('Command Master', 'No command questions found', {}));
      return;
    }
    const session = shuffle(items).slice(0, Math.min(20, items.length));
    runSession({ items: session, i: 0, correct: 0, missed: [] }, {
      title: 'Command Master',
      subtitle: 'Type real commands · smart matcher accepts flag synonyms and reorders',
      finishTitle: 'Command Master complete',
      replay: () => command()
    });
  }

  // Smart Review - replay only missed questions.
  // contOpts (optional): { onContinue: fn, continueLabel: 'string' } so callers
  // (e.g. Cram Mode section/lab recap) can route the user back to where they were.
  function review(forcedIds, contOpts) {
    contOpts = contOpts || {};
    const ids = forcedIds || window.App.getMissedIds();
    if (!ids.length) {
      const main = document.getElementById('app');
      main.innerHTML = '';
      main.appendChild(window.UI.pageHeader('Smart Review', 'No missed questions yet - play a round first!', {}));
      main.appendChild(window.UI.el('div', { class: 'card p-6' }, [
        window.UI.el('p', { class: 'text-slate-300' }, 'Once you miss a question in any mode, it lands here. Get it right twice in a row to clear it.'),
        window.UI.el('div', { class: 'flex flex-wrap gap-2 mt-4' }, [
          contOpts.onContinue ? window.UI.el('button', { class: 'btn btn-primary', on: { click: contOpts.onContinue } }, contOpts.continueLabel || 'Continue ⏎') : null,
          window.UI.el('button', { class: 'btn ' + (contOpts.onContinue ? 'btn-ghost' : 'btn-primary'), on: { click: () => window.App.go('dashboard') } }, '🏠 Dashboard')
        ])
      ]));
      if (contOpts.onContinue) window.App._setHotkeys({ Enter: () => contOpts.onContinue() });
      return;
    }
    const items = ids.map(id => Q().find(q => q.id === id)).filter(Boolean);
    runSession({ items: shuffle(items), i: 0, correct: 0, missed: [] }, {
      title: 'Smart Review',
      subtitle: items.length + ' missed question' + (items.length === 1 ? '' : 's'),
      finishTitle: 'Smart Review complete',
      replay: () => review(forcedIds, contOpts),
      onContinue: contOpts.onContinue,
      continueLabel: contOpts.continueLabel
    });
  }

  // Exam Simulator - 30 random Qs in 30 minutes, A+ to F
  function exam() {
    const items = shuffle(Q().filter(q => q.type !== 'match')).slice(0, 30);
    const startedAt = Date.now();
    const limitMs = 30 * 60 * 1000;

    // Build a custom finishing routine that grades.
    const session = { items, i: 0, correct: 0, missed: [] };
    const grade = (correct, total) => {
      const p = correct / total * 100;
      if (p >= 95) return 'A+';
      if (p >= 90) return 'A';
      if (p >= 80) return 'B';
      if (p >= 70) return 'C';
      if (p >= 60) return 'D';
      return 'F';
    };
    const timerEl = window.UI.el('span', { class: 'pill pill-gold font-mono', id: 'exam-timer' }, '30:00');
    let interval = setInterval(() => {
      const left = Math.max(0, limitMs - (Date.now() - startedAt));
      const m = Math.floor(left / 60000);
      const s = Math.floor((left % 60000) / 1000);
      timerEl.textContent = String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
      if (left <= 0) {
        clearInterval(interval);
        // jump to finish
        session.i = session.items.length;
        finishExam();
      }
    }, 250);

    function finishExam() {
      clearInterval(interval);
      const acc = items.length ? Math.round((session.correct / items.length) * 100) : 0;
      const g = grade(session.correct, items.length);
      window.App.recordExam(g, acc);
      runSessionFinishExam(session, g, acc);
    }

    // Wrap runSession to inject timer + custom finish
    function step() {
      if (session.i >= items.length) return finishExam();
      const q = items[session.i];
      const main = document.getElementById('app');
      main.innerHTML = '';
      main.appendChild(window.UI.pageHeader('Exam Simulator', '30 questions · 30 minutes · no hints', { extra: timerEl }));
      main.appendChild(window.UI.el('div', { class: 'mb-3' }, [window.UI.progressBar(session.i, items.length)]));
      const card = window.UI.el('div', { class: 'card p-5 sm:p-6' });
      card.appendChild(window.UI.metaPills(q, { noHint: true }));
      card.appendChild(window.UI.stemBlock(q));
      main.appendChild(card);
      const answerHost = window.UI.el('div', { class: 'mt-2' });
      main.appendChild(answerHost);

      const finalize = (ok) => {
        window.App.recordAnswer(q, ok);
        if (!ok) { if (!session.missed.includes(q.id)) session.missed.push(q.id); }
        else session.correct++;
        // No explanations in exam (mimic real exam pressure)
        session.i++;
        step();
      };
      renderQuestionAnswers(q, answerHost, finalize);
    }
    step();
  }

  function runSessionFinishExam(session, g, acc) {
    const main = document.getElementById('app');
    main.innerHTML = '';
    main.appendChild(window.UI.pageHeader('Exam Simulator - results', null, {}));
    main.appendChild(window.UI.el('div', { class: 'card p-6' }, [
      window.UI.el('div', { class: 'flex items-center justify-between flex-wrap gap-3' }, [
        window.UI.el('div', null, [
          window.UI.el('div', { class: 'text-4xl font-extrabold text-neon' }, acc + '%'),
          window.UI.el('div', { class: 'text-sm text-slate-400' }, session.correct + ' / ' + session.items.length + ' correct'),
          window.UI.el('div', { class: 'text-xs text-slate-500 mt-1' }, session.missed.length + ' missed')
        ]),
        window.UI.el('div', { class: 'text-right' }, [
          window.UI.el('div', { class: 'text-xs text-slate-400' }, 'Grade'),
          window.UI.el('div', { class: 'text-5xl font-extrabold text-gold' }, g)
        ])
      ]),
      window.UI.el('div', { class: 'mt-4' }, [window.UI.progressBar(session.correct, session.items.length)]),
      window.UI.el('div', { class: 'flex flex-wrap gap-2 mt-5' }, [
        window.UI.el('button', { class: 'btn btn-primary', on: { click: () => window.App.go('dashboard') } }, '🏠 Dashboard'),
        session.missed.length ? window.UI.el('button', { class: 'btn btn-ghost', on: { click: () => review(session.missed.slice()) } }, '🩹 Review missed') : null,
        window.UI.el('button', { class: 'btn btn-ghost', on: { click: () => exam() } }, '🔁 Run again')
      ])
    ]));
  }

  // Cheat sheets index
  function sheets() {
    const main = document.getElementById('app');
    main.innerHTML = '';
    main.appendChild(window.UI.pageHeader('Cheat Sheets', 'One concise sheet per lab · perfect for the last 30 minutes', {}));
    const grid = window.UI.el('div', { class: 'grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2' });
    window.LABS.forEach(lab => {
      const sections = (window.CHEATSHEETS[lab.id] && window.CHEATSHEETS[lab.id].sections) || [];
      const tile = window.UI.el('button', { class: 'lab-tile text-left', on: { click: () => sheet(lab.id) } }, [
        window.UI.el('div', { class: 'flex items-center gap-3' }, [
          window.UI.el('div', { class: 'text-2xl' }, lab.icon),
          window.UI.el('div', null, [
            window.UI.el('div', { class: 'font-bold text-slate-100' }, 'Lab ' + lab.id + ' · ' + lab.title),
            window.UI.el('div', { class: 'text-xs text-slate-400 mt-0.5' }, lab.summary),
          ])
        ]),
        window.UI.el('div', { class: 'mt-3 flex gap-1.5 text-xs' }, [
          window.UI.pill(sections.length + ' sections', 'pill-neon')
        ])
      ]);
      grid.appendChild(tile);
    });
    main.appendChild(grid);
  }

  function sheet(labId) {
    const lab = labMeta(labId);
    const main = document.getElementById('app');
    main.innerHTML = '';
    main.appendChild(window.UI.pageHeader('Cheat Sheet · ' + lab.icon + ' Lab ' + labId, lab.title, {
      extra: window.UI.el('button', { class: 'btn btn-ghost', on: { click: () => window.Modes.sheets() } }, '◀ All sheets')
    }));
    main.appendChild(window.UI.renderCheatSheet(labId));
  }

  // Public exports
  window.Modes = {
    cram: cramEntry,
    cramFresh: () => { clearCramProgress(); cramRun({ labIdx: 0, sectionIdx: 0, phase: 'sheet' }); },
    quick, labPick, labRun, command, review, exam,
    sheets, sheet
  };
})();
