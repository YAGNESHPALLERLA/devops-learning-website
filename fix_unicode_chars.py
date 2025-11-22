import re

# Read the file
with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

print("Fixing remaining Unicode replacement characters...")
original_content = content

# Fix Unicode replacement characters () that appear with corrupted patterns
# These are placeholders for characters that couldn't be decoded

# Fix patterns like "3n+—" -> "3. "
content = re.sub(r'(\d)n\+—', r'\1. ', content)

# Fix patterns like "3—24" -> "3-24"
content = re.sub(r'(\d)—(\d)', r'\1-\2', content)

# Fix patterns like "→" -> "→"
content = re.sub(r'→', '→', content)

# Fix patterns like "—" -> "—"
content = re.sub(r'—', '—', content)

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

