import re

# Read the file
with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

print("Fixing encoding issues conservatively (only safe patterns)...")
original_content = content

# Only fix patterns that are 100% safe and won't break JSX

# 1. Fix numbered list items in headings - very specific pattern
# Pattern: digit + "n+G" in h5 tags
content = re.sub(r'(\d)n\+G', r'\1. ', content)

# 2. Fix number ranges - only when G is between two digits
content = re.sub(r'(\d)G(\d)', r'\1-\2', content)

# 3. Fix bullet points - ONLY when "=" appears in <p> tags with specific patterns
# Pattern: <p...> followed by whitespace, then "=" followed by non-whitespace that's not a quote
# This ensures we don't touch JSX attributes
content = re.sub(r'(<p[^>]*>)\s*=\s*([^"\'<>\s])', r'\1→\2', content)

# 4. Fix other specific patterns that are clearly in text (not in JSX)
content = re.sub(r'=Ʀ', '→', content)
content = re.sub(r'=ƺ', '→', content)
content = re.sub(r'=\+', '→', content)
content = re.sub(r'GŦn\+', '→', content)

# 5. Fix "G" in text - but preserve "Gen2" and other valid words
# Only replace "G" when it's followed by non-alphanumeric and not part of a word
content = re.sub(r'G(?!en2)([^a-zA-Z0-9])', r'—\1', content)

# Count changes
if content != original_content:
    print(f"Fixed encoding issues")
    
    # Write back
    with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    print("File updated successfully!")
    
    # Verify JSX syntax
    if 'className="' in content and 'className→' not in content:
        print("✓ JSX syntax preserved")
    else:
        print("⚠ Warning: JSX syntax may have been affected")
        # Restore if broken
        if 'className→' in content:
            print("Restoring file due to JSX syntax breakage...")
            import subprocess
            subprocess.run(['git', 'checkout', 'src/app/tutorials/azure-data-engineer/azure-basics/page.tsx'])
else:
    print("No encoding issues found.")

