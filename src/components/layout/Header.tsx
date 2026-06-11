"use client";

import {useCallback, useEffect, useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {LanguageSwitcher} from "@/components/ui/LanguageSwitcher";
import {useScrollDirection} from "@/hooks/useScrollDirection";
import type {Locale} from "@/app/[lang]/dictionaries";
import styles from "./Header.module.css";

interface HeaderProps {
  lang: Locale;
}

const navItems = {
  tr: [
    { label: "Ana Sayfa", href: "" },
    { label: "Hakkımızda", href: "/hakkimizda" },
    {
      label: "Grup Şirketleri",
      href: "/grup-sirketleri",
      children: [
        { label: "DN İnşaat", href: "/grup-sirketleri/dn-insaat" },
        { label: "DN Enerji", href: "/grup-sirketleri/dn-enerji" },
        { label: "DN Madencilik", href: "/grup-sirketleri/dn-madencilik" },
        { label: "DN Gıda", href: "/grup-sirketleri/dn-gida" },
        { label: "DN Teknoloji", href: "/grup-sirketleri/dn-teknoloji" },
        { label: "DN Gayrimenkul", href: "/grup-sirketleri/dn-gayrimenkul" },
      ],
    },
    { label: "Faaliyet Alanları", href: "/faaliyet-alanlari" },
    { label: "Projeler", href: "/projeler" },
    { label: "Medya", href: "/medya" },
    { label: "İletişim", href: "/iletisim" },
  ],
  en: [
    { label: "Home", href: "" },
    { label: "About Us", href: "/hakkimizda" },
    {
      label: "Group Companies",
      href: "/grup-sirketleri",
      children: [
        { label: "DN Construction", href: "/grup-sirketleri/dn-insaat" },
        { label: "DN Energy", href: "/grup-sirketleri/dn-enerji" },
        { label: "DN Mining", href: "/grup-sirketleri/dn-madencilik" },
        { label: "DN Food", href: "/grup-sirketleri/dn-gida" },
        { label: "DN Technology", href: "/grup-sirketleri/dn-teknoloji" },
        { label: "DN Real Estate", href: "/grup-sirketleri/dn-gayrimenkul" },
      ],
    },
    { label: "Business Areas", href: "/faaliyet-alanlari" },
    { label: "Projects", href: "/projeler" },
    { label: "Media", href: "/medya" },
    { label: "Contact", href: "/iletisim" },
  ],
};

export function Header({ lang }: HeaderProps) {
  const pathname = usePathname();
  const scrollDirection = useScrollDirection();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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
    const fullPath = `/${lang}${href}`;
    if (href === "") return pathname === `/${lang}` || pathname === `/${lang}/`;
    return pathname.startsWith(fullPath);
  };

  return (
    <>
      <header
        className={cn(
          styles.header,
          isScrolled && styles.scrolled,
          scrollDirection === "down" && isScrolled && styles.hidden,
          !isScrolled && styles.transparent
        )}
      >
        <div className="container-base">
          <nav
            className={styles.nav}
            aria-label="Main navigation"
          >
            {/* Logo */}
            <Link
              href={`/${lang}`}
              className={styles.logo}
              onClick={closeMobile}
              aria-label="DN Holding Home"
            >
              <span className={styles.logoIcon}>DN</span>
              <span className={styles.logoText}>
                HOLDING
              </span>
            </Link>

            {/* Desktop Navigation */}
            <ul className={styles.desktopNav}>
              {items.map((item) => (
                <li
                  key={item.href}
                  className={styles.navItem}
                  onMouseEnter={() =>
                    item.children && setActiveDropdown(item.href)
                  }
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={`/${lang}${item.href}`}
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
                            href={`/${lang}${child.href}`}
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
              <LanguageSwitcher lang={lang} />

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
                href={`/${lang}${item.href}`}
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
                      href={`/${lang}${child.href}`}
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
