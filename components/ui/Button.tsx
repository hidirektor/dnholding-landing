import Link from "next/link";
import {cn} from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: "arrow" | string;
  href?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-primary hover:bg-accent-light shadow-[var(--shadow-medium)] hover:shadow-[var(--shadow-glow)] dark:text-primary-dark",
  secondary:
    "bg-transparent text-text border border-border hover:border-accent hover:text-accent dark:text-text-inverse dark:border-white/20 dark:hover:border-accent",
  ghost:
    "bg-transparent text-text-secondary hover:text-accent hover:bg-accent/5 dark:text-text-light dark:hover:text-accent",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-2.5 text-sm gap-2",
  lg: "px-8 py-3.5 text-base gap-2.5",
};

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("w-4 h-4 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-premium)] group-hover:translate-x-1", className)}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.333 8h9.334M8.667 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  href,
  className,
  type = "button",
  disabled = false,
  onClick,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = cn(
    "group inline-flex items-center justify-center font-medium rounded-[var(--radius-md)]",
    "transition-all duration-[var(--duration-medium)] ease-[var(--ease-premium)]",
    "focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2",
    "active:scale-[0.97]",
    "disabled:opacity-50 disabled:pointer-events-none",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  const content = (
    <>
      {children}
      {icon === "arrow" && <ArrowIcon />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}

export default Button;
