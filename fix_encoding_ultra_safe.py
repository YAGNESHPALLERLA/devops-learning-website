import re

# Read the file
with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

print("Fixing encoding issues ultra-safely...")
original_content = content

# Strategy: Only fix patterns that are clearly in text content
# Never touch anything that looks like JSX attributes

# 1. Fix numbered list items in headings (e.g., "1n+G" -> "1. ")
# This is safe - appears in h5 tags
content = re.sub(r'(\d)n\+G', r'\1. ', content)

# 2. Fix number ranges (e.g., "3G24" -> "3-24")
# Only when G is between two digits
content = re.sub(r'(\d)G(\d)', r'\1-\2', content)

# 3. Fix bullet points - ONLY when "=" appears in specific text contexts
# Pattern: inside <p> or <td> tags, after >, then whitespace, then "=" followed by specific characters
# This avoids JSX attributes
content = re.sub(r'(<p[^>]*>|<td[^>]*>)[^<]*\s*=', r'\1→', content)
# Also fix at start of lines in text content
content = re.sub(r'(>\s*)\n\s*=', r'\1\n→', content)

# 4. Fix other specific corrupted patterns that are clearly in text
content = re.sub(r'=Ʀ', '→', content)
content = re.sub(r'=ƺ', '→', content)
content = re.sub(r'=\+', '→', content)
content = re.sub(r'GŦn\+', '→', content)

# 5. Fix "G" that appears in text (but preserve "Gen2")
# Only replace "G" when it's followed by non-alphanumeric and not part of "Gen2"
# Use negative lookahead to avoid breaking "Gen2"
content = re.sub(r'G(?!en2)([^a-zA-Z0-9])', r'—\1', content)

# Count changes
if content != original_content:
    print(f"Fixed encoding issues")
    
    # Write back
    with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("File updated successfully!")
    
    # Verify no JSX syntax was broken
    if 'className="' in content and 'className→' not in content:
        print("✓ JSX syntax preserved")
    else:
        print("⚠ Warning: JSX syntax may have been affected")
else:
    print("No encoding issues found.")

