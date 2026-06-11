import type {Metadata, Viewport} from "next";
import {Outfit, Playfair_Display} from "next/font/google";
import "../globals.css";
import {Header} from "@/components/layout/Header";
import {Footer} from "@/components/layout/Footer";
import {CookieWidget} from "@/components/layout/CookieWidget";
import {PreferencesWidget} from "@/components/layout/PreferencesWidget";
import {hasLocale, type Locale} from "./dictionaries";
import {notFound} from "next/navigation";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a1a2e",
};

export async function generateStaticParams() {
  return [{ lang: "tr" }, { lang: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
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
    alternates: {
      languages: {
        tr: "/tr",
        en: "/en",
      },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  return (
    <html
      lang={lang}
      className={`${outfit.variable} ${playfair.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-surface text-text">
        <Header lang={lang as Locale} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang as Locale} />
        <CookieWidget />
        <PreferencesWidget />
      </body>
    </html>
  );
}
