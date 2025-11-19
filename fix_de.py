from pathlib import Path
from ftfy import fix_text
path = Path('src/app/tutorials/azure-data-engineer/azure-databricks/page.tsx')
text = path.read_text(encoding='utf-8')
start = text.index('        {/* Data Engineering Section */}')
end = text.index('        {/* Notebook-level features - Main Heading */}', start)
block = text[start:end]
fixed = fix_text(block)
if block == fixed:
    print('no change')
else:
    path.write_text(text[:start] + fixed + text[end:], encoding='utf-8')
    print('updated block')
