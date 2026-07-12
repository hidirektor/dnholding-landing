import 'server-only';
import {cookies} from 'next/headers';

const dictionaries = {
  tr: () => import('./dictionaries/tr.json').then((m) => m.default),
  en: () => import('./dictionaries/en.json').then((m) => m.default),
  de: () => import('./dictionaries/de.json').then((m) => m.default),
  fr: () => import('./dictionaries/fr.json').then((m) => m.default),
};

export type Locale = keyof typeof dictionaries;

export const locales: Locale[] = ['tr', 'en', 'de', 'fr'];

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

const mergeMedia = (target: any, source: any): any => {
  if (!target || typeof target !== 'object') return target;
  if (!source || typeof source !== 'object') return target;

  if (Array.isArray(target) && Array.isArray(source)) {
    return target.map((item, index) => mergeMedia(item, source[index]));
  }

  const merged = { ...target };
  
  const mediaKeys = ['image', 'images', 'video', 'logo', 'thumbnail'];
  for (const key of mediaKeys) {
    if (source[key] !== undefined) {
      merged[key] = source[key];
    }
  }

  for (const key in target) {
    if (!mediaKeys.includes(key)) {
      merged[key] = mergeMedia(target[key], source[key]);
    }
  }

  return merged;
};

export const getDictionary = async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value;
  const activeLocale = hasLocale(locale || "") ? (locale as Locale) : "tr";
  
  const activeDict = await dictionaries[activeLocale]();
  
  if (activeLocale === 'tr') {
    return activeDict;
  }
  
  const baseDict = await dictionaries['tr']();
  return mergeMedia(activeDict, baseDict);
};

export const getCurrentLocale = async (): Promise<Locale> => {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value;
  return hasLocale(locale || "") ? (locale as Locale) : "tr";
};
