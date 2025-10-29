'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface SearchResult {
  title: string;
  path: string;
  description: string;
}

const searchData: SearchResult[] = [
  { title: 'DevOps', path: '/devops', description: 'Containerization, CI/CD, infrastructure automation' },
  { title: 'Docker', path: '/docs/docker', description: 'Container management and Docker fundamentals' },
  { title: 'Kubernetes', path: '/docs/kubernetes', description: 'Container orchestration and scaling' },
  { title: 'Jenkins', path: '/docs/jenkins', description: 'CI/CD pipelines and automation' },
  { title: 'Linux Basics', path: '/docs/linux-basics', description: 'Command line and system administration' },
  { title: 'Cloud Computing', path: '/docs/cloud', description: 'AWS, Azure, and cloud platforms' },
  { title: 'Monitoring', path: '/docs/monitoring', description: 'Prometheus, Grafana, and observability' },
  { title: 'Infrastructure as Code', path: '/docs/iac', description: 'Terraform, Ansible, and automation' },
  { title: 'Scripting Languages', path: '/docs/scripting-languages', description: 'Bash, Python for DevOps' },
  { title: 'Version Control', path: '/docs/version-control', description: 'Git, GitHub, and collaboration' },
  { title: 'DevOps Tools', path: '/docs/tools', description: 'Essential tools and integrations' },
  { title: 'DevOps Concepts', path: '/docs/concepts', description: 'Microservices, SRE, best practices' },
  { title: 'What is DevOps?', path: '/docs/what-is-devops', description: 'Introduction and cultural aspects' },
  { title: 'Java', path: '/java', description: 'Java programming and Spring Framework' },
  { title: 'Python', path: '/python', description: 'Python programming and data science' },
  { title: 'SQL', path: '/sql', description: 'Database design and SQL queries' },
  { title: 'Web Development', path: '/web-dev', description: 'HTML, CSS, JavaScript, React' },
  { title: 'Data Science', path: '/data-science', description: 'Machine learning and data analysis' },
  { title: 'Code Terminal', path: '/code-terminal', description: 'Online code execution environment' },
  { title: 'Terminal', path: '/terminal', description: 'Interactive terminal practice' },
];

export default function JobcySearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const router = useRouter();

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    
    if (searchQuery.trim() === '') {
      setResults([]);
      return;
    }

    const filtered = searchData.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setResults(filtered);
  };

  const handleResultClick = (path: string) => {
    router.push(path);
    setIsOpen(false);
    setQuery('');
    setResults([]);
  };

  // Handle escape key to close search
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setQuery('');
        setResults([]);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground-muted)] hover:border-[var(--primary)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/20"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="hidden md:inline">Search...</span>
        <kbd className="hidden md:inline-block px-2 py-1 text-xs font-semibold bg-[var(--surface-secondary)] rounded">⌘K</kbd>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
          <div className="w-full max-w-2xl bg-[var(--surface)] rounded-xl border border-[var(--border)] shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Search Input */}
            <div className="p-4 border-b border-[var(--border)]">
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search topics, tutorials, documentation..."
                  className="flex-1 bg-transparent text-[var(--foreground)] text-lg outline-none placeholder:text-[var(--foreground-dim)]"
                  autoFocus
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[var(--foreground-dim)] hover:text-[var(--foreground)] transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto">
              {results.length === 0 && query !== '' && (
                <div className="p-8 text-center text-[var(--foreground-dim)]">
                  No results found for &quot;{query}&quot;
                </div>
              )}
              
              {results.length === 0 && query === '' && (
                <div className="p-8 text-center text-[var(--foreground-dim)]">
                  <svg className="w-12 h-12 mx-auto mb-4 text-[var(--foreground-dim)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p className="text-lg mb-2">Start typing to search</p>
                  <p className="text-sm">Search for tutorials, documentation, and more...</p>
                </div>
              )}

              {results.map((result) => (
                <button
                  key={result.path}
                  onClick={() => handleResultClick(result.path)}
                  className="w-full p-4 text-left hover:bg-[var(--surface-secondary)] border-b border-[var(--border)] transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--primary)] flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-[var(--foreground)] font-medium group-hover:text-[var(--primary)] transition-colors">
                        {result.title}
                      </div>
                      <div className="text-sm text-[var(--foreground-dim)] group-hover:text-[var(--foreground-muted)] transition-colors">
                        {result.description}
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-[var(--foreground-dim)] group-hover:text-[var(--primary)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--foreground-dim)]">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <kbd className="px-2 py-1 bg-[var(--surface-secondary)] rounded">↑</kbd>
                  <kbd className="px-2 py-1 bg-[var(--surface-secondary)] rounded">↓</kbd>
                  <span>to navigate</span>
                </div>
                <div className="flex items-center space-x-1">
                  <kbd className="px-2 py-1 bg-[var(--surface-secondary)] rounded">↵</kbd>
                  <span>to select</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <kbd className="px-2 py-1 bg-[var(--surface-secondary)] rounded">esc</kbd>
                <span>to close</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

