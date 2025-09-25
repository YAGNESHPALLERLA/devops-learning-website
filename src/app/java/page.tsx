// src/app/java/page.tsx
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

      {/* Topics Grid */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-white mb-10">Complete Java Learning Path</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TopicCard
            title="Java Introduction"
            description="Learn what Java is, JVM, JDK, and setting up your Java development environment."
            link="/java/basics/introduction"
          />
          <TopicCard
            title="Control Statements"
            description="Master if-else, switch statements, loops, and program flow control."
            link="/java/basics/control-statements"
          />
          <TopicCard
            title="Java Keywords"
            description="Understand Java reserved keywords, identifiers, and language fundamentals."
            link="/java/basics/keywords"
          />
          <TopicCard
            title="Variables & Data Types"
            description="Learn primitive types, reference types, and variable declaration in Java."
            link="/java/basics/variables"
          />
          <TopicCard
            title="Operators & Expressions"
            description="Arithmetic, logical, relational, and bitwise operators in Java."
            link="/java/basics/operators"
          />
          <TopicCard
            title="Input/Output Streams"
            description="File handling, input streams, output streams, and I/O operations."
            link="/java/basics/io-streams"
          />
          <TopicCard
            title="Object-Oriented Programming (OOP)"
            description="Classes, objects, inheritance, polymorphism, and encapsulation principles."
            link="/java/intermediate/oop"
          />
          <TopicCard
            title="Strings & String Handling"
            description="String class, StringBuilder, StringBuffer, and string manipulation."
            link="/java/intermediate/strings"
          />
          <TopicCard
            title="Arrays & Collections"
            description="Arrays, ArrayList, HashMap, HashSet, and the Collections Framework."
            link="/java/intermediate/collections"
          />
          <TopicCard
            title="Exception Handling"
            description="Try-catch blocks, custom exceptions, and error management strategies."
            link="/java/intermediate/exceptions"
          />
          <TopicCard
            title="Packages & Modules"
            description="Package creation, import statements, and modular programming."
            link="/java/intermediate/packages"
          />
          <TopicCard
            title="Multi-threading"
            description="Thread creation, synchronization, and concurrent programming in Java."
            link="/java/intermediate/multithreading"
          />
          <TopicCard
            title="Java 8+ Features"
            description="Lambda expressions, Stream API, Optional, and modern Java features."
            link="/java/advanced/java8-features"
          />
          <TopicCard
            title="Memory Management"
            description="JVM memory model, garbage collection, and memory optimization."
            link="/java/advanced/memory-management"
          />
          <TopicCard
            title="Advanced Core Concepts"
            description="Reflection, annotations, generics, and advanced Java programming."
            link="/java/advanced/advanced-core"
          />
          <TopicCard
            title="Design Patterns"
            description="Creational, structural, and behavioral design patterns in Java."
            link="/java/advanced/design-patterns"
          />
          <TopicCard
            title="JVM Internals"
            description="JVM architecture, bytecode, and virtual machine internals."
            link="/java/advanced/jvm-internals"
          />
          <TopicCard
            title="Performance Optimization"
            description="Profiling, benchmarking, and Java application optimization."
            link="/java/advanced/performance"
          />
          <TopicCard
            title="Spring Framework"
            description="Dependency injection, Spring MVC, and Spring Boot fundamentals."
            link="/java/frameworks/spring"
          />
          <TopicCard
            title="Spring Boot Applications"
            description="Building REST APIs, web applications, and microservices."
            link="/java/frameworks/spring-boot"
          />
          <TopicCard
            title="Database Integration"
            description="JPA, Hibernate, Spring Data, and database connectivity."
            link="/java/frameworks/database"
          />
          <TopicCard
            title="Testing in Java"
            description="JUnit, Mockito, TestNG, and testing strategies."
            link="/java/frameworks/testing"
          />
          <TopicCard
            title="Build Tools & Maven"
            description="Maven, Gradle, dependency management, and project structure."
            link="/java/frameworks/build-tools"
          />
          <TopicCard
            title="Java Projects"
            description="Hands-on projects to apply your Java knowledge and build real applications."
            link="/java/projects/java-projects"
          />
          <TopicCard
            title="Spring Boot Projects"
            description="Build complete web applications and APIs using Spring Boot."
            link="/java/projects/spring-projects"
          />
          <TopicCard
            title="Code Challenges"
            description="Practice coding problems and algorithmic challenges in Java."
            link="/java/projects/challenges"
          />
          <TopicCard
            title="Interview Preparation"
            description="Common Java interview questions and coding interview practice."
            link="/java/projects/interviews"
          />
          <TopicCard
            title="Best Practices"
            description="Java coding standards, clean code principles, and best practices."
            link="/java/projects/best-practices"
          />
        </div>
      </section>
    </main>
  );
}
