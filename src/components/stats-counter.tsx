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
    <div ref={ref} className="text-center p-6 rounded-xl bg-[#252525] border border-gray-600 hover:border-rose-500 transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/20 transform hover:scale-105">
      <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-600 mb-2">
        {prefix}{count}{suffix}
      </div>
      <div className="text-white text-lg font-medium">{label}</div>
    </div>
  );
}

export default function StatsCounter() {
  return (
    <section className="py-16 px-4 bg-[#1a1a1a]">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Platform at a Glance
          </h2>
          <p className="text-white text-lg">
            Join thousands of learners mastering technology
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <StatItem end={8} duration={2000} label="Technologies" suffix="+" />
          <StatItem end={150} duration={2500} label="Video Tutorials" suffix="+" />
          <StatItem end={100} duration={2000} label="Hours of Content" suffix="+" />
          <StatItem end={50} duration={2500} label="Topics Covered" suffix="+" />
        </div>
      </div>
    </section>
  );
}

