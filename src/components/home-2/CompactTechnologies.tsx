'use client';

import { useState } from 'react';
import LogoLoop from '@/components/logo-loop';
import CompactSection from './CompactSection';

export default function CompactTechnologies() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <CompactSection
      title="Technologies We Teach"
      subtitle="Master the tools that power modern software development"
      backgroundColor="var(--bg-primary)"
    >
      <div 
        className="relative glass rounded-lg p-6 card-hover-effect hover-glow-soft"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          backgroundColor: isHovered 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'rgba(255, 255, 255, 0.9)',
          border: isHovered 
            ? '2px solid rgba(8, 61, 119, 0.5)' 
            : '2px solid rgba(8, 61, 119, 0.3)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }}
      >
        <LogoLoop speed={isHovered ? 140 : 120} logoHeight={40} className="max-w-5xl mx-auto" />
      </div>
    </CompactSection>
  );
}

