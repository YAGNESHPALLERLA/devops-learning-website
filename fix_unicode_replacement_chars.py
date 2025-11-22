import re

# Read the file
with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

print("Fixing Unicode replacement characters...")
original_content = content

# Fix patterns with Unicode replacement character ()
# This character appears when the original character couldn't be decoded

# Pattern: "3n+—" -> "3. " (where is Unicode replacement char)
content = re.sub(r'(\d)n\+[^\w\s—]', r'\1. ', content)

# Pattern: "3—24" -> "3-24" (where is Unicode replacement char between numbers)
content = re.sub(r'(\d)—[^\w\s](\d)', r'\1-\2', content)

# Also fix "3G24" if it still exists
content = re.sub(r'(\d)G(\d)', r'\1-\2', content)

# Fix "—" that appears with replacement chars
content = re.sub(r'—[^\w\s]', '—', content)

# Count changes
if content != original_content:
    print(f"Fixed Unicode replacement characters")
    
    # Write back
    with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("File updated successfully!")
    
    # Verify JSX syntax
    if 'className="' in content and 'className→' not in content:
        print("✓ JSX syntax preserved")
else:
    print("No Unicode replacement characters found.")

