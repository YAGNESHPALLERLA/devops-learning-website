"""
Generate all section content for Generative AI page from JSON
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

def format_content_for_jsx(content_list):
    """Format content list into JSX structure"""
    jsx_parts = []
    i = 0
    while i < len(content_list):
        item = content_list[i]
        
        # Check if this is a heading (next item is content)
        if i + 1 < len(content_list) and len(item) < 100 and not item.endswith('.'):
            # This might be a heading
            heading = item
            content = content_list[i + 1] if i + 1 < len(content_list) else ""
            
            jsx_parts.append(f'''                <div className="p-4 bg-gray-800 rounded-lg">
                  <h5 className="text-xl font-semibold text-white mb-3">{heading}</h5>
                </div>
                <p className="mb-3">
                  {content}
                </p>''')
            i += 2
        else:
            # Regular paragraph
            jsx_parts.append(f'''                <p className="mb-3">
                  {item}
                </p>''')
            i += 1
    
    return '\n'.join(jsx_parts)

# Generate section data
section_data = []
for i, section in enumerate(sections):
    title = section['title']
    section_id = create_section_id(title)
    
    # Filter out problematic subsections
    if (section_id.startswith('user-query') or 
        section_id.startswith('rating-based') or 
        section_id.startswith('pairwise') or 
        section_id.startswith('preference-modeling')):
        continue
    
    section_data.append({
        'id': section_id,
        'title': clean_title(title),
        'number': i + 1,
        'content': section['content']
    })

# Generate JSX for first section as example
if section_data:
    first = section_data[0]
    print(f"// Example section: {first['title']}")
    print(f"// Section ID: {first['id']}")
    print(f"// Content items: {len(first['content'])}")
    print("\n// JSX structure:")
    print(f'''            <div id="{first['id']}" className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24 relative z-10">
              <h4 className="text-2xl font-semibold text-white mb-4">{first['number']}. {first['title']}</h4>
              <div className="space-y-6 text-gray-300">
                {/* Content will be added here */}
              </div>
            </div>''')

