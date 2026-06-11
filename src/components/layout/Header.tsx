"use client";

import {useCallback, useEffect, useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {useScrollDirection} from "@/hooks/useScrollDirection";
import type {Locale} from "@/app/[lang]/dictionaries";
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
        { label: "DN İnşaat", href: "/companies/dn-insaat" },
        { label: "DN Enerji", href: "/companies/dn-enerji" },
        { label: "DN Madencilik", href: "/companies/dn-madencilik" },
        { label: "DN Gıda", href: "/companies/dn-gida" },
        { label: "DN Teknoloji", href: "/companies/dn-teknoloji" },
        { label: "DN Gayrimenkul", href: "/companies/dn-gayrimenkul" },
      ],
    },
    { label: "Faaliyet Alanları", href: "/business-areas" },
    { label: "Projeler", href: "/projects" },
    { label: "Medya", href: "/media" },
    { label: "İletişim", href: "/contact" },
  ],
  en: [
    { label: "Home", href: "" },
    { label: "About Us", href: "/about" },
    {
      label: "Group Companies",
      href: "/companies",
      children: [
        { label: "DN Construction", href: "/companies/dn-insaat" },
        { label: "DN Energy", href: "/companies/dn-enerji" },
        { label: "DN Mining", href: "/companies/dn-madencilik" },
        { label: "DN Food", href: "/companies/dn-gida" },
        { label: "DN Technology", href: "/companies/dn-teknoloji" },
        { label: "DN Real Estate", href: "/companies/dn-gayrimenkul" },
      ],
    },
    { label: "Business Areas", href: "/business-areas" },
    { label: "Projects", href: "/projects" },
    { label: "Media", href: "/media" },
    { label: "Contact", href: "/contact" },
  ],
  de: [
    { label: "Startseite", href: "" },
    { label: "Über Uns", href: "/about" },
    {
      label: "Konzerngesellschaften",
      href: "/companies",
      children: [
        { label: "DN Bau", href: "/companies/dn-insaat" },
        { label: "DN Energie", href: "/companies/dn-enerji" },
        { label: "DN Bergbau", href: "/companies/dn-madencilik" },
        { label: "DN Lebensmittel", href: "/companies/dn-gida" },
        { label: "DN Technologie", href: "/companies/dn-teknoloji" },
        { label: "DN Immobilien", href: "/companies/dn-gayrimenkul" },
      ],
    },
    { label: "Tätigkeitsbereiche", href: "/business-areas" },
    { label: "Projekte", href: "/projects" },
    { label: "Medien", href: "/media" },
    { label: "Kontakt", href: "/contact" },
  ],
  fr: [
    { label: "Accueil", href: "" },
    { label: "À Propos", href: "/about" },
    {
      label: "Entreprises du Groupe",
      href: "/companies",
      children: [
        { label: "DN Construction", href: "/companies/dn-insaat" },
        { label: "DN Énergie", href: "/companies/dn-enerji" },
        { label: "DN Exploitation", href: "/companies/dn-madencilik" },
        { label: "DN Alimentation", href: "/companies/dn-gida" },
        { label: "DN Technologie", href: "/companies/dn-teknoloji" },
        { label: "DN Immobilier", href: "/companies/dn-gayrimenkul" },
      ],
    },
    { label: "Domaines d'Activité", href: "/business-areas" },
    { label: "Projets", href: "/projects" },
    { label: "Médias", href: "/media" },
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
              href={`/`}
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
