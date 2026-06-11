import {getCurrentLocale, getDictionary} from "@/app/dictionaries";
import {Section} from "@/components/layout/Section";
import {Container} from "@/components/layout/Container";
import {Heading} from "@/components/ui/Heading";
import {Badge} from "@/components/ui/Badge";
import {Button} from "@/components/ui/Button";
import {ScrollReveal} from "@/components/ui/ScrollReveal";
import {BreadcrumbNav} from "@/components/content/BreadcrumbNav";
import {formatDate} from "@/lib/utils";
import trDict from "@/app/dictionaries/tr.json";
import {notFound} from "next/navigation";

export async function generateStaticParams() {
  return trDict.data.news.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dict = await getDictionary();
  const article = dict.data.news.find((n: any) => n.slug === slug);
  if (!article) return { title: "Not Found" };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lang = await getCurrentLocale();
  const dict = await getDictionary();
  const locale = lang;
  
  const article = dict.data.news.find((n: any) => n.slug === slug);
  if (!article) notFound();

  const breadcrumbs = [
    { label: dict.nav.home, href: `` },
    { label: dict.nav.media, href: `/medya` },
    { label: article.title, href: `/medya/${slug}` },
  ];

  const relatedArticles = dict.data.news
    .filter((n: any) => n.slug !== slug)
    .slice(0, 2);

  return (
    <>
      {/* Article Hero */}
      <Section variant="dark" padding="none">
        <div className="pt-32 pb-20">
          <Container narrow>
            <ScrollReveal>
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge variant="accent">{article.category}</Badge>
                <time className="text-white/50 text-sm flex items-center">
                  {formatDate(article.date, locale)}
                </time>
              </div>
              <Heading level="h1" display className="text-white">
                {article.title}
              </Heading>
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

      {/* Article Content */}
      <Section variant="default">
        <Container narrow>
          <ScrollReveal>
            <article className="space-y-6">
              <p className="text-lg text-text-secondary leading-relaxed font-medium">
                {article.excerpt}
              </p>
              <div className="border-t border-border pt-6">
                <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                  {article.content || article.excerpt}
                </p>
              </div>
            </article>
          </ScrollReveal>

          {/* Share */}
          <ScrollReveal delay={200}>
            <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
              <p className="text-sm text-text-light">{dict.common.share}</p>
              <div className="flex gap-3">
                <button className="w-10 h-10 rounded-[var(--radius-md)] border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </button>
                <button className="w-10 h-10 rounded-[var(--radius-md)] border border-border flex items-center justify-center hover:border-accent hover:text-accent transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <Section variant="surface">
          <Container>
            <ScrollReveal>
              <Heading level="h3" display className="text-center mb-12">
                {dict.media.related}
              </Heading>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {relatedArticles.map((ra) => (
                <ScrollReveal key={ra.slug}>
                  <a
                    href={`/medya/${ra.slug}`}
                    className="group block p-6 rounded-[var(--radius-xl)] border border-border hover:border-accent/20 transition-all hover:shadow-[var(--shadow-medium)]"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="outline">{ra.category}</Badge>
                      <time className="text-sm text-text-light">
                        {formatDate(ra.date, locale)}
                      </time>
                    </div>
                    <h4 className="text-lg font-semibold group-hover:text-accent transition-colors">
                      {ra.title}
                    </h4>
                    <p className="text-text-secondary text-sm mt-2 line-clamp-2">
                      {ra.excerpt}
                    </p>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Back CTA */}
      <Section variant="default">
        <Container narrow>
          <ScrollReveal>
            <div className="text-center space-y-4">
              <Button
                href={`/medya`}
                variant="secondary"
                icon="arrow"
              >
                {dict.common.viewAll} {dict.nav.media}
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </>
  );
}
