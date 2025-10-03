'use client';

import { useState } from 'react';
import TechLayout from '@/components/tech-layout';
import VideoSection from '@/components/VideoSection';
import { getVideosForTopic } from '@/data/videoTutorials';

export default function JavaPage() {
  const [activeSection, setActiveSection] = useState('introduction');

  const pageHeadings = [
    { id: 'introduction', title: 'Java Introduction' },
    { id: 'control-statements', title: 'Control Statements' },
    { id: 'oop-concepts', title: 'Object-Oriented Programming' },
    { id: 'keywords', title: 'Java Keywords' },
    { id: 'strings', title: 'Strings & String Handling' },
    { id: 'arrays-collections', title: 'Arrays & Collections' },
    { id: 'exceptions', title: 'Exception Handling' },
    { id: 'packages', title: 'Packages & Modules' },
    { id: 'multithreading', title: 'Multi-threading' },
    { id: 'file-io', title: 'File I/O Streams' },
    { id: 'java8-features', title: 'Java 8+ Features' },
    { id: 'memory-management', title: 'Memory Management' },
    { id: 'advanced-concepts', title: 'Advanced Core Concepts' },
    { id: 'video-tutorials', title: 'Video Tutorials' },
    { id: 'practice-projects', title: 'Practice Projects' },
    { id: 'summary', title: 'Summary' },
  ];

  const javaVideos = getVideosForTopic('java');

  const renderContent = () => {
    switch (activeSection) {
      case 'introduction':
        return (
          <div className="animate-fade-in-up">
            <h1 id="introduction" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              ☕ Java Programming
            </h1>
            
            <div className="max-w-6xl mx-auto">
              <div className="gradient-border hover-lift mb-8">
                <div className="bg-gradient-to-r from-orange-900/50 to-red-900/50 p-8 rounded-xl">
                  <h2 className="text-3xl font-bold text-orange-400 mb-4 neon-glow">Goal</h2>
                  <p className="text-white text-xl">Master Java programming from basics to advanced enterprise development.</p>
                </div>
              </div>

              <h2 id="introduction" className="text-3xl font-bold text-orange-400 mb-6">1. Java Introduction</h2>
          
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift hover:ring-2 hover:ring-orange-500/30 hover:ring-opacity-50 transition-all duration-300">
            <h3 className="text-2xl font-bold text-green-400 mb-6 neon-glow">What is Java?</h3>
            <div className="space-y-6 mb-8">
              <div className="bg-gradient-to-r from-blue-900/50 to-blue-800/50 border border-blue-500/30 p-6 rounded-xl hover-glow-accent">
                <p className="text-blue-300 font-semibold text-lg">✅ Platform Independent</p>
                <p className="text-gray-300 text-sm mt-2">Write once, run anywhere (WORA)</p>
              </div>
              <div className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 border border-purple-500/30 p-6 rounded-xl hover-glow-accent">
                <p className="text-purple-300 font-semibold text-lg">✅ Object-Oriented</p>
                <p className="text-gray-300 text-sm mt-2">Built on OOP principles</p>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-green-400 mb-4">Key Features:</h3>
            <ul className="text-gray-300 space-y-2 mb-4">
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                <strong>JVM (Java Virtual Machine):</strong> Executes Java bytecode
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                <strong>JDK (Java Development Kit):</strong> Complete development environment
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                <strong>JRE (Java Runtime Environment):</strong> Runtime environment for Java applications
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                <strong>Automatic Memory Management:</strong> Garbage collection
              </li>
            </ul>
            
            <div className="bg-yellow-900 border border-yellow-700 p-4 rounded-lg">
              <p className="text-yellow-300 font-semibold">📌 Java is used in enterprise applications, Android development, web applications, and big data processing</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift hover:ring-2 hover:ring-orange-500/30 hover:ring-opacity-50 transition-all duration-300">
            <h3 className="text-2xl font-bold text-green-400 mb-6 neon-glow">Your First Java Program</h3>
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 mb-6">
              <h4 className="text-lg font-bold text-blue-400 mb-4">HelloWorld.java</h4>
              <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println("Welcome to OHG 365 Java Learning!");
        
        // Variables
        String name = "Java Developer";
        int age = 25;
        double salary = 75000.50;
        
        // Print formatted output
        System.out.printf("Name: %s, Age: %d, Salary: $%.2f%n", 
                         name, age, salary);
    }
}`}
              </pre>
            </div>
            
            <div className="space-y-6">
              <div className="bg-blue-900/30 border border-blue-500/30 p-4 rounded-lg">
                <h4 className="text-blue-300 font-bold mb-2">🔧 Compilation & Execution</h4>
                <div className="bg-gray-900 p-3 rounded text-sm">
                  <pre className="text-green-400 font-mono">
{`# Compile
javac HelloWorld.java

# Run
java HelloWorld

# Output:
# Hello, World!
# Welcome to OHG 365 Java Learning!
# Name: Java Developer, Age: 25, Salary: $75000.50`}
                  </pre>
                </div>
              </div>
              
              <div className="bg-purple-900/30 border border-purple-500/30 p-4 rounded-lg">
                <h4 className="text-purple-300 font-bold mb-2">📝 Key Concepts</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>class:</strong> Blueprint for objects</li>
                  <li>• <strong>public:</strong> Access modifier</li>
                  <li>• <strong>static:</strong> Belongs to class, not instance</li>
                  <li>• <strong>void:</strong> No return value</li>
                  <li>• <strong>main:</strong> Entry point of program</li>
                  <li>• <strong>String[] args:</strong> Command line arguments</li>
                </ul>
              </div>
            </div>
              </div>
            </div>
          </div>
        );
      
      case 'control-statements':
        return (
          <div className="animate-fade-in-up">
            <h1 id="control-statements" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              ☕ Java Control Statements
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Master if-else, switch statements, loops, and program flow control in Java
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="control-statements" className="text-3xl font-bold text-orange-400 mb-6">2. Control Statements</h2>
              
              <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift hover:ring-2 hover:ring-orange-500/30 hover:ring-opacity-50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-green-400 mb-6 neon-glow">What are Control Statements?</h3>
                <p className="text-gray-300 mb-6 text-lg">
                  Control statements in Java are used to control the flow of execution in a program. They allow you to make decisions, 
                  repeat code blocks, and jump to different parts of your program based on conditions.
                </p>
                
                <div className="bg-yellow-900 border border-yellow-700 p-4 rounded-lg mb-6">
                  <p className="text-yellow-300 font-semibold">📌 Control statements are essential for creating dynamic and interactive programs that can respond to different conditions and user inputs.</p>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">1. Conditional Statements</h3>
                <p className="text-gray-300 mb-6">Conditional statements allow your program to make decisions based on boolean expressions.</p>
                
                <div className="space-y-6 mb-8">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">if-else Statement</h4>
                    <p className="text-gray-300 mb-4">The most basic conditional statement that executes code based on a condition.</p>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`// Basic if-else
int age = 18;
if (age >= 18) {
    System.out.println("You are an adult");
} else {
    System.out.println("You are a minor");
}

// if-else if-else chain
int score = 85;
if (score >= 90) {
    System.out.println("Grade: A");
} else if (score >= 80) {
    System.out.println("Grade: B");
} else if (score >= 70) {
    System.out.println("Grade: C");
} else {
    System.out.println("Grade: F");
}

// Nested if statements
if (age >= 18) {
    if (age >= 65) {
        System.out.println("Senior citizen");
    } else {
        System.out.println("Adult");
    }
}`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">switch Statement</h4>
                    <p className="text-gray-300 mb-4">Used when you have multiple conditions to check against a single variable.</p>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`// Basic switch statement
int day = 3;
switch (day) {
    case 1:
        System.out.println("Monday");
        break;
    case 2:
        System.out.println("Tuesday");
        break;
    case 3:
        System.out.println("Wednesday");
        break;
    default:
        System.out.println("Invalid day");
}

// Switch with char
char grade = 'B';
switch (grade) {
    case 'A':
    case 'a':
        System.out.println("Excellent!");
        break;
    case 'B':
    case 'b':
        System.out.println("Good job!");
        break;
    case 'C':
    case 'c':
        System.out.println("Average");
        break;
    default:
        System.out.println("Needs improvement");
}

// Java 14+ switch expressions
String result = switch (day) {
    case 1, 2, 3, 4, 5 -> "Weekday";
    case 6, 7 -> "Weekend";
    default -> "Invalid";
};`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">2. Loop Statements</h3>
                <p className="text-gray-300 mb-6">Loops allow you to execute a block of code repeatedly until a condition is met.</p>
                
                <div className="space-y-6 mb-8">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">for Loop</h4>
                    <p className="text-gray-300 mb-4">Best when you know the exact number of iterations.</p>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`// Basic for loop
for (int i = 0; i < 5; i++) {
    System.out.println("Count: " + i);
}

// Enhanced for loop (for-each)
int[] numbers = {1, 2, 3, 4, 5};
for (int num : numbers) {
    System.out.println("Number: " + num);
}

// Nested for loops
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        System.out.println(i + " x " + j + " = " + (i * j));
    }
}`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">while Loop</h4>
                    <p className="text-gray-300 mb-4">Executes as long as the condition is true.</p>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`// Basic while loop
int count = 0;
while (count < 5) {
    System.out.println("Count: " + count);
    count++;
}

// Reading user input
Scanner scanner = new Scanner(System.in);
int number;
while ((number = scanner.nextInt()) != 0) {
    System.out.println("You entered: " + number);
}

// Infinite loop with break
while (true) {
    System.out.println("Enter 'quit' to exit");
    String input = scanner.nextLine();
    if (input.equals("quit")) {
        break;
    }
}`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-purple-400 mb-4 text-lg">do-while Loop</h4>
                    <p className="text-gray-300 mb-4">Executes at least once, then checks the condition.</p>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`// Basic do-while loop
int count = 0;
do {
    System.out.println("Count: " + count);
    count++;
} while (count < 5);

// Menu system
Scanner scanner = new Scanner(System.in);
int choice;
do {
    System.out.println("1. Add");
    System.out.println("2. Subtract");
    System.out.println("3. Exit");
    System.out.print("Enter choice: ");
    choice = scanner.nextInt();
    
    switch (choice) {
        case 1:
            System.out.println("Addition selected");
            break;
        case 2:
            System.out.println("Subtraction selected");
            break;
        case 3:
            System.out.println("Goodbye!");
            break;
        default:
            System.out.println("Invalid choice");
    }
} while (choice != 3);`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">3. Jump Statements</h3>
                <p className="text-gray-300 mb-6">Jump statements allow you to transfer control to another part of the program.</p>
                
                <div className="space-y-6">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">break Statement</h4>
                    <p className="text-gray-300 mb-4">Terminates the loop or switch statement immediately.</p>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`// break in for loop
for (int i = 0; i < 10; i++) {
    if (i == 5) {
        break; // Exits the loop when i equals 5
    }
    System.out.println("i = " + i);
}

// break in while loop
int num = 0;
while (num < 10) {
    if (num == 7) {
        break; // Exits the loop
    }
    System.out.println("Number: " + num);
    num++;
}

// break in switch
int day = 2;
switch (day) {
    case 1:
        System.out.println("Monday");
        break; // Prevents fall-through
    case 2:
        System.out.println("Tuesday");
        break;
    default:
        System.out.println("Other day");
}`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">continue Statement</h4>
                    <p className="text-gray-300 mb-4">Skips the current iteration and continues with the next iteration.</p>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`// continue in for loop
for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) {
        continue; // Skip even numbers
    }
    System.out.println("Odd number: " + i);
}

// continue in while loop
int num = 0;
while (num < 10) {
    num++;
    if (num % 3 == 0) {
        continue; // Skip multiples of 3
    }
    System.out.println("Number: " + num);
}

// Practical example: Skip invalid input
for (int i = 0; i < 5; i++) {
    System.out.print("Enter a positive number: ");
    int input = scanner.nextInt();
    if (input <= 0) {
        System.out.println("Invalid input, skipping...");
        continue;
    }
    System.out.println("Valid input: " + input);
}`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-6 rounded-lg border border-blue-500/30 mb-8">
                <h3 className="text-xl font-bold text-blue-400 mb-4">Best Practices</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• <strong>Use meaningful variable names</strong> in loop counters and conditions</li>
                  <li>• <strong>Avoid infinite loops</strong> by ensuring conditions will eventually become false</li>
                  <li>• <strong>Use break and continue sparingly</strong> as they can make code harder to read</li>
                  <li>• <strong>Prefer enhanced for loops</strong> when iterating over collections</li>
                  <li>• <strong>Use switch statements</strong> instead of long if-else chains when appropriate</li>
                  <li>• <strong>Always include break statements</strong> in switch cases to prevent fall-through</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift hover:ring-2 hover:ring-orange-500/30 hover:ring-opacity-50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-green-400 mb-6 neon-glow">Practical Example: Student Grade Calculator</h3>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 mb-6">
                  <h4 className="text-lg font-bold text-blue-400 mb-4">StudentGradeCalculator.java</h4>
                  <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`import java.util.Scanner;

public class StudentGradeCalculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("=== OHG 365 Student Grade Calculator ===");
        System.out.print("Enter student name: ");
        String studentName = scanner.nextLine();
        
        System.out.print("Enter marks for Math (0-100): ");
        int mathMarks = scanner.nextInt();
        
        System.out.print("Enter marks for Science (0-100): ");
        int scienceMarks = scanner.nextInt();
        
        System.out.print("Enter marks for English (0-100): ");
        int englishMarks = scanner.nextInt();
        
        // Calculate average
        double average = (mathMarks + scienceMarks + englishMarks) / 3.0;
        
        // Determine grade using if-else statements
        String grade;
        if (average >= 90) {
            grade = "A+";
        } else if (average >= 80) {
            grade = "A";
        } else if (average >= 70) {
            grade = "B";
        } else if (average >= 60) {
            grade = "C";
        } else if (average >= 50) {
            grade = "D";
        } else {
            grade = "F";
        }
        
        // Display results
        System.out.println("\\n=== Grade Report ===");
        System.out.printf("Student: %s%n", studentName);
        System.out.printf("Math: %d%n", mathMarks);
        System.out.printf("Science: %d%n", scienceMarks);
        System.out.printf("English: %d%n", englishMarks);
        System.out.printf("Average: %.2f%n", average);
        System.out.printf("Grade: %s%n", grade);
        
        // Additional feedback using switch statement
        switch (grade) {
            case "A+":
            case "A":
                System.out.println("Excellent work! Keep it up!");
                break;
            case "B":
                System.out.println("Good job! You're doing well.");
                break;
            case "C":
                System.out.println("Not bad, but there's room for improvement.");
                break;
            case "D":
                System.out.println("You need to work harder.");
                break;
            case "F":
                System.out.println("Please seek help and study more.");
                break;
        }
        
        scanner.close();
    }
}`}
                  </pre>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-green-900/30 border border-green-500/30 p-4 rounded-lg">
                    <h4 className="text-green-300 font-bold mb-2">🎯 Learning Objectives</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Input/Output with Scanner</li>
                      <li>• Variable declaration and initialization</li>
                      <li>• Arithmetic operations</li>
                      <li>• if-else-if ladder</li>
                      <li>• switch statement</li>
                      <li>• String formatting with printf</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-900/30 border border-blue-500/30 p-4 rounded-lg">
                    <h4 className="text-blue-300 font-bold mb-2">📊 Sample Output</h4>
                    <div className="bg-gray-900 p-3 rounded text-sm">
                      <pre className="text-green-400 font-mono">
{`=== OHG 365 Student Grade Calculator ===
Enter student name: John Doe
Enter marks for Math (0-100): 85
Enter marks for Science (0-100): 92
Enter marks for English (0-100): 78

=== Grade Report ===
Student: John Doe
Math: 85
Science: 92
English: 78
Average: 85.00
Grade: A
Good job! You're doing well.`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'oop-concepts':
        return (
          <div className="animate-fade-in-up">
            <h1 id="oop-concepts" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              ☕ Object-Oriented Programming
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn the four pillars of OOP: Encapsulation, Inheritance, Polymorphism, and Abstraction
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="oop-concepts" className="text-3xl font-bold text-orange-400 mb-6">3. Object-Oriented Programming</h2>
              
              <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift hover:ring-2 hover:ring-orange-500/30 hover:ring-opacity-50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-green-400 mb-6 neon-glow">What is Object-Oriented Programming?</h3>
                <p className="text-gray-300 mb-6 text-lg">
                  Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects", which can contain data (attributes) and code (methods). 
                  OOP provides a clear modular structure for programs and makes code more maintainable, reusable, and easier to debug.
                </p>
                
                <div className="bg-yellow-900 border border-yellow-700 p-4 rounded-lg mb-6">
                  <p className="text-yellow-300 font-semibold">📌 OOP helps you think about problems in terms of real-world objects and their interactions, making complex programs easier to understand and maintain.</p>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">1. Four Pillars of OOP</h3>
                <p className="text-gray-300 mb-6">These are the fundamental principles that make OOP powerful and effective.</p>
                
                <div className="space-y-6 mb-8">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600 hover:ring-2 hover:ring-blue-500/30 transition-all duration-300">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">Encapsulation</h4>
                    <p className="text-gray-300 text-sm mb-4">Data hiding and bundling data with methods that operate on that data.</p>
                    <div className="bg-gray-900 p-3 rounded text-xs">
                      <pre className="text-green-400 font-mono">
{`private String name;
public String getName() {
    return name;
}`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600 hover:ring-2 hover:ring-green-500/30 transition-all duration-300">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">Inheritance</h4>
                    <p className="text-gray-300 text-sm mb-4">Creating new classes based on existing ones, inheriting their properties and methods.</p>
                    <div className="bg-gray-900 p-3 rounded text-xs">
                      <pre className="text-green-400 font-mono">
{`class Dog extends Animal {
    // Dog inherits from Animal
}`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600 hover:ring-2 hover:ring-purple-500/30 transition-all duration-300">
                    <h4 className="font-bold text-purple-400 mb-4 text-lg">Polymorphism</h4>
                    <p className="text-gray-300 text-sm mb-4">One interface, multiple implementations. Same method, different behavior.</p>
                    <div className="bg-gray-900 p-3 rounded text-xs">
                      <pre className="text-green-400 font-mono">
{`animal.makeSound();
// Different sounds for different animals`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600 hover:ring-2 hover:ring-yellow-500/30 transition-all duration-300">
                    <h4 className="font-bold text-yellow-400 mb-4 text-lg">Abstraction</h4>
                    <p className="text-gray-300 text-sm mb-4">Hiding complex implementation details and showing only essential features.</p>
                    <div className="bg-gray-900 p-3 rounded text-xs">
                      <pre className="text-green-400 font-mono">
{`abstract class Vehicle {
    abstract void start();
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">2. Classes and Objects</h3>
                <p className="text-gray-300 mb-6">A class is a blueprint for creating objects. An object is an instance of a class.</p>
                
                <div className="space-y-6">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">Class Definition</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`public class Car {
    // Fields (attributes)
    private String brand;
    private String model;
    private int year;
    private boolean isRunning;
    
    // Constructor
    public Car(String brand, String model, int year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.isRunning = false;
    }
    
    // Methods (behaviors)
    public void start() {
        if (!isRunning) {
            isRunning = true;
            System.out.println("Car started!");
        } else {
            System.out.println("Car is already running!");
        }
    }
    
    public void stop() {
        if (isRunning) {
            isRunning = false;
            System.out.println("Car stopped!");
        } else {
            System.out.println("Car is already stopped!");
        }
    }
    
    // Getters and Setters (Encapsulation)
    public String getBrand() { return brand; }
    public String getModel() { return model; }
    public int getYear() { return year; }
    public boolean isRunning() { return isRunning; }
    
    public void setBrand(String brand) { this.brand = brand; }
    public void setModel(String model) { this.model = model; }
    public void setYear(int year) { this.year = year; }
    
    // Method to display car information
    public void displayInfo() {
        System.out.printf("Car: %s %s (%d) - %s%n", 
                        brand, model, year, 
                        isRunning ? "Running" : "Stopped");
    }
}`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">Object Creation and Usage</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`public class CarDemo {
    public static void main(String[] args) {
        // Creating objects (instances of Car class)
        Car car1 = new Car("Toyota", "Camry", 2023);
        Car car2 = new Car("Honda", "Civic", 2022);
        
        // Using object methods
        car1.displayInfo();
        car1.start();
        car1.displayInfo();
        
        car2.displayInfo();
        car2.start();
        car2.stop();
        car2.displayInfo();
        
        // Modifying object properties
        car1.setBrand("Lexus");
        car1.setModel("ES");
        car1.displayInfo();
        
        // Array of objects
        Car[] cars = {car1, car2};
        for (Car car : cars) {
            car.displayInfo();
        }
    }
}`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">3. Inheritance</h3>
                <p className="text-gray-300 mb-6">Inheritance allows a class to inherit properties and methods from another class.</p>
                
                <div className="space-y-6">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">Parent Class (Superclass)</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`public class Vehicle {
    protected String brand;
    protected int year;
    protected boolean isRunning;
    
    public Vehicle(String brand, int year) {
        this.brand = brand;
        this.year = year;
        this.isRunning = false;
    }
    
    public void start() {
        isRunning = true;
        System.out.println("Vehicle started!");
    }
    
    public void stop() {
        isRunning = false;
        System.out.println("Vehicle stopped!");
    }
    
    public void displayInfo() {
        System.out.printf("Vehicle: %s (%d) - %s%n", 
                        brand, year, 
                        isRunning ? "Running" : "Stopped");
    }
}`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">Child Class (Subclass)</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`public class Car extends Vehicle {
    private int numberOfDoors;
    private String fuelType;
    
    public Car(String brand, int year, int doors, String fuel) {
        super(brand, year); // Call parent constructor
        this.numberOfDoors = doors;
        this.fuelType = fuel;
    }
    
    // Method overriding (Polymorphism)
    @Override
    public void start() {
        super.start(); // Call parent method
        System.out.println("Car engine started with " + fuelType + " fuel!");
    }
    
    // Additional methods specific to Car
    public void openTrunk() {
        System.out.println("Trunk opened!");
    }
    
    public void honk() {
        System.out.println("Beep beep!");
    }
    
    @Override
    public void displayInfo() {
        super.displayInfo();
        System.out.printf("Doors: %d, Fuel: %s%n", 
                        numberOfDoors, fuelType);
    }
}`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">4. Polymorphism</h3>
                <p className="text-gray-300 mb-6">Polymorphism allows objects of different types to be treated as objects of a common base type.</p>
                
                <div className="bg-gray-700 p-6 rounded border border-gray-600">
                  <h4 className="font-bold text-green-400 mb-4 text-lg">Runtime Polymorphism Example</h4>
                  <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`public class PolymorphismDemo {
    public static void main(String[] args) {
        // Creating objects of different types
        Vehicle vehicle1 = new Vehicle("Generic", 2023);
        Vehicle vehicle2 = new Car("Toyota", 2023, 4, "Gasoline");
        Vehicle vehicle3 = new Motorcycle("Honda", 2023, "Sport");
        
        // Array of Vehicle references
        Vehicle[] vehicles = {vehicle1, vehicle2, vehicle3};
        
        // Polymorphic method calls
        for (Vehicle vehicle : vehicles) {
            vehicle.start(); // Different behavior for each type
            vehicle.displayInfo();
            System.out.println("---");
        }
        
        // Type checking and casting
        if (vehicle2 instanceof Car) {
            Car car = (Car) vehicle2;
            car.honk(); // Car-specific method
        }
    }
}

class Motorcycle extends Vehicle {
    private String type;
    
    public Motorcycle(String brand, int year, String type) {
        super(brand, year);
        this.type = type;
    }
    
    @Override
    public void start() {
        super.start();
        System.out.println("Motorcycle engine revved!");
    }
    
    public void wheelie() {
        System.out.println("Doing a wheelie!");
    }
}`}
                  </pre>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">5. Abstraction and Interfaces</h3>
                <p className="text-gray-300 mb-6">Abstraction hides complex implementation details and shows only essential features.</p>
                
                <div className="space-y-6">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">Abstract Class</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`abstract class Shape {
    protected String color;
    
    public Shape(String color) {
        this.color = color;
    }
    
    // Abstract method - must be implemented by subclasses
    public abstract double getArea();
    public abstract double getPerimeter();
    
    // Concrete method - shared by all subclasses
    public void displayInfo() {
        System.out.printf("Shape color: %s%n", color);
        System.out.printf("Area: %.2f%n", getArea());
        System.out.printf("Perimeter: %.2f%n", getPerimeter());
    }
}

class Circle extends Shape {
    private double radius;
    
    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }
    
    @Override
    public double getArea() {
        return Math.PI * radius * radius;
    }
    
    @Override
    public double getPerimeter() {
        return 2 * Math.PI * radius;
    }
}`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">Interface</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`interface Drawable {
    void draw();
    void erase();
    default void display() {
        System.out.println("Displaying drawable object");
    }
}

interface Movable {
    void move(int x, int y);
    void stop();
}

class Rectangle extends Shape implements Drawable, Movable {
    private double width, height;
    private int x, y;
    
    public Rectangle(String color, double width, double height) {
        super(color);
        this.width = width;
        this.height = height;
    }
    
    @Override
    public double getArea() {
        return width * height;
    }
    
    @Override
    public double getPerimeter() {
        return 2 * (width + height);
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing rectangle");
    }
    
    @Override
    public void erase() {
        System.out.println("Erasing rectangle");
    }
    
    @Override
    public void move(int x, int y) {
        this.x = x;
        this.y = y;
        System.out.printf("Moved to (%d, %d)%n", x, y);
    }
    
    @Override
    public void stop() {
        System.out.println("Stopped moving");
    }
}`}
                    </pre>
                  </div>
                </div>
              </div>

          <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift hover:ring-2 hover:ring-orange-500/30 hover:ring-opacity-50 transition-all duration-300">
            <h3 className="text-2xl font-bold text-green-400 mb-6 neon-glow">Comprehensive OOP Example: Bank Account System</h3>
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 mb-6">
              <h4 className="text-lg font-bold text-blue-400 mb-4">BankAccount.java</h4>
              <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`// Base class - BankAccount
public class BankAccount {
    protected String accountNumber;
    protected String accountHolder;
    protected double balance;
    
    // Constructor
    public BankAccount(String accountNumber, String accountHolder, double initialBalance) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = initialBalance;
    }
    
    // Methods
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.printf("Deposited $%.2f. New balance: $%.2f%n", amount, balance);
        } else {
            System.out.println("Invalid deposit amount!");
        }
    }
    
    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.printf("Withdrew $%.2f. New balance: $%.2f%n", amount, balance);
        } else {
            System.out.println("Invalid withdrawal amount or insufficient funds!");
        }
    }
    
    public void displayBalance() {
        System.out.printf("Account: %s, Holder: %s, Balance: $%.2f%n", 
                         accountNumber, accountHolder, balance);
    }
    
    // Getters
    public String getAccountNumber() { return accountNumber; }
    public String getAccountHolder() { return accountHolder; }
    public double getBalance() { return balance; }
}

// Derived class - SavingsAccount (Inheritance)
class SavingsAccount extends BankAccount {
    private double interestRate;
    
    public SavingsAccount(String accountNumber, String accountHolder, 
                         double initialBalance, double interestRate) {
        super(accountNumber, accountHolder, initialBalance);
        this.interestRate = interestRate;
    }
    
    // Method overriding (Polymorphism)
    @Override
    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.printf("Withdrew $%.2f from savings. New balance: $%.2f%n", 
                             amount, balance);
        } else {
            System.out.println("Invalid withdrawal amount or insufficient funds!");
        }
    }
    
    public void addInterest() {
        double interest = balance * interestRate / 100;
        balance += interest;
        System.out.printf("Added interest: $%.2f. New balance: $%.2f%n", 
                         interest, balance);
    }
    
    public double getInterestRate() { return interestRate; }
}

