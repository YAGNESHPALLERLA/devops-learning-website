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
                <div className="space-y-6 mb-8">
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
              
              <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift hover:ring-2 hover:ring-blue-500/30 hover:ring-opacity-50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-green-400 mb-6 neon-glow">Understanding SQL Commands</h3>
                <p className="text-gray-300 mb-6 text-lg">
                  SQL commands are the building blocks of database interaction. They allow you to create, read, update, and delete data 
                  in databases. SQL commands are categorized into different types based on their functionality: DDL (Data Definition Language), 
                  DML (Data Manipulation Language), DCL (Data Control Language), and TCL (Transaction Control Language).
                </p>
                
                <div className="bg-yellow-900 border border-yellow-700 p-4 rounded-lg mb-6">
                  <p className="text-yellow-300 font-semibold">📌 SQL commands are case-insensitive, but it's a best practice to write keywords in uppercase for better readability.</p>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">1. SELECT Statement - Data Retrieval</h3>
                <p className="text-gray-300 mb-6">The SELECT statement is used to retrieve data from one or more tables.</p>
                
                <div className="space-y-6 mb-8">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">Basic SELECT Operations</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`-- Select all columns from a table
SELECT * FROM employees;

-- Select specific columns
SELECT first_name, last_name, salary FROM employees;

-- Select with column aliases
SELECT 
    first_name AS "First Name",
    last_name AS "Last Name",
    salary AS "Annual Salary"
FROM employees;

-- Select with calculated columns
SELECT 
    first_name,
    last_name,
    salary,
    salary * 1.1 AS "10% Raise",
    salary / 12 AS "Monthly Salary"
FROM employees;

-- Select distinct values
SELECT DISTINCT department FROM employees;

-- Select with LIMIT (top N records)
SELECT * FROM employees LIMIT 10;

-- Select with OFFSET (skip records)
SELECT * FROM employees LIMIT 10 OFFSET 20;`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">SELECT with WHERE Clause</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`-- Basic WHERE conditions
SELECT * FROM employees WHERE salary > 50000;
SELECT * FROM employees WHERE department = 'IT';
SELECT * FROM employees WHERE hire_date >= '2020-01-01';

-- Multiple conditions with AND/OR
SELECT * FROM employees 
WHERE department = 'IT' AND salary > 60000;

SELECT * FROM employees 
WHERE department = 'IT' OR department = 'HR';

-- IN operator
SELECT * FROM employees 
WHERE department IN ('IT', 'HR', 'Finance');

-- BETWEEN operator
SELECT * FROM employees 
WHERE salary BETWEEN 40000 AND 80000;

-- LIKE operator for pattern matching
SELECT * FROM employees 
WHERE first_name LIKE 'J%';  -- Names starting with 'J'

SELECT * FROM employees 
WHERE email LIKE '%@company.com';

-- IS NULL / IS NOT NULL
SELECT * FROM employees 
WHERE phone_number IS NULL;

SELECT * FROM employees 
WHERE phone_number IS NOT NULL;`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">2. INSERT Statement - Adding Data</h3>
                <p className="text-gray-300 mb-6">The INSERT statement is used to add new records to a table.</p>
                
                <div className="space-y-6">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">Basic INSERT Operations</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`-- Insert single record
INSERT INTO employees (first_name, last_name, email, department, salary)
VALUES ('John', 'Doe', 'john.doe@company.com', 'IT', 65000);

-- Insert with all columns (in order)
INSERT INTO employees 
VALUES (1, 'Jane', 'Smith', 'jane.smith@company.com', 'HR', 55000, '2023-01-15');

-- Insert multiple records
INSERT INTO employees (first_name, last_name, email, department, salary)
VALUES 
    ('Alice', 'Johnson', 'alice.j@company.com', 'Finance', 70000),
    ('Bob', 'Wilson', 'bob.w@company.com', 'IT', 60000),
    ('Carol', 'Brown', 'carol.b@company.com', 'Marketing', 58000);

-- Insert from another table
INSERT INTO employees_backup (first_name, last_name, salary)
SELECT first_name, last_name, salary 
FROM employees 
WHERE department = 'IT';

-- Insert with subquery
INSERT INTO high_earners (employee_id, name, salary)
SELECT id, CONCAT(first_name, ' ', last_name), salary
FROM employees 
WHERE salary > 80000;`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">Advanced INSERT Operations</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`-- Insert with default values
INSERT INTO employees (first_name, last_name, email)
VALUES ('Mike', 'Davis', 'mike.d@company.com');
-- Other columns will use default values or NULL

-- Insert with NULL values
INSERT INTO employees (first_name, last_name, email, phone_number)
VALUES ('Sarah', 'Lee', 'sarah.l@company.com', NULL);

-- Insert with current timestamp
INSERT INTO employees (first_name, last_name, email, hire_date)
VALUES ('Tom', 'Garcia', 'tom.g@company.com', CURRENT_TIMESTAMP);

-- Insert with calculated values
INSERT INTO employees (first_name, last_name, salary, bonus)
VALUES ('Lisa', 'Martinez', 50000, 50000 * 0.1);

-- Insert with conditional logic
INSERT INTO employees (first_name, last_name, department, salary)
SELECT 
    first_name,
    last_name,
    CASE 
        WHEN salary > 70000 THEN 'Senior'
        WHEN salary > 50000 THEN 'Mid'
        ELSE 'Junior'
    END,
    salary
FROM temp_employees;`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">3. UPDATE Statement - Modifying Data</h3>
                <p className="text-gray-300 mb-6">The UPDATE statement is used to modify existing records in a table.</p>
                
                <div className="space-y-6">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">Basic UPDATE Operations</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`-- Update single column
UPDATE employees 
SET salary = 70000 
WHERE id = 1;

-- Update multiple columns
UPDATE employees 
SET salary = 75000, department = 'Senior IT'
WHERE id = 1;

-- Update with calculation
UPDATE employees 
SET salary = salary * 1.05  -- 5% raise
WHERE department = 'IT';

