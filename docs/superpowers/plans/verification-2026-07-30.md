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

## Responsive — PARTIALLY VERIFIED

**Screenshots were NOT captured.** Chrome cannot launch in this WSL
environment: the Puppeteer-bundled binary at
`~/.cache/puppeteer/chrome/linux-144.0.7559.96/chrome-linux64/chrome` fails with
`error while loading shared libraries: libnspr4.so`. Installing the missing
libraries requires `sudo apt`, which was not run.

The plan required screenshots at 375 / 768 / 1440 px. **That step is
outstanding.** What was verified instead, by inspecting the compiled CSS:

| Check | Result |
| --- | --- |
| `max-width` media queries (spec forbids) | **zero** — mobile-first held throughout |
| `min-width` breakpoints present | 768px ×13, 640px ×3, 1024px ×2 |
| Hamburger hidden above 768px | confirmed `menu-toggle{display:none}` inside the 768px block |
| Nav switches to horizontal above 768px | `flex-direction:row` present in the 768px block |
| Tap targets | 4 declarations of `min-height:44px` |
| Fluid type | 3 uses of `clamp()` |
| Horizontal overflow guard | `overflow-x:hidden` on body |

Static analysis proves the rules exist. It does **not** prove the layout looks
right. Ramy should open the site at phone width before deploying, or the missing
Chrome libraries can be installed to complete this step.

## Not verified

1. **GitHub Pages `404.html` redirect.** Only testable on the live site — local
   static servers and GitHub Pages handle unknown paths differently. `404.html`
   is present in `build/`.
2. **Visual layout at any viewport** — see above.
3. **Certification and repository URLs return 200.** The URLs were taken from
   the GitHub API and the user's CV, but were not fetched during verification.
