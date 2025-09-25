// src/app/python/page.tsx
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

export default function PythonPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <Link href="/" className="inline-block mb-8 text-blue-400 hover:text-blue-300 transition-colors">
          ← Back to Technology Selection
        </Link>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
          🐍 Python Learning Hub
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-8">
          Learn Python programming, data science, web development, and automation
        </p>
      </section>

      {/* Topics Grid */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-white mb-10">Python Learning Path</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TopicCard
            title="Python Basics"
            description="Learn Python syntax, variables, data types, and basic programming concepts."
            status="coming-soon"
          />
          <TopicCard
            title="Control Structures"
            description="Master loops, conditionals, and control flow in Python."
            status="coming-soon"
          />
          <TopicCard
            title="Functions and Modules"
            description="Create reusable code with functions and organize code with modules."
            status="coming-soon"
          />
          <TopicCard
            title="Data Structures"
            description="Lists, dictionaries, tuples, and sets - Python's powerful data structures."
            status="coming-soon"
          />
          <TopicCard
            title="Object-Oriented Programming"
            description="Classes, objects, inheritance, and OOP principles in Python."
            status="coming-soon"
          />
          <TopicCard
            title="File Handling"
            description="Read from and write to files, CSV processing, and JSON manipulation."
            status="coming-soon"
          />
          <TopicCard
            title="Web Development with Flask"
            description="Build web applications and APIs using the Flask framework."
            status="coming-soon"
          />
          <TopicCard
            title="Data Science with Pandas"
            description="Data manipulation and analysis with pandas library."
            status="coming-soon"
          />
          <TopicCard
            title="Data Visualization"
            description="Create charts and graphs with Matplotlib and Seaborn."
            status="coming-soon"
          />
          <TopicCard
            title="Machine Learning Basics"
            description="Introduction to machine learning with scikit-learn."
            status="coming-soon"
          />
          <TopicCard
            title="Automation Scripts"
            description="Write Python scripts for automation and task scheduling."
            status="coming-soon"
          />
          <TopicCard
            title="Python for DevOps"
            description="Use Python for DevOps tasks, automation, and infrastructure management."
            status="coming-soon"
          />
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-400 text-lg">
            Python content is being prepared. Check back soon for comprehensive tutorials!
          </p>
        </div>
      </section>
    </main>
  );
}
