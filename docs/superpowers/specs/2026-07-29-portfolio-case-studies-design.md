# Portfolio refresh — case studies, positioning, SEO

**Date:** 2026-07-29
**Branch:** `portfolio-refresh` (off `master`)
**Site:** https://rblaze23.github.io/RamyLazghab
**Author:** Ramy Lazghab

## Goal

Rebuild the portfolio so it supports a job search as an **AI & Machine Learning Engineer (LLMs, Agentic AI, RAG, production AI systems)**. Three things are missing today: the strongest projects aren't on the site at all, there are no case studies, and the skills list contradicts the CV positioning.

Success means a recruiter can land on the homepage, understand the positioning in ten seconds, and click into a case study that shows real system design. An ML practitioner reading the same page should find evidence of production judgement, not demos.

Professional work is presented separately from open projects. Confidentiality caps how much can be said about the former, so depth lives where it is safe to give it: the open-source projects.

## Constraints

1. **No invented metrics.** Every number must be defensible in an interview. Where a number would help but can't be verified, the source carries `// TODO: confirm exact number` and the page renders qualitative language. **No TODO text ever reaches a visitor's screen.**
2. **ORACLE and PIF AI are proprietary work projects and are deliberately vague.** Each is reduced to a problem statement and one short paragraph on role, plus a tech list. No pipeline steps, no named external data sources, no architecture breakdown, no challenge write-ups, no internal mechanics. The site says materially **less** than the CV: the CV is sent to one recruiter at a time, the site is public and indexed. Source files carry a comment marking this boundary so the detail is not expanded later by accident.
3. **Nothing is deleted.** All six existing projects stay, demoted to a *More projects* section rather than removed.
4. **Deploy stays manual.** Work lands on a branch; Ramy reviews, merges to `master`, and runs `npm run deploy`. The live site and the local `gh-pages` working tree are not touched.

## Current state

| Branch | Role |
| --- | --- |
| `master` | Source of truth. Create React App 5, React 19, SCSS, framer-motion, tsparticles |
| `gh-pages` | Published build output, produced by `npm run deploy` (`gh-pages -d build`) |
| `main` | Default branch. Holds only `README.md` and a Pages workflow that would publish an empty site if Pages ever switched source to GitHub Actions |

Homepage is a single scroll: Header → Hero → About → Projects → Skills → Contact. No router. Content is hardcoded inside JSX. Eight project cards, none of them the professional or flagship work.

**Known problems being fixed:**

- `<title>` is `Ramy Lazghab`; meta description is still `Web site created using create-react-app`
- `Skills.jsx` lists Java, C, R, React, Django, TensorFlow — and no LangChain, LangGraph, RAG, Qdrant, XGBoost, MCP, MLflow or Vertex AI
- `SectionIndicator.jsx` imports `../hooks/useScrollSection`, which does not exist in the repo. Dead code, removed
- `Contact.jsx` links `mailto:ramy.lazghab@dauphine.tn` while displaying `@dauphine.eu`. Fixed to `.eu`
- `public/assets/Resume.pdf` is stale; replaced with `RamyLazghabEN1.pdf`
- `meee.png` is 4 MB, used in the hero. Compressed to roughly 150 KB with Pillow

## Architecture

The central change is **separating content from presentation**. Case studies rendered as hardcoded JSX would duplicate layout eight times.

```
src/content/experience.js     ORACLE and PIF AI — homepage only, no routes
src/content/projects.js       single source of truth for open projects
src/content/site.js           name, headline, location, links, certifications, achievements
src/pages/Home.jsx
src/pages/CaseStudy.jsx       renders any project by slug
src/components/               presentation only, reads from content
src/components/glyphs/        one SVG architecture diagram per case-study project
src/styles/_tokens.scss       accent + semantic diagram colours
```

### Experience data model

Separate file, separate shape, no `slug` and no route — the structure itself prevents a confidential entry from ever acquiring a case-study page.

```js
{
  id: 'oracle',
  title: 'ORACLE',
  subtitle: 'Regulatory intelligence',
  problem: '',   // 2 sentences
  role: '',      // 1 short paragraph
  tech: []
}
```

### Project data model

```js
{
  slug: 'telecomplus',
  tier: 1,
  title: 'TelecomPlus',
  subtitle: 'Multi-agent customer support',
  summary: '',           // card text
  problem: '',
  architecture: { description: '', glyph: 'telecomplus' },
  pipeline: [{ step: '', detail: '' }],
  tech: [],
  challenges: [{ title: '', body: '' }],
  results: [],
  lessons: '',
  links: { repo: null, demo: null },
  images: []             // empty renders no screenshot section at all
}
```

