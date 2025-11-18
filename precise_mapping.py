import json
import os
import shutil

# Read the section-based mapping
with open('image_mappings_by_section.json', 'r', encoding='utf-8') as f:
    image_mappings = json.load(f)

print("=== Creating Precise Mapping from Document ===\n")

# Create mapping based on exact sections from document
correct_mapping = {}
seen_images = set()

for item in image_mappings:
    idx = item['index']
    img_name = item['image_name']
    section = item['section']
    context = item['context'].lower()
    
    # Skip duplicates
    if img_name in seen_images:
        continue
    seen_images.add(img_name)
    
    # Map based on EXACT section from document
    if section == "How to Create Azure Databricks":
        if idx <= 3:
            # First 3 mention "AI-Powered Assistance" - these are Advantages
            correct_mapping[img_name] = 'image89'
        else:
            correct_mapping[img_name] = 'image90'
    elif section == "Workspace Name":
        # These are part of "How to Create" - creation steps
        correct_mapping[img_name] = 'image90'
    elif section == "Databricks Workspace Overview":
        correct_mapping[img_name] = 'image91'
    elif section == "Workspace":
        correct_mapping[img_name] = 'image92'
    elif "notebook" in section.lower() or ("notebook" in context and "catalog" not in context):
        correct_mapping[img_name] = 'image93'
    elif section == "Catalog and Features (Unity Catalog)":
        correct_mapping[img_name] = 'image94'
    elif section == "Jobs & Pipelines":
        # Check context - image21.png mentions "Add Data" and "catalog"
        if 'catalog' in context or 'add data' in context or 'governance' in context:
            correct_mapping[img_name] = 'image94'  # It's actually Catalog!
        else:
            correct_mapping[img_name] = 'image95'
    elif "jobs:" in section.lower() and "orchestrate" in context:
        correct_mapping[img_name] = 'image95'
    elif section == "Compute (Clusters)":
        correct_mapping[img_name] = 'image97'
    elif section == "Marketplace":
        correct_mapping[img_name] = 'image98'
    elif section == "SQL Editor":
        # Check if it's actually SQL Warehouse
        if 'sql warehouse' in context or 'sql data warehouse' in context:
            correct_mapping[img_name] = 'image108'
        else:
            correct_mapping[img_name] = 'image99'
    elif section == "Queries":
        correct_mapping[img_name] = 'image101'
    elif section == "Dashboards":
        correct_mapping[img_name] = 'image102'
    elif "alerts" in section.lower() or ("alerts" in context and "sql" not in context):
        correct_mapping[img_name] = 'image106'
    elif section == "Query History":
        correct_mapping[img_name] = 'image107'
    else:
        # Fallback based on index and context
        if idx <= 3:
            correct_mapping[img_name] = 'image89'
        elif idx <= 8:
            correct_mapping[img_name] = 'image90'
        elif idx <= 11:
            correct_mapping[img_name] = 'image91'
        elif idx <= 18:
            correct_mapping[img_name] = 'image92'
        elif idx <= 23:
            if 'catalog' in context:
                correct_mapping[img_name] = 'image94'
            else:
                correct_mapping[img_name] = 'image93'
        elif idx == 24:
            correct_mapping[img_name] = 'image94'  # Catalog
        elif idx == 25:
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
            if 'sql warehouse' in context:
                correct_mapping[img_name] = 'image108'  # SQL Warehouse
            else:
                correct_mapping[img_name] = 'image102'  # Dashboards
        elif idx == 32:
            correct_mapping[img_name] = 'image102'  # Dashboards
        elif idx == 33:
            correct_mapping[img_name] = 'image106'  # Alerts
        elif idx == 34:
            correct_mapping[img_name] = 'image107'  # Query History
        elif idx == 35:
            if 'sql warehouse' in context or 'sql data warehouse' in context:
                correct_mapping[img_name] = 'image108'  # SQL Warehouse
            else:
                correct_mapping[img_name] = 'image99'  # SQL Editor

print("=== FINAL PRECISE MAPPING ===")
print("Index | Document Image -> Website Image -> Section")
print("-" * 70)

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

# Show mapping with index and section info
for item in image_mappings:
    img_name = item['image_name']
    if img_name in correct_mapping:
        web_img = correct_mapping[img_name]
        section = section_names.get(web_img, 'Unknown')
        doc_section = item['section'][:40] if item['section'] else 'No Section'
        marker = ""
        if img_name == 'image21.png' and web_img == 'image94':
            marker = " [FIXED: Catalog, not Jobs]"
        elif img_name == 'image31.png' and web_img == 'image108':
            marker = " [FIXED: SQL Warehouse, not SQL Editor]"
        print(f"{item['index']:3} | {img_name:15} -> {web_img:12} -> {section:20} | Doc: {doc_section}{marker}")

# Save the mapping
with open('final_image_mapping.json', 'w', encoding='utf-8') as f:
    json.dump(correct_mapping, f, indent=2)

print(f"\nMapping saved. Total unique images: {len(correct_mapping)}")

# Copy images
source_dir = 'extracted_databricks_images/media'
target_dir = 'public/tutorials/azure/images'

print("\nCopying images...")
for doc_image, website_image in sorted(correct_mapping.items(), key=lambda x: int(x[0].replace('image', '').replace('.png', ''))):
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

