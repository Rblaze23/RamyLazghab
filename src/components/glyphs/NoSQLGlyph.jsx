import React from 'react';

// question -> LLM engine -> MCP fan-out -> five databases
export default function NoSQLGlyph() {
  const dbs = [6, 19, 32, 45, 58];
  return (
    <svg
      viewBox="0 0 250 62"
      fill="none"
      role="img"
      aria-label="A plain-English question passes through an LLM engine and fans out over MCP to five databases"
    >
      <rect x="8" y="20" width="44" height="22" rx="11" stroke="var(--c-doc)" strokeOpacity=".85" />
      <path d="M17 28h26M17 34h18" stroke="var(--c-doc)" strokeOpacity=".45" />
      <path d="M58 31h16" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />
      <rect x="80" y="16" width="44" height="30" rx="7" stroke="var(--c-agent)" strokeOpacity=".9" />
      <path d="M90 31h6M104 26h10M104 36h10M90 26h2M90 36h2" stroke="var(--c-agent)" strokeOpacity=".6" />
      <path d="M130 31h14" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />
      <rect x="150" y="24" width="18" height="14" rx="3" stroke="var(--c-flow)" strokeOpacity=".85" />
      <path d="M154 31h10" stroke="var(--c-flow)" strokeOpacity=".55" />
      {dbs.map((y) => (
        <path key={y} d={`M168 31 C 184 31, 184 ${y + 6}, 200 ${y + 6}`} stroke="var(--c-flow)" strokeOpacity=".55" strokeDasharray="3 3" />
      ))}
      {dbs.map((y) => (
        <g key={y}>
          <ellipse cx="214" cy={y + 3} rx="14" ry="3" stroke="var(--c-store)" strokeOpacity=".9" />
          <path d={`M200 ${y + 3}v6c0 1.7 6.3 3 14 3s14-1.3 14-3v-6`} stroke="var(--c-store)" strokeOpacity=".9" />
        </g>
      ))}
    </svg>
  );
}
