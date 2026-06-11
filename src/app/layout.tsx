import type {Metadata, Viewport} from "next";
import "./globals.css";
import {Header} from "@/components/layout/Header";
import {Footer} from "@/components/layout/Footer";
import {CookieWidget} from "@/components/layout/CookieWidget";
import {PreferencesWidget} from "@/components/layout/PreferencesWidget";
import {getCurrentLocale, getDictionary} from "./dictionaries";

import {ThemeProvider} from "@/components/layout/ThemeProvider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a1a2e",
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getCurrentLocale();
  const isTR = lang === "tr";

  return {
    title: {
      default: isTR
        ? "DN Holding — Geleceği İnşa Ediyoruz"
        : "DN Holding — Building the Future",
      template: isTR ? "%s | DN Holding" : "%s | DN Holding",
    },
    description: isTR
      ? "DN Holding, inşaat, enerji, madencilik, gıda, teknoloji ve gayrimenkul alanlarında faaliyet gösteren uluslararası bir holding şirketidir."
      : "DN Holding is an international holding company operating across construction, energy, mining, food, technology, and real estate sectors.",
    keywords: isTR
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
      locale: isTR ? "tr_TR" : "en_US",
      siteName: "DN Holding",
      title: isTR
        ? "DN Holding — Geleceği İnşa Ediyoruz"
        : "DN Holding — Building the Future",
      description: isTR
        ? "DN Holding, inşaat, enerji, madencilik, gıda, teknoloji ve gayrimenkul alanlarında faaliyet gösteren uluslararası bir holding şirketidir."
        : "DN Holding is an international holding company operating across construction, energy, mining, food, technology, and real estate sectors.",
    },
    twitter: {
      card: "summary_large_image",
    },
    robots: {
      index: true,
      follow: true,
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
      className="antialiased"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col bg-surface text-text transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Header lang={lang} />
          <main className="flex-1">{children}</main>
          <Footer lang={lang} />
          <CookieWidget dict={dict.cookie} />
          <PreferencesWidget currentLang={lang.toUpperCase()} />
        </ThemeProvider>
      </body>
    </html>
  );
}
