'use client';

import CompactSection from './CompactSection';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    id: '1',
    title: 'Video Tutorials',
    description: '150+ high-quality video tutorials with hands-on examples from industry experts. Learn at your own pace.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: '2',
    title: 'Interactive Learning',
    description: 'Practice with built-in code terminals, interactive exercises, and real-world projects. Get hands-on experience.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: '3',
    title: 'Industry Ready',
    description: 'Learn in-demand skills with curriculum designed by professionals for real-world success. Get job-ready.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: '4',
    title: 'Career Support',
    description: 'Get comprehensive placement support, resume reviews, and interview preparation to launch your career.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function CompactFeatures() {
  return (
    <CompactSection
      title="Why Choose OHG365"
      subtitle="Industry-leading features and comprehensive learning paths to accelerate your tech career"
      backgroundColor="var(--bg-primary)"
      stagger={true}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className="group relative rounded-xl p-6 card-hover-effect hover-glow-soft cursor-pointer overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(122, 148, 165, 0.1) 0%, rgba(8, 61, 119, 0.05) 100%)',
              border: '2px solid rgba(8, 61, 119, 0.15)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(122, 148, 165, 0.2) 0%, rgba(8, 61, 119, 0.1) 100%)';
              e.currentTarget.style.borderColor = 'rgba(8, 61, 119, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(122, 148, 165, 0.1) 0%, rgba(8, 61, 119, 0.05) 100%)';
              e.currentTarget.style.borderColor = 'rgba(8, 61, 119, 0.15)';
            }}
          >
            {/* Decorative gradient overlay on hover */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, rgba(8, 61, 119, 0.1) 0%, transparent 70%)',
              }}
            />
            
            <div className="flex flex-col items-center text-center relative z-10">
              {/* Icon with gradient background */}
              <div 
                className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #083D77 0%, #7A94A5 100%)',
                  color: '#EBEBD3',
                  boxShadow: '0 4px 15px rgba(8, 61, 119, 0.3)',
                }}
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(235, 235, 211, 0.2) 0%, transparent 100%)',
                  }}
                />
                <div className="relative z-10 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
              </div>

              {/* Title */}
              <h3 
                className="font-bold mb-3 text-base transition-colors duration-300"
                style={{ 
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  fontWeight: 700,
                }}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p 
                className="text-sm leading-relaxed transition-colors duration-300"
                style={{ 
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                }}
              >
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </CompactSection>
  );
}

