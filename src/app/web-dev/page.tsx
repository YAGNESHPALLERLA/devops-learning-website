// src/app/web-dev/page.tsx
import Link from 'next/link';
import TechLayout from '@/components/tech-layout';

// Define the props interface for TopicCard
interface TopicCardProps {
  title: string;
  description: string;
  link: string;
}

// A simple reusable card component for your topics
function TopicCard({ title, description, link }: TopicCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:ring-2 hover:ring-blue-500/30 hover:ring-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-opacity-50">
      <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
      <p className="text-gray-400 mb-4">{description}</p>
      <Link href={link} className="inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition">
        Learn More
      </Link>
    </div>
  );
}

export default function WebDevPage() {
  const pageHeadings = [
    { id: 'introduction', title: 'Web Development Learning Hub' },
    { id: 'learning-path', title: 'Complete Web Development Path' },
    { id: 'learning-tips', title: 'Learning Tips' }
  ];

  return (
    <TechLayout onThisPage={pageHeadings} technology="web-dev">
      <main>
      <section id="introduction" className="text-center py-20 px-4">
        <Link href="/" className="inline-block mb-8 text-blue-400 hover:text-blue-300 transition-colors">
          ← Back to Technology Selection
        </Link>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
          🌐 Web Development Learning Hub
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-8">
          Learn HTML, CSS, JavaScript, React, and full-stack web development
        </p>
      </section>

      <section id="learning-path" className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-white mb-10">Complete Web Development Path</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TopicCard
            title="HTML5 Fundamentals"
            description="Learn semantic markup, forms, multimedia, and modern HTML5 features."
            link="/web-dev/html"
          />
          <TopicCard
            title="CSS3 & Styling"
            description="Master CSS3, Flexbox, Grid, animations, and responsive design."
            link="/web-dev/css"
          />
          <TopicCard
            title="JavaScript Basics"
            description="Variables, functions, DOM manipulation, and ES6+ features."
            link="/web-dev/javascript"
          />
          <TopicCard
            title="Advanced JavaScript"
            description="Async programming, modules, error handling, and modern JS patterns."
            link="/web-dev/advanced-js"
          />
          <TopicCard
            title="React.js Fundamentals"
            description="Components, props, state, hooks, and React best practices."
            link="/web-dev/react"
          />
          <TopicCard
            title="React Advanced"
            description="Context, Redux, performance optimization, and testing."
            link="/web-dev/react-advanced"
          />
          <TopicCard
            title="Node.js & Express"
            description="Server-side JavaScript, REST APIs, and backend development."
            link="/web-dev/nodejs"
          />
          <TopicCard
            title="Database Integration"
            description="MongoDB, SQL databases, ORMs, and data modeling."
            link="/web-dev/database"
          />
          <TopicCard
            title="Authentication & Security"
            description="JWT, OAuth, security best practices, and user management."
            link="/web-dev/auth"
          />
          <TopicCard
            title="Deployment & DevOps"
            description="AWS, Docker, CI/CD, and production deployment strategies."
            link="/web-dev/deployment"
          />
          <TopicCard
            title="Full-Stack Projects"
            description="Build complete web applications from frontend to backend."
            link="/web-dev/projects"
          />
          <TopicCard
            title="Performance Optimization"
            description="Web performance, SEO, caching, and optimization techniques."
            link="/web-dev/performance"
          />
        </div>
      </section>
      </main>
    </TechLayout>
  );
}
