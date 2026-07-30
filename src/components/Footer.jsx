import React from 'react';
import { useContent } from '../i18n/LanguageContext';
import './Footer.scss';

export default function Footer() {
  const { site } = useContent();
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span className="footer-role">{site.role}</span>
      </div>
    </footer>
  );
}
