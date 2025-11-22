"""
Script to generate the full content sections for the Generative AI page
"""
import json
import re

# Read the Gen AI content structure
with open('gen_ai_content_structure.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

sections = data['sections']

def create_section_id(title):
    """Create a clean section ID from title"""
    clean = re.sub(r'^\d+\.\s*', '', title)
    clean = clean.lower()
    clean = re.sub(r'[^\w\s-]', '', clean)
    clean = re.sub(r'\s+', '-', clean)
    clean = re.sub(r'-+', '-', clean)
    return clean.strip('-')

def clean_title(title):
    """Remove section number from title"""
    return re.sub(r'^\d+\.\s*', '', title)

def escape_jsx(text):
    """Escape text for JSX"""
    return (text.replace('\\', '\\\\')
                .replace('`', '\\`')
                .replace('${', '\\${')
                .replace('{', '\\{')
                .replace('}', '\\}'))

# Generate section IDs and clean titles
section_data = []
for i, section in enumerate(sections):
    title = section['title']
    section_id = create_section_id(title)
    clean_title_text = clean_title(title)
    
    # Filter out problematic subsections
    if (section_id.startswith('user-query') or 
        section_id.startswith('rating-based') or 
        section_id.startswith('pairwise') or 
        section_id.startswith('preference-modeling')):
        continue
    
    section_data.append({
        'id': section_id,
        'title': clean_title_text,
        'number': i + 1,
        'content': section['content']
    })

print(f"// {len(section_data)} main sections to add")
print("\n// Section structure:")
for s in section_data:
    print(f"// {s['number']}. {s['title']} (id: {s['id']})")

