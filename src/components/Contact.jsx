import React from 'react';
import site from '../content/site';
import './Contact.scss';

export default function Contact() {
  const cv = `${process.env.PUBLIC_URL}${site.links.cv}`;

  return (
    <section className="contact section" id="contact">
      <div className="container contact-inner">
        <div>
          <p className="section-label"><i>{'//'}</i> Contact</p>
          <p className="contact-email">
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
        <div className="contact-actions">
          <a className="btn-primary" href={cv} download="Ramy_Lazghab_CV.pdf">Download CV (PDF)</a>
          <a className="btn-ghost" href={site.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="btn-ghost" href={site.links.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </section>
  );
}
