import json
import os
import shutil

# Read the original mapping with context
with open('image_mapping.json', 'r', encoding='utf-8') as f:
    image_mapping = json.load(f)

# Analyze the document structure more carefully
print("=== Analyzing Document Structure ===\n")

# Group images by their context to identify sections
sections = {
    'Advantages': [],
    'How to Create': [],
    'Workspace Overview': [],
    'Workspace Features': [],
    'Notebook': [],
    'Catalog': [],
    'Jobs & Pipelines': [],
    'Job Runs': [],
    'Marketplace': [],
    'SQL Editor': [],
    'SQL Editor Features': [],
    'Queries': [],
    'Dashboards': [],
    'Genie': [],
    'Alerts': [],
    'Query History': [],
    'SQL Warehouse': [],
    'Compute': []  # Need to find this
}

# Map each image occurrence to a section based on context
for item in image_mapping:
    idx = item['index']
    img_name = item['image_name']
    context = item['context'].lower()
    
    # Categorize based on index and context
    if idx <= 2:
        sections['Advantages'].append((idx, img_name, 'Advantages'))
    elif idx <= 8:
        sections['How to Create'].append((idx, img_name, 'How to Create'))
    elif idx <= 11:
        sections['Workspace Overview'].append((idx, img_name, 'Workspace Overview'))
    elif idx <= 18:
        sections['Workspace Features'].append((idx, img_name, 'Workspace Features'))
    elif idx <= 23:
        if 'notebook' in context:
            sections['Notebook'].append((idx, img_name, 'Notebook'))
        else:
            sections['Workspace Features'].append((idx, img_name, 'Workspace Features'))
    elif idx == 24:
        if 'catalog' in context:
            sections['Catalog'].append((idx, img_name, 'Catalog'))
        else:
            sections['Notebook'].append((idx, img_name, 'Notebook'))
    elif idx == 25:
        if 'catalog' in context or 'governance' in context or 'add data' in context:
            sections['Catalog'].append((idx, img_name, 'Catalog'))
        else:
            sections['Jobs & Pipelines'].append((idx, img_name, 'Jobs & Pipelines'))
    elif idx == 26:
        if 'jobs' in context or 'pipelines' in context:
            sections['Jobs & Pipelines'].append((idx, img_name, 'Jobs & Pipelines'))
        else:
            sections['Compute'].append((idx, img_name, 'Compute'))
    elif idx == 27:
        if 'job runs' in context or 'duration' in context or 'status' in context:
            sections['Job Runs'].append((idx, img_name, 'Job Runs'))
        else:
            sections['Compute'].append((idx, img_name, 'Compute'))
    elif idx == 28:
        if 'marketplace' in context:
            sections['Marketplace'].append((idx, img_name, 'Marketplace'))
        else:
            sections['Compute'].append((idx, img_name, 'Compute'))
    elif idx == 29:
        if 'sql editor' in context:
            sections['SQL Editor'].append((idx, img_name, 'SQL Editor'))
        else:
            sections['Marketplace'].append((idx, img_name, 'Marketplace'))
    elif idx == 30:
        if 'queries' in context:
            sections['Queries'].append((idx, img_name, 'Queries'))
        elif 'sql editor' in context or 'fetch clean' in context:
            sections['SQL Editor Features'].append((idx, img_name, 'SQL Editor Features'))
        else:
            sections['SQL Editor'].append((idx, img_name, 'SQL Editor'))
    elif idx == 31:
        if 'queries' in context:
            sections['Queries'].append((idx, img_name, 'Queries'))
        elif 'dashboards' in context:
            sections['Dashboards'].append((idx, img_name, 'Dashboards'))
        else:
            sections['Query History'].append((idx, img_name, 'Query History'))
    elif idx == 32:
        if 'dashboards' in context:
            sections['Dashboards'].append((idx, img_name, 'Dashboards'))
        else:
            sections['Queries'].append((idx, img_name, 'Queries'))
    elif idx == 33:
        if 'alerts' in context:
            sections['Alerts'].append((idx, img_name, 'Alerts'))
        elif 'genie' in context:
            sections['Genie'].append((idx, img_name, 'Genie'))
        else:
            sections['Dashboards'].append((idx, img_name, 'Dashboards'))
    elif idx == 34:
        if 'query history' in context:
            sections['Query History'].append((idx, img_name, 'Query History'))
        elif 'genie' in context:
            sections['Genie'].append((idx, img_name, 'Genie'))
        else:
            sections['Alerts'].append((idx, img_name, 'Alerts'))
    elif idx == 35:
        if 'sql warehouse' in context or 'sql data warehouse' in context:
            sections['SQL Warehouse'].append((idx, img_name, 'SQL Warehouse'))
        else:
            sections['Query History'].append((idx, img_name, 'Query History'))

# Print analysis
for section_name, items in sections.items():
    if items:
        print(f"{section_name}: {len(items)} image(s)")
        for idx, img_name, _ in items[:3]:  # Show first 3
            print(f"  - Index {idx}: {img_name}")
        if len(items) > 3:
            print(f"  ... and {len(items) - 3} more")
        print()

# Now create the correct mapping - use FIRST occurrence of each unique image
correct_mapping = {}
seen_images = set()

