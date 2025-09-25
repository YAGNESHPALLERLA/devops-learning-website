// src/app/java/page.tsx
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

export default function JavaPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <Link href="/" className="inline-block mb-8 text-blue-400 hover:text-blue-300 transition-colors">
          ← Back to Technology Selection
        </Link>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
          ☕ Java Learning Hub
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-8">
          Master Java programming from basics to advanced enterprise development
        </p>
      </section>

      {/* Learning Path Overview */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Complete Java Learning Path</h2>
          <p className="text-orange-100 text-lg">
            Follow this structured path to master Java programming. From basic syntax to advanced enterprise features,
            become proficient in one of the most popular programming languages in the world.
          </p>
        </div>
      </section>

      {/* Beginner Topics */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <span className="bg-gradient-to-r from-green-500 to-green-600 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">1</span>
          Java Fundamentals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TopicCard
            title="Java Introduction"
            description="Learn what Java is, JVM, JDK, and setting up your Java development environment."
            link="/java/basics/introduction"
            status="available"
            level="beginner"
          />
          <TopicCard
            title="Control Statements"
            description="Master if-else, switch statements, loops, and program flow control."
            link="/java/basics/control-statements"
            status="available"
            level="beginner"
          />
          <TopicCard
            title="Java Keywords"
            description="Understand Java reserved keywords, identifiers, and language fundamentals."
            link="/java/basics/keywords"
            status="available"
            level="beginner"
          />
          <TopicCard
            title="Variables & Data Types"
            description="Learn primitive types, reference types, and variable declaration in Java."
            link="/java/basics/variables"
            status="available"
            level="beginner"
          />
          <TopicCard
            title="Operators & Expressions"
            description="Arithmetic, logical, relational, and bitwise operators in Java."
            link="/java/basics/operators"
            status="available"
            level="beginner"
          />
          <TopicCard
            title="Input/Output Streams"
            description="File handling, input streams, output streams, and I/O operations."
            link="/java/basics/io-streams"
            status="available"
            level="beginner"
          />
        </div>
      </section>

      {/* Intermediate Topics */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">2</span>
          Object-Oriented Programming
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TopicCard
            title="Object-Oriented Programming (OOP)"
            description="Classes, objects, inheritance, polymorphism, and encapsulation principles."
            link="/java/intermediate/oop"
            status="available"
            level="intermediate"
          />
          <TopicCard
            title="Strings & String Handling"
            description="String class, StringBuilder, StringBuffer, and string manipulation."
            link="/java/intermediate/strings"
            status="available"
            level="intermediate"
          />
          <TopicCard
            title="Arrays & Collections"
            description="Arrays, ArrayList, HashMap, HashSet, and the Collections Framework."
            link="/java/intermediate/collections"
            status="available"
            level="intermediate"
          />
          <TopicCard
            title="Exception Handling"
            description="Try-catch blocks, custom exceptions, and error management strategies."
            link="/java/intermediate/exceptions"
            status="available"
            level="intermediate"
          />
          <TopicCard
            title="Packages & Modules"
            description="Package creation, import statements, and modular programming."
            link="/java/intermediate/packages"
            status="available"
            level="intermediate"
          />
          <TopicCard
            title="Multi-threading"
            description="Thread creation, synchronization, and concurrent programming in Java."
            link="/java/intermediate/multithreading"
            status="available"
            level="intermediate"
          />
        </div>
      </section>

      {/* Advanced Topics */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <span className="bg-gradient-to-r from-red-500 to-pink-500 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">3</span>
          Advanced Java Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TopicCard
            title="Java 8+ Features"
            description="Lambda expressions, Stream API, Optional, and modern Java features."
            link="/java/advanced/java8-features"
            status="available"
            level="advanced"
          />
          <TopicCard
            title="Memory Management"
            description="JVM memory model, garbage collection, and memory optimization."
            link="/java/advanced/memory-management"
            status="available"
            level="advanced"
          />
          <TopicCard
            title="Advanced Core Concepts"
            description="Reflection, annotations, generics, and advanced Java programming."
            link="/java/advanced/advanced-core"
            status="available"
            level="advanced"
          />
          <TopicCard
            title="Design Patterns"
            description="Creational, structural, and behavioral design patterns in Java."
            link="/java/advanced/design-patterns"
            status="available"
            level="advanced"
          />
          <TopicCard
            title="JVM Internals"
            description="JVM architecture, bytecode, and virtual machine internals."
            link="/java/advanced/jvm-internals"
            status="available"
            level="advanced"
          />
          <TopicCard
            title="Performance Optimization"
            description="Profiling, benchmarking, and Java application optimization."
            link="/java/advanced/performance"
            status="available"
            level="advanced"
          />
        </div>
      </section>

      {/* Framework & Enterprise */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <span className="bg-gradient-to-r from-purple-500 to-indigo-500 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">4</span>
          Frameworks & Enterprise Development
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TopicCard
            title="Spring Framework"
            description="Dependency injection, Spring MVC, and Spring Boot fundamentals."
            link="/java/frameworks/spring"
            status="available"
            level="intermediate"
          />
          <TopicCard
            title="Spring Boot Applications"
            description="Building REST APIs, web applications, and microservices."
            link="/java/frameworks/spring-boot"
            status="available"
            level="intermediate"
          />
          <TopicCard
            title="Database Integration"
            description="JPA, Hibernate, Spring Data, and database connectivity."
            link="/java/frameworks/database"
            status="available"
            level="intermediate"
          />
          <TopicCard
            title="Testing in Java"
            description="JUnit, Mockito, TestNG, and testing strategies."
            link="/java/frameworks/testing"
            status="available"
            level="intermediate"
          />
          <TopicCard
            title="Build Tools & Maven"
            description="Maven, Gradle, dependency management, and project structure."
            link="/java/frameworks/build-tools"
            status="available"
            level="intermediate"
          />
          <TopicCard
            title="Enterprise Patterns"
            description="Microservices, REST APIs, and enterprise architecture patterns."
            link="/java/frameworks/enterprise"
            status="coming-soon"
            level="advanced"
          />
        </div>
      </section>

      {/* Projects & Practice */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <span className="bg-gradient-to-r from-blue-500 to-cyan-500 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">5</span>
          Projects & Practice
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TopicCard
            title="Java Projects"
            description="Hands-on projects to apply your Java knowledge and build real applications."
            link="/java/projects/java-projects"
            status="available"
            level="intermediate"
          />
          <TopicCard
            title="Spring Boot Projects"
            description="Build complete web applications and APIs using Spring Boot."
            link="/java/projects/spring-projects"
            status="available"
            level="intermediate"
          />
          <TopicCard
            title="Code Challenges"
            description="Practice coding problems and algorithmic challenges in Java."
            link="/java/projects/challenges"
            status="available"
            level="beginner"
          />
          <TopicCard
            title="Interview Preparation"
            description="Common Java interview questions and coding interview practice."
            link="/java/projects/interviews"
            status="available"
            level="intermediate"
          />
          <TopicCard
            title="Best Practices"
            description="Java coding standards, clean code principles, and best practices."
            link="/java/projects/best-practices"
            status="available"
            level="advanced"
          />
          <TopicCard
            title="Career Path"
            description="Java developer career roadmap and industry insights."
            link="/java/projects/career"
            status="coming-soon"
            level="beginner"
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Master Java?</h2>
          <p className="text-gray-400 mb-6">
            Start your Java journey with our comprehensive learning path. From basic syntax to advanced enterprise development,
            become proficient in one of the most powerful programming languages.
          </p>
          <Link href="/java/basics/introduction" className="bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold py-4 px-8 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all transform hover:scale-105">
            Start with Java Basics →
          </Link>
        </div>
      </section>
    </main>
  );
}
