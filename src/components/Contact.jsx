import React from 'react';
import site from '../content/site';
import SectionHeading from './SectionHeading';
import avatarContact from '../assets/img/avatar-contact.jpg';
import './Contact.scss';

export default function Contact() {
  const cv = `${process.env.PUBLIC_URL}${site.links.cv}`;

  return (
    <section className="contact section" id="contact">
      <div className="container contact-inner">
        <div>
          <SectionHeading avatar={avatarContact} label="Contact" />
          <p className="contact-email">
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
        {/* Same links as the left rail, so they only show when the rail is
            hidden. The email above is the section's actual call to action. */}
        <div className="contact-actions only-mobile">
          <a className="btn-primary" href={cv} download="Ramy_Lazghab_CV.pdf">Download CV (PDF)</a>
          <a className="btn-ghost" href={site.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="btn-ghost" href={site.links.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </section>
  );
}