// Interface - AccountOperations (Abstraction)
interface AccountOperations {
    void transfer(BankAccount toAccount, double amount);
    void closeAccount();
}

// Implementation of interface
class CheckingAccount extends BankAccount implements AccountOperations {
    private double overdraftLimit;
    
    public CheckingAccount(String accountNumber, String accountHolder, 
                          double initialBalance, double overdraftLimit) {
        super(accountNumber, accountHolder, initialBalance);
        this.overdraftLimit = overdraftLimit;
    }
    
    @Override
    public void withdraw(double amount) {
        if (amount > 0 && amount <= (balance + overdraftLimit)) {
            balance -= amount;
            System.out.printf("Withdrew $%.2f from checking. New balance: $%.2f%n", 
                             amount, balance);
        } else {
            System.out.println("Exceeds overdraft limit!");
        }
    }
    
    @Override
    public void transfer(BankAccount toAccount, double amount) {
        if (amount > 0 && amount <= (balance + overdraftLimit)) {
            this.withdraw(amount);
            toAccount.deposit(amount);
            System.out.printf("Transferred $%.2f to account %s%n", 
                             amount, toAccount.getAccountNumber());
        } else {
            System.out.println("Transfer failed: insufficient funds!");
        }
    }
    
    @Override
    public void closeAccount() {
        if (balance == 0) {
            System.out.println("Account closed successfully.");
        } else {
            System.out.println("Cannot close account with remaining balance.");
        }
    }
}

