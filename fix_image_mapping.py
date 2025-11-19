"""
Script to help identify and fix image mappings for Azure Databricks tutorial.
This script will help identify which db1_imageX.png files correspond to which sections.
"""

import json
import os

# Current mapping from the code
current_mapping = {
    'db1_image1': 'Jobs & Pipelines interface',
    'db1_image2': 'Job Runs Dashboard',
    'db1_image3': 'Data Ingestion interface',
    'db1_image4': 'Data Ingestion Connectors',
    'db1_image5': 'Data Ingestion Files section',
    'db1_image6': 'AI/ML Playground interface',
    'db1_image7': 'AI/ML Playground components',
    'db1_image8': 'AI/ML Experiments interface',
    'db1_image9': 'AI/ML Feature Store',
    'db1_image10': 'AI/ML Model Registry',
    'db1_image11': 'AI/ML Model details',
    'db1_image12': 'AI/ML Model Serving',
    'db1_image13': 'AI/ML Serving details',
    'db1_image14': 'Additional content 1',
    'db1_image15': 'Additional content 2',
    'db1_image16': 'Additional content 3',
}

# Expected content for Data Ingestion (based on user description)
data_ingestion_expected = {
    'keywords': ['Add data', 'Salesforce', 'SAP', 'Workday', 'ServiceNow', 'Google Analytics', 
                 'Create or modify table', 'Upload files to a volume', 'Azure Data Lake Storage'],
    'description': 'Shows "Add data" interface with Databricks connectors and Files section'
}

print("=" * 80)
print("IMAGE MAPPING ANALYSIS")
print("=" * 80)
print("\nCurrent mapping:")
for img, desc in current_mapping.items():
    print(f"  {img}: {desc}")

print("\n" + "=" * 80)
print("INSTRUCTIONS FOR FIXING:")
print("=" * 80)
print("\n1. Check each db1_imageX.png file in public/tutorials/azure/images/")
print("2. Identify which image contains the Data Ingestion 'Add data' interface")
print("3. Note which images contain:")
print("   - Jobs & Pipelines interface")
print("   - Job Runs Dashboard")
print("   - Data Ingestion (Add data with connectors)")
print("   - Playground interface")
print("   - Experiments interface")
print("   - Features")
print("   - Models")
print("   - Serving")
print("\n4. Once identified, update the mapping in the script below")
print("\n" + "=" * 80)

# Check which images exist
image_dir = 'public/tutorials/azure/images'
existing_images = []
if os.path.exists(image_dir):
    for i in range(1, 17):
        img_file = f'db1_image{i}.png'
        img_path = os.path.join(image_dir, img_file)
        if os.path.exists(img_path):
            existing_images.append(img_file)
            file_size = os.path.getsize(img_path)
            print(f"✓ {img_file} exists ({file_size:,} bytes)")
        else:
            print(f"✗ {img_file} NOT FOUND")

print(f"\nFound {len(existing_images)} db1_image files")
print("\n" + "=" * 80)
print("NEXT STEPS:")
print("=" * 80)
print("\nTo fix the image mapping:")
print("1. Manually check each image file to identify its content")
print("2. Update the 'corrected_mapping' dictionary below with the correct mappings")
print("3. Run this script again to generate the corrected code")

# Placeholder for corrected mapping (to be filled by user)
corrected_mapping = {
    # Example: If db1_image6 actually contains Data Ingestion content:
    # 'Data Ingestion': ['db1_image6'],  # or ['db1_image6', 'db1_image7'] if multiple images
    # Update this based on actual image content
}

