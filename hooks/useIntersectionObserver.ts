'use client';

import {type RefObject, useEffect, useState} from 'react';

interface UseIntersectionObserverOptions {
  /** Intersection threshold (0–1). Default: 0.1 */
  threshold?: number;
  /** Root margin string, e.g. '0px 0px -100px 0px'. Default: '0px' */
  rootMargin?: string;
  /** If true, keeps `isVisible` as true once triggered (no re-triggering). Default: true */
  triggerOnce?: boolean;
}

/**
 * Custom hook that observes when an element enters the viewport.
 * Ideal for scroll-triggered animations and lazy loading.
 *
 * Respects `prefers-reduced-motion`: if the user prefers reduced motion,
 * `isVisible` is immediately set to `true` to skip entrance animations.
 *
 * @param ref - React ref attached to the element to observe
 * @param options - IntersectionObserver configuration
 * @returns `isVisible` — whether the element is currently (or was) in the viewport
 */
export function useIntersectionObserver(
  ref: RefObject<Element | null>,
  options: UseIntersectionObserverOptions = {},
): boolean {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, rootMargin, triggerOnce]);

  return isVisible;
}
