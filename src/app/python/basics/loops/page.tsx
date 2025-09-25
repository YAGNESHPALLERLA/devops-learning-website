// src/app/python/basics/loops/page.tsx
import Link from 'next/link';

export default function PythonLoopsPage() {
  return (
    <main>
      <section className="text-center py-12 px-4">
        <Link href="/python" className="inline-block mb-8 text-blue-400 hover:text-blue-300 transition-colors">
          ← Back to Python Learning Hub
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          🐍 Python Loops
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          Master for loops, while loops, and loop control with break and continue
        </p>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">For Loops</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Basic For Loop with Range</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# Basic for loop with range
print("Counting from 1 to 5:")
for i in range(1, 6):  # range(1, 6) gives 1, 2, 3, 4, 5
    print(f"Count: {i}")

# Output:
# Counting from 1 to 5:
# Count: 1
# Count: 2
# Count: 3
# Count: 4
# Count: 5

# Different range examples
print("\\nNumbers 0 to 4:")
for i in range(5):  # range(5) gives 0, 1, 2, 3, 4
    print(f"Number: {i}")

print("\\nEven numbers from 2 to 10:")
for i in range(2, 11, 2):  # range(start, stop, step)
    print(f"Even: {i}")

print("\\nCountdown from 5 to 1:")
for i in range(5, 0, -1):  # step = -1 for countdown
    print(f"Countdown: {i}")

# Output:
# Numbers 0 to 4:
# Number: 0
# Number: 1
# Number: 2
# Number: 3
# Number: 4
# 
# Even numbers from 2 to 10:
# Even: 2
# Even: 4
# Even: 6
# Even: 8
# Even: 10
# 
# Countdown from 5 to 1:
# Countdown: 5
# Countdown: 4
# Countdown: 3
# Countdown: 2
# Countdown: 1`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">For Loop with Lists</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# Iterating over a list
fruits = ["apple", "banana", "orange", "grape"]

print("Fruits in the list:")
for fruit in fruits:
    print(f"Fruit: {fruit}")

# Output:
# Fruits in the list:
# Fruit: apple
# Fruit: banana
# Fruit: orange
# Fruit: grape

# Iterating with index using enumerate
print("\\nFruits with index:")
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# Output:
# Fruits with index:
# 0: apple
# 1: banana
# 2: orange
# 3: grape

# Iterating over numbers list
numbers = [10, 20, 30, 40, 50]
total = 0

print("\\nNumbers and their sum:")
for num in numbers:
    print(f"Number: {num}")
    total += num

print(f"Total sum: {total}")
# Output:
# Numbers and their sum:
# Number: 10
# Number: 20
# Number: 30
# Number: 40
# Number: 50
# Total sum: 150`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">For Loop with Dictionaries</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# Dictionary of student grades
grades = {
    "Alice": 85,
    "Bob": 92,
    "Charlie": 78,
    "Diana": 96
}

print("Student grades:")
# Iterating over keys
for student in grades:
    print(f"{student}: {grades[student]}")

# Output:
# Student grades:
# Alice: 85
# Bob: 92
# Charlie: 78
# Diana: 96

# Iterating over key-value pairs
print("\\nUsing items():")
for student, grade in grades.items():
    print(f"{student}: {grade}")

# Output:
# Using items():
# Alice: 85
# Bob: 92
# Charlie: 78
# Diana: 96

# Iterating over values only
print("\\nJust the grades:")
for grade in grades.values():
    print(f"Grade: {grade}")

# Output:
# Just the grades:
# Grade: 85
# Grade: 92
# Grade: 78
# Grade: 96`}
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
{`# Basic while loop
count = 1
print("Counting with while loop:")
while count <= 5:
    print(f"Count: {count}")
    count += 1

# Output:
# Counting with while loop:
# Count: 1
# Count: 2
# Count: 3
# Count: 4
# Count: 5

# Countdown example
timer = 10
print("\\nTimer countdown:")
while timer > 0:
    print(f"Time: {timer}")
    timer -= 1
print("Time's up!")

# Output:
# Timer countdown:
# Time: 10
# Time: 9
# Time: 8
# Time: 7
# Time: 6
# Time: 5
# Time: 4
# Time: 3
# Time: 2
# Time: 1
# Time's up!

# User input validation
print("\\nEnter numbers (0 to quit):")
total = 0
count = 0

while True:
    try:
        num = int(input("Enter a number: "))
        if num == 0:
            break
        total += num
        count += 1
    except ValueError:
        print("Please enter a valid number")

if count > 0:
    average = total / count
    print(f"\\nYou entered {count} numbers")
    print(f"Total: {total}")
    print(f"Average: {average:.2f}")
else:
    print("No numbers entered")`}
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
{`# Break in for loop
print("Numbers from 1 to 10 (break at 5):")
for i in range(1, 11):
    if i == 5:
        break  # Exit the loop
    print(f"Number: {i}")

# Output:
# Numbers from 1 to 10 (break at 5):
# Number: 1
# Number: 2
# Number: 3
# Number: 4

# Break in while loop
num = 1
print("\\nSearching for number 7:")
while num <= 10:
    if num == 7:
        print(f"Found {num}!")
        break
    num += 1

# Output: Found 7!

# Finding first even number in a list
numbers = [1, 3, 5, 8, 9, 12, 15]
print("\\nFinding first even number:")
for num in numbers:
    if num % 2 == 0:
        print(f"First even number: {num}")
        break
else:
    print("No even numbers found")

# Output: First even number: 8`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Continue Statement</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# Continue in for loop (skip odd numbers)
print("Even numbers from 1 to 10:")
for i in range(1, 11):
    if i % 2 != 0:
        continue  # Skip to next iteration
    print(f"Even: {i}")

# Output:
# Even numbers from 1 to 10:
# Even: 2
# Even: 4
# Even: 6
# Even: 8
# Even: 10

# Skip numbers divisible by 3
print("\\nNumbers not divisible by 3 (1-10):")
for i in range(1, 11):
    if i % 3 == 0:
        continue
    print(f"Number: {i}")

# Output:
# Numbers not divisible by 3 (1-10):
# Number: 1
# Number: 2
# Number: 4
# Number: 5
# Number: 7
# Number: 8
# Number: 10

# Process only valid grades
grades = [85, -1, 92, 0, 78, 96, -5, 88]
print("\\nProcessing valid grades:")
valid_grades = []

for grade in grades:
    if grade < 0 or grade > 100:
        print(f"Skipping invalid grade: {grade}")
        continue
    valid_grades.append(grade)
    print(f"Valid grade: {grade}")

print(f"\\nValid grades: {valid_grades}")
print(f"Average: {sum(valid_grades) / len(valid_grades):.2f}")

# Output:
# Processing valid grades:
# Valid grade: 85
# Skipping invalid grade: -1
# Valid grade: 92
# Skipping invalid grade: 0
# Valid grade: 78
# Valid grade: 96
# Skipping invalid grade: -5
# Valid grade: 88
# 
# Valid grades: [85, 92, 78, 96, 88]
# Average: 87.80`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Nested Loops</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Multiplication Table</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# Create multiplication table
print("Multiplication table (1-5):")
for i in range(1, 6):
    for j in range(1, 6):
        result = i * j
        print(f"{i} x {j} = {result}", end="\\t")
    print()  # New line after each row

# Output:
# Multiplication table (1-5):
# 1 x 1 = 1	1 x 2 = 2	1 x 3 = 3	1 x 4 = 4	1 x 5 = 5	
# 2 x 1 = 2	2 x 2 = 4	2 x 3 = 6	2 x 4 = 8	2 x 5 = 10	
# 3 x 1 = 3	3 x 2 = 6	3 x 3 = 9	3 x 4 = 12	3 x 5 = 15	
# 4 x 1 = 4	4 x 2 = 8	4 x 3 = 12	4 x 4 = 16	4 x 5 = 20	
# 5 x 1 = 5	5 x 2 = 10	5 x 3 = 15	5 x 4 = 20	5 x 5 = 25	

# Pattern printing
print("\\nTriangle pattern:")
for i in range(1, 6):
    for j in range(i):
        print("*", end="")
    print()

# Output:
# Triangle pattern:
# *
# **
# ***
# ****
# *****

# Number pyramid
print("\\nNumber pyramid:")
for i in range(1, 6):
    for j in range(1, i + 1):
        print(j, end="")
    print()

# Output:
# Number pyramid:
# 1
# 12
# 123
# 1234
# 12345`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Loop with Else</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">For-Else and While-Else</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# For-else: else executes if loop completes without break
numbers = [1, 3, 5, 7, 9]
target = 4

print(f"Searching for {target} in {numbers}:")
for num in numbers:
    if num == target:
        print(f"Found {target}!")
        break
else:
    print(f"{target} not found in the list")

# Output: 4 not found in the list

# Another example
numbers = [2, 4, 6, 8, 10]
target = 6

print(f"\\nSearching for {target} in {numbers}:")
for num in numbers:
    if num == target:
        print(f"Found {target}!")
        break
else:
    print(f"{target} not found in the list")

# Output: Found 6!

# While-else example
count = 0
max_attempts = 3
target = 7

print(f"\\nTrying to find {target} (max {max_attempts} attempts):")
while count < max_attempts:
    count += 1
    guess = count * 2  # Simulating guesses
    print(f"Attempt {count}: {guess}")
    
    if guess == target:
        print(f"Success! Found {target} on attempt {count}")
        break
else:
    print(f"Failed to find {target} after {max_attempts} attempts")

# Output:
# Trying to find 7 (max 3 attempts):
# Attempt 1: 2
# Attempt 2: 4
# Attempt 3: 6
# Failed to find 7 after 3 attempts`}
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
{`import random

def number_guessing_game():
    # Generate random number between 1 and 100
    secret_number = random.randint(1, 100)
    max_attempts = 7
    attempts = 0
    
    print("Welcome to the Number Guessing Game!")
    print("I'm thinking of a number between 1 and 100.")
    print(f"You have {max_attempts} attempts.")
    
    while attempts < max_attempts:
        try:
            guess = int(input("\\nEnter your guess: "))
            attempts += 1
            
            if guess == secret_number:
                print(f"Congratulations! You guessed it in {attempts} attempts!")
                return
            
            elif guess < secret_number:
                print("Too low! Try again.")
            else:
                print("Too high! Try again.")
            
            if attempts < max_attempts:
                print(f"Attempts remaining: {max_attempts - attempts}")
                
        except ValueError:
            print("Please enter a valid number!")
            attempts -= 1  # Don't count invalid input
    
    print(f"\\nGame over! The number was {secret_number}")

# Run the game
number_guessing_game()

# Example output:
# Welcome to the Number Guessing Game!
# I'm thinking of a number between 1 and 100.
# You have 7 attempts.
# 
# Enter your guess: 50
# Too low! Try again.
# Attempts remaining: 6
# 
# Enter your guess: 75
# Too high! Try again.
# Attempts remaining: 5
# 
# Enter your guess: 63
# Too low! Try again.
# Attempts remaining: 4
# 
# Enter your guess: 69
# Congratulations! You guessed it in 4 attempts!`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Student Grade Analyzer</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`def analyze_grades():
    # Sample student data
    students = {
        "Alice": [85, 92, 78, 96],
        "Bob": [88, 90, 85, 92],
        "Charlie": [75, 82, 79, 85],
        "Diana": [95, 98, 92, 96],
        "Eve": [70, 75, 72, 78]
    }
    
    print("Student Grade Analysis")
    print("=" * 30)
    
    # Analyze each student
    for student, grades in students.items():
        total = sum(grades)
        average = total / len(grades)
        
        print(f"\\n{student}:")
        print(f"  Grades: {grades}")
        print(f"  Average: {average:.2f}")
        
        # Determine letter grade
        if average >= 90:
            letter_grade = "A"
        elif average >= 80:
            letter_grade = "B"
        elif average >= 70:
            letter_grade = "C"
        elif average >= 60:
            letter_grade = "D"
        else:
            letter_grade = "F"
        
        print(f"  Letter Grade: {letter_grade}")
        
        # Performance message
        if letter_grade == "A":
            print("  Excellent work!")
        elif letter_grade == "B":
            print("  Good job!")
        elif letter_grade == "C":
            print("  Satisfactory")
        elif letter_grade == "D":
            print("  Needs improvement")
        else:
            print("  Failed - retake required")
    
    # Class statistics
    print("\\n" + "=" * 30)
    print("Class Statistics:")
    
    all_grades = []
    for grades in students.values():
        all_grades.extend(grades)
    
    class_average = sum(all_grades) / len(all_grades)
    highest_grade = max(all_grades)
    lowest_grade = min(all_grades)
    
    print(f"Class Average: {class_average:.2f}")
    print(f"Highest Grade: {highest_grade}")
    print(f"Lowest Grade: {lowest_grade}")
    
    # Count grade distribution
    grade_counts = {"A": 0, "B": 0, "C": 0, "D": 0, "F": 0}
    
    for student, grades in students.items():
        average = sum(grades) / len(grades)
        if average >= 90:
            grade_counts["A"] += 1
        elif average >= 80:
            grade_counts["B"] += 1
        elif average >= 70:
            grade_counts["C"] += 1
        elif average >= 60:
            grade_counts["D"] += 1
        else:
            grade_counts["F"] += 1
    
    print("\\nGrade Distribution:")
    for grade, count in grade_counts.items():
        print(f"  {grade}: {count} student(s)")

# Run the analysis
analyze_grades()

# Example output:
# Student Grade Analysis
# ==============================
# 
# Alice:
#   Grades: [85, 92, 78, 96]
#   Average: 87.75
#   Letter Grade: B
#   Good job!
# 
# Bob:
#   Grades: [88, 90, 85, 92]
#   Average: 88.75
#   Letter Grade: B
#   Good job!
# 
# Charlie:
#   Grades: [75, 82, 79, 85]
#   Average: 80.25
#   Letter Grade: B
#   Good job!
# 
# Diana:
#   Grades: [95, 98, 92, 96]
#   Average: 95.25
#   Letter Grade: A
#   Excellent work!
# 
# Eve:
#   Grades: [70, 75, 72, 78]
#   Average: 73.75
#   Letter Grade: C
#   Satisfactory
# 
# ==============================
# Class Statistics:
# Class Average: 85.15
# Highest Grade: 98
# Lowest Grade: 70
# 
# Grade Distribution:
#   A: 1 student(s)
#   B: 3 student(s)
#   C: 1 student(s)
#   D: 0 student(s)
#   F: 0 student(s)`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Link href="/python/basics/conditionals" className="bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 transition">
            ← Previous: Conditionals
          </Link>
          <Link href="/python/basics/strings" className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition">
            Next: Strings →
          </Link>
        </div>
      </section>
    </main>
  );
}
