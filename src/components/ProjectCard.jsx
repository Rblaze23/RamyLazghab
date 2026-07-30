import React from 'react';
import { Link } from 'react-router-dom';
import { getGlyph } from './glyphs';

export default function ProjectCard({ project, showGlyph = false }) {
  const Glyph = showGlyph ? getGlyph(project.architecture.glyph) : null;

  const body = (
    <>
      {Glyph && <div className="card-glyph"><Glyph /></div>}
      {project.context && <p className="card-tag">{project.context}</p>}
      <h3>{project.title}</h3>
      <p className="card-summary">{project.summary}</p>
      <div className="chip-row">
        {project.tech.slice(0, 4).map((t) => <span className="chip" key={t}>{t}</span>)}
      </div>
      {project.slug && <span className="card-cta">Read case study →</span>}
    </>
  );

  if (project.slug) {
    return (
      <Link className="project-card is-linked" to={`/case-studies/${project.slug}`}>
        {body}
      </Link>
    );
  }
  return <article className="project-card">{body}</article>;
}