// Main class to demonstrate OOP concepts
public class BankSystemDemo {
    public static void main(String[] args) {
        System.out.println("=== OHG 365 Bank Account System Demo ===");
        
        // Create accounts
        SavingsAccount savings = new SavingsAccount("SAV001", "John Doe", 1000.0, 2.5);
        CheckingAccount checking = new CheckingAccount("CHK001", "Jane Smith", 500.0, 200.0);
        
        // Demonstrate operations
        savings.displayBalance();
        savings.deposit(500.0);
        savings.addInterest();
        
        checking.displayBalance();
        checking.withdraw(300.0);
        checking.transfer(savings, 100.0);
        
        // Polymorphism - same method, different behavior
        BankAccount[] accounts = {savings, checking};
        for (BankAccount account : accounts) {
            account.displayBalance();
        }
    }
}`}
              </pre>
            </div>
            
            <div className="space-y-6">
              <div className="bg-purple-900/30 border border-purple-500/30 p-4 rounded-lg">
                <h4 className="text-purple-300 font-bold mb-2">🏗️ OOP Concepts Demonstrated</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• <strong>Encapsulation:</strong> Private fields with public methods</li>
                  <li>• <strong>Inheritance:</strong> SavingsAccount extends BankAccount</li>
                  <li>• <strong>Polymorphism:</strong> Method overriding and interface implementation</li>
                  <li>• <strong>Abstraction:</strong> Interface AccountOperations</li>
                  <li>• <strong>Constructor:</strong> Object initialization</li>
                  <li>• <strong>Method Overriding:</strong> Different withdraw behaviors</li>
                </ul>
              </div>
              
              <div className="bg-blue-900/30 border border-blue-500/30 p-4 rounded-lg">
                <h4 className="text-blue-300 font-bold mb-2">📊 Sample Output</h4>
                <div className="bg-gray-900 p-3 rounded text-sm">
                  <pre className="text-green-400 font-mono">
{`=== OHG 365 Bank Account System Demo ===
Account: SAV001, Holder: John Doe, Balance: $1000.00
Deposited $500.00. New balance: $1500.00
Added interest: $37.50. New balance: $1537.50
Account: CHK001, Holder: Jane Smith, Balance: $500.00
Withdrew $300.00 from checking. New balance: $200.00
Withdrew $100.00 from checking. New balance: $100.00
Deposited $100.00. New balance: $1637.50
Transferred $100.00 to account SAV001
Account: SAV001, Holder: John Doe, Balance: $1637.50
Account: CHK001, Holder: Jane Smith, Balance: $100.00`}
                  </pre>
                </div>
              </div>
            </div>
              </div>
            </div>
          </div>
        );
      
      case 'keywords':
        return (
          <div className="animate-fade-in-up">
            <h1 id="keywords" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              ☕ Java Keywords
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Essential Java reserved words and their usage
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="keywords" className="text-3xl font-bold text-orange-400 mb-6">4. Java Keywords</h2>
              
              <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift hover:ring-2 hover:ring-orange-500/30 hover:ring-opacity-50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-green-400 mb-6 neon-glow">Understanding Java Keywords</h3>
                <p className="text-gray-300 mb-6 text-lg">
                  Java keywords are reserved words that have special meaning in the Java language. They cannot be used as identifiers (variable names, method names, class names, etc.) and are essential for defining the structure and behavior of Java programs.
                </p>
                
                <div className="bg-yellow-900 border border-yellow-700 p-4 rounded-lg mb-6">
                  <p className="text-yellow-300 font-semibold">📌 Java has 50+ keywords. Understanding their proper usage is crucial for writing correct and efficient Java code.</p>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">1. Access Modifiers</h3>
                <p className="text-gray-300 mb-6">Control the visibility and accessibility of classes, methods, and variables.</p>
                
                <div className="space-y-6 mb-8">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">Access Modifier Keywords</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`// public - accessible from anywhere
