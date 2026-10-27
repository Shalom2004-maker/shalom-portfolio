"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Code2,
  ExternalLink,
} from "lucide-react";
import { animate, stagger } from "animejs";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  demoUrl: string;
  repoUrl: string;
  /** Optional local screenshot path, to be added when a real preview is supplied. */
  previewImage?: string;
  /** Selects the initial project in the carousel. */
  featured?: boolean;
}

type SlidePosition = "previous" | "active" | "next";
type SlideInAnimation = "slide-in-left" | "slide-in-right";

const PROJECTS: Project[] = [
  {
    id: "p01",
    name: "LetChat",
    description:
      "Real-time messaging platform (work in progress). Email-confirm authentication and Supabase-backed real-time chat with typing indicators, read receipts, and document sharing.",
    tags: ["TypeScript", "Supabase"],
    demoUrl: "https://glide-talk-platform.vercel.app/login",
    repoUrl: "https://github.com/Shalom2004-maker/glide-talk-platform",
    featured: true,
  },
  {
    id: "p02",
    name: "ParkEase",
    description:
      "Smart parking platform (development). Slot discovery and reservation flow with mocked payment simulation; emphasis on booking and availability state management to avoid double-booking.",
    tags: ["Flutter", "Dart", "Supabase"],
    demoUrl: "https://github.com/Shalom2004-maker/park_ease",
    repoUrl: "https://github.com/Shalom2004-maker/park_ease",
  },
  {
    id: "p03",
    name: "Paradise Glass Hotel",
    description:
      "Hotel management interface exploring glassmorphism and role-based access. Authentication, admin/guest areas, and responsive UI are implemented; bookings are requests and there is no payment provider.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    demoUrl: "https://github.com/Shalom2004-maker/paradise-glass-hotel",
    repoUrl: "https://github.com/Shalom2004-maker/paradise-glass-hotel",
  },
  {
    id: "p04",
    name: "NexGen Solution",
    description:
      "Practice employee management system built as a university project. Role-based access, task and leave workflows implemented with a PHP/MySQL backend; not an enterprise HR product.",
    tags: ["PHP", "MySQL", "HTML/CSS"],
    demoUrl: "https://github.com/Shalom2004-maker/NexGen-Solution",
    repoUrl: "https://github.com/Shalom2004-maker/NexGen-Solution",
  },
];

// ─── Main section ─────────────────────────────────────────────────────────────

/**
 * SelectedWork — spec §11.
 *
 * A controlled, non-autoplaying carousel. Adjacent cards are visual previews;
 * only the active project exposes its links to keyboard and assistive tech.
 */
