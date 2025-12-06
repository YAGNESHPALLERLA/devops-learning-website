'use client';

import Link from 'next/link';
import CompactSection from './CompactSection';

export default function CompactWeeklyTests() {
  return (
    <CompactSection
      title="Why are Weekly Tests on OHG365 unique?"
      subtitle="Join our comprehensive weekly test series designed specifically for Government exam preparation"
      backgroundColor="var(--bg-secondary)"
    >
      {/* Weekly Test System Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
        <div className="space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider" style={{ color: '#7A94A5' }}>
            Weekly Assessment System
          </div>
          <h3 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Three-tier ranking system with Bronze, Silver, and Gold levels
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Track your progress through our unique three-tier ranking system and compete with hundreds of aspirants to achieve your target level.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="relative">
            <div 
              className="w-full max-w-xs h-48 rounded-lg shadow-lg p-6 border"
              style={{
                background: 'linear-gradient(135deg, rgba(122, 148, 165, 0.12) 0%, rgba(8, 61, 119, 0.08) 100%)',
                borderColor: 'rgba(8, 61, 119, 0.2)',
              }}
            >
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
                    style={{
                      background: 'linear-gradient(135deg, #083D77 0%, #7A94A5 100%)',
                    }}
                  >
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h4 className="text-base font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Weekly Test Certificate</h4>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Bronze • Silver • Gold</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-3 top-1/2 transform -translate-y-1/2">
              <div 
                className="w-12 h-16 rounded-r-lg flex items-center justify-center shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #083D77 0%, #7A94A5 100%)',
                }}
              >
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#EBEBD3' }}
                >
                  <span className="font-bold text-xs" style={{ color: '#083D77' }}>O</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Test Schedule Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
        <div className="flex justify-center order-2 lg:order-1">
          <div 
            className="w-full max-w-xs h-48 rounded-lg shadow-lg border overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(122, 148, 165, 0.12) 0%, rgba(8, 61, 119, 0.08) 100%)',
              borderColor: 'rgba(8, 61, 119, 0.2)',
            }}
          >
            <div className="w-full h-full flex items-center justify-center p-6">
              <div className="text-center">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #083D77 0%, #7A94A5 100%)',
                  }}
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h4 className="text-base font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Every Sunday</h4>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>10:00 AM - 12:00 PM</p>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4 order-1 lg:order-2">
          <div className="text-xs font-bold uppercase tracking-wider" style={{ color: '#7A94A5' }}>
            Regular Test Schedule
          </div>
          <h3 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Consistent weekly practice with detailed performance analysis
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Participate in our weekly test series conducted every Sunday from 10:00 AM to 12:00 PM. Get detailed performance analysis, compare your scores with peers, and track your progress through our comprehensive dashboard.
          </p>
        </div>
      </div>

      {/* Test Levels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* Bronze Level Card */}
        <div 
          className="rounded-xl p-6 shadow-lg transition-all duration-300 h-full flex flex-col border"
          style={{
            background: 'linear-gradient(135deg, rgba(122, 148, 165, 0.1) 0%, rgba(8, 61, 119, 0.05) 100%)',
            borderColor: 'rgba(8, 61, 119, 0.15)',
          }}
        >
          <div 
            className="w-14 h-14 rounded-full flex items-center justify-center mb-4 shadow-lg flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #7A94A5 0%, #083D77 100%)',
            }}
          >
            <span className="text-2xl">🥉</span>
          </div>
          <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            Bronze Level
          </h3>
          <p className="text-sm mb-4 leading-relaxed min-h-[60px]" style={{ color: 'var(--text-secondary)' }}>
            Perfect for beginners. Score 40-60% to achieve Bronze level and build your foundation with comprehensive study materials.
          </p>
          <ul className="space-y-2 mb-6 flex-1">
            {[
              'Basic concepts and fundamentals',
              'Detailed explanations for each question',
              'Progress tracking and analytics',
              'Beginner-friendly study materials'
            ].map((item, index) => (
              <li key={index} className="flex items-start text-sm" style={{ color: 'var(--text-secondary)' }}>
                <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: '#7A94A5' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/tutorials/government-jobs"
            className="inline-flex items-center justify-center w-full font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 text-sm"
            style={{
              background: 'linear-gradient(135deg, #083D77 0%, #7A94A5 100%)',
              color: '#EBEBD3',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(8, 61, 119, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Start Bronze Level
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </Link>
        </div>

        {/* Silver Level Card */}
        <div 
          className="rounded-xl p-6 shadow-lg transition-all duration-300 h-full flex flex-col border"
          style={{
            background: 'linear-gradient(135deg, rgba(122, 148, 165, 0.1) 0%, rgba(8, 61, 119, 0.05) 100%)',
            borderColor: 'rgba(8, 61, 119, 0.15)',
          }}
        >
          <div 
            className="w-14 h-14 rounded-full flex items-center justify-center mb-4 shadow-lg flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #7A94A5 0%, #083D77 100%)',
            }}
          >
            <span className="text-2xl">🥈</span>
          </div>
          <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            Silver Level
          </h3>
          <p className="text-sm mb-4 leading-relaxed min-h-[60px]" style={{ color: 'var(--text-secondary)' }}>
            Intermediate level. Score 60-80% to achieve Silver level and demonstrate solid understanding of exam patterns.
          </p>
          <ul className="space-y-2 mb-6 flex-1">
            {[
              'Advanced problem-solving techniques',
              'Time management strategies',
              'Comparative performance analysis',
              'Mock test series access'
            ].map((item, index) => (
              <li key={index} className="flex items-start text-sm" style={{ color: 'var(--text-secondary)' }}>
                <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: '#7A94A5' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/tutorials/government-jobs"
            className="inline-flex items-center justify-center w-full font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 text-sm"
            style={{
              background: 'linear-gradient(135deg, #083D77 0%, #7A94A5 100%)',
              color: '#EBEBD3',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(8, 61, 119, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Start Silver Level
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </Link>
        </div>

        {/* Gold Level Card */}
        <div 
          className="rounded-xl p-6 shadow-lg transition-all duration-300 h-full flex flex-col border"
          style={{
            background: 'linear-gradient(135deg, rgba(122, 148, 165, 0.1) 0%, rgba(8, 61, 119, 0.05) 100%)',
            borderColor: 'rgba(8, 61, 119, 0.15)',
          }}
        >
          <div 
            className="w-14 h-14 rounded-full flex items-center justify-center mb-4 shadow-lg flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #083D77 0%, #7A94A5 100%)',
            }}
          >
            <span className="text-2xl">🥇</span>
          </div>
          <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            Gold Level
          </h3>
          <p className="text-sm mb-4 leading-relaxed min-h-[60px]" style={{ color: 'var(--text-secondary)' }}>
            Expert level. Score 80%+ to achieve Gold level and join the elite group of top performers with exclusive benefits.
          </p>
          <ul className="space-y-2 mb-6 flex-1">
            {[
              'Master-level problem solving',
              'Exclusive study materials',
              'Leaderboard recognition',
              'Mentorship from experts'
            ].map((item, index) => (
              <li key={index} className="flex items-start text-sm" style={{ color: 'var(--text-secondary)' }}>
                <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" style={{ color: '#7A94A5' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/tutorials/government-jobs"
            className="inline-flex items-center justify-center w-full font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 text-sm"
            style={{
              background: 'linear-gradient(135deg, #083D77 0%, #7A94A5 100%)',
              color: '#EBEBD3',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(8, 61, 119, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Start Gold Level
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </Link>
        </div>
      </div>
    </CompactSection>
  );
}

