'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function Navigation() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, loading } = useAuth();

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
      <Link href="/apply-jobs" className="relative px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold rounded-lg shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/50 hover:bg-gradient-to-r hover:from-red-600 hover:to-rose-700 hover:text-white transform hover:-translate-y-1 transition-all duration-300 animate-pulse hover:animate-none overflow-hidden whitespace-nowrap">
        💼 Apply Jobs
      </Link>

      {/* User Authentication */}
      {!loading && (
        <>
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 text-white hover:text-rose-400 transition-all duration-300"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-red-600 rounded-full flex items-center justify-center text-sm font-bold">
                  {user.user_metadata?.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                </div>
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              {showUserMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-[#252525] border border-gray-600 rounded-lg shadow-2xl shadow-black/50 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-600">
                    <p className="text-sm font-semibold text-white truncate">
                      {user.user_metadata?.full_name || 'User'}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                  <Link 
                    href="/profile"
                    className="block px-4 py-3 text-white hover:bg-rose-500/20 hover:text-rose-400 transition-all duration-200"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                      <span>My Profile</span>
                    </div>
                  </Link>
                  <Link 
                    href="/profile"
                    className="block px-4 py-3 text-white hover:bg-rose-500/20 hover:text-rose-400 transition-all duration-200"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      <span>Settings</span>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link 
                href="/sign-in" 
                className="text-white hover:text-rose-400 transition-all duration-300 font-medium"
              >
                Sign In
              </Link>
              <Link 
                href="/sign-up" 
                className="px-4 py-2 bg-gradient-to-r from-rose-500 to-red-600 text-white font-semibold rounded-lg hover:from-rose-600 hover:to-red-700 transition-all duration-300 shadow-lg shadow-rose-500/30"
              >
                Sign Up
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}

