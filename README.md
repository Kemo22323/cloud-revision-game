# Cloud Exam Quest — 1‑Day Cram Optimizer

A zero‑install single‑page web app for cramming an 8‑lab Cloud Computing course in one day.

- **Cram Mode** (flagship): linear walkthrough — cheat sheet → 4–6 questions → next concept → next lab.
- **Cheat Sheets**: one slide‑accurate sheet per lab, viewable any time.
- **Quick Quiz** · **Lab Quest** · **Command Master** (smart command matcher).
- **Smart Review**: replay only missed questions; auto‑clears after two consecutive correct.
- **Exam Simulator**: 30 random questions, 30‑minute timer, A+ → F grade.
- **351 questions** spanning all 8 labs + 2 Lab 5 hands‑on markdowns.

> Built strictly from the source PPTX labs. Works fully offline, saves progress to `localStorage`.

---

## Run locally

It is a pure static site. Either:

1. **Just open `index.html`** in any browser (no server required), or
2. Serve the folder if you prefer a localhost URL:

```bash
# Python
python -m http.server 8000

# Node (one-shot)
npx serve .
```

Then visit <http://localhost:8000>.

## Deploy on Netlify

This repo includes a `netlify.toml` that publishes the root folder with cache headers and basic security headers. No build step is required.

### Option A — Connect to GitHub (continuous deploy)

1. Push this repo to GitHub.
2. Go to <https://app.netlify.com/start>.
3. Pick "Import from Git" → select this repository.
4. Build command: *(leave empty)*. Publish directory: `.`.
5. Click **Deploy site**. Every push to `main` will auto‑deploy.

### Option B — Drag & drop

Open <https://app.netlify.com/drop> and drag the folder. Done.

### Option C — Netlify CLI

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=.
```

## Project layout

```
CloudExamQuest/
├── index.html              # Dashboard + script/style imports
├── netlify.toml            # Netlify config (publish=".", cache + security headers)
├── styles/
│   └── app.css             # Custom dark theme on top of Tailwind CDN
├── scripts/
│   ├── app.js              # Router, state, gamification engine, dashboard
│   ├── modes.js            # Cram / Quick / Lab / Command / Review / Exam
│   ├── matcher.js          # Smart command matcher (flag synonyms, reordering)
│   └── ui.js               # Reusable UI: cards, choices, cheat sheet renderer
└── data/
    ├── labs.js             # 8 lab metadata
    ├── cheatsheets.js      # 45 slide-accurate cheat sheet sections
    └── questions.js        # 351 questions (mcq / multi / truefalse / fill / command / predict / match)
```

## Keyboard shortcuts

| Key                | Action                              |
| ------------------ | ----------------------------------- |
| `1` – `4`          | Pick MCQ option / True‑False        |
| `Enter`            | Submit / Next                       |
| `Esc`              | Back to dashboard                   |
| `B` (in Cram)      | Previous section                    |
| `S` (in Cram)      | Skip current section                |
| `L` (in Cram)      | Skip current lab                    |
| `C` / `Q` / `L` …  | Open Cram / Quick / Lab from home   |

## Tech stack

Plain HTML + CSS + vanilla JavaScript. Tailwind via CDN. No bundler, no dependencies, no build step.

## License

Personal / educational use.
