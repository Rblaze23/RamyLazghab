import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';
import Header from './components/Header';
import Footer from './components/Footer';
import SideRail from './components/SideRail';
import SceneRail from './components/SceneRail';
import useActiveSection from './hooks/useActiveSection';
import { useContent } from './i18n/LanguageContext';

export default function App() {
  const { sections } = useContent();
  const sectionIds = React.useMemo(() => sections.map((s) => s.id), [sections]);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  // Scroll-spy only runs on the homepage; case-study pages have no sections.
  const activeId = useActiveSection(sectionIds, { enabled: isHome });

  return (
    <>
      {/* The header is the mobile navigation. From 768px up the left rail
          takes over and the header hides itself. */}
      <Header />
      <SideRail activeId={isHome ? activeId : null} />
      {isHome && <SceneRail activeId={activeId} />}

      <div className={`shell ${isHome ? 'has-scene' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case-studies/:slug" element={<CaseStudy />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}
