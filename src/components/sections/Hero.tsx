"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, GitBranch } from "lucide-react";
import { animate, createTimeline, stagger } from "animejs";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

// ─── System status panel data ─────────────────────────────────────────────────

const STATUS_ITEMS = [
  { label: "SYSTEM STATUS", value: "ONLINE" },
  { label: "AVAILABILITY",  value: "FOR OPPORTUNITIES" },
  { label: "ROLE",          value: "FULL-STACK DEV" },
  { label: "FOCUS",         value: "WEB APPLICATIONS" },
  { label: "BUILD",         value: "2026.09" },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Hero — spec §9 + §17.
 *
 * Motion sequence (Anime.js timeline):
 *   1. Index label fades up.
 *   2. Name splits into words — each word clips up from below (per spec §17
 *      "hero text reveal with controlled stagger").
 *   3. Tagline, intro and CTAs stagger in.
 *   4. Status panel slides in from the right.
 *
 * All gated behind useReducedMotion.
 */
export function Hero() {
  const reducedMotion = useReducedMotion();
  const sectionRef    = useRef<HTMLElement>(null);
  const nameRef       = useRef<HTMLHeadingElement>(null);

  // Lightweight splitText replacement — wraps words in clip containers and returns a revert() function
  function splitWords(el: HTMLElement) {
    const original = el.innerHTML;
    const text = el.textContent ?? "";
    // Split on spaces but keep consecutive spaces
    const words = text.split(/(\s+)/).filter(Boolean);

    const frag = words
      .map((w) => {
        if (/^\s+$/.test(w)) return w.replace(/ /g, "\u00A0");
        const safe = w.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        return `<span data-word style=\"display:inline-block;overflow:hidden\"><span style=\"display:inline-block\">${safe}</span></span>`;
      })
      .join("");

    el.innerHTML = frag;

    return {
      revert() {
        el.innerHTML = original;
      },
    };
  }

  useEffect(() => {
    if (reducedMotion || !sectionRef.current || !nameRef.current) return;

    const section = sectionRef.current;
    const nameEl = nameRef.current;

    let tl: any = undefined;
    let splitter: any = undefined;
    let fallback: number | undefined = undefined;

    try {
      // Split the name heading into individual words with clip overflow
      splitter = splitWords(nameEl);

      // The inner word spans are the direct children of each clip wrapper
      const wordInners = Array.from(nameEl.querySelectorAll<HTMLElement>("[data-word]"));
      const animTargets = wordInners.length
        ? wordInners
        : Array.from(nameEl.querySelectorAll<HTMLElement>("span span"));

      // Elements to animate (everything except the name, which is handled separately)
      const rest = Array.from(section.querySelectorAll<HTMLElement>("[data-hero-reveal]"));
      const panel = section.querySelector<HTMLElement>("[data-hero-panel]");

      // Set initial states
      rest.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
      });
      if (panel) {
        panel.style.opacity = "0";
        panel.style.transform = "translateX(20px)";
      }

      tl = createTimeline({ defaults: { ease: "outCubic" } });

      // 1. Index label
      const label = section.querySelector<HTMLElement>("[data-hero-label]");
      if (label) {
        label.style.opacity = "0";
        tl.add(label, { opacity: [0, 1], translateY: [-10, 0], duration: 400 }, 150);
      }

      // 2. Name — word-by-word clip up
      if (animTargets.length) {
        tl.add(animTargets, { translateY: ["110%", "0%"], duration: 600, delay: stagger(60, { start: 0 }) }, 300);
      }

      // 3. Rest of hero content
      rest.forEach((el, i) => {
        tl.add(el, { opacity: [0, 1], translateY: [20, 0], duration: 500 }, 600 + i * 90);
      });

      // 4. Status panel
      if (panel) {
        tl.add(panel, { opacity: [0, 1], translateX: [20, 0], duration: 500 }, 900);
      }

      // Failsafe: ensure reveal doesn't remain hidden if timeline fails to start
      fallback = window.setTimeout(() => {
        const restEls = Array.from(section.querySelectorAll<HTMLElement>("[data-hero-reveal]"));
        restEls.forEach((el) => {
          if (el.style.opacity === "0") {
            el.style.opacity = "1";
            el.style.transform = "none";
          }
        });
        const panelEl = section.querySelector<HTMLElement>("[data-hero-panel]");
        if (panelEl && panelEl.style.opacity === "0") {
          panelEl.style.opacity = "1";
          panelEl.style.transform = "none";
        }
        const labelEl = section.querySelector<HTMLElement>("[data-hero-label]");
        if (labelEl && labelEl.style.opacity === "0") {
          labelEl.style.opacity = "1";
          labelEl.style.transform = "none";
        }
      }, 1200);
    } catch (err) {
      // If animation setup fails, restore visible state to avoid hiding content
      // eslint-disable-next-line no-console
      console.error("Hero animation failed:", err);
      const rest = Array.from(section.querySelectorAll<HTMLElement>("[data-hero-reveal]"));
      rest.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      const panel = section.querySelector<HTMLElement>("[data-hero-panel]");
      if (panel) {
        panel.style.opacity = "1";
        panel.style.transform = "none";
      }
    }

    return () => {
      if (tl && typeof tl.revert === "function") tl.revert();
      if (splitter && typeof splitter.revert === "function") splitter.revert();
      if (fallback) clearTimeout(fallback);
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-label="Introduction"
      className={cn(
        "relative min-h-[calc(100vh-4rem)]",
        "flex flex-col justify-center",
        "max-w-7xl mx-auto w-full px-6 md:px-10",
        "py-20 md:py-28"
      )}
    >
      {/* ── Main content ── */}
      <div className="flex flex-col gap-0">

        {/* Section index label */}
        <p
          data-hero-label
          className="mb-6 text-xs tracking-[0.2em] uppercase"
          style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent)" }}
          aria-hidden="true"
        >
          01 / Hero
        </p>

        {/* Name — split into words by the animation */}
        <h1
          ref={nameRef}
          className={cn(
            "text-[clamp(2.75rem,8vw,7rem)]",
            "font-semibold tracking-tight leading-[0.95]",
            "mb-4"
          )}
          style={{ fontFamily: "var(--font-display)", color: "var(--color-text-primary)" }}
        >
          SHALOM NDAHIRIWE
        </h1>

        {/* Tagline */}
        <p
          data-hero-reveal
          className={cn("text-[clamp(1rem,2.5vw,1.5rem)]", "font-medium tracking-wide mb-6")}
          style={{ fontFamily: "var(--font-display)", color: "var(--color-text-muted)" }}
        >
          I BUILD WEB EXPERIENCES.
        </p>

        {/* Intro copy */}
        <p
          data-hero-reveal
          className="max-w-lg text-base leading-relaxed mb-10"
          style={{ color: "var(--color-text-muted)" }}
        >
          I&apos;m a web developer who builds thoughtful, functional web applications
          with modern technologies, clean interfaces, and attention to the details
          that make software feel complete.
        </p>

        {/* CTAs */}
        <div data-hero-reveal className="flex flex-wrap items-center gap-4">
          <HeroCTA href="#work" primary>Explore Work</HeroCTA>
          <HeroCTA href="https://github.com/Shalom2004-maker" external>
            <GitBranch className="w-4 h-4" aria-hidden="true" />
            GitHub
          </HeroCTA>
        </div>
      </div>

      {/* ── System status panel ── */}
      <SystemStatusPanel />

      {/* ── Section divider ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-6 md:left-10 right-6 md:right-10 h-px"
        style={{ backgroundColor: "var(--color-border)" }}
      />
    </section>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface HeroCTAProps {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
  external?: boolean;
}

function HeroCTA({ href, children, primary = false, external = false }: HeroCTAProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "group inline-flex items-center gap-2",
        "h-11 px-6 rounded-full",
        "text-sm font-semibold tracking-tight",
        "transition-all duration-[var(--duration-base)]",
        primary
          ? "bg-[var(--color-accent)] text-[#07090D] hover:bg-[#6db8ff] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
          : "border border-[var(--color-border-strong)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
      )}
    >
      {children}
      <ArrowRight
        className="w-4 h-4 transition-transform duration-[var(--duration-base)] group-hover:translate-x-0.5"
        aria-hidden="true"
        strokeWidth={2.5}
      />
    </a>
  );
}

function SystemStatusPanel() {
  return (
    <aside
      data-hero-panel
      aria-label="Developer status"
      className={cn(
        "mt-16 lg:mt-0",
        "lg:absolute lg:bottom-12 lg:right-10",
        "rounded-lg border border-[var(--color-border)]",
        "bg-[rgba(13,17,23,0.6)] backdrop-blur-sm",
        "p-4 w-full max-w-xs"
      )}
    >
      <p
        className="text-[10px] tracking-[0.25em] uppercase mb-3"
        style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent)" }}
        aria-hidden="true"
      >
        ● SYSTEM STATUS
      </p>
      <dl className="flex flex-col gap-1.5">
        {STATUS_ITEMS.map(({ label, value }) => (
          <div key={label} className="flex items-baseline justify-between gap-4">
            <dt
              className="text-[10px] tracking-widest uppercase shrink-0"
              style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-muted)" }}
            >
              {label}
            </dt>
            <dd
              className="text-[10px] tracking-widest uppercase text-right"
              style={{
                fontFamily: "var(--font-mono)",
                color: label === "SYSTEM STATUS" ? "var(--color-accent)" : "var(--color-text-primary)",
              }}
            >
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
