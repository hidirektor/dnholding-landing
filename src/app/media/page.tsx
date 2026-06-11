import {getCurrentLocale, getDictionary} from "@/app/dictionaries";
import {Section} from "@/components/layout/Section";
import {Container} from "@/components/layout/Container";
import {Heading} from "@/components/ui/Heading";
import {ScrollReveal} from "@/components/ui/ScrollReveal";
import {BreadcrumbNav} from "@/components/content/BreadcrumbNav";
import {NewsCard} from "@/components/content/NewsCard";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const lang = await getCurrentLocale();
  const isTR = lang === "tr";
  return {
    title: isTR ? "Medya & Haberler" : "Media & News",
    description: isTR
      ? "DN Holding'den en güncel haberler ve basın bültenleri."
      : "Latest news and press releases from DN Holding.",
  };
}

export default async function MediaPage({ params }: { params: Promise<{ slug: string }> }) {
  const lang = await getCurrentLocale();
  
  const dict = await getDictionary();
  const locale = lang;

  const breadcrumbs = [
    { label: dict.nav.home, href: `` },
    { label: dict.nav.media, href: `/media` },
  ];

  return (
    <>
      <Section variant="dark" padding="none">
        <div className="pt-32 pb-20">
          <Container>
            <ScrollReveal>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">
                {dict.media.tagline}
              </p>
              <Heading level="h1" display className="text-white max-w-3xl">
                {dict.media.title}
              </Heading>
              <p className="text-white/60 text-lg mt-4 max-w-2xl">
                {dict.media.subtitle}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dict.data.news.map((article: any, index: number) => (
              <ScrollReveal key={article.slug} delay={index * 80}>
                <NewsCard
                  title={article.title}
                  excerpt={article.excerpt}
                  date={article.date}
                  category={article.category}
                  image={article.image}
                  slug={article.slug}
                  lang={locale}
                />
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
