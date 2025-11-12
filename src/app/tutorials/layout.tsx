'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// Check auth immediately before component renders
let authChecked = false;
let redirecting = false;

if (typeof window !== 'undefined' && !authChecked) {
  authChecked = true;
  const token = localStorage.getItem('token');
  if (!token || token.trim() === '') {
    const currentPath = window.location.pathname || '/tutorials';
    redirecting = true;
    window.location.replace(`/signup?redirect=${encodeURIComponent(currentPath)}`);
  }
}

export default function TutorialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(() => {
    // Initial state check - runs synchronously
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      return token && token.trim() !== '' ? true : null;
    }
    return null;
  });

  useEffect(() => {
    // Double-check on mount
    const token = localStorage.getItem('token');
    if (!token || token.trim() === '') {
      const currentPath = pathname || window.location.pathname || '/tutorials';
      window.location.replace(`/signup?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }
    setIsAuthenticated(true);
  }, [pathname]);

  // If redirecting, show nothing
  if (redirecting || isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-white text-xl">Redirecting to registration...</div>
      </div>
    );
  }

  // If not authenticated (shouldn't reach here due to redirect, but safety check)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-white text-xl">Redirecting to registration page...</div>
      </div>
    );
  }

  return <>{children}</>;
}

