"use client";

import Link from "next/link";
import Image from "next/image";
import {useState} from "react";
import {Container} from "./Container";
import type {Locale} from "@/app/dictionaries";
import styles from "./Footer.module.css";

interface FooterProps {
  lang: Locale;
  dict?: any;
}

export function Footer({ lang, dict }: FooterProps) {
  const data = dict?.footer;
  const [quickLinksOpen, setQuickLinksOpen] = useState(false);
  const [companiesOpen, setCompaniesOpen] = useState(false);

  if (!data) return null;

  const quickLinks = [
    { label: dict.nav?.about || "About", href: "/about" },
    { label: dict.nav?.areas || "Business Areas", href: "/business-areas" },
    { label: dict.nav?.products || "Products", href: "/products" },
    { label: dict.nav?.projects || "Projects", href: "/projects" },
    { label: dict.nav?.media || "Media", href: "/media" },
    { label: dict.nav?.contact || "Contact", href: "/contact" },
  ];

  const companiesLinks = dict.data?.companies?.map((c: any) => ({
    label: c.name,
    href: `/companies/${c.slug}`
  })) || [];

  return (
    <div className="dark">
      <footer className={styles.footer}>
        {/* Main Footer */}
      <Container>
        <div className={styles.grid}>
          {/* About Column */}
          <div className={styles.aboutCol}>
            <Link href={`/`} className={styles.footerLogo}>
              <Image 
                src="/assets/image/logo/dnholding_v2.png" 
                alt="DN Holding Logo" 
                width={200} 
                height={50} 
                className={styles.logoImage}
              />
            </Link>
            <p className={styles.aboutText}>{data.about?.description}</p>
            <div className={styles.socialLinks}>
              <a
                href={data.socials?.linkedin || "#"}
                aria-label="LinkedIn"
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href={data.socials?.twitter || "#"}
                aria-label="X / Twitter"
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href={data.socials?.instagram || "#"}
                aria-label="Instagram"
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.linksCol}>
            <div 
              className={styles.mobileAccordionHeader} 
              onClick={() => setQuickLinksOpen(!quickLinksOpen)}
            >
              <h3 className={styles.colTitle}>{data.quickLinksTitle}</h3>
              <span className={styles.accordionIcon}>{quickLinksOpen ? "-" : "+"}</span>
            </div>
            <ul className={`${styles.linksList} ${quickLinksOpen ? styles.open : ""}`}>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`${link.href}`}
                    className={styles.footerLink}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Group Companies */}
          <div className={styles.linksCol}>
            <div 
              className={styles.mobileAccordionHeader} 
              onClick={() => setCompaniesOpen(!companiesOpen)}
            >
              <h3 className={styles.colTitle}>{data.companiesTitle}</h3>
              <span className={styles.accordionIcon}>{companiesOpen ? "-" : "+"}</span>
            </div>
            <ul className={`${styles.linksList} ${companiesOpen ? styles.open : ""}`}>
              {companiesLinks.map((link: any) => (
                <li key={link.href}>
                  <Link
                    href={`${link.href}`}
                    className={styles.footerLink}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.linksCol}>
            <h3 className={styles.colTitle}>{data.contactTitle}</h3>
            <address className={styles.contactInfo}>
              <p>
                <a 
                  href="https://www.google.com/maps/place/DN+HOLDING+A.Ş./@37.8564526,29.3942722,18z/data=!4m10!1m2!2m1!1sDN+HOLDING+A.Ş.,+Kaklık,+Mermer+Fabrikaları+Kümesi,+20240+Honaz%2FDenizli!3m6!1s0x14c71d8bd0404bc9:0x17b56dc714f59fef!8m2!3d37.8564526!4d29.396654!15sCktETiBIT0xESU5HIEEuxZ4uLCBLYWtsxLFrLCBNZXJtZXIgRmFicmlrYWxhcsSxIEvDvG1lc2ksIDIwMjQwIEhvbmF6L0Rlbml6bGmSAQ9ob2xkaW5nX2NvbXBhbnngAQA!16s%2Fg%2F11z9bky8kw?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {data.address}
                </a>
              </p>
              <a href={`call:${data.phone.replace(/\s/g, "")}`}>
                {data.phone}
              </a>
              <a href={`mailto:${data.email}`}>{data.email}</a>
              <div className="mt-4 pt-4 border-t border-border/10 dark:border-white/10">
                <p className="font-semibold text-xs mb-1">{dict?.footer?.workingHoursTitle || "Çalışma Saatleri"}</p>
                <p className="text-xs opacity-80">{dict?.footer?.workingHoursDesc || "Haftaiçi 08:00-17:00 | Cumartesi : 08:00-16:00"}</p>
              </div>
            </address>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <Container>
          <div className={styles.bottomContent}>
            <p className={styles.copyright}>{data.copyright}</p>
            <a
              href="https://woma.com.tr"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.poweredBy}
            >
              {dict?.common?.poweredBy || "Powered by"} <span className={styles.womaText}>{dict?.footer?.woma || "WOMA"}</span>
            </a>
            <div className={styles.legalLinks}>
              <Link href="/privacy" className={styles.legalLink}>
                {data.privacy}
              </Link>
              <span className={styles.legalDivider}>|</span>
              <Link href="/terms" className={styles.legalLink}>
                {data.terms}
              </Link>
              <span className="border-b border-white/30 group-hover/link:border-accent pb-0.5">|</span>
              <Link href="/rss.xml" target="_blank" prefetch={false} className={styles.legalLink}>
                {dict?.footer?.rssFeed || "RSS Feed"}
              </Link>
            </div>
          </div>
        </Container>
      </div>
      </footer>
    </div>
  );
}

export default Footer;
