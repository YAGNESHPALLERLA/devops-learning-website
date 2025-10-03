'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';

// Define the types for the props
interface TechLayoutProps {
  children: React.ReactNode;
  onThisPage: { id: string; title: string }[];
  technology: 'java' | 'python' | 'sql' | 'web-dev' | 'data-science' | 'code-terminal' | 'devops';
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
        href: '/java/basics',
        icon: '☕',
        children: [
          { id: 'java-intro', title: 'Introduction', href: '/java/basics/introduction' },
          { id: 'java-control', title: 'Control Statements', href: '/java/basics/control-statements' }
        ]
      },
      {
        id: 'java-intermediate',
        title: 'Java Intermediate',
        href: '/java/intermediate',
        icon: '⚡',
        children: [
          { id: 'java-oop', title: 'OOP Concepts', href: '/java/intermediate/oop' },
          { id: 'java-collections', title: 'Collections', href: '/java/intermediate/collections' }
        ]
      },
      {
        id: 'java-advanced',
        title: 'Java Advanced',
        href: '/java/advanced',
        icon: '🔥',
        children: [
          { id: 'java-spring', title: 'Spring Framework', href: '/java/advanced/spring' },
          { id: 'java-microservices', title: 'Microservices', href: '/java/advanced/microservices' }
        ]
      }
    ],
    python: [
      {
        id: 'python-basics',
        title: 'Python Basics',
        href: '/python/basics',
        icon: '🐍',
        children: [
          { id: 'python-intro', title: 'Introduction', href: '/python/basics/introduction' },
          { id: 'python-syntax', title: 'Syntax', href: '/python/basics/syntax' },
          { id: 'python-variables', title: 'Variables', href: '/python/basics/variables' },
          { id: 'python-operators', title: 'Operators', href: '/python/basics/operators' },
          { id: 'python-conditionals', title: 'Conditionals', href: '/python/basics/conditionals' },
          { id: 'python-loops', title: 'Loops', href: '/python/basics/loops' }
        ]
      },
      {
        id: 'python-intermediate',
        title: 'Python Intermediate',
        href: '/python/intermediate',
        icon: '⚡',
        children: [
          { id: 'python-functions', title: 'Functions', href: '/python/intermediate/functions' },
          { id: 'python-oop', title: 'OOP', href: '/python/intermediate/oop' },
          { id: 'python-modules', title: 'Modules', href: '/python/intermediate/modules' }
        ]
      },
      {
        id: 'python-advanced',
        title: 'Python Advanced',
        href: '/python/advanced',
        icon: '🔥',
        children: [
          { id: 'python-data-science', title: 'Data Science', href: '/python/advanced/data-science' },
          { id: 'python-web-dev', title: 'Web Development', href: '/python/advanced/web-dev' }
        ]
      }
    ],
    sql: [
      {
        id: 'sql-basics',
        title: 'SQL Basics',
        href: '/sql/basics',
        icon: '🗄️',
        children: [
          { id: 'sql-intro', title: 'Introduction', href: '/sql/basics/introduction' },
          { id: 'sql-commands', title: 'Basic Commands', href: '/sql/basics/commands' }
        ]
      },
      {
        id: 'sql-intermediate',
        title: 'SQL Intermediate',
        href: '/sql/intermediate',
        icon: '⚡',
        children: [
          { id: 'sql-joins', title: 'Joins', href: '/sql/intermediate/joins' },
          { id: 'sql-functions', title: 'Functions', href: '/sql/intermediate/functions' }
        ]
      },
      {
        id: 'sql-advanced',
        title: 'SQL Advanced',
        href: '/sql/advanced',
        icon: '🔥',
        children: [
          { id: 'sql-optimization', title: 'Optimization', href: '/sql/advanced/optimization' },
          { id: 'sql-performance', title: 'Performance', href: '/sql/advanced/performance' }
        ]
      }
    ],
    'web-dev': [
      {
        id: 'frontend',
        title: 'Frontend Development',
        href: '/web-dev/frontend',
        icon: '🎨',
        children: [
          { id: 'html', title: 'HTML', href: '/web-dev/frontend/html' },
          { id: 'css', title: 'CSS', href: '/web-dev/frontend/css' },
          { id: 'javascript', title: 'JavaScript', href: '/web-dev/frontend/javascript' }
        ]
      },
      {
        id: 'backend',
        title: 'Backend Development',
        href: '/web-dev/backend',
        icon: '⚙️',
        children: [
          { id: 'nodejs', title: 'Node.js', href: '/web-dev/backend/nodejs' },
          { id: 'express', title: 'Express.js', href: '/web-dev/backend/express' }
        ]
      }
    ],
    'data-science': [
      {
        id: 'data-analysis',
        title: 'Data Analysis',
        href: '/data-science/analysis',
        icon: '📊',
        children: [
          { id: 'pandas', title: 'Pandas', href: '/data-science/analysis/pandas' },
          { id: 'numpy', title: 'NumPy', href: '/data-science/analysis/numpy' }
        ]
      },
      {
        id: 'machine-learning',
        title: 'Machine Learning',
        href: '/data-science/ml',
        icon: '🤖',
        children: [
          { id: 'scikit-learn', title: 'Scikit-learn', href: '/data-science/ml/scikit-learn' },
          { id: 'tensorflow', title: 'TensorFlow', href: '/data-science/ml/tensorflow' }
        ]
      }
    ],
    'code-terminal': [
      {
        id: 'terminal-basics',
        title: 'Terminal Basics',
        href: '/code-terminal/basics',
        icon: '💻',
        children: [
          { id: 'commands', title: 'Basic Commands', href: '/code-terminal/basics/commands' },
          { id: 'navigation', title: 'File Navigation', href: '/code-terminal/basics/navigation' }
        ]
      },
      {
        id: 'terminal-advanced',
        title: 'Advanced Terminal',
        href: '/code-terminal/advanced',
        icon: '⚡',
        children: [
          { id: 'scripting', title: 'Shell Scripting', href: '/code-terminal/advanced/scripting' },
          { id: 'automation', title: 'Automation', href: '/code-terminal/advanced/automation' }
        ]
      }
    ],
    devops: [
      {
        id: 'devops-basics',
        title: 'DevOps Basics',
        href: '/devops/basics',
        icon: '🚀',
        children: [
          { id: 'what-is-devops', title: 'What is DevOps', href: '/docs/what-is-devops' },
          { id: 'concepts', title: 'Core Concepts', href: '/docs/concepts' },
          { id: 'tools', title: 'DevOps Tools', href: '/docs/tools' }
        ]
      },
      {
        id: 'linux-basics',
        title: 'Linux Basics',
        href: '/docs/linux-basics',
        icon: '🐧',
        children: [
          { id: 'linux-commands', title: 'Basic Commands', href: '/docs/linux-basics/commands' },
          { id: 'file-system', title: 'File System', href: '/docs/linux-basics/file-system' }
        ]
      },
      {
        id: 'containerization',
        title: 'Containerization',
        href: '/docs/docker',
        icon: '🐳',
        children: [
          { id: 'docker-basics', title: 'Docker Basics', href: '/docs/docker/basics' },
          { id: 'docker-compose', title: 'Docker Compose', href: '/docs/docker/compose' }
        ]
      },
      {
        id: 'orchestration',
        title: 'Orchestration',
        href: '/docs/kubernetes',
        icon: '☸️',
        children: [
          { id: 'k8s-basics', title: 'Kubernetes Basics', href: '/docs/kubernetes/basics' },
          { id: 'k8s-deployment', title: 'Deployments', href: '/docs/kubernetes/deployments' }
        ]
      },
      {
        id: 'cicd',
        title: 'CI/CD',
        href: '/docs/jenkins',
        icon: '🔄',
        children: [
          { id: 'jenkins-basics', title: 'Jenkins Basics', href: '/docs/jenkins/basics' },
          { id: 'pipelines', title: 'Pipelines', href: '/docs/jenkins/pipelines' }
        ]
      },
      {
        id: 'monitoring',
        title: 'Monitoring',
        href: '/docs/monitoring',
        icon: '📊',
        children: [
          { id: 'prometheus', title: 'Prometheus', href: '/docs/monitoring/prometheus' },
          { id: 'grafana', title: 'Grafana', href: '/docs/monitoring/grafana' }
        ]
      }
    ]
  };

  return [...baseItems, ...(techItems[tech as keyof typeof techItems] || [])];
};

export default function TechLayout({ children, onThisPage, technology }: TechLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

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
