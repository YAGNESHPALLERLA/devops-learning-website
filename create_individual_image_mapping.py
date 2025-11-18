import json
import os
import shutil

# Read the image mappings
with open('image_mappings_by_section.json', 'r', encoding='utf-8') as f:
    image_mappings = json.load(f)

# Read final mapping to understand current structure
with open('final_image_mapping.json', 'r', encoding='utf-8') as f:
    final_mapping = json.load(f)

print("=== Creating Individual Image Mapping for Each Step ===\n")

# Create mapping for individual images to be used directly
individual_mapping = {}

# How to Create Azure Databricks - each step should have its own image
how_to_create_steps = [
    ("Go to the Azure portal and search for Databricks", "image1.png"),
    ("Click on create", "image2.png"),
    ("Create databricks", "image3.png"),
    ("Subscription", "image4.png"),
    ("Resource Group", "image5.png"),
    ("Workspace Name", "image6.png"),
    ("Region", "image7.png"),
    ("Pricing Tier", "image7.png"),  # Same image for region and pricing
    ("Managed Resource Group Name", "image8.png"),
    ("Final Step – Review + Create", "image8.png"),  # Same image
]

# Databricks Workspace Overview
workspace_overview_images = ["image6.png", "image9.png", "image10.png"]

# Workspace Features
workspace_images = ["image11.png", "image12.png", "image13.png", "image14.png", "image15.png", "image16.png", "image17.png"]

# Notebook
notebook_images = ["image12.png", "image13.png", "image18.png", "image19.png"]

# Catalog
catalog_images = ["image20.png", "image21.png"]

# Jobs & Pipelines
jobs_images = ["image22.png"]

# Compute
compute_images = ["image23.png"]

# Marketplace
marketplace_images = ["image24.png"]

# SQL Editor
sql_editor_images = ["image25.png", "image31.png"]

# Queries
queries_images = ["image26.png"]

# Dashboards
dashboards_images = ["image27.png", "image28.png"]

# Alerts
alerts_images = ["image29.png"]

# Query History
query_history_images = ["image30.png"]

# SQL Warehouse
sql_warehouse_images = ["image31.png"]

print("=== Image Distribution by Section ===\n")
print(f"How to Create: {len(how_to_create_steps)} steps with images")
print(f"Workspace Overview: {len(workspace_overview_images)} images")
print(f"Workspace Features: {len(workspace_images)} images")
print(f"Notebook: {len(notebook_images)} images")
print(f"Catalog: {len(catalog_images)} images")
print(f"Jobs & Pipelines: {len(jobs_images)} images")
print(f"Compute: {len(compute_images)} images")
print(f"Marketplace: {len(marketplace_images)} images")
print(f"SQL Editor: {len(sql_editor_images)} images")
print(f"Queries: {len(queries_images)} images")
print(f"Dashboards: {len(dashboards_images)} images")
print(f"Alerts: {len(alerts_images)} images")
print(f"Query History: {len(query_history_images)} images")
print(f"SQL Warehouse: {len(sql_warehouse_images)} images")

# Save mapping
mapping_data = {
    "how_to_create": how_to_create_steps,
    "workspace_overview": workspace_overview_images,
    "workspace_features": workspace_images,
    "notebook": notebook_images,
    "catalog": catalog_images,
    "jobs_pipelines": jobs_images,
    "compute": compute_images,
    "marketplace": marketplace_images,
    "sql_editor": sql_editor_images,
    "queries": queries_images,
    "dashboards": dashboards_images,
    "alerts": alerts_images,
    "query_history": query_history_images,
    "sql_warehouse": sql_warehouse_images
}

with open('individual_image_mapping.json', 'w', encoding='utf-8') as f:
    json.dump(mapping_data, f, indent=2, ensure_ascii=False)

print("\nMapping saved to individual_image_mapping.json")

