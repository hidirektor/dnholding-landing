import Link from 'next/link';
import {cn} from '@/lib/utils';

/* ─── Types ─── */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  children: React.ReactNode;
  /** Visual variant. primary = gold fill, secondary = outline, ghost = text-only */
  variant?: ButtonVariant;
  /** Size preset */
  size?: ButtonSize;
  /** Show an arrow-right icon */
  icon?: boolean;
  /** Icon position relative to label */
  iconPosition?: 'left' | 'right';
  /** Render as a Next.js Link when provided */
  href?: string;
  /** Full width */
  fullWidth?: boolean;
  /** Loading state — shows spinner and disables interaction */
  loading?: boolean;
  /** External link — opens in new tab */
  external?: boolean;
  /** Standard button disabled */
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  'aria-label'?: string;
}

/* ─── Arrow Icon (inline SVG) ─── */
function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn('shrink-0', className)}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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

/* ─── Spinner Icon ─── */
function SpinnerIcon() {
  return (
    <svg
      className="animate-spin shrink-0 w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className="opacity-25"
      />
      <path
        d="M4 12a8 8 0 018-8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className="opacity-75"
      />
    </svg>
  );
}

/* ─── Style Maps ─── */
const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-accent text-primary font-semibold',
    'shadow-[var(--shadow-medium)]',
    'hover:bg-accent-light hover:shadow-[var(--shadow-glow)]',
    'active:bg-accent-dark',
    'dark:text-primary-dark',
  ].join(' '),
  secondary: [
    'bg-transparent text-text border-2 border-accent font-semibold',
    'hover:bg-accent hover:text-primary hover:shadow-[var(--shadow-glow)]',
    'dark:text-text-inverse dark:border-accent dark:hover:text-primary-dark',
  ].join(' '),
  ghost: [
    'bg-transparent text-text-secondary font-medium',
    'hover:text-accent hover:bg-accent/5',
    'dark:text-text-light dark:hover:text-accent',
  ].join(' '),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm gap-1.5 rounded-[var(--radius-sm)]',
  md: 'px-6 py-3 text-sm gap-2 rounded-[var(--radius-md)]',
  lg: 'px-8 py-4 text-base gap-2.5 rounded-[var(--radius-md)]',
};

const iconSizeStyles: Record<ButtonSize, string> = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

/* ─── Component ─── */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon = false,
  iconPosition = 'right',
  href,
  fullWidth = false,
  loading = false,
  external = false,
  disabled = false,
  className,
  type = 'button',
  onClick,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const classes = cn(
    // Base
    'group inline-flex items-center justify-center',
    'whitespace-nowrap leading-tight select-none',
    'transition-all duration-[var(--duration-fast)] ease-[var(--ease-premium)]',
    // Hover scale + active press
    !isDisabled && 'hover:scale-[1.02] active:scale-[0.97]',
    // Focus ring
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
    // Variant & size
    variantStyles[variant],
    sizeStyles[size],
    // Modifiers
    fullWidth && 'w-full',
    isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className,
  );

  const arrowIcon = icon && (
    <ArrowRightIcon
      className={cn(
        iconSizeStyles[size],
        'transition-transform duration-[var(--duration-fast)] ease-[var(--ease-premium)]',
        iconPosition === 'right' && 'group-hover:translate-x-1',
        iconPosition === 'left' && 'group-hover:-translate-x-1',
      )}
    />
  );

  const content = (
    <>
      {loading && <SpinnerIcon />}
      {icon && iconPosition === 'left' && arrowIcon}
      <span>{children}</span>
      {icon && iconPosition === 'right' && arrowIcon}
    </>
  );

  // Link rendering
  if (href && !isDisabled) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          aria-label={ariaLabel}
        >
          {content}
        </a>
      );
    }

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
      disabled={isDisabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}

export default Button;
