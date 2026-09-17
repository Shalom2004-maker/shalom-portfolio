"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

type TechnologyCategory = "Frontend" | "Backend & Data" | "Mobile" | "Tools" | "Learning";

type Technology = {
  name: string;
  category: TechnologyCategory;
  icon: TechnologyIconName;
};

type TechnologyIconName =
  | "react"
  | "next"
  | "typescript"
  | "javascript"
  | "html"
  | "css"
  | "tailwind"
  | "php"
  | "supabase"
  | "postgresql"
  | "plpgsql"
  | "flutter"
  | "dart"
  | "git"
  | "github"
  | "vscode"
  | "vercel"
  | "figma"
  | "csharp"
  | "aspnet";

const TECHNOLOGIES: Technology[] = [
  { name: "React", category: "Frontend", icon: "react" },
  { name: "Next.js", category: "Frontend", icon: "next" },
  { name: "TypeScript", category: "Frontend", icon: "typescript" },
  { name: "JavaScript", category: "Frontend", icon: "javascript" },
  { name: "HTML", category: "Frontend", icon: "html" },
  { name: "CSS", category: "Frontend", icon: "css" },
  { name: "Tailwind CSS", category: "Frontend", icon: "tailwind" },
  { name: "PHP", category: "Backend & Data", icon: "php" },
  { name: "Supabase", category: "Backend & Data", icon: "supabase" },
  { name: "PostgreSQL", category: "Backend & Data", icon: "postgresql" },
  { name: "PL/pgSQL", category: "Backend & Data", icon: "plpgsql" },
  { name: "Flutter", category: "Mobile", icon: "flutter" },
  { name: "Dart", category: "Mobile", icon: "dart" },
  { name: "Git", category: "Tools", icon: "git" },
  { name: "GitHub", category: "Tools", icon: "github" },
  { name: "VS Code", category: "Tools", icon: "vscode" },
  { name: "Vercel", category: "Tools", icon: "vercel" },
  { name: "Figma", category: "Tools", icon: "figma" },
  { name: "C#", category: "Learning", icon: "csharp" },
  { name: "ASP.NET", category: "Learning", icon: "aspnet" },
];

export function Capabilities() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const section = sectionRef.current;
    const targets = Array.from(section.querySelectorAll<HTMLElement>("[data-cap-reveal]"));
    if (!targets.length) return;
    let fallback: number | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        observer.disconnect();

        targets.forEach((element) => {
          element.style.opacity = "0";
          element.style.transform = "translateY(18px)";
        });

        try {
          const animation = animate(targets, {
            opacity: [0, 1],
            translateY: [18, 0],
            duration: 520,
            delay: stagger(55),
            ease: "outCubic",
          });

          fallback = window.setTimeout(() => {
            targets.forEach((element) => {
              element.style.opacity = "1";
              element.style.transform = "none";
            });
            animation.pause();
          }, 1200);
        } catch (error) {
          console.error("Capabilities animation failed:", error);
          targets.forEach((element) => {
            element.style.opacity = "1";
            element.style.transform = "none";
          });
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      if (fallback) window.clearTimeout(fallback);
    };
  }, [reducedMotion]);

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      aria-labelledby="capabilities-heading"
      className="mx-auto w-full max-w-7xl px-6 py-24 md:px-10 md:py-32"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="mb-16 h-px" style={{ backgroundColor: "var(--color-border)" }} aria-hidden="true" />

      <div data-cap-reveal className="mb-12">
        <SectionHeading
          index="04"
          heading="Technologies"
          subheading="A focused toolkit for building thoughtful, functional applications."
          as="h2"
        />
      </div>

      <div
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4"
        aria-label="Technologies and tools"
      >
        {TECHNOLOGIES.map((technology) => (
          <TechnologyCard key={technology.name} technology={technology} />
        ))}
      </div>
    </section>
  );
}

function TechnologyCard({ technology }: { technology: Technology }) {
  return (
    <article
      data-cap-reveal
      className={cn(
        "group flex min-h-[7.25rem] flex-col justify-between border border-[var(--color-border)]",
        "bg-[rgba(7,9,13,0.42)] p-4 transition-all duration-[var(--duration-base)]",
        "hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:bg-[rgba(13,17,23,0.8)]",
        "hover:shadow-[0_0_24px_rgba(77,163,255,0.10)] focus-within:border-[var(--color-accent)]"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <TechnologyIcon name={technology.icon} />
        <span
          className="text-[9px] uppercase tracking-[0.14em] opacity-0 transition-opacity duration-[var(--duration-base)] group-hover:opacity-100"
          style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent)" }}
        >
          {technology.category}
        </span>
      </div>
      <h3
        className="mt-6 text-sm font-medium leading-tight text-[var(--color-text-primary)] transition-colors duration-[var(--duration-base)] group-hover:text-[var(--color-accent)]"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {technology.name}
      </h3>
    </article>
  );
}

function TechnologyIcon({ name }: { name: TechnologyIconName }) {
  const common = {
    className:
      "h-8 w-8 text-[var(--color-text-muted)] transition-all duration-[var(--duration-base)] group-hover:scale-110 group-hover:text-[var(--color-accent)]",
    "aria-hidden": true as const,
    focusable: false as const,
  };

  if (name === "react") {
    return <svg {...common} viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="3" fill="currentColor" /><g stroke="currentColor" strokeWidth="1.5"><ellipse cx="16" cy="16" rx="13" ry="5" /><ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(60 16 16)" /><ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(120 16 16)" /></g></svg>;
  }

  const letterMarks: Partial<Record<TechnologyIconName, string>> = {
    next: "N",
    typescript: "TS",
    javascript: "JS",
    html: "<>",
    css: "#",
    tailwind: "≋",
    php: "PHP",
    supabase: "S",
    postgresql: "PG",
    plpgsql: "SQL",
    flutter: "F",
    dart: "D",
    git: "⌘",
    github: "GH",
    vscode: "VS",
    vercel: "▲",
    figma: "F",
    csharp: "C#",
    aspnet: ".N",
  };

  return (
    <svg {...common} viewBox="0 0 40 40" fill="none">
      <rect x="1" y="1" width="38" height="38" rx="7" stroke="currentColor" strokeWidth="1.5" />
      <text
        x="20"
        y="24"
        fill="currentColor"
        textAnchor="middle"
        fontSize={name === "php" || name === "postgresql" || name === "plpgsql" ? "7" : "12"}
        fontWeight="600"
        fontFamily="var(--font-mono)"
      >
        {letterMarks[name]}
      </text>
    </svg>
  );
}
