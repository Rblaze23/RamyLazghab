import React from 'react';

// user -> intent router -> {retrieval | SQL} -> judged answer
export default function TelecomPlusGlyph() {
  return (
    <svg
      viewBox="0 0 250 62"
      fill="none"
      role="img"
      aria-label="A question routed to either document retrieval or a SQL query, then evaluated"
    >
      <circle cx="20" cy="31" r="11" stroke="var(--c-doc)" strokeOpacity=".85" />
      <circle cx="20" cy="27" r="3.5" stroke="var(--c-doc)" strokeOpacity=".6" />
      <path d="M15 35a5 5 0 0110 0" stroke="var(--c-doc)" strokeOpacity=".6" />
      <path d="M35 31h16" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />
      <path d="M68 19l12 12-12 12-12-12z" stroke="var(--c-agent)" strokeOpacity=".9" />
      <path d="M84 24h14M84 38h14" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />
      <rect x="104" y="10" width="44" height="18" rx="4" stroke="var(--c-store)" strokeOpacity=".9" />
      <rect x="104" y="34" width="44" height="18" rx="4" stroke="var(--c-store)" strokeOpacity=".55" />
      <path d="M111 19h12M111 43h16" stroke="var(--c-store)" strokeOpacity=".5" />
      <path d="M154 19h14v12h14M154 43h14v-12" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />
      <rect x="196" y="17" width="40" height="28" rx="6" stroke="var(--c-flow)" strokeOpacity=".9" />
      <path d="M206 31l6 7 12-14" stroke="var(--c-flow)" strokeWidth="1.6" />
    </svg>
  );
}
