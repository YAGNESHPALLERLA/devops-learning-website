import json

# Read the mapping
with open('image_mapping.json', 'r', encoding='utf-8') as f:
    image_mapping = json.load(f)

print("=== Checking Catalog and Compute Images ===\n")

# Find Catalog images
print("CATALOG IMAGES:")
for item in image_mapping:
    idx = item['index']
    img_name = item['image_name']
    context = item['context'].lower()
    
    if 'catalog' in context or idx == 24 or idx == 25:
        print(f"Index {idx}: {img_name}")
        print(f"  Context: {item['context'][:150]}...")
        print()

# Find potential Compute images
print("\nCOMPUTE IMAGES (searching for cluster, compute, warehouse):")
for item in image_mapping:
    idx = item['index']
    img_name = item['image_name']
    context = item['context'].lower()
    
    if 'compute' in context or 'cluster' in context or 'warehouse' in context:
        print(f"Index {idx}: {img_name}")
        print(f"  Context: {item['context'][:150]}...")
        print()

# Check what's around index 24-28 more carefully
print("\n=== Detailed Check: Indices 24-28 ===")
for item in image_mapping:
    idx = item['index']
    if 24 <= idx <= 28:
        print(f"\nIndex {idx}: {item['image_name']}")
        print(f"Full context: {item['context']}")
        print()

