import zipfile
import xml.etree.ElementTree as ET
import os
import json
import re

docx_path = 'public/downloads/2.Azure Databricks.docx'
output_dir = 'extracted_databricks_images'

# Extract the docx file
print(f"Extracting {docx_path}...")
with zipfile.ZipFile(docx_path, 'r') as z:
    z.extractall(output_dir)

# Read document.xml
doc_xml_path = os.path.join(output_dir, 'word', 'document.xml')
rels_path = os.path.join(output_dir, 'word', '_rels', 'document.xml.rels')

# Parse relationships
image_rels = {}
if os.path.exists(rels_path):
    rels_tree = ET.parse(rels_path)
    rels_root = rels_tree.getroot()
    for rel in rels_root.findall('.//{http://schemas.openxmlformats.org/package/2006/relationships}Relationship'):
        rel_id = rel.get('Id')
        target = rel.get('Target')
        if 'media' in target:
            image_rels[rel_id] = os.path.basename(target)

# Parse document
ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
      'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
      'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
      'pic': 'http://schemas.openxmlformats.org/drawingml/2006/picture',
      'wp': 'http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing'}

if os.path.exists(doc_xml_path):
    tree = ET.parse(doc_xml_path)
    root = tree.getroot()
    
    document_structure = []
    current_heading = ""
    current_subheading = ""
    image_index = 0
    text_before = []
    
    for para in root.findall('.//w:p', ns):
        # Get paragraph text
        para_text = ""
        for t in para.findall('.//w:t', ns):
            if t.text:
                para_text += t.text
        
        # Check for headings
        pPr = para.find('w:pPr', ns)
        is_heading = False
        heading_level = 0
        
        if pPr is not None:
            pStyle = pPr.find('w:pStyle', ns)
            if pStyle is not None:
                style_val = pStyle.get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val', '')
                # Check if it's a heading
                if 'Heading' in style_val or 'heading' in style_val.lower() or 'Title' in style_val:
                    is_heading = True
                    # Extract heading level
                    match = re.search(r'(\d+)', style_val)
                    if match:
                        heading_level = int(match.group(1))
                    
                    if para_text.strip():
                        if heading_level <= 1:
                            current_heading = para_text.strip()
                            current_subheading = ""
                        else:
                            current_subheading = para_text.strip()
        
        # Check for images
        drawings = para.findall('.//w:drawing', ns)
        for drawing in drawings:
            blip = drawing.find('.//a:blip', ns)
            if blip is not None:
                embed = blip.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed')
                if embed and embed in image_rels:
                    image_name = image_rels[embed]
                    image_index += 1
                    context = " ".join(text_before[-5:]) if text_before else ""
                    
                    document_structure.append({
                        'index': image_index,
                        'image_name': image_name,
                        'main_heading': current_heading,
                        'subheading': current_subheading,
                        'context': context[:300] if context else "",
                        'is_after_heading': is_heading,
                        'nearby_text': para_text[:200] if para_text else ""
                    })
        
        # Store text for context
        if para_text.strip() and not is_heading:
            text_before.append(para_text.strip())
            if len(text_before) > 10:
                text_before.pop(0)
    
    # Save structure
    with open('document_structure_with_headings.json', 'w', encoding='utf-8') as f:
        json.dump(document_structure, f, indent=2, ensure_ascii=False)
    
    print(f"\n=== Found {len(document_structure)} images with headings ===\n")
    
    # Group by headings
    by_heading = {}
    for item in document_structure:
        heading = item['main_heading'] or 'No Heading'
        if heading not in by_heading:
            by_heading[heading] = []
        by_heading[heading].append(item)
    
    print("=== Images by Main Heading ===\n")
    for heading, items in by_heading.items():
        if heading:
            print(f"{heading}:")
            for item in items:
                print(f"  Image {item['index']}: {item['image_name']}")
                if item['subheading']:
                    print(f"    Subheading: {item['subheading']}")
                if item['context']:
                    print(f"    Context: {item['context'][:100]}...")
            print()

