import React from 'react';
import { useContent } from '../i18n/LanguageContext';
import SectionHeading from './SectionHeading';
import avatarContact from '../assets/img/avatar-contact.jpg';
import './Contact.scss';

export default function Contact() {
  const { site, ui, sections } = useContent();
  const label = sections.find((s) => s.id === 'contact').label;
  const cv = `${process.env.PUBLIC_URL}${site.links.cv}`;

  return (
    <section className="contact section" id="contact">
      <div className="container contact-inner">
        <div>
          <SectionHeading avatar={avatarContact} label={label} />
          <p className="contact-email">
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
        {/* Repeated from the left rail on purpose. This is the end of the page
            and the point at which someone decides to get in touch; making them
            scroll back up to find a link would be the wrong kind of tidy. */}
        <div className="contact-actions">
          <a className="contact-cta" href={cv} download="Ramy_Lazghab_CV.pdf">{ui.downloadCv}</a>
          <a className="contact-link is-linkedin" href={site.links.linkedin} target="_blank" rel="noreferrer">
            <span className="ico" aria-hidden="true">in</span>LinkedIn
          </a>
          <a className="contact-link is-github" href={site.links.github} target="_blank" rel="noreferrer">
            <span className="ico" aria-hidden="true">{'{ }'}</span>GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
