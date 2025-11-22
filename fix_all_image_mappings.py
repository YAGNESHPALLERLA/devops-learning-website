import re
import json

# Read correct mappings
with open('correct_azure_basics_mapping.json', 'r', encoding='utf-8') as f:
    mapping = json.load(f)

# Read the file
with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Build a list of all images in order
all_images = []
for section_key, images in mapping.items():
    for img_data in images:
        all_images.append({
            'image': img_data['image_name'],
            'section': section_key,
            'paragraph': img_data['paragraph_index']
        })

# Sort by paragraph index
all_images.sort(key=lambda x: x['paragraph'])

print(f"Total images to place: {len(all_images)}")
print("\nImage order:")
for i, img in enumerate(all_images[:20]):
    print(f"{i+1}. {img['image']} - {img['section'][:50]}")

# Now we need to find where each section is in the file and place images correctly
# This is complex, so let's do it step by step

# Fix 1: Remove duplicate image14 and image15 that are in wrong places
# They should only appear after the correct steps

# Fix 2: Split image18, image19, image20 correctly
# image18 should be alone after "Check for Storage Account" (line ~695)
# image19 should be with image45 after "Azure Storage provides four main types"
# image20 should be with image46 after "Go to your Storage Account"

# Fix 3: Fix image21-27 grouping to include image47-57
# image21, image22 should be with image47, image48 after "Click Create"
# image23-29 should be with image49-57 after "Change the access tier"

# Fix 4: Add missing images for blob types and archive sections

# Fix 5: Fix ADLS section images

# Let's start with the fixes:

# Fix: image18 should be alone after "Check for the Storage Account"
pattern1 = r'(<p className="text-green-400">If it appears there.*?</p>\s*</div>\s*<ImageGallery images=\{getImages\([^)]+\)\} />)'
replacement1 = r'\1'

# Actually, let's do this more carefully by reading sections and fixing them one by one
print("\nStarting fixes...")

# We'll need to manually fix each section based on the mapping
# This is too complex for a simple regex, so let's create targeted fixes

