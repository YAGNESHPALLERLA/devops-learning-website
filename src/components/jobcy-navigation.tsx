'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function JobcyNavigation() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCoursesSubmenu, setShowCoursesSubmenu] = useState(false);

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
            <Link 
              href="/tutorials/medical-coding"
              className="block px-4 py-3 text-[var(--foreground-muted)] hover:bg-[var(--surface-secondary)] hover:text-[var(--primary)] transition-all duration-200"
              onClick={() => setShowDropdown(false)}
            >
              <div className="flex items-center space-x-2">
                <span className="text-xl">🏥</span>
                <span>Medical Coding</span>
              </div>
            </Link>
            <Link 
              href="/tutorials/programming"
              className="block px-4 py-3 text-[var(--foreground-muted)] hover:bg-[var(--surface-secondary)] hover:text-[var(--primary)] transition-all duration-200"
              onClick={() => setShowDropdown(false)}
            >
              <div className="flex items-center space-x-2">
                <span className="text-xl">💻</span>
                <span>Programming</span>
              </div>
            </Link>
            <Link 
              href="/tutorials/government-jobs"
              className="block px-4 py-3 text-[var(--foreground-muted)] hover:bg-[var(--surface-secondary)] hover:text-[var(--primary)] transition-all duration-200"
              onClick={() => setShowDropdown(false)}
            >
              <div className="flex items-center space-x-2">
                <span className="text-xl">🏛️</span>
                <span>Government Jobs (SBI Jobs)</span>
              </div>
            </Link>
            <div 
              className="relative"
              onMouseEnter={() => setShowCoursesSubmenu(true)}
              onMouseLeave={() => setShowCoursesSubmenu(false)}
            >
              <div className="block px-4 py-3 text-[var(--foreground-muted)] hover:bg-[var(--surface-secondary)] transition-all duration-200 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">🎓</span>
                    <span>Courses</span>
                  </div>
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
              
              {showCoursesSubmenu && (
                <div className="absolute left-full top-0 ml-2 w-72 bg-[var(--surface)] border border-[var(--border)] rounded-lg shadow-2xl py-2 z-50">
                  <Link 
                    href="/tutorials/azure-data-engineer"
                    className="block px-4 py-3 text-[var(--foreground-muted)] hover:bg-[var(--surface-secondary)] hover:text-[var(--primary)] transition-all duration-200"
                    onClick={() => {
                      setShowDropdown(false);
                      setShowCoursesSubmenu(false);
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.482 18.394l6.625-3.844v7.688l-6.625-3.844zm7.875-10.463L12.606 2.65l-.096.056v7.694l8.849 5.138V7.93zm-9.481 5.138l-8.85-5.138L11.48 2.65l.096.056v10.462zm-.962 1.287L2.643 8.738v7.693l6.691 3.845v-7.688z" fill="#0078D4"/>
                      </svg>
                      <span>Azure Data Engineer</span>
                    </div>
                  </Link>
                  <Link 
                    href="/tutorials/azure-basics"
                    className="block px-4 py-3 text-[var(--foreground-muted)] hover:bg-[var(--surface-secondary)] hover:text-[var(--primary)] transition-all duration-200"
                    onClick={() => {
                      setShowDropdown(false);
                      setShowCoursesSubmenu(false);
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.482 18.394l6.625-3.844v7.688l-6.625-3.844zm7.875-10.463L12.606 2.65l-.096.056v7.694l8.849 5.138V7.93zm-9.481 5.138l-8.85-5.138L11.48 2.65l.096.056v10.462zm-.962 1.287L2.643 8.738v7.693l6.691 3.845v-7.688z" fill="#0078D4"/>
                      </svg>
                      <span>Azure Basics</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>
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

