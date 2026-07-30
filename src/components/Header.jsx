import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import site from '../content/site';
import SectionLink from './SectionLink';
import './Header.scss';

const NAV = [
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const cv = `${process.env.PUBLIC_URL}${site.links.cv}`;

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          ramy.lazghab
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`bars ${open ? 'is-open' : ''}`} aria-hidden="true" />
        </button>

        <nav className={`nav ${open ? 'is-open' : ''}`}>
          {NAV.map((item) => (
            <SectionLink key={item.id} id={item.id} onNavigate={() => setOpen(false)}>
              {item.label}
            </SectionLink>
          ))}
          <a className="cv-button" href={cv} download="Ramy_Lazghab_CV.pdf">
            Download CV
          </a>
        </nav>
      </div>
    </header>
  );
}
