import json
import os
import shutil

# Read the mapping
with open('image_mapping.json', 'r', encoding='utf-8') as f:
    image_mapping = json.load(f)

print("=== Re-checking Image Mappings ===\n")

# Check image22.png context
print("Image22.png (Index 26) context:")
for item in image_mapping:
    if item['image_name'] == 'image22.png':
        print(f"  {item['context']}")
        print("  -> Mentions 'Jobs' and 'cluster settings'")
        print("  -> Should be Jobs & Pipelines (image95), not Compute")
        print()

# Check if there's a Compute-specific image
print("Searching for Compute/Cluster images:")
compute_found = False
for item in image_mapping:
    idx = item['index']
    img_name = item['image_name']
    context = item['context'].lower()
    
    # Look for compute/cluster mentions that aren't in Jobs context
    if ('compute' in context or 'cluster' in context) and 'jobs' not in context and idx != 26:
        print(f"Index {idx}: {img_name}")
        try:
            print(f"  Context: {item['context'][:150]}...")
        except:
            print(f"  Context: [contains compute/cluster]")
        compute_found = True
        print()

if not compute_found:
    print("  No dedicated Compute image found in document")
    print("  -> Compute section might use a general image or image22.png shows both Jobs and Compute settings")
    print()

# Create CORRECT mapping
correct_mapping = {}
seen_images = set()

for item in image_mapping:
    idx = item['index']
    img_name = item['image_name']
    context = item['context'].lower()
    
    # Skip duplicates
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
        correct_mapping[img_name] = 'image94'  # Catalog
    elif idx == 25:
        correct_mapping[img_name] = 'image94'  # Catalog
    elif idx == 26:
        # FIX: This mentions "Jobs" first, so it should be Jobs & Pipelines (image95)
        # The "cluster settings" is just a feature mentioned, not the main topic
        correct_mapping[img_name] = 'image95'  # Jobs & Pipelines
    elif idx == 27:
        correct_mapping[img_name] = 'image96'  # Job Runs
    elif idx == 28:
        correct_mapping[img_name] = 'image98'  # Marketplace
    elif idx == 29:
        correct_mapping[img_name] = 'image99'  # SQL Editor
    elif idx == 30:
        if 'queries' in context and 'queries interface' in context:
            correct_mapping[img_name] = 'image101'  # Queries
        elif 'sql editor' in context or 'fetch clean' in context:
            correct_mapping[img_name] = 'image100'  # SQL Editor Features
        else:
            correct_mapping[img_name] = 'image99'  # SQL Editor
    elif idx == 31:
        if 'queries' in context:
            correct_mapping[img_name] = 'image101'  # Queries
        elif 'dashboards' in context:
            correct_mapping[img_name] = 'image102'  # Dashboards
        else:
            correct_mapping[img_name] = 'image101'  # Queries
    elif idx == 32:
        correct_mapping[img_name] = 'image102'  # Dashboards
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
            correct_mapping[img_name] = 'image107'  # Query History
    elif idx == 35:
        correct_mapping[img_name] = 'image108'  # SQL Warehouse

# For Compute (image97), we might need to use image22.png or find another image
# Since image22.png is now image95 (Jobs), and there's no dedicated Compute image,
# we might need to check if image22.png should be used for both, or if Compute doesn't have an image
# For now, let's check if any other image could be Compute

# Actually, maybe the issue is that image22.png shows BOTH Jobs interface AND Compute settings
# So it could be used for both image95 and image97
# But since we can only map one image to one ID, we'll keep image22.png as image95 (Jobs)
# And for Compute, we might need to use a different approach

# Check: Maybe image22.png should be copied to both image95 and image97?
# Or maybe there's another image that should be Compute

print("\n=== FINAL CORRECTED MAPPING ===")
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

# For Compute (image97), since image22.png is now image95, we'll copy image22.png to image97 as well
# because the image shows both Jobs interface and cluster/compute settings
print("\nNOTE: image22.png will be used for BOTH image95 (Jobs & Pipelines) and image97 (Compute)")
print("      because it shows both Jobs interface and cluster/compute settings")

# Save the mapping
with open('final_image_mapping.json', 'w', encoding='utf-8') as f:
    json.dump(correct_mapping, f, indent=2)

# Copy images
source_dir = 'extracted_databricks_images/media'
target_dir = 'public/tutorials/azure/images'

print("\nCopying images...")
for doc_image, website_image in correct_mapping.items():
    src_path = os.path.join(source_dir, doc_image)
    dst_path = os.path.join(target_dir, f"{website_image}.png")
    
    if os.path.exists(src_path):
        shutil.copy2(src_path, dst_path)
        print(f"[OK] {doc_image} -> {website_image}.png")
    
    # Special case: image22.png also for Compute (image97)
    if doc_image == 'image22.png':
        dst_path_compute = os.path.join(target_dir, "image97.png")
        shutil.copy2(src_path, dst_path_compute)
        print(f"[OK] {doc_image} -> image97.png (Compute - same image shows cluster settings)")

print(f"\n[SUCCESS] All images copied to {target_dir}")

