'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [showDropdown, setShowDropdown] = useState(false);

  const tutorialLinks = [
    { href: '/tutorials/medical-coding', label: 'Medical Coding', icon: '🏥' },
    { href: '/tutorials/programming', label: 'Programming', icon: '💻' },
    { href: '/tutorials/government-jobs', label: 'Government Jobs (SBI Jobs)', icon: '🏛️' },
    { href: '/tutorials/courses', label: 'Courses', icon: '🎓' },
  ];

  const handleLinkClick = () => setShowDropdown(false);

  return (
    <div className="hidden md:flex items-center space-x-6 mr-4">
      <Link href="/" className="text-white hover:text-rose-400 transition-all duration-300 font-medium">
        Home
      </Link>
      <Link href="/menu" className="text-white hover:text-rose-400 transition-all duration-300 font-medium">
        Menu
      </Link>
      
      {/* Tutorials Dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="text-white hover:text-rose-400 transition-all duration-300 font-medium flex items-center space-x-1"
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
          <div className="absolute top-full left-0 mt-2 w-64 bg-[#252525] border border-gray-600 rounded-lg shadow-2xl shadow-black/50 py-2 z-50">
            {tutorialLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="block px-4 py-3 text-white hover:bg-rose-500/20 hover:text-rose-400 transition-all duration-200"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{link.icon}</span>
                  <span>{link.label}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      
      <Link href="/terminal" className="text-white hover:text-rose-400 transition-all duration-300 font-medium">
        Terminal
      </Link>
      <Link 
        href="/jobcy"
        target="_blank"
        rel="noopener noreferrer"
        className="relative px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold rounded-lg shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/50 hover:bg-gradient-to-r hover:from-red-600 hover:to-rose-700 hover:text-white transform hover:-translate-y-1 transition-all duration-300 animate-pulse hover:animate-none overflow-hidden whitespace-nowrap"
      >
        💼 Apply Jobs
      </Link>
    </div>
  );
}

