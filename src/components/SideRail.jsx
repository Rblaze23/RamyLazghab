import React from 'react';
import { Link } from 'react-router-dom';
import site from '../content/site';
import sections from '../content/sections';
import SectionLink from './SectionLink';
import railAvatar from '../assets/img/avatar-experience.jpg';
import './SideRail.scss';

/**
 * Fixed left navigation rail, shown from 768px up.
 *
 * This is the single home for the CV download and the social links; they were
 * previously repeated across the header, hero and contact section.
 */
export default function SideRail({ activeId }) {
  const cv = `${process.env.PUBLIC_URL}${site.links.cv}`;

  return (
    <aside className="side-rail">
      <Link to="/" className="rail-me">
        <img src={railAvatar} alt="" width="42" height="42" />
        <span>
          <b>{site.name}</b>
          <em>AI &amp; ML Engineer</em>
        </span>
      </Link>

      <nav className="rail-nav" aria-label="Sections">
        {sections.map((s) => (
          <SectionLink
            key={s.id}
            id={s.id}
            className={`rail-link ${activeId === s.id ? 'is-active' : ''}`}
          >
            <span className="dot" aria-hidden="true" />
            {s.label}
          </SectionLink>
        ))}
      </nav>

      <div className="rail-cta">
        <a className="rail-cv" href={cv} download="Ramy_Lazghab_CV.pdf">Download CV</a>
        <div className="rail-social">
          <a href={site.links.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={site.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={`mailto:${site.email}`}>Email</a>
        </div>
      </div>
    </aside>
  );
}
