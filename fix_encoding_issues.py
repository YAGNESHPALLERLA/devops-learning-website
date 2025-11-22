import re

# Read the file
with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Common corrupted character patterns and their replacements
replacements = [
    # Numbered list items
    (r'n\+G', '1. '),
    (r'2n\+G', '2. '),
    (r'3n\+G', '3. '),
    (r'4n\+G', '4. '),
    (r'5n\+G', '5. '),
    
    # Bullet points and arrows
    (r'=', '→'),
    (r'=\+', '→'),
    (r'=Ʀ', '→'),
    (r'=ƺ', '→'),
    (r'G', '—'),
    (r'GŦn\+', '→'),
    
    # Other common issues
    (r'', ''),  # Remove any remaining replacement characters
]

print("Fixing encoding issues...")
original_content = content

for pattern, replacement in replacements:
    content = re.sub(pattern, replacement, content)

# Count changes
if content != original_content:
    print(f"Fixed encoding issues in the file")
    
    # Write back
    with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("File updated successfully!")
else:
    print("No encoding issues found.")

