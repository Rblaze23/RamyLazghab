# Portfolio Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Ramy Lazghab's portfolio as a content-driven React site with deep case studies for open projects, deliberately vague Experience entries for confidential work, a new amber-on-dark visual system, and recruiter-focused SEO.

**Architecture:** Content moves out of JSX into three data modules (`site.js`, `experience.js`, `projects.js`). A single `CaseStudy` page renders any project by slug, choosing depth from which fields exist. Confidential work lives in a separate module with a different shape that has no `slug` field, so it structurally cannot acquire a case-study page. Routing is `react-router-dom` v6 with the `spa-github-pages` 404 redirect so deep links survive GitHub Pages.

**Tech Stack:** Create React App 5, React 19, `react-router-dom` v6, SCSS (sass), framer-motion, Jest + React Testing Library (bundled with CRA), Python/Pillow for the asset pipeline.

## Global Constraints

Every task's requirements implicitly include this section.

- **Working directory:** `/mnt/c/Users/Ramy/OneDrive/Documents/RamyLazghab-refresh`, branch `portfolio-refresh`. Never touch `../RamyLazghab1`.
- **Never deploy.** Do not run `npm run deploy`, `gh-pages`, or push. Ramy deploys manually.
- **No invented metrics.** Any number must be traceable to the spec. Where a number would help but is unverified, put `// TODO: confirm exact number` in the source and render qualitative language.
- **No TODO text in rendered output.** `TODO`, `FIXME`, `placeholder`, `Lorem` must never appear in built HTML/JS that a visitor sees. Comments in source are fine.
- **Confidential terms are banned from `src/`** except inside `docs/`: `SCCS`, `EUR-Lex`, `CosIng`, `PubChem`, `PubMed`, `Google Trends`, `Product Information File`, `temporal validation`, `semantic chunking`, `6,000`, `2,000`, `LightGBM`, `Langfuse` *(Langfuse and LightGBM are permitted only in TelecomPlus / skills context — see Task 2 for the exact allowlist)*.
- **ORACLE and PIF AI copy is frozen.** Reproduce verbatim from the spec. Do not expand, embellish, or add implementation detail.
- **Accent colour never appears inside a diagram.** Diagrams use only the six semantic colours.
- **Mobile-first.** All media queries use `min-width`. Breakpoints: 375 / 640 / 768 / 1024 / 1440.
- **Nothing is deleted from the project list.** All eight existing projects must still be present somewhere.
- **Commit after every task.** Use `git -c user.name="Ramy Lazghab" -c user.email="ramy.lazghab@dauphine.eu" commit`.

### Verified environment facts

| Fact | Value |
| --- | --- |
| Node / npm | v20.20.2 / 10.8.2 |
| `meee.png` | 1024×1536 RGB, 4.0 MB — hero photo, must be compressed |
| `cyberpunkme.png` | 720×960 RGB, 974 KB — favicon source |
| `aboutmee.jpg` | **301×1000 RGB** — extremely narrow aspect (0.30). Needs `object-fit: cover` in a constrained box or it will distort |
| Pillow | 12.2.0, available as `python3 -c "from PIL import Image"` |

### File structure

```
public/
  index.html          MODIFY  SEO meta, JSON-LD, SPA decoder
  404.html            CREATE  SPA redirect for deep links
  manifest.json       MODIFY  name, theme colour
  robots.txt          MODIFY  allow + sitemap
  favicon.ico         REPLACE from cyberpunkme.png
  favicon-32.png      CREATE
  apple-touch-icon.png CREATE
  og-image.png        CREATE
  assets/Resume.pdf   REPLACE with RamyLazghabEN1.pdf

src/
  index.js            MODIFY  BrowserRouter
  App.jsx             MODIFY  routes
  styles/_tokens.scss   CREATE  colours, type scale, spacing
  styles/_mixins.scss   CREATE  breakpoint mixins
  styles/global.scss    CREATE  reset, base type
  content/site.js       CREATE  identity, links, skills, certs, achievements
  content/experience.js CREATE  ORACLE + PIF AI (frozen copy)
  content/projects.js   CREATE  case studies + more projects
  pages/Home.jsx        CREATE
  pages/CaseStudy.jsx   CREATE
  components/Header.jsx        REWRITE  sticky + hamburger
  components/Hero.jsx          REWRITE
  components/Experience.jsx    CREATE
  components/Work.jsx          CREATE   replaces Projects.jsx
  components/ProjectCard.jsx   CREATE
  components/DiagramLegend.jsx CREATE
  components/Skills.jsx        REWRITE
  components/About.jsx         REWRITE
  components/Credentials.jsx   CREATE   certifications + achievements
  components/Contact.jsx       REWRITE
  components/Footer.jsx        REWRITE  currently 0 bytes
  components/glyphs/TelecomPlusGlyph.jsx  CREATE
  components/glyphs/MovieGlyph.jsx        CREATE
  components/glyphs/AlzheimersGlyph.jsx   CREATE
  components/glyphs/RAGeniusGlyph.jsx     CREATE
  components/glyphs/index.js              CREATE   getGlyph(name)
  __tests__/content.test.js       CREATE
  __tests__/confidentiality.test.js CREATE
  __tests__/render.test.js        CREATE

DELETE: src/components/SectionIndicator.jsx, src/components/ParticlesBackground.jsx,
        src/components/Projects.jsx, src/components/Projects.scss,
        src/App.css, src/App.scss, src/index.css, src/logo.svg, src/App.test.js
```

`src/App.scss` and `src/logo.svg` become orphaned once `App.jsx` is rewritten in Task 4 — nothing imports them. They are removed in Task 3 Step 5 rather than left as dead weight.

---

### Task 1: Toolchain check and dependency install

Establishes the build works before anything is built on top of it. The spec flags CRA 5 on Node 20 as the project's main technical risk.

**Files:**
- Modify: `package.json` (add `react-router-dom`)

**Interfaces:**
- Consumes: nothing
- Produces: a working `npm run build` and `npm test`; `react-router-dom` v6 available to all later tasks

- [ ] **Step 1: Install existing dependencies**

```bash
cd /mnt/c/Users/Ramy/OneDrive/Documents/RamyLazghab-refresh
npm install --no-audit --no-fund
```

Expected: completes with a `node_modules` directory. Warnings about deprecated transitive packages are normal for CRA 5 and are not failures.

- [ ] **Step 2: Verify the baseline build works before changing anything**

```bash
npm run build 2>&1 | tail -20
```

Expected: `Compiled successfully` or `Compiled with warnings`, ending with `The project was built assuming it is hosted at /RamyLazghab/`.

**This was verified on 2026-07-29 on Node v20.20.2 and succeeded with no changes**, producing a 111.97 kB gzipped bundle. The OpenSSL fallback below is a contingency only — do not apply it unless the build actually fails.

If it fails with `error:0308010C:digital envelope routines::unsupported`, that is the known OpenSSL/Node 20 issue. Fix by changing the scripts in `package.json` — do **not** migrate to Vite:

```json
"start": "NODE_OPTIONS=--openssl-legacy-provider react-scripts start",
"build": "NODE_OPTIONS=--openssl-legacy-provider react-scripts build",
```

Then re-run the build and confirm it succeeds.

- [ ] **Step 3: Verify the test runner works**

```bash
CI=true npx react-scripts test --watchAll=false 2>&1 | tail -20
```

Expected: runs `src/App.test.js`. That test asserts the text "learn react" exists and **will fail** — the app has no such text. This is expected; it is CRA boilerplate. Confirm the runner itself executes rather than crashing.

- [ ] **Step 4: Delete the boilerplate test**

```bash
git rm src/App.test.js
```

- [ ] **Step 5: Install the router**

```bash
npm install react-router-dom@^6.30.0 --no-audit --no-fund
```

- [ ] **Step 6: Verify the router installed and the build still passes**

```bash
node -e "console.log(require('./node_modules/react-router-dom/package.json').version)"
npm run build 2>&1 | tail -5
```

Expected: a `6.x` version printed, then `Compiled successfully`.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json
git add -u
git -c user.name="Ramy Lazghab" -c user.email="ramy.lazghab@dauphine.eu" \
  commit -m "chore: verify toolchain, add react-router-dom, drop CRA boilerplate test"
```

---

### Task 2: Content layer and the confidentiality guard

The heart of the rebuild. Everything else reads from these three modules. The confidentiality test is written **first** so no confidential content can ever be committed without failing the suite.

**Files:**
- Create: `src/content/site.js`, `src/content/experience.js`, `src/content/projects.js`
- Test: `src/__tests__/confidentiality.test.js`, `src/__tests__/content.test.js`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `site` — default export object with `name, role, headline, tagline, location, email, links{github,linkedin,cv}, skills[{group,items[]}], certifications[{name,issuer,url}], achievements[{result,title,detail,url}]`
  - `experience` — default export array of `{id, title, subtitle, problem, role, tech[]}`. **No `slug` key.**
  - `projects` — default export array of `{slug|null, tier, title, subtitle, summary, problem, architecture{description,glyph}, pipeline[{step,detail}], tech[], challenges[{title,body}], results[], lessons, links{repo,demo}, images[]}`
  - `getProject(slug)` — named export, returns a project or `undefined`
  - `caseStudies` — named export, projects with a non-null `slug`, in display order

- [ ] **Step 1: Write the failing confidentiality test**

Create `src/__tests__/confidentiality.test.js`:

```js
import fs from 'fs';
import path from 'path';

const SRC = path.join(__dirname, '..');

// Terms that must never appear anywhere in src/. Sourced from the spec's
// confidentiality constraint for ORACLE and PIF AI.
const BANNED = [
  'SCCS', 'EUR-Lex', 'CosIng', 'PubChem', 'PubMed', 'Google Trends',
  'Product Information File', 'temporal validation', 'semantic chunking',
  'data leakage', 'compliance-validation agent', 'section regeneration',
];

// Terms allowed ONLY in these files, because they are legitimate elsewhere.
const SCOPED = {
  Langfuse: ['content/projects.js'],   // TelecomPlus is an open academic project
  LightGBM: ['content/site.js'],       // skills list only
};

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '__tests__') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (/\.(js|jsx|scss|css)$/.test(entry.name)) acc.push(full);
  }
  return acc;
}

const files = walk(SRC);

