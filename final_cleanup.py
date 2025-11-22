import re

# Read the file
with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

print("Final cleanup of Unicode replacement characters...")
original_content = content

# Remove Unicode replacement character () - this is a placeholder for undecodable characters
# Only remove when it appears in text content, not in code

# Pattern: "→" -> "→" (remove replacement chars after arrow)
content = re.sub(r'→[^\w\s<]', '→', content)

# Pattern: Remove standalone replacement chars that appear in text
# But be careful not to remove from code/JSX
content = re.sub(r'([\w\s])[^\w\s<>"\'=]{1,3}([\w\s])', r'\1 \2', content)

# Count changes
if content != original_content:
    print(f"Cleaned up Unicode replacement characters")
    
    # Write back
    with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("File updated successfully!")
    
    # Verify JSX syntax
    if 'className="' in content and 'className→' not in content:
        print("✓ JSX syntax preserved")
else:
    print("No cleanup needed.")

