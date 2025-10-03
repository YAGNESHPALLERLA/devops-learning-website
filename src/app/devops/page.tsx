'use client';

import { useState } from 'react';
import TechLayout from '@/components/tech-layout';
import VideoSection from '@/components/VideoSection';
import { getVideosForTopic } from '@/data/videoTutorials';

export default function DevOpsPage() {
  const [activeSection, setActiveSection] = useState('introduction');

  const pageHeadings = [
    { id: 'introduction', title: 'DevOps Introduction' },
    { id: 'core-concepts', title: 'Core Concepts' },
    { id: 'devops-lifecycle', title: 'DevOps Lifecycle' },
    { id: 'tools-technologies', title: 'Tools & Technologies' },
    { id: 'learning-path', title: 'Learning Path' },
    { id: 'summary', title: 'Summary' }
  ];

  const devopsVideos = getVideosForTopic('devops');

  const renderContent = () => {
    switch (activeSection) {
      case 'introduction':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="introduction" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🚀 DevOps Learning by Yagnesh
              </h1>
              
              <div className="max-w-6xl mx-auto">
                <div className="gradient-border hover-lift mb-8">
                  <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-8 rounded-xl">
                    <h2 className="text-3xl font-bold text-blue-400 mb-4 neon-glow">Goal</h2>
                    <p className="text-white text-xl">Master DevOps practices, tools, and culture for modern software development.</p>
                  </div>
                </div>

                <h2 id="introduction" className="text-3xl font-bold text-blue-400 mb-6">1. DevOps Introduction</h2>
                
                <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift hover:ring-2 hover:ring-blue-500/30 hover:ring-opacity-50 transition-all duration-300">
                  <h3 className="text-2xl font-bold text-green-400 mb-6 neon-glow">What is DevOps?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-r from-blue-900/50 to-blue-800/50 border border-blue-500/30 p-6 rounded-xl hover-glow-accent">
                      <p className="text-blue-300 font-semibold text-lg">✅ Development + Operations</p>
                      <p className="text-gray-300 text-sm mt-2">Bridging the gap between development and operations teams</p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 border border-purple-500/30 p-6 rounded-xl hover-glow-accent">
                      <p className="text-purple-300 font-semibold text-lg">🔄 Continuous Integration</p>
                      <p className="text-gray-300 text-sm mt-2">Automated testing and deployment pipelines</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                    <h4 className="text-xl font-bold text-yellow-400 mb-4">Key Benefits</h4>
                    <ul className="text-gray-300 space-y-2">
                      <li>• Faster time to market</li>
                      <li>• Improved collaboration</li>
                      <li>• Higher quality software</li>
                      <li>• Reduced deployment failures</li>
                      <li>• Better customer satisfaction</li>
                    </ul>
                  </div>
                  
                  <div className="bg-yellow-900 border border-yellow-700 p-4 rounded-lg">
                    <p className="text-yellow-300 font-semibold">📌 DevOps bridges the gap between development and operations teams for faster, more reliable software delivery</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );
      
      case 'core-concepts':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="core-concepts" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🚀 Core Concepts
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Understanding the fundamental principles of DevOps
              </p>
              
              <div className="max-w-6xl mx-auto">
                <h2 id="core-concepts" className="text-3xl font-bold text-blue-400 mb-6">2. Core Concepts</h2>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8 hover:ring-2 hover:ring-blue-500/30 hover:ring-opacity-50 transition-all duration-300">
                  <h3 className="text-xl font-bold text-purple-400 mb-4">The Three Ways of DevOps</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-700 p-4 rounded border border-gray-600">
                      <h4 className="font-bold text-blue-400 mb-2">1. Flow</h4>
                      <p className="text-gray-300 text-sm">Fast left-to-right flow of work from Development to Operations</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded border border-gray-600">
                      <h4 className="font-bold text-green-400 mb-2">2. Feedback</h4>
                      <p className="text-gray-300 text-sm">Fast and constant feedback from right to left at all stages</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded border border-gray-600">
                      <h4 className="font-bold text-purple-400 mb-2">3. Continual Learning</h4>
                      <p className="text-gray-300 text-sm">Culture of experimentation and learning from failures</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );
      
      case 'devops-lifecycle':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="devops-lifecycle" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🚀 DevOps Lifecycle
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Understanding the complete DevOps workflow
              </p>
              
              <div className="max-w-6xl mx-auto">
                <h2 id="devops-lifecycle" className="text-3xl font-bold text-blue-400 mb-6">3. DevOps Lifecycle</h2>
                
                <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift hover:ring-2 hover:ring-blue-500/30 hover:ring-opacity-50 transition-all duration-300">
                  <h3 className="text-2xl font-bold text-green-400 mb-6 neon-glow">The Infinite Loop</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-blue-900/30 border border-blue-500/30 p-4 rounded-lg text-center">
                      <div className="text-4xl mb-2">💻</div>
                      <h4 className="text-blue-300 font-bold mb-2">Plan</h4>
                      <p className="text-gray-300 text-sm">Requirements gathering and project planning</p>
                    </div>
                    <div className="bg-green-900/30 border border-green-500/30 p-4 rounded-lg text-center">
                      <div className="text-4xl mb-2">🔨</div>
                      <h4 className="text-green-300 font-bold mb-2">Code</h4>
                      <p className="text-gray-300 text-sm">Development and version control</p>
                    </div>
                    <div className="bg-purple-900/30 border border-purple-500/30 p-4 rounded-lg text-center">
                      <div className="text-4xl mb-2">🧪</div>
                      <h4 className="text-purple-300 font-bold mb-2">Test</h4>
                      <p className="text-gray-300 text-sm">Automated testing and quality assurance</p>
                    </div>
                    <div className="bg-orange-900/30 border border-orange-500/30 p-4 rounded-lg text-center">
                      <div className="text-4xl mb-2">🚀</div>
                      <h4 className="text-orange-300 font-bold mb-2">Deploy</h4>
                      <p className="text-gray-300 text-sm">Automated deployment to production</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );
      
      case 'tools-technologies':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="tools-technologies" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🚀 Tools & Technologies
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Essential tools for modern DevOps practices
              </p>
              
              <div className="max-w-6xl mx-auto">
                <h2 id="tools-technologies" className="text-3xl font-bold text-blue-400 mb-6">4. Tools & Technologies</h2>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8 hover:ring-2 hover:ring-blue-500/30 hover:ring-opacity-50 transition-all duration-300">
                  <h3 className="text-xl font-bold text-purple-400 mb-4">DevOps Toolchain</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-700 p-4 rounded border border-gray-600">
                      <h4 className="font-bold text-blue-400 mb-2">Version Control</h4>
                      <p className="text-gray-300 text-sm">Git, GitHub, GitLab</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded border border-gray-600">
                      <h4 className="font-bold text-green-400 mb-2">CI/CD</h4>
                      <p className="text-gray-300 text-sm">Jenkins, GitLab CI, GitHub Actions</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded border border-gray-600">
                      <h4 className="font-bold text-purple-400 mb-2">Containers</h4>
                      <p className="text-gray-300 text-sm">Docker, Kubernetes</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded border border-gray-600">
                      <h4 className="font-bold text-yellow-400 mb-2">Monitoring</h4>
                      <p className="text-gray-300 text-sm">Prometheus, Grafana, ELK Stack</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded border border-gray-600">
                      <h4 className="font-bold text-red-400 mb-2">Infrastructure</h4>
                      <p className="text-gray-300 text-sm">Terraform, Ansible, CloudFormation</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded border border-gray-600">
                      <h4 className="font-bold text-cyan-400 mb-2">Cloud Platforms</h4>
                      <p className="text-gray-300 text-sm">AWS, Azure, GCP</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );
      
      case 'learning-path':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="learning-path" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🚀 Learning Path
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                A structured approach to mastering DevOps
              </p>
              
              <div className="max-w-6xl mx-auto">
                <h2 id="learning-path" className="text-3xl font-bold text-blue-400 mb-6">5. Learning Path</h2>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8 hover:ring-2 hover:ring-blue-500/30 hover:ring-opacity-50 transition-all duration-300">
                  <h3 className="text-xl font-bold text-purple-400 mb-4">Step-by-Step Learning Journey</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                      <div>
                        <h4 className="font-bold text-white">Learn Linux Fundamentals</h4>
                        <p className="text-gray-400 text-sm">Command line, file systems, permissions, and basic scripting</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                      <div>
                        <h4 className="font-bold text-white">Master Git and Version Control</h4>
                        <p className="text-gray-400 text-sm">Branching, merging, pull requests, and collaborative workflows</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                      <div>
                        <h4 className="font-bold text-white">Docker and Containerization</h4>
                        <p className="text-gray-400 text-sm">Container concepts, Dockerfile, and container orchestration</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                      <div>
                        <h4 className="font-bold text-white">CI/CD Pipelines</h4>
                        <p className="text-gray-400 text-sm">Jenkins, GitLab CI, and deployment automation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );
      
      case 'summary':
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="summary" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🚀 Summary
              </h1>
              <p className="text-lg text-gray-400 mb-8 text-center">
                Key takeaways from DevOps learning
              </p>
              
              <div className="max-w-6xl mx-auto">
                <h2 id="summary" className="text-3xl font-bold text-blue-400 mb-6">✅ Summary</h2>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                  <ul className="text-gray-300 space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-400 mr-3 mt-1">•</span>
                      DevOps is a cultural shift that emphasizes collaboration, automation, and continuous improvement
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-3 mt-1">•</span>
                      Key practices include CI/CD, Infrastructure as Code, monitoring, and automation
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-3 mt-1">•</span>
                      Essential tools include Git, Docker, Kubernetes, Jenkins, and cloud platforms
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-3 mt-1">•</span>
                      Continuous learning and adaptation are crucial for DevOps success
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </main>
        );
      
      default:
        return (
          <main>
            <div className="animate-fade-in-up">
              <h1 id="introduction" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
                🚀 DevOps Learning by Yagnesh
              </h1>
              
              <div className="max-w-6xl mx-auto">
                <div className="gradient-border hover-lift mb-8">
                  <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-8 rounded-xl">
                    <h2 className="text-3xl font-bold text-blue-400 mb-4 neon-glow">Goal</h2>
                    <p className="text-white text-xl">Master DevOps practices, tools, and culture for modern software development.</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        );
    }
  };

  return (
    <TechLayout onThisPage={pageHeadings} technology="devops" activeSection={activeSection} setActiveSection={setActiveSection}>
      {renderContent()}
    </TechLayout>
  );
}