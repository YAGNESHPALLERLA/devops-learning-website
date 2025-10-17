// src/app/page.tsx
'use client';

import Link from 'next/link';
import StatsCounter from '@/components/stats-counter';
import LogoLoop from '@/components/logo-loop';
import HeroCarousel from '@/components/hero-carousel';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] overflow-x-hidden">
      {/* Hero Carousel Section - Top of Page */}
      <section className="w-full">
        <HeroCarousel />
      </section>

      {/* Hero Text Section */}
      <section className="relative text-center py-16 px-4 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
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

      {/* Logo Loop Section */}
      <section className="py-16 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Technologies We <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-500">Teach</span>
            </h2>
            <p className="text-gray-400">Master the tools and technologies that power modern software development</p>
          </div>
          <LogoLoop speed={160} logoHeight={50} className="max-w-7xl mx-auto" />
        </div>
      </section>

      {/* Statistics Counter */}
      <StatsCounter />

      {/* Quick Access Section */}
      <section id="courses" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4">
            Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-500">Learning Journey</span>
          </h2>
          <p className="text-gray-400 text-xl mb-8">Explore our comprehensive tutorials across multiple domains</p>
          
          <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
            <Link 
              href="/tutorials/medical-coding"
              className="group relative bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-2 border-blue-500/50 rounded-xl p-8 transition-all duration-500 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-2 min-w-[280px]"
            >
              <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-500">🏥</div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Medical Coding</h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Healthcare IT & Coding Systems</p>
            </Link>
            
            <Link 
              href="/tutorials/programming"
              className="group relative bg-gradient-to-br from-rose-500/20 to-red-500/20 border-2 border-rose-500/50 rounded-xl p-8 transition-all duration-500 hover:border-rose-400 hover:shadow-xl hover:shadow-rose-500/30 hover:-translate-y-2 min-w-[280px]"
            >
              <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-500">💻</div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-rose-400 transition-colors">Programming</h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Software Development & Technologies</p>
            </Link>
            
            <Link 
              href="/tutorials/government-jobs"
              className="group relative bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-2 border-indigo-500/50 rounded-xl p-8 transition-all duration-500 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-2 min-w-[280px]"
            >
              <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-500">🏛️</div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">Government Jobs</h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">SBI & Bank Exam Preparation</p>
            </Link>
          </div>
          
          <div className="mt-12">
            <Link 
              href="/tutorials"
              className="inline-block px-10 py-4 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold text-lg rounded-lg shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/50 transform hover:-translate-y-1 transition-all duration-300"
            >
              📚 View All Tutorials
            </Link>
          </div>
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
            <span className="text-gray-400 cursor-not-allowed opacity-50">
              Documentation
            </span>
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