`CaseStudy.jsx` renders sections conditionally on field presence. Tier 2 objects omit `pipeline`, `challenges` and `lessons`, so the same component produces the lighter treatment with no branching logic. Tier 3 objects appear only as cards on the homepage and have no route.

`images: []` means the screenshot section is **not rendered**. No placeholder boxes, no TODO text. When Ramy has screenshots he adds paths to the array and the section appears.

### Routing

`react-router-dom` v6 with `BrowserRouter basename="/RamyLazghab"`.

| Route | Renders |
| --- | --- |
| `/` | Home |
| `/case-studies/:slug` | CaseStudy, or redirect to `/` on unknown slug |

Four case-study routes exist: `telecomplus`, `movie-recommender`, `alzheimers`, `ragenius`. **ORACLE and PIF AI have no routes** — they live only on the homepage.

GitHub Pages returns 404 for direct requests to sub-paths of a SPA. Fixed with the standard `spa-github-pages` pair: a `public/404.html` that encodes the path into a query string and redirects, plus a decoder script in `index.html` that restores it via `history.replaceState`. This makes `rblaze23.github.io/RamyLazghab/case-studies/telecomplus` work when pasted cold into an application.

### Risk

`react-scripts` 5 is unmaintained and the repo's `node_modules` is stale. If `npm install` or `npm run build` fails with OpenSSL errors on Node 20, the fix is `NODE_OPTIONS=--openssl-legacy-provider`, not a migration to Vite. Migrating the build tool is out of scope.

## Visual design

Chosen through browser mockups. Blend of information-dense technical layout, amber-on-near-black palette, and modern surfaces.

### Tokens

```scss
--bg: #0b0d0e;   --ink: #e8eaed;   --dim: #94a09e;   --dim2: #6f7c7a;
--a:  #ffb454;   --a2:  #ffd79a;   --a3:  #e09338;    // accent: chrome only
```

Surfaces are `linear-gradient(165deg, rgba(255,255,255,.05), rgba(255,255,255,.012))` with `1px` light borders and 13px radii. Background carries two soft radial glows and a 46px grid at ~2% opacity. Mono (`ui-monospace`) for labels, tags, chips and nav; system sans for headings and body.

### Semantic diagram colours

Fixed across the entire site regardless of accent. **The accent colour never appears inside a diagram.** A visitor learns the code once on TelecomPlus and reads every subsequent diagram at a glance.

| Colour | Meaning |
| --- | --- |
| `#9aa5a4` grey | Source documents |
| `#38bdf8` cyan | Retrieval & vector store |
| `#a78bfa` violet | Agents & LLM |
| `#ffb454` amber | Models & forecasts |
| `#7ee787` green dashed | Data flow |
| `#7ee787` green | Live / validated |

A legend appears once on the homepage above the work section.

### Copy

- **Headline:** *I build end-to-end AI platforms: document intelligence, forecasting, multi-agent orchestration.*
- **Second line:** *Currently building regulatory intelligence systems for the cosmetics industry.* — deliberately names no employer, so the reader's attention lands on the work rather than on a company they don't recognise.
- **Location:** *Based in Paris, France. Open to relocation.* — preceded by a green status dot.

### Assets

- **Hero photo:** `meee.png`, compressed to ~150 KB, square crop at `center 20%`, amber border and radial glow
- **About photo:** `aboutmee.jpg`
- **Favicon:** `cyberpunkme.png` cropped tight to the face, generated at 16/32/180px
- **Removed:** floating crown SVGs, sparkle field, rotating cogs, `SectionIndicator.jsx` (imports a hook that does not exist), `ParticlesBackground.jsx` (verified unreferenced by any component), and the empty `Footer.jsx` (0 bytes) which is replaced by a real footer

### Responsive behaviour

The current site is only partially responsive. `Header.scss` and `Skills.scss` contain **no media queries at all**, so the fixed nav is untested on phones. Every existing breakpoint sits at 768px or 1024px with nothing below, and the codebase mixes seven `min-width` rules with one `max-width` rule, so the two approaches fight at the boundary.

The rebuild is **mobile-first throughout**, one consistent direction, with breakpoints at **375 / 640 / 768 / 1024 / 1440**.

