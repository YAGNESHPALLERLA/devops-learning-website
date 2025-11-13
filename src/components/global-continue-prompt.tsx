'use client';

import { useEffect, useState, useRef } from 'react';
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
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isCheckingRef = useRef<boolean>(false); // Track if we're already checking
  const hasProcessedSessionRef = useRef<boolean>(false); // Track if we've already processed this session
  const sessionKey = 'continueModalShown';

  // Initialize: Check sessionStorage once on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const hasShownInSession = sessionStorage.getItem(sessionKey) === 'true';
    if (hasShownInSession) {
      hasProcessedSessionRef.current = true;
      setHasChecked(true);
    }
  }, []); // Run only once on mount

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') {
      return;
    }

    // CRITICAL: Check sessionStorage FIRST - before ANY other checks
    // This ensures modal only shows once per session regardless of navigation
    const hasShownInSession = sessionStorage.getItem(sessionKey) === 'true';
    
    if (hasShownInSession) {
      // If already shown in session, skip everything immediately
      // Don't even check pathname or anything else
      if (!hasChecked) {
        setHasChecked(true);
      }
      return;
    }
    
    // If we've already processed this session (even if sessionStorage wasn't set yet), skip
    if (hasProcessedSessionRef.current) {
      return;
    }

    // Use a function to check current path (called when needed)
    const checkAndShowModal = () => {
      const currentPath = pathname || window.location.pathname;
      
      // Don't show on excluded routes
      const isExcluded = excludedRoutes.some(route => 
        currentPath === route || currentPath.startsWith(route)
      );

      if (isExcluded) {
        setHasChecked(true);
        return false;
      }

      // Only show for tutorials dropdown routes
      const isTutorialDropdownRoute = 
        tutorialsDropdownRoutes.some(route => 
          currentPath === route || currentPath.startsWith(route + '/')
        );

      if (!isTutorialDropdownRoute) {
        setHasChecked(true);
        return false;
      }
      
      return true; // Should show modal
    };
    
    // Check if we should show modal for current route
    if (!checkAndShowModal()) {
      return;
    }
    
    // Prevent multiple simultaneous checks
    if (isCheckingRef.current) {
      console.log('[GLOBAL_CONTINUE] Already checking, skipping duplicate check');
      return;
    }
    
    // If we've already checked and set hasChecked, don't check again
    if (hasChecked) {
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
    
    // Mark that we're checking to prevent duplicate checks
    isCheckingRef.current = true;
    
    // Create async function to check email
    const checkEmailInDatabase = async () => {
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
          // IMPORTANT: Mark as processed and shown IMMEDIATELY to prevent showing on navigation
          hasProcessedSessionRef.current = true;
          sessionStorage.setItem(sessionKey, 'true');
          
          console.log('[GLOBAL_CONTINUE] ✅ Email verified in database, showing continue modal (once per session)');
          setRegisteredEmail(email.trim());
          // Show modal after a short delay for better UX
          timerRef.current = setTimeout(() => {
            setShowContinueModal(true);
          }, 1000); // 1 second delay
          
          setHasChecked(true);
        } else {
          console.log('[GLOBAL_CONTINUE] ❌ Email not found in database:', data.message || 'Email does not exist');
          // Email not in database - clear it from localStorage
          localStorage.removeItem('registeredEmail');
          // Mark as processed so we don't check again this session
          hasProcessedSessionRef.current = true;
          sessionStorage.setItem(sessionKey, 'true'); // Mark as shown to prevent re-checking
          setHasChecked(true);
        }
      } catch (error) {
        console.error('[GLOBAL_CONTINUE] Error checking email in database:', error);
        // On error, don't show modal to be safe
        // Mark as processed so we don't check again this session
        hasProcessedSessionRef.current = true;
        sessionStorage.setItem(sessionKey, 'true'); // Mark as shown to prevent re-checking
        setHasChecked(true);
      } finally {
        // Reset checking flag
        isCheckingRef.current = false;
      }
    };
    
    // Call the async function
    checkEmailInDatabase();
    
    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [pathname]); // Include pathname to check on navigation, but sessionStorage check FIRST prevents re-processing

  // Don't render anything until we've checked
  if (!hasChecked) {
    return null;
  }

  // Check if modal should be shown - verify sessionStorage hasn't changed
  const sessionKey = 'continueModalShown';
  const hasShownInSession = typeof window !== 'undefined' && sessionStorage.getItem(sessionKey) === 'true';
  
  // If sessionStorage says it's been shown, but modal state says show, hide it
  if (hasShownInSession && showContinueModal) {
    setShowContinueModal(false);
  }

  // Show continue modal if email found and not already shown in session
  if (showContinueModal && registeredEmail && !hasShownInSession) {
    return (
      <ContinueModal
        registeredEmail={registeredEmail}
        redirectTo={pathname || window.location.pathname}
        onClose={() => {
          setShowContinueModal(false);
          // Mark as shown in this session so it doesn't show again
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('continueModalShown', 'true');
            hasProcessedSessionRef.current = true;
          }
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

