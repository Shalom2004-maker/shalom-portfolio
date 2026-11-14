"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Mail } from "lucide-react";
import { animate, createTimeline, stagger } from "animejs";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const TECHNOLOGIES = [
  { name: "React", icon: "react.svg", position: "react" },
  { name: "Next.js", icon: "nextjs.svg", position: "next" },
  { name: "TypeScript", icon: "typescript.svg", position: "typescript" },
  { name: "Supabase", icon: "supabase.svg", position: "supabase" },
  { name: "Flutter", icon: "flutter.svg", position: "flutter" },
  { name: "PHP", icon: "php.svg", position: "php" },
] as const;

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/Shalom2004-maker",
    icon: "github",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shalom-ndahiriwe-747944380/",
    icon: "linkedin",
    external: true,
  },
  {
    label: "Email",
    href: "mailto:shalomndahi@gmail.com",
    icon: "email",
    external: false,
  },
] as const;

const CODE_STREAMS = [
  "01{}const=>01;01[]",
  "if(){}<>0101=>fn",
  "const[]0101return",
  "0101()=>{}class",
  "import{}from0101",
  "0101<main/>async",
  "let[]0101return{}",
] as const;

const REVEAL_SELECTOR = "[data-hero-reveal]";

export function Hero() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const orbitRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const section = sectionRef.current;
    const targets = Array.from(section.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    const logos = Array.from(section.querySelectorAll<HTMLElement>("[data-hero-float]"));
    let timeline: ReturnType<typeof createTimeline> | undefined;
    let orbit: ReturnType<typeof animate> | undefined;
    let logoMotion: ReturnType<typeof animate> | undefined;

    try {
      timeline = createTimeline({ defaults: { ease: "outCubic" } });
      timeline.add(
        targets,
        {
          opacity: [0, 1],
          translateY: [14, 0],
          duration: 520,
          delay: stagger(90),
        },
        100
      );

      if (orbitRef.current) {
        orbit = animate(orbitRef.current, {
          rotate: [0, 360],
          duration: 60000,
          ease: "linear",
          loop: true,
        });
      }

      if (logos.length) {
        logoMotion = animate(logos, {
          translateY: [0, -5, 0],
          duration: 3600,
          delay: stagger(260),
          ease: "inOutSine",
          loop: true,
        });
      }

      const fallback = window.setTimeout(() => {
        targets.forEach((element) => {
          element.style.opacity = "1";
          element.style.transform = "none";
        });
      }, 1500);

      return () => {
        window.clearTimeout(fallback);
        timeline?.revert();
        orbit?.revert();
        logoMotion?.revert();
      };
    } catch (error) {
      console.error("Hero animation failed:", error);
      targets.forEach((element) => {
        element.style.opacity = "1";
        element.style.transform = "none";
      });
      orbit?.revert();
      logoMotion?.revert();
    }
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-label="Introduction"
      className="hero-cinematic relative mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-7xl flex-col items-center justify-center overflow-hidden px-6 pb-12 pt-10 md:px-10 md:pb-16 md:pt-12"
    >
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="hero-code-rain" aria-hidden="true">
        {CODE_STREAMS.map((stream, index) => (
          <span key={index} className="hero-code-column">
            {stream.repeat(4)}
          </span>
        ))}
      </div>

      <div className="hero-intro" data-hero-reveal>
        <p className="hero-intro-eyebrow">Hello, I&apos;m</p>
        <h1 className="hero-intro-name">Shalom Ndahiriwe</h1>
        <p className="hero-intro-headline">I build web experiences.</p>
        <p className="hero-intro-description">
          I enjoy building practical digital systems, solving real-world
          problems, and exploring the logic behind technology.
        </p>
        <div className="hero-actions">
          <a className="hero-cta hero-cta-primary" href="#work">
            Explore work
          </a>
          <a
            className="hero-cta hero-cta-secondary"
            href="https://github.com/Shalom2004-maker"
            target="_blank"
            rel="noopener noreferrer"
          >
            View GitHub
          </a>
        </div>
      </div>

      <div className="hero-portrait-stage">
        <svg
          ref={orbitRef}
          className="hero-orbits"
          viewBox="0 0 640 420"
          aria-hidden="true"
        >
          <path d="M66 210C82 122 184 58 320 58s238 64 254 152" />
          <path d="M574 210C558 298 456 362 320 362S82 298 66 210" />
          <path d="M108 118C189 63 451 63 532 118" />
          <circle cx="82" cy="210" r="3" />
          <circle cx="558" cy="210" r="2.5" />
        </svg>

        <div className="hero-portrait-anchor">
          <div className="hero-portrait" data-hero-reveal>
            <Image
              src="/images/Portrait.png"
              alt="Shalom Ndahiriwe"
              width={941}
              height={1672}
              priority
              sizes="(min-width: 1024px) 250px, (min-width: 640px) 220px, 190px"
            />
          </div>
        </div>

        <ul className="hero-floating-tech" aria-label="Technology interests">
          {TECHNOLOGIES.map(({ name, icon, position }) => (
            <li
              key={name}
              className={`hero-tech-node hero-tech-${position}`}
              data-hero-reveal
            >
              <span className="hero-tech-icon" data-hero-float>
                <Image src={`/icons/${icon}`} alt="" width={34} height={34} />
              </span>
              <span>{name}</span>
            </li>
          ))}
        </ul>
      </div>

      <nav className="hero-social-dock" aria-label="Social links">
        {SOCIAL_LINKS.map(({ label, href, icon, external }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            title={label}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="hero-social-link"
          >
            {icon === "github" ? (
              <Image src="/icons/github.svg" alt="" width={18} height={18} />
            ) : icon === "linkedin" ? (
              <LinkedInIcon />
            ) : (
              <Mail aria-hidden="true" />
            )}
          </a>
        ))}
      </nav>

      <p className="hero-role-note" data-hero-reveal>
        Full-stack developer <span aria-hidden="true">·</span> Rajkot, India
      </p>

      <div className="hero-bottom-rule" aria-hidden="true" />
    </section>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7 20.45H3.67V9H7v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0h.01Z"
      />
    </svg>
  );
}
