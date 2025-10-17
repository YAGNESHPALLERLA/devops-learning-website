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

    // Create the logo elements
    const createLogos = () => {
      const logoElements = logos.map((logo, index) => (
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
      ));
      return logoElements;
    };

    // Duplicate logos for seamless loop
    const allLogos = [...createLogos(), ...createLogos()];

    // Set up the animation
    const animate = () => {
      if (container) {
        const scrollWidth = container.scrollWidth / 2;
        container.scrollLeft += speed / 60; // 60fps
        
        if (container.scrollLeft >= scrollWidth) {
          container.scrollLeft = 0;
        }
      }
      requestAnimationFrame(animate);
    };

    // Start animation
    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [speed]);

  return (
    <div className={`relative overflow-hidden logo-loop ${className}`}>
      <div
        ref={containerRef}
        className="flex items-center"
        style={{
          height: `${logoHeight + 20}px`,
          scrollBehavior: 'auto'
        }}
      >
        {/* First set of logos */}
        <div className="flex items-center animate-scroll">
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">TS</div>
            <span className="ml-2 text-sm font-medium text-gray-400">TypeScript</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">▲</div>
            <span className="ml-2 text-sm font-medium text-gray-400">Vercel</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">🐙</div>
            <span className="ml-2 text-sm font-medium text-gray-400">GitHub</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">🐳</div>
            <span className="ml-2 text-sm font-medium text-gray-400">Docker</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">▲</div>
            <span className="ml-2 text-sm font-medium text-gray-400">Next.js</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">⚡</div>
            <span className="ml-2 text-sm font-medium text-gray-400">Lightning</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">S</div>
            <span className="ml-2 text-sm font-medium text-gray-400">Svelte</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">⚛️</div>
            <span className="ml-2 text-sm font-medium text-gray-400">React</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">N</div>
            <span className="ml-2 text-sm font-medium text-gray-400">Node.js</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">🐍</div>
            <span className="ml-2 text-sm font-medium text-gray-400">Python</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">☕</div>
            <span className="ml-2 text-sm font-medium text-gray-400">Java</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">JS</div>
            <span className="ml-2 text-sm font-medium text-gray-400">JavaScript</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">🌐</div>
            <span className="ml-2 text-sm font-medium text-gray-400">HTML</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">🎨</div>
            <span className="ml-2 text-sm font-medium text-gray-400">CSS</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">🍃</div>
            <span className="ml-2 text-sm font-medium text-gray-400">MongoDB</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">🐘</div>
            <span className="ml-2 text-sm font-medium text-gray-400">PostgreSQL</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">🔴</div>
            <span className="ml-2 text-sm font-medium text-gray-400">Redis</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">☁️</div>
            <span className="ml-2 text-sm font-medium text-gray-400">AWS</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">⚙️</div>
            <span className="ml-2 text-sm font-medium text-gray-400">Kubernetes</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">🐧</div>
            <span className="ml-2 text-sm font-medium text-gray-400">Linux</span>
          </div>
        </div>
        
        {/* Duplicate set for seamless loop */}
        <div className="flex items-center animate-scroll">
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">TS</div>
            <span className="ml-2 text-sm font-medium text-gray-400">TypeScript</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">▲</div>
            <span className="ml-2 text-sm font-medium text-gray-400">Vercel</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">🐙</div>
            <span className="ml-2 text-sm font-medium text-gray-400">GitHub</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">🐳</div>
            <span className="ml-2 text-sm font-medium text-gray-400">Docker</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">▲</div>
            <span className="ml-2 text-sm font-medium text-gray-400">Next.js</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">⚡</div>
            <span className="ml-2 text-sm font-medium text-gray-400">Lightning</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">S</div>
            <span className="ml-2 text-sm font-medium text-gray-400">Svelte</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">⚛️</div>
            <span className="ml-2 text-sm font-medium text-gray-400">React</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">N</div>
            <span className="ml-2 text-sm font-medium text-gray-400">Node.js</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">🐍</div>
            <span className="ml-2 text-sm font-medium text-gray-400">Python</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">☕</div>
            <span className="ml-2 text-sm font-medium text-gray-400">Java</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">JS</div>
            <span className="ml-2 text-sm font-medium text-gray-400">JavaScript</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">🌐</div>
            <span className="ml-2 text-sm font-medium text-gray-400">HTML</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">🎨</div>
            <span className="ml-2 text-sm font-medium text-gray-400">CSS</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">🍃</div>
            <span className="ml-2 text-sm font-medium text-gray-400">MongoDB</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">🐘</div>
            <span className="ml-2 text-sm font-medium text-gray-400">PostgreSQL</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">🔴</div>
            <span className="ml-2 text-sm font-medium text-gray-400">Redis</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">☁️</div>
            <span className="ml-2 text-sm font-medium text-gray-400">AWS</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">⚙️</div>
            <span className="ml-2 text-sm font-medium text-gray-400">Kubernetes</span>
          </div>
          <div className="flex items-center justify-center mx-8 whitespace-nowrap" style={{ height: `${logoHeight}px` }}>
            <div className="text-2xl font-bold text-gray-300 hover:text-white transition-colors duration-300">🐧</div>
            <span className="ml-2 text-sm font-medium text-gray-400">Linux</span>
          </div>
        </div>
      </div>
    </div>
  );
}
