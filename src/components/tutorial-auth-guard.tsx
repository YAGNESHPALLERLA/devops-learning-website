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

export default function TutorialAuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // IMMEDIATE check - don't wait
    if (typeof window === 'undefined') {
      return;
    }

    const currentPath = pathname || window.location.pathname;
    const token = localStorage.getItem('token');
    
    // Validate token
    if (!isValidToken(token || '')) {
      // Remove invalid token
      if (token) {
        localStorage.removeItem('token');
      }
      // IMMEDIATELY redirect to registration - use href for immediate redirect
      const redirectUrl = `/register?redirect=${encodeURIComponent(currentPath)}`;
      console.log('[TUTORIAL_AUTH] Not authenticated, redirecting to:', redirectUrl);
      window.location.href = redirectUrl; // Use href instead of replace for more immediate redirect
      setIsAuthenticated(false);
      return;
    }
    
    // Token is valid
    setIsAuthenticated(true);
  }, [pathname]);

  // Show nothing while checking or if not authenticated
  if (isAuthenticated === null || isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center">
        <div className="text-white">Redirecting to registration...</div>
      </div>
    );
  }

  // Only render children if authenticated
  return <>{children}</>;
}

