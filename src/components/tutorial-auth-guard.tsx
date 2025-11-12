'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import ContinueModal from '@/components/continue-modal';

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
  const [showContinueModal, setShowContinueModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);

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
      
      // Check for registered email
      let email = localStorage.getItem('registeredEmail');
      
      // Fallback: check stored user object for email
      if (!email || email.trim() === '') {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          try {
            const user = JSON.parse(userStr);
            if (user && user.email && typeof user.email === 'string') {
              email = user.email;
              if (email && email.trim() !== '') {
                localStorage.setItem('registeredEmail', email);
              }
            }
          } catch (e) {
            // Ignore parse errors
          }
        }
      }
      
      if (email && email.trim() !== '') {
        // Show continue modal instead of redirecting
        console.log('[TUTORIAL_AUTH] Found registered email, showing continue modal');
        setRegisteredEmail(email);
        setShowContinueModal(true);
        setIsAuthenticated(false);
        return;
      }
      
      // No registered email, redirect to registration
      const redirectUrl = `/register?redirect=${encodeURIComponent(currentPath)}`;
      console.log('[TUTORIAL_AUTH] Not authenticated, redirecting to:', redirectUrl);
      window.location.href = redirectUrl;
      setIsAuthenticated(false);
      return;
    }
    
    // Token is valid
    setIsAuthenticated(true);
  }, [pathname]);

  // Show nothing while checking
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // Show continue modal if email found
  if (showContinueModal && registeredEmail) {
    return (
      <>
        <div className="min-h-screen bg-[#1a1a1a]">
          {children}
        </div>
        <ContinueModal
          registeredEmail={registeredEmail}
          redirectTo={pathname || window.location.pathname}
          onClose={() => setShowContinueModal(false)}
        />
      </>
    );
  }

  // Show nothing if not authenticated (redirecting)
  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center">
        <div className="text-white">Redirecting...</div>
      </div>
    );
  }

  // Only render children if authenticated
  return <>{children}</>;
}

