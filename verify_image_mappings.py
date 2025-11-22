import json
import re

# Read the correct mappings
with open('correct_azure_basics_mapping.json', 'r', encoding='utf-8') as f:
    correct_mapping = json.load(f)

# Read the actual page file
with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'r', encoding='utf-8') as f:
    page_content = f.read()

print("=== VERIFYING AZURE BASICS IMAGE MAPPINGS ===\n")

# Find all ImageGallery calls
image_gallery_pattern = r"ImageGallery\s+images=\{getImages\(['\"]([^'\"]+)['\"]\)\}"
matches = re.finditer(image_gallery_pattern, page_content)

issues = []
all_found_images = set()

for match in matches:
    line_num = page_content[:match.start()].count('\n') + 1
    images_str = match.group(1)
    images = [img.strip() for img in images_str.split(',')]
    
    # Get context (50 chars before and after)
    start = max(0, match.start() - 200)
    end = min(len(page_content), match.end() + 200)
    context = page_content[start:end]
    
    # Extract section name from context
    section_match = re.search(r'<h[34][^>]*>([^<]+)</h[34]>', context)
    section = section_match.group(1) if section_match else "Unknown"
    
    for img in images:
        all_found_images.add(img)
        # Check if this image is in the correct location
        found_in_mapping = False
        for section_key, image_list in correct_mapping.items():
            for img_data in image_list:
                if img_data['image_name'] == img:
                    found_in_mapping = True
                    # Check if section matches
                    if 'Management Groups' in section_key and 'Management Groups' in section:
                        print(f"✓ {img} correctly placed in Management Groups section (line {line_num})")
                    elif 'Subscriptions' in section_key and 'Subscriptions' in section:
                        print(f"✓ {img} correctly placed in Subscriptions section (line {line_num})")
                    elif 'Resource Group' in section_key and 'Resource Group' in section:
                        print(f"✓ {img} correctly placed in Resource Group section (line {line_num})")
                    elif 'Blob Storage' in section_key and 'Blob Storage' in section:
                        print(f"✓ {img} correctly placed in Blob Storage section (line {line_num})")
                    elif 'Data Lake Storage' in section_key and 'Data Lake Storage' in section:
                        print(f"✓ {img} correctly placed in Data Lake Storage section (line {line_num})")
                    else:
                        issues.append(f"⚠ {img} at line {line_num} - Section: {section}, Expected: {section_key}")
                    break
            if found_in_mapping:
                break
        if not found_in_mapping:
            issues.append(f"❌ {img} at line {line_num} - NOT FOUND IN MAPPING")

print(f"\n=== ISSUES FOUND ===")
if issues:
    for issue in issues:
        print(issue)
else:
    print("No issues found!")

# Check for duplicate images
print(f"\n=== CHECKING FOR DUPLICATES ===")
image_counts = {}
for match in matches:
    images_str = match.group(1)
    images = [img.strip() for img in images_str.split(',')]
    for img in images:
        image_counts[img] = image_counts.get(img, 0) + 1

duplicates = {img: count for img, count in image_counts.items() if count > 1}
if duplicates:
    print("DUPLICATE IMAGES FOUND:")
    for img, count in duplicates.items():
        print(f"  {img}: appears {count} times")
else:
    print("No duplicates found!")

# Check for missing images
print(f"\n=== CHECKING FOR MISSING IMAGES ===")
all_expected_images = set()
for section_key, image_list in correct_mapping.items():
    for img_data in image_list:
        all_expected_images.add(img_data['image_name'])

missing = all_expected_images - all_found_images
if missing:
    print(f"MISSING IMAGES ({len(missing)}):")
    for img in sorted(missing):
        print(f"  {img}")
else:
    print("All expected images are present!")

