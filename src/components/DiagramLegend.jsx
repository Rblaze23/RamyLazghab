import React from 'react';
import { useContent } from '../i18n/LanguageContext';

// The colour code is fixed site-wide: a colour always means the same thing,
// so a visitor learns it once and reads every later diagram at a glance.
const TOKENS = ['doc', 'store', 'agent', 'model', 'flow'];

export default function DiagramLegend() {
  const { ui } = useContent();
  const KEYS = TOKENS.map((k) => ({ token: `var(--c-${k})`, label: ui.legend[k] }));
  return (
    <div className="diagram-legend">
      {KEYS.map((k) => (
        <span className="legend-item" key={k.label}>
          <span className="swatch" style={{ background: k.token }} aria-hidden="true" />
          {k.label}
        </span>
      ))}
    </div>
  );
}
