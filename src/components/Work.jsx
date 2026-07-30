import React from 'react';
import { caseStudies, moreProjects } from '../content/projects';
import ProjectCard from './ProjectCard';
import DiagramLegend from './DiagramLegend';
import './Work.scss';

export default function Work() {
  const flagship = caseStudies.filter((p) => p.tier === 1);
  const secondary = caseStudies.filter((p) => p.tier === 2);

  return (
    <section className="work section" id="work">
      <div className="container">
        <p className="section-label"><i>//</i> Selected work</p>
        <DiagramLegend />

        <div className="card-grid card-grid--wide">
          {flagship.map((p) => <ProjectCard key={p.title} project={p} showGlyph />)}
        </div>

        <div className="card-grid work-secondary">
          {secondary.map((p) => <ProjectCard key={p.title} project={p} showGlyph />)}
        </div>

        <p className="section-label work-more-label"><i>//</i> More projects</p>
        <div className="card-grid card-grid--compact">
          {moreProjects.map((p) => <ProjectCard key={p.title} project={p} />)}
        </div>
      </div>
    </section>
  );
}
