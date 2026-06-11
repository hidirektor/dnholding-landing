import 'server-only';
import {cookies} from 'next/headers';

const dictionaries = {
  tr: () => import('./dictionaries/tr.json').then((m) => m.default),
  en: () => import('./dictionaries/en.json').then((m) => m.default),
};

export type Locale = keyof typeof dictionaries;

export const locales: Locale[] = ['tr', 'en'];

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value;
  const activeLocale = hasLocale(locale || "") ? (locale as Locale) : "tr";
  return dictionaries[activeLocale]();
};

export const getCurrentLocale = async (): Promise<Locale> => {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value;
  return hasLocale(locale || "") ? (locale as Locale) : "tr";
};
