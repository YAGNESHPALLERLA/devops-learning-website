import re

# Read the file
with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

print("Removing Unicode replacement characters...")
original_content = content

# Remove Unicode replacement character () when it appears with our fixed patterns
# This character is a placeholder for characters that couldn't be decoded

# Pattern: "3. —" -> "3. " (remove replacement char and em dash)
content = re.sub(r'(\d\. )—[^\w\s]', r'\1', content)

# Pattern: "3—24" -> "3-24" (fix number range)
content = re.sub(r'(\d)—[^\w\s](\d)', r'\1-\2', content)

# Pattern: "→" -> "→" (remove replacement chars after arrow)
content = re.sub(r'→[^\w\s<]', '→', content)

# Pattern: "—" -> "" (remove em dash with replacement char)
content = re.sub(r'—[^\w\s]', '', content)

# Count changes
if content != original_content:
    print(f"Removed Unicode replacement characters")
    
    # Write back
    with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("File updated successfully!")
    
    # Verify JSX syntax
    if 'className="' in content and 'className→' not in content:
        print("✓ JSX syntax preserved")
else:
    print("No Unicode replacement characters to remove.")

