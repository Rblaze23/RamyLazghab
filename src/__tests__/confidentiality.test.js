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
