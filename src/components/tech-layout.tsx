'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';

// Define the types for the props
interface TechLayoutProps {
  children: React.ReactNode;
  onThisPage: { id: string; title: string }[];
  technology: 'java' | 'python' | 'sql' | 'web-dev' | 'data-science' | 'code-terminal' | 'devops';
  activeSection?: string;
  setActiveSection?: (section: string) => void;
}

// Technology-specific navigation items
const getTechNavigationItems = (tech: string) => {
  const baseItems = [
    {
      id: 'home',
      title: 'Home',
      href: '/',
      icon: '🏠'
    },
    {
      id: 'devops',
      title: 'OHG 365',
      href: '/devops',
      icon: '🚀'
    }
  ];

  const techItems = {
    java: [
      {
        id: 'java-basics',
        title: 'Java Basics',
        href: '/java',
        icon: '☕',
        children: [
          { id: 'introduction', title: 'Introduction', href: '/java#introduction' },
          { id: 'control-statements', title: 'Control Statements', href: '/java#control-statements' }
        ]
      },
      {
        id: 'java-intermediate',
        title: 'Java Intermediate',
        href: '/java',
        icon: '⚡',
        children: [
          { id: 'oop-concepts', title: 'OOP Concepts', href: '/java#oop-concepts' },
          { id: 'keywords', title: 'Java Keywords', href: '/java#keywords' },
          { id: 'strings', title: 'Strings & String Handling', href: '/java#strings' },
          { id: 'arrays-collections', title: 'Arrays & Collections', href: '/java#arrays-collections' },
          { id: 'exceptions', title: 'Exception Handling', href: '/java#exceptions' },
          { id: 'packages', title: 'Packages & Modules', href: '/java#packages' }
        ]
      },
      {
        id: 'java-advanced',
        title: 'Java Advanced',
        href: '/java',
        icon: '🔥',
        children: [
          { id: 'multithreading', title: 'Multi-threading', href: '/java#multithreading' },
          { id: 'file-io', title: 'File I/O Streams', href: '/java#file-io' },
          { id: 'java8-features', title: 'Java 8+ Features', href: '/java#java8-features' },
          { id: 'memory-management', title: 'Memory Management', href: '/java#memory-management' },
          { id: 'advanced-concepts', title: 'Advanced Core Concepts', href: '/java#advanced-concepts' }
        ]
      },
      {
        id: 'java-resources',
        title: 'Resources',
        href: '/java',
        icon: '📚',
        children: [
          { id: 'video-tutorials', title: 'Video Tutorials', href: '/java#video-tutorials' },
          { id: 'practice-projects', title: 'Practice Projects', href: '/java#practice-projects' },
          { id: 'summary', title: 'Summary', href: '/java#summary' }
        ]
      }
    ],
    python: [
      {
        id: 'python-basics',
        title: 'Python Basics',
        href: '/python',
        icon: '🐍',
        children: [
          { id: 'introduction', title: 'Introduction', href: '/python#introduction' },
          { id: 'syntax-indentation', title: 'Syntax & Indentation', href: '/python#syntax-indentation' },
          { id: 'variables-data-types', title: 'Variables & Data Types', href: '/python#variables-data-types' },
          { id: 'operators', title: 'Type Casting & Operators', href: '/python#operators' },
          { id: 'conditionals', title: 'Conditionals', href: '/python#conditionals' },
          { id: 'loops', title: 'Loops', href: '/python#loops' }
        ]
      },
      {
        id: 'python-intermediate',
        title: 'Python Intermediate',
        href: '/python',
        icon: '⚡',
        children: [
          { id: 'strings', title: 'Strings', href: '/python#strings' },
          { id: 'data-structures', title: 'Data Structures', href: '/python#data-structures' },
          { id: 'functions', title: 'Functions', href: '/python#functions' },
          { id: 'oop', title: 'OOP', href: '/python#oop' },
          { id: 'file-handling', title: 'File Handling', href: '/python#file-handling' },
          { id: 'exception-handling', title: 'Exception Handling', href: '/python#exception-handling' },
          { id: 'modules-packages', title: 'Modules & Packages', href: '/python#modules-packages' }
        ]
      },
      {
        id: 'python-advanced',
        title: 'Python Advanced',
        href: '/python',
        icon: '🔥',
        children: [
          { id: 'advanced-concepts', title: 'Advanced Concepts', href: '/python#advanced-concepts' }
        ]
      },
      {
        id: 'python-resources',
        title: 'Resources',
        href: '/python',
        icon: '📚',
        children: [
          { id: 'video-tutorials', title: 'Video Tutorials', href: '/python#video-tutorials' },
          { id: 'practice-projects', title: 'Practice Projects', href: '/python#practice-projects' },
          { id: 'summary', title: 'Summary', href: '/python#summary' }
        ]
      }
    ],
    sql: [
      {
        id: 'sql-basics',
        title: 'SQL Basics',
        href: '/sql',
        icon: '🗄️',
        children: [
          { id: 'introduction', title: 'Introduction', href: '/sql#introduction' },
          { id: 'basic-commands', title: 'Basic Commands', href: '/sql#basic-commands' },
          { id: 'data-types', title: 'Data Types & Constraints', href: '/sql#data-types' },
          { id: 'creating-tables', title: 'Creating Tables', href: '/sql#creating-tables' },
          { id: 'data-manipulation', title: 'Data Manipulation', href: '/sql#data-manipulation' },
          { id: 'filtering-sorting', title: 'Filtering & Sorting', href: '/sql#filtering-sorting' }
        ]
      },
      {
        id: 'sql-intermediate',
        title: 'SQL Intermediate',
        href: '/sql',
        icon: '⚡',
        children: [
          { id: 'joins', title: 'Joins and Relationships', href: '/sql#joins' },
          { id: 'aggregate-functions', title: 'Aggregate Functions', href: '/sql#aggregate-functions' },
          { id: 'subqueries', title: 'Subqueries', href: '/sql#subqueries' },
          { id: 'window-functions', title: 'Window Functions', href: '/sql#window-functions' }
        ]
      },
      {
        id: 'sql-advanced',
        title: 'SQL Advanced',
        href: '/sql',
        icon: '🔥',
        children: [
          { id: 'database-design', title: 'Database Design', href: '/sql#database-design' },
          { id: 'indexes-performance', title: 'Indexes & Performance', href: '/sql#indexes-performance' },
          { id: 'transactions', title: 'Transactions & ACID', href: '/sql#transactions' }
        ]
      },
      {
        id: 'sql-resources',
        title: 'Resources',
        href: '/sql',
        icon: '📚',
        children: [
          { id: 'video-tutorials', title: 'Video Tutorials', href: '/sql#video-tutorials' },
          { id: 'practice-projects', title: 'Practice Projects', href: '/sql#practice-projects' },
          { id: 'summary', title: 'Summary', href: '/sql#summary' }
        ]
      }
    ],
    'web-dev': [
      {
        id: 'frontend',
        title: 'Frontend Development',
        href: '/web-dev',
        icon: '🎨',
        children: [
          { id: 'html', title: 'HTML', href: '/web-dev' },
          { id: 'css', title: 'CSS', href: '/web-dev' },
          { id: 'javascript', title: 'JavaScript', href: '/web-dev' }
        ]
      },
      {
        id: 'backend',
        title: 'Backend Development',
        href: '/web-dev',
        icon: '⚙️',
        children: [
          { id: 'nodejs', title: 'Node.js', href: '/web-dev' },
          { id: 'express', title: 'Express.js', href: '/web-dev' }
        ]
      }
    ],
    'data-science': [
      {
        id: 'data-analysis',
        title: 'Data Analysis',
        href: '/data-science',
        icon: '📊',
        children: [
          { id: 'pandas', title: 'Pandas', href: '/data-science' },
          { id: 'numpy', title: 'NumPy', href: '/data-science' }
        ]
      },
      {
        id: 'machine-learning',
        title: 'Machine Learning',
        href: '/data-science',
        icon: '🤖',
        children: [
          { id: 'scikit-learn', title: 'Scikit-learn', href: '/data-science' },
          { id: 'tensorflow', title: 'TensorFlow', href: '/data-science' }
        ]
      }
    ],
    'code-terminal': [
      {
        id: 'terminal-basics',
        title: 'Terminal Basics',
        href: '/code-terminal',
        icon: '💻',
        children: [
          { id: 'commands', title: 'Basic Commands', href: '/code-terminal' },
          { id: 'navigation', title: 'File Navigation', href: '/code-terminal' }
        ]
      },
      {
        id: 'terminal-advanced',
        title: 'Advanced Terminal',
        href: '/code-terminal',
        icon: '⚡',
        children: [
          { id: 'scripting', title: 'Shell Scripting', href: '/code-terminal' },
          { id: 'automation', title: 'Automation', href: '/code-terminal' }
        ]
      }
    ],
    devops: [
      {
        id: 'devops-basics',
        title: 'DevOps Basics',
        href: '/devops',
        icon: '🚀',
        children: [
          { id: 'introduction', title: 'Introduction', href: '/devops#introduction' },
          { id: 'core-concepts', title: 'Core Concepts', href: '/devops#core-concepts' },
          { id: 'devops-lifecycle', title: 'DevOps Lifecycle', href: '/devops#devops-lifecycle' }
        ]
      },
      {
        id: 'devops-tools',
        title: 'Tools & Technologies',
        href: '/devops',
        icon: '⚡',
        children: [
          { id: 'tools-technologies', title: 'Tools & Technologies', href: '/devops#tools-technologies' },
          { id: 'learning-path', title: 'Learning Path', href: '/devops#learning-path' }
        ]
      },
      {
        id: 'devops-resources',
        title: 'Resources',
        href: '/devops',
        icon: '📚',
        children: [
          { id: 'summary', title: 'Summary', href: '/devops#summary' }
        ]
      },
      {
        id: 'linux-basics',
        title: 'Linux Basics',
        href: '/docs/linux-basics',
        icon: '🐧',
        children: [
          { id: 'linux-commands', title: 'Basic Commands', href: '/docs/linux-basics' },
          { id: 'file-system', title: 'File System', href: '/docs/linux-basics' }
        ]
      },
      {
        id: 'containerization',
        title: 'Containerization',
        href: '/docs/docker',
        icon: '🐳',
        children: [
          { id: 'docker-basics', title: 'Docker Basics', href: '/docs/docker' },
          { id: 'docker-compose', title: 'Docker Compose', href: '/docs/docker' }
        ]
      },
      {
        id: 'orchestration',
        title: 'Orchestration',
        href: '/docs/kubernetes',
        icon: '☸️',
        children: [
          { id: 'k8s-basics', title: 'Kubernetes Basics', href: '/docs/kubernetes' },
          { id: 'k8s-deployment', title: 'Deployments', href: '/docs/kubernetes' }
        ]
      },
      {
        id: 'cicd',
        title: 'CI/CD',
        href: '/docs/jenkins',
        icon: '🔄',
        children: [
          { id: 'jenkins-basics', title: 'Jenkins Basics', href: '/docs/jenkins' },
          { id: 'pipelines', title: 'Pipelines', href: '/docs/jenkins' }
        ]
      },
      {
        id: 'monitoring',
        title: 'Monitoring',
        href: '/docs/monitoring',
        icon: '📊',
        children: [
          { id: 'prometheus', title: 'Prometheus', href: '/docs/monitoring' },
          { id: 'grafana', title: 'Grafana', href: '/docs/monitoring' }
        ]
      }
    ]
  };

  return [...baseItems, ...(techItems[tech as keyof typeof techItems] || [])];
};

