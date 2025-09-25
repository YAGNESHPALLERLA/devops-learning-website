// src/app/python/basics/operators/page.tsx
import Link from 'next/link';

export default function PythonOperatorsPage() {
  return (
    <main>
      <section className="text-center py-12 px-4">
        <Link href="/python" className="inline-block mb-8 text-blue-400 hover:text-blue-300 transition-colors">
          ← Back to Python Learning Hub
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          🐍 Type Casting & Operators
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          Learn about operators and type casting in Python
        </p>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Arithmetic Operators</h2>
          
          <div className="bg-gray-900 p-4 rounded-lg mb-6">
            <pre className="text-green-400 text-sm overflow-x-auto">
{`# Basic arithmetic operations
a = 10
b = 3

print(a + b)   # 13 (Addition)
print(a - b)   # 7  (Subtraction)
print(a * b)   # 30 (Multiplication)
print(a / b)   # 3.333... (Division)
print(a // b)  # 3  (Floor division)
print(a % b)   # 1  (Modulus)
print(a ** b)  # 1000 (Exponentiation)

# Assignment operators
x = 5
x += 3    # x = x + 3, result: 8
x -= 2    # x = x - 2, result: 6
x *= 2    # x = x * 2, result: 12
x /= 3    # x = x / 3, result: 4.0`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Comparison Operators</h2>
          
          <div className="bg-gray-900 p-4 rounded-lg mb-6">
            <pre className="text-green-400 text-sm overflow-x-auto">
{`# Comparison operators return True or False
a = 10
b = 5

print(a == b)   # False (Equal to)
print(a != b)   # True  (Not equal to)
print(a > b)    # True  (Greater than)
print(a < b)    # False (Less than)
print(a >= b)   # True  (Greater than or equal)
print(a <= b)   # False (Less than or equal)

# String comparisons
name1 = "Alice"
name2 = "Bob"
print(name1 < name2)  # True (alphabetical order)`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Logical Operators</h2>
          
          <div className="bg-gray-900 p-4 rounded-lg mb-6">
            <pre className="text-green-400 text-sm overflow-x-auto">
{`# Logical operators
age = 25
has_license = True
has_car = False

# AND operator
if age >= 18 and has_license:
    print("Can drive")

# OR operator
if has_license or has_car:
    print("Has transportation")

# NOT operator
if not has_car:
    print("No car available")

# Truth tables
print(True and True)   # True
print(True and False)  # False
print(False and True)  # False
print(False and False) # False

print(True or True)    # True
print(True or False)   # True
print(False or True)   # True
print(False or False)  # False`}
            </pre>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Type Casting</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Explicit Type Conversion</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# Convert to integer
str_num = "123"
int_num = int(str_num)

float_num = 45.67
int_from_float = int(float_num)  # 45 (truncates)

# Convert to float
str_decimal = "3.14"
float_num = float(str_decimal)

int_num = 42
float_from_int = float(int_num)  # 42.0

# Convert to string
age = 25
age_str = str(age)

price = 19.99
price_str = str(price)`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Implicit Type Conversion</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# Python automatically converts types in some cases
result = 5 + 3.14    # int + float = float
print(result)        # 8.14

result = "Hello" + str(123)  # Must explicitly convert
print(result)        # "Hello123"

# Boolean conversion
print(bool(1))       # True
print(bool(0))       # False
print(bool(""))      # False
print(bool("Hello")) # True`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Link href="/python/basics/variables" className="bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 transition">
            ← Previous: Variables & Data Types
          </Link>
          <Link href="/python/basics/conditionals" className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition">
            Next: Conditionals →
          </Link>
        </div>
      </section>
    </main>
  );
}
