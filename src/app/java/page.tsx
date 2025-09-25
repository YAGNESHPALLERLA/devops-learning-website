// src/app/java/page.tsx
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
        <h2 className="text-3xl font-bold text-center text-white mb-10">Java Learning Path</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TopicCard
            title="Java Fundamentals"
            description="Learn basic Java syntax, variables, data types, and control structures."
            status="coming-soon"
          />
          <TopicCard
            title="Object-Oriented Programming"
            description="Master classes, objects, inheritance, polymorphism, and encapsulation."
            status="coming-soon"
          />
          <TopicCard
            title="Java Collections Framework"
            description="Understand ArrayList, HashMap, Set, and other collection classes."
            status="coming-soon"
          />
          <TopicCard
            title="Exception Handling"
            description="Learn try-catch blocks, custom exceptions, and error management."
            status="coming-soon"
          />
          <TopicCard
            title="Java 8+ Features"
            description="Lambda expressions, Stream API, Optional, and modern Java features."
            status="coming-soon"
          />
          <TopicCard
            title="Spring Framework"
            description="Master Spring Boot, Spring MVC, and dependency injection."
            status="coming-soon"
          />
          <TopicCard
            title="Spring Boot Applications"
            description="Build REST APIs, web applications, and microservices with Spring Boot."
            status="coming-soon"
          />
          <TopicCard
            title="Database Integration"
            description="JPA, Hibernate, and database connectivity with Spring Data."
            status="coming-soon"
          />
          <TopicCard
            title="Testing in Java"
            description="Unit testing with JUnit, Mockito, and integration testing."
            status="coming-soon"
          />
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-400 text-lg">
            Java content is being prepared. Check back soon for comprehensive tutorials!
          </p>
        </div>
      </section>
    </main>
  );
}
