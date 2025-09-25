// src/app/sql/page.tsx
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

export default function SQLPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <Link href="/" className="inline-block mb-8 text-blue-400 hover:text-blue-300 transition-colors">
          ← Back to Technology Selection
        </Link>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
          🗄️ SQL & Databases Learning Hub
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-8">
          Master database design, SQL queries, optimization, and modern database technologies
        </p>
      </section>

      {/* Topics Grid */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-white mb-10">SQL & Database Learning Path</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TopicCard
            title="SQL Fundamentals"
            description="Learn basic SQL syntax, SELECT statements, and data retrieval."
            status="coming-soon"
          />
          <TopicCard
            title="Database Design"
            description="Understand normalization, relationships, and database schema design."
            status="coming-soon"
          />
          <TopicCard
            title="Data Manipulation"
            description="INSERT, UPDATE, DELETE operations and data modification techniques."
            status="coming-soon"
          />
          <TopicCard
            title="Joins and Relationships"
            description="INNER, LEFT, RIGHT, FULL OUTER joins and table relationships."
            status="coming-soon"
          />
          <TopicCard
            title="Aggregate Functions"
            description="COUNT, SUM, AVG, MIN, MAX, and GROUP BY operations."
            status="coming-soon"
          />
          <TopicCard
            title="Subqueries and CTEs"
            description="Nested queries, Common Table Expressions, and advanced querying."
            status="coming-soon"
          />
          <TopicCard
            title="Indexes and Performance"
            description="Database indexing, query optimization, and performance tuning."
            status="coming-soon"
          />
          <TopicCard
            title="Stored Procedures"
            description="Create and manage stored procedures, functions, and triggers."
            status="coming-soon"
          />
          <TopicCard
            title="MySQL Database"
            description="MySQL installation, configuration, and administration."
            status="coming-soon"
          />
          <TopicCard
            title="PostgreSQL Database"
            description="PostgreSQL features, advanced queries, and administration."
            status="coming-soon"
          />
          <TopicCard
            title="NoSQL Databases"
            description="Introduction to MongoDB, Redis, and other NoSQL databases."
            status="coming-soon"
          />
          <TopicCard
            title="Database Security"
            description="User management, permissions, and database security best practices."
            status="coming-soon"
          />
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-400 text-lg">
            SQL & Database content is being prepared. Check back soon for comprehensive tutorials!
          </p>
        </div>
      </section>
    </main>
  );
}
