import React from 'react';

// phone video -> pose skeleton -> stroke peaks -> measures/score -> coach report
export default function SportIQGlyph() {
  return (
    <svg
      viewBox="0 0 250 62"
      fill="none"
      role="img"
      aria-label="A phone video becomes a tracked skeleton, strokes are detected from speed peaks, measured and scored, then a coaching report is written"
    >
      <rect x="10" y="12" width="22" height="38" rx="4" stroke="var(--c-doc)" strokeOpacity=".85" />
      <path d="M17 18h8M21 44v2" stroke="var(--c-doc)" strokeOpacity=".45" />
      <path d="M38 31h12" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />
      <circle cx="68" cy="16" r="4" stroke="var(--c-store)" strokeOpacity=".9" />
      <path d="M68 20v14M68 24l-9 6M68 24l10-8M68 34l-6 12M68 34l7 12" stroke="var(--c-store)" strokeOpacity=".9" />
      <path d="M90 31h12" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />
      <path d="M108 44c5 0 6-24 10-24s4 20 8 20 4-28 8-28 4 32 8 32 4-18 8-18 4 14 8 14" stroke="var(--c-model)" strokeOpacity=".9" />
      <circle cx="126" cy="20" r="2" fill="var(--c-model)" fillOpacity=".8" />
      <circle cx="142" cy="12" r="2" fill="var(--c-model)" fillOpacity=".8" />
      <path d="M166 31h12" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />
      <rect x="184" y="14" width="56" height="34" rx="5" stroke="var(--c-agent)" strokeOpacity=".9" />
      <path d="M191 23h26M191 30h36M191 37h20" stroke="var(--c-agent)" strokeOpacity=".55" />
      <path d="M225 21h8" stroke="var(--c-flow)" strokeOpacity=".9" />
    </svg>
  );
}
