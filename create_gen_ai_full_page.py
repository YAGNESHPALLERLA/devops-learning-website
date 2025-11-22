"""
Script to generate the full Generative AI page from JSON content
This will create a comprehensive TypeScript/TSX page with all sections
"""
import json
import re

# Read the Gen AI content structure
with open('gen_ai_content_structure.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

sections = data['sections']

def create_section_id(title):
    """Create a clean section ID from title"""
    # Remove section number
    clean = re.sub(r'^\d+\.\s*', '', title)
    # Convert to kebab-case
    clean = clean.lower()
    clean = re.sub(r'[^\w\s-]', '', clean)
    clean = re.sub(r'\s+', '-', clean)
    clean = re.sub(r'-+', '-', clean)
    return clean.strip('-')

def clean_title(title):
    """Remove section number from title"""
    return re.sub(r'^\d+\.\s*', '', title)

# Generate all section IDs
section_ids = []
for section in sections:
    title = section['title']
    section_id = create_section_id(title)
    clean_title_text = clean_title(title)
    section_ids.append({
        'id': section_id,
        'title': clean_title_text,
        'original_title': title
    })

# Print PAGE_HEADINGS
print("const PAGE_HEADINGS = [")
for item in section_ids:
    print(f"  {{ id: '{item['id']}', title: '{item['title']}' }},")
print("];\n")

# Create navigation groups
print("// Navigation groups for sidebar")
groups = {
    'fundamentals': ['introduction-to-generative-ai', 'foundations-of-generative-models', 'core-mathematics-and-concepts'],
    'model-architectures': ['variational-autoencoders-vaes', 'generative-adversarial-networks-gans', 'diffusion-models', 'transformer-models-and-large-language-models-llms', 'multimodal-generative-ai'],
    'practical-techniques': ['prompt-engineering-and-context-management', 'fine-tuning-and-adaptation', 'retrieval-augmented-generation-rag', 'generative-ai-for-code'],
    'tools-and-evaluation': ['generative-ai-frameworks-and-tools', 'evaluation-and-metrics-in-generative-ai'],
    'ethics-and-advanced': ['ethics-safety-and-responsible-genai', 'advanced-topics-in-generative-ai'],
    'deployment-and-applications': ['mlops-and-deployment-for-genai', 'real-world-generative-ai-applications', 'capstone-projects-and-assessments']
}

print("SUBSECTION_PARENT mapping:")
for group_name, section_ids_list in groups.items():
    for sid in section_ids_list:
        print(f"  '{sid}': '{group_name}',")

