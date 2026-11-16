"use client";

import { useEffect, useRef } from "react";

interface MagneticButtonOptions {
  range?: number;
  enabled?: boolean;
}

export function useMagneticButton<T extends HTMLElement = HTMLAnchorElement>({
  range = 5,
  enabled = true,
}: MagneticButtonOptions = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element || !enabled || typeof window === "undefined") {
      return;
    }

    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const reset = () => {
      element.style.setProperty("--magnetic-x", "0px");
      element.style.setProperty("--magnetic-y", "0px");
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const offsetX = event.clientX - (rect.left + rect.width / 2);
      const offsetY = event.clientY - (rect.top + rect.height / 2);
      const clampedX = Math.max(-range, Math.min(offsetX * 0.18, range));
      const clampedY = Math.max(-range, Math.min(offsetY * 0.18, range));

      element.style.setProperty("--magnetic-x", `${clampedX}px`);
      element.style.setProperty("--magnetic-y", `${clampedY}px`);
    };

    element.addEventListener("pointermove", handlePointerMove);
    element.addEventListener("pointerleave", reset);
    element.addEventListener("pointercancel", reset);
    element.addEventListener("blur", reset);

    return () => {
      element.removeEventListener("pointermove", handlePointerMove);
      element.removeEventListener("pointerleave", reset);
      element.removeEventListener("pointercancel", reset);
      element.removeEventListener("blur", reset);
      reset();
    };
  }, [enabled, range]);

  return ref;
}
