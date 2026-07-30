import React from 'react';

// customer documents -> LLM understanding -> generated sections
//                    -> validation agents -> human review
//
// CONFIDENTIALITY: same rule as OracleGlyph. This shows only what the approved
// copy already says in words. No internal steps, no named tooling.
export default function PifGlyph() {
  return (
    <svg
      viewBox="0 0 250 62"
      fill="none"
      role="img"
      aria-label="Customer documents interpreted by a language model, drafted into sections, checked by validation agents, then reviewed by a person"
    >
      {/* customer documents */}
      <rect x="8" y="13" width="28" height="36" rx="3" stroke="var(--c-doc)" strokeOpacity=".85" />
      <path d="M14 22h16M14 29h16M14 36h10" stroke="var(--c-doc)" strokeOpacity=".45" />

      <path d="M42 31h14" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />

      {/* language model reading them */}
      <rect x="62" y="18" width="40" height="26" rx="7" stroke="var(--c-agent)" strokeOpacity=".9" />
      <path d="M72 31h5M84 26h9M84 36h9M72 26h2M72 36h2" stroke="var(--c-agent)" strokeOpacity=".6" />

      <path d="M108 31h12" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />

      {/* generated sections, independently addressable */}
      <rect x="126" y="10" width="32" height="12" rx="3" stroke="var(--c-store)" strokeOpacity=".9" />
      <rect x="126" y="25" width="32" height="12" rx="3" stroke="var(--c-store)" strokeOpacity=".9" />
      <rect x="126" y="40" width="32" height="12" rx="3" stroke="var(--c-store)" strokeOpacity=".55" />

      <path d="M164 16h10v15h10M164 31h20M164 46h10V31" stroke="var(--c-flow)" strokeOpacity=".8" strokeDasharray="3 3" />

      {/* validation */}
      <rect x="190" y="19" width="26" height="24" rx="5" stroke="var(--c-flow)" strokeOpacity=".9" />
      <path d="M197 31l4 4 7-8" stroke="var(--c-flow)" strokeWidth="1.5" />

      <path d="M220 31h6" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />

      {/* human review */}
      <circle cx="238" cy="27" r="5" stroke="var(--c-doc)" strokeOpacity=".9" />
      <path d="M230 43a8 8 0 0116 0" stroke="var(--c-doc)" strokeOpacity=".9" />
    </svg>
  );
}
