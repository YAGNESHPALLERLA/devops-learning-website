'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function TutorialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    // Check authentication immediately
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    if (!token) {
      // Force immediate redirect to signup
      const currentPath = pathname || '/tutorials';
      window.location.href = `/signup?redirect=${encodeURIComponent(currentPath)}`;
    }
  }, [pathname]);

  // Check if authenticated before rendering
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (!token) {
      return (
        <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
          <div className="text-white text-xl">Redirecting to registration page...</div>
        </div>
      );
    }
  }

  return <>{children}</>;
}

