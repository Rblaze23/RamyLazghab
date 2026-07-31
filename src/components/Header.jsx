import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../i18n/LanguageContext';
import LanguageSwitch from './LanguageSwitch';
import SectionLink from './SectionLink';
import './Header.scss';

export default function Header() {
  const { site, sections, ui } = useContent();
  const [open, setOpen] = useState(false);
  const NAV = sections.filter((s) => s.id !== 'home');
  const cv = `${process.env.PUBLIC_URL}${site.links.cv}`;

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          ramy.lazghab
        </Link>

        <div className="header-actions">
          {/* In the bar, not inside the collapsed menu. On a phone a switch
              hidden behind the hamburger is a switch nobody finds. */}
          <LanguageSwitch className="header-lang" />

          <button
            type="button"
            className="menu-toggle"
            aria-label={open ? ui.closeMenu : ui.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`bars ${open ? 'is-open' : ''}`} aria-hidden="true" />
          </button>
        </div>

        <nav className={`nav ${open ? 'is-open' : ''}`}>
          {NAV.map((item) => (
            <SectionLink key={item.id} id={item.id} onNavigate={() => setOpen(false)}>
              {item.label}
            </SectionLink>
          ))}
          <a className="cv-button" href={cv} download="Ramy_Lazghab_CV.pdf">
            {ui.downloadCv}
          </a>
        </nav>
      </div>
    </header>
  );
}
