#!/usr/bin/env python3
"""
Transform all subsections in Azure Databricks page to be independent sections.
"""

import re

def transform_page():
    with open('src/app/tutorials/azure-data-engineer/azure-databricks/page.tsx', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Subsections to transform (id, title)
    # These are the ones that still have the old pattern
    subsections_to_transform = [
        ('common-use-cases', 'Common Use Cases'),
        ('core-components', 'Core Components'),
        ('advantages', 'Advantages'),
        ('how-to-create', 'How to Create Azure Databricks'),
        ('workspace-overview', 'Workspace Overview'),
        ('databricks-features', 'Databricks Features'),
        ('sql-editor', 'SQL Editor'),
        ('queries', 'Queries'),
        ('dashboards', 'Dashboards'),
        ('genie', 'Genie'),
        ('alerts', 'Alerts'),
        ('query-history', 'Query History'),
        ('sql-data-warehouse', 'SQL Data Warehouse'),
        ('jobs-runs', "Jobs Run's"),
        ('data-ingestion', 'Data Ingestion'),
        ('ai-ml', 'AI/ML'),
        ('playground', 'Playground'),
        ('experiments', 'Experiments'),
        ('features', 'Features'),
        ('models', 'Models'),
        ('serving', 'Serving'),
        ('notebook-level-features', 'Notebook-level Features'),
        ('file-level-features', 'File-level Features'),
        ('edit-level-features', 'Edit Level Features'),
        ('view-level-features', 'View Level Features'),
        ('run-level-features', 'Run-level Features'),
        ('help-level-features', 'Help-level Features'),
        ('language-level-features', 'Language-level Features'),
        ('others-features', 'Others Features'),
        ('what-is-data-lakehouse', 'What is a Data Lakehouse?'),
        ('why-need-lakehouse', 'Why the Need for a Lakehouse?'),
        ('core-features-lakehouse', 'Core Features of a Data Lakehouse'),
        ('benefits-lakehouse', 'Benefits of a Data Lakehouse'),
        ('lakehouse-on-databricks', 'Data Lakehouse on Azure Databricks'),
        ('example-use-cases', 'Example Use Cases'),
        ('lakehouse-vs-lake-vs-warehouse', 'Lakehouse vs Data Lake vs Data Warehouse'),
        ('capabilities-databricks-lakehouse', 'Capabilities of Databricks Lakehouse'),
        ('lakehouse-architecture', 'Data Lakehouse Architecture'),
    ]
    
    for sub_id, title in subsections_to_transform:
        # Pattern to find the subsection div with style display
        old_pattern = rf'''            \{{/\* {re.escape(title.replace("'", ""))}[^*]*\*/\}}\s*<div id="{sub_id}" className="bg-\[#1a1a1a\][^"]*" style=\{{\{{ display: activeSection === '{sub_id}' \? 'block' : 'none' \}}\}}>\s*<h4 className="text-2xl font-semibold text-white mb-4">[^<]*</h4>'''
        
        # Check if pattern exists
        if re.search(old_pattern, content):
            new_pattern = f'''          </div>
        </section>
        )}}

        {{/* {title} */}}
        {{activeSection === '{sub_id}' && (
        <section
          id="{sub_id}"
          className="bg-[#252525] rounded-xl p-8 border border-gray-600 scroll-mt-24 mb-20"
        >
          <h3 className="text-3xl font-bold text-white mb-6">{title}</h3>
          <div className="space-y-12">
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">'''
            
            content = re.sub(old_pattern, new_pattern, content, count=1)
            print(f"Transformed: {sub_id}")
        else:
            # Try a simpler pattern
            simple_pattern = rf'<div id="{sub_id}" className="bg-\[#1a1a1a\][^"]*"[^>]*>'
            match = re.search(simple_pattern, content)
            if match:
                print(f"Found with simple pattern: {sub_id} at position {match.start()}")
            else:
                print(f"NOT FOUND: {sub_id}")
    
    # Write the transformed content
    with open('src/app/tutorials/azure-data-engineer/azure-databricks/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("\nTransformation complete!")

if __name__ == '__main__':
    transform_page()