-- Update with subquery
UPDATE employees 
SET salary = (
    SELECT AVG(salary) 
    FROM employees 
    WHERE department = 'IT'
)
WHERE department = 'IT' AND salary < (
    SELECT AVG(salary) 
    FROM employees 
    WHERE department = 'IT'
);

-- Update with CASE statement
UPDATE employees 
SET salary = CASE 
    WHEN department = 'IT' THEN salary * 1.1
    WHEN department = 'HR' THEN salary * 1.05
    ELSE salary * 1.03
END;`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">Advanced UPDATE Operations</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`-- Update with JOIN
UPDATE employees e
JOIN departments d ON e.department_id = d.id
SET e.salary = e.salary * 1.1
WHERE d.name = 'IT';

-- Update with EXISTS
UPDATE employees 
SET status = 'Active'
WHERE EXISTS (
    SELECT 1 FROM projects 
    WHERE projects.manager_id = employees.id
);

-- Update with LIMIT (MySQL)
UPDATE employees 
SET last_login = CURRENT_TIMESTAMP
WHERE status = 'Active'
LIMIT 10;

-- Update with ORDER BY (MySQL)
UPDATE employees 
SET salary = salary + 1000
WHERE department = 'IT'
ORDER BY salary ASC
LIMIT 5;

-- Update with NULL values
UPDATE employees 
SET phone_number = NULL
WHERE phone_number = '';

-- Update with current date/time
UPDATE employees 
SET last_updated = CURRENT_TIMESTAMP
WHERE id = 1;`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">4. DELETE Statement - Removing Data</h3>
                <p className="text-gray-300 mb-6">The DELETE statement is used to remove records from a table.</p>
                
                <div className="space-y-6">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">Basic DELETE Operations</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`-- Delete specific record
DELETE FROM employees WHERE id = 1;

-- Delete with multiple conditions
DELETE FROM employees 
WHERE department = 'IT' AND salary < 50000;

-- Delete with IN operator
DELETE FROM employees 
WHERE id IN (1, 2, 3, 4, 5);

-- Delete with subquery
DELETE FROM employees 
WHERE id IN (
    SELECT employee_id 
    FROM terminated_employees
);

-- Delete with EXISTS
DELETE FROM employees 
WHERE EXISTS (
    SELECT 1 FROM performance_reviews 
    WHERE performance_reviews.employee_id = employees.id 
    AND performance_reviews.rating = 'Poor'
);

-- Delete with date conditions
DELETE FROM employees 
WHERE hire_date < '2020-01-01' AND status = 'Inactive';`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">Advanced DELETE Operations</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`-- Delete with JOIN
DELETE e FROM employees e
JOIN departments d ON e.department_id = d.id
WHERE d.name = 'Discontinued';

-- Delete with LIMIT (MySQL)
DELETE FROM employees 
WHERE status = 'Inactive'
LIMIT 100;

-- Delete with ORDER BY (MySQL)
DELETE FROM employees 
WHERE department = 'Temp'
ORDER BY hire_date ASC
LIMIT 50;

-- Delete all records (be careful!)
DELETE FROM employees;  -- This deletes ALL records!

-- Delete with CASCADE (if foreign key constraints allow)
DELETE FROM departments 
WHERE id = 5;  -- May delete related employees if CASCADE is set

-- Soft delete (update instead of delete)
UPDATE employees 
SET status = 'Deleted', deleted_at = CURRENT_TIMESTAMP
WHERE id = 1;

-- Delete with transaction
BEGIN;
DELETE FROM employees WHERE id = 1;
DELETE FROM employee_benefits WHERE employee_id = 1;
COMMIT;`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">5. ORDER BY and GROUP BY</h3>
                <p className="text-gray-300 mb-6">These clauses help organize and summarize data in your queries.</p>
                
                <div className="space-y-6">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">ORDER BY - Sorting Results</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`-- Sort by single column
SELECT * FROM employees ORDER BY last_name;

-- Sort by multiple columns
SELECT * FROM employees 
ORDER BY department, salary DESC;

-- Sort with NULL handling
SELECT * FROM employees 
ORDER BY phone_number NULLS LAST;

-- Sort by column position
SELECT first_name, last_name, salary 
FROM employees 
ORDER BY 3 DESC;  -- Sort by 3rd column (salary)

-- Sort by expression
SELECT first_name, last_name, salary 
FROM employees 
ORDER BY salary * 12 DESC;  -- Annual salary

-- Sort with CASE statement
SELECT * FROM employees 
ORDER BY 
    CASE department
        WHEN 'IT' THEN 1
        WHEN 'HR' THEN 2
        WHEN 'Finance' THEN 3
        ELSE 4
    END;`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">GROUP BY - Aggregating Data</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`-- Group by single column
SELECT department, COUNT(*) as employee_count
FROM employees 
GROUP BY department;

-- Group by multiple columns
SELECT department, status, COUNT(*) as count
FROM employees 
GROUP BY department, status;

-- Group with aggregate functions
SELECT 
    department,
    COUNT(*) as total_employees,
    AVG(salary) as avg_salary,
    MAX(salary) as max_salary,
    MIN(salary) as min_salary,
    SUM(salary) as total_salary
FROM employees 
GROUP BY department;

-- Group with HAVING clause
SELECT department, AVG(salary) as avg_salary
FROM employees 
GROUP BY department
HAVING AVG(salary) > 60000;

