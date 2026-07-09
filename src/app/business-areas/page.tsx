import {getCurrentLocale, getDictionary} from "@/app/dictionaries";
import {Section} from "@/components/layout/Section";
import {Container} from "@/components/layout/Container";
import {Heading} from "@/components/ui/Heading";
import {ScrollReveal} from "@/components/ui/ScrollReveal";
import {BreadcrumbNav} from "@/components/content/BreadcrumbNav";
import {Button} from "@/components/ui/Button";
import {IconConstruction, IconEnergy, IconMining} from "@/components/ui/Icons";
import Image from "next/image";

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

const businessAreas: Record<string, { icon: React.ReactNode; image: string; title: string; description: string }[]> = {
  tr: [
    {
      icon: <IconConstruction />,
      image: "/images/marble-block.jpg",
      title: "Mermer",
      description:
        "Dünya standartlarında yüksek kaliteli mermer üretimi ve ihracatıyla projelerinize estetik ve değer katıyoruz.",
    },
    {
      icon: <IconMining />,
      image: "/images/chrome-ore.jpg",
      title: "Maden",
      description:
        "Çevreye duyarlı ve sürdürülebilir madencilik faaliyetleri ile ülkemizin yeraltı zenginliklerini ekonomiye kazandırıyoruz.",
    },
    {
      icon: <IconEnergy />,
      image: "/images/solar-plant.jpg",
      title: "Enerji",
      description:
        "Yenilenebilir enerji yatırımları, enerji üretim tesisleri ve enerji dağıtım altyapıları ile sürdürülebilir geleceğe katkıda bulunuyoruz.",
    },
  ],
  en: [
    {
      icon: <IconConstruction />,
      image: "/images/marble-block.jpg",
      title: "Marble",
      description:
        "We add aesthetics and value to your projects with our world-class high-quality marble production and export.",
    },
    {
      icon: <IconMining />,
      image: "/images/chrome-ore.jpg",
      title: "Mining",
      description:
        "We bring our country's underground riches to the economy with environmentally friendly and sustainable mining activities.",
    },
    {
      icon: <IconEnergy />,
      image: "/images/solar-plant.jpg",
      title: "Energy",
      description:
        "Contributing to a sustainable future with renewable energy investments, power generation facilities, and energy distribution infrastructure.",
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
    { label: dict.nav.areas, href: `/business-areas` },
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
                <div className="group h-full rounded-[var(--radius-xl)] border border-[var(--card-border)] hover:border-accent/30 bg-[var(--card-bg)] hover:shadow-[var(--shadow-large)] transition-all duration-[var(--duration-medium)] flex flex-col items-center overflow-hidden">
                  <div className="relative w-full h-48 sm:h-56 mb-6 overflow-hidden">
                    <Image src={area.image} alt={area.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                      {area.icon}
                    </div>
                  </div>
                  <div className="px-8 pb-8 text-center flex flex-col items-center flex-1">
                    <h3 className="text-xl font-semibold mb-4 group-hover:text-accent transition-colors">
                      {area.title}
                    </h3>
                    <p className="text-[var(--text-muted)] leading-relaxed">
                      {area.description}
                    </p>
                  </div>
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
                href={`/contact`}
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
