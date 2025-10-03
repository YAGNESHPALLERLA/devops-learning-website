'use client';

import { useState } from 'react';
import TechLayout from '@/components/tech-layout';
import VideoSection from '@/components/VideoSection';
import { getVideosForTopic } from '@/data/videoTutorials';

export default function PythonPage() {
  const [activeSection, setActiveSection] = useState('introduction');

  const pageHeadings = [
    { id: 'introduction', title: 'Python Introduction' },
    { id: 'syntax-indentation', title: 'Syntax & Indentation' },
    { id: 'variables-data-types', title: 'Variables & Data Types' },
    { id: 'operators', title: 'Type Casting & Operators' },
    { id: 'conditionals', title: 'Conditionals' },
    { id: 'loops', title: 'Loops' },
    { id: 'strings', title: 'Strings' },
    { id: 'data-structures', title: 'Data Structures' },
    { id: 'functions', title: 'Functions' },
    { id: 'oop', title: 'Object-Oriented Programming' },
    { id: 'file-handling', title: 'File Handling' },
    { id: 'exception-handling', title: 'Exception Handling' },
    { id: 'modules-packages', title: 'Modules & Packages' },
    { id: 'advanced-concepts', title: 'Advanced Concepts' },
    { id: 'video-tutorials', title: 'Video Tutorials' },
    { id: 'practice-projects', title: 'Practice Projects' },
    { id: 'summary', title: 'Summary' },
  ];

  const pythonVideos = getVideosForTopic('python');

  const renderContent = () => {
    switch (activeSection) {
      case 'introduction':
        return (
          <div className="animate-fade-in-up">
            <h1 id="introduction" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Python Programming
            </h1>
            
            <div className="max-w-6xl mx-auto">
          <div className="gradient-border hover-lift mb-8">
            <div className="bg-gradient-to-r from-green-900/50 to-blue-900/50 p-8 rounded-xl">
              <h2 className="text-3xl font-bold text-green-400 mb-4 neon-glow">Goal</h2>
              <p className="text-white text-xl">Master Python programming from basics to advanced concepts and applications.</p>
            </div>
          </div>

          <h2 id="introduction" className="text-3xl font-bold text-green-400 mb-6">1. Python Introduction</h2>
          
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift">
            <h3 className="text-2xl font-bold text-blue-400 mb-6 neon-glow">What is Python?</h3>
            <div className="space-y-6 mb-8">
              <div className="bg-gradient-to-r from-green-900/50 to-green-800/50 border border-green-500/30 p-6 rounded-xl hover-glow-accent">
                <p className="text-green-300 font-semibold text-lg">✅ High-Level Language</p>
                <p className="text-gray-300 text-sm mt-2">Easy to read and write</p>
              </div>
              <div className="bg-gradient-to-r from-blue-900/50 to-blue-800/50 border border-blue-500/30 p-6 rounded-xl hover-glow-accent">
                <p className="text-blue-300 font-semibold text-lg">✅ Interpreted</p>
                <p className="text-gray-300 text-sm mt-2">No compilation needed</p>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-blue-400 mb-4">Key Features:</h3>
            <ul className="text-gray-300 space-y-2 mb-4">
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                <strong>Simple Syntax:</strong> Clean and readable code
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                <strong>Cross-Platform:</strong> Runs on Windows, Mac, Linux
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                <strong>Large Standard Library:</strong> Built-in modules for common tasks
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                <strong>Dynamic Typing:</strong> No need to declare variable types
              </li>
            </ul>
            
            <div className="bg-yellow-900 border border-yellow-700 p-4 rounded-lg">
              <p className="text-yellow-300 font-semibold">📌 Python is used in web development, data science, AI/ML, automation, and scientific computing</p>
            </div>
            </div>
            </div>
          </div>
        );
      
      case 'syntax-indentation':
        return (
          <div className="animate-fade-in-up">
            <h1 id="syntax-indentation" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Syntax & Indentation
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn Python's unique syntax and indentation rules
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="syntax-indentation" className="text-3xl font-bold text-green-400 mb-6">2. Syntax & Indentation</h2>
              
              <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift hover:ring-2 hover:ring-green-500/30 hover:ring-opacity-50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-green-400 mb-6 neon-glow">What Makes Python Special?</h3>
                <p className="text-gray-300 mb-6 text-lg">
                  Python's syntax is designed to be readable and straightforward. Unlike many programming languages that use braces {} to define code blocks, 
                  Python uses indentation (whitespace) to indicate the structure of code. This makes Python code more readable and forces programmers to write clean, well-formatted code.
                </p>
                
                <div className="bg-yellow-900 border border-yellow-700 p-4 rounded-lg mb-6">
                  <p className="text-yellow-300 font-semibold">📌 Python's philosophy: "Code is read more often than it is written." This is why Python emphasizes readability and clean syntax.</p>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">1. Indentation Rules</h3>
                <p className="text-gray-300 mb-6">Indentation is crucial in Python - it defines code blocks instead of braces.</p>
                
                <div className="space-y-6 mb-8">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">Basic Indentation</h4>
                    <p className="text-gray-300 mb-4">Use 4 spaces (recommended) or 1 tab for each indentation level. Be consistent!</p>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`# Correct indentation
if x > 0:
    print("Positive")  # 4 spaces
    print("Number is greater than 0")  # 4 spaces
    if x > 10:
        print("Very positive")  # 8 spaces (2 levels)
else:
    print("Negative or zero")  # 4 spaces

# Incorrect indentation (will cause IndentationError)
if x > 0:
print("This will cause an error")  # No indentation`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">Indentation in Functions</h4>
                    <p className="text-gray-300 mb-4">Function bodies must be indented to define the function's scope.</p>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`def greet(name):
    """This is a docstring - also indented"""
    message = f"Hello, {name}!"  # Function body indented
    print(message)
    return message

def calculate_area(length, width):
    area = length * width  # Function body indented
    if area > 100:
        print("Large area!")  # Nested indentation
    return area

# Function call (not indented)
result = greet("Alice")
area = calculate_area(10, 20)`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">2. Comments and Docstrings</h3>
                <p className="text-gray-300 mb-6">Python supports different types of comments for documentation and code explanation.</p>
                
                <div className="space-y-6 mb-8">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">Single-line Comments</h4>
                    <p className="text-gray-300 mb-4">Use # for single-line comments. Everything after # on that line is ignored.</p>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`# This is a single-line comment
name = "Python"  # Inline comment
age = 30

# Multiple single-line comments
# for longer explanations
# that span multiple lines

# Variables don't need type declaration
# Python infers types automatically
price = 19.99  # float
is_available = True  # boolean
items = ["apple", "banana"]  # list`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">Multi-line Comments & Docstrings</h4>
                    <p className="text-gray-300 mb-4">Use triple quotes for multi-line comments and docstrings.</p>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`"""
This is a multi-line comment
or docstring at the module level
It can span multiple lines
"""

def calculate_tax(amount, rate=0.1):
    """
    Calculate tax on an amount.
    
    Args:
        amount (float): The base amount
        rate (float): Tax rate (default 0.1)
    
    Returns:
        float: The calculated tax amount
    
    Example:
        >>> calculate_tax(100, 0.15)
        15.0
    """
    return amount * rate

# Multi-line comment for complex logic
"""
This function handles complex calculations
that require multiple steps:
1. Validate input
2. Perform calculation
3. Format result
"""`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">3. Python Keywords and Identifiers</h3>
                <p className="text-gray-300 mb-6">Understanding Python's reserved words and naming conventions.</p>
                
                <div className="space-y-6">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">Python Keywords</h4>
                    <p className="text-gray-300 mb-4">These are reserved words that have special meaning in Python.</p>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`# Common Python keywords
# Control flow
if, elif, else, for, while, break, continue, pass

# Function and class definition
def, class, return, yield, lambda

# Exception handling
try, except, finally, raise, assert

# Import and module
import, from, as, with

# Logical operators
and, or, not, in, is

# Data types
True, False, None

# Example usage
if True and not False:
    for i in range(5):
        if i == 3:
            break
        print(i)`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">Naming Conventions</h4>
                    <p className="text-gray-300 mb-4">Follow PEP 8 naming conventions for clean, readable code.</p>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`# Variable names: snake_case
user_name = "Alice"
total_count = 100
is_valid = True

# Function names: snake_case
def calculate_total():
    pass

def get_user_info():
    pass

# Class names: PascalCase
class UserAccount:
    pass

class DatabaseConnection:
    pass

# Constants: UPPER_SNAKE_CASE
MAX_CONNECTIONS = 100
DEFAULT_TIMEOUT = 30

# Private attributes: leading underscore
class MyClass:
    def __init__(self):
        self._private_var = "hidden"
        self.__very_private = "very hidden"`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">4. Line Continuation and Multiple Statements</h3>
                <p className="text-gray-300 mb-6">Python provides several ways to handle long lines and multiple statements.</p>
                
                <div className="space-y-6">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">Line Continuation</h4>
                    <p className="text-gray-300 mb-4">Break long lines using backslash or parentheses.</p>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`# Using backslash for line continuation
total = 10 + 20 + 30 + 40 + 50 + \
        60 + 70 + 80 + 90 + 100

# Using parentheses (preferred)
total = (10 + 20 + 30 + 40 + 50 +
         60 + 70 + 80 + 90 + 100)

# Long function call
result = some_function(
    argument1,
    argument2,
    argument3,
    argument4
)

# Long string
message = ("This is a very long string "
          "that spans multiple lines "
          "for better readability")`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">Multiple Statements</h4>
                    <p className="text-gray-300 mb-4">Use semicolons to put multiple statements on one line.</p>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`# Multiple statements on one line
x = 10; y = 20; z = 30

# Multiple assignments
a, b, c = 1, 2, 3

# Swap variables
x, y = y, x

# Multiple return values
def get_name_and_age():
    return "Alice", 25

name, age = get_name_and_age()

# Unpacking
numbers = [1, 2, 3, 4, 5]
first, *middle, last = numbers
print(first)    # 1
print(middle)   # [2, 3, 4]
print(last)     # 5`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-6 rounded-lg border border-blue-500/30 mb-8">
                <h3 className="text-xl font-bold text-blue-400 mb-4">Best Practices</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• <strong>Use 4 spaces for indentation</strong> - never mix spaces and tabs</li>
                  <li>• <strong>Keep lines under 79 characters</strong> for better readability</li>
                  <li>• <strong>Use meaningful variable names</strong> that describe their purpose</li>
                  <li>• <strong>Write docstrings</strong> for functions, classes, and modules</li>
                  <li>• <strong>Follow PEP 8 style guide</strong> for consistent code formatting</li>
                  <li>• <strong>Use comments sparingly</strong> - code should be self-explanatory</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift hover:ring-2 hover:ring-green-500/30 hover:ring-opacity-50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-green-400 mb-6 neon-glow">Practical Example: Python Syntax in Action</h3>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 mb-6">
                  <h4 className="text-lg font-bold text-blue-400 mb-4">syntax_example.py</h4>
                  <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`#!/usr/bin/env python3
"""
Python Syntax Example
Demonstrates proper indentation, comments, and naming conventions
"""

# Constants
MAX_ATTEMPTS = 3
DEFAULT_TIMEOUT = 30

class UserManager:
    """Manages user operations with proper syntax and documentation."""
    
    def __init__(self):
        self.users = []
        self._current_user = None
    
    def add_user(self, name, email, age):
        """
        Add a new user to the system.
        
        Args:
            name (str): User's full name
            email (str): User's email address
            age (int): User's age
        
        Returns:
            bool: True if user was added successfully
        """
        # Validate input
        if not name or not email:
            print("Error: Name and email are required")
            return False
        
        if age < 0 or age > 150:
            print("Error: Invalid age")
            return False
        
        # Create user dictionary
        user = {
            'name': name,
            'email': email,
            'age': age,
            'active': True
        }
        
        self.users.append(user)
        print(f"User {name} added successfully")
        return True
    
    def find_user(self, email):
        """Find user by email address."""
        for user in self.users:
            if user['email'] == email:
                return user
        return None
    
    def activate_user(self, email):
        """Activate a user account."""
        user = self.find_user(email)
        if user:
            user['active'] = True
            print(f"User {user['name']} activated")
            return True
        else:
            print("User not found")
            return False

def main():
    """Main function demonstrating Python syntax."""
    print("=== Python Syntax Example ===")
    
    # Create user manager instance
    manager = UserManager()
    
    # Add users with proper indentation
    users_data = [
        ("Alice Johnson", "alice@example.com", 25),
        ("Bob Smith", "bob@example.com", 30),
        ("Charlie Brown", "charlie@example.com", 28)
    ]
    
    # Process users
    for name, email, age in users_data:
        success = manager.add_user(name, email, age)
        if success:
            print(f"✓ {name} registered")
        else:
            print(f"✗ Failed to register {name}")
    
    # Demonstrate control flow with proper indentation
    print("\\n=== User Search ===")
    search_emails = ["alice@example.com", "nonexistent@example.com"]
    
    for email in search_emails:
        user = manager.find_user(email)
        if user:
            print(f"Found: {user['name']} ({user['age']} years old)")
        else:
            print(f"User with email {email} not found")
    
    # Demonstrate conditional logic
    print("\\n=== User Status Check ===")
    for user in manager.users:
        status = "Active" if user['active'] else "Inactive"
        print(f"{user['name']}: {status}")

if __name__ == "__main__":
    main()`}
                  </pre>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-green-900/30 border border-green-500/30 p-4 rounded-lg">
                    <h4 className="text-green-300 font-bold mb-2">🎯 Key Syntax Elements</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Proper indentation (4 spaces)</li>
                      <li>• Docstrings for documentation</li>
                      <li>• Snake_case naming convention</li>
                      <li>• Type hints in docstrings</li>
                      <li>• Proper comment usage</li>
                      <li>• Clean function structure</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-900/30 border border-blue-500/30 p-4 rounded-lg">
                    <h4 className="text-blue-300 font-bold mb-2">📊 Sample Output</h4>
                    <div className="bg-gray-900 p-3 rounded text-sm">
                      <pre className="text-green-400 font-mono">
{`=== Python Syntax Example ===
User Alice Johnson added successfully
✓ Alice Johnson registered
User Bob Smith added successfully
✓ Bob Smith registered
User Charlie Brown added successfully
✓ Charlie Brown registered

=== User Search ===
Found: Alice Johnson (25 years old)
User with email nonexistent@example.com not found

=== User Status Check ===
Alice Johnson: Active
Bob Smith: Active
Charlie Brown: Active`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'variables-data-types':
        return (
          <div className="animate-fade-in-up">
            <h1 id="variables-data-types" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Variables & Data Types
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn about Python variables and data types
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="variables-data-types" className="text-3xl font-bold text-green-400 mb-6">3. Variables & Data Types</h2>
              
              <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift hover:ring-2 hover:ring-green-500/30 hover:ring-opacity-50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-green-400 mb-6 neon-glow">Understanding Python Variables and Data Types</h3>
                <p className="text-gray-300 mb-6 text-lg">
                  Python is dynamically typed, meaning you don't need to declare variable types explicitly. 
                  The interpreter automatically determines the type based on the value assigned. Python supports 
                  various built-in data types for different kinds of data.
                </p>
                
                <div className="bg-yellow-900 border border-yellow-700 p-4 rounded-lg mb-6">
                  <p className="text-yellow-300 font-semibold">📌 Python variables are references to objects in memory. Understanding data types is crucial for writing efficient and correct Python code.</p>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">1. Numeric Data Types</h3>
                <p className="text-gray-300 mb-6">Python supports three numeric types: integers, floating-point numbers, and complex numbers.</p>
                
                <div className="space-y-6 mb-8">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">Integer (int)</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`# Integer examples
age = 25                    # Positive integer
temperature = -10           # Negative integer
population = 1000000        # Large integer
binary = 0b1010            # Binary literal (10 in decimal)
octal = 0o755              # Octal literal (493 in decimal)
hexadecimal = 0xFF         # Hexadecimal literal (255 in decimal)

# Integer operations
a = 10
b = 3
print(a + b)               # 13 (addition)
print(a - b)               # 7 (subtraction)
print(a * b)               # 30 (multiplication)
print(a / b)               # 3.333... (division - returns float)
print(a // b)              # 3 (floor division)
print(a % b)               # 1 (modulo)
print(a ** b)              # 1000 (exponentiation)

# Type checking
print(type(age))           # <class 'int'>
print(isinstance(age, int)) # True`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">Float (float)</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`# Float examples
pi = 3.14159               # Standard float
e = 2.718281828459045      # High precision float
scientific = 1.23e4        # Scientific notation (12300.0)
negative = -0.5            # Negative float
zero = 0.0                 # Zero as float

# Float operations
x = 10.5
y = 3.2
print(x + y)               # 13.7
print(x - y)               # 7.3
print(x * y)               # 33.6
print(x / y)               # 3.28125
print(x // y)              # 3.0 (floor division)
print(x % y)               # 0.9 (modulo)
print(x ** y)              # 1334.96... (exponentiation)

# Float precision issues
result = 0.1 + 0.2
print(result)              # 0.30000000000000004 (floating point precision)
print(round(result, 2))    # 0.3 (round to 2 decimal places)

# Type conversion
int_value = int(3.9)       # 3 (truncates decimal)
float_value = float(42)    # 42.0`}
                    </pre>
                  </div>
                </div>
                
                <div className="bg-gray-700 p-6 rounded border border-gray-600">
                  <h4 className="font-bold text-purple-400 mb-4 text-lg">Complex Numbers</h4>
                  <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`# Complex number examples
z1 = 3 + 4j                # Complex number (3 + 4i)
z2 = complex(2, 5)         # Using complex() constructor
z3 = 1j                    # Pure imaginary number

# Complex number operations
print(z1 + z2)             # (5+9j) - addition
print(z1 - z2)             # (1-1j) - subtraction
print(z1 * z2)             # (-14+23j) - multiplication
print(z1 / z2)             # (0.6896551724137931+0.1724137931034483j) - division
print(z1 ** 2)             # (-7+24j) - exponentiation

# Accessing real and imaginary parts
print(z1.real)             # 3.0 - real part
print(z1.imag)             # 4.0 - imaginary part
print(abs(z1))             # 5.0 - magnitude (sqrt(3² + 4²))

# Type checking
print(type(z1))            # <class 'complex'>`}
                  </pre>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">2. Text Data Type (String)</h3>
                <p className="text-gray-300 mb-6">Strings in Python are sequences of characters and are immutable.</p>
                
                <div className="space-y-6">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">String Creation</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`# Different ways to create strings
single_quote = 'Hello World'
double_quote = "Hello World"
triple_quote = """Multi-line
string with
line breaks"""
raw_string = r"C:\\Users\\Name"  # Raw string (no escape processing)

# String concatenation
first_name = "John"
last_name = "Doe"
full_name = first_name + " " + last_name  # "John Doe"

# String repetition
stars = "*" * 10            # "**********"
separator = "-" * 50        # "--------------------------------------------------"

# String formatting (f-strings - Python 3.6+)
name = "Alice"
age = 30
message = f"Hello, {name}! You are {age} years old."

# String formatting (format method)
message2 = "Hello, {}! You are {} years old.".format(name, age)
message3 = "Hello, {name}! You are {age} years old.".format(name=name, age=age)

# String formatting (old style - %)
message4 = "Hello, %s! You are %d years old." % (name, age)`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">String Methods</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`text = "  Hello World  "

# Case methods
print(text.upper())         # "  HELLO WORLD  "
print(text.lower())         # "  hello world  "
print(text.title())         # "  Hello World  "
print(text.capitalize())    # "  hello world  "
print(text.swapcase())      # "  hELLO wORLD  "

# Whitespace methods
print(text.strip())         # "Hello World" - remove leading/trailing whitespace
print(text.lstrip())        # "Hello World  " - remove leading whitespace
print(text.rstrip())        # "  Hello World" - remove trailing whitespace

# Search methods
print(text.find("World"))   # 8 - find substring
print(text.count("l"))      # 3 - count occurrences
print(text.startswith("Hello")) # False (due to leading spaces)
print(text.endswith("World"))   # False (due to trailing spaces)

# Replace and split
print(text.replace("World", "Python"))  # "  Hello Python  "
words = text.strip().split()            # ["Hello", "World"]
joined = "-".join(words)                # "Hello-World"

# String properties
print(len(text))            # 14 - length
print(text[0])              # " " - first character
print(text[-1])             # " " - last character
print(text[2:7])            # "Hello" - slicing`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">3. Boolean Data Type</h3>
                <p className="text-gray-300 mb-6">Boolean values represent truth values: True or False.</p>
                
                <div className="space-y-6">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">Boolean Values and Operations</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`# Boolean values
is_student = True
is_working = False

# Boolean operations
print(True and True)        # True
print(True and False)       # False
print(True or False)        # True
print(not True)             # False
print(not False)            # True

# Truthiness in Python
print(bool(1))              # True - non-zero numbers are truthy
print(bool(0))              # False - zero is falsy
print(bool("hello"))        # True - non-empty strings are truthy
print(bool(""))             # False - empty strings are falsy
print(bool([]))             # False - empty lists are falsy
print(bool([1, 2, 3]))      # True - non-empty lists are truthy
print(bool(None))           # False - None is falsy

# Comparison operators return booleans
age = 25
print(age > 18)             # True
print(age == 25)            # True
print(age != 30)            # True
print(age >= 25)            # True
print(age < 30)             # True
print(age <= 25)            # True`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">Boolean in Control Flow</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`# Boolean in conditional statements
def check_age(age):
    if age >= 18:
        return True
    else:
        return False

# Shorter version
def check_age_short(age):
    return age >= 18

# Boolean with if statements
name = "Alice"
if name:  # This checks if name is truthy
    print(f"Hello, {name}!")

# Boolean with while loops
count = 0
while count < 5:  # This continues while count < 5 is True
    print(f"Count: {count}")
    count += 1

# Boolean with list comprehensions
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_numbers = [x for x in numbers if x % 2 == 0]  # [2, 4, 6, 8, 10]

# Boolean functions
def is_even(number):
    return number % 2 == 0

def is_positive(number):
    return number > 0

# Usage
print(is_even(4))           # True
print(is_even(7))           # False
print(is_positive(5))       # True
print(is_positive(-3))      # False`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">4. Sequence Data Types</h3>
                <p className="text-gray-300 mb-6">Python has several built-in sequence types: lists, tuples, and ranges.</p>
                
                <div className="space-y-6">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">List (Mutable Sequence)</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`# List creation
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]

# List operations
fruits.append("grape")      # Add to end
fruits.insert(1, "mango")   # Insert at index 1
fruits.remove("banana")     # Remove first occurrence
fruits.pop()                # Remove and return last item
fruits.pop(0)               # Remove and return item at index 0

# List slicing
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print(numbers[2:5])         # [2, 3, 4] - slice from index 2 to 4
print(numbers[:3])          # [0, 1, 2] - slice from start to index 2
print(numbers[3:])          # [3, 4, 5, 6, 7, 8, 9] - slice from index 3 to end
print(numbers[::2])         # [0, 2, 4, 6, 8] - every second element
print(numbers[::-1])        # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0] - reverse

# List methods
numbers.sort()              # Sort in place
numbers.reverse()           # Reverse in place
print(len(numbers))         # Length
print(numbers.count(5))     # Count occurrences
print(numbers.index(3))     # Find index of first occurrence`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">Tuple (Immutable Sequence)</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`# Tuple creation
coordinates = (10, 20)
colors = ("red", "green", "blue")
single_item = (42,)         # Note the comma for single-item tuple
empty_tuple = ()

# Tuple operations
print(coordinates[0])       # 10 - access by index
print(coordinates[1])       # 20
print(len(coordinates))     # 2 - length
print(colors.count("red"))  # 1 - count occurrences
print(colors.index("green")) # 1 - find index

# Tuple unpacking
x, y = coordinates          # x = 10, y = 20
r, g, b = colors            # r = "red", g = "green", b = "blue"

# Multiple assignment
a, b, c = 1, 2, 3           # a = 1, b = 2, c = 3

# Tuple concatenation
tuple1 = (1, 2, 3)
tuple2 = (4, 5, 6)
combined = tuple1 + tuple2  # (1, 2, 3, 4, 5, 6)

# Tuple repetition
repeated = (1, 2) * 3       # (1, 2, 1, 2, 1, 2)

# Tuple slicing (same as lists)
numbers = (0, 1, 2, 3, 4, 5)
print(numbers[2:4])         # (2, 3)
print(numbers[:3])          # (0, 1, 2)
print(numbers[3:])          # (3, 4, 5)`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">5. Mapping and Set Data Types</h3>
                <p className="text-gray-300 mb-6">Python provides dictionaries for key-value mappings and sets for unique collections.</p>
                
                <div className="space-y-6">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">Dictionary (dict)</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`# Dictionary creation
person = {
    "name": "Alice",
    "age": 30,
    "city": "New York"
}

# Dictionary operations
person["email"] = "alice@example.com"  # Add new key-value pair
person["age"] = 31                     # Update existing value
print(person["name"])                  # "Alice" - access value
print(person.get("phone", "N/A"))      # "N/A" - get with default

# Dictionary methods
print(person.keys())                   # dict_keys(['name', 'age', 'city', 'email'])
print(person.values())                 # dict_values(['Alice', 31, 'New York', 'alice@example.com'])
print(person.items())                  # dict_items([('name', 'Alice'), ('age', 31), ...])

# Dictionary iteration
for key in person:
    print(f"{key}: {person[key]}")

for key, value in person.items():
    print(f"{key}: {value}")

# Dictionary comprehension
squares = {x: x**2 for x in range(1, 6)}  # {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">Set (frozenset)</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`# Set creation
fruits = {"apple", "banana", "orange"}
numbers = {1, 2, 3, 4, 5}
empty_set = set()           # Note: {} creates empty dict, not set

# Set operations
fruits.add("grape")         # Add element
fruits.remove("banana")     # Remove element (raises KeyError if not found)
fruits.discard("kiwi")      # Remove element (no error if not found)
fruits.pop()                # Remove and return arbitrary element

# Set methods
set1 = {1, 2, 3, 4, 5}
set2 = {4, 5, 6, 7, 8}

print(set1.union(set2))         # {1, 2, 3, 4, 5, 6, 7, 8}
print(set1.intersection(set2))  # {4, 5}
print(set1.difference(set2))    # {1, 2, 3}
print(set1.symmetric_difference(set2))  # {1, 2, 3, 6, 7, 8}

# Set membership
print(3 in set1)             # True
print(9 not in set1)         # True

# Set comprehension
even_squares = {x**2 for x in range(1, 11) if x % 2 == 0}  # {4, 16, 36, 64, 100}`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-6 rounded-lg border border-blue-500/30 mb-8">
                <h3 className="text-xl font-bold text-blue-400 mb-4">Type Checking and Conversion</h3>
                <div className="space-y-6">
                  <div className="bg-gray-800 p-4 rounded">
                    <h4 className="text-green-400 font-bold mb-2">Type Checking</h4>
                    <pre className="text-green-400 font-mono text-sm">
{`# Check variable type
x = 42
print(type(x))              # <class 'int'>
print(isinstance(x, int))   # True
print(isinstance(x, str))   # False

# Check multiple types
value = "hello"
print(isinstance(value, (str, int)))  # True`}
                    </pre>
                  </div>
                  <div className="bg-gray-800 p-4 rounded">
                    <h4 className="text-blue-400 font-bold mb-2">Type Conversion</h4>
                    <pre className="text-green-400 font-mono text-sm">
{`# Convert between types
num_str = "123"
num_int = int(num_str)      # 123
num_float = float(num_str)  # 123.0

# Convert to string
age = 25
age_str = str(age)          # "25"

# Convert to boolean
print(bool(1))              # True
print(bool(0))              # False
print(bool(""))             # False
print(bool("hello"))        # True`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift hover:ring-2 hover:ring-green-500/30 hover:ring-opacity-50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-green-400 mb-6 neon-glow">Practical Example: Data Type Analyzer</h3>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 mb-6">
                  <h4 className="text-lg font-bold text-blue-400 mb-4">data_type_analyzer.py</h4>
                  <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`#!/usr/bin/env python3
"""
Comprehensive data type analyzer demonstrating Python's dynamic typing
"""

def analyze_data_type(value, name="value"):
    """Analyze and display information about a Python data type"""
    print(f"\\n=== Analyzing {name} ===")
    print(f"Value: {value}")
    print(f"Type: {type(value)}")
    print(f"Type name: {type(value).__name__}")
    print(f"Memory address: {id(value)}")
    
    # Type-specific analysis
    if isinstance(value, (int, float, complex)):
        print(f"Numeric type: {type(value).__name__}")
        if isinstance(value, int):
            print(f"Binary: {bin(value)}")
            print(f"Octal: {oct(value)}")
            print(f"Hexadecimal: {hex(value)}")
        elif isinstance(value, float):
            print(f"Scientific notation: {value:e}")
            print(f"Fixed point: {value:.2f}")
        elif isinstance(value, complex):
            print(f"Real part: {value.real}")
            print(f"Imaginary part: {value.imag}")
            print(f"Magnitude: {abs(value)}")
    
    elif isinstance(value, str):
        print(f"Length: {len(value)}")
        print(f"Character count: {len(value)}")
        print(f"Word count: {len(value.split())}")
        print(f"Uppercase: {value.upper()}")
        print(f"Lowercase: {value.lower()}")
        print(f"Is digit: {value.isdigit()}")
        print(f"Is alpha: {value.isalpha()}")
        print(f"Is alnum: {value.isalnum()}")
    
    elif isinstance(value, (list, tuple)):
        print(f"Length: {len(value)}")
        print(f"Element types: {[type(item).__name__ for item in value]}")
        if value:
            print(f"First element: {value[0]}")
            print(f"Last element: {value[-1]}")
    
    elif isinstance(value, dict):
        print(f"Number of keys: {len(value)}")
        print(f"Keys: {list(value.keys())}")
        print(f"Values: {list(value.values())}")
        print(f"Items: {list(value.items())}")
    
    elif isinstance(value, set):
        print(f"Number of elements: {len(value)}")
        print(f"Elements: {sorted(value) if value else 'Empty set'}")
    
    elif isinstance(value, bool):
        print(f"Boolean value: {value}")
        print(f"Truthiness: {bool(value)}")
    
    else:
        print(f"Custom or unknown type: {type(value)}")

def demonstrate_type_conversion():
    """Demonstrate various type conversions"""
    print("\\n" + "="*50)
    print("TYPE CONVERSION EXAMPLES")
    print("="*50)
    
    # String to numeric
    num_str = "123"
    print(f"\\nString '{num_str}' conversions:")
    print(f"int('{num_str}'): {int(num_str)}")
    print(f"float('{num_str}'): {float(num_str)}")
    
    # Numeric to string
    number = 42
    print(f"\\nNumber {number} conversions:")
    print(f"str({number}): '{str(number)}'")
    print(f"repr({number}): {repr(number)}")
    
    # List conversions
    data = [1, 2, 3, 4, 5]
    print(f"\\nList {data} conversions:")
    print(f"tuple(data): {tuple(data)}")
    print(f"set(data): {set(data)}")
    print(f"str(data): '{str(data)}'")
    
    # String to list
    text = "hello world"
    print(f"\\nString '{text}' conversions:")
    print(f"list(text): {list(text)}")
    print(f"text.split(): {text.split()}")

def demonstrate_truthiness():
    """Demonstrate Python's truthiness concept"""
    print("\\n" + "="*50)
    print("TRUTHINESS EXAMPLES")
    print("="*50)
    
    test_values = [
        0, 1, -1, 0.0, 3.14,
        "", "hello", " ",
        [], [1, 2, 3],
        {}, {"key": "value"},
        set(), {1, 2, 3},
        None, True, False
    ]
    
    for value in test_values:
        print(f"{repr(value):>15} -> {bool(value)}")

def main():
    """Main function to demonstrate data type analysis"""
    print("🐍 PYTHON DATA TYPE ANALYZER")
    print("="*50)
    
    # Analyze different data types
    analyze_data_type(42, "integer")
    analyze_data_type(3.14159, "float")
    analyze_data_type(3 + 4j, "complex")
    analyze_data_type("Hello, World!", "string")
    analyze_data_type(True, "boolean")
    analyze_data_type([1, 2, 3, "hello"], "list")
    analyze_data_type((1, 2, 3, "hello"), "tuple")
    analyze_data_type({"name": "Alice", "age": 30}, "dictionary")
    analyze_data_type({1, 2, 3, 4, 5}, "set")
    analyze_data_type(None, "None")
    
    # Demonstrate type conversion
    demonstrate_type_conversion()
    
    # Demonstrate truthiness
    demonstrate_truthiness()
    
    print("\\n" + "="*50)
    print("ANALYSIS COMPLETE!")
    print("="*50)

if __name__ == "__main__":
    main()`}
                  </pre>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-green-900/30 border border-green-500/30 p-4 rounded-lg">
                    <h4 className="text-green-300 font-bold mb-2">🎯 Features Demonstrated</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Dynamic type checking and analysis</li>
                      <li>• Type conversion between different types</li>
                      <li>• Truthiness evaluation</li>
                      <li>• Memory address inspection</li>
                      <li>• Type-specific operations and methods</li>
                      <li>• Comprehensive data type exploration</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-900/30 border border-blue-500/30 p-4 rounded-lg">
                    <h4 className="text-blue-300 font-bold mb-2">📊 Sample Output</h4>
                    <div className="bg-gray-900 p-3 rounded text-sm">
                      <pre className="text-green-400 font-mono">
{`🐍 PYTHON DATA TYPE ANALYZER
==================================================

=== Analyzing integer ===
Value: 42
Type: <class 'int'>
Type name: int
Memory address: 140123456789
Numeric type: int
Binary: 0b101010
Octal: 0o52
Hexadecimal: 0x2a

=== Analyzing string ===
Value: Hello, World!
Type: <class 'str'>
Type name: str
Memory address: 140123456790
Length: 13
Character count: 13
Word count: 2
Uppercase: HELLO, WORLD!
Lowercase: hello, world!
Is digit: False
Is alpha: False
Is alnum: False`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
print(type(name))  # <class 'str'>
print(type(age))  # <class 'int'>`}
              </pre>
            </div>
              </div>
            </div>
          </div>
        );
      
      case 'operators':
        return (
          <div className="animate-fade-in-up">
            <h1 id="operators" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Type Casting & Operators
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn about Python operators and type casting
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="operators" className="text-3xl font-bold text-green-400 mb-6">4. Type Casting & Operators</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Type Casting</h3>
            <div className="bg-gray-900 p-4 rounded border border-gray-600 mb-4">
              <pre className="text-green-400 font-mono text-sm">
{`# Type conversion
x = "123"
y = int(x)      # Convert to integer
z = float(x)    # Convert to float
w = str(y)      # Convert to string

# Type casting functions
int(), float(), str(), bool()`}
              </pre>
            </div>
            
            <h3 className="text-xl font-bold text-purple-400 mb-4">Operators</h3>
            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-blue-400 mb-2">Arithmetic</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• + Addition</li>
                  <li>• - Subtraction</li>
                  <li>• * Multiplication</li>
                  <li>• / Division</li>
                  <li>• % Modulus</li>
                  <li>• ** Exponentiation</li>
                </ul>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-green-400 mb-2">Comparison</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• == Equal to</li>
                  <li>• != Not equal</li>
                  <li>• &gt; Greater than</li>
                  <li>• &lt; Less than</li>
                  <li>• &gt;= Greater or equal</li>
                  <li>• &lt;= Less or equal</li>
                </ul>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-purple-400 mb-2">Logical</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• and - Logical AND</li>
                  <li>• or - Logical OR</li>
                  <li>• not - Logical NOT</li>
                </ul>
              </div>
            </div>
              </div>
            </div>
          </div>
        );
      
      case 'conditionals':
        return (
          <div className="animate-fade-in-up">
            <h1 id="conditionals" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Conditionals
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn about if, elif, and else statements in Python
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="conditionals" className="text-3xl font-bold text-green-400 mb-6">5. Conditionals (if, elif, else)</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Conditional Statements</h3>
            <div className="bg-gray-900 p-4 rounded border border-gray-600">
              <pre className="text-green-400 font-mono text-sm">
{`# Basic if statement
if age >= 18:
    print("Adult")
else:
    print("Minor")

# Multiple conditions
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"

# Nested conditions
if x > 0:
    if y > 0:
        print("Both positive")
    else:
        print("x positive, y negative")`}
              </pre>
            </div>
              </div>
            </div>
          </div>
        );
      
      case 'loops':
        return (
          <div className="animate-fade-in-up">
            <h1 id="loops" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Loops
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn about for and while loops in Python
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="loops" className="text-3xl font-bold text-green-400 mb-6">6. Loops</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Loop Types</h3>
            <div className="space-y-6">
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-blue-400 mb-2">for Loop</h4>
                <div className="bg-gray-900 p-3 rounded">
                  <pre className="text-green-400 font-mono text-sm">
{`# Iterate through range
for i in range(5):
    print(i)

# Iterate through list
fruits = ["apple", "banana", "orange"]
for fruit in fruits:
    print(fruit)

# With index
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")`}
                  </pre>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-green-400 mb-2">while Loop</h4>
                <div className="bg-gray-900 p-3 rounded">
                  <pre className="text-green-400 font-mono text-sm">
{`# Basic while loop
count = 0
while count < 5:
    print(count)
    count += 1

# Break and continue
while True:
    user_input = input("Enter 'quit' to exit: ")
    if user_input == 'quit':
        break
    elif user_input == 'skip':
        continue
    print(f"You entered: {user_input}")`}
                  </pre>
                </div>
              </div>
            </div>
              </div>
            </div>
          </div>
        );
      
      case 'strings':
        return (
          <div className="animate-fade-in-up">
            <h1 id="strings" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Strings
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn about string manipulation in Python
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="strings" className="text-3xl font-bold text-green-400 mb-6">7. Strings</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">String Operations</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="bg-gray-700 p-3 rounded">
                  <code className="text-green-400">len(string)</code>
                  <span className="text-gray-300 ml-3"># Get string length</span>
                </div>
                <div className="bg-gray-700 p-3 rounded">
                  <code className="text-green-400">string.upper()</code>
                  <span className="text-gray-300 ml-3"># Convert to uppercase</span>
                </div>
                <div className="bg-gray-700 p-3 rounded">
                  <code className="text-green-400">string.lower()</code>
                  <span className="text-gray-300 ml-3"># Convert to lowercase</span>
                </div>
                <div className="bg-gray-700 p-3 rounded">
                  <code className="text-green-400">string.strip()</code>
                  <span className="text-gray-300 ml-3"># Remove whitespace</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="bg-gray-700 p-3 rounded">
                  <code className="text-green-400">string.split()</code>
                  <span className="text-gray-300 ml-3"># Split into list</span>
                </div>
                <div className="bg-gray-700 p-3 rounded">
                  <code className="text-green-400">string.replace()</code>
                  <span className="text-gray-300 ml-3"># Replace substring</span>
                </div>
                <div className="bg-gray-700 p-3 rounded">
                  <code className="text-green-400">string.find()</code>
                  <span className="text-gray-300 ml-3"># Find substring</span>
                </div>
                <div className="bg-gray-700 p-3 rounded">
                  <code className="text-green-400">string.format()</code>
                  <span className="text-gray-300 ml-3"># Format string</span>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-purple-400 mb-4 mt-6">String Formatting</h3>
            <div className="bg-gray-900 p-4 rounded border border-gray-600">
              <pre className="text-green-400 font-mono text-sm">
{`# f-strings (Python 3.6+)
name = "Alice"
age = 25
message = f"Hello, {name}! You are {age} years old."

# .format() method
message = "Hello, {}! You are {} years old.".format(name, age)

# % formatting
message = "Hello, %s! You are %d years old." % (name, age)`}
              </pre>
            </div>
              </div>
            </div>
          </div>
        );
      
      case 'data-structures':
        return (
          <div className="animate-fade-in-up">
            <h1 id="data-structures" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Data Structures
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn about lists, tuples, dictionaries, and sets
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="data-structures" className="text-3xl font-bold text-green-400 mb-6">8. Data Structures</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Lists, Tuples, Sets, Dictionaries</h3>
            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-blue-400 mb-2">Lists</h4>
                <p className="text-gray-300 text-sm mb-2">Ordered, mutable</p>
                <div className="bg-gray-900 p-2 rounded">
                  <pre className="text-green-400 font-mono text-xs">
{`fruits = ["apple", "banana"]
fruits.append("orange")
fruits[0] = "grape"`}
                  </pre>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-green-400 mb-2">Tuples</h4>
                <p className="text-gray-300 text-sm mb-2">Ordered, immutable</p>
                <div className="bg-gray-900 p-2 rounded">
                  <pre className="text-green-400 font-mono text-xs">
{`coordinates = (10, 20)
x, y = coordinates`}
                  </pre>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-purple-400 mb-2">Sets</h4>
                <p className="text-gray-300 text-sm mb-2">Unordered, unique elements</p>
                <div className="bg-gray-900 p-2 rounded">
                  <pre className="text-green-400 font-mono text-xs">
{`numbers = {1, 2, 3}
numbers.add(4)`}
                  </pre>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-yellow-400 mb-2">Dictionaries</h4>
                <p className="text-gray-300 text-sm mb-2">Key-value pairs</p>
                <div className="bg-gray-900 p-2 rounded">
                  <pre className="text-green-400 font-mono text-xs">
{`person = {"name": "Alice", "age": 25}
person["city"] = "NYC"`}
                  </pre>
                </div>
              </div>
            </div>
              </div>
            </div>
          </div>
        );
      
      case 'functions':
        return (
          <div className="animate-fade-in-up">
            <h1 id="functions" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Functions
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn about functions and their usage in Python
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="functions" className="text-3xl font-bold text-green-400 mb-6">9. Functions</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Function Definition</h3>
            <div className="bg-gray-900 p-4 rounded border border-gray-600">
              <pre className="text-green-400 font-mono text-sm">
{`# Basic function
def greet(name):
    return f"Hello, {name}!"

# Function with default parameters
def greet_with_title(name, title="Mr."):
    return f"Hello, {title} {name}!"

# Function with multiple parameters
def calculate_area(length, width):
    return length * width

# Lambda functions
square = lambda x: x ** 2
result = square(5)  # 25`}
              </pre>
            </div>
              </div>
            </div>
          </div>
        );
      
      case 'oop':
        return (
          <div className="animate-fade-in-up">
            <h1 id="oop" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Object-Oriented Programming
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn about classes and objects in Python
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="oop" className="text-3xl font-bold text-green-400 mb-6">10. Object-Oriented Programming</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Classes and Objects</h3>
            <div className="bg-gray-900 p-4 rounded border border-gray-600">
              <pre className="text-green-400 font-mono text-sm">
{`class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        return f"Hello, I'm {self.name} and I'm {self.age} years old"
    
    def have_birthday(self):
        self.age += 1

# Create object
person = Person("Alice", 25)
print(person.greet())
person.have_birthday()
print(person.age)  # 26`}
              </pre>
            </div>
              </div>
            </div>
          </div>
        );
      
      case 'file-handling':
        return (
          <div className="animate-fade-in-up">
            <h1 id="file-handling" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 File Handling
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn about file operations in Python
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="file-handling" className="text-3xl font-bold text-green-400 mb-6">11. File Handling</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">File Operations</h3>
            <div className="bg-gray-900 p-4 rounded border border-gray-600">
              <pre className="text-green-400 font-mono text-sm">
{`# Reading files
with open("file.txt", "r") as file:
    content = file.read()
    print(content)

# Writing files
with open("output.txt", "w") as file:
    file.write("Hello, World!")

# Appending to files
with open("log.txt", "a") as file:
    file.write("New log entry\\n")`}
              </pre>
            </div>
              </div>
            </div>
          </div>
        );
      
      case 'exception-handling':
        return (
          <div className="animate-fade-in-up">
            <h1 id="exception-handling" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Exception Handling
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn about error handling in Python
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="exception-handling" className="text-3xl font-bold text-green-400 mb-6">12. Exception Handling</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Try-Except Blocks</h3>
            <div className="bg-gray-900 p-4 rounded border border-gray-600">
              <pre className="text-green-400 font-mono text-sm">
{`try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")
except Exception as e:
    print(f"An error occurred: {e}")
else:
    print("No errors occurred")
finally:
    print("This always executes")

# Custom exceptions
class CustomError(Exception):
    pass

try:
    raise CustomError("Something went wrong")
except CustomError as e:
    print(f"Custom error: {e}")`}
              </pre>
            </div>
              </div>
            </div>
          </div>
        );
      
      case 'modules-packages':
        return (
          <div className="animate-fade-in-up">
            <h1 id="modules-packages" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Modules & Packages
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn about Python modules and packages
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="modules-packages" className="text-3xl font-bold text-green-400 mb-6">13. Modules & Packages</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Importing Modules</h3>
            <div className="bg-gray-900 p-4 rounded border border-gray-600">
              <pre className="text-green-400 font-mono text-sm">
{`# Import entire module
import math
print(math.pi)

# Import specific function
from math import sqrt
print(sqrt(16))

# Import with alias
import numpy as np
array = np.array([1, 2, 3])

# Import from custom module
from mymodule import my_function`}
              </pre>
            </div>
              </div>
            </div>
          </div>
        );
      
      case 'advanced-concepts':
        return (
          <div className="animate-fade-in-up">
            <h1 id="advanced-concepts" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Advanced Concepts
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn about advanced Python concepts
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="advanced-concepts" className="text-3xl font-bold text-green-400 mb-6">14. Advanced Concepts</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Key Advanced Topics</h3>
            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-blue-400 mb-2">Decorators</h4>
                <p className="text-gray-300 text-sm">Functions that modify other functions</p>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-green-400 mb-2">Generators</h4>
                <p className="text-gray-300 text-sm">Memory-efficient iterators</p>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-purple-400 mb-2">Context Managers</h4>
                <p className="text-gray-300 text-sm">Resource management with 'with'</p>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-yellow-400 mb-2">Multithreading</h4>
                <p className="text-gray-300 text-sm">Concurrent programming</p>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-red-400 mb-2">AsyncIO</h4>
                <p className="text-gray-300 text-sm">Asynchronous programming</p>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-indigo-400 mb-2">Memory Management</h4>
                <p className="text-gray-300 text-sm">Garbage collection and optimization</p>
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
              🐍 Python Video Tutorials
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn Python through comprehensive video tutorials
            </p>
            
            <div className="max-w-6xl mx-auto">
              <VideoSection videos={pythonVideos} title="Python Video Tutorials" />
            </div>
          </div>
        );
      
      case 'practice-projects':
        return (
          <div className="animate-fade-in-up">
            <h1 id="practice-projects" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              🐍 Practice Projects
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Build real-world projects to master Python
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="practice-projects" className="text-3xl font-bold text-green-400 mb-6">15. Practice Projects</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <ul className="text-gray-300 space-y-3">
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                <strong>Calculator:</strong> Build a command-line calculator
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                <strong>To-Do List:</strong> Create a task management application
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                <strong>Web Scraper:</strong> Extract data from websites
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                <strong>Data Analysis:</strong> Analyze datasets with pandas
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                <strong>API Development:</strong> Build REST APIs with Flask/FastAPI
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
              🐍 Summary
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Key takeaways from Python programming
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="summary" className="text-3xl font-bold text-green-400 mb-6">✅ Summary</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <ul className="text-gray-300 space-y-3">
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Python is a versatile, high-level programming language
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Key features include simple syntax, dynamic typing, and extensive libraries
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Used in web development, data science, AI/ML, and automation
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Practice with real projects to master Python programming
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
              🐍 Python Programming
            </h1>
            
            <div className="max-w-6xl mx-auto">
              <div className="gradient-border hover-lift mb-8">
                <div className="bg-gradient-to-r from-green-900/50 to-blue-900/50 p-8 rounded-xl">
                  <h2 className="text-3xl font-bold text-green-400 mb-4 neon-glow">Goal</h2>
                  <p className="text-white text-xl">Master Python programming from basics to advanced concepts and applications.</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <TechLayout onThisPage={pageHeadings} technology="python" activeSection={activeSection} setActiveSection={setActiveSection}>
      {renderContent()}
    </TechLayout>
  );
}

