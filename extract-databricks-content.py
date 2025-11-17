import zipfile
import xml.etree.ElementTree as ET
import os
import shutil

# Extract content from the Word document
docx_path = 'public/downloads/2.Azure Databricks.docx'
output_dir = 'extracted_databricks_content'

# Create output directory
os.makedirs(output_dir, exist_ok=True)

# Open the docx file
with zipfile.ZipFile(docx_path, 'r') as z:
    # Extract document.xml
    doc_xml = z.read('word/document.xml')
    root = ET.fromstring(doc_xml)
    
    # Extract images
    image_dir = os.path.join(output_dir, 'images')
    os.makedirs(image_dir, exist_ok=True)
    
    # Get all image files from the document
    image_files = [f for f in z.namelist() if 'word/media/' in f and f.endswith(('.png', '.jpg', '.jpeg'))]
    
    print(f"Found {len(image_files)} images in document")
    for img_file in sorted(image_files):
        img_name = os.path.basename(img_file)
        img_data = z.read(img_file)
        img_path = os.path.join(image_dir, img_name)
        with open(img_path, 'wb') as f:
            f.write(img_data)
        print(f"Extracted: {img_name}")
    
    # Extract text content (simplified)
    text_content = []
    for para in root.iter():
        if para.text:
            text_content.append(para.text)
        if para.tail:
            text_content.append(para.tail)
    
    # Write text to file
    with open(os.path.join(output_dir, 'content.txt'), 'w', encoding='utf-8') as f:
        f.write('\n'.join(text_content))
    
    print(f"\nExtracted {len(image_files)} images and text content to {output_dir}")

