// Reusable UI components for Cloud Exam Quest.
// Renders cards, buttons, choices, cheat sheets, toasts.

(function () {
  'use strict';

  const el = (tag, attrs, children) => {
    const node = document.createElement(tag);
    if (attrs) {
      for (const k in attrs) {
        if (k === 'class') node.className = attrs[k];
        else if (k === 'html') node.innerHTML = attrs[k];
        else if (k === 'text') node.textContent = attrs[k];
        else if (k === 'on') {
          for (const evt in attrs.on) node.addEventListener(evt, attrs.on[evt]);
        } else if (k === 'style' && typeof attrs[k] === 'object') {
          Object.assign(node.style, attrs[k]);
        } else if (k.startsWith('data-') || k === 'role' || k === 'href' || k === 'type' || k === 'value' || k === 'placeholder' || k === 'autofocus' || k === 'maxlength' || k === 'title') {
          node.setAttribute(k, attrs[k]);
        } else {
          node[k] = attrs[k];
        }
      }
    }
    if (children) {
      const arr = Array.isArray(children) ? children : [children];
      for (const c of arr) {
        if (c == null || c === false) continue;
        if (typeof c === 'string') node.appendChild(document.createTextNode(c));
        else node.appendChild(c);
      }
    }
    return node;
  };

  function clearMain() {
    document.getElementById('app').innerHTML = '';
  }

  function setMain(node) {
    const m = document.getElementById('app');
    m.innerHTML = '';
    if (Array.isArray(node)) for (const n of node) m.appendChild(n); else m.appendChild(node);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function toast(msg, kind) {
    const host = document.getElementById('toast-host');
    const t = el('div', { class: 'toast ' + (kind || '') }, msg);
    host.appendChild(t);
    setTimeout(() => {
      t.style.transition = 'opacity .25s ease';
      t.style.opacity = '0';
      setTimeout(() => t.remove(), 260);
    }, 1900);
  }

  function pageHeader(title, subtitle, opts) {
    opts = opts || {};
    const left = el('div', null, [
      el('h2', { class: 'text-2xl font-bold tracking-tight text-slate-100' }, title),
      subtitle ? el('p', { class: 'text-sm text-slate-400 mt-0.5' }, subtitle) : null
    ]);
    const right = el('div', { class: 'flex items-center gap-2' });
    if (opts.onHome !== false) {
      right.appendChild(el('button', { class: 'btn btn-ghost', on: { click: () => window.App.go('dashboard') }, title: 'Dashboard (Esc)' }, '🏠 Home'));
    }
    if (opts.extra) right.appendChild(opts.extra);
    return el('div', { class: 'flex items-start justify-between gap-3 mb-5 mt-3 flex-wrap' }, [left, right]);
  }

  function progressBar(curr, total) {
    const pct = total ? Math.round((curr / total) * 100) : 0;
    const bar = el('div', { class: 'bar w-full' }, [el('span', { style: { width: pct + '%' } })]);
    return el('div', null, [
      el('div', { class: 'flex items-center justify-between text-xs text-slate-400 mb-1' }, [
        el('span', null, 'Progress'),
        el('span', null, curr + ' / ' + total + ' (' + pct + '%)')
      ]),
      bar
    ]);
  }

  function pill(text, kind) {
    return el('span', { class: 'pill ' + (kind || '') }, text);
  }

  function renderCheatSheet(labId) {
    const cs = window.CHEATSHEETS[labId];
    if (!cs) return el('div', null, 'No cheat sheet for this lab.');
    const sections = cs.sections.map(s =>
      el('section', { class: 'card p-5 mb-4' }, [
        el('h3', { class: 'text-lg font-bold text-slate-100 mb-1' }, s.title),
        el('div', { class: 'cs', html: s.html })
      ])
    );
    return el('div', null, sections);
  }

  function renderCheatSheetSection(labId, section) {
    return el('div', { class: 'card p-5 mb-4' }, [
      el('div', { class: 'flex items-center justify-between mb-2' }, [
        el('h3', { class: 'text-lg font-bold text-slate-100' }, section.title),
        pill('Lab ' + labId + ' · cheat sheet', 'pill-neon')
      ]),
      el('div', { class: 'cs', html: section.html })
    ]);
  }

  // ---------- QUESTION RENDERERS ----------

  // helpers: render Q stem allowing inline HTML
  function stemBlock(q) {
    return el('div', { class: 'qstem text-slate-100 text-base sm:text-lg leading-relaxed', html: q.q });
  }

  // Render the meta-pill row for a question.
  // opts.noHint = true → don't render the "💡 Hint" button (used by Exam Simulator).
  // The topic pill is always hidden by default; users reveal it per-question by clicking "💡 Hint".
  function metaPills(q, opts) {
    opts = opts || {};
    const lab = window.LABS.find(l => l.id === q.lab);
    const row = el('div', { class: 'flex flex-wrap gap-1.5 mb-3 items-center' }, [
      pill(lab ? (lab.icon + ' Lab ' + q.lab + ' · ' + lab.short) : 'Lab ' + q.lab, 'pill-neon'),
      pill(q.type.toUpperCase(), 'pill-gold')
    ]);
    if (!opts.noHint && q.topic) {
      const hintBtn = el('button', {
        class: 'hint-btn',
        type: 'button',
        title: 'Reveal a topic hint for this question',
        on: { click: () => {
          hintBtn.replaceWith(pill('💡 ' + q.topic, 'pill-hint'));
        } }
      }, '💡 Hint');
      row.appendChild(hintBtn);
    }
    return row;
  }

  function renderMCQ(q, onSelect, isMulti) {
    const letters = ['A','B','C','D','E','F','G','H'];
    const wrap = el('div', { class: 'space-y-2 mt-4', 'data-choices': '1' });
    const selected = new Set();
    q.options.forEach((opt, idx) => {
      const choice = el('button', {
        class: 'choice', 'data-idx': String(idx), type: 'button',
        on: {
          click: (ev) => {
            if (isMulti) {
              if (selected.has(idx)) { selected.delete(idx); choice.classList.remove('selected'); choice.querySelector('.chip').textContent = letters[idx]; }
              else { selected.add(idx); choice.classList.add('selected'); choice.querySelector('.chip').textContent = '✓'; }
            } else {
              onSelect([idx], wrap);
            }
          }
        }
      }, [
        el('span', { class: 'chip' }, letters[idx]),
        el('span', { class: 'flex-1', html: opt })
      ]);
      wrap.appendChild(choice);
    });
    if (isMulti) {
      wrap.appendChild(el('div', { class: 'pt-2' }, [
        el('button', { class: 'btn btn-primary', on: { click: () => onSelect(Array.from(selected).sort(), wrap) } }, 'Submit answer ⏎')
      ]));
    }
    return wrap;
  }

  function renderTrueFalse(q, onSelect) {
    const wrap = el('div', { class: 'grid grid-cols-2 gap-3 mt-4', 'data-choices': '1' });
    ['True', 'False'].forEach((label, idx) => {
      const value = idx === 0;
      const btn = el('button', {
        class: 'choice', type: 'button',
        on: { click: () => onSelect(value, wrap) }
      }, [el('span', { class: 'chip' }, idx === 0 ? 'T' : 'F'), el('span', { class: 'flex-1' }, label)]);
      wrap.appendChild(btn);
    });
    return wrap;
  }

  function renderTextInput(q, onSubmit, placeholder) {
    const input = el('input', { class: 'tinput', type: 'text', placeholder: placeholder || 'Type your answer…', autofocus: 'true' });
    const submit = () => onSubmit(input.value, wrap);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); submit(); } });
    const wrap = el('div', { class: 'mt-4 space-y-3' }, [
      input,
      el('button', { class: 'btn btn-primary', on: { click: submit } }, 'Submit ⏎')
    ]);
    setTimeout(() => input.focus(), 50);
    return wrap;
  }

  // Match game (one-screen click matching)
  function renderMatch(q, onComplete) {
    const lefts  = q.pairs.map((p, i) => ({ key: 'L' + i, label: p.l, partner: 'R' + i }));
    const rights = q.pairs.map((p, i) => ({ key: 'R' + i, label: p.r, partner: 'L' + i }));
    // shuffle the rights
    for (let i = rights.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [rights[i], rights[j]] = [rights[j], rights[i]]; }
    let selectedLeft = null;
    const matched = new Set();
    let mistakes = 0;

    const leftCol = el('div', { class: 'space-y-2' });
    const rightCol = el('div', { class: 'space-y-2' });

    function maybeFinish() {
      if (matched.size === q.pairs.length * 2) {
        onComplete(mistakes === 0, mistakes);
      }
    }

    lefts.forEach(L => {
      const t = el('button', {
        class: 'tile', 'data-key': L.key, type: 'button',
        on: { click: () => {
          if (matched.has(L.key)) return;
          if (selectedLeft) selectedLeft.classList.remove('selected');
          selectedLeft = t; t.classList.add('selected');
        }}
      }, L.label);
      leftCol.appendChild(t);
    });

    rights.forEach(R => {
      const t = el('button', {
        class: 'tile', 'data-key': R.key, type: 'button',
        on: { click: () => {
          if (!selectedLeft) { window.UI.toast('Pick a left tile first', 'bad'); return; }
          if (matched.has(R.key)) return;
          const Lkey = selectedLeft.getAttribute('data-key');
          const Lobj = lefts.find(x => x.key === Lkey);
          if (Lobj && Lobj.partner === R.key) {
            selectedLeft.classList.remove('selected');
            selectedLeft.classList.add('matched');
            t.classList.add('matched');
            matched.add(Lkey); matched.add(R.key);
            selectedLeft = null;
            maybeFinish();
          } else {
            mistakes++;
            t.classList.add('miss');
            const sl = selectedLeft;
            sl.classList.add('miss');
            setTimeout(() => { t.classList.remove('miss'); sl.classList.remove('miss'); sl.classList.remove('selected'); }, 600);
            selectedLeft = null;
          }
        }}
      }, R.label);
      rightCol.appendChild(t);
    });

    return el('div', { class: 'grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4' }, [leftCol, rightCol]);
  }

  // Lock all .choice buttons in a wrap, mark right/wrong
  function lockChoicesMCQ(wrap, q, picked) {
    const buttons = wrap.querySelectorAll('.choice');
    const correct = q.type === 'mcq' || q.type === 'predict' ? new Set([q.answer]) : new Set(q.answers || []);
    const pickedSet = new Set(Array.isArray(picked) ? picked : [picked]);
    buttons.forEach((b, i) => {
      b.classList.add('is-disabled');
      if (correct.has(i)) b.classList.add('is-correct');
      if (pickedSet.has(i) && !correct.has(i)) b.classList.add('is-wrong');
    });
  }
  function lockTrueFalse(wrap, q, picked) {
    const btns = wrap.querySelectorAll('.choice');
    const correctIdx = q.bool ? 0 : 1;
    btns.forEach((b, i) => {
      b.classList.add('is-disabled');
      if (i === correctIdx) b.classList.add('is-correct');
      if (i === (picked === true ? 0 : 1) && i !== correctIdx) b.classList.add('is-wrong');
    });
  }

  // Render explanation panel after answering
  function explanationPanel(q, ok) {
    const heading = ok
      ? el('div', { class: 'flex items-center gap-2 text-good font-semibold' }, ['✓ Correct (+10 XP)'])
      : el('div', { class: 'flex items-center gap-2 text-bad font-semibold' }, ['✗ Not quite']);
    return el('div', { class: 'card p-4 mt-4 ' + (ok ? '' : 'border-rose-400/30') }, [
      heading,
      el('p', { class: 'text-sm text-slate-300 mt-2 leading-relaxed' }, q.explanation || ''),
      q.slide ? el('p', { class: 'text-xs text-slate-500 mt-2' }, 'Source: Lab ' + q.lab + (q.slide ? ' · slide ' + q.slide : '')) : null
    ]);
  }

  function nextButton(label, onClick) {
    return el('button', { class: 'btn btn-primary mt-4', on: { click: onClick } }, [label || 'Next ⏎']);
  }

  // For showing the "expected answer" box on text-based incorrect
  function expectedBox(text) {
    return el('div', { class: 'mt-2 text-xs text-slate-400' }, [
      'Expected: ', el('code', { class: 'text-neon font-mono' }, text)
    ]);
  }

  window.UI = {
    el, clearMain, setMain, toast,
    pageHeader, progressBar, pill,
    renderCheatSheet, renderCheatSheetSection,
    stemBlock, metaPills,
    renderMCQ, renderTrueFalse, renderTextInput, renderMatch,
    lockChoicesMCQ, lockTrueFalse,
    explanationPanel, nextButton, expectedBox
  };
})();
