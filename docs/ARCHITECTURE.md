# Architecture

How the site is put together, and why it is put together that way. Read this
before making a structural change; read `EDITING.md` if you only want to change
what the site says.

## The one idea

**Content is data, presentation is components, and the two never mix.**

Every word on the site comes from a file in `src/content/`. No component
contains copy. This is what makes it possible to have two languages, to add a
project by appending an object, and to have tests assert things about the
content without rendering anything.

If you find yourself typing a sentence inside a `.jsx` file, stop. It belongs
in `src/content/`.

## Layout

Three fixed columns on a wide screen, collapsing as space runs out.

```
        768px+                          1440px+
┌──────┬────────────────┐   ┌──────┬──────────────┬────────┐
│ side │                │   │ side │              │ scene  │
│ rail │    content     │   │ rail │   content    │ rail   │
│      │                │   │      │              │        │
│ nav  │  the page      │   │ nav  │  the page    │ image  │
│ CV   │                │   │ CV   │              │ + facts│
└──────┴────────────────┘   └──────┴──────────────┴────────┘

        below 768px
┌────────────────────────┐
│ sticky header + burger │
│      content           │
└────────────────────────┘
```

Both rails are `position: fixed`. The content sits in `.shell`, which carries
matching margins so nothing slides underneath. Those margins are in
`src/styles/global.scss`.

The header is **mobile only** and hides itself at 768px, where the left rail
takes over. That is why the CV button and social links appear in the hero and
contact section only below 768px: above it, the rail already has them, and
showing both was the duplication problem the layout was rebuilt to fix.

## Files

```
src/
  index.js                    LanguageProvider > BrowserRouter > App
  App.jsx                     rails, routes, scroll-spy wiring

  content/
    index.js                  language registry + all interface strings
    site.js                   identity, skills, certifications, achievements
    projects.js               open projects and case studies
    experience.js             three internship entries  ⚠ confidentiality rules apply
    sections.js               section ids, labels, rail captions, scene images
    fr/                       the same four files in French

  i18n/LanguageContext.jsx    provider, useLanguage(), useContent()
  hooks/useActiveSection.js   scroll-spy driving the rail's active dot

  pages/
    Home.jsx                  composes the homepage sections
    CaseStudy.jsx             renders any case study from its slug

  components/
    SideRail / SceneRail      the two fixed columns
    Header                    mobile navigation only
    Hero Experience Work Skills About Credentials Contact Footer
    SectionHeading            avatar + label, used by every section
    SectionLink               scrolls to a section from anywhere
    ProjectCard               one card, used at three sizes
    DiagramLegend             the colour key
    LanguageSwitch            EN / FR
    glyphs/                   one hand-drawn SVG per project, registered in index.js

  styles/
    _tokens.scss              every colour, size and spacing value
    _mixins.scss              bp() breakpoints, surface()
    global.scss               reset, shell margins, shared utilities

public/
  assets/Resume.pdf           the CV the English site serves
  assets/Resume-FR.pdf        the CV the French site serves
  404.html, index.html        the GitHub Pages SPA redirect pair (see Routing)
  sitemap.xml, robots.txt     static SEO files

docs/
  EDITING.md                  recipes for changing what the site says
  ARCHITECTURE.md             this file
  cv-source/                  LaTeX sources of the two CVs

scripts/                      Python image preparation (see EDITING.md)
```

## How content reaches the screen

```
src/content/index.js
   builds CONTENT = { en: {...}, fr: {...} }
        │
        ▼
  LanguageProvider          reads saved choice, else browser language
        │
        ▼
  useContent()              any component calls this
        │
        ▼
  <Hero />, <Work />, ...    render from the bundle they are handed
```

A component never imports `site.js` directly. It calls `useContent()` and gets
whichever language is active. That is the whole i18n mechanism; there is no
library.

## Case studies

One component renders all of them. `CaseStudy.jsx` looks up the project by slug
and shows each section **only if its data exists**:

- `pipeline: []` → no Pipeline section
- `challenges: []` → no Challenges section
- `images: []` → no Screenshots section, and no placeholder either
- `links.repo: null` → no repository button
- `links.demo: null` → no demo button

