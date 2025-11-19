import zipfile
import json
import os
import shutil
from xml.etree import ElementTree as ET
import re

docx_path = 'public/downloads/Azure Databricks -2.docx'
extract_dir = 'extracted_databricks_2'

print("=== Extracting Content and Images from Azure Databricks -2.docx ===\n")

# Extract the docx file if not already extracted
if not os.path.exists(extract_dir):
    print(f"Extracting {docx_path}...")
    with zipfile.ZipFile(docx_path, 'r') as zip_ref:
        zip_ref.extractall(extract_dir)
    print("Extraction complete!\n")

# Read document.xml
document_xml = os.path.join(extract_dir, 'word', 'document.xml')
if not os.path.exists(document_xml):
    print(f"Error: {document_xml} not found!")
    exit(1)

tree = ET.parse(document_xml)
root = tree.getroot()

# Namespace
ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
      'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
      'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
      'wp': 'http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing'}

# Map image relationships
image_mapping = {}
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

print(f"Found {len(image_mapping)} image relationships\n")

# Extract paragraphs with section tracking
paragraphs_data = []
current_section = "Introduction"
current_subsection = None
image_counter = 1

for para in root.findall('.//w:p', ns):
    # Get text
    text_elements = para.findall('.//w:t', ns)
    para_text = ''.join([elem.text or '' for elem in text_elements]).strip()
    
    if not para_text:
        # Check for images even in empty paragraphs
        image_refs = []
        for drawing in para.findall('.//w:drawing', ns):
            blip = drawing.find('.//a:blip', ns)
            if blip is not None:
                embed = blip.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed')
                if embed:
                    image_refs.append(embed)
        
        if image_refs:
            paragraphs_data.append({
                'text': '',
                'is_heading': False,
                'is_bold': False,
                'section': current_section,
                'subsection': current_subsection,
                'has_image': True,
                'image_refs': image_refs
            })
        continue
    
    # Check if it's a heading
    is_heading = False
    is_bold = False
    pPr = para.find('w:pPr', ns)
    
    if pPr is not None:
        rPr = para.find('.//w:rPr', ns)
        if rPr is not None:
            b = rPr.find('w:b', ns)
            if b is not None:
                is_bold = True
    
    numPr = pPr.find('w:numPr', ns) if pPr is not None else None
    if numPr is not None:
        is_heading = True
    
    if (is_bold and len(para_text) < 100) or para_text.startswith(('1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.')):
        is_heading = True
    
    # Check for images
    image_refs = []
    for drawing in para.findall('.//w:drawing', ns):
        blip = drawing.find('.//a:blip', ns)
        if blip is not None:
            embed = blip.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed')
            if embed:
                image_refs.append(embed)
    
    # Update section tracking
    if is_heading:
        # Check if it's a main section
        if any(keyword in para_text.lower() for keyword in ['introduction', 'overview', 'databricks', 'workspace', 'sql', 'data engineering', 'ai/ml']):
            current_section = para_text
            current_subsection = None
        elif len(para_text) < 100 and is_bold:
            current_subsection = para_text
    
    paragraphs_data.append({
        'text': para_text,
        'is_heading': is_heading,
        'is_bold': is_bold,
        'section': current_section,
        'subsection': current_subsection,
        'has_image': len(image_refs) > 0,
        'image_refs': image_refs
    })

# Extract and copy images, mapping them to sections
section_image_map = {}
image_index = 1

for para_data in paragraphs_data:
    if para_data['has_image']:
        for img_ref in para_data['image_refs']:
            if img_ref in image_mapping:
                image_name = f"db2_image{image_index}.png"
                source_path = os.path.join(extract_dir, 'word', image_mapping[img_ref])
                
                if os.path.exists(source_path):
                    dest_path = os.path.join('public/tutorials/azure/images', image_name)
                    shutil.copy2(source_path, dest_path)
                    
                    # Create section key
                    section_key = para_data['section']
                    if para_data['subsection']:
                        section_key = f"{para_data['section']} / {para_data['subsection']}"
                    
                    if section_key not in section_image_map:
                        section_image_map[section_key] = []
                    
                    section_image_map[section_key].append({
                        'image_name': image_name,
                        'image_file': image_name,
                        'section': para_data['section'],
                        'subsection': para_data['subsection'],
                        'context': para_data['text'][:100] if para_data['text'] else 'Image only paragraph',
                        'paragraph_index': len(paragraphs_data)
                    })
                    
                    print(f"Image {image_index}: {image_name}")
                    print(f"  Section: {para_data['section']}")
                    print(f"  Subsection: {para_data['subsection']}")
                    print(f"  Context: {para_data['text'][:80] if para_data['text'] else 'Image only'}")
                    print()
                    
                    image_index += 1

# Save the content
with open('databricks_2_content.json', 'w', encoding='utf-8') as f:
    json.dump(paragraphs_data, f, indent=2, ensure_ascii=False)

# Save the mapping
with open('databricks_2_subsection_image_mapping.json', 'w', encoding='utf-8') as f:
    json.dump(section_image_map, f, indent=2, ensure_ascii=False)

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
    if para['has_image']:
        for img_ref in para['image_refs']:
            if img_ref in image_mapping:
                # Find the image name
                for sec_key, imgs in section_image_map.items():
                    for img in imgs:
                        if img['paragraph_index'] == len(paragraphs_data):
                            sections[section]['images'].append(img['image_name'])

print(f"\n=== Summary ===")
print(f"Total paragraphs: {len(paragraphs_data)}")
print(f"Total images extracted: {image_index - 1}")
print(f"Sections with images: {len(section_image_map)}")
print("\nImages by section:")
for section, images in section_image_map.items():
    print(f"\n{section}:")
    for img in images:
        print(f"  - {img['image_name']} ({img['context'][:60]})")

print(f"\nContent saved to: databricks_2_content.json")
print(f"Mapping saved to: databricks_2_subsection_image_mapping.json")

