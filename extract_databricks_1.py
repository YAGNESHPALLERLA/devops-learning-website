import zipfile
import json
import os
import shutil
from xml.etree import ElementTree as ET
import re

docx_path = 'public/downloads/Azure Databricks -1.docx'
extract_dir = 'extracted_databricks_1'
media_dir = os.path.join(extract_dir, 'media')

# Create extraction directory
if os.path.exists(extract_dir):
    shutil.rmtree(extract_dir)
os.makedirs(extract_dir, exist_ok=True)
os.makedirs(media_dir, exist_ok=True)

print("=== Extracting Azure Databricks -1.docx ===\n")

# Extract DOCX file
with zipfile.ZipFile(docx_path, 'r') as zip_ref:
    zip_ref.extractall(extract_dir)

# Read document.xml
document_xml = os.path.join(extract_dir, 'word', 'document.xml')
tree = ET.parse(document_xml)
root = tree.getroot()

# Namespace
ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
      'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
      'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
      'wp': 'http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing'}

# Extract images
image_files = []
for rel_file in os.listdir(os.path.join(extract_dir, 'word', '_rels')):
    if rel_file.endswith('.rels'):
        rel_path = os.path.join(extract_dir, 'word', '_rels', rel_file)
        rel_tree = ET.parse(rel_path)
        rel_root = rel_tree.getroot()
        
        for rel in rel_root.findall('.//{http://schemas.openxmlformats.org/package/2006/relationships}Relationship'):
            if 'image' in rel.get('Type', ''):
                target = rel.get('Target')
                if target:
                    image_id = rel.get('Id')
                    # Copy image
                    source_path = os.path.join(extract_dir, 'word', target)
                    if os.path.exists(source_path):
                        image_name = f"image{len(image_files) + 1}.png"
                        dest_path = os.path.join(media_dir, image_name)
                        shutil.copy2(source_path, dest_path)
                        image_files.append({
                            'id': image_id,
                            'name': image_name,
                            'original': target
                        })
                        print(f"Extracted image: {image_name}")

print(f"\nTotal images extracted: {len(image_files)}")

# Extract text and structure
document_text = []
current_heading = None
image_index = 0

for para in root.findall('.//w:p', ns):
    text_elements = para.findall('.//w:t', ns)
    para_text = ''.join([elem.text or '' for elem in text_elements]).strip()
    
    # Check if it's a heading
    pPr = para.find('w:pPr', ns)
    is_heading = False
    heading_level = None
    
    if pPr is not None:
        pStyle = pPr.find('w:pStyle', ns)
        if pStyle is not None:
            style = pStyle.get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val')
            if style and ('Heading' in style or 'heading' in style.lower()):
                is_heading = True
                # Extract heading level
                match = re.search(r'(\d+)', style)
                if match:
                    heading_level = int(match.group(1))
    
    # Check for images in this paragraph
    has_image = False
    for drawing in para.findall('.//w:drawing', ns):
        blip = drawing.find('.//a:blip', ns)
        if blip is not None:
            has_image = True
            break
    
    if para_text:
        if is_heading:
            current_heading = para_text
            document_text.append({
                'text': para_text,
                'is_heading': True,
                'heading_level': heading_level,
                'section': current_heading
            })
        else:
            document_text.append({
                'text': para_text,
                'is_heading': False,
                'section': current_heading or 'No Heading',
                'has_image': has_image
            })

# Save extracted data
with open(os.path.join(extract_dir, 'document_text.json'), 'w', encoding='utf-8') as f:
    json.dump(document_text, f, indent=2, ensure_ascii=False)

with open(os.path.join(extract_dir, 'images.json'), 'w', encoding='utf-8') as f:
    json.dump(image_files, f, indent=2, ensure_ascii=False)

print(f"\n=== Document Structure ===")
print(f"Total paragraphs: {len(document_text)}")
headings = [item for item in document_text if item['is_heading']]
print(f"Total headings: {len(headings)}")
print("\nHeadings found:")
for i, heading in enumerate(headings[:20], 1):
    print(f"  {i}. {heading['text']}")

print(f"\nExtraction complete! Files saved to: {extract_dir}")

