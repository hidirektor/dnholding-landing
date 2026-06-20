import Link from "next/link";
import Image from "next/image";
import {Container} from "./Container";
import type {Locale} from "@/app/dictionaries";
import styles from "./Footer.module.css";

interface FooterProps {
  lang: Locale;
}

const footerData = {
  tr: {
    about: {
      title: "DN Holding",
      description:
        "İnşaat, enerji, madencilik, gıda, teknoloji ve gayrimenkul sektörlerinde faaliyet gösteren uluslararası bir holding şirketi.",
    },
    quickLinks: {
      title: "Hızlı Bağlantılar",
      links: [
        { label: "Hakkımızda", href: "/about" },
        { label: "Faaliyet Alanları", href: "/business-areas" },
        { label: "Ürünler / Hizmetler", href: "/products" },
        { label: "Projeler", href: "/projects" },
        { label: "Medya", href: "/media" },
        { label: "İletişim", href: "/contact" },
      ],
    },
    companies: {
      title: "Grup Şirketleri",
      links: [
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
    contact: {
      title: "İletişim",
      address: "DN Holding A.Ş. Honaz V.D. / 3021350358, Kaklık Mah. Mermer Fabrikaları Kümesi Küme Evleri Çetın Beton No: 8 Honaz / Denizli",
      phone: "+90 (212) 000 00 00",
      email: "info@dnholding.com",
    },
    copyright: `© ${new Date().getFullYear()} DN Holding. Tüm hakları saklıdır.`,
    privacy: "Gizlilik Politikası",
    terms: "Kullanım Koşulları",
  },
  en: {
    about: {
      title: "DN Holding",
      description:
        "An international holding company operating across construction, energy, mining, food, technology, and real estate sectors.",
    },
    quickLinks: {
      title: "Quick Links",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Business Areas", href: "/business-areas" },
        { label: "Products / Services", href: "/products" },
        { label: "Projects", href: "/projects" },
        { label: "Media", href: "/media" },
        { label: "Contact", href: "/contact" },
      ],
    },
    companies: {
      title: "Group Companies",
      links: [
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
    contact: {
      title: "Contact",
      address: "DN Holding A.Ş. Honaz V.D. / 3021350358, Kaklık Mah. Mermer Fabrikaları Kümesi Küme Evleri Çetın Beton No: 8 Honaz / Denizli",
      phone: "+90 (212) 000 00 00",
      email: "info@dnholding.com",
    },
    copyright: `© ${new Date().getFullYear()} DN Holding. All rights reserved.`,
    privacy: "Privacy Policy",
    terms: "Terms of Use",
  },
  de: {
    about: {
      title: "DN Holding",
      description:
        "Eine internationale Holdinggesellschaft, die in den Bereichen Bau, Energie, Bergbau, Lebensmittel, Technologie und Immobilien tätig ist.",
    },
    quickLinks: {
      title: "Schnelle Links",
      links: [
        { label: "Über Uns", href: "/about" },
        { label: "Tätigkeitsbereiche", href: "/business-areas" },
        { label: "Produkte / Dienstleistungen", href: "/products" },
        { label: "Projekte", href: "/projects" },
        { label: "Medien", href: "/media" },
        { label: "Kontakt", href: "/contact" },
      ],
    },
    companies: {
      title: "Konzerngesellschaften",
      links: [
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
    contact: {
      title: "Kontakt",
      address: "DN Holding A.Ş. Honaz V.D. / 3021350358, Kaklık Mah. Mermer Fabrikaları Kümesi Küme Evleri Çetın Beton No: 8 Honaz / Denizli",
      phone: "+90 (212) 000 00 00",
      email: "info@dnholding.com",
    },
    copyright: `© ${new Date().getFullYear()} DN Holding. Alle Rechte vorbehalten.`,
    privacy: "Datenschutzrichtlinie",
    terms: "Nutzungsbedingungen",
  },
  fr: {
    about: {
      title: "DN Holding",
      description:
        "Une holding internationale opérant dans les secteurs de la construction, de l'énergie, de l'exploitation minière, de l'alimentation, de la technologie et de l'immobilier.",
    },
    quickLinks: {
      title: "Liens Rapides",
      links: [
        { label: "À Propos", href: "/about" },
        { label: "Domaines d'Activité", href: "/business-areas" },
        { label: "Produits / Services", href: "/products" },
        { label: "Projets", href: "/projects" },
        { label: "Médias", href: "/media" },
        { label: "Contact", href: "/contact" },
      ],
    },
    companies: {
      title: "Entreprises du Groupe",
      links: [
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
    contact: {
      title: "Contact",
      address: "DN Holding A.Ş. Honaz V.D. / 3021350358, Kaklık Mah. Mermer Fabrikaları Kümesi Küme Evleri Çetın Beton No: 8 Honaz / Denizli",
      phone: "+90 (212) 000 00 00",
      email: "info@dnholding.com",
    },
    copyright: `© ${new Date().getFullYear()} DN Holding. Tous droits réservés.`,
    privacy: "Politique de Confidentialité",
    terms: "Conditions d'Utilisation",
  },
};

export function Footer({ lang }: FooterProps) {
  const data = footerData[lang] || footerData.tr;

  return (
    <footer className={styles.footer}>
      {/* Main Footer */}
      <Container>
        <div className={styles.grid}>
          {/* About Column */}
          <div className={styles.aboutCol}>
            <Link href={`/`} className={styles.footerLogo}>
              <Image 
                src="/logo_dnholding.png" 
                alt="DN Holding Logo" 
                width={200} 
                height={50} 
                className={styles.logoImage}
              />
            </Link>
            <p className={styles.aboutText}>{data.about.description}</p>
            <div className={styles.socialLinks}>
              <a
                href="#"
                aria-label="LinkedIn"
                className={styles.socialLink}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="#"
                aria-label="X / Twitter"
                className={styles.socialLink}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className={styles.socialLink}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.linksCol}>
            <h3 className={styles.colTitle}>{data.quickLinks.title}</h3>
            <ul className={styles.linksList}>
              {data.quickLinks.links.map((link) => (
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
            <h3 className={styles.colTitle}>{data.companies.title}</h3>
            <ul className={styles.linksList}>
              {data.companies.links.map((link) => (
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
            <h3 className={styles.colTitle}>{data.contact.title}</h3>
            <address className={styles.contactInfo}>
              <p>{data.contact.address}</p>
              <a href={`tel:${data.contact.phone.replace(/\s/g, "")}`}>
                {data.contact.phone}
              </a>
              <a href={`mailto:${data.contact.email}`}>{data.contact.email}</a>
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
              Powered by <span className={styles.womaText}>WOMA</span>
            </a>
            <div className={styles.legalLinks}>
              <Link href={`/`} className={styles.legalLink}>
                {data.privacy}
              </Link>
              <span className={styles.legalDivider}>|</span>
              <Link href={`/`} className={styles.legalLink}>
                {data.terms}
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
