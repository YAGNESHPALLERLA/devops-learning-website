#!/usr/bin/env python3
"""
Rebuild Azure Basics page to match Databricks page style
- Proper section structure with subsections
- Clean text with no corruption
- Images properly placed
- Same structure and styling as Databricks page
"""
import json
import re
import os

extract_file = 'azure_basics_rebuild_data.json'
page_file = 'src/app/tutorials/azure-data-engineer/azure-basics/page.tsx'

print("=== Rebuilding Azure Basics like Databricks ===\n")

# Load extracted content
with open(extract_file, 'r', encoding='utf-8') as f:
    content = json.load(f)

print(f"Loaded {len(content)} content items\n")

def fix_text_corruption(text):
    """Fix all text corruption patterns"""
    if not text:
        return ""
    # Fix word corruptions
    text = re.sub(r'G+roups', 'Groups', text, flags=re.IGNORECASE)
    text = re.sub(r'roups\b', 'Groups', text)
    text = text.replace('Maagemet', 'Management')
    text = text.replace('maagemet', 'management')
    text = text.replace('paret', 'parent')
    text = text.replace('etire', 'entire')
    text = text.replace('eviromet', 'environment')
    text = text.replace('maage', 'manage')
    text = text.replace('orgaize', 'organize')
    text = text.replace('orgaizatio', 'organization')
    text = text.replace('departmets', 'departments')
    text = text.replace('divisios', 'divisions')
    text = text.replace('Fiace', 'Finance')
    text = text.replace('Marketig', 'Marketing')
    text = text.replace('Imagie', 'Imagine')
    text = text.replace('compay', 'company')
    text = text.replace('subscriptios', 'subscriptions')
    text = text.replace('cotaier', 'container')
    text = text.replace('defie', 'define')
    text = text.replace('limit\'s', 'limits')
    text = text.replace('billig', 'billing')
    text = text.replace('differet', 'different')
    text = text.replace('website', 'website')
    text = text.replace('Iside', 'Inside')
    text = text.replace('subscriptio', 'subscription')
    text = text.replace('lifecycle', 'lifecycle')
    text = text.replace('permissios', 'permissions')
    text = text.replace('buildig', 'building')
    text = text.replace('everythig', 'everything')
    text = text.replace('accouts', 'accounts')
    text = text.replace('machies', 'machines')
    text = text.replace('idividual', 'individual')
    text = text.replace('happes', 'happens')
    text = text.replace('buildig', 'building')
    text = text.replace('ru', 'run')
    text = text.replace('storig', 'storing')
    text = text.replace('cotaiers', 'containers')
    text = text.replace('maage', 'manage')
    # Fix apostrophes
    text = text.replace("Azure's", "Azure's")
    text = text.replace("you'll", "you'll")
    text = text.replace("won't", "won't")
    text = text.replace("don't", "don't")
    text = text.replace("can't", "can't")
    # Remove corrupted characters
    text = re.sub(r'[—\-]+', '-', text)  # Fix em dashes
    return text.strip()

# Organize content into proper sections like Databricks
sections_data = {
    'azure-basics': {
        'title': 'Azure Basics',
        'subsections': []
    },
    'resource-group': {
        'title': 'Resource Group',
        'subsections': []
    },
    'azure-blob-storage': {
        'title': 'Azure Blob Storage',
        'subsections': []
    },
    'azure-data-lake': {
        'title': 'Azure Data Lake Storage Gen2',
        'subsections': []
    }
}

# Process content and organize
current_section = None
current_subsection = None
subsection_items = []

