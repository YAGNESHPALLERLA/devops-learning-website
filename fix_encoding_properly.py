import re

# Read the file
with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# More careful replacements - only in text content, not in JSX attributes
# First, let's identify the actual corrupted characters

# Common patterns found:
# "n+G" should be "1. " or similar
# "=" at start of lines or in text should be "→" or "•"
# "G" in text should be "—" or "-"
# But we need to avoid replacing in JSX attributes

# Let's fix specific known issues:
replacements = [
    # Fix JSX attributes that got broken
    (r'className→', 'className='),
    (r'images→', 'images='),
    (r'Image—allery', 'ImageGallery'),
    (r'—roup', 'Group'),
    (r'—', '—'),
    
    # Fix numbered list items in headings
    (r'1n\+—', '1. '),
    (r'2n\+—', '2. '),
    (r'3n\+—', '3. '),
    (r'4n\+—', '4. '),
    (r'5n\+—', '5. '),
    
    # Fix bullet points in text (but not in JSX)
    # Only replace "→" pattern in text content
    (r'→', '→'),
    (r'→\+', '→'),
    (r'→Ʀ', '→'),
    (r'→ƺ', '→'),
    
    # Fix em dashes
    (r'—', '—'),
    (r'—', '—'),
]

print("Fixing encoding issues properly...")
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

