'use client';

import { useState, useEffect } from 'react';
import SharedNav from '@/components/shared-nav';
import HeroContent from './HeroContent';

export default function HeroWithNav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex flex-col overflow-hidden" style={{ zIndex: 1 }}>
      {/* Background Image with Ken Burns Effect */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <div 
          className="kenburns-top w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop)',
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#083D77]/80 via-[#083D77]/70 to-[#083D77]/90" />
      </div>

      {/* Glass Navigation Bar */}
      <SharedNav isScrolled={isScrolled} showAnimatedLine={true} />

      {/* Hero Content */}
      <HeroContent />
    </section>
  );
}

