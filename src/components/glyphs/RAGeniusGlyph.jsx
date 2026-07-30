import React from 'react';

// pdf + csv -> shared index -> local model -> answer
export default function RAGeniusGlyph() {
  return (
    <svg
      viewBox="0 0 250 62"
      fill="none"
      role="img"
      aria-label="PDF and CSV files indexed together and queried through a local model"
    >
      <rect x="8" y="6" width="26" height="22" rx="3" stroke="var(--c-doc)" strokeOpacity=".85" />
      <path d="M13 14h16M13 20h11" stroke="var(--c-doc)" strokeOpacity=".45" />
      <rect x="8" y="34" width="26" height="22" rx="3" stroke="var(--c-doc)" strokeOpacity=".85" />
      <path d="M8 41h26M17 34v22M25 34v22" stroke="var(--c-doc)" strokeOpacity=".45" />
      <path d="M40 17h14v14h10M40 45h14V31" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />
      <circle cx="86" cy="31" r="14" stroke="var(--c-store)" strokeOpacity=".9" />
      <circle cx="86" cy="31" r="5" fill="var(--c-store)" fillOpacity=".5" />
      <path d="M104 31h18" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />
      <rect x="128" y="16" width="44" height="30" rx="7" stroke="var(--c-agent)" strokeOpacity=".9" />
      <path d="M138 31h6M152 26h10M152 36h10M138 26h2M138 36h2" stroke="var(--c-agent)" strokeOpacity=".6" />
      <path d="M178 31h16" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />
      <rect x="200" y="14" width="34" height="34" rx="4" stroke="var(--c-flow)" strokeOpacity=".85" />
      <path d="M207 24h20M207 31h20M207 38h13" stroke="var(--c-flow)" strokeOpacity=".55" />
    </svg>
  );
}
