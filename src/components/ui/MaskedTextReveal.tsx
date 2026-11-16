"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { animate, cubicBezier, stagger } from "animejs";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MaskedTextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  trigger?: "viewport" | "external";
  staggerChildren?: boolean;
}

export function MaskedTextReveal({
  children,
  className,
  delay = 0,
  trigger = "viewport",
  staggerChildren = false,
}: MaskedTextRevealProps) {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const content = contentRef.current;
    if (
      trigger === "external" ||
      reducedMotion ||
      !root ||
      !content ||
      typeof IntersectionObserver === "undefined"
    ) {
      return;
    }

    let animation: ReturnType<typeof animate> | undefined;
    let animationFrame: number | undefined;
    let fallback: number | undefined;
    let hasRevealed = false;
    const staggerTargets = staggerChildren
      ? Array.from(
          content.querySelectorAll<HTMLElement>("[data-stagger-reveal]")
        )
      : [];

    const showContent = () => {
      const targets = staggerTargets.length ? staggerTargets : [content];
      targets.forEach((target) => {
        target.style.opacity = "1";
        target.style.transform = "none";
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasRevealed) return;

        hasRevealed = true;
        observer.disconnect();
        const targets = staggerTargets.length ? staggerTargets : [content];
        targets.forEach((target) => {
          target.style.opacity = "0";
          target.style.transform = staggerTargets.length
            ? "scale(0.95)"
            : "translateY(100%)";
        });

        animationFrame = window.requestAnimationFrame(() => {
          animationFrame = undefined;

          try {
            animation = staggerTargets.length
              ? animate(staggerTargets, {
                  opacity: [0, 1],
                  scale: [0.95, 1],
                  duration: 420,
                  delay: stagger(45, { start: delay }),
                  ease: cubicBezier(0.22, 1, 0.36, 1),
                  onComplete: showContent,
                })
              : animate(content, {
                  opacity: [0, 1],
                  translateY: ["100%", "0%"],
                  duration: 820,
                  delay,
                  ease: cubicBezier(0.22, 1, 0.36, 1),
                  onComplete: showContent,
                });
            fallback = window.setTimeout(
              showContent,
              (staggerTargets.length ? 2200 : 1400) + delay
            );
          } catch (error) {
            console.error("Masked text reveal failed:", error);
            showContent();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(root);

    return () => {
      observer.disconnect();
      if (animationFrame !== undefined) {
        window.cancelAnimationFrame(animationFrame);
      }
      if (fallback !== undefined) window.clearTimeout(fallback);
      animation?.revert();
      const targets = staggerTargets.length ? staggerTargets : [content];
      targets.forEach((target) => {
        target.style.removeProperty("opacity");
        target.style.removeProperty("transform");
      });
    };
  }, [delay, reducedMotion, staggerChildren, trigger]);

  return (
    <div ref={rootRef} className={cn("masked-text-reveal", className)}>
      <div
        ref={contentRef}
        className="masked-text-reveal__content"
        data-masked-text-content
      >
        {children}
      </div>
    </div>
  );
}
