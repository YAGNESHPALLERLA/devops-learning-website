import re

# Read the file
with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix Archive section - add images after the table
archive_pattern = r'(<td className="border border-gray-600 px-4 py-2">Long-term backups, compliance storage</td>\s*</tr>\s*</tbody>\s*</table>\s*</div>\s*</div>\s*</section>\s*\)\})'
archive_replacement = r'<td className="border border-gray-600 px-4 py-2">Long-term backups, compliance storage</td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n            <ImageGallery images={getImages(\'image34\', \'image35\', \'image36\', \'image37\', \'image62\', \'image63\', \'image64\', \'image65\')} />\n          </div>\n        </section>\n        )}'

content = re.sub(archive_pattern, archive_replacement, content, flags=re.MULTILINE)

# Fix ADLS section - split the images correctly
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

# Fix "Azure Storage provides four main types" - add images
types_pattern = r'(<p className="text-gray-300 mb-4">Azure Storage provides <strong>four main types of services</strong> under one <strong>Storage Account</strong>\.</p>\s*<div className="space-y-6">)'
types_replacement = r'''<p className="text-gray-300 mb-4">Azure Storage provides <strong>four main types of services</strong> under one <strong>Storage Account</strong>.</p>
            
            <ImageGallery images={getImages('image19', 'image45')} />
            
            <div className="space-y-6">'''

content = re.sub(types_pattern, types_replacement, content, flags=re.MULTILINE)

# Fix "Go to your Storage Account" - add images
storage_account_pattern = r'(<li>Go to your <strong>Storage Account</strong></li>\s*<li>Under <strong>Data storage</strong>, click <strong>Containers</strong>)'
storage_account_replacement = r'''<li>Go to your <strong>Storage Account</strong></li>
              </ol>

              <ImageGallery images={getImages('image20', 'image46')} />

              <ol className="list-decimal list-inside space-y-3 ml-2 mt-6">
                <li>Under <strong>Data storage</strong>, click <strong>Containers</strong>'''

content = re.sub(storage_account_pattern, storage_account_replacement, content, flags=re.MULTILINE)

# Write the file
with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed remaining Azure Basics image mappings!")