public class PublicClass {
    public int publicVar = 10;
    public void publicMethod() {
        System.out.println("Public method");
    }
}

// private - accessible only within the same class
class PrivateExample {
    private int privateVar = 20;
    private void privateMethod() {
        System.out.println("Private method");
    }
    
    public void accessPrivate() {
        System.out.println(privateVar); // OK - same class
        privateMethod(); // OK - same class
    }
}

// protected - accessible in same package and subclasses
class ProtectedExample {
    protected int protectedVar = 30;
    protected void protectedMethod() {
        System.out.println("Protected method");
    }
}

// default (package-private) - accessible in same package
class DefaultExample {
    int defaultVar = 40; // No modifier = default
    void defaultMethod() {
        System.out.println("Default method");
    }
}`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">Access Modifier Visibility</h4>
                    <div className="bg-gray-900 p-4 rounded mb-4">
                      <table className="text-green-400 font-mono text-sm w-full">
                        <thead>
                          <tr className="border-b border-gray-600">
                            <th className="text-left p-2">Modifier</th>
                            <th className="text-left p-2">Same Class</th>
                            <th className="text-left p-2">Same Package</th>
                            <th className="text-left p-2">Subclass</th>
                            <th className="text-left p-2">Other</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">public</td>
                            <td className="p-2">✓</td>
                            <td className="p-2">✓</td>
                            <td className="p-2">✓</td>
                            <td className="p-2">✓</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">protected</td>
                            <td className="p-2">✓</td>
                            <td className="p-2">✓</td>
                            <td className="p-2">✓</td>
                            <td className="p-2">✗</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">default</td>
                            <td className="p-2">✓</td>
                            <td className="p-2">✓</td>
                            <td className="p-2">✗</td>
                            <td className="p-2">✗</td>
                          </tr>
                          <tr>
                            <td className="p-2">private</td>
                            <td className="p-2">✓</td>
                            <td className="p-2">✗</td>
                            <td className="p-2">✗</td>
                            <td className="p-2">✗</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">2. Class and Object Keywords</h3>
                <p className="text-gray-300 mb-6">Keywords used for defining classes, interfaces, and object behavior.</p>
                
                <div className="space-y-6">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">Class Definition Keywords</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`// class - defines a class
class MyClass {
    // class body
}

// abstract - cannot be instantiated
abstract class AbstractClass {
    abstract void abstractMethod(); // Must be implemented by subclass
    void concreteMethod() {
        System.out.println("Concrete method");
    }
}

// final - cannot be extended or modified
final class FinalClass {
    final int finalVar = 100; // Cannot be changed
    final void finalMethod() {
        System.out.println("Cannot be overridden");
    }
}

// interface - defines a contract
interface MyInterface {
    void interfaceMethod(); // Implicitly public and abstract
    default void defaultMethod() {
        System.out.println("Default implementation");
    }
}

// enum - defines enumerated types
enum Color {
    RED, GREEN, BLUE;
    
    public void printColor() {
        System.out.println("Color: " + this);
    }
}`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">Object Keywords</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`// static - belongs to class, not instance
class StaticExample {
    static int staticVar = 10;
    static void staticMethod() {
        System.out.println("Static method");
    }
    
    // Access: StaticExample.staticVar
}

// this - reference to current object
class ThisExample {
    private String name;
    
    public ThisExample(String name) {
        this.name = name; // 'this' refers to current object
    }
    
    public void printName() {
        System.out.println(this.name);
    }
}

// super - reference to parent class
class Parent {
    protected String parentField = "Parent";
}

class Child extends Parent {
    private String childField = "Child";
    
    public void printFields() {
        System.out.println(super.parentField); // Access parent field
        System.out.println(this.childField);   // Access own field
    }
}

// instanceof - checks object type
public void checkType(Object obj) {
    if (obj instanceof String) {
        System.out.println("It's a String");
    } else if (obj instanceof Integer) {
        System.out.println("It's an Integer");
    }
}`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">3. Control Flow Keywords</h3>
                <p className="text-gray-300 mb-6">Keywords that control the flow of program execution.</p>
                
                <div className="space-y-6">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">Conditional Keywords</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`// if, else, else if - conditional execution
int score = 85;
if (score >= 90) {
    System.out.println("Grade A");
} else if (score >= 80) {
    System.out.println("Grade B");
} else if (score >= 70) {
    System.out.println("Grade C");
} else {
    System.out.println("Grade F");
}

// switch, case, default - multi-way selection
int day = 3;
switch (day) {
    case 1:
        System.out.println("Monday");
        break;
    case 2:
        System.out.println("Tuesday");
        break;
    case 3:
        System.out.println("Wednesday");
        break;
    default:
        System.out.println("Invalid day");
        break;
}

// ternary operator (conditional operator)
int a = 10, b = 20;
int max = (a > b) ? a : b; // If a > b, return a, else return b`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">Loop Keywords</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`// for - definite iteration
for (int i = 0; i < 5; i++) {
    System.out.println("Count: " + i);
}

// while - indefinite iteration
int count = 0;
while (count < 5) {
    System.out.println("While count: " + count);
    count++;
}

// do-while - executes at least once
int num = 0;
do {
    System.out.println("Do-while: " + num);
    num++;
} while (num < 3);

// break - exit loop immediately
for (int i = 0; i < 10; i++) {
    if (i == 5) {
        break; // Exit loop when i equals 5
    }
    System.out.println("i = " + i);
}

// continue - skip current iteration
for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) {
        continue; // Skip even numbers
    }
    System.out.println("Odd: " + i);
}`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">4. Exception Handling Keywords</h3>
                <p className="text-gray-300 mb-6">Keywords for handling errors and exceptional conditions.</p>
                
                <div className="space-y-6">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">Exception Keywords</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`// try, catch, finally - exception handling
try {
    int result = 10 / 0; // This will throw ArithmeticException
} catch (ArithmeticException e) {
    System.out.println("Division by zero: " + e.getMessage());
} catch (Exception e) {
    System.out.println("General exception: " + e.getMessage());
} finally {
    System.out.println("This always executes");
}

// throw - throw an exception
public void validateAge(int age) throws IllegalArgumentException {
    if (age < 0) {
        throw new IllegalArgumentException("Age cannot be negative");
    }
    if (age > 150) {
        throw new IllegalArgumentException("Age cannot be greater than 150");
    }
}

// throws - declare exceptions that method might throw
public void riskyMethod() throws IOException, SQLException {
    // Method that might throw these exceptions
}

// assert - assertion for debugging
public void assertExample(int value) {
    assert value > 0 : "Value must be positive";
    System.out.println("Value is positive: " + value);
}`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">Advanced Exception Handling</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`// try-with-resources - automatic resource management
try (FileInputStream fis = new FileInputStream("file.txt");
     BufferedReader reader = new BufferedReader(new InputStreamReader(fis))) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException e) {
    System.out.println("Error reading file: " + e.getMessage());
}
// Resources are automatically closed

// Multiple catch blocks
try {
    // Some code that might throw exceptions
} catch (NullPointerException e) {
    System.out.println("Null pointer: " + e.getMessage());
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Array index out of bounds: " + e.getMessage());
} catch (Exception e) {
    System.out.println("Other exception: " + e.getMessage());
}

// Custom exception
class CustomException extends Exception {
    public CustomException(String message) {
        super(message);
    }
}

public void throwCustomException() throws CustomException {
    throw new CustomException("This is a custom exception");
}`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">5. Data Type and Variable Keywords</h3>
                <p className="text-gray-300 mb-6">Keywords for declaring and managing data types and variables.</p>
                
                <div className="space-y-6">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">Primitive Data Types</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`// Primitive data type keywords
byte b = 127;           // 8-bit integer
short s = 32767;        // 16-bit integer
int i = 2147483647;     // 32-bit integer
long l = 9223372036854775807L; // 64-bit integer

float f = 3.14f;        // 32-bit floating point
double d = 3.14159265359; // 64-bit floating point

char c = 'A';           // 16-bit Unicode character
boolean bool = true;    // true or false

// Literal keywords
boolean isTrue = true;
boolean isFalse = false;
String nullValue = null;

// Type casting
int intValue = 100;
double doubleValue = (double) intValue; // Explicit cast
long longValue = intValue; // Implicit cast (widening)`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">Variable Modifiers</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`// final - constant (cannot be changed)
final int MAX_SIZE = 100;
final String COMPANY_NAME = "OHG 365";

// static - belongs to class
class Counter {
    static int count = 0; // Shared among all instances
    static void increment() {
        count++;
    }
}

// volatile - ensures visibility across threads
volatile boolean flag = false;

// transient - not serialized
class User implements Serializable {
    private String name;
    private transient String password; // Won't be serialized
}

// var - local variable type inference (Java 10+)
var list = new ArrayList<String>();
var map = new HashMap<String, Integer>();
var number = 42; // Inferred as int

