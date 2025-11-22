# Image Mapping Fixes Summary

## Issues Found in Azure Basics Page

### 1. Duplicate Images (Lines 607, 617)
- **Issue**: image14 and image15 appear twice
- **Fix**: Remove duplicates at lines 607 and 617

### 2. Image 16-18 Placement (Lines 690-717)
- **Issue**: Duplicate text section, image16/image17 in wrong place, image18 placement
- **Fix**: 
  - Remove duplicate "Navigate to Your Resource Group" section
  - Place image16, image17 after "Click on create"
  - Place image18 after "Check for the Storage Account"

### 3. Missing Images for "Types of Blob Types" Section
- **Issue**: Images 30-33, 58-61 are missing
- **Fix**: Add after the table in "Types of Blob Types" section (around line 1043)

### 4. Missing Images for "Archive" Section  
- **Issue**: Images 34-37, 62-65 are missing
- **Fix**: Add after the table in "Types of Access Tiers" section (around line 1089)

### 5. ADLS Section Images (Lines 1135-1155)
- **Issue**: Wrong images (image33-38) used, should be image38, image39, image40-43, image44
- **Fix**: Replace with correct images in correct order

### 6. ADLS "Explore Datalake Service" Section (Line 1255)
- **Issue**: Wrong images (image40-45), should be image40-43 only, image44 should be separate
- **Fix**: Split images correctly

## Expected Image Order from Document

### Azure Hierarchy:
- image1, image2 → After "1. Management Groups" text
- image3, image4, image5, image6 → After "2. Subscriptions" text

### Resource Group:
- image7 → After "In the search menu, search for Resource groups"
- image8, image9, image10, image11, image12 → After "Click on the resource group and click on the create button"

### Azure Blob Storage:
- image13 → After "In the search bar, type 'Storage Accounts' or 'blob'"
- image14 → After "Click on storage accounts and click on create button"
- image15 → After "Click 'Review + Create'"
- image16, image17 → After "Click on create"
- image18 → After "Check for the Storage Account"
- image19, image45 → After "Azure Storage provides four main types..."
- image20, image46 → After "Go to your Storage Account"
- image21, image22, image47, image48 → After "Click Create"
- image23-29, image49-57 → After "Change the access tier"
- image30-33, image58-61 → After "Types of Blob Types"
- image34-37, image62-65 → After "Archive"

### ADLS:
- image38 → After "In the search bar, type 'Storage Accounts' or 'ADLS Gen2'"
- image39 → After "Click on storage accounts and click on create button"
- image40-43 → After "Fill required details"
- image44 → After "Check for the Storage Account"

