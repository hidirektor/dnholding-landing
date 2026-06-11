import {getCurrentLocale, getDictionary} from "@/app/dictionaries";
import {Section} from "@/components/layout/Section";
import {Container} from "@/components/layout/Container";
import {Heading} from "@/components/ui/Heading";
import {CompanyCard} from "@/components/content/CompanyCard";
import {ScrollReveal} from "@/components/ui/ScrollReveal";
import {BreadcrumbNav} from "@/components/content/BreadcrumbNav";
import {companies} from "@/data/companies";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const lang = await getCurrentLocale();
  const isTR = lang === "tr";
  return {
    title: isTR ? "Grup Şirketleri" : "Group Companies",
    description: isTR
      ? "DN Holding bünyesindeki grup şirketlerini keşfedin."
      : "Discover the group companies within DN Holding.",
  };
}

export default async function GroupCompaniesPage({ params }: { params: Promise<{ slug: string }> }) {
  const lang = await getCurrentLocale();
  
  const dict = await getDictionary();
  const locale = lang;

  const breadcrumbs = [
    { label: dict.nav.home, href: `/${lang}` },
    { label: dict.nav.companies, href: `/${lang}/grup-sirketleri` },
  ];

  return (
    <>
      {/* Page Header */}
      <Section variant="dark" padding="none">
        <div className="pt-32 pb-20">
          <Container>
            <ScrollReveal>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">
                {dict.companies.tagline}
              </p>
              <Heading level="h1" display className="text-white max-w-3xl">
                {dict.companies.title}
              </Heading>
              <p className="text-white/60 text-lg mt-4 max-w-2xl">
                {dict.companies.subtitle}
              </p>
            </ScrollReveal>
          </Container>
        </div>
      </Section>

      {/* Breadcrumb */}
      <Section variant="default" padding="none">
        <Container>
          <div className="py-6">
            <BreadcrumbNav items={breadcrumbs} lang={locale} />
          </div>
        </Container>
      </Section>

      {/* Companies Grid */}
      <Section variant="default">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {companies.map((company, index) => (
              <ScrollReveal key={company.slug} delay={index * 100}>
                <CompanyCard
                  name={company.name}
                  slug={company.slug}
                  description={company.description[locale]}
                  sector={company.sector[locale]}
                  accentColor={company.accentColor}
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
