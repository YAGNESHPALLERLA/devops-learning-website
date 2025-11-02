'use client';

import TechLayout from '@/components/tech-layout';
import { useState, useEffect } from 'react';

export default function AzureDataEngineerPage() {
  const [activeSection, setActiveSection] = useState('azure-basics');

  const pageHeadings = [
    { id: 'azure-basics', title: 'Azure Basics' }
  ];

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
  }, []);

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
        <section id="azure-basics" className="mb-20 scroll-mt-24">
          <h2 className="text-4xl font-bold text-white mb-6">Azure Basics</h2>
          <div className="bg-[#252525] rounded-xl p-8 border border-gray-600 mb-6">
            <p className="text-gray-300 text-lg mb-4">
              Learn Azure fundamentals, cloud services, and Microsoft Azure platform basics.
            </p>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">What is Microsoft Azure?</h3>
                <p>Microsoft Azure is a cloud computing platform that provides a wide range of services including computing, analytics, storage, and networking. It's designed to help businesses build, deploy, and manage applications and services through Microsoft-managed data centers.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Key Azure Services</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Azure Virtual Machines</li>
                  <li>Azure Storage Accounts</li>
                  <li>Azure SQL Database</li>
                  <li>Azure Active Directory</li>
                  <li>Azure Resource Manager</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

      </div>
    </TechLayout>
  );
}
