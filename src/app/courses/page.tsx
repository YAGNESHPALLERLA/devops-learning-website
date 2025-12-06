'use client';

import Link from 'next/link';
import HeroCarousel from '@/components/hero-carousel';

const courses = [
  {
    title: 'Medical Coding',
    description: 'Healthcare IT & Coding Systems',
    icon: '🏥',
    href: '/tutorials/medical-coding',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Programming',
    description: 'Software Development & Technologies',
    icon: '💻',
    href: '/tutorials/programming',
    gradient: 'from-rose-500 to-red-500',
  },
  {
    title: 'Government Jobs',
    description: 'SBI & Bank Exam Preparation',
    icon: '🏛️',
    href: '/tutorials/government-jobs',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    title: 'DevOps',
    description: 'AWS, Azure & GCP - Containerization, CI/CD, Infrastructure Automation',
    icon: '🚀',
    href: '/devops',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'Python Full Stack',
    description: 'Build Modern Web Applications with Django, Flask, React',
    icon: '🐍',
    href: '/tutorials/python-fullstack',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    title: 'Java Full Stack',
    description: 'Enterprise-Grade Development with Spring Boot, React, Microservices',
    icon: '☕',
    href: '/tutorials/java-fullstack',
    gradient: 'from-orange-500 to-red-600',
  },
  {
    title: 'Web Development',
    description: 'Create Stunning Websites with React, Node.js',
    icon: '🌐',
    href: '/web-dev',
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    title: 'SQL & Databases',
    description: 'SQL & NoSQL Mastery - Database Design and Management',
    icon: '🗄️',
    href: '/sql',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    title: 'Data Science',
    description: 'Data Analysis, Machine Learning, and AI',
    icon: '📊',
    href: '/data-science',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    title: 'Linux',
    description: 'Linux Administration and Command Line Mastery',
    icon: '🐧',
    href: '/linux',
    gradient: 'from-yellow-500 to-orange-500',
  },
];

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] overflow-x-hidden">
      {/* Hero Carousel */}
      <section className="w-full">
        <HeroCarousel />
      </section>

      {/* Courses Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-sm text-purple-400 text-sm font-semibold px-6 py-3 rounded-full mb-6 border border-purple-500/20">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            All Courses
          </div>
          <h2 className="text-5xl font-bold text-white mb-4">
            Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-500">Courses</span>
          </h2>
          <p className="text-gray-400 text-xl">Choose your learning path and start your journey today</p>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {courses.map((course, index) => (
            <Link
              key={course.href}
              href={course.href}
              className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-2 border-gray-700 rounded-xl p-8 transition-all duration-500 hover:border-gray-600 hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-2 overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${course.gradient} rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <span className="text-3xl">{course.icon}</span>
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3 text-center group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                  {course.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-400 text-center leading-relaxed">
                  {course.description}
                </p>
                
                {/* Arrow indicator */}
                <div className="mt-6 flex justify-center">
                  <svg 
                    className="w-6 h-6 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-2 transition-all duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

