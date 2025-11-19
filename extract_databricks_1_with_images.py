import zipfile
import json
import os
import shutil
from xml.etree import ElementTree as ET
import re

docx_path = 'public/downloads/Azure Databricks -1.docx'
extract_dir = 'extracted_databricks_1'

print("=== Extracting Azure Databricks -1.docx with Image Mapping ===\n")

# Read document.xml
document_xml = os.path.join(extract_dir, 'word', 'document.xml')
tree = ET.parse(document_xml)
root = tree.getroot()

# Namespace
ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
      'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
      'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
      'wp': 'http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing'}

# First, map all image relationships
image_relationships = {}
rels_dir = os.path.join(extract_dir, 'word', '_rels')
document_rels = os.path.join(rels_dir, 'document.xml.rels')

if os.path.exists(document_rels):
    rel_tree = ET.parse(document_rels)
    rel_root = rel_tree.getroot()
    for rel in rel_root.findall('.//{http://schemas.openxmlformats.org/package/2006/relationships}Relationship'):
        rel_id = rel.get('Id')
        target = rel.get('Target')
        rel_type = rel.get('Type', '')
        if 'image' in rel_type.lower() or (target and 'media' in target.lower()):
            image_relationships[rel_id] = target

print(f"Found {len(image_relationships)} image relationships")

# Extract paragraphs with images
paragraphs_with_images = []
all_paragraphs = []
current_section = "Introduction"
image_counter = 1

for para_idx, para in enumerate(root.findall('.//w:p', ns)):
    # Get text
    text_elements = para.findall('.//w:t', ns)
    para_text = ''.join([elem.text or '' for elem in text_elements]).strip()
    
    # Check for images in this paragraph
    images_in_para = []
    for drawing in para.findall('.//w:drawing', ns):
        blip = drawing.find('.//a:blip', ns)
        if blip is not None:
            embed_id = blip.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed')
            if embed_id and embed_id in image_relationships:
                image_path = image_relationships[embed_id]
                source_path = os.path.join(extract_dir, 'word', image_path)
                if os.path.exists(source_path):
                    image_name = f"db1_image{image_counter}.png"
                    dest_path = os.path.join('public/tutorials/azure/images', image_name)
                    shutil.copy2(source_path, dest_path)
                    images_in_para.append(image_name)
                    print(f"Image {image_counter}: {image_name} - Text context: {para_text[:80] if para_text else 'No text'}")
                    image_counter += 1
    
    # Check if it's a heading
    is_heading = False
    pPr = para.find('w:pPr', ns)
    if pPr is not None:
        pStyle = pPr.find('w:pStyle', ns)
        if pStyle is not None:
            style = pStyle.get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val', '')
            if 'heading' in style.lower() or 'Heading' in style:
                is_heading = True
                current_section = para_text
    
    # Also check if text looks like a heading
    if para_text and (para_text.startswith(('1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.')) or 
                      (len(para_text) < 100 and para_text.isupper())):
        is_heading = True
        current_section = para_text
    
    if para_text:
        para_data = {
            'index': para_idx,
            'text': para_text,
            'is_heading': is_heading,
            'section': current_section,
            'has_image': len(images_in_para) > 0,
            'images': images_in_para
        }
        all_paragraphs.append(para_data)
        
        if images_in_para:
            paragraphs_with_images.append(para_data)

# Group by sections
sections = {}
for para in all_paragraphs:
    section = para['section']
    if section not in sections:
        sections[section] = {
            'paragraphs': [],
            'images': []
        }
    sections[section]['paragraphs'].append(para['text'])
    if para['images']:
        sections[section]['images'].extend(para['images'])

# Save data
with open('databricks_1_full_content.json', 'w', encoding='utf-8') as f:
    json.dump(all_paragraphs, f, indent=2, ensure_ascii=False)

with open('databricks_1_sections.json', 'w', encoding='utf-8') as f:
    json.dump(sections, f, indent=2, ensure_ascii=False)

print(f"\n=== Summary ===")
print(f"Total paragraphs: {len(all_paragraphs)}")
print(f"Paragraphs with images: {len(paragraphs_with_images)}")
print(f"Total images extracted: {image_counter - 1}")
print(f"Total sections: {len(sections)}")

print("\n=== Sections with Images ===")
for section, data in list(sections.items())[:50]:
    if data['images']:
        print(f"\n{section[:70]}")
        print(f"  Images ({len(data['images'])}): {', '.join(data['images'])}")
        print(f"  Sample text: {data['paragraphs'][0][:100] if data['paragraphs'] else 'No text'}")

print("\n=== All Main Sections (first 30) ===")
for i, section in enumerate(list(sections.keys())[:30], 1):
    data = sections[section]
    print(f"{i}. {section[:60]} - {len(data['paragraphs'])} paragraphs, {len(data['images'])} images")

print(f"\nExtraction complete!")