So the difference between a deep case study and a light one is not a flag or a
branch in the component. It is simply which fields are filled in.

## Experience is structurally different

The three internship entries live in `experience.js`, not `projects.js`, and
their objects have **no `slug` field and no `tech` field**. No slug means no
route, so they cannot acquire a case-study page even by accident. No tech
field means the employer's stack never appears next to a description of their
systems; it is listed only under Skills as a personal toolkit. A test asserts
both.

Their titles are generic descriptions of the work (regulatory intelligence,
generative document intelligence, public regulatory radar), never product
names. The glyph ids `oracle` and `pif-ai` are internal keys only.

That is deliberate. They are proprietary work, and the copy is deliberately
vague. Keeping them in a separate file with a different shape means a future
edit cannot casually promote them into a full case study.

## The colour system

Two palettes that never mix.

**Accent** (`--a`, `--a2`, `--a3`, amber) is identity: buttons, links, headings,
the active nav dot. **It never appears inside a diagram.**

**Semantic** colours mean the same thing everywhere:

| Token | Meaning |
| --- | --- |
| `--c-doc` grey | source documents |
| `--c-store` cyan | retrieval and vector stores |
| `--c-agent` violet | agents and LLMs |
| `--c-model` amber | models and forecasts |
| `--c-flow` green | data flow, validated |

`--c-model` is the same hex as the accent. That is fine: inside a diagram it
means *model*, not *identity*. The token name is what carries the meaning.

The skills section reuses these tones where the meaning lines up, which is why
LLM skills are violet and data skills are cyan. Tone is applied by group
position in `Skills.jsx`, so French inherits it without repeating colours in
the content files.

## Motion

Every animation is an enhancement and nothing depends on one to be visible.

The rule came from a real bug: the hero originally used framer-motion with
`initial={{ opacity: 0 }}`, which left the entire hero blank whenever the
animation did not run. CSS `prefers-reduced-motion` cannot override
framer-motion's inline styles either. framer-motion is no longer used anywhere.

Now: base state is fully visible, animations have **no fill-mode**, and every
motion rule sits inside `@media (prefers-reduced-motion: no-preference)`.

The one piece of motion that carries meaning is the flowing dashes in the
architecture glyphs, since that colour already means *data flow*.

## Routing

`react-router-dom` with `basename={process.env.PUBLIC_URL}`, which resolves to
`/RamyLazghab`.

GitHub Pages returns 404 for a direct request to a sub-path of a single-page
app. `public/404.html` catches it, encodes the path into a query string and
redirects to the app root; a decoder in `public/index.html` restores the real
path. This is the `spa-github-pages` technique and it is why you can paste
`…/case-studies/telecomplus` into an application and it works.

**This cannot be tested locally.** Local static servers and GitHub Pages handle
unknown paths differently. It only proves itself after deploy.

## Deploying

`npm run deploy` (defined in `package.json`) runs the build and pushes
`build/` to the `gh-pages` branch with the `gh-pages` package. That branch is
what GitHub Pages serves. `master` holds the source; pushing it does nothing
visible. See *Deploy the site* in `EDITING.md`.

## Tests

Five files, run with `CI=true npx react-scripts test --watchAll=false`. They
are guards more than unit tests.

| File | Protects |
| --- | --- |
| `confidentiality.test.js` | no banned term anywhere in `src/`; experience entries have no slug, no tech field and no product name in their title; the French version is not longer than the English, which would suggest detail was added in translation |
| `content.test.js` | data shape, no em dash, no TODO in visible strings, the exact ordered list of case-study slugs, repo URLs well formed |
| `i18n.test.js` | the two languages cannot drift: same sections, same slugs, same interface keys, same repo links |
| `render.test.js` | sections render under their generic titles with no tech chips, links point where they should, avatars are decorative |
| `scrollspy.test.js` | the active section is correct, including the short final section |

When one of these fails, it has usually caught something real. Read it before
changing it.
by Ramy Lazghab