import re

# Read the file
with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

print("Fixing text encoding issues...")
original_content = content

# Fix specific corrupted patterns in text content
# These patterns appear in the actual text, not in JSX attributes

replacements = [
    # Numbered list items in headings
    (r'1n\+—', '1. '),
    (r'2n\+—', '2. '),
    (r'3n\+—', '3. '),
    (r'4n\+—', '4. '),
    (r'5n\+—', '5. '),
    
    # Bullet points with corrupted characters
    (r'→', '→'),
    (r'→\+', '→'),
    (r'→Ʀ', '→'),
    (r'→ƺ', '→'),
    
    # Em dashes with corrupted characters
    (r'—', '—'),
    (r'—', '—'),
    
    # Other common corrupted patterns
    (r'=Ʀ', '→'),
    (r'=\+', '→'),
    (r'=ƺ', '→'),
    (r'GŦn\+', '→'),
]

for pattern, replacement in replacements:
    content = re.sub(pattern, replacement, content)

# Count changes
if content != original_content:
    print(f"Fixed text encoding issues")
    
    # Write back
    with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("File updated successfully!")
else:
    print("No text encoding issues found.")

