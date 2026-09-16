import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

type ButtonVariant = "primary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. primary = filled accent, ghost = outlined. */
  variant?: ButtonVariant;
  /** Size preset. */
  size?: ButtonSize;
  /** Show the trailing arrow icon (default: true). */
  showArrow?: boolean;
  /** Render as an anchor tag. Pass href to activate. */
  href?: string;
  /** Target for anchor. Defaults to "_blank" when href is external. */
  target?: string;
  /** Rel attribute for anchor. */
  rel?: string;
  children: React.ReactNode;
}

// ─── Style maps ───────────────────────────────────────────────────────────────

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    "bg-[var(--color-accent)] text-[#07090D]",
    "hover:bg-[#6db8ff]",
    "focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
  ].join(" "),
  ghost: [
    "bg-transparent text-[var(--color-text-primary)]",
    "border border-[var(--color-border-strong)]",
    "hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
    "focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
  ].join(" "),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-11 px-6 text-sm gap-2",
  lg: "h-13 px-8 text-base gap-2.5",
};

const arrowSizeClasses: Record<ButtonSize, string> = {
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Button — primary CTA and ghost variant.
 *
 * Renders a <button> by default, or an <a> when `href` is provided.
 * The trailing arrow subtly translates on hover via CSS transition.
 *
 * Respects prefers-reduced-motion: the arrow transition is a CSS property
 * so it's automatically suppressed by the global reduced-motion reset in
 * globals.css.
 *
 * @example
 * <Button href="#work" variant="primary">Explore Work</Button>
 * <Button onClick={handleClick} variant="ghost" size="sm">Learn more</Button>
 */
export function Button({
  variant = "primary",
  size = "md",
  showArrow = true,
  href,
  target,
  rel,
  className,
  children,
  ...props
}: ButtonProps) {
  const base = cn(
    // Layout
    "inline-flex items-center justify-center rounded-full",
    "font-semibold tracking-tight",
    // Transition — arrow slides on hover
    "transition-colors duration-[var(--duration-base)]",
    // Cursor
    "cursor-pointer select-none",
    // Disabled state
    "disabled:opacity-40 disabled:pointer-events-none",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <ArrowRight
          className={cn(
            arrowSizeClasses[size],
            // Arrow shifts right on hover — parent group triggers it
            "transition-transform duration-[var(--duration-base)] group-hover:translate-x-0.5"
          )}
          aria-hidden="true"
          strokeWidth={2.5}
        />
      )}
    </>
  );

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <a
        href={href}
        target={target ?? (isExternal ? "_blank" : undefined)}
        rel={rel ?? (isExternal ? "noopener noreferrer" : undefined)}
        className={cn("group", base)}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={cn("group", base)} {...props}>
      {content}
    </button>
  );
}
