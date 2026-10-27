"use client";

import { useEffect, useId, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

const CENTER = 200;
const VIEW = 400;

interface OrbitalNode {
  angle: number;
  size: number;
  halo?: boolean;
}

interface OrbitalRing {
  id: string;
  radius: number;
  className: string;
  nodes: OrbitalNode[];
  dashed?: boolean;
  opacity: number;
  ticks?: number;
}

/**
 * Three concentric orbital paths. Each path rotates at its own speed/direction
 * via CSS keyframes; nodes and tick markers ride along and reveal the motion.
 */
const RINGS: OrbitalRing[] = [
  {
    id: "outer",
    radius: 182,
    className: "orbital-spin-a",
    opacity: 1,
    ticks: 36,
    nodes: [
      { angle: -32, size: 3.6, halo: true },
      { angle: 152, size: 3 },
    ],
  },
  {
    id: "mid",
    radius: 134,
    className: "orbital-spin-b",
    opacity: 0.34,
    dashed: true,
    nodes: [{ angle: 58, size: 3.2, halo: true }],
  },
  {
    id: "inner",
    radius: 92,
    className: "orbital-spin-c",
    opacity: 0.3,
    nodes: [{ angle: 205, size: 2.8 }],
  },
];

/**
 * Point on a circle centred at (CENTER, CENTER).
 * angle is in degrees, 0° = right, positive = clockwise (SVG y grows down).
 */
function polar(radius: number, angleDeg: number): [number, number] {
  const a = (angleDeg * Math.PI) / 180;
  return [CENTER + radius * Math.cos(a), CENTER + radius * Math.sin(a)];
}

/** Comma-separated polygon points for a regular polygon centred on the core. */
function polygonPoints(radius: number, sides: number, offsetDeg = 0): string {
  return Array.from({ length: sides }, (_, i) => {
    const [x, y] = polar(radius, offsetDeg + (360 / sides) * i);
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");
}

/**
 * OrbitalSystem — signature Hero visualization.
 *
 * A decorative, geometric orbital mechanism rendered as inline SVG: a luminous
 * central core, three concentric orbital paths with travelling nodes, and fine
 * technical tick markers. Pure CSS transforms drive the continuous motion;
 * a restrained pointer parallax is applied through CSS custom properties.
 *
 * The component is decorative: it is `aria-hidden`, never intercepts pointer
 * events, and every animation is disabled under prefers-reduced-motion.
 */
export function OrbitalSystem({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/[:\\]/g, "");
  const coreGlowId = `orbital-core-glow-${uid}`;
  const ringStrokeId = `orbital-ring-stroke-${uid}`;

  useEffect(() => {
    if (reducedMotion) return;
    const root = rootRef.current;
    if (!root) return;

    // Pointer parallax is desktop-only (fine pointer + hover-capable viewport).
    const canHover =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      window.matchMedia("(min-width: 1024px)").matches;
    if (!canHover) return;

    let frame = 0;
    let nx = 0;
    let ny = 0;

    const apply = () => {
      frame = 0;
      root.style.setProperty("--orbital-px", nx.toFixed(3));
      root.style.setProperty("--orbital-py", ny.toFixed(3));
    };

    const onMove = (event: MouseEvent) => {
      const rect = root.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      nx = Math.max(-1, Math.min(1, (event.clientX - cx) / (rect.width / 2)));
      ny = Math.max(-1, Math.min(1, (event.clientY - cy) / (rect.height / 2)));
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    const reset = () => {
      nx = 0;
      ny = 0;
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("blur", reset);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("blur", reset);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={cn("orbital-system pointer-events-none select-none", className)}
    >
      <div className={cn("h-full w-full", !reducedMotion && "orbital-intro")}>
        <div className="orbital-parallax h-full w-full">
          <svg
            viewBox={`0 0 ${VIEW} ${VIEW}`}
            className="h-full w-full"
            style={{ color: "var(--color-accent)" }}
          >
            <defs>
              <radialGradient id={coreGlowId} cx="50%" cy="50%" r="50%">
                <stop offset="0%" style={{ stopColor: "var(--color-accent)", stopOpacity: 0.5 }} />
                <stop offset="45%" style={{ stopColor: "var(--color-accent)", stopOpacity: 0.16 }} />
                <stop offset="100%" style={{ stopColor: "var(--color-accent)", stopOpacity: 0 }} />
              </radialGradient>
              <linearGradient id={ringStrokeId} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" style={{ stopColor: "var(--color-accent)", stopOpacity: 0.05 }} />
                <stop offset="50%" style={{ stopColor: "var(--color-accent)", stopOpacity: 0.7 }} />
                <stop offset="100%" style={{ stopColor: "var(--color-accent)", stopOpacity: 0.05 }} />
              </linearGradient>
            </defs>

            {/* Fine technical reference grid */}
            <g stroke="currentColor" strokeWidth="0.5" opacity="0.12">
              <line x1={CENTER} y1="26" x2={CENTER} y2={VIEW - 26} strokeDasharray="1 7" />
              <line x1="26" y1={CENTER} x2={VIEW - 26} y2={CENTER} strokeDasharray="1 7" />
            </g>

            {/* Central luminous core */}
            <circle cx={CENTER} cy={CENTER} r="66" fill={`url(#${coreGlowId})`} className="orbital-breathe" />
            <polygon
              points={polygonPoints(38, 6, 0)}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.9"
              opacity="0.55"
              className="orbital-hex"
            />
            <polygon
              points={polygonPoints(25, 3, 90)}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.7"
              opacity="0.4"
              className="orbital-tri"
            />
            <circle cx={CENTER} cy={CENTER} r="13" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
            <circle cx={CENTER} cy={CENTER} r="5" fill="currentColor" opacity="0.9" />

            {/* Orbital paths, nodes, and markers */}
            {RINGS.map((ring) => (
              <g key={ring.id} className={ring.className}>
                <circle
                  cx={CENTER}
                  cy={CENTER}
                  r={ring.radius}
                  fill="none"
                  stroke={ring.id === "outer" ? `url(#${ringStrokeId})` : "currentColor"}
                  strokeWidth={ring.id === "outer" ? 1 : 0.7}
                  strokeOpacity={ring.id === "outer" ? 1 : ring.opacity}
                  strokeDasharray={ring.dashed ? "2 8" : undefined}
                />
                {ring.ticks
                  ? Array.from({ length: ring.ticks }, (_, i) => {
                      const angle = (360 / (ring.ticks ?? 0)) * i;
                      const [x1, y1] = polar(ring.radius - 8, angle);
                      const [x2, y2] = polar(ring.radius - 2, angle);
                      return (
                        <line
                          key={i}
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke="currentColor"
                          strokeWidth="0.7"
                          opacity="0.22"
                        />
                      );
                    })
                  : null}
                {ring.nodes.map((node, i) => {
                  const [x, y] = polar(ring.radius, node.angle);
                  return (
                    <g key={i}>
                      {node.halo ? (
                        <circle cx={x} cy={y} r={node.size * 2.6} fill="currentColor" opacity="0.14" />
                      ) : null}
                      <circle cx={x} cy={y} r={node.size} fill="currentColor" opacity="0.95" />
                      <circle
                        cx={x}
                        cy={y}
                        r={node.size + 2.5}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.6"
                        opacity="0.35"
                      />
                    </g>
                  );
                })}
              </g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}