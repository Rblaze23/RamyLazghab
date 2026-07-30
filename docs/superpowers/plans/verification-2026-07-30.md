# Verification evidence — portfolio refresh

**Date:** 2026-07-30
**Branch:** `portfolio-refresh` (worktree `../RamyLazghab-refresh`)
**Plan:** `docs/superpowers/plans/2026-07-29-portfolio-refresh.md`

Every claim below is backed by a command that was actually run. Anything not
verified is stated as not verified.

## Automated tests

```
CI=true npx react-scripts test --watchAll=false
Test Suites: 3 passed, 3 total
Tests:       47 passed, 47 total
```

Suites: `confidentiality.test.js` (15), `content.test.js` (11), `render.test.js` (21).

## Production build

```
npm run build
Compiled successfully.
```

No warnings. The `react/jsx-no-comment-textnodes` warnings present mid-build
were fixed by rendering the section-label `//` as `{'//'}` rather than literal
JSX text.

**Toolchain risk retired:** CRA 5 builds on Node v20.20.2 with no
`NODE_OPTIONS=--openssl-legacy-provider` flag. The plan's contingency was not
needed.

## Confidentiality

| Check | Command | Result |
| --- | --- | --- |
| No confidential terms in build | `grep -rioE "SCCS\|EUR-Lex\|CosIng\|PubChem\|PubMed\|Google Trends\|Product Information File\|temporal validation\|semantic chunking" build/` | **PASS** — empty |
| Employer not named anywhere in build | `grep -rioh "relay ?x" build/` | **PASS** — empty |
| `TODO` absent from `index.html` | `grep -ioE "TODO\|FIXME\|lorem ipsum" build/index.html` | **PASS** — empty |
| `TODO` absent from shipped JS bundle | `grep -ioE "TODO: confirm\|FIXME\|lorem ipsum" build/static/js/*.js` | **PASS** — empty |
| `TODO` markers retained in source for Ramy | `grep -c "TODO: confirm" src/content/projects.js` | **3** — as intended |

The three source markers are: TelecomPlus judge scores, Alzheimer's performance
metrics, and Alzheimer's missing public repo. All render as qualitative text; a
visitor never sees the word TODO.

The confidentiality guard is enforced by tests, not by discipline —
`confidentiality.test.js` fails the suite if any banned term is added to `src/`,
and asserts that experience entries carry no `slug`, `pipeline` or `challenges`
key, so a confidential entry cannot structurally acquire a case-study page.

## Assets

| Asset | Size | Note |
| --- | --- | --- |
| `hero.jpg` | **186 KB** | was `meee.png` at 4.0 MB — a 95% reduction |
| `og-image.jpg` | 91 KB | 1200×630, text rendered, was 601 KB as PNG |
| `favicon.ico` | 19 KB | 16/32/48/64 from `cyberpunkme.png` |
| `apple-touch-icon.png` | 66 KB | 180×180 |
| `favicon-32.png` | 2 KB | |
| `assets/Resume.pdf` | 151,877 B | matches `RamyLazghabEN1.pdf` byte-for-byte |

**Judgement call recorded:** the source `cyberpunkme.png` artwork includes a
firearm in the lower torso. The first OG card generated showed it. The crop was
tightened to `zoom=1.55` (head and shoulders) to exclude it, because the OG
image is what renders when the portfolio is shared on LinkedIn. Verified by
viewing the regenerated file.

## Routes

Build staged under a `/RamyLazghab` prefix to match production, served with
`npx -y serve -l 4174`.

```
/RamyLazghab/                                200
/RamyLazghab/case-studies/telecomplus        200
/RamyLazghab/case-studies/movie-recommender  200
/RamyLazghab/case-studies/alzheimers         200
/RamyLazghab/case-studies/ragenius           200
/RamyLazghab/assets/Resume.pdf               200
/RamyLazghab/og-image.jpg                    200
/RamyLazghab/sitemap.xml                     200
```

JS asset content type confirmed `application/javascript; charset=utf-8`.

**A false pass was caught here.** Serving the build at the server root returned
`200` for the JS bundle while actually delivering `index.html` — `serve -s`
rewrites any unknown path to the SPA entry point. The bundle is compiled with
`/RamyLazghab/` baked in, so root serving would never have booted the app. The
build had to be staged under the matching path prefix before the check meant
anything.

