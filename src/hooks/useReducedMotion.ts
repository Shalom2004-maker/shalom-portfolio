"use client";

import { useSyncExternalStore } from "react";

const MEDIA_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mediaQuery = window.matchMedia(MEDIA_QUERY);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(MEDIA_QUERY).matches;
}

function getServerSnapshot() {
  return true;
}

/**
 * Returns true when the user has requested reduced motion via the
 * `prefers-reduced-motion: reduce` media query.
 *
 * Uses a reduced-motion server snapshot to keep hydration consistent and
 * prevent animation effects from starting before the browser preference is known.
 *
 * Gate every Anime.js animation behind this hook:
 *
 * ```tsx
 * const reduced = useReducedMotion();
 * if (!reduced) animate(el, { translateY: [20, 0], duration: 600 });
 * ```
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
