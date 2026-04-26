// Cloud Exam Quest - main app: router, state, gamification engine, dashboard.
(function () {
  'use strict';

  const STORAGE_KEY = 'cloud-exam-quest-v1';
  const DAY_MS = 24 * 60 * 60 * 1000;

  // Default state
  const defaultState = () => ({
    xp: 0,
    streak: 0,
    bestStreak: 0,
    seen: {},               // qid -> { right: int, wrong: int, lastRight: bool }
    missedIds: [],          // qids currently in Smart Review queue
    timeStartedAt: Date.now(),
    timeSpentMs: 0,         // total active time (rough)
    bestExamGrade: null,    // 'A+'.. 'F'
    bestExamPct: 0,
    perLab: { 1:{c:0,t:0},2:{c:0,t:0},3:{c:0,t:0},4:{c:0,t:0},5:{c:0,t:0},6:{c:0,t:0},7:{c:0,t:0},8:{c:0,t:0} },
    examsTaken: 0,
    settings: {}
  });

  let state = loadState();
  let activeHotkeys = {};

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      const def = defaultState();
      for (const k in def) if (!(k in parsed)) parsed[k] = def[k];
      if (!parsed.perLab) parsed.perLab = def.perLab;
      parsed.settings = Object.assign({}, def.settings, parsed.settings || {});
      return parsed;
    } catch (e) { return defaultState(); }
  }

  function getSetting(key) {
    return state.settings ? state.settings[key] : undefined;
  }
  function setSetting(key, val) {
    if (!state.settings) state.settings = {};
    state.settings[key] = val;
    saveState();
  }

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  function recordAnswer(q, ok) {
    const entry = state.seen[q.id] || { right: 0, wrong: 0, lastRight: false };
    if (ok) {
      entry.right++;
      entry.lastRight = true;
      state.xp += 10;
      state.streak++;
      if (state.streak > state.bestStreak) state.bestStreak = state.streak;
      // Smart Review clearing rule: get it right twice in a row → remove from missedIds
      if (entry.right >= 2 && entry.lastRight) {
        state.missedIds = state.missedIds.filter(id => id !== q.id);
      }
    } else {
      entry.wrong++;
      entry.lastRight = false;
      state.streak = 0;
      if (!state.missedIds.includes(q.id)) state.missedIds.push(q.id);
    }
    state.seen[q.id] = entry;
    if (state.perLab[q.lab]) {
      state.perLab[q.lab].t++;
      if (ok) state.perLab[q.lab].c++;
    }
    saveState();
  }

  function bumpStreak(n) { state.streak = n; saveState(); }
  function getMissedIds() { return state.missedIds.slice(); }

  function recordExam(grade, pct) {
    state.examsTaken++;
    if (pct > state.bestExamPct) {
      state.bestExamPct = pct;
      state.bestExamGrade = grade;
    }
    saveState();
  }

  function labAccuracy(labId) {
    const p = state.perLab[labId];
    if (!p || !p.t) return null;
    return Math.round((p.c / p.t) * 100);
  }

  function weakestLab() {
    let weakest = null;
    let acc = 101;
    for (const lab of window.LABS) {
      const p = state.perLab[lab.id];
      if (p && p.t >= 3) {
        const a = (p.c / p.t) * 100;
        if (a < acc) { acc = a; weakest = lab; }
      }
    }
    return weakest;
  }

  function uniqueSeenCount() {
    return Object.keys(state.seen).length;
  }

  function go(view, arg) {
    activeHotkeys = {};  // reset on every navigation
    switch (view) {
      case 'dashboard': return dashboard();
      case 'cram':      return window.Modes.cram();
      case 'quick':     return window.Modes.quick();
      case 'labpick':   return window.Modes.labPick();
      case 'lab':       return window.Modes.labRun(arg);
      case 'command':   return window.Modes.command();
      case 'review':    return window.Modes.review();
      case 'exam':      return window.Modes.exam();
      case 'sheets':    return window.Modes.sheets();
      case 'sheet':     return window.Modes.sheet(arg);
      default:          return dashboard();
    }
  }

  function _setHotkeys(map) { activeHotkeys = map || {}; }
  function _extendHotkeys(map) {
    if (!map) return;
    activeHotkeys = Object.assign({}, activeHotkeys || {}, map);
  }

  // ---- DASHBOARD ----
  function dashboard() {
    const main = document.getElementById('app');
    main.innerHTML = '';

    const total = window.QUESTIONS.length;
    const seen = uniqueSeenCount();
    const seenPct = total ? Math.round((seen / total) * 100) : 0;
    const minutes = Math.round(state.timeSpentMs / 60000);
    const weak = weakestLab();

    const heroLeft = window.UI.el('div', { class: 'flex-1 min-w-0' }, [
      window.UI.el('h2', { class: 'text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-100' }, '1-Day Cram Optimizer'),
      window.UI.el('p', { class: 'text-sm text-slate-400 mt-1' }, 'Strict scope: 8 PPTX labs + 2 Lab 5 hands-on markdowns. Built for fastest path to exam-ready.'),
      window.UI.el('div', { class: 'mt-4' }, [window.UI.progressBar(seen, total)]),
      window.UI.el('div', { class: 'flex flex-wrap gap-1.5 mt-3' }, [
        window.UI.pill('XP ' + state.xp, 'pill-gold'),
        window.UI.pill('Streak ' + state.streak + (state.bestStreak ? (' (best ' + state.bestStreak + ')') : ''), 'pill-neon'),
        window.UI.pill('Time ~' + minutes + ' min', ''),
        window.UI.pill('Missed ' + state.missedIds.length, state.missedIds.length ? 'pill-bad' : 'pill-good'),
        state.bestExamGrade ? window.UI.pill('Best exam ' + state.bestExamGrade + ' (' + state.bestExamPct + '%)', 'pill-good') : null,
        weak ? window.UI.pill('Weakest: Lab ' + weak.id + ' (' + labAccuracy(weak.id) + '%)', 'pill-bad') : null
      ])
    ]);

    const heroCard = window.UI.el('section', { class: 'card p-5 sm:p-6 mt-3 mb-5' }, [
      window.UI.el('div', { class: 'flex flex-col sm:flex-row gap-5 items-start' }, [
        heroLeft,
        window.UI.el('div', { class: 'shrink-0 self-stretch sm:w-48 grid grid-cols-2 sm:grid-cols-1 gap-2' }, [
          window.UI.el('button', { class: 'btn btn-primary text-base', on: { click: () => go('cram') } }, '🚀 Cram (start)'),
          window.UI.el('button', { class: 'btn btn-ghost', on: { click: () => go('sheets') } }, '📚 Cheat sheets')
        ])
      ])
    ]);
    main.appendChild(heroCard);

    // Modes grid
    const modeTiles = [
      { id: 'cram',    icon: '🚀', title: 'Cram Mode (flagship)', desc: 'Linear walkthrough · cheat sheet card → 4-6 questions → next concept. Fastest path to coverage.', color: 'from-cyan-400 to-violet-500' },
      { id: 'sheets',  icon: '📚', title: 'Cheat Sheets',        desc: '8 slide-accurate one-pagers. Read first; consult between rounds.', color: 'from-amber-400 to-orange-500' },
      { id: 'quick',   icon: '⚡', title: 'Quick Quiz',           desc: '10 random questions · warm-up or 5-min filler.', color: 'from-emerald-400 to-teal-500' },
      { id: 'labpick', icon: '🎯', title: 'Lab Quest',            desc: 'Pick one lab; play through every question.', color: 'from-pink-400 to-rose-500' },
      { id: 'command', icon: '⌨️', title: 'Command Master',       desc: 'Type real docker / kubectl commands · smart matcher.', color: 'from-blue-400 to-indigo-500' },
      { id: 'review',  icon: '🩹', title: 'Smart Review',         desc: 'Replay only questions you missed. Auto-clears once you get one right twice.', color: 'from-rose-400 to-fuchsia-500', badge: state.missedIds.length || null },
      { id: 'exam',    icon: '⏱', title: 'Exam Simulator',       desc: '30 random Qs · 30-minute timer · graded A+ to F. No hints.', color: 'from-yellow-400 to-amber-500' }
    ];
    const grid = window.UI.el('div', { class: 'grid grid-cols-1 md:grid-cols-2 gap-3' });
    modeTiles.forEach(t => {
      const tile = window.UI.el('button', { class: 'mode-tile text-left w-full', on: { click: () => go(t.id) } }, [
        window.UI.el('div', { class: 'ico bg-gradient-to-br ' + t.color }, t.icon),
        window.UI.el('div', { class: 'flex-1 min-w-0' }, [
          window.UI.el('div', { class: 'flex items-center gap-2' }, [
            window.UI.el('div', { class: 'font-bold text-slate-100' }, t.title),
            t.badge ? window.UI.pill(String(t.badge), 'pill-bad') : null
          ]),
          window.UI.el('div', { class: 'text-xs text-slate-400 mt-1' }, t.desc)
        ])
      ]);
      grid.appendChild(tile);
    });
    main.appendChild(grid);

    // Per-lab coverage strip
    const labStrip = window.UI.el('section', { class: 'card p-5 mt-5' }, [
      window.UI.el('div', { class: 'flex items-center justify-between mb-3' }, [
        window.UI.el('h3', { class: 'font-bold text-slate-100' }, 'Per-lab coverage'),
        window.UI.el('div', { class: 'text-xs text-slate-400' }, total + ' total questions')
      ]),
      window.UI.el('div', { class: 'grid grid-cols-1 sm:grid-cols-2 gap-3' },
        window.LABS.map(lab => {
          const counts = window.QUESTION_COUNTS;
          const labTotal = counts[lab.id] || 0;
          const seenInLab = window.QUESTIONS.filter(q => q.lab === lab.id && state.seen[q.id]).length;
          const pct = labTotal ? Math.round((seenInLab / labTotal) * 100) : 0;
          const acc = labAccuracy(lab.id);
          return window.UI.el('div', { class: 'p-3 rounded-xl border border-edge bg-panel/60' }, [
            window.UI.el('div', { class: 'flex items-center justify-between mb-1.5' }, [
              window.UI.el('div', { class: 'flex items-center gap-2' }, [
                window.UI.el('span', null, lab.icon),
                window.UI.el('span', { class: 'text-sm font-semibold text-slate-200' }, 'Lab ' + lab.id + ' · ' + lab.short)
              ]),
              window.UI.el('div', { class: 'text-xs text-slate-400' }, seenInLab + '/' + labTotal + (acc != null ? ' · ' + acc + '%' : ''))
            ]),
            window.UI.el('div', { class: 'bar' }, [window.UI.el('span', { style: { width: pct + '%' } })])
          ]);
        })
      )
    ]);
    main.appendChild(labStrip);

    // Hot-keys for dashboard
    _setHotkeys({
      c: () => go('cram'),
      q: () => go('quick'),
      l: () => go('labpick'),
      s: () => go('sheets'),
      r: () => go('review'),
      e: () => go('exam'),
      m: () => go('command')
    });
  }

  function reset() {
    if (!confirm('Reset all progress (XP, streak, missed questions, exam grade)? This cannot be undone.')) return;
    state = defaultState();
    saveState();
    window.UI.toast('Progress reset', 'good');
    go('dashboard');
  }

  // ---- TIME TRACKING ----
  let lastTick = Date.now();
  function tick() {
    const now = Date.now();
    const delta = now - lastTick;
    lastTick = now;
    if (delta < 60_000 && document.visibilityState === 'visible') {
      state.timeSpentMs += delta;
    }
  }
  setInterval(() => { tick(); saveState(); }, 30_000);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') saveState(); else lastTick = Date.now(); });

  // ---- KEYBOARD SHORTCUTS (global) ----
  window.addEventListener('keydown', (e) => {
    // Ignore if typing in an input/textarea
    const tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA') {
      // Esc still goes home
      if (e.key === 'Escape') { e.preventDefault(); go('dashboard'); }
      // Enter handled per-input
      return;
    }
    if (e.key === 'Escape') { e.preventDefault(); go('dashboard'); return; }
    const handler = activeHotkeys[e.key];
    if (handler) { e.preventDefault(); handler(); return; }
  });

  // ---- WIRE UP ----
  window.App = {
    go, recordAnswer, bumpStreak, getMissedIds,
    recordExam, labAccuracy, weakestLab, uniqueSeenCount,
    getSetting, setSetting,
    _setHotkeys, _extendHotkeys, reset, getState: () => state
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('reset-btn').addEventListener('click', reset);
    go('dashboard');
  });
})();
