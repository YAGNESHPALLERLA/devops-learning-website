// src/app/devops/page.tsx
import Link from 'next/link';

// Define the props interface for TopicCard
interface TopicCardProps {
  title: string;
  description: string;
  link: string;
}

// A simple reusable card component for your topics
function TopicCard({ title, description, link }: TopicCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
      <p className="text-gray-400 mb-4">{description}</p>
      <Link href={link} className="inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition">
        Learn More
      </Link>
    </div>
  );
}

export default function DevOpsPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <Link href="/" className="inline-block mb-8 text-blue-400 hover:text-blue-300 transition-colors">
          ← Back to Technology Selection
        </Link>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
          🚀 DevOps Learning by Yagnesh
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-8">
          "Learn DevOps from Basics to Intermediate"
        </p>
      </section>

      {/* Topics Grid */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-white mb-10">Guide to DevOps</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TopicCard
            title="What is DevOps"
            description="Understand the core principles and cultural shift of DevOps."
            link="/docs/what-is-devops"
          />
          <TopicCard
            title="Concepts in DevOps"
            description="Learn about the key concepts and the infinite DevOps lifecycle."
            link="/docs/concepts"
          />
          <TopicCard
            title="Tools in DevOps"
            description="Explore the different tools used in each stage of the DevOps lifecycle."
            link="/docs/tools"
          />
          <TopicCard
            title="Linux Basics"
            description="The first step in your DevOps journey: master the Linux command line."
            link="/docs/linux-basics"
          />
          <TopicCard
            title="Scripting Languages"
            description="Learn how to write automation scripts with Python or Ruby."
            link="/docs/scripting-languages"
          />
          <TopicCard
            title="Version Control (Git)"
            description="Understand Git basics for collaboration and code management."
            link="/docs/version-control"
          />
          <TopicCard
            title="Cloud (AWS, Azure)"
            description="Master cloud platforms and services for scalable infrastructure."
            link="/docs/cloud"
          />
          <TopicCard
            title="Docker (Containers)"
            description="Learn containerization with Docker for consistent deployments."
            link="/docs/docker"
          />
          <TopicCard
            title="Jenkins (CI & CD)"
            description="Set up continuous integration and deployment pipelines."
            link="/docs/jenkins"
          />
          <TopicCard
            title="Infrastructure as Code (IaC)"
            description="Manage infrastructure using code with Terraform and CloudFormation."
            link="/docs/iac"
          />
          <TopicCard
            title="Kubernetes"
            description="Orchestrate containers at scale with Kubernetes."
            link="/docs/kubernetes"
          />
          <TopicCard
            title="Monitoring & Logging"
            description="Implement observability with monitoring and logging solutions."
            link="/docs/monitoring"
          />
          <TopicCard
            title="Interactive Terminal"
            description="Practice Linux commands in a safe, simulated environment."
            link="/terminal"
          />
        </div>
      </section>
    </main>
  );
}
