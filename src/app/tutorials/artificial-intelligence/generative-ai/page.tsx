'use client';

import TechLayout from '@/components/tech-layout';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

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
          className="overflow-hidden rounded-2xl border border-gray-600 bg-white shadow-lg shadow-purple-500/10 transition hover:shadow-purple-500/25"
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

// Generative AI images - will be populated with all 21 images
const genAiImages: Record<string, GalleryImage> = {
  // Images will be added here
};

const getImages = (...keys: (keyof typeof genAiImages)[]): GalleryImage[] =>
  keys.map(key => genAiImages[key]).filter(Boolean);

const PAGE_HEADINGS = [
  // Fundamentals Group
  { id: 'introduction-to-generative-ai', title: 'Introduction to Generative AI' },
  { id: 'foundations-of-generative-models', title: 'Foundations of Generative Models' },
  { id: 'core-mathematics-and-concepts', title: 'Core Mathematics and Concepts' },
  // Model Architectures Group
  { id: 'variational-autoencoders-vaes', title: 'Variational Autoencoders (VAEs)' },
  { id: 'generative-adversarial-networks-gans', title: 'Generative Adversarial Networks (GANs)' },
  { id: 'diffusion-models', title: 'Diffusion Models' },
  { id: 'transformer-models-and-large-language-models-llms', title: 'Transformer Models and Large Language Models (LLMs)' },
  { id: 'multimodal-generative-ai', title: 'Multimodal Generative AI' },
  // Practical Techniques Group
  { id: 'prompt-engineering-and-context-management', title: 'Prompt Engineering and Context Management' },
  { id: 'fine-tuning-and-adaptation', title: 'Fine-Tuning and Adaptation' },
  { id: 'retrieval-augmented-generation-rag', title: 'Retrieval-Augmented Generation (RAG)' },
  { id: 'generative-ai-for-code', title: 'Generative AI for Code' },
  // Tools and Evaluation Group
  { id: 'generative-ai-frameworks-and-tools', title: 'Generative AI Frameworks and Tools' },
  { id: 'evaluation-and-metrics-in-generative-ai', title: 'Evaluation and Metrics in Generative AI' },
  // Ethics and Advanced Group
  { id: 'ethics-safety-and-responsible-genai', title: 'Ethics, Safety, and Responsible GenAI' },
  { id: 'advanced-topics-in-generative-ai', title: 'Advanced Topics in Generative AI' },
  // Deployment and Applications Group
  { id: 'mlops-and-deployment-for-genai', title: 'MLOps and Deployment for GenAI' },
  { id: 'real-world-generative-ai-applications', title: 'Real-World Generative AI Applications' },
  { id: 'capstone-projects-and-assessments', title: 'Capstone Projects and Assessments' }
];

const SUBSECTION_PARENT: Record<string, string> = {
  // Fundamentals
  'introduction-to-generative-ai': 'fundamentals',
  'foundations-of-generative-models': 'fundamentals',
  'core-mathematics-and-concepts': 'fundamentals',
  // Model Architectures
  'variational-autoencoders-vaes': 'model-architectures',
  'generative-adversarial-networks-gans': 'model-architectures',
  'diffusion-models': 'model-architectures',
  'transformer-models-and-large-language-models-llms': 'model-architectures',
  'multimodal-generative-ai': 'model-architectures',
  // Practical Techniques
  'prompt-engineering-and-context-management': 'practical-techniques',
  'fine-tuning-and-adaptation': 'practical-techniques',
  'retrieval-augmented-generation-rag': 'practical-techniques',
  'generative-ai-for-code': 'practical-techniques',
  // Tools and Evaluation
  'generative-ai-frameworks-and-tools': 'tools-and-evaluation',
  'evaluation-and-metrics-in-generative-ai': 'tools-and-evaluation',
  // Ethics and Advanced
  'ethics-safety-and-responsible-genai': 'ethics-and-advanced',
  'advanced-topics-in-generative-ai': 'ethics-and-advanced',
  // Deployment and Applications
  'mlops-and-deployment-for-genai': 'deployment-and-applications',
  'real-world-generative-ai-applications': 'deployment-and-applications',
  'capstone-projects-and-assessments': 'deployment-and-applications'
};

