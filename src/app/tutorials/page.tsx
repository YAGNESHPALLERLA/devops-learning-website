'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Define the props interface for TechnologyCard
interface TechnologyCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
  gradient: string;
}

// Technology card component
function TechnologyCard({ title, description, icon, link, gradient }: TechnologyCardProps) {
  return (
    <Link href={link} className="block group">
      <div className="relative bg-[#252525] rounded-xl p-8 transition-all duration-500 border border-gray-600 hover:border-rose-500 hover:shadow-xl hover:shadow-rose-500/20 hover:-translate-y-2 overflow-hidden">
        {/* Animated background gradient */}
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

export default function TutorialsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check authentication immediately on mount
    const token = localStorage.getItem('token');
    if (!token) {
      // Force immediate redirect - use replace to prevent back button
      window.location.replace(`/register?redirect=${encodeURIComponent('/tutorials')}`);
      return;
    }
    setIsAuthenticated(true);
  }, []);

  // Don't render anything until we've checked authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-white">Checking authentication...</div>
      </div>
    );
  }

  // If not authenticated (shouldn't reach here due to redirect, but safety check)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="text-white">Redirecting to registration...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#1a1a1a]">
      {/* Hero Section */}
      <section className="relative text-center py-20 px-4 overflow-hidden bg-gradient-to-b from-[#202020] to-[#1a1a1a]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-rose-500/20 to-red-500/20 rounded-full border border-rose-500/30">
            <span className="text-rose-400 font-semibold">📚 All Tutorials</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-500 to-pink-500">
              Explore All Technologies
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Browse through our comprehensive collection of tutorials across Medical Coding, Programming, and Government Jobs preparation
          </p>
        </div>
      </section>

      {/* Medical Coding Category */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-4xl">🏥</span>
            <h2 className="text-4xl font-bold text-white">
              Medical Coding
            </h2>
          </div>
          <p className="text-gray-400 text-lg">Learn medical coding, healthcare IT, and related technologies</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <TechnologyCard
            title="Medical Coding Basics"
            description="Introduction to ICD-10, CPT, and HCPCS coding systems"
            icon="📋"
            link="/tutorials/medical-coding"
            gradient="from-blue-500 to-cyan-500"
          />
          <TechnologyCard
            title="Healthcare IT"
            description="Electronic Health Records (EHR) and healthcare information systems"
            icon="🏥"
            link="/tutorials/medical-coding"
            gradient="from-green-500 to-teal-500"
          />
          <TechnologyCard
            title="Medical Terminology"
            description="Essential medical terms and anatomy for coders"
            icon="📖"
            link="/tutorials/medical-coding"
            gradient="from-purple-500 to-pink-500"
          />
        </div>
        
        <div className="text-center">
          <Link 
            href="/tutorials/medical-coding"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            View All Medical Coding Tutorials →
          </Link>
        </div>
      </section>

      {/* Programming Category */}
      <section className="container mx-auto px-4 py-16 bg-[#202020]/50">
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-4xl">💻</span>
            <h2 className="text-4xl font-bold text-white">
              Programming
            </h2>
          </div>
          <p className="text-gray-400 text-lg">Master programming languages, frameworks, and development tools</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
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
            gradient="from-pink-500 to-purple-500"
          />
          <TechnologyCard
            title="Code Terminal"
            description="Write, edit, and execute code online for Python, JavaScript, Java, SQL, and Bash"
            icon="💻"
            link="/code-terminal"
            gradient="from-cyan-500 to-blue-500"
          />
          <TechnologyCard
            title="Linux"
            description="Linux system administration, commands, and shell scripting"
            icon="🐧"
            link="/linux"
            gradient="from-gray-500 to-slate-600"
          />
          <TechnologyCard
            title="Terminal"
            description="Interactive terminal environment for practicing commands and shell scripting"
            icon="⚡"
            link="/terminal"
            gradient="from-green-500 to-emerald-500"
          />
        </div>
        
        <div className="text-center">
          <Link 
            href="/tutorials/programming"
            className="inline-block px-8 py-3 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            View All Programming Tutorials →
          </Link>
        </div>
      </section>

      {/* Government Jobs Category */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-4xl">🏛️</span>
            <h2 className="text-4xl font-bold text-white">
              Government Jobs (SBI Jobs)
            </h2>
          </div>
          <p className="text-gray-400 text-lg">Prepare for bank exams, government job tests, and competitive examinations</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <TechnologyCard
            title="SBI Clerk Preparation"
            description="Complete preparation guide for SBI Clerk examinations"
            icon="🏦"
            link="/tutorials/government-jobs"
            gradient="from-indigo-500 to-blue-600"
          />
          <TechnologyCard
            title="Banking Awareness"
            description="Current affairs, banking terms, and financial knowledge"
            icon="💰"
            link="/tutorials/government-jobs"
            gradient="from-green-500 to-emerald-600"
          />
          <TechnologyCard
            title="Quantitative Aptitude"
            description="Mathematics, data interpretation, and problem solving"
            icon="🔢"
            link="/tutorials/government-jobs"
            gradient="from-orange-500 to-red-500"
          />
          <TechnologyCard
            title="Reasoning Ability"
            description="Logical reasoning, puzzles, and analytical thinking"
            icon="🧩"
            link="/tutorials/government-jobs"
            gradient="from-purple-500 to-pink-500"
          />
          <TechnologyCard
            title="English Language"
            description="Grammar, vocabulary, comprehension, and writing skills"
            icon="📝"
            link="/tutorials/government-jobs"
            gradient="from-cyan-500 to-blue-500"
          />
          <TechnologyCard
            title="Mock Tests"
            description="Practice tests for SBI and government job examinations"
            icon="📊"
            link="/tutorials/government-jobs"
            gradient="from-rose-500 to-red-600"
          />
        </div>
        
        <div className="text-center">
          <Link 
            href="/tutorials/government-jobs"
            className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            View All Government Jobs Tutorials →
          </Link>
        </div>
      </section>
    </main>
  );
}
