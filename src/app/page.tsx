import {getCurrentLocale, getDictionary} from "./dictionaries";
import {HeroSection} from "@/components/content/HeroSection";
import {Section} from "@/components/layout/Section";
import {Container} from "@/components/layout/Container";
import {Heading} from "@/components/ui/Heading";
import {Button} from "@/components/ui/Button";
import {ScrollReveal} from "@/components/ui/ScrollReveal";
import {GridSectors} from "@/components/ui/GridSectors";
import {CompanyTabs} from "@/components/ui/CompanyTabs";
import {ProjectBento} from "@/components/ui/ProjectBento";
import {NewsCard} from "@/components/ui/NewsCard";
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
        bgVideo="/assets/videos/hero-bg-3.mp4"
      />

      {/* ─── Business Areas ─── */}
      <Section variant="default" padding="none">
        <GridSectors 
          lang={locale}
          className="w-full border-t border-[var(--color-border)] rounded-none"
          items={[
            { icon: <IconConstruction />, label: dict.home.areas.items[0], href: "/business-areas/construction", image: "/assets/image/sector/section-mermer.jpeg" },
            { icon: <IconEnergy />, label: dict.home.areas.items[1], href: "/business-areas/energy", image: "/assets/image/sector/section-energy.jpeg" },
            { icon: <IconMining />, label: dict.home.areas.items[2], href: "/business-areas/mining", image: "/assets/image/sector/section-mine.JPG" },
          ]}
        />
      </Section>

      {/* ─── About Teaser ─── */}
      <Section variant="surface" id="about-teaser" className="border-b border-border/40 pb-0">
        <Container>
          <div className="flex flex-col gap-16 lg:gap-24 pt-8 pb-16 lg:pt-12 lg:pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
              {/* Left Side: Large Title */}
              <div className="lg:col-span-7">
                <ScrollReveal direction="up">
                  <Heading level="h2" display className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-[var(--text-heading)]">
                    <span className="text-primary dark:text-white">{dict.home.about.title.split(',')[0]}{dict.home.about.title.includes(',') ? ',' : ''} </span>
                    <span className="text-accent">{dict.home.about.title.split(',')[1]?.trim() || ''}</span>
                  </Heading>
                </ScrollReveal>
              </div>

              {/* Right Side: Description and Button */}
              <div className="lg:col-span-5 flex flex-col items-start gap-8">
                <ScrollReveal direction="up" delay={100}>
                  <p className="text-lg sm:text-xl text-[var(--text-muted)] font-light leading-relaxed">
                    {dict.home.about.description} {dict.home.about.description2}
                  </p>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={200}>
                  <Button
                    href={`/about`}
                    variant="primary"
                    icon="arrow"
                    className="rounded-full px-8 py-3 bg-primary text-white hover:bg-primary-light border-none shadow-lg"
                  >
                    {dict.common.readMore}
                  </Button>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </Container>

        {/* Bottom Section: Stats (Full Width Container inner border) */}
        <div className="border-t border-border/50 bg-white/50 dark:bg-black/10">
          <Container>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {dict.data.stats.map((stat: any, index: number) => (
                <ScrollReveal
                  key={index}
                  direction="up"
                  delay={100 + index * 100}
                  className="px-6 py-12 border-b sm:border-b-0 lg:border-r border-border/50 last:border-0 flex flex-col justify-center sm:[&:nth-child(2)]:border-r-0 lg:[&:nth-child(2)]:border-r lg:[&:nth-child(3)]:border-r sm:[&:nth-child(odd)]:border-r"
                >
                  <p className="text-sm font-semibold text-[var(--text-heading)] mb-4">{stat.label}</p>
                  <div className="text-5xl lg:text-6xl font-bold text-[var(--text-heading)] mb-2 tracking-tight">
                    {stat.prefix}{stat.value}<span className="text-accent text-4xl">{stat.suffix}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </div>
      </Section>



      {/* ─── Group Companies ─── */}
      <Section variant="surface" id="companies">
        <Container>
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 justify-between items-start lg:items-end">
              <div className="flex-1 space-y-4">
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
        </Container>
      </Section>



      {/* ─── Featured Projects ─── */}
      <Section variant="default" id="projects">
        <Container>
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 justify-between items-start lg:items-end mb-16">
              <div className="flex-1 space-y-4">
                <Heading level="h2" display className="text-[var(--text-heading)] text-4xl lg:text-5xl max-w-lg">
                  {dict.home.projects.title}
                </Heading>
              </div>
              <p className="text-[var(--text-muted)] text-lg lg:max-w-md font-light lg:text-right">
                {dict.home.projects.subtitle}
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-8">
            <ScrollReveal>
              <ProjectBento projects={featuredProjects} lang={locale} dict={dict} />
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* ─── Latest News ─── */}
      <Section variant="surface" id="news">
        <Container>
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 justify-between items-start lg:items-end mb-16">
              <div className="flex-1 space-y-4">
                <Heading level="h2" display className="text-[var(--text-heading)] text-4xl lg:text-5xl max-w-lg">
                  {dict.home.news.title}
                </Heading>
              </div>
              <p className="text-[var(--text-muted)] text-lg lg:max-w-md font-light lg:text-right">
                {dict.home.news.subtitle}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {latestNews.map((article: any, index: number) => (
              <ScrollReveal key={article.slug} delay={index * 100}>
                <NewsCard
                  title={article.title}
                  description={article.excerpt}
                  image={article.image || article.images?.[0] || "/assets/image/logo/logo_dnholding.png"}
                  href={`/media/${article.slug}`}
                  category={locale === "tr" ? "Haber" : "News"}
                  readTime={locale === "tr" ? "5 dk okuma" : "5 mins read"}
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