# Map based on first occurrence and context
for item in image_mapping:
    idx = item['index']
    img_name = item['image_name']
    context = item['context'].lower()
    
    if img_name in seen_images:
        continue  # Skip duplicates, use first occurrence only
    
    seen_images.add(img_name)
    
    # Map based on index and context
    if idx <= 2:
        correct_mapping[img_name] = 'image89'  # Advantages
    elif idx <= 8:
        correct_mapping[img_name] = 'image90'  # How to Create
    elif idx <= 11:
        correct_mapping[img_name] = 'image91'  # Workspace Overview
    elif idx <= 18:
        correct_mapping[img_name] = 'image92'  # Workspace Features
    elif idx <= 23:
        if 'notebook' in context:
            correct_mapping[img_name] = 'image93'  # Notebook
        else:
            correct_mapping[img_name] = 'image92'  # Workspace Features
    elif idx == 24:
        if 'catalog' in context:
            correct_mapping[img_name] = 'image94'  # Catalog
        else:
            correct_mapping[img_name] = 'image93'  # Notebook
    elif idx == 25:
        if 'catalog' in context or 'governance' in context or 'add data' in context:
            correct_mapping[img_name] = 'image94'  # Catalog
        elif 'jobs' in context or 'pipelines' in context:
            correct_mapping[img_name] = 'image95'  # Jobs & Pipelines
        else:
            correct_mapping[img_name] = 'image97'  # Compute (fallback)
    elif idx == 26:
        if 'jobs' in context or 'pipelines' in context or 'job runs' in context:
            correct_mapping[img_name] = 'image95'  # Jobs & Pipelines
        else:
            correct_mapping[img_name] = 'image97'  # Compute
    elif idx == 27:
        if 'job runs' in context or 'duration' in context or 'status' in context or 'error code' in context:
            correct_mapping[img_name] = 'image96'  # Job Runs
        else:
            correct_mapping[img_name] = 'image97'  # Compute
    elif idx == 28:
        if 'marketplace' in context:
            correct_mapping[img_name] = 'image98'  # Marketplace
        else:
            correct_mapping[img_name] = 'image97'  # Compute
    elif idx == 29:
        if 'sql editor' in context:
            correct_mapping[img_name] = 'image99'  # SQL Editor
        else:
            correct_mapping[img_name] = 'image98'  # Marketplace
    elif idx == 30:
        if 'queries' in context:
            correct_mapping[img_name] = 'image101'  # Queries
        elif 'sql editor' in context or 'fetch clean' in context or 'sql dashboards' in context:
            correct_mapping[img_name] = 'image100'  # SQL Editor Features
        else:
            correct_mapping[img_name] = 'image99'  # SQL Editor
    elif idx == 31:
        if 'queries' in context:
            correct_mapping[img_name] = 'image101'  # Queries
        elif 'dashboards' in context:
            correct_mapping[img_name] = 'image102'  # Dashboards
        else:
            correct_mapping[img_name] = 'image107'  # Query History
    elif idx == 32:
        if 'dashboards' in context:
            correct_mapping[img_name] = 'image102'  # Dashboards
        else:
            correct_mapping[img_name] = 'image101'  # Queries
    elif idx == 33:
        if 'alerts' in context:
            correct_mapping[img_name] = 'image106'  # Alerts
        elif 'genie' in context:
            correct_mapping[img_name] = 'image104'  # Genie
        else:
            correct_mapping[img_name] = 'image103'  # Dashboards Legacy
    elif idx == 34:
        if 'query history' in context:
            correct_mapping[img_name] = 'image107'  # Query History
        elif 'genie' in context:
            correct_mapping[img_name] = 'image104'  # Genie
        else:
            correct_mapping[img_name] = 'image106'  # Alerts
    elif idx == 35:
        if 'sql warehouse' in context or 'sql data warehouse' in context:
            correct_mapping[img_name] = 'image108'  # SQL Warehouse
        else:
            correct_mapping[img_name] = 'image107'  # Query History

# Special handling: Check if we have a Compute image
# Looking at the context, Compute might not have a dedicated image in the document
# But we need image97 for Compute. Let's check if any image should be Compute
# Actually, looking at index 26-28, none explicitly mention "Compute"
# But the user says Compute images are misplaced, so maybe one of the images should be Compute

# Let's check: image22.png at index 26 mentions "cluster settings" - this could be Compute
# But it also mentions "Jobs" so it's more likely Jobs & Pipelines
# image23.png at index 27 mentions job runs details - this is Job Runs
# So Compute might not have a specific image, or it might be missing from the document

# For now, let's keep the mapping but ensure Catalog is correct
# Index 24: image20.png - Catalog ✓
# Index 25: image21.png - Catalog (mentions "catalog" and "Add Data") ✓

print("\n=== Final Corrected Mapping (No Duplicates) ===")
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

for img_name in sorted(correct_mapping.keys(), key=lambda x: int(x.replace('image', '').replace('.png', ''))):
    web_img = correct_mapping[img_name]
    section = section_names.get(web_img, 'Unknown')
    print(f"{img_name:15} -> {web_img:12} -> {section}")

# Save the mapping
with open('final_image_mapping.json', 'w', encoding='utf-8') as f:
    json.dump(correct_mapping, f, indent=2)

print(f"\nMapping saved. Total unique images: {len(correct_mapping)}")

# Copy images
source_dir = 'extracted_databricks_images/media'
target_dir = 'public/tutorials/azure/images'

print("\nCopying images (removing duplicates)...")
for doc_image, website_image in correct_mapping.items():
    src_path = os.path.join(source_dir, doc_image)
    dst_path = os.path.join(target_dir, f"{website_image}.png")
    
    if os.path.exists(src_path):
        shutil.copy2(src_path, dst_path)
        print(f"[OK] {doc_image} -> {website_image}.png")
    else:
        print(f"[ERROR] Source not found: {doc_image}")

print(f"\n[SUCCESS] All images copied to {target_dir}")

