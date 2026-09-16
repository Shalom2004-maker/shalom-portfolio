"use client";

import { useEffect, useState } from "react";

/**
 * Returns true when the user has requested reduced motion via
 * the `prefers-reduced-motion: reduce` media query.
 *
 * SSR-safe: returns false on the server and updates after hydration.
 *
 * Use this hook to gate or simplify Anime.js animations:
 *
 * ```tsx
 * const reduced = useReducedMotion();
 * if (!reduced) animate(el, { ... });
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

/**
 * Returns the appropriate animation duration based on the user's
 * reduced-motion preference.
 *
 * @param full     - Full duration in ms (used when motion is allowed)
 * @param reduced  - Reduced duration in ms (default: 0 — instant)
 */
export function motionDuration(
  full: number,
  reduced: number = 0,
  prefersReduced: boolean = false
): number {
  return prefersReduced ? reduced : full;
}
