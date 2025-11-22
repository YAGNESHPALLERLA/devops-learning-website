import re

# Read the file
with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

print("Fixing encoding issues carefully...")
original_content = content

# Only fix patterns that appear in text content, not in JSX attributes
# These are safe replacements that won't break JSX syntax

replacements = [
    # Numbered list items in headings (e.g., "3n+G" -> "3. ")
    (r'(\d)n\+G', r'\1. '),
    
    # Bullet points in text (e.g., "=" -> "→")
    (r'=', '→'),
    (r'=Ʀ', '→'),
    (r'=ƺ', '→'),
    (r'=\+', '→'),
    
    # Em dashes in text (e.g., "3G24" -> "3-24")
    (r'(\d)G(\d)', r'\1-\2'),
    (r'G', '—'),
    
    # Other patterns
    (r'GŦn\+', '→'),
]

for pattern, replacement in replacements:
    content = re.sub(pattern, replacement, content)

# Count changes
if content != original_content:
    print(f"Fixed encoding issues")
    
    # Write back
    with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("File updated successfully!")
else:
    print("No encoding issues found.")

