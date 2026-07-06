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
      label: "Grup Şirketleri",
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
    { label: "İletişim", href: "/contact" },
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
    { label: "Contact", href: "/contact" },
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
    { label: "Kontakt", href: "/contact" },
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
    { label: "Contact", href: "/contact" },
  ]
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
      >
        <div className="container-base">
          <nav
            className={styles.nav}
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
