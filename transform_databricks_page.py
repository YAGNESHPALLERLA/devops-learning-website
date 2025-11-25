#!/usr/bin/env python3
"""
Transform Azure Databricks page to show only active subsection.
Each sidebar item should display only its content when clicked.
"""

import re

def transform_page():
    with open('src/app/tutorials/azure-data-engineer/azure-databricks/page.tsx', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all subsection div patterns and their line positions
    # Pattern: <div id="subsection-id" className="bg-[#1a1a1a]
    subsection_pattern = r'<div id="([a-z0-9-]+)" className="bg-\[#1a1a1a\]'
    
    # Find all matches with their positions
    matches = list(re.finditer(subsection_pattern, content))
    
    print(f"Found {len(matches)} subsection divs")
    for m in matches:
        print(f"  - {m.group(1)} at position {m.start()}")
    
    # The transformation approach:
    # 1. Close the Introduction section after its content (before databricks-architecture)
    # 2. Wrap each subsequent subsection in its own conditional block
    
    # First, let's identify the structure
    # The file has:
    # - {activeSubsection === 'introduction-to-azure-databricks' && ( ... containing all azure-databricks subsections
    # - {activeSection === 'databricks-sql' && ( ... containing all sql subsections
    # - {activeSection === 'azure-databricks-1' && ( ... containing all data engineering subsections
    # - {activeSection === 'data-lakehouse' && ( ... containing all lakehouse subsections
    
    # We need to change each subsection to have its own conditional
    
    # For now, let's just output what needs to be done
    return content

if __name__ == '__main__':
    transform_page()
