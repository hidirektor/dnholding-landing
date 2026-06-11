import {getCurrentLocale, getDictionary} from "@/app/dictionaries";
import {Section} from "@/components/layout/Section";
import {Container} from "@/components/layout/Container";
import {Heading} from "@/components/ui/Heading";
import {Badge} from "@/components/ui/Badge";
import {ScrollReveal} from "@/components/ui/ScrollReveal";
import {BreadcrumbNav} from "@/components/content/BreadcrumbNav";
import {Button} from "@/components/ui/Button";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const lang = await getCurrentLocale();
  const isTR = lang === "tr";
  return {
    title: isTR ? "Ürünler & Hizmetler" : "Products & Services",
    description: isTR
      ? "DN Holding grup şirketlerinin sunduğu ürün ve hizmetler."
      : "Products and services offered by DN Holding group companies.",
  };
}

export default async function ProductsPage({ params }: { params: Promise<{ slug: string }> }) {
  const lang = await getCurrentLocale();
  
  const dict = await getDictionary();
  const locale = lang;

  const breadcrumbs = [
    { label: dict.nav.home, href: `` },
    { label: dict.nav.products, href: `/urunler` },
  ];

  return (
    <>
      <Section variant="dark" padding="none">
        <div className="pt-32 pb-20">
          <Container>
            <ScrollReveal>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">
                {dict.products.tagline}
              </p>
              <Heading level="h1" display className="text-white max-w-3xl">
                {dict.products.title}
              </Heading>
              <p className="text-white/60 text-lg mt-4 max-w-2xl">
                {dict.products.subtitle}
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
          <div className="space-y-16">
            {dict.data.companies.map((company: any, index: number) => (
              <ScrollReveal key={company.slug} delay={index * 100}>
                <div className="group p-8 lg:p-12 rounded-[var(--radius-xl)] border border-border hover:border-accent/20 transition-all duration-[var(--duration-medium)] hover:shadow-[var(--shadow-large)]">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                    <div
                      className="w-14 h-14 rounded-[var(--radius-lg)] flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                      style={{ backgroundColor: company.accentColor }}
                    >
                      {company.name.split(" ").pop()?.charAt(0)}
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-semibold">{company.name}</h3>
                        <Badge variant="outline">{company.sector}</Badge>
                      </div>
                      <p className="text-text-secondary leading-relaxed">
                        {company.description}
                      </p>
                      <Button
                        href={`/grup-sirketleri/${company.slug}`}
                        variant="ghost"
                        size="sm"
                        icon="arrow"
                      >
                        {dict.common.discover}
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
