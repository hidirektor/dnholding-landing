"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useTheme} from "next-themes";
import {cn} from "@/lib/utils";

export function PreferencesWidget({ currentLang = "TR" }: { currentLang?: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const switchLanguage = (lang: string) => {
    document.cookie = `NEXT_LOCALE=${lang.toLowerCase()}; path=/; max-age=31536000`;
    router.refresh();
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div
      className={cn(
        "fixed bottom-6 right-0 z-50 flex items-center bg-white dark:bg-primary-dark shadow-[var(--shadow-large)] border border-border dark:border-white/10 border-r-0 transition-all duration-300 ease-[var(--ease-premium)]",
        "rounded-l-3xl overflow-hidden",
        isExpanded ? "w-[380px]" : "w-14 h-14"
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex items-center w-full h-14">
        {/* Gear Icon (Always visible) */}
        <div className="w-14 h-14 flex items-center justify-center flex-shrink-0 text-text-secondary dark:text-text-light">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("transition-transform duration-500", isExpanded && "rotate-90")}
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </div>

        {/* Expanded Content */}
        <div
          className={cn(
            "flex items-center gap-4 px-2 opacity-0 transition-opacity duration-300 whitespace-nowrap",
            isExpanded && "opacity-100 delay-100"
          )}
        >
          {/* Divider */}
          <div className="w-[1px] h-6 bg-border dark:bg-white/10" />

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="text-text-secondary dark:text-text-light hover:text-primary dark:hover:text-white transition-colors"
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Divider */}
          <div className="w-[1px] h-6 bg-border dark:bg-white/10" />

          {/* Language / Globe */}
          <div className="flex items-center gap-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-text-secondary dark:text-text-light"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>

            <div className="flex bg-surface-dark dark:bg-white/10 rounded-md overflow-hidden p-0.5">
              {["TR", "EN", "DE", "FR"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => switchLanguage(lang)}
                  className={cn(
                    "px-2 py-1 text-xs font-bold rounded-sm transition-colors",
                    currentLang === lang
                      ? "bg-primary text-white dark:bg-white dark:text-primary"
                      : "text-text-secondary dark:text-text-light hover:text-primary dark:hover:text-white"
                  )}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