// const - reserved but not used in Java
// const int x = 10; // This would cause compilation error`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-6 rounded-lg border border-blue-500/30 mb-8">
                <h3 className="text-xl font-bold text-blue-400 mb-4">Complete Java Keywords List</h3>
                <div className="space-y-4">
                  <div className="bg-gray-800 p-4 rounded">
                    <h4 className="text-green-400 font-bold mb-2">Access Modifiers</h4>
                    <p className="text-gray-300 text-sm">public, private, protected</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded">
                    <h4 className="text-blue-400 font-bold mb-2">Class & Interface</h4>
                    <p className="text-gray-300 text-sm">class, interface, abstract, final, enum</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded">
                    <h4 className="text-purple-400 font-bold mb-2">Control Flow</h4>
                    <p className="text-gray-300 text-sm">if, else, switch, case, default, for, while, do, break, continue</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded">
                    <h4 className="text-yellow-400 font-bold mb-2">Exception Handling</h4>
                    <p className="text-gray-300 text-sm">try, catch, finally, throw, throws, assert</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded">
                    <h4 className="text-red-400 font-bold mb-2">Object & Reference</h4>
                    <p className="text-gray-300 text-sm">this, super, instanceof, new</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded">
                    <h4 className="text-indigo-400 font-bold mb-2">Modifiers</h4>
                    <p className="text-gray-300 text-sm">static, final, volatile, transient, synchronized, native</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded">
                    <h4 className="text-pink-400 font-bold mb-2">Data Types</h4>
                    <p className="text-gray-300 text-sm">byte, short, int, long, float, double, char, boolean, void</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded">
                    <h4 className="text-cyan-400 font-bold mb-2">Literals</h4>
                    <p className="text-gray-300 text-sm">true, false, null</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift hover:ring-2 hover:ring-orange-500/30 hover:ring-opacity-50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-green-400 mb-6 neon-glow">Practical Example: Keyword Usage in Real Application</h3>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 mb-6">
                  <h4 className="text-lg font-bold text-blue-400 mb-4">KeywordDemo.java</h4>
                  <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`package com.ohg365.examples;

import java.io.*;
import java.util.*;

/**
 * Comprehensive example demonstrating Java keywords usage
 * This class showcases various keywords in a real-world context
 */
public class KeywordDemo {
    // Static final constants
    private static final String APP_NAME = "OHG 365 Keyword Demo";
    private static final int MAX_ATTEMPTS = 3;
    
    // Instance variables with different access modifiers
    private String userName;
    protected int userAge;
    public boolean isActive;
    
    // Static variable shared across all instances
    private static int instanceCount = 0;
    
    // Constructor
    public KeywordDemo(String userName, int userAge) {
        this.userName = userName;
        this.userAge = userAge;
        this.isActive = true;
        instanceCount++;
    }
    
    // Static method - can be called without creating instance
    public static void printAppInfo() {
        System.out.println("Application: " + APP_NAME);
        System.out.println("Instance count: " + instanceCount);
    }
    
    // Public method with exception handling
    public void processUserData() throws IllegalArgumentException {
        try {
            // Validate user data
            if (userName == null || userName.isEmpty()) {
                throw new IllegalArgumentException("Username cannot be null or empty");
            }
            
            if (userAge < 0 || userAge > 150) {
                throw new IllegalArgumentException("Age must be between 0 and 150");
            }
            
            // Process data based on age
            if (userAge < 18) {
                System.out.println("User is a minor");
            } else if (userAge >= 18 && userAge < 65) {
                System.out.println("User is an adult");
            } else {
                System.out.println("User is a senior");
            }
            
        } catch (IllegalArgumentException e) {
            System.err.println("Validation error: " + e.getMessage());
            throw e; // Re-throw the exception
        } finally {
            System.out.println("User data processing completed");
        }
    }
    
    // Method demonstrating control flow keywords
    public void demonstrateControlFlow() {
        System.out.println("\\n=== Control Flow Demonstration ===");
        
        // if-else statement
        if (isActive) {
            System.out.println("User is active");
        } else {
            System.out.println("User is inactive");
        }
        
        // switch statement
        switch (userAge / 10) {
            case 0:
            case 1:
                System.out.println("Age group: 0-19");
                break;
            case 2:
                System.out.println("Age group: 20-29");
                break;
            case 3:
                System.out.println("Age group: 30-39");
                break;
            default:
                System.out.println("Age group: 40+");
                break;
        }
        
        // for loop
        for (int i = 0; i < 5; i++) {
            if (i == 2) {
                continue; // Skip iteration when i equals 2
            }
            if (i == 4) {
                break; // Exit loop when i equals 4
            }
            System.out.println("Loop iteration: " + i);
        }
        
        // while loop
        int count = 0;
        while (count < 3) {
            System.out.println("While loop count: " + count);
            count++;
        }
    }
    
    // Method demonstrating object keywords
    public void demonstrateObjectKeywords() {
        System.out.println("\\n=== Object Keywords Demonstration ===");
        
        // this keyword
        System.out.println("Current object username: " + this.userName);
        
        // instanceof keyword
        Object obj = this;
        if (obj instanceof KeywordDemo) {
            System.out.println("Object is instance of KeywordDemo");
        }
        
        // new keyword (creating new objects)
        String[] hobbies = new String[]{"Reading", "Coding", "Gaming"};
        for (String hobby : hobbies) {
            System.out.println("Hobby: " + hobby);
        }
    }
    
    // Method demonstrating data type keywords
    public void demonstrateDataTypes() {
        System.out.println("\\n=== Data Type Keywords Demonstration ===");
        
        // Primitive data types
        byte byteValue = 127;
        short shortValue = 32767;
        int intValue = 2147483647;
        long longValue = 9223372036854775807L;
        float floatValue = 3.14f;
        double doubleValue = 3.14159265359;
        char charValue = 'A';
        boolean booleanValue = true;
        
        System.out.println("Byte: " + byteValue);
        System.out.println("Short: " + shortValue);
        System.out.println("Int: " + intValue);
        System.out.println("Long: " + longValue);
        System.out.println("Float: " + floatValue);
        System.out.println("Double: " + doubleValue);
        System.out.println("Char: " + charValue);
        System.out.println("Boolean: " + booleanValue);
        
        // Literal keywords
        String nullString = null;
        boolean trueValue = true;
        boolean falseValue = false;
        
        System.out.println("Null string: " + nullString);
        System.out.println("True value: " + trueValue);
        System.out.println("False value: " + falseValue);
    }
    
    // Final method - cannot be overridden
    public final void finalMethod() {
        System.out.println("This is a final method and cannot be overridden");
    }
    
    // Static method to demonstrate static keyword
    public static void demonstrateStatic() {
        System.out.println("\\n=== Static Keyword Demonstration ===");
        System.out.println("This method belongs to the class, not any instance");
        System.out.println("Current instance count: " + instanceCount);
    }
    
    // Main method - entry point of the program
    public static void main(String[] args) {
        System.out.println("=== " + APP_NAME + " ===");
        
        // Create instances
        KeywordDemo demo1 = new KeywordDemo("Alice", 25);
        KeywordDemo demo2 = new KeywordDemo("Bob", 17);
        
        // Call static method
        printAppInfo();
        
        // Demonstrate various keyword usages
        demo1.demonstrateControlFlow();
        demo1.demonstrateObjectKeywords();
        demo1.demonstrateDataTypes();
        
        // Demonstrate static method
        demonstrateStatic();
        
        // Demonstrate exception handling
        try {
            demo1.processUserData();
            demo2.processUserData();
        } catch (IllegalArgumentException e) {
            System.err.println("Error processing user data: " + e.getMessage());
        }
        
        // Demonstrate final method
        demo1.finalMethod();
        
        System.out.println("\\n=== Program completed successfully ===");
    }
}`}
                  </pre>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-green-900/30 border border-green-500/30 p-4 rounded-lg">
                    <h4 className="text-green-300 font-bold mb-2">🎯 Keywords Demonstrated</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Access modifiers (public, private, protected)</li>
                      <li>• Class keywords (class, static, final)</li>
                      <li>• Control flow (if, else, switch, for, while)</li>
                      <li>• Exception handling (try, catch, finally, throw)</li>
                      <li>• Object keywords (this, new, instanceof)</li>
                      <li>• Data types (byte, int, long, float, double, char, boolean)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-900/30 border border-blue-500/30 p-4 rounded-lg">
                    <h4 className="text-blue-300 font-bold mb-2">📊 Sample Output</h4>
                    <div className="bg-gray-900 p-3 rounded text-sm">
                      <pre className="text-green-400 font-mono">
{`=== OHG 365 Keyword Demo ===
Application: OHG 365 Keyword Demo
Instance count: 2

=== Control Flow Demonstration ===
User is active
Age group: 20-29
Loop iteration: 0
Loop iteration: 1
Loop iteration: 3
While loop count: 0
While loop count: 1
While loop count: 2

=== Object Keywords Demonstration ===
Current object username: Alice
Object is instance of KeywordDemo
Hobby: Reading
Hobby: Coding
Hobby: Gaming`}
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
              ☕ Strings & String Handling
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Master String manipulation and handling in Java
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="strings" className="text-3xl font-bold text-orange-400 mb-6">5. Strings & String Handling</h2>
              
              <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift hover:ring-2 hover:ring-orange-500/30 hover:ring-opacity-50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-green-400 mb-6 neon-glow">Understanding Java Strings</h3>
                <p className="text-gray-300 mb-6 text-lg">
                  Strings in Java are objects that represent sequences of characters. They are immutable, meaning once created, their content cannot be changed. 
                  Java provides several classes for string manipulation: String, StringBuilder, and StringBuffer, each with specific use cases and performance characteristics.
                </p>
                
                <div className="bg-yellow-900 border border-yellow-700 p-4 rounded-lg mb-6">
                  <p className="text-yellow-300 font-semibold">📌 String manipulation is one of the most common operations in Java programming. Understanding the differences between String, StringBuilder, and StringBuffer is crucial for writing efficient code.</p>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">1. String Class - Immutable Strings</h3>
                <p className="text-gray-300 mb-6">The String class represents immutable character sequences. Once created, String objects cannot be modified.</p>
                
                <div className="space-y-6 mb-8">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">String Creation and Immutability</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`// Different ways to create strings
String str1 = "Hello World";                    // String literal
String str2 = new String("Hello World");       // Using constructor
String str3 = new String(new char[]{'H','e','l','l','o'});
String str4 = String.valueOf(123);             // Convert number to string

// String immutability demonstration
String original = "Hello";
String modified = original.concat(" World");
System.out.println("Original: " + original);    // Still "Hello"
System.out.println("Modified: " + modified);    // "Hello World"

// String pool concept
String s1 = "Java";
String s2 = "Java";
String s3 = new String("Java");
System.out.println(s1 == s2);    // true (same reference)
System.out.println(s1 == s3);    // false (different references)
System.out.println(s1.equals(s3)); // true (same content)`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">String Methods - Basic Operations</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`String text = "Hello World Java Programming";

// Length and character access
int length = text.length();                    // 28
char firstChar = text.charAt(0);              // 'H'
char lastChar = text.charAt(text.length()-1); // 'g'

