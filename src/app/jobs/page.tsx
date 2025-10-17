'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const jobCategories = [
    { id: 'all', name: 'All Jobs', count: 156 },
    { id: 'devops', name: 'DevOps', count: 45 },
    { id: 'programming', name: 'Programming', count: 67 },
    { id: 'data-science', name: 'Data Science', count: 23 },
    { id: 'cloud', name: 'Cloud', count: 21 }
  ]

  const featuredJobs = [
    {
      id: 1,
      title: 'Senior DevOps Engineer',
      company: 'TechCorp Solutions',
      location: 'Remote',
      type: 'Full-time',
      salary: '$120k - $150k',
      posted: '2 days ago',
      category: 'devops',
      description: 'We are looking for an experienced DevOps engineer to join our team...',
      requirements: ['5+ years DevOps experience', 'AWS/Azure certification', 'Docker & Kubernetes', 'CI/CD pipelines']
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'InnovateTech',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$100k - $130k',
      posted: '1 day ago',
      category: 'programming',
      description: 'Join our dynamic team as a Full Stack Developer...',
      requirements: ['React/Next.js', 'Node.js', 'PostgreSQL', '3+ years experience']
    },
    {
      id: 3,
      title: 'Data Scientist',
      company: 'DataInsights Inc',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$110k - $140k',
      posted: '3 days ago',
      category: 'data-science',
      description: 'Seeking a talented Data Scientist to drive our analytics initiatives...',
      requirements: ['Python/R', 'Machine Learning', 'SQL', 'PhD or 5+ years experience']
    },
    {
      id: 4,
      title: 'Cloud Solutions Architect',
      company: 'CloudFirst',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$130k - $160k',
      posted: '1 week ago',
      category: 'cloud',
      description: 'Lead cloud architecture initiatives for enterprise clients...',
      requirements: ['AWS/Azure expertise', 'Terraform', '5+ years cloud experience', 'Leadership skills']
    }
  ]

  const filteredJobs = featuredJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-[#0f0f0f] py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-500 mb-6">
            Find Your Dream Job
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover amazing opportunities in DevOps, Programming, Data Science, and Cloud technologies. 
            Connect with top companies and advance your career.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-[#1a1a1a] rounded-2xl p-8 mb-12 border border-gray-800">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Search Bar */}
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Search Jobs
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by job title, company, or keywords..."
                  className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all pr-12"
                />
                <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div className="md:w-64">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 bg-[#0f0f0f] border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
              >
                {jobCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Job Categories */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {jobCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-6 rounded-xl border transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-rose-500 to-red-600 border-rose-500 text-white'
                    : 'bg-[#1a1a1a] border-gray-700 text-gray-300 hover:border-rose-500/50 hover:text-white'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">
                    {category.id === 'devops' && '🔧'}
                    {category.id === 'programming' && '💻'}
                    {category.id === 'data-science' && '📊'}
                    {category.id === 'cloud' && '☁️'}
                    {category.id === 'all' && '🌟'}
                  </div>
                  <h3 className="font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm opacity-75">{category.count} jobs</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Job Listings */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">
              {filteredJobs.length} Job{filteredJobs.length !== 1 ? 's' : ''} Found
            </h2>
            <div className="text-gray-400">
              Showing {filteredJobs.length} of {featuredJobs.length} jobs
            </div>
          </div>

          <div className="space-y-6">
            {filteredJobs.map(job => (
              <div key={job.id} className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-8 hover:border-rose-500/50 transition-all duration-300 group">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-rose-400 transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-gray-400 mb-4">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                        {job.company}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        {job.location}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        {job.posted}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-4">{job.description}</p>
                  </div>
                  <div className="md:ml-8 md:text-right">
                    <div className="text-2xl font-bold text-rose-400 mb-2">{job.salary}</div>
                    <div className="inline-flex items-center px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm font-semibold mb-4">
                      {job.type}
                    </div>
                    <div className="flex flex-col space-y-2">
                      <button className="w-full bg-gradient-to-r from-rose-500 to-red-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-rose-600 hover:to-red-700 transition-all duration-300 shadow-lg shadow-rose-500/30">
                        Apply Now
                      </button>
                      <button className="w-full bg-[#0f0f0f] border border-gray-700 text-gray-300 font-semibold px-6 py-3 rounded-lg hover:border-rose-500/50 hover:text-white transition-all duration-300">
                        Save Job
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-700 pt-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Requirements:</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.map((req, index) => (
                      <span key={index} className="px-3 py-1 bg-[#0f0f0f] border border-gray-700 text-gray-300 rounded-full text-sm">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-rose-500/10 to-red-500/10 border border-rose-500/20 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Career Journey?
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join thousands of professionals who have found their dream jobs through our platform. 
            Create your profile and get matched with the perfect opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold px-8 py-4 rounded-lg hover:from-rose-600 hover:to-red-700 transition-all duration-300 shadow-lg shadow-rose-500/30">
              Create Profile
            </button>
            <button className="bg-[#1a1a1a] border border-gray-700 text-gray-300 font-semibold px-8 py-4 rounded-lg hover:border-rose-500/50 hover:text-white transition-all duration-300">
              Browse All Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}