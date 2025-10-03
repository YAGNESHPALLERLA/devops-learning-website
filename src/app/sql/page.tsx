import TechLayout from '@/components/tech-layout';
import VideoSection from '@/components/VideoSection';
import { getVideosForTopic } from '@/data/videoTutorials';

export default function SQLPage() {
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

  return (
    <TechLayout onThisPage={pageHeadings} technology="sql">
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
                <p className="text-purple-300 font-semibold text-lg">✅ Database Operations</p>
                <p className="text-gray-300 text-sm mt-2">Create, read, update, delete data</p>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-green-400 mb-4">Key Features:</h3>
            <ul className="text-gray-300 space-y-2 mb-4">
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                <strong>Data Definition Language (DDL):</strong> CREATE, ALTER, DROP
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                <strong>Data Manipulation Language (DML):</strong> SELECT, INSERT, UPDATE, DELETE
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                <strong>Data Control Language (DCL):</strong> GRANT, REVOKE
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                <strong>Transaction Control Language (TCL):</strong> COMMIT, ROLLBACK
              </li>
            </ul>
            
            <div className="bg-yellow-900 border border-yellow-700 p-4 rounded-lg">
              <p className="text-yellow-300 font-semibold">📌 SQL is used in data analysis, web development, business intelligence, and data science</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift hover:ring-2 hover:ring-blue-500/30 hover:ring-opacity-50 transition-all duration-300">
            <h3 className="text-2xl font-bold text-green-400 mb-6 neon-glow">Setting Up Your First Database</h3>
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 mb-6">
              <h4 className="text-lg font-bold text-blue-400 mb-4">OHG 365 Company Database Schema</h4>
              <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`-- Create OHG 365 Company Database
CREATE DATABASE ohg365_company;
USE ohg365_company;

-- Create Departments Table
CREATE TABLE departments (
    dept_id INT PRIMARY KEY AUTO_INCREMENT,
    dept_name VARCHAR(50) NOT NULL,
    location VARCHAR(100),
    budget DECIMAL(12,2),
    created_date DATE DEFAULT (CURRENT_DATE)
);

-- Create Employees Table
CREATE TABLE employees (
    emp_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(15),
    hire_date DATE,
    salary DECIMAL(10,2),
    dept_id INT,
    manager_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id),
    FOREIGN KEY (manager_id) REFERENCES employees(emp_id)
);

-- Create Projects Table
CREATE TABLE projects (
    project_id INT PRIMARY KEY AUTO_INCREMENT,
    project_name VARCHAR(100) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    budget DECIMAL(12,2),
    status ENUM('Planning', 'Active', 'Completed', 'On Hold') DEFAULT 'Planning'
);

-- Create Employee Projects Junction Table
CREATE TABLE employee_projects (
    emp_id INT,
    project_id INT,
    role VARCHAR(50),
    hours_allocated INT,
    PRIMARY KEY (emp_id, project_id),
    FOREIGN KEY (emp_id) REFERENCES employees(emp_id),
    FOREIGN KEY (project_id) REFERENCES projects(project_id)
);

-- Insert Sample Data
INSERT INTO departments (dept_name, location, budget) VALUES
('Engineering', 'New York', 500000.00),
('Marketing', 'Los Angeles', 200000.00),
('Sales', 'Chicago', 300000.00),
('HR', 'Boston', 150000.00);

INSERT INTO employees (first_name, last_name, email, phone, hire_date, salary, dept_id, manager_id) VALUES
('John', 'Doe', 'john.doe@ohg365.com', '555-0101', '2020-01-15', 75000.00, 1, NULL),
('Jane', 'Smith', 'jane.smith@ohg365.com', '555-0102', '2020-03-20', 80000.00, 1, 1),
('Mike', 'Johnson', 'mike.johnson@ohg365.com', '555-0103', '2019-06-10', 70000.00, 2, NULL),
('Sarah', 'Wilson', 'sarah.wilson@ohg365.com', '555-0104', '2021-02-14', 65000.00, 2, 3),
('David', 'Brown', 'david.brown@ohg365.com', '555-0105', '2020-11-30', 90000.00, 3, NULL),
('Lisa', 'Davis', 'lisa.davis@ohg365.com', '555-0106', '2021-04-05', 60000.00, 4, NULL);

INSERT INTO projects (project_name, description, start_date, end_date, budget, status) VALUES
('OHG 365 Website', 'Complete website redesign and development', '2023-01-01', '2023-06-30', 100000.00, 'Active'),
('Mobile App', 'iOS and Android mobile application', '2023-03-01', '2023-12-31', 200000.00, 'Planning'),
('Database Migration', 'Migrate legacy systems to new database', '2023-02-15', '2023-08-15', 75000.00, 'Active'),
('Marketing Campaign', 'Q2 marketing campaign launch', '2023-04-01', '2023-06-30', 50000.00, 'Planning');

INSERT INTO employee_projects (emp_id, project_id, role, hours_allocated) VALUES
(1, 1, 'Project Manager', 40),
(2, 1, 'Lead Developer', 40),
(2, 3, 'Database Architect', 20),
(3, 2, 'UI/UX Designer', 30),
(4, 2, 'Marketing Lead', 25),
(5, 4, 'Sales Manager', 35),
(6, 1, 'QA Tester', 20);`}
              </pre>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-900/30 border border-blue-500/30 p-4 rounded-lg">
                <h4 className="text-blue-300 font-bold mb-2">🗄️ Database Structure</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>departments:</strong> Company departments</li>
                  <li>• <strong>employees:</strong> Employee information</li>
                  <li>• <strong>projects:</strong> Project details</li>
                  <li>• <strong>employee_projects:</strong> Many-to-many relationship</li>
                  <li>• <strong>Foreign Keys:</strong> Maintain data integrity</li>
                  <li>• <strong>Constraints:</strong> UNIQUE, NOT NULL, ENUM</li>
                </ul>
              </div>
              
              <div className="bg-green-900/30 border border-green-500/30 p-4 rounded-lg">
                <h4 className="text-green-300 font-bold mb-2">📊 Sample Data Overview</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• 4 Departments (Engineering, Marketing, Sales, HR)</li>
                  <li>• 6 Employees with hierarchical structure</li>
                  <li>• 4 Projects in different stages</li>
                  <li>• Employee-project assignments with roles</li>
                  <li>• Realistic salary and budget data</li>
                </ul>
              </div>
            </div>
          </div>

          <h2 id="basic-commands" className="text-3xl font-bold text-blue-400 mb-6">2. Basic SQL Commands</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">SELECT Statement</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-blue-400 mb-2">Basic SELECT</h4>
                <div className="bg-gray-900 p-3 rounded">
                  <pre className="text-green-400 font-mono text-sm">
{`-- Select all columns
SELECT * FROM users;

-- Select specific columns
SELECT name, email FROM users;

-- Select with alias
SELECT name AS full_name, email FROM users;`}
                  </pre>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-green-400 mb-2">SELECT with WHERE</h4>
                <div className="bg-gray-900 p-3 rounded">
                  <pre className="text-green-400 font-mono text-sm">
{`-- Filter data
SELECT * FROM users WHERE age > 18;

-- Multiple conditions
SELECT * FROM users 
WHERE age > 18 AND city = 'New York';

-- Pattern matching
SELECT * FROM users 
WHERE name LIKE 'John%';`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift hover:ring-2 hover:ring-blue-500/30 hover:ring-opacity-50 transition-all duration-300">
            <h3 className="text-2xl font-bold text-green-400 mb-6 neon-glow">Practical SQL Queries: OHG 365 Company Analysis</h3>
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 mb-6">
              <h4 className="text-lg font-bold text-blue-400 mb-4">Business Intelligence Queries</h4>
              <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`-- 1. Employee Directory with Department Information
SELECT 
    e.emp_id,
    CONCAT(e.first_name, ' ', e.last_name) AS full_name,
    e.email,
    e.salary,
    d.dept_name,
    d.location,
    CASE 
        WHEN e.manager_id IS NULL THEN 'Manager'
        ELSE 'Employee'
    END AS position_type
FROM employees e
JOIN departments d ON e.dept_id = d.dept_id
ORDER BY d.dept_name, e.salary DESC;

-- 2. Department Salary Analysis
SELECT 
    d.dept_name,
    COUNT(e.emp_id) AS employee_count,
    ROUND(AVG(e.salary), 2) AS avg_salary,
    MIN(e.salary) AS min_salary,
    MAX(e.salary) AS max_salary,
    SUM(e.salary) AS total_salary_budget
FROM departments d
LEFT JOIN employees e ON d.dept_id = e.dept_id
GROUP BY d.dept_id, d.dept_name
ORDER BY avg_salary DESC;

-- 3. Project Resource Allocation
SELECT 
    p.project_name,
    p.status,
    p.budget,
    COUNT(ep.emp_id) AS team_size,
    SUM(ep.hours_allocated) AS total_hours,
    ROUND(p.budget / SUM(ep.hours_allocated), 2) AS budget_per_hour
FROM projects p
LEFT JOIN employee_projects ep ON p.project_id = ep.project_id
GROUP BY p.project_id, p.project_name, p.status, p.budget
ORDER BY total_hours DESC;

-- 4. Employee Performance by Project
SELECT 
    CONCAT(e.first_name, ' ', e.last_name) AS employee_name,
    d.dept_name,
    p.project_name,
    ep.role,
    ep.hours_allocated,
    ROUND((ep.hours_allocated * e.salary / 2080), 2) AS project_cost
FROM employees e
JOIN departments d ON e.dept_id = d.dept_id
JOIN employee_projects ep ON e.emp_id = ep.emp_id
JOIN projects p ON ep.project_id = p.project_id
WHERE p.status = 'Active'
ORDER BY project_cost DESC;

-- 5. Management Hierarchy
SELECT 
    CONCAT(m.first_name, ' ', m.last_name) AS manager_name,
    d.dept_name,
    COUNT(e.emp_id) AS direct_reports,
    ROUND(AVG(e.salary), 2) AS avg_team_salary
FROM employees m
JOIN departments d ON m.dept_id = d.dept_id
LEFT JOIN employees e ON m.emp_id = e.manager_id
WHERE m.manager_id IS NULL
GROUP BY m.emp_id, m.first_name, m.last_name, d.dept_name
ORDER BY direct_reports DESC;

-- 6. Budget vs Actual Analysis
SELECT 
    d.dept_name,
    d.budget AS allocated_budget,
    SUM(e.salary) AS actual_salary_cost,
    ROUND(d.budget - SUM(e.salary), 2) AS budget_variance,
    ROUND(((d.budget - SUM(e.salary)) / d.budget * 100), 2) AS variance_percentage
FROM departments d
LEFT JOIN employees e ON d.dept_id = e.dept_id
GROUP BY d.dept_id, d.dept_name, d.budget
ORDER BY variance_percentage DESC;

-- 7. Upcoming Project Deadlines
SELECT 
    project_name,
    description,
    start_date,
    end_date,
    DATEDIFF(end_date, CURRENT_DATE) AS days_remaining,
    status,
    CASE 
        WHEN DATEDIFF(end_date, CURRENT_DATE) < 0 THEN 'Overdue'
        WHEN DATEDIFF(end_date, CURRENT_DATE) <= 30 THEN 'Due Soon'
        ELSE 'On Track'
    END AS deadline_status
FROM projects
WHERE status IN ('Active', 'Planning')
ORDER BY days_remaining ASC;

-- 8. Top Performers by Department
SELECT 
    dept_name,
    employee_name,
    salary,
    project_count,
    total_hours,
    RANK() OVER (PARTITION BY dept_name ORDER BY salary DESC) AS salary_rank
FROM (
    SELECT 
        d.dept_name,
        CONCAT(e.first_name, ' ', e.last_name) AS employee_name,
        e.salary,
        COUNT(ep.project_id) AS project_count,
        SUM(ep.hours_allocated) AS total_hours
    FROM employees e
    JOIN departments d ON e.dept_id = d.dept_id
    LEFT JOIN employee_projects ep ON e.emp_id = ep.emp_id
    GROUP BY d.dept_name, e.emp_id, e.first_name, e.last_name, e.salary
) AS employee_stats
ORDER BY dept_name, salary_rank;`}
              </pre>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-purple-900/30 border border-purple-500/30 p-4 rounded-lg">
                <h4 className="text-purple-300 font-bold mb-2">🎯 Query Types Demonstrated</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>JOINs:</strong> INNER, LEFT JOINs</li>
                  <li>• <strong>Aggregate Functions:</strong> COUNT, AVG, SUM, MIN, MAX</li>
                  <li>• <strong>GROUP BY:</strong> Data grouping and analysis</li>
                  <li>• <strong>Window Functions:</strong> RANK() OVER</li>
                  <li>• <strong>Conditional Logic:</strong> CASE statements</li>
                  <li>• <strong>Date Functions:</strong> DATEDIFF, CURRENT_DATE</li>
                </ul>
              </div>
              
              <div className="bg-blue-900/30 border border-blue-500/30 p-4 rounded-lg">
                <h4 className="text-blue-300 font-bold mb-2">📊 Business Insights</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Employee directory with department info</li>
                  <li>• Salary analysis by department</li>
                  <li>• Project resource allocation</li>
                  <li>• Management hierarchy structure</li>
                  <li>• Budget variance analysis</li>
                  <li>• Performance ranking system</li>
                </ul>
              </div>
            </div>
          </div>

          <h2 id="data-types" className="text-3xl font-bold text-blue-400 mb-6">3. Data Types & Constraints</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Common Data Types</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-blue-400 mb-2">Numeric Types</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• INT - Integer</li>
                  <li>• DECIMAL - Fixed decimal</li>
                  <li>• FLOAT - Floating point</li>
                  <li>• DOUBLE - Double precision</li>
                </ul>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-green-400 mb-2">String Types</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• VARCHAR(n) - Variable string</li>
                  <li>• CHAR(n) - Fixed string</li>
                  <li>• TEXT - Long text</li>
                  <li>• BLOB - Binary data</li>
                </ul>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-purple-400 mb-2">Date/Time Types</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• DATE - Date only</li>
                  <li>• TIME - Time only</li>
                  <li>• DATETIME - Date and time</li>
                  <li>• TIMESTAMP - Auto-updating</li>
                </ul>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-purple-400 mb-4 mt-6">Constraints</h3>
            <div className="bg-gray-900 p-4 rounded border border-gray-600">
              <pre className="text-green-400 font-mono text-sm">
{`CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    age INT CHECK (age >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`}
              </pre>
            </div>
          </div>

          <h2 id="creating-tables" className="text-3xl font-bold text-blue-400 mb-6">4. Creating Tables</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Table Creation</h3>
            <div className="bg-gray-900 p-4 rounded border border-gray-600 mb-4">
              <pre className="text-green-400 font-mono text-sm">
{`CREATE TABLE employees (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    hire_date DATE,
    salary DECIMAL(10,2),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);`}
              </pre>
            </div>
            
            <h3 className="text-xl font-bold text-purple-400 mb-4">Table Modifications</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-blue-400 mb-2">ALTER TABLE</h4>
                <div className="bg-gray-900 p-3 rounded">
                  <pre className="text-green-400 font-mono text-sm">
{`-- Add column
ALTER TABLE employees 
ADD phone VARCHAR(15);

-- Modify column
ALTER TABLE employees 
MODIFY salary DECIMAL(12,2);

-- Drop column
ALTER TABLE employees 
DROP COLUMN phone;`}
                  </pre>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-green-400 mb-2">DROP TABLE</h4>
                <div className="bg-gray-900 p-3 rounded">
                  <pre className="text-green-400 font-mono text-sm">
{`-- Drop table
DROP TABLE employees;

-- Drop if exists
DROP TABLE IF EXISTS employees;

-- Truncate table (remove all data)
TRUNCATE TABLE employees;`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <h2 id="data-manipulation" className="text-3xl font-bold text-blue-400 mb-6">5. Data Manipulation</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">INSERT, UPDATE, DELETE</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-blue-400 mb-2">INSERT</h4>
                <div className="bg-gray-900 p-3 rounded">
                  <pre className="text-green-400 font-mono text-sm">
{`-- Insert single row
INSERT INTO employees 
(first_name, last_name, email, salary)
VALUES ('John', 'Doe', 'john@email.com', 50000);

-- Insert multiple rows
INSERT INTO employees VALUES
(1, 'John', 'Doe', 'john@email.com', '2023-01-01', 50000, 1),
(2, 'Jane', 'Smith', 'jane@email.com', '2023-01-02', 55000, 1);`}
                  </pre>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-green-400 mb-2">UPDATE</h4>
                <div className="bg-gray-900 p-3 rounded">
                  <pre className="text-green-400 font-mono text-sm">
{`-- Update single row
UPDATE employees 
SET salary = 60000 
WHERE employee_id = 1;

-- Update multiple columns
UPDATE employees 
SET salary = salary * 1.1, 
    last_name = 'Updated'
WHERE department_id = 1;`}
                  </pre>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-purple-400 mb-2">DELETE</h4>
                <div className="bg-gray-900 p-3 rounded">
                  <pre className="text-green-400 font-mono text-sm">
{`-- Delete specific rows
DELETE FROM employees 
WHERE department_id = 2;

-- Delete all rows
DELETE FROM employees;

-- Delete with subquery
DELETE FROM employees 
WHERE employee_id IN (
    SELECT employee_id FROM temp_table
);`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <h2 id="filtering-sorting" className="text-3xl font-bold text-blue-400 mb-6">6. Filtering & Sorting</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">WHERE Clause</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-blue-400 mb-2">Comparison Operators</h4>
                <div className="bg-gray-900 p-3 rounded">
                  <pre className="text-green-400 font-mono text-sm">
{`-- Basic comparisons
SELECT * FROM employees WHERE salary > 50000;
SELECT * FROM employees WHERE age >= 25;
SELECT * FROM employees WHERE name = 'John';
SELECT * FROM employees WHERE name != 'John';
SELECT * FROM employees WHERE salary BETWEEN 40000 AND 60000;`}
                  </pre>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-green-400 mb-2">Logical Operators</h4>
                <div className="bg-gray-900 p-3 rounded">
                  <pre className="text-green-400 font-mono text-sm">
{`-- AND, OR, NOT
SELECT * FROM employees 
WHERE salary > 50000 AND age < 30;

SELECT * FROM employees 
WHERE department_id = 1 OR department_id = 2;

SELECT * FROM employees 
WHERE NOT (salary < 40000);

-- IN and NOT IN
SELECT * FROM employees 
WHERE department_id IN (1, 2, 3);

-- LIKE pattern matching
SELECT * FROM employees 
WHERE name LIKE 'J%';  -- Starts with J
SELECT * FROM employees 
WHERE email LIKE '%@gmail.com';`}
                  </pre>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-purple-400 mb-4 mt-6">ORDER BY and LIMIT</h3>
            <div className="bg-gray-900 p-4 rounded border border-gray-600">
              <pre className="text-green-400 font-mono text-sm">
{`-- Sort results
SELECT * FROM employees 
ORDER BY salary DESC;

-- Multiple sort criteria
SELECT * FROM employees 
ORDER BY department_id ASC, salary DESC;

-- Limit results
SELECT * FROM employees 
ORDER BY salary DESC 
LIMIT 10;

-- Pagination
SELECT * FROM employees 
ORDER BY employee_id 
LIMIT 10 OFFSET 20;  -- Skip first 20, get next 10`}
              </pre>
            </div>
          </div>

          <h2 id="joins" className="text-3xl font-bold text-blue-400 mb-6">7. Joins and Relationships</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Types of Joins</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-blue-400 mb-2">INNER JOIN</h4>
                <div className="bg-gray-900 p-3 rounded">
                  <pre className="text-green-400 font-mono text-sm">
{`-- Returns matching records from both tables
SELECT e.first_name, e.last_name, d.department_name
FROM employees e
INNER JOIN departments d 
ON e.department_id = d.department_id;`}
                  </pre>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-green-400 mb-2">LEFT JOIN</h4>
                <div className="bg-gray-900 p-3 rounded">
                  <pre className="text-green-400 font-mono text-sm">
{`-- Returns all records from left table
SELECT e.first_name, e.last_name, d.department_name
FROM employees e
LEFT JOIN departments d 
ON e.department_id = d.department_id;`}
                  </pre>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-purple-400 mb-2">RIGHT JOIN</h4>
                <div className="bg-gray-900 p-3 rounded">
                  <pre className="text-green-400 font-mono text-sm">
{`-- Returns all records from right table
SELECT e.first_name, e.last_name, d.department_name
FROM employees e
RIGHT JOIN departments d 
ON e.department_id = d.department_id;`}
                  </pre>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-yellow-400 mb-2">FULL OUTER JOIN</h4>
                <div className="bg-gray-900 p-3 rounded">
                  <pre className="text-green-400 font-mono text-sm">
{`-- Returns all records from both tables
SELECT e.first_name, e.last_name, d.department_name
FROM employees e
FULL OUTER JOIN departments d 
ON e.department_id = d.department_id;`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <h2 id="aggregate-functions" className="text-3xl font-bold text-blue-400 mb-6">8. Aggregate Functions</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Common Aggregate Functions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-blue-400 mb-2">COUNT</h4>
                <div className="bg-gray-900 p-3 rounded">
                  <pre className="text-green-400 font-mono text-sm">
{`-- Count all rows
SELECT COUNT(*) FROM employees;

-- Count non-null values
SELECT COUNT(department_id) FROM employees;

-- Count distinct values
SELECT COUNT(DISTINCT department_id) FROM employees;`}
                  </pre>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-green-400 mb-2">SUM, AVG</h4>
                <div className="bg-gray-900 p-3 rounded">
                  <pre className="text-green-400 font-mono text-sm">
{`-- Sum of salaries
SELECT SUM(salary) FROM employees;

-- Average salary
SELECT AVG(salary) FROM employees;

-- Sum by department
SELECT department_id, SUM(salary) 
FROM employees 
GROUP BY department_id;`}
                  </pre>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-purple-400 mb-2">MIN, MAX</h4>
                <div className="bg-gray-900 p-3 rounded">
                  <pre className="text-green-400 font-mono text-sm">
{`-- Minimum and maximum salary
SELECT MIN(salary), MAX(salary) FROM employees;

-- Earliest and latest hire dates
SELECT MIN(hire_date), MAX(hire_date) FROM employees;`}
                  </pre>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-purple-400 mb-4 mt-6">GROUP BY and HAVING</h3>
            <div className="bg-gray-900 p-4 rounded border border-gray-600">
              <pre className="text-green-400 font-mono text-sm">
{`-- Group by department
SELECT department_id, COUNT(*), AVG(salary)
FROM employees
GROUP BY department_id;

-- HAVING clause (filter groups)
SELECT department_id, COUNT(*), AVG(salary)
FROM employees
GROUP BY department_id
HAVING COUNT(*) > 5;

-- Multiple grouping columns
SELECT department_id, gender, COUNT(*)
FROM employees
GROUP BY department_id, gender;`}
              </pre>
            </div>
          </div>

          <h2 id="subqueries" className="text-3xl font-bold text-blue-400 mb-6">9. Subqueries</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Types of Subqueries</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-blue-400 mb-2">Scalar Subquery</h4>
                <div className="bg-gray-900 p-3 rounded">
                  <pre className="text-green-400 font-mono text-sm">
{`-- Single value subquery
SELECT first_name, last_name, salary
FROM employees
WHERE salary > (
    SELECT AVG(salary) FROM employees
);

-- In SELECT clause
SELECT first_name, last_name, 
       salary - (SELECT AVG(salary) FROM employees) AS diff
FROM employees;`}
                  </pre>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-green-400 mb-2">IN Subquery</h4>
                <div className="bg-gray-900 p-3 rounded">
                  <pre className="text-green-400 font-mono text-sm">
{`-- Find employees in specific departments
SELECT * FROM employees
WHERE department_id IN (
    SELECT department_id FROM departments 
    WHERE location = 'New York'
);

-- NOT IN subquery
SELECT * FROM employees
WHERE department_id NOT IN (
    SELECT department_id FROM departments 
    WHERE location = 'Remote'
);`}
                  </pre>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-purple-400 mb-4 mt-6">EXISTS Subquery</h3>
            <div className="bg-gray-900 p-4 rounded border border-gray-600">
              <pre className="text-green-400 font-mono text-sm">
{`-- EXISTS - check if subquery returns any rows
SELECT * FROM employees e
WHERE EXISTS (
    SELECT 1 FROM departments d 
    WHERE d.department_id = e.department_id 
    AND d.location = 'New York'
);

-- NOT EXISTS
SELECT * FROM employees e
WHERE NOT EXISTS (
    SELECT 1 FROM departments d 
    WHERE d.department_id = e.department_id 
    AND d.location = 'Remote'
);`}
              </pre>
            </div>
          </div>

          <h2 id="window-functions" className="text-3xl font-bold text-blue-400 mb-6">10. Window Functions</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Common Window Functions</h3>
            <div className="bg-gray-900 p-4 rounded border border-gray-600">
              <pre className="text-green-400 font-mono text-sm">
{`-- ROW_NUMBER - sequential numbering
SELECT first_name, last_name, salary,
       ROW_NUMBER() OVER (ORDER BY salary DESC) as rank
FROM employees;

-- RANK - ranking with ties
SELECT first_name, last_name, salary,
       RANK() OVER (ORDER BY salary DESC) as rank
FROM employees;

-- DENSE_RANK - ranking without gaps
SELECT first_name, last_name, salary,
       DENSE_RANK() OVER (ORDER BY salary DESC) as rank
FROM employees;

-- PARTITION BY - window by groups
SELECT first_name, last_name, salary, department_id,
       ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) as dept_rank
FROM employees;

-- LAG and LEAD - access previous/next rows
SELECT first_name, last_name, salary,
       LAG(salary, 1) OVER (ORDER BY salary) as prev_salary,
       LEAD(salary, 1) OVER (ORDER BY salary) as next_salary
FROM employees;`}
              </pre>
            </div>
          </div>

          <h2 id="database-design" className="text-3xl font-bold text-blue-400 mb-6">11. Database Design</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Normalization</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-blue-400 mb-2">1NF - First Normal Form</h4>
                <p className="text-gray-300 text-sm">Each column contains atomic values, no repeating groups</p>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-green-400 mb-2">2NF - Second Normal Form</h4>
                <p className="text-gray-300 text-sm">1NF + all non-key attributes fully dependent on primary key</p>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-purple-400 mb-2">3NF - Third Normal Form</h4>
                <p className="text-gray-300 text-sm">2NF + no transitive dependencies</p>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-purple-400 mb-4 mt-6">Entity Relationships</h3>
            <div className="bg-gray-700 p-4 rounded border border-gray-600">
              <ul className="text-gray-300 space-y-2">
                <li>• <strong>One-to-One:</strong> Each record in one table relates to exactly one record in another</li>
                <li>• <strong>One-to-Many:</strong> One record in first table relates to many records in second table</li>
                <li>• <strong>Many-to-Many:</strong> Records in both tables can relate to multiple records in the other</li>
              </ul>
            </div>
          </div>

          <h2 id="indexes-performance" className="text-3xl font-bold text-blue-400 mb-6">12. Indexes & Performance</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Creating Indexes</h3>
            <div className="bg-gray-900 p-4 rounded border border-gray-600">
              <pre className="text-green-400 font-mono text-sm">
{`-- Create index on single column
CREATE INDEX idx_employee_name ON employees(last_name);

-- Create composite index
CREATE INDEX idx_employee_dept_salary ON employees(department_id, salary);

-- Create unique index
CREATE UNIQUE INDEX idx_employee_email ON employees(email);

-- Drop index
DROP INDEX idx_employee_name ON employees;

-- Show indexes
SHOW INDEX FROM employees;`}
              </pre>
            </div>
            
            <h3 className="text-xl font-bold text-purple-400 mb-4 mt-6">Query Optimization</h3>
            <div className="bg-gray-700 p-4 rounded border border-gray-600">
              <ul className="text-gray-300 space-y-2">
                <li>• <strong>Use indexes:</strong> Create indexes on frequently queried columns</li>
                <li>• <strong>Limit results:</strong> Use LIMIT to restrict result sets</li>
                <li>• <strong>Avoid SELECT *:</strong> Only select needed columns</li>
                <li>• <strong>Use appropriate data types:</strong> Choose efficient data types</li>
                <li>• <strong>Analyze query execution:</strong> Use EXPLAIN to understand query plans</li>
              </ul>
            </div>
          </div>

          <h2 id="transactions" className="text-3xl font-bold text-blue-400 mb-6">13. Transactions & ACID</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">ACID Properties</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-blue-400 mb-2">Atomicity</h4>
                <p className="text-gray-300 text-sm">All operations succeed or all fail</p>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-green-400 mb-2">Consistency</h4>
                <p className="text-gray-300 text-sm">Database remains in valid state</p>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-purple-400 mb-2">Isolation</h4>
                <p className="text-gray-300 text-sm">Concurrent transactions don't interfere</p>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-yellow-400 mb-2">Durability</h4>
                <p className="text-gray-300 text-sm">Committed changes persist</p>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-purple-400 mb-4 mt-6">Transaction Control</h3>
            <div className="bg-gray-900 p-4 rounded border border-gray-600">
              <pre className="text-green-400 font-mono text-sm">
{`-- Start transaction
START TRANSACTION;

-- Perform operations
UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;

-- Commit transaction
COMMIT;

-- Or rollback if error
-- ROLLBACK;

-- Savepoints
START TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
SAVEPOINT sp1;
UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;
-- ROLLBACK TO sp1;  -- Rollback to savepoint
COMMIT;`}
              </pre>
            </div>
          </div>

          <VideoSection videos={sqlVideos} title="SQL Video Tutorials" />

          <h2 id="practice-projects" className="text-3xl font-bold text-blue-400 mb-6">14. Practice Projects</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <ul className="text-gray-300 space-y-3">
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                <strong>Library Management System:</strong> Design database for books, members, and loans
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                <strong>E-commerce Database:</strong> Create schema for products, customers, and orders
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                <strong>Employee Management:</strong> Build HR database with departments and payroll
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                <strong>Student Information System:</strong> Design database for courses, students, and grades
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                <strong>Data Analysis:</strong> Analyze sales data with complex queries and reporting
              </li>
            </ul>
          </div>

          <h2 id="summary" className="text-3xl font-bold text-blue-400 mb-6">✅ Summary</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <ul className="text-gray-300 space-y-3">
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                SQL is the standard language for database management and data manipulation
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Key concepts include tables, relationships, queries, and transactions
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Advanced features include window functions, subqueries, and performance optimization
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Practice with real database projects to master SQL skills
              </li>
            </ul>
          </div>
        </div>
      </div>
    </TechLayout>
  );
}

