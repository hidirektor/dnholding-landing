/**
 * Utility functions for the DN Holding website.
 */

type ClassValue = string | number | boolean | undefined | null | ClassValue[];

/**
 * Merge class names, filtering out falsy values.
 * A lightweight alternative to clsx + tailwind-merge.
 *
 * @example
 * cn('px-4', isActive && 'bg-primary', undefined, 'text-white')
 * // => 'px-4 bg-primary text-white'
 */
export function cn(...inputs: ClassValue[]): string {
  return inputs
    .flat(Infinity)
    .filter(
      (value): value is string | number =>
        typeof value === 'string' || typeof value === 'number',
    )
    .map(String)
    .filter(Boolean)
    .join(' ');
}

/**
 * Format a date string according to the given locale.
 *
 * @param date  - ISO date string or parseable date string (e.g. '2025-03-15')
 * @param locale - BCP 47 locale tag, typically 'tr' or 'en'
 * @returns Formatted date string, e.g. '15 Mart 2025' or 'March 15, 2025'
 */
export function formatDate(date: string, locale: string = 'tr'): string {
  try {
    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) {
      return date; // Return the original string if unparseable
    }

    return new Intl.DateTimeFormat(locale === 'tr' ? 'tr-TR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(dateObj);
  } catch {
    return date;
  }
}

/**
 * Convert a string into a URL-safe slug.
 * Handles Turkish characters (ç, ğ, ı, ö, ş, ü) properly.
 *
 * @param text - The string to slugify
 * @returns URL-safe slug string
 *
 * @example
 * slugify('DN İnşaat ve Ticaret')
 * // => 'dn-insaat-ve-ticaret'
 */
export function slugify(text: string): string {
  const turkishMap: Record<string, string> = {
    ç: 'c',
    Ç: 'C',
    ğ: 'g',
    Ğ: 'G',
    ı: 'i',
    İ: 'I',
    ö: 'o',
    Ö: 'O',
    ş: 's',
    Ş: 'S',
    ü: 'u',
    Ü: 'U',
  };

  return text
    .replace(/[çÇğĞıİöÖşŞüÜ]/g, (char) => turkishMap[char] || char)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric chars
    .replace(/[\s_]+/g, '-') // Replace spaces/underscores with hyphens
    .replace(/-+/g, '-') // Collapse multiple hyphens
    .replace(/^-|-$/g, ''); // Trim leading/trailing hyphens
}
