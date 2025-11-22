import docx
from pathlib import Path

# Read the document
doc = docx.Document('public/downloads/llms.docx')

# Create output directory for images
image_dir = Path('public/tutorials/artificial-intelligence/llms/images')
image_dir.mkdir(parents=True, exist_ok=True)

# Extract images from document
image_count = 0
image_mapping = []

for rel in doc.part.rels.values():
    if "image" in rel.target_ref:
        image_count += 1
        image_data = rel.target_part.blob
        image_ext = rel.target_ref.split('.')[-1] if '.' in rel.target_ref else 'png'
        image_filename = f'image-{image_count:02d}.{image_ext}'
        image_path = image_dir / image_filename
        with open(image_path, 'wb') as f:
            f.write(image_data)
        print(f'Extracted image: {image_path}')
        image_mapping.append({
            'number': image_count,
            'filename': image_filename,
            'path': str(image_path).replace('\\', '/')
        })

print(f'\nTotal images extracted: {image_count}')
print('\nImage mapping:')
for img in image_mapping:
    print(f"  Image {img['number']}: {img['filename']} -> {img['path']}")