-- Group with WHERE and HAVING
SELECT department, COUNT(*) as employee_count
FROM employees 
WHERE hire_date >= '2020-01-01'
GROUP BY department
HAVING COUNT(*) > 5;`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-6 rounded-lg border border-blue-500/30 mb-8">
                <h3 className="text-xl font-bold text-blue-400 mb-4">SQL Command Categories</h3>
                <div className="space-y-4">
                  <div className="bg-gray-800 p-4 rounded">
                    <h4 className="text-green-400 font-bold mb-2">DDL (Data Definition)</h4>
                    <p className="text-gray-300 text-sm">CREATE, ALTER, DROP, TRUNCATE</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded">
                    <h4 className="text-blue-400 font-bold mb-2">DML (Data Manipulation)</h4>
                    <p className="text-gray-300 text-sm">SELECT, INSERT, UPDATE, DELETE</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded">
                    <h4 className="text-purple-400 font-bold mb-2">DCL (Data Control)</h4>
                    <p className="text-gray-300 text-sm">GRANT, REVOKE, DENY</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded">
                    <h4 className="text-yellow-400 font-bold mb-2">TCL (Transaction Control)</h4>
                    <p className="text-gray-300 text-sm">COMMIT, ROLLBACK, SAVEPOINT</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift hover:ring-2 hover:ring-blue-500/30 hover:ring-opacity-50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-green-400 mb-6 neon-glow">Practical Example: Employee Management System</h3>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 mb-6">
                  <h4 className="text-lg font-bold text-blue-400 mb-4">employee_management.sql</h4>
                  <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`-- Employee Management System SQL Examples
-- This demonstrates comprehensive SQL operations

-- 1. Create the employees table
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    department VARCHAR(50),
    position VARCHAR(50),
    salary DECIMAL(10,2),
    hire_date DATE,
    manager_id INT,
    status ENUM('Active', 'Inactive', 'Terminated') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Insert sample data
INSERT INTO employees (first_name, last_name, email, phone, department, position, salary, hire_date, manager_id) VALUES
('John', 'Doe', 'john.doe@company.com', '555-0101', 'IT', 'Software Engineer', 75000.00, '2022-01-15', NULL),
('Jane', 'Smith', 'jane.smith@company.com', '555-0102', 'HR', 'HR Manager', 65000.00, '2021-03-20', NULL),
('Mike', 'Johnson', 'mike.johnson@company.com', '555-0103', 'IT', 'Senior Developer', 85000.00, '2020-06-10', 1),
('Sarah', 'Williams', 'sarah.williams@company.com', '555-0104', 'Finance', 'Accountant', 55000.00, '2022-02-28', NULL),
('David', 'Brown', 'david.brown@company.com', '555-0105', 'IT', 'DevOps Engineer', 80000.00, '2021-11-05', 1),
('Lisa', 'Davis', 'lisa.davis@company.com', '555-0106', 'Marketing', 'Marketing Specialist', 60000.00, '2022-04-12', NULL),
('Tom', 'Wilson', 'tom.wilson@company.com', '555-0107', 'IT', 'Junior Developer', 50000.00, '2023-01-20', 3),
('Amy', 'Garcia', 'amy.garcia@company.com', '555-0108', 'HR', 'Recruiter', 45000.00, '2022-08-15', 2);

-- 3. Basic SELECT queries
-- Get all employees
SELECT * FROM employees;

-- Get employees by department
SELECT first_name, last_name, department, salary
FROM employees 
WHERE department = 'IT'
ORDER BY salary DESC;

-- Get employees with high salary
SELECT CONCAT(first_name, ' ', last_name) AS full_name, 
       department, 
       salary,
       salary * 12 AS annual_salary
FROM employees 
WHERE salary > 70000
ORDER BY salary DESC;

-- 4. Advanced SELECT queries
-- Get department statistics
SELECT 
    department,
    COUNT(*) AS employee_count,
    AVG(salary) AS avg_salary,
    MAX(salary) AS max_salary,
    MIN(salary) AS min_salary,
    SUM(salary) AS total_salary
FROM employees 
WHERE status = 'Active'
GROUP BY department
ORDER BY avg_salary DESC;

-- Get employees with their managers
SELECT 
    e.first_name,
    e.last_name,
    e.position,
    m.first_name AS manager_first_name,
    m.last_name AS manager_last_name
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id
ORDER BY e.department, e.last_name;

-- Get recent hires
SELECT 
    first_name,
    last_name,
    department,
    hire_date,
    DATEDIFF(CURRENT_DATE, hire_date) AS days_employed
FROM employees 
WHERE hire_date >= DATE_SUB(CURRENT_DATE, INTERVAL 1 YEAR)
ORDER BY hire_date DESC;

-- 5. UPDATE operations
-- Give raise to IT department
UPDATE employees 
SET salary = salary * 1.1
WHERE department = 'IT' AND status = 'Active';

-- Update employee status
UPDATE employees 
SET status = 'Inactive', updated_at = CURRENT_TIMESTAMP
WHERE id = 8;

-- Update manager for new employee
UPDATE employees 
SET manager_id = 1
WHERE first_name = 'Tom' AND last_name = 'Wilson';

-- 6. DELETE operations
-- Delete terminated employees (soft delete)
UPDATE employees 
SET status = 'Terminated', updated_at = CURRENT_TIMESTAMP
WHERE id = 8;

-- Delete old inactive employees (hard delete)
DELETE FROM employees 
WHERE status = 'Inactive' 
AND updated_at < DATE_SUB(CURRENT_DATE, INTERVAL 6 MONTH);

-- 7. Complex queries
-- Find employees earning more than their department average
SELECT 
    e.first_name,
    e.last_name,
    e.department,
    e.salary,
    dept_avg.avg_salary
FROM employees e
JOIN (
    SELECT department, AVG(salary) AS avg_salary
    FROM employees 
    WHERE status = 'Active'
    GROUP BY department
) dept_avg ON e.department = dept_avg.department
WHERE e.salary > dept_avg.avg_salary
ORDER BY e.department, e.salary DESC;

-- Find employees without managers
SELECT 
    first_name,
    last_name,
    department,
    position
FROM employees 
WHERE manager_id IS NULL AND status = 'Active'
ORDER BY department, last_name;

-- Get department headcount by month
SELECT 
    department,
    YEAR(hire_date) AS year,
    MONTH(hire_date) AS month,
    COUNT(*) AS new_hires
