import zipfile
import xml.etree.ElementTree as ET
import os
import json
import re

docx_path = 'public/downloads/2.Azure Databricks.docx'
output_dir = 'extracted_databricks_images'

# Extract the docx file
if not os.path.exists(output_dir):
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
    
    full_text = []
    image_mappings = []
    current_section = ""
    image_index = 0
    
    for para in root.findall('.//w:p', ns):
        # Get paragraph text
        para_text = ""
        for t in para.findall('.//w:t', ns):
            if t.text:
                para_text += t.text
        
        # Check if it looks like a heading (bold, larger text, or specific patterns)
        is_heading = False
        pPr = para.find('w:pPr', ns)
        if pPr is not None:
            pStyle = pPr.find('w:pStyle', ns)
            if pStyle is not None:
                style_val = pStyle.get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val', '')
                if 'Heading' in style_val or 'Title' in style_val:
                    is_heading = True
        
        # Also check for numbered headings (like "1.", "2.", etc.)
        if not is_heading and para_text.strip():
            if re.match(r'^\d+[\.\)]\s+[A-Z]', para_text.strip()):
                is_heading = True
        
        # Check for section patterns
        if para_text.strip():
            # Look for section indicators
            section_patterns = [
                r'^(\d+\.?\s+)?(Introduction|Architecture|Use Cases|Components|Advantages|How to Create|Workspace|Features|Catalog|Jobs|Pipelines|Compute|Marketplace|SQL Editor|Queries|Dashboards|Genie|Alerts|Query History|SQL Warehouse)',
                r'^Databricks\s+(Architecture|Features|SQL|Workspace)',
                r'^Azure\s+Databricks',
            ]
            
            for pattern in section_patterns:
                match = re.match(pattern, para_text.strip(), re.IGNORECASE)
                if match:
                    current_section = para_text.strip()[:100]
                    is_heading = True
                    break
        
        # Store text
        if para_text.strip():
            full_text.append({
                'text': para_text.strip(),
                'is_heading': is_heading,
                'section': current_section
            })
        
        # Check for images
        drawings = para.findall('.//w:drawing', ns)
        for drawing in drawings:
            blip = drawing.find('.//a:blip', ns)
            if blip is not None:
                embed = blip.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed')
                if embed and embed in image_rels:
                    image_name = image_rels[embed]
                    image_index += 1
                    
                    # Get context from recent text
                    context_text = []
                    for item in reversed(full_text[-10:]):
                        if item['text']:
                            context_text.insert(0, item['text'])
                            if len(context_text) >= 5:
                                break
                    
                    image_mappings.append({
                        'index': image_index,
                        'image_name': image_name,
                        'section': current_section,
                        'context': ' '.join(context_text),
                        'nearby_text': para_text.strip() if para_text.strip() else ''
                    })
    
    # Save full text
    with open('document_full_text.json', 'w', encoding='utf-8') as f:
        json.dump(full_text, f, indent=2, ensure_ascii=False)
    
    # Save image mappings
    with open('image_mappings_by_section.json', 'w', encoding='utf-8') as f:
        json.dump(image_mappings, f, indent=2, ensure_ascii=False)
    
    print(f"=== Extracted {len(full_text)} paragraphs and {len(image_mappings)} images ===\n")
    
    # Show sections found
    sections_found = set()
    for item in full_text:
        if item['is_heading'] and item['text']:
            sections_found.add(item['text'][:80])
    
    print("=== Sections Found ===")
    for section in sorted(sections_found):
        print(f"  {section}")
    
    print(f"\n=== Images by Section ===")
    by_section = {}
    for item in image_mappings:
        section = item['section'] or 'No Section'
        if section not in by_section:
            by_section[section] = []
        by_section[section].append(item)
    
    for section, items in by_section.items():
        if section:
            print(f"\n{section}:")
            for item in items:
                print(f"  Image {item['index']}: {item['image_name']}")
                if item['nearby_text']:
                    print(f"    Text: {item['nearby_text'][:80]}...")

