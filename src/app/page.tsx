import {getCurrentLocale, getDictionary} from "./dictionaries";
import {HeroSection} from "@/components/content/HeroSection";
import {Section} from "@/components/layout/Section";
import {Container} from "@/components/layout/Container";
import {Heading} from "@/components/ui/Heading";
import {Button} from "@/components/ui/Button";
import {ScrollReveal} from "@/components/ui/ScrollReveal";
import {GridSectors} from "@/components/ui/GridSectors";
import {CompanyTabs} from "@/components/ui/CompanyTabs";
import {HorizontalCard} from "@/components/ui/HorizontalCard";
import {IconConstruction, IconEnergy, IconMining} from "@/components/ui/Icons";


export default async function HomePage() {
  const lang = await getCurrentLocale();
  const dict = await getDictionary();
  const locale = lang;
  const featuredCompanies = dict.data.companies;
  const featuredProjects = dict.data.projects.slice(0, 6);
  const latestNews = dict.data.news.slice(0, 6);

  return (
    <>
      {/* ─── Hero Section ─── */}
      <HeroSection
        title={dict.home.hero.title}
        subtitle={dict.home.hero.subtitle}
        ctaText={dict.home.hero.cta}
        ctaHref={`/about`}
        secondaryCtaText={dict.home.hero.secondaryCta}
        secondaryCtaHref={`/companies`}
        stats={dict.data.stats.map((stat: any) => ({
          value: stat.value,
          label: stat.label,
          suffix: stat.suffix,
          prefix: stat.prefix,
        }))}
      />

      {/* ─── Business Areas ─── */}
      <Section variant="default" padding="none">
        <GridSectors 
          lang={locale}
          className="w-full border-t border-[var(--color-border)] rounded-none"
          items={[
            { icon: <IconConstruction />, label: dict.home.areas.items[0], href: "/business-areas/construction", image: "/images/marble-block.jpg" },
            { icon: <IconEnergy />, label: dict.home.areas.items[1], href: "/business-areas/energy", image: "/images/solar-plant.jpg" },
            { icon: <IconMining />, label: dict.home.areas.items[2], href: "/business-areas/mining", image: "/images/chrome-ore.jpg" },
          ]}
        />
      </Section>

      {/* ─── About Teaser ─── */}
      <Section variant="surface" id="about-teaser">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal direction="left">
              <div className="space-y-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                  {dict.home.about.tagline}
                </p>
                <Heading level="h2" display className="text-[var(--text-heading)]">
                  {dict.home.about.title}
                </Heading>
                <p className="text-[var(--text-muted)] text-lg leading-relaxed font-light">
                  {dict.home.about.description}
                </p>
                <p className="text-[var(--text-muted)] leading-relaxed font-light">
                  {dict.home.about.description2}
                </p>
                <div className="pt-4">
                  <Button
                    href={`/about`}
                    variant="primary"
                    icon="arrow"
                  >
                    {dict.common.readMore}
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={200}>
              <div 
                className="relative aspect-[4/3] rounded-[var(--radius-2xl)] overflow-hidden shadow-2xl group hover:-translate-y-2 transition-all duration-700 bg-cover bg-center"
                style={{ backgroundImage: 'url(/about-bg.jpg)' }}
              >
                {/* Subtle dark overlay for contrast */}
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-700" />
                
                {/* Floating Glass Card */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="text-center space-y-6 p-10 relative z-10 backdrop-blur-xl bg-white/60 dark:bg-black/40 rounded-3xl border border-white/60 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] max-w-[85%] w-full transform group-hover:scale-105 transition-transform duration-700">
                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-white to-white/50 dark:from-white/10 dark:to-transparent flex items-center justify-center shadow-lg border border-white/80 dark:border-white/20">
                      <span className="text-4xl font-display font-bold text-primary dark:text-white">DN</span>
                    </div>
                    <p className="text-base font-semibold text-primary dark:text-white/90 max-w-xs mx-auto leading-relaxed tracking-wide">
                      {dict.home.about.imageCaption}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>



      {/* ─── Group Companies ─── */}
      <Section variant="surface" id="companies">
        <Container>
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 justify-between items-start lg:items-end">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-subtle)]">
                    {dict.home.companies.tagline}
                  </p>
                </div>
                <Heading level="h2" display className="text-[var(--text-heading)] text-4xl lg:text-5xl max-w-lg">
                  {dict.home.companies.title}
                </Heading>
              </div>
              <p className="text-[var(--text-muted)] text-lg lg:max-w-md font-light lg:text-right">
                {dict.home.companies.subtitle}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <CompanyTabs companies={featuredCompanies} lang={locale} />
          </ScrollReveal>

          <ScrollReveal>
            <div className="text-center mt-12">
              <Button
                href={`/companies`}
                variant="secondary"
                icon="arrow"
              >
                {dict.common.viewAll}
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </Section>



      {/* ─── Featured Projects ─── */}
      <Section variant="default" id="projects">
        <Container>
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 justify-between items-start lg:items-end mb-16">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-subtle)]">
                    {dict.home.projects.tagline}
                  </p>
                </div>
                <Heading level="h2" display className="text-[var(--text-heading)] text-4xl lg:text-5xl max-w-lg">
                  {dict.home.projects.title}
                </Heading>
              </div>
              <p className="text-[var(--text-muted)] text-lg lg:max-w-md font-light lg:text-right">
                {dict.home.projects.subtitle}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {featuredProjects.map((project, index) => (
              <ScrollReveal key={project.slug} delay={index * 100}>
                <HorizontalCard
                  number={String(index + 1).padStart(2, '0')}
                  title={project.title}
                  description={project.description}
                  image={(project as any).image}
                  href={`/projects/${project.slug}`}
                  linkText={locale === "tr" ? "Projeyi İncele" : "View Project"}
                />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mt-12">
              <Button href={`/projects`} variant="secondary" icon="arrow">
                {dict.common.viewAll}
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* ─── Latest News ─── */}
      <Section variant="surface" id="news">
        <Container>
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 justify-between items-start lg:items-end mb-16">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-subtle)]">
                    {dict.home.news.tagline}
                  </p>
                </div>
                <Heading level="h2" display className="text-[var(--text-heading)] text-4xl lg:text-5xl max-w-lg">
                  {dict.home.news.title}
                </Heading>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {latestNews.map((article, index) => (
              <ScrollReveal key={article.slug} delay={index * 100}>
                <HorizontalCard
                  number={String(index + 1).padStart(2, '0')}
                  title={article.title}
                  description={article.excerpt}
                  image={(article as any).image}
                  href={`/media/${article.slug}`}
                  linkText={locale === "tr" ? "Haber Detayı" : "Read More"}
                />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mt-12">
              <Button href={`/media`} variant="secondary" icon="arrow">
                {dict.common.viewAll}
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* ─── CTA Section ─── */}
      <Section variant="surface" padding="none">
        <div className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 dark:from-accent/10 dark:via-accent/20 dark:to-accent/10" />
          <Container>
            <ScrollReveal>
              <div className="relative text-center max-w-3xl mx-auto space-y-6">
                <Heading level="h2" display className="text-[var(--text-heading)]">
                  {dict.home.cta.title}
                </Heading>
                <p className="text-[var(--text-muted)] text-lg font-light">
                  {dict.home.cta.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button
                    href={`/contact`}
                    variant="primary"
                    size="lg"
                    icon="arrow"
                  >
                    {dict.home.cta.button}
                  </Button>
                  <Button
                    href={`/projects`}
                    variant="secondary"
                    size="lg"
                  >
                    {dict.home.cta.secondaryButton}
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </Container>
        </div>
      </Section>
    </>
  );
}
