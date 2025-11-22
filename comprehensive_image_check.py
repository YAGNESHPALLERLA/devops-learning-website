import json
import re

# Read correct mappings
with open('correct_azure_basics_mapping.json', 'r', encoding='utf-8') as f:
    correct_mapping = json.load(f)

# Read the page file
with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'r', encoding='utf-8') as f:
    page_content = f.read()

print("=== COMPREHENSIVE IMAGE MAPPING CHECK ===\n")

# Build expected image locations from mapping
expected_by_image = {}
for section_key, images in correct_mapping.items():
    for img_data in images:
        img_name = img_data['image_name']
        if img_name not in expected_by_image:
            expected_by_image[img_name] = []
        expected_by_image[img_name].append({
            'section': section_key,
            'paragraph': img_data['paragraph_index']
        })

# Find all ImageGallery calls with better regex
# Pattern: ImageGallery images={getImages('image1', 'image2', ...)}
pattern = r"ImageGallery\s+images=\{getImages\(([^)]+)\)\}"
matches = list(re.finditer(pattern, page_content))

actual_by_image = {}
for match in matches:
    line_num = page_content[:match.start()].count('\n') + 1
    images_str = match.group(1)
    # Extract individual image names (handle both single and double quotes)
    images = re.findall(r"['\"]([^'\"]+)['\"]", images_str)
    
    # Get context around the match
    start = max(0, match.start() - 800)
    end = min(len(page_content), match.end() + 800)
    context = page_content[start:end]
    
    # Try to find section heading
    section_match = re.search(r'<h[234][^>]*>([^<]+)</h[234]>', context)
    section = section_match.group(1).strip() if section_match else "Unknown"
    
    # Try to find nearby text
    text_before = context[:400].replace('\n', ' ')[-200:]
    text_after = context[400:].replace('\n', ' ')[:200]
    
    for img in images:
        img = img.strip()
        if img not in actual_by_image:
            actual_by_image[img] = []
        actual_by_image[img].append({
            'line': line_num,
            'section': section,
            'text_before': text_before,
            'text_after': text_after,
            'all_images': images
        })

print("IMAGE-BY-IMAGE COMPARISON:\n")
print(f"{'Image':<12} {'Expected Section':<60} {'Actual Line':<8} {'Actual Section':<40} {'Status'}")
print("=" * 140)

all_images = sorted(set(list(expected_by_image.keys()) + list(actual_by_image.keys())), 
                   key=lambda x: int(re.search(r'\d+', x).group()) if re.search(r'\d+', x) else 0)

issues = []
correct = []

for img_name in all_images:
    expected = expected_by_image.get(img_name, [])
    actual = actual_by_image.get(img_name, [])
    
    if not expected:
        status = "❌ NOT IN MAPPING"
        issues.append(f"{img_name}: {status} - Found at lines {[a['line'] for a in actual]}")
    elif not actual:
        status = "❌ MISSING"
        issues.append(f"{img_name}: {status} - Expected in {expected[0]['section'][:60]}")
    else:
        # Check if any actual location matches expected
        expected_section_key = expected[0]['section']
        actual_locs = actual[0]
        
        # Try to match section
        expected_keywords = expected_section_key.lower().split('/')
        actual_section_lower = actual_locs['section'].lower()
        
        match_found = False
        for keyword in expected_keywords:
            if keyword.strip() in actual_section_lower:
                match_found = True
                break
        
        if match_found:
            status = "✓ OK"
            correct.append(img_name)
        else:
            status = "⚠ MISPLACED"
            issues.append(f"{img_name}: {status} - Expected: {expected_section_key[:60]}, Actual: {actual_locs['section'][:40]} (line {actual_locs['line']})")
    
    expected_str = expected[0]['section'][:60] if expected else "N/A"
    actual_str = f"Line {actual[0]['line']}" if actual else "NOT FOUND"
    actual_section = actual[0]['section'][:40] if actual else "N/A"
    
    print(f"{img_name:<12} {expected_str:<60} {actual_str:<8} {actual_section:<40} {status}")

print(f"\n\n=== SUMMARY ===")
print(f"✓ Correctly placed: {len(correct)}")
print(f"⚠ Issues found: {len(issues)}")

if issues:
    print(f"\n=== DETAILED ISSUES ===")
    for issue in issues[:30]:  # Show first 30 issues
        print(f"  {issue}")

# Check for duplicates
print(f"\n=== DUPLICATE CHECK ===")
image_counts = {}
for img_name, locations in actual_by_image.items():
    image_counts[img_name] = len(locations)

duplicates = {img: count for img, count in image_counts.items() if count > 1}
if duplicates:
    print("DUPLICATE IMAGES FOUND:")
    for img, count in sorted(duplicates.items()):
        locs = actual_by_image[img]
        print(f"  {img}: appears {count} times at lines {[l['line'] for l in locs]}")

