"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// Public routes that don't require authentication
const publicRoutes = [
  "/landing",
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
    // Wait for pathname to be available
    if (!pathname) {
      return;
    }

    // Check if current route is public
    const isPublic = publicRoutes.some(route => 
      pathname === route || pathname.startsWith(route)
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
      // Check if trying to access tutorials or courses - redirect to login
      const isTutorialOrCourse = 
        pathname.startsWith("/tutorials") ||
        pathname === "/java" ||
        pathname === "/python" ||
        pathname === "/sql" ||
        pathname === "/linux" ||
        pathname === "/devops" ||
        pathname === "/web-dev" ||
        pathname === "/data-science" ||
        pathname === "/code-terminal" ||
        pathname === "/terminal" ||
        pathname === "/menu";
      
      if (isTutorialOrCourse) {
        // IMMEDIATELY redirect to signup/registration for tutorials/courses - use replace to prevent back button
        setIsAuthenticated(false);
        window.location.replace(`/signup?redirect=${encodeURIComponent(pathname)}`);
        return;
      } else if (pathname === "/") {
        // Redirect root to landing page
        setIsAuthenticated(false);
        window.location.replace("/landing");
        return;
      } else if (pathname !== "/landing" && pathname !== "/login" && pathname !== "/signup") {
        // Redirect other protected routes to landing
        setIsAuthenticated(false);
        window.location.replace("/landing");
        return;
      }
      setIsAuthenticated(false);
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
      <div className="text-white">Redirecting to registration...</div>
    </div>
  );
}

