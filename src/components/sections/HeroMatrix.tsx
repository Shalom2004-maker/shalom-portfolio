"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const GLYPHS = "01{}[]<>/\\=+-*;:&|";
const FRAME_INTERVAL = 1000 / 30;
const MAX_DEVICE_PIXEL_RATIO = 1.5;

type Stream = {
  x: number;
  head: number;
  speed: number;
  length: number;
  opacity: number;
  glyphs: string[];
};

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

function createStreams(width: number, height: number, lineHeight: number) {
  const columnGap = width < 640 ? 30 : 32;
  const count = Math.ceil(width / columnGap);

  return Array.from({ length: count }, (_, index) => {
    const length = 10 + Math.floor(Math.random() * 9);

    return {
      x: index * columnGap + Math.random() * columnGap * 0.35,
      head: Math.random() * (height + length * lineHeight) - length * lineHeight,
      speed: 38 + Math.random() * 44,
      length,
      opacity: 0.28 + Math.random() * 0.16,
      glyphs: Array.from({ length }, randomGlyph),
    };
  });
}

export function HeroMatrix() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!container || !canvas || !context) return;

    let width = 0;
    let height = 0;
    let lineHeight = 16;
    let streams: Stream[] = [];
    let frameId = 0;
    let lastFrameTime = 0;
    let isVisible = false;

    const draw = (elapsedSeconds: number) => {
      context.clearRect(0, 0, width, height);

      for (const stream of streams) {
        stream.head += stream.speed * elapsedSeconds;

        if (stream.head - stream.length * lineHeight > height) {
          stream.head = -Math.random() * height * 0.35;
          stream.speed = 38 + Math.random() * 44;
        }

        if (Math.random() < 0.08) {
          const index = Math.floor(Math.random() * stream.glyphs.length);
          stream.glyphs[index] = randomGlyph();
        }

        for (let index = 0; index < stream.length; index += 1) {
          const y = stream.head - index * lineHeight;
          if (y < -lineHeight || y > height + lineHeight) continue;

          context.globalAlpha =
            stream.opacity * (index === 0 ? 1 : 0.7 * (1 - index / stream.length));
          context.fillStyle =
            index === 0 ? "#a8efff" : index % 4 === 0 ? "#70d5ff" : "#62aaff";
          context.fillText(stream.glyphs[index], stream.x, y);
        }
      }

      context.globalAlpha = 1;
    };

    const resize = () => {
      const bounds = container.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;

      width = bounds.width;
      height = bounds.height;
      lineHeight = width < 640 ? 20 : 23;

      const pixelRatio = Math.min(
        window.devicePixelRatio || 1,
        MAX_DEVICE_PIXEL_RATIO
      );
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.font = `${width < 640 ? 12 : 15}px ${getComputedStyle(canvas).fontFamily}`;
      streams = createStreams(width, height, lineHeight);
      draw(0);
    };

    const render = (time: number) => {
      frameId = 0;
      if (!isVisible || document.visibilityState === "hidden") return;

      if (time - lastFrameTime >= FRAME_INTERVAL) {
        const elapsedSeconds = lastFrameTime
          ? Math.min((time - lastFrameTime) / 1000, 0.1)
          : 0;
        draw(elapsedSeconds);
        lastFrameTime = time;
      }

      frameId = window.requestAnimationFrame(render);
    };

    const stop = () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
      lastFrameTime = 0;
    };

    const start = () => {
      if (
        reducedMotion ||
        !isVisible ||
        document.visibilityState === "hidden" ||
        frameId
      ) {
        return;
      }

      frameId = window.requestAnimationFrame(render);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) start();
      else stop();
    });
    intersectionObserver.observe(container);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") stop();
      else start();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [reducedMotion]);

  return (
    <div ref={containerRef} className="hero-matrix" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-matrix-canvas" />
    </div>
  );
}
