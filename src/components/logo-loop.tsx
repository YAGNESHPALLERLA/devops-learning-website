'use client';

import { useEffect, useRef } from 'react';

interface LogoLoopProps {
  speed?: number;
  logoHeight?: number;
  className?: string;
}

export default function LogoLoop({ 
  speed = 160, 
  logoHeight = 40, 
  className = '' 
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationId: number;
    let currentPosition = 0;

    const animate = () => {
      if (container) {
        currentPosition -= speed / 60; // 60fps
        const totalWidth = container.scrollWidth / 2;
        
        if (currentPosition <= -totalWidth) {
          currentPosition = 0;
        }
        
        container.style.transform = `translateX(${currentPosition}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    // Start animation
    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [speed]);

  const logos = [
    { name: 'TypeScript', icon: 'TS' },
    { name: 'Vercel', icon: '▲' },
    { name: 'GitHub', icon: '🐙' },
    { name: 'Docker', icon: '🐳' },
    { name: 'Next.js', icon: '▲' },
    { name: 'Lightning', icon: '⚡' },
    { name: 'Svelte', icon: 'S' },
    { name: 'React', icon: '⚛️' },
    { name: 'Node.js', icon: 'N' },
    { name: 'Python', icon: '🐍' },
    { name: 'Java', icon: '☕' },
    { name: 'JavaScript', icon: 'JS' },
    { name: 'HTML', icon: '🌐' },
    { name: 'CSS', icon: '🎨' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'Redis', icon: '🔴' },
    { name: 'AWS', icon: '☁️' },
    { name: 'Kubernetes', icon: '⚙️' },
    { name: 'Linux', icon: '🐧' }
  ];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        ref={containerRef}
        className="flex items-center"
        style={{
          height: `${logoHeight + 20}px`,
          width: '200%'
        }}
      >
        {/* First set of logos */}
        <div className="flex items-center">
          {logos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="flex items-center justify-center mx-8 whitespace-nowrap"
              style={{ height: `${logoHeight}px` }}
            >
              <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">
                {logo.icon}
              </div>
              <span className="ml-2 text-sm font-medium text-gray-400">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
        
        {/* Duplicate set for seamless loop */}
        <div className="flex items-center">
          {logos.map((logo, index) => (
            <div
              key={`${logo.name}-duplicate-${index}`}
              className="flex items-center justify-center mx-8 whitespace-nowrap"
              style={{ height: `${logoHeight}px` }}
            >
              <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">
                {logo.icon}
              </div>
              <span className="ml-2 text-sm font-medium text-gray-400">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
