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
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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