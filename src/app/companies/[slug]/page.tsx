import {getCurrentLocale, getDictionary} from "@/app/dictionaries";
import {Section} from "@/components/layout/Section";
import {Container} from "@/components/layout/Container";
import {Heading} from "@/components/ui/Heading";
import {Button} from "@/components/ui/Button";
import {Badge} from "@/components/ui/Badge";
import {ScrollReveal} from "@/components/ui/ScrollReveal";
import {BreadcrumbNav} from "@/components/content/BreadcrumbNav";
import trDict from "@/app/dictionaries/tr.json";
import {notFound} from "next/navigation";
import Image from "next/image";
import fs from "fs";
import path from "path";

export async function generateStaticParams() {
  return trDict.data.companies.map((company) => ({ slug: company.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dict = await getDictionary();
  const company = dict.data.companies.find((c: any) => c.slug === slug);
  if (!company) return { title: "Not Found" };
  return {
    title: company.name,
    description: company.description,
  };
}

export default async function CompanyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lang = await getCurrentLocale();
  const dict = await getDictionary();
  const locale = lang;
  
  const company = dict.data.companies.find((c: any) => c.slug === slug);
  if (!company) notFound();

  const breadcrumbs = [
    { label: dict.nav.home, href: `` },
    { label: dict.nav.companies, href: `/companies` },
    { label: company.name, href: `/companies/${slug}` },
  ];

  const companyProjects = dict.data.projects ? dict.data.projects.filter((p: any) => p.company === company.name).slice(0, 3) : [];
  const companyQuarries = dict.data.quarries ? dict.data.quarries.filter((q: any) => q.companySlug === slug) : [];
  const companyProducts = dict.data.products ? dict.data.products.filter((p: any) => p.companySlug === slug) : [];

  const logoPath = `/assets/image/companies/${company.slug}.png`;
  const fullLogoPath = path.join(process.cwd(), 'public', logoPath);
  const logoSrc = fs.existsSync(fullLogoPath) ? logoPath : '/assets/image/logo/logo_dnholding.png';

  return (
    <>
      {/* Company Hero */}
      <Section variant="default" padding="none">
        <div
          className="pt-32 pb-20 relative"
          style={{
            background: `linear-gradient(135deg, ${company.accentColor}08, ${company.accentColor}15)`,
          }}
        >
          <Container>
            <ScrollReveal>
              <div className="flex flex-col gap-6">
                <div className="w-32 h-32 rounded-lg bg-white border border-border/50 shadow-sm flex items-center justify-center overflow-hidden p-4">
                  <Image src={logoSrc} alt={`${company.name} logo`} width={128} height={128} className="object-contain" />
                </div>
                <div>
                  <Badge
                    variant="outline"
                    className="mb-3"
                  >
                    {company.sector}
                  </Badge>
                  <Heading level="h1" display>
                    {company.name}
                  </Heading>
                  <p className="text-[var(--text-muted)] text-lg mt-4 max-w-2xl">
                    {company.description}
                  </p>
                </div>
              </div>
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


      {/* Quarries */}
      {companyQuarries.length > 0 && (
        <Section variant="surface">
          <Container>
            <ScrollReveal>
              <div className="mb-12">
                <Heading level="h2" display>{dict.companies?.sections?.quarries || "Ocaklarımız"}</Heading>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {companyQuarries.map((quarry: any, idx: number) => (
                <ScrollReveal key={quarry.slug} delay={idx * 100}>
                  <div className="bg-white dark:bg-[var(--card-bg)] border border-border dark:border-[var(--card-border)] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-48 relative bg-slate-100 dark:bg-slate-800">
                       <Image src={quarry.image || "/assets/placeholder.jpg"} alt={quarry.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{quarry.name}</h3>
                      <h4 className="text-sm text-accent mb-4 font-semibold">{quarry.title}</h4>
                      <p className="text-[var(--text-muted)] text-sm whitespace-pre-wrap leading-relaxed">{quarry.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Products */}
      {companyProducts.length > 0 && (
        <Section variant="default">
          <Container>
            <ScrollReveal>
              <div className="mb-12">
                <Heading level="h2" display>{dict.companies?.sections?.products || "Ürünlerimiz"}</Heading>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {companyProducts.map((product: any, idx: number) => (
                <ScrollReveal key={product.id} delay={idx * 100}>
                  <div className="bg-[var(--card-bg)] border border-border dark:border-[var(--card-border)] rounded-2xl overflow-hidden group">
                    <div className="h-64 relative bg-slate-100 dark:bg-slate-800 overflow-hidden">
                       <Image src={product.image || "/assets/placeholder.jpg"} alt={product.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-bold">{product.name}</h3>
                      <p className="text-[var(--text-muted)] text-sm mt-2">{product.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* CTA */}
      <Section variant="default">
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
