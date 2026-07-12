import Image from "next/image";
import {getCurrentLocale, getDictionary} from "@/app/dictionaries";
import {Section} from "@/components/layout/Section";
import {Container} from "@/components/layout/Container";
import {Heading} from "@/components/ui/Heading";
import {Badge} from "@/components/ui/Badge";
import {Button} from "@/components/ui/Button";
import {ScrollReveal} from "@/components/ui/ScrollReveal";
import {BreadcrumbNav} from "@/components/content/BreadcrumbNav";
import trDict from "@/app/dictionaries/tr.json";
import {notFound} from "next/navigation";

export async function generateStaticParams() {
  return trDict.data.projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dict = await getDictionary();
  const project = dict.data.projects.find((p: any) => p.slug === slug);
  if (!project) return { title: "Not Found" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lang = await getCurrentLocale();
  const dict = await getDictionary();
  const locale = lang;
  
  const project = dict.data.projects.find((p: any) => p.slug === slug);
  if (!project) notFound();

  const breadcrumbs = [
    { label: dict.nav.home, href: `` },
    { label: dict.nav.projects, href: `/projects` },
    { label: project.title, href: `/projects/${slug}` },
  ];

  const relatedProjects = dict.data.projects
    .filter((p: any) => p.slug !== slug && p.company === project.company)
    .slice(0, 2);

  return (
    <>
      {/* Project Hero */}
      <Section variant="dark" padding="none">
        <div className="pt-32 pb-20">
          <Container>
            <ScrollReveal>
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge variant="accent">{project.category}</Badge>
                <Badge variant="outline">{project.year}</Badge>
                {project.location && (
                  <Badge variant="outline">{project.location}</Badge>
                )}
              </div>
              <Heading level="h1" display className="text-white max-w-4xl">
                {project.title}
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
              <p className="text-[var(--text-muted)] text-lg leading-relaxed">
                {project.description}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="mt-12 p-8 rounded-[var(--radius-xl)] bg-[var(--card-bg)] border border-[var(--card-border)]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-text-light mb-1">{dict.projects.detail.category}</p>
                  <p className="font-semibold">{project.category}</p>
                </div>
                <div>
                  <p className="text-sm text-text-light mb-1">{dict.projects.detail.year}</p>
                  <p className="font-semibold">{project.year}</p>
                </div>
                <div>
                  <p className="text-sm text-text-light mb-1">{dict.projects.detail.location}</p>
                  <p className="font-semibold">{project.location || "—"}</p>
                </div>
                <div>
                  <p className="text-sm text-text-light mb-1">{dict.projects.detail.company}</p>
                  <p className="font-semibold">{project.company}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Image Gallery */}
          {(project as any).images && (project as any).images.length > 0 && (
            <ScrollReveal delay={300}>
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-2xl font-bold mb-6 text-text">{(dict.common as any).gallery || "Galeri"}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {(project as any).images.map((img: string, idx: number) => (
                    <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
                      <Image 
                        src={img} 
                        alt={`${project.title} - ${idx + 1}`} 
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

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
              {relatedProjects.map((rp: any) => (
                <ScrollReveal key={rp.slug}>
                  <a
                    href={`/projects/${rp.slug}`}
                    className="group block p-6 rounded-[var(--radius-xl)] border border-border hover:border-accent/20 transition-all hover:shadow-[var(--shadow-medium)]"
                  >
                    <Badge variant="outline" className="mb-3">
                      {rp.category}
                    </Badge>
                    <h4 className="text-lg font-semibold group-hover:text-accent transition-colors">
                      {rp.title}
                    </h4>
                    <p className="text-[var(--text-muted)] text-sm mt-2 line-clamp-2">
                      {rp.description}
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
                href={`/projects`}
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
