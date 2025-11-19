import json

# Read the content
with open('databricks_2_content.json', 'r', encoding='utf-8') as f:
    content = json.load(f)

# Organize content by main sections
organized_sections = {}
current_main_section = None
current_subsection = None

main_sections = [
    "Data Lakehouse",
    "What is a Data Lakehouse?",
    "Why the Need for a Lakehouse?",
    "Core Features of a Data Lakehouse",
    "Benefits of a Data Lakehouse",
    "Data Lakehouse on Azure Databricks",
    "Example Use Cases",
    "Lakehouse vs Data Lake vs Data Warehouse",
    "Capabilities of a Databricks Lakehouse",
    "Data Lakehouse architecture"
]

for para in content:
    text = para.get('text', '').strip()
    if not text:
        continue
    
    # Check if it's a main section heading
    if text in main_sections and para.get('is_heading') and para.get('is_bold'):
        current_main_section = text
        current_subsection = None
        if current_main_section not in organized_sections:
            organized_sections[current_main_section] = {
                'subsections': {},
                'content': []
            }
    elif para.get('is_heading') and para.get('is_bold') and len(text) < 150:
        # It's a subsection
        current_subsection = text
        if current_main_section and current_main_section in organized_sections:
            if current_subsection not in organized_sections[current_main_section]['subsections']:
                organized_sections[current_main_section]['subsections'][current_subsection] = []
    
    # Add content to current section/subsection
    if current_main_section and current_main_section in organized_sections:
        if current_subsection and current_subsection in organized_sections[current_main_section]['subsections']:
            organized_sections[current_main_section]['subsections'][current_subsection].append(text)
        else:
            organized_sections[current_main_section]['content'].append(text)

# Save organized content
with open('databricks_2_organized.json', 'w', encoding='utf-8') as f:
    json.dump(organized_sections, f, indent=2, ensure_ascii=False)

print("=== Organized Sections ===\n")
for section, data in organized_sections.items():
    print(f"{section}:")
    print(f"  Main content: {len(data['content'])} paragraphs")
    print(f"  Subsections: {len(data['subsections'])}")
    for sub, content in data['subsections'].items():
        print(f"    - {sub}: {len(content)} items")
    print()

print("Content organized and saved to: databricks_2_organized.json")

