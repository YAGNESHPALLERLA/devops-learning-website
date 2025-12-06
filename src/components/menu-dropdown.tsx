'use client';

import { useState, useEffect, useRef, useCallback, KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
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
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const menuItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const menuButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const submenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (submenuTimeoutRef.current) {
        clearTimeout(submenuTimeoutRef.current);
      }
    };
  }, []);

  // Close menu function - defined with useCallback to avoid dependency issues
  const closeMenu = useCallback(() => {
    // Clear any pending submenu timeout
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
      submenuTimeoutRef.current = null;
    }
    setIsOpen(false);
    setActiveSubmenu(null);
    setFocusedIndex(-1);
    setDropdownPosition(null);
    setSubmenuPosition(null);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Check if click is outside main menu
      const isOutsideMainMenu = menuRef.current && !menuRef.current.contains(target);
      
      // Check if click is outside submenu
      const submenuElement = document.querySelector('[data-submenu]');
      const isOutsideSubmenu = !submenuElement || !submenuElement.contains(target);
      
      if (isOutsideMainMenu && isOutsideSubmenu) {
        closeMenu();
      }
    };

    if (isOpen) {
      // Use a small delay to avoid closing immediately when opening
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 100);
      
      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, activeSubmenu, closeMenu]);

  // Close menu when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        closeMenu();
      }
    };

    if (isOpen) {
      window.addEventListener('scroll', handleScroll, true);
      return () => {
        window.removeEventListener('scroll', handleScroll, true);
      };
    }
  }, [isOpen, closeMenu]);


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
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    if (newIsOpen && buttonRef.current) {
      // Calculate dropdown position when opening
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8, // 8px margin
        left: rect.left,
      });
      setFocusedIndex(0);
    } else {
      // Clear any pending submenu timeout when closing menu
      if (submenuTimeoutRef.current) {
        clearTimeout(submenuTimeoutRef.current);
        submenuTimeoutRef.current = null;
      }
      setActiveSubmenu(null);
      setFocusedIndex(-1);
      setSubmenuPosition(null);
      setDropdownPosition(null);
    }
  };

  // Calculate submenu position
  const handleSubmenuOpen = (itemSlug: string, index: number) => {
    // Clear any pending timeout to close submenu
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
      submenuTimeoutRef.current = null;
    }
    
    // Calculate position function - defined first so we can use it in all cases
    const calculatePosition = (): { top: number; left: number } | null => {
      // Try to get the button ref first for accurate positioning
      const button = menuButtonRefs.current[index];
      if (button) {
        const rect = button.getBoundingClientRect();
        return {
          top: rect.top,
          left: rect.right + 4, // 4px gap between menu and submenu
        };
      }
      
      // Fallback to menu item wrapper
      const menuItem = menuItemRefs.current[index];
      if (menuItem) {
        const rect = menuItem.getBoundingClientRect();
        return {
          top: rect.top,
          left: rect.right + 4,
        };
      }
      
      // Last resort: calculate based on dropdown position and index
      if (dropdownPosition) {
        const itemHeight = 44; // Approximate item height including padding
        return {
          top: dropdownPosition.top + 8 + (index * itemHeight), // 8px for dropdown padding
          left: dropdownPosition.left + 320 + 4, // w-80 = 320px + 4px gap
        };
      }
      
      return null;
    };
    
    // Always set the new submenu immediately - React batches synchronous updates
    // This ensures only the current item's submenu is active (previous one will be cleared by render logic)
    setActiveSubmenu(itemSlug);
    
    // Calculate and set position immediately
    const position = calculatePosition();
    if (position) {
      setSubmenuPosition(position);
    } else {
      // If refs aren't ready, calculate after a brief delay
      setTimeout(() => {
        const delayedPosition = calculatePosition();
        if (delayedPosition) {
          setSubmenuPosition(delayedPosition);
        } else {
          // Ultimate fallback - ensure we always have a position
          setSubmenuPosition({
            top: 100 + (index * 44),
            left: 400,
          });
        }
      }, 10);
    }
    
    // Refine position after DOM update to ensure accuracy
    setTimeout(() => {
      const button = menuButtonRefs.current[index];
      if (button) {
        const rect = button.getBoundingClientRect();
        setSubmenuPosition({
          top: rect.top,
          left: rect.right + 4,
        });
      }
    }, 50);
  };

  // Handle closing submenu with delay
  const handleSubmenuClose = (itemSlug: string) => {
    // Clear any existing timeout
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current);
      submenuTimeoutRef.current = null;
    }
    
    // Set a timeout to close after a short delay
    submenuTimeoutRef.current = setTimeout(() => {
      // Only close if we're still on the same submenu (hasn't been reopened)
      setActiveSubmenu((current) => {
        if (current === itemSlug) {
          setSubmenuPosition(null);
          return null;
        }
        return current;
      });
    }, 200); // 200ms delay to allow mouse movement to submenu
  };

  return (
    <div className="relative" ref={menuRef} style={{ overflow: 'visible', zIndex: 10000 }}>
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        onKeyDown={handleKeyDown}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Open main menu"
        className="text-white/90 hover:text-white transition-all duration-300 font-bold flex items-center space-x-1 focus:outline-none rounded px-2 py-1 min-h-[44px] min-w-[44px]"
      >
        <span>Menu</span>
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
      
      {isOpen && dropdownPosition && (
        <div 
          role="menu"
          className="fixed w-80 rounded-lg shadow-2xl py-2 overflow-visible"
          style={{ 
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            position: 'fixed',
            background: 'rgba(8, 61, 119, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            zIndex: 10000
          }}
          onMouseLeave={(e) => {
            // Check if mouse is really leaving (not going to submenu)
            const relatedTarget = e.relatedTarget;
            const submenuElement = document.querySelector('[data-submenu]');
            
            // Type check: relatedTarget must be a Node
            const isRelatedTargetNode = relatedTarget instanceof Node;
            
            // If relatedTarget is not a Node, treat as leaving
            // If it is a Node, check if it's within submenu or main menu
            const isMovingToSubmenu = isRelatedTargetNode && submenuElement?.contains(relatedTarget);
            const isMovingToMainMenu = isRelatedTargetNode && menuRef.current?.contains(relatedTarget);
            
            // If not moving to submenu and not moving to another menu item
            if (!isMovingToSubmenu && !isMovingToMainMenu) {
              setTimeout(() => {
                const currentTarget = document.elementFromPoint(e.clientX, e.clientY);
                if (currentTarget) {
                  const stillOutsideMain = menuRef.current && !menuRef.current.contains(currentTarget);
                  const stillOutsideSub = !submenuElement || !submenuElement.contains(currentTarget);
                  if (stillOutsideMain && stillOutsideSub && isOpen) {
                    closeMenu();
                  }
                } else if (isOpen) {
                  // If we can't find current target, close the menu
                  closeMenu();
                }
              }, 200);
            }
          }}
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
                    ref={(el) => {
                      menuButtonRefs.current[index] = el;
                    }}
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
                    onMouseLeave={() => handleSubmenuClose(item.slug)}
                    className={`w-full px-4 py-3 text-left text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 flex items-center justify-between focus:outline-none focus:bg-white/10 focus:text-white min-h-[44px] ${
                      activeSubmenu === item.slug ? 'bg-white/10 text-white' : ''
                    } ${
                      focusedIndex === index ? 'bg-white/10 text-white' : ''
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
                  
                  {isMounted && (activeSubmenu === item.slug) && submenuPosition && createPortal(
                    <>
                      {/* Invisible bridge to prevent gap between button and submenu */}
                      <div
                        className="fixed"
                        style={{
                          position: 'fixed',
                          top: `${submenuPosition.top}px`,
                          left: `${submenuPosition.left - 8}px`,
                          width: '8px',
                          height: '44px',
                          pointerEvents: 'auto',
                          zIndex: 10001
                        }}
                        onMouseEnter={() => {
                          if (submenuTimeoutRef.current) {
                            clearTimeout(submenuTimeoutRef.current);
                            submenuTimeoutRef.current = null;
                          }
                          setActiveSubmenu(item.slug);
                        }}
                      />
                      <div 
                        data-submenu
                        role="menu"
                        className="fixed rounded-lg shadow-2xl py-2 min-w-[280px] overflow-visible"
                        style={{
                          position: 'fixed',
                          top: `${submenuPosition.top}px`,
                          left: `${submenuPosition.left}px`,
                          background: 'rgba(8, 61, 119, 0.95)',
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                          maxHeight: '90vh',
                          overflowY: 'auto',
                          zIndex: 10002
                        }}
                        onMouseEnter={() => {
                          // Clear timeout and keep submenu open
                          if (submenuTimeoutRef.current) {
                            clearTimeout(submenuTimeoutRef.current);
                            submenuTimeoutRef.current = null;
                          }
                          setActiveSubmenu(item.slug);
                        }}
                        onMouseLeave={() => handleSubmenuClose(item.slug)}
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
                            setDropdownPosition(null);
                          }}
                          className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 focus:outline-none focus:bg-white/10 focus:text-white min-h-[44px] whitespace-nowrap"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                    </>,
                    document.body
                  )}
                </>
              ) : (
                <Link
                  href={`/menu/${item.slug}`}
                  role="menuitem"
                  onClick={() => {
                    setIsOpen(false);
                    setFocusedIndex(-1);
                    setDropdownPosition(null);
                  }}
                  onKeyDown={(e) => handleMenuItemKeyDown(e, index, item)}
                  className={`block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 focus:outline-none focus:bg-white/10 focus:text-white min-h-[44px] ${
                    focusedIndex === index ? 'bg-white/10 text-white' : ''
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

