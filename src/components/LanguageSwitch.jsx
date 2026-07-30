import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { LANGS, LANG_LABELS } from '../content';
import './LanguageSwitch.scss';

const FULL_NAME = { en: 'English', fr: 'Français' };

export default function LanguageSwitch({ className = '' }) {
  const { lang, setLang } = useLanguage();

  return (
    <div className={`lang-switch ${className}`} role="group" aria-label="Language / Langue">
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          className={code === lang ? 'is-active' : ''}
          aria-pressed={code === lang}
          lang={code}
          title={FULL_NAME[code]}
          onClick={() => setLang(code)}
        >
          {LANG_LABELS[code]}
        </button>
      ))}
    </div>
  );
}
