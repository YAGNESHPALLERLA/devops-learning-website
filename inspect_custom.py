import json
with open('databricks_1_sections.json', encoding='utf-8') as f:
    data = json.load(f)
for section, info in data.items():
    for para in info['paragraphs']:
        if 'Custom model training' in para:
            print(para)
