"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// Public routes that don't require authentication
const publicRoutes = [
  "/login",
  "/signup",
  "/jobcy/user/auth/login",
  "/jobcy/user/auth/signup",
  "/jobcy/hr/auth/login",
  "/jobcy/admin/auth/login",
  "/jobcy/company/auth/login",
];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Check if current route is public
    const isPublic = publicRoutes.some(route => 
      pathname === route || pathname?.startsWith(route)
    );

    if (isPublic) {
      setIsAuthenticated(true);
      return;
    }

    // Check for token in localStorage
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      // Redirect to login with current path as redirect parameter
      const loginUrl = `/login?redirect=${encodeURIComponent(pathname || "/")}`;
      router.push(loginUrl);
    }
  }, [pathname, router]);

  // Show nothing while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // If authenticated or on public route, show children
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // If not authenticated, show loading (redirect is happening)
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center">
      <div className="text-white">Redirecting to login...</div>
    </div>
  );
}

