import React from 'react';
import { caseStudies, moreProjects } from '../content/projects';
import ProjectCard from './ProjectCard';
import DiagramLegend from './DiagramLegend';
import SectionHeading from './SectionHeading';
import avatarWork from '../assets/img/avatar-work.jpg';
import './Work.scss';

export default function Work() {
  const flagship = caseStudies.filter((p) => p.tier === 1);
  const secondary = caseStudies.filter((p) => p.tier === 2);

  return (
    <section className="work section" id="work">
      <div className="container">
        <SectionHeading avatar={avatarWork} label="Selected work" />
        <DiagramLegend />

        {/* A single flagship gets the full width as a feature card rather than
            sitting in a two-column grid with an empty half beside it. */}
        <div className={flagship.length === 1 ? 'work-feature' : 'card-grid card-grid--wide'}>
          {flagship.map((p) => (
            <ProjectCard key={p.title} project={p} showGlyph feature={flagship.length === 1} />
          ))}
        </div>

        <div className="card-grid work-secondary">
          {secondary.map((p) => <ProjectCard key={p.title} project={p} showGlyph />)}
        </div>

        <p className="section-label work-more-label"><i>{'//'}</i> More projects</p>
        <div className="card-grid card-grid--compact">
          {moreProjects.map((p) => <ProjectCard key={p.title} project={p} />)}
        </div>
      </div>
    </section>
  );
}
