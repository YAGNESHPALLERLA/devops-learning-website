import zipfile
import json
import os
import shutil
from xml.etree import ElementTree as ET
import re

docx_path = 'public/downloads/Azure Databricks -1.docx'
extract_dir = 'extracted_databricks_1'

print("=== Advanced Extraction of Azure Databricks -1.docx ===\n")

# Read document.xml
document_xml = os.path.join(extract_dir, 'word', 'document.xml')
tree = ET.parse(document_xml)
root = tree.getroot()

# Namespace
ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
      'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
      'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
      'wp': 'http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing'}

# Extract all paragraphs with their properties
paragraphs_data = []
current_section = "Introduction"

for para in root.findall('.//w:p', ns):
    # Get text
    text_elements = para.findall('.//w:t', ns)
    para_text = ''.join([elem.text or '' for elem in text_elements]).strip()
    
    if not para_text:
        continue
    
    # Check for images
    image_refs = []
    for drawing in para.findall('.//w:drawing', ns):
        blip = drawing.find('.//a:blip', ns)
        if blip is not None:
            embed = blip.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed')
            if embed:
                image_refs.append(embed)
    
    # Check if it looks like a heading (bold, larger font, numbered, etc.)
    pPr = para.find('w:pPr', ns)
    is_heading = False
    is_bold = False
    font_size = None
    
    if pPr is not None:
        # Check for bold
        rPr = para.find('.//w:rPr', ns)
        if rPr is not None:
            b = rPr.find('w:b', ns)
            if b is not None:
                is_bold = True
        
        # Check for numbering
        numPr = pPr.find('w:numPr', ns)
        if numPr is not None:
            is_heading = True
    
    # Check if text looks like a heading (short, bold, numbered, etc.)
    if (is_bold and len(para_text) < 100) or para_text.startswith(('1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.')):
        is_heading = True
        current_section = para_text
    
    paragraphs_data.append({
        'text': para_text,
        'is_heading': is_heading,
        'is_bold': is_bold,
        'section': current_section,
        'has_image': len(image_refs) > 0,
        'image_refs': image_refs
    })

# Map images to paragraphs
image_mapping = {}
image_files = []

# Read relationships to map image IDs to filenames
rels_dir = os.path.join(extract_dir, 'word', '_rels')
if os.path.exists(rels_dir):
    for rel_file in os.listdir(rels_dir):
        if rel_file.endswith('.rels'):
            rel_path = os.path.join(rels_dir, rel_file)
            rel_tree = ET.parse(rel_path)
            rel_root = rel_tree.getroot()
            
            for rel in rel_root.findall('.//{http://schemas.openxmlformats.org/package/2006/relationships}Relationship'):
                rel_id = rel.get('Id')
                target = rel.get('Target')
                if target and 'image' in target.lower():
                    image_mapping[rel_id] = target

# Now map images to paragraphs
image_index = 1
for para_data in paragraphs_data:
    if para_data['has_image']:
        for img_ref in para_data['image_refs']:
            if img_ref in image_mapping:
                image_name = f"db1_image{image_index}.png"
                source_path = os.path.join(extract_dir, 'word', image_mapping[img_ref])
                if os.path.exists(source_path):
                    dest_path = os.path.join('public/tutorials/azure/images', image_name)
                    shutil.copy2(source_path, dest_path)
                    para_data['image_name'] = image_name
                    image_index += 1
                    print(f"Mapped image: {image_name} to section: {para_data['section'][:50]}")

# Save extracted data
with open('databricks_1_content.json', 'w', encoding='utf-8') as f:
    json.dump(paragraphs_data, f, indent=2, ensure_ascii=False)

# Group by sections
sections = {}
for para in paragraphs_data:
    section = para['section']
    if section not in sections:
        sections[section] = {
            'paragraphs': [],
            'images': []
        }
    sections[section]['paragraphs'].append(para['text'])
    if 'image_name' in para:
        sections[section]['images'].append(para['image_name'])

print(f"\n=== Document Sections ===")
print(f"Total sections: {len(sections)}")
print(f"Total paragraphs: {len(paragraphs_data)}")
print(f"Total images: {image_index - 1}")

print("\n=== Sections with Images ===")
for section, data in sections.items():
    if data['images']:
        print(f"\n{section[:60]}")
        print(f"  Images: {len(data['images'])} - {', '.join(data['images'])}")
        print(f"  Paragraphs: {len(data['paragraphs'])}")

print("\n=== All Sections ===")
for i, (section, data) in enumerate(list(sections.items())[:30], 1):
    print(f"{i}. {section[:60]} ({len(data['paragraphs'])} paragraphs, {len(data['images'])} images)")

print(f"\nExtraction complete! Content saved to: databricks_1_content.json")

