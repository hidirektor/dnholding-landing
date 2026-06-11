import Image from 'next/image';
import Link from 'next/link';
import {cn} from '@/lib/utils';

/* ─── Types ─── */
export type CardVariant = 'default' | 'glass' | 'bordered' | 'image-overlay';

export interface CardImage {
  src: string;
  alt: string;
}

export interface CardProps {
  children?: React.ReactNode;
  /** Visual variant */
  variant?: CardVariant;
  /** Optional image displayed at the top (or as overlay background) */
  image?: CardImage;
  /** Card title rendered in the content area */
  title?: string;
  /** Card description rendered below title */
  description?: string;
  /** Navigate on card click via Next.js Link */
  href?: string;
  /** Lift card on hover with shadow */
  hoverLift?: boolean;
  /** Aspect ratio for the image area (e.g. '16/9', '4/3', '1/1') */
  aspectRatio?: string;
  /** Render wrapper element */
  as?: React.ElementType;
  className?: string;
}

/* ─── Variant Styles ─── */
const variantStyles: Record<CardVariant, string> = {
  default: [
    'bg-white shadow-[var(--shadow-subtle)]',
    'dark:bg-primary-light dark:shadow-none',
  ].join(' '),
  glass: 'glass dark:glass-dark',
  bordered: [
    'bg-white border border-border',
    'dark:bg-primary-light dark:border-white/10',
  ].join(' '),
  'image-overlay': 'bg-primary relative overflow-hidden text-text-inverse',
};

/* ─── Main Card ─── */
export function Card({
  children,
  variant = 'default',
  image,
  title,
  description,
  href,
  hoverLift = false,
  aspectRatio,
  as,
  className,
}: CardProps) {
  // Determine root element
  const isLink = !!href;
  const Component = as ?? (isLink ? 'div' : 'div');

  const cardContent = (
    <>
      {/* Image area */}
      {image && variant !== 'image-overlay' && (
        <div
          className="relative overflow-hidden"
          style={aspectRatio ? { aspectRatio } : undefined}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className={cn(
              'object-cover',
              'transition-transform duration-[var(--duration-slow)] ease-[var(--ease-premium)]',
              hoverLift && 'group-hover:scale-105',
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Image overlay variant — full-bleed background */}
      {image && variant === 'image-overlay' && (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className={cn(
              'object-cover',
              'transition-transform duration-[var(--duration-slow)] ease-[var(--ease-premium)]',
              hoverLift && 'group-hover:scale-105',
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent"
            aria-hidden="true"
          />
        </>
      )}

      {/* Text content */}
      {(title || description || children) && (
        <div
          className={cn(
            'relative',
            variant === 'image-overlay' ? 'p-6 mt-auto' : 'p-6',
          )}
        >
          {title && (
            <h3
              className={cn(
                'font-semibold text-lg leading-snug mb-1',
                'transition-colors duration-[var(--duration-fast)]',
                variant === 'image-overlay'
                  ? 'text-white'
                  : 'text-text dark:text-text-inverse',
                isLink && 'group-hover:text-accent',
              )}
            >
              {title}
            </h3>
          )}
          {description && (
            <p
              className={cn(
                'text-sm leading-relaxed',
                variant === 'image-overlay'
                  ? 'text-white/70'
                  : 'text-text-secondary dark:text-text-light',
              )}
            >
              {description}
            </p>
          )}
          {children}
        </div>
      )}
    </>
  );

  const cardClasses = cn(
    'rounded-[var(--radius-lg)] overflow-hidden',
    'transition-all duration-[var(--duration-medium)] ease-[var(--ease-premium)]',
    variantStyles[variant],
    // Hover lift effect
    hoverLift && [
      'hover:shadow-[var(--shadow-large)]',
      'hover:-translate-y-1.5',
      variant !== 'image-overlay' && 'hover:border-accent/20',
    ],
    // Image overlay layout
    variant === 'image-overlay' && 'flex flex-col',
    // Link cursor
    isLink && 'cursor-pointer',
    className,
  );

  if (isLink) {
    return (
      <Component className={cn(cardClasses, 'group')}>
        <Link
          href={href!}
          className="absolute inset-0 z-10"
          aria-label={title}
        >
          <span className="sr-only">{title}</span>
        </Link>
        {cardContent}
      </Component>
    );
  }

  return (
    <Component className={cardClasses}>
      {cardContent}
    </Component>
  );
}

/* ─── Sub-components for composition ─── */
export function CardImage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
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
  return <div className={cn('p-6', className)}>{children}</div>;
}

export default Card;
