import {cn} from "@/lib/utils";

type CardVariant = "default" | "glass" | "bordered" | "image-overlay";

export interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  hover?: boolean;
  className?: string;
  as?: React.ElementType;
}

const variantStyles: Record<CardVariant, string> = {
  default:
    "bg-white shadow-[var(--shadow-subtle)] dark:bg-primary-light dark:shadow-none",
  glass: "glass dark:glass-dark",
  bordered:
    "bg-white border border-border dark:bg-primary-light dark:border-white/10",
  "image-overlay": "bg-primary relative overflow-hidden",
};

export function Card({
  children,
  variant = "default",
  hover = false,
  className,
  as: Component = "div",
}: CardProps) {
  return (
    <Component
      className={cn(
        "rounded-[var(--radius-lg)] overflow-hidden",
        "transition-all duration-[var(--duration-medium)] ease-[var(--ease-premium)]",
        variantStyles[variant],
        hover && [
          "hover:shadow-[var(--shadow-large)]",
          "hover:-translate-y-1",
          variant !== "image-overlay" && "hover:border-accent/20",
        ],
        className
      )}
    >
      {children}
    </Component>
  );
}

export function CardImage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {children}
    </div>
  );
}

export function CardContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("p-6", className)}>{children}</div>;
}

export default Card;
