import json

# Read organized content
with open('databricks_2_organized.json', 'r', encoding='utf-8') as f:
    organized = json.load(f)

# Main sections to add
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

jsx_sections = []

for section_name in main_sections:
    if section_name not in organized:
        continue
    
    section_data = organized[section_name]
    section_id = section_name.lower().replace(' ', '-').replace('?', '').replace(':', '').replace('(', '').replace(')', '')
    
    jsx = f'\n              <div id="{section_id}" className="mb-8">'
    jsx += f'\n                <h4 className="text-2xl font-semibold text-white mb-4">{section_name}</h4>'
    jsx += '\n                <div className="space-y-4 text-gray-300">'
    
    # Add main content
    for para in section_data['content']:
        if para and len(para.strip()) > 0:
            # Check if it's a bullet point or list item
            if para.startswith('✅') or para.startswith('💰') or para.startswith('💸'):
                jsx += f'\n                  <p className="text-gray-300">{para}</p>'
            elif para.startswith('-') or para.startswith('•'):
                jsx += f'\n                  <li className="ml-4">{para[1:].strip()}</li>'
            elif len(para) < 100 and ':' in para:
                jsx += f'\n                  <h5 className="text-xl font-semibold text-white mt-4 mb-2">{para}</h5>'
            else:
                jsx += f'\n                  <p className="text-gray-300">{para}</p>'
    
    # Add subsections
    for sub_name, sub_content in section_data['subsections'].items():
        if sub_name in ['Feature', 'Description', 'Stage', 'Function', 'Output', 'Aspect']:
            continue  # Skip table headers
        
        sub_id = f"{section_id}-{sub_name.lower().replace(' ', '-').replace('?', '').replace(':', '').replace('(', '').replace(')', '')}"
        jsx += f'\n                  <div id="{sub_id}" className="mt-6">'
        jsx += f'\n                    <h5 className="text-xl font-semibold text-white mb-3">{sub_name}</h5>'
        
        for para in sub_content:
            if para and len(para.strip()) > 0:
                if para.startswith('✅') or para.startswith('💰') or para.startswith('💸'):
                    jsx += f'\n                      <p className="text-gray-300">{para}</p>'
                elif para.startswith('-') or para.startswith('•'):
                    jsx += f'\n                      <li className="ml-4">{para[1:].strip()}</li>'
                elif len(para) < 100 and ':' in para:
                    jsx += f'\n                      <h6 className="text-lg font-semibold text-white mt-3 mb-2">{para}</h6>'
                else:
                    jsx += f'\n                      <p className="text-gray-300">{para}</p>'
        
        jsx += '\n                  </div>'
    
    jsx += '\n                </div>'
    jsx += '\n              </div>'
    
    jsx_sections.append(jsx)

# Save to file
with open('databricks_2_jsx_content.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(jsx_sections))

print("JSX content generated and saved to: databricks_2_jsx_content.txt")
print(f"\nGenerated {len(jsx_sections)} sections")

