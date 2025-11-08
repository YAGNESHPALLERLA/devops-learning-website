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
    <div className="grid gap-8 mt-8 sm:grid-cols-1 lg:grid-cols-2">
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
            sizes="(min-width: 1280px) 48vw, (min-width: 768px) 75vw, 92vw"
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
  image53: { src: '/tutorials/azure/images/image53.png', width: 1669, height: 591, alt: 'ADLS access tier comparison chart' }
};

const getImages = (...keys: (keyof typeof azureImages)[]): GalleryImage[] =>
  keys.map(key => azureImages[key]).filter(Boolean);

const PAGE_HEADINGS = [
  { id: 'azure-basics', title: 'Azure Basics' },
  { id: 'resource-group', title: 'Resource Group' },
  { id: 'azure-blob-storage', title: 'Azure Blob Storage' },
  { id: 'azure-data-lake', title: 'Azure Data Lake Storage Gen2' }
];

export default function AzureDataEngineerPage() {
  const [activeSection, setActiveSection] = useState('azure-basics');
  const pageHeadings = PAGE_HEADINGS;

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && pageHeadings.some(heading => heading.id === hash)) {
        setActiveSection(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [pageHeadings]);

  return (
    <TechLayout 
      technology="azure-data-engineer" 
      onThisPage={pageHeadings}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
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
        <section
          id="azure-basics"
          className="mb-20 scroll-mt-24"
          style={{ display: activeSection === 'azure-basics' ? 'block' : 'none' }}
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

        {/* Resource Group */}
        <section
          id="resource-group"
          className="bg-[#252525] rounded-xl p-8 border border-gray-600 scroll-mt-24"
          style={{ display: activeSection === 'resource-group' ? 'block' : 'none' }}
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

        {/* Azure Blob Storage */}
        <section
          id="azure-blob-storage"
          className="bg-[#252525] rounded-xl p-8 border border-gray-600 scroll-mt-24"
          style={{ display: activeSection === 'azure-blob-storage' ? 'block' : 'none' }}
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

        {/* Azure Data Lake Storage Gen2 */}
        <section
          id="azure-data-lake"
          className="bg-[#252525] rounded-xl p-8 border border-gray-600 scroll-mt-24"
          style={{ display: activeSection === 'azure-data-lake' ? 'block' : 'none' }}
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
      </div>
    </TechLayout>
  );
}