FROM employees 
WHERE hire_date >= '2022-01-01'
GROUP BY department, YEAR(hire_date), MONTH(hire_date)
ORDER BY department, year, month;

-- 8. Data validation queries
-- Find duplicate emails
SELECT email, COUNT(*) AS count
FROM employees 
GROUP BY email
HAVING COUNT(*) > 1;

-- Find employees with missing required data
SELECT 
    id,
    first_name,
    last_name,
    CASE 
        WHEN phone IS NULL THEN 'Missing Phone'
        WHEN department IS NULL THEN 'Missing Department'
        WHEN salary IS NULL THEN 'Missing Salary'
        ELSE 'Complete'
    END AS data_status
FROM employees 
WHERE phone IS NULL OR department IS NULL OR salary IS NULL;

-- 9. Performance and maintenance queries
-- Create index for better performance
CREATE INDEX idx_employees_department ON employees(department);
CREATE INDEX idx_employees_salary ON employees(salary);
CREATE INDEX idx_employees_status ON employees(status);

-- Analyze table statistics
ANALYZE TABLE employees;

-- Show table structure
DESCRIBE employees;

-- Show table size and row count
SELECT 
    TABLE_NAME,
    TABLE_ROWS,
    ROUND(((DATA_LENGTH + INDEX_LENGTH) / 1024 / 1024), 2) AS 'Size (MB)'
FROM information_schema.TABLES 
WHERE TABLE_SCHEMA = DATABASE() 
AND TABLE_NAME = 'employees';`}
                  </pre>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-green-900/30 border border-green-500/30 p-4 rounded-lg">
                    <h4 className="text-green-300 font-bold mb-2">🎯 Features Demonstrated</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Complete CRUD operations (Create, Read, Update, Delete)</li>
                      <li>• Table creation with constraints and indexes</li>
                      <li>• Complex queries with JOINs and subqueries</li>
                      <li>• Data aggregation and grouping</li>
                      <li>• Data validation and quality checks</li>
                      <li>• Performance optimization techniques</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-900/30 border border-blue-500/30 p-4 rounded-lg">
                    <h4 className="text-blue-300 font-bold mb-2">📊 Sample Results</h4>
                    <div className="bg-gray-900 p-3 rounded text-sm">
                      <pre className="text-green-400 font-mono">
{`Department Statistics:
+------------+----------------+-------------+------------+------------+-------------+
| department | employee_count | avg_salary  | max_salary | min_salary | total_salary|
+------------+----------------+-------------+------------+------------+-------------+
| IT         | 4              | 72500.00    | 85000.00   | 50000.00   | 290000.00   |
| HR         | 2              | 55000.00    | 65000.00   | 45000.00   | 110000.00   |
| Finance    | 1              | 55000.00    | 55000.00   | 55000.00   | 55000.00    |
| Marketing  | 1              | 60000.00    | 60000.00   | 60000.00   | 60000.00    |
+------------+----------------+-------------+------------+------------+-------------+`}
                      </pre>
                    </div>
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
              
              <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift hover:ring-2 hover:ring-blue-500/30 hover:ring-opacity-50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-green-400 mb-6 neon-glow">Understanding SQL Data Types</h3>
                <p className="text-gray-300 mb-6 text-lg">
                  Data types in SQL define the kind of data that can be stored in a column. Choosing the right data type is crucial for 
                  database performance, storage efficiency, and data integrity. Each database system has its own set of data types, 
                  but most follow similar patterns.
                </p>
                
                <div className="bg-yellow-900 border border-yellow-700 p-4 rounded-lg mb-6">
                  <p className="text-yellow-300 font-semibold">📌 Choosing the right data type affects storage space, query performance, and data validation. Always use the most specific type that fits your data.</p>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">1. Numeric Data Types</h3>
                <p className="text-gray-300 mb-6">Numeric types store numbers with different precision and scale requirements.</p>
                
                <div className="space-y-6 mb-8">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">Integer Types</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`-- Integer types (exact numbers)
TINYINT     -- 1 byte: -128 to 127
SMALLINT    -- 2 bytes: -32,768 to 32,767
INTEGER     -- 4 bytes: -2,147,483,648 to 2,147,483,647
BIGINT      -- 8 bytes: -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807

-- Examples
CREATE TABLE users (
    id TINYINT PRIMARY KEY,
    age SMALLINT NOT NULL,
    user_id INTEGER UNIQUE,
    population BIGINT
);

-- Insert examples
INSERT INTO users VALUES (1, 25, 1001, 7800000000);`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">Decimal Types</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`-- Decimal types (exact decimal numbers)
DECIMAL(10,2)  -- 10 total digits, 2 after decimal
NUMERIC(8,4)   -- 8 total digits, 4 after decimal
FLOAT(7,4)     -- Approximate floating point
REAL           -- Single precision float
DOUBLE         -- Double precision float

-- Examples
CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    price DECIMAL(10,2),      -- $99999999.99
    weight NUMERIC(8,4),      -- 9999.9999
    rating FLOAT(3,2),        -- 9.99
    temperature REAL,         -- Scientific values
    coordinates DOUBLE        -- GPS coordinates
);

-- Insert examples
INSERT INTO products VALUES 
(1, 19.99, 1.2500, 4.5, 98.6, -122.4194);`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">2. String Data Types</h3>
                <p className="text-gray-300 mb-6">String types store text data with different storage characteristics.</p>
                
                <div className="space-y-6 mb-8">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">Variable-Length Strings</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`-- Variable-length character strings
VARCHAR(255)    -- Variable length, max 255 chars
NVARCHAR(100)   -- Unicode variable length
TEXT            -- Large text (up to 65,535 chars)
LONGTEXT        -- Very large text (up to 4GB)

-- Examples
CREATE TABLE customers (
    id INTEGER PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE,
    bio TEXT,
    notes LONGTEXT
);

-- Insert examples
INSERT INTO customers VALUES 
(1, 'John', 'Doe', 'john@example.com', 
 'Software engineer with 5 years experience', 
 'Detailed customer notes...');`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">Fixed-Length Strings</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`-- Fixed-length character strings
