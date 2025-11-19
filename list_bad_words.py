from pathlib import Path
path = Path('src/app/tutorials/azure-data-engineer/azure-databricks/page.tsx')
text = path.read_text(encoding='utf-8')
start = text.index('        {/* Data Engineering Section */}')
end = text.index('        {/* Notebook-level features - Main Heading */}', start)
block = text[start:end]
words = set()
for word in block.split():
    if '\ufffd' in word:
        words.add(word)
print('count', len(words))
for w in sorted(words):
    print(w)
