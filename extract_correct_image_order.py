import zipfile
import json
import os
import shutil
from xml.etree import ElementTree as ET
import re

def extract_document_structure(docx_path, extract_dir, doc_name):
    """Extract document structure with images in correct order"""
    
    print(f"\n=== Extracting {doc_name} ===\n")
    
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
        return None
    
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
    
    # Extract content with images in order
    content_structure = []
    current_section = None
    current_subsection = None
    image_counter = 1
    para_index = 0
    
    for para in root.findall('.//w:p', ns):
        para_index += 1
        
        # Get text
        text_elements = para.findall('.//w:t', ns)
        para_text = ''.join([elem.text or '' for elem in text_elements]).strip()
        
        # Check if it's a heading
        is_heading = False
        heading_level = None
        pPr = para.find('w:pPr', ns)
        
        if pPr is not None:
            pStyle = pPr.find('w:pStyle', ns)
            if pStyle is not None:
                style = pStyle.get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val', '')
                if 'heading' in style.lower() or 'Heading' in style:
                    is_heading = True
                    # Extract heading level
                    match = re.search(r'(\d+)', style)
                    if match:
                        heading_level = int(match.group(1))
        
        # Also check if text looks like a heading (numbered or bold short text)
        if not is_heading and para_text:
            if para_text.startswith(('1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.')):
                is_heading = True
                heading_level = 1
            elif len(para_text) < 100:
                # Check if bold
                rPr = para.find('.//w:rPr', ns)
                if rPr is not None:
                    b = rPr.find('w:b', ns)
                    if b is not None:
                        is_heading = True
                        heading_level = 2
        
        # Check for images in this paragraph
        image_refs = []
        for drawing in para.findall('.//w:drawing', ns):
            blip = drawing.find('.//a:blip', ns)
            if blip is not None:
                embed = blip.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}embed')
                if embed:
                    image_refs.append(embed)
        
        # Update section tracking
        if is_heading:
            if heading_level == 1 or (heading_level is None and len(para_text) < 50):
                current_section = para_text
                current_subsection = None
            else:
                current_subsection = para_text
        
        # Store paragraph data
        para_data = {
            'index': para_index,
            'text': para_text,
            'is_heading': is_heading,
            'heading_level': heading_level,
            'section': current_section,
            'subsection': current_subsection,
            'has_image': len(image_refs) > 0,
            'image_refs': image_refs
        }
        
        content_structure.append(para_data)
        
        # Print image info
        if image_refs:
            for img_ref in image_refs:
                if img_ref in image_mapping:
                    print(f"Image {image_counter} at paragraph {para_index}:")
                    print(f"  Section: {current_section}")
                    print(f"  Subsection: {current_subsection}")
                    print(f"  Text before: {para_text[:80] if para_text else 'Image only paragraph'}")
                    print()
                    image_counter += 1
    
    return {
        'content': content_structure,
        'image_mapping': image_mapping,
        'extract_dir': extract_dir
    }

# Extract Azure Basics document
azure_basics_path = 'public/downloads/azure-basics.docx'
azure_basics_extract = 'extracted_azure_basics'
azure_basics_data = extract_document_structure(azure_basics_path, azure_basics_extract, 'azure-basics.docx')

# Extract Azure Databricks -2.docx (2.Azure Databricks.docx)
databricks_2_path = 'public/downloads/2.Azure Databricks.docx'
databricks_2_extract = 'extracted_databricks_2'
databricks_2_data = extract_document_structure(databricks_2_path, databricks_2_extract, '2.Azure Databricks.docx')

# Extract Azure Databricks -1.docx
databricks_1_path = 'public/downloads/Azure Databricks -1.docx'
databricks_1_extract = 'extracted_databricks_1'
databricks_1_data = extract_document_structure(databricks_1_path, databricks_1_extract, 'Azure Databricks -1.docx')

# Save the structure
if azure_basics_data:
    with open('azure_basics_structure.json', 'w', encoding='utf-8') as f:
        json.dump(azure_basics_data['content'], f, indent=2, ensure_ascii=False)
    print(f"\nAzure Basics structure saved to: azure_basics_structure.json")

if databricks_2_data:
    with open('databricks_2_structure.json', 'w', encoding='utf-8') as f:
        json.dump(databricks_2_data['content'], f, indent=2, ensure_ascii=False)
    print(f"Databricks 2 structure saved to: databricks_2_structure.json")

if databricks_1_data:
    with open('databricks_1_structure.json', 'w', encoding='utf-8') as f:
        json.dump(databricks_1_data['content'], f, indent=2, ensure_ascii=False)
    print(f"Databricks 1 structure saved to: databricks_1_structure.json")

print("\n=== Extraction Complete ===")

