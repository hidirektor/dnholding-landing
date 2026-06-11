'use client';

import {useCallback, useEffect, useRef, useState} from 'react';
import {useIntersectionObserver} from '@/hooks/useIntersectionObserver';
import {cn} from '@/lib/utils';

/* ─── Types ─── */
export interface AnimatedCounterProps {
  /** Target number to count to */
  value: number;
  /** Text appended after the number (e.g. '+', '%') */
  suffix?: string;
  /** Text prepended before the number (e.g. '$', '₺') */
  prefix?: string;
  /** Animation duration in ms. Default: 2000 */
  duration?: number;
  /** Locale for number formatting (e.g. 'tr-TR', 'en-US'). Default: 'tr-TR' */
  locale?: string;
  /** Easing function: 'easeOut' produces a decelerating count */
  easing?: 'linear' | 'easeOut' | 'easeInOut';
  /** Additional class names */
  className?: string;
}

/* ─── Easing Functions ─── */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function linear(t: number): number {
  return t;
}

const easingFunctions = {
  linear,
  easeOut: easeOutCubic,
  easeInOut: easeInOutCubic,
};

/* ─── Component ─── */
export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2000,
  locale = 'tr-TR',
  easing = 'easeOut',
  className,
}: AnimatedCounterProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const isVisible = useIntersectionObserver(elementRef, {
    threshold: 0.3,
    triggerOnce: true,
  });

  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const animate = useCallback(() => {
    if (hasAnimated) return;

    const easeFn = easingFunctions[easing];
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeFn(progress);

      setDisplayValue(Math.round(easedProgress * value));

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplayValue(value);
        setHasAnimated(true);
      }
    }

    requestAnimationFrame(tick);
  }, [value, duration, easing, hasAnimated]);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      // Respect reduced motion preference
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (prefersReducedMotion) {
        setDisplayValue(value);
        setHasAnimated(true);
        return;
      }

      animate();
    }
  }, [isVisible, animate, hasAnimated, value]);

  // Format with locale separators
  const formattedValue = displayValue.toLocaleString(locale);

  return (
    <span
      ref={elementRef}
      className={cn(
        'tabular-nums font-display font-bold',
        'transition-opacity duration-[var(--duration-medium)]',
        isVisible ? 'opacity-100' : 'opacity-0',
        className,
      )}
      aria-label={`${prefix}${value.toLocaleString(locale)}${suffix}`}
    >
      {prefix}
      {formattedValue}
      {suffix && (
        <span className="text-accent ml-0.5">{suffix}</span>
      )}
    </span>
  );
}

export default AnimatedCounter;
