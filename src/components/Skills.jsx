import React from 'react';
import { useContent } from '../i18n/LanguageContext';
import SectionHeading from './SectionHeading';
import avatarSkills from '../assets/img/avatar-skills.jpg';
import './Skills.scss';

// One tone per skill group. Deliberately reuses the diagram palette where the
// meaning lines up (LLM work is violet, models amber, data cyan), so the page
// keeps a single colour language rather than inventing a second one.
const TONES = ['llm', 'ml', 'dl', 'ops', 'data', 'code'];

export default function Skills() {
  const { site, sections } = useContent();
  const label = sections.find((s) => s.id === 'skills').label;
  return (
    <section className="skills section" id="skills">
      <div className="container">
        <SectionHeading avatar={avatarSkills} label={label} />
        {site.skills.map((group, i) => (
          // Tone by position, not by name, so the French bundle picks up the
          // same colours without repeating them in the content files. Both
          // languages are asserted to share group order in i18n.test.js.
          <div className={`skill-group tone-${TONES[i % TONES.length]}`} key={group.group}>
            <h3>{group.group}</h3>
            <div className="chip-row">
              {group.items.map((item) => <span className="chip" key={item}>{item}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
