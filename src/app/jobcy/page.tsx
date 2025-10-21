'use client';

import { useEffect } from 'react';

export default function JobcyPortal() {
  useEffect(() => {
    // Redirect to the actual Jobcy application
    window.location.href = 'https://jobcy-job-portal.vercel.app';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-500 mx-auto mb-8"></div>
        <h2 className="text-2xl font-bold text-white mb-4">Loading Jobcy Portal...</h2>
        <p className="text-gray-400">Redirecting to the job portal...</p>
      </div>
    </div>
  );
}
