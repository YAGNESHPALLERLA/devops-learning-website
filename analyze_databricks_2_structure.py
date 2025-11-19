import json

# Read the content
with open('databricks_2_content.json', 'r', encoding='utf-8') as f:
    content = json.load(f)

# Find main headings (bold and short)
main_headings = []
for para in content:
    if para.get('is_heading') and para.get('is_bold') and len(para.get('text', '')) < 150:
        main_headings.append({
            'text': para['text'],
            'section': para.get('section', ''),
            'subsection': para.get('subsection', '')
        })

print("=== Main Headings in Azure Databricks -2.docx ===\n")
for i, heading in enumerate(main_headings[:50], 1):
    print(f"{i}. {heading['text']}")
    if heading['subsection']:
        print(f"   Subsection: {heading['subsection']}")
    print()

# Group content by main sections
sections = {}
current_section = "Introduction"
for para in content:
    if para.get('is_heading') and para.get('is_bold') and len(para.get('text', '')) < 150:
        current_section = para['text']
        if current_section not in sections:
            sections[current_section] = []
    
    if current_section in sections:
        sections[current_section].append(para['text'])

print("\n=== Sections Found ===\n")
for section, paragraphs in sections.items():
    print(f"{section}: {len(paragraphs)} paragraphs")
    print(f"  First few paragraphs:")
    for para in paragraphs[:3]:
        if para:
            print(f"    - {para[:80]}...")
    print()

