'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function TutorialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(() => {
    // IMMEDIATE synchronous check - runs before any rendering
    if (typeof window === 'undefined') {
      return null;
    }
    
    const token = localStorage.getItem('token');
    const currentPath = window.location.pathname || '/tutorials';
    
    // If no token or invalid token, redirect IMMEDIATELY
    if (!token || token.trim() === '' || token === 'null' || token === 'undefined') {
      // Use replace for immediate redirect - prevents back button
      window.location.replace(`/signup?redirect=${encodeURIComponent(currentPath)}`);
      return false; // Return false to prevent rendering
    }
    
    return true; // Token exists, allow rendering
  });

  useEffect(() => {
    // Double-check on mount - runs immediately after component mounts
    if (typeof window === 'undefined') {
      return;
    }
    
    const token = localStorage.getItem('token');
    const currentPath = pathname || window.location.pathname || '/tutorials';
    
    // If no token or invalid token, redirect IMMEDIATELY
    if (!token || token.trim() === '' || token === 'null' || token === 'undefined') {
      window.location.replace(`/signup?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }
    
    // Token exists, set authenticated
    setIsAuthenticated(true);
  }, [pathname]);

  // Don't render anything if not authenticated or still checking
  if (isAuthenticated === null || isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-white text-xl">Redirecting to registration...</div>
      </div>
    );
  }

  // Only render children if authenticated
  return <>{children}</>;
}

