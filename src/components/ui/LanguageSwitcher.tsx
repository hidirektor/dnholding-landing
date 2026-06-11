"use client";

import {useRouter} from "next/navigation";
import {cn} from "@/lib/utils";

export function LanguageSwitcher({ lang }: { lang: string }) {
  const router = useRouter();

  const handleSwitch = () => {
    const newLang = lang === "tr" ? "en" : "tr";
    document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000`;
    router.refresh();
  };

  return (
    <button
      onClick={handleSwitch}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-sm)] border border-border/50 text-sm font-semibold hover:bg-surface transition-colors dark:border-white/20 dark:hover:bg-white/10"
      aria-label="Switch Language"
    >
      <span className={cn("transition-colors", lang === "tr" ? "text-accent" : "text-text-secondary dark:text-white/60")}>TR</span>
      <span className="text-border dark:text-white/20">|</span>
      <span className={cn("transition-colors", lang === "en" ? "text-accent" : "text-text-secondary dark:text-white/60")}>EN</span>
    </button>
  );
}
