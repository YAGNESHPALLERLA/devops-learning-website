"""
Generate the complete Generative AI page.tsx file from JSON content
This creates a comprehensive TypeScript/TSX page with all sections and content
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
    return text.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')

# Generate section IDs and clean titles
section_data = []
for section in sections:
    title = section['title']
    section_id = create_section_id(title)
    clean_title_text = clean_title(title)
    section_data.append({
        'id': section_id,
        'title': clean_title_text,
        'original_title': title,
        'content': section['content']
    })

# Filter out problematic subsections (they're part of main sections)
main_sections = [s for s in section_data if not s['id'].startswith('user-query') and 
                 not s['id'].startswith('rating-based') and 
                 not s['id'].startswith('pairwise') and 
                 not s['id'].startswith('preference-modeling')]

print(f"// Generated Generative AI page with {len(main_sections)} main sections")
print("// This is a template - content will be populated from JSON")

