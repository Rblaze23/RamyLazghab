import React from 'react';

// The colour code is fixed site-wide: a colour always means the same thing,
// so a visitor learns it once and reads every later diagram at a glance.
const KEYS = [
  { token: 'var(--c-doc)',   label: 'Source documents' },
  { token: 'var(--c-store)', label: 'Retrieval & vector store' },
  { token: 'var(--c-agent)', label: 'Agents & LLM' },
  { token: 'var(--c-model)', label: 'Models & forecasts' },
  { token: 'var(--c-flow)',  label: 'Data flow' },
];

export default function DiagramLegend() {
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
