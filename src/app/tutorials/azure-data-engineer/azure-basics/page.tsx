'use client';

import TechLayout from '@/components/tech-layout';
import { useState, useEffect } from 'react';
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

const azureImages: Record<string, GalleryImage> = {
  image1: { src: '/tutorials/azure/images/image-01.png', width: 1920, height: 1080, alt: 'Azure Basics image1' },
  image2: { src: '/tutorials/azure/images/image-02.png', width: 1920, height: 1080, alt: 'Azure Basics image2' },
  image3: { src: '/tutorials/azure/images/image-03.png', width: 1920, height: 1080, alt: 'Azure Basics image3' },
  image4: { src: '/tutorials/azure/images/image-04.png', width: 1920, height: 1080, alt: 'Azure Basics image4' },
  image5: { src: '/tutorials/azure/images/image-05.png', width: 1920, height: 1080, alt: 'Azure Basics image5' },
  image6: { src: '/tutorials/azure/images/image-06.png', width: 1920, height: 1080, alt: 'Azure Basics image6' },
  image7: { src: '/tutorials/azure/images/image-07.png', width: 1920, height: 1080, alt: 'Azure Basics image7' },
  image8: { src: '/tutorials/azure/images/image-08.png', width: 1920, height: 1080, alt: 'Azure Basics image8' },
  image9: { src: '/tutorials/azure/images/image-09.png', width: 1920, height: 1080, alt: 'Azure Basics image9' },
  image10: { src: '/tutorials/azure/images/image-10.png', width: 1920, height: 1080, alt: 'Azure Basics image10' },
  image11: { src: '/tutorials/azure/images/image-11.png', width: 1920, height: 1080, alt: 'Azure Basics image11' },
  image12: { src: '/tutorials/azure/images/image-12.png', width: 1920, height: 1080, alt: 'Azure Basics image12' },
  image13: { src: '/tutorials/azure/images/image-13.png', width: 1920, height: 1080, alt: 'Azure Basics image13' },
  image14: { src: '/tutorials/azure/images/image-14.png', width: 1920, height: 1080, alt: 'Azure Basics image14' },
  image15: { src: '/tutorials/azure/images/image-15.png', width: 1920, height: 1080, alt: 'Azure Basics image15' },
  image16: { src: '/tutorials/azure/images/image-16.png', width: 1920, height: 1080, alt: 'Azure Basics image16' },
  image17: { src: '/tutorials/azure/images/image-17.png', width: 1920, height: 1080, alt: 'Azure Basics image17' },
  image18: { src: '/tutorials/azure/images/image-18.png', width: 1920, height: 1080, alt: 'Azure Basics image18' },
  image19: { src: '/tutorials/azure/images/image-19.png', width: 1920, height: 1080, alt: 'Azure Basics image19' },
  image20: { src: '/tutorials/azure/images/image-20.png', width: 1920, height: 1080, alt: 'Azure Basics image20' },
  image21: { src: '/tutorials/azure/images/image-21.png', width: 1920, height: 1080, alt: 'Azure Basics image21' },
  image22: { src: '/tutorials/azure/images/image-22.png', width: 1920, height: 1080, alt: 'Azure Basics image22' },
  image23: { src: '/tutorials/azure/images/image-23.png', width: 1920, height: 1080, alt: 'Azure Basics image23' },
  image24: { src: '/tutorials/azure/images/image-24.png', width: 1920, height: 1080, alt: 'Azure Basics image24' },
  image25: { src: '/tutorials/azure/images/image-25.png', width: 1920, height: 1080, alt: 'Azure Basics image25' },
  image26: { src: '/tutorials/azure/images/image-26.png', width: 1920, height: 1080, alt: 'Azure Basics image26' },
  image27: { src: '/tutorials/azure/images/image-27.png', width: 1920, height: 1080, alt: 'Azure Basics image27' },
  image28: { src: '/tutorials/azure/images/image-28.png', width: 1920, height: 1080, alt: 'Azure Basics image28' },
  image29: { src: '/tutorials/azure/images/image-29.png', width: 1920, height: 1080, alt: 'Azure Basics image29' },
  image30: { src: '/tutorials/azure/images/image-30.png', width: 1920, height: 1080, alt: 'Azure Basics image30' },
  image31: { src: '/tutorials/azure/images/image-31.png', width: 1920, height: 1080, alt: 'Azure Basics image31' },
  image32: { src: '/tutorials/azure/images/image-32.png', width: 1920, height: 1080, alt: 'Azure Basics image32' },
  image33: { src: '/tutorials/azure/images/image-33.png', width: 1920, height: 1080, alt: 'Azure Basics image33' },
  image34: { src: '/tutorials/azure/images/image-34.png', width: 1920, height: 1080, alt: 'Azure Basics image34' },
  image35: { src: '/tutorials/azure/images/image-35.png', width: 1920, height: 1080, alt: 'Azure Basics image35' },
  image36: { src: '/tutorials/azure/images/image-36.png', width: 1920, height: 1080, alt: 'Azure Basics image36' },
  image37: { src: '/tutorials/azure/images/image-37.png', width: 1920, height: 1080, alt: 'Azure Basics image37' },
  image38: { src: '/tutorials/azure/images/image-38.png', width: 1920, height: 1080, alt: 'Azure Basics image38' },
  image39: { src: '/tutorials/azure/images/image-39.png', width: 1920, height: 1080, alt: 'Azure Basics image39' },
  image40: { src: '/tutorials/azure/images/image-40.png', width: 1920, height: 1080, alt: 'Azure Basics image40' },
  image41: { src: '/tutorials/azure/images/image-41.png', width: 1920, height: 1080, alt: 'Azure Basics image41' },
  image42: { src: '/tutorials/azure/images/image-42.png', width: 1920, height: 1080, alt: 'Azure Basics image42' },
  image43: { src: '/tutorials/azure/images/image-43.png', width: 1920, height: 1080, alt: 'Azure Basics image43' },
  image44: { src: '/tutorials/azure/images/image-44.png', width: 1920, height: 1080, alt: 'Azure Basics image44' },
  image45: { src: '/tutorials/azure/images/image-45.png', width: 1920, height: 1080, alt: 'Azure Basics image45' },
  image46: { src: '/tutorials/azure/images/image-46.png', width: 1920, height: 1080, alt: 'Azure Basics image46' },
  image47: { src: '/tutorials/azure/images/image-47.png', width: 1920, height: 1080, alt: 'Azure Basics image47' },
  image48: { src: '/tutorials/azure/images/image-48.png', width: 1920, height: 1080, alt: 'Azure Basics image48' },
  image49: { src: '/tutorials/azure/images/image-49.png', width: 1920, height: 1080, alt: 'Azure Basics image49' },
  image50: { src: '/tutorials/azure/images/image-50.png', width: 1920, height: 1080, alt: 'Azure Basics image50' },
  image51: { src: '/tutorials/azure/images/image-51.png', width: 1920, height: 1080, alt: 'Azure Basics image51' },
  image52: { src: '/tutorials/azure/images/image-52.png', width: 1920, height: 1080, alt: 'Azure Basics image52' },
  image53: { src: '/tutorials/azure/images/image-53.png', width: 1920, height: 1080, alt: 'Azure Basics image53' },
  image54: { src: '/tutorials/azure/images/image-54.png', width: 1920, height: 1080, alt: 'Azure Basics image54' },
  image55: { src: '/tutorials/azure/images/image-55.png', width: 1920, height: 1080, alt: 'Azure Basics image55' },
  image56: { src: '/tutorials/azure/images/image-56.png', width: 1920, height: 1080, alt: 'Azure Basics image56' },
  image57: { src: '/tutorials/azure/images/image-57.png', width: 1920, height: 1080, alt: 'Azure Basics image57' },
  image58: { src: '/tutorials/azure/images/image-58.png', width: 1920, height: 1080, alt: 'Azure Basics image58' },
  image59: { src: '/tutorials/azure/images/image-59.png', width: 1920, height: 1080, alt: 'Azure Basics image59' },
  image60: { src: '/tutorials/azure/images/image-60.png', width: 1920, height: 1080, alt: 'Azure Basics image60' },
  image61: { src: '/tutorials/azure/images/image-61.png', width: 1920, height: 1080, alt: 'Azure Basics image61' },
  image62: { src: '/tutorials/azure/images/image-62.png', width: 1920, height: 1080, alt: 'Azure Basics image62' },
  image63: { src: '/tutorials/azure/images/image-63.png', width: 1920, height: 1080, alt: 'Azure Basics image63' },
  image64: { src: '/tutorials/azure/images/image-64.png', width: 1920, height: 1080, alt: 'Azure Basics image64' },
  image65: { src: '/tutorials/azure/images/image-65.png', width: 1920, height: 1080, alt: 'Azure Basics image65' },
};

