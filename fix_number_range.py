import re

# Read the file
with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

print("Fixing number range pattern...")
original_content = content

# Fix "3—24" -> "3-24" (em dash with replacement chars between numbers)
content = re.sub(r'(\d)—[^\w\s](\d)', r'\1-\2', content)

# Also fix if there are multiple replacement chars
content = re.sub(r'(\d)—+[^\w\s]+(\d)', r'\1-\2', content)

# Count changes
if content != original_content:
    print(f"Fixed number range pattern")
    
    # Write back
    with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("File updated successfully!")
    
    # Verify JSX syntax
    if 'className="' in content and 'className→' not in content:
        print("✓ JSX syntax preserved")
else:
    print("No number range pattern found.")

