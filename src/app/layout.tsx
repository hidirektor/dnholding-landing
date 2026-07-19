import type {Metadata, Viewport} from "next";
import "@/lib/promise-polyfill";
import "./globals.css";
import {Header} from "@/components/layout/Header";
import {Footer} from "@/components/layout/Footer";
import {CookieWidget} from "@/components/layout/CookieWidget";
import {getCurrentLocale, getDictionary} from "./dictionaries";

import {ThemeProvider} from "@/components/layout/ThemeProvider";
import {Outfit} from "next/font/google";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-outfit",
  display: "swap",
});
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a1a2e",
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getCurrentLocale();

  const titleByLang: Record<string, string> = {
    tr: "DN Holding | Küresel Değer, Kalıcı Etki",
    en: "DN Holding | From Raw to Perfect",
    de: "DN Holding | Von Roh zu Perfekt",
    fr: "DN Holding | Du Brut à la Perfection",
  };

  const descByLang: Record<string, string> = {
    tr: "DN Holding, inşaat, enerji, madencilik, gıda, teknoloji ve gayrimenkul alanlarında faaliyet gösteren uluslararası bir holding şirketidir.",
    en: "DN Holding is an international holding company operating across construction, energy, mining, food, technology, and real estate sectors.",
    de: "DN Holding ist eine internationale Holdinggesellschaft, die in den Bereichen Bau, Energie, Bergbau, Lebensmittel, Technologie und Immobilien tätig ist.",
    fr: "DN Holding est une société holding internationale opérant dans les secteurs de la construction, de l'énergie, de l'exploitation minière, de l'alimentation, de la technologie et de l'immobilier.",
  };

  const currentTitle = titleByLang[lang] || titleByLang.tr;
  const currentDesc = descByLang[lang] || descByLang.tr;

  return {
    title: {
      default: currentTitle,
      template: `%s | DN Holding`,
    },
    description: currentDesc,
    keywords: lang === "tr"
      ? [
          "DN Holding",
          "holding şirketi",
          "inşaat",
          "enerji",
          "madencilik",
          "Türkiye",
          "uluslararası",
        ]
      : [
          "DN Holding",
          "holding company",
          "construction",
          "energy",
          "mining",
          "Turkey",
          "international",
        ],
    authors: [{ name: "DN Holding" }],
    creator: "DN Holding",
    openGraph: {
      type: "website",
      locale: lang === "tr" ? "tr_TR" : lang === "de" ? "de_DE" : "en_US",
      siteName: "DN Holding",
      title: currentTitle,
      description: currentDesc,
    },
    twitter: {
      card: "summary_large_image",
    },
    robots: {
      index: true,
      follow: true,
    },
    manifest: "/manifest.json",
    icons: {
      icon: [
        { url: "/favicon/favicon.ico" },
        { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      ],
      apple: "/favicon/apple-icon.png",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = await getCurrentLocale();
  const dict = await getDictionary();

  return (
    <html
      lang={lang}
      className={`antialiased ${outfit.variable}`}
      suppressHydrationWarning
    >
      <head>
      </head>
      <body className="min-h-screen flex flex-col bg-surface text-text transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem storageKey="dn-theme">
          <Header lang={lang} dict={dict} />
          <main className="flex-1">{children}</main>
          <Footer lang={lang} dict={dict} />
          <CookieWidget dict={dict} />
        </ThemeProvider>
      </body>
    </html>
  );
}
