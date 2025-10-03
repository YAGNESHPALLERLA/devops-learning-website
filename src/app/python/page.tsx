import TechLayout from '@/components/tech-layout';
import VideoSection from '@/components/VideoSection';
import { getVideosForTopic } from '@/data/videoTutorials';

export default function PythonPage() {
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

  return (
    <TechLayout onThisPage={pageHeadings} technology="python">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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

          <h2 id="syntax-indentation" className="text-3xl font-bold text-green-400 mb-6">2. Syntax & Indentation</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Python Syntax Rules</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-blue-400 mb-2">Indentation</h4>
                <div className="bg-gray-900 p-3 rounded">
                  <pre className="text-green-400 font-mono text-sm">
{`# Python uses indentation for code blocks
if x > 0:
    print("Positive")
    print("Number is greater than 0")
else:
    print("Negative or zero")`}
                  </pre>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-green-400 mb-2">Comments</h4>
                <div className="bg-gray-900 p-3 rounded">
                  <pre className="text-green-400 font-mono text-sm">
{`# Single line comment
"""
Multi-line comment
or docstring
"""

# Variables don't need type declaration
name = "Python"
age = 30`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <h2 id="variables-data-types" className="text-3xl font-bold text-green-400 mb-6">3. Variables & Data Types</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Python Data Types</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-blue-400 mb-2">Numeric Types</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• int - Integer numbers</li>
                  <li>• float - Decimal numbers</li>
                  <li>• complex - Complex numbers</li>
                </ul>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-green-400 mb-2">Text Type</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• str - String (text)</li>
                </ul>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-purple-400 mb-2">Boolean</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• bool - True or False</li>
                </ul>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-purple-400 mb-4 mt-6">Variable Declaration</h3>
            <div className="bg-gray-900 p-4 rounded border border-gray-600">
              <pre className="text-green-400 font-mono text-sm">
{`# Variable assignment
name = "Alice"
age = 25
height = 5.6
is_student = True

# Multiple assignment
x, y, z = 1, 2, 3

# Type checking
print(type(name))  # <class 'str'>
print(type(age))  # <class 'int'>`}
              </pre>
            </div>
          </div>

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

          <h2 id="loops" className="text-3xl font-bold text-green-400 mb-6">6. Loops</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Loop Types</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

          <h2 id="strings" className="text-3xl font-bold text-green-400 mb-6">7. Strings</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">String Operations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <h2 id="data-structures" className="text-3xl font-bold text-green-400 mb-6">8. Data Structures</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Lists, Tuples, Sets, Dictionaries</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

          <h2 id="advanced-concepts" className="text-3xl font-bold text-green-400 mb-6">14. Advanced Concepts</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Key Advanced Topics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

          <VideoSection videos={pythonVideos} title="Python Video Tutorials" />

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
    </TechLayout>
  );
}

