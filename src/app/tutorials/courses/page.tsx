'use client';

import Link from 'next/link';
import React from 'react';

interface CourseCardProps {
  title: string;
  description: string;
  icon: React.ReactElement;
  link: string;
  gradient: string;
}

function CourseCard({ title, description, icon, link, gradient }: CourseCardProps) {
  return (
    <Link href={link} className="block group">
      <div className="relative bg-[#252525] rounded-xl p-8 transition-all duration-500 border border-gray-600 hover:border-rose-500 hover:shadow-xl hover:shadow-rose-500/20 hover:-translate-y-2 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
        <div className="relative z-10 text-center">
          <div className="mb-4 transform group-hover:scale-110 transition-transform duration-500 flex justify-center">
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

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-rose-500/20 to-red-500/20 rounded-full border border-rose-500/30">
            <span className="text-rose-400 font-semibold">🎓 Courses</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-500">Courses</span>
          </h1>
          <p className="text-gray-400 text-xl">Comprehensive training programs for career advancement</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <CourseCard
            title="Azure Data Engineer"
            description="Master Azure data engineering, data pipelines, and cloud data solutions"
            icon={
              <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.482 18.394l6.625-3.844v7.688l-6.625-3.844zm7.875-10.463L12.606 2.65l-.096.056v7.694l8.849 5.138V7.93zm-9.481 5.138l-8.85-5.138L11.48 2.65l.096.056v10.462zm-.962 1.287L2.643 8.738v7.693l6.691 3.845v-7.688z" fill="#0078D4"/>
              </svg>
            }
            link="/tutorials/azure-data-engineer"
            gradient="from-blue-500 to-cyan-500"
          />
        </div>
      </div>
    </main>
  );
}

