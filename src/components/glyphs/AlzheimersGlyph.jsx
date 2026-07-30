import React from 'react';

// features -> ensemble of two models -> attributed prediction
export default function AlzheimersGlyph() {
  return (
    <svg
      viewBox="0 0 250 62"
      fill="none"
      role="img"
      aria-label="Features feeding an ensemble of two models with per-feature attribution"
    >
      <rect x="10" y="14" width="26" height="34" rx="3" stroke="var(--c-doc)" strokeOpacity=".85" />
      <path d="M16 23h14M16 31h14M16 39h9" stroke="var(--c-doc)" strokeOpacity=".45" />
      <path d="M42 31h16v-12h14M42 31h16v12h14" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />
      <rect x="78" y="8" width="40" height="22" rx="4" stroke="var(--c-model)" strokeOpacity=".9" />
      <path d="M86 24V14M94 24V12M102 24V18M110 24V15" stroke="var(--c-model)" strokeWidth="2.4" strokeLinecap="round" />
      <rect x="78" y="34" width="40" height="22" rx="4" stroke="var(--c-agent)" strokeOpacity=".9" />
      <circle cx="88" cy="45" r="3" stroke="var(--c-agent)" strokeOpacity=".8" />
      <circle cx="100" cy="41" r="3" stroke="var(--c-agent)" strokeOpacity=".8" />
      <circle cx="100" cy="49" r="3" stroke="var(--c-agent)" strokeOpacity=".8" />
      <circle cx="110" cy="45" r="3" stroke="var(--c-agent)" strokeOpacity=".8" />
      <path d="M91 45h6M103 42l5 2M103 48l5-2" stroke="var(--c-agent)" strokeOpacity=".5" />
      <path d="M124 19h14v12h12M124 45h14v-12" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />
      <path
        d="M166 44h56M170 44V28M182 44V20M194 44V33M206 44V24M218 44V37"
        stroke="var(--c-model)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
