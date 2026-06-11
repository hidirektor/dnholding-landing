import React from "react";
import {cn} from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "bordered";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "bg-white dark:bg-surface-dark/10 shadow-[var(--shadow-subtle)]",
      glass: "glass dark:glass-dark",
      bordered: "border border-border bg-white dark:border-white/10 dark:bg-transparent",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[var(--radius-xl)] overflow-hidden transition-all duration-[var(--duration-medium)]",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";
