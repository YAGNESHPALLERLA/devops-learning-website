'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

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
}

export default function Sidebar({ items, onThisPage = [], activeSection, setActiveSection }: SidebarProps) {
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

  const handleItemClick = (e: React.MouseEvent, itemId: string, href: string) => {
    // Check if the href is a hash link (client-side navigation)
    if (href.includes('#') && setActiveSection) {
      e.preventDefault();
      const sectionId = href.split('#')[1];
      setActiveSection(sectionId);
      
      // Scroll to the target section
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop - 100; // Account for fixed header
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  const renderSidebarItem = (item: SidebarItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const active = isActive(item.href) || (activeSection && item.id === activeSection);

    return (
      <div key={item.id} className="mb-1 animate-fade-in-up">
        <div className="flex items-center">
          {hasChildren ? (
            <button
              onClick={() => toggleExpanded(item.id)}
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
              onClick={(e) => handleItemClick(e, item.id, item.href)}
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
            {item.children!.map(child => renderSidebarItem(child, level + 1))}
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
