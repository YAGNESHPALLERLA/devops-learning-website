'use client';

import TechLayout from '@/components/tech-layout';
import { useState, useEffect } from 'react';

export default function AzureDataEngineerPage() {
  const [activeSection, setActiveSection] = useState('azure-basics');

  const pageHeadings = [
    { id: 'azure-basics', title: 'Azure Basics' },
    { id: 'azure-data-storage', title: 'Azure Data Storage' },
    { id: 'data-pipelines', title: 'Data Pipelines' },
    { id: 'azure-databricks', title: 'Azure Databricks' },
    { id: 'azure-synapse', title: 'Azure Synapse Analytics' },
    { id: 'data-security', title: 'Data Security & Governance' }
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

        {/* Azure Data Storage Section */}
        <section id="azure-data-storage" className="mb-20 scroll-mt-24">
          <h2 className="text-4xl font-bold text-white mb-6">Azure Data Storage</h2>
          <div className="bg-[#252525] rounded-xl p-8 border border-gray-600 mb-6">
            <p className="text-gray-300 text-lg mb-4">
              Understanding Azure Blob Storage, Data Lake Storage, and Cosmos DB.
            </p>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Azure Blob Storage</h3>
                <p>Object storage solution for the cloud. Store massive amounts of unstructured data, such as text or binary data.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Azure Data Lake Storage</h3>
                <p>A scalable data lake for big data analytics workloads. Provides high-speed file storage and supports massive throughput.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Azure Cosmos DB</h3>
                <p>A globally distributed, multi-model database service designed to provide low latency, elastic scalability, and guaranteed high availability.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Pipelines Section */}
        <section id="data-pipelines" className="mb-20 scroll-mt-24">
          <h2 className="text-4xl font-bold text-white mb-6">Data Pipelines</h2>
          <div className="bg-[#252525] rounded-xl p-8 border border-gray-600 mb-6">
            <p className="text-gray-300 text-lg mb-4">
              Building ETL/ELT pipelines with Azure Data Factory.
            </p>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Azure Data Factory</h3>
                <p>A cloud-based data integration service that allows you to create data-driven workflows for orchestrating and automating data movement and data transformation.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">ETL vs ELT</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>ETL (Extract, Transform, Load):</strong> Data is transformed before loading into the destination</li>
                  <li><strong>ELT (Extract, Load, Transform):</strong> Data is loaded first, then transformed in the destination system</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Azure Databricks Section */}
        <section id="azure-databricks" className="mb-20 scroll-mt-24">
          <h2 className="text-4xl font-bold text-white mb-6">Azure Databricks</h2>
          <div className="bg-[#252525] rounded-xl p-8 border border-gray-600 mb-6">
            <p className="text-gray-300 text-lg mb-4">
              Big data processing and analytics with Databricks.
            </p>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">What is Azure Databricks?</h3>
                <p>An Apache Spark-based analytics platform optimized for Azure. It's designed to help data engineers, data scientists, and analysts collaborate on big data projects.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Key Features</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Interactive notebooks for collaborative data science</li>
                  <li>Automated cluster management</li>
                  <li>Integration with Azure services</li>
                  <li>Real-time analytics capabilities</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Azure Synapse Analytics Section */}
        <section id="azure-synapse" className="mb-20 scroll-mt-24">
          <h2 className="text-4xl font-bold text-white mb-6">Azure Synapse Analytics</h2>
          <div className="bg-[#252525] rounded-xl p-8 border border-gray-600 mb-6">
            <p className="text-gray-300 text-lg mb-4">
              Data warehousing and analytics at scale.
            </p>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Azure Synapse Analytics</h3>
                <p>A limitless analytics service that brings together enterprise data warehousing and Big Data analytics. It gives you the freedom to query data on your terms, using either serverless or dedicated resources.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Key Capabilities</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>SQL analytics for data warehousing</li>
                  <li>Spark-based analytics for big data</li>
                  <li>Pipeline orchestration</li>
                  <li>Integrated Power BI and Azure Machine Learning</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Data Security & Governance Section */}
        <section id="data-security" className="mb-20 scroll-mt-24">
          <h2 className="text-4xl font-bold text-white mb-6">Data Security & Governance</h2>
          <div className="bg-[#252525] rounded-xl p-8 border border-gray-600 mb-6">
            <p className="text-gray-300 text-lg mb-4">
              Implementing security and compliance in Azure.
            </p>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Azure Security Features</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Azure Active Directory for identity and access management</li>
                  <li>Azure Key Vault for secrets management</li>
                  <li>Encryption at rest and in transit</li>
                  <li>Network security groups and firewalls</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Data Governance</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Azure Purview for data cataloging and governance</li>
                  <li>Data lineage tracking</li>
                  <li>Data classification and labeling</li>
                  <li>Compliance monitoring and reporting</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </TechLayout>
  );
}
