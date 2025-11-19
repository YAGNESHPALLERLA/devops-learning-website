from pathlib import Path
from ftfy import fix_text
path = Path('src/app/tutorials/azure-data-engineer/azure-databricks/page.tsx')
raw = path.read_bytes()
text_latin = raw.decode('latin-1')
fixed = fix_text(text_latin)
path.write_text(fixed, encoding='utf-8')
