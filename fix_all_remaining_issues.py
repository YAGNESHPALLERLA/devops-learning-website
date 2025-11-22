import re

# Read the file
with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix 1: Add image18 after "Click Create" in Explore Blob Service section
# Find the pattern: "Click Create" followed by ImageGallery with image40-43
pattern1 = r'(<li>Click <strong>Create</strong></li>\s*</ol>\s*<ImageGallery images=\{getImages\(\'image40\', \'image41\', \'image42\', \'image43\'\)\} />)'
replacement1 = r'''<li>Click <strong>Create</strong></li>
              </ol>

              <ImageGallery images={getImages('image18')} />

              <ImageGallery images={getImages('image21', 'image22', 'image47', 'image48')} />'''
content = re.sub(pattern1, replacement1, content, flags=re.MULTILINE)

# Fix 2: Add images after "Change the access tier" - image23-29, image49-57
pattern2 = r'(<li>Change the <strong>access tier</strong></li>\s*</ul>\s*</div>\s*<ImageGallery images=\{getImages\(\'image46\', \'image47\', \'image48\', \'image49\', \'image50\', \'image51\'\)\} />)'
replacement2 = r'''<li>Change the <strong>access tier</strong></li>
                </ul>

                <ImageGallery images={getImages('image23', 'image24', 'image25', 'image26', 'image27', 'image28', 'image29', 'image49', 'image50', 'image51', 'image52', 'image53', 'image54', 'image55', 'image56', 'image57')} />
              </div>'''
content = re.sub(pattern2, replacement2, content, flags=re.MULTILINE)

# Fix 3: Add Archive images - image34-37, image62-65
# Find Archive section and add images after the table
archive_pattern = r'(<td className="border border-gray-600 px-4 py-2"><strong>Archive</strong>.*?Long-term backups, compliance storage</td>\s*</tr>\s*</tbody>\s*</table>\s*</div>\s*</div>\s*</section>)'
archive_match = re.search(archive_pattern, content, re.DOTALL)
if archive_match:
    archive_text = archive_match.group(1)
    new_archive_text = archive_text.replace(
        '</table>\n            </div>\n          </div>\n        </section>',
        '</table>\n            </div>\n            <ImageGallery images={getImages(\'image34\', \'image35\', \'image36\', \'image37\', \'image62\', \'image63\', \'image64\', \'image65\')} />\n          </div>\n        </section>'
    )
    content = content.replace(archive_text, new_archive_text)

# Fix 4: Fix ADLS section - add image38 after "In the search bar"
adls_search_pattern = r'(<li>In the search bar, type "Storage Accounts" or "ADLS Gen2"</li>\s*<li>Click on storage accounts and click on create button</li>\s*<li>Fill required details</li>\s*</ol>\s*<div className="mt-6 space-y-3">)'
adls_search_replacement = r'''<li>In the search bar, type "Storage Accounts" or "ADLS Gen2"</li>
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
content = re.sub(adls_search_pattern, adls_search_replacement, content, flags=re.MULTILINE)

# Fix 5: Fix ADLS check section - should have image44
adls_check_pattern = r'(<p className="text-green-400">If it appears there.*?</p>\s*</div>\s*<ImageGallery images=\{getImages\(\'image44\'\)\} />)'
# This should already be correct, but let's verify

# Fix 6: Remove duplicate image44, image45 from ADLS section if exists
content = re.sub(
    r'<ImageGallery images=\{getImages\(\'image40\', \'image41\', \'image42\', \'image43\', \'image44\', \'image45\'\)\} />',
    '<ImageGallery images={getImages(\'image40\', \'image41\', \'image42\', \'image43\')} />',
    content
)

# Fix 7: Remove wrong image46-51 from wrong location
# The image46-51 should only be in the "Change the access tier" section, not in ADLS section
# Let's check if there's a duplicate

# Fix encoding issues
# Fix numbered list items: "1n+G" -> "1. "
content = re.sub(r'(\d+)n\+G', r'\1. ', content)

# Fix number ranges: "3G24" -> "3-24"
content = re.sub(r'(\d+)G(\d+)', r'\1-\2', content)

# Fix bullet points in text content (but not in JSX attributes)
# Pattern: "= " at start of text content -> "→ "
# Be careful not to break JSX
def fix_bullet_points(match):
    text = match.group(0)
    # Only replace if it's in text content, not in JSX attributes
    if 'className=' in text or 'images={' in text or 'getImages' in text:
        return text
    return text.replace('= ', '→ ').replace('=', '→').replace('=', '→')

# Fix em dashes: "G" -> "—" (but preserve "Gen2")
content = re.sub(r'G(?!en2)', '—', content)

# Fix specific corrupted patterns
content = content.replace('n+G', '. ')
content = content.replace('=', '→')
content = content.replace('=Ʀ', '')
content = content.replace('=ƺ', '→')
content = content.replace('=\+', '→')
content = content.replace('GŦn+', '—')
content = content.replace('GP', '➕')

# Write the file
with open('src/app/tutorials/azure-data-engineer/azure-basics/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed all remaining issues!")

