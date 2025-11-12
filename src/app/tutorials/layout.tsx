'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function TutorialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Synchronous check before any rendering - CRITICAL: This runs before React renders
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (!token || token.trim() === '') {
      // IMMEDIATE blocking redirect - prevents ANY rendering
      const currentPath = pathname || '/tutorials';
      // Use window.location.replace for immediate redirect (no back button)
      window.location.replace(`/signup?redirect=${encodeURIComponent(currentPath)}`);
      // Return null to prevent any rendering
      return null;
    }
  }

  useEffect(() => {
    // Double-check on mount
    const token = localStorage.getItem('token');
    if (!token) {
      const currentPath = pathname || '/tutorials';
      window.location.href = `/signup?redirect=${encodeURIComponent(currentPath)}`;
    }
  }, [pathname]);

  return <>{children}</>;
}

