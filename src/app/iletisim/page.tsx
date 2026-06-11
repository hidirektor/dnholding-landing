import {getDictionary, hasLocale, type Locale} from "../dictionaries";
import {notFound} from "next/navigation";
import {Section} from "@/components/layout/Section";
import {Container} from "@/components/layout/Container";
import {Heading} from "@/components/ui/Heading";
import {ScrollReveal} from "@/components/ui/ScrollReveal";
import {BreadcrumbNav} from "@/components/content/BreadcrumbNav";
import {ContactForm} from "@/components/content/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isTR = lang === "tr";
  return {
    title: isTR ? "İletişim" : "Contact",
    description: isTR
      ? "DN Holding ile iletişime geçin."
      : "Get in touch with DN Holding.",
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const locale = lang as Locale;

  const breadcrumbs = [
    { label: dict.nav.home, href: `/${lang}` },
    { label: dict.nav.contact, href: `/${lang}/iletisim` },
  ];

  return (
    <>
      <Section variant="dark" padding="none">
        <div className="pt-32 pb-20">
          <Container>
            <ScrollReveal>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-4">
                {dict.contact.tagline}
              </p>
              <Heading level="h1" display className="text-white max-w-3xl">
                {dict.contact.title}
              </Heading>
              <p className="text-white/60 text-lg mt-4 max-w-2xl">
                {dict.contact.subtitle}
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
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <ScrollReveal>
                <ContactForm lang={locale} dict={dict.contact.form} />
              </ScrollReveal>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <ScrollReveal direction="right" delay={200}>
                <div className="space-y-8">
                  {/* Address */}
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-[var(--radius-md)] bg-accent/10 flex items-center justify-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-accent"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg">{dict.contact.info.addressTitle}</h3>
                    <p className="text-text-secondary leading-relaxed">
                      {dict.contact.info.address}
                    </p>
                  </div>

                  {/* Phone */}
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-[var(--radius-md)] bg-accent/10 flex items-center justify-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-accent"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg">{dict.contact.info.phoneTitle}</h3>
                    <a
                      href="tel:+902120000000"
                      className="text-text-secondary hover:text-accent transition-colors"
                    >
                      +90 (212) 000 00 00
                    </a>
                  </div>

                  {/* Email */}
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-[var(--radius-md)] bg-accent/10 flex items-center justify-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-accent"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg">{dict.contact.info.emailTitle}</h3>
                    <a
                      href="mailto:info@dnholding.com"
                      className="text-text-secondary hover:text-accent transition-colors"
                    >
                      info@dnholding.com
                    </a>
                  </div>

                  {/* Working Hours */}
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-[var(--radius-md)] bg-accent/10 flex items-center justify-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-accent"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg">{dict.contact.info.hoursTitle}</h3>
                    <p className="text-text-secondary leading-relaxed">
                      {dict.contact.info.hours}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
