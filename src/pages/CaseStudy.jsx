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
      ? `${project.title} case study | Ramy Lazghab`
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