export function SelectedWork() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const initialProjectIndex = PROJECTS.findIndex((project) => project.featured);
  const [activeIndex, setActiveIndex] = useState(
    initialProjectIndex >= 0 ? initialProjectIndex : 0
  );
  const [slideInAnimation, setSlideInAnimation] =
    useState<SlideInAnimation | null>(null);
  const activeProject = PROJECTS[activeIndex];
  const previousIndex = (activeIndex - 1 + PROJECTS.length) % PROJECTS.length;
  const nextIndex = (activeIndex + 1) % PROJECTS.length;
  const slides: {
    project: Project;
    projectIndex: number;
    position: SlidePosition;
  }[] = [
    {
      project: PROJECTS[previousIndex],
      projectIndex: previousIndex,
      position: "previous",
    },
    {
      project: activeProject,
      projectIndex: activeIndex,
      position: "active",
    },
    {
      project: PROJECTS[nextIndex],
      projectIndex: nextIndex,
      position: "next",
    },
  ];

  const showPrevious = () => {
    setSlideInAnimation("slide-in-right");
    setActiveIndex((index) => (index - 1 + PROJECTS.length) % PROJECTS.length);
  };
  const showNext = () => {
    setSlideInAnimation("slide-in-left");
    setActiveIndex((index) => (index + 1) % PROJECTS.length);
  };

  // ── Scroll-triggered entrance ──────────────────────────────────────────────
  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const targets = Array.from(sectionRef.current.querySelectorAll<HTMLElement>("[data-work-reveal]"));

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          try {
            // Hide then animate — only when we know the section is in view
            targets.forEach((el) => {
              el.style.opacity = "0";
              el.style.transform = "translateY(32px)";
            });
            requestAnimationFrame(() => {
              animate(targets, {
                opacity: [0, 1],
                translateY: [32, 0],
                duration: 700,
                delay: stagger(100, { start: 0 }),
                ease: "outCubic",
              });
            });
          } catch (err) {
            // restore on error
            console.error("SelectedWork animation failed:", err);
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

    // Failsafe: ensure reveals are visible after 1.2s in case animation hangs
    const fallback = window.setTimeout(() => {
      targets.forEach((el) => {
        if (el.style.opacity === "0") {
          el.style.opacity = "1";
          el.style.transform = "none";
        }
      });
    }, 1200);

    return () => {
      clearTimeout(fallback);
      observer.disconnect();
    };
  }, [reducedMotion]);

  const handleCarouselKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.target !== event.currentTarget) return;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1) {
      touchStart.current = null;
      return;
    }

    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;

    const touch = event.changedTouches[0];
    if (!touch) return;
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) {
      return;
    }

    if (deltaX > 0) showPrevious();
    else showNext();
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      aria-labelledby="work-heading"
      className="max-w-7xl mx-auto w-full px-6 md:px-10 py-24 md:py-32"
    >
      <div data-work-reveal className="mb-14">
        <SectionHeading
          index="02"
          heading="Selected Work"
          subheading="Projects built with engineering quality and interaction design."
          as="h2"
          id="work-heading"
        />
      </div>

      <div
        data-work-reveal
        className="work-carousel"
        role="region"
        aria-label="Selected projects carousel. Focus this area and use the left and right arrow keys to change projects."
        tabIndex={0}
        onKeyDown={handleCarouselKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => {
          touchStart.current = null;
        }}
      >
        <div className="work-carousel__stage" aria-live="off">
          {slides.map(({ project, projectIndex, position }) => (
            <ProjectCard
              key={project.id}
              project={project}
              projectIndex={projectIndex}
              position={position}
              slideInAnimation={
                position === "active" ? slideInAnimation : null
              }
            />
          ))}
        </div>

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          Project {activeIndex + 1} of {PROJECTS.length}: {activeProject.name}
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-5">
          <button
            type="button"
            onClick={showPrevious}
            className="work-carousel__control"
            aria-label={`Previous project: ${PROJECTS[previousIndex].name}`}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          <div
            className="flex items-center gap-2"
            role="group"
            aria-label="Choose a project"
          >
            {PROJECTS.map((project, index) => (
              <button
                key={project.id}
                type="button"
                onClick={() => {
                  if (index === activeIndex) return;
                  const forwardDistance =
                    (index - activeIndex + PROJECTS.length) % PROJECTS.length;
                  const backwardDistance =
                    (activeIndex - index + PROJECTS.length) % PROJECTS.length;
                  setSlideInAnimation(
                    forwardDistance <= backwardDistance
                      ? "slide-in-left"
                      : "slide-in-right"
                  );
                  setActiveIndex(index);
                }}
                className={cn(
                  "work-carousel__indicator",
                  index === activeIndex && "work-carousel__indicator--active"
                )}
                aria-label={`Show project ${index + 1}: ${project.name}`}
                aria-pressed={index === activeIndex}
              />
            ))}
          </div>

          <span
            className="min-w-[3.5rem] text-center text-xs tracking-[0.16em] text-[var(--color-text-muted)]"
            style={{ fontFamily: "var(--font-mono)" }}
            aria-hidden="true"
          >
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(PROJECTS.length).padStart(2, "0")}
          </span>

          <button
            type="button"
            onClick={showNext}
            className="work-carousel__control"
            aria-label={`Next project: ${PROJECTS[nextIndex].name}`}
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <p className="mt-4 text-center text-[10px] uppercase tracking-[0.16em] text-[var(--color-text-muted)] md:hidden">
          Swipe or use the controls to explore
        </p>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  projectIndex,
  position,
  slideInAnimation,
}: {
  project: Project;
  projectIndex: number;
  position: SlidePosition;
  slideInAnimation: SlideInAnimation | null;
}) {
  const isActive = position === "active";

  return (
    <article
      className={cn(
        "work-carousel__slide",
        `work-carousel__slide--${position}`,
        "op-mask-corner-cuts-angle-2 overflow-hidden border bg-[var(--color-surface)]",
        isActive
          ? "border-[var(--color-accent)] shadow-[0_0_14px_rgba(77,163,255,0.12)]"
          : "border-[rgba(77,163,255,0.22)]"
      )}
      role="group"
      aria-hidden={!isActive}
      aria-label={`Project ${projectIndex + 1} of ${PROJECTS.length}: ${project.name}`}
      aria-roledescription="slide"
    >
      <div
        className={cn(
          "work-carousel__card-content",
          isActive &&
            slideInAnimation &&
            `work-carousel__card-content--${slideInAnimation}`
        )}
      >
        <ProjectPreview project={project} projectIndex={projectIndex} />

        {isActive && (
          <div className="p-6 sm:p-8">
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <h3
                className="text-2xl font-semibold tracking-tight sm:text-3xl"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text-primary)",
                }}
              >
                {project.name}
              </h3>
              <TagList tags={project.tags} />
            </div>

            <p
              className="mb-6 max-w-2xl text-sm leading-relaxed sm:text-base"
              style={{ color: "var(--color-text-muted)" }}
            >
              {project.description}
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <ProjectLink
                href={project.demoUrl}
                primary
                label="Explore Project"
              />
              <ProjectLink
                href={project.repoUrl}
                label="Repository"
                icon={
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                }
              />
            </div>
          </div>
        )}

        {!isActive && (
          <div className="border-t border-[var(--color-border)] px-4 py-3">
            <h3
              className="text-sm font-semibold tracking-tight text-[var(--color-text-primary)] sm:text-base"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {project.name}
            </h3>
          </div>
        )}
      </div>
    </article>
  );
}

