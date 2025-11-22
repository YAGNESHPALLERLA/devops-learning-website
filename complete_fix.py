import re

# Read the file
with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix 1: Add image16, image17
content = content.replace(
    "<ImageGallery images={getImages('image16')} />",
    "<ImageGallery images={getImages('image16', 'image17')} />"
)

# Fix 2: Add image19, image45 after "Azure Storage provides four main types"
content = re.sub(
    r'(<p className="text-gray-300 mb-4">Azure Storage provides <strong>four main types of services</strong> under one <strong>Storage Account</strong>\.</p>\s*<div className="space-y-6">)',
    r'<p className="text-gray-300 mb-4">Azure Storage provides <strong>four main types of services</strong> under one <strong>Storage Account</strong>.</p>\n            \n            <ImageGallery images={getImages(\'image19\', \'image45\')} />\n            \n            <div className="space-y-6">',
    content,
    flags=re.MULTILINE
)

# Fix 3: Add image20, image46 after "Go to your Storage Account"
content = re.sub(
    r'(<li>Go to your <strong>Storage Account</strong></li>\s*<li>Under <strong>Data storage</strong>, click <strong>Containers</strong>)',
    r'<li>Go to your <strong>Storage Account</strong></li>\n              </ol>\n\n              <ImageGallery images={getImages(\'image20\', \'image46\')} />\n\n              <ol className="list-decimal list-inside space-y-3 ml-2 mt-6">\n                <li>Under <strong>Data storage</strong>, click <strong>Containers</strong>',
    content,
    flags=re.MULTILINE
)

# Fix 4: Fix "Click Create" section
content = content.replace(
    "<ImageGallery images={getImages('image18', 'image19', 'image20')} />",
    "<ImageGallery images={getImages('image18')} />\n\n              <ImageGallery images={getImages('image21', 'image22', 'image47', 'image48')} />"
)

# Fix 5: Fix "Change the access tier"
content = content.replace(
    "<ImageGallery images={getImages('image21', 'image22', 'image23', 'image24', 'image25', 'image26', 'image27')} />",
    "<ImageGallery images={getImages('image23', 'image24', 'image25', 'image26', 'image27', 'image28', 'image29', 'image49', 'image50', 'image51', 'image52', 'image53', 'image54', 'image55', 'image56', 'image57')} />"
)

# Fix 6: Add Archive images
content = content.replace(
    "</table>\n            </div>\n\n            <ImageGallery images={getImages('image53')} />",
    "</table>\n            </div>\n\n            <ImageGallery images={getImages('image34', 'image35', 'image36', 'image37', 'image62', 'image63', 'image64', 'image65')} />"
)

# Fix 7: Fix ADLS section
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

print("Fixed all remaining image mappings!")

