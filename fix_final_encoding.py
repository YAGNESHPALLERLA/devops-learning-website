import re

# Read the file
with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

print("Fixing final encoding issues...")
original_content = content

# Fix patterns with Unicode replacement characters
# Pattern: "3n+—" -> "3. " (where is Unicode replacement char)
content = re.sub(r'(\d)n\+[^\w\s]', r'\1. ', content)

# Pattern: "3—24" -> "3-24" (where is Unicode replacement char)
content = re.sub(r'(\d)[^\w\s](\d)', r'\1-\2', content)

# Fix remaining "=" patterns that are clearly bullet points
# Only in text content, not in JSX attributes
# Look for "=" followed by specific patterns that indicate it's a bullet point
content = re.sub(r'(>)\s*=\s*([A-Z])', r'\1→\2', content)
content = re.sub(r'(>)\s*=\s*([^\w<])', r'\1→\2', content)

# Fix "—" patterns (em dashes with replacement chars)
content = re.sub(r'—[^\w\s]', '—', content)

# Count changes
if content != original_content:
    print(f"Fixed final encoding issues")
    
    # Write back
    with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("File updated successfully!")
    
    # Verify JSX syntax
    if 'className="' in content and 'className→' not in content:
        print("✓ JSX syntax preserved")
else:
    print("No final encoding issues found.")

