// ──────────────────────────────────────────────────────────────
// DN Holding — Navigation Structure
// ──────────────────────────────────────────────────────────────

export interface NavItem {
  key: string;
  href: string;
  children?: NavItem[];
}

/**
 * Main navigation items.
 * Labels come from the i18n dictionaries — these define structure & routes only.
 * The `key` maps to `dict.nav[key]` in dictionary files.
 */
export const mainNavigation: NavItem[] = [
  { key: 'about', href: '/about' },
  {
    key: 'companies',
    href: '/companies',
    children: [
      { key: 'dnInsaat', href: '/companies/dn-insaat' },
      { key: 'dnEnerji', href: '/companies/dn-enerji' },
      { key: 'dnMadencilik', href: '/companies/dn-madencilik' },
      { key: 'dnGida', href: '/companies/dn-gida' },
      { key: 'dnTeknoloji', href: '/companies/dn-teknoloji' },
      { key: 'dnGayrimenkul', href: '/companies/dn-gayrimenkul' },
    ],
  },
  { key: 'areas', href: '/areas' },
  { key: 'projects', href: '/projects' },
  { key: 'products', href: '/products' },
  { key: 'media', href: '/media' },
  { key: 'contact', href: '/contact' },
] as const;

/**
 * Footer navigation columns.
 * The `groupKey` maps to `dict.footer[groupKey]`.
 */
export interface FooterNavGroup {
  groupKey: string;
  items: NavItem[];
}

export const footerNavigation: FooterNavGroup[] = [
  {
    groupKey: 'corporate',
    items: [
      { key: 'about', href: '/about' },
      { key: 'vision', href: '/about#vision' },
      { key: 'mission', href: '/about#mission' },
      { key: 'values', href: '/about#values' },
      { key: 'history', href: '/about#history' },
    ],
  },
  {
    groupKey: 'companies',
    items: [
      { key: 'dnInsaat', href: '/companies/dn-insaat' },
      { key: 'dnEnerji', href: '/companies/dn-enerji' },
      { key: 'dnMadencilik', href: '/companies/dn-madencilik' },
      { key: 'dnGida', href: '/companies/dn-gida' },
      { key: 'dnTeknoloji', href: '/companies/dn-teknoloji' },
      { key: 'dnGayrimenkul', href: '/companies/dn-gayrimenkul' },
    ],
  },
  {
    groupKey: 'quickLinks',
    items: [
      { key: 'projects', href: '/projects' },
      { key: 'media', href: '/media' },
      { key: 'careers', href: '/careers' },
      { key: 'contact', href: '/contact' },
    ],
  },
] as const;

/**
 * Social media links.
 */
export interface SocialLink {
  platform: string;
  href: string;
  icon: string;
}

export const socialLinks: SocialLink[] = [
  { platform: 'LinkedIn', href: 'https://linkedin.com/company/dn-holding', icon: 'linkedin' },
  { platform: 'X', href: 'https://x.com/dnholding', icon: 'x' },
  { platform: 'Instagram', href: 'https://instagram.com/dnholding', icon: 'instagram' },
  { platform: 'YouTube', href: 'https://youtube.com/@dnholding', icon: 'youtube' },
] as const;
