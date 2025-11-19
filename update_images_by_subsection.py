import json

# Read the subsection mapping
with open('databricks_1_subsection_image_mapping.json', 'r', encoding='utf-8') as f:
    subsection_mapping = json.load(f)

# Map to website subsections
# Based on the page structure and document content
website_subsection_mapping = {
    # Data Engineering section
    'jobs-runs': ['db1_image1'],  # Jobs & Pipelines / Key Features
    'data-ingestion': ['db1_image2'],  # Data Ingestion
    
    # AI/ML section
    'playground': ['db1_image3'],  # Playground
    'experiments': ['db1_image4'],  # Experiments (Model artifacts)
    'features': ['db1_image5'],  # Features
    'models': ['db1_image6'],  # Models
    'serving': ['db1_image7'],  # Serving
    
    # Notebook-level features
    'notebook-level-features': ['db1_image8'],
    'file-level-features': ['db1_image9'],
    'edit-level-features': ['db1_image10'],
    'view-level-features': ['db1_image11'],
    'run-level-features': ['db1_image12'],
    'help-level-features': ['db1_image13'],
    'language-level-features': ['db1_image14'],
    'others-features': ['db1_image15', 'db1_image16'],
}

print("=== Image Mapping for Website Subsections ===\n")
for subsection, images in website_subsection_mapping.items():
    print(f"{subsection}: {', '.join(images)}")

# Save the mapping
with open('website_subsection_image_mapping.json', 'w', encoding='utf-8') as f:
    json.dump(website_subsection_mapping, f, indent=2, ensure_ascii=False)

print("\nMapping saved to: website_subsection_image_mapping.json")

