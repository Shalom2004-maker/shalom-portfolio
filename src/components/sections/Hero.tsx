"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, GitBranch } from "lucide-react";
import { createTimeline, stagger } from "animejs";
import { HeroLaptop } from "@/components/ui/HeroLaptop";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

const TECHNOLOGIES = ["React", "Next.js", "TypeScript", "Supabase"] as const;

const STATUS_ITEMS = [
  { label: "STATUS", value: "ONLINE", accent: true },
  { label: "AVAILABILITY", value: "FOR OPPORTUNITIES", accent: false },
  { label: "ROLE", value: "FULL-STACK DEVELOPER", accent: false },
  { label: "FOCUS", value: "WEB APPLICATIONS", accent: false },
  { label: "LOCATION", value: "RAJKOT, INDIA", accent: false },
] as const;

const REVEAL_SELECTOR = "[data-hero-reveal]";

/**
 * Hero — developer introduction framed by a CSS-built laptop and system readout.
 * Content remains visible by default; Anime.js only coordinates its entrance.
 */
export function Hero() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const section = sectionRef.current;
    const targets = Array.from(
      section.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
    );

    try {
      const timeline = createTimeline({ defaults: { ease: "outCubic" } });
      timeline.add(
        targets,
        {
          opacity: [0, 1],
          translateY: [18, 0],
          duration: 520,
          delay: stagger(70),
        },
        120
      );
      const fallback = window.setTimeout(() => {
        targets.forEach((element) => {
          element.style.opacity = "1";
          element.style.transform = "none";
        });
      }, 1200);

      return () => {
        window.clearTimeout(fallback);
        timeline.revert();
      };
    } catch (error) {
      console.error("Hero animation failed:", error);
      targets.forEach((element) => {
        element.style.opacity = "1";
        element.style.transform = "none";
      });
    }
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-label="Introduction"
      className={cn(
        "relative mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-7xl",
        "items-center px-6 py-12 md:px-10 md:py-16 xl:py-20"
      )}
    >
      <div className="hero-layout grid w-full items-center gap-x-8 gap-y-10 xl:gap-x-10">
        <div className="hero-intro relative z-10 flex flex-col items-start">
          <p
            data-hero-reveal
            className="mb-5 text-[10px] uppercase tracking-[0.28em]"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-accent)",
            }}
          >
            01 / Web development
          </p>

          <p
            data-hero-reveal
            className="mb-4 text-xs font-medium uppercase tracking-[0.2em]"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-text-muted)",
            }}
          >
            Full-stack developer
          </p>

          <h1
            data-hero-reveal
            className={cn(
              "max-w-3xl text-[clamp(3rem,7vw,6.6rem)]",
              "font-semibold uppercase leading-[0.9] tracking-[-0.055em]"
            )}
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text-primary)",
            }}
          >
            Shalom Ndahiriwe
          </h1>

          <p
            data-hero-reveal
            className="mt-7 text-[clamp(1.35rem,2.7vw,2.25rem)] font-medium uppercase leading-tight tracking-[-0.025em]"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text-primary)",
            }}
          >
            I build web experiences.
          </p>

          <p
            data-hero-reveal
            className="mt-6 max-w-xl text-base leading-relaxed md:text-lg"
            style={{ color: "var(--color-text-muted)" }}
          >
            I&apos;m a web developer who builds thoughtful, functional web
            applications with modern technologies, clean interfaces, and
            attention to the details that make software feel complete.
          </p>

          <div
            data-hero-reveal
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <HeroCTA href="#work" primary>
              Explore work
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </HeroCTA>
            <HeroCTA href="https://github.com/Shalom2004-maker" external>
              <GitBranch className="h-4 w-4" aria-hidden="true" />
              GitHub
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </HeroCTA>
          </div>

        </div>

        <div data-hero-reveal className="hero-laptop-column min-w-0">
          <HeroLaptop reducedMotion={reducedMotion} />
        </div>

        <aside
          data-hero-reveal
          aria-label="Technology and developer status"
          className="hero-system-panel min-w-0"
        >
          <div className="hero-system-block">
            <p className="hero-system-heading">Core stack</p>
            <ul className="hero-tech-list" aria-label="Core technologies">
              {TECHNOLOGIES.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </div>

          <div className="hero-system-block">
            <p className="hero-system-heading">
              <span className="op-pulse" aria-hidden="true" />
              System status
            </p>
            <dl className="hero-status-list">
              {STATUS_ITEMS.map(({ label, value, accent }) => (
                <div key={label} className="flex items-baseline justify-between gap-3">
                  <dt>{label}</dt>
                  <dd className={accent ? "text-[var(--color-accent)]" : undefined}>
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-6 right-6 h-px md:left-10 md:right-10"
        style={{ backgroundColor: "var(--color-border)" }}
      />
    </section>
  );
}

interface HeroCTAProps {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
  external?: boolean;
}

function HeroCTA({
  href,
  children,
  primary = false,
  external = false,
}: HeroCTAProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "group inline-flex h-11 items-center gap-2 px-5 text-sm font-semibold uppercase tracking-[0.05em]",
        "transition-colors rounded-3xl duration-[var(--duration-base)] focus-visible:ring-2",
        "focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
        primary
          ? "bg-[var(--color-accent)] text-[#07090D] hover:bg-[#6db8ff]"
          : "border border-[var(--color-border-strong)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
      )}
    >
      {children}
    </a>
  );
}
