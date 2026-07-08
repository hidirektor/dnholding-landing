"use client";

import {Heading} from "@/components/ui/Heading";
import {Container} from "@/components/layout/Container";
import Link from "next/link";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  variant?: "default" | "short";
  stats?: {
    value: string;
    label: string;
    suffix?: string;
    prefix?: string;
  }[];
}

export function HeroSection({
  title,
  subtitle,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  variant = "default",
  stats,
}: HeroSectionProps) {
  return (
    <section className={`relative flex items-center overflow-hidden bg-primary ${variant === "default" ? "min-h-[90vh] pb-0" : "min-h-[50vh] pt-32"}`}>
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/assets/projects/marmo-showroom-cladding/ivory-veincut-1.mp4" type="video/mp4" />
        </video>
      </div>

      <Container className="relative z-20 flex-1 pt-32 pb-24 md:pb-32 flex flex-col justify-center">
        <div className="max-w-3xl space-y-8 animate-fade-in-up text-left">
          <Heading level="h1" display className="text-white text-5xl md:text-7xl leading-tight font-bold">
            {title}
          </Heading>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl font-light leading-relaxed">
            {subtitle}
          </p>
          
          {(ctaText || secondaryCtaText) && (
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              {ctaText && ctaHref && (
                <Link href={ctaHref} className="inline-flex items-center justify-center bg-white text-black font-semibold text-sm px-8 py-3.5 rounded hover:bg-gray-100 transition-colors w-full sm:w-auto">
                  {ctaText}
                  <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
              {secondaryCtaText && secondaryCtaHref && (
                <Link href={secondaryCtaHref} className="inline-flex items-center justify-center bg-transparent border border-white text-white font-semibold text-sm px-8 py-3.5 rounded hover:bg-white/10 transition-colors w-full sm:w-auto">
                  {secondaryCtaText}
                  <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          )}
        </div>
      </Container>

      {/* Stats Card Floating on Bottom Right */}
      {stats && stats.length > 0 && variant === "default" && (
        <div className="absolute bottom-8 right-8 lg:bottom-12 lg:right-12 z-30 hidden md:block">
          <div className="bg-white rounded-[32px] px-10 py-8 lg:px-12 flex gap-8 lg:gap-12 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
            {stats.slice(0, 3).map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <span className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {stat.prefix}{stat.value}{stat.suffix}
                </span>
                <span className="text-xs lg:text-sm text-gray-500 font-semibold uppercase tracking-wider max-w-[120px]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
