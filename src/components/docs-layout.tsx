'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';

// Define the types for the props
interface DocsLayoutProps {
  children: React.ReactNode;
  onThisPage: { id: string; title: string }[];
}

// Navigation items with hierarchical structure
const navigationItems = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    href: '/docs/what-is-devops',
    icon: '🚀',
    children: [
      { id: 'what-is-devops', title: 'What is DevOps?', href: '/docs/what-is-devops' },
      { id: 'concepts', title: 'Core Concepts', href: '/docs/concepts' },
      { id: 'tools-overview', title: 'Tools Overview', href: '/docs/tools' },
    ]
  },
  {
    id: 'fundamentals',
    title: 'Fundamentals',
    href: '/docs/linux-basics',
    icon: '📚',
    children: [
      { id: 'linux-basics', title: 'Linux Basics', href: '/docs/linux-basics' },
      { id: 'scripting', title: 'Scripting Languages', href: '/docs/scripting-languages' },
      { id: 'version-control', title: 'Version Control (Git)', href: '/docs/version-control' },
    ]
  },
  {
    id: 'cloud-platforms',
    title: 'Cloud Platforms',
    href: '/docs/cloud',
    icon: '☁️',
    children: [
      { id: 'cloud', title: 'Cloud (AWS, Azure)', href: '/docs/cloud' },
    ]
  },
  {
    id: 'containerization',
    title: 'Containerization',
    href: '/docs/docker',
    icon: '🐳',
    children: [
      { id: 'docker', title: 'Docker (Containers)', href: '/docs/docker' },
      { id: 'kubernetes', title: 'Kubernetes', href: '/docs/kubernetes' },
    ]
  },
  {
    id: 'automation',
    title: 'Automation & CI/CD',
    href: '/docs/jenkins',
    icon: '⚙️',
    children: [
      { id: 'jenkins', title: 'Jenkins (CI & CD)', href: '/docs/jenkins' },
      { id: 'iac', title: 'Infrastructure as Code', href: '/docs/iac' },
    ]
  },
  {
    id: 'monitoring',
    title: 'Monitoring & Observability',
    href: '/docs/monitoring',
    icon: '📊',
    children: [
      { id: 'monitoring', title: 'Monitoring & Logging', href: '/docs/monitoring' },
    ]
  },
  {
    id: 'tools',
    title: 'Interactive Tools',
    href: '/terminal',
    icon: '🖥️',
    children: [
      { id: 'terminal', title: 'Interactive Terminal', href: '/terminal' },
    ]
  },
];

export default function DocsLayout({ children, onThisPage }: DocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = onThisPage.map(item => document.getElementById(item.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onThisPage]);

  // Handle smooth scroll to section
  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 100; // Account for any fixed headers
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-70 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-gradient-to-b from-gray-900 to-black shadow-2xl lg:shadow-xl border-r border-gray-700
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar items={navigationItems} onThisPage={onThisPage} />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile header */}
        <header className="lg:hidden bg-gradient-to-r from-gray-900 to-black shadow-lg border-b border-gray-700">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-3 rounded-xl text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 hover:scale-110 hover:shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">DevOps Learning</h1>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-900/50 to-black/50">
          <div className="max-w-5xl mx-auto px-8 py-12">
            <article className="prose prose-lg max-w-none text-white">
              {children}
            </article>
          </div>
        </main>
      </div>

      {/* Right sidebar for desktop - Table of Contents */}
      {onThisPage.length > 0 && (
        <aside className="hidden xl:block w-80 bg-gradient-to-b from-gray-900 to-black shadow-2xl border-l border-gray-700 sticky top-0 h-screen overflow-y-auto">
          <div className="p-6">
            <h3 className="text-lg font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">On this page</h3>
            <nav className="space-y-2">
              {onThisPage.map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleSectionClick(e, item.id)}
                  className={`block px-4 py-3 text-sm rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 border border-blue-500/30 shadow-blue-500/20 font-semibold'
                      : 'text-gray-300 hover:bg-gradient-to-r hover:from-gray-800/50 hover:to-gray-700/50 hover:text-white hover:shadow-gray-500/20'
                  }`}
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      )}
    </div>
  );
}