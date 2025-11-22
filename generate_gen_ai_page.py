import json
import re

# Read the Gen AI content structure
with open('gen_ai_content_structure.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

sections = data['sections']

# Generate section IDs and navigation structure
def create_section_id(title):
    # Remove section number
    clean = re.sub(r'^\d+\.\s*', '', title)
    # Convert to kebab-case
    clean = clean.lower()
    clean = re.sub(r'[^\w\s-]', '', clean)
    clean = re.sub(r'\s+', '-', clean)
    clean = re.sub(r'-+', '-', clean)
    return clean.strip('-')

# Create PAGE_HEADINGS
print("const PAGE_HEADINGS = [")
for i, section in enumerate(sections):
    title = section['title']
    section_id = create_section_id(title)
    clean_title = re.sub(r'^\d+\.\s*', '', title)
    print(f"  {{ id: '{section_id}', title: '{clean_title}' }},")
print("];\n")

# Create navigation groups (similar to LLMs structure)
# Group sections logically
groups = {
    'fundamentals': ['introduction-to-generative-ai', 'foundations-of-generative-models', 'core-mathematics-and-concepts'],
    'model-architectures': ['variational-autoencoders-vaes', 'generative-adversarial-networks-gans', 'diffusion-models', 'transformer-models-and-large-language-models-llms', 'multimodal-generative-ai'],
    'practical-techniques': ['prompt-engineering-and-context-management', 'fine-tuning-and-adaptation', 'retrieval-augmented-generation-rag', 'generative-ai-for-code'],
    'tools-and-evaluation': ['generative-ai-frameworks-and-tools', 'evaluation-and-metrics-in-generative-ai'],
    'ethics-and-advanced': ['ethics-safety-and-responsible-genai', 'advanced-topics-in-generative-ai'],
    'deployment-and-applications': ['mlops-and-deployment-for-genai', 'real-world-generative-ai-applications', 'capstone-projects-and-assessments']
}

print("// Navigation structure would be organized into these groups")
for group_name, section_ids in groups.items():
    print(f"// {group_name}: {len(section_ids)} sections")

