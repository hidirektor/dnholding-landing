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

  const companyProjects = dict.data.projects.filter((p: any) => p.company === company.name).slice(0, 3);

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
                  <Image src="/logo_dnholding.png" alt={`${company.name} logo`} width={128} height={128} className="object-contain" />
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
                  <p className="text-text-secondary text-lg mt-4 max-w-2xl">
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
