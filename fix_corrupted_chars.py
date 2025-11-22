import re

# Read the file
with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

print("Fixing corrupted characters...")
original_content = content

# Fix specific corrupted patterns we can see
replacements = [
    # Numbered list items with corrupted characters
    (r'1n\+—', '1. '),
    (r'2n\+—', '2. '),
    (r'3n\+—', '3. '),
    (r'4n\+—', '4. '),
    (r'5n\+—', '5. '),
    
    # Bullet points with corrupted characters
    (r'→', '→'),
    (r'→Ʀ', '→'),
    (r'→ƺ', '→'),
    (r'→\+', '→'),
    
    # Em dashes with corrupted characters
    (r'—', '—'),
    (r'—Ŧn\+', '→'),
    
    # Other patterns
    (r'=Ʀ', '→'),
    (r'=ƺ', '→'),
    (r'=\+', '→'),
]

for pattern, replacement in replacements:
    content = re.sub(pattern, replacement, content)

# Count changes
if content != original_content:
    print(f"Fixed corrupted characters")
    
    # Write back
    with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("File updated successfully!")
else:
    print("No corrupted characters found.")

