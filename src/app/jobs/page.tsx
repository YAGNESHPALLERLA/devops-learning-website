'use client';

import Link from 'next/link';

export default function JobsPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-500">
              Job Opportunities
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover exciting career opportunities in tech. Apply to top companies and kickstart your dream career.
          </p>
        </div>

        {/* Coming Soon Section */}
        <div className="relative bg-gradient-to-br from-rose-500/10 to-red-600/10 backdrop-blur-sm border-2 border-rose-500/30 rounded-2xl p-12 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-red-600/5"></div>
          
          <div className="relative z-10">
            <div className="inline-block mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-rose-500 to-red-600 rounded-2xl flex items-center justify-center shadow-xl shadow-rose-500/50 animate-pulse">
                <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            <h2 className="text-4xl font-bold text-white mb-4">
              Coming Soon!
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              We're building an amazing job portal to connect talented professionals with top tech companies. 
              Stay tuned for exclusive job opportunities!
            </p>

            {/* Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
              <div className="bg-[#252525] rounded-xl p-6 border border-gray-600">
                <div className="text-4xl mb-3">💼</div>
                <h3 className="text-lg font-bold text-white mb-2">Job Listings</h3>
                <p className="text-gray-400 text-sm">Browse thousands of tech jobs from top companies</p>
              </div>
              
              <div className="bg-[#252525] rounded-xl p-6 border border-gray-600">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-lg font-bold text-white mb-2">Smart Matching</h3>
                <p className="text-gray-400 text-sm">Get matched with jobs that fit your skills</p>
              </div>
              
              <div className="bg-[#252525] rounded-xl p-6 border border-gray-600">
                <div className="text-4xl mb-3">🚀</div>
                <h3 className="text-lg font-bold text-white mb-2">Quick Apply</h3>
                <p className="text-gray-400 text-sm">Apply to multiple jobs with one profile</p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12">
              <Link 
                href="/"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-lg shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/50 transform hover:-translate-y-1 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 text-center bg-[#252525] rounded-xl p-8 border border-gray-600">
          <h3 className="text-2xl font-bold text-white mb-3">
            Get Notified When We Launch
          </h3>
          <p className="text-gray-400 mb-6">
            Be the first to know when our job portal goes live. Join our waiting list!
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-xl mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="w-full md:flex-1 px-6 py-3 bg-[#1a1a1a] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-rose-500 focus:outline-none transition-colors"
            />
            <button className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-rose-500/30 transition-all duration-300">
              Notify Me
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}


