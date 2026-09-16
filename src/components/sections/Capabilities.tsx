"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface CapabilityGroup {
  id: string;
  label: string;
  items: string[];
}

/**
 * Technology inventory — replace with confirmed skills.
 * Spec §13: "no percentage bars", grouped by domain.
 * Spec §26: final technology inventory remains a placeholder.
 */
const CAPABILITY_GROUPS: CapabilityGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
    ],
  },
  {
    id: "backend",
    label: "Backend & Data",
    items: [
      "PHP",
      "Supabase",
      "PostgreSQL",
      "PL/pgSQL",
    ],
  },
  {
    id: "mobile",
    label: "Mobile",
    items: ["Flutter", "Dart"],
  },
  {
    id: "tools",
    label: "Tools",
    items: ["Git", "GitHub", "VS Code", "Vercel", "Figma"],
  },
  {
    id: "learning",
    label: "Learning / In progress",
    items: ["C#", "ASP.NET"],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Capabilities — spec §13.
 *
 * Skills presented as capability groups, not percentage bars.
 * Each group shows a domain label + a chip list of technologies.
 * Layout: responsive grid of group cards.
 */
export function Capabilities() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const targets = Array.from(sectionRef.current.querySelectorAll<HTMLElement>("[data-cap-reveal]"));

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          try {
            targets.forEach((el) => {
              el.style.opacity = "0";
              el.style.transform = "translateY(24px)";
            });
            requestAnimationFrame(() => {
              animate(targets, {
                opacity: [0, 1],
                translateY: [24, 0],
                duration: 600,
                delay: stagger(80),
                ease: "outCubic",
              });
            });
          } catch (err) {
            // Restore on error
            // eslint-disable-next-line no-console
            console.error("Capabilities animation failed:", err);
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

    const fallback = window.setTimeout(() => {
      const targetsNow = Array.from(sectionRef.current?.querySelectorAll<HTMLElement>("[data-cap-reveal]") ?? []);
      targetsNow.forEach((el) => {
        if (el.style.opacity === "0") {
          el.style.opacity = "1";
          el.style.transform = "none";
        }
      });
    }, 1200);

    return () => { clearTimeout(fallback); observer.disconnect(); };
  }, [reducedMotion]);

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      aria-labelledby="capabilities-heading"
      className="max-w-7xl mx-auto w-full px-6 md:px-10 py-24 md:py-32"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      {/* Top border */}
      <div
        className="mb-16 h-px"
        style={{ backgroundColor: "var(--color-border)" }}
        aria-hidden="true"
      />

      <div data-cap-reveal className="mb-14">
        <SectionHeading
          index="04"
          heading="Capabilities"
          subheading="Technologies and tools I work with — grouped by domain."
          as="h2"
        />
      </div>

      {/* Group grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {CAPABILITY_GROUPS.map((group) => (
          <CapabilityGroupCard key={group.id} group={group} />
        ))}
      </div>
    </section>
  );
}

// ─── Group card ───────────────────────────────────────────────────────────────

function CapabilityGroupCard({ group }: { group: CapabilityGroup }) {
  return (
    <div
      data-cap-reveal
      className={cn(
        "rounded-xl p-6",
        "border border-[var(--color-border)]",
        "bg-[var(--color-bg)]",
        "transition-colors duration-[var(--duration-base)]",
        "hover:border-[var(--color-border-strong)]"
      )}
    >
      {/* Group label */}
      <p
        className="text-[10px] tracking-[0.25em] uppercase mb-4"
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--color-accent)",
        }}
      >
        {group.label}
      </p>

      {/* Skill chips */}
      <ul className="flex flex-wrap gap-2" aria-label={`${group.label} technologies`}>
        {group.items.map((item, i) => (
          <li key={`${group.id}-${i}`}>
            <span
              className={cn(
                "inline-flex items-center",
                "px-3 py-1.5 rounded-lg",
                "text-xs font-medium",
                "border border-[var(--color-border)]",
                "transition-colors duration-[var(--duration-base)]",
                "hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              )}
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-text-muted)",
                backgroundColor: "var(--color-surface)",
              }}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
