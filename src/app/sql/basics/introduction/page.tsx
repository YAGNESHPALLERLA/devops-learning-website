// src/app/sql/basics/introduction/page.tsx
import Link from 'next/link';

export default function SQLIntroductionPage() {
  return (
    <main>
      <section className="text-center py-12 px-4">
        <Link href="/sql" className="inline-block mb-8 text-blue-400 hover:text-blue-300 transition-colors">
          ← Back to SQL Learning Hub
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          🗄️ SQL Introduction
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          Learn what SQL is, database concepts, and basic SQL syntax fundamentals
        </p>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">What is SQL?</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Definition</h3>
              <p className="text-gray-300 mb-4">
                SQL (Structured Query Language) is a standardized programming language designed for managing and manipulating relational databases.
                It's used to communicate with databases to perform various operations on data.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Key Concepts</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <ul className="text-gray-300 space-y-2">
                  <li><strong className="text-white">Database:</strong> A collection of organized data</li>
                  <li><strong className="text-white">Table:</strong> A collection of related data organized in rows and columns</li>
                  <li><strong className="text-white">Row (Record):</strong> A single entry in a table</li>
                  <li><strong className="text-white">Column (Field):</strong> A specific attribute of the data</li>
                  <li><strong className="text-white">Primary Key:</strong> A unique identifier for each row</li>
                  <li><strong className="text-white">Foreign Key:</strong> A field that references the primary key of another table</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Types of SQL Commands</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h4 className="text-green-400 font-semibold mb-2">DDL (Data Definition Language)</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>CREATE - Create database objects</li>
                    <li>ALTER - Modify database objects</li>
                    <li>DROP - Delete database objects</li>
                  </ul>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h4 className="text-blue-400 font-semibold mb-2">DML (Data Manipulation Language)</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>SELECT - Retrieve data</li>
                    <li>INSERT - Add new data</li>
                    <li>UPDATE - Modify existing data</li>
                    <li>DELETE - Remove data</li>
                  </ul>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-2">DCL (Data Control Language)</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>GRANT - Give permissions</li>
                    <li>REVOKE - Remove permissions</li>
                  </ul>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h4 className="text-red-400 font-semibold mb-2">TCL (Transaction Control Language)</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>COMMIT - Save changes</li>
                    <li>ROLLBACK - Undo changes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Database Management Systems</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Popular RDBMS</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-900 p-4 rounded-lg text-center">
                  <h4 className="text-orange-400 font-semibold mb-2">MySQL</h4>
                  <p className="text-gray-300 text-sm">Open-source, widely used</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg text-center">
                  <h4 className="text-blue-400 font-semibold mb-2">PostgreSQL</h4>
                  <p className="text-gray-300 text-sm">Advanced features, ACID compliant</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg text-center">
                  <h4 className="text-green-400 font-semibold mb-2">SQLite</h4>
                  <p className="text-gray-300 text-sm">Lightweight, embedded</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Basic SQL Syntax</h2>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <pre className="text-green-400 text-sm overflow-x-auto">
{`-- SQL statements end with semicolon (;)
-- Comments start with -- or /* */

-- Basic SELECT statement
SELECT column1, column2 
FROM table_name 
WHERE condition;

-- Example: Get all users
SELECT * FROM users;

-- Example: Get specific columns
SELECT name, email FROM users;

-- Example: Get users with condition
SELECT * FROM users WHERE age > 18;`}
            </pre>
          </div>
        </div>

        <div className="flex justify-between">
          <Link href="/sql" className="bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 transition">
            ← Back to SQL Hub
          </Link>
          <Link href="/sql/basics/commands" className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition">
            Next: Basic SQL Commands →
          </Link>
        </div>
      </section>
    </main>
  );
}