const createModuleNavigationItems = (): Array<{ id: string; title: string; href: string; icon?: string; children?: Array<{ id: string; title: string; href: string }> }> => {
  const basePath = '/tutorials/artificial-intelligence/generative-ai';
  
  return [
    {
      id: 'fundamentals',
      title: 'Fundamentals',
      href: `${basePath}#fundamentals`,
      icon: '📚',
      children: [
        { id: 'introduction-to-generative-ai', title: 'Introduction to Generative AI', href: `${basePath}#introduction-to-generative-ai` },
        { id: 'foundations-of-generative-models', title: 'Foundations of Generative Models', href: `${basePath}#foundations-of-generative-models` },
        { id: 'core-mathematics-and-concepts', title: 'Core Mathematics and Concepts', href: `${basePath}#core-mathematics-and-concepts` }
      ]
    },
    {
      id: 'model-architectures',
      title: 'Model Architectures',
      href: `${basePath}#model-architectures`,
      icon: '🏗️',
      children: [
        { id: 'variational-autoencoders-vaes', title: 'Variational Autoencoders (VAEs)', href: `${basePath}#variational-autoencoders-vaes` },
        { id: 'generative-adversarial-networks-gans', title: 'Generative Adversarial Networks (GANs)', href: `${basePath}#generative-adversarial-networks-gans` },
        { id: 'diffusion-models', title: 'Diffusion Models', href: `${basePath}#diffusion-models` },
        { id: 'transformer-models-and-large-language-models-llms', title: 'Transformer Models and LLMs', href: `${basePath}#transformer-models-and-large-language-models-llms` },
        { id: 'multimodal-generative-ai', title: 'Multimodal Generative AI', href: `${basePath}#multimodal-generative-ai` }
      ]
    },
    {
      id: 'practical-techniques',
      title: 'Practical Techniques',
      href: `${basePath}#practical-techniques`,
      icon: '🛠️',
      children: [
        { id: 'prompt-engineering-and-context-management', title: 'Prompt Engineering', href: `${basePath}#prompt-engineering-and-context-management` },
        { id: 'fine-tuning-and-adaptation', title: 'Fine-Tuning and Adaptation', href: `${basePath}#fine-tuning-and-adaptation` },
        { id: 'retrieval-augmented-generation-rag', title: 'Retrieval-Augmented Generation (RAG)', href: `${basePath}#retrieval-augmented-generation-rag` },
        { id: 'generative-ai-for-code', title: 'Generative AI for Code', href: `${basePath}#generative-ai-for-code` }
      ]
    },
    {
      id: 'tools-and-evaluation',
      title: 'Tools and Evaluation',
      href: `${basePath}#tools-and-evaluation`,
      icon: '📊',
      children: [
        { id: 'generative-ai-frameworks-and-tools', title: 'Frameworks and Tools', href: `${basePath}#generative-ai-frameworks-and-tools` },
        { id: 'evaluation-and-metrics-in-generative-ai', title: 'Evaluation and Metrics', href: `${basePath}#evaluation-and-metrics-in-generative-ai` }
      ]
    },
    {
      id: 'ethics-and-advanced',
      title: 'Ethics and Advanced',
      href: `${basePath}#ethics-and-advanced`,
      icon: '🚀',
      children: [
        { id: 'ethics-safety-and-responsible-genai', title: 'Ethics, Safety, and Responsible GenAI', href: `${basePath}#ethics-safety-and-responsible-genai` },
        { id: 'advanced-topics-in-generative-ai', title: 'Advanced Topics', href: `${basePath}#advanced-topics-in-generative-ai` }
      ]
    },
    {
      id: 'deployment-and-applications',
      title: 'Deployment and Applications',
      href: `${basePath}#deployment-and-applications`,
      icon: '⚙️',
      children: [
        { id: 'mlops-and-deployment-for-genai', title: 'MLOps and Deployment', href: `${basePath}#mlops-and-deployment-for-genai` },
        { id: 'real-world-generative-ai-applications', title: 'Real-World Applications', href: `${basePath}#real-world-generative-ai-applications` },
        { id: 'capstone-projects-and-assessments', title: 'Capstone Projects', href: `${basePath}#capstone-projects-and-assessments` }
      ]
    }
  ];
};

