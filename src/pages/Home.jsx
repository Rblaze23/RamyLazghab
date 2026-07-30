import React, { useEffect } from 'react';
import { useContent } from '../i18n/LanguageContext';
import Hero from '../components/Hero';
import Experience from '../components/Experience';
import Work from '../components/Work';
import Skills from '../components/Skills';
import About from '../components/About';
import Credentials from '../components/Credentials';
import Contact from '../components/Contact';

export default function Home() {
  const { site } = useContent();

  useEffect(() => {
    document.title = `${site.name} | ${site.role} | LLMs, Agentic AI, RAG`;
  }, [site]);

  return (
    <main>
      <Hero />
      <Experience />
      <Work />
      <Skills />
      <About />
      <Credentials />
      <Contact />
    </main>
  );
}
