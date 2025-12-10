'use client';

import Image from 'next/image';
import ScrollAnimate from './ScrollAnimate';

const isoImages = [
  { id: 1, src: '/images/iso1.jpg', alt: 'ISO Certification 1' },
  { id: 3, src: '/images/iso5.jpg', alt: 'ISO Certification 3' },
];

export default function CompactTrusted() {
  return (
    <section 
      className="compact-section"
      style={{ 
        backgroundColor: 'var(--bg-secondary)',
        padding: '1.5rem 0'
      }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollAnimate animation="fade-up" triggerOnce={false}>
          <div className="text-center mb-3">
            <h2 
              className="compact-heading font-bold mb-1"
              style={{ color: 'var(--text-primary)', fontSize: '1rem' }}
            >
              Trusted & Certified Platform
            </h2>
          </div>
        </ScrollAnimate>
        <ScrollAnimate animation="fade-up" triggerOnce={false} stagger={true}>
          <div className="max-w-full mx-auto">
            <div className="flex items-center justify-center gap-2 md:gap-3 flex-nowrap hide-scrollbar" style={{ overflowX: 'auto' }}>
            {isoImages.map((iso) => (
              <div
                key={iso.id}
                className="group relative flex-shrink-0 transition-all duration-300"
                style={{
                  backgroundColor: 'rgba(122, 148, 165, 0.1)',
                  borderRadius: '0.375rem',
                  padding: '0.375rem',
                  border: '1px solid rgba(8, 61, 119, 0.2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(122, 148, 165, 0.2)';
                  e.currentTarget.style.borderColor = 'rgba(8, 61, 119, 0.4)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(122, 148, 165, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(8, 61, 119, 0.2)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <div className="relative w-12 h-12 md:w-16 md:h-16">
                  <Image
                    src={iso.src}
                    alt={iso.alt}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 48px, 64px"
                    unoptimized
                  />
                </div>
              </div>
            ))}
            </div>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
}

