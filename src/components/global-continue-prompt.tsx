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

// Only show modal for tutorials dropdown routes
const tutorialsDropdownRoutes = [
  '/tutorials/medical-coding',
  '/tutorials/programming',
  '/tutorials/government-jobs',
  '/tutorials/courses',
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

    const currentPath = pathname || window.location.pathname;
    
    // Don't show on excluded routes
    const isExcluded = excludedRoutes.some(route => 
      currentPath === route || currentPath.startsWith(route)
    );

    if (isExcluded) {
      setHasChecked(true);
      return;
    }

    // Only show for tutorials dropdown routes
    const isTutorialDropdownRoute = 
      tutorialsDropdownRoutes.some(route => 
        currentPath === route || currentPath.startsWith(route + '/')
      );

    if (!isTutorialDropdownRoute) {
      setHasChecked(true);
      return;
    }

    // Check if modal has already been shown in this session
    const sessionKey = 'continueModalShown';
    const hasShownInSession = sessionStorage.getItem(sessionKey) === 'true';
    
    if (hasShownInSession) {
      console.log('[GLOBAL_CONTINUE] Modal already shown in this session, skipping');
      setHasChecked(true);
      return;
    }

    // Check for registered email in localStorage
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
    
    // If no email found, don't show modal
    if (!email || email.trim() === '') {
      console.log('[GLOBAL_CONTINUE] No registered email found in localStorage');
      setHasChecked(true);
      return;
    }
    
    // Verify email exists in database before showing modal
    console.log('[GLOBAL_CONTINUE] Checking if email exists in database:', email);
    try {
      const response = await fetch('/api/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.exists === true) {
        console.log('[GLOBAL_CONTINUE] ✅ Email verified in database, showing continue modal (once per session)');
        setRegisteredEmail(email.trim());
        // Show modal after a short delay for better UX
        const timer = setTimeout(() => {
          setShowContinueModal(true);
          // Mark as shown in this session
          sessionStorage.setItem(sessionKey, 'true');
        }, 1000); // 1 second delay
        
        setHasChecked(true);
        return () => clearTimeout(timer);
      } else {
        console.log('[GLOBAL_CONTINUE] ❌ Email not found in database:', data.message || 'Email does not exist');
        // Email not in database - clear it from localStorage
        localStorage.removeItem('registeredEmail');
        setHasChecked(true);
        return;
      }
    } catch (error) {
      console.error('[GLOBAL_CONTINUE] Error checking email in database:', error);
      // On error, don't show modal to be safe
      setHasChecked(true);
      return;
    }
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
          // Mark as shown in this session so it doesn't show again
          sessionStorage.setItem('continueModalShown', 'true');
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

