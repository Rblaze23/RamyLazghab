# Editing guide

Recipes for the things you will actually want to change. Every one of these is
a content edit; none of them require touching a component.

**After any change:** `CI=true npx react-scripts test --watchAll=false`

**To put it live:** see *Deploy the site* at the end. Pushing to `master` does
not change the live site on its own.

Two rules the tests enforce, so they are worth knowing before you start:

1. **No em dash (`—`)** in anything a visitor reads. Rewrite the sentence.
2. **No product names, tech stack or internal detail in the work experience
   entries.** See *Edit the work experience entries* near the end.

---

## Update the CV

The site serves two PDFs by fixed name. Replace the files, keep the names.

```
public/assets/Resume.pdf      English site
public/assets/Resume-FR.pdf   French site
```

Then:

```bash
git add public/assets/Resume.pdf public/assets/Resume-FR.pdf
git commit -m "chore: update CV"
git push
npm run deploy
```

Keep the general AI engineering CV here, the one whose projects match the
site. Targeted versions (health, cybersecurity, Gulf) go with the application,
not on the portfolio, because anyone can download this one.

The LaTeX sources are kept in `docs/cv-source/`. If you only ever change the
PDFs, nothing else needs to move. If you rename the files, the two link
entries are `links.cv` in `src/content/site.js` and `src/content/fr/site.js`.

When a CV change touches something the site also says (degree name, language
level, internship dates), update `site.js` and `fr/site.js` in the same commit
so the two never disagree. Those live in the `about` paragraphs and the
`glance` facts.

---

## Add a number to a Results section

The highest-value edit available. Open `src/content/projects.js`, find the
project, and replace the `// TODO: confirm` comment with a real bullet.

```js
results: [
  'Exact answers to table-based questions, which the naive ingestion pipeline could not produce.',
  'Judge-rated answer accuracy on table questions rose from 61% to 94%.',   // ← add
],
```

Only add what you can defend in an interview. A rough but honest number beats a
precise invented one, and beats no number at all.

---

## Add a live demo

```js
links: { repo: 'https://github.com/Rblaze23/RAGenius', demo: 'https://huggingface.co/spaces/you/ragenius' },
```

A gold **Try the live demo** button appears on the case study, above the
repository link, and a badge appears on the project card. Nothing else to do.

RAGenius is the easiest candidate: it is a Streamlit app, so a Hugging Face
Space takes about ten minutes.

---

## Add screenshots

1. Put the images in `src/assets/img/`.
2. Import and list them:

```js
import ragShot from '../assets/img/ragenius-dashboard.png';

// inside the project object
images: [{ src: ragShot, alt: 'RAGenius dashboard answering a question over a PDF' }],
```

The Screenshots section appears automatically. While `images` is empty the
section does not render at all, so there is never a placeholder box on screen.

Write a real `alt` describing what is happening, not "screenshot".

---

## Add a project

Append an object to `src/content/projects.js`, then the same object translated
in `src/content/fr/projects.js`. Keep the slug identical in both.

```js
{
  slug: 'my-project',        // null for a card with no case-study page
  tier: 2,                   // 1 deep, 2 lighter, 3 card only
  title: 'My Project',
  subtitle: 'One line',
  context: 'Personal project',
  summary: 'Card text, one or two sentences.',
  problem: 'Two or three sentences on the business problem.',
  architecture: { description: 'How it fits together.', glyph: null },
  pipeline: [],              // [{ step, detail }] for a deep case study
  tech: ['Python'],
  challenges: [],            // [{ title, body }]
  results: [],
  lessons: '',
  links: { repo: null, demo: null },
  images: [],
}
```

Tiers: **1** gets the full-width feature card and every section. **2** gets a
normal card and the sections you fill in. **3** is a card in *More projects*
with no page.

Position in the array is display order. The case studies currently run:
Agentic Security Operations, TelecomPlus, NoSQL Query Generation, SportIQ,
Movie Recommender, Alzheimer's, RAGenius.

Two tests will fire when you add one, and both are expected:

- `content.test.js` pins the exact list of case-study slugs in order. Add the
  new slug to that array.
- `i18n.test.js` asserts both languages have the same slugs in the same order,
  so it will tell you if you forget the French copy.

A project that is on the CV should be on the site, and the other way round.
Recruiters read both.

