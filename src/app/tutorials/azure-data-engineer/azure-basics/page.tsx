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
              <div className="space-y-4 text-gray-300">
              <p className="text-gray-300">1. Azure hierarchy</p>
              <p className="text-gray-300">1. Management -GGroups (The Top-Level)</p>
              <p className="text-gray-300">What it is: This is the highest level of Azure’s struncture. It's like a parent folder that helps organize your entire Azure environment.</p>
              <p className="text-gray-300">Purpose: It helps you manage ad organize multiple subscriptionns across your organization. You ca group subscriptionns based o departments, teams, or projects.</p>
              <p className="text-gray-300">Example: Imagine a company with multiple divisions, like Finance, IT, ad Marketing. You could have separate management GGroups for each of these divisions.</p>
              <p className="text-gray-300">2. Subscriptios (Middle Layer)</p>
              <p className="text-gray-300">What it is: Udereath management GGroups, you have subscriptionns. A subscription is like a container for Azure resources, where you’ll define limits o resources ad billing.</p>
              <p className="text-gray-300">Purpose: It helps with orgaizig resources, maagig access, ad billing. You ca have multiple subscriptionns for different projects or teams. Each subscription has it's ow resource limits ad billing.</p>
              <p className="text-gray-300">Example: If your company has different projects, like a website ad a app, you could create separate subscriptionns for them. Oe for the website, oe for the app.</p>
              <p className="text-gray-300">3. Resource -GGroups (Sub-Cotaiers)</p>
              <p className="text-gray-300">What it is: Inside each subscription, you ca have resource GGroups. These are containers that hold related resources.</p>
              <p className="text-gray-300">Purpose: They help organize resources based o their lifecycle ad permissions. All the resources i a group are usually related to the same project or service.</p>
              <p className="text-gray-300">Example: If you're building a web app, you might have a resource group called "rg-ohg365-dev" where you store everything related to the app, such as databases, storage accounts, ad virtual machines.</p>
              <p className="text-gray-300">4. Resources (The Actual Items)</p>
              <p className="text-gray-300">What it is: These are the individual services or products that you create i Azure, like virtual machines (VMs), storage accounts, databases, or etworks.</p>
              <p className="text-gray-300">Purpose: This is where the actual work happens! Resources are the building blocks of your cloud environment.</p>
              <p className="text-gray-300">Example: I your "rg-ohg365-dev" resource group, you could have resources like a VM to run your website, a database to store your data, ad a storage accout for storing files.</p>
              <p className="text-gray-300">Management -GGroups: High-level containers for orgaizig multiple subscriptionns.</p>
              <ImageGallery images={getImages('image1')} />
              <ImageGallery images={getImages('image2')} />
              <p className="text-gray-300">Subscriptios: They hold resources ad manage access to resources.</p>
              <ImageGallery images={getImages('image3')} />
              <ImageGallery images={getImages('image4')} />
              <p className="text-gray-300">Resource -GGroups: Cotaiers iside subscriptionns to organize ad manage resources by project or lifecycle.</p>
              <ImageGallery images={getImages('image5')} />
              <ImageGallery images={getImages('image6')} />
              <p className="text-gray-300">Resources: The actual services you use i Azure.</p>
              <p className="text-gray-300">2. Resource -roup</p>
              <p className="text-gray-300">2.1 What is a Resource -roup?</p>
              <p className="text-gray-300">A Resource -roup i Azure is like a folder that holds all the resources (services) related to a project or app.</p>
              <p className="text-gray-300">For example:If you build a website, you might have:</p>
              <p className="text-gray-300">A Virtual Machie (VM) for the web server</p>
              <p className="text-gray-300">A Storage Accout for images</p>
              <p className="text-gray-300">A Database for user data</p>
              <p className="text-gray-300">You ca put all of these iside oe Resource -roup - makig it easier to manage, moitor, ad delete them together.</p>
              <p className="text-gray-300">2.2 Create a Resource -roup</p>
              <p className="text-gray-300">Sig i to the Azure Portal</p>
              <p className="text-gray-300">I the search meu, search for Resource GGroups.</p>
              <ImageGallery images={getImages('image5')} />
              <p className="text-gray-300">Click o the resource group ad click o the create butto</p>
              <ImageGallery images={getImages('image7')} />
              <ImageGallery images={getImages('image8')} />
              <ImageGallery images={getImages('image9')} />
              <ImageGallery images={getImages('image10')} />
              <ImageGallery images={getImages('image6')} />
              <p className="text-gray-300">Overview of resource group:</p>
              <p className="text-gray-300">Name: rg-ohg365-dev → This is your Resource -roup’s ame.Usually, ames iclude clues about the project or environment:</p>
              <p className="text-gray-300">rg ✓ Resource -roup</p>
              <p className="text-gray-300">ohg365 ✓ Project or team ame</p>
              <p className="text-gray-300">dev ✓ Eviromet (like dev, test, or prod)</p>
              <p className="text-gray-300">Buttos:</p>
              <p className="text-gray-300">➕ Create: Add ew Azure resources (like VMs, storage, databases).</p>
              <p className="text-gray-300">⚙️ Maage view: Customize how your resources list looks.</p>
              <p className="text-gray-300">🗑️ Delete resource group: Deletes the entire group ad all it's resources (be careful!).</p>
              <p className="text-gray-300">🔁 Refresh: Updates the view if ew resources were added.</p>
              <p className="text-gray-300">📤 Export to CSV: Export your resource details (helpful for reports).</p>
              <p className="text-gray-300">📊 Ope query: Create or run custom filters usig Azure Resource -raph.</p>
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
              <div className="space-y-4 text-gray-300">
              <p className="text-gray-300">3. Azure Blob Storage</p>
              <p className="text-gray-300">Azure Blob Storage is Microsoft’s cloud-based service desiged to store large amouts of data of various types - icludig strunctured, semi-strunctured, ad ustrunctured data.</p>
              <p className="text-gray-300">It is ideal for storing files such as CSV, text, Excel, JSON, Parquet, Avro, XML, images, videos, backups, ad logs.</p>
              <p className="text-gray-300">The term “Blob” stads for Biary Large Object, meaig it ca store ay type of biary data. Blob Storage provides a flat amespace, meaig all files (blobs) are stored i containers withi a storage accout, rather tha i a traditioal hierarchical folder system.</p>
              <p className="text-gray-300">Azure Blob Storage is highly scalable, secure, ad cost-efficiet, makig it suitable for:</p>
              <p className="text-gray-300">Storig ad servig large files (media, documets, etc.)</p>
              <p className="text-gray-300">Data lakes ad aalytics workloads</p>
              <p className="text-gray-300">Backup ad disaster recovery</p>
              <p className="text-gray-300">Archivig ad compliace storage</p>
              <p className="text-gray-300">3.1 Create a Azure Blob Storage:</p>
              <p className="text-gray-300">-o to Azure Portal</p>
              <p className="text-gray-300">I the search bar, type “Storage Accouts” or “blob”</p>
              <ImageGallery images={getImages('image11')} />
              <p className="text-gray-300">Click o storage accounts ad click o create butto</p>
              <ImageGallery images={getImages('image12')} />
              <p className="text-gray-300">Click “Review + Create”</p>
              <ImageGallery images={getImages('image13')} />
              <p className="text-gray-300">1️⃣ Subscriptio</p>
              <p className="text-gray-300">This is where you choose which Azure Subscriptio will ow this storage accout.</p>
              <p className="text-gray-300">A subscription is liked to your billing ad access cotrol.</p>
              <p className="text-gray-300">Example: You might have separate subscriptionns for developmet, testig, or productio environments.🟦 You selected: Azure subscription 1</p>
              <p className="text-gray-300">2️⃣ Resource -roup</p>
              <p className="text-gray-300">Choose or create a Resource -roup to organize related Azure resources.</p>
              <p className="text-gray-300">Resource -GGroups act like folders - all your related resources (VMs, storage, databases) are stored here for easy management.</p>
              <p className="text-gray-300">I your case, you selected rg-ohg365-dev, which is perfect for developmet resources.🟦 Tip: Keepig related resources i the same group helps you track cost, permissions, ad manage everything easily.</p>
              <p className="text-gray-300">3️⃣ Storage Accout Name</p>
              <p className="text-gray-300">This is the uique ame for your storage accout (like a domai ame).</p>
              <p className="text-gray-300">It must be globally uique, lowercase, ad 3–24 characters log.</p>
              <p className="text-gray-300">This ame will form part of the URL to access your data.</p>
              <p className="text-gray-300">🧩 Example:If your ame is blobohg365dev</p>
              <p className="text-gray-300">4️⃣ Preferred Storage Type</p>
              <p className="text-gray-300">Select what kid of storage service you wat to eable.</p>
              </div>
            </div>
            <div id="blob-storage-overview" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">Blob Storage Overview</h4>
              <div className="space-y-4 text-gray-300">
              <p className="text-gray-300">If it appears there, 🎉 cogratulatios - your Blob Storage accout has bee successfully created</p>
              <ImageGallery images={getImages('image16')} />
              <p className="text-gray-300">3.2 Types of Azure Storage Services:</p>
              <p className="text-gray-300">Azure Storage provides four mai types of services uder oe Storage Accout.</p>
              <ImageGallery images={getImages('image17')} />
              <p className="text-gray-300">1️⃣ Blob Service</p>
              <p className="text-gray-300">🧱 Used to store ustrunctured or semi-strunctured data like files, images, videos, logs, ad backups.</p>
              <p className="text-gray-300">🔹 Descriptio:</p>
              <p className="text-gray-300">Stores data as Blobs (Biary Large Objects) iside containers.</p>
              <p className="text-gray-300">Best for storing flat files ad large objects that do’t fit i a database.</p>
              <p className="text-gray-300">Data ca be text, biary, documets, media, or backups.</p>
              <p className="text-gray-300">💾 Example Uses:</p>
              <p className="text-gray-300">Storig images or videos for websites</p>
              <p className="text-gray-300">Backups ad archives</p>
              <p className="text-gray-300">Data lake for aalytics</p>
              <p className="text-gray-300">Hostig static websites</p>
              <p className="text-gray-300">📦 Example File Types:</p>
              <p className="text-gray-300">.txt, .csv, .jso, .xml, .jpg, .mp4, .zip, .bak</p>
              <p className="text-gray-300">2️⃣ File Service</p>
              <p className="text-gray-300">📁 Used for shared file storage that behaves like a traditioal file server.</p>
              <p className="text-gray-300">🔹 Descriptio:</p>
              <p className="text-gray-300">Provides Azure Files, a fully managed file share i the cloud.</p>
              <p className="text-gray-300">Uses the SMB (Server Message Block) or NFS (Network File System) protocols - the same used by o-premises file servers.</p>
              <p className="text-gray-300">Ca be mouted to Widows, Liux, or macOS systems.</p>
              <p className="text-gray-300">💾 Example Uses:</p>
              <p className="text-gray-300">Shared etwork drives for teams</p>
              <p className="text-gray-300">“Lift ad shift” of o-premises file servers</p>
              <p className="text-gray-300">Applicatio cofiguratios shared across multiple VMs</p>
              <p className="text-gray-300">📦 Example Sceario:</p>
              <p className="text-gray-300">You have multiple virtual machines eedig access to the same cofiguratio files - you ca store those files i Azure Files ad mout them just like a shared folder.</p>
              <p className="text-gray-300">3️⃣ Queue Service</p>
              <p className="text-gray-300">📬 Used for reliable messagig betwee applicatio compoets.</p>
              <p className="text-gray-300">🔹 Descriptio:</p>
              <p className="text-gray-300">Provides asychroous commuicatio betwee services usig message queues.</p>
              <p className="text-gray-300">Stores messages i a queue, which ca be processed later by backgroud services or workers.</p>
              <p className="text-gray-300">Esures messages are delivered at least oce ad processed i FIFO (First-I, First-Out) order.</p>
              <p className="text-gray-300">💾 Example Uses:</p>
              <p className="text-gray-300">Sedig backgroud jobs (like image processig or email sedig)</p>
              <p className="text-gray-300">Decouplig app compoets for scalability</p>
              <p className="text-gray-300">Evet-drive architecture</p>
              <p className="text-gray-300">📦 Example Sceario:</p>
              <p className="text-gray-300">A web app uploads a image → seds a message to a queue → a backgroud process picks it up ad resizes the image.</p>
              <p className="text-gray-300">4️⃣ Table Service</p>
              <p className="text-gray-300">🧮 Used to store large amouts of strunctured, o-relatioal data.</p>
              <p className="text-gray-300">🔹 Descriptio:</p>
              <p className="text-gray-300">Provides NoSQL key-value storage.</p>
              <p className="text-gray-300">Stores data i tables with etities (rows) ad properties (colums).</p>
              <p className="text-gray-300">Flexible schema - you ca add or remove colums aytime.</p>
              <p className="text-gray-300">💾 Example Uses:</p>
              <p className="text-gray-300">Storig user profiles, IoT data, or metadata</p>
              <p className="text-gray-300">Fast lookups by key</p>
              <p className="text-gray-300">Lightweight applicatios eedig scalable, cheap storage</p>
              <p className="text-gray-300">📦 Example Sceario:</p>
              <p className="text-gray-300">You have millios of IoT sesors sedig temperature data - you ca store this efficietly i Azure Table Storage.</p>
              <p className="text-gray-300">🧠 Summary Table</p>
              <p className="text-gray-300">Storage Service</p>
              <p className="text-gray-300">Type of Data</p>
              <p className="text-gray-300">Descriptio</p>
              <p className="text-gray-300">Example Use Case</p>
              <p className="text-gray-300">Blob Service</p>
              <p className="text-gray-300">Ustrunctured / Semi-strunctured</p>
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
              <p className="text-gray-300">Strunctured (NoSQL)</p>
              <p className="text-gray-300">Key-value, schema-less table storage</p>
              <p className="text-gray-300">User profiles, IoT data</p>
              <p className="text-gray-300">Explore Blob Service</p>
              <p className="text-gray-300">Oce your storage accout is created:</p>
              <p className="text-gray-300">-o to your Storage Accout</p>
              <ImageGallery images={getImages('image18')} />
              <p className="text-gray-300">Uder Data storage, click Cotaiers → This is where your blobs live.</p>
              <p className="text-gray-300">Click ➕ Cotaier to create oe:</p>
              <p className="text-gray-300">Name: images, videos, or backups (ay ame)</p>
              <p className="text-gray-300">Public access level:</p>
              <p className="text-gray-300">Private (default) – Oly you ca access</p>
              <p className="text-gray-300">Blob (aoymous read) – Ayoe with the lik ca read blobs</p>
              <p className="text-gray-300">Cotaier (public) – Everyoe ca see cotets</p>
              <p className="text-gray-300">Click Create</p>
              <ImageGallery images={getImages('image19')} />
              <ImageGallery images={getImages('image20')} />
              <p className="text-gray-300">Upload &amp; Maage Blobs</p>
              <p className="text-gray-300">Click your ew container (e.g., images)</p>
              <p className="text-gray-300">Click Upload</p>
              <p className="text-gray-300">Choose a file from your computer (like a .jpg, .txt, or .mp4)</p>
              <p className="text-gray-300">Oce uploaded, you ca:</p>
              <p className="text-gray-300">View Properties (size, type, last modified)</p>
              <p className="text-gray-300">-et the URL to access the file</p>
              <p className="text-gray-300">Chage the access tier</p>
              <p className="text-gray-300">Storage Accout</p>
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
              <p className="text-gray-300">Storig text or biary data</p>
              <p className="text-gray-300">Images, videos, documets, CSVs</p>
              <p className="text-gray-300">📜 Apped Blob</p>
              <p className="text-gray-300">Data that is costatly added to (apped-oly)</p>
              <p className="text-gray-300">Logs, telemetry, audit data</p>
              <p className="text-gray-300">📄 Page Blob</p>
              <p className="text-gray-300">Radom read/write access</p>
              <p className="text-gray-300">Virtual machie disks (VHD files)</p>
              <p className="text-gray-300">🧱 1. Block Blob</p>
              <p className="text-gray-300">Most commo blob type used i Azure.</p>
              <p className="text-gray-300">💡 What it is:</p>
              <p className="text-gray-300">Stores text ad biary data (files like .txt, .jpg, .mp4, .csv, etc.)</p>
              <p className="text-gray-300">Data is split ito blocks, ad each block is idetified by a block ID.</p>
              <p className="text-gray-300">You ca upload or update blocks individually ad commit them together.</p>
              <p className="text-gray-300">✅ Use Cases:</p>
              <p className="text-gray-300">Storig images, videos, PDFs, ad backups.</p>
              <p className="text-gray-300">Data files for aalytics (CSV, JSON, Parquet).</p>
              <p className="text-gray-300">Large files uploaded i chuks.</p>
              <p className="text-gray-300">📘 Example:</p>
              <p className="text-gray-300">You upload a 500 MB video file - Azure divides it ito smaller blocks ad uploads each part separately for speed ad reliability.</p>
              <p className="text-gray-300">📜 2. Apped Blob</p>
              <p className="text-gray-300">Special type of blob for data that grows over time.</p>
              <p className="text-gray-300">💡 What it is:</p>
              <p className="text-gray-300">Optimized for apped operatios - you ca oly add ew data to the ed, ot modify or delete existig data.</p>
              <p className="text-gray-300">Each time you add ew iformatio, it’s appeded to the blob.</p>
              <p className="text-gray-300">✅ Use Cases:</p>
              <p className="text-gray-300">Storig log files.</p>
              <p className="text-gray-300">Applicatio telemetry or diagostics data.</p>
              <p className="text-gray-300">Streamig data that’s costatly beig added.</p>
              <p className="text-gray-300">📘 Example:</p>
              <p className="text-gray-300">You’re loggig website visit's. Each time a ew visitor arrives, their data (timestamp, IP, etc.) is appeded to the existig log file.</p>
              <p className="text-gray-300">📄 3. Page Blob</p>
              <p className="text-gray-300">Desiged for radom read/write operatios.</p>
              <p className="text-gray-300">💡 What it is:</p>
              <p className="text-gray-300">Data is stored i fixed-size 512-byte pages.</p>
              <p className="text-gray-300">Allows fast read ad write access to specific parts of the blob.</p>
              <p className="text-gray-300">Commoly used for storing Virtual Hard Disk (VHD) files that power Azure Virtual Machies.</p>
              <p className="text-gray-300">✅ Use Cases:</p>
              <p className="text-gray-300">Storig Azure VM disks (OS ad data disks).</p>
              <p className="text-gray-300">Large databases that require radom access.</p>
              <p className="text-gray-300">Ay workload that reads/writes frequetly to specific sectios of a file.</p>
              <p className="text-gray-300">📘 Example:</p>
              <p className="text-gray-300">Whe you start a Azure Virtual Machie, it's disk (a .vhd file) is stored as a Page Blob, allowig the VM to quickly read or write data aywhere o the disk.</p>
              <p className="text-gray-300">Blob Type</p>
              <p className="text-gray-300">Struncture</p>
              <p className="text-gray-300">Read/Write Behavior</p>
              <p className="text-gray-300">Commo Use</p>
              <p className="text-gray-300">Block Blob</p>
              <p className="text-gray-300">Data stored as blocks</p>
              <p className="text-gray-300">Upload/replace blocks</p>
              <p className="text-gray-300">Files, media, documets</p>
              <p className="text-gray-300">Apped Blob</p>
              <p className="text-gray-300">Sequetially added blocks</p>
              <p className="text-gray-300">Apped-oly</p>
              <p className="text-gray-300">Logs, telemetry, streamig data</p>
              <p className="text-gray-300">Page Blob</p>
              <p className="text-gray-300">Fixed 512-byte pages</p>
              <p className="text-gray-300">Radom read/write</p>
              <p className="text-gray-300">VM disks, large databases</p>
              <p className="text-gray-300">Types of Access Tiers:</p>
              <p className="text-gray-300">Azure lets you store data i different tiers based o how ofte you eed it.This helps save moey 💰 by matchig storage cost to usage.</p>
              <p className="text-gray-300">Tier</p>
              <p className="text-gray-300">Cost</p>
              <p className="text-gray-300">Availability</p>
              <p className="text-gray-300">Best For</p>
              <p className="text-gray-300">Hot</p>
              <p className="text-gray-300">💰 Highest cost</p>
              <p className="text-gray-300">🔥 Always available</p>
              <p className="text-gray-300">Frequetly accessed data (e.g., active apps, websites)</p>
              <p className="text-gray-300">Cool</p>
              <p className="text-gray-300">💸 Cheaper</p>
              <p className="text-gray-300">🕓 Slight delay i access</p>
              <p className="text-gray-300">Ifrequetly accessed data (e.g., mothly reports)</p>
              <p className="text-gray-300">Cold</p>
              <p className="text-gray-300">💧 Cheaper tha Cool</p>
              <p className="text-gray-300">⏱️ Slower access</p>
              <p className="text-gray-300">Rarely accessed data but still retrievable</p>
              <p className="text-gray-300">Archive</p>
              <p className="text-gray-300">🧊 Cheapest</p>
              <p className="text-gray-300">💤 Retrieval takes hours</p>
              <p className="text-gray-300">Log-term backups, compliace storage</p>
              <ImageGallery images={getImages('image23')} />
              <ImageGallery images={getImages('image28')} />
              <ImageGallery images={getImages('image31')} />
              <ImageGallery images={getImages('image32')} />
              </div>
            </div>
            <div id="blob-storage-overview" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">Blob Storage Overview</h4>
              <div className="space-y-4 text-gray-300">
              <p className="text-gray-300">Azure Data Lake Storage -e2 is a highly scalable ad secure cloud storage service optimized for big data aalytics ad data lakes. It builds o Azure Blob Storage capabilities but adds file system sematics, hierarchical amespaces, ad ehaced performace for aalytics workloads.</p>
              <p className="text-gray-300">ADLS -e2 is desiged to store massive volumes of strunctured, semi-strunctured, ad ustrunctured data, makig it ideal for big data ad machie learig scearios.</p>
              <p className="text-gray-300">Key Features ad Use Cases:</p>
              <p className="text-gray-300">Hierarchical Namespace: Ulike traditioal Blob Storage, ADLS -e2 supports folders ad directories, eablig efficiet organization ad faster file operatios at scale.</p>
              <p className="text-gray-300">Optimized for Aalytics: Supports Hadoop Distributed File System (HDFS) ad itegrates seamlessly with aalytics frameworks like Azure Databricks, HDIsight, ad Azure Syapse Aalytics.</p>
              <p className="text-gray-300">Supports Multiple Data Types: You ca store CSV, JSON, Parquet, Avro, ORC, images, videos, logs, backups, ad more.</p>
              <p className="text-gray-300">Security ad Compliace: Provides eterprise-grade security with Azure Active Directory itegratio, role-based access cotrol (RBAC), ad ecryptio at rest ad i trasit.</p>
              <p className="text-gray-300">Cost-effective ad Scalable: Automatically scales to hadle petabytes of data ad millios of files with optimized storage tiers ad pricig optios.</p>
              <p className="text-gray-300">Commo Uses of ADLS -e2:</p>
              <p className="text-gray-300">Buildig data lakes for big data aalytics ad machie learig.</p>
              <p className="text-gray-300">Storig large datasets for ETL (Extract, Trasform, Load) processes.</p>
              <p className="text-gray-300">Itegratig with aalytics tools to perform complex queries ad trasformatios.</p>
              <p className="text-gray-300">Secure ad compliat storage for sesitive data ad audit logs.</p>
              <p className="text-gray-300">Archivig ad log-term data retetio with tiered storage optios.</p>
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
              <p className="text-gray-300">The default (ad most commo) optio is:Azure Blob Storage or Azure Data Lake Storage -e2</p>
              <p className="text-gray-300">🧠 This meas your accout will support:</p>
              <p className="text-gray-300">Blob storage (for files, media, etc.)</p>
              <p className="text-gray-300">Data Lake capabilities (for aalytics ad big data processig)</p>
              <p className="text-gray-300">🟦 Tip: Keep this as default uless you have a specific eed for file shares or queue services.</p>
              <p className="text-gray-300">5️⃣ Performace &amp; Redudacy Settigs</p>
              <p className="text-gray-300">⚙️ Performace:</p>
              <p className="text-gray-300">Stadard: Uses HDD-based storage - cheaper, good for geeral use.</p>
              <p className="text-gray-300">Premium: Uses SSD-based storage - faster, ideal for workloads eedig low latecy (like databases or VMs).</p>
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
              <p className="text-gray-300">Copies across 3 availability zoes i the same regio</p>
              <p className="text-gray-300">3</p>
              <p className="text-gray-300">-RS (-eo-redudat storage)</p>
              <p className="text-gray-300">Copies data to aother regio (for disaster recovery)</p>
              <p className="text-gray-300">6</p>
              <p className="text-gray-300">RA-RS (Read-access -eo-redudat)</p>
              <p className="text-gray-300">Same as -RS but allows read access to secodary regio</p>
              <p className="text-gray-300">6</p>
              <p className="text-gray-300">🟦 You selected: LRS (best for developmet/testig)</p>
              <p className="text-gray-300">Click o create</p>
              <ImageGallery images={getImages('image14')} />
              <ImageGallery images={getImages('image15')} />
              <p className="text-gray-300">Navigate to Your Resource -roup</p>
              <p className="text-gray-300">I the left-had meu, click o Resource GGroups</p>
              <p className="text-gray-300">Fid ad click your resource group - i your case:👉 rg-ohg365-dev</p>
              <p className="text-gray-300">Check for the Storage Accout</p>
              <p className="text-gray-300">Inside the Overview tab of your resource group, you’ll see a list of all resources.</p>
              <p className="text-gray-300">Look for a item that looks like this:Type: Storage accoutName: blobohg365dev (or whatever ame you used)</p>
              </div>
            </div>
            <div id="data-lake-overview" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">Data Lake Overview</h4>
              <div className="space-y-4 text-gray-300">
              <p className="text-gray-300">4. Azure Data Lake Storage -e2 (ADLS -e2)</p>
              </div>
            </div>
            <div id="data-lake-overview" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">
              <h4 className="text-2xl font-semibold text-white mb-4">Data Lake Overview</h4>
              <div className="space-y-4 text-gray-300">
              <p className="text-gray-300">4.1 Create a Azure Data Lake Storage</p>
              <p className="text-gray-300">-o to Azure Portal</p>
              <p className="text-gray-300">I the search bar, type “Storage Accouts” or “ADLS -e2”</p>
              <ImageGallery images={getImages('image33')} />
              <p className="text-gray-300">Click o storage accounts ad click o create butto</p>
              <ImageGallery images={getImages('image12')} />
              <p className="text-gray-300">Fill required details</p>
              <ImageGallery images={getImages('image34')} />
              <ImageGallery images={getImages('image35')} />
              <ImageGallery images={getImages('image36')} />
              <ImageGallery images={getImages('image37')} />
              <p className="text-gray-300">Navigate to Your Resource -roup</p>
              <p className="text-gray-300">I the left-had meu, click o Resource GGroups</p>
              <p className="text-gray-300">Fid ad click your resource group - i your case:👉 rg-ohg365-dev</p>
              <p className="text-gray-300">Check for the Storage Accout</p>
              <p className="text-gray-300">Inside the Overview tab of your resource group, you’ll see a list of all resources.</p>
              <p className="text-gray-300">Look for a item that looks like this:Type: Storage accoutName: adlsohg365dev (or whatever ame you used)</p>
              <p className="text-gray-300">If it appears there, 🎉 cogratulatios - your ADLS -e2 Storage accout has bee successfully created</p>
              <ImageGallery images={getImages('image38')} />
              <p className="text-gray-300">3.2 Types of Azure Storage Services:</p>
              <p className="text-gray-300">Azure Storage provides four mai types of services uder oe Storage Accout.</p>
              <ImageGallery images={getImages('image39')} />
              <p className="text-gray-300">1️⃣ Data Lake Storage</p>
              <p className="text-gray-300">🧱 Purpose: Desiged to store large volumes of ustrunctured or semi-strunctured data such as files, images, videos, logs, ad backups.🔹 Key Features:</p>
              <p className="text-gray-300">Data is stored as Blobs (Biary Large Objects) withi containers.</p>
              <p className="text-gray-300">Ideal for storing large, raw data that does’t fit ito traditioal databases.</p>
              <p className="text-gray-300">Supports various formats: text, biary, documets, media, ad backups.</p>
              <p className="text-gray-300">💾 Commo Use Cases:</p>
              <p className="text-gray-300">Hostig media cotet like images ad videos for websites.</p>
              <p className="text-gray-300">Log-term storage for backups ad archival data.</p>
              <p className="text-gray-300">Cetralized data lake for aalytics ad big data processig.</p>
              <p className="text-gray-300">Hostig static websites.</p>
              <p className="text-gray-300">📦 Supported File Types:.txt, .csv, .jso, .xml, .jpg, .mp4, .zip, .bak, ad more.</p>
              <p className="text-gray-300">2️⃣ File Service</p>
              <p className="text-gray-300">📁 Used for shared file storage that behaves like a traditioal file server.</p>
              <p className="text-gray-300">🔹 Descriptio:</p>
              <p className="text-gray-300">Provides Azure Files, a fully managed file share i the cloud.</p>
              <p className="text-gray-300">Uses the SMB (Server Message Block) or NFS (Network File System) protocols - the same used by o-premises file servers.</p>
              <p className="text-gray-300">Ca be mouted to Widows, Liux, or macOS systems.</p>
              <p className="text-gray-300">💾 Example Uses:</p>
              <p className="text-gray-300">Shared etwork drives for teams</p>
              <p className="text-gray-300">“Lift ad shift” of o-premises file servers</p>
              <p className="text-gray-300">Applicatio cofiguratios shared across multiple VMs</p>
              <p className="text-gray-300">📦 Example Sceario:</p>
              <p className="text-gray-300">You have multiple virtual machines eedig access to the same cofiguratio files - you ca store those files i Azure Files ad mout them just like a shared folder.</p>
              <p className="text-gray-300">3️⃣ Queue Service</p>
              <p className="text-gray-300">📬 Used for reliable messagig betwee applicatio compoets.</p>
              <p className="text-gray-300">🔹 Descriptio:</p>
              <p className="text-gray-300">Provides asychroous commuicatio betwee services usig message queues.</p>
              <p className="text-gray-300">Stores messages i a queue, which ca be processed later by backgroud services or workers.</p>
              <p className="text-gray-300">Esures messages are delivered at least oce ad processed i FIFO (First-I, First-Out) order.</p>
              <p className="text-gray-300">💾 Example Uses:</p>
              <p className="text-gray-300">Sedig backgroud jobs (like image processig or email sedig)</p>
              <p className="text-gray-300">Decouplig app compoets for scalability</p>
              <p className="text-gray-300">Evet-drive architecture</p>
              <p className="text-gray-300">📦 Example Sceario:</p>
              <p className="text-gray-300">A web app uploads a image → seds a message to a queue → a backgroud process picks it up ad resizes the image.</p>
              <p className="text-gray-300">4️⃣ Table Service</p>
              <p className="text-gray-300">🧮 Used to store large amouts of strunctured, o-relatioal data.</p>
              <p className="text-gray-300">🔹 Descriptio:</p>
              <p className="text-gray-300">Provides NoSQL key-value storage.</p>
              <p className="text-gray-300">Stores data i tables with etities (rows) ad properties (colums).</p>
              <p className="text-gray-300">Flexible schema - you ca add or remove colums aytime.</p>
              <p className="text-gray-300">💾 Example Uses:</p>
              <p className="text-gray-300">Storig user profiles, IoT data, or metadata</p>
              <p className="text-gray-300">Fast lookups by key</p>
              <p className="text-gray-300">Lightweight applicatios eedig scalable, cheap storage</p>
              <p className="text-gray-300">📦 Example Sceario:</p>
              <p className="text-gray-300">You have millios of IoT sesors sedig temperature data - you ca store this efficietly i Azure Table Storage.</p>
              <p className="text-gray-300">🧠 Summary Table</p>
              <p className="text-gray-300">Datalake Service</p>
              <p className="text-gray-300">Type of Data</p>
              <p className="text-gray-300">Descriptio</p>
              <p className="text-gray-300">Example Use Case</p>
              <p className="text-gray-300">Blob Service</p>
              <p className="text-gray-300">Ustrunctured / Semi-strunctured</p>
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
              <p className="text-gray-300">Strunctured (NoSQL)</p>
              <p className="text-gray-300">Key-value, schema-less table storage</p>
              <p className="text-gray-300">User profiles, IoT data</p>
              <p className="text-gray-300">Explore Datalake Service</p>
              <p className="text-gray-300">Oce your storage accout is created:</p>
              <p className="text-gray-300">-o to your Storage Accout</p>
              <ImageGallery images={getImages('image40')} />
              <p className="text-gray-300">Uder Data storage, click Cotaiers → This is where your blobs live.</p>
              <p className="text-gray-300">Click ➕ Cotaier to create oe:</p>
              <p className="text-gray-300">Name: images, videos, or backups (ay ame)</p>
              <p className="text-gray-300">Public access level:</p>
              <p className="text-gray-300">Private (default) – Oly you ca access</p>
              <p className="text-gray-300">Blob (aoymous read) – Ayoe with the lik ca read blobs</p>
              <p className="text-gray-300">Cotaier (public) – Everyoe ca see cotets</p>
              <p className="text-gray-300">Click Create</p>
              <ImageGallery images={getImages('image41')} />
              <ImageGallery images={getImages('image42')} />
              <p className="text-gray-300">Upload &amp; Maage Blobs</p>
              <p className="text-gray-300">Click your ew container (e.g., images)</p>
              <p className="text-gray-300">Click Upload</p>
              <p className="text-gray-300">Choose a file from your computer (like a .jpg, .txt, or .mp4)</p>
              <p className="text-gray-300">Oce uploaded, you ca:</p>
              <p className="text-gray-300">View Properties (size, type, last modified)</p>
              <p className="text-gray-300">-et the URL to access the file</p>
              <p className="text-gray-300">Chage the access tier</p>
              <p className="text-gray-300">Storage Accout</p>
              <p className="text-gray-300">└── DataLake Service</p>
              <p className="text-gray-300">└── Cotaier (like a folder)</p>
              <p className="text-gray-300">└── Blob (the actual file)</p>
              <ImageGallery images={getImages('image43')} />
              <ImageGallery images={getImages('image44')} />
              <ImageGallery images={getImages('image45')} />
              <p className="text-gray-300">Subfolder:</p>
              <ImageGallery images={getImages('image46')} />
              <ImageGallery images={getImages('image47')} />
              <p className="text-gray-300">Upload file:</p>
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
              <p className="text-gray-300">Storig text or biary data</p>
              <p className="text-gray-300">Images, videos, documets, CSVs</p>
              <p className="text-gray-300">📜 Apped Blob</p>
              <p className="text-gray-300">Data that is costatly added to (apped-oly)</p>
              <p className="text-gray-300">Logs, telemetry, audit data</p>
              <p className="text-gray-300">📄 Page Blob</p>
              <p className="text-gray-300">Radom read/write access</p>
              <p className="text-gray-300">Virtual machie disks (VHD files)</p>
              <p className="text-gray-300">🧱 1. Block Blob</p>
              <p className="text-gray-300">Most commo blob type used i Azure.</p>
              <p className="text-gray-300">💡 What it is:</p>
              <p className="text-gray-300">Stores text ad biary data (files like .txt, .jpg, .mp4, .csv, etc.)</p>
              <p className="text-gray-300">Data is split ito blocks, ad each block is idetified by a block ID.</p>
              <p className="text-gray-300">You ca upload or update blocks individually ad commit them together.</p>
              <p className="text-gray-300">✅ Use Cases:</p>
              <p className="text-gray-300">Storig images, videos, PDFs, ad backups.</p>
              <p className="text-gray-300">Data files for aalytics (CSV, JSON, Parquet).</p>
              <p className="text-gray-300">Large files uploaded i chuks.</p>
              <p className="text-gray-300">📘 Example:</p>
              <p className="text-gray-300">You upload a 500 MB video file - Azure divides it ito smaller blocks ad uploads each part separately for speed ad reliability.</p>
              <p className="text-gray-300">📜 2. Apped Blob</p>
              <p className="text-gray-300">Special type of blob for data that grows over time.</p>
              <p className="text-gray-300">💡 What it is:</p>
              <p className="text-gray-300">Optimized for apped operatios - you ca oly add ew data to the ed, ot modify or delete existig data.</p>
              <p className="text-gray-300">Each time you add ew iformatio, it’s appeded to the blob.</p>
              <p className="text-gray-300">✅ Use Cases:</p>
              <p className="text-gray-300">Storig log files.</p>
              <p className="text-gray-300">Applicatio telemetry or diagostics data.</p>
              <p className="text-gray-300">Streamig data that’s costatly beig added.</p>
              <p className="text-gray-300">📘 Example:</p>
              <p className="text-gray-300">You’re loggig website visit's. Each time a ew visitor arrives, their data (timestamp, IP, etc.) is appeded to the existig log file.</p>
              <p className="text-gray-300">📄 3. Page Blob</p>
              <p className="text-gray-300">Desiged for radom read/write operatios.</p>
              <p className="text-gray-300">💡 What it is:</p>
              <p className="text-gray-300">Data is stored i fixed-size 512-byte pages.</p>
              <p className="text-gray-300">Allows fast read ad write access to specific parts of the blob.</p>
              <p className="text-gray-300">Commoly used for storing Virtual Hard Disk (VHD) files that power Azure Virtual Machies.</p>
              <p className="text-gray-300">✅ Use Cases:</p>
              <p className="text-gray-300">Storig Azure VM disks (OS ad data disks).</p>
              <p className="text-gray-300">Large databases that require radom access.</p>
              <p className="text-gray-300">Ay workload that reads/writes frequetly to specific sectios of a file.</p>
              <p className="text-gray-300">📘 Example:</p>
              <p className="text-gray-300">Whe you start a Azure Virtual Machie, it's disk (a .vhd file) is stored as a Page Blob, allowig the VM to quickly read or write data aywhere o the disk.</p>
              <p className="text-gray-300">Blob Type</p>
              <p className="text-gray-300">Struncture</p>
              <p className="text-gray-300">Read/Write Behavior</p>
              <p className="text-gray-300">Commo Use</p>
              <p className="text-gray-300">Block Blob</p>
              <p className="text-gray-300">Data stored as blocks</p>
              <p className="text-gray-300">Upload/replace blocks</p>
              <p className="text-gray-300">Files, media, documets</p>
              <p className="text-gray-300">Apped Blob</p>
              <p className="text-gray-300">Sequetially added blocks</p>
              <p className="text-gray-300">Apped-oly</p>
              <p className="text-gray-300">Logs, telemetry, streamig data</p>
              <p className="text-gray-300">Page Blob</p>
              <p className="text-gray-300">Fixed 512-byte pages</p>
              <p className="text-gray-300">Radom read/write</p>
              <p className="text-gray-300">VM disks, large databases</p>
              <p className="text-gray-300">Types of Access Tiers:</p>
              <p className="text-gray-300">Azure lets you store data i different tiers based o how ofte you eed it.This helps save moey 💰 by matchig storage cost to usage.</p>
              <p className="text-gray-300">Tier</p>
              <p className="text-gray-300">Cost</p>
              <p className="text-gray-300">Availability</p>
              <p className="text-gray-300">Best For</p>
              <p className="text-gray-300">Hot</p>
              <p className="text-gray-300">💰 Highest cost</p>
              <p className="text-gray-300">🔥 Always available</p>
              <p className="text-gray-300">Frequetly accessed data (e.g., active apps, websites)</p>
              <p className="text-gray-300">Cool</p>
              <p className="text-gray-300">💸 Cheaper</p>
              <p className="text-gray-300">🕓 Slight delay i access</p>
              <p className="text-gray-300">Ifrequetly accessed data (e.g., mothly reports)</p>
              <p className="text-gray-300">Cold</p>
              <p className="text-gray-300">💧 Cheaper tha Cool</p>
              <p className="text-gray-300">⏱️ Slower access</p>
              <p className="text-gray-300">Rarely accessed data but still retrievable</p>
              <p className="text-gray-300">Archive</p>
              <p className="text-gray-300">🧊 Cheapest</p>
              <p className="text-gray-300">💤 Retrieval takes hours</p>
              <p className="text-gray-300">Log-term backups, compliace storage</p>
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