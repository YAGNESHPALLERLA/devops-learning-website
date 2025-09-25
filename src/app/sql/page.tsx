// src/app/sql/page.tsx
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

      {/* Topics Grid */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-white mb-10">Complete SQL Learning Path</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TopicCard
            title="SQL Introduction"
            description="Learn what SQL is, database concepts, and basic SQL syntax fundamentals."
            link="/sql/basics/introduction"
          />
          <TopicCard
            title="Basic SQL Commands"
            description="Master SELECT, FROM, WHERE clauses and basic data retrieval operations."
            link="/sql/basics/commands"
          />
          <TopicCard
            title="Data Types & Constraints"
            description="Understand SQL data types, primary keys, foreign keys, and constraints."
            link="/sql/basics/data-types"
          />
          <TopicCard
            title="Creating Tables"
            description="Learn CREATE TABLE, ALTER TABLE, DROP TABLE, and table management."
            link="/sql/basics/tables"
          />
          <TopicCard
            title="Basic Data Manipulation"
            description="INSERT, UPDATE, DELETE operations and basic data modification."
            link="/sql/basics/data-manipulation"
          />
          <TopicCard
            title="Filtering & Sorting"
            description="WHERE clauses, ORDER BY, LIMIT, and basic query filtering."
            link="/sql/basics/filtering"
          />
          <TopicCard
            title="Joins and Relationships"
            description="INNER, LEFT, RIGHT, FULL OUTER joins and table relationship management."
            link="/sql/intermediate/joins"
          />
          <TopicCard
            title="Aggregate Functions"
            description="COUNT, SUM, AVG, MIN, MAX, GROUP BY, and HAVING clauses."
            link="/sql/intermediate/aggregates"
          />
          <TopicCard
            title="Subqueries"
            description="Nested queries, correlated subqueries, and complex query structures."
            link="/sql/intermediate/subqueries"
          />
          <TopicCard
            title="Common Table Expressions"
            description="CTEs, recursive CTEs, and advanced query organization."
            link="/sql/intermediate/ctes"
          />
          <TopicCard
            title="Window Functions"
            description="ROW_NUMBER, RANK, DENSE_RANK, and analytical functions."
            link="/sql/intermediate/window-functions"
          />
          <TopicCard
            title="Set Operations"
            description="UNION, INTERSECT, EXCEPT operations and combining result sets."
            link="/sql/intermediate/set-operations"
          />
          <TopicCard
            title="Database Design & Normalization"
            description="ER diagrams, normalization forms, and database schema design."
            link="/sql/advanced/design"
          />
          <TopicCard
            title="Indexes & Performance"
            description="Creating indexes, query optimization, and performance tuning."
            link="/sql/advanced/indexes"
          />
          <TopicCard
            title="Stored Procedures & Functions"
            description="Creating and managing stored procedures, functions, and triggers."
            link="/sql/advanced/procedures"
          />
          <TopicCard
            title="Transactions & ACID"
            description="Transaction management, ACID properties, and concurrency control."
            link="/sql/advanced/transactions"
          />
          <TopicCard
            title="Database Security"
            description="User management, permissions, roles, and security best practices."
            link="/sql/advanced/security"
          />
          <TopicCard
            title="Backup & Recovery"
            description="Database backup strategies, point-in-time recovery, and disaster planning."
            link="/sql/advanced/backup"
          />
          <TopicCard
            title="MySQL"
            description="MySQL installation, configuration, administration, and MySQL-specific features."
            link="/sql/systems/mysql"
          />
          <TopicCard
            title="PostgreSQL"
            description="PostgreSQL features, advanced data types, and PostgreSQL-specific SQL."
            link="/sql/systems/postgresql"
          />
          <TopicCard
            title="SQL Server"
            description="Microsoft SQL Server, T-SQL, and SQL Server management tools."
            link="/sql/systems/sqlserver"
          />
          <TopicCard
            title="Oracle Database"
            description="Oracle SQL, PL/SQL, and Oracle database administration."
            link="/sql/systems/oracle"
          />
          <TopicCard
            title="SQLite"
            description="Lightweight database, embedded applications, and mobile development."
            link="/sql/systems/sqlite"
          />
        </div>
      </section>
    </main>
  );
}
