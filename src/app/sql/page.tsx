// src/app/sql/page.tsx
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
          Master SQL queries, database design, optimization, and modern database technologies
        </p>
      </section>

      {/* Learning Path Overview */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Complete SQL Learning Path</h2>
          <p className="text-purple-100 text-lg">
            Follow this structured path to master SQL and database management. From basic queries to advanced optimization,
            become proficient in one of the most essential skills in tech.
          </p>
        </div>
      </section>

      {/* Beginner Topics */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <span className="bg-gradient-to-r from-green-500 to-green-600 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">1</span>
          SQL Fundamentals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TopicCard
            title="SQL Introduction"
            description="Learn what SQL is, database concepts, and basic SQL syntax fundamentals."
            link="/sql/basics/introduction"
            status="available"
            level="beginner"
          />
          <TopicCard
            title="Basic SQL Commands"
            description="Master SELECT, FROM, WHERE clauses and basic data retrieval operations."
            link="/sql/basics/commands"
            status="available"
            level="beginner"
          />
          <TopicCard
            title="Data Types & Constraints"
            description="Understand SQL data types, primary keys, foreign keys, and constraints."
            link="/sql/basics/data-types"
            status="available"
            level="beginner"
          />
          <TopicCard
            title="Creating Tables"
            description="Learn CREATE TABLE, ALTER TABLE, DROP TABLE, and table management."
            link="/sql/basics/tables"
            status="available"
            level="beginner"
          />
          <TopicCard
            title="Basic Data Manipulation"
            description="INSERT, UPDATE, DELETE operations and basic data modification."
            link="/sql/basics/data-manipulation"
            status="available"
            level="beginner"
          />
          <TopicCard
            title="Filtering & Sorting"
            description="WHERE clauses, ORDER BY, LIMIT, and basic query filtering."
            link="/sql/basics/filtering"
            status="available"
            level="beginner"
          />
        </div>
      </section>

      {/* Intermediate Topics */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <span className="bg-gradient-to-r from-yellow-500 to-orange-500 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">2</span>
          Advanced Querying
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TopicCard
            title="Joins and Relationships"
            description="INNER, LEFT, RIGHT, FULL OUTER joins and table relationship management."
            link="/sql/intermediate/joins"
            status="available"
            level="intermediate"
          />
          <TopicCard
            title="Aggregate Functions"
            description="COUNT, SUM, AVG, MIN, MAX, GROUP BY, and HAVING clauses."
            link="/sql/intermediate/aggregates"
            status="available"
            level="intermediate"
          />
          <TopicCard
            title="Subqueries"
            description="Nested queries, correlated subqueries, and complex query structures."
            link="/sql/intermediate/subqueries"
            status="available"
            level="intermediate"
          />
          <TopicCard
            title="Common Table Expressions"
            description="CTEs, recursive CTEs, and advanced query organization."
            link="/sql/intermediate/ctes"
            status="available"
            level="intermediate"
          />
          <TopicCard
            title="Window Functions"
            description="ROW_NUMBER, RANK, DENSE_RANK, and analytical functions."
            link="/sql/intermediate/window-functions"
            status="available"
            level="intermediate"
          />
          <TopicCard
            title="Set Operations"
            description="UNION, INTERSECT, EXCEPT operations and combining result sets."
            link="/sql/intermediate/set-operations"
            status="available"
            level="intermediate"
          />
        </div>
      </section>

      {/* Advanced Topics */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <span className="bg-gradient-to-r from-red-500 to-pink-500 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">3</span>
          Database Management
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TopicCard
            title="Database Design & Normalization"
            description="ER diagrams, normalization forms, and database schema design."
            link="/sql/advanced/design"
            status="available"
            level="advanced"
          />
          <TopicCard
            title="Indexes & Performance"
            description="Creating indexes, query optimization, and performance tuning."
            link="/sql/advanced/indexes"
            status="available"
            level="advanced"
          />
          <TopicCard
            title="Stored Procedures & Functions"
            description="Creating and managing stored procedures, functions, and triggers."
            link="/sql/advanced/procedures"
            status="available"
            level="advanced"
          />
          <TopicCard
            title="Transactions & ACID"
            description="Transaction management, ACID properties, and concurrency control."
            link="/sql/advanced/transactions"
            status="available"
            level="advanced"
          />
          <TopicCard
            title="Database Security"
            description="User management, permissions, roles, and security best practices."
            link="/sql/advanced/security"
            status="available"
            level="advanced"
          />
          <TopicCard
            title="Backup & Recovery"
            description="Database backup strategies, point-in-time recovery, and disaster planning."
            link="/sql/advanced/backup"
            status="available"
            level="advanced"
          />
        </div>
      </section>

      {/* Database Systems */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <span className="bg-gradient-to-r from-purple-500 to-indigo-500 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">4</span>
          Database Systems
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TopicCard
            title="MySQL"
            description="MySQL installation, configuration, administration, and MySQL-specific features."
            link="/sql/systems/mysql"
            status="available"
            level="intermediate"
          />
          <TopicCard
            title="PostgreSQL"
            description="PostgreSQL features, advanced data types, and PostgreSQL-specific SQL."
            link="/sql/systems/postgresql"
            status="available"
            level="intermediate"
          />
          <TopicCard
            title="SQL Server"
            description="Microsoft SQL Server, T-SQL, and SQL Server management tools."
            link="/sql/systems/sqlserver"
            status="available"
            level="intermediate"
          />
          <TopicCard
            title="Oracle Database"
            description="Oracle SQL, PL/SQL, and Oracle database administration."
            link="/sql/systems/oracle"
            status="available"
            level="advanced"
          />
          <TopicCard
            title="SQLite"
            description="Lightweight database, embedded applications, and mobile development."
            link="/sql/systems/sqlite"
            status="available"
            level="beginner"
          />
          <TopicCard
            title="NoSQL Databases"
            description="Introduction to MongoDB, Redis, Cassandra, and NoSQL concepts."
            link="/sql/systems/nosql"
            status="coming-soon"
            level="advanced"
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="bg-gray-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Master SQL?</h2>
          <p className="text-gray-400 mb-6">
            Start your SQL journey with our comprehensive learning path. From basic queries to advanced optimization,
            become proficient in database management and SQL programming.
          </p>
          <Link href="/sql/basics/introduction" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 px-8 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105">
            Start with SQL Basics →
          </Link>
        </div>
      </section>
    </main>
  );
}
