import React from 'react';

// network flows -> detector -> alert -> agent (+ read-only tools) -> checked triage report
export default function SecOpsGlyph() {
  return (
    <svg
      viewBox="0 0 250 62"
      fill="none"
      role="img"
      aria-label="Network flows scored by a detector, the alert investigated by an agent through read-only tools, then a checked triage report"
    >
      {/* network flows: three staggered packets */}
      <path d="M8 22h18M8 31h22M8 40h14" stroke="var(--c-doc)" strokeOpacity=".85" strokeLinecap="round" />
      <path d="M36 31h12" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />
      {/* detector: model box with a threshold line */}
      <rect x="52" y="19" width="30" height="24" rx="4" stroke="var(--c-model)" strokeOpacity=".9" />
      <path d="M57 38l6-7 5 3 8-10" stroke="var(--c-model)" strokeOpacity=".7" />
      <path d="M57 26h20" stroke="var(--c-model)" strokeOpacity=".4" strokeDasharray="2 2" />
      <path d="M86 31h12" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />
      {/* agent: diamond */}
      <path d="M114 19l12 12-12 12-12-12z" stroke="var(--c-agent)" strokeOpacity=".9" />
      {/* tools: three small stores the agent reads from, loop arrows back */}
      <path d="M130 24h10M130 31h10M130 38h10" stroke="var(--c-flow)" strokeOpacity=".7" strokeDasharray="2 2" />
      <rect x="144" y="8" width="30" height="12" rx="3" stroke="var(--c-store)" strokeOpacity=".9" />
      <rect x="144" y="25" width="30" height="12" rx="3" stroke="var(--c-store)" strokeOpacity=".65" />
      <rect x="144" y="42" width="30" height="12" rx="3" stroke="var(--c-store)" strokeOpacity=".45" />
      <path d="M150 14h12M150 31h16M150 48h10" stroke="var(--c-store)" strokeOpacity=".5" />
      <path d="M178 31h14" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />
      {/* triage report: checked document */}
      <rect x="196" y="15" width="38" height="32" rx="5" stroke="var(--c-flow)" strokeOpacity=".9" />
      <path d="M203 24h16M203 30h22" stroke="var(--c-flow)" strokeOpacity=".45" />
      <path d="M206 38l5 5 11-11" stroke="var(--c-flow)" strokeWidth="1.6" />
    </svg>
  );
}