function ProjectPreview({
  project,
  projectIndex,
}: {
  project: Project;
  projectIndex: number;
}) {
  return (
    <div
      className="relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden bg-[var(--color-surface-elevated)]"
      aria-hidden="true"
    >
      {project.previewImage ? (
        <Image
          src={project.previewImage}
          alt=""
          fill
          sizes="(min-width: 1280px) 800px, (min-width: 641px) 76vw, 86vw"
          className="object-cover"
        />
      ) : (
        <>
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute inset-5 border border-[rgba(77,163,255,0.18)] sm:inset-8" />
          <div className="relative flex flex-col items-center gap-3 text-center">
            <Code2
              className="h-8 w-8 text-[var(--color-accent)] opacity-80 sm:h-10 sm:w-10"
              strokeWidth={1.25}
              aria-hidden="true"
            />
            <span
              className="text-[9px] uppercase tracking-[0.24em] text-[var(--color-text-muted)] sm:text-[10px]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Project {String(projectIndex + 1).padStart(2, "0")} · Preview pending
            </span>
          </div>
        </>
      )}
      <span
        className="absolute right-5 top-5 text-[10px] tracking-[0.18em] text-[var(--color-accent)]"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {project.id.toUpperCase()}
      </span>
    </div>
  );
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function TagList({ tags, className }: { tags: string[]; className?: string }) {
  return (
    <ul
      className={cn("flex flex-wrap gap-2", className)}
      aria-label="Technologies used"
    >
      {tags.map((tag) => (
        <li key={tag}>
          <span
            className="px-2.5 py-1 rounded-full text-[11px] tracking-wider uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-text-muted)",
              border: "1px solid var(--color-border)",
              backgroundColor: "var(--color-surface-elevated)",
            }}
          >
            {tag}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ProjectLink({
  href,
  label,
  primary,
  small,
  icon,
}: {
  href: string;
  label: string;
  primary?: boolean;
  small?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group/link inline-flex items-center gap-1.5 font-medium",
        "transition-colors duration-[var(--duration-base)]",
        small ? "text-xs" : "text-sm",
        primary
          ? "text-[var(--color-accent)] hover:text-[#6db8ff]"
          : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
      )}
    >
      {icon}
      {label}
      <ArrowRight
        className={cn(
          "transition-transform duration-[var(--duration-base)] group-hover/link:translate-x-0.5",
          small ? "w-3 h-3" : "w-3.5 h-3.5"
        )}
        aria-hidden="true"
        strokeWidth={2.5}
      />
    </a>
  );
}
