import json
import re

# Read correct mappings
with open('correct_azure_basics_mapping.json', 'r', encoding='utf-8') as f:
    azure_basics_mapping = json.load(f)

with open('correct_databricks_1_mapping.json', 'r', encoding='utf-8') as f:
    databricks_mapping = json.load(f)

# Read the page files
with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'r', encoding='utf-8') as f:
    azure_basics_content = f.read()

with open('src/app/tutorials/azure-data-engineer/azure-databricks/page.tsx', 'r', encoding='utf-8') as f:
    databricks_content = f.read()

print("=== VERIFYING AZURE BASICS IMAGE MAPPINGS ===\n")

# Build expected order from mapping
expected_order = []
for section_key, images in azure_basics_mapping.items():
    for img_data in images:
        expected_order.append({
            'image': img_data['image_name'],
            'section': section_key,
            'paragraph': img_data['paragraph_index']
        })

# Find actual ImageGallery calls
pattern = r"ImageGallery\s+images=\{getImages\(([^)]+)\)\}"
matches = list(re.finditer(pattern, azure_basics_content))

actual_order = []
for match in matches:
    line_num = azure_basics_content[:match.start()].count('\n') + 1
    images_str = match.group(1)
    images = re.findall(r"['\"]([^'\"]+)['\"]", images_str)
    actual_order.append({
        'line': line_num,
        'images': images
    })

print(f"Expected {len(expected_order)} images in order")
print(f"Found {sum(len(a['images']) for a in actual_order)} images in {len(actual_order)} ImageGallery calls\n")

# Check order
print("IMAGE ORDER VERIFICATION:")
expected_images = [e['image'] for e in expected_order]
actual_images = []
for a in actual_order:
    actual_images.extend(a['images'])

# Check if order matches
order_issues = []
for i, expected_img in enumerate(expected_images):
    if expected_img in actual_images:
        expected_pos = i
        actual_pos = actual_images.index(expected_img)
        if expected_pos != actual_pos:
            order_issues.append(f"{expected_img}: expected at position {expected_pos}, found at {actual_pos}")

if order_issues:
    print(f"⚠ Found {len(order_issues)} order issues:")
    for issue in order_issues[:10]:
        print(f"  {issue}")
else:
    print("✓ Image order matches expected order")

# Check for missing images
missing = set(expected_images) - set(actual_images)
if missing:
    print(f"\n❌ Missing {len(missing)} images:")
    for img in sorted(missing, key=lambda x: int(re.search(r'\d+', x).group()) if re.search(r'\d+', x) else 0):
        print(f"  {img}")

# Check for extra images
extra = set(actual_images) - set(expected_images)
if extra:
    print(f"\n⚠ Extra images (not in mapping): {len(extra)}")
    for img in sorted(extra, key=lambda x: int(re.search(r'\d+', x).group()) if re.search(r'\d+', x) else 0):
        print(f"  {img}")

print("\n=== VERIFYING DATABRICKS IMAGE MAPPINGS ===\n")

# Build expected order for Databricks
expected_db_order = []
for section_key, images in databricks_mapping.items():
    for img_data in images:
        expected_db_order.append({
            'image': img_data['image_name'],
            'section': section_key,
            'paragraph': img_data['paragraph_index']
        })

# Find actual ImageGallery calls in Databricks
matches_db = list(re.finditer(pattern, databricks_content))

actual_db_order = []
for match in matches_db:
    line_num = databricks_content[:match.start()].count('\n') + 1
    images_str = match.group(1)
    images = re.findall(r"['\"]([^'\"]+)['\"]", images_str)
    actual_db_order.append({
        'line': line_num,
        'images': images
    })

print(f"Expected {len(expected_db_order)} images in order")
print(f"Found {sum(len(a['images']) for a in actual_db_order)} images in {len(actual_db_order)} ImageGallery calls\n")

expected_db_images = [e['image'] for e in expected_db_order]
actual_db_images = []
for a in actual_db_order:
    actual_db_images.extend(a['images'])

missing_db = set(expected_db_images) - set(actual_db_images)
if missing_db:
    print(f"❌ Missing {len(missing_db)} images:")
    for img in sorted(missing_db):
        print(f"  {img}")

extra_db = set(actual_db_images) - set(expected_db_images)
if extra_db:
    print(f"\n⚠ Extra images (not in mapping): {len(extra_db)}")
    for img in sorted(extra_db):
        print(f"  {img}")

