'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface SidebarItem {
  id: string;
  title: string;
  href: string;
  icon?: string;
  children?: SidebarItem[];
}

interface SidebarProps {
  items: SidebarItem[];
  onThisPage?: { id: string; title: string }[];
  activeSection?: string;
  setActiveSection?: (section: string) => void;
  activeSubsection?: string | null;
  setActiveSubsection?: (section: string | null) => void;
}

export default function Sidebar({ items, onThisPage: _onThisPage, activeSection, setActiveSection, activeSubsection, setActiveSubsection }: SidebarProps) {
  void _onThisPage;
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActive = (href: string) => {
    return pathname === href;
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const handleItemClick = (e: React.MouseEvent, itemId: string, href: string, parentId?: string) => {
    // Check if the href is a hash link (client-side navigation)
    if (href.includes('#') && setActiveSection) {
      e.preventDefault();
      const sectionId = href.split('#')[1];
      // If itemId matches sectionId, it's a direct section (not a subsection)
      // Otherwise, if there's a parentId, use it as the main section
      const targetSection = (itemId === sectionId) ? sectionId : (parentId || sectionId);
      setActiveSection(targetSection);
      if (setActiveSubsection) {
        // Only set as subsection if it's not a direct section and has a parent
        setActiveSubsection((itemId === sectionId || !parentId) ? null : sectionId);
      }

      // Update URL hash
      window.history.replaceState(null, '', href);

      // Scroll to the target section
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    }
  };

  useEffect(() => {
    if (!activeSection) return;
    const parentWithChildren = items.find(item => {
      const hasChildren = item.children && item.children.length > 0;
      if (!hasChildren) return false;
      return item.id === activeSection || item.children!.some(child => child.id === activeSection);
    });

    if (parentWithChildren) {
      setExpandedItems(prev =>
        prev.includes(parentWithChildren.id) ? prev : [...prev, parentWithChildren.id]
      );
    }
  }, [items, activeSection]);

  const renderSidebarItem = (item: SidebarItem, level = 0, parentId?: string) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const childActive = hasChildren && item.children!.some(child => child.id === activeSubsection);
    const active = isActive(item.href) || (activeSection && item.id === activeSection) || childActive;

    return (
      <div key={item.id} className="mb-1 animate-fade-in-up">
        <div className="flex items-center">
          {hasChildren ? (
            <button
              onClick={() => {
                toggleExpanded(item.id);
                if (setActiveSection) {
                  const sectionId = item.href.includes('#') ? item.href.split('#')[1] : item.id;
                  setActiveSection(sectionId);
                  if (setActiveSubsection) {
                    setActiveSubsection(null);
                  }
                  setTimeout(() => {
                    scrollToSection(sectionId);
                  }, 100);
                }
              }}
              className={`flex items-center w-full px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gray-400/50 ${
                active
                  ? 'bg-gray-700 text-white border border-gray-600 shadow-lg'
                  : 'text-white hover:bg-gray-800/50 hover:border hover:border-gray-600 hover:shadow-md'
              }`}
            >
              <svg
                className={`w-5 h-5 mr-3 transition-all duration-300 ${
                  isExpanded ? 'rotate-90 text-white' : 'text-gray-400'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              {item.icon && <span className="mr-3 text-lg transition-transform duration-300 group-hover:scale-110">{item.icon}</span>}
              {item.title}
            </button>
          ) : (
            <Link
              href={item.href}
              onClick={(e) => handleItemClick(e, item.id, item.href, parentId)}
              className={`flex items-center w-full px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] group focus:outline-none focus:ring-2 focus:ring-gray-400/50 ${
                active
                  ? 'bg-gray-700 text-white border border-gray-600 shadow-lg'
                  : 'text-white hover:bg-gray-800/50 hover:border hover:border-gray-600 hover:shadow-md'
              }`}
            >
              {item.icon && <span className="mr-3 text-lg transition-transform duration-300 group-hover:scale-110">{item.icon}</span>}
              {item.title}
            </Link>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="ml-4 mt-1 space-y-1 animate-fade-in-up">
            {item.children!.map(child => renderSidebarItem(child, level + 1, item.id))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#1a1a1a] border-r border-gray-600 relative z-[60] overflow-y-auto">
      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {items.map(item => renderSidebarItem(item))}
        </div>
      </nav>

    </div>
  );
}
