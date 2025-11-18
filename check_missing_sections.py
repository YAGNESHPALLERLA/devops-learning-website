import json

# Read the image mappings
with open('image_mappings_by_section.json', 'r', encoding='utf-8') as f:
    image_mappings = json.load(f)

# Read document text
with open('document_full_text.json', 'r', encoding='utf-8') as f:
    document_text = json.load(f)

print("=== Checking Sections for Images ===\n")

# Check for Genie section
genie_found = False
genie_images = []
for item in image_mappings:
    section = item['section'].lower()
    context = item['context'].lower()
    if 'genie' in section or 'genie' in context:
        genie_found = True
        genie_images.append(item['image_name'])
        print(f"Genie image found: {item['image_name']} (index {item['index']})")
        print(f"  Section: {item['section']}")
        print(f"  Context: {item['context'][:100]}...")
        print()

if not genie_found:
    print("Genie section: NO IMAGES in document\n")

# Check for Job Runs section
job_runs_found = False
job_runs_images = []
for item in image_mappings:
    section = item['section'].lower()
    context = item['context'].lower()
    if 'job runs' in section or 'job runs' in context or ('duration' in context and 'status' in context and 'error code' in context):
        job_runs_found = True
        job_runs_images.append(item['image_name'])
        print(f"Job Runs image found: {item['image_name']} (index {item['index']})")
        print(f"  Section: {item['section']}")
        print(f"  Context: {item['context'][:100]}...")
        print()

if not job_runs_found:
    print("Job Runs section: NO IMAGES in document\n")

# Check for SQL Editor Features
sql_editor_features_found = False
for item in image_mappings:
    section = item['section'].lower()
    context = item['context'].lower()
    if 'sql editor' in section and ('features' in context or 'options' in context or 'advanced' in context):
        sql_editor_features_found = True
        print(f"SQL Editor Features image found: {item['image_name']} (index {item['index']})")
        print(f"  Section: {item['section']}")
        print(f"  Context: {item['context'][:100]}...")
        print()

if not sql_editor_features_found:
    print("SQL Editor Features section: NO IMAGES in document\n")

# Summary of what sections have images
print("\n=== SUMMARY: Sections with Images in Document ===")
sections_with_images = {}
for item in image_mappings:
    section = item['section']
    if section not in sections_with_images:
        sections_with_images[section] = []
    sections_with_images[section].append(item['image_name'])

for section, images in sections_with_images.items():
    unique_images = list(set(images))
    print(f"{section}: {len(unique_images)} image(s) - {', '.join(unique_images)}")

print("\n=== Sections that should NOT have images (remove ImageGallery) ===")
sections_without_images = [
    "Introduction to Azure Databricks",
    "Databricks Architecture",
    "Common Use Cases of Azure Databricks",
    "Core Components of Azure Databricks",
    "Advantages of Azure Databricks"
]
for section in sections_without_images:
    print(f"  - {section}")

