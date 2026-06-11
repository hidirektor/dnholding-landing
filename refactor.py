import os
import glob
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Skip files that don't look like our pages
    if "export default async function " not in content:
        return

    # Replace dictionaries import
    content = re.sub(
        r'import \{ ?getDictionary.*?\} from "(\.\./)+dictionaries";',
        'import { getDictionary, getCurrentLocale } from "@/app/dictionaries";',
        content
    )

    # Replace notFound import and check
    content = re.sub(r'import \{ ?notFound ?\} from "next/navigation";\n?', '', content)
    content = re.sub(r'if \(!hasLocale\(lang\)\) notFound\(\);\n?', '', content)

    # Remove params from component props and params destructuring
    # e.g., export default async function AboutPage({ params, }: { params: Promise<{ lang: string; slug?: string }>; })
    content = re.sub(
        r'export default async function ([a-zA-Z0-9_]+)\(\{\s*params,?\s*\}\s*:\s*\{\s*params:\s*Promise<\{[^\}]+\}>\s*;?\s*\}\)',
        r'export default async function \1({ params }: { params: Promise<{ slug: string }> })',
        content
    )
    
    # If no slug is expected, just make it ()
    content = re.sub(
        r'export default async function ([a-zA-Z0-9_]+)\(\{ params \}: \{ params: Promise<\{ slug: string \}> \}\)',
        lambda m: f"export default async function {m.group(1)}({{ params }}: {{ params: Promise<{{ slug: string }}> }})" if "slug" in content else f"export default async function {m.group(1)}()",
        content
    )

    # For page functions that just have lang
    content = re.sub(
        r'export default async function ([a-zA-Z0-9_]+)\(\{\s*params\s*\}\s*:\s*\{\s*params:\s*Promise<\{ lang: string \}>\s*\}\)',
        r'export default async function \1()',
        content
    )

    # Handle the inside of the function
    # const { lang } = await params; -> const lang = await getCurrentLocale();
    content = re.sub(
        r'const \{ lang \} = await params;',
        'const lang = await getCurrentLocale();',
        content
    )
    # const { lang, slug } = await params; -> const { slug } = await params; const lang = await getCurrentLocale();
    content = re.sub(
        r'const \{ lang, slug \} = await params;',
        'const { slug } = await params;\n  const lang = await getCurrentLocale();',
        content
    )

    # const dict = await getDictionary(lang as Locale); -> const dict = await getDictionary();
    content = re.sub(
        r'const dict = await getDictionary\(.*?\);',
        'const dict = await getDictionary();',
        content
    )
    
    # const locale = lang as Locale; -> const locale = lang;
    content = re.sub(
        r'const locale = lang as Locale;',
        'const locale = lang;',
        content
    )

    # Replace Metadata params
    content = re.sub(
        r'export async function generateMetadata\(\{.*?\}\s*:\s*\{.*?\}\)',
        'export async function generateMetadata({ params }: { params: Promise<{ slug: string }> })',
        content,
        flags=re.DOTALL
    )
    content = re.sub(
        r'export async function generateMetadata\(\{\s*params\s*\}\s*:\s*\{\s*params:\s*Promise<\{ slug: string \}>\s*\}\)',
        lambda m: m.group(0) if "slug" in content else "export async function generateMetadata()",
        content
    )

    # Fix hrefs
    content = re.sub(r'href=\{`/\$\{lang\}', r'href={`', content)
    content = re.sub(r'href="\/tr\/', r'href="/', content)
    content = re.sub(r'href="\/en\/', r'href="/', content)

    # Fix generic metadata title/description
    # We might need to manually fix metadata functions inside the files
    
    with open(filepath, 'w') as f:
        f.write(content)

for filepath in glob.glob('/Users/hidirektor/WebstormProjects/dnholding-landing/src/app/**/*.tsx', recursive=True):
    if 'layout.tsx' not in filepath and 'page.tsx' in filepath:
        if '/page.tsx' in filepath and 'src/app/page.tsx' != filepath:
            print(f"Processing {filepath}")
            process_file(filepath)
