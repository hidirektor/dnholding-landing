"use client";

import {useCallback, useEffect, useRef, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";
import {useTheme} from "next-themes";
import {cn} from "@/lib/utils";
import {useScrollDirection} from "@/hooks/useScrollDirection";
import type {Locale} from "@/app/dictionaries";
import styles from "./Header.module.css";
import dynamic from "next/dynamic";

const BrochureModal = dynamic(() => import("@/components/brochure/BrochureModal"), { ssr: false });

interface HeaderProps {
  lang: Locale;
  dict: any;
}



const themeLabels: Record<string, { theme: string; language: string }> = {
  tr: { theme: "Tema", language: "Dil" },
  en: { theme: "Theme", language: "Language" },
  de: { theme: "Thema", language: "Sprache" },
  fr: { theme: "Thème", language: "Langue" },
};

const contactLabels: Record<string, string> = {
  tr: "İLETİŞİME GEÇ",
  en: "GET IN TOUCH",
  de: "KONTAKT",
  fr: "CONTACTEZ-NOUS",
};

export function Header({ lang, dict }: HeaderProps) {
  const pathname = usePathname();
  const scrollDirection = useScrollDirection();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { theme, setTheme, resolvedTheme } = useTheme();

  const items = [
    { label: dict?.nav?.home || "Home", href: "/" },
    { label: dict?.nav?.about || "About Us", href: "/about" },
    {
      label: dict?.nav?.companies || "Group Companies",
      href: "/companies",
      children: dict?.data?.companies?.map((c: any) => ({
        label: c.name,
        href: `/companies/${c.slug}`
      })) || []
    },
    { label: dict?.nav?.areas || "Business Areas", href: "/business-areas" },
    { label: dict?.nav?.products || "Products/Services", href: "/products" },
    { label: dict?.nav?.projects || "Projects", href: "/projects" },
    {
      label: dict?.nav?.media || "Media",
      href: "/media",
      children: [
        { label: dict?.media?.tabs?.news || "News", href: "/media#haberler" },
        { label: dict?.media?.tabs?.fairs || "Fairs", href: "/media#fuarlar" },
        { label: dict?.media?.tabs?.events || "Events", href: "/media#etkinlikler" }
      ]
    }
  ];

  const labels = themeLabels[lang] || themeLabels.en;
  const contactLabel = contactLabels[lang] || contactLabels.en;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSettingsOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setIsSettingsOpen(false);
      }
    };
    if (isSettingsOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSettingsOpen]);

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
    setActiveDropdown(null);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const switchLanguage = (newLang: string) => {
    document.cookie = `NEXT_LOCALE=${newLang.toLowerCase()}; path=/; max-age=31536000`;
    router.refresh();
  };

  return (
    <>
      <header
        className={cn(
          styles.header,
          scrollDirection === "down" && isScrolled && styles.hidden
        )}
        style={{ top: "2.5rem", transitionProperty: "transform, top" }}
      >
        <div className="container-base relative">
          {/* Social Tab + Settings */}
          <div ref={settingsRef} className="hidden lg:flex absolute top-8 right-4 md:right-8 bg-[#0a192f]/85 dark:bg-white/15 text-white/90 px-6 pt-12 pb-4 rounded-b-2xl items-center gap-5 shadow-lg backdrop-blur-xl z-0 border border-t-0 border-[#0a192f]/30 dark:border-white/20">
            <a href="https://www.instagram.com/dnmarble" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffe800] transition-colors" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://www.youtube.com/@dnmermer" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffe800] transition-colors" aria-label="Youtube">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
            </a>
            <a href="https://www.linkedin.com/company/dn-marble/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffe800] transition-colors" aria-label="Linkedin">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="https://wa.me/905321136846" target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors" aria-label="WhatsApp">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg>
            </a>
            
            {/* Separator */}
            <div className="w-px h-4 bg-white/30 mx-1"></div>

            <button 
              onClick={() => setIsSettingsOpen(!isSettingsOpen)} 
              className={cn("hover:text-[#ffe800] transition-colors outline-none", isSettingsOpen && "text-[#ffe800]")} 
              aria-label="Settings"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>

            {/* Settings Panel — Theme + Language */}
            {isSettingsOpen && (
              <div className="absolute top-full left-0 w-full mt-2 rounded-xl shadow-xl p-4 flex flex-col gap-5 animate-fade-in-up" style={{ background: 'var(--settings-bg)', border: '1px solid var(--settings-border)' }}>
                {/* Theme Toggle */}
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider mb-2.5 block" style={{ color: 'var(--settings-muted)' }}>{labels.theme}</span>
                  <div className="flex gap-1.5 p-1 rounded-lg" style={{ background: 'var(--settings-hover)' }}>
                    {/* Light */}
                    <button
                      onClick={() => setTheme("light")}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-1.5 text-xs font-bold px-3 py-2 rounded-md transition-all duration-200",
                        mounted && resolvedTheme === "light"
                          ? "bg-accent text-white shadow-sm"
                          : "hover:opacity-80"
                      )}
                      style={mounted && resolvedTheme !== "light" ? { color: 'var(--settings-text)' } : {}}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                      Light
                    </button>
                    {/* Dark */}
                    <button
                      onClick={() => setTheme("dark")}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-1.5 text-xs font-bold px-3 py-2 rounded-md transition-all duration-200",
                        mounted && resolvedTheme === "dark"
                          ? "bg-accent text-white shadow-sm"
                          : "hover:opacity-80"
                      )}
                      style={mounted && resolvedTheme !== "dark" ? { color: 'var(--settings-text)' } : {}}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                      </svg>
                      Dark
                    </button>
                  </div>
                </div>

                {/* Language Selector */}
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider mb-2.5 block" style={{ color: 'var(--settings-muted)' }}>{labels.language}</span>
                  <div className="flex gap-2">
                    {["TR", "EN", "DE", "FR"].map((l) => (
                      <button
                        key={l}
                        onClick={() => { switchLanguage(l); setIsSettingsOpen(false); }}
                        className={cn("text-xs font-bold px-3 py-1.5 rounded-md transition-all duration-200", lang.toUpperCase() === l ? "bg-accent text-white shadow-sm" : "hover:opacity-80")}
                        style={lang.toUpperCase() !== l ? { color: 'var(--settings-text)', background: 'var(--settings-hover)' } : {}}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <nav
            className={styles.nav}
            aria-label="Main navigation"
          >
            <Link
              href={`/`}
              className={styles.logo}
              onClick={closeMobile}
              aria-label="DN Holding Home"
            >
              <Image 
                src="/assets/image/logo/dnholding_v2.png" 
                alt="DN Holding Logo" 
                width={200} 
                height={50} 
                className={styles.logoImage}
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <ul className={styles.desktopNav}>
              {items.map((item, index) => (
                <li
                  key={item.href}
                  className={styles.navItem}
                  style={{ animationDelay: `${index * 0.08}s` }}
                  onMouseEnter={() =>
                    item.children && setActiveDropdown(item.href)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={`${item.href}`}
                    className={cn(
                      styles.navLink,
                      isActive(item.href) && styles.navLinkActive
                    )}
                  >
                    {item.label}
                    {item.children && (
                      <svg
                        className={cn(
                          styles.chevron,
                          activeDropdown === item.href && styles.chevronOpen
                        )}
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                      >
                        <path
                          d="M1 1L5 5L9 1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.children && (
                    <div
                      className={cn(
                        styles.dropdown,
                        activeDropdown === item.href && styles.dropdownOpen
                      )}
                    >
                      <div className={styles.dropdownInner}>
                        {item.children.map((child: { label: string, href: string }) => (
                          <Link
                            key={child.href}
                            href={`${child.href}`}
                            className={styles.dropdownLink}
                          >
                            <span className={styles.dropdownDot} />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Right Side */}
            <div className={styles.rightSection}>
              {/* Desktop CTA */}
              <button 
                onClick={() => setIsBrochureOpen(true)} 
                className="hidden md:inline-flex items-center justify-center bg-transparent border border-white/30 text-white font-medium text-sm px-4 py-2 rounded-full hover:bg-white/10 transition-colors whitespace-nowrap"
              >
                Broşür
              </button>
              <Link href="/contact" className="hidden md:inline-flex items-center justify-center bg-white text-black font-medium text-sm px-5 py-2 rounded-full hover:bg-white/90 transition-colors whitespace-nowrap">
                {contactLabel}
              </Link>
              {/* Mobile Toggle */}
              <button
                className={styles.mobileToggle}
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                aria-label={isMobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileOpen}
              >
                <span
                  className={cn(
                    styles.hamburgerLine,
                    isMobileOpen && styles.hamburgerOpen1
                  )}
                />
                <span
                  className={cn(
                    styles.hamburgerLine,
                    isMobileOpen && styles.hamburgerOpen2
                  )}
                />
                <span
                  className={cn(
                    styles.hamburgerLine,
                    isMobileOpen && styles.hamburgerOpen3
                  )}
                />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div
        className={cn(
          styles.mobileOverlay,
          isMobileOpen && styles.mobileOverlayOpen
        )}
      >
        <nav className={styles.mobileNav}>
          {items.map((item, index) => (
            <div
              key={item.href}
              className={styles.mobileNavItem}
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <Link
                href={`${item.href}`}
                className={cn(
                  styles.mobileNavLink,
                  isActive(item.href) && styles.mobileNavLinkActive
                )}
                onClick={closeMobile}
              >
                {item.label}
              </Link>

              {item.children && (
                <div className={styles.mobileSubnav}>
                  {item.children.map((child: { label: string, href: string }) => (
                    <Link
                      key={child.href}
                      href={`${child.href}`}
                      className={styles.mobileSubnavLink}
                      onClick={closeMobile}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Mobile Settings Block */}
          <div className="flex flex-col items-center gap-6 mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 w-full px-6">
            <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400">
              <a href="https://www.instagram.com/dnmarble" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://www.youtube.com/@dnmermer" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors" aria-label="Youtube">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/dn-marble/" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors" aria-label="Linkedin">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://wa.me/905321136846" target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors" aria-label="WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/></svg>
              </a>
            </div>

            <div className="flex flex-col gap-4 w-full max-w-xs mt-4">
              <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <button
                  onClick={() => setTheme("light")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 text-sm font-medium px-4 py-2 rounded-md transition-all",
                    mounted && resolvedTheme === "light"
                      ? "bg-white text-black shadow-sm"
                      : "text-gray-500 hover:text-black"
                  )}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                  Light
                </button>
                <button
                  onClick={() => setTheme("dark")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 text-sm font-medium px-4 py-2 rounded-md transition-all",
                    mounted && resolvedTheme === "dark"
                      ? "bg-gray-700 text-white shadow-sm"
                      : "text-gray-500 hover:text-white"
                  )}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                  Dark
                </button>
              </div>

              <div className="flex justify-center gap-2">
                {["TR", "EN", "DE", "FR"].map((l) => (
                  <button
                    key={l}
                    onClick={() => { switchLanguage(l); closeMobile(); }}
                    className={cn(
                      "text-xs font-bold px-4 py-2 rounded-lg transition-all",
                      lang.toUpperCase() === l 
                        ? "bg-blue-900 text-white dark:bg-white dark:text-black" 
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-center w-full mt-4 px-6">
            <button 
              onClick={() => {
                setIsBrochureOpen(true);
                closeMobile();
              }} 
              className="w-full max-w-xs flex items-center justify-center bg-transparent border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium text-sm px-7 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Broşür
            </button>
          </div>
        </nav>
      </div>

      <BrochureModal isOpen={isBrochureOpen} onClose={() => setIsBrochureOpen(false)} />
    </>
  );
}

export default Header;