export default function TechLayout({ children, onThisPage, technology, activeSection: externalActiveSection, setActiveSection: externalSetActiveSection }: TechLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [internalActiveSection, setInternalActiveSection] = useState('');

  const activeSection = externalActiveSection !== undefined ? externalActiveSection : internalActiveSection;
  const setActiveSection = externalSetActiveSection || setInternalActiveSection;

  const navigationItems = getTechNavigationItems(technology);

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
        <Sidebar items={navigationItems} onThisPage={onThisPage} activeSection={activeSection} setActiveSection={setActiveSection} />
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
            <h1 className="text-xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {technology === 'java' ? 'Java Programming' :
               technology === 'python' ? 'Python Programming' :
               technology === 'sql' ? 'SQL & Databases' :
               technology === 'web-dev' ? 'Web Development' :
               technology === 'data-science' ? 'Data Science' :
               technology === 'code-terminal' ? 'Code Terminal' :
               technology === 'devops' ? 'DevOps' : 'OHG 365'}
            </h1>
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
                  className={`block px-4 py-3 text-sm rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-opacity-50 ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-400 border border-blue-500/30 shadow-blue-500/20 font-semibold'
                      : 'text-gray-300 hover:bg-gradient-to-r hover:from-gray-800/50 hover:to-gray-700/50 hover:text-white hover:shadow-gray-500/20 hover:ring-2 hover:ring-blue-500/30 hover:ring-opacity-50'
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
