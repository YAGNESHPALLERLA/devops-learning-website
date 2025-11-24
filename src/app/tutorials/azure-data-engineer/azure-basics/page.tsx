'use client';

import TechLayout from '@/components/tech-layout';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import courseSections from '@/data/azure-basics-course.json';

type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

const ImageGallery = ({ images }: { images: GalleryImage[] }) => {
  if (!images.length) return null;

  return (
    <div className="flex flex-col gap-8 mt-8">
      {images.map((image, index) => (
        <figure
          key={`${image.src}-${index}`}
          className="overflow-hidden rounded-2xl border border-gray-600 bg-white shadow-lg shadow-blue-500/10 transition hover:shadow-blue-500/25"
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="lazy"
            sizes="(min-width: 1280px) 100vw, (min-width: 768px) 100vw, 100vw"
            className="h-auto w-full object-contain bg-white"
          />
          {image.caption && (
            <figcaption className="border-t border-gray-300 px-4 py-3 text-sm text-gray-700">
              {image.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
};

type CourseContentItem =
  | { type: 'paragraph'; text: string; heading_level?: number | null }
  | { type: 'heading'; text: string; heading_level?: number | null }
  | { type: 'image'; alt?: string; src: string };

type CourseSection = {
  title: string;
  content: CourseContentItem[];
};

type CourseGroup = {
  id: string;
  title: string;
  sections: CourseSection[];
};

const courseContent = courseSections as CourseGroup[];

const PAGE_HEADINGS = courseContent.map(section => ({
  id: section.id,
  title: section.title
}));

const SUBSECTION_PARENT: Record<string, string> = PAGE_HEADINGS.reduce((acc, heading) => {
  acc[heading.id] = heading.id;
  return acc;
}, {} as Record<string, string>);

const createModuleNavigationItems = (): Array<{ id: string; title: string; href: string; icon?: string; children?: Array<{ id: string; title: string; href: string }> }> => {
  const basePath = '/tutorials/azure-data-engineer/azure-basics';
  
  // Single "Azure Basics" dropdown with all sections as children
  return [
    {
      id: 'azure-basics',
      title: 'Azure Basics',
      href: `${basePath}#azure-basics`,
      icon: '📘',
      children: PAGE_HEADINGS.map(heading => ({
        id: heading.id,
        title: heading.title,
        href: `${basePath}#${heading.id}`
      }))
    }
  ];
};

const SectionContent = ({ content }: { content: CourseSection['content'] }) => {
  const nodes: React.ReactNode[] = [];
  let pendingImages: GalleryImage[] = [];

  const flushImages = () => {
    if (pendingImages.length) {
      nodes.push(
        <ImageGallery key={`gallery-${nodes.length}`} images={pendingImages} />
      );
      pendingImages = [];
    }
  };

  content.forEach((item, index) => {
    if (item.type === 'image') {
      pendingImages.push({
        src: item.src,
        alt: item.alt || 'Azure Basics image',
        width: 1920,
        height: 1080
      });
      return;
    }

    flushImages();

    if (item.type === 'paragraph') {
      nodes.push(
        <p key={`paragraph-${index}`} className="mb-3">
          {item.text}
        </p>
      );
      return;
    }

    if (item.type === 'heading') {
      const level = item.heading_level ?? 2;
      if (level <= 1) {
        nodes.push(
          <div key={`heading-${index}`} className="p-4 bg-gray-800 rounded-lg">
            <h5 className="text-xl font-semibold text-white mb-3">{item.text}</h5>
          </div>
        );
      } else {
        nodes.push(
          <p key={`heading-${index}`} className="mb-3 font-semibold text-gray-200">
            {item.text}
          </p>
        );
      }
      return;
    }
  });

  flushImages();

  return <>{nodes}</>;
};

export default function AzureDataEngineerPage() {
  const [activeSection, setActiveSection] = useState('azure-hierarchy');
  const [activeSubsection, setActiveSubsection] = useState<string | null>(null);
  const pageHeadings = PAGE_HEADINGS;
  const isUserScrollingRef = useRef(false);
  const shouldScrollRef = useRef(false);

  // Custom setActiveSection that handles child items correctly
  const handleSetActiveSection = (sectionId: string) => {
    // Mark that this is a user-initiated navigation (should scroll)
    shouldScrollRef.current = true;
    isUserScrollingRef.current = false;
    
    // Check if this is a direct section (not a subsection)
    if (PAGE_HEADINGS.some(heading => heading.id === sectionId)) {
      setActiveSection(sectionId);
      setActiveSubsection(null);
      // Update URL hash
      window.history.replaceState(null, '', `#${sectionId}`);
    } else {
      // It's a subsection, find its parent
      const parentSection = SUBSECTION_PARENT[sectionId] || 'azure-basics';
      setActiveSection(parentSection);
      setActiveSubsection(sectionId);
      // Update URL hash
      window.history.replaceState(null, '', `#${sectionId}`);
    }
  };

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (!hash || hash === 'azure-basics') {
        setActiveSection('azure-hierarchy');
        setActiveSubsection(null);
        return;
      }

      // Check if hash is a direct section
      if (PAGE_HEADINGS.some(heading => heading.id === hash)) {
        setActiveSection(hash);
        setActiveSubsection(null);
      } else {
        // It's a subsection, find parent
        const parentSection = SUBSECTION_PARENT[hash] || 'azure-basics';
        setActiveSection(parentSection);
        setActiveSubsection(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Scroll to active section after it renders - ONLY if user clicked sidebar
  useEffect(() => {
    if (activeSection && shouldScrollRef.current) {
      // Reset the flag
      shouldScrollRef.current = false;
      isUserScrollingRef.current = true;
      
      // Small delay to ensure DOM is updated
      const scrollTimeout = setTimeout(() => {
        const element = document.getElementById(activeSection);
        if (element) {
          // Use scrollIntoView with scroll-margin-top support
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (activeSubsection) {
          // Try scrolling to subsection if main section not found
          const subElement = document.getElementById(activeSubsection);
          if (subElement) {
            subElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
        
        // Reset user scrolling flag after scroll completes
        setTimeout(() => {
          isUserScrollingRef.current = false;
        }, 500);
      }, 200);
      
      return () => clearTimeout(scrollTimeout);
    }
  }, [activeSection, activeSubsection]);

  const getCurrentSectionIndex = () => {
    return PAGE_HEADINGS.findIndex(heading => heading.id === activeSection);
  };

  const goToNextSection = () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex < PAGE_HEADINGS.length - 1) {
      const nextSection = PAGE_HEADINGS[currentIndex + 1];
      handleSetActiveSection(nextSection.id);
    }
  };

  const goToPreviousSection = () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex > 0) {
      const prevSection = PAGE_HEADINGS[currentIndex - 1];
      handleSetActiveSection(prevSection.id);
    }
  };

  const currentIndex = getCurrentSectionIndex();
  const hasNext = currentIndex < PAGE_HEADINGS.length - 1;
  const hasPrevious = currentIndex > 0;

  return (
    <TechLayout
      technology="azure-data-engineer"
      onThisPage={pageHeadings}
      activeSection={activeSection}
      setActiveSection={handleSetActiveSection}
      activeSubsection={activeSubsection}
      setActiveSubsection={setActiveSubsection}
      customNavigationItems={createModuleNavigationItems()}
    >
      <div className="min-h-screen relative">
        <div className="text-center mb-16 relative z-10">
          <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full border border-blue-500/30">
            <span className="text-blue-400 font-semibold flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.482 18.394l6.625-3.844v7.688l-6.625-3.844zm7.875-10.463L12.606 2.65l-.096.056v7.694l8.849 5.138V7.93zm-9.481 5.138l-8.85-5.138L11.48 2.65l.096.056v10.462zm-.962 1.287L2.643 8.738v7.693l6.691 3.845v-7.688z" fill="#0078D4"/>
              </svg>
              <span>Azure Data Engineer</span>
            </span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Azure Basics <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">Module</span>
          </h1>
          <p className="text-gray-400 text-xl">Learn the fundamentals of Azure cloud infrastructure and services</p>
        </div>

        <section
          id="azure-basics"
          className="bg-[#252525] rounded-xl p-8 border border-gray-600 scroll-mt-24 mb-20"
        >
          <h3 className="text-3xl font-bold text-white mb-6">Azure Basics</h3>
          
          <div className="space-y-12 relative z-10">
            {courseContent.map(group => (
              <div
                key={group.id}
                id={group.id}
                className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24 relative z-10"
              >
                <h4 className="text-2xl font-semibold text-white mb-4">{group.title}</h4>
                <div className="space-y-6 text-gray-300">
                  {group.sections.map((section, sectionIndex) => (
                    <div key={`${group.id}-${sectionIndex}`} className="space-y-4">
                      {section.title && section.title.trim().length > 0 && (
                        <div className="p-4 bg-gray-800 rounded-lg">
                          <h5 className="text-xl font-semibold text-white mb-3">{section.title}</h5>
                        </div>
                      )}
                      <SectionContent content={section.content} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-700 relative z-10">
          <button
            onClick={goToPreviousSection}
            disabled={!hasPrevious}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${hasPrevious ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 hover:border-gray-500' : 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Previous</span>
            {hasPrevious && (
              <span className="text-sm text-gray-400">
                {PAGE_HEADINGS[currentIndex - 1]?.title}
              </span>
            )}
          </button>

          <div className="text-sm text-gray-400">
            {currentIndex + 1} of {PAGE_HEADINGS.length}
          </div>

          <button
            onClick={goToNextSection}
            disabled={!hasNext}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${hasNext ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 hover:border-gray-500' : 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed'}`}
          >
            <span>Next</span>
            {hasNext && (
              <span className="text-sm text-gray-400">
                {PAGE_HEADINGS[currentIndex + 1]?.title}
              </span>
            )}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </TechLayout>
  );
}
