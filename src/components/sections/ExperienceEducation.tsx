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
  location?: string;
  context?: string;
  role: string;
  outcomes: string[];
}

const EXPERIENCE: TimelineEntry[] = [
  {
    id: "independent",
    date: "2023 – Present",
    organization: "Independent / Personal projects",
    context: "Project-based development",
    role: "Independent Web Developer",
    outcomes: [
      "Building web applications and practical projects to learn new technologies",
      "Researching difficult concepts and testing ideas through implementation",
    ],
  },
  {
    id: "ur-cavm-2023",
    date: "2023",
    organization: "UR-CAVM",
    location: "Rwanda",
    role: "Intern — PHP & CMS Development",
    outcomes: [
      "Further PHP and CMS development experience across multiple CMS platforms",
      "Contributed to site updates, debugging, and feature fixes",
    ],
  },
  {
    id: "ur-cavm-2022",
    date: "2022",
    organization: "UR-CAVM",
    location: "Rwanda",
    role: "Intern — PHP & CMS Development",
    outcomes: [
      "Practical exposure to PHP and CMS-based web development (Drupal, WordPress, Joomla, Wix)",
      "Worked on CMS integrations, content workflows, and site maintenance",
    ],
  },
];

const EDUCATION: TimelineEntry[] = [
  {
    id: "rk-university",
    date: "Expected Graduation · May 2028",
    organization: "RK University",
    location: "Rajkot, Gujarat, India",
    role: "B.Tech in Information Technology",
    outcomes: [],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * ExperienceEducation — editorial timeline with scroll-triggered connectors
 * and restrained entry reveals.
 */
export function ExperienceEducation() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (reducedMotion || !timeline) return;

    let animationFrame: number | null = null;

    const updateProgress = () => {
      animationFrame = null;
      const { top, height } = timeline.getBoundingClientRect();
      if (height <= 0) return;

      const progress = Math.min(
        1,
        Math.max(0, (window.innerHeight - top) / (window.innerHeight + height))
      );
      timeline.style.setProperty("--timeline-progress", String(progress));
    };

    const scheduleUpdate = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const lines = Array.from(
      sectionRef.current.querySelectorAll<HTMLElement>("[data-tl-line]")
    );
    const nodes = Array.from(
      sectionRef.current.querySelectorAll<HTMLElement>("[data-tl-node]")
    );
    const timelineEntries = Array.from(
      sectionRef.current.querySelectorAll<HTMLElement>("[data-tl-entry]")
    );
    let lineAnimation: ReturnType<typeof animate> | undefined;
    let nodeAnimation: ReturnType<typeof animate> | undefined;
    let entryAnimation: ReturnType<typeof animate> | undefined;
    let animationFrame: number | undefined;

    const restoreVisibleState = () => {
      lines.forEach((line) => {
        line.style.removeProperty("transform");
        line.style.removeProperty("transform-origin");
      });
      nodes.forEach((node) => {
        node.style.removeProperty("opacity");
        node.style.removeProperty("transform");
      });
      timelineEntries.forEach((entry) => {
        entry.style.removeProperty("opacity");
        entry.style.removeProperty("transform");
      });
    };

    const stopAnimations = () => {
      lineAnimation?.revert();
      nodeAnimation?.revert();
      entryAnimation?.revert();
      restoreVisibleState();
    };

    const observer = new IntersectionObserver(
      (observerEntries) => {
        if (observerEntries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          try {
            // Set initial states right before animating
            lines.forEach((line) => {
              line.style.transform = "scaleY(0)";
              line.style.transformOrigin = "top";
            });
            nodes.forEach((n) => {
              n.style.opacity = "0";
              n.style.transform = "scale(0)";
            });
            timelineEntries.forEach((entry) => {
              entry.style.opacity = "0";
              entry.style.transform = "translateX(-16px)";
            });

            animationFrame = window.requestAnimationFrame(() => {
              lineAnimation = animate(lines, {
                scaleY: [0, 1],
                duration: 900,
                ease: "outCubic",
                onComplete: () => {
                  nodeAnimation = animate(nodes, {
                    opacity: [0, 1],
                    scale: [0, 1],
                    duration: 300,
                    delay: (_, i) => (i ?? 0) * 150,
                    ease: "outBack(1.5)",
                  });
                  entryAnimation = animate(timelineEntries, {
                    opacity: [0, 1],
                    translateX: [-16, 0],
                    duration: 450,
                    delay: (_, i) => 150 + (i ?? 0) * 120,
                    ease: "outCubic",
                  });
                },
              });
            });
          } catch (err) {
            console.error("Experience/Education animation failed:", err);
            stopAnimations();
          }

          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);

    const fallback = window.setTimeout(() => {
      stopAnimations();
    }, 2200);

    return () => {
      clearTimeout(fallback);
      observer.disconnect();
      if (animationFrame !== undefined) {
        window.cancelAnimationFrame(animationFrame);
      }
      stopAnimations();
    };
  }, [reducedMotion]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      aria-labelledby="experience-heading"
      className="mx-auto w-full max-w-[1200px] px-6 py-12 md:px-10 md:py-16"
    >
      <div
        className="mb-12 h-px"
        style={{ backgroundColor: "var(--color-border)" }}
        aria-hidden="true"
      />

      <div className="mb-10">
        <SectionHeading
          index="05"
          heading="Experience & Education"
          as="h2"
          id="experience-heading"
        />
      </div>

      {/* Timeline */}
      <div ref={timelineRef} className="experience-timeline relative">
        <section aria-labelledby="experience-records-heading">
          <h3
            id="experience-records-heading"
            className="mb-4 pl-10 text-base font-semibold tracking-wide sm:mb-5 sm:text-lg"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
          >
            Experience
          </h3>
          <ol className="flex flex-col" aria-label="Experience records, newest first">
            {EXPERIENCE.map((entry, index) => (
              <TimelineEntry
                key={entry.id}
                entry={entry}
                isLast={index === EXPERIENCE.length - 1}
                education={false}
              />
            ))}
          </ol>
        </section>

        <section
          aria-labelledby="education-heading"
          className="mt-7 border-t pt-7 sm:mt-8 sm:pt-8"
          style={{ borderColor: "var(--color-border)" }}
        >
          <h3
            id="education-heading"
            className="mb-4 pl-10 text-base font-semibold tracking-wide sm:mb-5 sm:text-lg"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
          >
            Education
          </h3>
          <ol className="flex flex-col" aria-label="Education">
            {EDUCATION.map((entry, index) => (
              <TimelineEntry
                key={entry.id}
                entry={entry}
                isLast={index === EDUCATION.length - 1}
                education
              />
            ))}
          </ol>
        </section>

        <div className="experience-timeline__progress" aria-hidden="true">
          <div className="experience-timeline__progress-fill" />
        </div>
      </div>
    </section>
  );
}

// ─── Timeline entry ───────────────────────────────────────────────────────────

function TimelineEntry({
  entry,
  isLast,
  education,
}: {
  entry: TimelineEntry;
  isLast: boolean;
  education: boolean;
}) {
  return (
    <li
      className={cn(
        "relative grid grid-cols-[24px_minmax(0,1fr)] gap-x-3 sm:gap-x-4 md:grid-cols-[24px_160px_minmax(0,1fr)] md:gap-x-5",
        !isLast && "pb-7 sm:pb-8 md:pb-9"
      )}
    >
      {(!isLast || education) && (
        <div
          data-tl-line
          className={cn(
            "absolute left-3 w-px",
            education ? "top-11 h-8 md:top-3" : "top-3 -bottom-3"
          )}
          style={{ backgroundColor: "var(--color-border-strong)" }}
          aria-hidden="true"
        />
      )}

      {/* Node dot */}
      <div
        data-tl-node
        className={cn(
          "col-start-1 mt-0.5 flex h-6 w-6 items-center justify-center",
          "relative z-10",
          education ? "row-start-2 md:row-start-1" : "row-start-1"
        )}
        aria-hidden="true"
      >
        <div className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
      </div>

      {/* Date */}
      <p
        className="col-start-2 row-start-1 mb-2 pt-1 text-[10px] leading-relaxed tracking-[0.12em] uppercase sm:text-[11px] md:col-start-2 md:mb-0 md:pt-2"
        style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent)" }}
      >
        {entry.date}
      </p>

      {/* Entry content */}
      <div
        data-tl-entry
        className="col-start-2 row-start-2 max-w-3xl min-w-0 rounded-[var(--radius-large)] border border-[var(--color-border)] bg-[rgba(13,17,23,0.64)] p-4 sm:p-5 md:col-start-3 md:row-start-1 md:p-6"
      >
        {/* Role */}
        <h4
          className="text-lg font-semibold leading-snug tracking-tight sm:text-xl md:text-2xl"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-text-primary)",
          }}
        >
          {entry.role}
        </h4>

        <p
          className="mt-1 text-sm leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {entry.organization}
          {entry.location && ` · ${entry.location}`}
          {entry.context && ` · ${entry.context}`}
        </p>

        {/* Outcomes */}
        {entry.outcomes.length > 0 && (
          <ul className="mt-3 flex flex-col gap-2">
            {entry.outcomes.map((outcome) => (
              <li
                key={outcome}
                className="flex gap-2 text-sm leading-relaxed md:text-base"
                style={{ color: "var(--color-text-muted)" }}
              >
                <span
                  className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full"
                  style={{ backgroundColor: "var(--color-accent)" }}
                  aria-hidden="true"
                />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}
