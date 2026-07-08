"use client";

import {useRef} from "react";
import {cn} from "@/lib/utils";
import {useIntersectionObserver} from "@/hooks/useIntersectionObserver";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "fade";
  delay?: number;
  duration?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 800,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, {
    threshold: 0,
    rootMargin: "0px 0px -50px 0px",
  });

  const getTransform = () => {
    if (isVisible) return "translate(0, 0) scale(1)";
    switch (direction) {
      case "up": return "translateY(30px)";
      case "down": return "translateY(-30px)";
      case "left": return "translateX(30px)";
      case "right": return "translateX(-30px)";
      case "fade": return "scale(0.95)";
      default: return "translateY(30px)";
    }
  };

  return (
    <div
      ref={ref}
      className={cn("will-change-[opacity,transform]", className)}
      style={{
        opacity: 1, // Fallback to ensure it's visible. We can do isVisible ? 1 : 0 if observer works.
        transform: getTransform(),
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