CHAR(10)        -- Fixed length, always 10 chars
NCHAR(20)       -- Unicode fixed length
BINARY(16)      -- Fixed binary data
VARBINARY(255)  -- Variable binary data

-- Examples
CREATE TABLE employees (
    id INTEGER PRIMARY KEY,
    employee_code CHAR(8) UNIQUE,    -- Always 8 chars
    department NCHAR(20),            -- Unicode department name
    profile_pic BINARY(1024),        -- Small image
    resume VARBINARY(MAX)            -- Variable resume file
);

-- Insert examples
INSERT INTO employees VALUES 
(1, 'EMP00123', N'Engineering', 0x89504E47..., 0x25504446...);`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">3. Date and Time Types</h3>
                <p className="text-gray-300 mb-6">Date and time types handle temporal data with various precision levels.</p>
                
                <div className="space-y-6">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">Date Types</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`-- Date and time types
DATE            -- Date only: '2023-12-25'
TIME            -- Time only: '14:30:00'
DATETIME        -- Date and time: '2023-12-25 14:30:00'
TIMESTAMP       -- Auto-updating timestamp
YEAR            -- Year only: 2023

-- Examples
CREATE TABLE events (
    id INTEGER PRIMARY KEY,
    event_name VARCHAR(100),
    event_date DATE,
    start_time TIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    event_year YEAR
);

-- Insert examples
INSERT INTO events VALUES 
(1, 'New Year Party', '2024-01-01', '20:00:00', 
 DEFAULT, 2024);`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">Advanced Date Functions</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`-- Date functions and operations
SELECT 
    NOW() as current_datetime,
    CURDATE() as current_date,
    CURTIME() as current_time,
    DATE_ADD('2023-12-25', INTERVAL 1 MONTH) as next_month,
    DATEDIFF('2024-01-01', '2023-12-25') as days_difference,
    YEAR('2023-12-25') as year_part,
    MONTH('2023-12-25') as month_part,
    DAY('2023-12-25') as day_part;

-- Working with time zones
SELECT 
    CONVERT_TZ('2023-12-25 14:30:00', 'UTC', 'America/New_York') as ny_time,
    UTC_TIMESTAMP() as utc_now;`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">4. Boolean and Other Types</h3>
                <p className="text-gray-300 mb-6">Special data types for boolean values, JSON, and other specific use cases.</p>
                
                <div className="space-y-6">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">Boolean and JSON</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`-- Boolean and JSON types
BOOLEAN         -- TRUE/FALSE/NULL
BOOL            -- Same as BOOLEAN
JSON            -- JSON document storage
JSONB           -- Binary JSON (PostgreSQL)

-- Examples
CREATE TABLE settings (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    is_active BOOLEAN DEFAULT TRUE,
    preferences JSON,
    metadata JSONB
);

-- Insert examples
INSERT INTO settings VALUES 
(1, 1001, TRUE, 
 '{"theme": "dark", "notifications": true}',
 '{"version": "1.0", "last_login": "2023-12-25"}');`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">Special Types</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`-- Special data types
UUID            -- Universally unique identifier
ENUM('A','B','C') -- Enumeration values
SET('a','b','c')  -- Set of values
BLOB            -- Binary large object
CLOB            -- Character large object

-- Examples
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT (UUID()),
    status ENUM('pending', 'processing', 'shipped', 'delivered'),
    tags SET('urgent', 'fragile', 'gift'),
    document BLOB,
    description CLOB
);

-- Insert examples
INSERT INTO orders VALUES 
(DEFAULT, 'pending', 'urgent,fragile', 
 0x25504446..., 'Large order description...');`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">5. Constraints</h3>
                <p className="text-gray-300 mb-6">Constraints enforce data integrity and business rules at the database level.</p>
                
                <div className="space-y-6">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">Common Constraints</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`-- Primary and foreign key constraints
CREATE TABLE departments (
    dept_id INTEGER PRIMARY KEY,
    dept_name VARCHAR(50) NOT NULL UNIQUE,
    budget DECIMAL(12,2) CHECK (budget > 0)
);

CREATE TABLE employees (
    emp_id INTEGER PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    salary DECIMAL(10,2) CHECK (salary >= 0),
    dept_id INTEGER,
    hire_date DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">Advanced Constraints</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`-- Check constraints and composite keys
CREATE TABLE products (
    product_id INTEGER,
    category_id INTEGER,
    product_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) CHECK (price > 0),
    stock_quantity INTEGER CHECK (stock_quantity >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (product_id, category_id),
    CONSTRAINT chk_price_range CHECK (price BETWEEN 0.01 AND 999999.99),
    CONSTRAINT chk_stock_positive CHECK (stock_quantity >= 0)
);

-- Adding constraints to existing table
ALTER TABLE employees 
ADD CONSTRAINT chk_email_format 
CHECK (email LIKE '%@%.%');

-- Creating indexes for performance
CREATE INDEX idx_employees_dept ON employees(dept_id);
CREATE INDEX idx_employees_email ON employees(email);`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-6 rounded-lg border border-blue-500/30 mb-8">
                <h3 className="text-xl font-bold text-blue-400 mb-4">Best Practices</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• <strong>Choose appropriate data types</strong> - use the smallest type that fits your data</li>
                  <li>• <strong>Use NOT NULL constraints</strong> when data is required</li>
                  <li>• <strong>Set appropriate default values</strong> for commonly used columns</li>
                  <li>• <strong>Use CHECK constraints</strong> to validate data at the database level</li>
                  <li>• <strong>Create indexes</strong> on frequently queried columns</li>
                  <li>• <strong>Use foreign keys</strong> to maintain referential integrity</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift hover:ring-2 hover:ring-blue-500/30 hover:ring-opacity-50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-green-400 mb-6 neon-glow">Practical Example: E-commerce Database Schema</h3>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 mb-6">
                  <h4 className="text-lg font-bold text-blue-400 mb-4">ecommerce_schema.sql</h4>
                  <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`-- E-commerce Database Schema with Proper Data Types
CREATE DATABASE ecommerce;
USE ecommerce;

-- Customers table
CREATE TABLE customers (
    customer_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    address JSON,
    preferences JSON,
    CONSTRAINT chk_email_format CHECK (email LIKE '%@%.%'),
    CONSTRAINT chk_phone_format CHECK (phone REGEXP '^[0-9-+() ]+$')
);

-- Categories table
CREATE TABLE categories (
    category_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    parent_category_id INTEGER,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_category_id) REFERENCES categories(category_id)
);

