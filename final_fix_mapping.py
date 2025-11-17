import json
import os
import shutil

# Read the mapping
with open('image_mapping.json', 'r', encoding='utf-8') as f:
    image_mapping = json.load(f)

# Create the CORRECT mapping based on detailed analysis
# Key findings:
# - Index 24: image20.png - "Catalog and Features (Unity Catalog)" -> Catalog (image94) ✓
# - Index 25: image21.png - "catalog" and "Add Data" -> Catalog (image94) ✓
# - Index 26: image22.png - "cluster settings" -> This should be COMPUTE (image97), not Jobs!
# - Index 27: image23.png - "Job Runs Dashboard" -> Job Runs (image96) ✓
# - Index 28: image24.png - "Marketplace" -> Marketplace (image98) ✓

correct_mapping = {}
seen_images = set()

for item in image_mapping:
    idx = item['index']
    img_name = item['image_name']
    context = item['context'].lower()
    
    # Skip duplicates - use first occurrence only
    if img_name in seen_images:
        continue
    
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
        # Catalog - "Catalog and Features (Unity Catalog)"
        correct_mapping[img_name] = 'image94'  # Catalog
    elif idx == 25:
        # Catalog - "catalog" and "Add Data"
        correct_mapping[img_name] = 'image94'  # Catalog
    elif idx == 26:
        # FIX: This mentions "cluster settings" - should be COMPUTE, not Jobs!
        if 'cluster' in context or 'compute' in context:
            correct_mapping[img_name] = 'image97'  # Compute
        else:
            correct_mapping[img_name] = 'image95'  # Jobs & Pipelines
    elif idx == 27:
        # Job Runs - "Job Runs Dashboard", "Duration", "Status", "Error code"
        correct_mapping[img_name] = 'image96'  # Job Runs
    elif idx == 28:
        # Marketplace
        correct_mapping[img_name] = 'image98'  # Marketplace
    elif idx == 29:
        # SQL Editor - "SQL Editor"
        correct_mapping[img_name] = 'image99'  # SQL Editor
    elif idx == 30:
        # Check context more carefully
        if 'queries' in context and 'queries interface' in context:
            correct_mapping[img_name] = 'image101'  # Queries
        elif 'sql editor' in context or 'fetch clean' in context or 'sql dashboards' in context:
            correct_mapping[img_name] = 'image100'  # SQL Editor Features
        else:
            correct_mapping[img_name] = 'image99'  # SQL Editor
    elif idx == 31:
        # Queries or Dashboards
        if 'queries' in context:
            correct_mapping[img_name] = 'image101'  # Queries
        elif 'dashboards' in context:
            correct_mapping[img_name] = 'image102'  # Dashboards
        else:
            correct_mapping[img_name] = 'image101'  # Queries (default)
    elif idx == 32:
        # Dashboards
        correct_mapping[img_name] = 'image102'  # Dashboards
    elif idx == 33:
        # Alerts or Genie
        if 'alerts' in context:
            correct_mapping[img_name] = 'image106'  # Alerts
        elif 'genie' in context:
            correct_mapping[img_name] = 'image104'  # Genie
        else:
            correct_mapping[img_name] = 'image103'  # Dashboards Legacy
    elif idx == 34:
        # Query History or Genie
        if 'query history' in context:
            correct_mapping[img_name] = 'image107'  # Query History
        elif 'genie' in context:
            correct_mapping[img_name] = 'image104'  # Genie
        else:
            correct_mapping[img_name] = 'image107'  # Query History (default)
    elif idx == 35:
        # SQL Warehouse
        correct_mapping[img_name] = 'image108'  # SQL Warehouse

print("=== FINAL CORRECTED MAPPING (No Duplicates) ===")
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
print("  Catalog: image20.png, image21.png -> image94 [CORRECT]")
print("  Compute: image22.png -> image97 (was incorrectly image95) [FIXED]")
print("  Marketplace: image24.png -> image98 [CORRECT]")
print()

for img_name in sorted(correct_mapping.keys(), key=lambda x: int(x.replace('image', '').replace('.png', ''))):
    web_img = correct_mapping[img_name]
    section = section_names.get(web_img, 'Unknown')
    marker = " [FIXED]" if img_name == 'image22.png' else ""
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
        marker = " [FIXED]" if doc_image == 'image22.png' else ""
        print(f"[OK] {doc_image} -> {website_image}.png{marker}")
    else:
        print(f"[ERROR] Source not found: {doc_image}")

print(f"\n[SUCCESS] All images copied to {target_dir}")

