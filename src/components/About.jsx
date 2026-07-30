import React from 'react';
import site from '../content/site';
import aboutPhoto from '../assets/img/aboutmee.jpg';
import './About.scss';

export default function About() {
  return (
    <section className="about section" id="about">
      <div className="container about-inner">
        <div className="about-photo">
          <img src={aboutPhoto} alt="Ramy Lazghab" loading="lazy" />
        </div>
        <div className="about-text">
          <p className="section-label"><i>{'//'}</i> About</p>
          {/* eslint-disable-next-line react/no-array-index-key */}
          {site.about.map((para, i) => <p key={i}>{para}</p>)}
          <p className="about-languages">{site.languages}</p>
        </div>
      </div>
    </section>
  );
}
