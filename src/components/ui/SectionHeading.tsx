import { cn } from "@/lib/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SectionHeadingProps {
  /**
   * Zero-padded section index label, e.g. "01", "02".
   * Rendered in mono font above the heading.
   */
  index?: string;
  /** Main section heading text. */
  heading: string;
  /** Optional subheading / descriptor rendered below the heading. */
  subheading?: string;
  /**
   * Alignment of the text block.
   * @default "left"
   */
  align?: "left" | "center";
  /** Additional className for the wrapper. */
  className?: string;
  /** The heading level to render. Defaults to h2. */
  as?: "h1" | "h2" | "h3";
  /** id forwarded to the heading element for aria-labelledby. */
  id?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * SectionHeading — editorial section label used consistently across all
 * portfolio sections.
 *
 * Anatomy:
 *   [index]      ← mono, accent, small  e.g. "02 /"
 *   [heading]    ← display, large
 *   [subheading] ← body, muted (optional)
 */
export function SectionHeading({
  index,
  heading,
  subheading,
  align = "left",
  className,
  as: Tag = "h2",
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {/* Index / section label */}
      {index && (
        <span
          className="text-xs tracking-[0.2em] uppercase"
          style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent)" }}
          aria-hidden="true"
        >
          {index.padStart(2, "0")} /
        </span>
      )}

      {/* Main heading */}
      <Tag
        id={id}
        className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
      >
        {heading}
      </Tag>

      {/* Optional subheading */}
      {subheading && (
        <p
          className="text-base leading-relaxed max-w-xl"
          style={{ color: "var(--color-text-muted)" }}
        >
          {subheading}
        </p>
      )}
    </div>
  );
}
