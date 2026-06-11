import {getCurrentLocale, getDictionary} from "@/app/dictionaries";
import {Section} from "@/components/layout/Section";
import {Container} from "@/components/layout/Container";
import {Heading} from "@/components/ui/Heading";
import {Badge} from "@/components/ui/Badge";
import {Button} from "@/components/ui/Button";
import {ScrollReveal} from "@/components/ui/ScrollReveal";
import {BreadcrumbNav} from "@/components/content/BreadcrumbNav";
import {projects} from "@/data/projects";

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lang = await getCurrentLocale();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Not Found" };
  const locale = (lang === "en" ? "en" : "tr") as Locale;
  return {
    title: project.title[locale],
    description: project.description[locale],
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lang = await getCurrentLocale();
  
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const dict = await getDictionary();
  const locale = lang;

  const breadcrumbs = [
    { label: dict.nav.home, href: `` },
    { label: dict.nav.projects, href: `/projeler` },
    { label: project.title[locale], href: `/projeler/${slug}` },
  ];

  const relatedProjects = projects
    .filter((p) => p.slug !== slug && p.company === project.company)
    .slice(0, 2);

  return (
    <>
      {/* Project Hero */}
      <Section variant="dark" padding="none">
        <div className="pt-32 pb-20">
          <Container>
            <ScrollReveal>
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge variant="accent">{project.category[locale]}</Badge>
                <Badge variant="outline">{project.year}</Badge>
                {project.location && (
                  <Badge variant="outline">{project.location[locale]}</Badge>
                )}
              </div>
              <Heading level="h1" display className="text-white max-w-4xl">
                {project.title[locale]}
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

      {/* Project Content */}
      <Section variant="default">
        <Container narrow>
          <ScrollReveal>
            <div className="prose prose-lg max-w-none">
              <p className="text-text-secondary text-lg leading-relaxed">
                {project.description[locale]}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="mt-12 p-8 rounded-[var(--radius-xl)] bg-surface border border-border">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-text-light mb-1">{dict.projects.detail.category}</p>
                  <p className="font-semibold">{project.category[locale]}</p>
                </div>
                <div>
                  <p className="text-sm text-text-light mb-1">{dict.projects.detail.year}</p>
                  <p className="font-semibold">{project.year}</p>
                </div>
                <div>
                  <p className="text-sm text-text-light mb-1">{dict.projects.detail.location}</p>
                  <p className="font-semibold">{project.location?.[locale] || "—"}</p>
                </div>
                <div>
                  <p className="text-sm text-text-light mb-1">{dict.projects.detail.company}</p>
                  <p className="font-semibold">{project.company}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </Section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <Section variant="surface">
          <Container>
            <ScrollReveal>
              <Heading level="h3" display className="text-center mb-12">
                {dict.projects.detail.related}
              </Heading>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {relatedProjects.map((rp) => (
                <ScrollReveal key={rp.slug}>
                  <a
                    href={`/projeler/${rp.slug}`}
                    className="group block p-6 rounded-[var(--radius-xl)] border border-border hover:border-accent/20 transition-all hover:shadow-[var(--shadow-medium)]"
                  >
                    <Badge variant="outline" className="mb-3">
                      {rp.category[locale]}
                    </Badge>
                    <h4 className="text-lg font-semibold group-hover:text-accent transition-colors">
                      {rp.title[locale]}
                    </h4>
                    <p className="text-text-secondary text-sm mt-2 line-clamp-2">
                      {rp.description[locale]}
                    </p>
                  </a>
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
            <div className="text-center space-y-4">
              <Button
                href={`/projeler`}
                variant="secondary"
                icon="arrow"
              >
                {dict.common.viewAll} {dict.nav.projects}
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </Section>
    </>
  );
}
