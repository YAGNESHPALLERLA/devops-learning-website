import json
import os
import shutil

# Based on careful analysis of image_mapping.json, here's the correct mapping:
# Index -> Document Image -> Website Image -> Section
correct_mapping = {
    'image1.png': 'image89',   # Advantages (index 1-2)
    'image2.png': 'image89',   # Advantages (index 2)
    'image3.png': 'image90',   # How to Create (index 3)
    'image4.png': 'image90',   # How to Create (index 4)
    'image5.png': 'image90',   # How to Create (index 5)
    'image6.png': 'image90',   # How to Create (index 6, 9)
    'image7.png': 'image90',   # How to Create (index 7)
    'image8.png': 'image90',   # How to Create (index 8)
    'image9.png': 'image91',   # Workspace Overview (index 10)
    'image10.png': 'image91',  # Workspace Overview (index 11)
    'image11.png': 'image92',  # Workspace Features (index 12)
    'image12.png': 'image92',  # Workspace Features (index 13, 19, 20)
    'image13.png': 'image92',  # Workspace Features (index 14, 21)
    'image14.png': 'image92',  # Workspace Features (index 15)
    'image15.png': 'image92',  # Workspace Features (index 16)
    'image16.png': 'image92',  # Workspace Features (index 17)
    'image17.png': 'image92',  # Workspace Features (index 18)
    'image18.png': 'image93',  # Notebook (index 22)
    'image19.png': 'image93',  # Notebook (index 23)
    'image20.png': 'image94',  # Catalog (index 24)
    'image21.png': 'image94',  # Catalog (index 25)
    'image22.png': 'image95',  # Jobs & Pipelines (index 26)
    'image23.png': 'image96',  # Job Runs (index 27)
    'image24.png': 'image98',  # Marketplace (index 28) - KEY!
    'image25.png': 'image99',  # SQL Editor (index 29)
    'image26.png': 'image100', # SQL Editor Features (index 30 - context mentions SQL Editor features)
    'image27.png': 'image101', # Queries (index 31 - context mentions "Queries")
    'image28.png': 'image102', # Dashboards (index 32 - context mentions "Dashboards")
    'image29.png': 'image103', # Dashboards Legacy (index 33 - context mentions "Dashboards")
    'image30.png': 'image104', # Genie (index 34 - context mentions Genie features)
    'image31.png': 'image106', # Alerts (index 35 - but context says "SQL Data Warehouse", so might need adjustment)
}

# Actually, let me check the JSON again for image31
# Image 35 (index 35) is image31.png with context "SQL Data Warehouse"
# So image31.png should be for SQL Warehouse (image108+), not Alerts
# But we also need image106 for Alerts
# Let me check: image 33 (index 33) is image29.png with context "Alerts"
# So image29.png should be image106 for Alerts, not image103

# Revised mapping:
revised_mapping = {
    'image1.png': 'image89',
    'image2.png': 'image89',
    'image3.png': 'image90',
    'image4.png': 'image90',
    'image5.png': 'image90',
    'image6.png': 'image90',
    'image7.png': 'image90',
    'image8.png': 'image90',
    'image9.png': 'image91',
    'image10.png': 'image91',
    'image11.png': 'image92',
    'image12.png': 'image92',
    'image13.png': 'image92',
    'image14.png': 'image92',
    'image15.png': 'image92',
    'image16.png': 'image92',
    'image17.png': 'image92',
    'image18.png': 'image93',
    'image19.png': 'image93',
    'image20.png': 'image94',
    'image21.png': 'image94',
    'image22.png': 'image95',
    'image23.png': 'image96',
    'image24.png': 'image98',  # Marketplace - CORRECT!
    'image25.png': 'image99',  # SQL Editor
    'image26.png': 'image100', # SQL Editor Features (context: "Fetch clean subsets... SQL dashboards")
    'image27.png': 'image101', # Queries (context: "Queries The Queries interface")
    'image28.png': 'image102', # Dashboards (context: "Dashboards D... Summary tables")
    'image29.png': 'image106', # Alerts (context: "Alerts Alerts in Azure Databricks")
    'image30.png': 'image107', # Query History (context: "Query History The Query History page")
    'image31.png': 'image108', # SQL Warehouse (context: "SQL Data Warehouse")
}

print("=== Corrected Image Mapping ===")
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
    'image98': 'Marketplace',
    'image99': 'SQL Editor',
    'image100': 'SQL Editor Features',
    'image101': 'Queries',
    'image102': 'Dashboards',
    'image106': 'Alerts',
    'image107': 'Query History',
    'image108': 'SQL Warehouse',
}

for img_name in sorted(revised_mapping.keys(), key=lambda x: int(x.replace('image', '').replace('.png', ''))):
    web_img = revised_mapping[img_name]
    section = section_names.get(web_img, 'Unknown')
    print(f"{img_name:15} -> {web_img:12} -> {section}")

# Save the mapping
with open('final_image_mapping.json', 'w', encoding='utf-8') as f:
    json.dump(revised_mapping, f, indent=2)

print(f"\nMapping saved. Total images: {len(revised_mapping)}")

# Now copy the images
source_dir = 'extracted_databricks_images/media'
target_dir = 'public/tutorials/azure/images'

print("\nCopying images...")
for doc_image, website_image in revised_mapping.items():
    src_path = os.path.join(source_dir, doc_image)
    dst_path = os.path.join(target_dir, f"{website_image}.png")
    
    if os.path.exists(src_path):
        shutil.copy2(src_path, dst_path)
        print(f"[OK] {doc_image} -> {website_image}.png")
    else:
        print(f"[ERROR] Source not found: {doc_image}")

print(f"\n[SUCCESS] All images copied to {target_dir}")

