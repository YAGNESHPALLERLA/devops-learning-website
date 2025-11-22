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

# Load data
with open(structure_file, 'r', encoding='utf-8') as f:
    structure_data = json.load(f)
print(f"Loaded structure with {len(structure_data)} items")

with open(mapping_file, 'r', encoding='utf-8') as f:
    image_mapping = json.load(f)
print(f"Loaded image mapping\n")

# Extract docx
temp_extract = 'temp_azure_basics_extract'
if os.path.exists(temp_extract):
    shutil.rmtree(temp_extract)
os.makedirs(temp_extract, exist_ok=True)

with zipfile.ZipFile(docx_path, 'r') as z:
    z.extractall(temp_extract)

# Map image files by number
image_files = {}
media_dir = os.path.join(temp_extract, 'word', 'media')
if os.path.exists(media_dir):
    for img_file in sorted(os.listdir(media_dir)):
        if img_file.endswith(('.png', '.jpg', '.jpeg')):
            match = re.search(r'image(\d+)', img_file, re.IGNORECASE)
            if match:
                img_num = int(match.group(1))
                image_files[img_num] = os.path.join(media_dir, img_file)

print(f"Found {len(image_files)} image files\n")

# Create para index to image mapping
para_to_image = {}
for section_key, images_list in image_mapping.items():
    for img_data in images_list:
        para_idx = img_data.get('paragraph_index')
        img_name = img_data.get('image_name', '')
        match = re.search(r'image(\d+)', img_name, re.IGNORECASE)
        if match and para_idx:
            img_num = int(match.group(1))
            para_to_image[para_idx] = img_num

# Build section-to-image mapping based on section name matching
# For "1. Management Groups", we want to use image1 and image2
section_image_override = {
    "1. Management Groups (The Top-Level)": [1, 2],  # Based on user's screenshot
    "2. Subscriptions (Middle Layer)": [3, 4, 5, 6],
    "3. Resource Groups (Sub-Containers)": [],  # No images in structure
}

# Organize content by sections
sections = {}
current_section = None
section_key = None
section_num = 0

for item in structure_data:
    text = item.get('text', '').strip()
    is_heading = item.get('is_heading', False)
    heading_level = item.get('heading_level')
    section_name = item.get('section')
    para_idx = item.get('index')
    
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
                'section_name': section_name,
                'content': []
            }
    
    # Add content to current section
    if section_key and section_key in sections:
        # Add text (skip duplicate main heading)
        if text and not (is_heading and heading_level == 1):
            sections[section_key]['content'].append({
                'type': 'text',
                'text': text,
                'is_heading': is_heading,
                'heading_level': heading_level,
                'para_index': para_idx
            })
        
        # Add images from structure
        if item.get('has_image') and para_idx in para_to_image:
            img_num = para_to_image[para_idx]
            if img_num in image_files:
                sections[section_key]['content'].append({
                    'type': 'image',
                    'image_number': img_num,
                    'para_index': para_idx
                })

# Apply overrides for specific sections (based on document visual order)
for section_key, section_data in sections.items():
    section_name = section_data.get('section_name', '')
    if section_name in section_image_override:
        override_images = section_image_override[section_name]
        if override_images:
            # Remove existing images for this section
            section_data['content'] = [c for c in section_data['content'] if c.get('type') != 'image']
            
            # Add override images at the end of text content
            last_text_idx = -1
            for i in range(len(section_data['content']) - 1, -1, -1):
                if section_data['content'][i]['type'] == 'text':
                    last_text_idx = i
                    break
            
            # Insert images after last text
            insert_idx = last_text_idx + 1 if last_text_idx >= 0 else len(section_data['content'])
            for img_num in override_images:
                if img_num in image_files:
                    section_data['content'].insert(insert_idx, {
                        'type': 'image',
                        'image_number': img_num,
                        'para_index': None
                    })
                    insert_idx += 1

# Write markdown files
for section_key, section_data in sorted(sections.items(), key=lambda x: x[1]['number']):
    filename = f"section-{section_data['number']:02d}-{section_key}.md"
    filepath = os.path.join(sections_dir, filename)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        # Write main heading
        f.write(f"# {section_data['title']}\n\n")
        
        # Process content in order
        image_group = []
        
        for item in section_data['content']:
            if item['type'] == 'text':
                # Write pending images first
                if image_group:
                    f.write("### Related Images\n\n")
                    for img_item in image_group:
                        img_num = img_item['image_number']
                        new_name = f"image-{img_num:02d}.png"
                        old_path = image_files[img_num]
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
            
            elif item['type'] == 'image':
                image_group.append(item)
        
        # Write any remaining images
        if image_group:
            f.write("### Related Images\n\n")
            for img_item in image_group:
                img_num = img_item['image_number']
                new_name = f"image-{img_num:02d}.png"
                old_path = image_files[img_num]
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
