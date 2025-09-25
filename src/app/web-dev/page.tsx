// src/app/web-dev/page.tsx
import Link from 'next/link';

interface TopicCardProps {
  title: string;
  description: string;
  status: 'coming-soon' | 'available';
}

function TopicCard({ title, description, status }: TopicCardProps) {
  return (
    <div className={`rounded-lg shadow-lg p-6 transition-all duration-300 ${
      status === 'available' 
        ? 'bg-gray-800 hover:shadow-xl' 
        : 'bg-gray-700 opacity-75'
    }`}>
      <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
      <p className="text-gray-400 mb-4">{description}</p>
      <div className={`inline-block px-4 py-2 rounded-md text-sm font-semibold ${
        status === 'available'
          ? 'bg-green-600 text-white hover:bg-green-700'
          : 'bg-gray-600 text-gray-300'
      }`}>
        {status === 'available' ? 'Available' : 'Coming Soon'}
      </div>
    </div>
  );
}

export default function WebDevPage() {
  return (
    <main>
      <section className="text-center py-20 px-4">
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

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-white mb-10">Web Development Learning Path</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TopicCard
            title="HTML Fundamentals"
            description="Learn HTML structure, semantic elements, and web page basics."
            status="coming-soon"
          />
          <TopicCard
            title="CSS Styling"
            description="Master CSS selectors, layouts, Flexbox, and Grid systems."
            status="coming-soon"
          />
          <TopicCard
            title="JavaScript Basics"
            description="Variables, functions, DOM manipulation, and JavaScript fundamentals."
            status="coming-soon"
          />
          <TopicCard
            title="Responsive Design"
            description="Mobile-first design, media queries, and responsive layouts."
            status="coming-soon"
          />
          <TopicCard
            title="React Fundamentals"
            description="Components, JSX, props, state, and React basics."
            status="coming-soon"
          />
          <TopicCard
            title="Node.js Backend"
            description="Server-side JavaScript, Express.js, and API development."
            status="coming-soon"
          />
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-400 text-lg">
            Web Development content is being prepared. Check back soon!
          </p>
        </div>
      </section>
    </main>
  );
}
