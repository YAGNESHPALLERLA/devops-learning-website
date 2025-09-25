// src/app/sql/basics/commands/page.tsx
import Link from 'next/link';

export default function SQLCommandsPage() {
  return (
    <main>
      <section className="text-center py-12 px-4">
        <Link href="/sql" className="inline-block mb-8 text-blue-400 hover:text-blue-300 transition-colors">
          ← Back to SQL Learning Hub
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          🗄️ Basic SQL Commands
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          Master SELECT, FROM, WHERE clauses and basic data retrieval operations
        </p>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Sample Database Structure</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Our Example Tables</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`-- Students Table
CREATE TABLE students (
    student_id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    age INT,
    major VARCHAR(50),
    gpa DECIMAL(3,2)
);

-- Courses Table
CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(100),
    instructor VARCHAR(50),
    credits INT,
    department VARCHAR(50)
);

-- Sample Data
INSERT INTO students VALUES 
(1, 'John', 'Doe', 'john.doe@email.com', 20, 'Computer Science', 3.8),
(2, 'Jane', 'Smith', 'jane.smith@email.com', 22, 'Mathematics', 3.5),
(3, 'Bob', 'Johnson', 'bob.johnson@email.com', 19, 'Physics', 3.2),
(4, 'Alice', 'Brown', 'alice.brown@email.com', 21, 'Computer Science', 3.9),
(5, 'Charlie', 'Wilson', 'charlie.wilson@email.com', 23, 'Mathematics', 3.1);

INSERT INTO courses VALUES
(101, 'Introduction to Programming', 'Dr. Smith', 3, 'Computer Science'),
(102, 'Calculus I', 'Dr. Johnson', 4, 'Mathematics'),
(103, 'Physics Mechanics', 'Dr. Brown', 4, 'Physics'),
(104, 'Data Structures', 'Dr. Davis', 3, 'Computer Science'),
(105, 'Linear Algebra', 'Dr. Wilson', 3, 'Mathematics');`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">SELECT Statement</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Basic SELECT - All Columns</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`-- Select all columns from students table
SELECT * FROM students;

-- Result:
-- student_id | first_name | last_name | email                | age | major           | gpa
-- 1          | John       | Doe       | john.doe@email.com  | 20  | Computer Science| 3.8
-- 2          | Jane       | Smith     | jane.smith@email.com| 22  | Mathematics     | 3.5
-- 3          | Bob        | Johnson   | bob.johnson@email.com| 19 | Physics        | 3.2
-- 4          | Alice      | Brown     | alice.brown@email.com| 21 | Computer Science| 3.9
-- 5          | Charlie    | Wilson    | charlie.wilson@email.com| 23| Mathematics    | 3.1`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">SELECT Specific Columns</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`-- Select only name and major
SELECT first_name, last_name, major FROM students;

-- Result:
-- first_name | last_name | major
-- John       | Doe       | Computer Science
-- Jane       | Smith     | Mathematics
-- Bob        | Johnson   | Physics
-- Alice      | Brown     | Computer Science
-- Charlie    | Wilson    | Mathematics

-- Select with aliases
SELECT first_name AS "First Name", 
       last_name AS "Last Name", 
       major AS "Field of Study"
FROM students;

-- Result:
-- First Name | Last Name | Field of Study
-- John       | Doe       | Computer Science
-- Jane       | Smith     | Mathematics
-- Bob        | Johnson   | Physics
-- Alice      | Brown     | Computer Science
-- Charlie    | Wilson    | Mathematics`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">WHERE Clause</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Basic WHERE Conditions</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`-- Filter by specific value
SELECT * FROM students WHERE major = 'Computer Science';

-- Result:
-- student_id | first_name | last_name | email               | age | major           | gpa
-- 1          | John       | Doe       | john.doe@email.com | 20  | Computer Science| 3.8
-- 4          | Alice      | Brown     | alice.brown@email.com| 21 | Computer Science| 3.9

-- Filter by numeric comparison
SELECT * FROM students WHERE age >= 21;

-- Result:
-- student_id | first_name | last_name | email                | age | major       | gpa
-- 2          | Jane       | Smith     | jane.smith@email.com | 22  | Mathematics | 3.5
-- 4          | Alice      | Brown     | alice.brown@email.com| 21  | Computer Science| 3.9
-- 5          | Charlie    | Wilson    | charlie.wilson@email.com| 23 | Mathematics | 3.1

-- Filter by GPA range
SELECT first_name, last_name, gpa 
FROM students 
WHERE gpa BETWEEN 3.5 AND 3.9;

-- Result:
-- first_name | last_name | gpa
-- John       | Doe       | 3.8
-- Jane       | Smith     | 3.5
-- Alice      | Brown     | 3.9`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Multiple Conditions with AND/OR</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`-- AND condition
SELECT * FROM students 
WHERE major = 'Computer Science' AND age >= 20;

-- Result:
-- student_id | first_name | last_name | email               | age | major           | gpa
-- 1          | John       | Doe       | john.doe@email.com | 20  | Computer Science| 3.8
-- 4          | Alice      | Brown     | alice.brown@email.com| 21 | Computer Science| 3.9

-- OR condition
SELECT * FROM students 
WHERE major = 'Mathematics' OR major = 'Physics';

-- Result:
-- student_id | first_name | last_name | email                | age | major       | gpa
-- 2          | Jane       | Smith     | jane.smith@email.com | 22  | Mathematics | 3.5
-- 3          | Bob        | Johnson   | bob.johnson@email.com| 19  | Physics     | 3.2
-- 5          | Charlie    | Wilson    | charlie.wilson@email.com| 23 | Mathematics | 3.1

-- Complex conditions with parentheses
SELECT * FROM students 
WHERE (major = 'Computer Science' OR major = 'Mathematics') 
  AND gpa > 3.3;

-- Result:
-- student_id | first_name | last_name | email               | age | major           | gpa
-- 1          | John       | Doe       | john.doe@email.com | 20  | Computer Science| 3.8
-- 2          | Jane       | Smith     | jane.smith@email.com| 22  | Mathematics     | 3.5
-- 4          | Alice      | Brown     | alice.brown@email.com| 21  | Computer Science| 3.9`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Pattern Matching with LIKE</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`-- Names starting with 'J'
SELECT * FROM students 
WHERE first_name LIKE 'J%';

-- Result:
-- student_id | first_name | last_name | email               | age | major       | gpa
-- 1          | John       | Doe       | john.doe@email.com | 20  | Computer Science| 3.8
-- 2          | Jane       | Smith     | jane.smith@email.com| 22  | Mathematics | 3.5

-- Names containing 'on'
SELECT * FROM students 
WHERE first_name LIKE '%on%';

-- Result:
-- student_id | first_name | last_name | email               | age | major           | gpa
-- 1          | John       | Doe       | john.doe@email.com | 20  | Computer Science| 3.8

-- Email addresses from specific domain
SELECT * FROM students 
WHERE email LIKE '%@email.com';

-- Result: (all students since they all have @email.com)
-- student_id | first_name | last_name | email                | age | major           | gpa
-- 1          | John       | Doe       | john.doe@email.com  | 20  | Computer Science| 3.8
-- 2          | Jane       | Smith     | jane.smith@email.com| 22  | Mathematics     | 3.5
-- 3          | Bob        | Johnson   | bob.johnson@email.com| 19 | Physics        | 3.2
-- 4          | Alice      | Brown     | alice.brown@email.com| 21 | Computer Science| 3.9
-- 5          | Charlie    | Wilson    | charlie.wilson@email.com| 23| Mathematics    | 3.1`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">ORDER BY Clause</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Sorting Results</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`-- Sort by GPA in descending order
SELECT first_name, last_name, gpa 
FROM students 
ORDER BY gpa DESC;

-- Result:
-- first_name | last_name | gpa
-- Alice      | Brown     | 3.9
-- John       | Doe       | 3.8
-- Jane       | Smith     | 3.5
-- Bob        | Johnson   | 3.2
-- Charlie    | Wilson    | 3.1

-- Sort by age in ascending order
SELECT first_name, last_name, age 
FROM students 
ORDER BY age ASC;

-- Result:
-- first_name | last_name | age
-- Bob        | Johnson   | 19
-- John       | Doe       | 20
-- Alice      | Brown     | 21
-- Jane       | Smith     | 22
-- Charlie    | Wilson    | 23

-- Multiple column sorting
SELECT first_name, last_name, major, gpa 
FROM students 
ORDER BY major ASC, gpa DESC;

-- Result:
-- first_name | last_name | major           | gpa
-- Alice      | Brown     | Computer Science| 3.9
-- John       | Doe       | Computer Science| 3.8
-- Jane       | Smith     | Mathematics     | 3.5
-- Charlie    | Wilson    | Mathematics     | 3.1
-- Bob        | Johnson   | Physics         | 3.2`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">LIMIT Clause</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Limiting Results</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`-- Get top 3 students by GPA
SELECT first_name, last_name, gpa 
FROM students 
ORDER BY gpa DESC 
LIMIT 3;

-- Result:
-- first_name | last_name | gpa
-- Alice      | Brown     | 3.9
-- John       | Doe       | 3.8
-- Jane       | Smith     | 3.5

-- Get oldest 2 students
SELECT first_name, last_name, age 
FROM students 
ORDER BY age DESC 
LIMIT 2;

-- Result:
-- first_name | last_name | age
-- Charlie    | Wilson    | 23
-- Jane       | Smith     | 22

-- Skip first 2 and get next 3 (OFFSET)
SELECT first_name, last_name, gpa 
FROM students 
ORDER BY gpa DESC 
LIMIT 3 OFFSET 2;

-- Result:
-- first_name | last_name | gpa
-- Bob        | Johnson   | 3.2
-- Charlie    | Wilson    | 3.1`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Practical Examples</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Student Search System</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`-- Find all Computer Science students with high GPA
SELECT CONCAT(first_name, ' ', last_name) AS full_name,
       email,
       gpa,
       CASE 
           WHEN gpa >= 3.8 THEN 'Excellent'
           WHEN gpa >= 3.5 THEN 'Good'
           WHEN gpa >= 3.0 THEN 'Average'
           ELSE 'Below Average'
       END AS performance_level
FROM students 
WHERE major = 'Computer Science'
ORDER BY gpa DESC;

-- Result:
-- full_name    | email               | gpa | performance_level
-- Alice Brown  | alice.brown@email.com| 3.9 | Excellent
-- John Doe     | john.doe@email.com  | 3.8 | Excellent

-- Find students by age range and major
SELECT first_name, last_name, age, major
FROM students 
WHERE age BETWEEN 20 AND 22 
  AND major IN ('Computer Science', 'Mathematics')
ORDER BY age, last_name;

-- Result:
-- first_name | last_name | age | major
-- John       | Doe       | 20  | Computer Science
-- Alice      | Brown     | 21  | Computer Science
-- Jane       | Smith     | 22  | Mathematics

-- Search for students by name pattern
SELECT first_name, last_name, email, major
FROM students 
WHERE first_name LIKE 'J%' OR last_name LIKE '%son'
ORDER BY first_name;

-- Result:
-- first_name | last_name | email               | major
-- Jane       | Smith     | jane.smith@email.com| Mathematics
-- John       | Doe       | john.doe@email.com | Computer Science
-- Bob        | Johnson   | bob.johnson@email.com| Physics`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Course Information Queries</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`-- Get all Computer Science courses
SELECT course_name, instructor, credits
FROM courses 
WHERE department = 'Computer Science'
ORDER BY course_name;

-- Result:
-- course_name              | instructor | credits
-- Data Structures          | Dr. Davis  | 3
-- Introduction to Programming| Dr. Smith | 3

-- Find courses with high credit hours
SELECT course_name, department, credits
FROM courses 
WHERE credits >= 4
ORDER BY credits DESC;

-- Result:
-- course_name      | department | credits
-- Physics Mechanics| Physics    | 4
-- Calculus I       | Mathematics| 4

-- Search courses by instructor name
SELECT course_name, department, credits
FROM courses 
WHERE instructor LIKE 'Dr. %'
ORDER BY department, course_name;

-- Result:
-- course_name              | department | credits
-- Introduction to Programming| Computer Science | 3
-- Data Structures          | Computer Science | 3
-- Linear Algebra           | Mathematics     | 3
-- Calculus I               | Mathematics     | 4
-- Physics Mechanics        | Physics         | 4`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Link href="/sql/basics/introduction" className="bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 transition">
            ← Previous: SQL Introduction
          </Link>
          <Link href="/sql/basics/data-types" className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition">
            Next: Data Types & Constraints →
          </Link>
        </div>
      </section>
    </main>
  );
}
