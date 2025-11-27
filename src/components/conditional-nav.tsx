"use client";

import { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import SearchBar from "@/components/search-bar";
import Navigation from "@/components/navigation";
import MobileMenu from "@/components/mobile-menu";

export function ConditionalNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-[#1a1a1a] border-b border-gray-600 sticky top-0 z-40 backdrop-blur-sm bg-opacity-95" style={{ overflow: 'visible' }}>
        <div className="container mx-auto px-4" style={{ overflow: 'visible' }}>
          <div className="flex justify-between items-center py-4" style={{ overflow: 'visible' }}>
            <Link href="/" className="flex items-center space-x-3 text-white hover:text-gray-300 transition-all duration-300 group">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg overflow-hidden">
                <Image 
                  src="/logo.png" 
                  alt="Logo" 
                  width={40} 
                  height={40} 
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent">OneHubGlobal</span>
                <span className="text-sm font-semibold text-gray-400">OHG365</span>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Navigation />
              <SearchBar />
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-white hover:text-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-500 rounded min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
