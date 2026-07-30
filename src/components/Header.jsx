import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import site from '../content/site';
import './Header.scss';

const NAV = [
  { href: '/#experience', label: 'Experience' },
  { href: '/#work', label: 'Work' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
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
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a className="cv-button" href={cv} download="Ramy_Lazghab_CV.pdf">
            Download CV
          </a>
        </nav>
      </div>
    </header>
  );
}
