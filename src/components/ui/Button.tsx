import React from "react";
import Link from "next/link";
import {cn} from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: "arrow" | null;
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", icon, href, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 rounded-[var(--radius-md)]";
    
    const variants = {
      primary: "bg-gradient-to-r from-accent to-accent-light text-white hover:shadow-[var(--shadow-glow)] hover:-translate-y-0.5",
      secondary: "border-2 border-primary text-primary hover:bg-primary hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-primary",
      ghost: "text-text hover:text-accent bg-transparent hover:bg-surface dark:text-white dark:hover:bg-white/10",
    };
    
    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    const iconSvg = icon === "arrow" && (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    );

    const classes = cn(baseStyles, variants[variant], sizes[size], "group", className);

    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
          {iconSvg}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
        {iconSvg}
      </button>
    );
  }
);
Button.displayName = "Button";
