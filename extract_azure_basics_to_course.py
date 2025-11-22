import zipfile
import xml.etree.ElementTree as ET
import os
import shutil
import re
import json

docx_path = 'public/downloads/azure-basics.docx'
structure_file = 'azure_basics_structure.json'
mapping_file = 'correct_azure_basics_mapping.json'
course_dir = 'course'
sections_dir = os.path.join(course_dir, 'sections')
assets_dir = os.path.join(course_dir, 'assets', 'images')

# Create directories
os.makedirs(sections_dir, exist_ok=True)
os.makedirs(assets_dir, exist_ok=True)

print("=== Extracting Azure Basics to Course Structure ===\n")

# Load existing structure and mapping
with open(structure_file, 'r', encoding='utf-8') as f:
    structure_data = json.load(f)
print(f"Loaded structure with {len(structure_data)} items")

with open(mapping_file, 'r', encoding='utf-8') as f:
    image_mapping = json.load(f)
print(f"Loaded image mapping\n")

# Extract docx temporarily
temp_extract = 'temp_azure_basics_extract'
if os.path.exists(temp_extract):
    shutil.rmtree(temp_extract)
os.makedirs(temp_extract, exist_ok=True)

with zipfile.ZipFile(docx_path, 'r') as z:
    z.extractall(temp_extract)

# Get all image files and map them
image_files = {}
media_dir = os.path.join(temp_extract, 'word', 'media')
if os.path.exists(media_dir):
    for img_file in sorted(os.listdir(media_dir)):
        if img_file.endswith(('.png', '.jpg', '.jpeg')):
            src_path = os.path.join(media_dir, img_file)
            # Extract number from filename (e.g., image1.png -> 1)
            match = re.search(r'image(\d+)', img_file, re.IGNORECASE)
            if match:
                img_num = int(match.group(1))
                image_files[img_num] = {
                    'filename': img_file,
                    'path': src_path
                }
            else:
                # Fallback: use order
                img_num = len(image_files) + 1
                image_files[img_num] = {
                    'filename': img_file,
                    'path': src_path
                }

print(f"Found {len(image_files)} image files\n")

# Build section map from structure
sections = {}
current_section = None
section_key = None
section_num = 0

for item in structure_data:
    text = item.get('text', '').strip()
    is_heading = item.get('is_heading', False)
    heading_level = item.get('heading_level')
    section_name = item.get('section')
    
    # Create new section for top-level headings
    if is_heading and heading_level == 1 and text:
        section_num += 1
        current_section = text
        section_key = re.sub(r'[^\w\s-]', '', text).strip()
        section_key = re.sub(r'[-\s]+', '-', section_key).lower()
        section_key = section_key[:50]
        
        if section_key and section_key not in sections:
            sections[section_key] = {
                'title': text,
                'number': section_num,
                'content': []
            }
    
    # Add content to current section
    if section_key and section_key in sections:
        # Add text content
        if text and not (is_heading and heading_level == 1):  # Skip duplicate main heading
            sections[section_key]['content'].append({
                'type': 'text',
                'text': text,
                'is_heading': is_heading,
                'heading_level': heading_level
            })
        
        # Add images based on structure
        if item.get('has_image') and item.get('image_refs'):
            for img_ref in item.get('image_refs', []):
                # Find image by reference or use paragraph index
                para_idx = item.get('index', 0)
                # Try to find image number from mapping
                img_num = None
                for section_key_map, images_list in image_mapping.items():
                    for img_data in images_list:
                        if img_data.get('paragraph_index') == para_idx:
                            img_name = img_data.get('image_name', '')
                            match = re.search(r'image(\d+)', img_name, re.IGNORECASE)
                            if match:
                                img_num = int(match.group(1))
                                break
                    if img_num:
                        break
                
                # If not found in mapping, use sequential
                if not img_num:
                    img_num = len([c for c in sections[section_key]['content'] if c.get('type') == 'image']) + 1
                    # Find next available image
                    for num in sorted(image_files.keys()):
                        if num >= img_num:
                            img_num = num
                            break
                
                if img_num in image_files:
                    sections[section_key]['content'].append({
                        'type': 'image',
                        'image_number': img_num,
                        'filename': image_files[img_num]['filename']
                    })

# Write markdown files
for section_key, section_data in sorted(sections.items(), key=lambda x: x[1]['number']):
    filename = f"section-{section_data['number']:02d}-{section_key}.md"
    filepath = os.path.join(sections_dir, filename)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        # Write main heading (only once)
        f.write(f"# {section_data['title']}\n\n")
        
        # Process content
        image_group = []
        last_was_text = False
        
        for item in section_data['content']:
            if item['type'] == 'text':
                # If we have pending images, write them first
                if image_group:
                    f.write("\n### Related Images\n\n")
                    for img_item in image_group:
                        img_num = img_item['image_number']
                        new_name = f"image-{img_num:02d}.png"
                        old_path = image_files[img_num]['path']
                        if os.path.exists(old_path):
                            new_path = os.path.join(assets_dir, new_name)
                            shutil.copy2(old_path, new_path)
                            f.write(f"![{section_data['title']} - Image {img_num}](../assets/images/{new_name})\n\n")
                    image_group = []
                
                # Write text
                text = item['text']
                if item.get('is_heading'):
                    level = item.get('heading_level', 2)
                    heading_markers = '#' * min(level + 1, 6)
                    f.write(f"{heading_markers} {text}\n\n")
                else:
                    f.write(f"{text}\n\n")
                last_was_text = True
            
            elif item['type'] == 'image':
                image_group.append(item)
                last_was_text = False
        
        # Write any remaining images
        if image_group:
            if not last_was_text:
                f.write("\n")
            f.write("### Related Images\n\n")
            for img_item in image_group:
                img_num = img_item['image_number']
                new_name = f"image-{img_num:02d}.png"
                old_path = image_files[img_num]['path']
                if os.path.exists(old_path):
                    new_path = os.path.join(assets_dir, new_name)
                    shutil.copy2(old_path, new_path)
                    f.write(f"![{section_data['title']} - Image {img_num}](../assets/images/{new_name})\n\n")
    
    print(f"Created: {filename}")

# Cleanup
shutil.rmtree(temp_extract, ignore_errors=True)

print(f"\n=== Extraction Complete ===")
print(f"Sections: {sections_dir}")
print(f"Images: {assets_dir}")
print(f"Total sections: {len(sections)}")
print(f"Total images available: {len(image_files)}")
