import json
import os
import shutil

# Read the section-based mapping
with open('image_mappings_by_section.json', 'r', encoding='utf-8') as f:
    image_mappings = json.load(f)

print("=== Creating Correct Mapping from Document Structure ===\n")

# Map document sections to website image IDs
# Based on the actual document structure:
correct_mapping = {}

for item in image_mappings:
    idx = item['index']
    img_name = item['image_name']
    section = item['section']
    context = item['context'].lower()
    
    # Skip duplicates - use first occurrence
    if img_name in correct_mapping:
        continue
    
    # Map based on section and context
    if 'how to create' in section.lower():
        if idx <= 3:
            # First 3 images - these seem to be intro/advantages based on context mentioning "AI-Powered Assistance"
            correct_mapping[img_name] = 'image89'  # Advantages
        else:
            # Images 4-8 are creation steps
            correct_mapping[img_name] = 'image90'  # How to Create
    elif 'workspace overview' in section.lower():
        correct_mapping[img_name] = 'image91'  # Workspace Overview
    elif section == 'Workspace':
        correct_mapping[img_name] = 'image92'  # Workspace Features
    elif 'notebook' in section.lower() or 'notebook' in context:
        correct_mapping[img_name] = 'image93'  # Notebook
    elif 'catalog' in section.lower() or 'catalog' in context:
        # FIX: image21.png mentions "Add Data" and "catalog" - should be Catalog!
        correct_mapping[img_name] = 'image94'  # Catalog
    elif section == 'Jobs & Pipelines':
        # This is tricky - image21.png is in "Jobs & Pipelines" section but mentions catalog
        # Let's check the context more carefully
        if 'catalog' in context or 'add data' in context:
            correct_mapping[img_name] = 'image94'  # Catalog (it's actually catalog-related)
        else:
            correct_mapping[img_name] = 'image95'  # Jobs & Pipelines
    elif 'jobs:' in section.lower() and 'orchestrate' in context:
        correct_mapping[img_name] = 'image95'  # Jobs & Pipelines
    elif 'compute' in section.lower() or 'clusters' in section.lower():
        correct_mapping[img_name] = 'image97'  # Compute
    elif 'marketplace' in section.lower():
        correct_mapping[img_name] = 'image98'  # Marketplace
    elif 'sql editor' in section.lower():
        # Check if it's actually SQL Warehouse
        if 'sql warehouse' in context or 'sql data warehouse' in context:
            correct_mapping[img_name] = 'image108'  # SQL Warehouse
        else:
            correct_mapping[img_name] = 'image99'  # SQL Editor
    elif 'queries' in section.lower():
        correct_mapping[img_name] = 'image101'  # Queries
    elif 'dashboards' in section.lower():
        correct_mapping[img_name] = 'image102'  # Dashboards
    elif 'alerts' in section.lower() or 'alerts' in context:
        correct_mapping[img_name] = 'image106'  # Alerts
    elif 'query history' in section.lower():
        correct_mapping[img_name] = 'image107'  # Query History
    else:
        # Default based on index
        if idx <= 3:
            correct_mapping[img_name] = 'image89'
        elif idx <= 8:
            correct_mapping[img_name] = 'image90'
        elif idx <= 11:
            correct_mapping[img_name] = 'image91'
        elif idx <= 18:
            correct_mapping[img_name] = 'image92'
        elif idx <= 23:
            correct_mapping[img_name] = 'image93'
        elif idx == 24:
            correct_mapping[img_name] = 'image94'  # Catalog
        elif idx == 25:
            # Check context - if mentions catalog, it's catalog
            if 'catalog' in context or 'add data' in context:
                correct_mapping[img_name] = 'image94'  # Catalog
            else:
                correct_mapping[img_name] = 'image95'  # Jobs & Pipelines
        elif idx == 26:
            correct_mapping[img_name] = 'image95'  # Jobs & Pipelines
        elif idx == 27:
            correct_mapping[img_name] = 'image97'  # Compute
        elif idx == 28:
            correct_mapping[img_name] = 'image98'  # Marketplace
        elif idx == 29:
            correct_mapping[img_name] = 'image99'  # SQL Editor
        elif idx == 30:
            correct_mapping[img_name] = 'image101'  # Queries
        elif idx == 31:
            correct_mapping[img_name] = 'image102'  # Dashboards
        elif idx == 32:
            correct_mapping[img_name] = 'image102'  # Dashboards
        elif idx == 33:
            correct_mapping[img_name] = 'image106'  # Alerts
        elif idx == 34:
            correct_mapping[img_name] = 'image107'  # Query History
        elif idx == 35:
            # Check if SQL Warehouse
            if 'sql warehouse' in context or 'sql data warehouse' in context:
                correct_mapping[img_name] = 'image108'  # SQL Warehouse
            else:
                correct_mapping[img_name] = 'image99'  # SQL Editor

print("=== FINAL CORRECTED MAPPING ===")
print("Document Image -> Website Image -> Section")
print("-" * 60)

section_names = {
    'image89': 'Advantages',
    'image90': 'How to Create',
    'image91': 'Workspace Overview',
    'image92': 'Workspace Features',
    'image93': 'Notebook',
    'image94': 'Catalog',
    'image95': 'Jobs & Pipelines',
    'image96': 'Job Runs',
    'image97': 'Compute',
    'image98': 'Marketplace',
    'image99': 'SQL Editor',
    'image100': 'SQL Editor Features',
    'image101': 'Queries',
    'image102': 'Dashboards',
    'image103': 'Dashboards Legacy',
    'image104': 'Genie',
    'image106': 'Alerts',
    'image107': 'Query History',
    'image108': 'SQL Warehouse',
}

# Show key fixes
print("\nKEY FIXES:")
for img_name in sorted(correct_mapping.keys(), key=lambda x: int(x.replace('image', '').replace('.png', ''))):
    web_img = correct_mapping[img_name]
    section = section_names.get(web_img, 'Unknown')
    
    # Check if this is a fix
    item = next((i for i in image_mappings if i['image_name'] == img_name), None)
    if item:
        doc_section = item['section']
        marker = ""
        if img_name == 'image21.png' and web_img == 'image94':
            marker = " [FIXED: Was Jobs & Pipelines, should be Catalog]"
        elif img_name == 'image31.png' and web_img == 'image108':
            marker = " [FIXED: Was SQL Editor, should be SQL Warehouse]"
        print(f"{img_name:15} -> {web_img:12} -> {section}{marker}")

# Save the mapping
with open('final_image_mapping.json', 'w', encoding='utf-8') as f:
    json.dump(correct_mapping, f, indent=2)

print(f"\nMapping saved. Total unique images: {len(correct_mapping)}")

# Copy images
source_dir = 'extracted_databricks_images/media'
target_dir = 'public/tutorials/azure/images'

print("\nCopying images...")
for doc_image, website_image in correct_mapping.items():
    src_path = os.path.join(source_dir, doc_image)
    dst_path = os.path.join(target_dir, f"{website_image}.png")
    
    if os.path.exists(src_path):
        shutil.copy2(src_path, dst_path)
        marker = ""
        if doc_image == 'image21.png' and website_image == 'image94':
            marker = " [FIXED: Catalog]"
        elif doc_image == 'image31.png' and website_image == 'image108':
            marker = " [FIXED: SQL Warehouse]"
        print(f"[OK] {doc_image} -> {website_image}.png{marker}")
    else:
        print(f"[ERROR] Source not found: {doc_image}")

print(f"\n[SUCCESS] All images copied to {target_dir}")

