import re

# Read the file
with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix encoding issues - ONLY in text content, not in JSX attributes
# Fix numbered list items: "1n+G" -> "1. " (but preserve in code/JSX)
def fix_encoding_safe(text):
    lines = text.split('\n')
    result = []
    for line in lines:
        # Skip JSX attributes and code blocks
        if 'className=' in line or 'images={' in line or 'getImages' in line or 'src:' in line or 'alt:' in line:
            result.append(line)
            continue
        
        # Fix numbered lists: "1n+G" -> "1. "
        line = re.sub(r'(\d+)n\+G', r'\1. ', line)
        
        # Fix number ranges: "3G24" -> "3-24" (but preserve "Gen2")
        line = re.sub(r'(\d+)G(?!en2)(\d+)', r'\1-\2', line)
        
        # Fix em dashes: "G" -> "—" (but preserve "Gen2")
        line = re.sub(r'G(?!en2)', '—', line)
        
        # Fix specific corrupted patterns
        line = line.replace('=Ʀ', '')
        line = line.replace('=ƺ', '→')
        line = line.replace('=\+', '→')
        line = line.replace('GŦn+', '—')
        line = line.replace('GP', '➕')
        line = line.replace('=', '→')
        
        result.append(line)
    
    return '\n'.join(result)

content = fix_encoding_safe(content)

# Write the file
with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed encoding issues!")

