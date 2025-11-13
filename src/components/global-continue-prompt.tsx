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

// Routes where we should NOT show the modal (auth pages, etc.)
const excludedRoutes = [
  '/login',
  '/signup',
  '/register',
  '/continue',
  '/jobcy/user/auth/login',
  '/jobcy/user/auth/signup',
  '/jobcy/hr/auth/login',
  '/jobcy/admin/auth/login',
  '/jobcy/company/auth/login',
];

export default function GlobalContinuePrompt() {
  const pathname = usePathname();
  const [showContinueModal, setShowContinueModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      return;
    }

    // Don't show on excluded routes
    const currentPath = pathname || window.location.pathname;
    const isExcluded = excludedRoutes.some(route => 
      currentPath === route || currentPath.startsWith(route)
    );

    if (isExcluded) {
      setHasChecked(true);
      return;
    }

    // Check for registered email
    let email = localStorage.getItem('registeredEmail');
    
    // Fallback: check stored user object for email
    if (!email || email.trim() === '') {
      const userStr = localStorage.getItem('user');
      console.log('[GLOBAL_CONTINUE] Checking user object for email, userStr exists:', !!userStr);
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          console.log('[GLOBAL_CONTINUE] Parsed user object:', user);
          if (user && user.email && typeof user.email === 'string' && user.email.trim() !== '') {
            email = user.email.trim();
            console.log('[GLOBAL_CONTINUE] Found email in user object:', email);
            if (email) {
              localStorage.setItem('registeredEmail', email);
            }
          }
        } catch (e) {
          console.error('[GLOBAL_CONTINUE] Error parsing user object:', e);
        }
      }
    }
    
    // If registered email exists, show modal on EVERY visit
    // Add a small delay to avoid jarring immediate popup
    if (email && email.trim() !== '') {
      console.log('[GLOBAL_CONTINUE] Found registered email, showing continue modal (every visit)');
      setRegisteredEmail(email);
      // Show modal after a short delay for better UX
      const timer = setTimeout(() => {
        setShowContinueModal(true);
      }, 1000); // 1 second delay
      
      setHasChecked(true);
      return () => clearTimeout(timer);
    }
    
    setHasChecked(true);
  }, [pathname]);

  // Don't render anything until we've checked
  if (!hasChecked) {
    return null;
  }

  // Show continue modal if email found
  if (showContinueModal && registeredEmail) {
    return (
      <ContinueModal
        registeredEmail={registeredEmail}
        redirectTo={pathname || window.location.pathname}
        onClose={() => {
          setShowContinueModal(false);
          // If token is valid, allow access after closing
          const token = localStorage.getItem('token');
          if (token && isValidToken(token)) {
            // User confirmed, allow them to continue
            console.log('[GLOBAL_CONTINUE] User confirmed, allowing access');
          } else {
            // No valid token, but user closed modal - they can still browse
            console.log('[GLOBAL_CONTINUE] User closed modal without action');
          }
        }}
      />
    );
  }

  return null;
}

