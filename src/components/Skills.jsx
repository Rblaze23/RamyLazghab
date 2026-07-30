import React from 'react';
import { useContent } from '../i18n/LanguageContext';
import SectionHeading from './SectionHeading';
import avatarSkills from '../assets/img/avatar-skills.jpg';
import './Skills.scss';

export default function Skills() {
  const { site, sections } = useContent();
  const label = sections.find((s) => s.id === 'skills').label;
  return (
    <section className="skills section" id="skills">
      <div className="container">
        <SectionHeading avatar={avatarSkills} label={label} />
        {site.skills.map((group) => (
          <div className="skill-group" key={group.group}>
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
