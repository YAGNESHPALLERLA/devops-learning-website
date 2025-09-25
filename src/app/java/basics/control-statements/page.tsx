// src/app/java/basics/control-statements/page.tsx
import Link from 'next/link';

export default function JavaControlStatementsPage() {
  return (
    <main>
      <section className="text-center py-12 px-4">
        <Link href="/java" className="inline-block mb-8 text-blue-400 hover:text-blue-300 transition-colors">
          ← Back to Java Learning Hub
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          ☕ Java Control Statements
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          Master if-else, switch statements, loops, and program flow control in Java
        </p>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">If-Else Statements</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Basic If Statement</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`public class IfExample {
    public static void main(String[] args) {
        int age = 18;
        
        if (age >= 18) {
            System.out.println("You are an adult");
        }
        
        // Output: You are an adult
        
        int temperature = 25;
        if (temperature > 30) {
            System.out.println("It's hot outside");
            System.out.println("Wear light clothes");
        }
        // No output (condition is false)
    }
}`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">If-Else Statement</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`public class IfElseExample {
    public static void main(String[] args) {
        int score = 85;
        
        if (score >= 70) {
            System.out.println("You passed!");
        } else {
            System.out.println("You failed!");
        }
        // Output: You passed!
        
        // Grade calculator
        int grade = 88;
        String letterGrade;
        
        if (grade >= 90) {
            letterGrade = "A";
        } else {
            letterGrade = "B or below";
        }
        
        System.out.println("Your grade: " + letterGrade);
        // Output: Your grade: B or below
    }
}`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">If-Else-If Ladder</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`public class IfElseIfExample {
    public static void main(String[] args) {
        int score = 85;
        String grade;
        
        if (score >= 90) {
            grade = "A";
        } else if (score >= 80) {
            grade = "B";
        } else if (score >= 70) {
            grade = "C";
        } else if (score >= 60) {
            grade = "D";
        } else {
            grade = "F";
        }
        
        System.out.println("Your grade: " + grade);
        // Output: Your grade: B
        
        // Weather condition example
        int temperature = 15;
        String weather;
        
        if (temperature > 30) {
            weather = "Hot";
        } else if (temperature > 20) {
            weather = "Warm";
        } else if (temperature > 10) {
            weather = "Cool";
        } else {
            weather = "Cold";
        }
        
        System.out.println("Weather: " + weather);
        // Output: Weather: Cool
    }
}`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Nested If Statements</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`public class NestedIfExample {
    public static void main(String[] args) {
        int age = 20;
        boolean hasLicense = true;
        boolean hasInsurance = false;
        
        if (age >= 18) {
            if (hasLicense) {
                if (hasInsurance) {
                    System.out.println("You can drive legally");
                } else {
                    System.out.println("You need insurance to drive");
                }
            } else {
                System.out.println("You need a driver's license");
            }
        } else {
            System.out.println("You must be 18 or older to drive");
        }
        // Output: You need insurance to drive
        
        // Library membership example
        int userAge = 25;
        boolean hasId = true;
        boolean hasFeePaid = true;
        
        if (userAge >= 16) {
            if (hasId) {
                if (hasFeePaid) {
                    System.out.println("Library membership approved");
                } else {
                    System.out.println("Please pay the membership fee");
                }
            } else {
                System.out.println("Valid ID required");
            }
        } else {
            System.out.println("Must be 16 or older for membership");
        }
        // Output: Library membership approved
    }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Switch Statements</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Basic Switch Statement</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`public class SwitchExample {
    public static void main(String[] args) {
        int dayOfWeek = 3;
        String dayName;
        
        switch (dayOfWeek) {
            case 1:
                dayName = "Monday";
                break;
            case 2:
                dayName = "Tuesday";
                break;
            case 3:
                dayName = "Wednesday";
                break;
            case 4:
                dayName = "Thursday";
                break;
            case 5:
                dayName = "Friday";
                break;
            case 6:
                dayName = "Saturday";
                break;
            case 7:
                dayName = "Sunday";
                break;
            default:
                dayName = "Invalid day";
                break;
        }
        
        System.out.println("Day: " + dayName);
        // Output: Day: Wednesday
    }
}`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Switch with Multiple Cases</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`public class SwitchMultipleCases {
    public static void main(String[] args) {
        char grade = 'B';
        String message;
        
        switch (grade) {
            case 'A':
            case 'a':
                message = "Excellent work!";
                break;
            case 'B':
            case 'b':
                message = "Good job!";
                break;
            case 'C':
            case 'c':
                message = "Satisfactory";
                break;
            case 'D':
            case 'd':
                message = "Needs improvement";
                break;
            case 'F':
            case 'f':
                message = "Failed";
                break;
            default:
                message = "Invalid grade";
                break;
        }
        
        System.out.println(message);
        // Output: Good job!
    }
}`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Switch with Strings (Java 7+)</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`public class SwitchStringExample {
    public static void main(String[] args) {
        String month = "March";
        int days;
        
        switch (month.toLowerCase()) {
            case "january":
            case "march":
            case "may":
            case "july":
            case "august":
            case "october":
            case "december":
                days = 31;
                break;
            case "april":
            case "june":
            case "september":
            case "november":
                days = 30;
                break;
            case "february":
                days = 28; // Non-leap year
                break;
            default:
                days = 0;
                break;
        }
        
        System.out.println(month + " has " + days + " days");
        // Output: March has 31 days
    }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">For Loops</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Basic For Loop</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`public class ForLoopExample {
    public static void main(String[] args) {
        // Basic for loop
        System.out.println("Counting from 1 to 5:");
        for (int i = 1; i <= 5; i++) {
            System.out.println("Count: " + i);
        }
        // Output:
        // Counting from 1 to 5:
        // Count: 1
        // Count: 2
        // Count: 3
        // Count: 4
        // Count: 5
        
        // Countdown
        System.out.println("\\nCountdown from 5 to 1:");
        for (int i = 5; i >= 1; i--) {
            System.out.println("Countdown: " + i);
        }
        // Output:
        // Countdown from 5 to 1:
        // Countdown: 5
        // Countdown: 4
        // Countdown: 3
        // Countdown: 2
        // Countdown: 1
        
        // Step by 2
        System.out.println("\\nEven numbers from 2 to 10:");
        for (int i = 2; i <= 10; i += 2) {
            System.out.println("Even: " + i);
        }
        // Output:
        // Even numbers from 2 to 10:
        // Even: 2
        // Even: 4
        // Even: 6
        // Even: 8
        // Even: 10
    }
}`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Enhanced For Loop (For-Each)</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`public class EnhancedForLoopExample {
    public static void main(String[] args) {
        // Array of numbers
        int[] numbers = {10, 20, 30, 40, 50};
        
        System.out.println("Numbers in array:");
        for (int number : numbers) {
            System.out.println("Number: " + number);
        }
        // Output:
        // Numbers in array:
        // Number: 10
        // Number: 20
        // Number: 30
        // Number: 40
        // Number: 50
        
        // Array of strings
        String[] fruits = {"Apple", "Banana", "Orange", "Grape"};
        
        System.out.println("\\nFruits:");
        for (String fruit : fruits) {
            System.out.println("Fruit: " + fruit);
        }
        // Output:
        // Fruits:
        // Fruit: Apple
        // Fruit: Banana
        // Fruit: Orange
        // Fruit: Grape
        
        // Calculate sum using enhanced for loop
        int[] scores = {85, 92, 78, 96, 88};
        int sum = 0;
        
        for (int score : scores) {
            sum += score;
        }
        
        double average = (double) sum / scores.length;
        System.out.println("\\nAverage score: " + average);
        // Output: Average score: 87.8
    }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">While Loops</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Basic While Loop</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`public class WhileLoopExample {
    public static void main(String[] args) {
        // Basic while loop
        int count = 1;
        System.out.println("Counting with while loop:");
        
        while (count <= 5) {
            System.out.println("Count: " + count);
            count++;
        }
        // Output:
        // Counting with while loop:
        // Count: 1
        // Count: 2
        // Count: 3
        // Count: 4
        // Count: 5
        
        // Countdown
        int timer = 10;
        System.out.println("\\nTimer countdown:");
        
        while (timer > 0) {
            System.out.println("Time: " + timer);
            timer--;
        }
        System.out.println("Time's up!");
        // Output:
        // Timer countdown:
        // Time: 10
        // Time: 9
        // Time: 8
        // Time: 7
        // Time: 6
        // Time: 5
        // Time: 4
        // Time: 3
        // Time: 2
        // Time: 1
        // Time's up!
    }
}`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Do-While Loop</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`public class DoWhileExample {
    public static void main(String[] args) {
        // Do-while loop (executes at least once)
        int number = 5;
        
        System.out.println("Do-while example:");
        do {
            System.out.println("Number: " + number);
            number++;
        } while (number < 5);
        // Output: Number: 5 (executes once even though condition is false)
        
        // Menu simulation
        int choice = 0;
        Scanner scanner = new Scanner(System.in);
        
        do {
            System.out.println("\\nMenu:");
            System.out.println("1. Option 1");
            System.out.println("2. Option 2");
            System.out.println("3. Exit");
            System.out.print("Enter choice: ");
            
            choice = scanner.nextInt();
            
            switch (choice) {
                case 1:
                    System.out.println("You selected Option 1");
                    break;
                case 2:
                    System.out.println("You selected Option 2");
                    break;
                case 3:
                    System.out.println("Goodbye!");
                    break;
                default:
                    System.out.println("Invalid choice");
                    break;
            }
        } while (choice != 3);
        
        scanner.close();
    }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Break and Continue</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Break Statement</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`public class BreakExample {
    public static void main(String[] args) {
        // Break in for loop
        System.out.println("Numbers from 1 to 10 (break at 5):");
        for (int i = 1; i <= 10; i++) {
            if (i == 5) {
                break; // Exit the loop
            }
            System.out.println("Number: " + i);
        }
        // Output:
        // Numbers from 1 to 10 (break at 5):
        // Number: 1
        // Number: 2
        // Number: 3
        // Number: 4
        
        // Break in while loop
        int num = 1;
        System.out.println("\\nSearching for number 7:");
        while (num <= 10) {
            if (num == 7) {
                System.out.println("Found " + num + "!");
                break;
            }
            num++;
        }
        // Output: Found 7!
    }
}`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Continue Statement</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`public class ContinueExample {
    public static void main(String[] args) {
        // Continue in for loop (skip odd numbers)
        System.out.println("Even numbers from 1 to 10:");
        for (int i = 1; i <= 10; i++) {
            if (i % 2 != 0) {
                continue; // Skip to next iteration
            }
            System.out.println("Even: " + i);
        }
        // Output:
        // Even numbers from 1 to 10:
        // Even: 2
        // Even: 4
        // Even: 6
        // Even: 8
        // Even: 10
        
        // Continue in while loop
        int num = 0;
        System.out.println("\\nNumbers divisible by 3 (1-10):");
        while (num < 10) {
            num++;
            if (num % 3 != 0) {
                continue;
            }
            System.out.println("Divisible by 3: " + num);
        }
        // Output:
        // Numbers divisible by 3 (1-10):
        // Divisible by 3: 3
        // Divisible by 3: 6
        // Divisible by 3: 9
    }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Practical Examples</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Number Guessing Game</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`import java.util.Scanner;
import java.util.Random;

public class NumberGuessingGame {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Random random = new Random();
        
        int secretNumber = random.nextInt(100) + 1; // 1-100
        int attempts = 0;
        int maxAttempts = 7;
        
        System.out.println("Welcome to the Number Guessing Game!");
        System.out.println("I'm thinking of a number between 1 and 100.");
        System.out.println("You have " + maxAttempts + " attempts.");
        
        while (attempts < maxAttempts) {
            System.out.print("\\nEnter your guess: ");
            int guess = scanner.nextInt();
            attempts++;
            
            if (guess == secretNumber) {
                System.out.println("Congratulations! You guessed it in " + attempts + " attempts!");
                break;
            } else if (guess < secretNumber) {
                System.out.println("Too low! Try again.");
            } else {
                System.out.println("Too high! Try again.");
            }
            
            if (attempts < maxAttempts) {
                System.out.println("Attempts remaining: " + (maxAttempts - attempts));
            }
        }
        
        if (attempts >= maxAttempts) {
            System.out.println("Game over! The number was " + secretNumber);
        }
        
        scanner.close();
    }
}`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Student Grade Calculator</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`import java.util.Scanner;

public class GradeCalculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("Student Grade Calculator");
        System.out.println("========================");
        
        // Get number of students
        System.out.print("Enter number of students: ");
        int numStudents = scanner.nextInt();
        
        for (int i = 1; i <= numStudents; i++) {
            System.out.println("\\n--- Student " + i + " ---");
            
            // Get student name
            System.out.print("Enter student name: ");
            scanner.nextLine(); // Consume newline
            String name = scanner.nextLine();
            
            // Get grades
            System.out.print("Enter quiz score (0-100): ");
            double quizScore = scanner.nextDouble();
            
            System.out.print("Enter midterm score (0-100): ");
            double midtermScore = scanner.nextDouble();
            
            System.out.print("Enter final exam score (0-100): ");
            double finalScore = scanner.nextDouble();
            
            // Calculate average
            double average = (quizScore * 0.3) + (midtermScore * 0.3) + (finalScore * 0.4);
            
            // Determine letter grade
            String letterGrade;
            if (average >= 90) {
                letterGrade = "A";
            } else if (average >= 80) {
                letterGrade = "B";
            } else if (average >= 70) {
                letterGrade = "C";
            } else if (average >= 60) {
                letterGrade = "D";
            } else {
                letterGrade = "F";
            }
            
            // Display results
            System.out.println("\\nResults for " + name + ":");
            System.out.printf("Average: %.2f%n", average);
            System.out.println("Letter Grade: " + letterGrade);
            
            // Performance message
            switch (letterGrade) {
                case "A":
                    System.out.println("Excellent work!");
                    break;
                case "B":
                    System.out.println("Good job!");
                    break;
                case "C":
                    System.out.println("Satisfactory");
                    break;
                case "D":
                    System.out.println("Needs improvement");
                    break;
                case "F":
                    System.out.println("Failed - retake required");
                    break;
            }
        }
        
        scanner.close();
    }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Link href="/java/basics/introduction" className="bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 transition">
            ← Previous: Java Introduction
          </Link>
          <Link href="/java/basics/keywords" className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition">
            Next: Java Keywords →
          </Link>
        </div>
      </section>
    </main>
  );
}
