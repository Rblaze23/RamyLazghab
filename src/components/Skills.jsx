import React from 'react';
import site from '../content/site';
import './Skills.scss';

export default function Skills() {
  return (
    <section className="skills section" id="skills">
      <div className="container">
        <p className="section-label"><i>//</i> Skills</p>
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