describe('confidentiality guard', () => {
  test.each(BANNED)('"%s" appears nowhere in src/', (term) => {
    const offenders = files.filter((f) =>
      fs.readFileSync(f, 'utf8').toLowerCase().includes(term.toLowerCase())
    );
    expect(offenders.map((f) => path.relative(SRC, f))).toEqual([]);
  });

  test.each(Object.entries(SCOPED))('"%s" is confined to its allowed files', (term, allowed) => {
    const offenders = files
      .filter((f) => fs.readFileSync(f, 'utf8').includes(term))
      .map((f) => path.relative(SRC, f).split(path.sep).join('/'))
      .filter((rel) => !allowed.includes(rel));
    expect(offenders).toEqual([]);
  });

  test('experience entries expose no slug, so they cannot gain a route', () => {
    // eslint-disable-next-line global-require
    const experience = require('../content/experience').default;
    experience.forEach((e) => {
      expect(e).not.toHaveProperty('slug');
      expect(e).not.toHaveProperty('pipeline');
      expect(e).not.toHaveProperty('challenges');
    });
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

```bash
CI=true npx react-scripts test --watchAll=false -t "confidentiality" 2>&1 | tail -20
```

Expected: FAIL — `Cannot find module '../content/experience'`.

- [ ] **Step 3: Write `src/content/experience.js`**

Copy is frozen. Reproduce exactly.

```js
// ORACLE and PIF AI are proprietary work projects.
//
// CONFIDENTIALITY BOUNDARY — approved by Ramy Lazghab, 2026-07-29.
// This copy is deliberately vague and must NOT be expanded. Do not add
// pipeline steps, named data sources, document counts, model architectures,
// retrieval strategy, prompt design, validation logic, client names, or any
// performance figure. Adding implementation detail here is a confidentiality
// regression, not an improvement.
//
// These entries intentionally have NO `slug` field: they render on the
// homepage only and must never acquire a case-study page.

const experience = [
  {
    id: 'oracle',
    title: 'ORACLE',
    subtitle: 'Regulatory intelligence',
    problem:
      'In a heavily regulated industry, the rules change continuously, and the evidence that predicts what gets restricted next is scattered across a large body of scientific and legal literature plus fast-moving public sources. No team can track that manually at the volume it arrives. Finding out late means reformulating a product under deadline instead of planning for it.',
    role: [
      'I worked on the AI side of an internal regulatory intelligence platform, where three things work together.',
      'First, a retrieval layer over a large curated document corpus, so the system answers questions with evidence drawn from real source material rather than generating plausible-sounding text.',
      'Second, a set of autonomous agents I designed and orchestrated to continuously gather live information from public sources and convert it into structured signals the rest of the system can use — turning a constantly moving external picture into something measurable.',
      'Third, machine learning models I trained on those signals to produce forward-looking risk predictions, rather than only describing the present.',
      "On top of that I built the explanation layer: LLMs that articulate why a model reached a given prediction and generate a supporting visual for each contributing factor. That mattered more than it sounds — the people who act on these predictions are regulatory specialists, not ML engineers, and a forecast they can't interrogate is a forecast they won't use.",
    ],
    tech: ['Multi-agent orchestration', 'LangGraph', 'RAG', 'Qdrant', 'XGBoost', 'Anthropic API', 'Streamlit'],
  },
  {
    id: 'pif-ai',
    title: 'PIF AI',
    subtitle: 'Generative document intelligence',
    problem:
      "Regulatory compliance dossiers are slow, manual document work. Someone reads scattered customer-supplied material, extracts what matters, and rewrites it into a fixed, auditable structure — repeatedly, for every product. It's expensive, and it's exactly the kind of work where a small oversight surfaces later in an audit.",
    role: [
      'I built a generative AI system that produces these dossiers automatically. It reads the customer’s source documents, interprets what’s in them, and renders the required structured document from that content.',
      'Because the output is a compliance artifact rather than a draft, generation on its own isn’t sufficient — plausible is not the same as correct. So the system also runs validation agents that check what was produced, and sits behind a human review workflow where a reviewer can accept or regenerate any individual part of the document instead of discarding the whole thing and starting again.',
      'It shipped as part of the company’s production web application, as a feature real customers use.',
    ],
    tech: ['Generative AI', 'LLM document understanding', 'RAG', 'Validation agents', 'Anthropic API'],
  },
];

export default experience;
```

- [ ] **Step 4: Run the confidentiality test again**

```bash
CI=true npx react-scripts test --watchAll=false -t "confidentiality" 2>&1 | tail -20
```

Expected: PASS. If a banned term is reported, remove it from the copy — do not weaken the test.

- [ ] **Step 5: Write the failing content test**

Create `src/__tests__/content.test.js`:

```js
import site from '../content/site';
import projects, { getProject, caseStudies } from '../content/projects';

describe('site content', () => {
  test('identity fields are present', () => {
    expect(site.name).toBe('Ramy Lazghab');
    expect(site.role).toBe('AI & Machine Learning Engineer');
    expect(site.location).toBe('Based in Paris, France. Open to relocation.');
  });

  test('headline does not name an employer', () => {
    const text = `${site.headline} ${site.tagline}`;
    expect(text).not.toMatch(/Relay ?X/i);
  });

  test('all external links are absolute and https', () => {
    [site.links.github, site.links.linkedin].forEach((url) =>
      expect(url).toMatch(/^https:\/\//)
    );
    site.certifications.forEach((c) => expect(c.url).toMatch(/^https:\/\//));
  });

  test('skills include the CV positioning keywords', () => {
    const all = site.skills.flatMap((g) => g.items).join(' ');
    ['LangChain', 'LangGraph', 'RAG', 'Qdrant', 'XGBoost', 'MCP', 'MLflow', 'Vertex AI'].forEach(
      (kw) => expect(all).toContain(kw)
    );
  });
});

describe('projects content', () => {
  test('every project has a title and summary', () => {
    projects.forEach((p) => {
      expect(typeof p.title).toBe('string');
      expect(p.title.length).toBeGreaterThan(0);
      expect(p.summary.length).toBeGreaterThan(0);
    });
  });

  test('exactly four case studies, in the expected order', () => {
    expect(caseStudies.map((p) => p.slug)).toEqual([
      'telecomplus',
      'movie-recommender',
      'alzheimers',
      'ragenius',
    ]);
  });

  test('no case study exists for confidential work', () => {
    expect(getProject('oracle')).toBeUndefined();
    expect(getProject('pif-ai')).toBeUndefined();
  });

  test('tier 1 case studies carry full depth', () => {
    const t1 = caseStudies.filter((p) => p.tier === 1);
    expect(t1.length).toBeGreaterThan(0);
    t1.forEach((p) => {
      expect(p.pipeline.length).toBeGreaterThan(2);
      expect(p.challenges.length).toBeGreaterThan(0);
      expect(p.lessons.length).toBeGreaterThan(0);
    });
  });

  test('all eight originally published projects are still present', () => {
    const titles = projects.map((p) => p.title);
    [
      'MoodSync', 'Startup Investment Program', 'House Price Prediction',
      'Diabetes Prediction', 'Blended Learning Platform',
      'Career Satisfaction Analysis', 'SportIQ', 'RAGenius',
    ].forEach((t) => expect(titles).toContain(t));
  });

  test('repo links are absolute GitHub URLs when present', () => {
    projects.forEach((p) => {
      if (p.links.repo) expect(p.links.repo).toMatch(/^https:\/\/github\.com\/Rblaze23\//);
    });
  });

  test('no visitor-facing string contains a TODO marker', () => {
    const walk = (v) =>
      typeof v === 'string' ? [v]
        : Array.isArray(v) ? v.flatMap(walk)
        : v && typeof v === 'object' ? Object.values(v).flatMap(walk)
        : [];
    walk(projects).concat(walk(site)).forEach((s) => {
      expect(s).not.toMatch(/TODO|FIXME|Lorem ipsum/i);
    });
  });
});
```

- [ ] **Step 6: Run it to verify it fails**

```bash
CI=true npx react-scripts test --watchAll=false -t "site content" 2>&1 | tail -20
```

Expected: FAIL — `Cannot find module '../content/site'`.

- [ ] **Step 7: Write `src/content/site.js`**

```js
const site = {
  name: 'Ramy Lazghab',
  role: 'AI & Machine Learning Engineer',
  headline: 'I build end-to-end AI platforms: document intelligence, forecasting, multi-agent orchestration.',
  headlineAccent: 'document intelligence, forecasting, multi-agent orchestration.',
  tagline: 'Currently building regulatory intelligence systems for the cosmetics industry.',
  location: 'Based in Paris, France. Open to relocation.',
  email: 'ramy.lazghab@dauphine.eu',

  links: {
    github: 'https://github.com/Rblaze23',
    linkedin: 'https://www.linkedin.com/in/ramy-lazghab-1464a8201/',
    cv: '/assets/Resume.pdf', // resolved against PUBLIC_URL at render time
  },

  about: [
    'I’m an AI & Machine Learning Engineer specialising in production systems built on LLMs, agentic AI and RAG. I design end-to-end platforms that combine document intelligence, forecasting and multi-agent orchestration for real business problems.',
    'I’m currently building regulatory intelligence systems for the cosmetics industry, where the work spans retrieval over large document corpora, autonomous agents gathering live signals, and machine learning models whose output has to be explainable to people without an ML background.',
    'M.Sc. Data Science & Artificial Intelligence, Université Paris Dauphine — PSL (2024–2026). B.Sc. Computer Engineering (IoT), Faculty of Sciences of Tunis.',
  ],

  languages: 'English — Fluent (IELTS) · French — Professional',

  skills: [
    {
      group: 'AI / ML & Frameworks',
      items: ['LLMs', 'RAG', 'Multi-Agent Systems', 'Prompt Engineering', 'LangChain', 'LangGraph',
              'Hugging Face', 'PyTorch', 'TensorFlow', 'XGBoost', 'LightGBM'],
    },
    {
      group: 'LLM Platforms & MLOps',
      items: ['Anthropic API', 'OpenAI API', 'MCP', 'LangSmith', 'Docker', 'Git', 'MLflow'],
    },
    {
      group: 'Cloud & Data',
      items: ['GCP — Vertex AI', 'BigQuery', 'Cloud Run', 'Streamlit', 'Pandas', 'NumPy',
              'Spark', 'PostgreSQL', 'Neo4j', 'FAISS', 'Qdrant'],
    },
    {
      group: 'Programming',
      items: ['Python', 'SQL', 'Java', 'JavaScript', 'C', 'R'],
    },
  ],

  certifications: [
    { name: 'LangChain Academy', issuer: 'LangChain', mark: 'LC',
      url: 'https://academy.langchain.com/certificates/nqrsewnhol' },
    { name: 'BigQuery ML', issuer: 'Google Cloud', mark: 'GC',
      url: 'https://www.credly.com/badges/9ec1dc8b-494f-42ee-a314-ba30b40342de/public_url' },
  ],

  achievements: [
    { result: '3rd place', title: 'RAISE Summit AI Hackathon', detail: 'Paris', url: null },
    { result: 'Winner', title: 'Hack for Good', detail: 'MoodSync — real-time assistant for psychologists', url: null },
    { result: 'Participant', title: 'EY Hack for Smart Insurance', detail: 'InsurAI', url: 'https://github.com/Rblaze23/InsurAI' },
    { result: 'Competitor', title: 'IEEE Xtreme 15.0 & 16.0', detail: '24-hour global programming competition', url: null },
  ],
};

export default site;
```

- [ ] **Step 8: Write `src/content/projects.js`**

```js
// Open projects. Unlike src/content/experience.js, detail is safe here —
// every one of these has a public repository.

const projects = [
  {
    slug: 'telecomplus',
    tier: 1,
    title: 'TelecomPlus',
    subtitle: 'Multi-agent customer support',
    context: 'Academic project',
    summary:
      'Multi-agent customer support combining document retrieval and SQL routing, with LLM-as-a-Judge evaluation and full run tracking.',
    problem:
      'Customer support questions draw on two incompatible kinds of knowledge: unstructured documentation such as plans, technical specs and policies, and structured records such as accounts and usage. A system built around one answers the other badly, and users neither know nor care which kind of question they are asking.',
    architecture: {
      description:
        'A multi-agent graph classifies query intent first, then routes to either document retrieval over a vector index or a SQL query against the relational database, and synthesises an answer grounded in whatever it retrieved. Answer quality is measured by LLM-as-a-Judge evaluation with every run tracked, so changes to prompts or retrieval are assessed rather than assumed.',
      glyph: 'telecomplus',
    },
    pipeline: [
      { step: 'Ingest documentation', detail: 'Parse the PDF corpus, detecting tables and rendering them as Markdown before anything else touches the text.' },
      { step: 'Chunk and embed', detail: 'Split the normalised text and index it into a FAISS vector store.' },
      { step: 'Classify intent', detail: 'An incoming question is routed by what kind of knowledge it needs.' },
      { step: 'Retrieve or query', detail: 'Document retrieval for unstructured questions, SQL against PostgreSQL for structured ones.' },
      { step: 'Synthesise', detail: 'Compose the answer against retrieved evidence rather than from model memory.' },
      { step: 'Evaluate and track', detail: 'Score responses with LLM-as-a-Judge and record every run for comparison.' },
    ],
    tech: ['LangChain', 'LangGraph', 'OpenAI API', 'FAISS', 'PostgreSQL', 'Streamlit', 'Langfuse', 'MLflow'],
    challenges: [
      {
        title: 'Tables inside PDFs were destroying answer quality',
        body:
          'The corpus was mostly PDF documentation, and the answers users actually wanted lived in tables: pricing tiers, plan comparisons, technical specs. Standard text extraction flattens a table into a stream of loose cell values — the row and column relationships that give a number its meaning are simply gone. Retrieval returned chunks that were topically right and factually unusable, and the model answered confidently and wrongly. I changed ingestion to detect tables and render them as Markdown before chunking, preserving structure in a format the model reads natively. Answers went from approximately correct to exact.',
      },
      {
        title: 'Routing between retrieval and structured queries',
        body:
          'Rather than forcing every question down one path, the agent graph classifies intent and routes accordingly. To know whether a change actually helped instead of trusting spot checks, I put LLM-as-a-Judge evaluation in front of it with full run tracking, so every adjustment to prompts or retrieval was measured.',
      },
    ],
    results: [
      'Exact answers to table-based questions, which the naive ingestion pipeline could not produce.',
      'Correct routing between document retrieval and structured database queries.',
      'A repeatable evaluation harness in place of manual inspection.',
      // TODO: confirm exact number — judge scores before/after the Markdown table change
    ],
    lessons:
      'Retrieval quality is capped by ingestion quality. Nearly all the improvement came from parsing the documents properly rather than from prompt engineering, which is where I would instinctively have spent the time. Building the evaluation harness before optimising was what made that visible.',
    links: { repo: 'https://github.com/Rblaze23/Telecomplus-agent', demo: null },
    images: [],
  },

  {
    slug: 'movie-recommender',
    tier: 2,
    title: 'Movie Recommender',
    subtitle: 'End-to-end recommender on GCP',
    context: 'Personal project',
    summary: 'An end-to-end recommendation system built on Google Cloud and exposed as a REST API.',
    problem:
      'A recommendation model is only useful once something can call it. The interesting part of this project was not the model but everything around it: getting from raw data to a trained model to a deployed endpoint that responds to requests, entirely on managed cloud infrastructure.',
    architecture: {
      description:
        'Data and model training live in BigQuery ML so the model sits next to the data rather than in a separate pipeline. Vertex AI handles the managed model lifecycle, and the serving layer runs on Cloud Run as a containerised REST API.',
      glyph: 'movie',
    },
    pipeline: [],
    tech: ['GCP', 'BigQuery ML', 'Vertex AI', 'Cloud Run', 'Python', 'REST API'],
    challenges: [],
    results: [
      'Trained model deployed and reachable as a REST endpoint.',
      'Fully managed pipeline — no self-hosted infrastructure.',
    ],
    lessons: '',
    links: { repo: 'https://github.com/Rblaze23/GCP-Personalized-Movie-Recommendation-System', demo: null },
    images: [],
  },

  {
    slug: 'alzheimers',
    tier: 2,
    title: "Alzheimer's Prediction",
    subtitle: 'Ensemble modelling with interpretability',
    context: 'Academic project',
    summary:
      'An ensemble of gradient boosting and deep learning for early prediction, with SHAP used to make the output interpretable.',
    problem:
      'Early prediction of Alzheimer’s is a clinical decision-support problem, and in that setting an unexplained prediction is close to useless. A clinician needs to know which factors drove a result before acting on it, so accuracy alone was never the goal.',
    architecture: {
      description:
        'An ensemble combining gradient-boosted trees with a deep learning model, paired with SHAP to attribute each prediction back to the features that produced it.',
      glyph: 'alzheimers',
    },
    pipeline: [],
    tech: ['Python', 'XGBoost', 'Deep Learning', 'SHAP', 'Pandas', 'scikit-learn'],
    challenges: [],
    results: [
      'Ensemble combining gradient boosting with a deep learning model.',
      'Per-prediction feature attribution via SHAP.',
      // TODO: confirm exact number — model performance metrics
    ],
    lessons: '',
    links: { repo: null, demo: null }, // TODO: confirm — no public repo found under Rblaze23
    images: [],
  },

  {
    slug: 'ragenius',
    tier: 2,
    title: 'RAGenius',
    subtitle: 'Research assistant over PDF and CSV',
    context: 'Personal project',
    summary:
      'A multi-modal assistant that answers questions across PDF documents and CSV datasets using retrieval-augmented generation.',
    problem:
      'Research questions rarely sit inside a single file. Answering them often means combining what a document says with what a dataset shows, which normally requires reading both by hand and holding the connection in your head.',
    architecture: {
      description:
        'Uploaded PDFs and CSVs are indexed into a shared vector store, so a single question can retrieve across document text and tabular data together. Local models via Ollama keep the data on the machine, with a Streamlit dashboard for interactive exploration.',
      glyph: 'ragenius',
    },
    pipeline: [],
    tech: ['LangChain', 'FAISS', 'Hugging Face', 'Ollama', 'Streamlit', 'Python'],
    challenges: [],
    results: [
      'Multiple files uploaded and queried together in one session.',
      'Automatic summaries alongside question answering.',
      'Runs against local models, so documents never leave the machine.',
    ],
    lessons: '',
    links: { repo: 'https://github.com/Rblaze23/RAGenius', demo: null },
    images: [],
  },

  // --- Tier 3: cards only, no case-study route ---
  {
    slug: null, tier: 3, title: 'SportIQ', subtitle: 'AI tennis performance analysis',
    summary: 'Real-time video analysis for athletes: pose estimation, emotion recognition and NLP coaching feedback, with metrics and visualisations to improve form and focus.',
    problem: '', architecture: { description: '', glyph: null }, pipeline: [],
    tech: ['Python', 'Pose Estimation', 'Computer Vision', 'NLP'],
    challenges: [], results: [], lessons: '',
    links: { repo: 'https://github.com/Rblaze23/SportiQ', demo: null }, images: [],
  },
  {
    slug: null, tier: 3, title: 'MoodSync', subtitle: 'AI assistant for psychologists',
    summary: 'Real-time assistant with emotion detection, smart note-taking and LED mood lighting. Winner of Hack for Good.',
    problem: '', architecture: { description: '', glyph: null }, pipeline: [],
    tech: ['Deep Learning', 'Speech Emotion Recognition', 'NLP'],
    challenges: [], results: [], lessons: '',
    links: { repo: 'https://github.com/Rblaze23/MoodSync', demo: null }, images: [],
  },
  {
    slug: null, tier: 3, title: 'Startup Investment Program', subtitle: 'NLP for investment screening',
    summary: 'Used NLP and Word2Vec to help investors identify high-potential startups from startup metadata and team data.',
    problem: '', architecture: { description: '', glyph: null }, pipeline: [],
    tech: ['Python', 'NLP', 'Word2Vec'],
    challenges: [], results: [], lessons: '',
    links: { repo: 'https://github.com/Rblaze23/Predicting-Profitable-Startups', demo: null }, images: [],
  },
  {
    slug: null, tier: 3, title: 'House Price Prediction', subtitle: 'Regression with feature engineering',
    summary: 'Gradient-boosted regression with advanced feature engineering for the Kaggle housing competition.',
    problem: '', architecture: { description: '', glyph: null }, pipeline: [],
    tech: ['Python', 'XGBoost', 'Feature Engineering'],
    challenges: [], results: [], lessons: '',
    links: { repo: 'https://github.com/Rblaze23/House-Prices-Prediction', demo: null }, images: [],
  },
  {
    slug: null, tier: 3, title: 'Diabetes Prediction', subtitle: 'Clinical risk classification',
    summary: 'Comparative classification study using Logistic Regression, SVM and Decision Trees to predict diabetes risk.',
    problem: '', architecture: { description: '', glyph: null }, pipeline: [],
    tech: ['Python', 'scikit-learn', 'Classification'],
    challenges: [], results: [], lessons: '',
    links: { repo: 'https://github.com/Rblaze23/Diabetes-Diagnosis', demo: null }, images: [],
  },
  {
    slug: null, tier: 3, title: 'Career Satisfaction Analysis', subtitle: 'Dimensionality reduction study',
    summary: 'Used PCA to explore the relationship between education, job role and career satisfaction.',
    problem: '', architecture: { description: '', glyph: null }, pipeline: [],
    tech: ['Python', 'PCA', 'Data Analysis'],
    challenges: [], results: [], lessons: '',
    links: { repo: 'https://github.com/Rblaze23/Academic-Path-and-Career-Satisfaction', demo: null }, images: [],
  },
  {
    slug: null, tier: 3, title: 'Blended Learning Platform', subtitle: 'Online and offline training',
    summary: 'A web application for running blended online and in-person training sessions.',
    problem: '', architecture: { description: '', glyph: null }, pipeline: [],
    tech: ['React', 'Firebase', 'JavaScript'],
    challenges: [], results: [], lessons: '',
    links: { repo: 'https://github.com/Rblaze23/Blended-learning-Platform', demo: null }, images: [],
  },
];

export const caseStudies = projects.filter((p) => p.slug !== null);
export const moreProjects = projects.filter((p) => p.tier === 3);
export const getProject = (slug) => caseStudies.find((p) => p.slug === slug);

export default projects;
```

- [ ] **Step 9: Run the full suite to verify it passes**

```bash
CI=true npx react-scripts test --watchAll=false 2>&1 | tail -25
```

Expected: all tests PASS. If `all eight originally published projects` fails, the title strings must match the list in the test exactly.

- [ ] **Step 10: Commit**

```bash
git add src/content src/__tests__
git -c user.name="Ramy Lazghab" -c user.email="ramy.lazghab@dauphine.eu" \
  commit -m "feat: add content layer with confidentiality guard tests"
```

---

### Task 3: Design tokens and global styles

**Files:**
- Create: `src/styles/_tokens.scss`, `src/styles/_mixins.scss`, `src/styles/global.scss`
- Modify: `src/index.js` (import global styles)
- Delete: `src/App.css`

**Interfaces:**
- Consumes: nothing
- Produces: CSS custom properties `--bg --surface --ink --dim --dim2 --line --a --a2 --a3` and diagram colours `--c-doc --c-store --c-agent --c-model --c-flow`; SCSS mixins `@include bp(sm|md|lg|xl)`; utility classes `.container`, `.section-label`, `.chip`

- [ ] **Step 1: Write `src/styles/_tokens.scss`**

```scss
:root {
  --bg:      #0b0d0e;
  --surface: rgba(255, 255, 255, 0.035);
  --surface-2: rgba(255, 255, 255, 0.055);
  --line:    rgba(255, 255, 255, 0.09);
  --ink:     #e8eaed;
  --dim:     #94a09e;
  --dim2:    #6f7c7a;

  // Accent — chrome only. NEVER used inside a diagram.
  --a:  #ffb454;
  --a2: #ffd79a;
  --a3: #e09338;

  // Semantic diagram colours — fixed site-wide, meaning is constant.
  --c-doc:   #9aa5a4;  // source documents
  --c-store: #38bdf8;  // retrieval & vector store
  --c-agent: #a78bfa;  // agents & LLM
  --c-model: #ffb454;  // models & forecasts
  --c-flow:  #7ee787;  // data flow / live / validated

  --font-sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-mono: ui-monospace, "SF Mono", Menlo, Consolas, monospace;

  --radius:    13px;
  --radius-sm: 8px;
  --measure:   70ch;

  --space-1: 0.5rem;  --space-2: 0.75rem; --space-3: 1rem;
  --space-4: 1.5rem;  --space-5: 2.5rem;  --space-6: 4rem;
}
```

- [ ] **Step 2: Write `src/styles/_mixins.scss`**

```scss
// Mobile-first only. Never write a max-width query.
@mixin bp($size) {
  @if $size == sm      { @media (min-width: 375px)  { @content; } }
  @else if $size == md { @media (min-width: 640px)  { @content; } }
  @else if $size == lg { @media (min-width: 768px)  { @content; } }
  @else if $size == xl { @media (min-width: 1024px) { @content; } }
  @else if $size == xxl{ @media (min-width: 1440px) { @content; } }
}

@mixin surface {
  background: linear-gradient(165deg, rgba(255,255,255,.05), rgba(255,255,255,.012));
  border: 1px solid var(--line);
  border-radius: var(--radius);
}
```

- [ ] **Step 3: Write `src/styles/global.scss`**

```scss
@use './tokens';
@use './mixins' as *;

*, *::before, *::after { box-sizing: border-box; }

html, body, #root {
  margin: 0; padding: 0;
  background: var(--bg);
  scroll-behavior: smooth;
  scroll-padding-top: 76px;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: .01ms !important;
    transition-duration: .01ms !important;
  }
}

body {
  font-family: var(--font-sans);
  color: var(--ink);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

#root {
  background-image:
    radial-gradient(760px 380px at 6% -8%, rgba(255,180,84,.16), transparent 60%),
    radial-gradient(600px 330px at 98% 102%, rgba(126,231,135,.06), transparent 58%);
  background-repeat: no-repeat;
}

h1, h2, h3, h4 { text-wrap: balance; margin: 0; letter-spacing: -.025em; line-height: 1.15; }
p { margin: 0; }
a { color: inherit; }

:focus-visible { outline: 2px solid var(--a); outline-offset: 3px; border-radius: 4px; }

.container {
  width: 100%;
  max-width: 1180px;
  margin-inline: auto;
  padding-inline: var(--space-3);
  @include bp(lg) { padding-inline: var(--space-4); }
}

.section { padding-block: var(--space-5); @include bp(lg) { padding-block: var(--space-6); } }

.section-label {
  font: 600 10px/1 var(--font-mono);
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--dim2);
  margin-bottom: var(--space-3);
  i { color: var(--a); font-style: normal; }
}

.chip {
  display: inline-block;
  font: 500 11px/1 var(--font-mono);
  color: #b7c0be;
  background: var(--surface-2);
  border: 1px solid var(--line);
  border-radius: 5px;
  padding: 5px 7px;
}

.chip-row { display: flex; flex-wrap: wrap; gap: 5px; }

// Wide content must scroll inside itself, never the page.
.scroll-x { overflow-x: auto; }
```

- [ ] **Step 4: Wire it into `src/index.js`**

Replace the `import './index.css';` line with:

```js
import './styles/global.scss';
```

- [ ] **Step 5: Remove the now-unused stylesheet**

```bash
git rm src/App.css src/index.css src/App.scss src/logo.svg
```

`App.scss` and `logo.svg` are orphaned once `App.jsx` is rewritten in Task 4. If `src/App.jsx` imports `./App.css` or `./App.scss`, remove those import lines too, or the build will fail on the missing file.

- [ ] **Step 6: Verify the build compiles the SCSS**

```bash
npm run build 2>&1 | tail -8
```

Expected: `Compiled successfully`. A Sass error here means a typo in the `@use` paths.

- [ ] **Step 7: Commit**

```bash
git add src/styles src/index.js src/App.jsx
git add -u
git -c user.name="Ramy Lazghab" -c user.email="ramy.lazghab@dauphine.eu" \
  commit -m "feat: add design tokens, breakpoint mixins and global styles"
```

---

### Task 4: Routing, page shells and the GitHub Pages deep-link fix

**Files:**
- Modify: `src/index.js`, `src/App.jsx`
- Create: `src/pages/Home.jsx`, `src/pages/CaseStudy.jsx`, `public/404.html`
- Modify: `public/index.html` (SPA decoder only — full SEO comes in Task 9)
- Test: `src/__tests__/render.test.js`
- Delete: `src/components/SectionIndicator.jsx`, `src/components/ParticlesBackground.jsx`

**Interfaces:**
- Consumes: `getProject`, `caseStudies` from `src/content/projects`
- Produces: routes `/` and `/case-studies/:slug`; `Home` and `CaseStudy` default exports

- [ ] **Step 1: Write the failing routing test**

Create `src/__tests__/render.test.js`:

```js
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import CaseStudy from '../pages/CaseStudy';

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case-studies/:slug" element={<CaseStudy />} />
      </Routes>
    </MemoryRouter>
  );

describe('routing', () => {
  test('home renders the headline', () => {
    renderAt('/');
    expect(screen.getByText(/end-to-end AI platforms/i)).toBeInTheDocument();
  });

  test('a known case study renders its title', () => {
    renderAt('/case-studies/telecomplus');
    expect(screen.getByRole('heading', { name: /TelecomPlus/i, level: 1 })).toBeInTheDocument();
  });

  test('confidential work has no case-study page', () => {
    renderAt('/case-studies/oracle');
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });

  test('an unknown slug does not crash', () => {
    renderAt('/case-studies/does-not-exist');
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

```bash
CI=true npx react-scripts test --watchAll=false -t "routing" 2>&1 | tail -20
```

Expected: FAIL — `Cannot find module '../pages/Home'`.

- [ ] **Step 3: Write minimal page shells**

Create `src/pages/Home.jsx`:

```jsx
import React from 'react';
import site from '../content/site';

export default function Home() {
  return (
    <main>
      <h1>{site.headline}</h1>
    </main>
  );
}
```

Create `src/pages/CaseStudy.jsx`:

```jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProject } from '../content/projects';

export default function CaseStudy() {
  const { slug } = useParams();
  const project = getProject(slug);

  if (!project) {
    return (
      <main className="container section">
        <h1>Not found</h1>
        <p>That case study doesn’t exist.</p>
        <Link to="/">Back to the homepage</Link>
      </main>
    );
  }

  return (
    <main className="container section">
      <h1>{project.title}</h1>
      <p>{project.subtitle}</p>
    </main>
  );
}
```

- [ ] **Step 4: Wire routes into `src/App.jsx`**

Replace the entire file:

```jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case-studies/:slug" element={<CaseStudy />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}
```

- [ ] **Step 5: Wrap the app in a router in `src/index.js`**

The `basename` must match the `homepage` field in `package.json` so asset and route paths resolve under `/RamyLazghab`.

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/global.scss';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
```

- [ ] **Step 6: Create a placeholder Footer so App compiles**

`src/components/Footer.jsx` is currently 0 bytes, which breaks the import. Write:

```jsx
import React from 'react';

export default function Footer() {
  return <footer />;
}
```

- [ ] **Step 7: Run the routing test to verify it passes**

```bash
CI=true npx react-scripts test --watchAll=false -t "routing" 2>&1 | tail -20
```

Expected: PASS, all four cases.

- [ ] **Step 8: Add the GitHub Pages deep-link redirect**

Create `public/404.html`. GitHub Pages serves this for any unmatched path; it re-encodes the path into a query string and bounces to the app root.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Ramy Lazghab</title>
    <script>
      // Single Page Apps for GitHub Pages — github.com/rafgraph/spa-github-pages
      // pathSegmentsToKeep = 1 because the site is served from /RamyLazghab.
      var pathSegmentsToKeep = 1;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body></body>
</html>
```

- [ ] **Step 9: Add the decoder to `public/index.html`**

Insert this `<script>` inside `<head>`, before the closing `</head>` tag:

```html
<script>
  // Decodes the redirect written by 404.html back into a real path.
  (function (l) {
    if (l.search[1] === '/') {
      var decoded = l.search.slice(1).split('&').map(function (s) {
        return s.replace(/~and~/g, '&');
      }).join('?');
      window.history.replaceState(null, null, l.pathname.slice(0, -1) + decoded + l.hash);
    }
  })(window.location);
</script>
```

- [ ] **Step 10: Delete the dead components**

```bash
git rm src/components/SectionIndicator.jsx src/components/ParticlesBackground.jsx
```

- [ ] **Step 11: Verify the build and confirm 404.html is emitted**

```bash
npm run build 2>&1 | tail -6
test -f build/404.html && echo "404.html present" || echo "MISSING 404.html"
```

Expected: `Compiled successfully` and `404.html present`.

- [ ] **Step 12: Commit**

```bash
git add src public
git add -u
git -c user.name="Ramy Lazghab" -c user.email="ramy.lazghab@dauphine.eu" \
  commit -m "feat: add routing, page shells and GitHub Pages deep-link redirect"
```

---

### Task 5: Header and Hero

**Files:**
- Rewrite: `src/components/Header.jsx`, `src/components/Header.scss`, `src/components/Hero.jsx`, `src/components/Hero.scss`
- Modify: `src/pages/Home.jsx`

**Interfaces:**
- Consumes: `site` from `src/content/site`
- Produces: `Header` and `Hero` default exports. Header exposes nav anchors `#experience #work #skills #about #contact`.

- [ ] **Step 1: Write the failing test**

Append to `src/__tests__/render.test.js`:

```js
import Header from '../components/Header';

describe('header', () => {
  test('exposes a mobile menu toggle', () => {
    render(<MemoryRouter><Header /></MemoryRouter>);
    expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument();
  });

  test('links to the CV', () => {
    render(<MemoryRouter><Header /></MemoryRouter>);
    const cv = screen.getByRole('link', { name: /cv/i });
    expect(cv).toHaveAttribute('href', expect.stringContaining('Resume.pdf'));
  });
});

describe('hero', () => {
  test('shows location and the three primary links', () => {
    renderAt('/');
    expect(screen.getByText(/Based in Paris, France\. Open to relocation\./)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument();
  });

  test('does not name an employer', () => {
    renderAt('/');
    expect(screen.queryByText(/Relay ?X/i)).toBeNull();
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

```bash
CI=true npx react-scripts test --watchAll=false -t "header" 2>&1 | tail -15
```

Expected: FAIL — no menu button exists.

- [ ] **Step 3: Write `src/components/Header.jsx`**

```jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import site from '../content/site';
import './Header.scss';

const NAV = [
  { href: '/#experience', label: 'Experience' },
  { href: '/#work', label: 'Work' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const cv = `${process.env.PUBLIC_URL}${site.links.cv}`;

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          ramy.lazghab
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`bars ${open ? 'is-open' : ''}`} aria-hidden="true" />
        </button>

        <nav className={`nav ${open ? 'is-open' : ''}`}>
          {NAV.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a className="cv-button" href={cv} download="Ramy_Lazghab_CV.pdf">
            Download CV
          </a>
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 4: Write `src/components/Header.scss`**

```scss
@use '../styles/mixins' as *;

.site-header {
  position: sticky; top: 0; z-index: 50;
  background: rgba(11, 13, 14, .82);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--line);
}

.header-inner {
  display: flex; align-items: center; justify-content: space-between;
  min-height: 60px; gap: var(--space-3);
}

.brand {
  font: 600 14px/1 var(--font-mono);
  color: var(--ink); text-decoration: none; letter-spacing: -.01em;
}

.menu-toggle {
  width: 44px; height: 44px;
  display: grid; place-items: center;
  background: none; border: 1px solid var(--line); border-radius: var(--radius-sm);
  cursor: pointer;
  @include bp(lg) { display: none; }

  .bars, .bars::before, .bars::after {
    content: ''; display: block;
    width: 18px; height: 2px; background: var(--ink);
    transition: transform .2s ease, opacity .2s ease;
  }
  .bars { position: relative; }
  .bars::before { position: absolute; top: -6px; }
  .bars::after  { position: absolute; top: 6px; }

  .bars.is-open { background: transparent;
    &::before { transform: translateY(6px) rotate(45deg); }
    &::after  { transform: translateY(-6px) rotate(-45deg); }
  }
}

.nav {
  display: none;
  position: absolute; left: 0; right: 0; top: 100%;
  flex-direction: column; gap: var(--space-2);
  padding: var(--space-3);
  background: var(--bg);
  border-bottom: 1px solid var(--line);

  &.is-open { display: flex; }

  a {
    font: 500 13px/1 var(--font-mono);
    color: var(--dim); text-decoration: none;
    padding: 12px 4px; min-height: 44px; display: flex; align-items: center;
    &:hover { color: var(--ink); }
  }

  @include bp(lg) {
    display: flex; flex-direction: row; align-items: center; gap: var(--space-4);
    position: static; padding: 0; background: none; border: none;
    a { padding: 0; min-height: 0; }
  }
}

.cv-button {
  background: linear-gradient(96deg, var(--a2), var(--a));
  color: #14100a !important;
  font: 650 12px/1 var(--font-sans) !important;
  padding: 10px 14px !important;
  border-radius: var(--radius-sm);
  min-height: 44px;
  justify-content: center;
  @include bp(lg) { min-height: 0; padding: 9px 14px !important; }
}
```

- [ ] **Step 5: Write `src/components/Hero.jsx`**

```jsx
import React from 'react';
import { motion } from 'framer-motion';
import site from '../content/site';
import heroPhoto from '../assets/img/hero.jpg';
import './Hero.scss';

export default function Hero() {
  const cv = `${process.env.PUBLIC_URL}${site.links.cv}`;
  const plain = site.headline.replace(site.headlineAccent, '').trim();

  return (
    <section className="hero" id="home">
      <div className="container hero-inner">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .5 }}
        >
          <p className="kicker">{site.role}</p>

          <h1>
            {plain} <em>{site.headlineAccent}</em>
          </h1>

          <p className="tagline">{site.tagline}</p>

          <p className="location">
            <span className="dot" aria-hidden="true" />
            {site.location}
          </p>

          <div className="hero-actions">
            <a className="btn-primary" href="/#work">Read the case studies</a>
            <a className="btn-ghost" href={cv} download="Ramy_Lazghab_CV.pdf">Download CV</a>
          </div>

          <p className="hero-links">
            <a href={site.links.github} target="_blank" rel="noreferrer">GitHub</a>
            <span aria-hidden="true">·</span>
            <a href={site.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <span aria-hidden="true">·</span>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </motion.div>

        <motion.div
          className="hero-photo"
          initial={{ opacity: 0, scale: .96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: .6, delay: .1 }}
        >
          <img src={heroPhoto} alt="Ramy Lazghab" width="640" height="640" />
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Write `src/components/Hero.scss`**

```scss
@use '../styles/mixins' as *;

.hero { padding-block: var(--space-5) var(--space-6); }

.hero-inner {
  display: grid; gap: var(--space-4); align-items: center;
  grid-template-columns: 1fr;
  @include bp(lg) { grid-template-columns: 1.35fr .65fr; gap: var(--space-5); }
}

.hero-photo {
  order: -1; position: relative; justify-self: center;
  max-width: 240px;
  @include bp(lg) { order: 0; max-width: none; justify-self: stretch; }

  img {
    width: 100%; aspect-ratio: 1 / 1; object-fit: cover; object-position: center 20%;
    display: block; border-radius: 16px; border: 1px solid rgba(255,180,84,.3);
  }
  &::after {
    content: ''; position: absolute; inset: -14px; border-radius: 28px; pointer-events: none;
    background: radial-gradient(circle at 50% 45%, rgba(255,180,84,.2), transparent 68%);
  }
}

.kicker {
  display: inline-block;
  font: 600 10px/1 var(--font-mono);
  letter-spacing: .18em; text-transform: uppercase;
  color: var(--a2);
  background: rgba(255,180,84,.13);
  border: 1px solid rgba(255,180,84,.28);
  border-radius: 100px; padding: 6px 12px;
}

.hero h1 {
  font-size: clamp(1.75rem, 5.2vw, 2.75rem);
  font-weight: 700; margin-top: var(--space-3);
  em {
    font-style: normal;
    background: linear-gradient(96deg, var(--a2), var(--a) 65%, var(--a3));
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
}

.tagline { color: var(--dim); margin-top: var(--space-2); font-size: 1rem; }

.location {
  display: inline-flex; align-items: center; gap: 9px;
  margin-top: var(--space-3);
  font: 500 12px/1 var(--font-mono); color: #aab5b3;
  background: var(--surface); border: 1px solid var(--line);
  border-radius: 9px; padding: 9px 13px;
  .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--c-flow);
         box-shadow: 0 0 9px var(--c-flow); flex: none; }
}

.hero-actions {
  display: flex; flex-wrap: wrap; gap: var(--space-2); margin-top: var(--space-3);
}

.btn-primary, .btn-ghost {
  display: inline-flex; align-items: center; justify-content: center;
  min-height: 44px; padding: 11px 17px;
  border-radius: 9px; text-decoration: none;
  font: 600 13px/1 var(--font-sans);
}
.btn-primary { background: linear-gradient(96deg, var(--a2), var(--a)); color: #14100a; }
.btn-ghost   { background: var(--surface-2); border: 1px solid var(--line); color: var(--ink); }

.hero-links {
  display: flex; flex-wrap: wrap; gap: 8px; align-items: center;
  margin-top: var(--space-3);
  font: 500 12px/1.6 var(--font-mono); color: var(--dim);
  a { color: var(--dim); text-decoration: none; border-bottom: 1px solid rgba(255,180,84,.4);
      &:hover { color: var(--ink); } }
  span { opacity: .4; }
}
```

- [ ] **Step 7: Create the hero image so the import resolves**

The real compressed asset arrives in Task 9. For now copy the source so the build works:

```bash
cd /mnt/c/Users/Ramy/OneDrive/Documents/RamyLazghab-refresh
python3 -c "
from PIL import Image
im = Image.open('src/assets/img/meee.png').convert('RGB')
im.thumbnail((800, 1200), Image.LANCZOS)
im.save('src/assets/img/hero.jpg', 'JPEG', quality=82, optimize=True, progressive=True)
"
ls -la src/assets/img/hero.jpg
```

Expected: a file well under 200 KB.

- [ ] **Step 8: Render Hero from Home**

Replace `src/pages/Home.jsx`:

```jsx
import React from 'react';
import Hero from '../components/Hero';

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
```

- [ ] **Step 9: Run the tests**

```bash
CI=true npx react-scripts test --watchAll=false 2>&1 | tail -20
```

Expected: all PASS.

- [ ] **Step 10: Commit**

```bash
git add src
git -c user.name="Ramy Lazghab" -c user.email="ramy.lazghab@dauphine.eu" \
  commit -m "feat: add sticky header with mobile nav and rebuilt hero"
```

---

### Task 6: Experience section

The confidentiality-sensitive section. It is deliberately not clickable.

**Files:**
- Create: `src/components/Experience.jsx`, `src/components/Experience.scss`
- Modify: `src/pages/Home.jsx`

**Interfaces:**
- Consumes: `experience` from `src/content/experience`
- Produces: `Experience` default export rendering `<section id="experience">`

- [ ] **Step 1: Write the failing test**

Append to `src/__tests__/render.test.js`:

```js
describe('experience section', () => {
  test('renders both entries', () => {
    renderAt('/');
    expect(screen.getByRole('heading', { name: 'ORACLE' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'PIF AI' })).toBeInTheDocument();
  });

  test('entries are not links — there is deliberately no deeper page', () => {
    renderAt('/');
    const oracle = screen.getByRole('heading', { name: 'ORACLE' });
    expect(oracle.closest('a')).toBeNull();
    expect(screen.queryByText(/read case study/i)).toBeNull();
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

```bash
CI=true npx react-scripts test --watchAll=false -t "experience section" 2>&1 | tail -15
```

Expected: FAIL — heading not found.

- [ ] **Step 3: Write `src/components/Experience.jsx`**

```jsx
import React from 'react';
import experience from '../content/experience';
import './Experience.scss';

// Rendered as static content. No <Link>, no route, no "read more" —
// see the confidentiality note in src/content/experience.js.
export default function Experience() {
  return (
    <section className="experience section" id="experience">
      <div className="container">
        <p className="section-label"><i>//</i> Experience</p>

        <div className="experience-list">
          {experience.map((item) => (
            <article className="experience-item" key={item.id}>
              <header>
                <h3>{item.title}</h3>
                <p className="subtitle">{item.subtitle}</p>
              </header>

              <div className="experience-body">
                <p className="problem-label">The problem</p>
                <p className="problem">{item.problem}</p>

                <p className="problem-label">What I built</p>
                {item.role.map((para, i) => (
                  <p className="role" key={i}>{para}</p>
                ))}

                <div className="chip-row">
                  {item.tech.map((t) => (
                    <span className="chip" key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Write `src/components/Experience.scss`**

```scss
@use '../styles/mixins' as *;

.experience-list { display: grid; gap: var(--space-3); }

.experience-item {
  @include surface;
  padding: var(--space-3);
  @include bp(lg) {
    padding: var(--space-4);
    display: grid; grid-template-columns: 200px 1fr; gap: var(--space-4);
    align-items: start;
  }

  header h3 {
    font-size: 1.25rem; font-weight: 680;
    background: linear-gradient(96deg, var(--a2), var(--a) 70%, var(--a3));
    -webkit-background-clip: text; background-clip: text; color: transparent;
    width: fit-content;
  }
  header .subtitle {
    font: 500 11px/1.4 var(--font-mono);
    letter-spacing: .1em; text-transform: uppercase;
    color: var(--dim2); margin-top: 6px;
  }
}

.experience-body { margin-top: var(--space-3); @include bp(lg) { margin-top: 0; } }

.problem-label {
  font: 600 10px/1 var(--font-mono); letter-spacing: .16em; text-transform: uppercase;
  color: var(--a); margin-bottom: var(--space-1);
  &:not(:first-child) { margin-top: var(--space-3); }
}

.experience-body .problem,
.experience-body .role {
  color: var(--dim); font-size: .94rem; max-width: var(--measure);
  & + .role { margin-top: var(--space-2); }
}

.experience-body .chip-row { margin-top: var(--space-3); }
```

- [ ] **Step 5: Add it to `src/pages/Home.jsx`**

```jsx
import React from 'react';
import Hero from '../components/Hero';
import Experience from '../components/Experience';

export default function Home() {
  return (
    <main>
      <Hero />
      <Experience />
    </main>
  );
}
```

- [ ] **Step 6: Run the tests**

```bash
CI=true npx react-scripts test --watchAll=false 2>&1 | tail -20
```

Expected: all PASS, including the confidentiality guard.

- [ ] **Step 7: Commit**

```bash
git add src
git -c user.name="Ramy Lazghab" -c user.email="ramy.lazghab@dauphine.eu" \
  commit -m "feat: add non-clickable Experience section for confidential work"
```

---

### Task 7: Architecture glyphs, project cards and the Work section

**Files:**
- Create: `src/components/glyphs/TelecomPlusGlyph.jsx`, `MovieGlyph.jsx`, `AlzheimersGlyph.jsx`, `RAGeniusGlyph.jsx`, `index.js`
- Create: `src/components/DiagramLegend.jsx`, `src/components/ProjectCard.jsx`, `src/components/Work.jsx`, `src/components/Work.scss`
- Modify: `src/pages/Home.jsx`
- Delete: `src/components/Projects.jsx`, `src/components/Projects.scss`

**Interfaces:**
- Consumes: `caseStudies`, `moreProjects` from `src/content/projects`
- Produces: `getGlyph(name)` returning a component or `null`; `ProjectCard` taking `{ project }`; `Work` rendering `<section id="work">`

- [ ] **Step 1: Write the failing test**

Append to `src/__tests__/render.test.js`:

```js
describe('work section', () => {
  test('case studies link to their pages', () => {
    renderAt('/');
    const link = screen.getByRole('link', { name: /TelecomPlus/i });
    expect(link).toHaveAttribute('href', '/case-studies/telecomplus');
  });

  test('every original project is still listed', () => {
    renderAt('/');
    ['SportIQ', 'MoodSync', 'House Price Prediction', 'Diabetes Prediction',
     'Blended Learning Platform', 'Career Satisfaction Analysis',
     'Startup Investment Program', 'RAGenius'].forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  test('the diagram legend explains the colour code', () => {
    renderAt('/');
    expect(screen.getByText(/Retrieval & vector store/i)).toBeInTheDocument();
    expect(screen.getByText(/Agents & LLM/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

```bash
CI=true npx react-scripts test --watchAll=false -t "work section" 2>&1 | tail -15
```

Expected: FAIL.

- [ ] **Step 3: Write the glyphs**

Colours come only from the semantic set. `--a` must not appear.

Create `src/components/glyphs/TelecomPlusGlyph.jsx`:

```jsx
import React from 'react';

// user -> intent router -> {retrieval | SQL} -> judged answer
export default function TelecomPlusGlyph() {
  return (
    <svg viewBox="0 0 250 62" fill="none" role="img"
         aria-label="Question routed to either document retrieval or a SQL query, then evaluated">
      <circle cx="20" cy="31" r="11" stroke="var(--c-doc)" strokeOpacity=".85" />
      <circle cx="20" cy="27" r="3.5" stroke="var(--c-doc)" strokeOpacity=".6" />
      <path d="M15 35a5 5 0 0110 0" stroke="var(--c-doc)" strokeOpacity=".6" />
      <path d="M35 31h16" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />
      <path d="M68 19l12 12-12 12-12-12z" stroke="var(--c-agent)" strokeOpacity=".9" />
      <path d="M84 24h14M84 38h14" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />
      <rect x="104" y="10" width="44" height="18" rx="4" stroke="var(--c-store)" strokeOpacity=".9" />
      <rect x="104" y="34" width="44" height="18" rx="4" stroke="var(--c-store)" strokeOpacity=".55" />
      <path d="M111 19h12M111 43h16" stroke="var(--c-store)" strokeOpacity=".5" />
      <path d="M154 19h14v12h14M154 43h14v-12" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />
      <rect x="196" y="17" width="40" height="28" rx="6" stroke="var(--c-flow)" strokeOpacity=".9" />
      <path d="M206 31l6 7 12-14" stroke="var(--c-flow)" strokeWidth="1.6" />
    </svg>
  );
}
```

Create `src/components/glyphs/MovieGlyph.jsx`:

```jsx
import React from 'react';

// warehouse -> trained model -> served endpoint
export default function MovieGlyph() {
  return (
    <svg viewBox="0 0 250 62" fill="none" role="img"
         aria-label="Data warehouse feeding a trained model served as an API">
      <ellipse cx="34" cy="17" rx="22" ry="7" stroke="var(--c-doc)" strokeOpacity=".85" />
      <path d="M12 17v28c0 3.9 9.8 7 22 7s22-3.1 22-7V17" stroke="var(--c-doc)" strokeOpacity=".85" />
      <path d="M12 31c0 3.9 9.8 7 22 7s22-3.1 22-7" stroke="var(--c-doc)" strokeOpacity=".45" />
      <path d="M62 31h20" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />
      <rect x="88" y="16" width="46" height="30" rx="7" stroke="var(--c-model)" strokeOpacity=".9" />
      <path d="M98 38V26M108 38V20M118 38V30M128 38V23" stroke="var(--c-model)" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M140 31h20" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />
      <rect x="166" y="20" width="34" height="22" rx="5" stroke="var(--c-store)" strokeOpacity=".9" />
      <path d="M173 31h20M186 25l7 6-7 6" stroke="var(--c-store)" strokeOpacity=".7" />
      <path d="M206 31h16" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />
      <circle cx="234" cy="31" r="10" stroke="var(--c-flow)" strokeOpacity=".9" />
    </svg>
  );
}
```

Create `src/components/glyphs/AlzheimersGlyph.jsx`:

```jsx
import React from 'react';

// features -> ensemble of two models -> attributed prediction
export default function AlzheimersGlyph() {
  return (
    <svg viewBox="0 0 250 62" fill="none" role="img"
         aria-label="Features feeding an ensemble of two models with per-feature attribution">
      <rect x="10" y="14" width="26" height="34" rx="3" stroke="var(--c-doc)" strokeOpacity=".85" />
      <path d="M16 23h14M16 31h14M16 39h9" stroke="var(--c-doc)" strokeOpacity=".45" />
      <path d="M42 31h16v-12h14M42 31h16v12h14" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />
      <rect x="78" y="8" width="40" height="22" rx="4" stroke="var(--c-model)" strokeOpacity=".9" />
      <path d="M86 24V14M94 24V12M102 24V18M110 24V15" stroke="var(--c-model)" strokeWidth="2.4" strokeLinecap="round" />
      <rect x="78" y="34" width="40" height="22" rx="4" stroke="var(--c-agent)" strokeOpacity=".9" />
      <circle cx="88" cy="45" r="3" stroke="var(--c-agent)" strokeOpacity=".8" />
      <circle cx="100" cy="41" r="3" stroke="var(--c-agent)" strokeOpacity=".8" />
      <circle cx="100" cy="49" r="3" stroke="var(--c-agent)" strokeOpacity=".8" />
      <circle cx="110" cy="45" r="3" stroke="var(--c-agent)" strokeOpacity=".8" />
      <path d="M91 45h6M103 42l5 2M103 48l5-2" stroke="var(--c-agent)" strokeOpacity=".5" />
      <path d="M124 19h14v12h12M124 45h14v-12" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />
      <path d="M166 44h56M170 44V28M182 44V20M194 44V33M206 44V24M218 44V37"
            stroke="var(--c-model)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
```

Create `src/components/glyphs/RAGeniusGlyph.jsx`:

```jsx
import React from 'react';

// pdf + csv -> shared index -> local model -> answer
export default function RAGeniusGlyph() {
  return (
    <svg viewBox="0 0 250 62" fill="none" role="img"
         aria-label="PDF and CSV files indexed together and queried through a local model">
      <rect x="8" y="6" width="26" height="22" rx="3" stroke="var(--c-doc)" strokeOpacity=".85" />
      <path d="M13 14h16M13 20h11" stroke="var(--c-doc)" strokeOpacity=".45" />
      <rect x="8" y="34" width="26" height="22" rx="3" stroke="var(--c-doc)" strokeOpacity=".85" />
      <path d="M8 41h26M17 34v22M25 34v22" stroke="var(--c-doc)" strokeOpacity=".45" />
      <path d="M40 17h14v14h10M40 45h14V31" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />
      <circle cx="86" cy="31" r="14" stroke="var(--c-store)" strokeOpacity=".9" />
      <circle cx="86" cy="31" r="5" fill="var(--c-store)" fillOpacity=".5" />
      <path d="M104 31h18" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />
      <rect x="128" y="16" width="44" height="30" rx="7" stroke="var(--c-agent)" strokeOpacity=".9" />
      <path d="M138 31h6M152 26h10M152 36h10M138 26h2M138 36h2" stroke="var(--c-agent)" strokeOpacity=".6" />
      <path d="M178 31h16" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />
      <rect x="200" y="14" width="34" height="34" rx="4" stroke="var(--c-flow)" strokeOpacity=".85" />
      <path d="M207 24h20M207 31h20M207 38h13" stroke="var(--c-flow)" strokeOpacity=".55" />
    </svg>
  );
}
```

Create `src/components/glyphs/index.js`:

```js
import TelecomPlusGlyph from './TelecomPlusGlyph';
import MovieGlyph from './MovieGlyph';
import AlzheimersGlyph from './AlzheimersGlyph';
import RAGeniusGlyph from './RAGeniusGlyph';

const GLYPHS = {
  telecomplus: TelecomPlusGlyph,
  movie: MovieGlyph,
  alzheimers: AlzheimersGlyph,
  ragenius: RAGeniusGlyph,
};

export const getGlyph = (name) => GLYPHS[name] || null;
```

- [ ] **Step 4: Write `src/components/DiagramLegend.jsx`**

```jsx
import React from 'react';

const KEYS = [
  { token: 'var(--c-doc)',   label: 'Source documents' },
  { token: 'var(--c-store)', label: 'Retrieval & vector store' },
  { token: 'var(--c-agent)', label: 'Agents & LLM' },
  { token: 'var(--c-model)', label: 'Models & forecasts' },
  { token: 'var(--c-flow)',  label: 'Data flow' },
];

export default function DiagramLegend() {
  return (
    <div className="diagram-legend">
      {KEYS.map((k) => (
        <span className="legend-item" key={k.label}>
          <span className="swatch" style={{ background: k.token }} aria-hidden="true" />
          {k.label}
        </span>
      ))}
    </div>
  );
}
```

- [ ] **Step 5: Write `src/components/ProjectCard.jsx`**

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { getGlyph } from './glyphs';

export default function ProjectCard({ project, showGlyph = false }) {
  const Glyph = showGlyph ? getGlyph(project.architecture.glyph) : null;
  const body = (
    <>
      {Glyph && <div className="card-glyph"><Glyph /></div>}
      {project.context && <p className="card-tag">{project.context}</p>}
      <h3>{project.title}</h3>
      <p className="card-summary">{project.summary}</p>
      <div className="chip-row">
        {project.tech.slice(0, 4).map((t) => <span className="chip" key={t}>{t}</span>)}
      </div>
      {project.slug && <span className="card-cta">Read case study →</span>}
    </>
  );

  if (project.slug) {
    return (
      <Link className="project-card is-linked" to={`/case-studies/${project.slug}`}>
        {body}
      </Link>
    );
  }
  return <article className="project-card">{body}</article>;
}
```

- [ ] **Step 6: Write `src/components/Work.jsx`**

```jsx
import React from 'react';
import { caseStudies, moreProjects } from '../content/projects';
import ProjectCard from './ProjectCard';
import DiagramLegend from './DiagramLegend';
import './Work.scss';

export default function Work() {
  const flagship = caseStudies.filter((p) => p.tier === 1);
  const secondary = caseStudies.filter((p) => p.tier === 2);

  return (
    <section className="work section" id="work">
      <div className="container">
        <p className="section-label"><i>//</i> Selected work</p>
        <DiagramLegend />

        <div className="card-grid card-grid--wide">
          {flagship.map((p) => <ProjectCard key={p.title} project={p} showGlyph />)}
        </div>

        <div className="card-grid" style={{ marginTop: 'var(--space-3)' }}>
          {secondary.map((p) => <ProjectCard key={p.title} project={p} showGlyph />)}
        </div>

        <p className="section-label" style={{ marginTop: 'var(--space-5)' }}>
          <i>//</i> More projects
        </p>
        <div className="card-grid card-grid--compact">
          {moreProjects.map((p) => <ProjectCard key={p.title} project={p} />)}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 7: Write `src/components/Work.scss`**

```scss
@use '../styles/mixins' as *;

.diagram-legend {
  display: flex; flex-wrap: wrap; gap: var(--space-2) var(--space-3);
  padding: var(--space-2) var(--space-3);
  background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius);
  margin-bottom: var(--space-3);
  font: 500 11px/1 var(--font-sans); color: var(--dim);

  .legend-item { display: inline-flex; align-items: center; gap: 7px; }
  .swatch { width: 10px; height: 10px; border-radius: 3px; flex: none; }
}

.card-grid {
  display: grid; gap: var(--space-3); grid-template-columns: 1fr;
  @include bp(md) { grid-template-columns: repeat(2, 1fr); }
  @include bp(xl) { grid-template-columns: repeat(3, 1fr); }
}
.card-grid--wide  { @include bp(xl) { grid-template-columns: repeat(2, 1fr); } }
.card-grid--compact {
  gap: var(--space-2);
  @include bp(md) { grid-template-columns: repeat(2, 1fr); }
  @include bp(xl) { grid-template-columns: repeat(3, 1fr); }
}

.project-card {
  @include surface;
  padding: var(--space-3);
  display: block; text-decoration: none; color: inherit;
  transition: border-color .2s ease, transform .2s ease;

  &.is-linked:hover {
    border-color: rgba(255,180,84,.4);
    transform: translateY(-2px);
  }

  h3 { font-size: 1.05rem; font-weight: 650; margin-bottom: 5px; }

  .card-tag {
    font: 600 9.5px/1 var(--font-mono); letter-spacing: .15em;
    text-transform: uppercase; color: var(--a); margin-bottom: 7px;
  }

  .card-summary { font-size: .85rem; color: var(--dim); margin-bottom: var(--space-2); }

  .card-cta {
    display: block; margin-top: var(--space-2);
    font: 600 10.5px/1 var(--font-mono); color: var(--a);
  }
}

.card-glyph {
  height: 74px; margin-bottom: var(--space-2);
  background: rgba(255,255,255,.028);
  border: 1px solid rgba(255,255,255,.07);
  border-radius: var(--radius-sm);
  overflow: hidden;
  svg { width: 100%; height: 100%; }
}
```

- [ ] **Step 8: Add Work to Home and delete the old Projects component**

Add `import Work from '../components/Work';` and `<Work />` after `<Experience />` in `src/pages/Home.jsx`, then:

```bash
git rm src/components/Projects.jsx src/components/Projects.scss
```

- [ ] **Step 9: Verify accent colour never leaked into a glyph**

The accent is reserved for chrome. A glyph may only use `--c-doc`, `--c-store`, `--c-agent`, `--c-model` and `--c-flow`.

```bash
grep -rnoE "var\(--a[0-9]?\)" src/components/glyphs/ && echo "LEAK — replace with a --c-* token" || echo "clean"
```

Expected: `clean`. Note `var(--c-model)` is `#ffb454`, the same hex as the accent — that is intentional and correct: inside a diagram it means *models and forecasts*, not identity. The token name is what matters.

- [ ] **Step 10: Run the tests**

```bash
CI=true npx react-scripts test --watchAll=false 2>&1 | tail -20
```

Expected: all PASS.

- [ ] **Step 11: Commit**

```bash
git add src
git add -u
git -c user.name="Ramy Lazghab" -c user.email="ramy.lazghab@dauphine.eu" \
  commit -m "feat: add architecture glyphs, project cards and Work section"
```

---

### Task 8: Case study page

**Files:**
- Rewrite: `src/pages/CaseStudy.jsx`
- Create: `src/pages/CaseStudy.scss`

**Interfaces:**
- Consumes: `getProject`, `caseStudies`, `getGlyph`
- Produces: full case-study rendering; sections appear only when their data exists

- [ ] **Step 1: Write the failing test**

Append to `src/__tests__/render.test.js`:

```js
describe('case study page', () => {
  test('tier 1 renders every deep section', () => {
    renderAt('/case-studies/telecomplus');
    ['Problem', 'Architecture', 'Pipeline', 'Technologies', 'Challenges', 'Results', 'Lessons learned']
      .forEach((h) => expect(screen.getByRole('heading', { name: new RegExp(h, 'i') })).toBeInTheDocument());
  });

  test('tier 2 omits pipeline and challenges rather than showing empty sections', () => {
    renderAt('/case-studies/ragenius');
    expect(screen.queryByRole('heading', { name: /^Pipeline$/i })).toBeNull();
    expect(screen.queryByRole('heading', { name: /^Challenges$/i })).toBeNull();
    expect(screen.getByRole('heading', { name: /^Results$/i })).toBeInTheDocument();
  });

  test('no screenshot section when there are no images', () => {
    renderAt('/case-studies/telecomplus');
    expect(screen.queryByRole('heading', { name: /screenshot/i })).toBeNull();
    expect(screen.queryByText(/TODO/i)).toBeNull();
  });

  test('a project without a repo shows no repo link', () => {
    renderAt('/case-studies/alzheimers');
    expect(screen.queryByRole('link', { name: /view repository/i })).toBeNull();
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

```bash
CI=true npx react-scripts test --watchAll=false -t "case study page" 2>&1 | tail -15
```

Expected: FAIL.

- [ ] **Step 3: Write `src/pages/CaseStudy.jsx`**

```jsx
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProject, caseStudies } from '../content/projects';
import { getGlyph } from '../components/glyphs';
import DiagramLegend from '../components/DiagramLegend';
import './CaseStudy.scss';

export default function CaseStudy() {
  const { slug } = useParams();
  const project = getProject(slug);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  useEffect(() => {
    document.title = project
      ? `${project.title} — Case study | Ramy Lazghab`
      : 'Not found | Ramy Lazghab';
  }, [project]);

  if (!project) {
    return (
      <main className="container section">
        <h1>Not found</h1>
        <p className="cs-lede">That case study doesn’t exist.</p>
        <Link className="cs-back" to="/">← Back to the homepage</Link>
      </main>
    );
  }

  const Glyph = getGlyph(project.architecture.glyph);
  const index = caseStudies.findIndex((p) => p.slug === slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <main className="case-study">
      <div className="container">
        <Link className="cs-back" to="/#work">← All work</Link>

        <header className="cs-header">
          {project.context && <p className="cs-context">{project.context}</p>}
          <h1>{project.title}</h1>
          <p className="cs-lede">{project.subtitle}</p>
          <div className="chip-row">
            {project.tech.map((t) => <span className="chip" key={t}>{t}</span>)}
          </div>
          {project.links.repo && (
            <a className="cs-repo" href={project.links.repo} target="_blank" rel="noreferrer">
              View repository ↗
            </a>
          )}
        </header>

        <section className="cs-section">
          <h2>Problem</h2>
          <p>{project.problem}</p>
        </section>

        <section className="cs-section">
          <h2>Architecture</h2>
          {Glyph && (
            <>
              <div className="cs-glyph"><Glyph /></div>
              <DiagramLegend />
            </>
          )}
          <p>{project.architecture.description}</p>
        </section>

        {project.pipeline.length > 0 && (
          <section className="cs-section">
            <h2>Pipeline</h2>
            <ol className="cs-pipeline">
              {project.pipeline.map((s) => (
                <li key={s.step}>
                  <span className="cs-step">{s.step}</span>
                  <span className="cs-detail">{s.detail}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        <section className="cs-section">
          <h2>Technologies</h2>
          <div className="chip-row">
            {project.tech.map((t) => <span className="chip" key={t}>{t}</span>)}
          </div>
        </section>

        {project.challenges.length > 0 && (
          <section className="cs-section">
            <h2>Challenges</h2>
            {project.challenges.map((c) => (
              <div className="cs-challenge" key={c.title}>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </section>
        )}

        {project.results.length > 0 && (
          <section className="cs-section">
            <h2>Results</h2>
            <ul className="cs-results">
              {project.results.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </section>
        )}

        {/* Screenshots render only when images exist. Never a placeholder box.
            To add: put files in src/assets/img/ and list their imports in
            the project's `images` array in src/content/projects.js. */}
        {project.images.length > 0 && (
          <section className="cs-section">
            <h2>Screenshots</h2>
            <div className="cs-shots">
              {project.images.map((img) => (
                <img key={img.src} src={img.src} alt={img.alt} loading="lazy" />
              ))}
            </div>
          </section>
        )}

        {project.lessons && (
          <section className="cs-section">
            <h2>Lessons learned</h2>
            <p>{project.lessons}</p>
          </section>
        )}

        <nav className="cs-next">
          <Link to={`/case-studies/${next.slug}`}>
            Next case study <strong>{next.title}</strong> →
          </Link>
        </nav>
      </div>
    </main>
  );
}
```

- [ ] **Step 4: Write `src/pages/CaseStudy.scss`**

```scss
@use '../styles/mixins' as *;

.case-study { padding-block: var(--space-4) var(--space-6); }

.cs-back {
  display: inline-block; margin-bottom: var(--space-4);
  font: 600 11px/1 var(--font-mono); color: var(--dim); text-decoration: none;
  &:hover { color: var(--a); }
}

.cs-header {
  padding-bottom: var(--space-4); border-bottom: 1px solid var(--line);
  margin-bottom: var(--space-4);

  h1 {
    font-size: clamp(1.75rem, 5vw, 2.5rem); font-weight: 700; margin-block: var(--space-1);
    background: linear-gradient(96deg, var(--a2), var(--a) 70%, var(--a3));
    -webkit-background-clip: text; background-clip: text; color: transparent;
    width: fit-content;
  }
}

.cs-context {
  font: 600 10px/1 var(--font-mono); letter-spacing: .16em;
  text-transform: uppercase; color: var(--dim2);
}

.cs-lede { color: var(--dim); font-size: 1.05rem; margin-bottom: var(--space-3); }

.cs-repo {
  display: inline-block; margin-top: var(--space-3);
  font: 600 12px/1 var(--font-mono); color: var(--a); text-decoration: none;
  border: 1px solid rgba(255,180,84,.35); border-radius: var(--radius-sm);
  padding: 10px 13px; min-height: 44px; line-height: 24px;
}

.cs-section {
  margin-bottom: var(--space-5);

  h2 {
    font: 600 11px/1 var(--font-mono); letter-spacing: .18em;
    text-transform: uppercase; color: var(--a); margin-bottom: var(--space-2);
  }
  > p { color: var(--dim); max-width: var(--measure); }
}

.cs-glyph {
  background: rgba(255,255,255,.028); border: 1px solid var(--line);
  border-radius: var(--radius); padding: var(--space-3); margin-bottom: var(--space-3);
  svg { width: 100%; height: auto; max-height: 130px; display: block; }
}

.cs-pipeline {
  list-style: none; counter-reset: step; padding: 0; margin: 0;
  display: grid; gap: var(--space-2); max-width: var(--measure);

  li {
    counter-increment: step;
    display: grid; grid-template-columns: 28px 1fr; gap: var(--space-2);
    padding: var(--space-2); background: var(--surface);
    border: 1px solid var(--line); border-radius: var(--radius-sm);

    &::before {
      content: counter(step, decimal-leading-zero);
      font: 600 10px/1.6 var(--font-mono); color: var(--a);
    }
  }
  .cs-step { display: block; font-weight: 620; font-size: .92rem; }
  .cs-detail { display: block; color: var(--dim); font-size: .85rem; margin-top: 3px; }
  li > span:not(.cs-step) { grid-column: 2; }
  li .cs-step { grid-column: 2; }
}

.cs-challenge {
  @include surface;
  padding: var(--space-3); margin-bottom: var(--space-2); max-width: var(--measure);
  h3 { font-size: 1rem; font-weight: 640; margin-bottom: var(--space-1); color: var(--ink); }
  p  { color: var(--dim); font-size: .92rem; }
}

.cs-results {
  margin: 0; padding-left: 1.1rem; color: var(--dim); max-width: var(--measure);
  li { margin-bottom: var(--space-1); &::marker { color: var(--a); } }
}

.cs-shots {
  display: grid; gap: var(--space-2); grid-template-columns: 1fr;
  @include bp(lg) { grid-template-columns: repeat(2, 1fr); }
  img { width: 100%; border-radius: var(--radius); border: 1px solid var(--line); display: block; }
}

.cs-next {
  border-top: 1px solid var(--line); padding-top: var(--space-3);
  a { font: 500 13px/1 var(--font-mono); color: var(--dim); text-decoration: none;
      strong { color: var(--a); font-weight: 600; }
      &:hover { color: var(--ink); } }
}
```

- [ ] **Step 5: Run the tests**

```bash
CI=true npx react-scripts test --watchAll=false 2>&1 | tail -20
```

Expected: all PASS.

- [ ] **Step 6: Commit**

```bash
git add src
git -c user.name="Ramy Lazghab" -c user.email="ramy.lazghab@dauphine.eu" \
  commit -m "feat: add full case-study page with conditional sections"
```

---

### Task 9: Remaining homepage sections

**Files:**
- Rewrite: `src/components/Skills.jsx`, `src/components/Skills.scss`, `src/components/About.jsx`, `src/components/About.scss`, `src/components/Contact.jsx`, `src/components/Contact.scss`, `src/components/Footer.jsx`
- Create: `src/components/Credentials.jsx`, `src/components/Credentials.scss`, `src/components/Footer.scss`
- Modify: `src/pages/Home.jsx`

**Interfaces:**
- Consumes: `site`
- Produces: `Skills`, `About`, `Credentials`, `Contact`, `Footer` default exports with ids `#skills #about #certifications #contact`

- [ ] **Step 1: Write the failing test**

Append to `src/__tests__/render.test.js`:

```js
describe('remaining sections', () => {
  test('skills show the CV positioning keywords the old site was missing', () => {
    renderAt('/');
    ['LangGraph', 'Qdrant', 'MCP', 'MLflow', 'LightGBM'].forEach((kw) =>
      expect(screen.getByText(kw)).toBeInTheDocument()
    );
  });

  test('certifications link to the real credentials', () => {
    renderAt('/');
    expect(screen.getByRole('link', { name: /LangChain Academy/i }))
      .toHaveAttribute('href', 'https://academy.langchain.com/certificates/nqrsewnhol');
    expect(screen.getByRole('link', { name: /BigQuery ML/i }))
      .toHaveAttribute('href', expect.stringContaining('credly.com/badges/9ec1dc8b'));
  });

  test('achievements are listed without claiming an unearned placement', () => {
    renderAt('/');
    expect(screen.getByText(/RAISE Summit AI Hackathon/i)).toBeInTheDocument();
    expect(screen.getByText(/IEEE Xtreme 15\.0 & 16\.0/i)).toBeInTheDocument();
    expect(screen.getByText(/EY Hack for Smart Insurance/i)).toBeInTheDocument();
  });

  test('contact email matches the displayed address', () => {
    renderAt('/');
    const mail = screen.getByRole('link', { name: /ramy\.lazghab@dauphine\.eu/i });
    expect(mail).toHaveAttribute('href', 'mailto:ramy.lazghab@dauphine.eu');
  });
});
```

- [ ] **Step 2: Run it to verify it fails**

```bash
CI=true npx react-scripts test --watchAll=false -t "remaining sections" 2>&1 | tail -15
```

Expected: FAIL.

- [ ] **Step 3: Write `src/components/Skills.jsx`**

```jsx
import React from 'react';
import site from '../content/site';
import './Skills.scss';

export default function Skills() {
  return (
    <section className="skills section" id="skills">
      <div className="container">
        <p className="section-label"><i>//</i> Skills</p>
        {site.skills.map((group) => (
          <div className="skill-group" key={group.group}>
            <h3>{group.group}</h3>
            <div className="chip-row">
              {group.items.map((item) => <span className="chip" key={item}>{item}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Write `src/components/Skills.scss`**

```scss
.skill-group {
  margin-bottom: var(--space-3);
  h3 {
    font: 600 10px/1 var(--font-mono); letter-spacing: .14em;
    text-transform: uppercase; color: var(--a); margin-bottom: var(--space-2);
  }
  .chip { font-family: var(--font-sans); font-size: 12px; padding: 7px 10px; }
}
```

- [ ] **Step 5: Write `src/components/About.jsx`**

`aboutmee.jpg` is 301×1000 — a very narrow strip. It must be constrained with `object-fit: cover` or it will distort.

```jsx
import React from 'react';
import site from '../content/site';
import aboutPhoto from '../assets/img/aboutmee.jpg';
import './About.scss';

export default function About() {
  return (
    <section className="about section" id="about">
      <div className="container about-inner">
        <div className="about-photo">
          <img src={aboutPhoto} alt="Ramy Lazghab" loading="lazy" />
        </div>
        <div className="about-text">
          <p className="section-label"><i>//</i> About</p>
          {site.about.map((para, i) => <p key={i}>{para}</p>)}
          <p className="about-languages">{site.languages}</p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Write `src/components/About.scss`**

```scss
@use '../styles/mixins' as *;

.about-inner {
  display: grid; gap: var(--space-4); grid-template-columns: 1fr;
  @include bp(lg) { grid-template-columns: 260px 1fr; align-items: start; }
}

.about-photo {
  max-width: 220px; justify-self: center;
  @include bp(lg) { max-width: none; justify-self: stretch; }
  img {
    width: 100%; aspect-ratio: 3 / 4; object-fit: cover; object-position: center;
    display: block; border-radius: var(--radius); border: 1px solid var(--line);
  }
}

.about-text {
  p { color: var(--dim); max-width: var(--measure); }
  p + p { margin-top: var(--space-2); }
}

.about-languages {
  margin-top: var(--space-3) !important;
  font: 500 12px/1.6 var(--font-mono); color: var(--dim2) !important;
}
```

- [ ] **Step 7: Write `src/components/Credentials.jsx`**

```jsx
import React from 'react';
import site from '../content/site';
import './Credentials.scss';

export default function Credentials() {
  return (
    <section className="credentials section" id="certifications">
      <div className="container">
        <p className="section-label"><i>//</i> Certifications</p>
        <div className="cert-grid">
          {site.certifications.map((c) => (
            <a className="cert" key={c.name} href={c.url} target="_blank" rel="noreferrer">
              <span className="cert-mark" aria-hidden="true">{c.mark}</span>
              <span>
                <strong>{c.name}</strong>
                <em>{c.issuer}</em>
              </span>
            </a>
          ))}
        </div>

        <p className="section-label" style={{ marginTop: 'var(--space-5)' }}>
          <i>//</i> Hackathons &amp; achievements
        </p>
        <ul className="achievements">
          {site.achievements.map((a) => (
            <li key={a.title}>
              <span className={`badge ${a.result === '3rd place' || a.result === 'Winner' ? 'is-won' : ''}`}>
                {a.result}
              </span>
              <span className="ach-body">
                {a.url
                  ? <a href={a.url} target="_blank" rel="noreferrer"><strong>{a.title}</strong></a>
                  : <strong>{a.title}</strong>}
                {a.detail && <span className="ach-detail"> · {a.detail}</span>}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 8: Write `src/components/Credentials.scss`**

```scss
@use '../styles/mixins' as *;

.cert-grid {
  display: grid; gap: var(--space-2); grid-template-columns: 1fr;
  @include bp(md) { grid-template-columns: repeat(2, 1fr); }
}

.cert {
  @include surface;
  display: flex; align-items: center; gap: var(--space-2);
  padding: var(--space-2) var(--space-3); min-height: 64px;
  text-decoration: none; color: inherit;
  &:hover { border-color: rgba(255,180,84,.4); }

  .cert-mark {
    width: 34px; height: 34px; flex: none;
    display: grid; place-items: center; border-radius: var(--radius-sm);
    background: rgba(255,180,84,.14); border: 1px solid rgba(255,180,84,.3);
    font: 700 11px/1 var(--font-mono); color: var(--a);
  }
  strong { display: block; font-size: .95rem; font-weight: 620; }
  em { display: block; font-style: normal; font-size: .78rem; color: var(--dim); margin-top: 2px; }
}

.achievements {
  list-style: none; margin: 0; padding: 0;
  li {
    display: flex; align-items: baseline; gap: var(--space-2);
    padding: var(--space-2) 0; border-bottom: 1px solid var(--line);
    flex-wrap: wrap;
    &:last-child { border-bottom: none; }
  }
  .badge {
    flex: none;
    font: 700 9.5px/1 var(--font-mono); letter-spacing: .08em; text-transform: uppercase;
    border: 1px solid var(--line); border-radius: 4px; padding: 6px 8px; color: var(--dim);
    &.is-won { background: linear-gradient(96deg, var(--a2), var(--a)); color: #14100a; border-color: transparent; }
  }
  .ach-body { font-size: .92rem; }
  .ach-body a { color: inherit; text-decoration: none; border-bottom: 1px solid rgba(255,180,84,.4); }
  .ach-detail { color: var(--dim); font-size: .85rem; }
}
```

- [ ] **Step 9: Write `src/components/Contact.jsx`**

Note the bug being fixed: the old file linked `mailto:…@dauphine.tn` while displaying `.eu`.

```jsx
import React from 'react';
import site from '../content/site';
import './Contact.scss';

export default function Contact() {
  const cv = `${process.env.PUBLIC_URL}${site.links.cv}`;
  return (
    <section className="contact section" id="contact">
      <div className="container contact-inner">
        <div>
          <p className="section-label"><i>//</i> Contact</p>
          <p className="contact-email">
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
        <div className="contact-actions">
          <a className="btn-primary" href={cv} download="Ramy_Lazghab_CV.pdf">Download CV (PDF)</a>
          <a className="btn-ghost" href={site.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="btn-ghost" href={site.links.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 10: Write `src/components/Contact.scss`**

```scss
@use '../styles/mixins' as *;

.contact { border-top: 1px solid var(--line); }

.contact-inner {
  display: flex; flex-direction: column; gap: var(--space-3);
  @include bp(lg) { flex-direction: row; align-items: center; justify-content: space-between; }
}

.contact-email {
  font-size: clamp(1.1rem, 3.5vw, 1.6rem); font-weight: 650; letter-spacing: -.02em;
  a { text-decoration: none; border-bottom: 2px solid rgba(255,180,84,.55);
      &:hover { border-color: var(--a); } }
}

.contact-actions { display: flex; flex-wrap: wrap; gap: var(--space-2); }
```

- [ ] **Step 11: Write `src/components/Footer.jsx` and `Footer.scss`**

```jsx
import React from 'react';
import site from '../content/site';
import './Footer.scss';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span className="footer-role">{site.role}</span>
      </div>
    </footer>
  );
}
```

```scss
@use '../styles/mixins' as *;

.site-footer { border-top: 1px solid var(--line); padding-block: var(--space-3); }

.footer-inner {
  display: flex; flex-wrap: wrap; gap: var(--space-2);
  justify-content: space-between; align-items: center;
  font: 500 11px/1.6 var(--font-mono); color: var(--dim2);
}
```

- [ ] **Step 12: Assemble the full homepage**

Replace `src/pages/Home.jsx`:

```jsx
import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Experience from '../components/Experience';
import Work from '../components/Work';
import Skills from '../components/Skills';
import About from '../components/About';
import Credentials from '../components/Credentials';
import Contact from '../components/Contact';

export default function Home() {
  useEffect(() => {
    document.title =
      'Ramy Lazghab — AI & Machine Learning Engineer | LLMs, Agentic AI, RAG';
  }, []);

  return (
    <main>
      <Hero />
      <Experience />
      <Work />
      <Skills />
      <About />
      <Credentials />
      <Contact />
    </main>
  );
}
```

- [ ] **Step 13: Run the tests**

```bash
CI=true npx react-scripts test --watchAll=false 2>&1 | tail -25
```

Expected: all PASS.

- [ ] **Step 14: Commit**

```bash
git add src
git -c user.name="Ramy Lazghab" -c user.email="ramy.lazghab@dauphine.eu" \
  commit -m "feat: add skills, about, credentials, contact and footer sections"
```

---

### Task 10: Assets, SEO metadata and CV

**Files:**
- Create: `scripts/prepare_assets.py`
- Replace: `public/favicon.ico`, `public/assets/Resume.pdf`
- Create: `public/favicon-32.png`, `public/apple-touch-icon.png`, `public/og-image.png`
- Modify: `public/index.html`, `public/manifest.json`, `public/robots.txt`
- Delete: `public/icon.ico`

**Interfaces:**
- Consumes: `src/assets/img/meee.png`, `src/assets/img/cyberpunkme.png`
- Produces: compressed hero image, favicons, OG image, full SEO head

- [ ] **Step 1: Write the asset pipeline script**

Create `scripts/prepare_assets.py`:

```python
"""Regenerates derived image assets. Run from the repo root:  python3 scripts/prepare_assets.py"""
from PIL import Image
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
IMG = ROOT / "src" / "assets" / "img"
PUB = ROOT / "public"


def hero():
    """4 MB PNG -> progressive JPEG under 200 KB. Invisible at render size."""
    im = Image.open(IMG / "meee.png").convert("RGB")
    im.thumbnail((800, 1200), Image.LANCZOS)
    out = IMG / "hero.jpg"
    im.save(out, "JPEG", quality=82, optimize=True, progressive=True)
    print(f"hero.jpg  {out.stat().st_size // 1024} KB  {im.size}")


def square_face(src, size):
    """Crop a square from the upper portion, where a portrait's face sits."""
    im = Image.open(src).convert("RGB")
    w, h = im.size
    side = min(w, h)
    left = (w - side) // 2
    top = int(h * 0.06)                      # bias upward toward the face
    top = min(top, max(0, h - side))
    return im.crop((left, top, left + side, top + side)).resize((size, size), Image.LANCZOS)


def favicons():
    src = IMG / "cyberpunkme.png"
    square_face(src, 32).save(PUB / "favicon-32.png", "PNG", optimize=True)
    square_face(src, 180).save(PUB / "apple-touch-icon.png", "PNG", optimize=True)
    square_face(src, 64).save(
        PUB / "favicon.ico", "ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)]
    )
    print("favicons written")


def og_image():
    """1200x630 social card: portrait on the right, dark amber ground on the left."""
    card = Image.new("RGB", (1200, 630), (11, 13, 14))
    portrait = square_face(IMG / "cyberpunkme.png", 630)
    card.paste(portrait, (570, 0))
    card.save(PUB / "og-image.png", "PNG", optimize=True)
    print("og-image.png written")


if __name__ == "__main__":
    hero()
    favicons()
    og_image()
```

- [ ] **Step 2: Run it and verify the sizes**

```bash
cd /mnt/c/Users/Ramy/OneDrive/Documents/RamyLazghab-refresh
python3 scripts/prepare_assets.py
ls -la src/assets/img/hero.jpg public/favicon.ico public/favicon-32.png public/apple-touch-icon.png public/og-image.png
```

Expected: `hero.jpg` under 200 KB and all five files present.

- [ ] **Step 3: Visually confirm the favicon crop caught the face**

Open `public/apple-touch-icon.png` and look at it. If the face is cut off, adjust the `0.06` factor in `square_face` — lower moves the crop up — and re-run. Do not skip this; a mis-cropped favicon is a visible defect.

- [ ] **Step 4: Install the CV**

```bash
cp /mnt/c/Users/Ramy/Downloads/resume/RamyLazghabEN1.pdf public/assets/Resume.pdf
ls -la public/assets/Resume.pdf
git rm public/icon.ico
```

Expected: roughly 148 KB.

- [ ] **Step 5: Write the full `public/index.html`**

Keep the SPA decoder script added in Task 4.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#0b0d0e" />

    <title>Ramy Lazghab — AI &amp; Machine Learning Engineer | LLMs, Agentic AI, RAG</title>
    <meta name="description" content="Ramy Lazghab is an AI Engineer and Machine Learning Engineer in Paris, building production AI systems with LLMs, Generative AI, Agentic AI, LangGraph and RAG. Case studies in multi-agent orchestration, document intelligence and forecasting." />
    <link rel="canonical" href="https://rblaze23.github.io/RamyLazghab/" />

    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" sizes="any" />
    <link rel="icon" type="image/png" sizes="32x32" href="%PUBLIC_URL%/favicon-32.png" />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/apple-touch-icon.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://rblaze23.github.io/RamyLazghab/" />
    <meta property="og:title" content="Ramy Lazghab — AI &amp; Machine Learning Engineer" />
    <meta property="og:description" content="Production AI systems built on LLMs, agentic AI and RAG. Case studies in multi-agent orchestration, document intelligence and forecasting." />
    <meta property="og:image" content="https://rblaze23.github.io/RamyLazghab/og-image.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Ramy Lazghab — AI &amp; Machine Learning Engineer" />
    <meta name="twitter:description" content="Production AI systems built on LLMs, agentic AI and RAG." />
    <meta name="twitter:image" content="https://rblaze23.github.io/RamyLazghab/og-image.png" />

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Ramy Lazghab",
      "jobTitle": "AI & Machine Learning Engineer",
      "email": "mailto:ramy.lazghab@dauphine.eu",
      "url": "https://rblaze23.github.io/RamyLazghab/",
      "address": { "@type": "PostalAddress", "addressLocality": "Paris", "addressCountry": "FR" },
      "alumniOf": [
        { "@type": "CollegeOrUniversity", "name": "Université Paris Dauphine — PSL" },
        { "@type": "CollegeOrUniversity", "name": "Faculty of Sciences of Tunis" }
      ],
      "knowsAbout": ["Large Language Models", "Generative AI", "Agentic AI", "LangGraph",
                     "Retrieval-Augmented Generation", "Machine Learning", "MLOps"],
      "sameAs": ["https://github.com/Rblaze23",
                 "https://www.linkedin.com/in/ramy-lazghab-1464a8201/"]
    }
    </script>

    <script>
      // Decodes the redirect written by 404.html back into a real path.
      (function (l) {
        if (l.search[1] === '/') {
          var decoded = l.search.slice(1).split('&').map(function (s) {
            return s.replace(/~and~/g, '&');
          }).join('?');
          window.history.replaceState(null, null, l.pathname.slice(0, -1) + decoded + l.hash);
        }
      })(window.location);
    </script>
  </head>
  <body>
    <noscript>You need to enable JavaScript to view this portfolio.</noscript>
    <div id="root"></div>
  </body>
</html>
```

- [ ] **Step 6: Write `public/manifest.json`**

```json
{
  "short_name": "Ramy Lazghab",
  "name": "Ramy Lazghab — AI & Machine Learning Engineer",
  "icons": [
    { "src": "favicon.ico", "sizes": "16x16 32x32 48x48 64x64", "type": "image/x-icon" },
    { "src": "favicon-32.png", "type": "image/png", "sizes": "32x32" },
    { "src": "apple-touch-icon.png", "type": "image/png", "sizes": "180x180" }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#0b0d0e",
  "background_color": "#0b0d0e"
}
```

- [ ] **Step 7: Write `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://rblaze23.github.io/RamyLazghab/sitemap.xml
```

- [ ] **Step 8: Create `public/sitemap.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://rblaze23.github.io/RamyLazghab/</loc><priority>1.0</priority></url>
  <url><loc>https://rblaze23.github.io/RamyLazghab/case-studies/telecomplus</loc><priority>0.8</priority></url>
  <url><loc>https://rblaze23.github.io/RamyLazghab/case-studies/movie-recommender</loc><priority>0.6</priority></url>
  <url><loc>https://rblaze23.github.io/RamyLazghab/case-studies/alzheimers</loc><priority>0.6</priority></url>
  <url><loc>https://rblaze23.github.io/RamyLazghab/case-studies/ragenius</loc><priority>0.6</priority></url>
</urlset>
```

- [ ] **Step 9: Build and verify the output**

```bash
npm run build 2>&1 | tail -6
grep -c "AI & Machine Learning Engineer" build/index.html
test -f build/og-image.png && test -f build/404.html && test -f build/assets/Resume.pdf \
  && echo "assets present" || echo "MISSING ASSETS"
```

Expected: `Compiled successfully`, a count of at least 1, and `assets present`.

- [ ] **Step 10: Commit**

```bash
git add public scripts src/assets
git add -u
git -c user.name="Ramy Lazghab" -c user.email="ramy.lazghab@dauphine.eu" \
  commit -m "feat: add asset pipeline, favicons, SEO metadata, sitemap and current CV"
```

---

### Task 11: Verification — build integrity, confidentiality and responsive layout

Nothing is claimed as working until it is observed working.

**Files:**
- Create: `docs/superpowers/plans/verification-2026-07-29.md` (evidence log)

**Interfaces:**
- Consumes: everything
- Produces: a written record of what was verified and screenshots at three viewports

- [ ] **Step 1: Full test suite**

```bash
CI=true npx react-scripts test --watchAll=false 2>&1 | tail -15
```

Expected: all suites pass. Record the exact counts.

- [ ] **Step 2: Production build**

```bash
npm run build 2>&1 | tail -12
```

Expected: `Compiled successfully`. Record any warnings.

- [ ] **Step 3: Confidentiality check against the built output**

This is the guard the spec requires. It checks the shipped bundle, not just the source.

```bash
grep -rioE "SCCS|EUR-Lex|CosIng|PubChem|PubMed|Google Trends|Product Information File|temporal validation|semantic chunking" build/ \
  && echo "LEAK DETECTED — do not deploy" || echo "no confidential terms in build"
```

Expected: `no confidential terms in build`.

- [ ] **Step 4: No visitor-facing TODO text**

```bash
grep -rioE "TODO|FIXME|lorem ipsum|placeholder" build/*.html build/static/js/*.js \
  | grep -v "\.map" | head
```

Expected: no output. Matches inside `.map` files are source-map comments and are acceptable, but nothing should appear in `index.html` or the JS bundle.

- [ ] **Step 5: Hero image weight**

```bash
find build/static/media -name "hero*" -exec ls -la {} \;
```

Expected: under 200 KB.

- [ ] **Step 6: Serve the build and check routes respond**

`serve` is not a project dependency, so `-y` is required to let npx fetch it. Start it with `run_in_background: true` rather than a shell `&`, so it survives across tool calls.

```bash
npx -y serve -s build -l 4173
```

Then, in a separate call, check every route. `serve -s` rewrites unknown paths to `index.html`, which is what a correctly configured SPA host does:

```bash
until curl -sf -o /dev/null http://localhost:4173/; do sleep 1; done
for p in "/" "/case-studies/telecomplus" "/case-studies/movie-recommender" \
         "/case-studies/alzheimers" "/case-studies/ragenius"; do
  printf "%-40s %s\n" "$p" "$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:4173$p")"
done
```

Expected: `200` for all five.

Note this verifies the React router, **not** the GitHub Pages 404 redirect — `serve -s` and GitHub Pages handle unknown paths differently. The `404.html` path can only be confirmed on the live site after deploy. Say so in the evidence log rather than implying it was tested.

- [ ] **Step 7: Screenshot each breakpoint with Chrome DevTools**

Using the chrome-devtools MCP tools: navigate to `http://localhost:4173/`, then for each of 375×812, 768×1024 and 1440×900, resize the page and take a screenshot. Repeat for `http://localhost:4173/case-studies/telecomplus`.

Check on each screenshot and record the answer:
- Is any content clipped or overflowing horizontally?
- On 375px: is the hamburger menu visible, and does the nav open when clicked?
- Do the architecture glyphs scale without clipping?
- Is body text comfortable, roughly 45–75 characters per line?

- [ ] **Step 8: Confirm no horizontal page scroll**

With DevTools open at 375px, evaluate:

```js
document.documentElement.scrollWidth <= window.innerWidth
```

Expected: `true`. If false, find the overflowing element and constrain it.

- [ ] **Step 9: Stop the server and write the evidence log**

```bash
pkill -f "serve -s build" || true
```

Create `docs/superpowers/plans/verification-2026-07-29.md` recording: test counts, build result, both grep results, hero size, the five HTTP codes, and the four screenshot observations. State plainly anything that failed or was not checked — including that the GitHub Pages `404.html` redirect is unverifiable until deploy.

- [ ] **Step 10: Commit**

```bash
git add docs
git -c user.name="Ramy Lazghab" -c user.email="ramy.lazghab@dauphine.eu" \
  commit -m "docs: record verification evidence for the portfolio refresh"
```

---

## Handover notes for Ramy

Not tasks — things to do after review.

1. **Deploy:** merge `portfolio-refresh` into `master`, then run `npm run deploy` from your normal folder. Nothing in this plan deploys.
2. **Remove the worktree** once merged: `git worktree remove ../RamyLazghab-refresh`.
3. **Alzheimer's Prediction has no public repo** — its card links nowhere. Supply one and add it to `links.repo` in `src/content/projects.js`.
4. **Three `// TODO: confirm exact number` markers** remain in `src/content/projects.js`. They render as qualitative text today; real numbers would strengthen those Results sections.
5. **Movie Recommender and MoodSync are GitHub forks** and display as such. Standalone repos would present better.
6. **`core.autocrlf` is unset** on this Windows machine, which makes every file appear fully modified after any Windows tool touches it. `git config core.autocrlf true` plus a `.gitattributes` would fix it.
7. **`main` branch risk:** it holds a Pages workflow that would deploy an empty site if the Pages source were ever switched to GitHub Actions. Worth deleting the workflow or populating the branch.
