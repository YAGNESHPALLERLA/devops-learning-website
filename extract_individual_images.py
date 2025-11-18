import json
import os
import shutil

# Read the final mapping to understand which document images map to which website images
with open('final_image_mapping.json', 'r', encoding='utf-8') as f:
    final_mapping = json.load(f)

# Read individual mapping
with open('individual_image_mapping.json', 'r', encoding='utf-8') as f:
    individual_mapping = json.load(f)

print("=== Extracting Individual Images for Each Step ===\n")

source_dir = 'extracted_databricks_images/media'
target_dir = 'public/tutorials/azure/images'

# Create mapping: document image -> new individual image name
document_to_individual = {}

# How to Create steps
how_to_create = individual_mapping['how_to_create']
for idx, (step, doc_image) in enumerate(how_to_create, 1):
    new_name = f"db_step{idx}.png"
    document_to_individual[doc_image] = new_name
    print(f"Step {idx}: {step[:50]}... -> {doc_image} -> {new_name}")

# Copy images
print("\n=== Copying Individual Images ===\n")
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

print(f"\n[SUCCESS] Copied {copied} individual step images!")

# Save mapping
with open('individual_step_images.json', 'w', encoding='utf-8') as f:
    json.dump(document_to_individual, f, indent=2, ensure_ascii=False)

print("Mapping saved to individual_step_images.json")

