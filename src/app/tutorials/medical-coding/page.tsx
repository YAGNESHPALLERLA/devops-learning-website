'use client';

import { useEffect } from 'react';

export default function MedicalCodingPage() {
  // Check authentication immediately - before any rendering
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (!token) {
      // Force immediate redirect - don't render anything
      window.location.replace(`/signup?redirect=${encodeURIComponent('/tutorials/medical-coding')}`);
      return null;
    }
  }

  useEffect(() => {
    // Double-check on mount
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.replace(`/signup?redirect=${encodeURIComponent('/tutorials/medical-coding')}`);
    }
  }, []);

  // If no token, show loading (shouldn't reach here but safety check)
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (!token) {
      return (
        <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
          <div className="text-white">Redirecting to registration...</div>
        </div>
      );
    }
  }

  return (
    <main className="min-h-screen bg-[#1a1a1a] py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full border border-blue-500/30">
            <span className="text-blue-400 font-semibold">🏥 Medical Coding</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Medical Coding <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">Tutorials</span>
          </h1>
          <p className="text-gray-400 text-xl">Comprehensive medical coding courses and certifications</p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-[#252525] rounded-xl p-12 border border-gray-600">
          <h2 className="text-3xl font-bold text-white mb-6">Coming Soon!</h2>
          <p className="text-gray-300 text-lg mb-4">
            We're working on bringing you comprehensive medical coding tutorials including:
          </p>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-center space-x-3">
              <span className="text-blue-400">✓</span>
              <span>ICD-10 Coding Systems</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-blue-400">✓</span>
              <span>CPT & HCPCS Coding</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-blue-400">✓</span>
              <span>Medical Terminology</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-blue-400">✓</span>
              <span>Healthcare IT Systems</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-blue-400">✓</span>
              <span>Certification Preparation</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}

