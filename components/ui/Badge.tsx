import React from "react";
import {cn} from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "outline";
}

export function Badge({ className, variant = "default", children, ...props }: BadgeProps) {
  const variants = {
    default: "bg-surface-darker text-text-secondary dark:bg-white/10 dark:text-white/80",
    accent: "bg-accent/10 text-accent dark:bg-accent/20",
    outline: "border border-border text-text-secondary dark:border-white/20 dark:text-white/80",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
