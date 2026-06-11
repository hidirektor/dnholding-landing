"use client";

import { cn } from "@/lib/utils";
import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

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
  default: "bg-white dark:bg-primary-dark",
  dark: "bg-primary text-text-inverse dark:bg-primary-dark",
  accent: "bg-accent/5 dark:bg-accent/10",
  surface: "bg-surface dark:bg-primary-dark/50",
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
      {children}
    </section>
  );
}

export default Section;
