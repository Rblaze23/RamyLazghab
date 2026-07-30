import React from 'react';
import site from '../content/site';
import './Footer.scss';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span className="footer-role">{site.role}</span>
      </div>
    </footer>
  );
}
