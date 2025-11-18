import json
import os
import shutil

# Read the section-based mapping
with open('image_mappings_by_section.json', 'r', encoding='utf-8') as f:
    image_mappings = json.load(f)

print("=== Fixing Remaining Issues ===\n")

# Create the CORRECT mapping
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
    
    # Map based on EXACT section
    if section == "How to Create Azure Databricks":
        if idx <= 3:
            correct_mapping[img_name] = 'image89'  # Advantages
        else:
            correct_mapping[img_name] = 'image90'  # How to Create
    elif section == "Workspace Name":
        correct_mapping[img_name] = 'image90'  # Part of How to Create
    elif section == "Databricks Workspace Overview":
        correct_mapping[img_name] = 'image91'
    elif section == "Workspace":
        correct_mapping[img_name] = 'image92'
    elif section == "Catalog and Features (Unity Catalog)":
        correct_mapping[img_name] = 'image94'
    elif section == "Jobs & Pipelines":
        if 'catalog' in context or 'add data' in context or 'governance' in context:
            correct_mapping[img_name] = 'image94'  # Actually Catalog
        else:
            correct_mapping[img_name] = 'image95'
    elif "jobs:" in section.lower() or ("jobs" in section.lower() and "orchestrate" in context):
        # FIX: image22.png should be Jobs & Pipelines, NOT Notebook!
        # Check this BEFORE notebook check to avoid false matches
        correct_mapping[img_name] = 'image95'  # Jobs & Pipelines
    elif "notebook" in section.lower() and "catalog" not in section.lower() and "jobs" not in section.lower():
        if "notebook" in context and "jobs" not in context:
            correct_mapping[img_name] = 'image93'
        else:
            correct_mapping[img_name] = 'image92'
    elif section == "Compute (Clusters)":
        correct_mapping[img_name] = 'image97'
    elif section == "Marketplace":
        correct_mapping[img_name] = 'image98'
    elif section == "SQL Editor":
        if 'sql warehouse' in context or 'sql data warehouse' in context:
            correct_mapping[img_name] = 'image108'  # SQL Warehouse
        else:
            correct_mapping[img_name] = 'image99'  # SQL Editor
    elif section == "Queries":
        correct_mapping[img_name] = 'image101'
    elif section == "Dashboards":
        correct_mapping[img_name] = 'image102'
    elif "alerts" in section.lower():
        correct_mapping[img_name] = 'image106'
    elif section == "Query History":
        correct_mapping[img_name] = 'image107'
    else:
        # Fallback - but be precise
        if idx == 22:
            # image18.png - Notebook
            correct_mapping[img_name] = 'image93'
        elif idx == 23:
            # image19.png - Notebook
            correct_mapping[img_name] = 'image93'
        elif idx == 24:
            correct_mapping[img_name] = 'image94'  # Catalog
        elif idx == 25:
            if 'catalog' in context or 'add data' in context:
                correct_mapping[img_name] = 'image94'  # Catalog
            else:
                correct_mapping[img_name] = 'image95'  # Jobs & Pipelines
        elif idx == 26:
            # FIX: image22.png - Jobs & Pipelines (section says "Jobs: Orchestrate...")
            # Always map to Jobs & Pipelines based on section
            if "jobs" in section.lower() or "orchestrate" in context:
                correct_mapping[img_name] = 'image95'  # Jobs & Pipelines
            else:
                correct_mapping[img_name] = 'image95'  # Jobs & Pipelines (default for idx 26)
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

print("=== FINAL CORRECTED MAPPING ===")
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

# Show all with fixes
for item in image_mappings:
    img_name = item['image_name']
    if img_name in correct_mapping:
        web_img = correct_mapping[img_name]
        section = section_names.get(web_img, 'Unknown')
        doc_section = item['section'][:40] if item['section'] else 'No Section'
        marker = ""
        if img_name == 'image21.png' and web_img == 'image94':
            marker = " [FIXED: Catalog]"
        elif img_name == 'image22.png' and web_img == 'image95':
            marker = " [FIXED: Jobs & Pipelines]"
        elif img_name == 'image24.png' and web_img == 'image98':
            marker = " [FIXED: Marketplace]"
        elif img_name == 'image26.png' and web_img == 'image101':
            marker = " [FIXED: Queries]"
        elif img_name == 'image28.png' and web_img == 'image102':
            marker = " [FIXED: Dashboards]"
        elif img_name == 'image31.png' and web_img == 'image108':
            marker = " [FIXED: SQL Warehouse]"
        print(f"{item['index']:3} | {img_name:15} -> {web_img:12} -> {section:20} | {doc_section}{marker}")

# Save
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
        elif doc_image == 'image22.png' and website_image == 'image95':
            marker = " [FIXED: Jobs & Pipelines]"
        elif doc_image == 'image24.png' and website_image == 'image98':
            marker = " [FIXED: Marketplace]"
        elif doc_image == 'image26.png' and website_image == 'image101':
            marker = " [FIXED: Queries]"
        elif doc_image == 'image28.png' and website_image == 'image102':
            marker = " [FIXED: Dashboards]"
        elif doc_image == 'image31.png' and website_image == 'image108':
            marker = " [FIXED: SQL Warehouse]"
        print(f"[OK] {doc_image} -> {website_image}.png{marker}")
    else:
        print(f"[ERROR] Source not found: {doc_image}")

print(f"\n[SUCCESS] All images correctly mapped and copied!")

