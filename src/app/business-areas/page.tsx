import {getCurrentLocale, getDictionary} from "@/app/dictionaries";
import {Section} from "@/components/layout/Section";
import {Container} from "@/components/layout/Container";
import {Heading} from "@/components/ui/Heading";
import {ScrollReveal} from "@/components/ui/ScrollReveal";
import {BreadcrumbNav} from "@/components/content/BreadcrumbNav";
import {Button} from "@/components/ui/Button";
import {IconConstruction, IconEnergy, IconMining} from "@/components/ui/Icons";

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
        "Dünya standartlarında yüksek kaliteli projelerle yaşam alanlarına değer katıyoruz.",
    },
    {
      icon: <IconMining />,
      title: "Maden",
      description:
        "Çevreye duyarlı ve sürdürülebilir madencilik faaliyetleri ile ülkemizin yeraltı zenginliklerini ekonomiye kazandırıyoruz.",
    },
    {
      icon: <IconEnergy />,
      title: "Enerji",
      description:
        "Yenilenebilir enerji yatırımları, enerji üretim tesisleri ve enerji dağıtım altyapıları ile sürdürülebilir geleceğe katkıda bulunuyoruz.",
    },
  ],
  en: [
    {
      icon: <IconConstruction />,
      title: "Construction & Infrastructure",
      description:
        "We add value to living spaces with world-class high-quality projects.",
    },
    {
      icon: <IconMining />,
      title: "Mining",
      description:
        "We bring our country's underground riches to the economy with environmentally friendly and sustainable mining activities.",
    },
    {
      icon: <IconEnergy />,
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
