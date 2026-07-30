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

  test('skills cover classical ML, deep learning and RL, not just gradient boosting', () => {
    const all = site.skills.flatMap((g) => g.items).join(' ');
    ['Random Forest', 'Logistic Regression', 'SVM', 'Decision Trees',
     'Neural Networks', 'CNNs', 'Transformers',
     'Reinforcement Learning'].forEach((kw) => expect(all).toContain(kw));
  });

  test('no skill is listed twice, even across groups', () => {
    const all = site.skills.flatMap((g) => g.items);
    expect(new Set(all).size).toBe(all.length);
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
