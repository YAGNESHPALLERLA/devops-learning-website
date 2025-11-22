import re

# Read the file
with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

print("Fixing encoding issues smartly (only in text content)...")
original_content = content

# Strategy: Only replace patterns that appear in text content, not in JSX attributes
# We'll look for patterns that are clearly in text (between > and <, or in specific contexts)

# Fix numbered list items in headings (e.g., "3n+G" -> "3. ")
content = re.sub(r'(\d)n\+G', r'\1. ', content)

# Fix "G" in number ranges (e.g., "3G24" -> "3-24")
content = re.sub(r'(\d)G(\d)', r'\1-\2', content)

# Fix bullet points - only when they appear at start of text content (after > or newline)
# This avoids breaking JSX attributes
content = re.sub(r'(>|^)\s*=', r'\1→', content, flags=re.MULTILINE)

# Fix other specific patterns that are clearly in text
content = re.sub(r'=Ʀ', '→', content)
content = re.sub(r'=ƺ', '→', content)
content = re.sub(r'=\+', '→', content)
content = re.sub(r'GŦn\+', '→', content)

# Fix remaining "G" that appear in text (but be careful not to break "Gen2")
# Only replace standalone "G" or "G" followed by non-alphanumeric
content = re.sub(r'G([^a-zA-Z0-9])', r'—\1', content)

# Count changes
if content != original_content:
    print(f"Fixed encoding issues")
    
    # Write back
    with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("File updated successfully!")
else:
    print("No encoding issues found.")

