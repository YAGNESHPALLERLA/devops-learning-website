"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { getActiveAlumni, AlumniProfile } from '@/data/alumni';

export default function AlumniScrollingGallery() {
  const alumni = getActiveAlumni();
  
  // State for modal only - scroll is handled via refs for performance
  const [selectedAlumni, setSelectedAlumni] = useState<AlumniProfile | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  
  // Use refs for animation values to avoid re-renders
  const scrollPositionRef = useRef(0);
  const targetSpeedRef = useRef(1.5); // Default auto-scroll speed
  const currentSpeedRef = useRef(1.5);
  const isHoveringRef = useRef(false);
  
  // Duplicate the array many times for seamless infinite scroll
  const displayAlumni = [...alumni, ...alumni, ...alumni, ...alumni, ...alumni, ...alumni, ...alumni, ...alumni, ...alumni, ...alumni];

  // Animation loop - runs continuously
  useEffect(() => {
    if (!scrollRef.current) return;
    
    const scrollContainer = scrollRef.current;
    const itemWidth = 156; // 128px image + 24px gap + 4px padding
    const totalItems = alumni.length;
    const resetPoint = itemWidth * totalItems;
    
    const animate = () => {
      // Very responsive lerp - instant response when hovering
      const lerpFactor = isHoveringRef.current ? 0.25 : 0.1;
      currentSpeedRef.current += (targetSpeedRef.current - currentSpeedRef.current) * lerpFactor;
      
      // Update position
      scrollPositionRef.current += currentSpeedRef.current;
      
      // Reset position for infinite loop (seamless)
      if (scrollPositionRef.current >= resetPoint * 3) {
        scrollPositionRef.current -= resetPoint;
      } else if (scrollPositionRef.current < resetPoint) {
        scrollPositionRef.current += resetPoint;
      }
      
      // Apply transform using translate3d for GPU acceleration
      scrollContainer.style.transform = `translate3d(-${scrollPositionRef.current}px, 0, 0)`;
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [alumni.length]);

  // Simple position-based speed control - move cursor left = scroll left, right = scroll right
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !isHoveringRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const containerWidth = rect.width;
    const centerX = containerWidth / 2;
    
    // Calculate normalized position (-1 to 1)
    const normalizedX = (mouseX - centerX) / centerX;
    
    // Direct speed mapping - fast and responsive
    // Left side = negative (scroll left), Right side = positive (scroll right)
    targetSpeedRef.current = normalizedX * 8; // Higher multiplier for faster response
  };

  const handleMouseEnter = () => {
    isHoveringRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    // Return to default auto-scroll speed
    targetSpeedRef.current = 1.5;
  };

  // Handle click on alumni image
  const handleAlumniClick = (alumniProfile: AlumniProfile) => {
    setSelectedAlumni(alumniProfile);
  };

  // Close modal
  const closeModal = () => {
    setSelectedAlumni(null);
  };

  return (
    <div className="relative py-8 alumni-gallery">
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header - contained */}
        <div className="container mx-auto px-4">
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
        </div>

        {/* Full-width Scrolling Gallery - True Edge to Edge */}
        <div 
          ref={containerRef}
          className="relative w-[100vw] left-[50%] right-[50%] ml-[-50vw] mr-[-50vw] overflow-hidden cursor-ew-resize"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Scrolling container - GPU accelerated */}
          <div 
            ref={scrollRef}
            className="flex gap-6 py-4"
            style={{ 
              willChange: 'transform',
              backfaceVisibility: 'hidden',
            }}
          >
            {displayAlumni.map((alumniProfile, index) => (
              <div
                key={`${alumniProfile.id}-${index}`}
                className="flex-shrink-0 group cursor-pointer"
                onClick={() => handleAlumniClick(alumniProfile)}
              >
                <div className="relative">
                  {/* Photo container */}
                  <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-rose-400/30 transition-all duration-300 focus:outline-none focus:ring-0 border-2 border-transparent group-hover:border-rose-400/50">
                    {alumniProfile.profileImage ? (
                      <Image
                        src={alumniProfile.profileImage}
                        alt={alumniProfile.name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
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

        {/* Stats - contained */}
        <div className="container mx-auto px-4">
          <div className="text-center mt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-rose-400 mb-2">1000+</div>
                <div className="text-gray-300 text-sm">Students Placed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-rose-400 mb-2">5lpa-25lpa</div>
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

      {/* Modal */}
      {selectedAlumni && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          
          {/* Modal Content */}
          <div 
            className="relative bg-gradient-to-br from-[#1a1a1a] to-[#252525] rounded-2xl max-w-md w-full p-5 border border-rose-500/30 shadow-2xl shadow-rose-500/20 animate-fade-in-up max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Profile Section */}
            <div className="flex flex-col items-center text-center">
              {/* Profile Image */}
              <div className="w-28 h-28 rounded-full overflow-hidden border-3 border-rose-500/50 shadow-lg shadow-rose-500/30 mb-3">
                {selectedAlumni.profileImage ? (
                  <Image
                    src={selectedAlumni.profileImage}
                    alt={selectedAlumni.name}
                    width={112}
                    height={112}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">{selectedAlumni.initials}</span>
                  </div>
                )}
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold text-white mb-1">{selectedAlumni.name}</h3>
              
              {/* Position */}
              <p className="text-rose-400 font-semibold text-base mb-1">{selectedAlumni.position}</p>
              
              {/* Company */}
              <p className="text-gray-300 text-sm mb-2">{selectedAlumni.company}</p>
              
              {/* Package Badge */}
              <div className="inline-flex items-center bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-400 font-bold px-3 py-1.5 rounded-full border border-yellow-500/30 mb-3 text-sm">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {selectedAlumni.package}
              </div>

              {/* Course & Batch */}
              <div className="flex flex-wrap justify-center gap-2 mb-3">
                <span className="bg-gray-800 text-gray-300 text-xs px-2.5 py-1 rounded-full">
                  {selectedAlumni.course}
                </span>
                <span className="bg-gray-800 text-gray-300 text-xs px-2.5 py-1 rounded-full">
                  {selectedAlumni.batch}
                </span>
              </div>

              {/* Testimonial */}
              <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700">
                <svg className="w-5 h-5 text-rose-400/50 mb-1.5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-gray-300 text-xs italic leading-relaxed">
                  {selectedAlumni.testimonial}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
