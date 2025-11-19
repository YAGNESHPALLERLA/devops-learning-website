import json

# Read organized content
with open('databricks_2_organized.json', 'r', encoding='utf-8') as f:
    organized = json.load(f)

# Section mapping
section_mapping = {
    "Data Lakehouse": "data-lakehouse-intro",
    "What is a Data Lakehouse?": "what-is-data-lakehouse",
    "Why the Need for a Lakehouse?": "why-need-lakehouse",
    "Core Features of a Data Lakehouse": "core-features-lakehouse",
    "Benefits of a Data Lakehouse": "benefits-lakehouse",
    "Data Lakehouse on Azure Databricks": "lakehouse-on-databricks",
    "Example Use Cases": "example-use-cases",
    "Lakehouse vs Data Lake vs Data Warehouse": "lakehouse-vs-lake-vs-warehouse",
    "Capabilities of a Databricks Lakehouse": "capabilities-databricks-lakehouse",
    "Data Lakehouse architecture": "lakehouse-architecture"
}

jsx_content = []

for section_name, section_id in section_mapping.items():
    if section_name not in organized:
        continue
    
    section_data = organized[section_name]
    content = section_data.get('content', [])
    subsections = section_data.get('subsections', {})
    
    jsx = f'\n              <div id="{section_id}" className="mb-8">'
    jsx += f'\n                <h4 className="text-2xl font-semibold text-white mb-4">{section_name}</h4>'
    jsx += '\n                <div className="space-y-4 text-gray-300">'
    
    # Process main content
    i = 0
    while i < len(content):
        para = content[i].strip()
        if not para or para == section_name:
            i += 1
            continue
        
        # Check for table-like structure (comparison table)
        if i + 2 < len(content) and ':' in para and len(para) < 50:
            # It might be a table header
            if para in ['Data types', 'Performance', 'Cost', 'Reliability', 'ML/AI support', 'Governance', 'Scalability']:
                jsx += f'\n                  <div className="p-4 bg-gray-800 rounded-lg mt-4">'
                jsx += f'\n                    <h5 className="text-xl font-semibold text-white mb-3">{para}</h5>'
                jsx += '\n                    <div className="overflow-x-auto">'
                jsx += '\n                      <table className="min-w-full border border-gray-600 text-sm">'
                jsx += '\n                        <thead>'
                jsx += '\n                          <tr className="bg-gray-700">'
                jsx += '\n                            <th className="border border-gray-600 px-4 py-2 text-left">Data Lake</th>'
                jsx += '\n                            <th className="border border-gray-600 px-4 py-2 text-left">Data Warehouse</th>'
                jsx += '\n                            <th className="border border-gray-600 px-4 py-2 text-left">Data Lakehouse</th>'
                jsx += '\n                          </tr>'
                jsx += '\n                        </thead>'
                jsx += '\n                        <tbody>'
                
                # Get next 3 rows
                for j in range(3):
                    if i + 1 + j < len(content):
                        row_data = content[i + 1 + j].strip()
                        if row_data:
                            jsx += '\n                          <tr>'
                            jsx += f'\n                            <td className="border border-gray-600 px-4 py-2">{row_data}</td>'
                            if i + 2 + j < len(content):
                                jsx += f'\n                            <td className="border border-gray-600 px-4 py-2">{content[i + 2 + j].strip()}</td>'
                            else:
                                jsx += '\n                            <td className="border border-gray-600 px-4 py-2"></td>'
                            if i + 3 + j < len(content):
                                jsx += f'\n                            <td className="border border-gray-600 px-4 py-2">{content[i + 3 + j].strip()}</td>'
                            else:
                                jsx += '\n                            <td className="border border-gray-600 px-4 py-2"></td>'
                            jsx += '\n                          </tr>'
                i += 4
                jsx += '\n                        </tbody>'
                jsx += '\n                      </table>'
                jsx += '\n                    </div>'
                jsx += '\n                  </div>'
                continue
        
        # Check for bullet points
        if para.startswith('✅') or para.startswith('💰') or para.startswith('💸'):
            # Split multiple checkmarks
            items = para.split('✅')
            for item in items:
                if item.strip():
                    jsx += f'\n                  <p className="text-gray-300">✅ {item.strip()}</p>'
        elif para.startswith('Key ideas:') or para.startswith('Key components:'):
            jsx += f'\n                  <h5 className="text-xl font-semibold text-white mt-4 mb-2">{para}</h5>'
        elif para.startswith('-') or para.startswith('•'):
            jsx += f'\n                  <li className="ml-4">{para[1:].strip()}</li>'
        elif len(para) < 100 and para.endswith(':'):
            jsx += f'\n                  <h5 className="text-xl font-semibold text-white mt-4 mb-2">{para}</h5>'
        elif para.startswith('┌') or para.startswith('│') or para.startswith('└'):
            # ASCII art - use pre tag
            if 'pre' not in jsx_content[-1] if jsx_content else True:
                jsx += '\n                  <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm font-mono">'
            jsx += f'\n{para}'
        else:
            jsx += f'\n                  <p className="text-gray-300">{para}</p>'
        
        i += 1
    
    # Add subsections
    for sub_name, sub_content in subsections.items():
        if sub_name in ['Feature', 'Description', 'Stage', 'Function', 'Output', 'Aspect']:
            continue
        
        sub_id = f"{section_id}-{sub_name.lower().replace(' ', '-').replace('?', '').replace(':', '').replace('(', '').replace(')', '').replace('/', '-')}"
        jsx += f'\n                  <div id="{sub_id}" className="mt-6">'
        jsx += f'\n                    <h5 className="text-xl font-semibold text-white mb-3">{sub_name}</h5>'
        
        for para in sub_content:
            if para and len(para.strip()) > 0 and para != sub_name:
                if para.startswith('✅'):
                    jsx += f'\n                      <p className="text-gray-300">{para}</p>'
                elif para.startswith('-') or para.startswith('•'):
                    jsx += f'\n                      <li className="ml-4">{para[1:].strip()}</li>'
                elif len(para) < 100 and ':' in para and not para.endswith('.'):
                    jsx += f'\n                      <h6 className="text-lg font-semibold text-white mt-3 mb-2">{para}</h6>'
                else:
                    jsx += f'\n                      <p className="text-gray-300">{para}</p>'
        
        jsx += '\n                  </div>'
    
    jsx += '\n                </div>'
    jsx += '\n              </div>'
    
    jsx_content.append(jsx)

# Save to file
with open('lakehouse_jsx_sections.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(jsx_content))

print(f"Generated {len(jsx_content)} sections")
print("Content saved to: lakehouse_jsx_sections.txt")

