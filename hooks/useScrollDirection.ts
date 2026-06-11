'use client';

import {useEffect, useState} from 'react';

type ScrollDirection = 'up' | 'down' | null;

interface UseScrollDirectionOptions {
  /** Minimum scroll delta (in px) before direction change is registered. Default: 10 */
  threshold?: number;
  /** Scroll position (in px) below which the header always shows. Default: 80 */
  topOffset?: number;
}

/**
 * Custom hook to track the user's scroll direction.
 * Used primarily for showing/hiding the sticky header.
 *
 * Returns `null` initially (before any scroll), then `'up'` or `'down'`.
 *
 * @param options - Configuration for threshold and top offset
 * @returns The current scroll direction
 */
export function useScrollDirection(
  options: UseScrollDirectionOptions = {},
): ScrollDirection {
  const { threshold = 10, topOffset = 80 } = options;
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;

      // Always show header near the top of the page
      if (currentScrollY < topOffset) {
        setScrollDirection(null);
        lastScrollY = currentScrollY;
        ticking = false;
        return;
      }

      const delta = Math.abs(currentScrollY - lastScrollY);

      if (delta < threshold) {
        ticking = false;
        return;
      }

      const direction: ScrollDirection =
        currentScrollY > lastScrollY ? 'down' : 'up';

      setScrollDirection(direction);
      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [threshold, topOffset]);

  return scrollDirection;
}
