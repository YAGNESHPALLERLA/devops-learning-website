// src/app/page.tsx
'use client';

import Link from 'next/link';
import StatsCounter from '@/components/stats-counter';

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

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a]">
      {/* Enhanced Hero Section with Animated Background */}
      <section className="relative text-center py-24 px-4 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-rose-500/20 to-red-500/20 rounded-full border border-rose-500/30">
            <span className="text-rose-400 font-semibold">✨ Welcome to OneHubGlobal</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-extrabold mb-6 animate-fade-in-up">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-500 to-pink-500 animate-gradient">
              Learn. Code. Master.
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-semibold animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Master the technologies that power modern software development
          </p>
          
          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Choose your learning path and dive deep into comprehensive tutorials, hands-on projects, 
            interactive code terminals, and real-world applications. Start your journey today!
          </p>

          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <button 
              onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-lg shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/50 transform hover:-translate-y-1 transition-all duration-300"
            >
              🚀 Start Learning
            </button>
            <Link 
              href="/terminal" 
              className="px-8 py-4 bg-[#252525] text-white font-bold rounded-lg border-2 border-rose-500 hover:bg-rose-500/10 transform hover:-translate-y-1 transition-all duration-300"
            >
              💻 Try Terminal
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Counter */}
      <StatsCounter />

      {/* Technologies Grid */}
      <section id="courses" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-500">Technology</span>
          </h2>
          <p className="text-gray-400 text-xl">Select a technology to start your learning journey</p>
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
            title="Terminal"
            description="Interactive terminal environment for practicing commands and shell scripting"
            icon="⚡"
            link="/terminal"
            gradient="from-green-500 to-emerald-500"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="relative bg-[#202020] py-20 border-t border-gray-700 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] via-[#202020] to-[#1a1a1a] opacity-50"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-500">OneHubGlobal</span>?
          </h2>
          <p className="text-gray-400 text-lg mb-12">The best platform to accelerate your tech career</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="group text-center p-8 rounded-xl bg-[#252525] border border-gray-600 hover:border-rose-500 transition-all duration-500 hover:shadow-xl hover:shadow-rose-500/20 hover:-translate-y-2">
              <div className="text-6xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">🎥</div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-rose-400 group-hover:to-red-500 transition-all duration-300">
                Video Tutorials
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                150+ high-quality video tutorials with hands-on examples from industry experts
              </p>
            </div>
            
            <div className="group text-center p-8 rounded-xl bg-[#252525] border border-gray-600 hover:border-rose-500 transition-all duration-500 hover:shadow-xl hover:shadow-rose-500/20 hover:-translate-y-2" style={{ transitionDelay: '0.1s' }}>
              <div className="text-6xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">💻</div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-rose-400 group-hover:to-red-500 transition-all duration-300">
                Interactive Learning
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                Practice with built-in code terminals, interactive exercises, and real-world projects
              </p>
            </div>
            
            <div className="group text-center p-8 rounded-xl bg-[#252525] border border-gray-600 hover:border-rose-500 transition-all duration-500 hover:shadow-xl hover:shadow-rose-500/20 hover:-translate-y-2" style={{ transitionDelay: '0.2s' }}>
              <div className="text-6xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">🚀</div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-rose-400 group-hover:to-red-500 transition-all duration-300">
                Industry Ready
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                Learn in-demand skills with curriculum designed by professionals for real-world success
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] border-t border-gray-700 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-500 mb-2">
              OneHubGlobal
            </h3>
            <p className="text-gray-400">Your gateway to mastering modern technology</p>
          </div>
          
          <div className="flex justify-center space-x-8 mb-6">
            <Link href="/docs/what-is-devops" className="text-gray-400 hover:text-rose-400 transition-colors">
              Documentation
            </Link>
            <Link href="/terminal" className="text-gray-400 hover:text-rose-400 transition-colors">
              Terminal
            </Link>
            <Link href="/code-terminal" className="text-gray-400 hover:text-rose-400 transition-colors">
              Code Editor
            </Link>
          </div>
          
          <div className="text-gray-500 text-sm">
            <p>© 2025 OneHubGlobal. Learn. Code. Master.</p>
            <p className="mt-2">Visit us at <a href="https://www.ohg365.com" className="text-rose-400 hover:text-rose-300">www.ohg365.com</a></p>
          </div>
        </div>
      </footer>
    </main>
  );
}