-- Products table
CREATE TABLE products (
    product_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    category_id INTEGER NOT NULL,
    product_name VARCHAR(200) NOT NULL,
    description TEXT,
    sku VARCHAR(50) UNIQUE NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    cost DECIMAL(10,2),
    stock_quantity INTEGER DEFAULT 0,
    min_stock_level INTEGER DEFAULT 5,
    weight DECIMAL(8,3),
    dimensions JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id),
    CONSTRAINT chk_price_positive CHECK (price > 0),
    CONSTRAINT chk_cost_positive CHECK (cost >= 0),
    CONSTRAINT chk_stock_non_negative CHECK (stock_quantity >= 0),
    CONSTRAINT chk_weight_positive CHECK (weight > 0)
);

-- Orders table
CREATE TABLE orders (
    order_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    customer_id INTEGER NOT NULL,
    order_number VARCHAR(20) UNIQUE NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    subtotal DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    shipping_amount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    payment_method ENUM('credit_card', 'debit_card', 'paypal', 'bank_transfer'),
    payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
    shipping_address JSON,
    billing_address JSON,
    notes TEXT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    CONSTRAINT chk_amounts_positive CHECK (subtotal >= 0 AND tax_amount >= 0 AND shipping_amount >= 0),
    CONSTRAINT chk_total_calculation CHECK (total_amount = subtotal + tax_amount + shipping_amount)
);

-- Order items table
CREATE TABLE order_items (
    order_item_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    CONSTRAINT chk_quantity_positive CHECK (quantity > 0),
    CONSTRAINT chk_unit_price_positive CHECK (unit_price > 0),
    CONSTRAINT chk_total_price_calculation CHECK (total_price = quantity * unit_price)
);

-- Create indexes for performance
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_active ON customers(is_active);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_date ON orders(order_date);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);

-- Insert sample data
INSERT INTO categories (category_name, description) VALUES
('Electronics', 'Electronic devices and accessories'),
('Clothing', 'Apparel and fashion items'),
('Books', 'Books and educational materials'),
('Home & Garden', 'Home improvement and garden supplies');

INSERT INTO customers (first_name, last_name, email, phone, date_of_birth) VALUES
('John', 'Doe', 'john.doe@example.com', '+1-555-0123', '1990-05-15'),
('Jane', 'Smith', 'jane.smith@example.com', '+1-555-0124', '1985-08-22'),
('Bob', 'Johnson', 'bob.johnson@example.com', '+1-555-0125', '1992-12-10');

INSERT INTO products (category_id, product_name, sku, price, cost, stock_quantity, weight) VALUES
(1, 'Wireless Headphones', 'WH-001', 99.99, 45.00, 50, 0.250),
(1, 'Smartphone Case', 'SC-002', 19.99, 8.00, 100, 0.050),
(2, 'Cotton T-Shirt', 'CT-003', 24.99, 12.00, 75, 0.150),
(3, 'Programming Book', 'PB-004', 49.99, 25.00, 30, 0.800);`}
                  </pre>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-green-900/30 border border-green-500/30 p-4 rounded-lg">
                    <h4 className="text-green-300 font-bold mb-2">🎯 Key Data Type Choices</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• INTEGER for IDs and counts</li>
                      <li>• DECIMAL for monetary values</li>
                      <li>• VARCHAR for variable text</li>
                      <li>• TIMESTAMP for audit trails</li>
                      <li>• JSON for flexible data</li>
                      <li>• ENUM for controlled values</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-900/30 border border-blue-500/30 p-4 rounded-lg">
                    <h4 className="text-blue-300 font-bold mb-2">📊 Performance Benefits</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Proper indexing for fast queries</li>
                      <li>• Data type constraints prevent errors</li>
                      <li>• JSON storage for flexible schemas</li>
                      <li>• Foreign keys maintain integrity</li>
                      <li>• Check constraints validate data</li>
                      <li>• Optimized storage with right types</li>
                    </ul>
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
                <div className="space-y-6">
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
                <div className="space-y-6">
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
              
              <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift hover:ring-2 hover:ring-blue-500/30 hover:ring-opacity-50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-blue-400 mb-6 neon-glow">Understanding SQL Joins and Relationships</h3>
                <p className="text-gray-300 mb-6 text-lg">
                  SQL JOINs are used to combine rows from two or more tables based on a related column between them. 
                  They are essential for working with relational databases where data is normalized and stored across multiple tables.
                </p>
                
                <div className="bg-yellow-900 border border-yellow-700 p-4 rounded-lg mb-6">
                  <p className="text-yellow-300 font-semibold">📌 JOINs allow you to retrieve data from multiple tables in a single query, making it possible to work with related data efficiently and maintain data integrity.</p>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">1. What are JOINs and Why Use Them?</h3>
                <p className="text-gray-300 mb-6">
                  A <strong>JOIN</strong> is a SQL operation that combines rows from two or more tables based on a related column. 
                  In relational databases, data is often split across multiple tables to avoid redundancy and maintain data integrity. 
                  JOINs allow you to bring this related data together for analysis and reporting.
                </p>
                
                <div className="space-y-6 mb-6">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">Why Use JOINs?</h4>
                    <div className="mb-4">
                      <ul className="text-gray-300 text-sm space-y-2 ml-4">
                        <li>• <strong>Data Normalization:</strong> Avoid storing duplicate data across tables</li>
                        <li>• <strong>Data Integrity:</strong> Maintain consistency and reduce errors</li>
                        <li>• <strong>Efficient Storage:</strong> Save space by not duplicating information</li>
                        <li>• <strong>Flexible Queries:</strong> Combine data from multiple sources</li>
                        <li>• <strong>Complex Analysis:</strong> Perform sophisticated data analysis across tables</li>
                        <li>• <strong>Reporting:</strong> Create comprehensive reports with related data</li>
                      </ul>
                    </div>
                    <h5 className="font-bold text-green-400 mb-2">Sample Database Schema</h5>
                    <div className="bg-gray-900 p-4 rounded">
                      <pre className="text-green-400 font-mono text-sm">
{`-- Sample tables for JOIN examples
CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(50),
    location VARCHAR(50)
);

CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100),
    department_id INT,
    salary DECIMAL(10,2),
    hire_date DATE,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

CREATE TABLE projects (
    project_id INT PRIMARY KEY,
    project_name VARCHAR(100),
    budget DECIMAL(12,2),
    start_date DATE
);

CREATE TABLE employee_projects (
    employee_id INT,
    project_id INT,
    role VARCHAR(50),
    PRIMARY KEY (employee_id, project_id),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
    FOREIGN KEY (project_id) REFERENCES projects(project_id)
);

-- Sample data
INSERT INTO departments VALUES 
(1, 'Engineering', 'New York'),
(2, 'Marketing', 'Los Angeles'),
(3, 'Sales', 'Chicago');

INSERT INTO employees VALUES 
(1, 'John Smith', 1, 75000, '2020-01-15'),
(2, 'Jane Doe', 1, 80000, '2019-03-20'),
(3, 'Bob Johnson', 2, 65000, '2021-06-10'),
(4, 'Alice Brown', 3, 70000, '2020-11-05');`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">Types of Relationships</h4>
                    <div className="mb-4">
                      <p className="text-gray-300 mb-3">
                        Understanding table relationships is crucial for writing effective JOINs:
                      </p>
                      <ul className="text-gray-300 text-sm space-y-2 ml-4">
                        <li>• <strong>One-to-One:</strong> Each record in Table A relates to exactly one record in Table B</li>
                        <li>• <strong>One-to-Many:</strong> One record in Table A can relate to many records in Table B</li>
                        <li>• <strong>Many-to-Many:</strong> Many records in Table A can relate to many records in Table B</li>
                      </ul>
                    </div>
                    <h5 className="font-bold text-blue-400 mb-2">Common JOIN Patterns</h5>
                    <div className="bg-gray-900 p-4 rounded">
                      <pre className="text-green-400 font-mono text-sm">
{`-- One-to-Many: Department to Employees
-- One department can have many employees
SELECT d.department_name, e.name
FROM departments d
INNER JOIN employees e ON d.department_id = e.department_id;

-- Many-to-Many: Employees to Projects (through junction table)
-- Many employees can work on many projects
SELECT e.name, p.project_name, ep.role
FROM employees e
INNER JOIN employee_projects ep ON e.employee_id = ep.employee_id
INNER JOIN projects p ON ep.project_id = p.project_id;`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">2. Types of JOINs Explained</h3>
                <p className="text-gray-300 mb-6">
                  There are several types of JOINs, each serving different purposes. Understanding when to use each type is crucial for effective database querying.
                </p>
                
                <div className="space-y-6">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">INNER JOIN - Matching Records Only</h4>
                    <div className="mb-4">
                      <p className="text-gray-300 mb-3">
                        <strong>INNER JOIN</strong> returns only the records that have matching values in both tables. 
                        It's the most commonly used JOIN type and is often the default when people say "JOIN".
                      </p>
                      <p className="text-gray-300 mb-3">
                        <strong>When to use:</strong> When you only want records that exist in both tables.
                      </p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded">
                      <pre className="text-green-400 font-mono text-sm">
{`-- INNER JOIN: Get employees with their departments
SELECT e.name, e.salary, d.department_name, d.location
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id;

-- Result: Only employees who have a department assigned
-- John Smith | 75000 | Engineering | New York
-- Jane Doe   | 80000 | Engineering | New York
-- Bob Johnson| 65000 | Marketing   | Los Angeles
-- Alice Brown| 70000 | Sales       | Chicago

-- INNER JOIN with multiple tables
SELECT e.name, d.department_name, p.project_name, ep.role
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id
INNER JOIN employee_projects ep ON e.employee_id = ep.employee_id
INNER JOIN projects p ON ep.project_id = p.project_id;`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">LEFT JOIN - All Records from Left Table</h4>
                    <div className="mb-4">
                      <p className="text-gray-300 mb-3">
                        <strong>LEFT JOIN</strong> returns all records from the left table and matching records from the right table. 
                        If there's no match, NULL values are returned for the right table columns.
                      </p>
                      <p className="text-gray-300 mb-3">
                        <strong>When to use:</strong> When you want all records from the main table, even if they don't have matches in the related table.
                      </p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded">
                      <pre className="text-green-400 font-mono text-sm">
{`-- LEFT JOIN: Get all employees, even those without departments
SELECT e.name, e.salary, d.department_name, d.location
FROM employees e
LEFT JOIN departments d ON e.department_id = d.department_id;

-- Result: All employees, with NULL for department info if no match
-- John Smith | 75000 | Engineering | New York
-- Jane Doe   | 80000 | Engineering | New York
-- Bob Johnson| 65000 | Marketing   | Los Angeles
-- Alice Brown| 70000 | Sales       | Chicago
-- Mike Wilson| 60000 | NULL        | NULL (if Mike has no department)

