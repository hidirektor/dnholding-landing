'use client';

import {type CSSProperties, useRef} from 'react';
import {useIntersectionObserver} from '@/hooks/useIntersectionObserver';
import {cn} from '@/lib/utils';

/* ─── Types ─── */
export type ScrollRevealDirection = 'up' | 'down' | 'left' | 'right' | 'fade';

export interface ScrollRevealProps {
  children: React.ReactNode;
  /** Direction the element animates from. Default: 'up' */
  direction?: ScrollRevealDirection;
  /** Delay before animation starts (ms). Default: 0 */
  delay?: number;
  /** Animation duration (ms). Default: 800 */
  duration?: number;
  /** Distance of the translate transform (px). Default: 32 */
  distance?: number;
  /** Intersection Observer threshold. Default: 0.1 */
  threshold?: number;
  /** HTML element to render. Default: 'div' */
  as?: React.ElementType;
  className?: string;
}

/* ─── Transform Map ─── */
const initialTransforms: Record<ScrollRevealDirection, string> = {
  up: 'translate3d(0, var(--reveal-distance), 0)',
  down: 'translate3d(0, calc(var(--reveal-distance) * -1), 0)',
  left: 'translate3d(var(--reveal-distance), 0, 0)',
  right: 'translate3d(calc(var(--reveal-distance) * -1), 0, 0)',
  fade: 'translate3d(0, 0, 0)',
};

/* ─── Component ─── */
export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 800,
  distance = 32,
  threshold = 0.1,
  as: Component = 'div',
  className,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(elementRef, {
    threshold,
    triggerOnce: true,
  });

  const style: CSSProperties = {
    '--reveal-distance': `${distance}px`,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate3d(0, 0, 0)' : initialTransforms[direction],
    transition: `opacity ${duration}ms var(--ease-premium) ${delay}ms, transform ${duration}ms var(--ease-premium) ${delay}ms`,
    willChange: isVisible ? 'auto' : 'opacity, transform',
  } as CSSProperties;

  return (
    <Component
      ref={elementRef}
      className={cn(
        // Respect prefers-reduced-motion at CSS level too
        'motion-reduce:!opacity-100 motion-reduce:!transform-none motion-reduce:!transition-none',
        className,
      )}
      style={style}
    >
      {children}
    </Component>
  );
}

export default ScrollReveal;
