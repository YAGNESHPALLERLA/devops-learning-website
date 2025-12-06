"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import SharedNav from "@/components/shared-nav";

export function ConditionalNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide ConditionalNav on home route (it has its own navigation)
  if (pathname === '/') {
    return null;
  }

  return (
    <SharedNav isScrolled={isScrolled} showAnimatedLine={false} />
  );
}
