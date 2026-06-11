import {getCurrentLocale, getDictionary} from "@/app/dictionaries";
import {Section} from "@/components/layout/Section";
import {Container} from "@/components/layout/Container";
import {Heading} from "@/components/ui/Heading";
import {ScrollReveal} from "@/components/ui/ScrollReveal";
import {BreadcrumbNav} from "@/components/content/BreadcrumbNav";
import {ProjectCard} from "@/components/content/ProjectCard";
import {projects} from "@/data/projects";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const lang = await getCurrentLocale();
  const isTR = lang === "tr";
  return {
    title: isTR ? "Projeler & Referanslar" : "Projects & References",
    description: isTR
      ? "DN Holding'in tamamladığı projeler ve referanslar."
      : "Projects completed and references of DN Holding.",
  };
}

export default async function ProjectsPage({ params }: { params: Promise<{ slug: string }> }) {
  const lang = await getCurrentLocale();
  
  const dict = await getDictionary();
  const locale = lang;

  const breadcrumbs = [
    { label: dict.nav.home, href: `` },
    { label: dict.nav.projects, href: `/projeler` },
  ];

  return (
    <>
      <Section variant="dark" padding="none">
        <div className="pt-32 pb-20">
          <Container>
            <ScrollReveal>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">
                {dict.projects.tagline}
              </p>
              <Heading level="h1" display className="text-white max-w-3xl">
                {dict.projects.title}
              </Heading>
              <p className="text-white/60 text-lg mt-4 max-w-2xl">
                {dict.projects.subtitle}
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
            {projects.map((project, index) => (
              <ScrollReveal key={project.slug} delay={index * 80}>
                <ProjectCard
                  title={project.title[locale]}
                  description={project.description[locale]}
                  company={project.company}
                  category={project.category[locale]}
                  image={project.image}
                  slug={project.slug}
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