| Element | Behaviour |
| --- | --- |
| Hero | Stacks vertically below 768px, photo above text; headline scales with `clamp()` |
| Nav | Collapses to a hamburger below 768px — new, there is nothing to collapse today |
| Project grid | 3 columns → 2 → 1 |
| Architecture glyphs | SVG with `viewBox`, scale to any width without clipping |
| Case-study body | Capped measure (~70ch) so text stays readable on wide monitors |
| Tap targets | Minimum 44×44px |

Recruiters routinely open portfolios on a phone, often straight from a LinkedIn message, so mobile is a primary target rather than a fallback. Verified by emulating real device sizes in Chrome DevTools and capturing screenshots at 375px, 768px and 1440px — not by inspection.

## Homepage

Order: **Hero → Experience → Selected work → Skills → About → Certifications → Achievements → Contact.**

Header is sticky: brand, section links, and a `Download CV` button. Hero carries CV, LinkedIn, GitHub and email above the fold.

**Experience** — ORACLE and PIF AI as rich, **non-clickable** entries carrying their full reduced text: subtitle, problem, role paragraph, tech chips. No `Read more` link, because there is deliberately no more to read. Placed immediately after the hero so professional work is the first thing seen, and visually distinct from the project cards below so a visitor understands these are employed work rather than side projects.

