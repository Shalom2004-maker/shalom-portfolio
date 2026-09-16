"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
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
  /** Featured projects span the full width */
  featured?: boolean;
}

const PROJECTS: Project[] = [
  {
    id: "p01",
    name: "[PROJECT NAME 01]",
    description: "[VALUE PROPOSITION — what the project does and why it matters]",
    tags: ["[TECH 01]", "[TECH 02]", "[TECH 03]"],
    demoUrl: "#",
    repoUrl: "#",
    featured: true,
  },
  {
    id: "p02",
    name: "[PROJECT NAME 02]",
    description: "[VALUE PROPOSITION]",
    tags: ["[TECH 01]", "[TECH 02]"],
    demoUrl: "#",
    repoUrl: "#",
  },
  {
    id: "p03",
    name: "[PROJECT NAME 03]",
    description: "[VALUE PROPOSITION]",
    tags: ["[TECH 01]", "[TECH 02]"],
    demoUrl: "#",
    repoUrl: "#",
  },
];

// ─── Main section ─────────────────────────────────────────────────────────────

/**
 * SelectedWork — spec §11.
 *
 * Layout:
 *   - One large featured project card (full width).
 *   - Two secondary project cards in a 2-column grid below.
 *
 * Interactions:
 *   - Subtle pointer-reactive tilt on the featured card (mouse move).
 *   - Directional hover lift on secondary cards.
 *   - Scroll-triggered entrance animation (Anime.js, IntersectionObserver).
 */
export function SelectedWork() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  // ── Scroll-triggered entrance ──────────────────────────────────────────────
  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const targets = Array.from(
      sectionRef.current.querySelectorAll<HTMLElement>("[data-work-reveal]")
    );

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
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
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const [featuredProject, ...secondaryProjects] = PROJECTS;

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
        />
      </div>

      {/* Featured project */}
      <div data-work-reveal className="mb-6">
        <FeaturedCard project={featuredProject} reducedMotion={reducedMotion} />
      </div>

      {/* Secondary grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {secondaryProjects.map((project, i) => (
          <div key={project.id} data-work-reveal>
            <SecondaryCard project={project} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Featured card ────────────────────────────────────────────────────────────

function FeaturedCard({
  project,
  reducedMotion,
}: {
  project: Project;
  reducedMotion: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Pointer-reactive tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    animate(cardRef.current, {
      rotateX: -y * 4,
      rotateY: x * 4,
      duration: 300,
      ease: "outCubic",
    });
  };

  const handleMouseLeave = () => {
    if (reducedMotion || !cardRef.current) return;
    animate(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 500,
      ease: "outCubic",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        "border border-[var(--color-border)]",
        "bg-[var(--color-surface)]",
        "transition-shadow duration-[var(--duration-base)]",
        "hover:shadow-[0_0_40px_var(--color-accent-glow)]",
        "hover:border-[var(--color-border-strong)]"
      )}
    >
      {/* Image placeholder */}
      <div
        className="w-full aspect-[16/9] relative overflow-hidden"
        style={{ backgroundColor: "var(--color-surface-elevated)" }}
        aria-hidden="true"
      >
        {/* Grid overlay — dark laboratory texture */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Project index label */}
        <span
          className="absolute top-5 left-5 text-xs tracking-[0.2em] uppercase"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--color-accent)",
          }}
        >
          01
        </span>
      </div>

      {/* Content */}
      <div className="p-7 md:p-9">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <h3
            className="text-2xl md:text-3xl font-semibold tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text-primary)",
            }}
          >
            {project.name}
          </h3>
          {/* Tech tags */}
          <TagList tags={project.tags} />
        </div>

        <p
          className="text-base leading-relaxed mb-7 max-w-2xl"
          style={{ color: "var(--color-text-muted)" }}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <ProjectLink href={project.demoUrl} primary label="Explore Project" />
          <ProjectLink href={project.repoUrl} label="Repository" icon={<ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />} />
        </div>
      </div>
    </div>
  );
}

// ─── Secondary card ───────────────────────────────────────────────────────────

function SecondaryCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl h-full",
        "border border-[var(--color-border)]",
        "bg-[var(--color-surface)]",
        "transition-all duration-[var(--duration-base)]",
        hovered && "border-[var(--color-border-strong)] -translate-y-1 shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
      )}
    >
      {/* Image placeholder */}
      <div
        className="w-full aspect-video relative overflow-hidden"
        style={{ backgroundColor: "var(--color-surface-elevated)" }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <span
          className="absolute top-4 left-4 text-xs tracking-[0.2em] uppercase"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--color-accent)",
          }}
        >
          {String(index + 2).padStart(2, "0")}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <TagList tags={project.tags} className="mb-3" />
        <h3
          className="text-xl font-semibold tracking-tight mb-2"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-text-primary)",
          }}
        >
          {project.name}
        </h3>
        <p
          className="text-sm leading-relaxed mb-6 flex-1"
          style={{ color: "var(--color-text-muted)" }}
        >
          {project.description}
        </p>

        <div className="flex items-center gap-4 mt-auto">
          <ProjectLink href={project.demoUrl} primary label="View Project" small />
          <ProjectLink href={project.repoUrl} label="Repo" small icon={<ExternalLink className="w-3 h-3" aria-hidden="true" />} />
        </div>
      </div>
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
