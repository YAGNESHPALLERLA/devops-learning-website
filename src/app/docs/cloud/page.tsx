import DocsLayout from '@/components/docs-layout';
import VideoSection from '@/components/VideoSection';
import { getVideosForTopic } from '@/data/videoTutorials';

export default function CloudPage() {
  const pageHeadings = [
    { id: 'introduction', title: 'Introduction to Cloud Computing' },
    { id: 'aws-basics', title: 'AWS Basics' },
    { id: 'azure-basics', title: 'Azure Basics' },
    { id: 'gcp-basics', title: 'Google Cloud Platform' },
    { id: 'cloud-services', title: 'Core Cloud Services' },
    { id: 'iam-security', title: 'IAM & Security' },
    { id: 'cli-integration', title: 'CLI Integration' },
    { id: 'video-tutorials', title: 'Video Tutorials' },
    { id: 'summary', title: 'Summary' },
  ];

  const cloudVideos = getVideosForTopic('cloud');

  return (
    <DocsLayout onThisPage={pageHeadings}>
      <div className="animate-fade-in-up">
        <h1 id="introduction" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
          ☁️ Cloud Computing for DevOps
        </h1>
        
        <div className="max-w-6xl mx-auto">
          <div className="gradient-border hover-lift mb-8">
            <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 p-8 rounded-xl">
              <h2 className="text-3xl font-bold text-blue-400 mb-4 neon-glow">Goal</h2>
              <p className="text-white text-xl">Master cloud platforms to deploy, scale, and manage applications in the cloud.</p>
            </div>
          </div>

          <h2 id="aws-basics" className="text-3xl font-bold text-blue-400 mb-6">1. AWS (Amazon Web Services)</h2>
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift">
            <h3 className="text-2xl font-bold text-orange-400 mb-6 neon-glow">Core AWS Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-orange-900/50 to-red-900/50 border border-orange-500/30 p-6 rounded-xl hover-glow-warning">
                <h4 className="text-orange-400 font-bold text-lg mb-3">EC2 (Elastic Compute)</h4>
                <p className="text-white">Virtual servers in the cloud</p>
              </div>
              <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-500/30 p-6 rounded-xl hover-glow-primary">
                <h4 className="text-blue-400 font-bold text-lg mb-3">S3 (Simple Storage)</h4>
                <p className="text-white">Object storage service</p>
              </div>
              <div className="bg-gradient-to-r from-green-900/50 to-blue-900/50 border border-green-500/30 p-6 rounded-xl hover-glow-accent">
                <h4 className="text-green-400 font-bold text-lg mb-3">VPC (Virtual Private Cloud)</h4>
                <p className="text-white">Isolated network environment</p>
              </div>
              <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30 p-6 rounded-xl hover-glow-secondary">
                <h4 className="text-purple-400 font-bold text-lg mb-3">RDS (Relational Database)</h4>
                <p className="text-white">Managed database service</p>
              </div>
            </div>
          </div>

          <h2 id="azure-basics" className="text-3xl font-bold text-blue-400 mb-6">2. Microsoft Azure</h2>
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift">
            <h3 className="text-2xl font-bold text-blue-400 mb-6 neon-glow">Core Azure Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border border-blue-500/30 p-6 rounded-xl hover-glow-primary">
                <h4 className="text-blue-400 font-bold text-lg mb-3">Virtual Machines</h4>
                <p className="text-white">Scalable compute resources</p>
              </div>
              <div className="bg-gradient-to-r from-green-900/50 to-blue-900/50 border border-green-500/30 p-6 rounded-xl hover-glow-accent">
                <h4 className="text-green-400 font-bold text-lg mb-3">Blob Storage</h4>
                <p className="text-white">Object storage for unstructured data</p>
              </div>
              <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500/30 p-6 rounded-xl hover-glow-secondary">
                <h4 className="text-purple-400 font-bold text-lg mb-3">Azure DevOps</h4>
                <p className="text-white">CI/CD and project management</p>
              </div>
              <div className="bg-gradient-to-r from-orange-900/50 to-red-900/50 border border-orange-500/30 p-6 rounded-xl hover-glow-warning">
                <h4 className="text-orange-400 font-bold text-lg mb-3">Azure Kubernetes Service</h4>
                <p className="text-white">Managed Kubernetes service</p>
              </div>
            </div>
          </div>

          <h2 id="iam-security" className="text-3xl font-bold text-blue-400 mb-6">3. IAM & Security</h2>
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift">
            <h3 className="text-2xl font-bold text-red-400 mb-6 neon-glow">Identity and Access Management</h3>
            <ul className="text-white space-y-3">
              <li className="flex items-start">
                <span className="text-red-400 mr-3 mt-1">•</span>
                User roles and permissions management
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3 mt-1">•</span>
                Multi-factor authentication (MFA)
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3 mt-1">•</span>
                API keys and access tokens
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3 mt-1">•</span>
                Security groups and network ACLs
              </li>
            </ul>
          </div>

          <VideoSection videos={cloudVideos} title="Cloud Computing Video Tutorials" />

          <h2 id="summary" className="text-3xl font-bold text-blue-400 mb-6">✅ Summary</h2>
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift">
            <ul className="text-white space-y-3">
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Cloud platforms provide scalable infrastructure for DevOps
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                AWS, Azure, and GCP are the major cloud providers
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                IAM ensures secure access to cloud resources
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                CLI tools enable automation and scripting
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
