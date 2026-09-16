/**
 * Design tokens — single source of truth for the Dark Digital Laboratory aesthetic.
 * Values mirror the CSS custom properties defined in globals.css.
 * Use these in TypeScript/JS (e.g. Anime.js colour targets, dynamic styles).
 */

// ─── Colour ──────────────────────────────────────────────────────────────────

export const colors = {
  /** Page background — near-black */
  background: "#07090D",
  /** Card / surface layer */
  surface: "#0D1117",
  /** Elevated surface (modals, overlays) */
  surfaceElevated: "#111820",
  /** Subtle border — 8% white */
  border: "rgba(255, 255, 255, 0.08)",
  /** Stronger border — 10% white */
  borderStrong: "rgba(255, 255, 255, 0.10)",
  /** Primary body text */
  textPrimary: "#F4F7FA",
  /** Secondary / muted text */
  textMuted: "#8B949E",
  /** Electric-blue accent — use sparingly */
  accent: "#4DA3FF",
  /** Soft glow variant of accent — for box-shadow only */
  accentGlow: "rgba(77, 163, 255, 0.15)",
} as const;

// ─── Typography ──────────────────────────────────────────────────────────────

export const fonts = {
  /** CSS variable injected by next/font — display headings */
  display: "var(--font-space-grotesk)",
  /** CSS variable injected by next/font — body text */
  body: "var(--font-inter)",
  /** CSS variable injected by next/font — technical metadata, code */
  mono: "var(--font-jetbrains-mono)",
} as const;

// ─── Spacing scale (rem) ─────────────────────────────────────────────────────

export const spacing = {
  xs: "0.25rem",   //  4px
  sm: "0.5rem",    //  8px
  md: "1rem",      // 16px
  lg: "1.5rem",    // 24px
  xl: "2rem",      // 32px
  "2xl": "3rem",   // 48px
  "3xl": "4rem",   // 64px
  "4xl": "6rem",   // 96px
  "5xl": "8rem",   // 128px
} as const;

// ─── Breakpoints ─────────────────────────────────────────────────────────────

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// ─── Motion ──────────────────────────────────────────────────────────────────

export const motion = {
  /** Fast micro-interactions */
  durationFast: 200,
  /** Standard UI transitions */
  durationBase: 300,
  /** Section entrance animations */
  durationSlow: 600,
  /** Hero / staggered reveals */
  durationXSlow: 900,
  /** Max recommended duration per spec (300–800ms) */
  durationMax: 800,
  /** Standard easing */
  easeOut: "easeOutCubic",
  /** Stagger between sibling elements (ms) */
  stagger: 80,
} as const;

// ─── Z-index layers ──────────────────────────────────────────────────────────

export const zIndex = {
  base: 0,
  raised: 10,
  overlay: 50,
  nav: 100,
  modal: 200,
} as const;
