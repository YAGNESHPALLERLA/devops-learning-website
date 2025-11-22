import re

# Read the file
with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

print("Fixing remaining encoding issues...")
original_content = content

# Fix "=" in table cells - these are clearly bullet points
# Pattern: <td...> followed by "=" at start of content
content = re.sub(r'(<td[^>]*>)\s*=\s*([^"\'<>\s])', r'\1→\2', content)

# Remove remaining Unicode replacement characters after arrows
content = re.sub(r'→[^\w\s<]', '→', content)

# Count changes
if content != original_content:
    print(f"Fixed remaining encoding issues")
    
    # Write back
    with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("File updated successfully!")
    
    # Verify JSX syntax
    if 'className="' in content and 'className→' not in content:
        print("✓ JSX syntax preserved")
else:
    print("No remaining encoding issues found.")

