import {getCurrentLocale, getDictionary} from "@/app/dictionaries";
import {Section} from "@/components/layout/Section";
import {Container} from "@/components/layout/Container";
import {Heading} from "@/components/ui/Heading";
import {ScrollReveal} from "@/components/ui/ScrollReveal";
import {BreadcrumbNav} from "@/components/content/BreadcrumbNav";
import {Button} from "@/components/ui/Button";
import {
    IconConstruction,
    IconEnergy,
    IconFood,
    IconMining,
    IconRealEstate,
    IconTechnology
} from "@/components/ui/Icons";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const lang = await getCurrentLocale();
  const isTR = lang === "tr";
  return {
    title: isTR ? "Faaliyet Alanları" : "Business Areas",
    description: isTR
      ? "DN Holding'in faaliyet gösterdiği sektörler ve iş alanları."
      : "The sectors and business areas where DN Holding operates.",
  };
}

const businessAreas: Record<string, { icon: React.ReactNode; title: string; description: string }[]> = {
  tr: [
    {
      icon: <IconConstruction />,
      title: "İnşaat & Altyapı",
      description:
        "Mega projelerden altyapı çalışmalarına, konut projelerinden endüstriyel tesislere kadar geniş yelpazede hizmet sunuyoruz.",
    },
    {
      icon: <IconEnergy />,
      title: "Enerji",
      description:
        "Yenilenebilir enerji yatırımları, enerji üretim tesisleri ve enerji dağıtım altyapıları ile sürdürülebilir geleceğe katkıda bulunuyoruz.",
    },
    {
      icon: <IconMining />,
      title: "Madencilik",
      description:
        "Doğal taş, mermer ve maden çıkarma operasyonları ile Türkiye'nin zengin kaynaklarını dünyaya sunuyoruz.",
    },
    {
      icon: <IconFood />,
      title: "Gıda & Tarım",
      description:
        "Organik tarım, gıda işleme ve dağıtım alanlarında sağlıklı ve sürdürülebilir ürünler üretiyoruz.",
    },
    {
      icon: <IconTechnology />,
      title: "Teknoloji",
      description:
        "Dijital dönüşüm, yazılım geliştirme ve akıllı sistem çözümleri ile geleceğin teknolojilerini inşa ediyoruz.",
    },
    {
      icon: <IconRealEstate />,
      title: "Gayrimenkul",
      description:
        "Premium konut projeleri, ticari gayrimenkul geliştirme ve yatırım danışmanlığı hizmetleri sunuyoruz.",
    },
  ],
  en: [
    {
      icon: <IconConstruction />,
      title: "Construction & Infrastructure",
      description:
        "From mega projects to infrastructure works, residential projects to industrial facilities, we deliver across a wide spectrum.",
    },
    {
      icon: <IconEnergy />,
      title: "Energy",
      description:
        "Contributing to a sustainable future with renewable energy investments, power generation facilities, and energy distribution infrastructure.",
    },
    {
      icon: <IconMining />,
      title: "Mining",
      description:
        "Presenting Turkey's rich natural resources to the world through natural stone, marble, and mining extraction operations.",
    },
    {
      icon: <IconFood />,
      title: "Food & Agriculture",
      description:
        "Producing healthy and sustainable products in organic agriculture, food processing, and distribution sectors.",
    },
    {
      icon: <IconTechnology />,
      title: "Technology",
      description:
        "Building the technologies of the future with digital transformation, software development, and smart system solutions.",
    },
    {
      icon: <IconRealEstate />,
      title: "Real Estate",
      description:
        "Offering premium residential projects, commercial real estate development, and investment advisory services.",
    },
  ],
};

export default async function BusinessAreasPage({ params }: { params: Promise<{ slug: string }> }) {
  const lang = await getCurrentLocale();
  
  const dict = await getDictionary();
  const locale = lang;
  const areas = businessAreas[locale] || businessAreas.en;

  const breadcrumbs = [
    { label: dict.nav.home, href: `` },
    { label: dict.nav.areas, href: `/faaliyet-alanlari` },
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
                <div className="group h-full p-8 rounded-[var(--radius-xl)] border border-border hover:border-accent/30 bg-surface hover:shadow-[var(--shadow-large)] transition-all duration-[var(--duration-medium)] text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-surface-dark flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform duration-500">
                    {area.icon}
                  </div>
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
                href={`/iletisim`}
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
