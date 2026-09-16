import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * 404 Not Found — spec §23.
 *
 * Branded to the Dark Digital Laboratory aesthetic.
 * Server component — no interactivity needed.
 */
export default function NotFound() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-[calc(100vh-4rem)] px-6 text-center">

      {/* Error code — mono, very large, muted */}
      <p
        className="text-[clamp(6rem,20vw,14rem)] font-semibold leading-none tracking-tighter select-none"
        style={{
          fontFamily: "var(--font-display)",
          color: "var(--color-surface-elevated)",
        }}
        aria-hidden="true"
      >
        404
      </p>

      {/* Overlay content */}
      <div className="-mt-8 flex flex-col items-center gap-4">
        <p
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent)" }}
        >
          Page not found
        </p>

        <h1
          className="text-2xl sm:text-3xl font-semibold tracking-tight"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
        >
          This page doesn&apos;t exist.
        </h1>

        <p
          className="max-w-sm text-base leading-relaxed"
          style={{ color: "var(--color-text-muted)" }}
        >
          The page you&apos;re looking for may have moved or never existed.
          Head back to the start.
        </p>

        <Link
          href="/"
          className="group mt-4 inline-flex items-center gap-2 h-11 px-6 rounded-full text-sm font-semibold tracking-tight bg-[var(--color-accent)] text-[#07090D] hover:bg-[#6db8ff] transition-colors duration-[var(--duration-base)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
        >
          Back to home
          <ArrowRight
            className="w-4 h-4 transition-transform duration-[var(--duration-base)] group-hover:translate-x-0.5"
            aria-hidden="true"
            strokeWidth={2.5}
          />
        </Link>
      </div>
    </div>
  );
}
