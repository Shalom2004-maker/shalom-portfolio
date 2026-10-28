"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { ArrowUpRight, GitBranch } from "lucide-react";
import { createTimeline, stagger } from "animejs";
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
 * Cinematic Hero scene. The supplied laptop artwork anchors the composition;
 * HTML identity and system panels remain independently readable above it.
 */
export function Hero() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const pointerQueryRef = useRef<MediaQueryList | null>(null);
  const pointerFrame = useRef(0);
  const pointerX = useRef(0);
  const pointerY = useRef(0);

  const resetParallax = useCallback(() => {
    const section = sectionRef.current;
    if (pointerFrame.current) {
      window.cancelAnimationFrame(pointerFrame.current);
      pointerFrame.current = 0;
    }
    section?.removeAttribute("data-hero-parallax");
    section?.style.setProperty("--hero-pointer-x", "0");
    section?.style.setProperty("--hero-pointer-y", "0");
  }, []);

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
          translateY: [16, 0],
          duration: 540,
          delay: stagger(90),
        },
        100
      );
      const fallback = window.setTimeout(() => {
        targets.forEach((element) => {
          element.style.opacity = "1";
          element.style.transform = "none";
        });
      }, 1400);

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

  useEffect(() => {
    if (reducedMotion) {
      pointerQueryRef.current = null;
      resetParallax();
      return;
    }

    pointerQueryRef.current = window.matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine)"
    );
    const handleBlur = () => resetParallax();
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("blur", handleBlur);
      pointerQueryRef.current = null;
      resetParallax();
    };
  }, [reducedMotion, resetParallax]);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (
      reducedMotion ||
      event.pointerType === "touch" ||
      !pointerQueryRef.current?.matches
    ) {
      return;
    }

    const section = sectionRef.current;
    if (!section) return;
    const bounds = section.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;

    pointerX.current = Math.max(
      -1,
      Math.min(1, (event.clientX - bounds.left - bounds.width / 2) / (bounds.width / 2))
    );
    pointerY.current = Math.max(
      -1,
      Math.min(1, (event.clientY - bounds.top - bounds.height / 2) / (bounds.height / 2))
    );

    if (!pointerFrame.current) {
      pointerFrame.current = window.requestAnimationFrame(() => {
        pointerFrame.current = 0;
        section.style.setProperty("--hero-pointer-x", pointerX.current.toFixed(3));
        section.style.setProperty("--hero-pointer-y", pointerY.current.toFixed(3));
        section.setAttribute("data-hero-parallax", "active");
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Introduction"
      className="hero-cinematic relative mx-auto min-h-[calc(100svh-4rem)] w-full max-w-7xl px-6 py-10 md:px-10 md:py-12"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetParallax}
    >
      <div className="hero-scene">
        <div
          className="hero-artwork-layer"
          data-hero-reveal
          aria-hidden="true"
        >
          <div className="hero-artwork-parallax">
            <Image
              src="/images/Neon%20Developer%20Laptop%20Orbit.png"
              alt=""
              width={1536}
              height={1024}
              priority
              sizes="(min-width: 1280px) 90vw, (min-width: 768px) 100vw, 100vw"
              className="hero-artwork"
            />
          </div>
          <div className="hero-artwork-vignette" />
        </div>

        <div className="hero-identity-layer" data-hero-reveal>
          <p className="hero-eyebrow">01 / Web development</p>
          <p className="hero-role">Full-stack developer</p>
          <h1 className="hero-name">Shalom Ndahiriwe</h1>
          <p className="hero-headline">I build web experiences.</p>
          <p className="hero-description">
            I&apos;m a web developer who builds thoughtful, functional web
            applications with modern technologies, clean interfaces, and
            attention to the details that make software feel complete.
          </p>
          <div className="hero-actions">
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

        <aside
          data-hero-reveal
          aria-label="Core technologies"
          className="hero-glass-panel hero-tech-panel"
        >
          <div className="hero-panel-parallax">
            <p className="hero-panel-label">Core stack</p>
            <ul className="hero-tech-list">
              {TECHNOLOGIES.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </div>
        </aside>

        <aside
          data-hero-reveal
          aria-label="Developer status"
          className="hero-glass-panel hero-status-panel"
        >
          <div className="hero-panel-parallax">
            <p className="hero-panel-label">
              <span className="op-pulse" aria-hidden="true" />
              System status
            </p>
            <dl className="hero-status-list">
              {STATUS_ITEMS.map(({ label, value, accent }) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd className={accent ? "hero-status-online" : undefined}>
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
