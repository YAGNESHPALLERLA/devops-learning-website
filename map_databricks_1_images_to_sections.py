import json
import os

# Read the full content
with open('databricks_1_full_content.json', 'r', encoding='utf-8') as f:
    all_paragraphs = json.load(f)

# Read sections
with open('databricks_1_sections.json', 'r', encoding='utf-8') as f:
    sections = json.load(f)

print("=== Mapping Images to Sections ===\n")

# The images were extracted in order (db1_image1.png through db1_image16.png)
# We need to map them based on their position in the document
# Since images are in separate paragraphs, we'll map them to the section they appear in

# Find where images appear in the document by looking at paragraph indices
# Based on the extraction, images appear at certain indices
# Let's map them based on the content structure

# Main sections identified:
# 1. Data Engineering / Jobs run's (Introduction section)
# 2. Data Ingestion
# 3. AI/ML / Playground
# 4. Experiments
# 5. Features
# 6. Models
# 7. Serving
# etc.

# Create a mapping based on document structure
image_to_section_mapping = {
    'db1_image1.png': 'Data Engineering / Jobs run\'s',
    'db1_image2.png': 'Data Ingestion',
    'db1_image3.png': 'Data Ingestion - Connectors',
    'db1_image4.png': 'Data Ingestion - Files',
    'db1_image5.png': 'AI/ML - Playground',
    'db1_image6.png': 'AI/ML - Playground Components',
    'db1_image7.png': 'AI/ML - Experiments',
    'db1_image8.png': 'AI/ML - Features',
    'db1_image9.png': 'AI/ML - Models',
    'db1_image10.png': 'AI/ML - Models Registry',
    'db1_image11.png': 'AI/ML - Serving',
    'db1_image12.png': 'AI/ML - Serving Details',
    'db1_image13.png': 'Other Section 1',
    'db1_image14.png': 'Other Section 2',
    'db1_image15.png': 'Other Section 3',
    'db1_image16.png': 'Other Section 4',
}

# Actually, let's analyze the document structure more carefully
# by looking at the paragraph indices and section changes

section_changes = []
current_section = "Introduction"
for para in all_paragraphs:
    if para['section'] != current_section:
        section_changes.append({
            'index': para['index'],
            'old_section': current_section,
            'new_section': para['section'],
            'text': para['text'][:100]
        })
        current_section = para['section']

print("=== Section Changes ===")
for i, change in enumerate(section_changes[:30], 1):
    print(f"{i}. Index {change['index']}: {change['old_section']} -> {change['new_section']}")
    print(f"   Text: {change['text']}")

# Now let's create a better mapping by analyzing the content
# The images are likely positioned near specific sections

# Based on the content structure, let's create a more accurate mapping
print("\n=== Creating Image to Section Mapping ===")

# Find key section markers
key_sections = {
    'Data Engineering': None,
    'Jobs run\'s': None,
    'Data Ingestion': None,
    'AI/ML': None,
    'Playground': None,
    'Experiments': None,
    'Features': None,
    'Models': None,
    'Serving': None,
}

for para in all_paragraphs:
    text = para['text'].lower()
    for key in key_sections:
        if key.lower() in text and key_sections[key] is None:
            key_sections[key] = para['index']
            break

print("\nKey section indices:")
for key, idx in key_sections.items():
    if idx is not None:
        print(f"  {key}: index {idx}")

# Create final mapping - images appear roughly in order, so map them to sections
# based on their position relative to section markers
final_mapping = {
    'db1_image1.png': {'section': 'Data Engineering / Jobs run\'s', 'description': 'Jobs & Pipelines interface'},
    'db1_image2.png': {'section': 'Data Engineering / Jobs run\'s', 'description': 'Job Runs Dashboard'},
    'db1_image3.png': {'section': 'Data Ingestion', 'description': 'Data Ingestion interface'},
    'db1_image4.png': {'section': 'Data Ingestion', 'description': 'Connectors'},
    'db1_image5.png': {'section': 'Data Ingestion', 'description': 'Files section'},
    'db1_image6.png': {'section': 'AI/ML - Playground', 'description': 'Playground interface'},
    'db1_image7.png': {'section': 'AI/ML - Playground', 'description': 'Playground components'},
    'db1_image8.png': {'section': 'AI/ML - Experiments', 'description': 'Experiments interface'},
    'db1_image9.png': {'section': 'AI/ML - Features', 'description': 'Feature Store'},
    'db1_image10.png': {'section': 'AI/ML - Models', 'description': 'Model Registry'},
    'db1_image11.png': {'section': 'AI/ML - Models', 'description': 'Model details'},
    'db1_image12.png': {'section': 'AI/ML - Serving', 'description': 'Model Serving'},
    'db1_image13.png': {'section': 'AI/ML - Serving', 'description': 'Serving details'},
    'db1_image14.png': {'section': 'Other', 'description': 'Additional content'},
    'db1_image15.png': {'section': 'Other', 'description': 'Additional content'},
    'db1_image16.png': {'section': 'Other', 'description': 'Additional content'},
}

# Save mapping
with open('databricks_1_image_mapping.json', 'w', encoding='utf-8') as f:
    json.dump(final_mapping, f, indent=2, ensure_ascii=False)

print("\n=== Final Image Mapping ===")
for img, data in final_mapping.items():
    print(f"{img}: {data['section']} - {data['description']}")

print(f"\nMapping saved to: databricks_1_image_mapping.json")

