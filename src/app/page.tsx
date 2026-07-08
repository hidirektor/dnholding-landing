import {getCurrentLocale, getDictionary} from "./dictionaries";
import {HeroSection} from "@/components/content/HeroSection";
import {CompanyCard} from "@/components/content/CompanyCard";
import {ProjectCard} from "@/components/content/ProjectCard";
import {NewsCard} from "@/components/content/NewsCard";
import {Section} from "@/components/layout/Section";
import {Container} from "@/components/layout/Container";
import {Heading} from "@/components/ui/Heading";
import {Button} from "@/components/ui/Button";
import {ScrollReveal} from "@/components/ui/ScrollReveal";
import {SectionDivider} from "@/components/content/SectionDivider";
import {HorizontalAccordion} from "@/components/ui/HorizontalAccordion";
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



      {/* ─── About Teaser ─── */}
      <Section variant="surface" id="about-teaser">
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
              <div className="relative aspect-[4/3] rounded-[var(--radius-2xl)] overflow-hidden bg-white dark:bg-primary-dark shadow-2xl border border-border/20 group hover:-translate-y-2 transition-all duration-700">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10 opacity-70 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-colors duration-700"></div>
                <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-700"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-6 p-8 relative z-10 backdrop-blur-sm bg-white/30 dark:bg-black/20 rounded-3xl border border-white/40 dark:border-white/10 shadow-xl max-w-[80%]">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-accent/20 to-primary/20 flex items-center justify-center backdrop-blur-md shadow-inner border border-white/50 dark:border-white/10">
                      <span className="text-3xl font-display font-bold text-primary dark:text-white">DN</span>
                    </div>
                    <p className="text-sm font-medium text-text max-w-xs mx-auto leading-relaxed">
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
      <Section variant="dark" id="companies">
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
      <Section variant="default" id="business-areas">
        <Container>
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">
                {dict.home.areas.tagline}
              </p>
              <Heading level="h2" display>
                {dict.home.areas.title}
              </Heading>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <HorizontalAccordion 
              items={[
                { icon: <IconConstruction />, label: dict.home.areas.items[0], image: "/media/marble-block.jpg" },
                { icon: <IconEnergy />, label: dict.home.areas.items[1], image: "/media/solar-plant.jpg" },
                { icon: <IconMining />, label: dict.home.areas.items[2], image: "/media/chrome-ore.jpg" },
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
      <Section variant="surface" id="projects">
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
      <Section variant="dark" id="news">
        <Container>
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">
                {dict.home.news.tagline}
              </p>
              <Heading level="h2" display className="text-white">
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
