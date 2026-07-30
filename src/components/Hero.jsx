import React from 'react';
import site from '../content/site';
import heroPhoto from '../assets/img/hero.jpg';
import './Hero.scss';

// The entrance animation is CSS, not framer-motion, and deliberately so:
// the hero is above-the-fold content and must be visible even if animation
// never runs. A JS-driven `initial={{ opacity: 0 }}` leaves the whole hero
// blank if the animation stalls, and CSS reduced-motion rules cannot override
// framer-motion's inline styles.
export default function Hero() {
  const cv = `${process.env.PUBLIC_URL}${site.links.cv}`;
  const plain = site.headline.replace(site.headlineAccent, '').trim();

  return (
    <section className="hero" id="home">
      <div className="container hero-inner">
        <div className="hero-text">
          <p className="kicker">{site.role}</p>

          <h1>
            {plain} <em>{site.headlineAccent}</em>
          </h1>

          <p className="tagline">{site.tagline}</p>

          <p className="location">
            <span className="dot" aria-hidden="true" />
            {site.location}
          </p>

          <div className="hero-actions">
            <a className="btn-primary" href="/#work">Read the case studies</a>
            <a className="btn-ghost" href={cv} download="Ramy_Lazghab_CV.pdf">Download CV</a>
          </div>

          <p className="hero-links">
            <a href={site.links.github} target="_blank" rel="noreferrer">GitHub</a>
            <span aria-hidden="true">·</span>
            <a href={site.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <span aria-hidden="true">·</span>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>

        <div className="hero-photo">
          <img src={heroPhoto} alt="Ramy Lazghab" width="600" height="600" />
        </div>
      </div>
    </section>
  );
}
