import {cn} from "@/lib/utils";

type BadgeVariant = "default" | "accent" | "outline";
type BadgeSize = "sm" | "md";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-surface-dark text-text-secondary dark:bg-white/10 dark:text-text-light",
  accent:
    "bg-accent/10 text-accent-dark dark:bg-accent/20 dark:text-accent-light",
  outline:
    "bg-transparent text-text-secondary border border-border dark:text-text-light dark:border-white/20",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-[11px]",
  md: "px-3 py-1 text-xs",
};

export function Badge({
  children,
  variant = "default",
  size = "md",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium uppercase tracking-wider rounded-full whitespace-nowrap",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}

export default Badge;
