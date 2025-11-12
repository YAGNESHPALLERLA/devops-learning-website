'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface TechnologyCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
  gradient: string;
}

function TechnologyCard({ title, description, icon, link, gradient }: TechnologyCardProps) {
  return (
    <Link href={link} className="block group">
      <div className="relative bg-[#252525] rounded-xl p-8 transition-all duration-500 border border-gray-600 hover:border-rose-500 hover:shadow-xl hover:shadow-rose-500/20 hover:-translate-y-2 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
        <div className="relative z-10 text-center">
          <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-500">
            {icon}
          </div>
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-rose-400 group-hover:to-red-500 transition-all duration-300">
            {title}
          </h3>
          <p className="text-gray-300 group-hover:text-white transition-colors duration-300">
            {description}
          </p>
          <div className={`mt-6 w-full h-1 bg-gradient-to-r ${gradient} rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
        </div>
      </div>
    </Link>
  );
}

// Check auth BEFORE component renders - runs at module level
let hasCheckedAuth = false;
if (typeof window !== 'undefined' && !hasCheckedAuth) {
  hasCheckedAuth = true;
  const currentPath = window.location.pathname || '/tutorials/programming';
  const token = localStorage.getItem('token');
  // Check if token exists and is valid (not empty, null, undefined, or expired)
  if (!token || token.trim() === '' || token === 'null' || token === 'undefined') {
    // IMMEDIATE redirect before React renders
    window.location.replace(`/signup?redirect=${encodeURIComponent(currentPath)}`);
  } else {
    // Validate JWT token format and expiry
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        // Invalid JWT format
        localStorage.removeItem('token');
        window.location.replace(`/signup?redirect=${encodeURIComponent(currentPath)}`);
      } else {
        // Check if token is expired
        const payload = JSON.parse(atob(parts[1]));
        if (payload.exp && payload.exp * 1000 < Date.now()) {
          // Token expired
          localStorage.removeItem('token');
          window.location.replace(`/signup?redirect=${encodeURIComponent(currentPath)}`);
        }
      }
    } catch {
      // Invalid token format
      localStorage.removeItem('token');
      window.location.replace(`/signup?redirect=${encodeURIComponent(currentPath)}`);
    }
  }
}

export default function ProgrammingPage() {
  // ALL HOOKS MUST BE CALLED FIRST - before any conditional returns
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(() => {
    // Double-check in useState initializer
    if (typeof window === 'undefined') return null;
    const token = localStorage.getItem('token');
    if (!token || token.trim() === '' || token === 'null' || token === 'undefined') {
      window.location.replace(`/signup?redirect=${encodeURIComponent('/tutorials/programming')}`);
      return false;
    }
    // Validate token
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        localStorage.removeItem('token');
        window.location.replace(`/signup?redirect=${encodeURIComponent('/tutorials/programming')}`);
        return false;
      }
      const payload = JSON.parse(atob(parts[1]));
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        window.location.replace(`/signup?redirect=${encodeURIComponent('/tutorials/programming')}`);
        return false;
      }
    } catch {
      localStorage.removeItem('token');
      window.location.replace(`/signup?redirect=${encodeURIComponent('/tutorials/programming')}`);
      return false;
    }
    return true;
  });

  useEffect(() => {
    // Triple-check on mount
    const token = localStorage.getItem('token');
    if (!token || token.trim() === '' || token === 'null' || token === 'undefined') {
      window.location.replace(`/signup?redirect=${encodeURIComponent('/tutorials/programming')}`);
      return;
    }
    // Validate token
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        localStorage.removeItem('token');
        window.location.replace(`/signup?redirect=${encodeURIComponent('/tutorials/programming')}`);
        return;
      }
      const payload = JSON.parse(atob(parts[1]));
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        window.location.replace(`/signup?redirect=${encodeURIComponent('/tutorials/programming')}`);
        return;
      }
    } catch {
      localStorage.removeItem('token');
      window.location.replace(`/signup?redirect=${encodeURIComponent('/tutorials/programming')}`);
      return;
    }
    setIsAuthenticated(true);
  }, []);

  // IMMEDIATE check after hooks - runs before rendering
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (!token || token.trim() === '' || token === 'null' || token === 'undefined') {
      window.location.replace(`/signup?redirect=${encodeURIComponent('/tutorials/programming')}`);
      return null; // Return null immediately - prevents any rendering
    }
    
    // Validate token format and expiry
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        localStorage.removeItem('token');
        window.location.replace(`/signup?redirect=${encodeURIComponent('/tutorials/programming')}`);
        return null;
      }
      
      const payload = JSON.parse(atob(parts[1]));
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        window.location.replace(`/signup?redirect=${encodeURIComponent('/tutorials/programming')}`);
        return null;
      }
    } catch {
      localStorage.removeItem('token');
      window.location.replace(`/signup?redirect=${encodeURIComponent('/tutorials/programming')}`);
      return null;
    }
  }

  // Don't render anything if not authenticated
  if (isAuthenticated === null || isAuthenticated === false) {
    return null; // Return null - prevents any rendering
  }

  return (
    <main className="min-h-screen bg-[#1a1a1a] py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-rose-500/20 to-red-500/20 rounded-full border border-rose-500/30">
            <span className="text-rose-400 font-semibold">💻 Programming</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Programming <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-500">Tutorials</span>
          </h1>
          <p className="text-gray-400 text-xl">Master programming languages, frameworks, and development tools</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <TechnologyCard
            title="DevOps"
            description="Learn containerization, CI/CD, infrastructure automation, and cloud platforms"
            icon="🚀"
            link="/devops"
            gradient="from-rose-500 to-red-600"
          />
          <TechnologyCard
            title="Java"
            description="Master Java programming, Spring Framework, and enterprise development"
            icon="☕"
            link="/java"
            gradient="from-orange-500 to-red-500"
          />
          <TechnologyCard
            title="Python"
            description="Learn Python programming, data science, web development, and automation"
            icon="🐍"
            link="/python"
            gradient="from-yellow-500 to-green-500"
          />
          <TechnologyCard
            title="SQL & Databases"
            description="Database design, SQL queries, optimization, and modern database technologies"
            icon="🗄️"
            link="/sql"
            gradient="from-purple-500 to-indigo-500"
          />
          <TechnologyCard
            title="Web Development"
            description="HTML, CSS, JavaScript, React, and full-stack web development"
            icon="🌐"
            link="/web-dev"
            gradient="from-green-500 to-teal-500"
          />
          <TechnologyCard
            title="Data Science"
            description="Data analysis, machine learning, statistics, and visualization"
            icon="📊"
            link="/data-science"
            gradient="from-blue-500 to-cyan-500"
          />
        </div>
      </div>
    </main>
  );
}
