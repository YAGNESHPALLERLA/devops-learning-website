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
  image1: { src: '/tutorials/azure/images/image1.png', width: 1658, height: 478, alt: 'Azure portal management groups cards' },
  image2: { src: '/tutorials/azure/images/image2.png', width: 1653, height: 839, alt: 'Azure hierarchy view screenshot' },
  image3: { src: '/tutorials/azure/images/image3.png', width: 1653, height: 463, alt: 'Azure subscriptions blade list' },
  image4: { src: '/tutorials/azure/images/image4.png', width: 1797, height: 606, alt: 'Diagram of management groups and subscriptions' },
  image5: { src: '/tutorials/azure/images/image5.png', width: 1666, height: 512, alt: 'Resource groups overview screen' },
  image6: { src: '/tutorials/azure/images/image6.png', width: 1648, height: 458, alt: 'Resource group resources list' },
  image7: { src: '/tutorials/azure/images/image7.png', width: 1663, height: 474, alt: 'Search for resource groups in Azure portal' },
  image8: { src: '/tutorials/azure/images/image8.png', width: 1641, height: 915, alt: 'Create resource group basics tab' },
  image9: { src: '/tutorials/azure/images/image9.png', width: 1622, height: 914, alt: 'Resource group creation form details' },
  image10: { src: '/tutorials/azure/images/image10.png', width: 784, height: 920, alt: 'Review and create page for resource group' },
  image11: { src: '/tutorials/azure/images/image11.png', width: 1638, height: 409, alt: 'Search storage accounts in Azure portal' },
  image12: { src: '/tutorials/azure/images/image12.png', width: 1665, height: 411, alt: 'Storage accounts list with create button' },
  image13: { src: '/tutorials/azure/images/image13.png', width: 1113, height: 923, alt: 'Storage account basics configuration' },
  image14: { src: '/tutorials/azure/images/image14.png', width: 1247, height: 911, alt: 'Subscription selection step' },
  image15: { src: '/tutorials/azure/images/image15.png', width: 1505, height: 671, alt: 'Choose resource group for storage account' },
  image16: { src: '/tutorials/azure/images/image16.png', width: 1661, height: 514, alt: 'Resource group showing created storage account' },
  image17: { src: '/tutorials/azure/images/image17.png', width: 1677, height: 904, alt: 'Azure storage services comparison graphic' },
  image18: { src: '/tutorials/azure/images/image18.png', width: 1659, height: 899, alt: 'Storage account overview blade' },
  image19: { src: '/tutorials/azure/images/image19.png', width: 1376, height: 657, alt: 'Containers tab inside storage account' },
  image20: { src: '/tutorials/azure/images/image20.png', width: 1665, height: 614, alt: 'Create container dialog' },
  image21: { src: '/tutorials/azure/images/image21.png', width: 1659, height: 544, alt: 'Container list after creation' },
  image22: { src: '/tutorials/azure/images/image22.png', width: 1918, height: 535, alt: 'Upload dialog for blobs' },
  image23: { src: '/tutorials/azure/images/image23.png', width: 1645, height: 591, alt: 'Blob container contents view' },
  image24: { src: '/tutorials/azure/images/image24.png', width: 1920, height: 600, alt: 'Blob properties panel' },
  image25: { src: '/tutorials/azure/images/image25.png', width: 1920, height: 870, alt: 'Change blob access tier dialog' },
  image26: { src: '/tutorials/azure/images/image26.png', width: 1920, height: 609, alt: 'Blob storage hierarchy diagram' },
  image27: { src: '/tutorials/azure/images/image27.png', width: 1668, height: 583, alt: 'Azure blob storage architecture graphic' },
  image28: { src: '/tutorials/azure/images/image28.png', width: 737, height: 584, alt: 'Blob types comparison table' },
  image29: { src: '/tutorials/azure/images/image29.png', width: 733, height: 859, alt: 'Block blob illustration' },
  image30: { src: '/tutorials/azure/images/image30.png', width: 1920, height: 535, alt: 'Block blob workflow diagram' },
  image31: { src: '/tutorials/azure/images/image31.png', width: 731, height: 860, alt: 'Append blob architecture diagram' },
  image32: { src: '/tutorials/azure/images/image32.png', width: 1920, height: 535, alt: 'Storage access tier comparison chart' },
  image33: { src: '/tutorials/azure/images/image33.png', width: 1669, height: 350, alt: 'Search storage accounts for ADLS' },
  image34: { src: '/tutorials/azure/images/image34.png', width: 1233, height: 920, alt: 'ADLS storage account basics tab' },
  image35: { src: '/tutorials/azure/images/image35.png', width: 1241, height: 916, alt: 'ADLS advanced settings screen' },
  image36: { src: '/tutorials/azure/images/image36.png', width: 1257, height: 914, alt: 'ADLS networking configuration' },
  image37: { src: '/tutorials/azure/images/image37.png', width: 1495, height: 617, alt: 'ADLS review and create screen' },
  image38: { src: '/tutorials/azure/images/image38.png', width: 1669, height: 650, alt: 'Resource group showing ADLS account' },
  image39: { src: '/tutorials/azure/images/image39.png', width: 1714, height: 915, alt: 'Data lake services comparison graphic' },
  image40: { src: '/tutorials/azure/images/image40.png', width: 1669, height: 913, alt: 'ADLS storage account overview' },
  image41: { src: '/tutorials/azure/images/image41.png', width: 1377, height: 618, alt: 'ADLS containers tab view' },
  image42: { src: '/tutorials/azure/images/image42.png', width: 1678, height: 546, alt: 'Create ADLS container modal' },
  image43: { src: '/tutorials/azure/images/image43.png', width: 1650, height: 550, alt: 'ADLS container list view' },
  image44: { src: '/tutorials/azure/images/image44.png', width: 1376, height: 621, alt: 'ADLS upload dialog' },
  image45: { src: '/tutorials/azure/images/image45.png', width: 1656, height: 536, alt: 'ADLS blob details view' },
  image46: { src: '/tutorials/azure/images/image46.png', width: 1914, height: 863, alt: 'ADLS folder structure screenshot' },
  image47: { src: '/tutorials/azure/images/image47.png', width: 1652, height: 573, alt: 'Create subfolder in ADLS container' },
  image48: { src: '/tutorials/azure/images/image48.png', width: 1920, height: 592, alt: 'ADLS file upload dialog' },
  image49: { src: '/tutorials/azure/images/image49.png', width: 1918, height: 763, alt: 'Select files to upload in ADLS' },
  image50: { src: '/tutorials/azure/images/image50.png', width: 1920, height: 567, alt: 'ADLS upload progress screen' },
  image51: { src: '/tutorials/azure/images/image51.png', width: 1669, height: 591, alt: 'ADLS uploaded file details' },
  image52: { src: '/tutorials/azure/images/image52.png', width: 1669, height: 591, alt: 'ADLS blob types comparison table' },
  image53: { src: '/tutorials/azure/images/image53.png', width: 1669, height: 591, alt: 'ADLS access tier comparison chart' },
  // Azure Databricks images
  image54: { src: '/tutorials/azure/images/image54.png', width: 1920, height: 1080, alt: 'Azure Databricks introduction' },
  image55: { src: '/tutorials/azure/images/image55.png', width: 1920, height: 1080, alt: 'Azure Databricks architecture' },
  image56: { src: '/tutorials/azure/images/image56.png', width: 1920, height: 1080, alt: 'Databricks use cases' },
  image57: { src: '/tutorials/azure/images/image57.png', width: 1920, height: 1080, alt: 'Core components' },
  image58: { src: '/tutorials/azure/images/image58.png', width: 1920, height: 1080, alt: 'Databricks advantages' },
  image59: { src: '/tutorials/azure/images/image59.png', width: 1920, height: 1080, alt: 'Databricks overview' },
  image60: { src: '/tutorials/azure/images/image60.png', width: 1920, height: 1080, alt: 'Create Azure Databricks workspace' },
  image61: { src: '/tutorials/azure/images/image61.png', width: 1920, height: 1080, alt: 'Databricks workspace' },
  image62: { src: '/tutorials/azure/images/image62.png', width: 1920, height: 1080, alt: 'Databricks features' },
  image63: { src: '/tutorials/azure/images/image63.png', width: 1920, height: 1080, alt: 'Databricks SQL overview' },
  image64: { src: '/tutorials/azure/images/image64.png', width: 1920, height: 1080, alt: 'SQL Editor' },
  image65: { src: '/tutorials/azure/images/image65.png', width: 1920, height: 1080, alt: 'Dashboards' },
  image66: { src: '/tutorials/azure/images/image66.png', width: 1920, height: 1080, alt: 'Genie AI assistant' },
  image67: { src: '/tutorials/azure/images/image67.png', width: 1920, height: 1080, alt: 'Alerts configuration' },
  image68: { src: '/tutorials/azure/images/image68.png', width: 1920, height: 1080, alt: 'Query history' },
  image69: { src: '/tutorials/azure/images/image69.png', width: 1920, height: 1080, alt: 'SQL Data Warehouse' },
  image70: { src: '/tutorials/azure/images/image70.png', width: 1920, height: 1080, alt: 'Azure Databricks image 70' },
  image71: { src: '/tutorials/azure/images/image71.png', width: 1920, height: 1080, alt: 'Azure Databricks image 71' },
  image72: { src: '/tutorials/azure/images/image72.png', width: 1920, height: 1080, alt: 'Azure Databricks image 72' },
  image73: { src: '/tutorials/azure/images/image73.png', width: 1920, height: 1080, alt: 'Azure Databricks image 73' },
  image74: { src: '/tutorials/azure/images/image74.png', width: 1920, height: 1080, alt: 'Azure Databricks image 74' },
  image75: { src: '/tutorials/azure/images/image75.png', width: 1920, height: 1080, alt: 'Azure Databricks image 75' },
  image76: { src: '/tutorials/azure/images/image76.png', width: 1920, height: 1080, alt: 'Azure Databricks image 76' },
  image77: { src: '/tutorials/azure/images/image77.png', width: 1920, height: 1080, alt: 'Azure Databricks image 77' },
  image78: { src: '/tutorials/azure/images/image78.png', width: 1920, height: 1080, alt: 'Azure Databricks image 78' },
  image79: { src: '/tutorials/azure/images/image79.png', width: 1920, height: 1080, alt: 'Azure Databricks image 79' },
  image80: { src: '/tutorials/azure/images/image80.png', width: 1920, height: 1080, alt: 'Azure Databricks image 80' },
  image81: { src: '/tutorials/azure/images/image81.png', width: 1920, height: 1080, alt: 'Azure Databricks image 81' },
  image82: { src: '/tutorials/azure/images/image82.png', width: 1920, height: 1080, alt: 'Azure Databricks image 82' },
  image83: { src: '/tutorials/azure/images/image83.png', width: 1920, height: 1080, alt: 'Azure Databricks image 83' },
  image84: { src: '/tutorials/azure/images/image84.png', width: 1920, height: 1080, alt: 'Azure Databricks image 84' }
};

