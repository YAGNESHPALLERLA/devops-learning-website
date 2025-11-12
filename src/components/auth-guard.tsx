"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// Public routes that don't require authentication
const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/register",
  "/continue",
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
        // Check if user has a registered email stored
        let registeredEmail = localStorage.getItem("registeredEmail");
        
        // Fallback: check stored user object for email
        if (!registeredEmail) {
          const userStr = localStorage.getItem("user");
          if (userStr) {
            try {
              const user = JSON.parse(userStr);
              if (user && user.email && typeof user.email === 'string') {
                registeredEmail = user.email;
                // Store it for future use (registeredEmail is guaranteed to be string here)
                if (registeredEmail) {
                  localStorage.setItem("registeredEmail", registeredEmail);
                }
              }
            } catch (e) {
              // Ignore parse errors
            }
          }
        }
        
        if (registeredEmail) {
          // User has registered before, show continue page
          setIsAuthenticated(false);
          window.location.replace(`/continue?redirect=${encodeURIComponent(currentPath)}`);
        } else {
          // No registered email, redirect to registration
          setIsAuthenticated(false);
          window.location.replace(`/register?redirect=${encodeURIComponent(currentPath)}`);
        }
        return;
      }
      
      // Validate JWT token format and expiry
      try {
        const parts = token.split('.');
        if (parts.length !== 3) {
          // Invalid JWT format
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          // Check for registered email with fallback
          let registeredEmail = localStorage.getItem("registeredEmail");
          if (!registeredEmail) {
            const userStr = localStorage.getItem("user");
            if (userStr) {
              try {
                const user = JSON.parse(userStr);
                if (user && user.email && typeof user.email === 'string') {
                  registeredEmail = user.email;
                  if (registeredEmail) {
                    localStorage.setItem("registeredEmail", registeredEmail);
                  }
                }
              } catch (e) {
                // Ignore parse errors
              }
            }
          }
          if (registeredEmail) {
            window.location.replace(`/continue?redirect=${encodeURIComponent(currentPath)}`);
          } else {
            window.location.replace(`/register?redirect=${encodeURIComponent(currentPath)}`);
          }
          return;
        }
        
        // Check if token is expired
        const payload = JSON.parse(atob(parts[1]));
        if (payload.exp && payload.exp * 1000 < Date.now()) {
          // Token expired
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          // Check for registered email with fallback
          let registeredEmail = localStorage.getItem("registeredEmail");
          if (!registeredEmail) {
            const userStr = localStorage.getItem("user");
            if (userStr) {
              try {
                const user = JSON.parse(userStr);
                if (user && user.email && typeof user.email === 'string') {
                  registeredEmail = user.email;
                  if (registeredEmail) {
                    localStorage.setItem("registeredEmail", registeredEmail);
                  }
                }
              } catch (e) {
                // Ignore parse errors
              }
            }
          }
          if (registeredEmail) {
            window.location.replace(`/continue?redirect=${encodeURIComponent(currentPath)}`);
          } else {
            window.location.replace(`/register?redirect=${encodeURIComponent(currentPath)}`);
          }
          return;
        }
      } catch {
        // Invalid token format
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        // Check for registered email with fallback
        let registeredEmail = localStorage.getItem("registeredEmail");
        if (!registeredEmail) {
          const userStr = localStorage.getItem("user");
          if (userStr) {
            try {
              const user = JSON.parse(userStr);
              if (user && user.email && typeof user.email === 'string') {
                registeredEmail = user.email;
                if (registeredEmail) {
                  localStorage.setItem("registeredEmail", registeredEmail);
                }
              }
            } catch (e) {
              // Ignore parse errors
            }
          }
        }
        if (registeredEmail) {
          window.location.replace(`/continue?redirect=${encodeURIComponent(currentPath)}`);
        } else {
          window.location.replace(`/register?redirect=${encodeURIComponent(currentPath)}`);
        }
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
        window.location.replace(`/register?redirect=${encodeURIComponent(pathname)}`);
        return;
      } else if (pathname === "/") {
        // Root page is public - allow access
        setIsAuthenticated(true);
        return;
      } else if (pathname !== "/" && pathname !== "/login" && pathname !== "/signup" && pathname !== "/register") {
        // Redirect other protected routes to home page
        setIsAuthenticated(false);
        window.location.replace("/");
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

