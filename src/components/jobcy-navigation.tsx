'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function JobcyNavigation() {
  const [showDropdown, setShowDropdown] = useState(false);

  const isValidToken = () => {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem('token');
    if (!token || token.trim() === '' || token === 'null' || token === 'undefined') return false;
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return false;
      const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));
      if (payload && payload.exp && typeof payload.exp === 'number') {
        const now = Math.floor(Date.now() / 1000);
        if (now >= payload.exp) {
          return false;
        }
      }
      return true;
    } catch {
      return false;
    }
  };

  const handleTutorialClick = (e: React.MouseEvent, href: string) => {
    // CRITICAL: Prevent default and stop propagation immediately
    e.preventDefault();
    e.stopPropagation();
    
    setShowDropdown(false);
    
    // ALWAYS check authentication FIRST - before any navigation
    const authed = isValidToken();
    
    if (!authed) {
      // IMMEDIATELY redirect to registration - prevents ANY page load
      // Use window.location.href for immediate, blocking redirect (more aggressive than replace)
      const redirectUrl = `/register?redirect=${encodeURIComponent(href)}`;
      console.log('[NAV] Not authenticated, redirecting to:', redirectUrl);
      // Use href for immediate redirect - blocks page load
      window.location.href = redirectUrl;
      // Return false to prevent any further execution
      return false;
    } else {
      // User is authenticated, navigate normally
      console.log('[NAV] Authenticated, navigating to:', href);
      // Use href for consistent navigation
      window.location.href = href;
    }
  };

  return (
    <div className="hidden md:flex items-center space-x-6 mr-4">
      <Link href="/" className="text-[var(--foreground-muted)] hover:text-[var(--primary)] transition-all duration-300 font-medium">
        Home
      </Link>
      <Link href="/menu" className="text-[var(--foreground-muted)] hover:text-[var(--primary)] transition-all duration-300 font-medium">
        Menu
      </Link>
      <span className="text-[var(--foreground-dim)] cursor-not-allowed opacity-50 font-medium">
        Docs
      </span>
      
      {/* Tutorials Dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="text-[var(--foreground-muted)] hover:text-[var(--primary)] transition-all duration-300 font-medium flex items-center space-x-1"
        >
          <span>Tutorials</span>
          <svg 
            className={`w-4 h-4 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        
        {showDropdown && (
          <div className="absolute top-full left-0 mt-2 w-64 bg-[var(--surface)] border border-[var(--border)] rounded-lg shadow-2xl py-2 z-50">
            <div 
              className="block px-4 py-3 text-[var(--foreground-muted)] hover:bg-[var(--surface-secondary)] hover:text-[var(--primary)] transition-all duration-200 cursor-pointer"
              onClick={(e) => handleTutorialClick(e, '/tutorials/medical-coding')}
              onMouseDown={(e: React.MouseEvent) => {
                if (!isValidToken()) {
                  e.preventDefault();
                  handleTutorialClick(e, '/tutorials/medical-coding');
                }
              }}
            >
              <div className="flex items-center space-x-2">
                <span className="text-xl">🏥</span>
                <span>Medical Coding</span>
              </div>
            </div>
            <div 
              className="block px-4 py-3 text-[var(--foreground-muted)] hover:bg-[var(--surface-secondary)] hover:text-[var(--primary)] transition-all duration-200 cursor-pointer"
              onClick={(e) => handleTutorialClick(e, '/tutorials/programming')}
              onMouseDown={(e: React.MouseEvent) => {
                if (!isValidToken()) {
                  e.preventDefault();
                  handleTutorialClick(e, '/tutorials/programming');
                }
              }}
            >
              <div className="flex items-center space-x-2">
                <span className="text-xl">💻</span>
                <span>Programming</span>
              </div>
            </div>
            <div 
              className="block px-4 py-3 text-[var(--foreground-muted)] hover:bg-[var(--surface-secondary)] hover:text-[var(--primary)] transition-all duration-200 cursor-pointer"
              onClick={(e) => handleTutorialClick(e, '/tutorials/government-jobs')}
              onMouseDown={(e: React.MouseEvent) => {
                if (!isValidToken()) {
                  e.preventDefault();
                  handleTutorialClick(e, '/tutorials/government-jobs');
                }
              }}
            >
              <div className="flex items-center space-x-2">
                <span className="text-xl">🏛️</span>
                <span>Government Jobs (SBI Jobs)</span>
              </div>
            </div>
            <div 
              className="block px-4 py-3 text-[var(--foreground-muted)] hover:bg-[var(--surface-secondary)] hover:text-[var(--primary)] transition-all duration-200 cursor-pointer"
              onClick={(e) => handleTutorialClick(e, '/tutorials/courses')}
              onMouseDown={(e: React.MouseEvent) => {
                if (!isValidToken()) {
                  e.preventDefault();
                  handleTutorialClick(e, '/tutorials/courses');
                }
              }}
            >
              <div className="flex items-center space-x-2">
                <span className="text-xl">🎓</span>
                <span>Courses</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Link href="/terminal" className="text-[var(--foreground-muted)] hover:text-[var(--primary)] transition-all duration-300 font-medium">
        Terminal
      </Link>
      {/* Apply Jobs button disabled */}
      {/* <Link 
        href="/jobcy"
        target="_blank"
        rel="noopener noreferrer"
        className="relative px-4 py-2 bg-[var(--primary)] text-white font-bold rounded-lg shadow-lg shadow-[var(--primary)]/30 hover:shadow-xl hover:shadow-[var(--primary)]/50 hover:bg-[var(--primary-dark)] transform hover:-translate-y-1 transition-all duration-300 overflow-hidden whitespace-nowrap"
      >
        💼 Apply Jobs
      </Link> */}
    </div>
  );
}

