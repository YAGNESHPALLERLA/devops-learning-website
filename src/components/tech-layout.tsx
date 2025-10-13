'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';

// Define the types for the props
interface TechLayoutProps {
  children: React.ReactNode;
  onThisPage?: { id: string; title: string }[];
  technology: 'java' | 'python' | 'sql' | 'web-dev' | 'data-science' | 'code-terminal' | 'devops' | 'linux';
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
      title: 'OneHubGlobal',
      href: '/devops',
      icon: '🚀'
    }
  ];

  const techItems = {
    java: [
      {
        id: 'java-tutorial',
        title: 'Java Tutorial',
        href: '/java',
        icon: '☕',
        children: [
          { id: 'introduction', title: 'Java Tutorial', href: '/java#introduction' },
          { id: 'basics', title: 'Java Basics', href: '/java#basics' },
          { id: 'syntax', title: 'Java Syntax', href: '/java#syntax' },
          { id: 'output', title: 'Java Output', href: '/java#output' },
          { id: 'comments', title: 'Java Comments', href: '/java#comments' },
          { id: 'variables', title: 'Java Variables', href: '/java#variables' },
          { id: 'data-types', title: 'Java Data Types', href: '/java#data-types' },
          { id: 'operators', title: 'Java Operators', href: '/java#operators' },
          { id: 'strings', title: 'Java Strings', href: '/java#strings' },
          { id: 'math', title: 'Java Math', href: '/java#math' },
          { id: 'booleans', title: 'Java Booleans', href: '/java#booleans' },
          { id: 'if-else', title: 'Java If...Else', href: '/java#if-else' },
          { id: 'switch', title: 'Java Switch', href: '/java#switch' },
          { id: 'loops', title: 'Java Loops', href: '/java#loops' },
          { id: 'arrays', title: 'Java Arrays', href: '/java#arrays' },
          { id: 'methods', title: 'Java Methods', href: '/java#methods' }
        ]
      },
      {
        id: 'java-oop',
        title: 'Java OOP Concepts',
        href: '/java',
        icon: '🏗️',
        children: [
          { id: 'oop-concepts', title: 'Java OOP Concepts', href: '/java#oop-concepts' },
          { id: 'classes-objects', title: 'Java Classes and Objects', href: '/java#classes-objects' },
          { id: 'class-attributes', title: 'Java Class Attributes', href: '/java#class-attributes' },
          { id: 'class-methods', title: 'Java Class Methods', href: '/java#class-methods' },
          { id: 'constructors', title: 'Java Constructors', href: '/java#constructors' },
          { id: 'modifiers', title: 'Java Modifiers', href: '/java#modifiers' },
          { id: 'encapsulation', title: 'Java Encapsulation', href: '/java#encapsulation' },
          { id: 'packages', title: 'Java Packages', href: '/java#packages' },
          { id: 'inheritance', title: 'Java Inheritance', href: '/java#inheritance' },
          { id: 'polymorphism', title: 'Java Polymorphism', href: '/java#polymorphism' },
          { id: 'abstraction', title: 'Java Abstraction', href: '/java#abstraction' },
          { id: 'interfaces', title: 'Java Interface', href: '/java#interfaces' },
          { id: 'enums', title: 'Java Enums', href: '/java#enums' }
        ]
      },
      {
        id: 'java-advanced',
        title: 'Java Advanced',
        href: '/java',
        icon: '⚡',
        children: [
          { id: 'java-keywords', title: 'Java Keywords', href: '/java#java-keywords' },
          { id: 'strings-handling', title: 'Java String Methods', href: '/java#strings-handling' },
          { id: 'arrays-collections', title: 'Java Collections', href: '/java#arrays-collections' },
          { id: 'exception-handling', title: 'Java Exception Handling', href: '/java#exception-handling' },
          { id: 'packages-modules', title: 'Java Packages/Modules', href: '/java#packages-modules' },
          { id: 'file-handling', title: 'Java File Handling', href: '/java#file-handling' },
          { id: 'advanced', title: 'Java Advanced', href: '/java#advanced' },
          { id: 'date-time', title: 'Java Date/Time', href: '/java#date-time' },
          { id: 'arraylist', title: 'Java ArrayList', href: '/java#arraylist' },
          { id: 'linkedlist', title: 'Java LinkedList', href: '/java#linkedlist' },
          { id: 'hashmap', title: 'Java HashMap', href: '/java#hashmap' },
          { id: 'hashset', title: 'Java HashSet', href: '/java#hashset' },
          { id: 'iterator', title: 'Java Iterator', href: '/java#iterator' },
          { id: 'wrapper-classes', title: 'Java Wrapper Classes', href: '/java#wrapper-classes' },
          { id: 'exceptions-advanced', title: 'Java Exceptions', href: '/java#exceptions-advanced' },
          { id: 'regex', title: 'Java RegEx', href: '/java#regex' },
          { id: 'threads', title: 'Java Threads', href: '/java#threads' },
          { id: 'lambda', title: 'Java Lambda', href: '/java#lambda' }
        ]
      },
      {
        id: 'java-resources',
        title: 'Resources',
        href: '/java',
        icon: '📚',
        children: [
          { id: 'practice-projects', title: 'Practice Projects', href: '/java#practice-projects' },
          { id: 'video-tutorials', title: 'Video Tutorials', href: '/java#video-tutorials' }
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
        id: 'devops-foundation',
        title: '1. DevOps Foundation',
        href: '/devops',
        icon: '🚀',
        children: [
          { id: 'introduction', title: 'Introduction to DevOps', href: '/devops#introduction' },
          { id: 'core-concepts', title: 'Core Concepts', href: '/devops#core-concepts' },
          { id: 'devops-lifecycle', title: 'DevOps Lifecycle', href: '/devops#devops-lifecycle' }
        ]
      },
      {
        id: 'linux-fundamentals',
        title: '2. Linux Fundamentals',
        href: '/devops',
        icon: '🐧',
        children: [
          { id: 'linux-introduction', title: 'Linux Introduction', href: '/devops#linux-introduction' },
          { id: 'linux-file-system', title: 'Linux File System', href: '/devops#linux-file-system' },
          { id: 'linux-navigation', title: 'Linux Navigation', href: '/devops#linux-navigation' },
          { id: 'linux-file-management', title: 'File Management', href: '/devops#linux-file-management' },
          { id: 'linux-permissions', title: 'Linux Permissions', href: '/devops#linux-permissions' },
          { id: 'linux-process-management', title: 'Process Management', href: '/devops#linux-process-management' },
          { id: 'linux-networking', title: 'Linux Networking', href: '/devops#linux-networking' },
          { id: 'linux-shell-scripting', title: 'Shell Scripting', href: '/devops#linux-shell-scripting' }
        ]
      },
      {
        id: 'version-control',
        title: '3. Version Control',
        href: '/devops',
        icon: '🔀',
        children: [
          { id: 'git-fundamentals', title: 'Git Fundamentals', href: '/devops#git-fundamentals' },
          { id: 'git-workflows', title: 'Git Workflows', href: '/devops#git-workflows' },
          { id: 'git-advanced', title: 'Advanced Git', href: '/devops#git-advanced' },
          { id: 'github-gitlab', title: 'GitHub & GitLab', href: '/devops#github-gitlab' }
        ]
      },
      {
        id: 'infrastructure-automation',
        title: '4. Infrastructure Automation',
        href: '/devops',
        icon: '🔧',
        children: [
          { id: 'ansible-basics', title: 'Ansible Basics', href: '/devops#ansible-basics' },
          { id: 'ansible-playbooks', title: 'Ansible Playbooks', href: '/devops#ansible-playbooks' },
          { id: 'ansible-roles', title: 'Ansible Roles', href: '/devops#ansible-roles' },
          { id: 'ansible-advanced', title: 'Advanced Ansible', href: '/devops#ansible-advanced' }
        ]
      },
      {
        id: 'containerization',
        title: '5. Containerization',
        href: '/devops',
        icon: '🐳',
        children: [
          { id: 'docker-basics', title: 'Docker Basics', href: '/devops#docker-basics' },
          { id: 'docker-compose', title: 'Docker Compose', href: '/devops#docker-compose' },
          { id: 'container-best-practices', title: 'Container Best Practices', href: '/devops#container-best-practices' }
        ]
      },
      {
        id: 'orchestration',
        title: '6. Orchestration',
        href: '/devops',
        icon: '☸️',
        children: [
          { id: 'kubernetes-basics', title: 'Kubernetes Basics', href: '/devops#kubernetes-basics' },
          { id: 'k8s-deployments', title: 'K8s Deployments', href: '/devops#k8s-deployments' },
          { id: 'k8s-services', title: 'K8s Services', href: '/devops#k8s-services' },
          { id: 'k8s-monitoring', title: 'K8s Monitoring', href: '/devops#k8s-monitoring' }
        ]
      },
      {
        id: 'cicd',
        title: '7. CI/CD',
        href: '/devops',
        icon: '🔄',
        children: [
          { id: 'jenkins-basics', title: 'Jenkins Basics', href: '/devops#jenkins-basics' },
          { id: 'jenkins-pipelines', title: 'Jenkins Pipelines', href: '/devops#jenkins-pipelines' },
          { id: 'github-actions', title: 'GitHub Actions', href: '/devops#github-actions' },
          { id: 'gitlab-ci', title: 'GitLab CI', href: '/devops#gitlab-ci' }
        ]
      },
      {
        id: 'monitoring',
        title: '8. Monitoring',
        href: '/devops',
        icon: '📊',
        children: [
          { id: 'prometheus-basics', title: 'Prometheus Basics', href: '/devops#prometheus-basics' },
          { id: 'grafana-dashboards', title: 'Grafana Dashboards', href: '/devops#grafana-dashboards' },
          { id: 'elk-stack', title: 'ELK Stack', href: '/devops#elk-stack' },
          { id: 'alerting', title: 'Alerting & Incident Response', href: '/devops#alerting' }
        ]
      },
      {
        id: 'devops-advanced',
        title: '9. Advanced Topics',
        href: '/devops',
        icon: '🔥',
        children: [
          { id: 'automation', title: 'Automation & Orchestration', href: '/devops#automation' },
          { id: 'security', title: 'DevSecOps & Security', href: '/devops#security' },
          { id: 'cloud-platforms', title: 'Cloud Platforms', href: '/devops#cloud-platforms' },
          { id: 'monitoring-observability', title: 'Monitoring & Observability', href: '/devops#monitoring-observability' }
        ]
      },
      {
        id: 'devops-resources',
        title: '10. Resources',
        href: '/devops',
        icon: '📚',
        children: [
          { id: 'tools-technologies', title: 'Tools & Technologies', href: '/devops#tools-technologies' },
          { id: 'learning-path', title: 'Learning Path', href: '/devops#learning-path' },
          { id: 'summary', title: 'Summary', href: '/devops#summary' }
        ]
      }
    ],
    linux: [
      {
        id: 'linux-basics',
        title: 'Linux Basics',
        href: '/linux',
        icon: '🐧',
        children: [
          { id: 'introduction', title: 'Introduction to Linux', href: '/linux#introduction' },
          { id: 'file-system', title: 'File System Structure', href: '/linux#file-system' },
          { id: 'navigation', title: 'Navigation Commands', href: '/linux#navigation' },
          { id: 'file-management', title: 'File & Directory Management', href: '/linux#file-management' },
          { id: 'viewing-editing', title: 'Viewing & Editing Files', href: '/linux#viewing-editing' },
          { id: 'permissions', title: 'User & Permission Management', href: '/linux#permissions' },
          { id: 'process-management', title: 'Process & System Management', href: '/linux#process-management' },
          { id: 'networking', title: 'Networking Basics', href: '/linux#networking' },
          { id: 'package-management', title: 'Package Management', href: '/linux#package-management' },
          { id: 'shell-scripting', title: 'Shell Scripting Basics', href: '/linux#shell-scripting' },
          { id: 'logs-monitoring', title: 'Logs & Monitoring', href: '/linux#logs-monitoring' },
          { id: 'shortcuts', title: 'Essential Shortcuts', href: '/linux#shortcuts' }
        ]
      },
      {
        id: 'linux-resources',
        title: 'Resources',
        href: '/linux',
        icon: '📚',
        children: [
          { id: 'video-tutorials', title: 'Video Tutorials', href: '/linux#video-tutorials' },
          { id: 'summary', title: 'Summary', href: '/linux#summary' }
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
    if (!onThisPage) return; // Skip scroll handling if no onThisPage prop
    
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
    <div className="flex min-h-screen bg-[#1a1a1a]">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-[60] w-80 bg-[#1a1a1a] shadow-2xl lg:shadow-xl border-r border-gray-600
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Sidebar items={navigationItems} onThisPage={onThisPage || []} activeSection={activeSection} setActiveSection={setActiveSection} />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile header */}
        <header className="lg:hidden bg-[#1a1a1a] border-b border-gray-600">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-3 rounded-xl text-white hover:bg-gray-800/50 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-white">
              {technology === 'java' ? 'Java Programming' :
               technology === 'python' ? 'Python Programming' :
               technology === 'sql' ? 'SQL & Databases' :
               technology === 'web-dev' ? 'Web Development' :
               technology === 'data-science' ? 'Data Science' :
               technology === 'code-terminal' ? 'Code Terminal' :
               technology === 'devops' ? 'DevOps' : 'OneHubGlobal'}
            </h1>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto bg-[#1a1a1a] relative z-10">
          <div className="max-w-5xl mx-auto px-8 py-12">
            <article className="prose prose-lg max-w-none text-white">
              {children}
            </article>
          </div>
        </main>
      </div>

    </div>
  );
}
