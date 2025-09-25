// src/app/python/basics/variables/page.tsx
import Link from 'next/link';

export default function PythonVariablesPage() {
  return (
    <main>
      <section className="text-center py-12 px-4">
        <Link href="/python" className="inline-block mb-8 text-blue-400 hover:text-blue-300 transition-colors">
          ← Back to Python Learning Hub
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          🐍 Python Variables & Data Types
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          Learn how to create variables and work with different data types in Python
        </p>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Variables in Python</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Creating Variables</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# Simple variable assignment
name = "John"
age = 25
height = 5.9
is_student = True

# Multiple assignment
x, y, z = 1, 2, 3

# Same value to multiple variables
a = b = c = 100

# Unpacking
coordinates = (10, 20)
x, y = coordinates`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Variable Naming Rules</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# Valid variable names
first_name = "John"
age_2023 = 25
user2 = "admin"
_total = 100

# Invalid variable names (will cause errors)
# 2nd_user = "admin"     # Cannot start with number
# user-name = "john"     # Cannot contain hyphens
# class = "python"       # Cannot use keywords

# Good naming conventions
student_name = "Alice"      # snake_case
MAX_STUDENTS = 50          # UPPER_CASE for constants
firstName = "Bob"          # camelCase (less common in Python)`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Python Data Types</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-2">Numbers</h3>
                <div className="bg-gray-900 p-3 rounded">
                  <pre className="text-green-400 text-sm">
{`# Integers
age = 25
count = -10

# Floats
price = 19.99
temperature = -3.5

# Complex
complex_num = 3 + 4j`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-2">Strings</h3>
                <div className="bg-gray-900 p-3 rounded">
                  <pre className="text-green-400 text-sm">
{`# Single quotes
name = 'John'

# Double quotes
message = "Hello World"

# Triple quotes (multiline)
text = """This is a
multiline string"""

# String operations
full_name = "John" + " " + "Doe"`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-2">Boolean</h3>
                <div className="bg-gray-900 p-3 rounded">
                  <pre className="text-green-400 text-sm">
{`# Boolean values
is_active = True
is_deleted = False

# Boolean operations
result = True and False  # False
result = True or False   # True
result = not True        # False`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-2">None</h3>
                <div className="bg-gray-900 p-3 rounded">
                  <pre className="text-green-400 text-sm">
{`# None represents absence of value
value = None

# Check for None
if value is None:
    print("Value is None")

# None is falsy
if not value:
    print("Value is falsy")`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Type Checking & Conversion</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Checking Data Types</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# Using type() function
name = "John"
print(type(name))  # <class 'str'>

# Using isinstance()
if isinstance(name, str):
    print("name is a string")

# Common type checks
age = 25
if isinstance(age, int):
    print("age is an integer")`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Type Conversion</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# Convert to string
age = 25
age_str = str(age)

# Convert to integer
price = "19.99"
price_int = int(float(price))

# Convert to float
count = "10"
count_float = float(count)

# Convert to boolean
value = "Hello"
bool_value = bool(value)  # True (non-empty string)

empty_string = ""
bool_empty = bool(empty_string)  # False`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Link href="/python/basics/syntax" className="bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 transition">
            ← Previous: Syntax & Indentation
          </Link>
          <Link href="/python/basics/operators" className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition">
            Next: Type Casting & Operators →
          </Link>
        </div>
      </section>
    </main>
  );
}