for item in content:
    text = fix_text_corruption(item.get('text', '').strip())
    images = item.get('images', []) or []
    if item.get('new_image'):
        images.append(item.get('new_image'))
    
    # Determine section
    if 'Azure hierarchy' in text or 'Management Groups' in text:
        current_section = 'azure-basics'
        if 'Azure hierarchy' in text:
            current_subsection = 'azure-hierarchy'
            subsection_items = []
    elif 'Resource Group' in text and current_section != 'resource-group':
        if current_subsection and subsection_items:
            sections_data[current_section]['subsections'].append({
                'id': current_subsection,
                'title': current_subsection.replace('-', ' ').title(),
                'items': subsection_items
            })
        current_section = 'resource-group'
        current_subsection = 'resource-group-overview'
        subsection_items = []
    elif 'Blob Storage' in text and current_section != 'azure-blob-storage':
        if current_subsection and subsection_items:
            sections_data[current_section]['subsections'].append({
                'id': current_subsection,
                'title': current_subsection.replace('-', ' ').title(),
                'items': subsection_items
            })
        current_section = 'azure-blob-storage'
        current_subsection = 'blob-storage-overview'
        subsection_items = []
    elif 'Data Lake' in text and current_section != 'azure-data-lake':
        if current_subsection and subsection_items:
            sections_data[current_section]['subsections'].append({
                'id': current_subsection,
                'title': current_subsection.replace('-', ' ').title(),
                'items': subsection_items
            })
        current_section = 'azure-data-lake'
        current_subsection = 'data-lake-overview'
        subsection_items = []
    
    if text or images:
        subsection_items.append({
            'text': text,
            'images': images,
            'is_heading': item.get('is_heading', False),
            'level': item.get('level', 0)
        })

# Add last subsection
if current_subsection and subsection_items:
    sections_data[current_section]['subsections'].append({
        'id': current_subsection,
        'title': current_subsection.replace('-', ' ').title(),
        'items': subsection_items
    })

print("Organized sections:")
for section_id, section_data in sections_data.items():
    print(f"  {section_id}: {len(section_data['subsections'])} subsections")

# Get all images and create mapping
all_images = set()
for item in content:
    if item.get('new_image'):
        all_images.add(item.get('new_image'))
    all_images.update(item.get('images', []))

# Map image-01.png -> image1 format
image_mapping = {}
for img in sorted(all_images):
    if img.startswith('image-'):
        num = img.replace('image-', '').replace('.png', '')
        new_key = f"image{int(num)}"
        image_mapping[img] = new_key
    else:
        # Already in correct format
        image_mapping[img] = img.replace('.png', '')

print(f"\nFound {len(all_images)} images")
print(f"Created {len(image_mapping)} image mappings\n")

# Now generate the page like Databricks
page_lines = []

# Header (same as Databricks)
page_lines.append("'use client';")
page_lines.append("")
page_lines.append("import TechLayout from '@/components/tech-layout';")
page_lines.append("import { useState, useEffect } from 'react';")
page_lines.append("import Image from 'next/image';")
page_lines.append("")
page_lines.append("type GalleryImage = {")
page_lines.append("  src: string;")
page_lines.append("  alt: string;")
page_lines.append("  width: number;")
page_lines.append("  height: number;")
page_lines.append("  caption?: string;")
page_lines.append("};")
page_lines.append("")
page_lines.append("const ImageGallery = ({ images }: { images: GalleryImage[] }) => {")
page_lines.append("  if (!images.length) return null;")
page_lines.append("")
page_lines.append("  return (")
page_lines.append("    <div className=\"flex flex-col gap-8 mt-8\">")
page_lines.append("      {images.map((image, index) => (")
page_lines.append("        <figure")
page_lines.append("          key={`${image.src}-${index}`}")
page_lines.append("          className=\"overflow-hidden rounded-2xl border border-gray-600 bg-white shadow-lg shadow-blue-500/10 transition hover:shadow-blue-500/25\"")
page_lines.append("        >")
page_lines.append("          <Image")
page_lines.append("            src={image.src}")
page_lines.append("            alt={image.alt}")
page_lines.append("            width={image.width}")
page_lines.append("            height={image.height}")
page_lines.append("            loading=\"lazy\"")
page_lines.append("            sizes=\"(min-width: 1280px) 100vw, (min-width: 768px) 100vw, 100vw\"")
page_lines.append("            className=\"h-auto w-full object-contain bg-white\"")
page_lines.append("          />")
page_lines.append("          {image.caption && (")
page_lines.append("            <figcaption className=\"border-t border-gray-300 px-4 py-3 text-sm text-gray-700\">")
page_lines.append("              {image.caption}")
page_lines.append("            </figcaption>")
page_lines.append("          )}")
page_lines.append("        </figure>")
page_lines.append("      ))}")
page_lines.append("    </div>")
page_lines.append("  );")
page_lines.append("};")
page_lines.append("")

