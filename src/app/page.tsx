import {getCurrentLocale, getDictionary} from "./dictionaries";
import {HeroSection} from "@/components/content/HeroSection";
import {CompanyCard} from "@/components/content/CompanyCard";
import {StatsBar} from "@/components/content/StatsBar";
import {ProjectCard} from "@/components/content/ProjectCard";
import {NewsCard} from "@/components/content/NewsCard";
import {Section} from "@/components/layout/Section";
import {Container} from "@/components/layout/Container";
import {Heading} from "@/components/ui/Heading";
import {Button} from "@/components/ui/Button";
import {ScrollReveal} from "@/components/ui/ScrollReveal";
import {SectionDivider} from "@/components/content/SectionDivider";
import {HorizontalAccordion} from "@/components/ui/HorizontalAccordion";
import {
  IconConstruction,
  IconEnergy,
  IconFood,
  IconMining,
  IconRealEstate,
  IconTechnology
} from "@/components/ui/Icons";

export async function generateMetadata() {
  const lang = await getCurrentLocale();
  const dict = await getDictionary();
  return {
    title: dict.home.hero.title,
    description: dict.home.hero.subtitle,
  };
}

export default async function HomePage() {
  const lang = await getCurrentLocale();
  const dict = await getDictionary();
  const locale = lang;
  const featuredCompanies = dict.data.companies.filter((c: any) => c.featured).slice(0, 6);
  const featuredProjects = dict.data.projects.slice(0, 3);
  const latestNews = dict.data.news.filter((n: any) => n.featured).slice(0, 3);

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
      />

      {/* ─── Stats Bar ─── */}
      <StatsBar
        stats={dict.data.stats.map((stat: any) => ({
          value: stat.value,
          label: stat.label,
          suffix: stat.suffix,
          prefix: stat.prefix,
        }))}
        variant="dark"
      />

      {/* ─── About Teaser ─── */}
      <Section variant="default" id="about-teaser">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScrollReveal direction="left">
              <div className="space-y-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                  {dict.home.about.tagline}
                </p>
                <Heading level="h2" display>
                  {dict.home.about.title}
                </Heading>
                <p className="text-text-secondary text-lg leading-relaxed">
                  {dict.home.about.description}
                </p>
                <p className="text-text-secondary leading-relaxed">
                  {dict.home.about.description2}
                </p>
                <Button
                  href={`/about`}
                  variant="secondary"
                  icon="arrow"
                >
                  {dict.common.readMore}
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={200}>
              <div className="relative aspect-[4/3] rounded-[var(--radius-xl)] overflow-hidden bg-surface-dark">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <div className="w-20 h-20 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="text-3xl font-display font-bold text-accent">DN</span>
                    </div>
                    <p className="text-sm text-text-secondary max-w-xs">
                      {dict.home.about.imageCaption}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      <SectionDivider variant="gradient" />

      {/* ─── Group Companies ─── */}
      <Section variant="surface" id="companies">
        <Container>
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">
                {dict.home.companies.tagline}
              </p>
              <Heading level="h2" display>
                {dict.home.companies.title}
              </Heading>
              <p className="text-text-secondary text-lg mt-4 max-w-2xl mx-auto">
                {dict.home.companies.subtitle}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCompanies.map((company, index) => (
              <ScrollReveal key={company.slug} delay={index * 100}>
                <CompanyCard
                  name={company.name}
                  slug={company.slug}
                  description={company.description}
                  sector={company.sector}
                  accentColor={company.accentColor}
                  lang={locale}
                />
              </ScrollReveal>
            ))}
          </div>

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

      {/* ─── Business Areas Teaser ─── */}
      <Section variant="dark" id="business-areas">
        <Container>
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">
                {dict.home.areas.tagline}
              </p>
              <Heading level="h2" display className="text-white">
                {dict.home.areas.title}
              </Heading>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <HorizontalAccordion 
              items={[
                { icon: <IconConstruction />, label: dict.home.areas.items[0] },
                { icon: <IconEnergy />, label: dict.home.areas.items[1] },
                { icon: <IconMining />, label: dict.home.areas.items[2] },
                { icon: <IconFood />, label: dict.home.areas.items[3] },
                { icon: <IconTechnology />, label: dict.home.areas.items[4] },
                { icon: <IconRealEstate />, label: dict.home.areas.items[5] },
              ]}
            />
          </ScrollReveal>

          <ScrollReveal>
            <div className="text-center mt-12">
              <Button
                href={`/business-areas`}
                variant="primary"
                icon="arrow"
              >
                {dict.common.discover}
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* ─── Featured Projects ─── */}
      <Section variant="default" id="projects">
        <Container>
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">
                {dict.home.projects.tagline}
              </p>
              <Heading level="h2" display>
                {dict.home.projects.title}
              </Heading>
              <p className="text-text-secondary text-lg mt-4 max-w-2xl mx-auto">
                {dict.home.projects.subtitle}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <ScrollReveal key={project.slug} delay={index * 100}>
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  company={project.company}
                  category={project.category}
                  image={(project as any).image}
                  slug={project.slug}
                  lang={locale}
                />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mt-12">
              <Button
                href={`/projects`}
                variant="secondary"
                icon="arrow"
              >
                {dict.common.viewAll}
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      <SectionDivider variant="wave" />

      {/* ─── Latest News ─── */}
      <Section variant="surface" id="news">
        <Container>
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">
                {dict.home.news.tagline}
              </p>
              <Heading level="h2" display>
                {dict.home.news.title}
              </Heading>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.map((article, index) => (
              <ScrollReveal key={article.slug} delay={index * 100}>
                <NewsCard
                  title={article.title}
                  excerpt={article.excerpt}
                  date={article.date}
                  category={article.category}
                  image={(article as any).image}
                  slug={article.slug}
                  lang={locale}
                />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mt-12">
              <Button
                href={`/media`}
                variant="secondary"
                icon="arrow"
              >
                {dict.common.viewAll}
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* ─── CTA Section ─── */}
      <Section variant="default" padding="none">
        <div className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5" />
          <Container>
            <ScrollReveal>
              <div className="relative text-center max-w-3xl mx-auto space-y-6">
                <Heading level="h2" display>
                  {dict.home.cta.title}
                </Heading>
                <p className="text-text-secondary text-lg">
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
