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
    // IMMEDIATE check - don't wait for pathname
    if (typeof window === "undefined") {
      return;
    }

    // Check if trying to access tutorials or courses FIRST - before checking anything else
    const currentPath = window.location.pathname;
    const isTutorialOrCourse = 
      currentPath.startsWith("/tutorials") ||
      currentPath === "/java" ||
      currentPath === "/python" ||
      currentPath === "/sql" ||
      currentPath === "/linux" ||
      currentPath === "/devops" ||
      currentPath === "/web-dev" ||
      currentPath === "/data-science" ||
      currentPath === "/code-terminal" ||
      currentPath === "/terminal" ||
      currentPath === "/menu";
    
    if (isTutorialOrCourse) {
      // Check for token IMMEDIATELY and validate it
      const token = localStorage.getItem("token");
      if (!token || token.trim() === "" || token === "null" || token === "undefined") {
        // IMMEDIATELY redirect - don't wait, don't render anything
        setIsAuthenticated(false);
        window.location.replace(`/signup?redirect=${encodeURIComponent(currentPath)}`);
        return;
      }
      
      // Validate JWT token format and expiry
      try {
        const parts = token.split('.');
        if (parts.length !== 3) {
          // Invalid JWT format
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          window.location.replace(`/signup?redirect=${encodeURIComponent(currentPath)}`);
          return;
        }
        
        // Check if token is expired
        const payload = JSON.parse(atob(parts[1]));
        if (payload.exp && payload.exp * 1000 < Date.now()) {
          // Token expired
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          window.location.replace(`/signup?redirect=${encodeURIComponent(currentPath)}`);
          return;
        }
      } catch {
        // Invalid token format
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        window.location.replace(`/signup?redirect=${encodeURIComponent(currentPath)}`);
        return;
      }
    }

    // Wait for pathname to be available for other routes
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
    const token = localStorage.getItem("token");
    
    // Validate token exists and is valid
    let isValid = false;
    if (token && token.trim() !== "" && token !== "null" && token !== "undefined") {
      // Validate JWT token format and expiry
      try {
        const parts = token.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1]));
          if (!payload.exp || payload.exp * 1000 >= Date.now()) {
            isValid = true; // Token is valid
          } else {
            // Token expired
            localStorage.removeItem('token');
          }
        } else {
          // Invalid JWT format
          localStorage.removeItem('token');
        }
      } catch {
        // Invalid token format
        localStorage.removeItem('token');
      }
    }
    
    if (isValid) {
      setIsAuthenticated(true);
    } else {
      if (isTutorialOrCourse) {
        // Already handled above, but double-check
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

