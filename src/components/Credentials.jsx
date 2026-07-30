import React from 'react';
import site from '../content/site';
import './Credentials.scss';

export default function Credentials() {
  return (
    <section className="credentials section" id="certifications">
      <div className="container">
        <p className="section-label"><i>//</i> Certifications</p>
        <div className="cert-grid">
          {site.certifications.map((c) => (
            <a className="cert" key={c.name} href={c.url} target="_blank" rel="noreferrer">
              <span className="cert-mark" aria-hidden="true">{c.mark}</span>
              <span>
                <strong>{c.name}</strong>
                <em>{c.issuer}</em>
              </span>
            </a>
          ))}
        </div>

        <p className="section-label credentials-ach-label">
          <i>//</i> Hackathons &amp; achievements
        </p>
        <ul className="achievements">
          {site.achievements.map((a) => (
            <li key={a.title}>
              <span className={`badge ${a.result === '3rd place' || a.result === 'Winner' ? 'is-won' : ''}`}>
                {a.result}
              </span>
              <span className="ach-body">
                {a.url
                  ? <a href={a.url} target="_blank" rel="noreferrer"><strong>{a.title}</strong></a>
                  : <strong>{a.title}</strong>}
                {a.detail && <span className="ach-detail"> · {a.detail}</span>}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
