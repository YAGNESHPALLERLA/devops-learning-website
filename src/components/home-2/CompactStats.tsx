'use client';

import { useState } from 'react';
import StatsCounter from '@/components/stats-counter';
import CompactSection from './CompactSection';

export default function CompactStats() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <CompactSection
      title="Join Our Growing Community"
      subtitle="Be part of a thriving community of learners and professionals"
      backgroundColor="var(--bg-secondary)"
    >
      <div 
        className="max-w-4xl mx-auto glass rounded-lg p-4 card-hover-effect hover-glow-soft"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          backgroundColor: isHovered ? 'rgba(122, 148, 165, 0.25)' : 'rgba(122, 148, 165, 0.15)',
          border: isHovered ? '2px solid rgba(8, 61, 119, 0.4)' : '2px solid rgba(8, 61, 119, 0.3)',
        }}
      >
        <StatsCounter />
      </div>
    </CompactSection>
  );
}

