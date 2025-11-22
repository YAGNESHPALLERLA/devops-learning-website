import re

# Read the file
with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

print("Applying safe encoding fixes...")
original_content = content

# Apply only safe fixes that won't break JSX

# 1. Fix numbered list items in headings
content = re.sub(r'(\d)n\+G', r'\1. ', content)

# 2. Fix number ranges
content = re.sub(r'(\d)G(\d)', r'\1-\2', content)

# 3. Fix bullet points in <p> tags only (very specific pattern)
content = re.sub(r'(<p[^>]*>)\s*=\s*([^"\'<>\s])', r'\1→\2', content)

# 4. Fix bullet points in <td> tags
content = re.sub(r'(<td[^>]*>)\s*=\s*([^"\'<>\s])', r'\1→\2', content)

# 5. Fix other specific patterns
content = re.sub(r'=Ʀ', '→', content)
content = re.sub(r'=ƺ', '→', content)
content = re.sub(r'=\+', '→', content)
content = re.sub(r'GŦn\+', '→', content)

# 6. Fix "G" in text (but preserve "Gen2")
content = re.sub(r'G(?!en2)([^a-zA-Z0-9])', r'—\1', content)

# Count changes
if content != original_content:
    print(f"Applied safe encoding fixes")
    
    # Write back
    with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("File updated successfully!")
    
    # Verify JSX syntax
    if 'className="' in content and 'className→' not in content:
        print("✓ JSX syntax preserved")
    else:
        print("⚠ Warning: JSX syntax may have been affected")
else:
    print("No encoding issues found.")

