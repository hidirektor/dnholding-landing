'use client';

import {useEffect, useState} from 'react';

/**
 * Custom hook that tracks a CSS media query.
 * Returns `false` during SSR and on first render, then resolves on the client.
 *
 * @param query - A valid CSS media query string, e.g. '(min-width: 768px)'
 * @returns Whether the media query currently matches
 *
 * @example
 * const isDesktop = useMediaQuery('(min-width: 1024px)');
 * const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    // Set initial value
    setMatches(mediaQueryList.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQueryList.addEventListener('change', handleChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}
