import json
import os
import shutil

# Read the individual mapping
with open('individual_image_mapping.json', 'r', encoding='utf-8') as f:
    individual_mapping = json.load(f)

source_dir = 'extracted_databricks_images/media'
target_dir = 'public/tutorials/azure/images'

print("=== Extracting All Individual Images ===\n")

# Extract all unique images needed
all_images_needed = set()

# Workspace Overview
for img in individual_mapping['workspace_overview']:
    all_images_needed.add(img)

# Workspace Features
for img in individual_mapping['workspace_features']:
    all_images_needed.add(img)

# Notebook
for img in individual_mapping['notebook']:
    all_images_needed.add(img)

# Catalog
for img in individual_mapping['catalog']:
    all_images_needed.add(img)

# Jobs & Pipelines
for img in individual_mapping['jobs_pipelines']:
    all_images_needed.add(img)

# Compute
for img in individual_mapping['compute']:
    all_images_needed.add(img)

# Marketplace
for img in individual_mapping['marketplace']:
    all_images_needed.add(img)

# SQL Editor
for img in individual_mapping['sql_editor']:
    all_images_needed.add(img)

# Queries
for img in individual_mapping['queries']:
    all_images_needed.add(img)

# Dashboards
for img in individual_mapping['dashboards']:
    all_images_needed.add(img)

# Alerts
for img in individual_mapping['alerts']:
    all_images_needed.add(img)

# Query History
for img in individual_mapping['query_history']:
    all_images_needed.add(img)

# SQL Warehouse
for img in individual_mapping['sql_warehouse']:
    all_images_needed.add(img)

print(f"Total unique images needed: {len(all_images_needed)}")
print(f"Images: {sorted(all_images_needed)}")

# Create mapping: document image -> individual image name (db_ prefix to avoid conflicts)
document_to_individual = {}
counter = 1

for doc_image in sorted(all_images_needed):
    # Skip if already extracted as db_step
    if doc_image in ['image1.png', 'image2.png', 'image3.png', 'image4.png', 'image5.png', 'image6.png', 'image7.png', 'image8.png']:
        continue
    
    new_name = f"db_indiv_{counter}.png"
    document_to_individual[doc_image] = new_name
    counter += 1

print(f"\n=== Copying Individual Images ===\n")
copied = 0
for doc_image, new_name in document_to_individual.items():
    src_path = os.path.join(source_dir, doc_image)
    dst_path = os.path.join(target_dir, new_name)
    
    if os.path.exists(src_path):
        shutil.copy2(src_path, dst_path)
        print(f"[OK] {doc_image} -> {new_name}")
        copied += 1
    else:
        print(f"[ERROR] Source not found: {doc_image}")

print(f"\n[SUCCESS] Copied {copied} additional individual images!")

# Save mapping
with open('all_individual_images.json', 'w', encoding='utf-8') as f:
    json.dump(document_to_individual, f, indent=2, ensure_ascii=False)

print("Mapping saved to all_individual_images.json")

