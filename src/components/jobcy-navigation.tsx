'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function JobcyNavigation() {
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  const handleTutorialClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setShowDropdown(false);
    
    // Check if user is authenticated
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    if (!token) {
      // Redirect to signup with the tutorial URL as redirect parameter
      window.location.href = `/signup?redirect=${encodeURIComponent(href)}`;
    } else {
      // User is authenticated, navigate normally
      router.push(href);
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
            <a 
              href="/tutorials/medical-coding"
              className="block px-4 py-3 text-[var(--foreground-muted)] hover:bg-[var(--surface-secondary)] hover:text-[var(--primary)] transition-all duration-200 cursor-pointer"
              onClick={(e) => handleTutorialClick(e, '/tutorials/medical-coding')}
            >
              <div className="flex items-center space-x-2">
                <span className="text-xl">🏥</span>
                <span>Medical Coding</span>
              </div>
            </a>
            <a 
              href="/tutorials/programming"
              className="block px-4 py-3 text-[var(--foreground-muted)] hover:bg-[var(--surface-secondary)] hover:text-[var(--primary)] transition-all duration-200 cursor-pointer"
              onClick={(e) => handleTutorialClick(e, '/tutorials/programming')}
            >
              <div className="flex items-center space-x-2">
                <span className="text-xl">💻</span>
                <span>Programming</span>
              </div>
            </a>
            <a 
              href="/tutorials/government-jobs"
              className="block px-4 py-3 text-[var(--foreground-muted)] hover:bg-[var(--surface-secondary)] hover:text-[var(--primary)] transition-all duration-200 cursor-pointer"
              onClick={(e) => handleTutorialClick(e, '/tutorials/government-jobs')}
            >
              <div className="flex items-center space-x-2">
                <span className="text-xl">🏛️</span>
                <span>Government Jobs (SBI Jobs)</span>
              </div>
            </a>
            <a 
              href="/tutorials/courses"
              className="block px-4 py-3 text-[var(--foreground-muted)] hover:bg-[var(--surface-secondary)] hover:text-[var(--primary)] transition-all duration-200 cursor-pointer"
              onClick={(e) => handleTutorialClick(e, '/tutorials/courses')}
            >
              <div className="flex items-center space-x-2">
                <span className="text-xl">🎓</span>
                <span>Courses</span>
              </div>
            </a>
          </div>
        )}
      </div>
      
      <Link href="/terminal" className="text-[var(--foreground-muted)] hover:text-[var(--primary)] transition-all duration-300 font-medium">
        Terminal
      </Link>
      <Link 
        href="/jobcy"
        target="_blank"
        rel="noopener noreferrer"
        className="relative px-4 py-2 bg-[var(--primary)] text-white font-bold rounded-lg shadow-lg shadow-[var(--primary)]/30 hover:shadow-xl hover:shadow-[var(--primary)]/50 hover:bg-[var(--primary-dark)] transform hover:-translate-y-1 transition-all duration-300 overflow-hidden whitespace-nowrap"
      >
        💼 Apply Jobs
      </Link>
    </div>
  );
}

