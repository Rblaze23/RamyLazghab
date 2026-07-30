import React from 'react';

// warehouse -> trained model -> served endpoint
export default function MovieGlyph() {
  return (
    <svg
      viewBox="0 0 250 62"
      fill="none"
      role="img"
      aria-label="A data warehouse feeding a trained model served as an API"
    >
      <ellipse cx="34" cy="17" rx="22" ry="7" stroke="var(--c-doc)" strokeOpacity=".85" />
      <path d="M12 17v28c0 3.9 9.8 7 22 7s22-3.1 22-7V17" stroke="var(--c-doc)" strokeOpacity=".85" />
      <path d="M12 31c0 3.9 9.8 7 22 7s22-3.1 22-7" stroke="var(--c-doc)" strokeOpacity=".45" />
      <path d="M62 31h20" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />
      <rect x="88" y="16" width="46" height="30" rx="7" stroke="var(--c-model)" strokeOpacity=".9" />
      <path d="M98 38V26M108 38V20M118 38V30M128 38V23" stroke="var(--c-model)" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M140 31h20" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />
      <rect x="166" y="20" width="34" height="22" rx="5" stroke="var(--c-store)" strokeOpacity=".9" />
      <path d="M173 31h20M186 25l7 6-7 6" stroke="var(--c-store)" strokeOpacity=".7" />
      <path d="M206 31h16" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />
      <circle cx="234" cy="31" r="10" stroke="var(--c-flow)" strokeOpacity=".9" />
    </svg>
  );
}
