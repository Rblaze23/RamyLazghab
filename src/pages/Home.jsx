import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Experience from '../components/Experience';
import Work from '../components/Work';
import Skills from '../components/Skills';
import About from '../components/About';
import Credentials from '../components/Credentials';
import Contact from '../components/Contact';

export default function Home() {
  useEffect(() => {
    document.title =
      'Ramy Lazghab | AI & Machine Learning Engineer | LLMs, Agentic AI, RAG';
  }, []);

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
