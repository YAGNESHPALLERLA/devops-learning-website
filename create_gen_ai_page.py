import json

# Read the Gen AI content structure
with open('gen_ai_content_structure.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Extract section IDs and titles
sections = data['sections']
print("PAGE_HEADINGS = [")
for i, section in enumerate(sections):
    title = section['title']
    # Extract section number and clean title
    if title.startswith(str(i+1) + '. '):
        clean_title = title[len(str(i+1) + '. '):]
    else:
        clean_title = title
    
    # Create ID from title
    section_id = clean_title.lower().replace(' ', '-').replace('(', '').replace(')', '').replace(',', '').replace('&', 'and')
    section_id = ''.join(c for c in section_id if c.isalnum() or c == '-')
    section_id = '-'.join(section_id.split())
    
    print(f"  {{ id: '{section_id}', title: '{clean_title}' }},")

print("];")

