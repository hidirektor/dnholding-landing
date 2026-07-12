"use client";

import {cn} from "@/lib/utils";
import {useRef} from "react";
import {useIntersectionObserver} from "@/hooks/useIntersectionObserver";

type SectionVariant = "default" | "dark" | "accent" | "surface";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: SectionVariant;
  id?: string;
  animate?: boolean;
  padding?: "default" | "small" | "none";
}

/**
 * Theme-aware section variants:
 * - "default": Light → white bg, dark text | Dark → deep navy bg, white text
 * - "surface": Light → soft gray bg, dark text | Dark → slightly lighter navy, white text 
 * - "dark":    Always dark (brand identity) — navy bg, white text in both themes
 * - "accent":  Always dark accent — slightly lighter navy bg, white text
 */
const variantBgVars: Record<SectionVariant, string> = {
  default: "var(--section-default-bg)",
  surface: "var(--section-surface-bg)",
  dark: "var(--section-dark-bg)",
  accent: "var(--section-accent-bg)",
};

const variantTextVars: Record<SectionVariant, string> = {
  default: "var(--section-default-text)",
  surface: "var(--section-surface-text)",
  dark: "#ffffff",
  accent: "#ffffff",
};

export function Section({
  children,
  className,
  variant = "default",
  id,
  animate = true,
  padding = "default",
}: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(ref, {
    threshold: 0,
    rootMargin: "0px 0px -60px 0px",
  });

  return (
    <section
      ref={ref}
      id={id}
      style={{
        backgroundColor: variantBgVars[variant],
        color: variantTextVars[variant]
      }}
      className={cn(
        "relative overflow-hidden",
        padding === "default" && "py-[var(--spacing-section)]",
        padding === "small" && "py-[var(--spacing-section-sm)]",
        padding === "none" && "py-0",
        className
      )}
    >
      {/* Premium Background Decorations */}
      {variant === "default" && (
        <>
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.015] dark:opacity-[0.03] pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent dark:via-white/10" />
          <div className="absolute -top-[500px] -left-[500px] w-[1000px] h-[1000px] rounded-full bg-accent/[0.03] dark:bg-accent/5 blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-[500px] -right-[500px] w-[1000px] h-[1000px] rounded-full bg-primary/[0.02] dark:bg-primary/5 blur-[120px] pointer-events-none" />
        </>
      )}

      {variant === "surface" && (
        <>
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none mix-blend-overlay" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-accent/10 dark:via-accent/20 to-transparent" />
        </>
      )}
      
      {variant === "dark" && (
        <>
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none" />
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />
        </>
      )}

      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}

export default Section;
