import os
import re

replacements = {
    '/faaliyet-alanlari': '/business-areas',
    '/grup-sirketleri': '/companies',
    '/hakkimizda': '/about',
    '/iletisim': '/contact',
    '/medya': '/media',
    '/projeler': '/projects',
    '/urunler': '/products'
}

files_to_update = [
    'src/app/contact/page.tsx',
    'src/app/products/page.tsx',
    'src/app/projects/page.tsx',
    'src/app/projects/[slug]/page.tsx',
    'src/app/about/page.tsx',
    'src/app/dictionaries/tr.json',
    'src/app/business-areas/page.tsx',
    'src/app/page.tsx',
    'src/app/companies/page.tsx',
    'src/app/companies/[slug]/page.tsx',
    'src/app/media/page.tsx',
    'src/app/media/[slug]/page.tsx',
    'src/components/layout/Footer.tsx',
    'src/components/layout/Header.tsx',
    'src/components/content/CompanyCard.tsx',
    'src/components/content/NewsCard.tsx',
    'src/components/content/ProjectCard.tsx'
]

for filepath in files_to_update:
    if not os.path.exists(filepath):
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    for old, new in replacements.items():
        new_content = new_content.replace(old, new)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

print("All replacements done.")
