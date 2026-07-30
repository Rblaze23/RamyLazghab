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

// Terms allowed ONLY in these files. The point is to keep them out of
// content/experience.js, where ORACLE and PIF AI live — naming a specific
// internal tool there would be a confidentiality regression. Listing the same
// tool as a personal skill, or in an open project, is fine.
const SCOPED = {
  // Open projects and the skills list, in every language.
  Langfuse: ['content/projects.js', 'content/site.js',
             'content/fr/projects.js', 'content/fr/site.js'],
  LightGBM: ['content/site.js', 'content/projects.js',
             'content/fr/site.js', 'content/fr/projects.js'],
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

  test.each(['../content/experience', '../content/fr/experience'])(
    '%s exposes no slug, so it cannot gain a route',
    (mod) => {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const experience = require(mod).default;
      experience.forEach((e) => {
        expect(e).not.toHaveProperty('slug');
        expect(e).not.toHaveProperty('pipeline');
        expect(e).not.toHaveProperty('challenges');
      });
    }
  );

  test('the French experience copy stays as vague as the English', () => {
    /* eslint-disable global-require */
    const en = require('../content/experience').default;
    const fr = require('../content/fr/experience').default;
    /* eslint-enable global-require */

    // Same entries, same order, same ids. A translation must not add or
    // reorder work history.
    expect(fr.map((e) => e.id)).toEqual(en.map((e) => e.id));

    // A French version substantially longer than the English one would mean
    // detail was added in translation. French runs longer than English, so
    // allow headroom, but not a rewrite.
    en.forEach((e, i) => {
      const enLen = (e.problem + e.role.join(' ')).length;
      const frLen = (fr[i].problem + fr[i].role.join(' ')).length;
      expect(frLen).toBeLessThan(enLen * 1.35);
    });
  });
});
