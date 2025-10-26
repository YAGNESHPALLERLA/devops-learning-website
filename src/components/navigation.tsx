'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="hidden md:flex items-center space-x-6 mr-4">
      <Link href="/" className="text-white hover:text-rose-400 transition-all duration-300 font-medium">
        Home
      </Link>
      <Link href="/menu" className="text-white hover:text-rose-400 transition-all duration-300 font-medium">
        Menu
      </Link>
      <span className="text-gray-400 cursor-not-allowed opacity-50 font-medium">
        Docs
      </span>
      
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
            <Link 
              href="/tutorials/medical-coding"
              className="block px-4 py-3 text-white hover:bg-rose-500/20 hover:text-rose-400 transition-all duration-200"
              onClick={() => setShowDropdown(false)}
            >
              <div className="flex items-center space-x-2">
                <span className="text-xl">🏥</span>
                <span>Medical Coding</span>
              </div>
            </Link>
            <Link 
              href="/tutorials/programming"
              className="block px-4 py-3 text-white hover:bg-rose-500/20 hover:text-rose-400 transition-all duration-200"
              onClick={() => setShowDropdown(false)}
            >
              <div className="flex items-center space-x-2">
                <span className="text-xl">💻</span>
                <span>Programming</span>
              </div>
            </Link>
            <Link 
              href="/tutorials/government-jobs"
              className="block px-4 py-3 text-white hover:bg-rose-500/20 hover:text-rose-400 transition-all duration-200"
              onClick={() => setShowDropdown(false)}
            >
              <div className="flex items-center space-x-2">
                <span className="text-xl">🏛️</span>
                <span>Government Jobs (SBI Jobs)</span>
              </div>
            </Link>
          </div>
        )}
      </div>
      
      <Link href="/terminal" className="text-white hover:text-rose-400 transition-all duration-300 font-medium">
        Terminal
      </Link>
      <Link 
        href="/jobcy"
        className="relative px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold rounded-lg shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/50 hover:bg-gradient-to-r hover:from-red-600 hover:to-rose-700 hover:text-white transform hover:-translate-y-1 transition-all duration-300 animate-pulse hover:animate-none overflow-hidden whitespace-nowrap"
      >
        💼 Apply Jobs
      </Link>
    </div>
  );
}

