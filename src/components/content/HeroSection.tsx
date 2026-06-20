"use client";

import {Heading} from "@/components/ui/Heading";
import {Button} from "@/components/ui/Button";
import {Container} from "@/components/layout/Container";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  variant?: "default" | "short";
}

export function HeroSection({
  title,
  subtitle,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  variant = "default",
}: HeroSectionProps) {
  return (
    <section className={`relative flex items-center justify-center overflow-hidden bg-primary ${variant === "default" ? "min-h-[90vh]" : "min-h-[50vh] pt-32"}`}>
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/50 to-primary z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070')] bg-cover bg-center" />
      </div>

      <Container className="relative z-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          <Heading level="h1" display className="text-white text-5xl md:text-7xl leading-tight">
            {title}
          </Heading>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
            {subtitle}
          </p>
          
          {(ctaText || secondaryCtaText) && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              {ctaText && ctaHref && (
                <Button href={ctaHref} size="lg" icon="arrow" className="w-full sm:w-auto">
                  {ctaText}
                </Button>
              )}
              {secondaryCtaText && secondaryCtaHref && (
                <Button href={secondaryCtaHref} variant="outline-white" size="lg" className="w-full sm:w-auto">
                  {secondaryCtaText}
                </Button>
              )}
            </div>
          )}
        </div>
      </Container>

      {variant === "default" && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center p-2">
            <div className="w-1.5 h-3 bg-white rounded-full animate-scroll-indicator" />
          </div>
        </div>
      )}
    </section>
  );
}
