import docx
import json

doc = docx.Document('public/downloads/llms.docx')

sections = []
current_section = None
current_content = []

for p in doc.paragraphs:
    text = p.text.strip()
    if not text:
        continue
    
    # Check if this is a section heading (starts with number)
    if text[0].isdigit() and '.' in text[:5] and len(text) > 10:
        if current_section:
            sections.append({
                'title': current_section,
                'content': current_content
            })
        current_section = text
        current_content = []
    elif current_section:
        current_content.append(text)

# Add the last section
if current_section:
    sections.append({
        'title': current_section,
        'content': current_content
    })

print(f'Found {len(sections)} sections')
for i, s in enumerate(sections):
    print(f'{i+1}. {s["title"][:80]}... ({len(s["content"])} paragraphs)')

# Save to JSON for reference
with open('llms_content_structure.json', 'w', encoding='utf-8') as f:
    json.dump(sections, f, indent=2, ensure_ascii=False)

print('\nSaved structure to llms_content_structure.json')

