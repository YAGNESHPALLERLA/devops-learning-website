import re

# Read the file
with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix 1: Split image1-6 into correct sections
# image1-2 should be after Management Groups
# image3-6 should be after Subscriptions
content = content.replace(
    '<p><strong className="text-blue-400">Example:</strong> Imagine a company with multiple divisions, like Finance, IT, and Marketing. You could have separate management groups for each of these divisions.</p>\n                  </div>\n                </div>',
    '<p><strong className="text-blue-400">Example:</strong> Imagine a company with multiple divisions, like Finance, IT, and Marketing. You could have separate management groups for each of these divisions.</p>\n                  </div>\n                  <ImageGallery images={getImages(\'image1\', \'image2\')} />\n                </div>'
)

content = content.replace(
    '<p><strong className="text-blue-400">Example:</strong> If your company has different projects, like a website and an app, you could create separate subscriptions for them. One for the website, one for the app.</p>\n                  </div>\n                </div>',
    '<p><strong className="text-blue-400">Example:</strong> If your company has different projects, like a website and an app, you could create separate subscriptions for them. One for the website, one for the app.</p>\n                  </div>\n                  <ImageGallery images={getImages(\'image3\', \'image4\', \'image5\', \'image6\')} />\n                </div>'
)

# Remove the old combined ImageGallery
content = content.replace(
    '<ImageGallery images={getImages(\'image1\', \'image2\', \'image3\', \'image4\', \'image5\', \'image6\')} />',
    ''
)

# Fix 2: Fix Resource Group section images
# image7 should be after "In the search menu, search for Resource groups"
# image8-12 should be after "Click on the resource group and click on the create button"
content = content.replace(
    '<ImageGallery images={getImages(\'image5\')} />',
    '<ImageGallery images={getImages(\'image7\')} />'
)

content = content.replace(
    '<ImageGallery images={getImages(\'image7\', \'image8\', \'image9\', \'image10\', \'image6\')} />',
    '<ImageGallery images={getImages(\'image8\', \'image9\', \'image10\', \'image11\', \'image12\')} />'
)

# Fix 3: Fix Blob Storage creation images
# image13 after "In the search bar, type"
# image14 after "Click on storage accounts"
# image15 after "Click Review + Create"
content = content.replace(
    '<ImageGallery images={getImages(\'image11\', \'image12\', \'image13\')} />',
    '<ImageGallery images={getImages(\'image13\')} />'
)

# Add image14 and image15 in correct places (they're already there, just need to verify order)

# Fix 4: Fix "Check for Storage Account" - should have image16, image17
content = content.replace(
    '<ImageGallery images={getImages(\'image16\')} />',
    '<ImageGallery images={getImages(\'image16\', \'image17\')} />'
)

# Fix 5: Add image19, image45 after "Azure Storage provides four main types"
content = content.replace(
    '<p className="text-gray-300 mb-4">Azure Storage provides <strong>four main types of services</strong> under one <strong>Storage Account</strong>.</p>\n            \n            <div className="space-y-6">',
    '<p className="text-gray-300 mb-4">Azure Storage provides <strong>four main types of services</strong> under one <strong>Storage Account</strong>.</p>\n            \n            <ImageGallery images={getImages(\'image19\', \'image45\')} />\n            \n            <div className="space-y-6">'
)

# Fix 6: Fix "Go to your Storage Account" - should have image20, image46
content = content.replace(
    '<li>Go to your <strong>Storage Account</strong></li>\n                <li>Under <strong>Data storage</strong>, click <strong>Containers</strong>',
    '<li>Go to your <strong>Storage Account</strong></li>\n              </ol>\n\n              <ImageGallery images={getImages(\'image20\', \'image46\')} />\n\n              <ol className="list-decimal list-inside space-y-3 ml-2 mt-6">\n                <li>Under <strong>Data storage</strong>, click <strong>Containers</strong>'
)

# Fix 7: Fix "Click Create" - should have image18, then image21, image22, image47, image48
content = content.replace(
    '<ImageGallery images={getImages(\'image18\', \'image19\', \'image20\')} />',
    '<ImageGallery images={getImages(\'image18\')} />\n\n              <ImageGallery images={getImages(\'image21\', \'image22\', \'image47\', \'image48\')} />'
)

# Fix 8: Fix "Change the access tier" - should have image23-29, image49-57
content = content.replace(
    '<ImageGallery images={getImages(\'image21\', \'image22\', \'image23\', \'image24\', \'image25\', \'image26\', \'image27\')} />',
    '<ImageGallery images={getImages(\'image23\', \'image24\', \'image25\', \'image26\', \'image27\', \'image28\', \'image29\', \'image49\', \'image50\', \'image51\', \'image52\', \'image53\', \'image54\', \'image55\', \'image56\', \'image57\')} />'
)

# Fix 9: Add images for "Types of Blob Types" - image30-33, image58-61
content = content.replace(
    '<h4 className="text-2xl font-semibold text-white mb-4">Types of Blob Types</h4>\n            <div className="overflow-x-auto mb-6">',
    '<h4 className="text-2xl font-semibold text-white mb-4">Types of Blob Types</h4>\n            <ImageGallery images={getImages(\'image30\', \'image31\', \'image32\', \'image33\', \'image58\', \'image59\', \'image60\', \'image61\')} />\n            <div className="overflow-x-auto mb-6">'
)

# Fix 10: Add images for "Archive" section - image34-37, image62-65
# Find the Archive row in the table and add images after the table
archive_match = re.search(r'(<td className="border border-gray-600 px-4 py-2"><strong>Archive</strong>.*?</tr>\s*</tbody>\s*</table>\s*</div>\s*</div>\s*</section>)', content, re.DOTALL)
if archive_match:
    # Add images before closing the section
    archive_section = archive_match.group(1)
    new_archive_section = archive_section.replace(
        '</table>\n            </div>\n          </div>\n        </section>',
        '</table>\n            </div>\n            <ImageGallery images={getImages(\'image34\', \'image35\', \'image36\', \'image37\', \'image62\', \'image63\', \'image64\', \'image65\')} />\n          </div>\n        </section>'
    )
    content = content.replace(archive_section, new_archive_section)

# Fix 11: Fix ADLS section images
# image38 after "In the search bar, type"
# image39 after "Click on storage accounts"
# image40-43 after "Fill required details"
# image44 after "Check for the Storage Account"
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

# Fix ADLS check section
adls_check_pattern = r'(<p className="text-green-400">If it appears there.*?</p>\s*</div>\s*<ImageGallery images=\{getImages\(\'image33\', \'image34\', \'image35\', \'image36\', \'image37\', \'image38\'\)\} />)'
adls_check_replacement = r'''<p className="text-green-400">If it appears there, = congratulations — your ADLS Gen2 Storage account has been successfully created</p>
              </div>

              <ImageGallery images={getImages('image44')} />'''

content = re.sub(adls_check_pattern, adls_check_replacement, content, flags=re.MULTILINE | re.DOTALL)

# Write the file
with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed all Azure Basics image mappings!")

