'use client';

import { useState } from 'react';
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

export default function SearchBar() {
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

  return (
    <>
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#252525] border border-gray-600 text-white hover:border-rose-500 transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/20"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="hidden md:inline">Search...</span>
        <kbd className="hidden md:inline-block px-2 py-1 text-xs font-semibold bg-gray-700 rounded">⌘K</kbd>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
          <div className="w-full max-w-2xl bg-[#1a1a1a] rounded-xl border border-gray-600 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Search Input */}
            <div className="p-4 border-b border-gray-600">
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search topics, tutorials, documentation..."
                  className="flex-1 bg-transparent text-white text-lg outline-none placeholder-gray-500"
                  autoFocus
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-white transition-colors"
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
                <div className="p-8 text-center text-gray-500">
                  No results found for &quot;{query}&quot;
                </div>
              )}
              
              {results.length === 0 && query === '' && (
                <div className="p-8">
                  <p className="text-gray-500 text-center mb-4">Popular Topics</p>
                  <div className="grid grid-cols-2 gap-3">
                    {searchData.slice(0, 6).map((item) => (
                      <button
                        key={item.path}
                        onClick={() => handleResultClick(item.path)}
                        className="p-3 text-left rounded-lg bg-[#252525] hover:bg-[#2a2a2a] border border-gray-600 hover:border-rose-500 transition-all duration-300"
                      >
                        <div className="text-white font-medium">{item.title}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {results.map((result) => (
                <button
                  key={result.path}
                  onClick={() => handleResultClick(result.path)}
                  className="w-full p-4 text-left hover:bg-[#252525] border-b border-gray-700 transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-rose-500 to-red-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium group-hover:text-rose-400 transition-colors">
                        {result.title}
                      </div>
                      <div className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                        {result.description}
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-600 group-hover:text-rose-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-700 flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <kbd className="px-2 py-1 bg-gray-800 rounded">↑</kbd>
                  <kbd className="px-2 py-1 bg-gray-800 rounded">↓</kbd>
                  <span>to navigate</span>
                </div>
                <div className="flex items-center space-x-1">
                  <kbd className="px-2 py-1 bg-gray-800 rounded">↵</kbd>
                  <span>to select</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <kbd className="px-2 py-1 bg-gray-800 rounded">esc</kbd>
                <span>to close</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