// Substring operations
String sub1 = text.substring(6);              // "World Java Programming"
String sub2 = text.substring(6, 11);          // "World"

// Case conversion
String upper = text.toUpperCase();            // "HELLO WORLD JAVA PROGRAMMING"
String lower = text.toLowerCase();            // "hello world java programming"

// String comparison
boolean equals1 = text.equals("Hello World Java Programming"); // true
boolean equals2 = text.equalsIgnoreCase("HELLO WORLD JAVA PROGRAMMING"); // true
int compare = text.compareTo("Hello");        // Positive number

// Searching
int index1 = text.indexOf("World");           // 6
int index2 = text.lastIndexOf("a");           // 25
boolean contains = text.contains("Java");     // true
boolean starts = text.startsWith("Hello");    // true
boolean ends = text.endsWith("Programming");  // true`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">2. StringBuilder - Mutable Strings</h3>
                <p className="text-gray-300 mb-6">StringBuilder is mutable and not thread-safe, making it efficient for frequent string modifications.</p>
                
                <div className="space-y-6">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">StringBuilder Operations</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`// Creating StringBuilder
StringBuilder sb1 = new StringBuilder();           // Default capacity 16
StringBuilder sb2 = new StringBuilder("Hello");    // With initial content
StringBuilder sb3 = new StringBuilder(50);         // With initial capacity

// Appending content
sb1.append("Hello");
sb1.append(" ");
sb1.append("World");
sb1.append(123);                    // Append numbers
sb1.append(true);                   // Append booleans

// Inserting content
sb1.insert(5, " Beautiful");        // Insert at specific position
sb1.insert(0, "Say: ");            // Insert at beginning

// Modifying content
sb1.setCharAt(0, 's');             // Change character at index
sb1.replace(4, 9, "Hi");           // Replace substring

// Deleting content
sb1.delete(0, 4);                  // Delete characters
sb1.deleteCharAt(0);               // Delete single character

// Other operations
int length = sb1.length();         // Get current length
int capacity = sb1.capacity();     // Get current capacity
sb1.reverse();                     // Reverse the string
sb1.setLength(10);                 // Set length (truncate or pad)

// Convert to String
String result = sb1.toString();`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">StringBuilder Performance Example</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`// Performance comparison: String vs StringBuilder
public class StringPerformanceDemo {
    public static void main(String[] args) {
        int iterations = 10000;
        
        // Using String (inefficient for many concatenations)
        long startTime = System.currentTimeMillis();
        String result1 = "";
        for (int i = 0; i < iterations; i++) {
            result1 += "Number: " + i + " ";
        }
        long stringTime = System.currentTimeMillis() - startTime;
        
        // Using StringBuilder (efficient)
        startTime = System.currentTimeMillis();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < iterations; i++) {
            sb.append("Number: ").append(i).append(" ");
        }
        String result2 = sb.toString();
        long stringBuilderTime = System.currentTimeMillis() - startTime;
        
        System.out.println("String concatenation time: " + stringTime + "ms");
        System.out.println("StringBuilder time: " + stringBuilderTime + "ms");
        System.out.println("StringBuilder is " + (stringTime/stringBuilderTime) + "x faster");
    }
}`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">3. StringBuffer - Thread-Safe Mutable Strings</h3>
                <p className="text-gray-300 mb-6">StringBuffer is similar to StringBuilder but is thread-safe, making it suitable for multi-threaded environments.</p>
                
                <div className="space-y-6">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">StringBuffer Usage</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`// StringBuffer is thread-safe version of StringBuilder
StringBuffer sb = new StringBuffer("Thread-Safe String");

// All StringBuilder methods are available in StringBuffer
sb.append(" Operations");
sb.insert(0, "Safe ");
sb.replace(0, 4, "Secure");

// Thread-safe operations
synchronized(sb) {
    sb.append(" - Modified safely");
}

// Additional thread-safe methods
sb.ensureCapacity(100);    // Ensure minimum capacity
sb.trimToSize();           // Trim to actual size

String result = sb.toString();

// When to use StringBuffer vs StringBuilder
// Use StringBuffer when:
// - Multiple threads access the same string buffer
// - Thread safety is required
// - Performance is less critical than safety

// Use StringBuilder when:
// - Single-threaded access
// - Maximum performance is required
// - Thread safety is not needed`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">String vs StringBuilder vs StringBuffer</h4>
                    <div className="bg-gray-900 p-4 rounded mb-4">
                      <table className="text-green-400 font-mono text-sm w-full">
                        <thead>
                          <tr className="border-b border-gray-600">
                            <th className="text-left p-2">Feature</th>
                            <th className="text-left p-2">String</th>
                            <th className="text-left p-2">StringBuilder</th>
                            <th className="text-left p-2">StringBuffer</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">Mutability</td>
                            <td className="p-2">Immutable</td>
                            <td className="p-2">Mutable</td>
                            <td className="p-2">Mutable</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">Thread Safety</td>
                            <td className="p-2">Thread-safe</td>
                            <td className="p-2">Not thread-safe</td>
                            <td className="p-2">Thread-safe</td>
                          </tr>
                          <tr className="border-b border-gray-700">
                            <td className="p-2">Performance</td>
                            <td className="p-2">Slow for concatenation</td>
                            <td className="p-2">Fast</td>
                            <td className="p-2">Slower than StringBuilder</td>
                          </tr>
                          <tr>
                            <td className="p-2">Memory</td>
                            <td className="p-2">Creates new objects</td>
                            <td className="p-2">Modifies existing</td>
                            <td className="p-2">Modifies existing</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-purple-400 mb-4">4. Advanced String Operations</h3>
                <p className="text-gray-300 mb-6">Advanced string manipulation techniques and regular expressions.</p>
                
                <div className="space-y-6">
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-green-400 mb-4 text-lg">String Formatting and Parsing</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`// String formatting
String name = "John";
int age = 25;
double salary = 50000.50;

// Using String.format()
String formatted = String.format("Name: %s, Age: %d, Salary: $%.2f", name, age, salary);

// Using printf-style formatting
System.out.printf("Employee: %s is %d years old and earns $%.2f%n", name, age, salary);

// String splitting and joining
String data = "apple,banana,orange,grape";
String[] fruits = data.split(",");              // Split by comma
String joined = String.join(" | ", fruits);     // Join with separator

// String trimming and whitespace
String text = "  Hello World  ";
String trimmed = text.trim();                   // Remove leading/trailing spaces
String stripped = text.strip();                 // Java 11+ - removes all whitespace

// String replacement
String original = "Hello World Hello";
String replaced = original.replace("Hello", "Hi");        // Replace all
String replacedFirst = original.replaceFirst("Hello", "Hi"); // Replace first only

// Regular expressions
String email = "user@example.com";
boolean isValidEmail = email.matches("^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$");