# Generate image definitions - use image1, image2 format (like Databricks)
page_lines.append("const azureImages: Record<string, GalleryImage> = {")
image_counter = 1
for img in sorted(all_images):
    if img.startswith('image-'):
        num = int(img.replace('image-', '').replace('.png', ''))
        key = f"image{num}"
        # Map to actual file (image-01.png -> image1.png after rename)
        src_path = f"/tutorials/azure/images/image{num}.png"
    else:
        key = img.replace('.png', '')
        src_path = f"/tutorials/azure/images/{img}"
    
    page_lines.append(f"  {key}: {{ src: '{src_path}', width: 1920, height: 1080, alt: 'Azure Basics {key}' }},")
    image_counter += 1

page_lines.append("};")
page_lines.append("")
page_lines.append("const getImages = (...keys: (keyof typeof azureImages)[]): GalleryImage[] =>")
page_lines.append("  keys.map(key => azureImages[key]).filter(Boolean);")
page_lines.append("")

# PAGE_HEADINGS
page_lines.append("const PAGE_HEADINGS = [")
page_lines.append("  { id: 'azure-basics', title: 'Azure Basics' },")
page_lines.append("  { id: 'resource-group', title: 'Resource Group' },")
page_lines.append("  { id: 'azure-blob-storage', title: 'Azure Blob Storage' },")
page_lines.append("  { id: 'azure-data-lake', title: 'Azure Data Lake Storage Gen2' }")
page_lines.append("];")
page_lines.append("")

# SUBSECTION_PARENT
page_lines.append("const SUBSECTION_PARENT: Record<string, string> = {")
page_lines.append("  'azure-hierarchy': 'azure-basics',")
page_lines.append("  'resource-group-overview': 'resource-group',")
page_lines.append("  'blob-storage-overview': 'azure-blob-storage',")
page_lines.append("  'data-lake-overview': 'azure-data-lake'")
page_lines.append("};")
page_lines.append("")

# createModuleNavigationItems function (like Databricks)
page_lines.append("const createModuleNavigationItems = (): Array<{ id: string; title: string; href: string; icon?: string; children?: Array<{ id: string; title: string; href: string }> }> => {")
page_lines.append("  const basePath = '/tutorials/azure-data-engineer/azure-basics';")
page_lines.append("  const subsectionTitles: Record<string, string> = {")
page_lines.append("    'azure-hierarchy': 'Azure Hierarchy',")
page_lines.append("    'resource-group-overview': 'Resource Group Overview',")
page_lines.append("    'blob-storage-overview': 'Blob Storage Overview',")
page_lines.append("    'data-lake-overview': 'Data Lake Overview'")
page_lines.append("  };")
page_lines.append("")
page_lines.append("  const moduleSections = PAGE_HEADINGS.map(heading => {")
page_lines.append("    const subsections = Object.entries(SUBSECTION_PARENT)")
page_lines.append("      .filter(([_, parent]) => parent === heading.id)")
page_lines.append("      .map(([subsectionId, _]) => ({")
page_lines.append("        id: subsectionId,")
page_lines.append("        title: subsectionTitles[subsectionId] || subsectionId,")
page_lines.append("        href: `${basePath}#${subsectionId}`")
page_lines.append("      }));")
page_lines.append("")
page_lines.append("    return {")
page_lines.append("      id: heading.id,")
page_lines.append("      title: heading.title,")
page_lines.append("      href: `${basePath}#${heading.id}`,")
page_lines.append("      icon: heading.id === 'azure-basics' ? '📘' : undefined,")
page_lines.append("      children: subsections.length > 0 ? subsections : undefined")
page_lines.append("    };")
page_lines.append("  });")
page_lines.append("")
page_lines.append("  return moduleSections;")
page_lines.append("};")
page_lines.append("")

