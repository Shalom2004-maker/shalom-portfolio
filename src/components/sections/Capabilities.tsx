"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate, stagger } from "animejs";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

type Technology = {
  name: string;
  logo: string;
};

type CapabilityGroup = {
  id: string;
  index: string;
  label: string;
  descriptor: string;
  items: Technology[];
};

const CAPABILITY_GROUPS: CapabilityGroup[] = [
  {
    id: "frontend",
    index: "01",
    label: "Frontend",
    descriptor: "UI / UX",
    items: [
      { name: "React", logo: "react" },
      { name: "Next.js", logo: "nextjs" },
      { name: "TypeScript", logo: "typescript" },
      { name: "JavaScript", logo: "javascript" },
      { name: "HTML", logo: "html" },
      { name: "CSS", logo: "css" },
      { name: "Tailwind CSS", logo: "tailwind" },
      { name: "Bootstrap", logo: "bootstrap" },
    ],
  },
  {
    id: "backend",
    index: "02",
    label: "Backend & Data",
    descriptor: "APIs / DATABASES",
    items: [
      { name: "PHP", logo: "php" },
      { name: "Supabase", logo: "supabase" },
      { name: "PostgreSQL", logo: "postgresql" },
      { name: "MySQL", logo: "mysql" },
    ],
  },
  {
    id: "mobile",
    index: "03",
    label: "Mobile",
    descriptor: "CROSS-PLATFORM",
    items: [
      { name: "Flutter", logo: "flutter" },
      { name: "Dart", logo: "dart" },
    ],
  },
  {
    id: "tools",
    index: "04",
    label: "Tools",
    descriptor: "DEVELOPMENT",
    items: [
      { name: "Git", logo: "git" },
      { name: "GitHub", logo: "github" },
      { name: "VS Code", logo: "vscode" },
      { name: "Vercel", logo: "vercel" },
      { name: "Figma", logo: "figma" },
    ],
  },
  {
    id: "learning",
    index: "05",
    label: "Learning / In Progress",
    descriptor: "ALWAYS GROWING",
    items: [
      { name: "C#", logo: "csharp" },
      { name: "ASP.NET", logo: "dotnet" },
      { name: "Java", logo: "java" },
    ],
  },
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
          element.style.transform = "translateY(16px)";
        });

        try {
          animate(targets, {
            opacity: [0, 1],
            translateY: [16, 0],
            duration: 520,
            delay: stagger(45),
            ease: "outCubic",
          });

          fallback = window.setTimeout(() => {
            targets.forEach((element) => {
              element.style.opacity = "1";
              element.style.transform = "none";
            });
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
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="mb-16 h-px" style={{ backgroundColor: "var(--color-border)" }} aria-hidden="true" />

      <div className="mb-12 flex items-end justify-between gap-8">
        <div data-cap-reveal>
          <SectionHeading
            index="04"
            heading="Capabilities"
            subheading="Technologies and tools I work with — grouped by domain."
            as="h2"
          />
        </div>
        <p
          className="hidden pb-1 text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent)] lg:block"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          Building&nbsp; + &nbsp;Learning&nbsp; + &nbsp;Improving
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {CAPABILITY_GROUPS.map((group, index) => (
          <CapabilityGroupCard
            key={group.id}
            group={group}
            className={
              index === 0 || index === 1
                ? "lg:col-span-4"
                : index === 2
                  ? "lg:col-span-4"
                  : "lg:col-span-4"
            }
          />
        ))}
      </div>
    </section>
  );
}

function CapabilityGroupCard({
  group,
  className,
}: {
  group: CapabilityGroup;
  className: string;
}) {
  return (
    <article
      data-cap-reveal
      className={cn(
        "relative min-h-[17rem] overflow-hidden border border-[var(--color-accent-glow)]/70 p-5",
        "bg-[rgba(7,9,13,0.56)] transition-colors duration-[var(--duration-base)]",
        "hover:bg-[rgba(13,17,23,0.72)] rounded-lg",
        className
      )}
    >
      <div className="mb-7 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="text-sm tracking-[0.14em] text-[var(--color-accent)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {group.index}
          </span>
          <span className="h-px w-7 bg-[var(--color-accent)]" aria-hidden="true" />
          <h3
            className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text-primary)]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {group.label}
          </h3>
        </div>
        <span
          className="text-[9px] uppercase tracking-[0.12em] text-[var(--color-text-muted)]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {group.descriptor}
        </span>
      </div>

      <ul
        className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-4"
        aria-label={`${group.label} technologies`}
      >
        {group.items.map((technology) => (
          <li key={technology.name} className="min-w-0">
            <div className="group flex flex-col items-center gap-2 text-center transition-colors duration-[var(--duration-base)] rounded-lg">
              <div className="flex h-[4.25rem] w-full max-w-[6rem] items-center rounded-2xl justify-center border border-[rgba(77,163,255,0.28)] bg-[rgba(13,17,23,0.65)] transition-all duration-[var(--duration-base)] group-hover:border-[var(--color-accent)] group-hover:shadow-[0_0_18px_rgba(77,163,255,0.12)]">
                <Image
                  src={`/icons/${technology.logo}.svg`}
                  alt=""
                  aria-hidden="true"
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain transition-transform duration-[var(--duration-base)] group-hover:scale-110"
                />
              </div>
              <span
                className="max-w-full truncate text-xs text-[var(--color-text-muted)] transition-colors duration-[var(--duration-base)] group-hover:text-[var(--color-text-primary)]"
                style={{ fontFamily: "var(--font-mono)" }}
                title={technology.name}
              >
                {technology.name}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <span className="absolute bottom-0 right-0 h-5 w-5 border-l border-t border-[var(--color-accent-glow)]" aria-hidden="true" />
    </article>
  );
}
