import re
import json

# Read correct mappings
with open('correct_azure_basics_mapping.json', 'r', encoding='utf-8') as f:
    mapping = json.load(f)

# Read the file
with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Build ordered list of all images
all_images = []
for section_key, images in mapping.items():
    for img_data in images:
        all_images.append({
            'image': img_data['image_name'],
            'section': section_key,
            'paragraph': img_data['paragraph_index']
        })
all_images.sort(key=lambda x: x['paragraph'])

print(f"Total images to place: {len(all_images)}")

# Fix 1: Split image1-6
content = content.replace(
    '<p><strong className="text-blue-400">Example:</strong> Imagine a company with multiple divisions, like Finance, IT, and Marketing. You could have separate management groups for each of these divisions.</p>\n                  </div>\n                </div>',
    '<p><strong className="text-blue-400">Example:</strong> Imagine a company with multiple divisions, like Finance, IT, and Marketing. You could have separate management groups for each of these divisions.</p>\n                  </div>\n                  <ImageGallery images={getImages(\'image1\', \'image2\')} />\n                </div>'
)

content = content.replace(
    '<p><strong className="text-blue-400">Example:</strong> If your company has different projects, like a website and an app, you could create separate subscriptions for them. One for the website, one for the app.</p>\n                  </div>\n                </div>',
    '<p><strong className="text-blue-400">Example:</strong> If your company has different projects, like a website and an app, you could create separate subscriptions for them. One for the website, one for the app.</p>\n                  </div>\n                  <ImageGallery images={getImages(\'image3\', \'image4\', \'image5\', \'image6\')} />\n                </div>'
)

content = content.replace(
    '<ImageGallery images={getImages(\'image1\', \'image2\', \'image3\', \'image4\', \'image5\', \'image6\')} />',
    ''
)

# Fix 2: Resource Group images
content = content.replace(
    '<ImageGallery images={getImages(\'image5\')} />',
    '<ImageGallery images={getImages(\'image7\')} />'
)

content = content.replace(
    '<ImageGallery images={getImages(\'image7\', \'image8\', \'image9\', \'image10\', \'image6\')} />',
    '<ImageGallery images={getImages(\'image8\', \'image9\', \'image10\', \'image11\', \'image12\')} />'
)

# Fix 3: Blob Storage creation
content = content.replace(
    '<ImageGallery images={getImages(\'image11\', \'image12\', \'image13\')} />',
    '<ImageGallery images={getImages(\'image13\')} />'
)

# Fix 4: Check for Storage Account
content = content.replace(
    '<ImageGallery images={getImages(\'image16\')} />',
    '<ImageGallery images={getImages(\'image16\', \'image17\')} />'
)

# Fix 5: Add image19, image45 after "Azure Storage provides four main types"
content = re.sub(
    r'(<p className="text-gray-300 mb-4">Azure Storage provides <strong>four main types of services</strong> under one <strong>Storage Account</strong>\.</p>\s*<div className="space-y-6">)',
    r'<p className="text-gray-300 mb-4">Azure Storage provides <strong>four main types of services</strong> under one <strong>Storage Account</strong>.</p>\n            \n            <ImageGallery images={getImages(\'image19\', \'image45\')} />\n            \n            <div className="space-y-6">',
    content,
    flags=re.MULTILINE
)

# Fix 6: Add image20, image46 after "Go to your Storage Account"
content = re.sub(
    r'(<li>Go to your <strong>Storage Account</strong></li>\s*<li>Under <strong>Data storage</strong>, click <strong>Containers</strong>)',
    r'<li>Go to your <strong>Storage Account</strong></li>\n              </ol>\n\n              <ImageGallery images={getImages(\'image20\', \'image46\')} />\n\n              <ol className="list-decimal list-inside space-y-3 ml-2 mt-6">\n                <li>Under <strong>Data storage</strong>, click <strong>Containers</strong>',
    content,
    flags=re.MULTILINE
)

