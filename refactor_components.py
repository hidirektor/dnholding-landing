import os
import glob
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Replace /${lang}/ with /
    content = re.sub(r'`/\$\{lang\}', r'`', content)
    content = re.sub(r'href=\{`/\$\{lang\}\}`', r'href={`/`}', content)
    
    with open(filepath, 'w') as f:
        f.write(content)

for filepath in glob.glob('/Users/hidirektor/WebstormProjects/dnholding-landing/src/**/*.tsx', recursive=True):
    print(f"Processing {filepath}")
    process_file(filepath)
