export default function AzureDataEngineerPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
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
        
        <div className="max-w-4xl mx-auto bg-[#252525] rounded-xl p-12 border border-gray-600">
          <h2 className="text-3xl font-bold text-white mb-6">Course Topics</h2>
          <p className="text-gray-300 text-lg mb-8">
            This comprehensive course covers all aspects of Azure Data Engineering:
          </p>
          <ul className="space-y-4">
            <li className="flex items-center space-x-3 p-4 bg-[#1a1a1a] rounded-lg hover:bg-[#2a2a2a] transition-colors">
              <span className="text-blue-400 text-xl">✓</span>
              <span className="text-gray-300 text-lg">
                <strong className="text-white">Azure Basics</strong> - Learn Azure fundamentals, cloud services, and Microsoft Azure platform basics
              </span>
            </li>
            <li className="flex items-center space-x-3 p-4 bg-[#1a1a1a] rounded-lg hover:bg-[#2a2a2a] transition-colors">
              <span className="text-blue-400 text-xl">✓</span>
              <span className="text-gray-300 text-lg">
                <strong className="text-white">Azure Data Storage</strong> - Understanding Azure Blob Storage, Data Lake Storage, and Cosmos DB
              </span>
            </li>
            <li className="flex items-center space-x-3 p-4 bg-[#1a1a1a] rounded-lg hover:bg-[#2a2a2a] transition-colors">
              <span className="text-blue-400 text-xl">✓</span>
              <span className="text-gray-300 text-lg">
                <strong className="text-white">Data Pipelines</strong> - Building ETL/ELT pipelines with Azure Data Factory
              </span>
            </li>
            <li className="flex items-center space-x-3 p-4 bg-[#1a1a1a] rounded-lg hover:bg-[#2a2a2a] transition-colors">
              <span className="text-blue-400 text-xl">✓</span>
              <span className="text-gray-300 text-lg">
                <strong className="text-white">Azure Databricks</strong> - Big data processing and analytics with Databricks
              </span>
            </li>
            <li className="flex items-center space-x-3 p-4 bg-[#1a1a1a] rounded-lg hover:bg-[#2a2a2a] transition-colors">
              <span className="text-blue-400 text-xl">✓</span>
              <span className="text-gray-300 text-lg">
                <strong className="text-white">Azure Synapse Analytics</strong> - Data warehousing and analytics at scale
              </span>
            </li>
            <li className="flex items-center space-x-3 p-4 bg-[#1a1a1a] rounded-lg hover:bg-[#2a2a2a] transition-colors">
              <span className="text-blue-400 text-xl">✓</span>
              <span className="text-gray-300 text-lg">
                <strong className="text-white">Data Security & Governance</strong> - Implementing security and compliance in Azure
              </span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}

