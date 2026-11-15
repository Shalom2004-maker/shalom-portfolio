"use client";

export { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Returns an animation duration appropriate for the user's motion preference.
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