# Component function (same structure as Databricks)
page_lines.append("export default function AzureDataEngineerPage() {")
page_lines.append("  const [activeSection, setActiveSection] = useState('azure-basics');")
page_lines.append("  const [activeSubsection, setActiveSubsection] = useState<string | null>(null);")
page_lines.append("  const pageHeadings = PAGE_HEADINGS;")
page_lines.append("")
page_lines.append("  const handleSetActiveSection = (sectionId: string) => {")
page_lines.append("    if (PAGE_HEADINGS.some(heading => heading.id === sectionId)) {")
page_lines.append("      setActiveSection(sectionId);")
page_lines.append("      setActiveSubsection(null);")
page_lines.append("      window.history.replaceState(null, '', `#${sectionId}`);")
page_lines.append("    } else {")
page_lines.append("      const parentSection = SUBSECTION_PARENT[sectionId] || 'azure-basics';")
page_lines.append("      setActiveSection(parentSection);")
page_lines.append("      setActiveSubsection(sectionId);")
page_lines.append("      window.history.replaceState(null, '', `#${sectionId}`);")
page_lines.append("    }")
page_lines.append("  };")
page_lines.append("")
page_lines.append("  useEffect(() => {")
page_lines.append("    const handleHashChange = () => {")
page_lines.append("      const hash = window.location.hash.slice(1);")
page_lines.append("      if (!hash) {")
page_lines.append("        setActiveSection('azure-basics');")
page_lines.append("        setActiveSubsection(null);")
page_lines.append("        return;")
page_lines.append("      }")
page_lines.append("")
page_lines.append("      if (PAGE_HEADINGS.some(heading => heading.id === hash)) {")
page_lines.append("        setActiveSection(hash);")
page_lines.append("        setActiveSubsection(null);")
page_lines.append("      } else {")
page_lines.append("        const parentSection = SUBSECTION_PARENT[hash] || 'azure-basics';")
page_lines.append("        setActiveSection(parentSection);")
page_lines.append("        setActiveSubsection(hash);")
page_lines.append("      }")
page_lines.append("    };")
page_lines.append("")
page_lines.append("    handleHashChange();")
page_lines.append("    window.addEventListener('hashchange', handleHashChange);")
page_lines.append("    return () => {")
page_lines.append("      window.removeEventListener('hashchange', handleHashChange);")
page_lines.append("    };")
page_lines.append("  }, []);")
page_lines.append("")
page_lines.append("  useEffect(() => {")
page_lines.append("    if (activeSection) {")
page_lines.append("      setTimeout(() => {")
page_lines.append("        const element = document.getElementById(activeSection);")
page_lines.append("        if (element) {")
page_lines.append("          element.scrollIntoView({ behavior: 'smooth', block: 'start' });")
page_lines.append("        } else if (activeSubsection) {")
page_lines.append("          const subElement = document.getElementById(activeSubsection);")
page_lines.append("          if (subElement) {")
page_lines.append("            subElement.scrollIntoView({ behavior: 'smooth', block: 'start' });")
page_lines.append("          }")
page_lines.append("        }")
page_lines.append("      }, 150);")
page_lines.append("    }")
page_lines.append("  }, [activeSection, activeSubsection]);")
page_lines.append("")
page_lines.append("  const getCurrentSectionIndex = () => {")
page_lines.append("    return PAGE_HEADINGS.findIndex(heading => heading.id === activeSection);")
page_lines.append("  };")
page_lines.append("")
page_lines.append("  const goToNextSection = () => {")
page_lines.append("    const currentIndex = getCurrentSectionIndex();")
page_lines.append("    if (currentIndex < PAGE_HEADINGS.length - 1) {")
page_lines.append("      const nextSection = PAGE_HEADINGS[currentIndex + 1];")
page_lines.append("      handleSetActiveSection(nextSection.id);")
page_lines.append("    }")
page_lines.append("  };")
page_lines.append("")
page_lines.append("  const goToPreviousSection = () => {")
page_lines.append("    const currentIndex = getCurrentSectionIndex();")
page_lines.append("    if (currentIndex > 0) {")
page_lines.append("      const prevSection = PAGE_HEADINGS[currentIndex - 1];")
page_lines.append("      handleSetActiveSection(prevSection.id);")
page_lines.append("    }")
page_lines.append("  };")
page_lines.append("")
page_lines.append("  const currentIndex = getCurrentSectionIndex();")
page_lines.append("  const hasNext = currentIndex < PAGE_HEADINGS.length - 1;")
page_lines.append("  const hasPrevious = currentIndex > 0;")
page_lines.append("")
page_lines.append("  return (")
page_lines.append("    <TechLayout")
page_lines.append("      technology=\"azure-data-engineer\"")
page_lines.append("      onThisPage={pageHeadings}")
page_lines.append("      activeSection={activeSection}")
page_lines.append("      setActiveSection={handleSetActiveSection}")
page_lines.append("      activeSubsection={activeSubsection}")
page_lines.append("      setActiveSubsection={setActiveSubsection}")
page_lines.append("      customNavigationItems={createModuleNavigationItems()}")
page_lines.append("    >")
page_lines.append("      <div className=\"min-h-screen\">")
page_lines.append("        <div className=\"text-center mb-16\">")
page_lines.append("          <div className=\"inline-block mb-6 px-6 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full border border-blue-500/30\">")
page_lines.append("            <span className=\"text-blue-400 font-semibold flex items-center justify-center space-x-2\">")
page_lines.append("              <svg className=\"w-5 h-5\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">")
page_lines.append("                <path d=\"M13.482 18.394l6.625-3.844v7.688l-6.625-3.844zm7.875-10.463L12.606 2.65l-.096.056v7.694l8.849 5.138V7.93zm-9.481 5.138l-8.85-5.138L11.48 2.65l.096.056v10.462zm-.962 1.287L2.643 8.738v7.693l6.691 3.845v-7.688z\" fill=\"#0078D4\"/>")
page_lines.append("              </svg>")
page_lines.append("              <span>Azure Data Engineer</span>")
page_lines.append("            </span>")
page_lines.append("          </div>")
page_lines.append("          <h1 className=\"text-5xl font-bold text-white mb-4\">")
page_lines.append("            Azure Basics <span className=\"text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500\">Module</span>")
page_lines.append("          </h1>")
page_lines.append("          <p className=\"text-gray-400 text-xl\">Learn the fundamentals of Azure cloud infrastructure and services</p>")
page_lines.append("        </div>")
page_lines.append("")

# Generate sections (like Databricks structure)
def generate_subsection_jsx(subsection):
    """Generate JSX for a subsection"""
    lines = []
    items = subsection['items']
    
    for item in items:
        text = item.get('text', '').strip()
        images = item.get('images', [])
        is_heading = item.get('is_heading', False)
        level = item.get('level', 0)
        
        if is_heading and text:
            if level <= 1:
                lines.append(f'              <h4 className="text-2xl font-semibold text-white mb-4">{text}</h4>')
            elif level == 2:
                lines.append(f'              <h5 className="text-xl font-semibold text-white mb-3">{text}</h5>')
            elif level == 3:
                lines.append(f'              <h6 className="text-lg font-semibold text-white mb-2">{text}</h6>')
        
        if text and not is_heading:
            # Format text with proper JSX
            formatted = text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
            # Convert markdown-style formatting
            formatted = re.sub(r'\*\*(.+?)\*\*', r'<strong className="text-blue-400">\1</strong>', formatted)
            formatted = re.sub(r'`(.+?)`', r'<code className="bg-gray-800 px-2 py-1 rounded">\1</code>', formatted)
            lines.append(f'              <p className="text-gray-300">{formatted}</p>')
        
        if images:
            img_keys = []
            for img in images:
                if img in image_mapping:
                    img_keys.append(f"'{image_mapping[img]}'")
            if img_keys:
                lines.append(f'              <ImageGallery images={{getImages({", ".join(img_keys)})}} />')
    
    return '\n'.join(lines)

# Generate sections
for section_id, section_info in sections_data.items():
    page_lines.append(f"        {{activeSection === '{section_id}' && (")
    page_lines.append(f"        <section")
    page_lines.append(f"          id=\"{section_id}\"")
    page_lines.append(f"          className=\"bg-[#252525] rounded-xl p-8 border border-gray-600 scroll-mt-24 mb-20\"")
    page_lines.append(f"        >")
    page_lines.append(f"          <h3 className=\"text-3xl font-bold text-white mb-6\">{section_info['title']}</h3>")
    page_lines.append(f"          <div className=\"space-y-12\">")
    
    for subsection in section_info['subsections']:
        page_lines.append(f"            <div id=\"{subsection['id']}\" className=\"bg-[#1a1a1a] rounded-lg p-6 border border-gray-700 scroll-mt-24\">")
        page_lines.append(f"              <h4 className=\"text-2xl font-semibold text-white mb-4\">{subsection['title']}</h4>")
        page_lines.append(f"              <div className=\"space-y-4 text-gray-300\">")
        
        jsx_content = generate_subsection_jsx(subsection)
        for line in jsx_content.split('\n'):
            if line.strip():
                page_lines.append(line)
        
        page_lines.append(f"              </div>")
        page_lines.append(f"            </div>")
    
    page_lines.append(f"          </div>")
    page_lines.append(f"        </section>")
    page_lines.append(f"        )}}")

# Navigation buttons
page_lines.append("")
page_lines.append("        <div className=\"flex justify-between items-center mt-12 pt-8 border-t border-gray-700\">")
page_lines.append("          <button")
page_lines.append("            onClick={goToPreviousSection}")
page_lines.append("            disabled={!hasPrevious}")
page_lines.append("            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${")
page_lines.append("              hasPrevious")
page_lines.append("                ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 hover:border-gray-500'")
page_lines.append("                : 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed'")
page_lines.append("            }`}")
page_lines.append("          >")
page_lines.append("            <svg className=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">")
page_lines.append("              <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M15 19l-7-7 7-7\" />")
page_lines.append("            </svg>")
page_lines.append("            <span>Previous</span>")
page_lines.append("            {hasPrevious && (")
page_lines.append("              <span className=\"text-sm text-gray-400\">")
page_lines.append("                {PAGE_HEADINGS[currentIndex - 1]?.title}")
page_lines.append("              </span>")
page_lines.append("            )}")
page_lines.append("          </button>")
page_lines.append("")
page_lines.append("          <div className=\"text-sm text-gray-400\">")
page_lines.append("            {currentIndex + 1} of {PAGE_HEADINGS.length}")
page_lines.append("          </div>")
page_lines.append("")
page_lines.append("          <button")
page_lines.append("            onClick={goToNextSection}")
page_lines.append("            disabled={!hasNext}")
page_lines.append("            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${")
page_lines.append("              hasNext")
page_lines.append("                ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 hover:border-gray-500'")
page_lines.append("                : 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed'")
page_lines.append("            }`}")
page_lines.append("          >")
page_lines.append("            <span>Next</span>")
page_lines.append("            {hasNext && (")
page_lines.append("              <span className=\"text-sm text-gray-400\">")
page_lines.append("                {PAGE_HEADINGS[currentIndex + 1]?.title}")
page_lines.append("              </span>")
page_lines.append("            )}")
page_lines.append("            <svg className=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">")
page_lines.append("              <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M9 5l7 7-7 7\" />")
page_lines.append("            </svg>")
page_lines.append("          </button>")
page_lines.append("        </div>")
page_lines.append("      </div>")
page_lines.append("    </TechLayout>")
page_lines.append("  );")
page_lines.append("}")

# Write file
with open(page_file, 'w', encoding='utf-8') as f:
    f.write('\n'.join(page_lines))

print(f"✓ Generated page.tsx")
print(f"✓ Total lines: {len(page_lines)}")
print(f"✓ Sections: {len(sections_data)}")
print(f"✓ Images: {len(all_images)}")
print(f"\nFile saved to: {page_file}")