-- LEFT JOIN to find employees without departments
SELECT e.name, e.salary
FROM employees e
LEFT JOIN departments d ON e.department_id = d.department_id
WHERE d.department_id IS NULL;`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-purple-400 mb-4 text-lg">RIGHT JOIN - All Records from Right Table</h4>
                    <div className="mb-4">
                      <p className="text-gray-300 mb-3">
                        <strong>RIGHT JOIN</strong> returns all records from the right table and matching records from the left table. 
                        If there's no match, NULL values are returned for the left table columns.
                      </p>
                      <p className="text-gray-300 mb-3">
                        <strong>When to use:</strong> When you want all records from the related table, even if they don't have matches in the main table.
                      </p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded">
                      <pre className="text-green-400 font-mono text-sm">
{`-- RIGHT JOIN: Get all departments, even those without employees
SELECT d.department_name, d.location, e.name, e.salary
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.department_id;

-- Result: All departments, with NULL for employee info if no match
-- Engineering | New York    | John Smith | 75000
-- Engineering | New York    | Jane Doe   | 80000
-- Marketing   | Los Angeles | Bob Johnson| 65000
-- Sales       | Chicago     | Alice Brown| 70000
-- HR          | Boston      | NULL       | NULL (if HR has no employees)

-- RIGHT JOIN to find departments without employees
SELECT d.department_name, d.location
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.department_id
WHERE e.employee_id IS NULL;`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-orange-400 mb-4 text-lg">FULL OUTER JOIN - All Records from Both Tables</h4>
                    <div className="mb-4">
                      <p className="text-gray-300 mb-3">
                        <strong>FULL OUTER JOIN</strong> returns all records when there's a match in either table. 
                        If there's no match, NULL values are returned for the missing side.
                      </p>
                      <p className="text-gray-300 mb-3">
                        <strong>When to use:</strong> When you want to see all records from both tables, regardless of matches.
                      </p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded">
                      <pre className="text-green-400 font-mono text-sm">
{`-- FULL OUTER JOIN: Get all employees and all departments
SELECT e.name, e.salary, d.department_name, d.location
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.department_id;

-- Result: All employees AND all departments
-- John Smith | 75000 | Engineering | New York
-- Jane Doe   | 80000 | Engineering | New York
-- Bob Johnson| 65000 | Marketing   | Los Angeles
-- Alice Brown| 70000 | Sales       | Chicago
-- Mike Wilson| 60000 | NULL        | NULL
-- NULL       | NULL  | HR          | Boston

-- Note: FULL OUTER JOIN is not supported in MySQL
-- Use LEFT JOIN UNION RIGHT JOIN instead:
SELECT e.name, e.salary, d.department_name, d.location
FROM employees e
LEFT JOIN departments d ON e.department_id = d.department_id
UNION
SELECT e.name, e.salary, d.department_name, d.location
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.department_id
WHERE e.employee_id IS NULL;`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">3. Advanced JOIN Concepts</h3>
                <p className="text-gray-300 mb-6">
                  Beyond basic JOINs, there are several advanced concepts that can make your queries more powerful and efficient.
                </p>
                
                <div className="space-y-6">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">Self JOIN - Joining a Table to Itself</h4>
                    <div className="mb-4">
                      <p className="text-gray-300 mb-3">
                        A <strong>self JOIN</strong> is when you join a table to itself. This is useful for finding relationships within the same table.
                      </p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded">
                      <pre className="text-green-400 font-mono text-sm">
{`-- Example: Employees table with manager_id
CREATE TABLE employees_with_managers (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100),
    manager_id INT,
    salary DECIMAL(10,2)
);

-- Self JOIN to find employees and their managers
SELECT e.name AS employee_name, m.name AS manager_name
FROM employees_with_managers e
LEFT JOIN employees_with_managers m ON e.manager_id = m.employee_id;

-- Self JOIN to find employees at the same salary level
SELECT e1.name AS employee1, e2.name AS employee2, e1.salary
FROM employees_with_managers e1
INNER JOIN employees_with_managers e2 ON e1.salary = e2.salary
WHERE e1.employee_id < e2.employee_id;  -- Avoid duplicates`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">CROSS JOIN - Cartesian Product</h4>
                    <div className="mb-4">
                      <p className="text-gray-300 mb-3">
                        A <strong>CROSS JOIN</strong> returns the Cartesian product of two tables - every row from the first table 
                        combined with every row from the second table.
                      </p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded">
                      <pre className="text-green-400 font-mono text-sm">
{`-- CROSS JOIN: Combine every employee with every project
SELECT e.name, p.project_name
FROM employees e
CROSS JOIN projects p;

-- Result: Every employee paired with every project
-- John Smith | Project Alpha
-- John Smith | Project Beta
-- Jane Doe   | Project Alpha
-- Jane Doe   | Project Beta
-- Bob Johnson| Project Alpha
-- Bob Johnson| Project Beta

-- CROSS JOIN for generating test data
SELECT d.department_name, p.project_name
FROM departments d
CROSS JOIN projects p;`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-purple-400 mb-4 text-lg">JOIN Performance Tips</h4>
                    <div className="mb-4">
                      <p className="text-gray-300 mb-3">
                        Here are some tips to make your JOINs more efficient:
                      </p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded">
                      <pre className="text-green-400 font-mono text-sm">
{`-- 1. Use appropriate indexes
CREATE INDEX idx_employee_department ON employees(department_id);
CREATE INDEX idx_department_id ON departments(department_id);

-- 2. Be specific with column selection
-- Good: Only select needed columns
SELECT e.name, d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id;

-- Avoid: SELECT * (selects all columns)
SELECT *
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id;

-- 3. Use WHERE clause to filter early
SELECT e.name, d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id
WHERE e.salary > 70000;  -- Filter before joining

-- 4. Consider JOIN order for large tables
-- Start with the most selective table
SELECT e.name, d.department_name
FROM employees e  -- If employees table is smaller
INNER JOIN departments d ON e.department_id = d.department_id;`}
                      </pre>
                    </div>
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
                <div className="space-y-4">
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
                <div className="space-y-6">
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
                <div className="space-y-4">
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
                <div className="space-y-4">
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