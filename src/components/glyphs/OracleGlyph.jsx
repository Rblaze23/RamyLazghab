import React from 'react';

// documents -> retrieval -> agents gathering public signals -> forecast
//
// CONFIDENTIALITY: this diagram deliberately shows nothing that the approved
// copy in src/content/experience.js does not already state in words. Do not
// add named sources, counts, model names or internal steps.
export default function OracleGlyph() {
  return (
    <svg
      viewBox="0 0 250 62"
      fill="none"
      role="img"
      aria-label="Documents retrieved, agents gathering public signals, feeding a forecasting model"
    >
      {/* source documents */}
      <rect x="8" y="16" width="26" height="22" rx="3" stroke="var(--c-doc)" strokeOpacity=".85" />
      <rect x="12" y="22" width="26" height="22" rx="3" stroke="var(--c-doc)" strokeOpacity=".55" />
      <path d="M18 30h14M18 36h9" stroke="var(--c-doc)" strokeOpacity=".45" />

      <path d="M44 31h16" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />

      {/* retrieval layer */}
      <circle cx="78" cy="31" r="13" stroke="var(--c-store)" strokeOpacity=".9" />
      <circle cx="78" cy="31" r="4.5" fill="var(--c-store)" fillOpacity=".55" />

      <path d="M95 31h15" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />

      {/* autonomous agents gathering live public signals */}
      <circle cx="124" cy="14" r="7" stroke="var(--c-agent)" strokeOpacity=".9" />
      <circle cx="124" cy="31" r="7" stroke="var(--c-agent)" strokeOpacity=".9" />
      <circle cx="124" cy="48" r="7" stroke="var(--c-agent)" strokeOpacity=".9" />
      <path d="M124 21v3M124 38v3" stroke="var(--c-agent)" strokeOpacity=".5" />

      <path d="M133 14h14v17h14M133 31h28M133 48h14V31" stroke="var(--c-flow)" strokeOpacity=".8" strokeDasharray="3 3" />

      {/* forecasting model */}
      <path d="M178 46V24M188 46V32M198 46V16M208 46V36M218 46V27" stroke="var(--c-model)" strokeWidth="3" strokeLinecap="round" />
      <path d="M174 51h48" stroke="var(--c-model)" strokeOpacity=".3" />

      {/* explained / validated */}
      <path d="M228 31h6" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />
      <circle cx="242" cy="31" r="7" stroke="var(--c-flow)" strokeOpacity=".9" />
      <path d="M238.5 31l2.5 3 4.5-6" stroke="var(--c-flow)" strokeWidth="1.4" />
    </svg>
  );
}
