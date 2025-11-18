import json

# Read the image mappings
with open('image_mappings_by_section.json', 'r', encoding='utf-8') as f:
    image_mappings = json.load(f)

print("=== Images for 'How to Create Azure Databricks' Section ===\n")

# Find all images in "How to Create Azure Databricks" section
how_to_create_images = []
for item in image_mappings:
    section = item['section']
    if 'How to Create Azure Databricks' in section:
        how_to_create_images.append({
            'index': item['index'],
            'image': item['image_name'],
            'context': item['context'][:150]
        })

print(f"Found {len(how_to_create_images)} images in 'How to Create Azure Databricks':")
for img in how_to_create_images:
    print(f"  {img['index']:2}. {img['image']:15} - {img['context']}...")

# Find all images in "Workspace Name" section (which is part of How to Create)
print("\n=== Images for 'Workspace Name' Section (part of How to Create) ===\n")
workspace_name_images = []
for item in image_mappings:
    section = item['section']
    if 'Workspace Name' in section:
        workspace_name_images.append({
            'index': item['index'],
            'image': item['image_name'],
            'context': item['context'][:150]
        })

print(f"Found {len(workspace_name_images)} images in 'Workspace Name':")
for img in workspace_name_images:
    print(f"  {img['index']:2}. {img['image']:15} - {img['context']}...")

# Total images for How to Create
all_how_to_create = how_to_create_images + workspace_name_images
print(f"\n=== TOTAL: {len(all_how_to_create)} images for 'How to Create Azure Databricks' ===")
print("Images:", ', '.join([img['image'] for img in sorted(all_how_to_create, key=lambda x: x['index'])]))

# Check current mapping
print("\n=== Current Mapping (from final_image_mapping.json) ===")
with open('final_image_mapping.json', 'r', encoding='utf-8') as f:
    mapping = json.load(f)

for img in sorted(all_how_to_create, key=lambda x: x['index']):
    mapped_to = mapping.get(img['image'], 'NOT MAPPED')
    print(f"  {img['image']:15} -> {mapped_to}")

