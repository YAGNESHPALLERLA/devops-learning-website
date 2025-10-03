'use client';

import { useState } from 'react';
import TechLayout from '@/components/tech-layout';
import VideoSection from '@/components/VideoSection';
import { getVideosForTopic } from '@/data/videoTutorials';

export default function SQLPage() {
  const [activeSection, setActiveSection] = useState('introduction');

  const pageHeadings = [
    { id: 'introduction', title: 'SQL Introduction' },
    { id: 'basic-commands', title: 'Basic SQL Commands' },
    { id: 'data-types', title: 'Data Types & Constraints' },
    { id: 'creating-tables', title: 'Creating Tables' },
    { id: 'data-manipulation', title: 'Data Manipulation' },
    { id: 'filtering-sorting', title: 'Filtering & Sorting' },
    { id: 'joins', title: 'Joins and Relationships' },
    { id: 'aggregate-functions', title: 'Aggregate Functions' },
    { id: 'subqueries', title: 'Subqueries' },
    { id: 'window-functions', title: 'Window Functions' },
    { id: 'database-design', title: 'Database Design' },
    { id: 'indexes-performance', title: 'Indexes & Performance' },
    { id: 'transactions', title: 'Transactions & ACID' },
    { id: 'video-tutorials', title: 'Video Tutorials' },
    { id: 'practice-projects', title: 'Practice Projects' },
    { id: 'summary', title: 'Summary' },
  ];

  const sqlVideos = getVideosForTopic('sql');

  const renderContent = () => {
    switch (activeSection) {
      case 'introduction':
        return (
          <div className="animate-fade-in-up">
            <h1 id="introduction" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🗄️ SQL & Databases
            </h1>
            
            <div className="max-w-6xl mx-auto">
              <div className="gradient-border hover-lift mb-8">
                <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-8 rounded-xl">
                  <h2 className="text-3xl font-bold text-blue-400 mb-4 neon-glow">Goal</h2>
                  <p className="text-white text-xl">Master SQL queries, database design, optimization, and modern database technologies.</p>
                </div>
              </div>

              <h2 id="introduction" className="text-3xl font-bold text-blue-400 mb-6">1. SQL Introduction</h2>
              
              <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift hover:ring-2 hover:ring-blue-500/30 hover:ring-opacity-50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-green-400 mb-6 neon-glow">What is SQL?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-blue-900/50 to-blue-800/50 border border-blue-500/30 p-6 rounded-xl hover-glow-accent">
                    <p className="text-blue-300 font-semibold text-lg">✅ Structured Query Language</p>
                    <p className="text-gray-300 text-sm mt-2">Standard language for database management</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 border border-purple-500/30 p-6 rounded-xl hover-glow-accent">
                    <p className="text-purple-300 font-semibold text-lg">🗄️ Database Operations</p>
                    <p className="text-gray-300 text-sm mt-2">Create, read, update, and delete data</p>
                  </div>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                  <h4 className="text-xl font-bold text-yellow-400 mb-4">Key Concepts</h4>
                  <ul className="text-gray-300 space-y-2">
                    <li>• <strong>Database:</strong> A collection of organized data</li>
                    <li>• <strong>Table:</strong> A collection of related data organized in rows and columns</li>
                    <li>• <strong>Row (Record):</strong> A single entry in a table</li>
                    <li>• <strong>Column (Field):</strong> A specific attribute of the data</li>
                    <li>• <strong>Primary Key:</strong> A unique identifier for each row</li>
                    <li>• <strong>Foreign Key:</strong> A field that references the primary key of another table</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-900 border border-yellow-700 p-4 rounded-lg">
                  <p className="text-yellow-300 font-semibold">📌 SQL is essential for data management, analysis, and business intelligence</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'basic-commands':
        return (
          <div className="animate-fade-in-up">
            <h1 id="basic-commands" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🗄️ Basic SQL Commands
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn essential SQL commands for database operations
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="basic-commands" className="text-3xl font-bold text-blue-400 mb-6">2. Basic SQL Commands</h2>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">SELECT Statement</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-2">Basic SELECT</h4>
                    <pre className="text-green-400 font-mono text-sm">
{`SELECT * FROM employees;
SELECT name, salary FROM employees;`}
                    </pre>
                  </div>
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-2">With Conditions</h4>
                    <pre className="text-green-400 font-mono text-sm">
{`SELECT * FROM employees 
WHERE salary > 50000;
SELECT name FROM employees 
WHERE department = 'IT';`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'data-types':
        return (
          <div className="animate-fade-in-up">
            <h1 id="data-types" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🗄️ Data Types & Constraints
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn about SQL data types and constraints
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="data-types" className="text-3xl font-bold text-blue-400 mb-6">3. Data Types & Constraints</h2>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">Common Data Types</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-2">INTEGER</h4>
                    <p className="text-gray-300 text-sm">Whole numbers: 1, 2, 3, -5</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-2">VARCHAR</h4>
                    <p className="text-gray-300 text-sm">Variable-length strings: 'Hello', 'World'</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-purple-400 mb-2">DECIMAL</h4>
                    <p className="text-gray-300 text-sm">Decimal numbers: 3.14, 99.99</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'creating-tables':
        return (
          <div className="animate-fade-in-up">
            <h1 id="creating-tables" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🗄️ Creating Tables
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn how to create and manage database tables
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="creating-tables" className="text-3xl font-bold text-blue-400 mb-6">4. Creating Tables</h2>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">Table Creation</h3>
                <div className="bg-gray-900 p-4 rounded border border-gray-600 mb-4">
                  <pre className="text-green-400 font-mono text-sm">
{`CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    salary DECIMAL(10,2),
    department_id INT,
    hire_date DATE,
    is_active BOOLEAN DEFAULT TRUE
);`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'data-manipulation':
        return (
          <div className="animate-fade-in-up">
            <h1 id="data-manipulation" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🗄️ Data Manipulation
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn about INSERT, UPDATE, and DELETE operations
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="data-manipulation" className="text-3xl font-bold text-blue-400 mb-6">5. Data Manipulation</h2>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">INSERT, UPDATE, DELETE</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-2">INSERT</h4>
                    <pre className="text-green-400 font-mono text-sm">
{`INSERT INTO employees 
VALUES (1, 'John Doe', 'john@example.com', 50000, 1, '2023-01-15', TRUE);`}
                    </pre>
                  </div>
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-2">UPDATE</h4>
                    <pre className="text-green-400 font-mono text-sm">
{`UPDATE employees 
SET salary = 55000 
WHERE id = 1;`}
                    </pre>
                  </div>
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-red-400 mb-2">DELETE</h4>
                    <pre className="text-green-400 font-mono text-sm">
{`DELETE FROM employees 
WHERE id = 1;`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'filtering-sorting':
        return (
          <div className="animate-fade-in-up">
            <h1 id="filtering-sorting" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🗄️ Filtering & Sorting
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn about WHERE, ORDER BY, and LIMIT clauses
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="filtering-sorting" className="text-3xl font-bold text-blue-400 mb-6">6. Filtering & Sorting</h2>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">WHERE Clause</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-2">Basic Filtering</h4>
                    <pre className="text-green-400 font-mono text-sm">
{`SELECT * FROM employees 
WHERE salary > 50000;

SELECT * FROM employees 
WHERE department = 'IT' 
AND salary > 60000;`}
                    </pre>
                  </div>
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-2">ORDER BY & LIMIT</h4>
                    <pre className="text-green-400 font-mono text-sm">
{`SELECT * FROM employees 
ORDER BY salary DESC 
LIMIT 10;

SELECT * FROM employees 
ORDER BY employee_id 
LIMIT 10 OFFSET 20;`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'joins':
        return (
          <div className="animate-fade-in-up">
            <h1 id="joins" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🗄️ Joins and Relationships
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn about different types of SQL joins
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="joins" className="text-3xl font-bold text-blue-400 mb-6">7. Joins and Relationships</h2>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">Types of Joins</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-2">INNER JOIN</h4>
                    <pre className="text-green-400 font-mono text-sm">
{`SELECT e.name, d.department_name
FROM employees e
INNER JOIN departments d 
ON e.department_id = d.department_id;`}
                    </pre>
                  </div>
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-2">LEFT JOIN</h4>
                    <pre className="text-green-400 font-mono text-sm">
{`SELECT e.name, d.department_name
FROM employees e
LEFT JOIN departments d 
ON e.department_id = d.department_id;`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'aggregate-functions':
        return (
          <div className="animate-fade-in-up">
            <h1 id="aggregate-functions" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🗄️ Aggregate Functions
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn about COUNT, SUM, AVG, MIN, MAX functions
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="aggregate-functions" className="text-3xl font-bold text-blue-400 mb-6">8. Aggregate Functions</h2>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">Common Aggregate Functions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-2">COUNT</h4>
                    <p className="text-gray-300 text-sm">Counts the number of rows</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-2">SUM</h4>
                    <p className="text-gray-300 text-sm">Sums numeric values</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-purple-400 mb-2">AVG</h4>
                    <p className="text-gray-300 text-sm">Calculates average values</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'subqueries':
        return (
          <div className="animate-fade-in-up">
            <h1 id="subqueries" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🗄️ Subqueries
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn about nested queries and subqueries
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="subqueries" className="text-3xl font-bold text-blue-400 mb-6">9. Subqueries</h2>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">Types of Subqueries</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-2">Scalar Subquery</h4>
                    <pre className="text-green-400 font-mono text-sm">
{`SELECT name, salary,
  (SELECT AVG(salary) FROM employees) as avg_salary
FROM employees;`}
                    </pre>
                  </div>
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-2">EXISTS Subquery</h4>
                    <pre className="text-green-400 font-mono text-sm">
{`SELECT * FROM employees e
WHERE EXISTS (
  SELECT 1 FROM departments d 
  WHERE d.department_id = e.department_id 
  AND d.location = 'Remote'
);`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'window-functions':
        return (
          <div className="animate-fade-in-up">
            <h1 id="window-functions" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🗄️ Window Functions
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn about advanced window functions
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="window-functions" className="text-3xl font-bold text-blue-400 mb-6">10. Window Functions</h2>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">Common Window Functions</h3>
                <div className="bg-gray-900 p-4 rounded border border-gray-600">
                  <pre className="text-green-400 font-mono text-sm">
{`SELECT name, salary,
  ROW_NUMBER() OVER (ORDER BY salary DESC) as rank,
  RANK() OVER (ORDER BY salary DESC) as salary_rank,
  LAG(salary, 1) OVER (ORDER BY salary) as prev_salary,
  LEAD(salary, 1) OVER (ORDER BY salary) as next_salary
FROM employees;`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'database-design':
        return (
          <div className="animate-fade-in-up">
            <h1 id="database-design" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🗄️ Database Design
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn about database design principles
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="database-design" className="text-3xl font-bold text-blue-400 mb-6">11. Database Design</h2>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">Normalization</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-2">1NF</h4>
                    <p className="text-gray-300 text-sm">First Normal Form - Atomic values</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-2">2NF</h4>
                    <p className="text-gray-300 text-sm">Second Normal Form - No partial dependencies</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-purple-400 mb-2">3NF</h4>
                    <p className="text-gray-300 text-sm">Third Normal Form - No transitive dependencies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'indexes-performance':
        return (
          <div className="animate-fade-in-up">
            <h1 id="indexes-performance" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🗄️ Indexes & Performance
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn about database optimization and performance tuning
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="indexes-performance" className="text-3xl font-bold text-blue-400 mb-6">12. Indexes & Performance</h2>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">Creating Indexes</h3>
                <div className="bg-gray-900 p-4 rounded border border-gray-600">
                  <pre className="text-green-400 font-mono text-sm">
{`CREATE INDEX idx_employee_name ON employees(name);
CREATE INDEX idx_employee_salary ON employees(salary);
CREATE INDEX idx_employee_dept ON employees(department_id);`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'transactions':
        return (
          <div className="animate-fade-in-up">
            <h1 id="transactions" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🗄️ Transactions & ACID
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn about database transactions and ACID properties
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="transactions" className="text-3xl font-bold text-blue-400 mb-6">13. Transactions & ACID</h2>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">ACID Properties</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-2">Atomicity</h4>
                    <p className="text-gray-300 text-sm">All or nothing</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-2">Consistency</h4>
                    <p className="text-gray-300 text-sm">Valid state transitions</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-purple-400 mb-2">Isolation</h4>
                    <p className="text-gray-300 text-sm">Concurrent execution</p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded border border-gray-600">
                    <h4 className="font-bold text-yellow-400 mb-2">Durability</h4>
                    <p className="text-gray-300 text-sm">Permanent changes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'video-tutorials':
        return (
          <div className="animate-fade-in-up">
            <h1 id="video-tutorials" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🗄️ SQL Video Tutorials
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn SQL through comprehensive video tutorials
            </p>
            
            <div className="max-w-6xl mx-auto">
              <VideoSection videos={sqlVideos} title="SQL Video Tutorials" />
            </div>
          </div>
        );
      
      case 'practice-projects':
        return (
          <div className="animate-fade-in-up">
            <h1 id="practice-projects" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🗄️ Practice Projects
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Build real-world projects to master SQL
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="practice-projects" className="text-3xl font-bold text-blue-400 mb-6">14. Practice Projects</h2>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <ul className="text-gray-300 space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">•</span>
                    <strong>Employee Management System:</strong> Create tables for employees, departments, and projects
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">•</span>
                    <strong>E-commerce Database:</strong> Design a complete online store database
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">•</span>
                    <strong>Data Analysis:</strong> Analyze sales data with complex queries and reporting
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      
      case 'summary':
        return (
          <div className="animate-fade-in-up">
            <h1 id="summary" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🗄️ Summary
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Key takeaways from SQL and database management
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="summary" className="text-3xl font-bold text-blue-400 mb-6">✅ Summary</h2>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <ul className="text-gray-300 space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">•</span>
                    SQL is the standard language for database management and data manipulation
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">•</span>
                    Master basic commands: SELECT, INSERT, UPDATE, DELETE
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">•</span>
                    Understand joins, subqueries, and window functions for complex queries
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">•</span>
                    Learn database design principles and optimization techniques
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">•</span>
                    Practice with real database projects to master SQL skills
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="animate-fade-in-up">
            <h1 id="introduction" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🗄️ SQL & Databases
            </h1>
            
            <div className="max-w-6xl mx-auto">
              <div className="gradient-border hover-lift mb-8">
                <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-8 rounded-xl">
                  <h2 className="text-3xl font-bold text-blue-400 mb-4 neon-glow">Goal</h2>
                  <p className="text-white text-xl">Master SQL queries, database design, optimization, and modern database technologies.</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <TechLayout onThisPage={pageHeadings} technology="sql" activeSection={activeSection} setActiveSection={setActiveSection}>
      {renderContent()}
    </TechLayout>
  );
}