// src/app/java/basics/introduction/page.tsx
import Link from 'next/link';

export default function JavaIntroductionPage() {
  return (
    <main>
      <section className="text-center py-12 px-4">
        <Link href="/java" className="inline-block mb-8 text-blue-400 hover:text-blue-300 transition-colors">
          ← Back to Java Learning Hub
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          ☕ Java Introduction
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          Learn what Java is, JVM, JDK, and setting up your Java development environment
        </p>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">What is Java?</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Definition</h3>
              <p className="text-gray-300 mb-4">
                Java is a high-level, object-oriented programming language developed by Sun Microsystems (now Oracle).
                It's designed to be platform-independent, meaning Java programs can run on any device that has a Java Virtual Machine (JVM).
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Key Features of Java</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <ul className="text-gray-300 space-y-2">
                  <li><strong className="text-white">Platform Independent:</strong> Write once, run anywhere (WORA)</li>
                  <li><strong className="text-white">Object-Oriented:</strong> Everything is an object</li>
                  <li><strong className="text-white">Simple:</strong> Easy to learn and use</li>
                  <li><strong className="text-white">Secure:</strong> Built-in security features</li>
                  <li><strong className="text-white">Robust:</strong> Strong memory management and exception handling</li>
                  <li><strong className="text-white">Multithreaded:</strong> Built-in support for concurrent programming</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Java Architecture</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <div className="space-y-3">
                  <div>
                    <h4 className="text-orange-400 font-semibold">JDK (Java Development Kit)</h4>
                    <p className="text-gray-300 text-sm">Complete development environment including compiler, debugger, and tools</p>
                  </div>
                  <div>
                    <h4 className="text-green-400 font-semibold">JRE (Java Runtime Environment)</h4>
                    <p className="text-gray-300 text-sm">Runtime environment needed to run Java applications</p>
                  </div>
                  <div>
                    <h4 className="text-blue-400 font-semibold">JVM (Java Virtual Machine)</h4>
                    <p className="text-gray-300 text-sm">Virtual machine that executes Java bytecode</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Java Program Structure</h2>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <pre className="text-green-400 text-sm overflow-x-auto">
{`// Hello World Program in Java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}

// Program Structure Explanation:
// 1. public class HelloWorld - Class declaration
// 2. public static void main(String[] args) - Main method (entry point)
// 3. System.out.println() - Output statement`}
            </pre>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-blue-400 mb-2">Key Components</h4>
              <ul className="text-gray-300 space-y-1">
                <li><strong>Class:</strong> A blueprint for creating objects</li>
                <li><strong>Method:</strong> A block of code that performs a specific task</li>
                <li><strong>main() method:</strong> Entry point of any Java program</li>
                <li><strong>Statement:</strong> Instructions that perform actions</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Setting Up Java Environment</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Step 1: Install JDK</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <p className="text-gray-300 mb-2">Download and install JDK from Oracle or OpenJDK:</p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Oracle JDK: https://www.oracle.com/java/technologies/downloads/</li>
                  <li>• OpenJDK: https://openjdk.org/</li>
                  <li>• Verify installation: <code className="text-green-400">java -version</code></li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Step 2: Choose an IDE</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-900 p-4 rounded-lg text-center">
                  <h4 className="text-blue-400 font-semibold mb-2">IntelliJ IDEA</h4>
                  <p className="text-gray-300 text-sm">Professional IDE with advanced features</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg text-center">
                  <h4 className="text-green-400 font-semibold mb-2">Eclipse</h4>
                  <p className="text-gray-300 text-sm">Free, open-source IDE</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg text-center">
                  <h4 className="text-orange-400 font-semibold mb-2">VS Code</h4>
                  <p className="text-gray-300 text-sm">Lightweight editor with Java extensions</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Step 3: Compile and Run</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# Compile Java file
javac HelloWorld.java

# Run the compiled program
java HelloWorld

# Output: Hello, World!`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Link href="/java" className="bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 transition">
            ← Back to Java Hub
          </Link>
          <Link href="/java/basics/control-statements" className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition">
            Next: Control Statements →
          </Link>
        </div>
      </section>
    </main>
  );
}
