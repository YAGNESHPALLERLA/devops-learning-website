// src/app/python/page.tsx
import Link from 'next/link';

interface TopicCardProps {
  title: string;
  description: string;
  link?: string;
  status: 'available' | 'coming-soon';
  level: 'beginner' | 'intermediate' | 'advanced';
}

function TopicCard({ title, description, link, status, level }: TopicCardProps) {
  const levelColors = {
    beginner: 'from-green-500 to-green-600',
    intermediate: 'from-yellow-500 to-orange-500',
    advanced: 'from-red-500 to-pink-500'
  };

  const content = link ? (
    <Link href={link} className="block">
      <div className={`rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl ${
        status === 'available' 
          ? 'bg-gray-800 hover:bg-gray-750 cursor-pointer' 
          : 'bg-gray-700 opacity-75'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <div className={`px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${levelColors[level]}`}>
            {level}
          </div>
        </div>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className={`inline-block px-4 py-2 rounded-md text-sm font-semibold ${
          status === 'available'
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-600 text-gray-300'
        }`}>
          {status === 'available' ? 'Start Learning →' : 'Coming Soon'}
        </div>
      </div>
    </Link>
  ) : (
    <div className={`rounded-lg shadow-lg p-6 transition-all duration-300 ${
      status === 'available' 
        ? 'bg-gray-800' 
        : 'bg-gray-700 opacity-75'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <div className={`px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${levelColors[level]}`}>
          {level}
        </div>
      </div>
      <p className="text-gray-400 mb-4">{description}</p>
      <div className={`inline-block px-4 py-2 rounded-md text-sm font-semibold ${
        status === 'available'
          ? 'bg-green-600 text-white'
          : 'bg-gray-600 text-gray-300'
      }`}>
        {status === 'available' ? 'Available' : 'Coming Soon'}
      </div>
    </div>
  );

  return content;
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
          Master Python programming from basics to advanced concepts
        </p>
      </section>

      {/* Learning Path Overview */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Complete Python Learning Path</h2>
          <p className="text-blue-100 text-lg">
            Follow this structured path to master Python programming. Each section builds upon the previous one,
            taking you from complete beginner to advanced Python developer.
          </p>
        </div>
      </section>

      {/* Beginner Topics */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <span className="bg-gradient-to-r from-green-500 to-green-600 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">1</span>
          Python Basics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TopicCard
            title="Syntax & Indentation"
            description="Learn Python's unique syntax rules, indentation, comments, and best practices."
            link="/python/basics/syntax"
            status="available"
            level="beginner"
          />
          <TopicCard
            title="Variables & Data Types"
            description="Master variable creation, naming conventions, and Python's built-in data types."
            link="/python/basics/variables"
            status="available"
            level="beginner"
          />
          <TopicCard
            title="Type Casting & Operators"
            description="Learn arithmetic, comparison, logical operators, and type conversion."
            link="/python/basics/operators"
            status="available"
            level="beginner"
          />
          <TopicCard
            title="Conditionals (if, elif, else)"
            description="Control program flow with conditional statements and decision making."
            link="/python/basics/conditionals"
            status="available"
            level="beginner"
          />
          <TopicCard
            title="Loops"
            description="Master for loops, while loops, and loop control with break and continue."
            link="/python/basics/loops"
            status="available"
            level="beginner"
          />
          <TopicCard
            title="Strings"
            description="String manipulation, formatting, methods, and string operations."
            link="/python/basics/strings"
            status="available"
            level="beginner"
          />
        </div>
      </section>

      {/* Intermediate Topics */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">2</span>
          Data Structures & Functions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TopicCard
            title="Lists, Tuples, Sets, Dictionaries"
            description="Master Python's core data structures for organizing and manipulating data."
            link="/python/intermediate/data-structures"
            status="available"
            level="intermediate"
          />
          <TopicCard
            title="Python Functions"
            description="Create reusable code with functions, parameters, return values, and scope."
            link="/python/intermediate/functions"
            status="available"
            level="intermediate"
          />
          <TopicCard
            title="Python OOP"
            description="Object-oriented programming with classes, objects, inheritance, and polymorphism."
            link="/python/intermediate/oop"
            status="available"
            level="intermediate"
          />
          <TopicCard
            title="File Handling"
            description="Read from and write to files, handle different file formats, and manage file operations."
            link="/python/intermediate/file-handling"
            status="available"
            level="intermediate"
          />
          <TopicCard
            title="Exception Handling"
            description="Handle errors gracefully with try-except blocks and custom exceptions."
            link="/python/intermediate/exception-handling"
            status="available"
            level="intermediate"
          />
          <TopicCard
            title="Modules and Packages"
            description="Organize code with modules, create packages, and manage imports."
            link="/python/intermediate/modules"
            status="available"
            level="intermediate"
          />
        </div>
      </section>

      {/* Advanced Topics */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <span className="bg-gradient-to-r from-red-500 to-pink-500 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">3</span>
          Advanced Python Concepts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TopicCard
            title="Iterators & Generators"
            description="Create memory-efficient iterators and generators for handling large datasets."
            link="/python/advanced/iterators"
            status="available"
            level="advanced"
          />
          <TopicCard
            title="Python Decorators"
            description="Master decorators for extending function behavior without modifying them."
            link="/python/advanced/decorators"
            status="available"
            level="advanced"
          />
          <TopicCard
            title="Functional Programming"
            description="Learn functional programming concepts with map, filter, reduce, and lambda functions."
            link="/python/advanced/functional"
            status="available"
            level="advanced"
          />
          <TopicCard
            title="Multithreading & Multiprocessing"
            description="Implement concurrent programming with threads and processes."
            link="/python/advanced/concurrency"
            status="available"
            level="advanced"
          />
          <TopicCard
            title="AsyncIO & Context Managers"
            description="Asynchronous programming and resource management with context managers."
            link="/python/advanced/asyncio"
            status="available"
            level="advanced"
          />
          <TopicCard
            title="Memory Management"
            description="Understand Python's memory management, garbage collection, and optimization."
            link="/python/advanced/memory"
            status="available"
            level="advanced"
          />
        </div>
      </section>

      {/* Specialized Topics */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <span className="bg-gradient-to-r from-purple-500 to-indigo-500 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">4</span>
          Specialized Applications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TopicCard
            title="Data Handling"
            description="Advanced data processing, manipulation, and analysis techniques."
            link="/python/specialized/data-handling"
            status="available"
            level="intermediate"
          />
          <TopicCard
            title="Logging & Debugging"
            description="Implement proper logging, debugging techniques, and type hinting."
            link="/python/specialized/logging"
            status="available"
            level="intermediate"
          />
          <TopicCard
            title="Standard Library"
            description="Explore Python's extensive standard library and virtual environments."
            link="/python/specialized/standard-library"
            status="available"
            level="intermediate"
          />
          <TopicCard
            title="Web Development"
            description="Build web applications with Flask, Django, and REST APIs."
            link="/python/specialized/web-dev"
            status="coming-soon"
            level="advanced"
          />
          <TopicCard
            title="Data Science"
            description="Data analysis, visualization, and machine learning with Python."
            link="/python/specialized/data-science"
            status="coming-soon"
            level="advanced"
          />
          <TopicCard
            title="DevOps & Automation"
            description="Use Python for automation, DevOps tasks, and infrastructure management."
            link="/python/specialized/devops"
            status="coming-soon"
            level="advanced"
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Start Learning Python?</h2>
          <p className="text-gray-400 mb-6">
            Begin your Python journey with our comprehensive learning path. Each topic includes
            practical examples, exercises, and real-world applications.
          </p>
          <Link href="/python/basics/syntax" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105">
            Start with Python Basics →
          </Link>
        </div>
      </section>
    </main>
  );
}