const getImages = (...keys: (keyof typeof azureImages)[]): GalleryImage[] =>
  keys.map(key => azureImages[key]).filter(Boolean);

const PAGE_HEADINGS = [
  { id: 'azure-hierarchy', title: 'Azure Hierarchy' },
  { id: 'resource-group', title: 'Resource Group' },
  { id: 'azure-blob-storage', title: 'Azure Blob Storage' },
  { id: 'types-of-blobs', title: 'Types of Blobs' },
  { id: 'azure-data-lake', title: 'Azure Data Lake Storage Gen2' }
];

const SUBSECTION_PARENT: Record<string, string> = {
  'azure-hierarchy': 'azure-basics',
  'resource-group': 'azure-basics',
  'azure-blob-storage': 'azure-basics',
  'types-of-blobs': 'azure-basics',
  'azure-data-lake': 'azure-basics'
};

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

export default function AzureDataEngineerPage() {
  const [activeSection, setActiveSection] = useState('azure-hierarchy');
  const [activeSubsection, setActiveSubsection] = useState<string | null>(null);
  const pageHeadings = PAGE_HEADINGS;

  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      // Get the header height dynamically (sticky header is approximately 80px)
      const headerHeight = 80;
      const spacing = 20;
      const offset = headerHeight + spacing;
      
      // Use offsetTop for more reliable positioning
      const elementTop = element.offsetTop;
      const offsetPosition = elementTop - offset;
      
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
    }
  };

  const handleSetActiveSection = (sectionId: string) => {
    if (sectionId === 'azure-basics') {
      setActiveSection('azure-hierarchy');
      setActiveSubsection(null);
      window.history.replaceState(null, '', `#azure-hierarchy`);
      // Scroll to section
      setTimeout(() => {
        scrollToElement('azure-hierarchy');
      }, 100);
    } else if (PAGE_HEADINGS.some(heading => heading.id === sectionId)) {
      setActiveSection(sectionId);
      setActiveSubsection(null);
      window.history.replaceState(null, '', `#${sectionId}`);
      // Scroll to section
      setTimeout(() => {
        scrollToElement(sectionId);
      }, 100);
    } else {
      const parentSection = SUBSECTION_PARENT[sectionId] || 'azure-basics';
      setActiveSection(sectionId);
      setActiveSubsection(null);
      window.history.replaceState(null, '', `#${sectionId}`);
      // Scroll to section
      setTimeout(() => {
        scrollToElement(sectionId);
      }, 100);
    }
  };

  useEffect(() => {
    const scrollToElement = (elementId: string) => {
      const element = document.getElementById(elementId);
      if (element) {
        // Get the header height dynamically (sticky header is approximately 80px)
        const headerHeight = 80;
        const spacing = 20;
        const offset = headerHeight + spacing;
        
        // Use offsetTop for more reliable positioning
        const elementTop = element.offsetTop;
        const offsetPosition = elementTop - offset;
        
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      }
    };

    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (!hash || hash === 'azure-basics') {
        setActiveSection('azure-hierarchy');
        setActiveSubsection(null);
        setTimeout(() => {
          scrollToElement('azure-hierarchy');
        }, 100);
        return;
      }

      if (PAGE_HEADINGS.some(heading => heading.id === hash)) {
        setActiveSection(hash);
        setActiveSubsection(null);
        setTimeout(() => {
          scrollToElement(hash);
        }, 100);
      } else {
        setActiveSection(hash);
        setActiveSubsection(null);
        setTimeout(() => {
          scrollToElement(hash);
        }, 100);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    const scrollToElement = (elementId: string) => {
      const element = document.getElementById(elementId);
      if (element) {
        // Get the header height dynamically (sticky header is approximately 80px)
        const headerHeight = 80;
        const spacing = 20;
        const offset = headerHeight + spacing;
        
        // Use offsetTop for more reliable positioning
        const elementTop = element.offsetTop;
        const offsetPosition = elementTop - offset;
        
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      }
    };

    if (activeSection) {
      setTimeout(() => {
        if (activeSubsection) {
          scrollToElement(activeSubsection);
        } else {
          scrollToElement(activeSection);
        }
      }, 150);
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
            <div id="azure-hierarchy" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24 relative z-10">
              <h4 className="text-2xl font-semibold text-white mb-4">Azure Hierarchy</h4>
              <div className="space-y-6 text-gray-300">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Azure Data Engineer</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Azure Basics</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">1. Azure hierarchy</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">1. Management Groups (The Top-Level)</h5>
                </div>
                <p className="mb-3"><strong className="text-blue-400">What it is:</strong> This is the highest level of Azure’s structure. It's like a parent folder that helps organize your entire Azure environment.</p>
                <p className="mb-3"><strong className="text-blue-400">Purpose:</strong> It helps you manage and organize multiple subscriptions across your organization. You can group subscriptions based on departments, teams, or projects.</p>
                <p className="mb-3"><strong className="text-blue-400">Example:</strong> Imagine a company with multiple divisions, like Finance, IT, and Marketing. You could have separate management groups for each of these divisions.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">2. Subscriptions (Middle Layer)</h5>
                </div>
                <p className="mb-3"><strong className="text-blue-400">Purpose:</strong> It helps with organizing resources, managing access, and billing. You can have multiple subscriptions for different projects or teams. Each subscription has its own resource limits and billing.</p>
                <p className="mb-3"><strong className="text-blue-400">Example:</strong> If your company has different projects, like a website and an app, you could create separate subscriptions for them. One for the website, one for the app.</p>
                <p className="mb-3"><strong className="text-blue-400">Management Groups:</strong> High-level containers for organizing multiple subscriptions.</p>
                <p className="mb-3"><strong className="text-blue-400">Subscriptions:</strong> They hold resources and manage access to resources.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">1️⃣ Subscription</h5>
                </div>
                <p className="mb-3">This is where you choose which Azure Subscription will own this storage account.</p>
                <p className="mb-3">A subscription is linked to your billing and access control.</p>
                <p className="mb-3"><strong className="text-blue-400">Example:</strong> You might have separate subscriptions for development, testing, or production environments. You selected: Azure subscription 1</p>
                <ImageGallery images={getImages('image1', 'image2', 'image3', 'image4')} />
              </div>
            </div>
            <div id="resource-group" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24 relative z-10">
              <h4 className="text-2xl font-semibold text-white mb-4">Resource Group</h4>
              <div className="space-y-6 text-gray-300">
                <p className="mb-3"><strong className="text-blue-400">What it is:</strong> Underneath management groups, you have subscriptions. A subscription is like a container for Azure resources, where you’ll define limits on resources and billing.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">3. Resource Groups (Sub-Containers)</h5>
                </div>
                <p className="mb-3"><strong className="text-blue-400">What it is:</strong> Inside each subscription, you can have resource groups. These are containers that hold related resources.</p>
                <p className="mb-3"><strong className="text-blue-400">Purpose:</strong> They help organize resources based on their lifecycle and permissions. All the resources in a group are usually related to the same project or service.</p>
                <p className="mb-3"><strong className="text-blue-400">Example:</strong> If you're building a web app, you might have a resource group called "rg-ohg365-dev" where you store everything related to the app, such as databases, storage accounts, and virtual machines.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">4. Resources (The Actual Items)</h5>
                </div>
                <p className="mb-3"><strong className="text-blue-400">What it is:</strong> These are the individual services or products that you create in Azure, like virtual machines (VMs), storage accounts, databases, or networks.</p>
                <p className="mb-3"><strong className="text-blue-400">Purpose:</strong> This is where the actual work happens! Resources are the building blocks of your cloud environment.</p>
                <p className="mb-3"><strong className="text-blue-400">Example:</strong> In your "rg-ohg365-dev" resource group, you could have resources like a VM to run your website, a database to store your data, and a storage account for storing files.</p>
                <p className="mb-3"><strong className="text-blue-400">Resource Groups:</strong> Containers inside subscriptions to organize and manage resources by project or lifecycle.</p>
                <p className="mb-3"><strong className="text-blue-400">Resources:</strong> The actual services you use in Azure.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">2. Resource Group</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">2.1 What is a Resource Group?</h5>
                </div>
                <p className="mb-3">A Resource Group in Azure is like a folder that holds all the resources (services) related to a project or app.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">For example:If you build a website, you might have:</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">A Virtual Machine (VM) for the web server</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">A Storage Account for images</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">A Database for user data</h5>
                </div>
                <p className="mb-3">You can put all of these inside one Resource Group — making it easier to manage, monitor, and delete them together.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">2.2 Create a Resource Group</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Sign in to the Azure Portal</h5>
                </div>
                <p className="mb-3">In the search menu, search for Resource groups.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Click on the resource group and click on the create button</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Overview of resource group:</h5>
                </div>
                <p className="mb-3"><strong className="text-blue-400">Name:</strong> rg-ohg365-dev → This is your Resource Group’s name.Usually, names include clues about the project or environment:</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">rg = Resource Group</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">ohg365 = Project or team name</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">dev = Environment (like dev, test, or prod)</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Buttons:</h5>
                </div>
                <p className="mb-3"><strong className="text-blue-400">➕ Create:</strong> Add new Azure resources (like VMs, storage, databases).</p>
                <p className="mb-3"><strong className="text-blue-400">⚙️ Manage view:</strong> Customize how your resources list looks.</p>
                <p className="mb-3"><strong className="text-blue-400">🗑️ Delete resource group:</strong> Deletes the entire group and all its resources (be careful!).</p>
                <p className="mb-3"><strong className="text-blue-400">🔁 Refresh:</strong> Updates the view if new resources were added.</p>
                <p className="mb-3"><strong className="text-blue-400">📤 Export to CSV:</strong> Export your resource details (helpful for reports).</p>
                <p className="mb-3"><strong className="text-blue-400">📊 Open query:</strong> Create or run custom filters using Azure Resource Graph.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">2️⃣ Resource Group</h5>
                </div>
                <p className="mb-3">Choose or create a Resource Group to organize related Azure resources.</p>
                <p className="mb-3">Resource Groups act like folders — all your related resources (VMs, storage, databases) are stored here for easy management.</p>
                <p className="mb-3"><strong className="text-blue-400">In your case, you selected rg-ohg365-dev, which is perfect for development resources. Tip:</strong> Keeping related resources in the same group helps you track cost, permissions, and manage everything easily.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">3️⃣ Storage Account Name</h5>
                </div>
                <p className="mb-3">This is the unique name for your storage account (like a domain name).</p>
                <p className="mb-3">It must be globally unique, lowercase, and 3–24 characters long.</p>
                <p className="mb-3">This name will form part of the URL to access your data.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">🧩 Example:If your name is blobohg365dev</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">4️⃣ Preferred Storage Type</h5>
                </div>
                <p className="mb-3">Select what kind of storage service you want to enable.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Navigate to Your Resource Group</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">In the left-hand menu, click on Resource groups</h5>
                </div>
                <p className="mb-3"><strong className="text-blue-400">Find and click your resource group — in your case:</strong>👉 rg-ohg365-dev</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Check for the Storage Account</h5>
                </div>
                <p className="mb-3">Inside the Overview tab of your resource group, you’ll see a list of all resources.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Navigate to Your Resource Group</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">In the left-hand menu, click on Resource groups</h5>
                </div>
                <p className="mb-3"><strong className="text-blue-400">Find and click your resource group — in your case:</strong>👉 rg-ohg365-dev</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Check for the Storage Account</h5>
                </div>
                <p className="mb-3">Inside the Overview tab of your resource group, you’ll see a list of all resources.</p>
                <ImageGallery images={getImages('image5', 'image6', 'image7', 'image8', 'image9', 'image10', 'image11', 'image12')} />
              </div>
            </div>
            <div id="azure-blob-storage" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24 relative z-10">
              <h4 className="text-2xl font-semibold text-white mb-4">Azure Blob Storage</h4>
              <div className="space-y-6 text-gray-300">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">3. Azure Blob Storage</h5>
                </div>
                <p className="mb-3"><strong className="text-blue-400">Azure Blob Storage is highly scalable, secure, and cost-efficient, making it suitable for:</strong></p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Storing and serving large files (media, documents, etc.)</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">3.1 Create an Azure Blob Storage:</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Go to Azure Portal</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Blob storage (for files, media, etc.)</h5>
                </div>
                <p className="mb-3">If it appears there, 🎉 congratulations — your Blob Storage account has been successfully created</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">3.2 Types of Azure Storage Services:</h5>
                </div>
                <p className="mb-3">Azure Storage provides four main types of services under one Storage Account.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">1️⃣ Blob Service</h5>
                </div>
                <p className="mb-3">🧱 Used to store unstructured or semi-structured data like files, images, videos, logs, and backups.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">🔹 Description:</h5>
                </div>
                <p className="mb-3">Stores data as Blobs (Binary Large Objects) inside containers.</p>
                <p className="mb-3">Best for storing flat files and large objects that don’t fit in a database.</p>
                <p className="mb-3">Data can be text, binary, documents, media, or backups.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">💾 Example Uses:</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Storing images or videos for websites</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Backups and archives</h5>
                </div>
                <p className="mb-3">Under Data storage, click Containers → This is where your blobs live.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Click ➕ Container to create one:</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Name: images, videos, or backups (any name)</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Public access level:</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Private (default) – Only you can access</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Blob (anonymous read) – Anyone with the link can read blobs</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Container (public) – Everyone can see contents</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Click Create</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Upload & Manage Blobs</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Click your new container (e.g., images)</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Click Upload</h5>
                </div>
                <p className="mb-3">Choose a file from your computer (like a .jpg, .txt, or .mp4)</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Once uploaded, you can:</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">View Properties (size, type, last modified)</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Get the URL to access the file</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Change the access tier</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Storage Account</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">└── Blob Service</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">└── Container (like a folder)</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">└── Blob (the actual file)</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Types of Blob Types:</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Blob Type</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Best For</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Example Use</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">🧱 Block Blob</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Storing text or binary data</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Images, videos, documents, CSVs</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">📜 Append Blob</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Data that is constantly added to (append-only)</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Logs, telemetry, audit data</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">📄 Page Blob</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Random read/write access</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Virtual machine disks (VHD files)</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">🧱 1. Block Blob</h5>
                </div>
                <p className="mb-3">Most common blob type used in Azure.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">💡 What it is:</h5>
                </div>
                <p className="mb-3">Stores text and binary data (files like .txt, .jpg, .mp4, .csv, etc.)</p>
                <p className="mb-3">Data is split into blocks, and each block is identified by a block ID.</p>
                <p className="mb-3">You can upload or update blocks individually and commit them together.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">✅ Use Cases:</h5>
                </div>
                <p className="mb-3">Storing images, videos, PDFs, and backups.</p>
                <p className="mb-3">Data files for analytics (CSV, JSON, Parquet).</p>
                <p className="mb-3">Large files uploaded in chunks.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">📘 Example:</h5>
                </div>
                <p className="mb-3">You upload a 500 MB video file — Azure divides it into smaller blocks and uploads each part separately for speed and reliability.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">📜 2. Append Blob</h5>
                </div>
                <p className="mb-3">Special type of blob for data that grows over time.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">💡 What it is:</h5>
                </div>
                <p className="mb-3">Optimized for append operations — you can only add new data to the end, not modify or delete existing data.</p>
                <p className="mb-3">Each time you add new information, it’s appended to the blob.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">✅ Use Cases:</h5>
                </div>
                <p className="mb-3">Storing log files.</p>
                <p className="mb-3">Application telemetry or diagnostics data.</p>
                <p className="mb-3">Streaming data that’s constantly being added.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">📘 Example:</h5>
                </div>
                <p className="mb-3">You’re logging website visits. Each time a new visitor arrives, their data (timestamp, IP, etc.) is appended to the existing log file.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">📄 3. Page Blob</h5>
                </div>
                <p className="mb-3">Designed for random read/write operations.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">💡 What it is:</h5>
                </div>
                <p className="mb-3">Data is stored in fixed-size 512-byte pages.</p>
                <p className="mb-3">Allows fast read and write access to specific parts of the blob.</p>
                <p className="mb-3">Commonly used for storing Virtual Hard Disk (VHD) files that power Azure Virtual Machines.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">✅ Use Cases:</h5>
                </div>
                <p className="mb-3">Storing Azure VM disks (OS and data disks).</p>
                <p className="mb-3">Large databases that require random access.</p>
                <p className="mb-3">Any workload that reads/writes frequently to specific sections of a file.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">📘 Example:</h5>
                </div>
                <p className="mb-3">When you start an Azure Virtual Machine, its disk (a .vhd file) is stored as a Page Blob, allowing the VM to quickly read or write data anywhere on the disk.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Blob Type</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Structure</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Read/Write Behavior</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Common Use</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Block Blob</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Data stored as blocks</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Upload/replace blocks</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Files, media, documents</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Append Blob</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Sequentially added blocks</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Append-only</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Logs, telemetry, streaming data</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Page Blob</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Fixed 512-byte pages</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Random read/write</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">VM disks, large databases</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Types of Access Tiers:</h5>
                </div>
                <p className="mb-3">Azure lets you store data in different tiers based on how often you need it.This helps save money 💰 by matching storage cost to usage.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Tier</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Cost</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Availability</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Best For</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Hot</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">💰 Highest cost</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">🔥 Always available</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Frequently accessed data (e.g., active apps, websites)</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Cool</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">💸 Cheaper</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">🕓 Slight delay in access</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Infrequently accessed data (e.g., monthly reports)</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Cold</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">💧 Cheaper than Cool</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">⏱️ Slower access</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Rarely accessed data but still retrievable</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Archive</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">🧊 Cheapest</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">💤 Retrieval takes hours</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Long-term backups, compliance storage</h5>
                </div>
                <p className="mb-3"><strong className="text-blue-400">Hierarchical Namespace:</strong> Unlike traditional Blob Storage, ADLS Gen2 supports folders and directories, enabling efficient organization and faster file operations at scale.</p>
                <p className="mb-3"><strong className="text-blue-400">Optimized for Analytics:</strong> Supports Hadoop Distributed File System (HDFS) and integrates seamlessly with analytics frameworks like Azure Databricks, HDInsight, and Azure Synapse Analytics.</p>
                <p className="mb-3"><strong className="text-blue-400">Supports Multiple Data Types:</strong> You can store CSV, JSON, Parquet, Avro, ORC, images, videos, logs, backups, and more.</p>
                <p className="mb-3"><strong className="text-blue-400">Security and Compliance:</strong> Provides enterprise-grade security with Azure Active Directory integration, role-based access control (RBAC), and encryption at rest and in transit.</p>
                <p className="mb-3"><strong className="text-blue-400">Cost-effective and Scalable:</strong> Automatically scales to handle petabytes of data and millions of files with optimized storage tiers and pricing options.</p>
                <p className="mb-3">Under Data storage, click Containers → This is where your blobs live.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Click ➕ Container to create one:</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Name: images, videos, or backups (any name)</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Public access level:</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Private (default) – Only you can access</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Blob (anonymous read) – Anyone with the link can read blobs</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Container (public) – Everyone can see contents</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Click Create</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Upload & Manage Blobs</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Click your new container (e.g., images)</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Click Upload</h5>
                </div>
                <p className="mb-3">Choose a file from your computer (like a .jpg, .txt, or .mp4)</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Once uploaded, you can:</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">View Properties (size, type, last modified)</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Get the URL to access the file</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Change the access tier</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Storage Account</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">└── DataLake Service</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">└── Container (like a folder)</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">└── Blob (the actual file)</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Subfolder:</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Upload file:</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Types of Blob Types:</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Blob Type</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Best For</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Example Use</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">🧱 Block Blob</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Storing text or binary data</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Images, videos, documents, CSVs</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">📜 Append Blob</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Data that is constantly added to (append-only)</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Logs, telemetry, audit data</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">📄 Page Blob</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Random read/write access</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Virtual machine disks (VHD files)</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">🧱 1. Block Blob</h5>
                </div>
                <p className="mb-3">Most common blob type used in Azure.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">💡 What it is:</h5>
                </div>
                <p className="mb-3">Stores text and binary data (files like .txt, .jpg, .mp4, .csv, etc.)</p>
                <p className="mb-3">Data is split into blocks, and each block is identified by a block ID.</p>
                <p className="mb-3">You can upload or update blocks individually and commit them together.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">✅ Use Cases:</h5>
                </div>
                <p className="mb-3">Storing images, videos, PDFs, and backups.</p>
                <p className="mb-3">Data files for analytics (CSV, JSON, Parquet).</p>
                <p className="mb-3">Large files uploaded in chunks.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">📘 Example:</h5>
                </div>
                <p className="mb-3">You upload a 500 MB video file — Azure divides it into smaller blocks and uploads each part separately for speed and reliability.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">📜 2. Append Blob</h5>
                </div>
                <p className="mb-3">Special type of blob for data that grows over time.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">💡 What it is:</h5>
                </div>
                <p className="mb-3">Optimized for append operations — you can only add new data to the end, not modify or delete existing data.</p>
                <p className="mb-3">Each time you add new information, it’s appended to the blob.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">✅ Use Cases:</h5>
                </div>
                <p className="mb-3">Storing log files.</p>
                <p className="mb-3">Application telemetry or diagnostics data.</p>
                <p className="mb-3">Streaming data that’s constantly being added.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">📘 Example:</h5>
                </div>
                <p className="mb-3">You’re logging website visits. Each time a new visitor arrives, their data (timestamp, IP, etc.) is appended to the existing log file.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">📄 3. Page Blob</h5>
                </div>
                <p className="mb-3">Designed for random read/write operations.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">💡 What it is:</h5>
                </div>
                <p className="mb-3">Data is stored in fixed-size 512-byte pages.</p>
                <p className="mb-3">Allows fast read and write access to specific parts of the blob.</p>
                <p className="mb-3">Commonly used for storing Virtual Hard Disk (VHD) files that power Azure Virtual Machines.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">✅ Use Cases:</h5>
                </div>
                <p className="mb-3">Storing Azure VM disks (OS and data disks).</p>
                <p className="mb-3">Large databases that require random access.</p>
                <p className="mb-3">Any workload that reads/writes frequently to specific sections of a file.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">📘 Example:</h5>
                </div>
                <p className="mb-3">When you start an Azure Virtual Machine, its disk (a .vhd file) is stored as a Page Blob, allowing the VM to quickly read or write data anywhere on the disk.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Blob Type</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Structure</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Read/Write Behavior</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Common Use</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Block Blob</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Data stored as blocks</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Upload/replace blocks</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Files, media, documents</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Append Blob</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Sequentially added blocks</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Append-only</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Logs, telemetry, streaming data</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Page Blob</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Fixed 512-byte pages</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Random read/write</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">VM disks, large databases</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Types of Access Tiers:</h5>
                </div>
                <p className="mb-3">Azure lets you store data in different tiers based on how often you need it.This helps save money 💰 by matching storage cost to usage.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Tier</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Cost</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Availability</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Best For</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Hot</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">💰 Highest cost</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">🔥 Always available</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Frequently accessed data (e.g., active apps, websites)</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Cool</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">💸 Cheaper</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">🕓 Slight delay in access</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Infrequently accessed data (e.g., monthly reports)</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Cold</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">💧 Cheaper than Cool</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">⏱️ Slower access</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Rarely accessed data but still retrievable</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Archive</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">🧊 Cheapest</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">💤 Retrieval takes hours</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Long-term backups, compliance storage</h5>
                </div>
                <ImageGallery images={getImages('image13', 'image14', 'image15', 'image16', 'image17', 'image18', 'image19', 'image20', 'image21', 'image22', 'image23', 'image24', 'image25', 'image26', 'image27', 'image28', 'image29', 'image30', 'image31', 'image32', 'image33', 'image34', 'image35', 'image36', 'image37', 'image38', 'image39', 'image40', 'image41', 'image42', 'image43', 'image44', 'image45', 'image46', 'image47', 'image48', 'image49', 'image50')} />
              </div>
            </div>
            <div id="types-of-blobs" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24 relative z-10">
              <h4 className="text-2xl font-semibold text-white mb-4">Types of Blobs</h4>
              <div className="space-y-6 text-gray-300">
                <p className="mb-3">Azure Blob Storage is Microsoft’s cloud-based service designed to store large amounts of data of various types — including structured, semi-structured, and unstructured data.</p>
                <p className="mb-3">It is ideal for storing files such as CSV, text, Excel, JSON, Parquet, Avro, XML, images, videos, backups, and logs.</p>
                <p className="mb-3">The term “Blob” stands for Binary Large Object, meaning it can store any type of binary data. Blob Storage provides a flat namespace, meaning all files (blobs) are stored in containers within a storage account, rather than in a traditional hierarchical folder system.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">In the search bar, type “Storage Accounts” or “blob”</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Click on storage accounts and click on create button</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Click “Review + Create”</h5>
                </div>
                <p className="mb-3"><strong className="text-blue-400">Look for an item that looks like this:</strong>Type: Storage accountName: blobohg365dev (or whatever name you used)</p>
                <ImageGallery images={getImages('image51', 'image52', 'image53')} />
              </div>
            </div>
            <div id="azure-data-lake" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24 relative z-10">
              <h4 className="text-2xl font-semibold text-white mb-4">Azure Data Lake Storage Gen2</h4>
              <div className="space-y-6 text-gray-300">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Data lakes and analytics workloads</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Backup and disaster recovery</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Archiving and compliance storage</h5>
                </div>
                <p className="mb-3"><strong className="text-blue-400">The default (and most common) option is:</strong>Azure Blob Storage or Azure Data Lake Storage Gen2</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">🧠 This means your account will support:</h5>
                </div>
                <p className="mb-3">Data Lake capabilities (for analytics and big data processing)</p>
                <p className="mb-3"><strong className="text-blue-400">Tip:</strong> Keep this as default unless you have a specific need for file shares or queue services.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">5️⃣ Performance & Redundancy Settings</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">⚙️ Performance:</h5>
                </div>
                <p className="mb-3"><strong className="text-blue-400">Standard:</strong> Uses HDD-based storage — cheaper, good for general use.</p>
                <p className="mb-3"><strong className="text-blue-400">Premium:</strong> Uses SSD-based storage — faster, ideal for workloads needing low latency (like databases or VMs).</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">You selected: Standard (recommended)</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">🧭 Redundancy:</h5>
                </div>
                <p className="mb-3">Defines how Azure will replicate your data to keep it safe.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Option</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Meaning</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Copies of Data</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">LRS (Locally-redundant storage)</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Keeps 3 copies in one data center</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">3</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">ZRS (Zone-redundant storage)</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Copies across 3 availability zones in the same region</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">3</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">GRS (Geo-redundant storage)</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Copies data to another region (for disaster recovery)</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">6</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">RA-GRS (Read-access Geo-redundant)</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Same as GRS but allows read access to secondary region</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">6</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">You selected: LRS (best for development/testing)</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Click on create</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Data lake for analytics</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Hosting static websites</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">📦 Example File Types:</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">.txt, .csv, .json, .xml, .jpg, .mp4, .zip, .bak</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">2️⃣ File Service</h5>
                </div>
                <p className="mb-3">📁 Used for shared file storage that behaves like a traditional file server.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">🔹 Description:</h5>
                </div>
                <p className="mb-3">Provides Azure Files, a fully managed file share in the cloud.</p>
                <p className="mb-3">Uses the SMB (Server Message Block) or NFS (Network File System) protocols — the same used by on-premises file servers.</p>
                <p className="mb-3">Can be mounted to Windows, Linux, or macOS systems.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">💾 Example Uses:</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Shared network drives for teams</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">“Lift and shift” of on-premises file servers</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Application configurations shared across multiple VMs</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">📦 Example Scenario:</h5>
                </div>
                <p className="mb-3">You have multiple virtual machines needing access to the same configuration files — you can store those files in Azure Files and mount them just like a shared folder.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">3️⃣ Queue Service</h5>
                </div>
                <p className="mb-3">📬 Used for reliable messaging between application components.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">🔹 Description:</h5>
                </div>
                <p className="mb-3">Provides asynchronous communication between services using message queues.</p>
                <p className="mb-3">Stores messages in a queue, which can be processed later by background services or workers.</p>
                <p className="mb-3">Ensures messages are delivered at least once and processed in FIFO (First-In, First-Out) order.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">💾 Example Uses:</h5>
                </div>
                <p className="mb-3">Sending background jobs (like image processing or email sending)</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Decoupling app components for scalability</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Event-driven architecture</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">📦 Example Scenario:</h5>
                </div>
                <p className="mb-3">A web app uploads an image → sends a message to a queue → a background process picks it up and resizes the image.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">4️⃣ Table Service</h5>
                </div>
                <p className="mb-3">🧮 Used to store large amounts of structured, non-relational data.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">🔹 Description:</h5>
                </div>
                <p className="mb-3">Provides NoSQL key-value storage.</p>
                <p className="mb-3">Stores data in tables with entities (rows) and properties (columns).</p>
                <p className="mb-3">Flexible schema — you can add or remove columns anytime.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">💾 Example Uses:</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Storing user profiles, IoT data, or metadata</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Fast lookups by key</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Lightweight applications needing scalable, cheap storage</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">📦 Example Scenario:</h5>
                </div>
                <p className="mb-3">You have millions of IoT sensors sending temperature data — you can store this efficiently in Azure Table Storage.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">🧠 Summary Table</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Storage Service</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Type of Data</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Description</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Example Use Case</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Blob Service</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Unstructured / Semi-structured</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Stores large objects (files, media, backups)</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Images, videos, logs</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">File Service</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">File-based</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Shared file storage via SMB/NFS</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Shared drives, app configs</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Queue Service</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Messaging</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Message-based communication between components</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Background tasks, event processing</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Table Service</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Structured (NoSQL)</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Key-value, schema-less table storage</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">User profiles, IoT data</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Explore Blob Service</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Once your storage account is created:</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Go to your Storage Account</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">4. Azure Data Lake Storage Gen2 (ADLS Gen2)</h5>
                </div>
                <p className="mb-3">Azure Data Lake Storage Gen2 is a highly scalable and secure cloud storage service optimized for big data analytics and data lakes. It builds on Azure Blob Storage capabilities but adds file system semantics, hierarchical namespaces, and enhanced performance for analytics workloads.</p>
                <p className="mb-3">ADLS Gen2 is designed to store massive volumes of structured, semi-structured, and unstructured data, making it ideal for big data and machine learning scenarios.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Key Features and Use Cases:</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Common Uses of ADLS Gen2:</h5>
                </div>
                <p className="mb-3">Building data lakes for big data analytics and machine learning.</p>
                <p className="mb-3">Storing large datasets for ETL (Extract, Transform, Load) processes.</p>
                <p className="mb-3">Integrating with analytics tools to perform complex queries and transformations.</p>
                <p className="mb-3">Secure and compliant storage for sensitive data and audit logs.</p>
                <p className="mb-3">Archiving and long-term data retention with tiered storage options.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">4.1 Create an Azure Data Lake Storage</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Go to Azure Portal</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">In the search bar, type “Storage Accounts” or “ADLS Gen2”</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Click on storage accounts and click on create button</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Fill required details</h5>
                </div>
                <p className="mb-3"><strong className="text-blue-400">Look for an item that looks like this:</strong>Type: Storage accountName: adlsohg365dev (or whatever name you used)</p>
                <p className="mb-3">If it appears there, 🎉 congratulations — your ADLS Gen2 Storage account has been successfully created</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">3.2 Types of Azure Storage Services:</h5>
                </div>
                <p className="mb-3">Azure Storage provides four main types of services under one Storage Account.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">1️⃣ Data Lake Storage</h5>
                </div>
                <p className="mb-3"><strong className="text-blue-400">🧱 Purpose:</strong> Designed to store large volumes of unstructured or semi-structured data such as files, images, videos, logs, and backups.🔹 Key Features:</p>
                <p className="mb-3">Data is stored as Blobs (Binary Large Objects) within containers.</p>
                <p className="mb-3">Ideal for storing large, raw data that doesn’t fit into traditional databases.</p>
                <p className="mb-3"><strong className="text-blue-400">Supports various formats:</strong> text, binary, documents, media, and backups.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">💾 Common Use Cases:</h5>
                </div>
                <p className="mb-3">Hosting media content like images and videos for websites.</p>
                <p className="mb-3">Long-term storage for backups and archival data.</p>
                <p className="mb-3">Centralized data lake for analytics and big data processing.</p>
                <p className="mb-3">Hosting static websites.</p>
                <p className="mb-3"><strong className="text-blue-400">📦 Supported File Types:</strong>.txt, .csv, .json, .xml, .jpg, .mp4, .zip, .bak, and more.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">2️⃣ File Service</h5>
                </div>
                <p className="mb-3">📁 Used for shared file storage that behaves like a traditional file server.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">🔹 Description:</h5>
                </div>
                <p className="mb-3">Provides Azure Files, a fully managed file share in the cloud.</p>
                <p className="mb-3">Uses the SMB (Server Message Block) or NFS (Network File System) protocols — the same used by on-premises file servers.</p>
                <p className="mb-3">Can be mounted to Windows, Linux, or macOS systems.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">💾 Example Uses:</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Shared network drives for teams</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">“Lift and shift” of on-premises file servers</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Application configurations shared across multiple VMs</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">📦 Example Scenario:</h5>
                </div>
                <p className="mb-3">You have multiple virtual machines needing access to the same configuration files — you can store those files in Azure Files and mount them just like a shared folder.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">3️⃣ Queue Service</h5>
                </div>
                <p className="mb-3">📬 Used for reliable messaging between application components.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">🔹 Description:</h5>
                </div>
                <p className="mb-3">Provides asynchronous communication between services using message queues.</p>
                <p className="mb-3">Stores messages in a queue, which can be processed later by background services or workers.</p>
                <p className="mb-3">Ensures messages are delivered at least once and processed in FIFO (First-In, First-Out) order.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">💾 Example Uses:</h5>
                </div>
                <p className="mb-3">Sending background jobs (like image processing or email sending)</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Decoupling app components for scalability</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Event-driven architecture</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">📦 Example Scenario:</h5>
                </div>
                <p className="mb-3">A web app uploads an image → sends a message to a queue → a background process picks it up and resizes the image.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">4️⃣ Table Service</h5>
                </div>
                <p className="mb-3">🧮 Used to store large amounts of structured, non-relational data.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">🔹 Description:</h5>
                </div>
                <p className="mb-3">Provides NoSQL key-value storage.</p>
                <p className="mb-3">Stores data in tables with entities (rows) and properties (columns).</p>
                <p className="mb-3">Flexible schema — you can add or remove columns anytime.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">💾 Example Uses:</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Storing user profiles, IoT data, or metadata</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Fast lookups by key</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Lightweight applications needing scalable, cheap storage</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">📦 Example Scenario:</h5>
                </div>
                <p className="mb-3">You have millions of IoT sensors sending temperature data — you can store this efficiently in Azure Table Storage.</p>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">🧠 Summary Table</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Datalake Service</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Type of Data</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Description</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Example Use Case</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Blob Service</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Unstructured / Semi-structured</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Stores large objects (files, media, backups)</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Images, videos, logs</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">File Service</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">File-based</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Shared file storage via SMB/NFS</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Shared drives, app configs</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Queue Service</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Messaging</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Message-based communication between components</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Background tasks, event processing</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Table Service</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Structured (NoSQL)</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Key-value, schema-less table storage</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">User profiles, IoT data</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Explore Datalake Service</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Once your storage account is created:</h5>
                </div>
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Go to your Storage Account</h5>
                </div>
                <ImageGallery images={getImages('image54', 'image55', 'image56', 'image57', 'image58', 'image59', 'image60', 'image61', 'image62', 'image63', 'image64', 'image65')} />
              </div>
            </div>
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
