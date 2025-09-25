// src/app/python/page.tsx
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

      {/* Topics Grid */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-white mb-10">Complete Python Learning Path</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TopicCard
            title="Syntax & Indentation"
            description="Learn Python's unique syntax rules, indentation, comments, and best practices."
            link="/python/basics/syntax"
          />
          <TopicCard
            title="Variables & Data Types"
            description="Master variable creation, naming conventions, and Python's built-in data types."
            link="/python/basics/variables"
          />
          <TopicCard
            title="Type Casting & Operators"
            description="Learn arithmetic, comparison, logical operators, and type conversion."
            link="/python/basics/operators"
          />
          <TopicCard
            title="Conditionals (if, elif, else)"
            description="Control program flow with conditional statements and decision making."
            link="/python/basics/conditionals"
          />
          <TopicCard
            title="Loops"
            description="Master for loops, while loops, and loop control with break and continue."
            link="/python/basics/loops"
          />
          <TopicCard
            title="Strings"
            description="String manipulation, formatting, methods, and string operations."
            link="/python/basics/strings"
          />
          <TopicCard
            title="Lists, Tuples, Sets, Dictionaries"
            description="Master Python's core data structures for organizing and manipulating data."
            link="/python/intermediate/data-structures"
          />
          <TopicCard
            title="Python Functions"
            description="Create reusable code with functions, parameters, return values, and scope."
            link="/python/intermediate/functions"
          />
          <TopicCard
            title="Python OOP"
            description="Object-oriented programming with classes, objects, inheritance, and polymorphism."
            link="/python/intermediate/oop"
          />
          <TopicCard
            title="File Handling"
            description="Read from and write to files, handle different file formats, and manage file operations."
            link="/python/intermediate/file-handling"
          />
          <TopicCard
            title="Exception Handling"
            description="Handle errors gracefully with try-except blocks and custom exceptions."
            link="/python/intermediate/exception-handling"
          />
          <TopicCard
            title="Modules and Packages"
            description="Organize code with modules, create packages, and manage imports."
            link="/python/intermediate/modules"
          />
          <TopicCard
            title="Iterators & Generators"
            description="Create memory-efficient iterators and generators for handling large datasets."
            link="/python/advanced/iterators"
          />
          <TopicCard
            title="Python Decorators"
            description="Master decorators for extending function behavior without modifying them."
            link="/python/advanced/decorators"
          />
          <TopicCard
            title="Functional Programming"
            description="Learn functional programming concepts with map, filter, reduce, and lambda functions."
            link="/python/advanced/functional"
          />
          <TopicCard
            title="Multithreading & Multiprocessing"
            description="Implement concurrent programming with threads and processes."
            link="/python/advanced/concurrency"
          />
          <TopicCard
            title="AsyncIO & Context Managers"
            description="Asynchronous programming and resource management with context managers."
            link="/python/advanced/asyncio"
          />
          <TopicCard
            title="Memory Management"
            description="Understand Python's memory management, garbage collection, and optimization."
            link="/python/advanced/memory"
          />
          <TopicCard
            title="Data Handling"
            description="Advanced data processing, manipulation, and analysis techniques."
            link="/python/specialized/data-handling"
          />
          <TopicCard
            title="Logging & Debugging"
            description="Implement proper logging, debugging techniques, and type hinting."
            link="/python/specialized/logging"
          />
          <TopicCard
            title="Standard Library"
            description="Explore Python's extensive standard library and virtual environments."
            link="/python/specialized/standard-library"
          />
        </div>
      </section>
    </main>
  );
}
