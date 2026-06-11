'use client';

import {usePathname, useRouter} from 'next/navigation';
import {cn} from '@/lib/utils';

/* ─── Types ─── */
type SupportedLang = 'tr' | 'en';

export interface LanguageSwitcherProps {
  /** Visual style */
  variant?: 'default' | 'minimal';
  className?: string;
}

const LANGUAGES: { code: SupportedLang; label: string }[] = [
  { code: 'tr', label: 'TR' },
  { code: 'en', label: 'EN' },
];

/* ─── Component ─── */
export function LanguageSwitcher({
  variant = 'default',
  className,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Derive current language from path segment
  const currentLang: SupportedLang = pathname.startsWith('/en') ? 'en' : 'tr';

  function switchLanguage(targetLang: SupportedLang) {
    if (targetLang === currentLang) return;

    let newPath: string;

    if (currentLang === 'tr') {
      // /tr/about → /en/about  OR  /about → /en/about
      if (pathname.startsWith('/tr')) {
        newPath = pathname.replace(/^\/tr/, `/${targetLang}`);
      } else {
        newPath = `/${targetLang}${pathname}`;
      }
    } else {
      // /en/about → /tr/about
      if (pathname.startsWith('/en')) {
        newPath = pathname.replace(/^\/en/, `/${targetLang}`);
      } else {
        newPath = `/${targetLang}${pathname}`;
      }
    }

    // Ensure the path starts with /
    if (!newPath.startsWith('/')) {
      newPath = `/${newPath}`;
    }

    router.push(newPath);
  }

  return (
    <nav
      aria-label="Language switcher"
      className={cn(
        'inline-flex items-center',
        variant === 'default' && [
          'rounded-full border border-border/60',
          'bg-surface/50 backdrop-blur-sm',
          'dark:border-white/10 dark:bg-white/5',
          'p-0.5',
        ],
        variant === 'minimal' && 'gap-1',
        className,
      )}
    >
      {LANGUAGES.map((lang, index) => {
        const isActive = lang.code === currentLang;

        return (
          <span key={lang.code} className="inline-flex items-center">
            <button
              type="button"
              onClick={() => switchLanguage(lang.code)}
              aria-current={isActive ? 'true' : undefined}
              aria-label={`Switch to ${lang.code === 'tr' ? 'Turkish' : 'English'}`}
              className={cn(
                'relative px-3 py-1.5 text-xs font-semibold tracking-wide',
                'transition-all duration-[var(--duration-fast)] ease-[var(--ease-premium)]',
                'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent',
                // Default variant styles
                variant === 'default' && [
                  'rounded-full',
                  isActive && [
                    'bg-accent text-primary shadow-sm',
                    'dark:text-primary-dark',
                  ],
                  !isActive && [
                    'text-text-secondary hover:text-accent',
                    'dark:text-text-light dark:hover:text-accent',
                  ],
                ],
                // Minimal variant styles
                variant === 'minimal' && [
                  isActive && 'text-accent font-bold',
                  !isActive && [
                    'text-text-light hover:text-text-secondary',
                    'dark:text-text-light dark:hover:text-text-inverse',
                  ],
                ],
              )}
            >
              {lang.label}
              {/* Active indicator underline for minimal variant */}
              {variant === 'minimal' && isActive && (
                <span
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-0.5 rounded-full bg-accent"
                  aria-hidden="true"
                />
              )}
            </button>
            {/* Separator */}
            {variant === 'minimal' && index < LANGUAGES.length - 1 && (
              <span
                className="text-border dark:text-white/20 text-xs font-light mx-0.5 select-none"
                aria-hidden="true"
              >
                |
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default LanguageSwitcher;