# Fix 7: Fix "Click Create" section - add image18, then image21, image22, image47, image48
content = re.sub(
    r'(<li>Click <strong>Create</strong></li>\s*</ol>\s*<ImageGallery images=\{getImages\(\'image18\', \'image19\', \'image20\'\)\} />)',
    r'<li>Click <strong>Create</strong></li>\n              </ol>\n\n              <ImageGallery images={getImages(\'image18\')} />\n\n              <ImageGallery images={getImages(\'image21\', \'image22\', \'image47\', \'image48\')} />',
    content,
    flags=re.MULTILINE
)

# Fix 8: Fix "Change the access tier" - add image23-29, image49-57
content = re.sub(
    r'(<li>Change the <strong>access tier</strong></li>\s*</ul>\s*</div>\s*<ImageGallery images=\{getImages\(\'image21\', \'image22\', \'image23\', \'image24\', \'image25\', \'image26\', \'image27\'\)\} />)',
    r'<li>Change the <strong>access tier</strong></li>\n                </ul>\n\n                <ImageGallery images={getImages(\'image23\', \'image24\', \'image25\', \'image26\', \'image27\', \'image28\', \'image29\', \'image49\', \'image50\', \'image51\', \'image52\', \'image53\', \'image54\', \'image55\', \'image56\', \'image57\')} />\n              </div>',
    content,
    flags=re.MULTILINE
)

# Fix 9: Add images for "Types of Blob Types"
content = re.sub(
    r'(<h4 className="text-2xl font-semibold text-white mb-4">Types of Blob Types</h4>\s*<div className="overflow-x-auto mb-6">)',
    r'<h4 className="text-2xl font-semibold text-white mb-4">Types of Blob Types</h4>\n            <ImageGallery images={getImages(\'image30\', \'image31\', \'image32\', \'image33\', \'image58\', \'image59\', \'image60\', \'image61\')} />\n            <div className="overflow-x-auto mb-6">',
    content,
    flags=re.MULTILINE
)

# Fix 10: Add images for Archive section
archive_match = re.search(
    r'(<td className="border border-gray-600 px-4 py-2"><strong>Archive</strong>.*?Long-term backups, compliance storage</td>\s*</tr>\s*</tbody>\s*</table>\s*</div>\s*</div>\s*</section>)',
    content,
    re.DOTALL
)
if archive_match:
    archive_text = archive_match.group(1)
    new_archive_text = archive_text.replace(
        '</table>\n            </div>\n          </div>\n        </section>',
        '</table>\n            </div>\n            <ImageGallery images={getImages(\'image34\', \'image35\', \'image36\', \'image37\', \'image62\', \'image63\', \'image64\', \'image65\')} />\n          </div>\n        </section>'
    )
    content = content.replace(archive_text, new_archive_text)

# Fix 11: Fix ADLS section
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

# Fix encoding issues - ONLY in text content, not in JSX
# Fix numbered list items: "1n+G" -> "1. " (but only in text, not in code)
def fix_numbered_lists(text):
    # Only replace in text content, not in JSX attributes or code blocks
    lines = text.split('\n')
    result = []
    in_jsx_attr = False
    for line in lines:
        if 'className=' in line or 'images={' in line or 'getImages' in line:
            result.append(line)
            continue
        # Fix numbered lists
        line = re.sub(r'(\d+)n\+G', r'\1. ', line)
        result.append(line)
    return '\n'.join(result)

content = fix_numbered_lists(content)

# Fix number ranges: "3G24" -> "3-24" (but preserve "Gen2")
content = re.sub(r'(\d+)G(?!en2)(\d+)', r'\1-\2', content)

# Fix em dashes: "G" -> "—" (but preserve "Gen2")
content = re.sub(r'G(?!en2)', '—', content)

# Fix specific corrupted patterns in text only
content = re.sub(r'=Ʀ', '', content)
content = re.sub(r'=ƺ', '→', content)
content = re.sub(r'=\+', '→', content)
content = re.sub(r'GŦn\+', '—', content)
content = re.sub(r'GP', '➕', content)

# Write the file
with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed all image mappings and encoding issues!")

