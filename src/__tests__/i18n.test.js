import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { CONTENT, LANGS, DEFAULT_LANG } from '../content';
import { LanguageProvider } from '../i18n/LanguageContext';
import App from '../App';

// Renders the whole app, not just a page: the language switch lives in the
// rail and the header, so a page-only render would never see it.
const renderAt = (path) =>
  render(
    <LanguageProvider>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </LanguageProvider>
  );

// The choice is persisted, so each test must start from a clean slate.
beforeEach(() => window.localStorage.clear());

describe('language bundles', () => {
  test('every language exposes the same top-level shape', () => {
    const keys = Object.keys(CONTENT[DEFAULT_LANG]).sort();
    LANGS.forEach((l) => expect(Object.keys(CONTENT[l]).sort()).toEqual(keys));
  });

  test('every language has the same sections in the same order', () => {
    const ids = CONTENT[DEFAULT_LANG].sections.map((s) => s.id);
    LANGS.forEach((l) => expect(CONTENT[l].sections.map((s) => s.id)).toEqual(ids));
  });

  test('every language has the same case studies under the same slugs', () => {
    const slugs = CONTENT[DEFAULT_LANG].caseStudies.map((p) => p.slug);
    LANGS.forEach((l) => expect(CONTENT[l].caseStudies.map((p) => p.slug)).toEqual(slugs));
  });

  test('every language defines the same interface strings', () => {
    const keys = Object.keys(CONTENT[DEFAULT_LANG].ui).sort();
    LANGS.forEach((l) => expect(Object.keys(CONTENT[l].ui).sort()).toEqual(keys));
  });

  test('no language contains an em dash in its copy', () => {
    const walk = (v) =>
      typeof v === 'string' ? [v]
        : Array.isArray(v) ? v.flatMap(walk)
        : v && typeof v === 'object' ? Object.values(v).flatMap(walk)
        : [];
    LANGS.forEach((l) => {
      const bad = walk(CONTENT[l].site)
        .concat(walk(CONTENT[l].projects), walk(CONTENT[l].experience))
        .filter((s) => s.includes('—'));
      expect(bad).toEqual([]);
    });
  });

  test('project links are identical across languages', () => {
    const en = CONTENT.en.projects.map((p) => p.links.repo);
    LANGS.forEach((l) => expect(CONTENT[l].projects.map((p) => p.links.repo)).toEqual(en));
  });
});

describe('language switch', () => {
  test('switching to French changes the visible copy', () => {
    renderAt('/');

    expect(screen.getByText(/production-grade LLM and agentic AI systems/i)).toBeInTheDocument();

    userEvent.click(screen.getAllByRole('button', { name: 'FR' })[0]);

    expect(screen.getByText(/systèmes LLM et d’IA agentique/i)).toBeInTheDocument();
    expect(screen.queryByText(/production-grade LLM and agentic AI systems/i)).toBeNull();
  });

  test('switching language updates the document language attribute', () => {
    renderAt('/');

    userEvent.click(screen.getAllByRole('button', { name: 'FR' })[0]);
    expect(document.documentElement.getAttribute('lang')).toBe('fr');

    userEvent.click(screen.getAllByRole('button', { name: 'EN' })[0]);
    expect(document.documentElement.getAttribute('lang')).toBe('en');
  });

  test('a case study renders in French too', () => {
    renderAt('/case-studies/telecomplus');

    expect(screen.getByRole('heading', { name: /^Problem$/i })).toBeInTheDocument();

    userEvent.click(screen.getAllByRole('button', { name: 'FR' })[0]);
    expect(screen.getByRole('heading', { name: /^Problème$/i })).toBeInTheDocument();
  });
});
