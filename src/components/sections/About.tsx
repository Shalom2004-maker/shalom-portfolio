"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CURRENTLY = [
  { label: "Building", value: "Web applications" },
  { label: "Exploring", value: "New technologies and systems" },
  { label: "Learning", value: "C#, ASP.NET" },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * About — spec §12.
 *
 * Layout (desktop):
 *   Left col (wider): Section heading + editorial bio paragraphs + journey.
 *   Right col: CURRENTLY panel (glass surface) + accent detail.
 *
 * The asymmetric split (7:5 columns) gives an editorial, non-template feel.
 */
export function About() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const targets = Array.from(sectionRef.current.querySelectorAll<HTMLElement>("[data-about-reveal]"));

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          try {
            targets.forEach((el) => {
              el.style.opacity = "0";
              el.style.transform = "translateY(28px)";
            });
            requestAnimationFrame(() => {
              animate(targets, {
                opacity: [0, 1],
                translateY: [28, 0],
                duration: 650,
                delay: stagger(90),
                ease: "outCubic",
              });
            });
          } catch (err) {
            // Restore if animation setup fails
            // eslint-disable-next-line no-console
            console.error("About animation failed:", err);
            targets.forEach((el) => {
              el.style.opacity = "1";
              el.style.transform = "none";
            });
          }

          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="about-heading"
      className="max-w-7xl mx-auto w-full px-6 md:px-10 py-24 md:py-32"
    >
      {/* Top border rule */}
      <div
        className="mb-16 h-px w-full"
        style={{ backgroundColor: "var(--color-border)" }}
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

        {/* ── Left column — bio + journey ── */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div data-about-reveal>
            <SectionHeading index="03" heading="About" as="h2" />
          </div>

          {/* Editorial bio */}
          <div className="flex flex-col gap-5">
            <p
              data-about-reveal
              className="text-lg leading-relaxed"
              style={{ color: "var(--color-text-primary)" }}
            >
              I’m a B.Tech (IT) student and full-stack developer who enjoys building software to solve practical problems. I’m interested in understanding how systems work, learning new technologies, and turning what I learn into working applications.
            </p>
            <p
              data-about-reveal
              className="text-base leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              I like going deeper than simply making something work. I want to understand the logic, concepts, and systems behind what I build. When I encounter something difficult, I research it, learn from different sources, put the knowledge into practice, and observe the results.
            </p>
            <p
              data-about-reveal
              className="text-base leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              My approach is simple: understand the problem, learn what is required, build the solution, test it, and improve it.
            </p>
          </div>

          {/* Subtle accent rule + index label */}
          <div
            data-about-reveal
            className="flex items-center gap-4 mt-2"
          >
            <div
              className="h-px flex-1"
              style={{ backgroundColor: "var(--color-border)" }}
              aria-hidden="true"
            />
            <span
              className="text-xs tracking-[0.2em] uppercase shrink-0"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-text-muted)",
              }}
              aria-hidden="true"
            >
              Est. [YEAR]
            </span>
          </div>
        </div>

        {/* ── Right column — CURRENTLY panel + portrait placeholder ── */}
        <div className="lg:col-span-5 flex flex-col gap-6">

          {/* Portrait placeholder */}
          <div
            data-about-reveal
            className="relative w-full aspect-[4/5] rounded-xl overflow-hidden"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
            aria-hidden="true"
          >
            {/* Grid texture */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            {/* Label */}
            <span
              className="absolute bottom-4 left-4 text-[10px] tracking-widest uppercase"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-text-muted)",
              }}
            >
              [PORTRAIT]
            </span>
          </div>

          {/* CURRENTLY panel — glass surface per spec §8 */}
          <div
            data-about-reveal
            className={cn(
              "rounded-xl border border-[var(--color-border)]",
              "bg-[rgba(13,17,23,0.7)] backdrop-blur-sm",
              "p-6"
            )}
          >
            <p
              className="text-[10px] tracking-[0.25em] uppercase mb-4"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-accent)",
              }}
              aria-hidden="true"
            >
              ● Currently
            </p>
            <dl className="flex flex-col gap-3">
              {CURRENTLY.map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <dt
                    className="text-[10px] tracking-widest uppercase"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {label}
                  </dt>
                  <dd
                    className="text-sm font-medium"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
