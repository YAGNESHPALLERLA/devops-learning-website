'use client';

import TechLayout from '@/components/tech-layout';
import Link from 'next/link';

export default function AzureDataEngineerLandingPage() {
  const modules = [
    {
      id: 'azure-basics',
      title: 'Azure Basics',
      description: 'Learn the fundamentals of Azure cloud infrastructure and services',
      icon: '📘',
      href: '/tutorials/azure-data-engineer/azure-basics',
      topics: ['Azure Hierarchy', 'Resource Groups', 'Blob Storage', 'Data Lake Storage']
    },
    {
      id: 'azure-databricks',
      title: 'Azure Databricks',
      description: 'Master Azure Databricks, SQL analytics, and data engineering workflows',
      icon: '🔷',
      href: '/tutorials/azure-data-engineer/azure-databricks',
      topics: ['Azure Databricks', 'Databricks SQL', 'Data Engineering']
    },
    {
      id: 'azure-data-factory',
      title: 'Azure Data Factory',
      description: 'Build and orchestrate data pipelines with Azure Data Factory',
      icon: '🏭',
      href: '/tutorials/azure-data-engineer/azure-data-factory',
      topics: ['Coming Soon']
    }
  ];

  return (
    <TechLayout 
      technology="azure-data-engineer" 
      onThisPage={[]}
      activeSection=""
      setActiveSection={() => {}}
      activeSubsection={null}
      setActiveSubsection={() => {}}
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

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {modules.map((module) => (
            <Link
              key={module.id}
              href={module.href}
              className="group relative bg-[#1a1a1a] rounded-xl p-8 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="text-4xl">{module.icon}</div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {module.title}
                  </h2>
                  <p className="text-gray-400 text-sm mb-4">
                    {module.description}
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">Topics Covered</h3>
                <ul className="space-y-2">
                  {module.topics.map((topic, index) => (
                    <li key={index} className="flex items-center text-gray-300 text-sm">
                      <svg className="w-4 h-4 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                <span className="text-sm font-semibold mr-2">Start Learning</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Course Overview */}
        <div className="bg-[#1a1a1a] rounded-xl p-8 border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-6">Course Overview</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">What You'll Learn</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓</span>
                  <span>Azure cloud infrastructure fundamentals</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓</span>
                  <span>Data storage solutions (Blob Storage, Data Lake)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓</span>
                  <span>Azure Databricks for big data analytics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓</span>
                  <span>SQL analytics and data warehousing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">✓</span>
                  <span>Data engineering and ETL pipelines</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Prerequisites</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Basic understanding of cloud computing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Familiarity with SQL and data concepts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Basic knowledge of Python (helpful but not required)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </TechLayout>
  );
}
