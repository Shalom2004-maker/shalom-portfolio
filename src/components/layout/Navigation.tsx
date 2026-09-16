"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { animate, createTimeline } from "animejs";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

// ─── Nav links ────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Work",    href: "#work",    sectionId: "work" },
  { label: "About",   href: "#about",   sectionId: "about" },
  { label: "Contact", href: "#contact", sectionId: "contact" },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Navigation — spec §10.
 *
 * Layout (3-zone flex row, no shifting):
 *   [wordmark]          [links]          [status | hamburger]
 *   left-slot           center           right-slot (fixed width)
 *
 * The right slot is always present as a flex item. On desktop it shows the
 * active section label; on mobile it shows the hamburger. This prevents the
 * layout from shifting when activeSection appears/disappears.
 *
 * Entrance: Anime.js timeline fades in wordmark → links → right slot on mount.
 */
export function Navigation() {
  const reducedMotion                 = useReducedMotion();
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [activeSection, setActive]    = useState<string>("");

  const navRef      = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLAnchorElement>(null);
  const linksRef    = useRef<HTMLUListElement>(null);
  const rightRef    = useRef<HTMLDivElement>(null);

  // ─── Scroll → glass transition ──────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ─── Entrance animation ─────────────────────────────────────────────────
  useEffect(() => {
    if (reducedMotion) return;
    const wm = wordmarkRef.current;
    const ln = linksRef.current;
    const rt = rightRef.current;
    if (!wm || !ln || !rt) return;

    const tl = createTimeline({ defaults: { ease: "outCubic" } })
      .add(wm,  { opacity: [0, 1], translateY: [-8, 0], duration: 400 }, 200)
      .add(ln,  { opacity: [0, 1], translateY: [-8, 0], duration: 400 }, 350)
      .add(rt,  { opacity: [0, 1], translateY: [-8, 0], duration: 400 }, 450);

    return () => { tl.revert(); };
  }, [reducedMotion]);

  // ─── Active section tracker ─────────────────────────────────────────────
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[id]")
    );
    if (!sections.length) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio);
          else visible.delete(e.target.id);
        });
        let best = "", bestRatio = 0;
        visible.forEach((r, id) => { if (r > bestRatio) { bestRatio = r; best = id; } });
        setActive(best);
      },
      { threshold: [0, 0.2, 0.5, 1], rootMargin: "-64px 0px 0px 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // ─── Close on desktop resize ─────────────────────────────────────────────
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const h = (e: MediaQueryListEvent) => { if (e.matches) setMobileOpen(false); };
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  // ─── Lock body scroll ────────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // ─── Mobile menu animation ───────────────────────────────────────────────
  useEffect(() => {
    if (reducedMotion) return;
    const menu = document.getElementById("mobile-menu");
    if (!menu) return;
    if (mobileOpen) {
      const items = menu.querySelectorAll<HTMLElement>("li");
      animate(items, {
        opacity: [0, 1],
        translateX: [-20, 0],
        duration: 350,
        delay: (_, i) => (i ?? 0) * 60,
        ease: "outCubic",
      });
    }
  }, [mobileOpen, reducedMotion]);

  const toggleMobile = () => setMobileOpen((v) => !v);
  const closeMobile  = () => setMobileOpen(false);

  return (
    <>
      {/* Skip to main content */}
      <a
        href="#main-content"
        className={cn(
          "sr-only focus:not-sr-only",
          "fixed top-4 left-4 z-[200]",
          "px-4 py-2 rounded text-sm font-medium",
          "bg-[var(--color-accent)] text-[#07090D]",
          "focus:outline-none"
        )}
      >
        Skip to main content
      </a>

      {/* ── Nav bar ── */}
      <header
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-[100]",
          "transition-all duration-[var(--duration-slow)]",
          scrolled
            ? "backdrop-blur-md bg-[rgba(7,9,13,0.80)] border-b border-[var(--color-border)] shadow-[0_1px_0_0_rgba(255,255,255,0.04)]"
            : "bg-transparent"
        )}
        role="banner"
      >
        {/*
          3-zone layout: left | center | right
          All three are flex children of this nav row.
          The left and right zones each get flex-1 so the center stays
          truly centered regardless of content width.
        */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center">

          {/* LEFT — wordmark */}
          <div className="flex-1 flex items-center">
            <a
              ref={wordmarkRef}
              href="/"
              className="text-sm font-semibold tracking-wide text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors duration-[var(--duration-base)]"
              style={{ fontFamily: "var(--font-mono)" }}
              aria-label="Shalom Nadhanlirive — home"
            >
              SN
            </a>
          </div>

          {/* CENTER — desktop nav links */}
          <nav aria-label="Main navigation">
            <ul
              ref={linksRef}
              className="hidden md:flex items-center gap-8 list-none m-0 p-0"
              role="list"
            >
              {NAV_LINKS.map(({ label, href, sectionId }) => {
                const isActive = activeSection === sectionId;
                return (
                  <li key={label}>
                    <a
                      href={href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "relative text-sm transition-colors duration-[var(--duration-base)]",
                        "after:absolute after:bottom-[-3px] after:left-0 after:h-px after:w-full",
                        "after:origin-left after:transition-transform after:duration-[var(--duration-base)]",
                        isActive
                          ? "text-[var(--color-text-primary)] after:scale-x-100 after:bg-[var(--color-accent)]"
                          : "text-[var(--color-text-muted)] after:scale-x-0 after:bg-[var(--color-accent)] hover:text-[var(--color-text-primary)]"
                      )}
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* RIGHT — active label (desktop) + hamburger (mobile) */}
          <div ref={rightRef} className="flex-1 flex items-center justify-end gap-4">
            {/* Active section label — desktop only, always takes space */}
            <span
              className="hidden lg:block text-[10px] tracking-[0.2em] uppercase transition-opacity duration-[var(--duration-base)]"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-accent)",
                opacity: activeSection ? 1 : 0,
              }}
              aria-hidden="true"
            >
              {activeSection || "·"}
            </span>

            {/* Mobile hamburger */}
            <button
              className={cn(
                "md:hidden flex items-center justify-center",
                "w-10 h-10 rounded text-[var(--color-text-muted)]",
                "hover:text-[var(--color-text-primary)]",
                "transition-colors duration-[var(--duration-base)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
              )}
              onClick={toggleMobile}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen
                ? <X    className="w-5 h-5" aria-hidden="true" />
                : <Menu className="w-5 h-5" aria-hidden="true" />
              }
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile overlay ── */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-[90] md:hidden",
          "flex flex-col justify-center px-8",
          "bg-[var(--color-bg)]",
          "transition-opacity duration-[var(--duration-base)]",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!mobileOpen}
      >
        <ul className="flex flex-col gap-6 list-none m-0 p-0" role="list">
          {NAV_LINKS.map(({ label, href, sectionId }) => {
            const isActive = activeSection === sectionId;
            return (
              <li key={label}>
                <a
                  href={href}
                  onClick={closeMobile}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "block text-4xl font-semibold transition-colors duration-[var(--duration-base)]",
                    isActive
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-text-primary)] hover:text-[var(--color-accent)]"
                  )}
                  style={{ fontFamily: "var(--font-display)" }}
                  tabIndex={mobileOpen ? 0 : -1}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>

        <p
          className="absolute bottom-10 left-8 text-xs tracking-widest uppercase"
          style={{ fontFamily: "var(--font-mono)", color: "var(--color-text-muted)" }}
          aria-hidden="true"
        >
          Available · Web Developer
        </p>
      </div>
    </>
  );
}
