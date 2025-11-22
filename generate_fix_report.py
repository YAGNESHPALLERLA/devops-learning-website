import json
import re

# Read correct mappings
with open('correct_azure_basics_mapping.json', 'r', encoding='utf-8') as f:
    correct_mapping = json.load(f)

# Read the page
with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

print("=== DETAILED IMAGE MAPPING COMPARISON ===\n")

# Create expected image locations
expected_locations = {}
for section_key, images in correct_mapping.items():
    for img_data in images:
        expected_locations[img_data['image_name']] = {
            'section': section_key,
            'paragraph': img_data['paragraph_index']
        }

# Find all ImageGallery calls with line numbers
pattern = r"ImageGallery\s+images=\{getImages\(['\"]([^'\"]+)['\"]\)\}"
matches = list(re.finditer(pattern, content))

actual_locations = {}
for match in matches:
    line_num = content[:match.start()].count('\n') + 1
    images_str = match.group(1)
    images = [img.strip() for img in images_str.split(',')]
    
    # Get context
    start = max(0, match.start() - 500)
    end = min(len(content), match.end() + 500)
    context = content[start:end]
    
    # Try to find section
    section_match = re.search(r'<h[34][^>]*>([^<]+)</h[34]>', context)
    section = section_match.group(1) if section_match else "Unknown"
    
    for img in images:
        actual_locations[img] = {
            'line': line_num,
            'section': section,
            'context': context[:200]
        }

print("EXPECTED vs ACTUAL:\n")
for img_name in sorted(expected_locations.keys(), key=lambda x: int(re.search(r'\d+', x).group())):
    expected = expected_locations[img_name]
    actual = actual_locations.get(img_name, {'line': 'NOT FOUND', 'section': 'NOT FOUND'})
    
    status = "✓" if expected['section'] in actual['section'] or actual['section'] in expected['section'] else "✗"
    print(f"{status} {img_name:12} | Expected: {expected['section'][:60]:60} | Actual line {actual['line']:4} in {actual['section'][:40]}")

print("\n\nMISSING IMAGES:")
missing = set(expected_locations.keys()) - set(actual_locations.keys())
for img in sorted(missing, key=lambda x: int(re.search(r'\d+', x).group())):
    print(f"  {img}")

print("\n\nEXTRA IMAGES (not in mapping):")
extra = set(actual_locations.keys()) - set(expected_locations.keys())
for img in sorted(extra, key=lambda x: int(re.search(r'\d+', x).group()) if re.search(r'\d+', x) else 0):
    print(f"  {img} at line {actual_locations[img]['line']}")

