"use client";

import {useEffect, useState} from "react";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {Heading} from "@/components/ui/Heading";
import {Button} from "@/components/ui/Button";

export interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  backgroundImage?: string;
  overlay?: boolean;
}

export function HeroSection({
  title,
  subtitle,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  backgroundImage,
  overlay = true,
}: HeroSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background */}
      {backgroundImage ? (
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
          aria-hidden="true"
        />
      ) : (
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary"
          aria-hidden="true"
        />
      )}

      {/* Overlay gradient */}
      {overlay && (
        <div
          className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/90"
          aria-hidden="true"
        />
      )}

      {/* Decorative accents */}
      <div
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-accent/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/5 blur-3xl"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="container-base relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Title */}
          <div
            className={cn(
              "transition-all duration-[1200ms] ease-[var(--ease-premium)]",
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
          >
            <Heading level="h1" display className="text-white">
              {title}
            </Heading>
          </div>

          {/* Subtitle */}
          <div
            className={cn(
              "transition-all duration-[1200ms] ease-[var(--ease-premium)] delay-200",
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
          >
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed text-balance">
              {subtitle}
            </p>
          </div>

          {/* CTAs */}
          <div
            className={cn(
              "flex flex-col sm:flex-row gap-4 justify-center pt-4",
              "transition-all duration-[1200ms] ease-[var(--ease-premium)] delay-[400ms]",
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
          >
            <Button
              href={ctaHref}
              variant="primary"
              size="lg"
              icon="arrow"
            >
              {ctaText}
            </Button>

            {secondaryCtaText && secondaryCtaHref && (
              <Button
                href={secondaryCtaHref}
                variant="ghost"
                size="lg"
                className="text-white/80 hover:text-white border border-white/20 hover:border-white/40 hover:bg-white/5"
              >
                {secondaryCtaText}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2",
          "transition-all duration-[1200ms] ease-[var(--ease-premium)] delay-[800ms]",
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <span className="text-[11px] uppercase tracking-[0.2em] text-white/40 font-medium">
          Scroll
        </span>
        <svg
          width="20"
          height="30"
          viewBox="0 0 20 30"
          fill="none"
          className="text-white/40"
          aria-hidden="true"
        >
          {/* Mouse outline */}
          <rect
            x="1"
            y="1"
            width="18"
            height="28"
            rx="9"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          {/* Scroll dot */}
          <circle
            cx="10"
            cy="10"
            r="2"
            fill="currentColor"
            className="animate-[scroll-indicator_2s_ease-in-out_infinite]"
          />
        </svg>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent dark:from-primary-dark"
        aria-hidden="true"
      />
    </section>
  );
}

export default HeroSection;
