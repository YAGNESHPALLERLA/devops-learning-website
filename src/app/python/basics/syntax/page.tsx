// src/app/python/basics/syntax/page.tsx
import Link from 'next/link';

export default function PythonSyntaxPage() {
  return (
    <main>
      <section className="text-center py-12 px-4">
        <Link href="/python" className="inline-block mb-8 text-blue-400 hover:text-blue-300 transition-colors">
          ← Back to Python Learning Hub
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          🐍 Python Syntax & Indentation
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          Learn the fundamental syntax rules and indentation in Python
        </p>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Python Syntax Rules</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">1. Indentation is Everything</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# Correct indentation
if True:
    print("This is indented")
    if True:
        print("This is double indented")

# Wrong indentation - will cause error
if True:
print("This will cause IndentationError")`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">2. Comments</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# This is a single line comment

"""
This is a multi-line comment
or docstring
"""

# Comments can be inline
x = 5  # This is an inline comment`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">3. Line Continuation</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# Using backslash for line continuation
total = 10 + 20 + \
        30 + 40

# Using parentheses (preferred)
total = (10 + 20 + 
         30 + 40)

# Implicit line continuation in containers
fruits = [
    "apple",
    "banana",
    "orange"
]`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">4. Case Sensitivity</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# Python is case sensitive
name = "John"
Name = "Jane"
NAME = "Bob"

print(name)  # Output: John
print(Name)  # Output: Jane
print(NAME)  # Output: Bob`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Best Practices</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="text-green-400 text-xl">✓</div>
              <div>
                <h4 className="text-white font-semibold">Use 4 spaces for indentation</h4>
                <p className="text-gray-400">Never mix tabs and spaces</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-green-400 text-xl">✓</div>
              <div>
                <h4 className="text-white font-semibold">Follow PEP 8 style guide</h4>
                <p className="text-gray-400">Python's official style guide</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-green-400 text-xl">✓</div>
              <div>
                <h4 className="text-white font-semibold">Use meaningful variable names</h4>
                <p className="text-gray-400">Make your code self-documenting</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-green-400 text-xl">✓</div>
              <div>
                <h4 className="text-white font-semibold">Write descriptive comments</h4>
                <p className="text-gray-400">Explain the 'why', not the 'what'</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/python/basics/variables" className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition">
            Next: Variables & Data Types →
          </Link>
        </div>
      </section>
    </main>
  );
}
