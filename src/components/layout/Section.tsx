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

const variantStyles: Record<SectionVariant, string> = {
  default: "bg-primary-dark text-white",
  dark: "bg-primary text-white",
  accent: "bg-primary-light text-white",
  surface: "bg-[#0a192f] text-white", // Same as primary-dark but we can keep it for semantic mapping
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
    threshold: 0.1,
    rootMargin: "0px 0px -60px 0px",
  });

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        "relative overflow-hidden",
        padding === "default" && "py-[var(--spacing-section)]",
        padding === "small" && "py-[var(--spacing-section-sm)]",
        padding === "none" && "py-0",
        variantStyles[variant],
        animate && "transition-opacity duration-[var(--duration-slow)] ease-[var(--ease-premium)]",
        animate && (isVisible ? "opacity-100" : "opacity-0"),
        className
      )}
    >
      {/* Premium Background Decorations */}
      {variant === "default" && (
        <>
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.015] pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
          <div className="absolute -top-[500px] -left-[500px] w-[1000px] h-[1000px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-[500px] -right-[500px] w-[1000px] h-[1000px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
        </>
      )}

      {variant === "surface" && (
        <>
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] pointer-events-none mix-blend-overlay" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        </>
      )}
      
      {variant === "dark" && (
        <>
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
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
