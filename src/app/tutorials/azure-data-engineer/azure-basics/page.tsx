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
  image1: { src: '/tutorials/azure/images/image-01.png', width: 1920, height: 1080, alt: 'Azure Basics image 1' },
  image2: { src: '/tutorials/azure/images/image-02.png', width: 1920, height: 1080, alt: 'Azure Basics image 2' },
  image3: { src: '/tutorials/azure/images/image-03.png', width: 1920, height: 1080, alt: 'Azure Basics image 3' },
  image4: { src: '/tutorials/azure/images/image-04.png', width: 1920, height: 1080, alt: 'Azure Basics image 4' },
  image5: { src: '/tutorials/azure/images/image-05.png', width: 1920, height: 1080, alt: 'Azure Basics image 5' },
  image6: { src: '/tutorials/azure/images/image-06.png', width: 1920, height: 1080, alt: 'Azure Basics image 6' },
  image7: { src: '/tutorials/azure/images/image-07.png', width: 1920, height: 1080, alt: 'Azure Basics image 7' },
  image8: { src: '/tutorials/azure/images/image-08.png', width: 1920, height: 1080, alt: 'Azure Basics image 8' },
  image9: { src: '/tutorials/azure/images/image-09.png', width: 1920, height: 1080, alt: 'Azure Basics image 9' },
  image10: { src: '/tutorials/azure/images/image-10.png', width: 1920, height: 1080, alt: 'Azure Basics image 10' },
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
};

const getImages = (...keys: (keyof typeof azureImages)[]): GalleryImage[] =>
  keys.map(key => azureImages[key]).filter(Boolean);

const PAGE_HEADINGS = [
  { id: 'azure-basics', title: 'Azure Basics' },
  { id: 'resource-group', title: 'Resource Group' },
  { id: 'azure-blob-storage', title: 'Azure Blob Storage' },
  { id: 'azure-data-lake', title: 'Azure Data Lake Storage Gen2' }
];

const SUBSECTION_PARENT: Record<string, string> = {
  'azure-hierarchy': 'azure-basics',
  'resource-group-overview': 'resource-group',
  'blob-storage-overview': 'azure-blob-storage',
  'data-lake-overview': 'azure-data-lake'
};

const createModuleNavigationItems = (): Array<{ id: string; title: string; href: string; icon?: string; children?: Array<{ id: string; title: string; href: string }> }> => {
  const basePath = '/tutorials/azure-data-engineer/azure-basics';
  const subsectionTitles: Record<string, string> = {
    'azure-hierarchy': 'Azure Hierarchy',
    'resource-group-overview': 'Resource Group Overview',
    'blob-storage-overview': 'Blob Storage Overview',
    'data-lake-overview': 'Data Lake Overview'
  };

  const moduleSections = PAGE_HEADINGS.map(heading => {
    const subsections = Object.entries(SUBSECTION_PARENT)
      .filter(([_, parent]) => parent === heading.id)
      .map(([subsectionId, _]) => ({
        id: subsectionId,
        title: subsectionTitles[subsectionId] || subsectionId,
        href: `${basePath}#${subsectionId}`
      }));

    return {
      id: heading.id,
      title: heading.title,
      href: `${basePath}#${heading.id}`,
      icon: heading.id === 'azure-basics' ? '📘' : undefined,
      children: subsections.length > 0 ? subsections : undefined
    };
  });

  return moduleSections;
};

