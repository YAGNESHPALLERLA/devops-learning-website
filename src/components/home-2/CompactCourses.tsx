'use client';

import Link from 'next/link';
import Image from 'next/image';
import CompactSection from './CompactSection';

const courses = [
  {
    id: '1',
    title: 'Medical Coding',
    category: 'Healthcare',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
    href: '/tutorials/medical-coding',
  },
  {
    id: '2',
    title: 'Programming',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
    href: '/tutorials/programming',
  },
  {
    id: '3',
    title: 'Government Jobs',
    category: 'Career',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
    href: '/tutorials/government-jobs',
  },
  {
    id: '4',
    title: 'DevOps & Cloud',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
    href: '/tutorials',
  },
];

export default function CompactCourses() {
  return (
    <CompactSection
      title="Start Your Learning Journey"
      subtitle="Explore comprehensive tutorials across multiple domains"
      backgroundColor="var(--bg-secondary)"
      stagger={true}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {courses.map((course) => (
          <Link
            key={course.id}
            href={course.href}
            className="group relative rounded-xl overflow-hidden card-hover-effect hover-glow-soft"
            style={{
              background: 'linear-gradient(135deg, rgba(122, 148, 165, 0.08) 0%, rgba(8, 61, 119, 0.05) 100%)',
              border: '2px solid rgba(8, 61, 119, 0.15)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            }}
          >
              <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#083D77]/20 via-[#7A94A5]/20 to-[#083D77]/20">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-115"
                sizes="(max-width: 768px) 50vw, 25vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              {/* Category badge */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(8, 61, 119, 0.8) 0%, rgba(122, 148, 165, 0.8) 100%)',
                  color: '#EBEBD3',
                }}
              >
                <span className="text-xs font-bold">{course.category}</span>
              </div>
            </div>
            <div className="p-4 relative bg-gradient-to-b from-transparent to-[rgba(122,148,165,0.05)]">
              <div className="text-xs mb-2 font-bold uppercase tracking-wide transition-colors" style={{ color: 'var(--corp-accent)' }}>
                {course.category}
              </div>
              <h3 
                className="font-bold text-base mb-2 transition-all duration-300 group-hover:text-[#083D77]"
                style={{ color: 'var(--text-primary)' }}
              >
                {course.title}
              </h3>
              <div className="absolute bottom-4 left-4 right-4 h-1 bg-gradient-to-r from-transparent via-[#7A94A5] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            </div>
          </Link>
        ))}
      </div>
    </CompactSection>
  );
}

