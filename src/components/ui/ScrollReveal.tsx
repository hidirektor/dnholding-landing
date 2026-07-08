"use client";

import {useRef} from "react";

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
  
  // We disable the intersection observer effects completely for now 
  // because it was causing visibility and overlapping bugs.
  
  return (
    <div
      ref={ref}
      className={className}
    >
      {children}
    </div>
  );
}