## Responsive — VERIFIED

Chrome could not launch in WSL (the Puppeteer binary fails with
`error while loading shared libraries: libnspr4.so`, and installing it needs
`sudo apt`). **Worked around** by driving the Windows Edge binary from WSL:
`/mnt/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe --headless=new`.

Screenshots committed to `docs/superpowers/screenshots/`:

| File | Viewport |
| --- | --- |
| `home-375.png` | 375 px |
| `home-768.png` | 768 px |
| `home-1440.png` | 1440 px |
| `case-study-telecomplus-1440.png` | 1440 px, case study |

### Two measurement traps hit along the way

1. **`--window-size=375` does not give a 375 px viewport on Windows.** The OS
   enforces a minimum window width, so the page laid out wider and the capture
   was cropped to 375 — which *looked* exactly like horizontal clipping and sent
   me hunting a layout bug that did not exist. Fixed by rendering the site in a
   fixed-width `<iframe>` inside a large window, giving a genuine 375 px layout.

2. **`--virtual-time-budget` froze the entrance animation at `opacity: 0`**,
   making the hero appear completely blank. Real bug found underneath it — see
   below. Final captures use `--force-prefers-reduced-motion`, which both yields
   clean full-contrast screenshots and exercises the reduced-motion code path.

### Bugs found by screenshotting and fixed

1. **Hero photo rendered 240×600 instead of square.** The `<img>` carries
   `width="600" height="600"` attributes to reserve space, and those map to a
   presentational `height`. The CSS set `width: 100%` but never overrode
   `height`, so both dimensions were definite and `aspect-ratio: 1/1` was
   ignored. Fixed with `height: auto`. Confirmed by measurement: now 240×240.

2. **Hero was invisible without JavaScript animation.** framer-motion's
   `initial={{ opacity: 0 }}` leaves above-the-fold content blank if the
   animation stalls, and the global CSS reduced-motion rules cannot override
   framer-motion's inline styles. Replaced with a CSS keyframe animation with
   **no fill-mode**, so the content is visible whenever the animation is absent,
   paused or unsupported. Side effect: `framer-motion` is no longer imported
   anywhere and is fully absent from the bundle (`grep -c framer` → 0).

### Static CSS analysis

| Check | Result |
| --- | --- |
| `max-width` media queries (spec forbids) | **zero** — mobile-first held throughout |
| `min-width` breakpoints present | 768px ×13, 640px ×3, 1024px ×2 |
| Hamburger hidden above 768px | confirmed `menu-toggle{display:none}` inside the 768px block |
| Nav switches to horizontal above 768px | `flex-direction:row` present in the 768px block |
| Tap targets | 4 declarations of `min-height:44px` |
| Fluid type | 3 uses of `clamp()` |
| Horizontal overflow guard | `overflow-x:hidden` on body |

### Visual confirmation from the screenshots

- **375 px** — hamburger visible, square photo above text, headline wraps across
  four lines with no clipping, location badge and both buttons fit, links row
  wraps cleanly.
- **1440 px** — full horizontal nav with the amber CV button, two-column hero,
  three-line headline with the amber gradient on the accent clause, Experience
  card in its 200 px + text two-column layout.
- **Case study** — back link, context label, gradient title, tech chips, repo
  button, architecture glyph rendering in the semantic colours (grey source,
  violet router, cyan retrieval and SQL, green validated) with the legend
  beneath, and the numbered pipeline steps.
- No horizontal overflow at any width: measured `documentElement.scrollWidth`
  = 360 against a 375 px viewport, with **zero elements** extending past the
  viewport edge.

## Not verified

1. **GitHub Pages `404.html` redirect.** Only testable on the live site — local
   static servers and GitHub Pages handle unknown paths differently. `404.html`
   is present in `build/`. As a partial substitute, `index.html` was placed at
   each deep case-study path locally, which confirms that serving the SPA entry
   point at `/case-studies/<slug>` renders the correct case study — the outcome
   the redirect is designed to produce.
2. **Certification and repository URLs return 200.** The URLs came from the
   GitHub API and Ramy's CV but were not fetched during verification.
3. **Real-device rendering.** All captures are headless Edge on Windows. Safari
   and real mobile browsers were not tested.
