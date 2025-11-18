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
  image84: { src: '/tutorials/azure/images/image84.png', width: 1920, height: 1080, alt: 'Azure Databricks image 84' },
  // Images from 2.Azure Databricks.docx document (image85-image115)
  image85: { src: '/tutorials/azure/images/image85.png', width: 1920, height: 1080, alt: 'Azure Databricks introduction' },
  image86: { src: '/tutorials/azure/images/image86.png', width: 1920, height: 1080, alt: 'Databricks architecture' },
  image87: { src: '/tutorials/azure/images/image87.png', width: 1920, height: 1080, alt: 'Common use cases' },
  image88: { src: '/tutorials/azure/images/image88.png', width: 1920, height: 1080, alt: 'Core components' },
  image89: { src: '/tutorials/azure/images/image89.png', width: 1920, height: 1080, alt: 'Advantages' },
  image90: { src: '/tutorials/azure/images/image90.png', width: 1920, height: 1080, alt: 'How to create Azure Databricks' },
  image91: { src: '/tutorials/azure/images/image91.png', width: 1920, height: 1080, alt: 'Workspace overview' },
  image92: { src: '/tutorials/azure/images/image92.png', width: 1920, height: 1080, alt: 'Workspace features' },
  image93: { src: '/tutorials/azure/images/image93.png', width: 1920, height: 1080, alt: 'Notebook creation' },
  image94: { src: '/tutorials/azure/images/image66.png', width: 1920, height: 1080, alt: 'Catalog and features' },
  image95: { src: '/tutorials/azure/images/image95.png', width: 1920, height: 1080, alt: 'Jobs and pipelines' },
  image96: { src: '/tutorials/azure/images/image96.png', width: 1920, height: 1080, alt: 'Job runs dashboard' },
  image97: { src: '/tutorials/azure/images/image97.png', width: 1920, height: 1080, alt: 'Compute clusters' },
  image98: { src: '/tutorials/azure/images/image98.png', width: 1920, height: 1080, alt: 'Marketplace' },
  image99: { src: '/tutorials/azure/images/image99.png', width: 1920, height: 1080, alt: 'SQL Editor' },
  image100: { src: '/tutorials/azure/images/image100.png', width: 1920, height: 1080, alt: 'SQL Editor features' },
  image101: { src: '/tutorials/azure/images/image101.png', width: 1920, height: 1080, alt: 'Queries' },
  image102: { src: '/tutorials/azure/images/image102.png', width: 1920, height: 1080, alt: 'Dashboards' },
  image103: { src: '/tutorials/azure/images/image103.png', width: 1920, height: 1080, alt: 'Legacy dashboards' },
  image104: { src: '/tutorials/azure/images/image104.png', width: 1920, height: 1080, alt: 'Genie AI assistant' },
  image105: { src: '/tutorials/azure/images/image105.png', width: 1920, height: 1080, alt: 'Genie spaces' },
  image106: { src: '/tutorials/azure/images/image106.png', width: 1920, height: 1080, alt: 'Alerts' },
  image107: { src: '/tutorials/azure/images/image107.png', width: 1920, height: 1080, alt: 'Query history' },
  image108: { src: '/tutorials/azure/images/image108.png', width: 1920, height: 1080, alt: 'SQL Data Warehouse' },
  image109: { src: '/tutorials/azure/images/image109.png', width: 1920, height: 1080, alt: 'SQL Warehouse properties' },
  image110: { src: '/tutorials/azure/images/image110.png', width: 1920, height: 1080, alt: 'SQL Warehouse types' },
  image111: { src: '/tutorials/azure/images/image111.png', width: 1920, height: 1080, alt: 'Create SQL Warehouse' },
  image112: { src: '/tutorials/azure/images/image112.png', width: 1920, height: 1080, alt: 'SQL Warehouse features' },
  image113: { src: '/tutorials/azure/images/image113.png', width: 1920, height: 1080, alt: 'Azure Databricks image 113' },
  image114: { src: '/tutorials/azure/images/image114.png', width: 1920, height: 1080, alt: 'Azure Databricks image 114' },
  image115: { src: '/tutorials/azure/images/image115.png', width: 1920, height: 1080, alt: 'Azure Databricks image 115' }
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
  'azure-hierarchy': 'azure-basics',
  'introduction-to-azure-databricks': 'azure-databricks',
  'databricks-architecture': 'azure-databricks',
  'common-use-cases': 'azure-databricks',
  'core-components': 'azure-databricks',
  'advantages': 'azure-databricks',
  'databricks-overview': 'azure-databricks',
  'how-to-create': 'azure-databricks',
  'workspace-overview': 'azure-databricks',
  'databricks-features': 'azure-databricks',
  'sql-editor': 'databricks-sql',
  'queries': 'databricks-sql',
  'dashboards': 'databricks-sql',
  'genie': 'databricks-sql',
  'alerts': 'databricks-sql',
  'query-history': 'databricks-sql',
  'sql-data-warehouse': 'databricks-sql'
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
                <div>
                  <h5 className="text-xl font-semibold text-white mb-3">What is Azure Databricks?</h5>
                  <p>
                    Azure Databricks is a cloud platform that helps people work with data and artificial intelligence in one place. It brings together tools for data engineering, data science, and machine learning, so teams can easily collect, clean, and analyze data.
                  </p>
                  <p className="mt-3">
                    It uses a <strong className="text-blue-400">"lakehouse"</strong> design, a mix of a data lake and a data warehouse, which makes it easier to store large amounts of data and use it quickly for insights or AI projects. Databricks is built on open-source tools like Apache Spark and Delta Lake, and it can run on major cloud platforms such as Azure, AWS, and Google Cloud.
                  </p>
                  <p className="mt-3">
                    Azure Databricks is a cloud-based platform that helps you work with data, analytics, and AI in one place. It combines tools for storing, processing, and analyzing data so that teams can easily build and share data projects.
                  </p>
                  <p className="mt-3">
                    It connects directly with your cloud storage and takes care of setting up and managing the required infrastructure for you.
                  </p>
                  <p className="mt-3">
                    Using Generative AI, Azure Databricks can understand your data and automatically improve performance to meet your needs. It also uses natural language processing (NLP), which means you can find data or get help just by typing questions in plain English. It can even help you write code, fix issues, and explore documentation easily.
                  </p>
                </div>
                
                <div className="mt-6">
                  <h5 className="text-xl font-semibold text-white mb-3">Key Features of Azure Databricks</h5>
                  <div className="space-y-3">
                    <div>
                      <strong className="text-blue-400">Unified Workspace:</strong> A single place where data engineers, data scientists, and analysts can work together on data and AI projects.
                    </div>
                    <div>
                      <strong className="text-blue-400">Lakehouse Architecture:</strong> Combines the best parts of data lakes and data warehouses, making it easier to store and use data efficiently.
                    </div>
                    <div>
                      <strong className="text-blue-400">Scalability:</strong> Automatically adjusts resources based on your workload, so you can handle small or large amounts of data easily.
                    </div>
                    <div>
                      <strong className="text-blue-400">Built on Apache Spark:</strong> Uses Spark, a fast and powerful open-source engine, to process large data quickly.
                    </div>
                    <div>
                      <strong className="text-blue-400">Delta Lake Integration:</strong> Ensures your data is reliable and consistent by handling updates and corrections efficiently.
                    </div>
                    <div>
                      <strong className="text-blue-400">Collaborative Notebooks:</strong> Lets teams write code, visualize data, and share work in real time using notebooks that support Python, SQL, R, and Scala.
                    </div>
                    <div>
                      <strong className="text-blue-400">Seamless Cloud Integration:</strong> Works smoothly with Azure services like Data Lake Storage, Synapse, Machine Learning, and Power BI.
                    </div>
                    <div>
                      <strong className="text-blue-400">AI and Machine Learning Support:</strong> Provides built-in tools to train, test, and deploy machine learning and AI models easily.
                    </div>
                    <div>
                      <strong className="text-blue-400">Security and Compliance:</strong> Protects your data using Azure's enterprise-grade security, including encryption, role-based access, and compliance certifications.
                    </div>
                    <div>
                      <strong className="text-blue-400">Natural Language Assistance (Generative AI):</strong> Lets users find data, write code, and fix errors just by asking questions in plain English.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Databricks Architecture */}
            <div id="databricks-architecture" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">2. Databricks Architecture</h4>
              <div className="space-y-4 text-gray-300">
                <p>
                  Azure Databricks follows a multi-layer architecture built on top of Apache Spark and Delta Lake, integrated deeply with Azure cloud services. It unifies data engineering, analytics, and AI within a single environment.
                </p>
                
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Storage Layer (Data and Delta Lake):</h5>
                  <p className="mb-3">Connects directly to cloud storage such as Azure Data Lake Storage (ADLS Gen2) or Blob Storage.</p>
                  <p className="mb-3">Delta Lake acts as the transactional storage layer, providing:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>ACID compliance</li>
                    <li>Schema enforcement and evolution</li>
                    <li>Data versioning (time travel)</li>
                    <li>Scalable metadata handling</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Compute Layer (Clusters and Runtime):</h5>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Uses Databricks Clusters — groups of VMs — for distributed data processing.</li>
                    <li>Powered by Databricks Runtime (DBR), an optimized engine based on Apache Spark.</li>
                    <li>Supports autoscaling, auto-termination, and GPU/CPU clusters for different workloads.</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Control Plane:</h5>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Managed by Databricks (in Azure).</li>
                    <li>Handles user authentication, workspace management, notebook storage, job scheduling, and cluster configuration.</li>
                    <li>Stores metadata and notebook information securely.</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Data Plane:</h5>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Runs inside your Azure subscription.</li>
                    <li>Responsible for actual data processing and storage.</li>
                    <li>All data remains in your cloud environment — ensuring compliance and security.</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Workspace / User Interface Layer:</h5>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>A collaborative web-based environment for developers, data engineers, and scientists.</li>
                    <li>Supports multiple languages — Python, SQL, R, Scala, Java.</li>
                    <li>Includes features like notebooks, repos, dashboards, and job orchestration.</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Machine Learning and AI Layer:</h5>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Integrates MLflow for experiment tracking, model registry, and deployment.</li>
                    <li>Supports integration with Azure Machine Learning for end-to-end MLOps.</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Security and Governance Layer:</h5>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Managed through Unity Catalog for centralized access control, data lineage, and auditing.</li>
                    <li>Uses Azure Active Directory (AAD) for authentication and RBAC for authorization.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Common Use Cases */}
            <div id="common-use-cases" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">3. Common Use Cases of Azure Databricks</h4>
              <div className="space-y-4 text-gray-300">
                <div className="space-y-3">
                  <div>
                    <strong className="text-blue-400">Data Engineering:</strong> Used to collect, clean, and prepare large amounts of data from different sources before analysis or reporting.
                  </div>
                  <div>
                    <strong className="text-blue-400">Data Analytics:</strong> Helps analyze and visualize data to find useful patterns and trends for better decision-making.
                  </div>
                  <div>
                    <strong className="text-blue-400">Machine Learning and AI:</strong> Allows users to train, test, and deploy machine learning and AI models directly within the platform.
                  </div>
                  <div>
                    <strong className="text-blue-400">Real-Time Data Processing:</strong> Can handle streaming data — for example, analyzing live sensor data or real-time transactions.
                  </div>
                  <div>
                    <strong className="text-blue-400">Data Warehousing and BI:</strong> Works with tools like Power BI to create reports and dashboards from stored data.
                  </div>
                  <div>
                    <strong className="text-blue-400">ETL (Extract, Transform, Load) Pipelines:</strong> Automates the process of moving and transforming data from one system to another for analysis.
                  </div>
                  <div>
                    <strong className="text-blue-400">Data Lakehouse Management:</strong> Combines data lake storage with data warehouse features, making it easier to manage both structured and unstructured data.
                  </div>
                  <div>
                    <strong className="text-blue-400">Collaborative Data Projects:</strong> Let's teams of data engineers and data scientists work together in shared notebooks and environments.
                  </div>
                  <div>
                    <strong className="text-blue-400">Predictive Analytics:</strong> Used to forecast trends or outcomes — for example, predicting customer behaviour, sales, or equipment failure.
                  </div>
                </div>
              </div>
            </div>

            {/* Core Components */}
            <div id="core-components" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">4. Core Components of Azure Databricks</h4>
              <div className="space-y-6 text-gray-300">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Workspace</h5>
                  <p>This is the main area where you and your team can create notebooks, manage data, and work together on data and AI projects.</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Notebooks</h5>
                  <p>Interactive notebooks where you can write and run code in languages like Python, SQL, R, or Scala to explore and visualize data.</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Clusters</h5>
                  <p>Groups of virtual machines that run your data processing tasks. They automatically scale up or down based on the workload.</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Jobs</h5>
                  <p>Used to schedule and automate tasks like data processing, transformations, or machine learning model training.</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Data Lake and Delta Lake</h5>
                  <p>Delta Lake stores and manages your data in a reliable way, adding features like version control, updates, and rollbacks on top of your data lake.</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Databricks Runtime</h5>
                  <p>The engine that runs your Spark jobs — it's optimized for faster performance and lower costs.</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Repos (Version Control)</h5>
                  <p>Lets you connect GitHub or Azure DevOps for source control, so you can manage and track changes to your code easily.</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">MLflow</h5>
                  <p>A built-in tool for managing the complete machine learning lifecycle — from model training and tracking to deployment.</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Unity Catalog</h5>
                  <p>A centralized data governance and access management system that helps control who can access which data across the platform.</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Dashboarding and Visualization</h5>
                  <p>Allows you to create charts, graphs, and dashboards to share insights and monitor your data pipelines.</p>
                </div>
              </div>
            </div>

            {/* Advantages */}
            <div id="advantages" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">5. Advantages of Azure Databricks</h4>
              <div className="space-y-4 text-gray-300">
                <div className="space-y-3">
                  <div>
                    <strong className="text-blue-400">Unified Analytics and AI Platform:</strong> Combines data engineering, data science, and analytics into a single, collaborative workspace for end-to-end data workflows.
                  </div>
                  <div>
                    <strong className="text-blue-400">High Performance and Scalability:</strong> Optimized Apache Spark runtime ensures faster execution, while autoscaling dynamically adjusts cluster size to handle any workload efficiently.
                  </div>
                  <div>
                    <strong className="text-blue-400">Delta Lake Reliability:</strong> Provides ACID transactions, schema enforcement, and time travel features for consistent and reliable data pipelines.
                  </div>
                  <div>
                    <strong className="text-blue-400">Deep Azure Ecosystem Integration:</strong> Natively connects with Azure Data Lake Storage, Synapse Analytics, Power BI, Azure ML, and Active Directory for seamless interoperability.
                  </div>
                  <div>
                    <strong className="text-blue-400">Multi-Language and Multi-User Collaboration:</strong> Supports Python, SQL, R, Scala, and Java within shared notebooks for cross-functional team collaboration.
                  </div>
                  <div>
                    <strong className="text-blue-400">Automated Cluster and Job Management:</strong> Simplifies operational overhead with autoscaling, auto-termination, and job scheduling capabilities.
                  </div>
                  <div>
                    <strong className="text-blue-400">Advanced Security and Governance:</strong> Offers enterprise-grade security through RBAC, encryption at rest/in transit, and governance via Unity Catalog.
                  </div>
                  <div>
                    <strong className="text-blue-400">Integrated ML and MLOps:</strong> Built-in MLflow enables experiment tracking, model versioning, and deployment supporting the full ML lifecycle.
                  </div>
                  <div>
                    <strong className="text-blue-400">Cost Optimization:</strong> Pay-as-you-go model with efficient resource utilization and intelligent scaling reduces infrastructure costs.
                  </div>
                  <div>
                    <strong className="text-blue-400">AI-Powered Assistance:</strong> Integrates generative AI and natural language capabilities for faster code generation, data discovery, and troubleshooting.
                  </div>
                </div>
              </div>
            </div>

            {/* Databricks Overview */}
            <div id="databricks-overview" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">6. Databricks Overview</h4>
              <div className="space-y-4 text-gray-300">
                <div className="space-y-4">
                  <div>
                    <strong className="text-blue-400">Go to the Azure portal and search for Databricks</strong>
                  </div>
                  <div>
                    <strong className="text-blue-400">Click on create</strong>
                  </div>
                  <div>
                    <strong className="text-blue-400">Create databricks</strong>
                  </div>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Subscription</h5>
                  <p>Choose the Azure subscription under which the Databricks workspace will be created.</p>
                  <p className="mt-2"><strong>Example:</strong> Azure subscription 1</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Resource Group</h5>
                  <p>Select an existing Resource Group or create a new one.</p>
                  <p className="mt-2">Resource groups act like folders to organize and manage related resources.</p>
                  <p className="mt-2"><strong>Example:</strong> rg-ohg365-dev</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Workspace Name</h5>
                  <p>Enter a unique workspace name for your Databricks instance.</p>
                  <p className="mt-2"><strong>Example:</strong> ohg365-db-dev</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Region</h5>
                  <p>Choose the Azure region where your workspace will be hosted.</p>
                  <p className="mt-2"><strong>Example:</strong> Central US</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Pricing Tier</h5>
                  <p>Select the pricing tier — typically Premium (+ Role-based access controls) for better management and security features.</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Managed Resource Group Name</h5>
                  <p>Azure automatically creates a Managed Resource Group to hold internal resources required by Databricks.</p>
                  <p className="mt-2"><strong>Example:</strong> mg-ohg365-db-dev</p>
                </div>

                <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Final Step – Review + Create</h5>
                  <p>Click Review + create to validate your settings and proceed with workspace creation.</p>
                  <p className="mt-3">While creating an Azure Databricks workspace, Azure automatically creates a separate resource group called a <strong>Managed Resource Group</strong>. This group contains and manages all the supporting resources required for the Databricks workspace, as shown in the screenshot below.</p>
                </div>
                <ImageGallery images={getImages('image90')} />
              </div>
            </div>

            {/* How to Create */}
            <div id="how-to-create" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">7. How to Create Azure Databricks</h4>
              <div className="space-y-4 text-gray-300">
                <div className="space-y-4">
                  <div>
                    <strong className="text-blue-400">Go to the Azure portal and search for Databricks</strong>
                  </div>
                  <div>
                    <strong className="text-blue-400">Click on create</strong>
                  </div>
                  <div>
                    <strong className="text-blue-400">Create databricks</strong>
                  </div>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Subscription</h5>
                  <p>Choose the Azure subscription under which the Databricks workspace will be created.</p>
                  <p className="mt-2"><strong>Example:</strong> Azure subscription 1</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Resource Group</h5>
                  <p>Select an existing Resource Group or create a new one.</p>
                  <p className="mt-2">Resource groups act like folders to organize and manage related resources.</p>
                  <p className="mt-2"><strong>Example:</strong> rg-ohg365-dev</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Workspace Name</h5>
                  <p>Enter a unique workspace name for your Databricks instance.</p>
                  <p className="mt-2"><strong>Example:</strong> ohg365-db-dev</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Region</h5>
                  <p>Choose the Azure region where your workspace will be hosted.</p>
                  <p className="mt-2"><strong>Example:</strong> Central US</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Pricing Tier</h5>
                  <p>Select the pricing tier — typically Premium (+ Role-based access controls) for better management and security features.</p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Managed Resource Group Name</h5>
                  <p>Azure automatically creates a Managed Resource Group to hold internal resources required by Databricks.</p>
                  <p className="mt-2"><strong>Example:</strong> mg-ohg365-db-dev</p>
                </div>

                <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Final Step – Review + Create</h5>
                  <p>Click Review + create to validate your settings and proceed with workspace creation.</p>
                  <p className="mt-3">While creating an Azure Databricks workspace, Azure automatically creates a separate resource group called a <strong>Managed Resource Group</strong>. This group contains and manages all the supporting resources required for the Databricks workspace, as shown in the screenshot below.</p>
                </div>
                <ImageGallery images={getImages('image90')} />
              </div>
            </div>

            {/* Workspace Overview */}
            <div id="workspace-overview" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">8. Databricks Workspace Overview</h4>
              <div className="space-y-4 text-gray-300">
                <div className="space-y-3 mb-4">
                  <p><strong className="text-blue-400">Click on Databricks Workspace</strong></p>
                  <p><strong className="text-blue-400">Click on the launch workspace button</strong></p>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Left Sidebar (Navigation Menu):</h5>
                  <p className="mb-3">The left-hand menu provides quick access to all major Databricks features and tools:</p>
                  <div className="space-y-3">
                    <div>
                      <strong className="text-blue-400">Workspace:</strong> Where you can create and organize notebooks, folders, and projects.
                    </div>
                    <div>
                      <strong className="text-blue-400">Recents:</strong> Shows recently opened notebooks or files.
                    </div>
                    <div>
                      <strong className="text-blue-400">Catalog:</strong> Central place to access and manage data using Unity Catalog. It is delta lake.
                    </div>
                    <div>
                      <strong className="text-blue-400">Jobs & Pipelines:</strong> For automating workflows, scheduling data processing, or running ETL pipelines.
                    </div>
                    <div>
                      <strong className="text-blue-400">Compute:</strong> Manage clusters and compute resources used for data processing.
                    </div>
                    <div>
                      <strong className="text-blue-400">Marketplace:</strong> Discover and use prebuilt datasets, notebooks, and solutions.
                    </div>
                    <div>
                      <strong className="text-blue-400">SQL Section:</strong>
                      <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                        <li><strong>SQL Editor:</strong> Write and run SQL queries.</li>
                        <li><strong>Queries / Dashboards:</strong> Create and view reports and dashboards.</li>
                        <li><strong>Genie & Alerts:</strong> Access AI-powered query tools and set up notifications.</li>
                        <li><strong>SQL Warehouses:</strong> Manage dedicated SQL compute environments.</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-blue-400">Data Engineering Section:</strong>
                      <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                        <li><strong>Job Runs / Data Ingestion:</strong> Monitor job executions and load data into Databricks.</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-blue-400">AI/ML Section:</strong>
                      <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                        <li><strong>1. Playground (Mosaic AI Playground):</strong> Interactive environment for experimenting with generative AI models (like LLMs). You can test prompts, analyze responses, and refine model behavior — all in a no-code or low-code interface.</li>
                        <li><strong>2. Experiments:</strong> Track, compare, and manage machine learning runs. Integrates with MLflow Tracking.</li>
                        <li><strong>3. Features (Feature Store):</strong> Central repository for machine learning features. Allows teams to create, share, and reuse features across multiple models and projects.</li>
                        <li><strong>4. Models (Model Registry):</strong> Store, version, and manage ML models created during experiments.</li>
                        <li><strong>5. Serving (Model Serving):</strong> Deploy ML models as REST API endpoints directly from Databricks.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Main Panel (Welcome Screen):</h5>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Displays a welcome message and a quick setup option — "Set up your workspace."</li>
                    <li>Provides a search bar to quickly find data, notebooks, or past work.</li>
                    <li>Contains quick links like Recents, Favorites, Popular, and Mosaic AI to navigate faster.</li>
                    <li>The "+ New" button lets you start creating a new notebook, job, or dashboard immediately.</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Top Navigation Bar:</h5>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Shows your workspace name (e.g., ohg365-db-dev).</li>
                    <li>Allows switching between workspaces or accessing your account settings.</li>
                    <li>Contains shortcuts to Microsoft Azure and Databricks home.</li>
                  </ul>
                </div>
                <ImageGallery images={getImages('image91')} />
              </div>
            </div>

            {/* Databricks Features */}
            <div id="databricks-features" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">9. Databricks Features</h4>
              <div className="space-y-8 text-gray-300">
                {/* Workspace */}
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Workspace</h5>
                  <p className="mb-4">The Workspace in Databricks is a collaborative environment where data engineers, data scientists, and analysts can create, share, and manage all Databricks-related resources such as notebooks, libraries, dashboards, and folders.</p>
                  
                  <div className="mt-4">
                    <h6 className="text-lg font-semibold text-blue-400 mb-3">Key Components in the Workspace</h6>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-600 text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-2 text-left">Component</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Repos</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Used for Git integration. It allows you to link your Databricks workspace to repositories in GitHub, Azure DevOps, or Bitbucket to manage version control for notebooks and projects.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Shared</strong></td>
                            <td className="border border-gray-600 px-4 py-2">A shared folder accessible to multiple team members in your workspace. It's commonly used for collaboration on notebooks, models, and scripts.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Users</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Contains individual user folders. Each user has a personal workspace where they can create and manage private notebooks and experiments.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Home / Shared with me</strong></td>
                            <td className="border border-gray-600 px-4 py-2">"Home" is your personal starting directory, while "Shared with me" lists notebooks or folders shared by other users.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Favorites / Trash</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Favorites: Quickly access important or frequently used notebooks. Trash: Contains deleted notebooks or folders which can be restored or permanently removed.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h6 className="text-lg font-semibold text-blue-400 mb-3">Other Creation Options in the Dropdown</h6>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-600 text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-2 text-left">Option</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Purpose</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr><td className="border border-gray-600 px-4 py-2">Folder</td><td className="border border-gray-600 px-4 py-2">Create a new folder to organize notebooks or scripts.</td></tr>
                          <tr><td className="border border-gray-600 px-4 py-2">Git Folder</td><td className="border border-gray-600 px-4 py-2">Connect to a Git repository for version control.</td></tr>
                          <tr><td className="border border-gray-600 px-4 py-2">Notebook</td><td className="border border-gray-600 px-4 py-2">Create a new Databricks notebook for code, visualization, or data analysis (Python, SQL, R, or Scala).</td></tr>
                          <tr><td className="border border-gray-600 px-4 py-2">File</td><td className="border border-gray-600 px-4 py-2">Upload or create a script or configuration file.</td></tr>
                          <tr><td className="border border-gray-600 px-4 py-2">Query</td><td className="border border-gray-600 px-4 py-2">Write SQL queries directly against your datasets.</td></tr>
                          <tr><td className="border border-gray-600 px-4 py-2">Dashboard</td><td className="border border-gray-600 px-4 py-2">Build visual dashboards from your queries.</td></tr>
                          <tr><td className="border border-gray-600 px-4 py-2">Genie Space</td><td className="border border-gray-600 px-4 py-2">Access AI-powered analytics assistant.</td></tr>
                          <tr><td className="border border-gray-600 px-4 py-2">ETL Pipeline</td><td className="border border-gray-600 px-4 py-2">Design and automate data pipelines.</td></tr>
                          <tr><td className="border border-gray-600 px-4 py-2">Alert</td><td className="border border-gray-600 px-4 py-2">Set up notifications for query results or data changes.</td></tr>
                          <tr><td className="border border-gray-600 px-4 py-2">MLflow Experiment</td><td className="border border-gray-600 px-4 py-2">Track machine learning experiments, metrics, and models.</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <ImageGallery images={getImages('image92')} />
                </div>

                {/* Notebook */}
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Notebook</h5>
                  <p className="mb-3">Azure Databricks notebooks serve as a collaborative development environment for building data science, engineering, and machine learning workflows.</p>
                  <p className="mb-3">They support multi-language scripting within a single document, real-time coauthoring, version control, and integrated data visualization.</p>
                  <p className="mb-3">These features help streamline code development, data exploration, and result presentation in a unified platform.</p>
                  <div className="mt-3">
                    <h6 className="text-lg font-semibold text-blue-400 mb-2">Create First Notebook:</h6>
                    <p><strong>Recents:</strong> Shows recently opened notebooks or files.</p>
                  </div>
                  <ImageGallery images={getImages('image93')} />
                </div>

                {/* Catalog and Features */}
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Catalog and Features (Unity Catalog)</h5>
                  <p className="mb-4">The Catalog in Azure Databricks is a central place to organize, manage, and secure all your data assets such as databases, tables, views, and files — across your entire Databricks environment. It provides data governance, access control, and data discovery in one interface.</p>
                  
                  <div className="mt-4">
                    <h6 className="text-lg font-semibold text-blue-400 mb-3">Key Components in the Screenshot</h6>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-600 text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-2 text-left">Section</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>My Organization</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Lists catalogs created within your workspace — for example, ohg365_db_dev, system, and others. These hold schemas (databases) and tables.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Delta Shares Received</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Displays data shared with you from other Databricks workspaces using Delta Sharing, a secure open protocol for data sharing.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Legacy (hive_metastore)</strong></td>
                            <td className="border border-gray-600 px-4 py-2">The old default data catalog (used before Unity Catalog). It contains older Hive-based tables and schemas.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Search Bar</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Lets you quickly find data assets (catalogs, schemas, tables).</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Quick Access (Right Panel)</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Displays recently viewed or favorite datasets, making it easier to return to frequently used data.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h6 className="text-lg font-semibold text-blue-400 mb-2">Top Menu Options:</h6>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Delta Sharing:</strong> Manage secure data sharing between organizations.</li>
                      <li><strong>Clean Rooms:</strong> Enable collaboration on shared data without moving or copying it.</li>
                      <li><strong>External Data:</strong> Connect to external sources like Azure Data Lake or Blob Storage.</li>
                      <li><strong>Governance:</strong> Manage access permissions, auditing, and compliance.</li>
                      <li><strong>Add Data:</strong> Option to import or register new datasets into the catalog.</li>
                    </ul>
                  </div>
                  <ImageGallery images={getImages('image94')} />
                </div>

                {/* Jobs & Pipelines */}
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Jobs & Pipelines</h5>
                  <p className="mb-4">The Jobs & Pipelines interface in Azure Databricks provides a unified orchestration layer for data engineering and machine learning workflows. It supports job scheduling, dependency management, pipeline orchestration, and execution monitoring.</p>
                  
                  <div className="mt-4">
                    <h6 className="text-lg font-semibold text-blue-400 mb-3">Key Features</h6>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Ingestion Pipelines:</strong> Automate ingestion from external data sources (databases, APIs, or files).</li>
                      <li><strong>ETL Pipelines:</strong> Design scalable, production-grade ETL processes using SQL, PySpark, or Python.</li>
                      <li><strong>Jobs:</strong> Orchestrate notebooks, workflows, pipelines, and queries; configure parameters, cluster settings, and triggers.</li>
                      <li><strong>Job Runs Dashboard:</strong> Monitor run history, logs, and metrics for troubleshooting and optimization.</li>
                      <li><strong>Access Control:</strong> Manage visibility ("Owned by me," "Accessible by me") to enforce workspace-level governance.</li>
                    </ul>
                  </div>

                  <div className="mt-4">
                    <h6 className="text-lg font-semibold text-blue-400 mb-3">Use Case</h6>
                    <p>Used by data engineers and ML teams to build end-to-end pipelines from data ingestion to transformation, feature generation, and model retraining all under one environment.</p>
                  </div>

                  <div className="mt-4">
                    <h6 className="text-lg font-semibold text-blue-400 mb-3">The Job Runs Dashboard</h6>
                    <p className="mb-3">The Job Runs dashboard in Databricks provides an operational view of scheduled or triggered workflows. It allows engineers and ML teams to monitor, debug, and analyze job executions across environments.</p>
                    
                    <h6 className="text-lg font-semibold text-blue-400 mb-2">Key Functionalities</h6>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li><strong>Run Filtering:</strong> Filter runs by job, user, time range, run status, or error code.</li>
                      <li><strong>Run Visualization:</strong> Graph at the top visualizes the number of successful, failed, or skipped runs over time.</li>
                      <li><strong>Detailed Metadata:</strong> For each run, Databricks records the execution context — start/end time, duration, compute used, and run parameters.</li>
                      <li><strong>Error Handling:</strong> Provides error codes and logs to diagnose failure causes (e.g., cluster issues, data errors, script exceptions).</li>
                      <li><strong>Audit & Compliance:</strong> Maintains a complete audit trail for all pipeline executions — critical for production governance.</li>
                    </ul>

                    <h6 className="text-lg font-semibold text-blue-400 mb-2 mt-4">What You See:</h6>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Start time</strong> → When the job started.</li>
                      <li><strong>Job name</strong> → Which job ran (for example, "ETL Pipeline").</li>
                      <li><strong>Run as</strong> → Which user or role ran it.</li>
                      <li><strong>Duration</strong> → How long it took.</li>
                      <li><strong>Status</strong> → Shows if it succeeded, failed, or skipped.</li>
                      <li><strong>Error code</strong> → Displays the error message if something failed.</li>
                      <li><strong>Run parameters</strong> → Lists any input values (like parameters) used in that run.</li>
                    </ul>
                  </div>
                  <ImageGallery images={getImages('image95')} />
                </div>

                {/* Compute (Clusters) */}
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Compute (Clusters)</h5>
                  
                  <div className="mt-4">
                    <h6 className="text-lg font-semibold text-blue-400 mb-3">Compute Categories</h6>
                    
                    <div className="mb-4">
                      <strong className="text-white">All-Purpose Compute (Interactive Clusters):</strong>
                      <ul className="list-disc list-inside space-y-1 ml-4 mt-1">
                        <li>Designed for notebook-driven, collaborative data exploration.</li>
                        <li>Supports multi-user access, auto-scaling, and auto-termination.</li>
                        <li>Ideal for data science, ad-hoc analysis, and ML development.</li>
                      </ul>
                    </div>

                    <div className="mb-4">
                      <strong className="text-white">Job Compute (Automated Clusters):</strong>
                      <ul className="list-disc list-inside space-y-1 ml-4 mt-1">
                        <li>Spawned by the Jobs API or Databricks Workflows for pipeline orchestration.</li>
                        <li>Clusters are automatically created, executed, and terminated per job run.</li>
                        <li>Ideal for CI/CD, ETL, and production pipelines.</li>
                      </ul>
                    </div>

                    <div className="mb-4">
                      <strong className="text-white">SQL Warehouses (Serverless and Classic):</strong>
                      <ul className="list-disc list-inside space-y-1 ml-4 mt-1">
                        <li>Purpose-built compute for data analysts and BI tools.</li>
                        <li>Integrates with Power BI, Tableau, and Databricks SQL Dashboards.</li>
                        <li>Serverless option scales automatically and charges only for query duration.</li>
                      </ul>
                    </div>

                    <div>
                      <strong className="text-white">Vector Search & Lakehouse AI (new additions):</strong>
                      <ul className="list-disc list-inside space-y-1 ml-4 mt-1">
                        <li>Supports AI/ML model deployment, feature lookups, and semantic search.</li>
                        <li>Works with Unity Catalog and Model Serving endpoints for production AI systems.</li>
                      </ul>
                    </div>
                  </div>
                  <ImageGallery images={getImages('image97')} />
                </div>

                {/* Marketplace */}
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Marketplace</h5>
                  <p className="mb-4">Databricks Marketplace is a data and AI exchange platform that allows users to discover, share, and monetize datasets, AI models, and notebooks within the Databricks Lakehouse ecosystem — all powered by Delta Sharing (the open standard for secure data sharing).</p>
                  
                  <p className="mb-3">It's designed to make it easy for organizations to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                    <li>Access third-party datasets (financial, marketing, healthcare, etc.)</li>
                    <li>Share their own data products securely</li>
                    <li>Speed up analytics and AI innovation without complex data integrations</li>
                  </ul>

                  <div className="mt-4">
                    <h6 className="text-lg font-semibold text-blue-400 mb-3">Key Components</h6>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-600 text-sm">
                        <thead>
                          <tr className="bg-gray-700">
                            <th className="border border-gray-600 px-4 py-2 text-left">Component</th>
                            <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Marketplace Listings</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Published datasets, ML models, or notebooks.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Providers</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Organizations offering data or AI content (e.g., FactSet, Salesforce).</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Consumers</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Databricks users or organizations that subscribe to listings.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Delta Sharing Protocol</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Enables secure, open-standard data exchange between different platforms.</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-600 px-4 py-2"><strong>Unity Catalog Integration</strong></td>
                            <td className="border border-gray-600 px-4 py-2">Ensures governance, lineage, and access control for shared assets.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <ImageGallery images={getImages('image98')} />
                </div>
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
                  The <strong className="text-blue-400">SQL Editor</strong> in Databricks allows users to write, run, and visualize SQL queries directly on data stored in Unity Catalog, Delta tables, or external databases — all without needing to create a separate notebook.
                </p>
                <p>
                  It's designed for:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Data Analysts</li>
                  <li>BI Developers</li>
                  <li>Data Engineers</li>
                  <li>Business users who prefer SQL-based analytics</li>
                </ul>
                <p className="mt-3">
                  Think of the SQL Editor as a notepad for data inside Databricks — where you can write and run SQL commands (like SELECT, JOIN, GROUP BY, etc.) on your company's data tables. It's like working in SQL Server Management Studio (SSMS) or MySQL Workbench — but directly connected to your Databricks Lakehouse.
                </p>
                
                <div className="p-4 bg-gray-800 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Key Options</h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="border border-gray-600 px-4 py-2 text-left">Option</th>
                          <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>Run all (1000)</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Executes your SQL query. The "1000" indicates the max number of rows returned.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>Database Selector (default)</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Lets you choose which catalog, schema, or database to query from.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>Generate (AI)</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Databricks Assistant can auto-generate SQL queries using AI (Ctrl + I).</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>Connect</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Allows you to choose which SQL warehouse (compute cluster) to run the query on.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>Schedule</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Lets you set up automated query runs (for reports or alerts).</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>Share</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Share your query or results with other Databricks users.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>Save</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Save your query as a draft, dashboard widget, or SQL alert.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>Add Parameter</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Add variables like dates or IDs dynamically to queries.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Advanced SQL Editor Features</h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="border border-gray-600 px-4 py-2 text-left">Feature</th>
                          <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>AI Assistant (Generate)</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Use AI (Ctrl + I) to create SQL automatically from a prompt (e.g., "show top 10 products by revenue").</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>Visual Output</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Query results can be visualized as tables, bar charts, line graphs, etc.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>Saved Queries</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Queries can be stored and reused from the "Queries" tab.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>Query Parameters</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Dynamic filters can be used for dashboards and alerts.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>Scheduling & Alerts</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Run queries hourly/daily and send alerts when thresholds are reached.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>Integration with SQL Warehouses</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Choose a compute cluster optimized for BI workloads.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>Export Options</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Export results as CSV or share within a dashboard.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Professional Use Cases</h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="border border-gray-600 px-4 py-2 text-left">Role</th>
                          <th className="border border-gray-600 px-4 py-2 text-left">Example Use Case</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">Data Analyst</td>
                          <td className="border border-gray-600 px-4 py-2">Ad-hoc query and visualization for business reports</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">Data Engineer</td>
                          <td className="border border-gray-600 px-4 py-2">Validate Delta table transformations</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">BI Developer</td>
                          <td className="border border-gray-600 px-4 py-2">Build dashboards directly from SQL Editor</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">Data Scientist</td>
                          <td className="border border-gray-600 px-4 py-2">Fetch clean subsets of data for ML notebooks</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2">Manager / Stakeholder</td>
                          <td className="border border-gray-600 px-4 py-2">View high-level KPIs in SQL dashboards</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <ImageGallery images={getImages('image99')} />
              </div>
            </div>

            {/* Queries */}
            <div id="queries" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">2. Queries</h4>
              <div className="space-y-4 text-gray-300">
                <p>
                  The Queries interface lets you develop and manage SQL statements that interact directly with data in Databricks SQL Warehouses. You can track query execution history, collaborate with team members, tag queries for organization, and use scheduling for automated reporting.
                </p>
                
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Available Options in the Queries Section</h5>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Create Query</strong> – Opens a new SQL editor window where you can start writing SQL statements.</li>
                    <li><strong>Open Editor</strong> – Quickly navigate back to the SQL editor to modify existing queries.</li>
                    <li><strong>Filter Queries</strong> – Search for queries by name or tag.</li>
                    <li><strong>Tabs:</strong>
                      <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                        <li><strong>My Queries</strong> – Shows only your saved queries.</li>
                        <li><strong>Favorites</strong> – Displays queries you've marked as important.</li>
                        <li><strong>All Queries</strong> – Lists all available queries within the workspace.</li>
                      </ul>
                    </li>
                    <li><strong>Created By / Created At</strong> – Helps you identify who created the query and when.</li>
                    <li><strong>Query History</strong> – Access past runs, view execution times, and troubleshoot failed queries.</li>
                    <li><strong>Dashboards Integration</strong> – Save query results and directly add them to dashboards for visualization.</li>
                  </ul>
                </div>
                <ImageGallery images={getImages('image101')} />
              </div>
            </div>

            {/* Dashboards */}
            <div id="dashboards" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">3. Dashboards</h4>
              <div className="space-y-4 text-gray-300">
                <p>
                  Databricks Dashboards provide a powerful visualization layer built directly on top of Databricks SQL. They support real-time data refresh, query scheduling, and access control for collaboration.
                </p>
                <p>
                  You can embed dashboards in other apps or share them securely within your workspace. It's great for operational monitoring, BI reporting, and executive summaries.
                </p>
                
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">Options and Features in the Dashboard Section</h5>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Create Dashboard</strong> – Start building your own dashboard from scratch using your saved queries or visualizations.</li>
                    <li><strong>View Samples Gallery</strong> – Explore prebuilt sample dashboards such as NYC Taxi Trip Analysis and Retail Revenue & Supply Chain to understand layout and visualization options.</li>
                    <li><strong>Filter Dashboards</strong> – Quickly search for dashboards by name or owner.</li>
                    <li><strong>Tabs:</strong>
                      <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                        <li><strong>All</strong> – Displays every dashboard you have access to.</li>
                        <li><strong>Favorites</strong> – Your bookmarked dashboards.</li>
                        <li><strong>Popular</strong> – Dashboards frequently viewed by others.</li>
                      </ul>
                    </li>
                    <li><strong>Last Modified / Owner Filters</strong> – Sort and manage dashboards based on activity or ownership.</li>
                    <li><strong>Legacy Dashboards</strong> – View or migrate older dashboards built using the classic interface.</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Visualization Types Supported:</h5>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Bar, Line, Area, and Pie charts</li>
                    <li>Scatter plots and maps</li>
                    <li>Summary tables and KPI cards</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Integration:</h5>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Link dashboards directly to Queries or Notebooks</li>
                    <li>Automate data refresh schedules</li>
                    <li>Share via workspace or URL</li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Legacy Dashboards</h5>
                  <p className="mb-3">Legacy Dashboards in Databricks are maintained mainly for backward compatibility. They support dashboards created with the classic Databricks SQL editor.</p>
                  <p className="mb-3">While functional, they lack newer visualization features, layout flexibility, and integration capabilities present in the modern dashboards.</p>
                  <p className="mb-3">It's recommended to migrate older dashboards to the new dashboarding experience for improved performance, interactivity, and long-term support.</p>
                  
                  <h6 className="text-lg font-semibold text-blue-400 mb-2 mt-3">Key Options and Features (Legacy Dashboards Section)</h6>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Tabs and Filters:</strong> My Dashboards, Favorites, All Dashboards, Filter Dashboards</li>
                    <li><strong>Actions Available:</strong> View Samples Gallery, Create Dashboard</li>
                    <li><strong>Legacy Dashboard Use Cases:</strong> Maintaining compatibility with older workflows, Referencing historical SQL visualizations, Supporting BI users during migration to new dashboards</li>
                  </ul>
                </div>
                <ImageGallery images={getImages('image102')} />
              </div>
            </div>

            {/* Genie */}
            <div id="genie" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">4. Genie</h4>
              <div className="space-y-4 text-gray-300">
                <p>
                  <strong className="text-blue-400">Databricks Genie</strong> is a Generative AI-powered assistant built into the Databricks SQL workspace. It allows users to ask questions about data using natural language (like English sentences) — and Genie automatically generates SQL queries, runs them, and visualizes the results.
                </p>
                <p>
                  Genie uses natural language understanding (NLU) to parse questions and generate optimized SQL queries based on data catalog metadata. It can work across Unity Catalog, SQL Warehouses, and Delta Tables.
                </p>
                <p>
                  Ideal for:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Data analysts exploring ad hoc questions</li>
                  <li>Business users performing self-service analytics</li>
                  <li>Teams collaborating in Genie "Spaces" to share question-answer results</li>
                </ul>
                
                <div className="p-4 bg-gray-800 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Key Options in the Genie Interface</h5>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Filter spaces</strong> – Search for an existing "Genie Space." A space is like a shared workspace for Genie conversations.</li>
                    <li><strong>Tabs:</strong>
                      <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                        <li><strong>All</strong> – View all Genie spaces accessible to you.</li>
                        <li><strong>Favorites</strong> – Quickly access frequently used spaces.</li>
                        <li><strong>Popular</strong> – See trending Genie spaces used by your team.</li>
                      </ul>
                    </li>
                    <li><strong>Last Modified</strong> – Sort by recent updates.</li>
                    <li><strong>Owner</strong> – Filter by creator or data owner.</li>
                    <li><strong>New</strong> – Create a new Genie space to start a natural language query session. Add datasets or tables. Ask AI questions about those datasets. Save and share results or charts.</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Genie Spaces</h5>
                  <p className="mb-2">A Genie Space is a shared area where you can:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Add datasets or views</li>
                    <li>Ask natural language questions</li>
                    <li>Save queries and visualizations</li>
                    <li>Collaborate with team members</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Advantages of Databricks Genie</h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="border border-gray-600 px-4 py-2 text-left">Feature</th>
                          <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>🤖 AI-driven</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Converts natural language to accurate SQL</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>⚡ Fast Insights</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Quick data exploration without manual queries</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>📈 Visualization</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Auto-generates charts and dashboards</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>🔒 Secure</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Works with Unity Catalog permissions</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>👥 Collaborative</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Supports multi-user spaces and shared queries</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>🧩 Integrated</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Works with SQL Warehouses and Delta tables</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Alerts */}
            <div id="alerts" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">5. Alerts</h4>
              <div className="space-y-4 text-gray-300">
                <p>
                  Alerts in Azure Databricks help you automatically monitor data conditions or metrics in your SQL queries and get notified when something important changes. They make it easy to track trends, catch issues early, and stay updated without checking dashboards manually.
                </p>
                <p>
                  Alerts can be connected to SQL queries, dashboards, or KPIs across Unity Catalog datasets.
                </p>
                <p>You can:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Automate anomaly detection for production data.</li>
                  <li>Trigger alerts for pipeline monitoring, threshold breaches, or data quality checks.</li>
                  <li>Integrate alerts into workflow tools like Azure Monitor or Slack using webhooks.</li>
                </ul>
                
                <div className="p-4 bg-gray-800 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Advanced configurations let you:</h5>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Adjust the schedule frequency.</li>
                    <li>Add multiple recipients.</li>
                    <li>Manage alerts programmatically via the Databricks REST API.</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Key Elements in the Alerts UI</h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="border border-gray-600 px-4 py-2 text-left">Element</th>
                          <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>🔍 Filter alerts</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Search existing alerts by name or keyword.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>📁 My alerts / All alerts</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Switch between alerts you created and those shared by your team.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>🧾 List section</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Displays alert name, status, last updated time, creator, and creation date.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>➕ Create alert</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Start setting up a new data alert (SQL query-based).</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>⏪ Previous / Next</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Navigate between pages if you have multiple alerts.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Benefits of Using Databricks Alerts</h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="border border-gray-600 px-4 py-2 text-left">Feature</th>
                          <th className="border border-gray-600 px-4 py-2 text-left">Benefit</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>⚡ Automated Monitoring</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Tracks metrics and thresholds continuously</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>📩 Notifications</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Sends alerts via email or webhooks</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>👥 Collaboration</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Share alerts across teams or workspaces</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>🔒 Secure</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Follows Unity Catalog access controls</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>🧩 Integrated</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Works with queries, dashboards, and pipelines</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <ImageGallery images={getImages('image106')} />
              </div>
            </div>

            {/* Query History */}
            <div id="query-history" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">6. Query History</h4>
              <div className="space-y-4 text-gray-300">
                <p>
                  The Query History page in Databricks provides a complete log of all SQL queries executed in your workspace. It helps users monitor performance, debug issues, track usage, and ensure compliance — all in one place.
                </p>
                <p>
                  The Query History view is essential for monitoring performance, auditing, and optimizing workloads:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>You can track resource utilization across multiple SQL warehouses.</li>
                  <li>It's useful for troubleshooting slow-running queries.</li>
                  <li>The Source column identifies where the query originated: SQL Editor, Dashboard, Alert, API or Notebook.</li>
                  <li>You can also export query metrics via REST API for deeper analytics.</li>
                  <li>Integration with Unity Catalog ensures secure tracking of all user-level activity across workspaces.</li>
                </ul>
                
                <div className="p-4 bg-gray-800 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Key Options and Columns</h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="border border-gray-600 px-4 py-2 text-left">Element</th>
                          <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>👤 User</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Shows who ran the query (e.g., your email ID). Helps identify the query owner.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>📅 Date Range (Last 7 days)</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Filters query history by time period (e.g., last day, week, month, or custom range).</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>⚙️ Compute</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Filters queries based on the SQL Warehouse or cluster used.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>⏱️ Duration</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Lets you filter by how long queries took to run.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>🟢 Status</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Shows whether a query succeeded, failed, or was canceled.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>📜 Statement / Statement ID</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Displays SQL text and a unique identifier for each run. Useful for debugging or tracking jobs.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>🔄 Refresh / Reset filters</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Reloads or clears filters to show all results again.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>🧮 Columns in the table</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Includes Query, Started at, Duration, Source, Compute, User — all helping in tracking query performance.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Common Use Cases</h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="border border-gray-600 px-4 py-2 text-left">Use Case</th>
                          <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>🧾 Audit Log</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Track which users are querying what data for compliance or governance.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>🧠 Performance Analysis</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Identify long-running queries and optimize them.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>⚡ Troubleshooting</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Debug query failures using statement IDs.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>🧍‍♂️ Collaboration</strong></td>
                          <td className="border border-gray-600 px-4 py-2">See who ran what and when for shared datasets.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>🔔 Alert Review</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Review the queries triggered by scheduled alerts or dashboards.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <ImageGallery images={getImages('image107')} />
              </div>
            </div>

            {/* SQL Data Warehouse */}
            <div id="sql-data-warehouse" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">7. SQL Data Warehouse</h4>
              <div className="space-y-4 text-gray-300">
                <p>
                  A SQL Warehouse (formerly called SQL Endpoint) is the compute resource in Databricks used to run SQL queries, dashboards, and alerts. It is designed for data analysts, BI developers, and engineers who work with SQL-based data processing — similar to how a cluster runs notebooks, but optimized for SQL workloads.
                </p>
                
                <div className="p-4 bg-gray-800 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Key Components (from Screenshot)</h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="border border-gray-600 px-4 py-2 text-left">Section</th>
                          <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>🔹 Compute Tab</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Displays different compute options: All-purpose compute, Job compute, SQL warehouses, etc.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>🔹 SQL Warehouses Tab</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Dedicated area to view, start, stop, and manage all SQL Warehouses.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>🔹 Filter SQL warehouses</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Search and filter warehouses by name.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>🔹 Only my SQL warehouses</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Show only the warehouses created by you.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>🔹 Created by / Size / Status / Type</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Shows details about the warehouse (who made it, its size, whether it's active, and its type).</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>🔹 Create SQL warehouse button</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Used to create a new warehouse. Disabled if permissions are limited.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Warehouse Properties (Visible Example)</h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="border border-gray-600 px-4 py-2 text-left">Property</th>
                          <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>🏷️ Name</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Serverless Starter Warehouse — this is a default pre-configured warehouse.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>👤 Created by</strong></td>
                          <td className="border border-gray-600 px-4 py-2">The user who created it (e.g., manoj vemula).</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>⚙️ Size</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Defines compute power (Small, Medium, Large, etc.). Determines speed and cost.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>🔁 Active / Max</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Shows how many users or queries are currently running on the warehouse.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>☁️ Type</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Serverless — means Databricks automatically manages compute resources.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">Types of SQL Warehouses</h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="border border-gray-600 px-4 py-2 text-left">Type</th>
                          <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                          <th className="border border-gray-600 px-4 py-2 text-left">Use Case</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>🧠 Serverless SQL Warehouse</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Fully managed by Databricks. Scales automatically and starts instantly.</td>
                          <td className="border border-gray-600 px-4 py-2">Great for quick analysis and dashboards.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>⚙️ Classic (Pro) SQL Warehouse</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Requires manual scaling and management. You control cluster size and scaling.</td>
                          <td className="border border-gray-600 px-4 py-2">Used for enterprise workloads needing more control and predictable cost.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">When You Click "Create SQL Warehouse"</h5>
                  <p className="mb-3">You can define:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Name</strong> of warehouse</li>
                    <li><strong>Cluster size</strong> (e.g., Small, Medium, 2X-Large)</li>
                    <li><strong>Auto-stop</strong> timeout to save costs</li>
                    <li><strong>Max concurrency</strong> (how many queries run at once)</li>
                    <li><strong>Permissions</strong> (who can access or run queries)</li>
                    <li><strong>Channel</strong> (stable, preview, etc.)</li>
                  </ul>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg mt-4">
                  <h5 className="text-xl font-semibold text-white mb-3">🧮 Technical Features</h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-600 text-sm">
                      <thead>
                        <tr className="bg-gray-700">
                          <th className="border border-gray-600 px-4 py-2 text-left">Feature</th>
                          <th className="border border-gray-600 px-4 py-2 text-left">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>🚀 Elastic scaling</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Automatically adjusts resources to handle varying workloads.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>💰 Pay-per-use</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Charged per DBU (Databricks Unit) based on compute time.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>📊 Optimized for BI Tools</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Integrates with Power BI, Tableau, and Looker for live queries.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>🧠 Serverless Architecture</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Starts instantly; no need to wait for cluster startup.</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-600 px-4 py-2"><strong>🔒 Unity Catalog Integration</strong></td>
                          <td className="border border-gray-600 px-4 py-2">Enforces data access control and audit policies.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <ImageGallery images={getImages('image108', 'image109', 'image110', 'image111', 'image112')} />
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
