'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function TutorialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check authentication immediately on mount
    const token = localStorage.getItem('token');
    if (!token || token.trim() === '') {
      // Force immediate redirect
      const currentPath = pathname || '/tutorials';
      window.location.href = `/signup?redirect=${encodeURIComponent(currentPath)}`;
      return;
    }
    setIsAuthenticated(true);
  }, [pathname]);

  // Don't render anything until we've checked authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-white text-xl">Checking authentication...</div>
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

