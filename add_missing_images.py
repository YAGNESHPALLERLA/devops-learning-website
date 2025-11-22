import re

# Read the file
with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix 1: Add image16, image17 after "Check for the Storage Account" in Blob Storage section
content = content.replace(
    "<ImageGallery images={getImages('image44')} />",
    "<ImageGallery images={getImages('image16', 'image17')} />",
    1  # Only replace the first occurrence (Blob Storage section)
)

# Fix 2: Add image18, image21, image22, image47, image48 after "Click Create"
# Find the "Click Create" in Explore Blob Service section
content = re.sub(
    r'(<li>Click <strong>Create</strong></li>\s*</ol>\s*<ImageGallery images=\{getImages\(\'image40\', \'image41\', \'image42\', \'image43\', \'image44\', \'image45\'\)\} />)',
    r'<li>Click <strong>Create</strong></li>\n              </ol>\n\n              <ImageGallery images={getImages(\'image18\')} />\n\n              <ImageGallery images={getImages(\'image21\', \'image22\', \'image47\', \'image48\')} />',
    content,
    flags=re.MULTILINE
)

# Fix 3: Fix "Change the access tier" section - add image23-29, image49-57
content = re.sub(
    r'(<li>Change the <strong>access tier</strong></li>\s*</ul>\s*</div>\s*<ImageGallery images=\{getImages\(\'image46\', \'image47\', \'image48\', \'image49\', \'image50\', \'image51\'\)\} />)',
    r'<li>Change the <strong>access tier</strong></li>\n                </ul>\n\n                <ImageGallery images={getImages(\'image23\', \'image24\', \'image25\', \'image26\', \'image27\', \'image28\', \'image29\', \'image49\', \'image50\', \'image51\', \'image52\', \'image53\', \'image54\', \'image55\', \'image56\', \'image57\')} />\n              </div>',
    content,
    flags=re.MULTILINE
)

# Fix 4: Replace image52 with Archive images (image34-37, image62-65)
content = content.replace(
    "<ImageGallery images={getImages('image52')} />",
    "<ImageGallery images={getImages('image34', 'image35', 'image36', 'image37', 'image62', 'image63', 'image64', 'image65')} />"
)

# Fix 5: Remove duplicate image53 (should be in access tier section)
content = content.replace(
    "</table>\n            </div>\n\n            <ImageGallery images={getImages('image53')} />",
    "</table>\n            </div>"
)

# Fix 6: Fix ADLS section - add image38 after "In the search bar"
adls_pattern = r'(<li>In the search bar, type "Storage Accounts" or "ADLS Gen2"</li>\s*<li>Click on storage accounts and click on create button</li>\s*<li>Fill required details</li>\s*</ol>\s*<div className="mt-6 space-y-3">)'
adls_replacement = r'''<li>In the search bar, type "Storage Accounts" or "ADLS Gen2"</li>
              </ol>

              <ImageGallery images={getImages('image38')} />

              <ol className="list-decimal list-inside space-y-3 ml-2 mt-6">
                <li>Click on storage accounts and click on create button</li>
              </ol>

              <ImageGallery images={getImages('image39')} />

              <ol className="list-decimal list-inside space-y-3 ml-2 mt-6">
                <li>Fill required details</li>
              </ol>

              <ImageGallery images={getImages('image40', 'image41', 'image42', 'image43')} />

              <div className="mt-6 space-y-3">'''
content = re.sub(adls_pattern, adls_replacement, content, flags=re.MULTILINE)

# Fix 7: Fix ADLS check section - should have image44
adls_check_pattern = r'(<p className="text-green-400">If it appears there.*?</p>\s*</div>\s*<ImageGallery images=\{getImages\(\'image33\', \'image34\', \'image35\', \'image36\', \'image37\', \'image38\'\)\} />)'
adls_check_replacement = r'''<p className="text-green-400">If it appears there, = congratulations — your ADLS Gen2 Storage account has been successfully created</p>
              </div>

              <ImageGallery images={getImages('image44')} />'''
content = re.sub(adls_check_pattern, adls_check_replacement, content, flags=re.MULTILINE | re.DOTALL)

# Write the file
with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Added all missing images!")

