import json

# Read the image mappings
with open('image_mappings_by_section.json', 'r', encoding='utf-8') as f:
    image_mappings = json.load(f)

# Read document text to find all sections
with open('document_full_text.json', 'r', encoding='utf-8') as f:
    document_text = json.load(f)

print("=== Analyzing Document Structure ===\n")

# Find all sections (headings) in the document
sections_in_document = []
for item in document_text:
    if item['is_heading'] and item['text'].strip():
        sections_in_document.append(item['text'].strip())

print("=== Sections Found in Document ===")
for i, section in enumerate(sections_in_document[:50], 1):  # Show first 50
    print(f"{i}. {section}")

# Group images by section
images_by_section = {}
for item in image_mappings:
    section = item['section']
    if section not in images_by_section:
        images_by_section[section] = []
    images_by_section[section].append(item['image_name'])

print("\n=== Sections with Images in Document ===")
for section, images in images_by_section.items():
    unique_images = list(set(images))
    print(f"\n{section}:")
    print(f"  Images: {', '.join(unique_images)} ({len(unique_images)} unique)")

# Now check what sections should have images based on document structure
print("\n=== Mapping Document Sections to Website Sections ===")
print("Document Section -> Has Images -> Website Section")
print("-" * 80)

# Map document sections to website sections
section_mapping = {
    "Introduction to Azure Databricks": ("introduction", False),  # No images in doc
    "Databricks Architecture": ("databricks-architecture", False),  # No images in doc
    "Common Use Cases": ("common-use-cases", False),  # No images in doc
    "Core Components": ("core-components", False),  # No images in doc
    "Advantages of Azure Databricks": ("advantages", False),  # No images in doc (images 1-3 are in "How to Create" section but mention advantages)
    "How to Create Azure Databricks": ("how-to-create", True),  # Has images 1-3, 4-8
    "Databricks Workspace Overview": ("workspace-overview", True),  # Has images 9-11
    "Workspace": ("databricks-features", True),  # Has images 12-18 (Workspace subsection)
    "Notebook": ("databricks-features", True),  # Has images 19-23
    "Catalog and Features (Unity Catalog)": ("databricks-features", True),  # Has image 24 (image20.png)
    "Jobs & Pipelines": ("databricks-features", True),  # Has images 25-26 (but image21 is Catalog, image22 is Jobs)
    "Compute (Clusters)": ("databricks-features", True),  # Has image 27 (image23.png)
    "Marketplace": ("databricks-features", True),  # Has image 28 (image24.png)
    "SQL Editor": ("databricks-sql", True),  # Has image 29 (image25.png)
    "Queries": ("databricks-sql", True),  # Has image 30 (image26.png)
    "Dashboards": ("databricks-sql", True),  # Has images 31-32 (image27.png, image28.png)
    "Alerts": ("databricks-sql", True),  # Has image 33 (image29.png)
    "Query History": ("databricks-sql", True),  # Has image 34 (image30.png)
    "SQL Data Warehouse": ("databricks-sql", True),  # Has image 35 (image31.png) - but mapped to SQL Editor section
}

# Check which website sections have images but shouldn't
print("\n=== Sections WITHOUT Images in Document (should remove images) ===")
sections_without_images = [
    "Introduction to Azure Databricks",
    "Databricks Architecture", 
    "Common Use Cases",
    "Core Components",
    "Advantages of Azure Databricks"
]

for section in sections_without_images:
    print(f"  - {section}")

print("\n=== Sections WITH Images in Document ===")
sections_with_images = [
    "How to Create Azure Databricks",
    "Databricks Workspace Overview",
    "Workspace (Features)",
    "Notebook (Features)",
    "Catalog and Features (Unity Catalog)",
    "Jobs & Pipelines",
    "Compute (Clusters)",
    "Marketplace",
    "SQL Editor",
    "Queries",
    "Dashboards",
    "Alerts",
    "Query History",
    "SQL Data Warehouse"
]

for section in sections_with_images:
    print(f"  - {section}")

# Save analysis
analysis = {
    "sections_without_images": sections_without_images,
    "sections_with_images": sections_with_images,
    "images_by_section": {k: list(set(v)) for k, v in images_by_section.items()}
}

with open('section_image_analysis.json', 'w', encoding='utf-8') as f:
    json.dump(analysis, f, indent=2, ensure_ascii=False)

print("\nAnalysis saved to section_image_analysis.json")

