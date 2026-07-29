# Portfolio refresh — case studies, positioning, SEO

**Date:** 2026-07-29
**Branch:** `portfolio-refresh` (off `master`)
**Site:** https://rblaze23.github.io/RamyLazghab
**Author:** Ramy Lazghab

## Goal

Rebuild the portfolio so it supports a job search as an **AI & Machine Learning Engineer (LLMs, Agentic AI, RAG, production AI systems)**. Three things are missing today: the flagship projects aren't on the site at all, there are no case studies, and the skills list contradicts the CV positioning.

Success means a recruiter can land on the homepage, understand the positioning in ten seconds, and click into a case study that shows real system design. An ML practitioner reading the same page should find evidence of production judgement, not demos.

## Constraints

1. **No invented metrics.** Every number must be defensible in an interview. Where a number would help but can't be verified, the source carries `// TODO: confirm exact number` and the page renders qualitative language. **No TODO text ever reaches a visitor's screen.**
2. **ORACLE and PIF AI are proprietary work projects.** Public-safe detail only: system type, AI techniques, role. No client names, no internal architecture specifics, no proprietary business logic. Source files carry a comment marking this boundary.
3. **Nothing is deleted.** All six existing projects stay, demoted to a *More projects* section rather than removed.
4. **Deploy stays manual.** Work lands on a branch; Ramy reviews, merges to `master`, and runs `npm run deploy`. The live site and the local `gh-pages` working tree are not touched.

## Current state

| Branch | Role |
| --- | --- |
| `master` | Source of truth. Create React App 5, React 19, SCSS, framer-motion, tsparticles |
| `gh-pages` | Published build output, produced by `npm run deploy` (`gh-pages -d build`) |
| `main` | Default branch. Holds only `README.md` and a Pages workflow that would publish an empty site if Pages ever switched source to GitHub Actions |

Homepage is a single scroll: Header → Hero → About → Projects → Skills → Contact. No router. Content is hardcoded inside JSX. Eight project cards, none of them the flagship work.

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
src/content/projects.js       single source of truth for all projects
src/content/site.js           name, headline, location, links, certifications, achievements
src/pages/Home.jsx
src/pages/CaseStudy.jsx       renders any project by slug
src/components/               presentation only, reads from content
src/components/glyphs/        one SVG architecture diagram per flagship project
src/styles/_tokens.scss       accent + semantic diagram colours
```

### Project data model

```js
{
  slug: 'oracle',
  tier: 1,
  title: 'ORACLE',
  subtitle: 'Regulatory intelligence for cosmetics',
  summary: '',           // card text
  confidential: true,    // caps detail, suppresses repo link
  problem: '',
  architecture: { description: '', glyph: 'oracle' },
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

GitHub Pages returns 404 for direct requests to sub-paths of a SPA. Fixed with the standard `spa-github-pages` pair: a `public/404.html` that encodes the path into a query string and redirects, plus a decoder script in `index.html` that restores it via `history.replaceState`. This makes `rblaze23.github.io/RamyLazghab/case-studies/oracle` work when pasted cold into an application.

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

Fixed across the entire site regardless of accent. **The accent colour never appears inside a diagram.** A visitor learns the code once on ORACLE and reads every subsequent diagram at a glance.

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
- **Removed:** floating crown SVGs, sparkle field, rotating cogs, `SectionIndicator`, `ParticlesBackground` if unreferenced

## Homepage

Order: **Hero → Selected work → Skills → About → Certifications → Achievements → Contact.**

Header is sticky: brand, section links, and a `Download CV` button. Hero carries CV, LinkedIn, GitHub and email above the fold.

**Selected work** — three flagship glyph cards (ORACLE, PIF AI, TelecomPlus), then three reduced cards (Movie Recommender, Alzheimer's, RAGenius), then a compact *More projects* grid holding SportIQ, MoodSync, Startup Investment, House Prices, Diabetes and Blended Learning.

**Skills**, rebuilt from the CV:

| Group | Items |
| --- | --- |
| AI / ML & Frameworks | LLMs, RAG, Multi-Agent Systems, Prompt Engineering, LangChain, LangGraph, Hugging Face, PyTorch, TensorFlow, XGBoost, LightGBM |
| LLM Platforms & MLOps | Anthropic API, OpenAI API, MCP, LangSmith, Docker, Git, MLflow |
| Cloud & Data | GCP (Vertex AI, BigQuery, Cloud Run), Streamlit, Pandas, NumPy, Spark, PostgreSQL, Neo4j, FAISS, Qdrant |
| Programming | Python, SQL, Java, JavaScript, C, R |

**Certifications** — LangChain Academy (`academy.langchain.com/certificates/nqrsewnhol`) and Google Cloud BigQuery ML (`credly.com/badges/9ec1dc8b-494f-42ee-a314-ba30b40342de/public_url`).

**Achievements** — 3rd Place RAISE Summit AI Hackathon Paris; Winner Hack for Good (MoodSync); EY Hack for Smart Insurance (InsurAI, linked to its repo, stated as participation with no placement claimed); IEEE Xtreme 15.0 & 16.0.

## Case studies

Full treatment for **ORACLE, PIF AI, TelecomPlus**. Reduced (problem / architecture / technologies / results) for **Movie Recommender, Alzheimer's Prediction, RAGenius**. Card only for **SportIQ**.

Page structure: back link → title and subtitle → tech chips → Problem → Architecture (glyph + prose) → Pipeline → Technologies → Challenges → Results → Screenshots (only if `images` non-empty) → Lessons Learned → prev/next navigation.

### ORACLE (public-safe)

Cleaned and structured 2,000+ SCCS scientific opinions, EU regulations and amendments — later expanded to 6,000+ documents — into a RAG pipeline using semantic chunking and a Qdrant vector store for evidence-grounded retrieval. Autonomous agents built on LangGraph and the Anthropic API gather live signals from PubMed, PubChem, EUR-Lex, CosIng, news articles and Google Trends as additional ML features. XGBoost and LightGBM forecasting models use year-based temporal validation to prevent data leakage. LLMs explain predictions and auto-generate a visualisation diagram per feature, surfaced on Streamlit dashboards.

Nothing beyond this framing. No client names, no internal architecture, no business logic.

### PIF AI (public-safe)

LLM-based document-understanding pipeline that auto-generates Product Information Files from customer documents, with human-in-the-loop section regeneration and compliance-validation agents. Integrated into the company's production web application as a customer-facing enterprise feature.

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
- Every route renders: `/`, and `/case-studies/<slug>` for all six case studies
- Deep links work after deploy via the 404.html redirect
- No `TODO`, `FIXME` or placeholder text appears in built output: `grep -ri "todo\|screenshot placeholder" build/`
- CV downloads and resolves to `RamyLazghabEN1.pdf`
- Certification and repo links resolve
- Layout holds at 375px, 768px and 1440px
- Hero photo is under 200 KB in the build
