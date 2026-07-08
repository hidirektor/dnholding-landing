"use client";

import {useCallback, useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {useScrollDirection} from "@/hooks/useScrollDirection";
import type {Locale} from "@/app/dictionaries";
import styles from "./Header.module.css";

interface HeaderProps {
  lang: Locale;
}

const navItems = {
  tr: [
    { label: "Ana Sayfa", href: "" },
    { label: "Hakkımızda", href: "/about" },
    {
      label: "Grup Şirketler",
      href: "/companies",
      children: [
        { label: "DN MERMER A.Ş.", href: "/companies/dn-mermer" },
        { label: "2M ULUSLARASI MADENCİLİK", href: "/companies/2m-uluslararasi-madencilik" },
        { label: "4T MADENCİLİK A.Ş.", href: "/companies/4t-madencilik" },
        { label: "ALM MADEN A.Ş.", href: "/companies/alm-maden" },
        { label: "HD MADEN MERMER A.Ş.", href: "/companies/hd-maden-mermer" },
        { label: "MBY MADEN A.Ş.", href: "/companies/mby-maden" },
        { label: "YAMAN MADEN A.Ş.", href: "/companies/yaman-maden" },
        { label: "YMY ENERJİ A.Ş.", href: "/companies/ymy-enerji" },
        { label: "YNR MADEN A.Ş.", href: "/companies/ynr-maden" },
      ],
    },
    { label: "Faaliyet Alanları", href: "/business-areas" },
    { label: "Ürünler/Hizmetler", href: "/products" },
    { label: "Projeler", href: "/projects" },
    { label: "Medya", href: "/media" },
  ],
  en: [
    { label: "Home", href: "" },
    { label: "About Us", href: "/about" },
    {
      label: "Group Companies",
      href: "/companies",
      children: [
        { label: "DN MARBLE INC.", href: "/companies/dn-mermer" },
        { label: "2M INTL. MINING", href: "/companies/2m-uluslararasi-madencilik" },
        { label: "4T MINING INC.", href: "/companies/4t-madencilik" },
        { label: "ALM MINING INC.", href: "/companies/alm-maden" },
        { label: "HD MINING MARBLE INC.", href: "/companies/hd-maden-mermer" },
        { label: "MBY MINING INC.", href: "/companies/mby-maden" },
        { label: "YAMAN MINING INC.", href: "/companies/yaman-maden" },
        { label: "YMY ENERGY INC.", href: "/companies/ymy-enerji" },
        { label: "YNR MINING INC.", href: "/companies/ynr-maden" },
      ],
    },
    { label: "Business Areas", href: "/business-areas" },
    { label: "Products/Services", href: "/products" },
    { label: "Projects", href: "/projects" },
    { label: "Media", href: "/media" },
  ],
  de: [
    { label: "Startseite", href: "" },
    { label: "Über Uns", href: "/about" },
    {
      label: "Konzerngesellschaften",
      href: "/companies",
      children: [
        { label: "DN MARMOR", href: "/companies/dn-mermer" },
        { label: "2M INTL. BERGBAU", href: "/companies/2m-uluslararasi-madencilik" },
        { label: "4T BERGBAU", href: "/companies/4t-madencilik" },
        { label: "ALM BERGBAU", href: "/companies/alm-maden" },
        { label: "HD BERGBAU MARMOR", href: "/companies/hd-maden-mermer" },
        { label: "MBY BERGBAU", href: "/companies/mby-maden" },
        { label: "YAMAN BERGBAU", href: "/companies/yaman-maden" },
        { label: "YMY ENERGIE", href: "/companies/ymy-enerji" },
        { label: "YNR BERGBAU", href: "/companies/ynr-maden" },
      ],
    },
    { label: "Geschäftsfelder", href: "/business-areas" },
    { label: "Produkte/Dienstleistungen", href: "/products" },
    { label: "Projekte", href: "/projects" },
    { label: "Medien", href: "/media" },
  ],
  fr: [
    { label: "Accueil", href: "" },
    { label: "À Propos", href: "/about" },
    {
      label: "Entreprises du Groupe",
      href: "/companies",
      children: [
        { label: "DN MARBRE", href: "/companies/dn-mermer" },
        { label: "2M INTL. EXPLOITATION", href: "/companies/2m-uluslararasi-madencilik" },
        { label: "4T EXPLOITATION", href: "/companies/4t-madencilik" },
        { label: "ALM EXPLOITATION", href: "/companies/alm-maden" },
        { label: "HD EXPLOITATION MARBRE", href: "/companies/hd-maden-mermer" },
        { label: "MBY EXPLOITATION", href: "/companies/mby-maden" },
        { label: "YAMAN EXPLOITATION", href: "/companies/yaman-maden" },
        { label: "YMY ÉNERGIE", href: "/companies/ymy-enerji" },
        { label: "YNR EXPLOITATION", href: "/companies/ynr-maden" },
      ],
    },
    { label: "Domaines d'Activité", href: "/business-areas" },
    { label: "Produits/Services", href: "/products" },
    { label: "Projets", href: "/projects" },
    { label: "Médias", href: "/media" },
  ]
};

export function Header({ lang }: HeaderProps) {
  const pathname = usePathname();
  const scrollDirection = useScrollDirection();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(true);

  const items = navItems[lang] || navItems.tr;

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

  const closeMobile = useCallback(() => {
    setIsMobileOpen(false);
    setActiveDropdown(null);
  }, []);

  const isActive = (href: string) => {
    const fullPath = `${href}`;
    if (href === "") return pathname === `/` || pathname === `/`;
    return pathname.startsWith(fullPath);
  };

  return (
    <>
      <header
        className={cn(
          styles.header,
          (isScrolled || pathname !== "/") && styles.scrolled,
          scrollDirection === "down" && isScrolled && styles.hidden,
          !isScrolled && pathname === "/" && styles.transparent
        )}
        style={{ top: isAnnouncementVisible ? "2.5rem" : "0", transitionProperty: "transform, background-color, box-shadow, backdrop-filter, top" }}
      >
        <div className="container-base relative">
          {/* Announcement Tab */}
          {isAnnouncementVisible && (
            <div className="absolute bottom-full left-4 md:left-8 bg-[#1a1a2e]/95 text-white/90 text-[11px] md:text-xs px-5 py-2 rounded-t-lg flex items-center gap-6 shadow-lg backdrop-blur-md z-50 border border-b-0 border-white/10">
              <div className="flex flex-col md:flex-row md:gap-2">
                <span className="font-semibold text-white">Çalışma Saatlerimiz;</span>
                <span>Haftaiçi 08:00-17:00 | Cumartesi : 08:00-16:00</span>
              </div>
              <button 
                onClick={() => setIsAnnouncementVisible(false)}
                className="hover:text-white transition-colors p-1"
                aria-label="Kapat"
              >
                <svg width="10" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 13L13 1M1 1L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
          <nav
            className={cn(
              styles.nav,
              "border-b",
              !isScrolled && pathname === "/" ? "border-white/20" : "border-border/50"
            )}
            aria-label="Main navigation"
          >
            {/* Logo */}
            <Link
              href={`/`}
              className={styles.logo}
              onClick={closeMobile}
              aria-label="DN Holding Home"
            >
              <Image 
                src="/logo_dnholding-text.png" 
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
                        {item.children.map((child) => (
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
              <Link href="/contact" className="hidden md:inline-flex items-center justify-center bg-[#ffe800] text-[#0f172a] font-bold text-sm px-6 py-2.5 rounded uppercase tracking-wide hover:bg-[#ffe800]/90 transition-colors mr-4 md:mr-0">
                GET IN TOUCH
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
                  {item.children.map((child) => (
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
        </nav>
      </div>
    </>
  );
}

export default Header;
