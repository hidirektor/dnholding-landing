import {cn} from '@/lib/utils';

/* ─── Types ─── */
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps {
  children: React.ReactNode;
  /** Semantic heading level. Default: 'h2' */
  level?: HeadingLevel;
  /** Use Playfair Display font for a premium editorial feel */
  display?: boolean;
  /** Show a gold underline decoration below the heading */
  accent?: boolean;
  /** Render as a different element while keeping semantic level for styling */
  as?: HeadingLevel;
  className?: string;
  id?: string;
}

/* ─── Responsive Size Map ─── */
const levelStyles: Record<HeadingLevel, string> = {
  h1: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
  h2: 'text-3xl sm:text-4xl md:text-5xl',
  h3: 'text-2xl sm:text-3xl md:text-4xl',
  h4: 'text-xl sm:text-2xl',
  h5: 'text-lg sm:text-xl',
  h6: 'text-base sm:text-lg',
};

/* ─── Component ─── */
export function Heading({
  children,
  level = 'h2',
  display = false,
  accent = false,
  as,
  className,
  id,
}: HeadingProps) {
  const Tag = as ?? level;

  return (
    <Tag
      id={id}
      className={cn(
        // Base typography
        'font-bold tracking-tight text-balance text-text dark:text-text-inverse',
        // Responsive sizing
        levelStyles[level],
        // Display variant — Playfair Display
        display && 'font-display leading-[1.1] tracking-[-0.02em]',
        // Sans variant
        !display && 'font-sans leading-tight',
        // Accent: reserve space for the underline decoration
        accent && 'relative pb-5',
        className,
      )}
    >
      {children}
      {accent && (
        <span
          className={cn(
            'absolute bottom-0 left-0 h-[3px] w-12 rounded-full',
            'bg-gradient-to-r from-accent to-accent-light',
          )}
          aria-hidden="true"
        />
      )}
    </Tag>
  );
}

export default Heading;
