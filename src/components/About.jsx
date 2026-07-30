import React from 'react';
import { useContent } from '../i18n/LanguageContext';
import SectionHeading from './SectionHeading';
import avatarAbout from '../assets/img/avatar-about.jpg';
// 3D portrait, cropped above the watermark. Replaces aboutmee.jpg, which was
// a 301x1000 sliver that had to be aggressively cropped to sit in any layout.
import aboutPhoto from '../assets/img/about-3d.jpg';
import './About.scss';

export default function About() {
  const { site, sections } = useContent();
  const label = sections.find((s) => s.id === 'about').label;
  return (
    <section className="about section" id="about">
      <div className="container">
        <SectionHeading avatar={avatarAbout} label={label} />

        <div className="about-inner">
          <div className="about-photo">
            <img src={aboutPhoto} alt="Ramy Lazghab" width="560" height="747" loading="lazy" />
          </div>
          <div className="about-text">
            {/* eslint-disable-next-line react/no-array-index-key */}
            {site.about.map((para, i) => <p key={i}>{para}</p>)}
            <p className="about-languages">{site.languages}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
