import React from 'react';
import { motion } from 'framer-motion';
import site from '../content/site';
import heroPhoto from '../assets/img/hero.jpg';
import './Hero.scss';

export default function Hero() {
  const cv = `${process.env.PUBLIC_URL}${site.links.cv}`;
  const plain = site.headline.replace(site.headlineAccent, '').trim();

  return (
    <section className="hero" id="home">
      <div className="container hero-inner">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
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
        </motion.div>

        <motion.div
          className="hero-photo"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <img src={heroPhoto} alt="Ramy Lazghab" width="600" height="600" />
        </motion.div>
      </div>
    </section>
  );
}
