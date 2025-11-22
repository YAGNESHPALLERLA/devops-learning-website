import json

# Read the extracted structures
with open('azure_basics_structure.json', 'r', encoding='utf-8') as f:
    azure_basics = json.load(f)

with open('databricks_1_structure.json', 'r', encoding='utf-8') as f:
    databricks_1 = json.load(f)

print("=== Creating Correct Image Mappings ===\n")

# Map Azure Basics images
azure_basics_mapping = {}
image_counter = 1

for para in azure_basics:
    if para['has_image']:
        section = para['section'] or 'Unknown'
        subsection = para['subsection'] or ''
        
        # Create a key for this section/subsection
        if subsection:
            key = f"{section} / {subsection}"
        else:
            key = section
        
        if key not in azure_basics_mapping:
            azure_basics_mapping[key] = []
        
        # Map to existing image names (image1, image2, etc.)
        azure_basics_mapping[key].append({
            'image_name': f'image{image_counter}',
            'paragraph_index': para['index'],
            'text_before': para['text'][:80] if para['text'] else 'Image only'
        })
        image_counter += 1

print("Azure Basics Image Mapping:")
for section, images in azure_basics_mapping.items():
    print(f"\n{section}:")
    for img in images:
        print(f"  - {img['image_name']} (para {img['paragraph_index']})")

# Map Databricks 1 images
databricks_1_mapping = {}
image_counter = 1

for para in databricks_1:
    if para['has_image']:
        section = para['section'] or 'Unknown'
        subsection = para['subsection'] or ''
        
        # Create a key for this section/subsection
        if subsection:
            key = f"{section} / {subsection}" if section != 'None' else subsection
        else:
            key = section if section != 'None' else 'Unknown'
        
        if key not in databricks_1_mapping:
            databricks_1_mapping[key] = []
        
        # Map to existing db1_image names
        databricks_1_mapping[key].append({
            'image_name': f'db1_image{image_counter}',
            'paragraph_index': para['index'],
            'text_before': para['text'][:80] if para['text'] else 'Image only'
        })
        image_counter += 1

print("\n\nDatabricks 1 Image Mapping:")
for section, images in databricks_1_mapping.items():
    print(f"\n{section}:")
    for img in images:
        print(f"  - {img['image_name']} (para {img['paragraph_index']})")

# Save mappings
with open('correct_azure_basics_mapping.json', 'w', encoding='utf-8') as f:
    json.dump(azure_basics_mapping, f, indent=2, ensure_ascii=False)

with open('correct_databricks_1_mapping.json', 'w', encoding='utf-8') as f:
    json.dump(databricks_1_mapping, f, indent=2, ensure_ascii=False)

print("\n\nMappings saved!")

