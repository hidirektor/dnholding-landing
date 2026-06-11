import {getDictionary, hasLocale, type Locale} from "../dictionaries";
import {notFound} from "next/navigation";
import {Section} from "@/components/layout/Section";
import {Container} from "@/components/layout/Container";
import {Heading} from "@/components/ui/Heading";
import {ScrollReveal} from "@/components/ui/ScrollReveal";
import {BreadcrumbNav} from "@/components/content/BreadcrumbNav";
import {Button} from "@/components/ui/Button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isTR = lang === "tr";
  return {
    title: isTR ? "Faaliyet Alanları" : "Business Areas",
    description: isTR
      ? "DN Holding'in faaliyet gösterdiği sektörler ve iş alanları."
      : "The sectors and business areas where DN Holding operates.",
  };
}

const businessAreas = {
  tr: [
    {
      icon: "🏗️",
      title: "İnşaat & Altyapı",
      description:
        "Mega projelerden altyapı çalışmalarına, konut projelerinden endüstriyel tesislere kadar geniş yelpazede hizmet sunuyoruz.",
    },
    {
      icon: "⚡",
      title: "Enerji",
      description:
        "Yenilenebilir enerji yatırımları, enerji üretim tesisleri ve enerji dağıtım altyapıları ile sürdürülebilir geleceğe katkıda bulunuyoruz.",
    },
    {
      icon: "⛏️",
      title: "Madencilik",
      description:
        "Doğal taş, mermer ve maden çıkarma operasyonları ile Türkiye'nin zengin kaynaklarını dünyaya sunuyoruz.",
    },
    {
      icon: "🍃",
      title: "Gıda & Tarım",
      description:
        "Organik tarım, gıda işleme ve dağıtım alanlarında sağlıklı ve sürdürülebilir ürünler üretiyoruz.",
    },
    {
      icon: "💻",
      title: "Teknoloji",
      description:
        "Dijital dönüşüm, yazılım geliştirme ve akıllı sistem çözümleri ile geleceğin teknolojilerini inşa ediyoruz.",
    },
    {
      icon: "🏢",
      title: "Gayrimenkul",
      description:
        "Premium konut projeleri, ticari gayrimenkul geliştirme ve yatırım danışmanlığı hizmetleri sunuyoruz.",
    },
  ],
  en: [
    {
      icon: "🏗️",
      title: "Construction & Infrastructure",
      description:
        "From mega projects to infrastructure works, residential projects to industrial facilities, we deliver across a wide spectrum.",
    },
    {
      icon: "⚡",
      title: "Energy",
      description:
        "Contributing to a sustainable future with renewable energy investments, power generation facilities, and energy distribution infrastructure.",
    },
    {
      icon: "⛏️",
      title: "Mining",
      description:
        "Presenting Turkey's rich natural resources to the world through natural stone, marble, and mining extraction operations.",
    },
    {
      icon: "🍃",
      title: "Food & Agriculture",
      description:
        "Producing healthy and sustainable products in organic agriculture, food processing, and distribution sectors.",
    },
    {
      icon: "💻",
      title: "Technology",
      description:
        "Building the technologies of the future with digital transformation, software development, and smart system solutions.",
    },
    {
      icon: "🏢",
      title: "Real Estate",
      description:
        "Offering premium residential projects, commercial real estate development, and investment advisory services.",
    },
  ],
};

export default async function BusinessAreasPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const locale = lang as Locale;
  const areas = businessAreas[locale];

  const breadcrumbs = [
    { label: dict.nav.home, href: `/${lang}` },
    { label: dict.nav.areas, href: `/${lang}/faaliyet-alanlari` },
  ];

  return (
    <>
      <Section variant="dark" padding="none">
        <div className="pt-32 pb-20">
          <Container>
            <ScrollReveal>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">
                {dict.areas.tagline}
              </p>
              <Heading level="h1" display className="text-white max-w-3xl">
                {dict.areas.title}
              </Heading>
              <p className="text-white/60 text-lg mt-4 max-w-2xl">
                {dict.areas.subtitle}
              </p>
            </ScrollReveal>
          </Container>
        </div>
      </Section>

      <Section variant="default" padding="none">
        <Container>
          <div className="py-6">
            <BreadcrumbNav items={breadcrumbs} lang={locale} />
          </div>
        </Container>
      </Section>

      <Section variant="default">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {areas.map((area, index) => (
              <ScrollReveal key={area.title} delay={index * 80}>
                <div className="group h-full p-8 rounded-[var(--radius-xl)] border border-border hover:border-accent/30 bg-white hover:shadow-[var(--shadow-large)] transition-all duration-[var(--duration-medium)]">
                  <div className="text-4xl mb-6">{area.icon}</div>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-accent transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {area.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section variant="accent">
        <Container narrow>
          <ScrollReveal>
            <div className="text-center space-y-6">
              <Heading level="h3" display>
                {dict.common.contactCta}
              </Heading>
              <Button
                href={`/${lang}/iletisim`}
                variant="primary"
                size="lg"
                icon="arrow"
              >
                {dict.common.contactUs}
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </>
  );
}
