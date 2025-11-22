import re

# Read the file
with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

print("Fixing encoding issues safely (only in text content)...")
original_content = content

# Strategy: Only replace in text content, never in JSX attributes
# We'll use patterns that match text between > and <, or specific text contexts

# 1. Fix numbered list items in headings (e.g., "1n+G" -> "1. ")
# This pattern appears in h5 tags, safe to replace
content = re.sub(r'(\d)n\+G', r'\1. ', content)

# 2. Fix number ranges (e.g., "3G24" -> "3-24")
# Only when G is between two digits
content = re.sub(r'(\d)G(\d)', r'\1-\2', content)

# 3. Fix bullet points - only when "=" appears at start of text content
# Pattern: after > or newline, whitespace, then "=" followed by non-whitespace
# This avoids JSX attributes like className="..."
content = re.sub(r'(>|\n)\s*=', r'\1→', content)

# 4. Fix other specific corrupted patterns in text
# These patterns are clearly in text content, not in JSX
content = re.sub(r'=Ʀ', '→', content)
content = re.sub(r'=ƺ', '→', content)
content = re.sub(r'=\+', '→', content)
content = re.sub(r'GŦn\+', '→', content)

# 5. Fix "G" that appears in text (but not in "Gen2" or other valid words)
# Only replace standalone "G" or "G" followed by non-alphanumeric (except in Gen2)
# Be careful: don't break "Gen2"
content = re.sub(r'G([^a-zA-Z0-9])', r'—\1', content)
# But fix "Gen2" if it got corrupted to "—en2"
content = re.sub(r'—en2', 'Gen2', content)

# Count changes
if content != original_content:
    print(f"Fixed encoding issues")
    
    # Write back
    with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("File updated successfully!")
    
    # Show a sample of what was fixed
    print("\nSample of fixes:")
    lines = content.split('\n')
    for i, line in enumerate(lines[600:610], start=601):
        if '→' in line or '—' in line or re.search(r'\d\. ', line):
            print(f"Line {i}: {line[:100]}")
else:
    print("No encoding issues found.")

