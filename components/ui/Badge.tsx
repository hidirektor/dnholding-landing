import {cn} from '@/lib/utils';

/* ─── Types ─── */
export type BadgeVariant = 'default' | 'accent' | 'outline';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  children: React.ReactNode;
  /** Visual variant */
  variant?: BadgeVariant;
  /** Size preset */
  size?: BadgeSize;
  /** Optional dot indicator before the label */
  dot?: boolean;
  /** Optional icon element */
  icon?: React.ReactNode;
  className?: string;
}

/* ─── Style Maps ─── */
const variantStyles: Record<BadgeVariant, string> = {
  default: [
    'bg-surface-dark text-text-secondary',
    'dark:bg-white/10 dark:text-text-light',
  ].join(' '),
  accent: [
    'bg-accent/15 text-accent-dark',
    'dark:bg-accent/20 dark:text-accent-light',
  ].join(' '),
  outline: [
    'bg-transparent text-text-secondary',
    'border border-border',
    'dark:text-text-light dark:border-white/20',
  ].join(' '),
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2.5 py-0.5 text-[11px] gap-1',
  md: 'px-3 py-1 text-xs gap-1.5',
};

const dotColors: Record<BadgeVariant, string> = {
  default: 'bg-text-light',
  accent: 'bg-accent',
  outline: 'bg-text-light',
};

/* ─── Component ─── */
export function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  icon,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold uppercase tracking-wider',
        'rounded-full whitespace-nowrap select-none',
        'transition-colors duration-[var(--duration-fast)] ease-[var(--ease-premium)]',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {dot && (
        <span
          className={cn(
            'shrink-0 rounded-full',
            size === 'sm' ? 'w-1 h-1' : 'w-1.5 h-1.5',
            dotColors[variant],
          )}
          aria-hidden="true"
        />
      )}
      {icon && (
        <span className="shrink-0 [&>svg]:w-3 [&>svg]:h-3" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}

export default Badge;