export default function GenerativeAIPage() {
  const [activeSection, setActiveSection] = useState('introduction-to-generative-ai');
  const [activeSubsection, setActiveSubsection] = useState<string | null>(null);
  const pageHeadings = PAGE_HEADINGS;
  const isUserScrollingRef = useRef(false);
  const shouldScrollRef = useRef(false);
  const isProgrammaticNavigationRef = useRef(false);

  // Custom setActiveSection that handles child items correctly
  const handleSetActiveSection = (sectionId: string) => {
    shouldScrollRef.current = true;
    isUserScrollingRef.current = false;
    isProgrammaticNavigationRef.current = true;
    
    // Check if this is a direct section (not a subsection)
    if (PAGE_HEADINGS.some(heading => heading.id === sectionId)) {
      setActiveSection(sectionId);
      setActiveSubsection(null);
      window.history.replaceState(null, '', `#${sectionId}`);
      setTimeout(() => {
        isProgrammaticNavigationRef.current = false;
      }, 100);
    } else if (SUBSECTION_PARENT[sectionId]) {
      const parentSection = SUBSECTION_PARENT[sectionId];
      setActiveSection(parentSection);
      setActiveSubsection(sectionId);
      window.history.replaceState(null, '', `#${sectionId}`);
      setTimeout(() => {
        isProgrammaticNavigationRef.current = false;
      }, 100);
    } else {
      console.warn(`Invalid section ID: ${sectionId}, defaulting to introduction-to-generative-ai`);
      setActiveSection('introduction-to-generative-ai');
      setActiveSubsection(null);
      window.history.replaceState(null, '', window.location.pathname);
      setTimeout(() => {
        isProgrammaticNavigationRef.current = false;
      }, 100);
    }
  };

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      if (isProgrammaticNavigationRef.current) {
        return;
      }
      
      const hash = window.location.hash.slice(1);
      const parentGroups = ['fundamentals', 'model-architectures', 'practical-techniques', 'tools-and-evaluation', 'ethics-and-advanced', 'deployment-and-applications'];
      
      if (!hash || parentGroups.includes(hash)) {
        setActiveSection('introduction-to-generative-ai');
        setActiveSubsection(null);
        if (hash && parentGroups.includes(hash)) {
          window.history.replaceState(null, '', window.location.pathname);
        }
        return;
      }

      if (PAGE_HEADINGS.some(heading => heading.id === hash)) {
        setActiveSection(hash);
        setActiveSubsection(null);
        shouldScrollRef.current = true;
      } else if (SUBSECTION_PARENT[hash]) {
        const parentSection = SUBSECTION_PARENT[hash];
        setActiveSection(parentSection);
        setActiveSubsection(hash);
        shouldScrollRef.current = true;
      } else {
        setActiveSection('introduction-to-generative-ai');
        setActiveSubsection(null);
        window.history.replaceState(null, '', window.location.pathname);
      }
    };

    if (!window.location.hash) {
      setActiveSection('introduction-to-generative-ai');
      setActiveSubsection(null);
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    } else {
      handleHashChange();
    }
    
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Scroll to active section after it renders
  useEffect(() => {
    if (activeSection && shouldScrollRef.current) {
      shouldScrollRef.current = false;
      isUserScrollingRef.current = true;
      
      const scrollTimeout = setTimeout(() => {
        const element = document.getElementById(activeSection);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (activeSubsection) {
          const subElement = document.getElementById(activeSubsection);
          if (subElement) {
            subElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
        
        setTimeout(() => {
          isUserScrollingRef.current = false;
        }, 2000);
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
      technology="artificial-intelligence"
      onThisPage={pageHeadings}
      activeSection={activeSection}
      setActiveSection={handleSetActiveSection}
      activeSubsection={activeSubsection}
      setActiveSubsection={setActiveSubsection}
      customNavigationItems={createModuleNavigationItems()}
    >
      <div className="min-h-screen relative">
        <div className="text-center mb-16 relative z-10">
          <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30">
            <span className="text-purple-400 font-semibold flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Artificial Intelligence</span>
            </span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Generative AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Module</span>
          </h1>
          <p className="text-gray-400 text-xl">Master Generative AI models including GANs, VAEs, Diffusion Models, and their applications</p>
        </div>

        <section
          id="generative-ai"
          className="bg-[#252525] rounded-xl p-8 border border-gray-600 scroll-mt-24 mb-20"
        >
          <h3 className="text-3xl font-bold text-white mb-6">Generative AI</h3>
          
          <div className="space-y-12 relative z-10">
            {/* Content sections will be added here */}
            <div id="introduction-to-generative-ai" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24 relative z-10">
              <h4 className="text-2xl font-semibold text-white mb-4">1. Introduction to Generative AI</h4>
              <div className="space-y-6 text-gray-300">
                <p className="mb-3">
                  Content will be populated from the JSON file...
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </TechLayout>
  );
}