---

## Add an architecture diagram

1. Copy an existing glyph from `src/components/glyphs/` as a starting point.
2. Use **only** the semantic colours: `var(--c-doc)`, `var(--c-store)`,
   `var(--c-agent)`, `var(--c-model)`, `var(--c-flow)`. Never `var(--a)`.
3. Register it in `src/components/glyphs/index.js`.
4. Reference it: `architecture: { glyph: 'my-project' }`.

Keep the `viewBox` at `0 0 250 62` so it scales like the others, and give it a
real `aria-label` describing the flow.

Check nothing leaked:

```bash
grep -rnoE "var\(--a[0-9]?\)" src/components/glyphs/ && echo LEAK || echo clean
```

---

## Change the headline

`src/content/site.js`:

```js
headline: 'I build production-grade LLM and agentic AI systems, turning unstructured documents and data into forecasts, decisions, and dashboards.',
headlineAccent: 'turning unstructured documents and data into forecasts, decisions, and dashboards.',
```

`headlineAccent` **must be the tail end of `headline`**, word for word. The hero
strips it off and renders the remainder in white and the accent in gold. If they
do not match, the whole headline renders plain.

Translate in `src/content/fr/site.js` too.

---

## Change colours

`src/styles/_tokens.scss`. To reskin the whole site, change `--a`, `--a2`,
`--a3` and nothing else. Everything else is derived.

Do not change `--c-*` casually: those carry meaning in the diagrams and the
legend, and the skills section reuses them.

---

## Regenerate images

```bash
python3 scripts/prepare_assets.py    # hero photo, favicons, OG social card
python3 scripts/prepare_avatars.py   # section heading avatars
python3 scripts/prepare_scenes.py    # right-rail scenes
```

Crop boxes are constants at the top of each script. Every crop deliberately
avoids the bottom-right corner, where the generator's watermark sits, so the
watermark is removed by framing rather than by patching pixels.

`prepare_assets.py` also crops the OG social card tightly to head and shoulders,
because the source artwork contains a firearm lower in the frame and that image
is what renders when the site is shared on LinkedIn.

---

## Add a language

1. `cp -r src/content/fr src/content/es` and translate the four files.
2. In `src/content/index.js`: import them, add `es: bundle(...)`, add `'es'` to
   `LANGS`, add a label to `LANG_LABELS`, and translate the `UI` block.

No component changes. The switch, the rails and every page pick it up.

---

## Edit the work experience entries ⚠

`src/content/experience.js` and `src/content/fr/experience.js`: the three
internship entries (regulatory intelligence, generative document intelligence,
public regulatory radar).

This copy was approved word by word on 2026-07-29 and tightened on 2026-09-25
at the employer's request. It is deliberately vague because the work is
proprietary. **Do not add:**

- product names, internal or public (titles describe what the system does)
- a `tech` field or any stack list (the stack lives in Skills, as your toolkit)
- pipeline steps, named data sources, document counts, model architectures,
  retrieval strategy, prompt design, validation logic
- evaluation methodology, competitor comparisons, client names
- any performance figure

`src/__tests__/confidentiality.test.js` fails the build if a banned term
appears anywhere in `src/`, if an entry regains a `tech` or `slug` field, or if
a title contains a product name. If it fires, reword. Widening the allowlist
is only correct when the term is legitimately about an open project or your
own skills, which is why `Langfuse` and `LightGBM` are allowed in
`projects.js` and `site.js` but nowhere near `experience.js`.

The diagrams in `glyphs/OracleGlyph.jsx` and `PifGlyph.jsx` sit at exactly the
abstraction of the approved words. They must not gain detail either. (The
glyph ids keep their original names; nothing on screen shows them.)

---

## Deploy the site

The live site is served from the `gh-pages` branch, not from `master`.
Pushing to `master` saves your work; it does not publish it.

```bash
git add -A
git commit -m "describe the change"
git push
npm run deploy
```

`npm run deploy` builds the site and pushes the `build/` folder to `gh-pages`.
GitHub Pages picks it up within a minute or two; hard-refresh if the old
version lingers.

Run it from a terminal where you normally push to GitHub (Windows PowerShell
or Git Bash). From WSL the build succeeds but the push fails, because the
credential helper in your git config is a Windows executable.
