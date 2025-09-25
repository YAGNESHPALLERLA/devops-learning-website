// src/app/python/basics/conditionals/page.tsx
import Link from 'next/link';

export default function PythonConditionalsPage() {
  return (
    <main>
      <section className="text-center py-12 px-4">
        <Link href="/python" className="inline-block mb-8 text-blue-400 hover:text-blue-300 transition-colors">
          ← Back to Python Learning Hub
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          🐍 Python Conditionals (if, elif, else)
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          Master conditional statements to control program flow and make decisions
        </p>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Basic If Statement</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Simple If Statement</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# Basic if statement
age = 18

if age >= 18:
    print("You are an adult")

# Output: You are an adult

# Another example
temperature = 25

if temperature > 30:
    print("It's hot outside")
    print("Wear light clothes")

# No output (condition is False)`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">If-Else Statement</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# If-else statement
score = 85

if score >= 70:
    print("You passed!")
else:
    print("You failed!")

# Output: You passed!

# Grade calculator example
grade = 88

if grade >= 90:
    letter_grade = "A"
else:
    letter_grade = "B or below"

print(f"Your grade: {letter_grade}")
# Output: Your grade: B or below`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">If-Elif-Else Statement</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# If-elif-else statement
score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"Your grade: {grade}")
# Output: Your grade: B

# Weather condition example
temperature = 15

if temperature > 30:
    weather = "Hot"
elif temperature > 20:
    weather = "Warm"
elif temperature > 10:
    weather = "Cool"
else:
    weather = "Cold"

print(f"Weather: {weather}")
# Output: Weather: Cool`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Logical Operators</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">AND Operator</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# AND operator - both conditions must be True
age = 25
has_license = True

if age >= 18 and has_license:
    print("You can drive")
else:
    print("You cannot drive")

# Output: You can drive

# Multiple conditions
username = "admin"
password = "12345"
is_active = True

if username == "admin" and password == "12345" and is_active:
    print("Login successful")
else:
    print("Login failed")

# Output: Login successful`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">OR Operator</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# OR operator - at least one condition must be True
day = "Saturday"

if day == "Saturday" or day == "Sunday":
    print("It's weekend!")
else:
    print("It's a weekday")

# Output: It's weekend!

# Membership check
user_role = "moderator"

if user_role == "admin" or user_role == "moderator" or user_role == "editor":
    print("You have editing privileges")
else:
    print("You have read-only access")

# Output: You have editing privileges`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">NOT Operator</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# NOT operator - reverses the condition
is_logged_in = False

if not is_logged_in:
    print("Please log in to continue")
else:
    print("Welcome back!")

# Output: Please log in to continue

# Complex condition with NOT
age = 16
has_parent_consent = True

if not (age >= 18) and has_parent_consent:
    print("You can participate with parent consent")
elif not (age >= 18) and not has_parent_consent:
    print("You need parent consent to participate")
else:
    print("You can participate")

# Output: You can participate with parent consent`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Nested Conditionals</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Nested If Statements</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# Nested conditionals
age = 20
has_license = True
has_insurance = False

if age >= 18:
    if has_license:
        if has_insurance:
            print("You can drive legally")
        else:
            print("You need insurance to drive")
    else:
        print("You need a driver's license")
else:
    print("You must be 18 or older to drive")

# Output: You need insurance to drive

# Library membership example
age = 25
has_id = True
has_fee_paid = True

if age >= 16:
    if has_id:
        if has_fee_paid:
            print("Library membership approved")
        else:
            print("Please pay the membership fee")
    else:
        print("Valid ID required")
else:
    print("Must be 16 or older for membership")

# Output: Library membership approved`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Practical Examples</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Student Grade Calculator</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# Student grade calculator
def calculate_grade(score):
    if score >= 95:
        return "A+"
    elif score >= 90:
        return "A"
    elif score >= 85:
        return "A-"
    elif score >= 80:
        return "B+"
    elif score >= 75:
        return "B"
    elif score >= 70:
        return "B-"
    elif score >= 65:
        return "C+"
    elif score >= 60:
        return "C"
    elif score >= 55:
        return "C-"
    elif score >= 50:
        return "D"
    else:
        return "F"

# Test the function
scores = [98, 87, 76, 65, 45, 92]
for score in scores:
    grade = calculate_grade(score)
    print(f"Score: {score}, Grade: {grade}")

# Output:
# Score: 98, Grade: A+
# Score: 87, Grade: A-
# Score: 76, Grade: B
# Score: 65, Grade: C+
# Score: 45, Grade: F
# Score: 92, Grade: A`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-400 mb-3">Password Strength Checker</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
{`# Password strength checker
def check_password_strength(password):
    has_upper = any(c.isupper() for c in password)
    has_lower = any(c.islower() for c in password)
    has_digit = any(c.isdigit() for c in password)
    has_special = any(c in "!@#$%^&*()_+-=[]{}|;:,.<>?" for c in password)
    
    score = 0
    feedback = []
    
    if len(password) >= 8:
        score += 1
    else:
        feedback.append("Password should be at least 8 characters long")
    
    if has_upper:
        score += 1
    else:
        feedback.append("Add uppercase letters")
    
    if has_lower:
        score += 1
    else:
        feedback.append("Add lowercase letters")
    
    if has_digit:
        score += 1
    else:
        feedback.append("Add numbers")
    
    if has_special:
        score += 1
    else:
        feedback.append("Add special characters")
    
    if score >= 4:
        strength = "Strong"
    elif score >= 3:
        strength = "Medium"
    elif score >= 2:
        strength = "Weak"
    else:
        strength = "Very Weak"
    
    return strength, feedback

# Test the function
passwords = ["password", "Password123", "MyStr0ng!Pass", "abc"]
for pwd in passwords:
    strength, feedback = check_password_strength(pwd)
    print(f"Password: {pwd}")
    print(f"Strength: {strength}")
    if feedback:
        print(f"Suggestions: {', '.join(feedback)}")
    print()

# Output:
# Password: password
# Strength: Weak
# Suggestions: Add uppercase letters, Add numbers, Add special characters
# 
# Password: Password123
# Strength: Strong
# 
# Password: MyStr0ng!Pass
# Strength: Strong
# 
# Password: abc
# Strength: Very Weak
# Suggestions: Password should be at least 8 characters long, Add uppercase letters, Add numbers, Add special characters`}
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
                <h4 className="text-white font-semibold">Use clear and descriptive variable names</h4>
                <p className="text-gray-400">Make your conditions readable and self-documenting</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-green-400 text-xl">✓</div>
              <div>
                <h4 className="text-white font-semibold">Keep conditions simple</h4>
                <p className="text-gray-400">Break complex conditions into multiple simple ones</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-green-400 text-xl">✓</div>
              <div>
                <h4 className="text-white font-semibold">Use parentheses for clarity</h4>
                <p className="text-gray-400">Group conditions to make precedence clear</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="text-green-400 text-xl">✓</div>
              <div>
                <h4 className="text-white font-semibold">Avoid deep nesting</h4>
                <p className="text-gray-400">Use early returns or guard clauses to reduce nesting</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Link href="/python/basics/operators" className="bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 transition">
            ← Previous: Type Casting & Operators
          </Link>
          <Link href="/python/basics/loops" className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition">
            Next: Loops →
          </Link>
        </div>
      </section>
    </main>
  );
}
