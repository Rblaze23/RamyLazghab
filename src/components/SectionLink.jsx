import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Navigates to a section on the homepage from anywhere in the app.
 *
 * A plain `href="/#work"` is wrong here: the site is served under a basename
 * (/RamyLazghab), so an absolute "/" path leaves the app entirely. And a bare
 * "#work" only works when the visitor is already on the homepage — from a
 * case-study page it does nothing.
 *
 * This handles both: scroll if already home, otherwise navigate home first and
 * scroll once the section exists.
 */
export default function SectionLink({ id, className, onNavigate, children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const scrollTo = () => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (onNavigate) onNavigate();

    if (pathname === '/') {
      scrollTo();
      return;
    }
    navigate('/');
    // Wait for the homepage to mount before looking for the target.
    requestAnimationFrame(() => requestAnimationFrame(scrollTo));
  };

  return (
    <a href={`#${id}`} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
