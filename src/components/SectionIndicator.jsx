// components/SectionIndicator.jsx
import React from 'react';
import useScrollSection from '../hooks/useScrollSection';

const SectionIndicator = () => {
  const section = useScrollSection();

  return (
    <div style={{
      position: 'fixed',
      right: '20px',
      top: '20px',
      background: '#222',
      padding: '6px 12px',
      borderRadius: '6px',
      color: '#fff',
      fontWeight: 'bold',
      zIndex: 999
    }}>
      {section || '—'}
    </div>
  );
};

export default SectionIndicator;
