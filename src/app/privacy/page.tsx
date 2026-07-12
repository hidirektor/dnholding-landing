import {getCurrentLocale, getDictionary} from "@/app/dictionaries";
import {Container} from "@/components/layout/Container";
import {Section} from "@/components/layout/Section";
import {Heading} from "@/components/ui/Heading";
import {LegalDocsViewer} from "@/components/ui/LegalDocsViewer";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Gizlilik ve Yasal Metinler | DN Holding",
  description: "DN Holding gizlilik politikası, kullanım koşulları ve yasal metinleri.",
};

export default async function PrivacyPage() {
  const lang = await getCurrentLocale();
  const dict = await getDictionary();

  return (
    <>
      {/* ─── Minimal Hero ─── */}
      <Section variant="surface" className="pt-32 pb-16 lg:pt-40 lg:pb-24 border-b border-border/40">
        <Container>
          <div className="max-w-3xl">
            <p className="text-accent font-semibold tracking-widest uppercase text-xs mb-4">
              {lang === "tr" ? "Yasal Bilgiler" : "Legal Information"}
            </p>
            <Heading level="h1" display className="text-4xl lg:text-6xl font-light mb-6 text-[var(--color-text-heading)]">
              {lang === "tr" ? "Gizlilik ve Şartlar" : "Privacy & Terms"}
            </Heading>
            <p className="text-lg text-[var(--color-text-secondary)] font-light leading-relaxed">
              {lang === "tr" 
                ? "DN Holding olarak verilerinizin güvenliğine önem veriyoruz. Hizmetlerimizi kullanırken tabi olduğunuz kurallar ve haklarınızı aşağıdan inceleyebilirsiniz."
                : "At DN Holding, we value your data security. Review the rules and rights that apply when using our services below."}
            </p>
          </div>
        </Container>
      </Section>

      {/* ─── Legal Docs Viewer ─── */}
      <Section variant="default" className="py-16 lg:py-24">
        <Container>
          <LegalDocsViewer dict={dict} />
        </Container>
      </Section>
    </>
  );
}
