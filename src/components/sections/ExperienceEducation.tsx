"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface TimelineEntry {
  id: string;
  date: string;
  organization: string;
  role: string;
  outcomes: string[];
  type: "work" | "education";
}

const TIMELINE: TimelineEntry[] = [
  {
    id: "e1",
    type: "work",
    date: "2022 (approx Apr–May)",
    organization: "UR‑CAVM, Rwanda",
    role: "Intern — PHP & CMS Development",
    outcomes: [
      "Practical exposure to PHP and CMS-based web development (Drupal, WordPress, Joomla, Wix)",
      "Worked on CMS integrations, content workflows, and site maintenance",
      "Known supervisors: RUKUNDO Emile, Benoit, Munezero (one assistant name not supplied)"
    ],
  },
  {
    id: "e2",
    type: "work",
    date: "2023 (approx May–June)",
    organization: "UR‑CAVM, Rwanda",
    role: "Intern — PHP & CMS Development",
    outcomes: [
      "Further PHP and CMS development experience across multiple CMS platforms",
      "Contributed to site updates, debugging, and feature fixes",
      "Exact internship dates and one supervisor name remain to be verified"
    ],
  },
  {
    id: "e3",
    type: "work",
    date: "2023 – Present",
    organization: "Independent / Personal projects",
    role: "Independent Web Developer",
    outcomes: [
      "Building web applications and practical projects to learn new technologies",
      "Researching difficult concepts and testing ideas through implementation",
      "No formal full-time employment — work is project and practice based"
    ],
  },
  {
    id: "e4",
    type: "education",
    date: "Expected 2024–2028",
    organization: "RK University, Rajkot, Gujarat",
    role: "B.Tech (IT)",
    outcomes: ["Enrollment/start year to be verified before publishing"],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * ExperienceEducation — spec §14.
 *
 * Vertical timeline with:
 *   - Scroll-triggered line growth (the vertical connector grows via Anime.js
 *     scaleY from 0→1 when the section enters the viewport).
 *   - Node activation — each dot fades in + scales up in sequence.
 *   - Each entry shows: date, organization, role, and outcome bullets.
 */
export function ExperienceEducation() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const line = lineRef.current;
    const nodes = Array.from(
      sectionRef.current.querySelectorAll<HTMLElement>("[data-tl-node]")
    );
    const cards = Array.from(
      sectionRef.current.querySelectorAll<HTMLElement>("[data-tl-card]")
    );

    if (!line) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          // Set initial states right before animating
          line.style.transform = "scaleY(0)";
          line.style.transformOrigin = "top";
          nodes.forEach((n) => {
            n.style.opacity = "0";
            n.style.transform = "scale(0)";
          });
          cards.forEach((c) => {
            c.style.opacity = "0";
            c.style.transform = "translateX(-16px)";
          });

          requestAnimationFrame(() => {
            // 1. Line grows
            animate(line, {
              scaleY: [0, 1],
              duration: 900,
              ease: "outCubic",
              onComplete: () => {
                // 2. Nodes activate
                animate(nodes, {
                  opacity: [0, 1],
                  scale: [0, 1],
                  duration: 300,
                  delay: (_, i) => (i ?? 0) * 150,
                  ease: "outBack(1.5)",
                });
                // 3. Cards slide in
                animate(cards, {
                  opacity: [0, 1],
                  translateX: [-16, 0],
                  duration: 450,
                  delay: (_, i) => 150 + (i ?? 0) * 120,
                  ease: "outCubic",
                });
              },
            });
          });

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
      id="experience"
      ref={sectionRef}
      aria-labelledby="experience-heading"
      className="max-w-7xl mx-auto w-full px-6 md:px-10 py-24 md:py-32"
    >
      {/* Top border */}
      <div
        className="mb-16 h-px"
        style={{ backgroundColor: "var(--color-border)" }}
        aria-hidden="true"
      />

      <div className="mb-14">
        <SectionHeading
          index="05"
          heading="Experience & Education"
          as="h2"
        />
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div
          ref={lineRef}
          className="absolute left-3 top-2 bottom-2 w-px"
          style={{ backgroundColor: "var(--color-border-strong)" }}
          aria-hidden="true"
        />

        {/* Entries */}
        <ol className="flex flex-col gap-0" aria-label="Career and education timeline">
          {TIMELINE.map((entry, index) => (
            <TimelineEntry
              key={entry.id}
              entry={entry}
              isLast={index === TIMELINE.length - 1}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

// ─── Timeline entry ───────────────────────────────────────────────────────────

function TimelineEntry({
  entry,
  isLast,
}: {
  entry: TimelineEntry;
  isLast: boolean;
}) {
  return (
    <li className={cn("relative pl-10", !isLast && "pb-12")}>
      {/* Node dot */}
      <div
        data-tl-node
        className="absolute left-0 top-1.5 w-6 h-6 flex items-center justify-center"
        aria-hidden="true"
      >
        <div
          className={cn(
            "w-2.5 h-2.5 rounded-full",
            entry.type === "work"
              ? "bg-[var(--color-accent)]"
              : "border-2 border-[var(--color-accent)] bg-[var(--color-bg)]"
          )}
        />
      </div>

      {/* Card */}
      <div
        data-tl-card
        className={cn(
          "rounded-xl p-6",
          "border border-[var(--color-border)]",
          "bg-[var(--color-surface)]",
          "transition-colors duration-[var(--duration-base)]",
          "hover:border-[var(--color-border-strong)]"
        )}
      >
        {/* Date + type badge */}
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span
            className="text-xs tracking-widest uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-text-muted)",
            }}
          >
            {entry.date}
          </span>
          <span
            className="px-2 py-0.5 rounded text-[10px] tracking-widest uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              color: entry.type === "work" ? "var(--color-accent)" : "var(--color-text-muted)",
              border: "1px solid var(--color-border)",
              backgroundColor: "var(--color-surface-elevated)",
            }}
          >
            {entry.type === "work" ? "Work" : "Education"}
          </span>
        </div>

        {/* Organization */}
        <p
          className="text-xs tracking-widest uppercase mb-1"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--color-text-muted)",
          }}
        >
          {entry.organization}
        </p>

        {/* Role */}
        <h3
          className="text-lg font-semibold tracking-tight mb-4"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-text-primary)",
          }}
        >
          {entry.role}
        </h3>

        {/* Outcomes */}
        <ul className="flex flex-col gap-2">
          {entry.outcomes.map((outcome, i) => (
            <li
              key={i}
              className="flex gap-2 text-sm leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              <span
                className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                style={{ backgroundColor: "var(--color-accent)" }}
                aria-hidden="true"
              />
              {outcome}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
