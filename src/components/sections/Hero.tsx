"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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

const TYPEWRITER_PHRASES = [
  "Full-stack Developer",
  "Software Engineering Enthusiast",
  "Problem Solver",
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
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [characterCount, setCharacterCount] = useState(
    TYPEWRITER_PHRASES[0].length
  );
  const [deleting, setDeleting] = useState(false);
  const activePhrase = TYPEWRITER_PHRASES[phraseIndex];
  const visiblePhrase = reducedMotion
    ? TYPEWRITER_PHRASES[0]
    : activePhrase.slice(0, characterCount);

  useEffect(() => {
    if (reducedMotion) return;

    const atStart = characterCount === 0;
    const atEnd = characterCount === activePhrase.length;
    const delay = deleting
      ? atStart
        ? 360
        : 36
      : atEnd
        ? 1350
        : 64;

    const timer = window.setTimeout(() => {
      if (deleting) {
        if (atStart) {
          setPhraseIndex((index) => (index + 1) % TYPEWRITER_PHRASES.length);
          setDeleting(false);
        } else {
          setCharacterCount((count) => count - 1);
        }
      } else if (atEnd) {
        setDeleting(true);
      } else {
        setCharacterCount((count) => count + 1);
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [activePhrase, characterCount, deleting, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const section = sectionRef.current;
    const targets = Array.from(
      section.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
    );
    const logos = Array.from(
      section.querySelectorAll<HTMLElement>("[data-hero-float]")
    );
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
          duration: 460,
          delay: stagger(70),
        },
        100
      );

      if (orbitRef.current) {
        orbit = animate(orbitRef.current, {
          rotate: [0, 360],
          duration: 60000,
          delay: 800,
          ease: "linear",
          loop: true,
        });
      }

      if (logos.length) {
        logoMotion = animate(logos, {
          translateY: [0, -5, 0],
          duration: 3600,
          delay: stagger(220, { start: 1050 }),
          ease: "inOutSine",
          loop: true,
        });
      }

      const fallback = window.setTimeout(() => {
        targets.forEach((element) => {
          element.style.opacity = "1";
          element.style.transform = "none";
        });
      }, 2100);

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
      timeline?.revert();
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

      <div className="hero-intro">
        <p className="hero-intro-eyebrow" data-hero-reveal>Hello, I&apos;m</p>
        <h1 className="hero-intro-name" data-hero-reveal>
          Shalom Ndahiriwe
        </h1>
        <p className="hero-intro-headline" data-hero-reveal>
          I build web experiences.
        </p>
        <p className="hero-typewriter" data-hero-reveal>
          <span className="sr-only">Full-stack Developer</span>
          <span aria-hidden="true">
            {visiblePhrase}
            {!reducedMotion && (
              <span className="hero-typewriter-cursor" />
            )}
          </span>
        </p>
        <p className="hero-intro-description" data-hero-reveal>
          I enjoy building practical digital systems, solving real-world
          problems, and exploring the logic behind technology.
        </p>
        <div className="hero-actions" data-hero-reveal>
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

      <p className="hero-role-note" data-hero-reveal>
        Full-stack developer <span aria-hidden="true">·</span> Rajkot, India
      </p>

      <div className="hero-bottom-rule" aria-hidden="true" />
    </section>
  );
}