String phone = "123-456-7890";
String cleanPhone = phone.replaceAll("[^0-9]", ""); // Remove non-digits`}
                    </pre>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded border border-gray-600">
                    <h4 className="font-bold text-blue-400 mb-4 text-lg">String Validation and Processing</h4>
                    <pre className="text-green-400 font-mono text-sm bg-gray-900 p-4 rounded">
{`// String validation methods
String input = "Hello123";

// Check if string is empty or null
boolean isEmpty = input.isEmpty();              // false
boolean isBlank = input.isBlank();              // false (Java 11+)

// Check string content
boolean hasLetters = input.matches(".*[a-zA-Z].*");     // true
boolean hasNumbers = input.matches(".*[0-9].*");        // true
boolean isNumeric = input.matches("\\d+");              // false

// String manipulation utilities
public class StringUtils {
    public static String reverse(String str) {
        return new StringBuilder(str).reverse().toString();
    }
    
    public static String capitalize(String str) {
        if (str == null || str.isEmpty()) return str;
        return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
    }
    
    public static String removeWhitespace(String str) {
        return str.replaceAll("\\s+", "");
    }
    
    public static boolean isPalindrome(String str) {
        String cleaned = str.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
        return cleaned.equals(new StringBuilder(cleaned).reverse().toString());
    }
}

// Usage examples
String reversed = StringUtils.reverse("Hello");        // "olleH"
String capitalized = StringUtils.capitalize("hello");  // "Hello"
String cleaned = StringUtils.removeWhitespace("H e l l o"); // "Hello"
boolean palindrome = StringUtils.isPalindrome("racecar"); // true`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-6 rounded-lg border border-blue-500/30 mb-8">
                <h3 className="text-xl font-bold text-blue-400 mb-4">Best Practices for String Handling</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>• <strong>Use String for immutable operations</strong> - when you don't need to modify the string</li>
                  <li>• <strong>Use StringBuilder for single-threaded concatenation</strong> - much more efficient than String concatenation</li>
                  <li>• <strong>Use StringBuffer for multi-threaded environments</strong> - when thread safety is required</li>
                  <li>• <strong>Always use equals() for string comparison</strong> - never use == for content comparison</li>
                  <li>• <strong>Use String.format() for complex formatting</strong> - more readable than concatenation</li>
                  <li>• <strong>Be careful with string concatenation in loops</strong> - use StringBuilder instead</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-gray-600 mb-8 hover-lift hover:ring-2 hover:ring-orange-500/30 hover:ring-opacity-50 transition-all duration-300">
                <h3 className="text-2xl font-bold text-green-400 mb-6 neon-glow">Practical Example: Text Processing Application</h3>
                <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 mb-6">
                  <h4 className="text-lg font-bold text-blue-400 mb-4">TextProcessor.java</h4>
                  <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`package com.ohg365.examples;

import java.util.*;
import java.util.regex.Pattern;

/**
 * Comprehensive text processing application demonstrating string handling
 */
public class TextProcessor {
    private static final Pattern EMAIL_PATTERN = 
        Pattern.compile("^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$");
    private static final Pattern PHONE_PATTERN = 
        Pattern.compile("^\\+?[1-9]\\d{1,14}$");
    
    /**
     * Process and clean text input
     */
    public static String processText(String input) {
        if (input == null || input.trim().isEmpty()) {
            return "";
        }
        
        // Remove extra whitespace and normalize
        String cleaned = input.trim().replaceAll("\\s+", " ");
        
        // Capitalize first letter of each sentence
        String[] sentences = cleaned.split("\\. ");
        StringBuilder result = new StringBuilder();
        
        for (int i = 0; i < sentences.length; i++) {
            if (!sentences[i].isEmpty()) {
                String sentence = sentences[i].trim();
                if (!sentence.endsWith(".") && i < sentences.length - 1) {
                    sentence += ".";
                }
                result.append(capitalizeFirst(sentence));
                if (i < sentences.length - 1) {
                    result.append(" ");
                }
            }
        }
        
        return result.toString();
    }
    
    /**
     * Extract and validate email addresses from text
     */
    public static List<String> extractEmails(String text) {
        List<String> emails = new ArrayList<>();
        String[] words = text.split("\\s+");
        
        for (String word : words) {
            // Remove punctuation from word
            String cleanWord = word.replaceAll("[^\\w@.-]", "");
            if (isValidEmail(cleanWord)) {
                emails.add(cleanWord);
            }
        }
        
        return emails;
    }
    
    /**
     * Extract and format phone numbers
     */
    public static List<String> extractPhoneNumbers(String text) {
        List<String> phones = new ArrayList<>();
        String[] words = text.split("\\s+");
        
        for (String word : words) {
            String cleanNumber = word.replaceAll("[^0-9+]", "");
            if (isValidPhone(cleanNumber)) {
                phones.add(formatPhoneNumber(cleanNumber));
            }
        }
        
        return phones;
    }
    
    /**
     * Count word frequency in text
     */
    public static Map<String, Integer> getWordFrequency(String text) {
        Map<String, Integer> frequency = new HashMap<>();
        
        if (text == null || text.trim().isEmpty()) {
            return frequency;
        }
        
        // Split text into words, convert to lowercase
        String[] words = text.toLowerCase().split("\\W+");
        
        for (String word : words) {
            if (!word.isEmpty()) {
                frequency.put(word, frequency.getOrDefault(word, 0) + 1);
            }
        }
        
        return frequency;
    }
    
    /**
     * Generate text summary
     */
    public static String generateSummary(String text, int maxLength) {
        if (text == null || text.trim().isEmpty()) {
            return "";
        }
        
        String processed = processText(text);
        
        if (processed.length() <= maxLength) {
            return processed;
        }
        
        // Find the last complete sentence within maxLength
        String truncated = processed.substring(0, maxLength);
        int lastSentenceEnd = truncated.lastIndexOf(". ");
        
        if (lastSentenceEnd > 0) {
            return truncated.substring(0, lastSentenceEnd + 1);
        } else {
            return truncated + "...";
        }
    }
    
    /**
     * Check if text is palindrome
     */
    public static boolean isPalindrome(String text) {
        if (text == null) return false;
        
        String cleaned = text.toLowerCase().replaceAll("[^a-zA-Z0-9]", "");
        return cleaned.equals(new StringBuilder(cleaned).reverse().toString());
    }
    
    /**
     * Format text with proper indentation
     */
    public static String formatWithIndentation(String text, int spaces) {
        if (text == null || text.trim().isEmpty()) {
            return "";
        }
        
        String indent = " ".repeat(spaces);
        String[] lines = text.split("\\n");
        StringBuilder result = new StringBuilder();
        
        for (String line : lines) {
            if (!line.trim().isEmpty()) {
                result.append(indent).append(line.trim()).append("\\n");
            }
        }
        
        return result.toString();
    }
    
    // Helper methods
    private static String capitalizeFirst(String str) {
        if (str == null || str.isEmpty()) return str;
        return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
    }
    
    private static boolean isValidEmail(String email) {
        return EMAIL_PATTERN.matcher(email).matches();
    }
    
    private static boolean isValidPhone(String phone) {
        return PHONE_PATTERN.matcher(phone).matches();
    }
    
    private static String formatPhoneNumber(String phone) {
        // Remove all non-digits except +
        String cleaned = phone.replaceAll("[^0-9+]", "");
        
        if (cleaned.startsWith("+")) {
            return cleaned;
        } else if (cleaned.length() == 10) {
            return "+1" + cleaned;
        } else if (cleaned.length() == 11 && cleaned.startsWith("1")) {
            return "+" + cleaned;
        }
        
        return cleaned;
    }
    
    // Main method for demonstration
    public static void main(String[] args) {
        String sampleText = "hello world. this is a sample text with email@example.com and phone 123-456-7890. " +
                           "it contains multiple sentences and some special characters!!!";
        
        System.out.println("=== Text Processing Demo ===");
        System.out.println("Original text: " + sampleText);
        System.out.println();
        
        // Process text
        String processed = processText(sampleText);
        System.out.println("Processed text: " + processed);
        System.out.println();
        
        // Extract emails
        List<String> emails = extractEmails(sampleText);
        System.out.println("Extracted emails: " + emails);
        
        // Extract phone numbers
        List<String> phones = extractPhoneNumbers(sampleText);
        System.out.println("Extracted phones: " + phones);
        System.out.println();
        
        // Word frequency
        Map<String, Integer> frequency = getWordFrequency(sampleText);
        System.out.println("Word frequency:");
        frequency.entrySet().stream()
                .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
                .forEach(entry -> System.out.println("  " + entry.getKey() + ": " + entry.getValue()));
        System.out.println();
        
        // Generate summary
        String summary = generateSummary(sampleText, 50);
        System.out.println("Summary (50 chars): " + summary);
        System.out.println();
        
        // Palindrome check
        String palindrome = "racecar";
        System.out.println("Is '" + palindrome + "' a palindrome? " + isPalindrome(palindrome));
        System.out.println();
        
        // Format with indentation
        String indented = formatWithIndentation("Line 1\\nLine 2\\nLine 3", 4);
        System.out.println("Indented text:");
        System.out.println(indented);
    }
}`}
                  </pre>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-green-900/30 border border-green-500/30 p-4 rounded-lg">
                    <h4 className="text-green-300 font-bold mb-2">🎯 Features Demonstrated</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• String processing and cleaning</li>
                      <li>• Email and phone number extraction</li>
                      <li>• Word frequency analysis</li>
                      <li>• Text summarization</li>
                      <li>• Palindrome detection</li>
                      <li>• Text formatting utilities</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-900/30 border border-blue-500/30 p-4 rounded-lg">
                    <h4 className="text-blue-300 font-bold mb-2">📊 Sample Output</h4>
                    <div className="bg-gray-900 p-3 rounded text-sm">
                      <pre className="text-green-400 font-mono">
{`=== Text Processing Demo ===
Original text: hello world. this is a sample text with email@example.com and phone 123-456-7890. it contains multiple sentences and some special characters!!!

Processed text: Hello world. This is a sample text with email@example.com and phone 123-456-7890. It contains multiple sentences and some special characters!!!

Extracted emails: [email@example.com]
Extracted phones: [+11234567890]

Word frequency:
  text: 2
  sample: 1
  with: 1
  email: 1
  and: 1
  phone: 1
  it: 1
  contains: 1
  multiple: 1
  sentences: 1
  some: 1
  special: 1
  characters: 1
  hello: 1
  world: 1
  this: 1
  is: 1
  a: 1

Summary (50 chars): Hello world. This is a sample text with email@example.com and phone 123-456-7890.

Is 'racecar' a palindrome? true`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'arrays-collections':
        return (
          <div className="animate-fade-in-up">
            <h1 id="arrays-collections" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              ☕ Arrays & Collections
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn about arrays and the Java Collections Framework
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="arrays-collections" className="text-3xl font-bold text-orange-400 mb-6">6. Arrays & Collections</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Arrays</h3>
            <div className="space-y-6 mb-6">
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-blue-400 mb-2">Array Declaration</h4>
                <div className="bg-gray-900 p-3 rounded">
                  <pre className="text-green-400 font-mono text-sm">
{`// One-dimensional array
int[] numbers = new int[5];
int[] numbers = {1, 2, 3, 4, 5};

// Two-dimensional array
int[][] matrix = new int[3][4];`}
                  </pre>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-green-400 mb-2">Array Operations</h4>
                <div className="bg-gray-900 p-3 rounded">
                  <pre className="text-green-400 font-mono text-sm">
{`// Access elements
int first = numbers[0];

// Modify elements
numbers[0] = 10;

// Get length
int length = numbers.length;`}
                  </pre>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-purple-400 mb-4">Collections Framework</h3>
            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-blue-400 mb-2">List Interface</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• ArrayList - Dynamic array</li>
                  <li>• LinkedList - Doubly linked list</li>
                  <li>• Vector - Synchronized array</li>
                </ul>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-green-400 mb-2">Set Interface</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• HashSet - Hash table based</li>
                  <li>• TreeSet - Red-black tree</li>
                  <li>• LinkedHashSet - Hash table + linked list</li>
                </ul>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-purple-400 mb-2">Map Interface</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• HashMap - Hash table based</li>
                  <li>• TreeMap - Red-black tree</li>
                  <li>• LinkedHashMap - Hash table + linked list</li>
                </ul>
              </div>
            </div>
              </div>
            </div>
          </div>
        );
      
      case 'exceptions':
        return (
          <div className="animate-fade-in-up">
            <h1 id="exceptions" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              ☕ Exception Handling
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn how to handle errors and exceptions in Java
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="exceptions" className="text-3xl font-bold text-orange-400 mb-6">7. Exception Handling</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Exception Hierarchy</h3>
            <div className="bg-gray-700 p-4 rounded border border-gray-600 mb-4">
              <p className="text-gray-300 mb-2">All exceptions inherit from Throwable class:</p>
              <ul className="text-gray-300 text-sm space-y-1 ml-4">
                <li>• Throwable</li>
                <li className="ml-4">• Exception (checked exceptions)</li>
                <li className="ml-8">• RuntimeException (unchecked exceptions)</li>
                <li className="ml-4">• Error (system errors)</li>
              </ul>
            </div>
            
            <h3 className="text-xl font-bold text-purple-400 mb-4">Try-Catch-Finally</h3>
            <div className="bg-gray-900 p-4 rounded border border-gray-600">
              <pre className="text-green-400 font-mono text-sm">
{`try {
    // Code that might throw exception
    int result = 10 / 0;
} catch (ArithmeticException e) {
    // Handle specific exception
    System.out.println("Division by zero: " + e.getMessage());
} catch (Exception e) {
    // Handle any other exception
    System.out.println("General exception: " + e.getMessage());
} finally {
    // Code that always executes
    System.out.println("Finally block executed");
}`}
              </pre>
            </div>
              </div>
            </div>
          </div>
        );
      
      case 'packages':
        return (
          <div className="animate-fade-in-up">
            <h1 id="packages" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              ☕ Packages & Modules
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Organize your code with packages and modules
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="packages" className="text-3xl font-bold text-orange-400 mb-6">8. Packages & Modules</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Package Declaration</h3>
            <div className="bg-gray-900 p-4 rounded border border-gray-600 mb-4">
              <pre className="text-green-400 font-mono text-sm">
{`package com.example.myapp;

import java.util.ArrayList;
import java.util.List;

public class MyClass {
    // Class implementation
}`}
              </pre>
            </div>
            
            <h3 className="text-xl font-bold text-purple-400 mb-4">Common Java Packages</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="bg-gray-700 p-3 rounded">
                  <code className="text-green-400">java.lang</code>
                  <span className="text-gray-300 ml-3"># Core language classes (String, Object)</span>
                </div>
                <div className="bg-gray-700 p-3 rounded">
                  <code className="text-green-400">java.util</code>
                  <span className="text-gray-300 ml-3"># Collections, Date, Scanner</span>
                </div>
                <div className="bg-gray-700 p-3 rounded">
                  <code className="text-green-400">java.io</code>
                  <span className="text-gray-300 ml-3"># Input/Output operations</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="bg-gray-700 p-3 rounded">
                  <code className="text-green-400">java.net</code>
                  <span className="text-gray-300 ml-3"># Networking classes</span>
                </div>
                <div className="bg-gray-700 p-3 rounded">
                  <code className="text-green-400">java.sql</code>
                  <span className="text-gray-300 ml-3"># Database connectivity</span>
                </div>
                <div className="bg-gray-700 p-3 rounded">
                  <code className="text-green-400">java.awt</code>
                  <span className="text-gray-300 ml-3"># GUI components</span>
                </div>
              </div>
            </div>
              </div>
            </div>
          </div>
        );
      
      case 'multithreading':
        return (
          <div className="animate-fade-in-up">
            <h1 id="multithreading" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              ☕ Multi-threading
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn concurrent programming with Java threads
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="multithreading" className="text-3xl font-bold text-orange-400 mb-6">9. Multi-threading</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Thread Creation</h3>
            <div className="space-y-6">
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-blue-400 mb-2">Extending Thread Class</h4>
                <div className="bg-gray-900 p-3 rounded">
                  <pre className="text-green-400 font-mono text-sm">
{`class MyThread extends Thread {
    public void run() {
        System.out.println("Thread running");
    }
}

// Usage
MyThread thread = new MyThread();
thread.start();`}
                  </pre>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-green-400 mb-2">Implementing Runnable</h4>
                <div className="bg-gray-900 p-3 rounded">
                  <pre className="text-green-400 font-mono text-sm">
{`class MyRunnable implements Runnable {
    public void run() {
        System.out.println("Runnable running");
    }
}

// Usage
Thread thread = new Thread(new MyRunnable());
thread.start();`}
                  </pre>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-purple-400 mb-4 mt-6">Synchronization</h3>
            <div className="bg-gray-900 p-4 rounded border border-gray-600">
              <pre className="text-green-400 font-mono text-sm">
{`public class Counter {
    private int count = 0;
    
    public synchronized void increment() {
        count++;
    }
    
    public synchronized int getCount() {
        return count;
    }
}`}
              </pre>
            </div>
              </div>
            </div>
          </div>
        );
      
      case 'file-io':
        return (
          <div className="animate-fade-in-up">
            <h1 id="file-io" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              ☕ File I/O Streams
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn file input/output operations in Java
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="file-io" className="text-3xl font-bold text-orange-400 mb-6">10. File I/O Streams</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">File Reading</h3>
            <div className="space-y-6">
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-blue-400 mb-2">FileReader</h4>
                <div className="bg-gray-900 p-3 rounded">
                  <pre className="text-green-400 font-mono text-sm">
{`try (FileReader reader = new FileReader("file.txt")) {
    int character;
    while ((character = reader.read()) != -1) {
        System.out.print((char) character);
    }
} catch (IOException e) {
    e.printStackTrace();
}`}
                  </pre>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-green-400 mb-2">BufferedReader</h4>
                <div className="bg-gray-900 p-3 rounded">
                  <pre className="text-green-400 font-mono text-sm">
{`try (BufferedReader reader = new BufferedReader(
    new FileReader("file.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException e) {
    e.printStackTrace();
}`}
                  </pre>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-purple-400 mb-4 mt-6">File Writing</h3>
            <div className="bg-gray-900 p-4 rounded border border-gray-600">
              <pre className="text-green-400 font-mono text-sm">
{`try (FileWriter writer = new FileWriter("output.txt")) {
    writer.write("Hello, World!");
} catch (IOException e) {
    e.printStackTrace();
}`}
              </pre>
            </div>
              </div>
            </div>
          </div>
        );
      
      case 'java8-features':
        return (
          <div className="animate-fade-in-up">
            <h1 id="java8-features" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              ☕ Java 8+ Features
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Modern Java features including lambdas and streams
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="java8-features" className="text-3xl font-bold text-orange-400 mb-6">11. Java 8+ Features</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Lambda Expressions</h3>
            <div className="bg-gray-900 p-4 rounded border border-gray-600 mb-4">
              <pre className="text-green-400 font-mono text-sm">
{`// Traditional way
List<String> names = Arrays.asList("John", "Jane", "Bob");
Collections.sort(names, new Comparator<String>() {
    public int compare(String a, String b) {
        return a.compareTo(b);
    }
});

// Lambda expression
Collections.sort(names, (a, b) -> a.compareTo(b));`}
              </pre>
            </div>
            
            <h3 className="text-xl font-bold text-purple-400 mb-4">Stream API</h3>
            <div className="bg-gray-900 p-4 rounded border border-gray-600">
              <pre className="text-green-400 font-mono text-sm">
{`List<String> names = Arrays.asList("John", "Jane", "Bob", "Alice");

// Filter and collect
List<String> filtered = names.stream()
    .filter(name -> name.startsWith("J"))
    .collect(Collectors.toList());

// Map and collect
List<String> upperCase = names.stream()
    .map(String::toUpperCase)
    .collect(Collectors.toList());`}
              </pre>
            </div>
              </div>
            </div>
          </div>
        );
      
      case 'memory-management':
        return (
          <div className="animate-fade-in-up">
            <h1 id="memory-management" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              ☕ Memory Management
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Understanding JVM memory and garbage collection
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="memory-management" className="text-3xl font-bold text-orange-400 mb-6">12. Memory Management</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">JVM Memory Areas</h3>
            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-blue-400 mb-2">Heap Memory</h4>
                <p className="text-gray-300 text-sm">Stores objects and instance variables</p>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-green-400 mb-2">Stack Memory</h4>
                <p className="text-gray-300 text-sm">Stores method calls and local variables</p>
              </div>
              <div className="bg-gray-700 p-4 rounded border border-gray-600">
                <h4 className="font-bold text-purple-400 mb-2">Method Area</h4>
                <p className="text-gray-300 text-sm">Stores class metadata and bytecode</p>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-purple-400 mb-4 mt-6">Garbage Collection</h3>
            <div className="bg-gray-700 p-4 rounded border border-gray-600">
              <p className="text-gray-300 mb-2">JVM automatically manages memory through garbage collection:</p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• <strong>Young Generation:</strong> Eden, Survivor spaces</li>
                <li>• <strong>Old Generation:</strong> Long-lived objects</li>
                <li>• <strong>Permanent Generation:</strong> Class metadata (Java 8+)</li>
              </ul>
            </div>
              </div>
            </div>
          </div>
        );
      
      case 'advanced-concepts':
        return (
          <div className="animate-fade-in-up">
            <h1 id="advanced-concepts" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              ☕ Advanced Core Concepts
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Master generics, annotations, and advanced Java features
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="advanced-concepts" className="text-3xl font-bold text-orange-400 mb-6">13. Advanced Core Concepts</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Generics</h3>
            <div className="bg-gray-900 p-4 rounded border border-gray-600 mb-4">
              <pre className="text-green-400 font-mono text-sm">
{`// Generic class
public class Box<T> {
    private T content;
    
    public void setContent(T content) {
        this.content = content;
    }
    
    public T getContent() {
        return content;
    }
}

// Usage
Box<String> stringBox = new Box<>();
Box<Integer> intBox = new Box<>();`}
              </pre>
            </div>
            
            <h3 className="text-xl font-bold text-purple-400 mb-4">Annotations</h3>
            <div className="bg-gray-900 p-4 rounded border border-gray-600">
              <pre className="text-green-400 font-mono text-sm">
{`@Override
public String toString() {
    return "Custom toString";
}

@Deprecated
public void oldMethod() {
    // Deprecated method
}

@SuppressWarnings("unchecked")
public void methodWithWarnings() {
    // Method with suppressed warnings
}`}
              </pre>
            </div>
              </div>
            </div>
          </div>
        );
      
      case 'video-tutorials':
        return (
          <div className="animate-fade-in-up">
            <h1 id="video-tutorials" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              ☕ Java Video Tutorials
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Learn Java through comprehensive video tutorials
            </p>
            
            <div className="max-w-6xl mx-auto">
              <VideoSection videos={javaVideos} title="Java Video Tutorials" />
            </div>
          </div>
        );
      
      case 'practice-projects':
        return (
          <div className="animate-fade-in-up">
            <h1 id="practice-projects" className="text-4xl md:text-5xl font-extrabold mb-8 text-center">
              ☕ Practice Projects
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Build real-world projects to master Java
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="practice-projects" className="text-3xl font-bold text-orange-400 mb-6">14. Practice Projects</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <ul className="text-gray-300 space-y-3">
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                <strong>Calculator Application:</strong> Build a GUI calculator using Swing
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                <strong>Student Management System:</strong> CRUD operations with file I/O
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                <strong>Bank Account System:</strong> OOP concepts with inheritance and polymorphism
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                <strong>Multi-threaded Chat Application:</strong> Socket programming with threads
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                <strong>Library Management System:</strong> Database integration with JDBC
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
              ☕ Summary
            </h1>
            <p className="text-lg text-gray-400 mb-8 text-center">
              Key takeaways from Java programming
            </p>
            
            <div className="max-w-6xl mx-auto">
              <h2 id="summary" className="text-3xl font-bold text-orange-400 mb-6">✅ Summary</h2>
          
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
            <ul className="text-gray-300 space-y-3">
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Java is a platform-independent, object-oriented programming language
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Core concepts include OOP, exception handling, collections, and multithreading
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Java 8+ features include lambda expressions, streams, and functional programming
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Memory management is handled automatically by the JVM garbage collector
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-3 mt-1">•</span>
                Practice with real projects to master Java programming skills
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
              ☕ Java Programming
            </h1>
            
            <div className="max-w-6xl mx-auto">
              <div className="gradient-border hover-lift mb-8">
                <div className="bg-gradient-to-r from-orange-900/50 to-red-900/50 p-8 rounded-xl">
                  <h2 className="text-3xl font-bold text-orange-400 mb-4 neon-glow">Goal</h2>
                  <p className="text-white text-xl">Master Java programming from basics to advanced enterprise development.</p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <TechLayout onThisPage={pageHeadings} technology="java" activeSection={activeSection} setActiveSection={setActiveSection}>
      {renderContent()}
    </TechLayout>
  );
}

