'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import TypingText from './TypingText';
import HeroSignIn from './HeroSignIn';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export default function HeroContent() {
  const { ref, isVisible, hasBeenVisible } = useScrollAnimation({ 
    threshold: 0.3,
    triggerOnce: false 
  });
  const [shouldType, setShouldType] = useState(false);

  useEffect(() => {
    if (isVisible && !shouldType) {
      setShouldType(true);
    } else if (!isVisible && hasBeenVisible) {
      // Reset when scrolled out of view
      setShouldType(false);
    }
  }, [isVisible, hasBeenVisible, shouldType]);

  return (
    <div ref={ref} className="flex-1 flex items-center justify-center relative z-0 px-4 py-12">
      <div className="container mx-auto grid lg:grid-cols-2 gap-8 items-center max-w-6xl">
        <div className="text-center lg:text-left">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">
          <span className={`inline-block transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Your Career Journey Starts Here —
          </span>
          <br />
          <span 
            className={`text-[#EBEBD3] inline-block transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-10'}`}
            style={{ animationDelay: '0.3s' }}
          >
            <TypingText 
              text="Learn, Grow, Succeed"
              speed={80}
              delay={500}
              className="text-[#EBEBD3]"
              trigger={shouldType}
            />
          </span>
        </h1>
        <p 
          className={`text-base md:text-lg text-white/90 mb-6 max-w-2xl mx-auto lg:mx-0 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0 delay-700' : 'opacity-0 -translate-x-10'}`}
          style={{ animationDelay: '0.7s' }}
        >
          <TypingText 
            text="Find job opportunities and enhance your skills to achieve your career goals."
            speed={30}
            delay={1500}
            className="text-white/90"
            trigger={shouldType}
          />
        </p>
        <div 
          className={`flex flex-col sm:flex-row gap-3 justify-center lg:justify-start transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100 delay-1000' : 'opacity-0 scale-95'}`}
          style={{ animationDelay: '1s' }}
        >
          <Link
            href="/register"
            className="group relative px-8 py-4 text-white font-bold rounded-xl transition-all duration-300 overflow-hidden text-base shadow-xl"
            style={{
              background: 'linear-gradient(135deg, #7A94A5 0%, #083D77 100%)',
              boxShadow: '0 8px 25px rgba(8, 61, 119, 0.4)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(8, 61, 119, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(8, 61, 119, 0.4)';
            }}
          >
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(235, 235, 211, 0.2) 0%, transparent 100%)' }} />
          </Link>
          <Link
            href="/tutorials"
            className="group relative px-8 py-4 glass text-white font-bold rounded-xl transition-all duration-300 overflow-hidden text-base shadow-xl border-2 border-white/20"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
            }}
          >
            <span className="relative z-10">Explore Courses</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)' }} />
          </Link>
        </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <HeroSignIn />
        </div>
      </div>
    </div>
  );
}

