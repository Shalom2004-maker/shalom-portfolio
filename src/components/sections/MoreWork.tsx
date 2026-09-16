"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, GitBranch } from "lucide-react";
import { animate } from "animejs";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * MoreWork — spec §15.
 *
 * Transitions from the Selected Work showcase to broader code activity.
 * A single high-impact CTA block: strong statement + GitHub link.
 * Kept intentionally minimal — the projects do the talking; this just
 * provides a clear path to more.
 */
export function MoreWork() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const targets = Array.from(
      sectionRef.current.querySelectorAll<HTMLElement>("[data-more-reveal]")
    );

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          targets.forEach((el) => {
            el.style.opacity = "0";
            el.style.transform = "translateY(20px)";
          });
          requestAnimationFrame(() => {
            animate(targets, {
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 600,
              delay: (_, i) => (i ?? 0) * 100,
              ease: "outCubic",
            });
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section
      id="more-work"
      ref={sectionRef}
      aria-label="More work and GitHub"
      className="max-w-7xl mx-auto w-full px-6 md:px-10 py-20 md:py-28"
    >
      {/* Contained accent block */}
      <div
        className={cn(
          "relative rounded-2xl overflow-hidden",
          "border border-[var(--color-border)]",
          "bg-[var(--color-surface)]",
          "px-8 md:px-14 py-14 md:py-20",
          "flex flex-col md:flex-row md:items-center md:justify-between gap-8"
        )}
      >
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-text-primary) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />

        {/* Accent glow */}
        <div
          className="absolute -top-32 -left-32 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, var(--color-accent-glow) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        {/* Text */}
        <div className="relative flex flex-col gap-3 max-w-xl">
          <p
            data-more-reveal
            className="text-xs tracking-[0.2em] uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-accent)",
            }}
          >
            <GitBranch className="inline w-3 h-3 mr-1.5 -mt-0.5" aria-hidden="true" />
            Open Source · Side Projects · Experiments
          </p>
          <h2
            data-more-reveal
            className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text-primary)",
            }}
          >
            There&apos;s more where that came from.
          </h2>
          <p
            data-more-reveal
            className="text-base leading-relaxed"
            style={{ color: "var(--color-text-muted)" }}
          >
            The full picture lives on GitHub — experiments, open-source
            contributions, and projects in progress.
          </p>
        </div>

        {/* CTA */}
        <div data-more-reveal className="relative shrink-0">
          <a
            href="https://github.com/Shalom2004-maker"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group inline-flex items-center gap-2.5",
              "h-12 px-8 rounded-full",
              "text-sm font-semibold tracking-tight",
              "bg-[var(--color-accent)] text-[#07090D]",
              "hover:bg-[#6db8ff]",
              "transition-colors duration-[var(--duration-base)]",
              "focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]",
              "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]"
            )}
          >
            View more on GitHub
            <ArrowRight
              className="w-4 h-4 transition-transform duration-[var(--duration-base)] group-hover:translate-x-0.5"
              aria-hidden="true"
              strokeWidth={2.5}
            />
          </a>
        </div>
      </div>
    </section>
  );
}
