// src/app/page.tsx
'use client';

import Link from 'next/link';
import StatsCounter from '@/components/stats-counter';
import LogoLoop from '@/components/logo-loop';
import HeroCarousel from '@/components/hero-carousel';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToContent = () => {
    const contentSection = document.getElementById('main-content');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] overflow-x-hidden relative">
      {/* Enhanced Global Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Dynamic mouse-following orb */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-rose-500/10 to-purple-500/10 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transform: 'translateZ(0)'
          }}
        ></div>

        {/* Large animated background orbs */}
        <div className="absolute top-0 left-0 w-[1000px] h-[1000px] bg-gradient-to-br from-rose-500/8 to-pink-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/3 w-[900px] h-[900px] bg-gradient-to-br from-purple-500/8 to-violet-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-emerald-500/8 to-teal-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '6s' }}></div>
        
        {/* Enhanced floating particles with more variety */}
        <div className="absolute top-20 left-1/4 w-3 h-3 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full animate-bounce shadow-lg shadow-rose-400/50" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
        <div className="absolute top-40 right-1/3 w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-bounce shadow-lg shadow-blue-400/50" style={{ animationDelay: '2s', animationDuration: '4s' }}></div>
        <div className="absolute top-60 left-1/2 w-4 h-4 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full animate-bounce shadow-lg shadow-purple-400/50" style={{ animationDelay: '3s', animationDuration: '2.5s' }}></div>
        <div className="absolute top-80 right-1/4 w-2.5 h-2.5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-bounce shadow-lg shadow-emerald-400/50" style={{ animationDelay: '4s', animationDuration: '3.5s' }}></div>
        <div className="absolute bottom-40 left-1/5 w-3.5 h-3.5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce shadow-lg shadow-yellow-400/50" style={{ animationDelay: '5s', animationDuration: '2.8s' }}></div>
        <div className="absolute bottom-60 right-1/5 w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-bounce shadow-lg shadow-cyan-400/50" style={{ animationDelay: '6s', animationDuration: '4.2s' }}></div>
        
        {/* Additional floating particles with glow effects */}
        <div className="absolute top-32 left-1/6 w-2 h-2 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full animate-bounce shadow-lg shadow-pink-400/40" style={{ animationDelay: '1.5s', animationDuration: '3.8s' }}></div>
        <div className="absolute top-52 right-1/6 w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-bounce shadow-lg shadow-indigo-400/40" style={{ animationDelay: '2.5s', animationDuration: '4.5s' }}></div>
        <div className="absolute top-72 left-2/3 w-2 h-2 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full animate-bounce shadow-lg shadow-orange-400/40" style={{ animationDelay: '3.5s', animationDuration: '3.2s' }}></div>
        <div className="absolute bottom-32 right-1/3 w-3.5 h-3.5 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full animate-bounce shadow-lg shadow-teal-400/40" style={{ animationDelay: '4.5s', animationDuration: '2.9s' }}></div>
        <div className="absolute bottom-52 left-1/4 w-2.5 h-2.5 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full animate-bounce shadow-lg shadow-violet-400/40" style={{ animationDelay: '5.5s', animationDuration: '4.1s' }}></div>
        
        {/* Enhanced geometric shapes with rotation */}
        <div className="absolute top-24 right-1/5 w-6 h-6 bg-gradient-to-r from-rose-500/30 to-pink-500/30 rotate-45 animate-spin shadow-lg shadow-rose-500/20" style={{ animationDelay: '2s', animationDuration: '8s' }}></div>
        <div className="absolute top-48 left-1/8 w-5 h-5 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full animate-pulse shadow-lg shadow-blue-500/20" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-72 right-1/8 w-7 h-7 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rotate-12 animate-spin shadow-lg shadow-emerald-500/20" style={{ animationDelay: '6s', animationDuration: '6s' }}></div>
        <div className="absolute bottom-24 left-1/6 w-5 h-5 bg-gradient-to-r from-purple-500/30 to-violet-500/30 rounded-full animate-pulse shadow-lg shadow-purple-500/20" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-48 right-1/6 w-6 h-6 bg-gradient-to-r from-yellow-500/30 to-orange-500/30 rotate-45 animate-spin shadow-lg shadow-yellow-500/20" style={{ animationDelay: '5s', animationDuration: '7s' }}></div>
        
        {/* Enhanced floating orbs with glow */}
        <div className="absolute top-16 left-1/3 w-8 h-8 bg-gradient-to-br from-rose-400/30 to-pink-400/30 rounded-full animate-float shadow-2xl shadow-rose-400/20"></div>
        <div className="absolute top-56 right-1/4 w-6 h-6 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full animate-float shadow-2xl shadow-blue-400/20" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-16 left-1/4 w-7 h-7 bg-gradient-to-br from-emerald-400/30 to-teal-400/30 rounded-full animate-float shadow-2xl shadow-emerald-400/20" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-56 right-1/3 w-5 h-5 bg-gradient-to-br from-purple-400/30 to-violet-400/30 rounded-full animate-float shadow-2xl shadow-purple-400/20" style={{ animationDelay: '6s' }}></div>
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div
                key={i}
                className="border border-white/10 animate-pulse"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '3s'
                }}
              ></div>
            ))}
          </div>
        </div>
        
        </div>
      {/* Hero Carousel Section - Top of Page */}
      <section className="w-full">
        <HeroCarousel />
      </section>

      {/* Enhanced Hero Text Section */}
      <section className="relative text-center py-32 px-4 z-10 min-h-screen flex items-center justify-center">
        <div className="container mx-auto relative z-10">
          {/* Animated welcome badge */}
          <div className={`inline-flex items-center bg-gradient-to-r from-rose-500/20 to-red-500/20 backdrop-blur-sm text-rose-400 text-sm font-semibold px-8 py-4 rounded-full mb-12 border border-rose-500/30 shadow-2xl shadow-rose-500/20 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <svg className="w-6 h-6 mr-3 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            ✨ Welcome to OneHubGlobal
          </div>
          
          {/* Enhanced main heading with more animations */}
          <h1 className={`text-7xl md:text-9xl font-extrabold mb-8 transform transition-all duration-1500 ${isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'}`}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-500 to-pink-500 animate-gradient">
              Learn.
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient" style={{ animationDelay: '0.5s' }}>
              Code.
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 animate-gradient" style={{ animationDelay: '1s' }}>
              Master.
            </span>
          </h1>
          
          {/* Enhanced subtitle with staggered animation */}
          <p className={`text-3xl md:text-4xl text-gray-300 mb-8 font-semibold transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            Master the technologies that power{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-500 animate-gradient">
              modern software development
            </span>
          </p>
          
          {/* Enhanced description */}
          <p className={`text-xl text-gray-400 mb-16 max-w-4xl mx-auto leading-relaxed transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ animationDelay: '0.6s' }}>
            Choose your learning path and dive deep into comprehensive tutorials, hands-on projects, 
            interactive code terminals, and real-world applications. Start your journey today!
          </p>

          {/* Enhanced Know More Button */}
          <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ animationDelay: '0.9s' }}>
            <button
              onClick={scrollToContent}
              className="group relative inline-flex items-center justify-center px-12 py-6 text-xl font-bold text-white bg-gradient-to-r from-rose-500 via-red-600 to-pink-600 rounded-2xl shadow-2xl shadow-rose-500/30 hover:shadow-rose-500/50 transform hover:scale-110 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              {/* Button background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-rose-600 via-red-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Button content */}
              <span className="relative z-10 flex items-center">
                <span className="mr-3">Know More</span>
                <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
              
              {/* Animated border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rose-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
            </button>
          </div>

          {/* Floating action indicators */}
          <div className={`mt-16 flex justify-center space-x-8 transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ animationDelay: '1.2s' }}>
            <div className="flex flex-col items-center group cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <span className="text-sm text-gray-400 group-hover:text-rose-400 transition-colors">Learn</span>
            </div>
            
            <div className="flex flex-col items-center group cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m-4 16l-4-4m4 4l4-4M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z"></path>
                </svg>
              </div>
              <span className="text-sm text-gray-400 group-hover:text-blue-400 transition-colors">Code</span>
            </div>
            
            <div className="flex flex-col items-center group cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                </svg>
              </div>
              <span className="text-sm text-gray-400 group-hover:text-emerald-400 transition-colors">Master</span>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Section - Scroll Target */}
      <div id="main-content">
        {/* Logo Loop Section */}
        <section className="py-16 relative z-10">
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-500/10 to-emerald-500/10 backdrop-blur-sm text-blue-400 text-sm font-semibold px-6 py-3 rounded-full mb-6 border border-blue-500/20">
              <svg className="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Continuously Updated
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Technologies We <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-500 animate-gradient">Teach</span>
            </h2>
            <p className="text-gray-400">Master the tools and technologies that power modern software development</p>
          </div>
          <div className="relative">
            <LogoLoop speed={160} logoHeight={50} className="max-w-7xl mx-auto" />
            {/* Glowing effect around logo loop */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-rose-500/5 to-transparent rounded-lg"></div>
          </div>
        </div>
      </section>

      {/* Enhanced Statistics Counter */}
      <section className="py-20 relative z-10">
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-rose-500/10 to-blue-500/10 backdrop-blur-sm text-rose-400 text-sm font-semibold px-6 py-3 rounded-full mb-6 border border-rose-500/20">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              Trusted by Thousands
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-blue-500">Growing Community</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Be part of a thriving community of learners, developers, and professionals who are advancing their careers with our comprehensive programs.
            </p>
          </div>
      <StatsCounter />
        </div>
      </section>

      {/* Quick Access Section */}
      <section id="courses" className="container mx-auto px-4 py-20 relative z-10">
        
        <div className="text-center mb-12 relative z-10">
          <div className="inline-flex items-center bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-sm text-purple-400 text-sm font-semibold px-6 py-3 rounded-full mb-6 border border-purple-500/20">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            Accelerate Your Career
          </div>
          <h2 className="text-5xl font-bold text-white mb-4">
            Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-500 animate-gradient">Learning Journey</span>
          </h2>
          <p className="text-gray-400 text-xl mb-8">Explore our comprehensive tutorials across multiple domains</p>
          
          <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
            <Link 
              href="/tutorials/medical-coding"
              className="group relative bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-2 border-blue-500/50 rounded-xl p-8 transition-all duration-500 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-2 min-w-[280px] animate-fade-in-up hover-lift hover-glow overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:animate-scale">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Medical Coding</h3>
                <p className="text-gray-400">Healthcare IT & Coding Systems</p>
              </div>
            </Link>
            
            <Link 
              href="/tutorials/programming"
              className="group relative bg-gradient-to-br from-rose-500/20 to-red-500/20 border-2 border-rose-500/50 rounded-xl p-8 transition-all duration-500 hover:border-rose-400 hover:shadow-xl hover:shadow-rose-500/30 hover:-translate-y-2 min-w-[280px] animate-fade-in-up hover-lift hover-glow overflow-hidden"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-red-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-red-600 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:animate-scale">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Programming</h3>
                <p className="text-gray-400">Software Development & Technologies</p>
              </div>
            </Link>
            
            <Link 
              href="/tutorials/government-jobs"
              className="group relative bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-2 border-indigo-500/50 rounded-xl p-8 transition-all duration-500 hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-2 min-w-[280px] animate-fade-in-up hover-lift hover-glow overflow-hidden"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:animate-scale">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Government Jobs</h3>
                <p className="text-gray-400">SBI & Bank Exam Preparation</p>
              </div>
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

      {/* Jobs & Careers Section - NEW */}
      <section className="py-20 relative z-10 bg-gradient-to-br from-rose-900/20 via-red-900/20 to-pink-900/20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-rose-500/20 to-red-500/20 backdrop-blur-sm text-rose-400 text-sm font-semibold px-6 py-3 rounded-full mb-6 border border-rose-500/30">
              <svg className="w-5 h-5 mr-2 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0h2a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h2"></path>
              </svg>
              🚀 Jobs & Career Opportunities
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Launch Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-500">Career Journey</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Browse thousands of job opportunities, internships, and career openings. Connect with top companies and take the next step in your professional journey.
            </p>
          </div>

          {/* Job Portal Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gradient-to-br from-rose-500/10 to-red-600/10 backdrop-blur-sm border border-rose-500/20 rounded-2xl p-8 hover:border-rose-500/40 transition-all duration-500">
              <div className="text-6xl mb-6">💼</div>
              <h3 className="text-2xl font-bold text-white mb-4">Job Listings</h3>
              <p className="text-gray-300 mb-4">
                Browse through curated job listings from top companies across various industries and skill levels.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center">
                  <span className="text-rose-400 mr-2">✓</span>
                  Fresher & Experienced positions
                </li>
                <li className="flex items-center">
                  <span className="text-rose-400 mr-2">✓</span>
                  Multiple industries & domains
                </li>
                <li className="flex items-center">
                  <span className="text-rose-400 mr-2">✓</span>
                  Regular job updates
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-indigo-600/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 hover:border-blue-500/40 transition-all duration-500">
              <div className="text-6xl mb-6">📝</div>
              <h3 className="text-2xl font-bold text-white mb-4">Easy Applications</h3>
              <p className="text-gray-300 mb-4">
                Apply to jobs with just a few clicks. Upload your resume and track all your applications in one place.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">✓</span>
                  One-click applications
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">✓</span>
                  Application tracking
                </li>
                <li className="flex items-center">
                  <span className="text-blue-400 mr-2">✓</span>
                  Status notifications
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-emerald-500/10 to-teal-600/10 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-8 hover:border-emerald-500/40 transition-all duration-500">
              <div className="text-6xl mb-6">🤝</div>
              <h3 className="text-2xl font-bold text-white mb-4">Connect & Network</h3>
              <p className="text-gray-300 mb-4">
                Build your professional network, connect with recruiters, and get real-time updates on opportunities.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center">
                  <span className="text-emerald-400 mr-2">✓</span>
                  Connect with professionals
                </li>
                <li className="flex items-center">
                  <span className="text-emerald-400 mr-2">✓</span>
                  Real-time chat
                </li>
                <li className="flex items-center">
                  <span className="text-emerald-400 mr-2">✓</span>
                  Interview scheduling
                </li>
              </ul>
            </div>
          </div>

          {/* Main CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-rose-500/20 to-red-500/20 backdrop-blur-sm border border-rose-500/30 rounded-2xl p-12 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Find Your Dream Job?
              </h3>
              <p className="text-gray-300 mb-8 text-lg">
                Join thousands of job seekers who have successfully launched their careers through our platform.
              </p>
              <Link
                href="/jobcy"
                className="group inline-flex items-center justify-center px-12 py-6 text-xl font-bold text-white bg-gradient-to-r from-rose-500 via-red-600 to-pink-600 rounded-2xl shadow-2xl shadow-rose-500/30 hover:shadow-rose-500/50 transform hover:scale-110 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                {/* Button background animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-rose-600 via-red-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Button content */}
                <span className="relative z-10 flex items-center">
                  <span className="mr-3">Apply Now - Browse Jobs</span>
                  <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </span>
                
                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rose-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              </Link>
              
              <p className="text-sm text-gray-400 mt-6">
                🔒 Secure Platform • 📊 Track Applications • 💬 Real-time Chat • 🎯 Career Guidance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bank Coaching Section */}
      <section className="py-20 relative z-10 bg-gradient-to-br from-blue-900/20 via-indigo-900/20 to-purple-900/20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-sm text-blue-400 text-sm font-semibold px-6 py-3 rounded-full mb-6 border border-blue-500/30">
              <svg className="w-5 h-5 mr-2 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
              🏦 Bank Coaching Excellence
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Banking Careers</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Comprehensive bank coaching for SBI, IBPS, RBI, and other banking exams. 
              Expert guidance, mock tests, and personalized study plans to help you succeed.
            </p>
          </div>

          {/* Bank Coaching Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* SBI Coaching */}
            <div className="group bg-gradient-to-br from-blue-500/10 to-indigo-600/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 hover:border-blue-500/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🏛️</div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                SBI Coaching
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Complete preparation for SBI PO, Clerk, and Specialist Officer exams with expert faculty and comprehensive study material.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Mock Tests & Analysis
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Interview Preparation
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Current Affairs Updates
                </li>
              </ul>
            </div>

            {/* IBPS Coaching */}
            <div className="group bg-gradient-to-br from-emerald-500/10 to-teal-600/10 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-8 hover:border-emerald-500/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">💼</div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                IBPS Coaching
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Specialized coaching for IBPS PO, Clerk, RRB, and Specialist Officer positions across all public sector banks.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Section-wise Preparation
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Previous Year Papers
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Doubt Clearing Sessions
                </li>
              </ul>
            </div>

            {/* RBI Coaching */}
            <div className="group bg-gradient-to-br from-purple-500/10 to-violet-600/10 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 hover:border-purple-500/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🏦</div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                RBI Coaching
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Elite coaching for RBI Grade B, Assistant, and other RBI examinations with focus on economic and financial concepts.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Economic Concepts
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Financial Awareness
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Phase-wise Preparation
                </li>
              </ul>
            </div>
          </div>


          {/* Bank Coaching CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Start Your Banking Career?
              </h3>
              <p className="text-gray-300 mb-8 text-lg">
                Join thousands of successful banking professionals who started their journey with OneHubGlobal Bank Coaching.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/jobcy"
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/30"
                >
                  Start Bank Coaching
                </Link>
                <Link
                  href="/jobcy"
                  className="px-8 py-4 border border-blue-500/30 text-blue-400 font-bold rounded-xl hover:bg-blue-500/10 transition-all duration-300"
                >
                  Get Free Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="relative py-20 border-t border-gray-700 z-10">
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center bg-gradient-to-r from-rose-500/10 to-blue-500/10 backdrop-blur-sm text-rose-400 text-sm font-semibold px-6 py-3 rounded-full mb-6 border border-rose-500/20">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Why Choose Us
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-500">OneHubGlobal</span>?
          </h2>
          <p className="text-gray-400 text-lg mb-16 max-w-3xl mx-auto">The best platform to accelerate your tech career with industry-leading features and comprehensive learning paths</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group text-center p-8 rounded-xl bg-[#252525] border border-gray-600 hover:border-rose-500 transition-all duration-500 hover:shadow-xl hover:shadow-rose-500/20 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:animate-scale">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Video Tutorials
              </h3>
              <p className="text-gray-400 leading-relaxed">
                150+ high-quality video tutorials with hands-on examples from industry experts. Learn at your own pace with comprehensive coverage of all topics.
              </p>
            </div>
            
            <div className="group text-center p-8 rounded-xl bg-[#252525] border border-gray-600 hover:border-rose-500 transition-all duration-500 hover:shadow-xl hover:shadow-rose-500/20 hover:-translate-y-2" style={{ transitionDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:animate-scale">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Interactive Learning
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Practice with built-in code terminals, interactive exercises, and real-world projects. Get hands-on experience with cutting-edge technologies.
              </p>
            </div>
            
            <div className="group text-center p-8 rounded-xl bg-[#252525] border border-gray-600 hover:border-rose-500 transition-all duration-500 hover:shadow-xl hover:shadow-rose-500/20 hover:-translate-y-2" style={{ transitionDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:animate-scale">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Industry Ready
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Learn in-demand skills with curriculum designed by professionals for real-world success. Get job-ready with industry-standard practices.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Weekly Government Exam Tests Section - Coursera Style */}
      <section className="py-20 relative z-10">
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why are Weekly Tests on <span className="text-amber-400">OneHubGlobal</span> unique?
            </h2>
          </div>

          {/* Weekly Test System Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <div className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                Weekly Assessment System
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                Three-tier ranking system with Bronze, Silver, and Gold levels
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Join our comprehensive weekly test series designed specifically for Government exam preparation. Track your progress through our unique three-tier ranking system and compete with thousands of aspirants to achieve your target level.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-60 bg-gradient-to-br from-amber-50 to-yellow-100 rounded-lg shadow-lg p-8 border border-amber-200">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Weekly Test Certificate</h4>
                      <p className="text-sm text-gray-600">Bronze • Silver • Gold</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
                  <div className="w-16 h-20 bg-gradient-to-b from-amber-600 to-amber-700 rounded-r-lg flex items-center justify-center shadow-lg">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <span className="text-amber-600 font-bold text-sm">O</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Test Schedule Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="flex justify-center order-2 lg:order-1">
              <div className="w-80 h-60 bg-gradient-to-br from-yellow-50 to-amber-100 rounded-lg shadow-lg border border-yellow-200 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Every Sunday</h4>
                    <p className="text-sm text-gray-600">10:00 AM - 12:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <div className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                Regular Test Schedule
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                Consistent weekly practice with detailed performance analysis
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Participate in our weekly test series conducted every Sunday from 10:00 AM to 12:00 PM. Get detailed performance analysis, compare your scores with peers, and track your progress through our comprehensive dashboard. Build consistency and improve your exam readiness.
              </p>
            </div>
          </div>

          {/* Test Levels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Bronze Level Card */}
            <div className="bg-[#252525] border border-gray-600 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                🥉 Bronze Level
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Perfect for beginners. Score 40-60% to achieve Bronze level and build your foundation with comprehensive study materials.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-gray-300">
                  <svg className="w-5 h-5 text-amber-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Basic concepts and fundamentals</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <svg className="w-5 h-5 text-amber-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Detailed explanations for each question</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <svg className="w-5 h-5 text-amber-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Progress tracking and analytics</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <svg className="w-5 h-5 text-amber-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Beginner-friendly study materials</span>
                </li>
              </ul>
              <Link 
                href="/tutorials/government-jobs"
                className="inline-flex items-center justify-center w-full bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors duration-200"
              >
                Start Bronze Level
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </Link>
            </div>

            {/* Silver Level Card */}
            <div className="bg-[#252525] border border-gray-600 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                🥈 Silver Level
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Intermediate level. Score 60-80% to achieve Silver level and demonstrate solid understanding of exam patterns.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-gray-300">
                  <svg className="w-5 h-5 text-gray-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Advanced problem-solving techniques</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <svg className="w-5 h-5 text-gray-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Time management strategies</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <svg className="w-5 h-5 text-gray-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Comparative performance analysis</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <svg className="w-5 h-5 text-gray-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Mock test series access</span>
                </li>
              </ul>
              <Link 
                href="/tutorials/government-jobs"
                className="inline-flex items-center justify-center w-full bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                Start Silver Level
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </Link>
            </div>

            {/* Gold Level Card */}
            <div className="bg-[#252525] border border-gray-600 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                🥇 Gold Level
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Expert level. Score 80%+ to achieve Gold level and join the elite group of top performers with exclusive benefits.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-gray-300">
                  <svg className="w-5 h-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Master-level problem solving</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <svg className="w-5 h-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Exclusive study materials</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <svg className="w-5 h-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Leaderboard recognition</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <svg className="w-5 h-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Mentorship from experts</span>
                </li>
              </ul>
              <Link 
                href="/tutorials/government-jobs"
                className="inline-flex items-center justify-center w-full bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors duration-200"
              >
                Start Gold Level
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Internships Section - Coursera Style */}
      <section className="py-20 relative z-10">
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-500/10 backdrop-blur-sm text-blue-400 text-sm font-semibold px-6 py-3 rounded-full mb-6 border border-blue-500/20">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Industry Leading Programs
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why are Professional Certificates on <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">OneHubGlobal</span> unique?
            </h2>
          </div>

          {/* Affordable Programs Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <div className="text-sm font-bold text-blue-400 uppercase tracking-wider">
                Affordable Programs
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                Accessible learning from top companies and universities
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Get job-ready with affordable, career-aligned training programs taught by expert instructors from top companies and universities. Start pursuing your career dreams today with programs starting at $49 USD per month and a 7 day free trial.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-60 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg shadow-lg p-8 border border-blue-200">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                        </svg>
                      </div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Professional Certificate</h4>
                      <p className="text-sm text-gray-600">Industry Recognized</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
                  <div className="w-16 h-20 bg-gradient-to-b from-blue-600 to-blue-700 rounded-r-lg flex items-center justify-center shadow-lg">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">O</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Flexible Online Learning Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="flex justify-center order-2 lg:order-1">
              <div className="w-80 h-60 bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg shadow-lg border border-green-200 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Learn Anywhere</h4>
                    <p className="text-sm text-gray-600">Mobile & Desktop Ready</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <div className="text-sm font-bold text-blue-400 uppercase tracking-wider">
                Flexible Online Learning
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                Learn at your own pace, whenever and wherever it's most convenient for you
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Get started right away and learn on your own schedule with flexible online courses. Build your network and share advice in the <span className="text-blue-400 cursor-pointer hover:underline">Professional Certificate Community</span> as you work through the program.
              </p>
            </div>
          </div>

          {/* Career Opportunities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Professional Certifications Card */}
            <div className="bg-[#252525] border border-gray-600 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Professional Certifications
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Earn industry-recognized certifications that validate your skills and boost your career prospects. Our certification programs are designed by experts and accepted worldwide.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-gray-300">
                  <svg className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Industry-standard certification programs</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <svg className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Recognized by top employers globally</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <svg className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Lifetime access to certification resources</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <svg className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Digital badges and verifiable certificates</span>
                </li>
              </ul>
              <Link 
                href="/jobcy"
                className="inline-flex items-center justify-center w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Explore Certifications
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </Link>
            </div>

            {/* Internship Opportunities Card */}
            <div className="bg-[#252525] border border-gray-600 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h8m-8 4h8m-8 4h4"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Internship Opportunities
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Gain real-world experience through our internship programs. Work on live projects, collaborate with professionals, and build your portfolio while learning.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-gray-300">
                  <svg className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Work on real-world industry projects</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <svg className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Mentorship from experienced professionals</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <svg className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Build a strong professional portfolio</span>
                </li>
                <li className="flex items-start text-gray-300">
                  <svg className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Potential for full-time job placement</span>
                </li>
              </ul>
              <Link 
                href="/jobcy"
                className="inline-flex items-center justify-center w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Apply for Internships
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories - Our Placed Students */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-green-500/10 backdrop-blur-sm text-green-400 text-sm font-semibold px-6 py-3 rounded-full mb-6 border border-green-500/20">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Success Stories
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Placed Students</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Meet our successful graduates who have secured their dream jobs at top companies worldwide. Their journey from learning to earning is your inspiration.
            </p>
          </div>

          {/* Success Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Student 1 */}
            <div className="bg-[#252525] border border-gray-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">RK</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Rajesh Kumar</h3>
                <p className="text-blue-400 font-semibold mb-1">DevOps Engineer</p>
                <p className="text-gray-400 text-sm">Amazon Web Services</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                <p className="text-gray-300 text-sm italic leading-relaxed">
                  "OneHubGlobal's DevOps course gave me the practical skills I needed. The hands-on projects and real-world scenarios helped me land my dream job at AWS. The instructors are amazing!"
                </p>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-400 font-semibold">Package: ₹12 LPA</span>
                <span className="text-gray-400">2024 Batch</span>
              </div>
            </div>

            {/* Student 2 */}
            <div className="bg-[#252525] border border-gray-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">PS</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Priya Sharma</h3>
                <p className="text-emerald-400 font-semibold mb-1">Cloud Solutions Architect</p>
                <p className="text-gray-400 text-sm">Microsoft Azure</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                <p className="text-gray-300 text-sm italic leading-relaxed">
                  "The comprehensive cloud training at OneHubGlobal was exactly what I needed. From basics to advanced concepts, everything was covered perfectly. Now I'm working with Microsoft Azure!"
                </p>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-400 font-semibold">Package: ₹15 LPA</span>
                <span className="text-gray-400">2024 Batch</span>
              </div>
            </div>

            {/* Student 3 */}
            <div className="bg-[#252525] border border-gray-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">AM</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Amit Mishra</h3>
                <p className="text-orange-400 font-semibold mb-1">Kubernetes Specialist</p>
                <p className="text-gray-400 text-sm">Google Cloud Platform</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                <p className="text-gray-300 text-sm italic leading-relaxed">
                  "The Kubernetes training was exceptional! The practical labs and real-world projects prepared me for interviews. I'm now working as a Kubernetes Specialist at Google Cloud."
                </p>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-400 font-semibold">Package: ₹18 LPA</span>
                <span className="text-gray-400">2024 Batch</span>
              </div>
            </div>

            {/* Student 4 */}
            <div className="bg-[#252525] border border-gray-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">SK</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Sneha Kapoor</h3>
                <p className="text-purple-400 font-semibold mb-1">DevSecOps Engineer</p>
                <p className="text-gray-400 text-sm">IBM Cloud</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                <p className="text-gray-300 text-sm italic leading-relaxed">
                  "OneHubGlobal's focus on security in DevOps was a game-changer. The DevSecOps modules helped me understand the importance of security in CI/CD pipelines. Now I'm at IBM!"
                </p>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-400 font-semibold">Package: ₹14 LPA</span>
                <span className="text-gray-400">2024 Batch</span>
              </div>
            </div>

            {/* Student 5 */}
            <div className="bg-[#252525] border border-gray-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">VP</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Vikram Patel</h3>
                <p className="text-cyan-400 font-semibold mb-1">Site Reliability Engineer</p>
                <p className="text-gray-400 text-sm">Netflix</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                <p className="text-gray-300 text-sm italic leading-relaxed">
                  "The SRE training at OneHubGlobal was outstanding! The monitoring and observability modules were particularly helpful. I'm now ensuring Netflix's platform reliability!"
                </p>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-400 font-semibold">Package: ₹20 LPA</span>
                <span className="text-gray-400">2024 Batch</span>
              </div>
            </div>

            {/* Student 6 */}
            <div className="bg-[#252525] border border-gray-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">NG</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Neha Gupta</h3>
                <p className="text-yellow-400 font-semibold mb-1">Platform Engineer</p>
                <p className="text-gray-400 text-sm">Spotify</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                <p className="text-gray-300 text-sm italic leading-relaxed">
                  "The platform engineering course was comprehensive and practical. The hands-on experience with modern tools helped me secure a position at Spotify. Highly recommended!"
                </p>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-400 font-semibold">Package: ₹16 LPA</span>
                <span className="text-gray-400">2024 Batch</span>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Start Your Success Story?
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Join hundreds of students who have transformed their careers with OneHubGlobal. Your success story could be next!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/jobcy/user/auth/signup"
                  className="inline-flex items-center justify-center bg-green-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  Start Your Journey
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </Link>
                <Link 
                  href="/devops"
                  className="inline-flex items-center justify-center bg-gray-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  Explore Courses
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700 py-12 relative z-10">
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
      </div>
    </main>
  );
}