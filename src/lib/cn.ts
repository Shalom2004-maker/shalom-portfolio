/**
 * cn — merge class names, filtering out falsy values.
 *
 * A lightweight alternative to clsx/classnames with no extra dependency.
 * For more complex merging (e.g. deduplicating Tailwind classes), replace
 * this with `clsx` + `tailwind-merge` when the project warrants it.
 *
 * Usage:
 *   cn("base-class", isActive && "active", undefined, "another")
 *   // → "base-class active another"
 */
export function cn(
  ...classes: (string | boolean | null | undefined)[]
): string {
  return classes.filter(Boolean).join(" ");
}