export default function AzureDataEngineerPage() {
  const [activeSection, setActiveSection] = useState('azure-basics');
  const [activeSubsection, setActiveSubsection] = useState<string | null>(null);
  const pageHeadings = PAGE_HEADINGS;

  const handleSetActiveSection = (sectionId: string) => {
    if (PAGE_HEADINGS.some(heading => heading.id === sectionId)) {
      setActiveSection(sectionId);
      setActiveSubsection(null);
      window.history.replaceState(null, '', `#${sectionId}`);
    } else {
      const parentSection = SUBSECTION_PARENT[sectionId] || 'azure-basics';
      setActiveSection(parentSection);
      setActiveSubsection(sectionId);
      window.history.replaceState(null, '', `#${sectionId}`);
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) {
        setActiveSection('azure-basics');
        setActiveSubsection(null);
        return;
      }

      if (PAGE_HEADINGS.some(heading => heading.id === hash)) {
        setActiveSection(hash);
        setActiveSubsection(null);
      } else {
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

  useEffect(() => {
    if (activeSection) {
      setTimeout(() => {
        const element = document.getElementById(activeSection);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (activeSubsection) {
          const subElement = document.getElementById(activeSubsection);
          if (subElement) {
            subElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
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
      <div className="min-h-screen">
        <div className="text-center mb-16">
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

        {activeSection === 'azure-basics' && (
        <section
          id="azure-basics"
          className="bg-[#252525] rounded-xl p-8 border border-gray-600 scroll-mt-24 mb-20"
        >
          <h3 className="text-3xl font-bold text-white mb-6">Azure Basics</h3>
          <div className="space-y-12">
            <div id="azure-hierarchy" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">Azure Hierarchy</h4>
              <div className="space-y-6 text-gray-300">
              <div className="p-4 bg-gray-800 rounded-lg">
                <h5 className="text-xl font-semibold text-white mb-3">1. Management Groups (The Top-Level)</h5>
                <p className="mb-3"><strong className="text-blue-400">What it is:</strong> This is the highest level of Azure's structure. It's like a parent folder that helps organize your entire Azure environment.</p>
                <p className="mb-3"><strong className="text-blue-400">Purpose:</strong> It helps you manage and organize multiple subscriptions across your organization. You can group subscriptions based on departments, teams, or projects.</p>
                <p><strong className="text-blue-400">Example:</strong> Imagine a company with multiple divisions, like Finance, IT, and Marketing. You could have separate management groups for each of these divisions.</p>
              </div>
              
              <div className="p-4 bg-gray-800 rounded-lg">
                <h5 className="text-xl font-semibold text-white mb-3">2. Subscriptions (Middle Layer)</h5>
                <p className="mb-3"><strong className="text-blue-400">What it is:</strong> Underneath management groups, you have subscriptions. A subscription is like a container for Azure resources, where you'll define limits on resources and billing.</p>
                <p className="mb-3"><strong className="text-blue-400">Purpose:</strong> It helps with organizing resources, managing access, and billing. You can have multiple subscriptions for different projects or teams. Each subscription has its own resource limits and billing.</p>
                <p><strong className="text-blue-400">Example:</strong> If your company has different projects, like a website and an app, you could create separate subscriptions for them. One for the website, one for the app.</p>
              </div>
              
              <div className="p-4 bg-gray-800 rounded-lg">
                <h5 className="text-xl font-semibold text-white mb-3">3. Resource Groups (Sub-Containers)</h5>
                <p className="mb-3"><strong className="text-blue-400">What it is:</strong> Inside each subscription, you can have resource groups. These are containers that hold related resources.</p>
                <p className="mb-3"><strong className="text-blue-400">Purpose:</strong> They help organize resources based on their lifecycle and permissions. All the resources in a group are usually related to the same project or service.</p>
                <p><strong className="text-blue-400">Example:</strong> If you're building a web app, you might have a resource group called "rg-ohg365-dev" where you store everything related to the app, such as databases, storage accounts, and virtual machines.</p>
              </div>
              
              <div className="p-4 bg-gray-800 rounded-lg">
                <h5 className="text-xl font-semibold text-white mb-3">4. Resources (The Actual Items)</h5>
                <p className="mb-3"><strong className="text-blue-400">What it is:</strong> These are the individual services or products that you create in Azure, like virtual machines (VMs), storage accounts, databases, or networks.</p>
                <p className="mb-3"><strong className="text-blue-400">Purpose:</strong> This is where the actual work happens! Resources are the building blocks of your cloud environment.</p>
                <p><strong className="text-blue-400">Example:</strong> In your "rg-ohg365-dev" resource group, you could have resources like a VM to run your website, a database to store your data, and a storage account for storing files.</p>
              </div>
              
              <p className="text-gray-300"><strong className="text-blue-400">Management Groups:</strong> High-level containers for organizing multiple subscriptions.</p>
              <ImageGallery images={getImages('image1')} />
              <ImageGallery images={getImages('image2')} />
              <p className="text-gray-300"><strong className="text-blue-400">Subscriptions:</strong> They hold resources and manage access to resources.</p>
              <ImageGallery images={getImages('image3')} />
              <ImageGallery images={getImages('image4')} />
              <p className="text-gray-300"><strong className="text-blue-400">Resource Groups:</strong> Containers inside subscriptions to organize and manage resources by project or lifecycle.</p>
              <ImageGallery images={getImages('image5')} />
              <ImageGallery images={getImages('image6')} />
              <p className="text-gray-300"><strong className="text-blue-400">Resources:</strong> The actual services you use in Azure.</p>
              
              <div className="p-4 bg-gray-800 rounded-lg">
                <h5 className="text-xl font-semibold text-white mb-3">2.1 What is a Resource Group?</h5>
                <p className="mb-3">A Resource Group in Azure is like a folder that holds all the resources (services) related to a project or app.</p>
                <p className="mb-3"><strong className="text-blue-400">For example:</strong> If you build a website, you might have:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>A Virtual Machine (VM) for the web server</li>
                  <li>A Storage Account for images</li>
                  <li>A Database for user data</li>
                </ul>
                <p className="mt-3">You can put all of these inside one Resource Group - making it easier to manage, monitor, and delete them together.</p>
              </div>
              
              <div className="p-4 bg-gray-800 rounded-lg">
                <h5 className="text-xl font-semibold text-white mb-3">2.2 Create a Resource Group</h5>
                <div className="space-y-3">
                  <div>
                    <strong className="text-blue-400">Sign in to the Azure Portal</strong>
                  </div>
                  <div>
                    <strong className="text-blue-400">In the search menu, search for Resource Groups.</strong>
                    <ImageGallery images={getImages('image5')} />
                  </div>
                  <div>
                    <strong className="text-blue-400">Click on the resource group and click on the create button</strong>
                    <ImageGallery images={getImages('image7')} />
                    <ImageGallery images={getImages('image8')} />
                    <ImageGallery images={getImages('image9')} />
                    <ImageGallery images={getImages('image10')} />
                    <ImageGallery images={getImages('image6')} />
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-800 rounded-lg">
                <h5 className="text-xl font-semibold text-white mb-3">Overview of Resource Group</h5>
                <p className="mb-3"><strong className="text-blue-400">Name:</strong> rg-ohg365-dev → This is your Resource Group's name. Usually, names include clues about the project or environment:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mb-3">
                  <li>rg ✓ Resource Group</li>
                  <li>ohg365 ✓ Project or team name</li>
                  <li>dev ✓ Environment (like dev, test, or prod)</li>
                </ul>
                <p className="mb-3"><strong className="text-blue-400">Buttons:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>➕ Create: Add new Azure resources (like VMs, storage, databases).</li>
                  <li>⚙️ Manage view: Customize how your resources list looks.</li>
                  <li>🗑️ Delete resource group: Deletes the entire group and all its resources (be careful!).</li>
                  <li>🔁 Refresh: Updates the view if new resources were added.</li>
                  <li>📤 Export to CSV: Export your resource details (helpful for reports).</li>
                  <li>📊 Openn query: Create or run custom filters using Azure Resource Graph.</li>
                </ul>
              </div>
              </div>
            </div>
          </div>
        </section>
        )}
        {activeSection === 'resource-group' && (
        <section
          id="resource-group"
          className="bg-[#252525] rounded-xl p-8 border border-gray-600 scroll-mt-24 mb-20"
        >
          <h3 className="text-3xl font-bold text-white mb-6">Resource Group</h3>
          <div className="space-y-12">
          </div>
        </section>
        )}
        {activeSection === 'azure-blob-storage' && (
        <section
          id="azure-blob-storage"
          className="bg-[#252525] rounded-xl p-8 border border-gray-600 scroll-mt-24 mb-20"
        >
          <h3 className="text-3xl font-bold text-white mb-6">Azure Blob Storage</h3>
          <div className="space-y-12">
            <div id="blob-storage-overview" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">Blob Storage Overview</h4>
              <div className="space-y-6 text-gray-300">
              <div className="p-4 bg-gray-800 rounded-lg">
                <h5 className="text-xl font-semibold text-white mb-3">What is Azure Blob Storage?</h5>
                <p className="mb-3">Azure Blob Storage is Microsoft's cloud-based service designed to store large amounts of data of various types - including structured, semi-structured, and unstructured data.</p>
                <p className="mb-3">It is ideal for storing files such as CSV, text, Excel, JSON, Parquet, Avro, XML, images, videos, backups, and logs.</p>
                <p className="mb-3">The term <strong className="text-blue-400">"Blob"</strong> stands for Binary Large Object, meaning it can store any type of binary data. Blob Storage provides a flat namespace, meaning all files (blobs) are stored in containers within a storage account, rather than in a traditional hierarchical folder system.</p>
                <p className="mb-3"><strong className="text-blue-400">Azure Blob Storage is highly scalable, secure, and cost-efficient, making it suitable for:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Storing and serving large files (media, documents, etc.)</li>
                  <li>Data lakes and analytics workloads</li>
                  <li>Backup and disaster recovery</li>
                  <li>Archiving and compliance storage</li>
                </ul>
              </div>
              
              <div className="p-4 bg-gray-800 rounded-lg">
                <h5 className="text-xl font-semibold text-white mb-3">3.1 Create an Azure Blob Storage</h5>
                <div className="space-y-3">
                  <div>
                    <strong className="text-blue-400">Go to Azure Portal</strong>
                  </div>
                  <div>
                    <strong className="text-blue-400">In the search bar, type "Storage Accounts" or "blob"</strong>
                    <ImageGallery images={getImages('image11')} />
                  </div>
                  <div>
                    <strong className="text-blue-400">Click on storage accounts and click on create button</strong>
                    <ImageGallery images={getImages('image12')} />
                  </div>
                  <div>
                    <strong className="text-blue-400">Click "Review + Create"</strong>
                    <ImageGallery images={getImages('image13')} />
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-800 rounded-lg">
                <h5 className="text-xl font-semibold text-white mb-3">1️⃣ Subscription</h5>
                <p className="mb-3">This is where you choose which Azure Subscription will own this storage account.</p>
                <p className="mb-3">A subscription is linked to your billing and access control.</p>
                <p><strong className="text-blue-400">Example:</strong> You might have separate subscriptions for development, testing, or production environments. 🟦 You selected: Azure subscription 1</p>
              </div>
              
              <div className="p-4 bg-gray-800 rounded-lg">
                <h5 className="text-xl font-semibold text-white mb-3">2️⃣ Resource Group</h5>
                <p className="mb-3">Choose or create a Resource Group to organize related Azure resources.</p>
                <p className="mb-3">Resource Groups act like folders - all your related resources (VMs, storage, databases) are stored here for easy management.</p>
                <p><strong className="text-blue-400">In your case:</strong> You selected rg-ohg365-dev, which is perfect for development resources. 🟦 <strong className="text-blue-400">Tip:</strong> Keeping related resources in the same group helps you track cost, permissions, and manage everything easily.</p>
              </div>
              
              <div className="p-4 bg-gray-800 rounded-lg">
                <h5 className="text-xl font-semibold text-white mb-3">3️⃣ Storage Account Name</h5>
                <p className="mb-3">This is the unique name for your storage account (like a domain name).</p>
                <p className="mb-3">It must be globally unique, lowercase, and 3–24 characters long.</p>
                <p className="mb-3">This name will form part of the URL to access your data.</p>
                <p><strong className="text-blue-400">Example:</strong> If your name is blobohg365dev</p>
              </div>
              
              <div className="p-4 bg-gray-800 rounded-lg">
                <h5 className="text-xl font-semibold text-white mb-3">4️⃣ Preferred Storage Type</h5>
                <p>Select what kind of storage service you want to enable.</p>
              </div>
              </div>
            </div>
            <div id="blob-storage-overview" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">Blob Storage Overview</h4>
              <div className="space-y-4 text-gray-300">
              <p className="text-gray-300">If it appears there, 🎉 congratulations - your Blob Storage account has been successfully created</p>
              <ImageGallery images={getImages('image16')} />
              <p className="text-gray-300">3.2 Types of Azure Storage Services:</p>
              <p className="text-gray-300">Azure Storage provides four mai types of services uder oe Storage Account.</p>
              <ImageGallery images={getImages('image17')} />
              <p className="text-gray-300">1️⃣ Blob Service</p>
              <p className="text-gray-300">🧱 Used to store unstructured or semi-structured data like files, images, videos, logs, and backups.</p>
              <p className="text-gray-300">🔹 Descriptio:</p>
              <p className="text-gray-300">Stores data as Blobs (Binary Large Objects) inside containers.</p>
              <p className="text-gray-300">Best for storing flat files and large objects that do’t fit in a database.</p>
              <p className="text-gray-300">Data can be text, binary, documents, media, or backups.</p>
              <p className="text-gray-300">💾 Example Uses:</p>
              <p className="text-gray-300">Storing images or videos for websites</p>
              <p className="text-gray-300">Backups and archives</p>
              <p className="text-gray-300">Data lake for analytics</p>
              <p className="text-gray-300">Hostig static websites</p>
              <p className="text-gray-300">📦 Example File Types:</p>
              <p className="text-gray-300">.txt, .csv, .jso, .xml, .jpg, .mp4, .zip, .bak</p>
              <p className="text-gray-300">2️⃣ File Service</p>
              <p className="text-gray-300">📁 Used for shared file storage that behaves like a traditional file server.</p>
              <p className="text-gray-300">🔹 Descriptio:</p>
              <p className="text-gray-300">Provides Azure Files, a fully managed file share in the cloud.</p>
              <p className="text-gray-300">Uses the SMB (Server Message Block) or NFS (Network File System) protocols - the same used by on-premises file servers.</p>
              <p className="text-gray-300">Ca be mounted to Widows, Liux, or macOS systems.</p>
              <p className="text-gray-300">💾 Example Uses:</p>
              <p className="text-gray-300">Shared etwork drives for teams</p>
              <p className="text-gray-300">“Lift and shift” of on-premises file servers</p>
              <p className="text-gray-300">Applicatio configurations shared across multiple VMs</p>
              <p className="text-gray-300">📦 Example Sceario:</p>
              <p className="text-gray-300">You have multiple virtual machines needing access to the same configuration files - you can store those files in Azure Files and mount them just like a shared folder.</p>
              <p className="text-gray-300">3️⃣ Queue Service</p>
              <p className="text-gray-300">📬 Used for reliable messagig betwee applicatio compoets.</p>
              <p className="text-gray-300">🔹 Descriptio:</p>
              <p className="text-gray-300">Provides asychroous commuicatio betwee services using message queues.</p>
              <p className="text-gray-300">Stores messages in a queue, which can be processed later by backgroud services or workers.</p>
              <p className="text-gray-300">Esures messages are delivered at least oce and processed i FIFO (First-I, First-Out) order.</p>
              <p className="text-gray-300">💾 Example Uses:</p>
              <p className="text-gray-300">Sedig backgroud jobs (like image processig or email sedig)</p>
              <p className="text-gray-300">Decouplig app compoets for scalability</p>
              <p className="text-gray-300">Evet-drive architecture</p>
              <p className="text-gray-300">📦 Example Sceario:</p>
              <p className="text-gray-300">A web app uploads a image → seds a message to a queue → a backgroud process picks it up and resizes the image.</p>
              <p className="text-gray-300">4️⃣ Table Service</p>
              <p className="text-gray-300">🧮 Used to store large amounts of structured, o-relatioal data.</p>
              <p className="text-gray-300">🔹 Descriptio:</p>
              <p className="text-gray-300">Provides NoSQL key-value storage.</p>
              <p className="text-gray-300">Stores data i tables with etities (rows) and properties (colums).</p>
              <p className="text-gray-300">Flexible schema - you can add or remove colums anytime.</p>
              <p className="text-gray-300">💾 Example Uses:</p>
              <p className="text-gray-300">Storing user profiles, IoT data, or metadata</p>
              <p className="text-gray-300">Fast lookups by key</p>
              <p className="text-gray-300">Lightweight applicatios needing scalable, cheap storage</p>
              <p className="text-gray-300">📦 Example Sceario:</p>
              <p className="text-gray-300">You have millions of IoT sesors sedig temperature data - you can store this efficiently in Azure Table Storage.</p>
              <p className="text-gray-300">🧠 Summary Table</p>
              <p className="text-gray-300">Storage Service</p>
              <p className="text-gray-300">Type of Data</p>
              <p className="text-gray-300">Descriptio</p>
              <p className="text-gray-300">Example Use Case</p>
              <p className="text-gray-300">Blob Service</p>
              <p className="text-gray-300">Unstructured / Semi-structured</p>
              <p className="text-gray-300">Stores large objects (files, media, backups)</p>
              <p className="text-gray-300">Images, videos, logs</p>
              <p className="text-gray-300">File Service</p>
              <p className="text-gray-300">File-based</p>
              <p className="text-gray-300">Shared file storage via SMB/NFS</p>
              <p className="text-gray-300">Shared drives, app cofigs</p>
              <p className="text-gray-300">Queue Service</p>
              <p className="text-gray-300">Messagig</p>
              <p className="text-gray-300">Message-based commuicatio betwee compoets</p>
              <p className="text-gray-300">Backgroud tasks, evet processig</p>
              <p className="text-gray-300">Table Service</p>
              <p className="text-gray-300">Structured (NoSQL)</p>
              <p className="text-gray-300">Key-value, schema-less table storage</p>
              <p className="text-gray-300">User profiles, IoT data</p>
              <p className="text-gray-300">Explore Blob Service</p>
              <p className="text-gray-300">Oce your storage account is created:</p>
              <p className="text-gray-300">Go to your Storage Account</p>
              <ImageGallery images={getImages('image18')} />
              <p className="text-gray-300">Uder Data storage, click Containers → This is where your blobs live.</p>
              <p className="text-gray-300">Click ➕ Cotaier to create oe:</p>
              <p className="text-gray-300">Name: images, videos, or backups (any name)</p>
              <p className="text-gray-300">Public access level:</p>
              <p className="text-gray-300">Private (default) – Only you can access</p>
              <p className="text-gray-300">Blob (aoymous read) – Ayoe with the lik can read blobs</p>
              <p className="text-gray-300">Cotaier (public) – Everyoe can see cotets</p>
              <p className="text-gray-300">Click Create</p>
              <ImageGallery images={getImages('image19')} />
              <ImageGallery images={getImages('image20')} />
              <p className="text-gray-300">Uploand &amp; Manage Blobs</p>
              <p className="text-gray-300">Click your new container (e.g., images)</p>
              <p className="text-gray-300">Click Upload</p>
              <p className="text-gray-300">Choose a file from your computer (like a .jpg, .txt, or .mp4)</p>
              <p className="text-gray-300">Oce uploaded, you ca:</p>
              <p className="text-gray-300">View Properties (size, type, last modified)</p>
              <p className="text-gray-300">Get the URL to access the file</p>
              <p className="text-gray-300">Chage the access tier</p>
              <p className="text-gray-300">Storage Account</p>
              <p className="text-gray-300">└── Blob Service</p>
              <p className="text-gray-300">└── Cotaier (like a folder)</p>
              <p className="text-gray-300">└── Blob (the actual file)</p>
              <ImageGallery images={getImages('image21')} />
              <ImageGallery images={getImages('image22')} />
              <ImageGallery images={getImages('image23')} />
              <ImageGallery images={getImages('image24')} />
              <ImageGallery images={getImages('image25')} />
              <ImageGallery images={getImages('image26')} />
              <ImageGallery images={getImages('image27')} />
              <p className="text-gray-300">Types of Blob Types:</p>
              <ImageGallery images={getImages('image23')} />
              <ImageGallery images={getImages('image28')} />
              <ImageGallery images={getImages('image29')} />
              <ImageGallery images={getImages('image30')} />
              <p className="text-gray-300">Blob Type</p>
              <p className="text-gray-300">Best For</p>
              <p className="text-gray-300">Example Use</p>
              <p className="text-gray-300">🧱 Block Blob</p>
              <p className="text-gray-300">Storing text or binary data</p>
              <p className="text-gray-300">Images, videos, documents, CSVs</p>
              <p className="text-gray-300">📜 Append Blob</p>
              <p className="text-gray-300">Data that is costatly added to (append-only)</p>
              <p className="text-gray-300">Logs, telemetry, audit data</p>
              <p className="text-gray-300">📄 Page Blob</p>
              <p className="text-gray-300">Radom read/write access</p>
              <p className="text-gray-300">Virtual machine disks (VHD files)</p>
              <p className="text-gray-300">🧱 1. Block Blob</p>
              <p className="text-gray-300">Most common blob type used in Azure.</p>
              <p className="text-gray-300">💡 What it is:</p>
              <p className="text-gray-300">Stores text and binary data (files like .txt, .jpg, .mp4, .csv, etc.)</p>
              <p className="text-gray-300">Data is split ito blocks, and each block is idetified by a block ID.</p>
              <p className="text-gray-300">You can uploand or update blocks individually and commit them together.</p>
              <p className="text-gray-300">✅ Use Cases:</p>
              <p className="text-gray-300">Storing images, videos, PDFs, and backups.</p>
              <p className="text-gray-300">Data files for analytics (CSV, JSON, Parquet).</p>
              <p className="text-gray-300">Large files uploaded i chuks.</p>
              <p className="text-gray-300">📘 Example:</p>
              <p className="text-gray-300">You uploand a 500 MB video file - Azure divides it ito smaller blocks and uploads each part separately for speed and reliability.</p>
              <p className="text-gray-300">📜 2. Append Blob</p>
              <p className="text-gray-300">Special type of blob for data that grows over time.</p>
              <p className="text-gray-300">💡 What it is:</p>
              <p className="text-gray-300">Optimized for append operations - you can only add new data to the end, not modify or delete existing data.</p>
              <p className="text-gray-300">Each time you add new information, it’s appended to the blob.</p>
              <p className="text-gray-300">✅ Use Cases:</p>
              <p className="text-gray-300">Storing long files.</p>
              <p className="text-gray-300">Applicatio telemetry or diagostics data.</p>
              <p className="text-gray-300">Streamig data that’s costatly beig added.</p>
              <p className="text-gray-300">📘 Example:</p>
              <p className="text-gray-300">You’re longgig website visit's. Each time a new visitor arrives, their data (timestamp, IP, etc.) is appended to the existing long file.</p>
              <p className="text-gray-300">📄 3. Page Blob</p>
              <p className="text-gray-300">Designed for random read/write operations.</p>
              <p className="text-gray-300">💡 What it is:</p>
              <p className="text-gray-300">Data is stored i fixed-size 512-byte pages.</p>
              <p className="text-gray-300">Allows fast read and write access to specific parts of the blob.</p>
              <p className="text-gray-300">Commonly used for storing Virtual Hard Disk (VHD) files that power Azure Virtual Machines.</p>
              <p className="text-gray-300">✅ Use Cases:</p>
              <p className="text-gray-300">Storing Azure VM disks (OS and data disks).</p>
              <p className="text-gray-300">Large databases that require random access.</p>
              <p className="text-gray-300">Ay workloand that reads/writes frequetly to specific sectios of a file.</p>
              <p className="text-gray-300">📘 Example:</p>
              <p className="text-gray-300">Whe you start a Azure Virtual Machine, it's disk (a .vhd file) is stored as a Page Blob, allowig the VM to quickly read or write data anywhere on the disk.</p>
              <p className="text-gray-300">Blob Type</p>
              <p className="text-gray-300">Struncture</p>
              <p className="text-gray-300">Read/Write Behavior</p>
              <p className="text-gray-300">Common Use</p>
              <p className="text-gray-300">Block Blob</p>
              <p className="text-gray-300">Data stored as blocks</p>
              <p className="text-gray-300">Upload/replace blocks</p>
              <p className="text-gray-300">Files, media, documents</p>
              <p className="text-gray-300">Append Blob</p>
              <p className="text-gray-300">Sequetially added blocks</p>
              <p className="text-gray-300">Append-only</p>
              <p className="text-gray-300">Logs, telemetry, streamig data</p>
              <p className="text-gray-300">Page Blob</p>
              <p className="text-gray-300">Fixed 512-byte pages</p>
              <p className="text-gray-300">Radom read/write</p>
              <p className="text-gray-300">VM disks, large databases</p>
              <p className="text-gray-300">Types of Access Tiers:</p>
              <p className="text-gray-300">Azure lets you store data i different tiers based on how ofte you eed it.This helps save moey 💰 by matchig storage cost to usage.</p>
              <p className="text-gray-300">Tier</p>
              <p className="text-gray-300">Cost</p>
              <p className="text-gray-300">Availability</p>
              <p className="text-gray-300">Best For</p>
              <p className="text-gray-300">Hot</p>
              <p className="text-gray-300">💰 Highest cost</p>
              <p className="text-gray-300">🔥 Alwanys available</p>
              <p className="text-gray-300">Frequetly accessed data (e.g., active apps, websites)</p>
              <p className="text-gray-300">Cool</p>
              <p className="text-gray-300">💸 Cheaper</p>
              <p className="text-gray-300">🕓 Slight delany in access</p>
              <p className="text-gray-300">Ifrequetly accessed data (e.g., mothly reports)</p>
              <p className="text-gray-300">Cold</p>
              <p className="text-gray-300">💧 Cheaper than Cool</p>
              <p className="text-gray-300">⏱️ Slower access</p>
              <p className="text-gray-300">Rarely accessed data but still retrievable</p>
              <p className="text-gray-300">Archive</p>
              <p className="text-gray-300">🧊 Cheapest</p>
              <p className="text-gray-300">💤 Retrieval takes hours</p>
              <p className="text-gray-300">Log-term backups, compliance storage</p>
              <ImageGallery images={getImages('image23')} />
              <ImageGallery images={getImages('image28')} />
              <ImageGallery images={getImages('image31')} />
              <ImageGallery images={getImages('image32')} />
              </div>
            </div>
            <div id="blob-storage-overview" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">Blob Storage Overview</h4>
              <div className="space-y-4 text-gray-300">
              <p className="text-gray-300">Azure Data Lake Storage Gen2 is a highly scalable and secure cloud storage service optimized for big data analytics and data lakes. It builds on Azure Blob Storage capabilities but adds file system semantics, hierarchical namespaces, and enhanced performance for analytics workloads.</p>
              <p className="text-gray-300">ADLS Gen2 is designed to store massive volumes of structured, semi-structured, and unstructured data, making it ideal for big data and machine learning scenarios.</p>
              <p className="text-gray-300">Key Features and Use Cases:</p>
              <p className="text-gray-300">Hierarchical Namespace: Unlike traditional Blob Storage, ADLS Gen2 supports folders and directories, enabling efficient organization and faster file operations at scale.</p>
              <p className="text-gray-300">Optimized for Analytics: Supports Hadoop Distributed File System (HDFS) and integrates seamlessly with analytics frameworks like Azure Databricks, HDInsight, and Azure Synapse Analytics.</p>
              <p className="text-gray-300">Supports Multiple Data Types: You can store CSV, JSON, Parquet, Avro, ORC, images, videos, logs, backups, and more.</p>
              <p className="text-gray-300">Security and Compliance: Provides enterprise-grade security with Azure Active Directory integration, role-based access control (RBAC), and encryption at rest and in transit.</p>
              <p className="text-gray-300">Cost-effective and Scalable: Automatically scales to handle petabytes of data and millions of files with optimized storage tiers and pricing options.</p>
              <p className="text-gray-300">Common Uses of ADLS Gen2:</p>
              <p className="text-gray-300">Building data lakes for big data analytics and machine learig.</p>
              <p className="text-gray-300">Storing large datasets for ETL (Extract, Trasform, Load) processes.</p>
              <p className="text-gray-300">Itegratig with analytics tools to perform complex queries and trasformatios.</p>
              <p className="text-gray-300">Secure and compliat storage for sensitive data and audit logs.</p>
              <p className="text-gray-300">Archiving and long-term data retention with tiered storage options.</p>
              </div>
            </div>
          </div>
        </section>
        )}
        {activeSection === 'azure-data-lake' && (
        <section
          id="azure-data-lake"
          className="bg-[#252525] rounded-xl p-8 border border-gray-600 scroll-mt-24 mb-20"
        >
          <h3 className="text-3xl font-bold text-white mb-6">Azure Data Lake Storage Gen2</h3>
          <div className="space-y-12">
            <div id="data-lake-overview" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">Data Lake Overview</h4>
              <div className="space-y-4 text-gray-300">
              <p className="text-gray-300">The default (and most common) option is:Azure Blob Storage or Azure Data Lake Storage Gen2</p>
              <p className="text-gray-300">🧠 This means your account will support:</p>
              <p className="text-gray-300">Blob storage (for files, media, etc.)</p>
              <p className="text-gray-300">Data Lake capabilities (for analytics and big data processig)</p>
              <p className="text-gray-300">🟦 Tip: Keep this as default uless you have a specific eed for file shares or queue services.</p>
              <p className="text-gray-300">5️⃣ Performace &amp; Redudacy Settigs</p>
              <p className="text-gray-300">⚙️ Performace:</p>
              <p className="text-gray-300">Stadard: Uses HDD-based storage - cheaper, good for geeral use.</p>
              <p className="text-gray-300">Premium: Uses SSD-based storage - faster, ideal for workloads needing low latecy (like databases or VMs).</p>
              <p className="text-gray-300">🟦 You selected: Stadard (recommeded)</p>
              <p className="text-gray-300">🧭 Redudacy:</p>
              <p className="text-gray-300">Defies how Azure will replicate your data to keep it safe.</p>
              <p className="text-gray-300">Optio</p>
              <p className="text-gray-300">Meaig</p>
              <p className="text-gray-300">Copies of Data</p>
              <p className="text-gray-300">LRS (Locally-redudat storage)</p>
              <p className="text-gray-300">Keeps 3 copies i oe data ceter</p>
              <p className="text-gray-300">3</p>
              <p className="text-gray-300">ZRS (Zoe-redudat storage)</p>
              <p className="text-gray-300">Copies across 3 availability zones in the same region</p>
              <p className="text-gray-300">3</p>
              <p className="text-gray-300">-RS (-eo-redudat storage)</p>
              <p className="text-gray-300">Copies data to aother region (for disaster recovery)</p>
              <p className="text-gray-300">6</p>
              <p className="text-gray-300">RA-RS (Read-access -eo-redudat)</p>
              <p className="text-gray-300">Same as -RS but allows read access to secondary region</p>
              <p className="text-gray-300">6</p>
              <p className="text-gray-300">🟦 You selected: LRS (best for development/testing)</p>
              <p className="text-gray-300">Click on create</p>
              <ImageGallery images={getImages('image14')} />
              <ImageGallery images={getImages('image15')} />
              <p className="text-gray-300">Navigate to Your Resource Group</p>
              <p className="text-gray-300">I the left-hand menu, click on Resource Groups</p>
              <p className="text-gray-300">Find and click your resource group - in your case:👉 rg-ohg365-dev</p>
              <p className="text-gray-300">Check for the Storage Account</p>
              <p className="text-gray-300">Inside the Overview tab of your resource group, you’ll see a list of all resources.</p>
              <p className="text-gray-300">Look for a item that looks like this:Type: Storage accountName: blobohg365dev (or whatever name you used)</p>
              </div>
            </div>
            <div id="data-lake-overview" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">Data Lake Overview</h4>
              <div className="space-y-4 text-gray-300">
              <p className="text-gray-300">4. Azure Data Lake Storage Gen2 (ADLS Gen2)</p>
              </div>
            </div>
            <div id="data-lake-overview" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">Data Lake Overview</h4>
              <div className="space-y-4 text-gray-300">
              <p className="text-gray-300">4.1 Create a Azure Data Lake Storage</p>
              <p className="text-gray-300">Go to Azure Portal</p>
              <p className="text-gray-300">In the search bar, type “Storage Accounts” or “ADLS Gen2”</p>
              <ImageGallery images={getImages('image33')} />
              <p className="text-gray-300">Click on storage accounts and click on create button</p>
              <ImageGallery images={getImages('image12')} />
              <p className="text-gray-300">Fill required details</p>
              <ImageGallery images={getImages('image34')} />
              <ImageGallery images={getImages('image35')} />
              <ImageGallery images={getImages('image36')} />
              <ImageGallery images={getImages('image37')} />
              <p className="text-gray-300">Navigate to Your Resource Group</p>
              <p className="text-gray-300">I the left-hand menu, click on Resource Groups</p>
              <p className="text-gray-300">Find and click your resource group - in your case:👉 rg-ohg365-dev</p>
              <p className="text-gray-300">Check for the Storage Account</p>
              <p className="text-gray-300">Inside the Overview tab of your resource group, you’ll see a list of all resources.</p>
              <p className="text-gray-300">Look for a item that looks like this:Type: Storage accountName: adlsohg365dev (or whatever name you used)</p>
              <p className="text-gray-300">If it appears there, 🎉 congratulations - your ADLS Gen2 Storage account has been successfully created</p>
              <ImageGallery images={getImages('image38')} />
              <p className="text-gray-300">3.2 Types of Azure Storage Services:</p>
              <p className="text-gray-300">Azure Storage provides four mai types of services uder oe Storage Account.</p>
              <ImageGallery images={getImages('image39')} />
              <p className="text-gray-300">1️⃣ Data Lake Storage</p>
              <p className="text-gray-300">🧱 Purpose: Designed to store large volumes of unstructured or semi-structured data such as files, images, videos, logs, and backups.🔹 Key Features:</p>
              <p className="text-gray-300">Data is stored as Blobs (Binary Large Objects) within containers.</p>
              <p className="text-gray-300">Ideal for storing large, raw data that does’t fit ito traditional databases.</p>
              <p className="text-gray-300">Supports various formats: text, binary, documents, media, and backups.</p>
              <p className="text-gray-300">💾 Common Use Cases:</p>
              <p className="text-gray-300">Hostig media cotet like images and videos for websites.</p>
              <p className="text-gray-300">Log-term storage for backups and archival data.</p>
              <p className="text-gray-300">Cetralized data lake for analytics and big data processig.</p>
              <p className="text-gray-300">Hostig static websites.</p>
              <p className="text-gray-300">📦 Supported File Types:.txt, .csv, .jso, .xml, .jpg, .mp4, .zip, .bak, and more.</p>
              <p className="text-gray-300">2️⃣ File Service</p>
              <p className="text-gray-300">📁 Used for shared file storage that behaves like a traditional file server.</p>
              <p className="text-gray-300">🔹 Descriptio:</p>
              <p className="text-gray-300">Provides Azure Files, a fully managed file share in the cloud.</p>
              <p className="text-gray-300">Uses the SMB (Server Message Block) or NFS (Network File System) protocols - the same used by on-premises file servers.</p>
              <p className="text-gray-300">Ca be mounted to Widows, Liux, or macOS systems.</p>
              <p className="text-gray-300">💾 Example Uses:</p>
              <p className="text-gray-300">Shared etwork drives for teams</p>
              <p className="text-gray-300">“Lift and shift” of on-premises file servers</p>
              <p className="text-gray-300">Applicatio configurations shared across multiple VMs</p>
              <p className="text-gray-300">📦 Example Sceario:</p>
              <p className="text-gray-300">You have multiple virtual machines needing access to the same configuration files - you can store those files in Azure Files and mount them just like a shared folder.</p>
              <p className="text-gray-300">3️⃣ Queue Service</p>
              <p className="text-gray-300">📬 Used for reliable messagig betwee applicatio compoets.</p>
              <p className="text-gray-300">🔹 Descriptio:</p>
              <p className="text-gray-300">Provides asychroous commuicatio betwee services using message queues.</p>
              <p className="text-gray-300">Stores messages in a queue, which can be processed later by backgroud services or workers.</p>
              <p className="text-gray-300">Esures messages are delivered at least oce and processed i FIFO (First-I, First-Out) order.</p>
              <p className="text-gray-300">💾 Example Uses:</p>
              <p className="text-gray-300">Sedig backgroud jobs (like image processig or email sedig)</p>
              <p className="text-gray-300">Decouplig app compoets for scalability</p>
              <p className="text-gray-300">Evet-drive architecture</p>
              <p className="text-gray-300">📦 Example Sceario:</p>
              <p className="text-gray-300">A web app uploads a image → seds a message to a queue → a backgroud process picks it up and resizes the image.</p>
              <p className="text-gray-300">4️⃣ Table Service</p>
              <p className="text-gray-300">🧮 Used to store large amounts of structured, o-relatioal data.</p>
              <p className="text-gray-300">🔹 Descriptio:</p>
              <p className="text-gray-300">Provides NoSQL key-value storage.</p>
              <p className="text-gray-300">Stores data i tables with etities (rows) and properties (colums).</p>
              <p className="text-gray-300">Flexible schema - you can add or remove colums anytime.</p>
              <p className="text-gray-300">💾 Example Uses:</p>
              <p className="text-gray-300">Storing user profiles, IoT data, or metadata</p>
              <p className="text-gray-300">Fast lookups by key</p>
              <p className="text-gray-300">Lightweight applicatios needing scalable, cheap storage</p>
              <p className="text-gray-300">📦 Example Sceario:</p>
              <p className="text-gray-300">You have millions of IoT sesors sedig temperature data - you can store this efficiently in Azure Table Storage.</p>
              <p className="text-gray-300">🧠 Summary Table</p>
              <p className="text-gray-300">Datalake Service</p>
              <p className="text-gray-300">Type of Data</p>
              <p className="text-gray-300">Descriptio</p>
              <p className="text-gray-300">Example Use Case</p>
              <p className="text-gray-300">Blob Service</p>
              <p className="text-gray-300">Unstructured / Semi-structured</p>
              <p className="text-gray-300">Stores large objects (files, media, backups)</p>
              <p className="text-gray-300">Images, videos, logs</p>
              <p className="text-gray-300">File Service</p>
              <p className="text-gray-300">File-based</p>
              <p className="text-gray-300">Shared file storage via SMB/NFS</p>
              <p className="text-gray-300">Shared drives, app cofigs</p>
              <p className="text-gray-300">Queue Service</p>
              <p className="text-gray-300">Messagig</p>
              <p className="text-gray-300">Message-based commuicatio betwee compoets</p>
              <p className="text-gray-300">Backgroud tasks, evet processig</p>
              <p className="text-gray-300">Table Service</p>
              <p className="text-gray-300">Structured (NoSQL)</p>
              <p className="text-gray-300">Key-value, schema-less table storage</p>
              <p className="text-gray-300">User profiles, IoT data</p>
              <p className="text-gray-300">Explore Datalake Service</p>
              <p className="text-gray-300">Oce your storage account is created:</p>
              <p className="text-gray-300">Go to your Storage Account</p>
              <ImageGallery images={getImages('image40')} />
              <p className="text-gray-300">Uder Data storage, click Containers → This is where your blobs live.</p>
              <p className="text-gray-300">Click ➕ Cotaier to create oe:</p>
              <p className="text-gray-300">Name: images, videos, or backups (any name)</p>
              <p className="text-gray-300">Public access level:</p>
              <p className="text-gray-300">Private (default) – Only you can access</p>
              <p className="text-gray-300">Blob (aoymous read) – Ayoe with the lik can read blobs</p>
              <p className="text-gray-300">Cotaier (public) – Everyoe can see cotets</p>
              <p className="text-gray-300">Click Create</p>
              <ImageGallery images={getImages('image41')} />
              <ImageGallery images={getImages('image42')} />
              <p className="text-gray-300">Uploand &amp; Manage Blobs</p>
              <p className="text-gray-300">Click your new container (e.g., images)</p>
              <p className="text-gray-300">Click Upload</p>
              <p className="text-gray-300">Choose a file from your computer (like a .jpg, .txt, or .mp4)</p>
              <p className="text-gray-300">Oce uploaded, you ca:</p>
              <p className="text-gray-300">View Properties (size, type, last modified)</p>
              <p className="text-gray-300">Get the URL to access the file</p>
              <p className="text-gray-300">Chage the access tier</p>
              <p className="text-gray-300">Storage Account</p>
              <p className="text-gray-300">└── DataLake Service</p>
              <p className="text-gray-300">└── Cotaier (like a folder)</p>
              <p className="text-gray-300">└── Blob (the actual file)</p>
              <ImageGallery images={getImages('image43')} />
              <ImageGallery images={getImages('image44')} />
              <ImageGallery images={getImages('image45')} />
              <p className="text-gray-300">Subfolder:</p>
              <ImageGallery images={getImages('image46')} />
              <ImageGallery images={getImages('image47')} />
              <p className="text-gray-300">Uploand file:</p>
              <ImageGallery images={getImages('image48')} />
              <ImageGallery images={getImages('image49')} />
              <ImageGallery images={getImages('image50')} />
              <ImageGallery images={getImages('image51')} />
              <p className="text-gray-300">Types of Blob Types:</p>
              <ImageGallery images={getImages('image48')} />
              <ImageGallery images={getImages('image28')} />
              <ImageGallery images={getImages('image29')} />
              <ImageGallery images={getImages('image52')} />
              <p className="text-gray-300">Blob Type</p>
              <p className="text-gray-300">Best For</p>
              <p className="text-gray-300">Example Use</p>
              <p className="text-gray-300">🧱 Block Blob</p>
              <p className="text-gray-300">Storing text or binary data</p>
              <p className="text-gray-300">Images, videos, documents, CSVs</p>
              <p className="text-gray-300">📜 Append Blob</p>
              <p className="text-gray-300">Data that is costatly added to (append-only)</p>
              <p className="text-gray-300">Logs, telemetry, audit data</p>
              <p className="text-gray-300">📄 Page Blob</p>
              <p className="text-gray-300">Radom read/write access</p>
              <p className="text-gray-300">Virtual machine disks (VHD files)</p>
              <p className="text-gray-300">🧱 1. Block Blob</p>
              <p className="text-gray-300">Most common blob type used in Azure.</p>
              <p className="text-gray-300">💡 What it is:</p>
              <p className="text-gray-300">Stores text and binary data (files like .txt, .jpg, .mp4, .csv, etc.)</p>
              <p className="text-gray-300">Data is split ito blocks, and each block is idetified by a block ID.</p>
              <p className="text-gray-300">You can uploand or update blocks individually and commit them together.</p>
              <p className="text-gray-300">✅ Use Cases:</p>
              <p className="text-gray-300">Storing images, videos, PDFs, and backups.</p>
              <p className="text-gray-300">Data files for analytics (CSV, JSON, Parquet).</p>
              <p className="text-gray-300">Large files uploaded i chuks.</p>
              <p className="text-gray-300">📘 Example:</p>
              <p className="text-gray-300">You uploand a 500 MB video file - Azure divides it ito smaller blocks and uploads each part separately for speed and reliability.</p>
              <p className="text-gray-300">📜 2. Append Blob</p>
              <p className="text-gray-300">Special type of blob for data that grows over time.</p>
              <p className="text-gray-300">💡 What it is:</p>
              <p className="text-gray-300">Optimized for append operations - you can only add new data to the end, not modify or delete existing data.</p>
              <p className="text-gray-300">Each time you add new information, it’s appended to the blob.</p>
              <p className="text-gray-300">✅ Use Cases:</p>
              <p className="text-gray-300">Storing long files.</p>
              <p className="text-gray-300">Applicatio telemetry or diagostics data.</p>
              <p className="text-gray-300">Streamig data that’s costatly beig added.</p>
              <p className="text-gray-300">📘 Example:</p>
              <p className="text-gray-300">You’re longgig website visit's. Each time a new visitor arrives, their data (timestamp, IP, etc.) is appended to the existing long file.</p>
              <p className="text-gray-300">📄 3. Page Blob</p>
              <p className="text-gray-300">Designed for random read/write operations.</p>
              <p className="text-gray-300">💡 What it is:</p>
              <p className="text-gray-300">Data is stored i fixed-size 512-byte pages.</p>
              <p className="text-gray-300">Allows fast read and write access to specific parts of the blob.</p>
              <p className="text-gray-300">Commonly used for storing Virtual Hard Disk (VHD) files that power Azure Virtual Machines.</p>
              <p className="text-gray-300">✅ Use Cases:</p>
              <p className="text-gray-300">Storing Azure VM disks (OS and data disks).</p>
              <p className="text-gray-300">Large databases that require random access.</p>
              <p className="text-gray-300">Ay workloand that reads/writes frequetly to specific sectios of a file.</p>
              <p className="text-gray-300">📘 Example:</p>
              <p className="text-gray-300">Whe you start a Azure Virtual Machine, it's disk (a .vhd file) is stored as a Page Blob, allowig the VM to quickly read or write data anywhere on the disk.</p>
              <p className="text-gray-300">Blob Type</p>
              <p className="text-gray-300">Struncture</p>
              <p className="text-gray-300">Read/Write Behavior</p>
              <p className="text-gray-300">Common Use</p>
              <p className="text-gray-300">Block Blob</p>
              <p className="text-gray-300">Data stored as blocks</p>
              <p className="text-gray-300">Upload/replace blocks</p>
              <p className="text-gray-300">Files, media, documents</p>
              <p className="text-gray-300">Append Blob</p>
              <p className="text-gray-300">Sequetially added blocks</p>
              <p className="text-gray-300">Append-only</p>
              <p className="text-gray-300">Logs, telemetry, streamig data</p>
              <p className="text-gray-300">Page Blob</p>
              <p className="text-gray-300">Fixed 512-byte pages</p>
              <p className="text-gray-300">Radom read/write</p>
              <p className="text-gray-300">VM disks, large databases</p>
              <p className="text-gray-300">Types of Access Tiers:</p>
              <p className="text-gray-300">Azure lets you store data i different tiers based on how ofte you eed it.This helps save moey 💰 by matchig storage cost to usage.</p>
              <p className="text-gray-300">Tier</p>
              <p className="text-gray-300">Cost</p>
              <p className="text-gray-300">Availability</p>
              <p className="text-gray-300">Best For</p>
              <p className="text-gray-300">Hot</p>
              <p className="text-gray-300">💰 Highest cost</p>
              <p className="text-gray-300">🔥 Alwanys available</p>
              <p className="text-gray-300">Frequetly accessed data (e.g., active apps, websites)</p>
              <p className="text-gray-300">Cool</p>
              <p className="text-gray-300">💸 Cheaper</p>
              <p className="text-gray-300">🕓 Slight delany in access</p>
              <p className="text-gray-300">Ifrequetly accessed data (e.g., mothly reports)</p>
              <p className="text-gray-300">Cold</p>
              <p className="text-gray-300">💧 Cheaper than Cool</p>
              <p className="text-gray-300">⏱️ Slower access</p>
              <p className="text-gray-300">Rarely accessed data but still retrievable</p>
              <p className="text-gray-300">Archive</p>
              <p className="text-gray-300">🧊 Cheapest</p>
              <p className="text-gray-300">💤 Retrieval takes hours</p>
              <p className="text-gray-300">Log-term backups, compliance storage</p>
              <ImageGallery images={getImages('image48')} />
              <ImageGallery images={getImages('image28')} />
              <ImageGallery images={getImages('image31')} />
              <ImageGallery images={getImages('image53')} />
              </div>
            </div>
          </div>
        </section>
        )}

        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-700">
          <button
            onClick={goToPreviousSection}
            disabled={!hasPrevious}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              hasPrevious
                ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 hover:border-gray-500'
                : 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed'
            }`}
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
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              hasNext
                ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 hover:border-gray-500'
                : 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed'
            }`}
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