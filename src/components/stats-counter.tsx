'use client';

import { useEffect, useState, useRef } from 'react';

interface StatItemProps {
  end: number;
  duration: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

function StatItem({ end, duration, label, suffix = '', prefix = '' }: StatItemProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [end, duration, isVisible]);

  return (
    <div ref={ref} className="text-center p-6">
      <div className="text-5xl md:text-6xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
        {prefix}{count}{suffix}
      </div>
      <div className="h-1 w-16 mx-auto mb-3" style={{ backgroundColor: 'var(--corp-accent)' }}></div>
      <div className="text-lg font-medium" style={{ color: 'var(--text-secondary)' }}>{label}</div>
    </div>
  );
}

interface StatsCounterProps {
  className?: string;
}

export default function StatsCounter({ className = '' }: StatsCounterProps) {
  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <StatItem end={8} duration={2000} label="Technologies" suffix="+" />
        <StatItem end={150} duration={2500} label="Video Tutorials" suffix="+" />
        <StatItem end={100} duration={2000} label="Hours of Content" suffix="+" />
        <StatItem end={50} duration={2500} label="Topics Covered" suffix="+" />
      </div>
    </div>
  );
}

