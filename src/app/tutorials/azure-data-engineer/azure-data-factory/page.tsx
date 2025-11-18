'use client';

import TechLayout from '@/components/tech-layout';

const PAGE_HEADINGS = [
  { id: 'coming-soon', title: 'Coming Soon' }
];

// Helper function to create module-specific navigation items
const createModuleNavigationItems = (): Array<{ id: string; title: string; href: string; icon?: string }> => {
  const basePath = '/tutorials/azure-data-engineer/azure-data-factory';
  return [
    {
      id: 'coming-soon',
      title: 'Coming Soon',
      href: `${basePath}#coming-soon`,
      icon: '🏭'
    }
  ];
};

export default function AzureDataFactoryPage() {
  return (
    <TechLayout 
      technology="azure-data-engineer" 
      onThisPage={PAGE_HEADINGS}
      activeSection="coming-soon"
      setActiveSection={() => {}}
      activeSubsection={null}
      setActiveSubsection={() => {}}
      customNavigationItems={createModuleNavigationItems()}
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
            Azure Data Factory <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">Module</span>
          </h1>
          <p className="text-gray-400 text-xl">Build and orchestrate data pipelines with Azure Data Factory</p>
        </div>

        {/* Coming Soon Section */}
        <section
          id="coming-soon"
          className="bg-[#1a1a1a] rounded-xl p-12 border border-gray-700 text-center"
        >
          <div className="max-w-2xl mx-auto">
            <div className="text-6xl mb-6">🏭</div>
            <h2 className="text-3xl font-bold text-white mb-4">Content Coming Soon</h2>
            <p className="text-gray-400 text-lg mb-8">
              The Azure Data Factory module is currently under development. Check back soon for comprehensive content on:
            </p>
            <ul className="text-left space-y-3 text-gray-300 max-w-md mx-auto">
              <li className="flex items-start">
                <span className="text-blue-400 mr-3">•</span>
                <span>Data pipeline orchestration</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3">•</span>
                <span>Data integration patterns</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3">•</span>
                <span>ETL/ELT workflows</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3">•</span>
                <span>Data transformation activities</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-3">•</span>
                <span>Monitoring and management</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </TechLayout>
  );
}

