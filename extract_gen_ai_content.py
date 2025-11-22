import docx
import json
import os
import shutil
from pathlib import Path

# Read the document
doc = docx.Document('public/downloads/Gen Ai.docx')

# Extract structure
sections = []
current_section = None
current_content = []
image_count = 0

# Create output directory for images
image_dir = Path('public/tutorials/artificial-intelligence/generative-ai/images')
image_dir.mkdir(parents=True, exist_ok=True)

# Extract images from document
for rel in doc.part.rels.values():
    if "image" in rel.target_ref:
        image_count += 1
        image_data = rel.target_part.blob
        image_ext = rel.target_ref.split('.')[-1] if '.' in rel.target_ref else 'png'
        image_filename = f'image-{image_count:02d}.{image_ext}'
        image_path = image_dir / image_filename
        with open(image_path, 'wb') as f:
            f.write(image_data)
        print(f'Extracted image: {image_path}')

print(f'\nTotal images found: {image_count}')

# Extract text content
for p in doc.paragraphs:
    text = p.text.strip()
    if not text:
        continue
    
    # Check if this is a section heading (starts with number or is a major heading)
    is_heading = False
    if text[0].isdigit() and '.' in text[:5] and len(text) > 10:
        is_heading = True
    elif p.style.name.startswith('Heading') and len(text) > 5:
        is_heading = True
    
    if is_heading:
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

print(f'\nFound {len(sections)} sections')
for i, s in enumerate(sections[:10]):
    print(f'{i+1}. {s["title"][:80]}... ({len(s["content"])} paragraphs)')

# Save structure to JSON
with open('gen_ai_content_structure.json', 'w', encoding='utf-8') as f:
    json.dump({
        'total_sections': len(sections),
        'total_images': image_count,
        'sections': sections
    }, f, indent=2, ensure_ascii=False)

print('\nSaved structure to gen_ai_content_structure.json')

