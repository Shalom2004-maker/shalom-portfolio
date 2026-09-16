"use client";

import { useEffect, useState } from "react";

/**
 * Returns true when the user has requested reduced motion via the
 * `prefers-reduced-motion: reduce` media query.
 *
 * SSR-safe: returns false on the server, updates after hydration.
 *
 * Gate every Anime.js animation behind this hook:
 *
 * ```tsx
 * const reduced = useReducedMotion();
 * if (!reduced) animate(el, { translateY: [20, 0], duration: 600 });
 * ```
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);

    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}
