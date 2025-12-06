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
        className="relative glass rounded-lg p-4 card-hover-effect hover-glow-soft"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          backgroundColor: isHovered ? 'rgba(122, 148, 165, 0.25)' : 'rgba(122, 148, 165, 0.15)',
          border: isHovered ? '2px solid rgba(8, 61, 119, 0.4)' : '2px solid rgba(8, 61, 119, 0.3)',
        }}
      >
        <LogoLoop speed={isHovered ? 140 : 120} logoHeight={35} className="max-w-5xl mx-auto" />
      </div>
    </CompactSection>
  );
}