**Selected work** — one flagship glyph card (TelecomPlus), then three reduced cards (Movie Recommender, Alzheimer's, RAGenius), then a compact *More projects* grid holding all seven remaining projects: SportIQ, MoodSync, Startup Investment, House Prices, Diabetes, Career Satisfaction and Blended Learning.

Every one of the eight cards currently on the live site is accounted for: RAGenius is promoted to a Tier 2 case study, SportIQ and the other six appear in *More projects*. Nothing is dropped.

**Skills**, rebuilt from the CV:

| Group | Items |
| --- | --- |
| AI / ML & Frameworks | LLMs, RAG, Multi-Agent Systems, Prompt Engineering, LangChain, LangGraph, Hugging Face, PyTorch, TensorFlow, XGBoost, LightGBM |
| LLM Platforms & MLOps | Anthropic API, OpenAI API, MCP, LangSmith, Docker, Git, MLflow |
| Cloud & Data | GCP (Vertex AI, BigQuery, Cloud Run), Streamlit, Pandas, NumPy, Spark, PostgreSQL, Neo4j, FAISS, Qdrant |
| Programming | Python, SQL, Java, JavaScript, C, R |

**Certifications** — LangChain Academy (`academy.langchain.com/certificates/nqrsewnhol`) and Google Cloud BigQuery ML (`credly.com/badges/9ec1dc8b-494f-42ee-a314-ba30b40342de/public_url`).

**Achievements** — 3rd Place RAISE Summit AI Hackathon Paris; Winner Hack for Good (MoodSync); EY Hack for Smart Insurance (InsurAI, linked to its repo, stated as participation with no placement claimed); IEEE Xtreme 15.0 & 16.0.

## Experience entries — final copy

These two are **homepage only**. No route, no case-study page, no deeper version anywhere in the codebase. This is the complete text.

### ORACLE — Regulatory intelligence

> **Problem.** EU cosmetics regulation changes continuously, and the signals that indicate an ingredient is heading toward restriction are spread across a large volume of regulatory and scientific literature. Monitoring that by hand doesn't scale.
>
> **What I did.** I worked on an internal regulatory intelligence system that combines retrieval over a large document corpus with autonomous agents that gather public signals, feeding machine-learning models that forecast regulatory risk. I also worked on making the model output explainable, so specialists without an ML background could interpret and trust a prediction.
>
> `LangGraph` `RAG` `Qdrant` `XGBoost` `Anthropic API` `Streamlit`

### PIF AI — Document intelligence

> **Problem.** Producing regulatory compliance dossiers means reading scattered customer documents and assembling structured sections by hand — slow, repetitive work on a document that exists to be audited.
>
> **What I did.** I built an LLM-based document-understanding pipeline that drafts these dossiers automatically, with validation agents checking the generated content and a human review step for corrections. It shipped as part of the company's production web application.
>
> `Anthropic API` `LLM document understanding` `RAG` `Agents`

**Deliberately excluded from both:** pipeline steps, named external data sources, document counts, architecture breakdowns, challenge write-ups, internal mechanics, client names, and any figure describing scale or performance. Tech names are retained — they are industry-standard, already public on the CV, and describe capability rather than implementation.

## Case studies

Full treatment for **TelecomPlus**. Reduced (problem / architecture / technologies / results) for **Movie Recommender, Alzheimer's Prediction, RAGenius**. Card only for **SportIQ**.

Page structure: back link → title and subtitle → tech chips → Problem → Architecture (glyph + prose) → Pipeline → Technologies → Challenges → Results → Screenshots (only if `images` non-empty) → Lessons Learned → prev/next navigation.

### TelecomPlus (academic project, stated plainly)

Multi-agent customer support combining RAG and SQL routing, with LLM-as-a-Judge evaluation and Langfuse and MLflow tracking. Repo: `github.com/Rblaze23/Telecomplus-agent`.

**Challenge 1 — tables inside PDFs were destroying answer quality.** The corpus was largely PDF documentation where the answers users needed lived in tables: pricing tiers, plan comparisons, technical specs. Standard text extraction flattens a table into a stream of loose cell values, so retrieval returned chunks that were topically relevant but factually unusable, and the model produced confident wrong answers. Ingestion was changed to detect tables and render them as Markdown before chunking, preserving row and column relationships in a format the model reads natively. Answers moved from approximately correct to exact.

**Challenge 2 — routing between retrieval and SQL.** Some questions needed document retrieval, others a database query. The agent graph classifies intent first and routes accordingly. LLM-as-a-Judge evaluation with Langfuse and MLflow tracking measured whether changes actually improved answers rather than relying on spot checks.

### Repository links

| Project | Repo |
| --- | --- |
| ORACLE, PIF AI | none — proprietary |
| TelecomPlus | `Telecomplus-agent` |
| Movie Recommender | `GCP-Personalized-Movie-Recommendation-System` (fork) |
| Alzheimer's Prediction | none found — ships without a link |
| RAGenius | `RAGenius` |
| SportIQ | `SportiQ` |
| MoodSync | `MoodSync` (fork) |
| Startup Investment | `Predicting-Profitable-Startups` |
| House Prices | `House-Prices-Prediction` |
| Diabetes | `Diabetes-Diagnosis` |
| Career Satisfaction | `Academic-Path-and-Career-Satisfaction` |
| Blended Learning | `Blended-learning-Platform` |
| InsurAI (hackathon) | `InsurAI` |

## SEO

- **Title:** `Ramy Lazghab — AI & Machine Learning Engineer | LLMs, Agentic AI, RAG`
- **Description:** carries *AI Engineer, Machine Learning Engineer, LLM Engineer, Generative AI, Agentic AI, LangGraph, RAG* in natural prose, not a keyword list
- Open Graph and Twitter card tags with an OG image so shared links render properly
- JSON-LD `Person` schema: name, job title, location, `sameAs` for GitHub and LinkedIn, `alumniOf` Université Paris Dauphine — PSL
- `robots.txt` allows crawling; canonical link to the homepage

Case-study routes are client-rendered and will not be crawled reliably. Accepted: their job is to be pasted into applications and read by humans. The homepage carries the SEO weight.

## Out of scope

- Migrating from Create React App to Vite
- A blog or writing section
- Analytics
- Dark/light theme toggle — the site is dark only
- Multi-language (FR) version
- Changing what `main` deploys, beyond noting the risk

## Open items

Tracked as `// TODO` comments in source, invisible to visitors:

1. Alzheimer's Prediction has no public repo. Ships without a link unless one is supplied.
2. Movie Recommender and MoodSync are GitHub forks. Linked as-is; standalone repos would present better.
3. `intelligent-data-viz` and `RL-A2C-Parallelized` exist on GitHub but are not on the CV or the site. Not included.
4. Verifiable results per project are thin. Sections use qualitative outcomes until concrete numbers are supplied.

## Verification

- `npm run build` completes without errors
- Every route renders: `/`, and `/case-studies/<slug>` for all four case studies (`telecomplus`, `movie-recommender`, `alzheimers`, `ragenius`)
- No route exists for `oracle` or `pif-ai`; both fall through to the homepage redirect
- No confidential detail leaked: `grep -riE "SCCS|EUR-Lex|CosIng|PubChem|PubMed|Google Trends|6,000|2,000|Product Information File|temporal validation" build/` returns nothing
- Deep links work after deploy via the 404.html redirect
- No `TODO`, `FIXME` or placeholder text appears in built output: `grep -ri "todo\|screenshot placeholder" build/`
- CV downloads and resolves to `RamyLazghabEN1.pdf`
- Certification and repo links resolve
- Layout verified by Chrome DevTools device emulation at 375px, 768px and 1440px, with screenshots captured at each — homepage and at least one case study
- Nav is usable on a 375px viewport; no horizontal page scroll at any breakpoint
- Hero photo is under 200 KB in the build
