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
import { animate, cubicBezier, stagger } from "animejs";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MaskedTextReveal } from "@/components/ui/MaskedTextReveal";
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
type TransitionDirection = "forward" | "backward";
type ProjectTransition = {
  outgoingIndex: number;
  incomingIndex: number;
  direction: TransitionDirection;
};

const PROJECTS: Project[] = [
  {
    id: "p01",
    name: "LetChat",
    description:
      "Real-time messaging platform (work in progress). Email-confirm authentication and Supabase-backed real-time chat with typing indicators, read receipts, and document sharing.",
    tags: ["TypeScript", "Supabase"],
    demoUrl: "https://glide-talk-platform.vercel.app/login",
    repoUrl: "https://github.com/Shalom2004-maker/glide-talk-platform",
    previewImage: "/images/letchat.jpg",
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
    previewImage: "/images/nexgen-solution.png",
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
  const isTransitioning = useRef(false);
  const transitionTimeout = useRef<number | null>(null);
  const initialProjectIndex = PROJECTS.findIndex((project) => project.featured);
  const [activeIndex, setActiveIndex] = useState(
    initialProjectIndex >= 0 ? initialProjectIndex : 0
  );
  const [transition, setTransition] = useState<ProjectTransition | null>(null);
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

  const startTransition = (nextIndex: number, direction: TransitionDirection) => {
    if (isTransitioning.current || nextIndex === activeIndex) return;

    if (reducedMotion) {
      setActiveIndex(nextIndex);
      return;
    }

    isTransitioning.current = true;
    setTransition({
      outgoingIndex: activeIndex,
      incomingIndex: nextIndex,
      direction,
    });
    setActiveIndex(nextIndex);
    transitionTimeout.current = window.setTimeout(() => {
      isTransitioning.current = false;
      transitionTimeout.current = null;
      setTransition(null);
    }, 540);
  };

  const showPrevious = () => {
    startTransition(
      (activeIndex - 1 + PROJECTS.length) % PROJECTS.length,
      "backward"
    );
  };
  const showNext = () => {
    startTransition((activeIndex + 1) % PROJECTS.length, "forward");
  };

  // ── Scroll-triggered entrance ──────────────────────────────────────────────
  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const section = sectionRef.current;
    const maskedTargets = Array.from(
      section.querySelectorAll<HTMLElement>("[data-masked-text-content]")
    );
    const targets = Array.from(
      section.querySelectorAll<HTMLElement>("[data-work-reveal]")
    );

    if (!targets.length && !maskedTargets.length) return;

    let maskedAnimation: ReturnType<typeof animate> | undefined;
    let targetAnimation: ReturnType<typeof animate> | undefined;
    let animationFrame: number | undefined;
    let fallback: number | undefined;
    let hasStarted = false;
    const allTargets = [...maskedTargets, ...targets];
    const restoreVisibleState = () => {
      if (!hasStarted) return;

      allTargets.forEach((element) => {
        element.style.opacity = "1";
        element.style.transform = "none";
      });
    };
    const restoreMaskedText = () => {
      maskedTargets.forEach((element) => {
        element.style.opacity = "1";
        element.style.transform = "none";
      });
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();

          try {
            hasStarted = true;
            maskedTargets.forEach((element) => {
              element.style.opacity = "0";
              element.style.transform = "translateY(100%)";
            });
            targets.forEach((el) => {
              el.style.opacity = "0";
              el.style.transform = "translateY(32px)";
            });

            if (fallback !== undefined) window.clearTimeout(fallback);
            fallback = window.setTimeout(restoreVisibleState, 1400);
            animationFrame = window.requestAnimationFrame(() => {
              animationFrame = undefined;

              try {
                if (maskedTargets.length) {
                  maskedAnimation = animate(maskedTargets, {
                    opacity: [0, 1],
                    translateY: ["100%", "0%"],
                    duration: 820,
                    ease: cubicBezier(0.22, 1, 0.36, 1),
                    onComplete: restoreMaskedText,
                  });
                }

                if (targets.length) {
                  targetAnimation = animate(targets, {
                    opacity: [0, 1],
                    translateY: [32, 0],
                    duration: 700,
                    delay: stagger(100, { start: 0 }),
                    ease: "outCubic",
                  });
                }
              } catch (err) {
                console.error("SelectedWork animation failed:", err);
                restoreVisibleState();
              }
            });
          } catch (err) {
            console.error("SelectedWork animation failed:", err);
            restoreVisibleState();
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);

    fallback = window.setTimeout(restoreVisibleState, 1200);

    return () => {
      if (fallback !== undefined) window.clearTimeout(fallback);
      observer.disconnect();
      if (animationFrame !== undefined) {
        window.cancelAnimationFrame(animationFrame);
      }
      maskedAnimation?.revert();
      targetAnimation?.revert();
      restoreVisibleState();
    };
  }, [reducedMotion]);

  useEffect(
    () => () => {
      if (transitionTimeout.current !== null) {
        window.clearTimeout(transitionTimeout.current);
      }
    },
    []
  );

  const handleCarouselKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.target !== event.currentTarget || isTransitioning.current) return;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (isTransitioning.current || event.touches.length !== 1) {
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
      <MaskedTextReveal
        trigger="external"
        className="mb-14"
      >
        <SectionHeading
          index="02"
          heading="Selected Work"
          subheading="Projects built with engineering quality and interaction design."
          as="h2"
          id="work-heading"
        />
      </MaskedTextReveal>

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
            />
          ))}
        </div>

        <div
          className={cn(
            "work-carousel__information",
            transition && `work-carousel__information--${transition.direction}`
          )}
        >
          {transition ? (
            <>
              <ProjectInformation
                project={PROJECTS[transition.outgoingIndex]}
                state="outgoing"
              />
              <ProjectInformation
                project={PROJECTS[transition.incomingIndex]}
                state="incoming"
              />
            </>
          ) : (
            <ProjectInformation
              project={activeProject}
              state="active"
            />
          )}
        </div>

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          Project {activeIndex + 1} of {PROJECTS.length}: {activeProject.name}
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-5">
          <button
            type="button"
            onClick={showPrevious}
            className="work-carousel__control"
            aria-disabled={Boolean(transition)}
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
                  if (transition) return;
                  const forwardDistance =
                    (index - activeIndex + PROJECTS.length) % PROJECTS.length;
                  const backwardDistance =
                    (activeIndex - index + PROJECTS.length) % PROJECTS.length;
                  startTransition(
                    index,
                    forwardDistance <= backwardDistance
                      ? "forward"
                      : "backward"
                  );
                }}
                className={cn(
                  "work-carousel__indicator",
                  index === activeIndex && "work-carousel__indicator--active"
                )}
                aria-disabled={Boolean(transition)}
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
            aria-disabled={Boolean(transition)}
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
}: {
  project: Project;
  projectIndex: number;
  position: SlidePosition;
}) {
  const isActive = position === "active";

  return (
    <article
      className={cn(
        "work-carousel__slide",
        `work-carousel__slide--${position}`,
        "overflow-hidden border bg-[var(--color-surface)]"
      )}
      role="group"
      aria-hidden={!isActive}
      aria-label={`Project ${projectIndex + 1} of ${PROJECTS.length}: ${project.name}`}
      aria-roledescription="slide"
    >
      <ProjectPreview project={project} />
    </article>
  );
}

