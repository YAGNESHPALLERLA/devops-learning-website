// src/app/devops/page.tsx
import TechLayout from '@/components/tech-layout';
import VideoSection from '@/components/VideoSection';
import { getVideosForTopic } from '@/data/videoTutorials';

export default function DevOpsPage() {
  const pageHeadings = [
    { id: 'introduction', title: 'DevOps Introduction' },
    { id: 'core-concepts', title: 'Core Concepts' },
    { id: 'devops-lifecycle', title: 'DevOps Lifecycle' },
    { id: 'tools-technologies', title: 'Tools & Technologies' },
    { id: 'learning-path', title: 'Learning Path' },
    { id: 'summary', title: 'Summary' }
  ];

  const devopsVideos = getVideosForTopic('devops');

  return (
    <TechLayout onThisPage={pageHeadings} technology="devops">
      <main>
        <div className="animate-fade-in-up">
          <h1 id="introduction" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
            🚀 DevOps Learning by Yagnesh
          </h1>
          
          <div className="max-w-6xl mx-auto">
            <div className="gradient-border hover-lift mb-8">
              <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-8 rounded-xl">
                <h2 className="text-3xl font-bold text-blue-400 mb-4 neon-glow">Goal</h2>
                <p className="text-white text-xl">Master DevOps practices from basics to advanced automation, CI/CD, and cloud infrastructure management.</p>
              </div>
            </div>

            <h2 id="introduction" className="text-3xl font-bold text-blue-400 mb-6">1. DevOps Introduction</h2>
            
            <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift hover:ring-2 hover:ring-blue-500/30 hover:ring-opacity-50 transition-all duration-300">
              <h3 className="text-2xl font-bold text-green-400 mb-6 neon-glow">What is DevOps?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-900/50 to-blue-800/50 border border-blue-500/30 p-6 rounded-xl hover-glow-accent">
                  <p className="text-blue-300 font-semibold text-lg">✅ Culture & Collaboration</p>
                  <p className="text-gray-300 text-sm mt-2">Breaking down silos between development and operations</p>
                </div>
                <div className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 border border-purple-500/30 p-6 rounded-xl hover-glow-accent">
                  <p className="text-purple-300 font-semibold text-lg">✅ Automation & Tools</p>
                  <p className="text-gray-300 text-sm mt-2">Automating manual processes and repetitive tasks</p>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-green-400 mb-4">Key Principles:</h3>
              <ul className="text-gray-300 space-y-2 mb-4">
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  <strong>Continuous Integration (CI):</strong> Frequent code integration and automated testing
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  <strong>Continuous Deployment (CD):</strong> Automated deployment to production environments
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  <strong>Infrastructure as Code (IaC):</strong> Managing infrastructure through code
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 mt-1">•</span>
                  <strong>Monitoring & Observability:</strong> Real-time monitoring and logging
                </li>
              </ul>
              
              <div className="bg-yellow-900 border border-yellow-700 p-4 rounded-lg">
                <p className="text-yellow-300 font-semibold">📌 DevOps bridges the gap between development and operations teams for faster, more reliable software delivery</p>
              </div>
            </div>

            <h2 id="core-concepts" className="text-3xl font-bold text-blue-400 mb-6">2. Core Concepts</h2>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8 hover:ring-2 hover:ring-blue-500/30 hover:ring-opacity-50 transition-all duration-300">
              <h3 className="text-xl font-bold text-purple-400 mb-4">The Three Ways of DevOps</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-700 p-4 rounded border border-gray-600">
                  <h4 className="font-bold text-blue-400 mb-2">1. Flow (Systems Thinking)</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Fast feedback loops</li>
                    <li>• Reduce batch sizes</li>
                    <li>• Continuous integration</li>
                    <li>• Build quality in</li>
                  </ul>
                </div>
                <div className="bg-gray-700 p-4 rounded border border-gray-600">
                  <h4 className="font-bold text-green-400 mb-2">2. Feedback (Amplify Loops)</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Telemetry and monitoring</li>
                    <li>• Swarming on problems</li>
                    <li>• Fast detection and recovery</li>
                    <li>• Customer feedback loops</li>
                  </ul>
                </div>
                <div className="bg-gray-700 p-4 rounded border border-gray-600">
                  <h4 className="font-bold text-purple-400 mb-2">3. Continual Learning</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Culture of experimentation</li>
                    <li>• Learning from failures</li>
                    <li>• Knowledge sharing</li>
                    <li>• Innovation time</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 id="devops-lifecycle" className="text-3xl font-bold text-blue-400 mb-6">3. DevOps Lifecycle</h2>
            
            <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift hover:ring-2 hover:ring-blue-500/30 hover:ring-opacity-50 transition-all duration-300">
              <h3 className="text-2xl font-bold text-green-400 mb-6 neon-glow">The Infinite Loop</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-900/30 border border-blue-500/30 p-4 rounded-lg text-center">
                  <div className="text-4xl mb-2">📝</div>
                  <h4 className="text-blue-300 font-bold mb-2">Plan</h4>
                  <p className="text-gray-300 text-sm">Requirements gathering, project planning, and roadmap creation</p>
                </div>
                <div className="bg-green-900/30 border border-green-500/30 p-4 rounded-lg text-center">
                  <div className="text-4xl mb-2">💻</div>
                  <h4 className="text-green-300 font-bold mb-2">Code</h4>
                  <p className="text-gray-300 text-sm">Development, version control, and code review processes</p>
                </div>
                <div className="bg-purple-900/30 border border-purple-500/30 p-4 rounded-lg text-center">
                  <div className="text-4xl mb-2">🔧</div>
                  <h4 className="text-purple-300 font-bold mb-2">Build</h4>
                  <p className="text-gray-300 text-sm">Compilation, packaging, and artifact creation</p>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/30 p-4 rounded-lg text-center">
                  <div className="text-4xl mb-2">🧪</div>
                  <h4 className="text-yellow-300 font-bold mb-2">Test</h4>
                  <p className="text-gray-300 text-sm">Automated testing, quality assurance, and validation</p>
                </div>
                <div className="bg-red-900/30 border border-red-500/30 p-4 rounded-lg text-center">
                  <div className="text-4xl mb-2">🚀</div>
                  <h4 className="text-red-300 font-bold mb-2">Deploy</h4>
                  <p className="text-gray-300 text-sm">Release management and production deployment</p>
                </div>
                <div className="bg-indigo-900/30 border border-indigo-500/30 p-4 rounded-lg text-center">
                  <div className="text-4xl mb-2">📊</div>
                  <h4 className="text-indigo-300 font-bold mb-2">Monitor</h4>
                  <p className="text-gray-300 text-sm">Performance monitoring and system health checks</p>
                </div>
                <div className="bg-pink-900/30 border border-pink-500/30 p-4 rounded-lg text-center">
                  <div className="text-4xl mb-2">🔄</div>
                  <h4 className="text-pink-300 font-bold mb-2">Operate</h4>
                  <p className="text-gray-300 text-sm">System operations, maintenance, and support</p>
                </div>
                <div className="bg-cyan-900/30 border border-cyan-500/30 p-4 rounded-lg text-center">
                  <div className="text-4xl mb-2">📈</div>
                  <h4 className="text-cyan-300 font-bold mb-2">Feedback</h4>
                  <p className="text-gray-300 text-sm">User feedback, metrics analysis, and continuous improvement</p>
                </div>
              </div>
            </div>

            <h2 id="tools-technologies" className="text-3xl font-bold text-blue-400 mb-6">4. Tools & Technologies</h2>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8 hover:ring-2 hover:ring-blue-500/30 hover:ring-opacity-50 transition-all duration-300">
              <h3 className="text-xl font-bold text-purple-400 mb-4">DevOps Toolchain</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-700 p-4 rounded border border-gray-600">
                  <h4 className="font-bold text-blue-400 mb-2">Version Control</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Git, GitHub, GitLab</li>
                    <li>• Branching strategies</li>
                    <li>• Code review processes</li>
                  </ul>
                </div>
                <div className="bg-gray-700 p-4 rounded border border-gray-600">
                  <h4 className="font-bold text-green-400 mb-2">CI/CD</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Jenkins, GitLab CI</li>
                    <li>• GitHub Actions</li>
                    <li>• Azure DevOps</li>
                  </ul>
                </div>
                <div className="bg-gray-700 p-4 rounded border border-gray-600">
                  <h4 className="font-bold text-purple-400 mb-2">Containerization</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Docker</li>
                    <li>• Container registries</li>
                    <li>• Multi-stage builds</li>
                  </ul>
                </div>
                <div className="bg-gray-700 p-4 rounded border border-gray-600">
                  <h4 className="font-bold text-yellow-400 mb-2">Orchestration</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Kubernetes</li>
                    <li>• Docker Swarm</li>
                    <li>• Service mesh</li>
                  </ul>
                </div>
                <div className="bg-gray-700 p-4 rounded border border-gray-600">
                  <h4 className="font-bold text-red-400 mb-2">Infrastructure</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Terraform</li>
                    <li>• Ansible</li>
                    <li>• CloudFormation</li>
                  </ul>
                </div>
                <div className="bg-gray-700 p-4 rounded border border-gray-600">
                  <h4 className="font-bold text-indigo-400 mb-2">Monitoring</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Prometheus, Grafana</li>
                    <li>• ELK Stack</li>
                    <li>• APM tools</li>
                  </ul>
                </div>
              </div>
            </div>

            <VideoSection videos={devopsVideos} title="DevOps Video Tutorials" />

            <h2 id="learning-path" className="text-3xl font-bold text-blue-400 mb-6">5. Learning Path</h2>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8 hover:ring-2 hover:ring-blue-500/30 hover:ring-opacity-50 transition-all duration-300">
              <h3 className="text-xl font-bold text-purple-400 mb-4">Step-by-Step Learning Journey</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="font-bold text-white">Linux Fundamentals</h4>
                    <p className="text-gray-400 text-sm">Master command line, file systems, and basic administration</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-bold text-white">Version Control (Git)</h4>
                    <p className="text-gray-400 text-sm">Learn branching, merging, and collaborative workflows</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-bold text-white">Scripting & Automation</h4>
                    <p className="text-gray-400 text-sm">Python, Bash, and automation scripting</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">4</div>
                  <div>
                    <h4 className="font-bold text-white">Cloud Platforms</h4>
                    <p className="text-gray-400 text-sm">AWS, Azure, or GCP fundamentals</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">5</div>
                  <div>
                    <h4 className="font-bold text-white">Containerization</h4>
                    <p className="text-gray-400 text-sm">Docker and container orchestration</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">6</div>
                  <div>
                    <h4 className="font-bold text-white">CI/CD Pipelines</h4>
                    <p className="text-gray-400 text-sm">Jenkins, GitLab CI, and deployment automation</p>
                  </div>
                </div>
              </div>
            </div>

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
                  Focus on building reliable, scalable, and maintainable systems
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
    </TechLayout>
  );
}
