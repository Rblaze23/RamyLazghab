import React from 'react';
import experience from '../content/experience';
import SectionHeading from './SectionHeading';
import { getGlyph } from './glyphs';
import avatarExperience from '../assets/img/avatar-experience.jpg';
import './Experience.scss';

// Diagrams sit at the same level of detail as the approved copy, so they add
// no information a reader does not already get from the words.
function renderGlyph(id) {
  const Glyph = getGlyph(id);
  if (!Glyph) return null;
  return <div className="experience-glyph"><Glyph /></div>;
}

// Rendered as static content. No <Link>, no route, no "read more" —
// see the confidentiality note in src/content/experience.js.
export default function Experience() {
  return (
    <section className="experience section" id="experience">
      <div className="container">
        <SectionHeading avatar={avatarExperience} label="Experience" />

        <div className="experience-list">
          {experience.map((item) => (
            <article className="experience-item" key={item.id}>
              <header>
                <h3>{item.title}</h3>
                <p className="subtitle">{item.subtitle}</p>
                {renderGlyph(item.id)}
              </header>

              <div className="experience-body">
                <p className="problem-label">The problem</p>
                <p className="problem">{item.problem}</p>

                <p className="problem-label">What I built</p>
                {item.role.map((para, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <p className="role" key={i}>{para}</p>
                ))}

                <div className="chip-row">
                  {item.tech.map((t) => (
                    <span className="chip" key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
