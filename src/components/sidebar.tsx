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
      const section = href.split('#')[1];
      setActiveSection(section);
      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <div className="flex flex-col h-full bg-[#1a1a1a] border-r border-gray-600">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-600 animate-fade-in-up">
        <Link href="/" className="flex items-center space-x-3 group transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-xl border border-gray-600 transition-all duration-300 group-hover:bg-gray-600 group-hover:shadow-lg">
            <svg className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path d="M18.178 8.178a4 4 0 0 0-5.656 0L12 8.7l-.522-.522a4 4 0 1 0-5.656 5.656L12 20.014l6.178-6.18a4 4 0 0 0 0-5.656z"/>
              <path d="M5.822 15.822a4 4 0 0 0 5.656 0L12 15.3l.522.522a4 4 0 1 0 5.656-5.656L12 3.986 5.822 10.166a4 4 0 0 0 0 5.656z"/>
              <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
            </svg>
          </div>
          <span className="text-xl font-bold text-white transition-all duration-300 group-hover:text-gray-300">OneHubGlobal</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {items.map(item => renderSidebarItem(item))}
        </div>
      </nav>

    </div>
  );
}
