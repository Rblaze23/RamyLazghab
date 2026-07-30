# Ramy Lazghab, Portfolio

Live at **https://rblaze23.github.io/RamyLazghab**

A Create React App site with two languages, case-study pages, and a fixed
navigation rail. All content lives in data files, not in JSX, so changing what
the site says never means editing a component.

## Run it

```bash
npm install
npm start          # http://localhost:3001/RamyLazghab/
```

The trailing `/RamyLazghab/` matters. The `homepage` field in `package.json`
serves the app under that path, and the router's basename matches it. Plain
`localhost:3001` loads a page but the routes will not line up.

Port and other local settings live in `.env.local`, which is gitignored:

```
PORT=3001
BROWSER=none
CHOKIDAR_USEPOLLING=true    # see "Gotchas"
WATCHPACK_POLLING=true
```

## Commands

| Command | Does |
| --- | --- |
| `npm start` | Dev server with hot reload |
| `npm test` | Watch mode |
| `CI=true npx react-scripts test --watchAll=false` | Run once and exit |
| `npm run build` | Production build into `build/` |
| `npm run deploy` | Build, then publish `build/` to the `gh-pages` branch |
| `python3 scripts/prepare_assets.py` | Regenerate hero photo, favicons, OG image |
| `python3 scripts/prepare_avatars.py` | Regenerate the section avatars |
| `python3 scripts/prepare_scenes.py` | Regenerate the right-rail scenes |

**Deploying is manual and always yours.** `npm run deploy` is the only command
that changes the live site.

## Where things are

| I want to change | Edit |
| --- | --- |
| Headline, tagline, location, skills, certifications, achievements | `src/content/site.js` |
| Anything on a project or case study | `src/content/projects.js` |
| ORACLE or PIF AI wording | `src/content/experience.js`. **Read the warning in that file first** |
| Section names and rail captions | `src/content/sections.js` |
| Button labels, section headings, the diagram legend | `src/content/index.js` (the `UI` object) |
| Any of the above, in French | the matching file in `src/content/fr/` |
| Colours, spacing, fonts, breakpoints | `src/styles/_tokens.scss` |
| Page title, meta description, social preview, JSON-LD | `public/index.html` |
| The CV PDF | `public/assets/Resume.pdf` |

Further reading:

- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** for how the app is put together and why
- **[docs/EDITING.md](docs/EDITING.md)** for step-by-step recipes

## Gotchas

These will each cost an hour if you meet them cold.

**The dev server silently serves stale code.** This project sits on `/mnt/c`,
the Windows filesystem. Linux file-watching events do not cross that boundary,
so without `CHOKIDAR_USEPOLLING=true` in `.env.local` the dev server never sees
your edits. No error, no warning. If a change is not appearing, check that file
before debugging anything else.

**The build fails if you write an em dash.** A test rejects `—` in any
visitor-facing string. Rewrite the sentence: it usually wants a full stop or a
comma and a conjunction. This is deliberate; em dashes read as machine-written.

**The build fails if you name certain tools near ORACLE or PIF AI.** See
`src/__tests__/confidentiality.test.js`. That guard exists so a future edit
cannot quietly leak detail about proprietary work. If it fires, the fix is
almost always to reword, not to widen the allowlist.

**Every image needs `height: auto` in CSS if it has `width`/`height`
attributes.** Those attributes map to presentational height, and with both
dimensions definite `aspect-ratio` is ignored. This caused the hero photo to
render 240×600 instead of square.

## Branches

| Branch | Role |
| --- | --- |
| `master` | Source of truth. Work here. |
| `gh-pages` | Build output, written by `npm run deploy`. Never edit by hand. |
| `main` | Nearly empty, holds a Pages workflow that would publish an empty site if the Pages source were ever switched to GitHub Actions. Worth deleting. |

## Open items

- Three `// TODO: confirm` markers in `src/content/projects.js` mark places where
  a real number would strengthen a Results section. They render as qualitative
  text and never appear on screen.
- Alzheimer's Prediction has no public repository, so its case study shows no
  repository button.
- Movie Recommender and MoodSync are GitHub forks and display as such.
- No project has screenshots or a live demo yet. Both are supported and appear
  automatically once added; see `docs/EDITING.md`.
