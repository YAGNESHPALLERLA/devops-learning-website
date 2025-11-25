#!/usr/bin/env python3
"""
Transform Azure Databricks page to show only active subsection.
"""

import re

def transform_page():
    with open('src/app/tutorials/azure-data-engineer/azure-databricks/page.tsx', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Subsections with their titles
    subsections = {
        'core-components': 'Core Components',
        'advantages': 'Advantages',
        'how-to-create': 'How to Create Azure Databricks',
        'workspace-overview': 'Workspace Overview',
        'databricks-features': 'Databricks Features',
        'sql-editor': 'SQL Editor',
        'queries': 'Queries',
        'dashboards': 'Dashboards',
        'genie': 'Genie',
        'alerts': 'Alerts',
        'query-history': 'Query History',
        'sql-data-warehouse': 'SQL Data Warehouse',
        'data-engineering': 'Data Engineering',
        'jobs-runs': "Jobs Run's",
        'data-ingestion': 'Data Ingestion',
        'ai-ml': 'AI/ML',
        'playground': 'Playground',
        'experiments': 'Experiments',
        'features': 'Features',
        'models': 'Models',
        'serving': 'Serving',
        'notebook-level-features': 'Notebook-level Features',
        'file-level-features': 'File-level Features',
        'edit-level-features': 'Edit Level Features',
        'view-level-features': 'View Level Features',
        'run-level-features': 'Run-level Features',
        'help-level-features': 'Help-level Features',
        'language-level-features': 'Language-level Features',
        'others-features': 'Others Features',
        'data-lakehouse-intro': 'Data Lakehouse',
        'what-is-data-lakehouse': 'What is a Data Lakehouse?',
        'why-need-lakehouse': 'Why the Need for a Lakehouse?',
        'core-features-lakehouse': 'Core Features',
        'benefits-lakehouse': 'Benefits',
        'lakehouse-on-databricks': 'Lakehouse on Databricks',
        'example-use-cases': 'Example Use Cases',
        'lakehouse-vs-lake-vs-warehouse': 'Comparison',
        'capabilities-databricks-lakehouse': 'Capabilities',
        'lakehouse-architecture': 'Architecture',
    }
    
    # Transform each subsection div into its own conditional section
    # Pattern: find <div id="subsection-id" className="bg-[#1a1a1a]
    # Replace with section closing + new conditional section opening
    
    for sub_id, title in subsections.items():
        # Pattern to find the subsection div comment and opening
        pattern = rf'''(\{{/\* [^*]* \*/\}}\s*)?<div id="{sub_id}" className="bg-\[#1a1a1a\][^>]*>'''
        
        # Find if this pattern exists
        match = re.search(pattern, content)
        if match:
            # Create the replacement - close previous section, open new conditional
            replacement = f'''          </div>
        </section>
        )}}

        {{/* {title} */}}
        {{activeSubsection === '{sub_id}' && (
        <section
          id="{sub_id}"
          className="bg-[#252525] rounded-xl p-8 border border-gray-600 scroll-mt-24 mb-20"
        >
          <h3 className="text-3xl font-bold text-white mb-6">{title}</h3>
          <div className="space-y-12">
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24">'''
            
            content = re.sub(pattern, replacement, content, count=1)
            print(f"Transformed: {sub_id}")
        else:
            print(f"Not found: {sub_id}")
    
    # Write the transformed content
    with open('src/app/tutorials/azure-data-engineer/azure-databricks/page.tsx', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("\nTransformation complete!")

if __name__ == '__main__':
    transform_page()
