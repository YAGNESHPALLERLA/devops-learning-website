# Encoding Issues Found in azure-basics/page.tsx

## Corrupted Character Patterns

The file contains corrupted characters from the original Word document. These need to be manually fixed:

### 1. Numbered List Items in Headings
- Pattern: `(\d)n+G` (e.g., "1n+G", "2n+G", "3n+G")
- Should be: `\1. ` (e.g., "1. ", "2. ", "3. ")
- Example: `"1n+G Subscription"` → `"1. Subscription"`

### 2. Bullet Points
- Pattern: `=` at start of text lines
- Should be: `→` or `•`
- Example: `"= You selected"` → `"→ You selected"`

### 3. Number Ranges
- Pattern: `(\d)G(\d)` (e.g., "3G24")
- Should be: `\1-\2` (e.g., "3-24")
- Example: `"3G24 characters"` → `"3-24 characters"`

### 4. Em Dashes
- Pattern: `G` in text (not in "Gen2")
- Should be: `—` or `-`
- Example: `"folders G all"` → `"folders — all"`

### 5. Other Patterns
- `=Ʀ` → `→`
- `=ƺ` → `→`
- `=\+` → `→`
- `GŦn+` → `→`

## Important Note

**DO NOT** automatically replace `=` everywhere, as it's used in JSX attributes like `className="..."`. Only replace `=` when it appears in text content, not in JSX syntax.

## Recommendation

1. Use Find & Replace in your editor
2. Replace patterns one at a time
3. Review each replacement to ensure JSX syntax isn't broken
4. Test the file after each batch of replacements

