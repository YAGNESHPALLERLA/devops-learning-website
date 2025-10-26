"use client";

import React from 'react';
import Image from 'next/image';
import { getActiveAlumni } from '@/data/alumni';

export default function AlumniScrollingGallery() {
  const alumni = getActiveAlumni();
  
  // Duplicate the array to create seamless infinite scroll
  const duplicatedAlumni = [...alumni, ...alumni];

  return (
    <div className="relative py-8 overflow-hidden alumni-gallery">
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center bg-gradient-to-r from-rose-500/10 to-red-500/10 backdrop-blur-sm text-rose-400 text-sm font-semibold px-6 py-3 rounded-full mb-6 border border-rose-500/20">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Our Success Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-500">Placed Students</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Real people, real success stories. See how our students have transformed their careers.
          </p>
        </div>

        {/* Scrolling Gallery */}
        <div className="relative">
          {/* Scrolling container */}
          <div className="flex animate-scroll space-x-6 py-4">
            {duplicatedAlumni.map((alumniProfile, index) => (
              <div
                key={`${alumniProfile.id}-${index}`}
                className="flex-shrink-0 group cursor-pointer"
              >
                <div className="relative">
                  {/* Photo container */}
                  <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-rose-400/30 transition-all duration-300 focus:outline-none focus:ring-0">
                    {alumniProfile.profileImage ? (
                      <Image
                        src={alumniProfile.profileImage}
                        alt={alumniProfile.name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center"><span class="text-2xl font-bold text-white">${alumniProfile.initials}</span></div>`;
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">{alumniProfile.initials}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Info overlay on hover */}
                  <div className="absolute inset-0 rounded-full bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-2">
                    <h4 className="text-white font-bold text-sm mb-1">{alumniProfile.name}</h4>
                    <p className="text-rose-400 text-xs font-semibold">{alumniProfile.position}</p>
                    <p className="text-gray-300 text-xs">{alumniProfile.company}</p>
                    <p className="text-yellow-400 text-xs font-bold mt-1">{alumniProfile.package}</p>
                  </div>
                  
                  {/* Success badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="text-center mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-rose-400 mb-2">100+</div>
              <div className="text-gray-300 text-sm">Students Placed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-rose-400 mb-2">₹15L</div>
              <div className="text-gray-300 text-sm">Average Package</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-rose-400 mb-2">95%</div>
              <div className="text-gray-300 text-sm">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
