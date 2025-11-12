'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// Helper function to validate JWT token
function isValidToken(token: string): boolean {
  if (!token || token.trim() === '' || token === 'null' || token === 'undefined') {
    return false;
  }
  
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return false; // Invalid JWT format
    }
    
    // Check if token is expired
    const payload = JSON.parse(atob(parts[1]));
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return false; // Token expired
    }
    
    return true; // Token is valid
  } catch {
    return false; // Invalid token format
  }
}

export default function TutorialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ALL HOOKS MUST BE CALLED FIRST - before any conditional returns
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(() => {
    // IMMEDIATE synchronous check - runs before any rendering
    if (typeof window === 'undefined') {
      return null;
    }
    
    const token = localStorage.getItem('token');
    const currentPath = window.location.pathname || '/tutorials';
    
    // Validate token
    if (!isValidToken(token || '')) {
      // Remove invalid token
      if (token) {
        localStorage.removeItem('token');
      }
      // Use replace for immediate redirect - prevents back button
      window.location.replace(`/signup?redirect=${encodeURIComponent(currentPath)}`);
      return false; // Return false to prevent rendering
    }
    
    return true; // Token exists and is valid, allow rendering
  });

  useEffect(() => {
    // Double-check on mount - runs immediately after component mounts
    if (typeof window === 'undefined') {
      return;
    }
    
    const token = localStorage.getItem('token');
    const currentPath = pathname || window.location.pathname || '/tutorials';
    
    // Validate token
    if (!isValidToken(token || '')) {
      // Remove invalid token
      if (token) {
        localStorage.removeItem('token');
      }
      window.location.replace(`/signup?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }
    
    // Token exists and is valid, set authenticated
    setIsAuthenticated(true);
  }, [pathname]);

  // IMMEDIATE check after hooks - runs before rendering
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    const currentPath = window.location.pathname || '/tutorials';
    
    // Validate token
    if (!isValidToken(token || '')) {
      // Remove invalid token
      if (token) {
        localStorage.removeItem('token');
      }
      // Use replace for immediate redirect - prevents back button
      window.location.replace(`/signup?redirect=${encodeURIComponent(currentPath)}`);
      return null; // Return null immediately - prevents any rendering
    }
  }

  // Don't render anything if not authenticated or still checking
  if (isAuthenticated === null || isAuthenticated === false) {
    return null; // Return null - prevents any rendering
  }

  // Only render children if authenticated
  return <>{children}</>;
}

