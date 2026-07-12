import {getCurrentLocale, getDictionary} from "@/app/dictionaries";
import {HeroSection} from "@/components/content/HeroSection";
import {Timeline} from "@/components/content/Timeline";
import {StatsBar} from "@/components/content/StatsBar";
import {Section} from "@/components/layout/Section";
import {Container} from "@/components/layout/Container";
import {Heading} from "@/components/ui/Heading";
import {ScrollReveal} from "@/components/ui/ScrollReveal";
import {BreadcrumbNav} from "@/components/content/BreadcrumbNav";
import {IconGlobal, IconInnovation, IconTrust} from "@/components/ui/Icons";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const lang = await getCurrentLocale();
  const isTR = lang === "tr";
  return {
    title: isTR ? "Hakkımızda" : "About Us",
    description: isTR
      ? "DN Holding'in hikayesi, vizyonu, misyonu ve değerleri."
      : "The story, vision, mission, and values of DN Holding.",
  };
}

export default async function AboutPage({ params }: { params: Promise<{ slug: string }> }) {
  const lang = await getCurrentLocale();
  
  const dict = await getDictionary();
  const locale = lang;

  const breadcrumbs = [
    { label: dict.nav.home, href: `` },
    { label: dict.nav.about, href: `/about` },
  ];

  const timelineItems = dict.about.timeline.items.map(
    (item: { year: string; title: string; description: string; image?: string }) => ({
      year: item.year,
      title: item.title,
      description: item.description,
      image: item.image,
    })
  );

  return (
    <>
      {/* Page Hero */}
      <HeroSection
        title={dict.about.hero.title}
        subtitle={dict.about.hero.subtitle}
        variant="bottom"
        scrollText={dict.common.scrollDown}
      />

      {/* Breadcrumb */}
      <Section variant="default" padding="none">
        <Container>
          <div className="py-6">
            <BreadcrumbNav items={breadcrumbs} lang={locale} />
          </div>
        </Container>
      </Section>

      {/* Company Overview */}
      <Section variant="default">
        <Container>
          <div className="max-w-4xl mx-auto space-y-6">
            {dict.about.overview.paragraphs.map((paragraph: string, index: number) => (
              <ScrollReveal key={index} delay={index * 100}>
                <p className="text-[var(--text-muted)] text-lg leading-relaxed text-justify">
                  {paragraph}
                </p>
              </ScrollReveal>
            ))}
            <ScrollReveal delay={dict.about.overview.paragraphs.length * 100}>
              <ul className="list-disc list-inside text-[var(--text-muted)] text-lg leading-relaxed mt-8 space-y-2 pl-4">
                {dict.about.overview.companies.map((company: string, index: number) => (
                  <li key={index}>{company}</li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* Vision & Mission */}
      <Section variant="surface">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ScrollReveal direction="left">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-[var(--radius-md)] bg-accent/10 flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-accent"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                  </svg>
                </div>
                <Heading level="h3" display>
                  {dict.about.vision.title}
                </Heading>
                <div className="space-y-4">
                  {dict.about.vision.paragraphs.map((paragraph: string, index: number) => (
                    <p key={index} className="text-[var(--text-muted)] text-lg leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={200}>
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-[var(--radius-md)] bg-accent/10 flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-accent"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <Heading level="h3" display>
                  {dict.about.mission.title}
                </Heading>
                <div className="space-y-4">
                  {dict.about.mission.paragraphs.map((paragraph: string, index: number) => (
                    <p key={index} className="text-[var(--text-muted)] text-lg leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* Company Story */}
      <Section variant="default" id="story">
        <Container>
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">
                {dict.about.story.tagline}
              </p>
              <Heading level="h2" display>
                {dict.about.story.title}
              </Heading>
              <p className="text-[var(--text-muted)] text-lg mt-4 max-w-2xl mx-auto">
                {dict.about.story.subtitle}
              </p>
            </div>
          </ScrollReveal>
          <Timeline items={timelineItems} />
        </Container>
      </Section>

      {/* Values */}
      <Section variant="surface">
        <Container>
          <ScrollReveal>
            <div className="text-center mb-16">
              <Heading level="h2" display>
                {dict.about.values.title}
              </Heading>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dict.about.values.items.map(
              (
                value: { title: string; description: string; icon: string },
                index: number
              ) => {
                const IconComponent = index === 0 ? IconTrust : index === 1 ? IconInnovation : IconGlobal;
                return (
                  <ScrollReveal key={value.title} delay={index * 100}>
                    <div className="group p-8 rounded-[var(--radius-xl)] border border-[var(--card-border)] bg-[var(--card-bg)] hover:border-accent transition-all duration-[var(--duration-medium)] hover:shadow-[var(--card-hover-shadow)] flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform duration-500">
                        <IconComponent />
                      </div>
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-[var(--text-muted)] leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </ScrollReveal>
                );
              }
            )}
          </div>
        </Container>
      </Section>

      {/* Stats */}
      <StatsBar
        stats={dict.data.stats.map((stat: any) => ({
          value: stat.value,
          label: stat.label,
          suffix: stat.suffix,
          prefix: stat.prefix,
        }))}
        variant="default"
      />
    </>
  );
}
