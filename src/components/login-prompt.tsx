"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import AuthModal from "./auth-modal";

export default function LoginPrompt() {
  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasStartedTimerRef = useRef(false);

  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // Don't show on login/signup pages or Jobcy auth pages
    const isAuthPage = 
      pathname === "/login" ||
      pathname?.startsWith("/jobcy/user/auth") ||
      pathname?.startsWith("/jobcy/hr/auth") ||
      pathname?.startsWith("/jobcy/admin/auth") ||
      pathname?.startsWith("/jobcy/company/auth");

    if (isAuthPage) {
      hasStartedTimerRef.current = false;
      setShowModal(false);
      return;
    }

    // Check if user is already logged in
    const checkAuth = () => {
      if (typeof window === "undefined") return false;
      const token = localStorage.getItem("token");
      return !!token;
    };

    if (checkAuth()) {
      hasStartedTimerRef.current = false;
      setShowModal(false);
      return;
    }

    // Check if we've already shown the modal in this session
    const sessionShown = sessionStorage.getItem("loginModalShown");
    if (sessionShown === "true") {
      hasStartedTimerRef.current = false;
      return;
    }

    // Only start timer once per page load
    if (!hasStartedTimerRef.current) {
      hasStartedTimerRef.current = true;
      
      // Set timer for 10 seconds
      timerRef.current = setTimeout(() => {
        // Double-check user is still not logged in
        if (!checkAuth()) {
          setShowModal(true);
          sessionStorage.setItem("loginModalShown", "true");
        }
      }, 10000); // 10 seconds
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [pathname]);

  const handleClose = () => {
    setShowModal(false);
    // Don't show again in this session
    sessionStorage.setItem("loginModalShown", "true");
  };

  // Listen for storage changes (when user logs in from another tab)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token" && e.newValue) {
        setShowModal(false);
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return <AuthModal isOpen={showModal} onClose={handleClose} />;
}