function ProjectInformation({
  project,
  state,
}: {
  project: Project;
  state: "active" | "outgoing" | "incoming";
}) {
  const isOutgoing = state === "outgoing";

  return (
    <div
      className={cn(
        "work-carousel__information-panel",
        `work-carousel__information-panel--${state}`
      )}
      aria-hidden={isOutgoing}
      inert={isOutgoing}
    >
      <div className="work-carousel__information-heading">
        <h3>{project.name}</h3>
        <TagList tags={project.tags} />
      </div>

      <p>{project.description}</p>

      <div className="work-carousel__actions">
        <ProjectLink
          href={project.demoUrl}
          primary
          label="Explore Project"
        />
        <ProjectLink
          href={project.repoUrl}
          label="Repository"
          icon={<ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />}
        />
      </div>
    </div>
  );
}

function ProjectPreview({
  project,
}: {
  project: Project;
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
        <div className="work-carousel__fallback">
          <div className="work-carousel__fallback-grid" />
          <div className="relative flex flex-col items-center gap-2 text-center">
            <Code2
              className="h-8 w-8 text-[var(--color-accent)] opacity-80 sm:h-10 sm:w-10"
              strokeWidth={1.25}
              aria-hidden="true"
            />
            <span className="work-carousel__fallback-name">{project.name}</span>
            <span className="work-carousel__fallback-caption">
              Preview pending
            </span>
          </div>
        </div>
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
