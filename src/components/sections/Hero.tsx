"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { animate, createTimeline, cubicBezier, stagger } from "animejs";
import { useMagneticButton } from "@/hooks/useMagneticButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { HeroMatrix } from "./HeroMatrix";

const TECHNOLOGIES = [
  { name: "React", icon: "react.svg", position: "react" },
  { name: "Next.js", icon: "nextjs.svg", position: "next" },
  { name: "TypeScript", icon: "typescript.svg", position: "typescript" },
  { name: "Supabase", icon: "supabase.svg", position: "supabase" },
  { name: "Flutter", icon: "flutter.svg", position: "flutter" },
  { name: "PHP", icon: "php.svg", position: "php" },
] as const;

const TYPEWRITER_PHRASES = [
  "Building practical systems",
  "Solving real-world problems",
  "Exploring technology's logic",
] as const;

const REVEAL_SELECTOR = "[data-hero-reveal]";
const MASK_REVEAL_SELECTOR = "[data-hero-mask-reveal]";

export function Hero() {
  const reducedMotion = useReducedMotion();
  const primaryCtaRef = useMagneticButton<HTMLAnchorElement>({ enabled: !reducedMotion });
  const secondaryCtaRef = useMagneticButton<HTMLAnchorElement>({ enabled: !reducedMotion });
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
        ? 300
        : 44
      : atEnd
        ? 1100
        : 68;

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
    const maskedTargets = Array.from(
      section.querySelectorAll<HTMLElement>(MASK_REVEAL_SELECTOR)
    );
    const targets = Array.from(
      section.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
    );
    const introEyebrow = targets.find((element) =>
      element.matches(".hero-intro-eyebrow")
    );
    const supportingTargets = targets.filter(
      (element) => element !== introEyebrow
    );
    const allRevealTargets = [...maskedTargets, ...targets];
    const logos = Array.from(
      section.querySelectorAll<HTMLElement>("[data-hero-float]")
    );
    let timeline: ReturnType<typeof createTimeline> | undefined;
    let orbit: ReturnType<typeof animate> | undefined;
    let logoMotion: ReturnType<typeof animate> | undefined;
    let observer: IntersectionObserver | undefined;

    try {
      timeline = createTimeline({ defaults: { ease: "outCubic" } });

      if (introEyebrow) {
        timeline.add(
          introEyebrow,
          {
            opacity: [0, 1],
            translateY: [14, 0],
            duration: 460,
          },
          100
        );
      }

      if (maskedTargets.length) {
        timeline.add(
          maskedTargets,
          {
            opacity: [0, 1],
            translateY: ["100%", "0%"],
            duration: 820,
            delay: stagger(120),
            ease: cubicBezier(0.22, 1, 0.36, 1),
          },
          180
        );
      }

      if (supportingTargets.length) {
        timeline.add(
          supportingTargets,
          {
            opacity: [0, 1],
            translateY: [14, 0],
            duration: 460,
            delay: stagger(70),
          },
          480
        );
      }

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

      if ("IntersectionObserver" in window) {
        observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            orbit?.resume();
            logoMotion?.resume();
          } else {
            orbit?.pause();
            logoMotion?.pause();
          }
        });
        observer.observe(section);
      }

      const fallback = window.setTimeout(() => {
        allRevealTargets.forEach((element) => {
          element.style.opacity = "1";
          element.style.transform = "none";
        });
      }, 2100);

      return () => {
        window.clearTimeout(fallback);
        observer?.disconnect();
        timeline?.revert();
        orbit?.revert();
        logoMotion?.revert();
      };
    } catch (error) {
      console.error("Hero animation failed:", error);
      observer?.disconnect();
      allRevealTargets.forEach((element) => {
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
      <HeroMatrix />

      <div className="hero-intro">
        <p className="hero-intro-eyebrow" data-hero-reveal>Hello, I&apos;m</p>
        <h1 className="hero-intro-name">
          <span className="hero-text-mask">
            <span className="hero-text-mask__content" data-hero-mask-reveal>
              Shalom Ndahiriwe
            </span>
          </span>
        </h1>
        <p className="hero-intro-headline">
          <span className="hero-text-mask">
            <span className="hero-text-mask__content" data-hero-mask-reveal>
              I build web experiences.
            </span>
          </span>
        </p>
        <p className="hero-typewriter" data-hero-reveal>
          <span className="sr-only">
            Building practical digital systems, solving real-world problems,
            and exploring the logic behind technology.
          </span>
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
          <a
            ref={primaryCtaRef}
            className="hero-cta hero-cta-primary magnetic-button"
            href="#work"
          >
            Explore work
          </a>
          <a
            ref={secondaryCtaRef}
            className="hero-cta hero-cta-secondary magnetic-button"
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
