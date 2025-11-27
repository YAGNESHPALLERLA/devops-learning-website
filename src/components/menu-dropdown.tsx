'use client';

import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import Link from 'next/link';
import menuConfig from '@/data/menu-config.json';

interface MenuItem {
  label: string;
  slug: string;
  href?: string;
  children?: Array<{
    label: string;
    slug: string;
    href: string;
  }>;
}

export default function MenuDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [submenuPosition, setSubmenuPosition] = useState<{ top: number; left: number } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const menuItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveSubmenu(null);
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Update submenu position on scroll
  useEffect(() => {
    if (activeSubmenu && submenuPosition) {
      const updatePosition = () => {
        const activeIndex = menuConfig.menu.findIndex(item => item.slug === activeSubmenu);
        if (activeIndex !== -1) {
          const menuItem = menuItemRefs.current[activeIndex];
          if (menuItem) {
            const rect = menuItem.getBoundingClientRect();
            setSubmenuPosition({
              top: rect.top,
              left: rect.right + 8,
            });
          }
        }
      };

      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);

      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [activeSubmenu, submenuPosition]);

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
      if (!isOpen) {
        setFocusedIndex(0);
      }
    } else if (e.key === 'Escape' && isOpen) {
      setIsOpen(false);
      setActiveSubmenu(null);
      setFocusedIndex(-1);
      buttonRef.current?.focus();
    } else if (e.key === 'ArrowDown' && isOpen) {
      e.preventDefault();
      const nextIndex = focusedIndex < menuConfig.menu.length - 1 ? focusedIndex + 1 : 0;
      setFocusedIndex(nextIndex);
    } else if (e.key === 'ArrowUp' && isOpen) {
      e.preventDefault();
      const prevIndex = focusedIndex > 0 ? focusedIndex - 1 : menuConfig.menu.length - 1;
      setFocusedIndex(prevIndex);
    }
  };

  const handleMenuItemKeyDown = (e: KeyboardEvent<HTMLAnchorElement | HTMLButtonElement>, index: number, item: MenuItem) => {
    if (e.key === 'ArrowRight' && item.children) {
      e.preventDefault();
      handleSubmenuOpen(item.slug, index);
    } else if (e.key === 'ArrowLeft' && activeSubmenu) {
      e.preventDefault();
      setActiveSubmenu(null);
      setSubmenuPosition(null);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setActiveSubmenu(null);
      setFocusedIndex(-1);
      setSubmenuPosition(null);
      buttonRef.current?.focus();
    }
  };

  const handleSubmenuKeyDown = (e: KeyboardEvent<HTMLAnchorElement>, parentIndex: number, childIndex: number, children: MenuItem[]) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = childIndex < children.length - 1 ? childIndex + 1 : 0;
      itemRefs.current[parentIndex * 100 + nextIndex]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = childIndex > 0 ? childIndex - 1 : children.length - 1;
      itemRefs.current[parentIndex * 100 + prevIndex]?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setActiveSubmenu(null);
      setSubmenuPosition(null);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setActiveSubmenu(null);
      setFocusedIndex(-1);
      setSubmenuPosition(null);
      buttonRef.current?.focus();
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setFocusedIndex(0);
    } else {
      setActiveSubmenu(null);
      setFocusedIndex(-1);
      setSubmenuPosition(null);
    }
  };

  // Calculate submenu position
  const handleSubmenuOpen = (itemSlug: string, index: number) => {
    const menuItem = menuItemRefs.current[index];
    if (menuItem) {
      const rect = menuItem.getBoundingClientRect();
      setSubmenuPosition({
        top: rect.top,
        left: rect.right + 8, // 8px margin
      });
      setActiveSubmenu(itemSlug);
    } else {
      setActiveSubmenu(itemSlug);
    }
  };

  return (
    <div className="relative" ref={menuRef} style={{ overflow: 'visible' }}>
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        onKeyDown={handleKeyDown}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Open main menu"
        className="text-white hover:text-rose-400 transition-all duration-300 font-medium flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-[#1a1a1a] rounded px-2 py-1 min-h-[44px] min-w-[44px]"
      >
        <span>MENU</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      
      {isOpen && (
        <div 
          role="menu"
          className="absolute top-full left-0 mt-2 w-80 bg-[#252525] border border-gray-600 rounded-lg shadow-2xl shadow-black/50 py-2 z-50 max-h-[80vh] overflow-y-auto"
          style={{ overflowX: 'visible' }}
        >
          {menuConfig.menu.map((item, index) => (
            <div 
              key={item.slug} 
              className="relative" 
              style={{ overflow: 'visible' }}
              ref={(el) => {
                menuItemRefs.current[index] = el;
              }}
            >
              {item.children ? (
                <>
                  <button
                    role="menuitem"
                    onClick={() => {
                      if (activeSubmenu === item.slug) {
                        setActiveSubmenu(null);
                        setSubmenuPosition(null);
                      } else {
                        handleSubmenuOpen(item.slug, index);
                      }
                    }}
                    onKeyDown={(e) => handleMenuItemKeyDown(e, index, item)}
                    onMouseEnter={() => handleSubmenuOpen(item.slug, index)}
                    className={`w-full px-4 py-3 text-left text-white hover:bg-rose-500/20 hover:text-rose-400 transition-all duration-200 flex items-center justify-between focus:outline-none focus:bg-rose-500/20 focus:text-rose-400 min-h-[44px] ${
                      focusedIndex === index ? 'bg-rose-500/20 text-rose-400' : ''
                    }`}
                    aria-haspopup="true"
                    aria-expanded={activeSubmenu === item.slug}
                  >
                    <span>{item.label}</span>
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${activeSubmenu === item.slug ? 'rotate-90' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                  
                  {activeSubmenu === item.slug && submenuPosition && (
                    <div 
                      role="menu"
                      className="fixed bg-[#252525] border border-gray-600 rounded-lg shadow-2xl shadow-black/50 py-2 z-[100] min-w-[280px]"
                      style={{
                        top: `${submenuPosition.top}px`,
                        left: `${submenuPosition.left}px`,
                      }}
                      onMouseEnter={() => setActiveSubmenu(item.slug)}
                      onMouseLeave={() => {
                        setActiveSubmenu(null);
                        setSubmenuPosition(null);
                      }}
                    >
                      {item.children.map((child, childIndex) => (
                        <Link
                          key={child.slug}
                          href={child.href || `#`}
                          role="menuitem"
                          ref={(el) => {
                            itemRefs.current[index * 100 + childIndex] = el;
                          }}
                          onKeyDown={(e) => handleSubmenuKeyDown(e, index, childIndex, item.children || [])}
                          onClick={() => {
                            setIsOpen(false);
                            setActiveSubmenu(null);
                            setFocusedIndex(-1);
                            setSubmenuPosition(null);
                          }}
                          className="block px-4 py-3 text-white hover:bg-rose-500/20 hover:text-rose-400 transition-all duration-200 focus:outline-none focus:bg-rose-500/20 focus:text-rose-400 min-h-[44px] whitespace-nowrap"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={`/menu/${item.slug}`}
                  role="menuitem"
                  onClick={() => {
                    setIsOpen(false);
                    setFocusedIndex(-1);
                  }}
                  onKeyDown={(e) => handleMenuItemKeyDown(e, index, item)}
                  className={`block px-4 py-3 text-white hover:bg-rose-500/20 hover:text-rose-400 transition-all duration-200 focus:outline-none focus:bg-rose-500/20 focus:text-rose-400 min-h-[44px] ${
                    focusedIndex === index ? 'bg-rose-500/20 text-rose-400' : ''
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

