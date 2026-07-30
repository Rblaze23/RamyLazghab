import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { CONTENT, LANGS, DEFAULT_LANG } from '../content';

const LanguageContext = createContext(null);
const STORAGE_KEY = 'ramy-portfolio-lang';

function readInitialLang() {
  if (typeof window === 'undefined') return DEFAULT_LANG;

  // An explicit choice always wins over a guess.
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && LANGS.includes(saved)) return saved;
  } catch {
    // Private mode or blocked storage. Fall through to the browser preference.
  }

  const preferred = (window.navigator?.language || '').slice(0, 2).toLowerCase();
  return LANGS.includes(preferred) ? preferred : DEFAULT_LANG;
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readInitialLang);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Not being able to remember the choice is not worth breaking the page.
    }
    // Keeps screen readers and search engines aware of the actual language.
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  const value = useMemo(
    () => ({ lang, setLang, content: CONTENT[lang] || CONTENT[DEFAULT_LANG] }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  // Falling back to English rather than throwing means a component rendered
  // outside the provider (a test, say) still renders real content.
  if (!ctx) return { lang: DEFAULT_LANG, setLang: () => {}, content: CONTENT[DEFAULT_LANG] };
  return ctx;
}

export function useContent() {
  return useLanguage().content;
}
