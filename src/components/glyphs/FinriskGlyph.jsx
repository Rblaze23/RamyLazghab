import React from 'react';

// loan records -> feature store -> credit models (scorecard / XGBoost) -> validation & monitoring -> guarded audit report
export default function FinriskGlyph() {
  return (
    <svg
      viewBox="0 0 250 62"
      fill="none"
      role="img"
      aria-label="Loan records fed into a feature store, scored by scorecard and tree models, audited by a validation suite across vintages, then compiled into a guarded report"
    >
      {/* loan records: ledger document */}
      <rect x="8" y="14" width="24" height="34" rx="4" stroke="var(--c-doc)" strokeOpacity=".85" />
      <path d="M14 22h12M14 28h12M14 34h8" stroke="var(--c-doc)" strokeOpacity=".45" strokeLinecap="round" />
      <path d="M36 31h12" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />

      {/* feature store / database */}
      <rect x="52" y="17" width="28" height="28" rx="4" stroke="var(--c-store)" strokeOpacity=".85" />
      <path d="M58 24h16M58 31h16M58 38h10" stroke="var(--c-store)" strokeOpacity=".5" strokeLinecap="round" />
      <path d="M84 31h12" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />

      {/* scorecard & challenger models: ROC / calibration curve */}
      <rect x="100" y="17" width="34" height="28" rx="4" stroke="var(--c-model)" strokeOpacity=".9" />
      <path d="M106 39c4-2 8-8 12-12s6-4 10-6" stroke="var(--c-model)" strokeOpacity=".85" strokeWidth="1.4" />
      <path d="M106 39l22-18" stroke="var(--c-model)" strokeOpacity=".35" strokeDasharray="2 2" />
      <path d="M138 31h12" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />

      {/* validation & vintage monitor: alert signal */}
      <rect x="154" y="17" width="34" height="28" rx="4" stroke="var(--c-flow)" strokeOpacity=".85" />
      <path d="M159 33h6l4-8 4 12 4-6h6" stroke="var(--c-flow)" strokeOpacity=".85" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="173" cy="25" r="2" fill="var(--c-model)" fillOpacity=".9" />
      <path d="M192 31h12" stroke="var(--c-flow)" strokeOpacity=".85" strokeDasharray="3 3" />

      {/* guarded validation report: verified document with badge */}
      <rect x="208" y="13" width="34" height="36" rx="5" stroke="var(--c-agent)" strokeOpacity=".9" />
      <path d="M214 22h14M214 28h22M214 34h12" stroke="var(--c-agent)" strokeOpacity=".5" strokeLinecap="round" />
      <path d="M225 40l3 3 7-7" stroke="var(--c-flow)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