const getImages = (...keys: (keyof typeof azureImages)[]): GalleryImage[] =>
  keys.map(key => azureImages[key]).filter(Boolean);

const PAGE_HEADINGS = [
  { id: 'azure-basics', title: 'Azure Basics' },
  { id: 'resource-group', title: 'Resource Group' },
  { id: 'azure-blob-storage', title: 'Azure Blob Storage' },
  { id: 'azure-data-lake', title: 'Azure Data Lake Storage Gen2' },
  { id: 'azure-databricks', title: 'Azure Databricks' },
  { id: 'databricks-sql', title: 'Databricks SQL' }
];

const SUBSECTION_PARENT: Record<string, string> = {
  'azure-hierarchy': 'azure-basics'
};

export default function AzureDataEngineerPage() {
  const [activeSection, setActiveSection] = useState('azure-basics');
  const [activeSubsection, setActiveSubsection] = useState<string | null>(null);
  const pageHeadings = PAGE_HEADINGS;

  // Custom setActiveSection that handles child items correctly
  const handleSetActiveSection = (sectionId: string) => {
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
      if (!hash) {
        setActiveSection('azure-basics');
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

  // Scroll to active section after it renders
  useEffect(() => {
    if (activeSection) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        const element = document.getElementById(activeSection);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (activeSubsection) {
          // Try scrolling to subsection if main section not found
          const subElement = document.getElementById(activeSubsection);
          if (subElement) {
            subElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 150);
    }
  }, [activeSection, activeSubsection]);

  // Get current section index for navigation
  const getCurrentSectionIndex = () => {
    return PAGE_HEADINGS.findIndex(heading => heading.id === activeSection);
  };

  // Navigation functions
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
    >
      <div className="min-h-screen">
        {/* Header */}
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
            Azure Data Engineer <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">Course</span>
          </h1>
          <p className="text-gray-400 text-xl">Master Azure data engineering, data pipelines, and cloud data solutions</p>
        </div>

        {/* Azure Basics Section */}
        {activeSection === 'azure-basics' && (
        <section
          id="azure-basics"
          className="mb-20 scroll-mt-24"
        >
          <h2 className="text-4xl font-bold text-white mb-8 border-l-4 border-red-500 pl-4">Azure Basics</h2>
          
          <div className="space-y-12">
            {/* Azure Hierarchy */}
            <div id="azure-hierarchy" className="bg-[#252525] rounded-xl p-8 border border-gray-600 scroll-mt-24">
              <h3 className="text-3xl font-bold text-white mb-6">1. Azure Hierarchy</h3>
              
              <div className="space-y-6">
                <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700">
                  <h4 className="text-2xl font-semibold text-white mb-4">1. Management Groups (The Top-Level)</h4>
                  <div className="space-y-3 text-gray-300">
                    <p><strong className="text-blue-400">What it is:</strong> This is the <strong>highest level</strong> of Azure's structure. It's like a <strong>parent folder</strong> that helps organize your entire Azure environment.</p>
                    <p><strong className="text-blue-400">Purpose:</strong> It helps you <strong>manage and organize multiple subscriptions</strong> across your organization. You can group subscriptions based on departments, teams, or projects.</p>
                    <p><strong className="text-blue-400">Example:</strong> Imagine a company with multiple divisions, like Finance, IT, and Marketing. You could have separate management groups for each of these divisions.</p>
                  </div>
                </div>

                <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700">
                  <h4 className="text-2xl font-semibold text-white mb-4">2. Subscriptions (Middle Layer)</h4>
                  <div className="space-y-3 text-gray-300">
                    <p><strong className="text-blue-400">What it is:</strong> Underneath management groups, you have <strong>subscriptions</strong>. A <strong>subscription</strong> is like a <strong>container</strong> for Azure resources, where you'll define limits on resources and billing.</p>
                    <p><strong className="text-blue-400">Purpose:</strong> It helps with organizing resources, managing access, and billing. You can have multiple subscriptions for different projects or teams. Each subscription has its own <strong>resource limits</strong> and <strong>billing</strong>.</p>
                    <p><strong className="text-blue-400">Example:</strong> If your company has different projects, like a website and an app, you could create separate subscriptions for them. One for the website, one for the app.</p>
                  </div>
                </div>

                <div id="resource-group-overview" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700">
                  <h4 className="text-2xl font-semibold text-white mb-4">3. Resource Groups (Sub-Containers)</h4>
                  <div className="space-y-3 text-gray-300">
                    <p><strong className="text-blue-400">What it is:</strong> Inside each subscription, you can have <strong>resource groups</strong>. These are containers that hold related resources.</p>
                    <p><strong className="text-blue-400">Purpose:</strong> They help organize resources based on their lifecycle and permissions. All the resources in a group are usually related to the same project or service.</p>
                    <p><strong className="text-blue-400">Example:</strong> If you're building a web app, you might have a resource group called <code className="bg-gray-800 px-2 py-1 rounded">rg-ohg365-dev</code> where you store everything related to the app, such as databases, storage accounts, and virtual machines.</p>
                  </div>
                </div>

                <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700">
                  <h4 className="text-2xl font-semibold text-white mb-4">4. Resources (The Actual Items)</h4>
                  <div className="space-y-3 text-gray-300">
                    <p><strong className="text-blue-400">What it is:</strong> These are the <strong>individual services</strong> or <strong>products</strong> that you create in Azure, like <strong>virtual machines (VMs)</strong>, <strong>storage accounts</strong>, <strong>databases</strong>, or <strong>networks</strong>.</p>
                    <p><strong className="text-blue-400">Purpose:</strong> This is where the actual work happens! Resources are the <strong>building blocks</strong> of your cloud environment.</p>
                    <p><strong className="text-blue-400">Example:</strong> In your <code className="bg-gray-800 px-2 py-1 rounded">rg-ohg365-dev</code> resource group, you could have resources like a VM to run your website, a database to store your data, and a storage account for storing files.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <h5 className="text-xl font-semibold text-white mb-3">Summary:</h5>
                <ul className="space-y-2 text-gray-300">
                  <li><strong className="text-blue-400">Management Groups:</strong> High-level containers for organizing multiple subscriptions.</li>
                  <li><strong className="text-blue-400">Subscriptions:</strong> They hold resources and manage access to resources.</li>
                  <li><strong className="text-blue-400">Resource Groups:</strong> Containers inside subscriptions to organize and manage resources by project or lifecycle.</li>
                  <li><strong className="text-blue-400">Resources:</strong> The actual services you use in Azure.</li>
                </ul>
              </div>

              <ImageGallery images={getImages('image1', 'image2', 'image3', 'image4', 'image5', 'image6')} />
            </div>
          </div>
        </section>
        )}

        {/* Resource Group */}
        {activeSection === 'resource-group' && (
        <section
          id="resource-group"
          className="bg-[#252525] rounded-xl p-8 border border-gray-600 scroll-mt-24 mb-20"
        >
          <h3 className="text-3xl font-bold text-white mb-6">2. Resource Group</h3>
          
          <div className="space-y-6">
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700">
              <h4 className="text-2xl font-semibold text-white mb-4">2.1 What is a Resource Group?</h4>
              <p className="text-gray-300 mb-4">A <strong className="text-blue-400">Resource Group</strong> in Azure is like a <strong>folder</strong> that holds all the resources (services) related to a project or app.</p>
              <p className="text-gray-300 mb-4">For example: If you build a website, you might have:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
                <li>A <strong>Virtual Machine (VM)</strong> for the web server</li>
                <li>A <strong>Storage Account</strong> for images</li>
                <li>A <strong>Database</strong> for user data</li>
              </ul>
              <p className="text-gray-300 mt-4">You can put all of these inside <strong>one Resource Group</strong> — making it easier to manage, monitor, and delete them together.</p>
            </div>

            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700">
              <h4 className="text-2xl font-semibold text-white mb-4">2.2 Create a Resource Group</h4>
              <div className="space-y-4 text-gray-300">
                <ol className="list-decimal list-inside space-y-3 ml-2">
                  <li>Sign in to the Azure Portal</li>
                  <li>In the <strong>search</strong> menu, <strong>search</strong> for <strong>Resource groups</strong>.</li>
                  <li>Click on the resource group and click on the create button</li>
                </ol>

                <ImageGallery images={getImages('image5')} />
                
                <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Overview of resource group:</h5>
                  <p className="text-gray-300 mb-2"><strong>Name: rg-ohg365-dev</strong> → This is your Resource Group's name. Usually, names include clues about the project or environment:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
                    <li><code className="bg-gray-900 px-1 rounded">rg</code> = Resource Group</li>
                    <li><code className="bg-gray-900 px-1 rounded">ohg365</code> = Project or team name</li>
                    <li><code className="bg-gray-900 px-1 rounded">dev</code> = Environment (like dev, test, or prod)</li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h5 className="text-xl font-semibold text-white mb-3">Buttons:</h5>
                  <ul className="space-y-2 text-gray-300">
                    <li><span className="text-xl">➕</span> <strong>Create:</strong> Add new Azure resources (like VMs, storage, databases).</li>
                    <li><span className="text-xl">⚙️</span> <strong>Manage view:</strong> Customize how your resources list looks.</li>
                    <li><span className="text-xl">🗑️</span> <strong>Delete resource group:</strong> Deletes the entire group and all its resources (be careful!).</li>
                    <li><span className="text-xl">🔁</span> <strong>Refresh:</strong> Updates the view if new resources were added.</li>
                    <li><span className="text-xl">📤</span> <strong>Export to CSV:</strong> Export your resource details (helpful for reports).</li>
                    <li><span className="text-xl">📊</span> <strong>Open query:</strong> Create or run custom filters using Azure Resource Graph.</li>
                  </ul>
                </div>
              </div>
            </div>

            <ImageGallery images={getImages('image7', 'image8', 'image9', 'image10', 'image6')} />
          </div>
        </section>
        )}

        {/* Azure Blob Storage */}
        {activeSection === 'azure-blob-storage' && (
        <section
          id="azure-blob-storage"
          className="bg-[#252525] rounded-xl p-8 border border-gray-600 scroll-mt-24 mb-20"
        >
          <h3 className="text-3xl font-bold text-white mb-6">3. Azure Blob Storage</h3>
          
          <p className="text-gray-300 mb-6 text-lg">
            Azure Blob Storage is Microsoft's cloud-based service designed to store large amounts of data of various types — including structured, semi-structured, and unstructured data.
          </p>
          <p className="text-gray-300 mb-6">
            It is ideal for storing files such as CSV, text, Excel, JSON, Parquet, Avro, XML, images, videos, backups, and logs.
          </p>
          <p className="text-gray-300 mb-6">
            The term "Blob" stands for <strong className="text-blue-400">Binary Large Object</strong>, meaning it can store any type of binary data. Blob Storage provides a flat namespace, meaning all files (blobs) are stored in containers within a storage account, rather than in a traditional hierarchical folder system.
          </p>

          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6 mb-6">
            <p className="text-white font-semibold mb-3">Azure Blob Storage is highly scalable, secure, and cost-efficient, making it suitable for:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Storing and serving large files (media, documents, etc.)</li>
              <li>Data lakes and analytics workloads</li>
              <li>Backup and disaster recovery</li>
              <li>Archiving and compliance storage</li>
            </ul>
          </div>

          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 mb-6">
            <h4 className="text-2xl font-semibold text-white mb-4">3.1 Create an Azure Blob Storage</h4>
            <div className="space-y-4 text-gray-300">
              <ol className="list-decimal list-inside space-y-3 ml-2">
                <li>Go to Azure Portal</li>
                <li>In the search bar, type "Storage Accounts" or "blob"</li>
                <li>Click on storage accounts and click on create button</li>
                <li>Click "Review + Create"</li>
              </ol>

              <ImageGallery images={getImages('image11', 'image12', 'image13')} />

              <div className="mt-6 space-y-6">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-lg font-semibold text-white mb-2">1️⃣ Subscription</h5>
                  <p className="mb-2">This is where you choose which Azure Subscription will own this storage account.</p>
                  <p>A subscription is linked to your billing and access control.</p>
                  <p className="mt-2 text-blue-400">Example: You might have separate subscriptions for development, testing, or production environments.</p>
                  <p className="text-blue-300">🟦 You selected: Azure subscription 1</p>
                </div>

                <ImageGallery images={getImages('image14')} />

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-lg font-semibold text-white mb-2">2️⃣ Resource Group</h5>
                  <p className="mb-2">Choose or create a Resource Group to organize related Azure resources.</p>
                  <p className="mb-2">Resource Groups act like folders — all your related resources (VMs, storage, databases) are stored here for easy management.</p>
                  <p className="text-blue-300">🟦 In your case, you selected rg-ohg365-dev, which is perfect for development resources.</p>
                  <p className="mt-2 text-blue-400">💡 Tip: Keeping related resources in the same group helps you track cost, permissions, and manage everything easily.</p>
                </div>

                <ImageGallery images={getImages('image15')} />

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-lg font-semibold text-white mb-2">3️⃣ Storage Account Name</h5>
                  <p className="mb-2">This is the unique name for your storage account (like a domain name).</p>
                  <p className="mb-2">It must be globally unique, lowercase, and 3–24 characters long.</p>
                  <p>This name will form part of the URL to access your data.</p>
                  <p className="mt-2 text-blue-400">🧩 Example: If your name is blobohg365dev</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-lg font-semibold text-white mb-2">4️⃣ Preferred Storage Type</h5>
                  <p className="mb-2">Select what kind of storage service you want to enable.</p>
                  <p className="mb-2">The default (and most common) option is: <strong>Azure Blob Storage or Azure Data Lake Storage Gen2</strong></p>
                  <p className="mb-2">🧠 This means your account will support:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Blob storage (for files, media, etc.)</li>
                    <li>Data Lake capabilities (for analytics and big data processing)</li>
                  </ul>
                  <p className="mt-2 text-blue-400">🟦 Tip: Keep this as default unless you have a specific need for file shares or queue services.</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-lg font-semibold text-white mb-2">5️⃣ Performance & Redundancy Settings</h5>
                  <div className="mb-4">
                    <p className="font-semibold mb-2">⚙️ Performance:</p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li><strong>Standard:</strong> Uses HDD-based storage — cheaper, good for general use.</li>
                      <li><strong>Premium:</strong> Uses SSD-based storage — faster, ideal for workloads needing low latency (like databases or VMs).</li>
                    </ul>
                    <p className="mt-2 text-blue-300">🟦 You selected: Standard (recommended)</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">🧭 Redundancy:</p>
                    <p className="mb-3">Defines how Azure will replicate your data to keep it safe.</p>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-600">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-2 text-left">Option</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Meaning</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Copies of Data</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>LRS</strong> (Locally-redundant storage)</td>
                            <td className="border border-gray-600 px-4 py-2">Keeps 3 copies in one data center</td>
                            <td className="border border-gray-600 px-4 py-2">3</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>ZRS</strong> (Zone-redundant storage)</td>
                            <td className="border border-gray-600 px-4 py-2">Copies across 3 availability zones in the same region</td>
                            <td className="border border-gray-600 px-4 py-2">3</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>GRS</strong> (Geo-redundant storage)</td>
                            <td className="border border-gray-600 px-4 py-2">Copies data to another region (for disaster recovery)</td>
                            <td className="border border-gray-600 px-4 py-2">6</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>RA-GRS</strong> (Read-access Geo-redundant)</td>
                            <td className="border border-gray-600 px-4 py-2">Same as GRS but allows read access to secondary region</td>
                            <td className="border border-gray-600 px-4 py-2">6</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="mt-3 text-blue-300">🟦 You selected: LRS (best for development/testing)</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <p className="font-semibold">Click on create</p>
                <p className="font-semibold">Navigate to Your Resource Group</p>
                <ol className="list-decimal list-inside space-y-2 ml-2">
                  <li>In the left-hand menu, click on <strong>Resource groups</strong></li>
                  <li>Find and click your resource group — in your case: 👉 <code className="bg-gray-800 px-2 py-1 rounded">rg-ohg365-dev</code></li>
                </ol>
                <p className="font-semibold mt-4">Check for the Storage Account</p>
                <p className="mb-2">Inside the <strong>Overview</strong> tab of your resource group, you'll see a list of all resources.</p>
                <p className="mb-2">Look for an item that looks like this: <strong>Type:</strong> Storage account <strong>Name:</strong> blobohg365dev (or whatever name you used)</p>
                <p className="text-green-400">If it appears there, 🎉 congratulations — your Blob Storage account has been successfully created</p>
              </div>

              <ImageGallery images={getImages('image16')} />
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 mb-6">
            <h4 className="text-2xl font-semibold text-white mb-4">3.2 Types of Azure Storage Services</h4>
            <p className="text-gray-300 mb-4">Azure Storage provides <strong>four main types of services</strong> under one <strong>Storage Account</strong>.</p>
            
            <div className="space-y-6">
              <div className="p-4 bg-gray-800 rounded-lg">
                <h5 className="text-xl font-semibold text-white mb-3">1️⃣ Blob Service</h5>
                <p className="text-gray-300 mb-2">🧱 Used to store unstructured or semi-structured data like files, images, videos, logs, and backups.</p>
                <div className="mb-3">
                  <p className="font-semibold text-blue-400 mb-2">🔹 Description:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
                    <li>Stores data as <strong>Blobs (Binary Large Objects)</strong> inside <strong>containers</strong>.</li>
                    <li>Best for storing <strong>flat files</strong> and <strong>large objects</strong> that don't fit in a database.</li>
                    <li>Data can be text, binary, documents, media, or backups.</li>
                  </ul>
                </div>
                <div className="mb-3">
                  <p className="font-semibold text-blue-400 mb-2">💾 Example Uses:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
                    <li>Storing images or videos for websites</li>
                    <li>Backups and archives</li>
                    <li>Data lake for analytics</li>
                    <li>Hosting static websites</li>
                  </ul>
                </div>
                <p className="text-blue-400">📦 Example Scenario: You have millions of IoT sensors sending temperature data — you can store this efficiently in <strong>Azure Table Storage</strong>.</p>
              </div>

              <div className="p-4 bg-gray-800 rounded-lg">
                <h5 className="text-xl font-semibold text-white mb-3">2️⃣ File Service</h5>
                <p className="text-gray-300 mb-2">📁 Used for shared file storage that behaves like a traditional file server.</p>
                <div className="mb-3">
                  <p className="font-semibold text-blue-400 mb-2">🔹 Description:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
                    <li>Provides <strong>Azure Files</strong>, a fully managed <strong>file share</strong> in the cloud.</li>
                    <li>Uses the <strong>SMB (Server Message Block)</strong> or <strong>NFS (Network File System)</strong> protocols — the same used by on-premises file servers.</li>
                    <li>Can be <strong>mounted</strong> to Windows, Linux, or macOS systems.</li>
                  </ul>
                </div>
                <div className="mb-3">
                  <p className="font-semibold text-blue-400 mb-2">💾 Example Uses:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
                    <li>Shared network drives for teams</li>
                    <li>"Lift and shift" of on-premises file servers</li>
                    <li>Application configurations shared across multiple VMs</li>
                  </ul>
                </div>
                <p className="text-blue-400">📦 Example Scenario: You have multiple virtual machines needing access to the same configuration files — you can store those files in <strong>Azure Files</strong> and mount them just like a shared folder.</p>
              </div>

              <div className="p-4 bg-gray-800 rounded-lg">
                <h5 className="text-xl font-semibold text-white mb-3">3️⃣ Queue Service</h5>
                <p className="text-gray-300 mb-2">📬 Used for reliable messaging between application components.</p>
                <div className="mb-3">
                  <p className="font-semibold text-blue-400 mb-2">🔹 Description:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
                    <li>Provides <strong>asynchronous communication</strong> between services using message queues.</li>
                    <li>Stores messages in a <strong>queue</strong>, which can be processed later by background services or workers.</li>
                    <li>Ensures messages are <strong>delivered at least once</strong> and processed in <strong>FIFO (First-In, First-Out)</strong> order.</li>
                  </ul>
                </div>
                <div className="mb-3">
                  <p className="font-semibold text-blue-400 mb-2">💾 Example Uses:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
                    <li>Sending background jobs (like image processing or email sending)</li>
                    <li>Decoupling app components for scalability</li>
                    <li>Event-driven architecture</li>
                  </ul>
                </div>
                <p className="text-blue-400">📦 Example Scenario: A web app uploads an image → sends a message to a <strong>queue</strong> → a background process picks it up and resizes the image.</p>
              </div>

              <div className="p-4 bg-gray-800 rounded-lg">
                <h5 className="text-xl font-semibold text-white mb-3">4️⃣ Table Service</h5>
                <p className="text-gray-300 mb-2">🧮 Used to store large amounts of structured, non-relational data.</p>
                <div className="mb-3">
                  <p className="font-semibold text-blue-400 mb-2">🔹 Description:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
                    <li>Provides <strong>NoSQL key-value storage</strong>.</li>
                    <li>Stores data in <strong>tables</strong> with <strong>entities (rows)</strong> and <strong>properties (columns)</strong>.</li>
                    <li>Flexible schema — you can add or remove columns anytime.</li>
                  </ul>
                </div>
                <div className="mb-3">
                  <p className="font-semibold text-blue-400 mb-2">💾 Example Uses:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
                    <li>Storing user profiles, IoT data, or metadata</li>
                    <li>Fast lookups by key</li>
                    <li>Lightweight applications needing scalable, cheap storage</li>
                  </ul>
                </div>
                <p className="text-blue-400">📦 Example Scenario: You have millions of IoT sensors sending temperature data — you can store this efficiently in <strong>Azure Table Storage</strong>.</p>
              </div>
            </div>

            <ImageGallery images={getImages('image17')} />

            <div className="mt-6 overflow-x-auto">
              <h5 className="text-xl font-semibold text-white mb-4">🧠 Summary Table</h5>
              <table className="min-w-full border border-gray-600">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="border border-gray-600 px-4 py-2 text-left">Storage Service</th>
                    <th className="border border-gray-600 px-4 py-2 text-left">Type of Data</th>
                    <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                    <th className="border border-gray-600 px-4 py-2 text-left">Example Use Case</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr>
                    <td className="border border-gray-600 px-4 py-2"><strong>Blob Service</strong></td>
                    <td className="border border-gray-600 px-4 py-2">Unstructured / Semi-structured</td>
                    <td className="border border-gray-600 px-4 py-2">Stores large objects (files, media, backups)</td>
                    <td className="border border-gray-600 px-4 py-2">Images, videos, logs</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 px-4 py-2"><strong>File Service</strong></td>
                    <td className="border border-gray-600 px-4 py-2">File-based</td>
                    <td className="border border-gray-600 px-4 py-2">Shared file storage via SMB/NFS</td>
                    <td className="border border-gray-600 px-4 py-2">Shared drives, app configs</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 px-4 py-2"><strong>Queue Service</strong></td>
                    <td className="border border-gray-600 px-4 py-2">Messaging</td>
                    <td className="border border-gray-600 px-4 py-2">Message-based communication between components</td>
                    <td className="border border-gray-600 px-4 py-2">Background tasks, event processing</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 px-4 py-2"><strong>Table Service</strong></td>
                    <td className="border border-gray-600 px-4 py-2">Structured (NoSQL)</td>
                    <td className="border border-gray-600 px-4 py-2">Key-value, schema-less table storage</td>
                    <td className="border border-gray-600 px-4 py-2">User profiles, IoT data</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 mb-6">
            <h4 className="text-2xl font-semibold text-white mb-4">Explore Blob Service</h4>
            <div className="space-y-4 text-gray-300">
              <p className="font-semibold">Once your storage account is created:</p>
              <ol className="list-decimal list-inside space-y-3 ml-2">
                <li>Go to your <strong>Storage Account</strong></li>
                <li>Under <strong>Data storage</strong>, click <strong>Containers</strong> → This is where your blobs live.</li>
                <li>Click <strong>➕ Container</strong> to create one:
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li><strong>Name:</strong> images, videos, or backups (any name)</li>
                    <li><strong>Public access level:</strong>
                      <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                        <li><strong>Private (default)</strong> – Only you can access</li>
                        <li><strong>Blob (anonymous read)</strong> – Anyone with the link can read blobs</li>
                        <li><strong>Container (public)</strong> – Everyone can see contents</li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>Click <strong>Create</strong></li>
              </ol>

              <ImageGallery images={getImages('image18', 'image19', 'image20')} />

              <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                <h5 className="text-xl font-semibold text-white mb-3">Upload & Manage Blobs</h5>
                <ol className="list-decimal list-inside space-y-2 ml-2">
                  <li>Click your new container (e.g., images)</li>
                  <li>Click <strong>Upload</strong></li>
                  <li>Choose a file from your computer (like a .jpg, .txt, or .mp4)</li>
                </ol>
                <p className="mt-4">Once uploaded, you can:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>View <strong>Properties</strong> (size, type, last modified)</li>
                  <li>Get the <strong>URL</strong> to access the file</li>
                  <li>Change the <strong>access tier</strong></li>
                </ul>

                <ImageGallery images={getImages('image21', 'image22', 'image23', 'image24', 'image25', 'image26', 'image27')} />
              </div>

              <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <pre className="text-gray-300 font-mono text-sm">
{`Storage Account
   └── Blob Service
        └── Container (like a folder)
             └── Blob (the actual file)`}
                </pre>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 mb-6">
            <h4 className="text-2xl font-semibold text-white mb-4">Types of Blob Types</h4>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border border-gray-600">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="border border-gray-600 px-4 py-2 text-left">Blob Type</th>
                    <th className="border border-gray-600 px-4 py-2 text-left">Best For</th>
                    <th className="border border-gray-600 px-4 py-2 text-left">Example Use</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr>
                    <td className="border border-gray-600 px-4 py-2">🧱 <strong>Block Blob</strong></td>
                    <td className="border border-gray-600 px-4 py-2">Storing text or binary data</td>
                    <td className="border border-gray-600 px-4 py-2">Images, videos, documents, CSVs</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 px-4 py-2">📜 <strong>Append Blob</strong></td>
                    <td className="border border-gray-600 px-4 py-2">Data that is constantly added to (append-only)</td>
                    <td className="border border-gray-600 px-4 py-2">Logs, telemetry, audit data</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 px-4 py-2">📄 <strong>Page Blob</strong></td>
                    <td className="border border-gray-600 px-4 py-2">Random read/write access</td>
                    <td className="border border-gray-600 px-4 py-2">Virtual machine disks (VHD files)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-gray-800 rounded-lg">
                <h5 className="text-xl font-semibold text-white mb-3">🧱 1. Block Blob</h5>
                <p className="text-gray-300 mb-2">Most common blob type used in Azure.</p>
                <div className="mb-3">
                  <p className="font-semibold text-blue-400 mb-2">💡 What it is:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
                    <li>Stores <strong>text</strong> and <strong>binary</strong> data (files like .txt, .jpg, .mp4, .csv, etc.)</li>
                    <li>Data is split into <strong>blocks</strong>, and each block is identified by a block ID.</li>
                    <li>You can upload or update blocks individually and commit them together.</li>
                  </ul>
                </div>
                <div className="mb-3">
                  <p className="font-semibold text-blue-400 mb-2">✅ Use Cases:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
                    <li>Storing images, videos, PDFs, and backups.</li>
                    <li>Data files for analytics (CSV, JSON, Parquet).</li>
                    <li>Large files uploaded in chunks.</li>
                  </ul>
                </div>
                <p className="text-blue-400">📘 Example: You upload a 500 MB video file — Azure divides it into smaller <strong>blocks</strong> and uploads each part separately for speed and reliability.</p>
              </div>

              <div className="p-4 bg-gray-800 rounded-lg">
                <h5 className="text-xl font-semibold text-white mb-3">📜 2. Append Blob</h5>
                <p className="text-gray-300 mb-2">Special type of blob for data that grows over time.</p>
                <div className="mb-3">
                  <p className="font-semibold text-blue-400 mb-2">💡 What it is:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
                    <li>Optimized for <strong>append operations</strong> — you can only add new data to the end, not modify or delete existing data.</li>
                    <li>Each time you add new information, it's appended to the blob.</li>
                  </ul>
                </div>
                <div className="mb-3">
                  <p className="font-semibold text-blue-400 mb-2">✅ Use Cases:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
                    <li>Storing log files.</li>
                    <li>Application telemetry or diagnostics data.</li>
                    <li>Streaming data that's constantly being added.</li>
                  </ul>
                </div>
                <p className="text-blue-400">📘 Example: You're logging website visits. Each time a new visitor arrives, their data (timestamp, IP, etc.) is appended to the existing log file.</p>
              </div>

              <div className="p-4 bg-gray-800 rounded-lg">
                <h5 className="text-xl font-semibold text-white mb-3">📄 3. Page Blob</h5>
                <p className="text-gray-300 mb-2">Designed for random read/write operations.</p>
                <div className="mb-3">
                  <p className="font-semibold text-blue-400 mb-2">💡 What it is:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
                    <li>Data is stored in <strong>fixed-size 512-byte pages</strong>.</li>
                    <li>Allows <strong>fast read and write access</strong> to specific parts of the blob.</li>
                    <li>Commonly used for storing <strong>Virtual Hard Disk (VHD)</strong> files that power Azure Virtual Machines.</li>
                  </ul>
                </div>
                <div className="mb-3">
                  <p className="font-semibold text-blue-400 mb-2">✅ Use Cases:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
                    <li>Storing Azure VM disks (OS and data disks).</li>
                    <li>Large databases that require random access.</li>
                    <li>Any workload that reads/writes frequently to specific sections of a file.</li>
                  </ul>
                </div>
                <p className="text-blue-400">📘 Example: When you start an Azure Virtual Machine, its disk (a .vhd file) is stored as a <strong>Page Blob</strong>, allowing the VM to quickly read or write data anywhere on the disk.</p>
              </div>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full border border-gray-600">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="border border-gray-600 px-4 py-2 text-left">Blob Type</th>
                    <th className="border border-gray-600 px-4 py-2 text-left">Structure</th>
                    <th className="border border-gray-600 px-4 py-2 text-left">Read/Write Behavior</th>
                    <th className="border border-gray-600 px-4 py-2 text-left">Common Use</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr>
                    <td className="border border-gray-600 px-4 py-2"><strong>Block Blob</strong></td>
                    <td className="border border-gray-600 px-4 py-2">Data stored as blocks</td>
                    <td className="border border-gray-600 px-4 py-2">Upload/replace blocks</td>
                    <td className="border border-gray-600 px-4 py-2">Files, media, documents</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 px-4 py-2"><strong>Append Blob</strong></td>
                    <td className="border border-gray-600 px-4 py-2">Sequentially added blocks</td>
                    <td className="border border-gray-600 px-4 py-2">Append-only</td>
                    <td className="border border-gray-600 px-4 py-2">Logs, telemetry, streaming data</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 px-4 py-2"><strong>Page Blob</strong></td>
                    <td className="border border-gray-600 px-4 py-2">Fixed 512-byte pages</td>
                    <td className="border border-gray-600 px-4 py-2">Random read/write</td>
                    <td className="border border-gray-600 px-4 py-2">VM disks, large databases</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700">
            <h4 className="text-2xl font-semibold text-white mb-4">Types of Access Tiers</h4>
            <p className="text-gray-300 mb-4">Azure lets you store data in <strong>different tiers</strong> based on how often you need it. This helps <strong>save money</strong> 💰 by matching storage cost to usage.</p>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-600">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="border border-gray-600 px-4 py-2 text-left">Tier</th>
                    <th className="border border-gray-600 px-4 py-2 text-left">Cost</th>
                    <th className="border border-gray-600 px-4 py-2 text-left">Availability</th>
                    <th className="border border-gray-600 px-4 py-2 text-left">Best For</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr>
                    <td className="border border-gray-600 px-4 py-2"><strong>Hot</strong></td>
                    <td className="border border-gray-600 px-4 py-2">💰 Highest cost</td>
                    <td className="border border-gray-600 px-4 py-2">🔥 Always available</td>
                    <td className="border border-gray-600 px-4 py-2">Frequently accessed data (e.g., active apps, websites)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 px-4 py-2"><strong>Cool</strong></td>
                    <td className="border border-gray-600 px-4 py-2">💸 Cheaper</td>
                    <td className="border border-gray-600 px-4 py-2">🕓 Slight delay in access</td>
                    <td className="border border-gray-600 px-4 py-2">Infrequently accessed data (e.g., monthly reports)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 px-4 py-2"><strong>Cold</strong></td>
                    <td className="border border-gray-600 px-4 py-2">💧 Cheaper than Cool</td>
                    <td className="border border-gray-600 px-4 py-2">⏱️ Slower access</td>
                    <td className="border border-gray-600 px-4 py-2">Rarely accessed data but still retrievable</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 px-4 py-2"><strong>Archive</strong></td>
                    <td className="border border-gray-600 px-4 py-2">🧊 Cheapest</td>
                    <td className="border border-gray-600 px-4 py-2">💤 Retrieval takes hours</td>
                    <td className="border border-gray-600 px-4 py-2">Long-term backups, compliance storage</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        )}

        {/* Azure Data Lake Storage Gen2 */}
        {activeSection === 'azure-data-lake' && (
        <section
          id="azure-data-lake"
          className="bg-[#252525] rounded-xl p-8 border border-gray-600 scroll-mt-24 mb-20"
        >
          <h3 className="text-3xl font-bold text-white mb-6">4. Azure Data Lake Storage Gen2 (ADLS Gen2)</h3>
          
          <p className="text-gray-300 mb-6 text-lg">
            Azure Data Lake Storage Gen2 is a highly scalable and secure <strong>cloud storage service optimized for big data analytics</strong> and data lakes. It builds on Azure Blob Storage capabilities but adds <strong>file system semantics, hierarchical namespaces, and enhanced performance</strong> for analytics workloads.
          </p>
          <p className="text-gray-300 mb-6">
            ADLS Gen2 is designed to store massive volumes of <strong>structured, semi-structured, and unstructured data</strong>, making it ideal for big data and machine learning scenarios.
          </p>

          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6 mb-6">
            <h5 className="text-xl font-semibold text-white mb-3">Key Features and Use Cases:</h5>
            <ul className="space-y-2 text-gray-300">
              <li><strong className="text-blue-400">Hierarchical Namespace:</strong> Unlike traditional Blob Storage, ADLS Gen2 supports folders and directories, enabling efficient organization and faster file operations at scale.</li>
              <li><strong className="text-blue-400">Optimized for Analytics:</strong> Supports Hadoop Distributed File System (HDFS) and integrates seamlessly with analytics frameworks like Azure Databricks, HDInsight, and Azure Synapse Analytics.</li>
              <li><strong className="text-blue-400">Supports Multiple Data Types:</strong> You can store CSV, JSON, Parquet, Avro, ORC, images, videos, logs, backups, and more.</li>
              <li><strong className="text-blue-400">Security and Compliance:</strong> Provides enterprise-grade security with Azure Active Directory integration, role-based access control (RBAC), and encryption at rest and in transit.</li>
              <li><strong className="text-blue-400">Cost-effective and Scalable:</strong> Automatically scales to handle petabytes of data and millions of files with optimized storage tiers and pricing options.</li>
            </ul>
          </div>

          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6 mb-6">
            <h5 className="text-xl font-semibold text-white mb-3">Common Uses of ADLS Gen2:</h5>
            <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
              <li>Building <strong>data lakes</strong> for big data analytics and machine learning.</li>
              <li>Storing large datasets for <strong>ETL (Extract, Transform, Load)</strong> processes.</li>
              <li>Integrating with analytics tools to perform complex queries and transformations.</li>
              <li>Secure and compliant <strong>storage for sensitive data</strong> and audit logs.</li>
              <li>Archiving and long-term data retention with tiered storage options.</li>
            </ul>
          </div>

          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700">
            <h4 className="text-2xl font-semibold text-white mb-4">4.1 Create an Azure Data Lake Storage</h4>
            <div className="space-y-4 text-gray-300">
              <ol className="list-decimal list-inside space-y-3 ml-2">
                <li>Go to Azure Portal</li>
                <li>In the search bar, type "Storage Accounts" or "ADLS Gen2"</li>
                <li>Click on storage accounts and click on create button</li>
                <li>Fill required details</li>
              </ol>
              <div className="mt-6 space-y-3">
                <p className="font-semibold">Navigate to Your Resource Group</p>
                <ol className="list-decimal list-inside space-y-2 ml-2">
                  <li>In the left-hand menu, click on <strong>Resource groups</strong></li>
                  <li>Find and click your resource group — in your case: 👉 <code className="bg-gray-800 px-2 py-1 rounded">rg-ohg365-dev</code></li>
                </ol>
                <p className="font-semibold mt-4">Check for the Storage Account</p>
                <p className="mb-2">Inside the <strong>Overview</strong> tab of your resource group, you'll see a list of all resources.</p>
                <p className="mb-2">Look for an item that looks like this: <strong>Type:</strong> Storage account <strong>Name:</strong> adlsohg365dev (or whatever name you used)</p>
                <p className="text-green-400">If it appears there, 🎉 congratulations — your ADLS Gen2 Storage account has been successfully created</p>
              </div>
              <ImageGallery images={getImages('image33', 'image34', 'image35', 'image36', 'image37', 'image38')} />
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 mt-6">
            <h4 className="text-2xl font-semibold text-white mb-4">3.2 Types of Azure Storage Services</h4>
            <p className="text-gray-300 mb-4">Azure Storage provides <strong>four main types of services</strong> under one <strong>Storage Account</strong>.</p>
            
            <div className="space-y-6">
              <div className="p-4 bg-gray-800 rounded-lg">
                <h5 className="text-xl font-semibold text-white mb-3">1️⃣ Data Lake Storage</h5>
                <p className="text-gray-300 mb-2">🧱 <strong>Purpose:</strong> Designed to store large volumes of unstructured or semi-structured data such as files, images, videos, logs, and backups.</p>
                <div className="mb-3">
                  <p className="font-semibold text-blue-400 mb-2">🔹 Key Features:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
                    <li>Data is stored as Blobs (Binary Large Objects) within containers.</li>
                    <li>Ideal for storing large, raw data that doesn't fit into traditional databases.</li>
                    <li>Supports various formats: text, binary, documents, media, and backups.</li>
                  </ul>
                </div>
                <div className="mb-3">
                  <p className="font-semibold text-blue-400 mb-2">💾 Common Use Cases:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-300 ml-4">
                    <li>Hosting media content like images and videos for websites.</li>
                    <li>Long-term storage for backups and archival data.</li>
                    <li>Centralized data lake for analytics and big data processing.</li>
                    <li>Hosting static websites.</li>
                  </ul>
                </div>
                <p className="text-blue-400">📦 Supported File Types: .txt, .csv, .json, .xml, .jpg, .mp4, .zip, .bak, and more.</p>
              </div>

              <ImageGallery images={getImages('image39')} />

              {/* File Service, Queue Service, Table Service sections remain similar to above */}
            </div>

            <div className="mt-6 overflow-x-auto">
              <h5 className="text-xl font-semibold text-white mb-4">🧠 Summary Table</h5>
              <table className="min-w-full border border-gray-600">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="border border-gray-600 px-4 py-2 text-left">Datalake Service</th>
                    <th className="border border-gray-600 px-4 py-2 text-left">Type of Data</th>
                    <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                    <th className="border border-gray-600 px-4 py-2 text-left">Example Use Case</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr>
                    <td className="border border-gray-600 px-4 py-2"><strong>Blob Service</strong></td>
                    <td className="border border-gray-600 px-4 py-2">Unstructured / Semi-structured</td>
                    <td className="border border-gray-600 px-4 py-2">Stores large objects (files, media, backups)</td>
                    <td className="border border-gray-600 px-4 py-2">Images, videos, logs</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 px-4 py-2"><strong>File Service</strong></td>
                    <td className="border border-gray-600 px-4 py-2">File-based</td>
                    <td className="border border-gray-600 px-4 py-2">Shared file storage via SMB/NFS</td>
                    <td className="border border-gray-600 px-4 py-2">Shared drives, app configs</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 px-4 py-2"><strong>Queue Service</strong></td>
                    <td className="border border-gray-600 px-4 py-2">Messaging</td>
                    <td className="border border-gray-600 px-4 py-2">Message-based communication between components</td>
                    <td className="border border-gray-600 px-4 py-2">Background tasks, event processing</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 px-4 py-2"><strong>Table Service</strong></td>
                    <td className="border border-gray-600 px-4 py-2">Structured (NoSQL)</td>
                    <td className="border border-gray-600 px-4 py-2">Key-value, schema-less table storage</td>
                    <td className="border border-gray-600 px-4 py-2">User profiles, IoT data</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 mt-6">
            <h4 className="text-2xl font-semibold text-white mb-4">Explore Datalake Service</h4>
            <div className="space-y-4 text-gray-300">
              <p className="font-semibold">Once your storage account is created:</p>
              <ol className="list-decimal list-inside space-y-3 ml-2">
                <li>Go to your <strong>Storage Account</strong></li>
                <li>Under <strong>Data storage</strong>, click <strong>Containers</strong> → This is where your blobs live.</li>
                <li>Click <strong>➕ Container</strong> to create one:
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li><strong>Name:</strong> images, videos, or backups (any name)</li>
                    <li><strong>Public access level:</strong>
                      <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                        <li><strong>Private (default)</strong> – Only you can access</li>
                        <li><strong>Blob (anonymous read)</strong> – Anyone with the link can read blobs</li>
                        <li><strong>Container (public)</strong> – Everyone can see contents</li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>Click <strong>Create</strong></li>
              </ol>

              <ImageGallery images={getImages('image40', 'image41', 'image42', 'image43', 'image44', 'image45')} />

              <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                <h5 className="text-xl font-semibold text-white mb-3">Subfolder:</h5>
                <p className="text-gray-300 mb-3">You can create subfolders within containers for better organization.</p>
                <h5 className="text-xl font-semibold text-white mb-3">Upload file:</h5>
                <ol className="list-decimal list-inside space-y-2 ml-2">
                  <li>Click your new container (e.g., images)</li>
                  <li>Click <strong>Upload</strong></li>
                  <li>Choose a file from your computer (like a .jpg, .txt, or .mp4)</li>
                </ol>
                <p className="mt-4">Once uploaded, you can:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>View <strong>Properties</strong> (size, type, last modified)</li>
                  <li>Get the <strong>URL</strong> to access the file</li>
                  <li>Change the <strong>access tier</strong></li>
                </ul>
              </div>

              <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <pre className="text-gray-300 font-mono text-sm">
{`Storage Account
   └── DataLake Service
        └── Container (like a folder)
             └── Blob (the actual file)`}
                </pre>
              </div>

              <ImageGallery images={getImages('image46', 'image47', 'image48', 'image49', 'image50', 'image51')} />
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 mt-6">
            <h4 className="text-2xl font-semibold text-white mb-4">Types of Blob Types</h4>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full border border-gray-600">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="border border-gray-600 px-4 py-2 text-left">Blob Type</th>
                    <th className="border border-gray-600 px-4 py-2 text-left">Best For</th>
                    <th className="border border-gray-600 px-4 py-2 text-left">Example Use</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr>
                    <td className="border border-gray-600 px-4 py-2">🧱 <strong>Block Blob</strong></td>
                    <td className="border border-gray-600 px-4 py-2">Storing text or binary data</td>
                    <td className="border border-gray-600 px-4 py-2">Images, videos, documents, CSVs</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 px-4 py-2">📜 <strong>Append Blob</strong></td>
                    <td className="border border-gray-600 px-4 py-2">Data that is constantly added to (append-only)</td>
                    <td className="border border-gray-600 px-4 py-2">Logs, telemetry, audit data</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 px-4 py-2">📄 <strong>Page Blob</strong></td>
                    <td className="border border-gray-600 px-4 py-2">Random read/write access</td>
                    <td className="border border-gray-600 px-4 py-2">Virtual machine disks (VHD files)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Blob type details are the same as above */}
            <ImageGallery images={getImages('image52')} />
          </div>

          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 mt-6">
            <h4 className="text-2xl font-semibold text-white mb-4">Types of Access Tiers</h4>
            <p className="text-gray-300 mb-4">Azure lets you store data in <strong>different tiers</strong> based on how often you need it. This helps <strong>save money</strong> 💰 by matching storage cost to usage.</p>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-600">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="border border-gray-600 px-4 py-2 text-left">Tier</th>
                    <th className="border border-gray-600 px-4 py-2 text-left">Cost</th>
                    <th className="border border-gray-600 px-4 py-2 text-left">Availability</th>
                    <th className="border border-gray-600 px-4 py-2 text-left">Best For</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr>
                    <td className="border border-gray-600 px-4 py-2"><strong>Hot</strong></td>
                    <td className="border border-gray-600 px-4 py-2">💰 Highest cost</td>
                    <td className="border border-gray-600 px-4 py-2">🔥 Always available</td>
                    <td className="border border-gray-600 px-4 py-2">Frequently accessed data (e.g., active apps, websites)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 px-4 py-2"><strong>Cool</strong></td>
                    <td className="border border-gray-600 px-4 py-2">💸 Cheaper</td>
                    <td className="border border-gray-600 px-4 py-2">🕓 Slight delay in access</td>
                    <td className="border border-gray-600 px-4 py-2">Infrequently accessed data (e.g., monthly reports)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 px-4 py-2"><strong>Cold</strong></td>
                    <td className="border border-gray-600 px-4 py-2">💧 Cheaper than Cool</td>
                    <td className="border border-gray-600 px-4 py-2">⏱️ Slower access</td>
                    <td className="border border-gray-600 px-4 py-2">Rarely accessed data but still retrievable</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 px-4 py-2"><strong>Archive</strong></td>
                    <td className="border border-gray-600 px-4 py-2">🧊 Cheapest</td>
                    <td className="border border-gray-600 px-4 py-2">💤 Retrieval takes hours</td>
                    <td className="border border-gray-600 px-4 py-2">Long-term backups, compliance storage</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ImageGallery images={getImages('image53')} />
          </div>
        </section>
        )}

        {/* Azure Databricks Section */}
        {activeSection === 'azure-databricks' && (
        <section
          id="azure-databricks"
          className="bg-[#252525] rounded-xl p-8 border border-gray-600 scroll-mt-24 mb-20"
        >
          <h3 className="text-3xl font-bold text-white mb-6">5. Azure Databricks</h3>
          
          <div className="space-y-12">
            {/* Introduction to Azure Databricks */}
            <div id="introduction-to-azure-databricks" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">1. Introduction to Azure Databricks</h4>
              <div className="space-y-4 text-gray-300">
                <p>
                  <strong className="text-blue-400">Azure Databricks</strong> is a unified analytics platform built on Apache Spark that combines the power of data engineering, data science, machine learning, and analytics in one collaborative workspace. It's designed to help teams work together to build, deploy, share, and maintain enterprise-grade data and AI solutions at scale.
                </p>
                <p>
                  Azure Databricks provides a fully managed, cloud-native platform that simplifies big data processing and enables organizations to extract valuable insights from their data quickly and efficiently.
                </p>
                <p>
                  <strong className="text-blue-400">Key Purpose:</strong> Azure Databricks bridges the gap between data engineers, data scientists, and business analysts, allowing them to collaborate on a single platform while working with large-scale data processing and machine learning workloads.
                </p>
                <ImageGallery images={getImages('image54')} />
              </div>
            </div>

            {/* Databricks Architecture */}
            <div id="databricks-architecture" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">2. Databricks Architecture</h4>
              <div className="space-y-4 text-gray-300">
                <p>
                  Azure Databricks architecture consists of several key components that work together to provide a scalable and reliable big data processing platform:
                </p>
                
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Architecture Layers:</h5>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong className="text-blue-400">Control Plane:</strong> Manages workspaces, clusters, jobs, and notebooks. Hosted by Microsoft in Azure.</li>
                    <li><strong className="text-blue-400">Data Plane:</strong> Where your actual data processing happens. Runs in your Azure subscription.</li>
                    <li><strong className="text-blue-400">Compute Layer:</strong> Apache Spark clusters that execute your workloads.</li>
                    <li><strong className="text-blue-400">Storage Layer:</strong> Integrates with Azure Data Lake Storage (ADLS) for data persistence.</li>
                    <li><strong className="text-blue-400">Network Layer:</strong> Secure connectivity between components using Azure VNet integration.</li>
                  </ul>
                </div>

                <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">How It Works:</h5>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Users create workspaces in Azure Databricks (hosted in Microsoft's control plane)</li>
                    <li>Workspaces connect to compute resources (Spark clusters) in your Azure subscription</li>
                    <li>Data is stored in Azure Data Lake Storage or other Azure storage services</li>
                    <li>Teams collaborate using notebooks, jobs, and dashboards</li>
                    <li>All processing happens securely within your Azure environment</li>
                  </ol>
                </div>
              </div>
              <ImageGallery images={getImages('image55')} />
            </div>

            {/* Common Use Cases */}
            <div id="common-use-cases" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">3. Common Use Cases of Azure Databricks</h4>
              <div className="space-y-4 text-gray-300">
                <p>Azure Databricks is used across various industries and scenarios:</p>
                
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <h5 className="text-lg font-semibold text-white mb-2">📊 Data Engineering</h5>
                    <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                      <li>ETL/ELT pipelines</li>
                      <li>Data lake creation and management</li>
                      <li>Real-time data streaming</li>
                      <li>Data quality and validation</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <h5 className="text-lg font-semibold text-white mb-2">🤖 Machine Learning</h5>
                    <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                      <li>Model training and deployment</li>
                      <li>Feature engineering</li>
                      <li>MLflow experiment tracking</li>
                      <li>Model serving and inference</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <h5 className="text-lg font-semibold text-white mb-2">📈 Analytics & BI</h5>
                    <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                      <li>Interactive dashboards</li>
                      <li>Ad-hoc SQL queries</li>
                      <li>Business intelligence reporting</li>
                      <li>Data warehousing workloads</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <h5 className="text-lg font-semibold text-white mb-2">🔄 Real-time Processing</h5>
                    <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                      <li>Stream processing with Spark Streaming</li>
                      <li>IoT data processing</li>
                      <li>Event-driven architectures</li>
                      <li>Real-time analytics</li>
                    </ul>
                  </div>
                </div>
                <ImageGallery images={getImages('image56')} />
              </div>
            </div>

            {/* Core Components */}
            <div id="core-components" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">4. Core Components of Azure Databricks</h4>
              <div className="space-y-6 text-gray-300">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">🔧 Workspace</h5>
                  <p>Your collaborative environment where teams can create notebooks, share code, manage clusters, and organize projects. It provides a unified interface for all Databricks operations.</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">⚙️ Clusters</h5>
                  <p>Apache Spark clusters that provide the compute resources needed to process data. Clusters can be created on-demand, auto-terminate when idle, and scale automatically based on workload.</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">📓 Notebooks</h5>
                  <p>Interactive documents that combine code, visualizations, and narrative text. Support multiple languages (Python, SQL, Scala, R) and enable collaborative data exploration and analysis.</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">💼 Jobs</h5>
                  <p>Automated tasks that can run notebooks or JAR files on a schedule or trigger. Perfect for production data pipelines and scheduled analytics workloads.</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">🗄️ Databricks SQL</h5>
                  <p>A serverless SQL analytics engine that allows you to run SQL queries on your data lake without managing infrastructure. Includes SQL Editor, Dashboards, and Alerts.</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">📊 Unity Catalog</h5>
                  <p>A unified governance solution for data and AI assets across your organization. Provides centralized access control, data lineage, and metadata management.</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">🧪 MLflow</h5>
                  <p>An open-source platform for managing the machine learning lifecycle, including experiment tracking, model registry, and model deployment.</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">💾 Delta Lake</h5>
                  <p>An open-source storage layer that brings ACID transactions to data lakes, enabling reliable data management with time travel, schema evolution, and upserts.</p>
                </div>
                <ImageGallery images={getImages('image57')} />
              </div>
            </div>

            {/* Advantages */}
            <div id="advantages" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">5. Advantages of Azure Databricks</h4>
              <div className="space-y-4 text-gray-300">
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-600">
                    <thead>
                      <tr className="bg-gray-700">
                        <th className="border border-gray-600 px-4 py-2 text-left">Advantage</th>
                        <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr>
                        <td className="border border-gray-600 px-4 py-2"><strong>🚀 Fully Managed</strong></td>
                        <td className="border border-gray-600 px-4 py-2">Microsoft handles infrastructure, updates, and maintenance, allowing you to focus on analytics</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 px-4 py-2"><strong>⚡ High Performance</strong></td>
                        <td className="border border-gray-600 px-4 py-2">Optimized Apache Spark engine with Databricks Runtime provides faster processing</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 px-4 py-2"><strong>🤝 Collaboration</strong></td>
                        <td className="border border-gray-600 px-4 py-2">Unified workspace where data engineers, scientists, and analysts can work together</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 px-4 py-2"><strong>🔒 Security & Compliance</strong></td>
                        <td className="border border-gray-600 px-4 py-2">Enterprise-grade security with Azure AD integration, encryption, and compliance certifications</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 px-4 py-2"><strong>💰 Cost Effective</strong></td>
                        <td className="border border-gray-600 px-4 py-2">Auto-scaling clusters and pay-per-use pricing reduce costs</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 px-4 py-2"><strong>🔗 Azure Integration</strong></td>
                        <td className="border border-gray-600 px-4 py-2">Native integration with Azure services like ADLS, Synapse, Power BI, and Azure ML</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 px-4 py-2"><strong>📈 Scalability</strong></td>
                        <td className="border border-gray-600 px-4 py-2">Automatically scales from gigabytes to petabytes of data</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 px-4 py-2"><strong>🧠 AI & ML Ready</strong></td>
                        <td className="border border-gray-600 px-4 py-2">Built-in MLflow, AutoML, and integrations with popular ML frameworks</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <ImageGallery images={getImages('image58')} />
              </div>
            </div>

            {/* Databricks Overview */}
            <div id="databricks-overview" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">6. Databricks</h4>
              <div className="space-y-4 text-gray-300">
                <p>
                  <strong className="text-blue-400">Databricks</strong> is the original company behind the Databricks platform, which is now available on multiple cloud providers including Azure. Azure Databricks is the Microsoft Azure-specific implementation that provides seamless integration with Azure services and infrastructure.
                </p>
                <p>
                  The platform combines the best of data lakes and data warehouses into a <strong>lakehouse architecture</strong>, enabling organizations to store, process, and analyze all types of data in a single unified platform.
                </p>
                <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Key Characteristics:</h5>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Open Source Foundation:</strong> Built on Apache Spark and other open-source technologies</li>
                    <li><strong>Cloud-Native:</strong> Designed from the ground up for cloud environments</li>
                    <li><strong>Unified Platform:</strong> Supports data engineering, data science, machine learning, and analytics</li>
                    <li><strong>Enterprise Ready:</strong> Production-grade features for large-scale deployments</li>
                  </ul>
                </div>
                <ImageGallery images={getImages('image59')} />
              </div>
            </div>

            {/* How to Create */}
            <div id="how-to-create" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">7. How to Create Azure Databricks</h4>
              <div className="space-y-4 text-gray-300">
                <p className="font-semibold">Follow these steps to create an Azure Databricks workspace:</p>
                <ol className="list-decimal list-inside space-y-3 ml-2">
                  <li>
                    <strong>Sign in to Azure Portal</strong>
                    <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-sm">
                      <li>Navigate to <code className="bg-gray-800 px-2 py-1 rounded">portal.azure.com</code></li>
                      <li>Sign in with your Azure account credentials</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Search for Databricks</strong>
                    <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-sm">
                      <li>In the search bar at the top, type "Azure Databricks"</li>
                      <li>Select "Azure Databricks" from the results</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Create a new workspace</strong>
                    <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-sm">
                      <li>Click the "Create" or "+ Add" button</li>
                      <li>Fill in the required information in the Basics tab</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Configure workspace settings</strong>
                    <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-sm">
                      <li><strong>Subscription:</strong> Select your Azure subscription</li>
                      <li><strong>Resource Group:</strong> Choose or create a resource group (e.g., rg-ohg365-dev)</li>
                      <li><strong>Workspace Name:</strong> Enter a unique name (e.g., databricks-ohg365-dev)</li>
                      <li><strong>Region:</strong> Select an Azure region closest to your users</li>
                      <li><strong>Pricing Tier:</strong> Choose Standard or Premium tier</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Network settings (optional)</strong>
                    <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-sm">
                      <li>Configure VNet injection for enhanced security (optional)</li>
                      <li>Set up public/private endpoints based on your requirements</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Review and create</strong>
                    <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-sm">
                      <li>Review all settings</li>
                      <li>Click "Review + Create"</li>
                      <li>Once validation passes, click "Create"</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Wait for deployment</strong>
                    <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-sm">
                      <li>Deployment typically takes 5-10 minutes</li>
                      <li>You'll receive a notification when deployment is complete</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Launch workspace</strong>
                    <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-sm">
                      <li>Click "Go to resource" or "Launch workspace"</li>
                      <li>You'll be redirected to your Databricks workspace</li>
                    </ul>
                  </li>
                </ol>
                <div className="mt-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <p className="text-green-400 font-semibold">✅ Once created, you can:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2 text-sm">
                    <li>Create clusters for data processing</li>
                    <li>Create notebooks for data exploration</li>
                    <li>Set up jobs for automated workflows</li>
                    <li>Connect to your data sources</li>
                    <li>Build dashboards and queries</li>
                  </ul>
                </div>
                <ImageGallery images={getImages('image60', 'image61')} />
              </div>
            </div>

            {/* Workspace Overview */}
            <div id="workspace-overview" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">8. Databricks Workspace Overview</h4>
              <div className="space-y-4 text-gray-300">
                <p>
                  The Databricks workspace is your central hub for all data and AI operations. It provides a unified interface for creating, managing, and collaborating on data projects.
                </p>
                
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">📁 Main Workspace Areas:</h5>
                  <div className="space-y-4">
                    <div>
                      <h6 className="text-lg font-semibold text-blue-400 mb-2">Workspace Browser</h6>
                      <p className="text-sm">Navigate folders, notebooks, and files. Organize projects in a directory structure similar to a file system.</p>
                    </div>
                    
                    <div>
                      <h6 className="text-lg font-semibold text-blue-400 mb-2">Notebooks</h6>
                      <p className="text-sm">Create and manage interactive notebooks for data exploration, analysis, and visualization. Support Python, SQL, Scala, and R.</p>
                    </div>
                    
                    <div>
                      <h6 className="text-lg font-semibold text-blue-400 mb-2">Clusters</h6>
                      <p className="text-sm">Manage Spark clusters that provide compute resources. Create, configure, start, and stop clusters as needed.</p>
                    </div>
                    
                    <div>
                      <h6 className="text-lg font-semibold text-blue-400 mb-2">Jobs</h6>
                      <p className="text-sm">Schedule and run automated jobs for data pipelines, ETL processes, and batch analytics.</p>
                    </div>
                    
                    <div>
                      <h6 className="text-lg font-semibold text-blue-400 mb-2">SQL</h6>
                      <p className="text-sm">Access Databricks SQL workspace for running SQL queries, creating dashboards, and setting up alerts.</p>
                    </div>
                    
                    <div>
                      <h6 className="text-lg font-semibold text-blue-400 mb-2">Catalog</h6>
                      <p className="text-sm">Browse data tables, databases, and schemas. Manage Unity Catalog for data governance.</p>
                    </div>
                    
                    <div>
                      <h6 className="text-lg font-semibold text-blue-400 mb-2">Repos</h6>
                      <p className="text-sm">Connect to Git repositories for version control and collaboration on code.</p>
                    </div>
                  </div>
                </div>
                <ImageGallery images={getImages('image62')} />
              </div>
            </div>

            {/* Databricks Features */}
            <div id="databricks-features" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">9. Databricks Features</h4>
              <div className="space-y-6 text-gray-300">
                <p>Azure Databricks offers a comprehensive set of features for data engineering, data science, and analytics:</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <h5 className="text-lg font-semibold text-white mb-2">📓 Notebook Features</h5>
                    <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                      <li>Multi-language support (Python, SQL, Scala, R)</li>
                      <li>Real-time collaboration</li>
                      <li>Version control with Git</li>
                      <li>Interactive visualizations</li>
                      <li>Cell-by-cell execution</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <h5 className="text-lg font-semibold text-white mb-2">⚙️ Cluster Management</h5>
                    <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                      <li>Auto-scaling clusters</li>
                      <li>Auto-termination</li>
                      <li>Spot instance support</li>
                      <li>Cluster libraries management</li>
                      <li>Pooled clusters</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <h5 className="text-lg font-semibold text-white mb-2">🔐 Security Features</h5>
                    <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                      <li>Azure AD integration</li>
                      <li>Role-based access control (RBAC)</li>
                      <li>Network isolation with VNet</li>
                      <li>Data encryption at rest and in transit</li>
                      <li>Audit logs</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <h5 className="text-lg font-semibold text-white mb-2">💼 Job Scheduling</h5>
                    <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                      <li>Cron-based scheduling</li>
                      <li>Trigger-based jobs</li>
                      <li>Job dependencies</li>
                      <li>Retry policies</li>
                      <li>Email notifications</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <h5 className="text-lg font-semibold text-white mb-2">📊 Data Lakehouse</h5>
                    <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                      <li>Delta Lake integration</li>
                      <li>Unity Catalog</li>
                      <li>Time travel queries</li>
                      <li>Schema evolution</li>
                      <li>ACID transactions</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <h5 className="text-lg font-semibold text-white mb-2">🤖 ML & AI Features</h5>
                    <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                      <li>MLflow integration</li>
                      <li>AutoML capabilities</li>
                      <li>Feature store</li>
                      <li>Model registry</li>
                      <li>Model serving</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Additional Capabilities:</h5>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Streaming:</strong> Real-time data processing with Spark Structured Streaming</li>
                    <li><strong>Data Sharing:</strong> Securely share data with external partners using Delta Sharing</li>
                    <li><strong>API Access:</strong> REST APIs for automation and integration</li>
                    <li><strong>Marketplace:</strong> Access to partner solutions and integrations</li>
                    <li><strong>Monitoring:</strong> Built-in metrics and logging for clusters and jobs</li>
                  </ul>
                </div>
                <ImageGallery images={getImages('image70', 'image71', 'image72', 'image73', 'image74', 'image75')} />
              </div>
            </div>
          </div>
        </section>
        )}

        {/* Databricks SQL Section */}
        {activeSection === 'databricks-sql' && (
        <section
          id="databricks-sql"
          className="bg-[#252525] rounded-xl p-8 border border-gray-600 scroll-mt-24 mb-20"
        >
          <h3 className="text-3xl font-bold text-white mb-6">6. Databricks SQL</h3>
          
          <div className="space-y-12">
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700">
              <h4 className="text-2xl font-semibold text-white mb-4">Introduction to Databricks SQL</h4>
              <div className="space-y-4 text-gray-300">
                <p>
                  <strong className="text-blue-400">Databricks SQL</strong> is a serverless SQL analytics service that allows you to run SQL queries on your data lake without managing infrastructure. It provides a data warehouse-like experience on top of your data lake, enabling fast and efficient SQL-based analytics.
                </p>
                <p>
                  Databricks SQL integrates seamlessly with your existing Databricks workspace and provides tools for data analysts and business users to work with data using familiar SQL syntax and BI tools.
                </p>
                <ImageGallery images={getImages('image63')} />
              </div>
            </div>

            {/* SQL Editor */}
            <div id="sql-editor" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">1. SQL Editor</h4>
              <div className="space-y-4 text-gray-300">
                <p>
                  The <strong className="text-blue-400">SQL Editor</strong> is an interactive query interface where you can write, run, and save SQL queries against your data lake tables.
                </p>
                
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Key Features:</h5>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Query Execution:</strong> Run SQL queries interactively and view results in real-time</li>
                    <li><strong>Query History:</strong> Access previously executed queries for reference</li>
                    <li><strong>Query Snippets:</strong> Save and reuse common SQL code snippets</li>
                    <li><strong>Auto-completion:</strong> Intelligent SQL syntax suggestions and completion</li>
                    <li><strong>Result Visualization:</strong> View query results in tables or charts</li>
                    <li><strong>Export Results:</strong> Export query results to CSV, Excel, or other formats</li>
                    <li><strong>Query Scheduling:</strong> Schedule queries to run automatically</li>
                  </ul>
                </div>

                <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">How to Use SQL Editor:</h5>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Navigate to the SQL workspace in Databricks</li>
                    <li>Click on "SQL Editor" in the sidebar</li>
                    <li>Select a compute endpoint (SQL warehouse) or create a new one</li>
                    <li>Write your SQL query in the editor</li>
                    <li>Click "Run" or press Ctrl+Enter to execute</li>
                    <li>View results below the query</li>
                    <li>Save the query for future use</li>
                  </ol>
                </div>
                <ImageGallery images={getImages('image64', 'image76', 'image77')} />
              </div>
            </div>

            {/* Dashboards */}
            <div id="dashboards" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">2. Dashboards</h4>
              <div className="space-y-4 text-gray-300">
                <p>
                  <strong className="text-blue-400">Dashboards</strong> allow you to create interactive visualizations and reports from SQL queries. They provide a way to present data insights in an easy-to-understand format for business users and stakeholders.
                </p>
                
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Dashboard Features:</h5>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Visualizations:</strong> Create charts, graphs, tables, and other visual components</li>
                    <li><strong>Multiple Queries:</strong> Combine multiple SQL queries into a single dashboard</li>
                    <li><strong>Auto-refresh:</strong> Configure dashboards to refresh automatically at specified intervals</li>
                    <li><strong>Filters:</strong> Add interactive filters for users to customize views</li>
                    <li><strong>Layout Customization:</strong> Arrange widgets in a custom layout</li>
                    <li><strong>Sharing:</strong> Share dashboards with team members or make them public</li>
                    <li><strong>Embedding:</strong> Embed dashboards in external applications or websites</li>
                    <li><strong>Alerting:</strong> Set up alerts based on dashboard metrics</li>
                  </ul>
                </div>

                <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Creating a Dashboard:</h5>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Go to SQL workspace → Dashboards</li>
                    <li>Click "Create Dashboard"</li>
                    <li>Add queries by clicking "Add" → "Query"</li>
                    <li>Select an existing query or create a new one</li>
                    <li>Choose a visualization type (table, bar chart, line chart, etc.)</li>
                    <li>Customize the visualization settings</li>
                    <li>Arrange widgets on the dashboard canvas</li>
                    <li>Configure refresh settings and filters</li>
                    <li>Save and share your dashboard</li>
                  </ol>
                </div>
                <ImageGallery images={getImages('image65', 'image78')} />
              </div>
            </div>

            {/* Genie */}
            <div id="genie" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">3. Genie</h4>
              <div className="space-y-4 text-gray-300">
                <p>
                  <strong className="text-blue-400">Genie</strong> is Databricks' AI-powered assistant that helps you write SQL queries, understand your data, and get insights faster using natural language.
                </p>
                
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Genie Capabilities:</h5>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Natural Language Queries:</strong> Ask questions in plain English and Genie generates SQL queries</li>
                    <li><strong>Query Generation:</strong> Automatically creates SQL queries based on your description</li>
                    <li><strong>Query Explanation:</strong> Explains complex SQL queries in simple terms</li>
                    <li><strong>Schema Understanding:</strong> Helps you understand table structures and relationships</li>
                    <li><strong>Query Optimization:</strong> Suggests improvements to make queries more efficient</li>
                    <li><strong>Data Exploration:</strong> Helps discover insights in your data through conversation</li>
                  </ul>
                </div>

                <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Using Genie:</h5>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Open SQL Editor in Databricks SQL workspace</li>
                    <li>Look for the Genie icon or assistant panel</li>
                    <li>Type your question in natural language (e.g., "Show me sales by region")</li>
                    <li>Genie will generate a SQL query for you</li>
                    <li>Review and modify the query if needed</li>
                    <li>Execute the query to see results</li>
                    <li>Ask follow-up questions to refine your analysis</li>
                  </ol>
                </div>
                <ImageGallery images={getImages('image66')} />
              </div>
            </div>

            {/* Alerts */}
            <div id="alerts" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">4. Alerts</h4>
              <div className="space-y-4 text-gray-300">
                <p>
                  <strong className="text-blue-400">Alerts</strong> allow you to monitor your data and receive notifications when specific conditions are met. They help you stay informed about important changes in your data without constantly checking dashboards.
                </p>
                
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Alert Features:</h5>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Query-based Alerts:</strong> Create alerts based on SQL query results</li>
                    <li><strong>Condition Monitoring:</strong> Set conditions that trigger alerts (e.g., value exceeds threshold)</li>
                    <li><strong>Multiple Channels:</strong> Receive notifications via email, Slack, PagerDuty, or webhooks</li>
                    <li><strong>Scheduled Evaluation:</strong> Alerts are evaluated on a schedule (hourly, daily, etc.)</li>
                    <li><strong>Custom Messages:</strong> Customize alert messages with query results</li>
                    <li><strong>Alert History:</strong> Track alert triggers and their history</li>
                    <li><strong>Mute/Resume:</strong> Temporarily disable alerts when needed</li>
                  </ul>
                </div>

                <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Creating an Alert:</h5>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Go to SQL workspace → Alerts</li>
                    <li>Click "Create Alert"</li>
                    <li>Provide a name and description for the alert</li>
                    <li>Select or write a SQL query that returns a single value</li>
                    <li>Set the evaluation schedule (how often to check)</li>
                    <li>Define the trigger condition (greater than, less than, equals, etc.)</li>
                    <li>Set the threshold value</li>
                    <li>Configure notification channels (email, Slack, etc.)</li>
                    <li>Customize the alert message template</li>
                    <li>Save and activate the alert</li>
                  </ol>
                </div>

                <div className="mt-4 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Common Alert Use Cases:</h5>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Monitoring data quality issues (null values, duplicates)</li>
                    <li>Tracking key business metrics (sales, revenue, user counts)</li>
                    <li>Performance monitoring (query execution time, error rates)</li>
                    <li>Data freshness checks (last update timestamps)</li>
                    <li>Anomaly detection (unusual patterns in data)</li>
                  </ul>
                </div>
                <ImageGallery images={getImages('image67', 'image79')} />
              </div>
            </div>

            {/* Query History */}
            <div id="query-history" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">5. Query History</h4>
              <div className="space-y-4 text-gray-300">
                <p>
                  <strong className="text-blue-400">Query History</strong> provides a record of all SQL queries that have been executed in your Databricks SQL workspace. It helps you track query performance, debug issues, and reuse previously written queries.
                </p>
                
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Query History Features:</h5>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Complete Query Log:</strong> View all queries executed across your workspace</li>
                    <li><strong>Query Details:</strong> See query text, execution time, status, and results</li>
                    <li><strong>Performance Metrics:</strong> Track query duration, rows processed, and bytes scanned</li>
                    <li><strong>Filtering & Search:</strong> Filter queries by user, date, status, or search by query text</li>
                    <li><strong>Query Reuse:</strong> Open any query from history to run again or modify</li>
                    <li><strong>Export History:</strong> Export query history for auditing or analysis</li>
                    <li><strong>Cost Tracking:</strong> View compute costs associated with each query</li>
                    <li><strong>Error Analysis:</strong> Review failed queries and their error messages</li>
                  </ul>
                </div>

                <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Using Query History:</h5>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Navigate to SQL workspace → Query History</li>
                    <li>View the list of all executed queries</li>
                    <li>Use filters to find specific queries (by user, date range, status)</li>
                    <li>Click on a query to view full details</li>
                    <li>Copy query text to reuse or modify</li>
                    <li>Review execution metrics to optimize performance</li>
                    <li>Export history for reporting or auditing purposes</li>
                  </ol>
                </div>
                <ImageGallery images={getImages('image68', 'image80')} />
              </div>
            </div>

            {/* SQL Data Warehouse */}
            <div id="sql-data-warehouse" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">6. SQL Data Warehouse</h4>
              <div className="space-y-4 text-gray-300">
                <p>
                  <strong className="text-blue-400">SQL Warehouse</strong> (also known as SQL Compute) is a serverless compute resource that powers SQL queries in Databricks SQL. It provides a managed, scalable infrastructure for running analytical queries on your data lake.
                </p>
                
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">SQL Warehouse Characteristics:</h5>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Serverless:</strong> No infrastructure management required - Databricks handles scaling automatically</li>
                    <li><strong>Auto-scaling:</strong> Automatically scales up or down based on query workload</li>
                    <li><strong>Auto-pause:</strong> Automatically pauses when idle to save costs</li>
                    <li><strong>Multiple Clusters:</strong> Can run multiple concurrent clusters for different workloads</li>
                    <li><strong>High Performance:</strong> Optimized for fast SQL query execution</li>
                    <li><strong>Cost Efficient:</strong> Pay only for compute time used</li>
                    <li><strong>Enterprise Security:</strong> Integrated with Unity Catalog for data governance</li>
                  </ul>
                </div>

                <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Creating and Managing SQL Warehouses:</h5>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Go to SQL workspace → SQL Warehouses</li>
                    <li>Click "Create SQL Warehouse"</li>
                    <li>Configure settings:
                      <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-sm">
                        <li><strong>Name:</strong> Give your warehouse a descriptive name</li>
                        <li><strong>Cluster Size:</strong> Choose between Serverless or Classic, and select cluster size</li>
                        <li><strong>Auto Stop:</strong> Set idle timeout (how long to wait before auto-pausing)</li>
                        <li><strong>Scaling:</strong> Configure min/max clusters for concurrent queries</li>
                        <li><strong>Channel:</strong> Select Stable or Preview channel</li>
                      </ul>
                    </li>
                    <li>Configure advanced settings (networking, security, etc.)</li>
                    <li>Review and create the warehouse</li>
                    <li>Once created, start the warehouse to begin running queries</li>
                  </ol>
                </div>

                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full border border-gray-600">
                    <thead>
                      <tr className="bg-gray-700">
                        <th className="border border-gray-600 px-4 py-2 text-left">Warehouse Type</th>
                        <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                        <th className="border border-gray-600 px-4 py-2 text-left">Best For</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr>
                        <td className="border border-gray-600 px-4 py-2"><strong>Serverless</strong></td>
                        <td className="border border-gray-600 px-4 py-2">Fully managed, automatically scales, no infrastructure to manage</td>
                        <td className="border border-gray-600 px-4 py-2">Most users, production workloads</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-600 px-4 py-2"><strong>Classic</strong></td>
                        <td className="border border-gray-600 px-4 py-2">More control over infrastructure, manual scaling</td>
                        <td className="border border-gray-600 px-4 py-2">Advanced users, specific requirements</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Benefits of SQL Warehouse:</h5>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>No need to provision or manage compute clusters manually</li>
                    <li>Automatic scaling handles variable workloads efficiently</li>
                    <li>Cost-effective with pay-per-use pricing and auto-pause</li>
                    <li>Fast startup time for immediate query execution</li>
                    <li>Isolated from other workloads for consistent performance</li>
                  </ul>
                </div>
                <ImageGallery images={getImages('image69', 'image81', 'image82', 'image83', 'image84')} />
              </div>
            </div>
          </div>
        </section>
        )}

        {/* Navigation Buttons */}
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
