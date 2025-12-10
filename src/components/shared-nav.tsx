'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import MenuDropdown from '@/components/menu-dropdown';
import SearchBar from '@/components/search-bar';
import { useTheme } from '@/hooks/useTheme';

interface SharedNavProps {
  isScrolled?: boolean;
  showAnimatedLine?: boolean;
  isFixed?: boolean;
  hasGradientBlueNav?: boolean;
  hideThemeToggle?: boolean;
}

export default function SharedNav({ isScrolled = false, showAnimatedLine = true, isFixed = false, hasGradientBlueNav = false, hideThemeToggle = false }: SharedNavProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme, setTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const tutorialsButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Force dark theme on tutorials and courses pages
  useEffect(() => {
    if (hideThemeToggle) {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, [hideThemeToggle, setTheme]);

  // Close tutorials dropdown function
  const closeTutorialsDropdown = () => {
    setShowDropdown(false);
    setDropdownPosition(null);
  };

  // Close tutorials dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        // Also check if click is outside the dropdown menu itself
        const dropdownMenu = document.querySelector('[data-tutorials-dropdown]');
        const isOutsideDropdown = !dropdownMenu || !dropdownMenu.contains(event.target as Node);
        
        if (isOutsideDropdown) {
          closeTutorialsDropdown();
        }
      }
    };

    if (showDropdown) {
      // Small delay to avoid closing immediately when opening
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 100);
      
      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showDropdown]);

  // Close tutorials dropdown when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (showDropdown) {
        closeTutorialsDropdown();
      }
    };

    if (showDropdown) {
      window.addEventListener('scroll', handleScroll, true);
      return () => {
        window.removeEventListener('scroll', handleScroll, true);
      };
    }
  }, [showDropdown]);

  const tutorialLinks = [
    { href: '/tutorials/medical-coding', label: 'Medical Coding', icon: '🏥' },
    { href: '/tutorials/programming', label: 'Programming', icon: '💻' },
    { href: '/tutorials/government-jobs', label: 'Government Jobs', icon: '🏛️' },
    { href: '/tutorials/courses', label: 'Courses', icon: '🎓' },
  ];

  const isHomePage = pathname === '/';

  return (
    <>
      {/* Glass Navigation Bar */}
      <nav 
        className={`${isFixed ? 'fixed top-0 left-0 right-0' : 'relative'} w-full transition-all duration-300 ${isScrolled ? 'py-3' : 'py-4'} ${showAnimatedLine ? 'animated-line animated-line-bottom' : ''}`}
        style={
          isFixed 
            ? { 
                position: 'fixed', 
                top: '0', 
                left: '0', 
                right: '0', 
                zIndex: 10000,
                background: hasGradientBlueNav 
                  ? 'rgba(15, 23, 42, 0.25)'
                  : 'rgba(15, 23, 42, 0.35)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }
            : {
                position: 'relative',
                zIndex: 10000,
                background: 'rgba(15, 23, 42, 0.35)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }
        }
      >
        {/* Top animated line */}
        {showAnimatedLine && (
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        )}
        
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 text-white hover:opacity-80 transition-opacity">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg overflow-hidden">
                <Image 
                  src="/logo.png" 
                  alt="OHG365 Logo" 
                  width={40} 
                  height={40} 
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold">OHG365</span>
                <span className="text-xs leading-tight">One Hub Global</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2 text-sm">
              <Link 
                href="/" 
                className={`transition-colors px-3 py-2 relative group ${isHomePage ? 'text-white font-bold' : 'text-white/90 hover:text-white font-bold'}`}
              >
                Home
                {isHomePage ? (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></span>
                ) : (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                )}
              </Link>
              <div className="nav-line-vertical"></div>
              <Link 
                href="/courses" 
                className={`transition-colors px-3 py-2 relative group ${pathname === '/courses' ? 'text-white font-bold' : 'text-white/90 hover:text-white font-bold'}`}
              >
                Courses
                {pathname === '/courses' ? (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></span>
                ) : (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                )}
              </Link>
              <div className="nav-line-vertical"></div>
              <MenuDropdown />
              <div className="nav-line-vertical"></div>
              
              {/* Tutorials Dropdown */}
              <div className="relative" ref={dropdownRef} style={{ zIndex: 10001 }}>
                <button
                  ref={tutorialsButtonRef}
                  onClick={() => {
                    const newShow = !showDropdown;
                    setShowDropdown(newShow);
                    if (newShow && tutorialsButtonRef.current) {
                      const rect = tutorialsButtonRef.current.getBoundingClientRect();
                      setDropdownPosition({
                        top: rect.bottom + 8,
                        left: rect.left,
                      });
                    } else {
                      setDropdownPosition(null);
                    }
                  }}
                  className="text-white/90 hover:text-white transition-colors flex items-center space-x-1 px-3 py-2 relative group font-bold"
                >
                  <span>Tutorials</span>
                  <svg 
                    className={`w-3 h-3 transition-transform ${showDropdown ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </button>
                
                {isMounted && showDropdown && dropdownPosition && createPortal(
                  <div 
                    data-tutorials-dropdown
                    className="fixed w-56 glass-dark rounded-lg shadow-xl py-2" 
                    style={{ 
                      top: `${dropdownPosition.top}px`,
                      left: `${dropdownPosition.left}px`,
                      position: 'fixed',
                      zIndex: 10001,
                      background: 'rgba(8, 61, 119, 0.95)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)'
                    }}
                    onMouseLeave={(e) => {
                      // Close if mouse leaves the dropdown
                      const relatedTarget = e.relatedTarget;
                      
                      // Type check: relatedTarget must be a Node
                      const isRelatedTargetNode = relatedTarget instanceof Node;
                      const isMovingToButton = isRelatedTargetNode && dropdownRef.current?.contains(relatedTarget);
                      
                      if (!isMovingToButton) {
                        setTimeout(() => {
                          const currentTarget = document.elementFromPoint(e.clientX, e.clientY);
                          if (!currentTarget || !dropdownRef.current?.contains(currentTarget)) {
                            closeTutorialsDropdown();
                          }
                        }, 150);
                      }
                    }}
                  >
                    {tutorialLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => {
                          setShowDropdown(false);
                          setDropdownPosition(null);
                        }}
                        className="block px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 transition-all text-sm"
                      >
                        <div className="flex items-center space-x-2">
                          <span>{link.icon}</span>
                          <span>{link.label}</span>
                        </div>
                      </Link>
                    ))}
                  </div>,
                  document.body
                )}
              </div>
              
              <div className="nav-line-vertical"></div>
              <Link 
                href="/terminal" 
                className={`transition-colors px-3 py-2 relative group ${pathname === '/terminal' ? 'text-white font-bold' : 'text-white/90 hover:text-white font-bold'}`}
              >
                Terminal
                {pathname === '/terminal' ? (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></span>
                ) : (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                )}
              </Link>
              <div className="nav-line-vertical"></div>
              <Link 
                href="/challenges" 
                className="px-3 py-1.5 bg-gradient-to-r from-purple-600/80 to-pink-600/80 text-white font-bold rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all text-sm relative group"
              >
                Challenges
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <div className="nav-line-vertical"></div>
              <button
                disabled
                className="px-3 py-1.5 bg-gray-600/60 text-white/60 font-bold rounded-lg cursor-not-allowed text-sm"
              >
                Apply Jobs
              </button>
              {!hideThemeToggle && (
                <>
                  <div className="nav-line-vertical"></div>
                  <button
                    onClick={toggleTheme}
                    className="p-2 text-white/90 hover:text-white transition-colors relative group"
                    aria-label="Toggle theme"
                  >
                    {theme === 'dark' ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    )}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-3/4"></span>
                  </button>
                  <div className="nav-line-vertical"></div>
                </>
              )}
              <SearchBar />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white hover:opacity-80 transition-opacity"
              aria-label="Toggle menu"
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
        {/* Bottom animated line */}
        {showAnimatedLine && (
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent nav-line-divider"></div>
        )}
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[105] bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="glass-dark w-80 h-full p-6 z-[106]" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col space-y-4 text-white">
              <Link href="/" className="py-2 hover:opacity-80 font-semibold">Home</Link>
              <Link href="/courses" className="py-2 hover:opacity-80">Courses</Link>
              {tutorialLinks.map((link) => (
                <Link key={link.href} href={link.href} className="py-2 hover:opacity-80 flex items-center space-x-2">
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
              <Link href="/terminal" className="py-2 hover:opacity-80">Terminal</Link>
              <Link href="/challenges" className="py-2 hover:opacity-80">Challenges</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

