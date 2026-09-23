"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Mail, ExternalLink, FileText } from "lucide-react";
import { animate, stagger } from "animejs";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

// ─── Social / contact links ───────────────────────────────────────────────────

const CONTACT_LINKS = [
  {
    id: "email",
    label: "Email",
    href: "mailto:shalomndahi@gmail.com",
    display: "shalomndahi@gmail.com",
    icon: Mail,
    external: false,
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/Shalom2004-maker",
    display: "github.com/Shalom2004-maker",
    icon: ExternalLink,
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shalom-ndahiriwe-747944380/",
    display: "linkedin.com/in/shalom-ndahiriwe",
    icon: ExternalLink,
    external: true,
  },
  {
    id: "resume",
    label: "Resume",
    href: "#", // Not yet supplied — placeholder
    display: "Coming soon",
    icon: FileText,
    external: false,
  },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Contact — spec §16.
 *
 * Structure:
 *   - Strong closing statement (not form-first).
 *   - Primary CTA: "Start a conversation →" (mailto).
 *   - Secondary links: GitHub, LinkedIn, Resume.
 *
 * No form rendered here — spec §24 notes "pending confirmation" for
 * React Hook Form + Zod + Resend. A placeholder is left for when confirmed.
 */
export function Contact() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const targets = Array.from(sectionRef.current.querySelectorAll<HTMLElement>("[data-contact-reveal]"));

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          try {
            targets.forEach((el) => {
              el.style.opacity = "0";
              el.style.transform = "translateY(24px)";
            });
            requestAnimationFrame(() => {
              animate(targets, {
                opacity: [0, 1],
                translateY: [24, 0],
                duration: 650,
                delay: stagger(90),
                ease: "outCubic",
              });
            });
          } catch (err) {
            // Restore on error
            // eslint-disable-next-line no-console
            console.error("Contact animation failed:", err);
            targets.forEach((el) => {
              el.style.opacity = "1";
              el.style.transform = "none";
            });
          }

          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(sectionRef.current);

    const fallback = window.setTimeout(() => {
      const targetsNow = Array.from(sectionRef.current?.querySelectorAll<HTMLElement>("[data-contact-reveal]") ?? []);
      targetsNow.forEach((el) => {
        if (el.style.opacity === "0") {
          el.style.opacity = "1";
          el.style.transform = "none";
        }
      });
    }, 1200);

    return () => { clearTimeout(fallback); observer.disconnect(); };
  }, [reducedMotion]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-labelledby="contact-heading"
      className="max-w-7xl mx-auto w-full px-6 md:px-10 py-24 md:py-36"
    >
      {/* Top border */}
      <div
        className="mb-16 h-px"
        style={{ backgroundColor: "var(--color-border)" }}
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

        {/* ── Left — closing statement + primary CTA ── */}
        <div className="lg:col-span-7 flex flex-col gap-8">

          {/* Section index */}
          <p
            data-contact-reveal
            className="text-xs tracking-[0.2em] uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-accent)",
            }}
            aria-hidden="true"
          >
            07 /
          </p>

          {/* Closing statement */}
          <h2
            id="contact-heading"
            data-contact-reveal
            className="text-[clamp(2.25rem,5vw,4.5rem)] font-semibold tracking-tight leading-[1.05]"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text-primary)",
            }}
          >
            Let&apos;s build something
            <br />
            <span style={{ color: "var(--color-accent)" }}>worth using.</span>
          </h2>

          <p
            data-contact-reveal
            className="text-base leading-relaxed max-w-md"
            style={{ color: "var(--color-text-muted)" }}
          >
            Whether you have a project in mind, a role to fill, or just want
            to talk engineering — the inbox is open.
          </p>

          {/* Primary CTA */}
          <div data-contact-reveal>
            <a
              href="mailto:shalomndahi@gmail.com"
              className={cn(
                "group inline-flex items-center gap-2.5",
                "h-12 px-8 rounded-full",
                "text-sm font-semibold tracking-tight",
                "bg-[var(--color-accent)] text-[#07090D]",
                "hover:bg-[#6db8ff]",
                "transition-colors duration-[var(--duration-base)]",
                "focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]",
                "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
              )}
            >
              Start a conversation
              <ArrowRight
                className="w-4 h-4 transition-transform duration-[var(--duration-base)] group-hover:translate-x-0.5"
                aria-hidden="true"
                strokeWidth={2.5}
              />
            </a>
          </div>

          {/* Form placeholder — pending spec confirmation */}
          {/* TODO: Add React Hook Form + Zod contact form when contact delivery
              service (Resend or equivalent) is confirmed per spec §24. */}
        </div>

        {/* ── Right — social / contact links ── */}
        <div className="lg:col-span-5 flex flex-col justify-center gap-4">
          {CONTACT_LINKS.map(({ id, label, href, display, icon: Icon, external }) => (
            <a
              key={id}
              data-contact-reveal
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className={cn(
                "op-mask-corner-cuts-angle-1 group flex items-center justify-between",
                "px-5 py-4",
                "border border-[rgba(77,163,255,0.24)]",
                "bg-[var(--color-surface)]",
                "transition-all duration-[var(--duration-base)]",
                "hover:border-[var(--color-accent)] hover:-translate-y-0.5",
                "hover:shadow-[0_0_10px_rgba(77,163,255,0.08)]"
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: "var(--color-surface-elevated)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <Icon
                    className="w-3.5 h-3.5"
                    style={{ color: "var(--color-accent)" }}
                    aria-hidden="true"
                  />
                </div>
                <div className="flex flex-col gap-0">
                  <span
                    className="text-xs tracking-widest uppercase"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {label}
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {display}
                  </span>
                </div>
              </div>
              <ArrowRight
                className="w-4 h-4 transition-transform duration-[var(--duration-base)] group-hover:translate-x-0.5 shrink-0"
                style={{ color: "var(--color-text-muted)" }}
                aria-hidden="true"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
