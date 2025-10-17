export default function GovernmentJobsPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full border border-indigo-500/30">
            <span className="text-indigo-400 font-semibold">🏛️ Government Jobs</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Government Jobs <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">(SBI Jobs)</span>
          </h1>
          <p className="text-gray-400 text-xl">Prepare for bank exams and government job tests</p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-[#252525] rounded-xl p-12 border border-gray-600">
          <h2 className="text-3xl font-bold text-white mb-6">Coming Soon!</h2>
          <p className="text-gray-300 text-lg mb-4">
            We're preparing comprehensive preparation materials for:
          </p>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-center space-x-3">
              <span className="text-indigo-400">✓</span>
              <span>SBI Clerk & PO Examinations</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-indigo-400">✓</span>
              <span>Banking Awareness & Current Affairs</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-indigo-400">✓</span>
              <span>Quantitative Aptitude</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-indigo-400">✓</span>
              <span>Reasoning Ability</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-indigo-400">✓</span>
              <span>English Language Skills</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-indigo-400">✓</span>
              <span>Mock Tests & Practice Papers</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-indigo-400">✓</span>
              <span>Weekly Test System (Bronze, Silver, Gold)</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}

