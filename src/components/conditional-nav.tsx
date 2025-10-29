"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import SearchBar from "@/components/search-bar";
import Navigation from "@/components/navigation";
import JobcyNavigation from "@/components/jobcy-navigation";
import JobcySearchBar from "@/components/jobcy-search-bar";

export function ConditionalNav() {
  const pathname = usePathname();
  const isJobcyPage = pathname?.startsWith("/jobcy");
  // Only show search bar on job browse/apply pages
  const isJobPage = pathname?.includes("/jobs") || pathname?.includes("/apply");

  // On Jobcy pages, match the background color and show navigation
  if (isJobcyPage) {
    return (
      <nav className="bg-[var(--background)] border-b border-[var(--border)]/30 sticky top-0 z-40 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-all duration-300 group">
              <div className="flex items-center justify-center w-10 h-10 bg-[var(--primary)] rounded-lg shadow-lg shadow-[var(--primary)]/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  {/* DevOps Infinity Symbol */}
                  <path d="M18.178 8.178a4 4 0 0 0-5.656 0L12 8.7l-.522-.522a4 4 0 1 0-5.656 5.656L12 20.014l6.178-6.18a4 4 0 0 0 0-5.656z"/>
                  <path d="M5.822 15.822a4 4 0 0 0 5.656 0L12 15.3l.522.522a4 4 0 1 0 5.656-5.656L12 3.986 5.822 10.166a4 4 0 0 0 0 5.656z"/>
                  <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-[var(--primary)]">OneHubGlobal</span>
                <span className="text-sm font-semibold text-[var(--foreground-dim)]">OHG365</span>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <JobcyNavigation />
              {isJobPage && <JobcySearchBar />}
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Original navigation for main site
  return (
    <nav className="bg-[#1a1a1a] border-b border-gray-600 sticky top-0 z-40 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-3 text-white hover:text-gray-300 transition-all duration-300 group">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-rose-500 to-red-600 rounded-lg shadow-lg shadow-rose-500/30">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                {/* DevOps Infinity Symbol */}
                <path d="M18.178 8.178a4 4 0 0 0-5.656 0L12 8.7l-.522-.522a4 4 0 1 0-5.656 5.656L12 20.014l6.178-6.18a4 4 0 0 0 0-5.656z"/>
                <path d="M5.822 15.822a4 4 0 0 0 5.656 0L12 15.3l.522.522a4 4 0 1 0 5.656-5.656L12 3.986 5.822 10.166a4 4 0 0 0 0 5.656z"/>
                <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent">OneHubGlobal</span>
              <span className="text-sm font-semibold text-gray-400">OHG365</span>
            </div>
          </Link>
          <div className="flex items-center space-x-4">
            <Navigation />
            <SearchBar />
          </div>
        </div>
      </div>
    </nav>
  );
}

