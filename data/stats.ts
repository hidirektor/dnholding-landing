// ──────────────────────────────────────────────────────────────
// DN Holding — Global Statistics
// ──────────────────────────────────────────────────────────────

export interface Stat {
  key: string;
  value: string;
  suffix?: string;
  label: { tr: string; en: string };
  description?: { tr: string; en: string };
}

/**
 * Holding-wide statistics displayed on the homepage and about page.
 * The `key` can be used to look up icons or animations per stat.
 */
export const stats: Stat[] = [
  {
    key: 'experience',
    value: '25',
    suffix: '+',
    label: { tr: 'Yıllık Deneyim', en: 'Years of Experience' },
    description: {
      tr: 'Sektörde çeyrek asırlık bilgi birikimi',
      en: 'A quarter century of industry expertise',
    },
  },
  {
    key: 'countries',
    value: '15',
    suffix: '+',
    label: { tr: 'Ülke', en: 'Countries' },
    description: {
      tr: 'Küresel operasyon ağı',
      en: 'Global operations network',
    },
  },
  {
    key: 'employees',
    value: '3000',
    suffix: '+',
    label: { tr: 'Çalışan', en: 'Employees' },
    description: {
      tr: 'Alanında uzman profesyonel kadro',
      en: 'Expert professional workforce',
    },
  },
  {
    key: 'companies',
    value: '6',
    label: { tr: 'Grup Şirketi', en: 'Group Companies' },
    description: {
      tr: 'Farklı sektörlerde güçlü iştirakleri',
      en: 'Strong subsidiaries across diverse sectors',
    },
  },
  {
    key: 'projects',
    value: '500',
    suffix: '+',
    label: { tr: 'Tamamlanan Proje', en: 'Completed Projects' },
    description: {
      tr: 'Başarıyla tamamlanmış proje portföyü',
      en: 'Successfully completed project portfolio',
    },
  },
  {
    key: 'revenue',
    value: '4.2',
    suffix: 'B ₺',
    label: { tr: 'Konsolide Ciro', en: 'Consolidated Revenue' },
    description: {
      tr: '2025 yılı konsolide ciro',
      en: '2025 consolidated revenue',
    },
  },
] as const satisfies readonly Stat[];
