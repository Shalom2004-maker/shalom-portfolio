"use client";

import { useCallback, useEffect, useRef } from "react";

const CODE_LINES = [
  {
    number: "01",
    content: (
      <>
        <span className="hero-code-keyword">const</span>{" "}
        <span className="hero-code-variable">developer</span>{" "}
        <span className="hero-code-punctuation">=</span>{" "}
        <span className="hero-code-punctuation">{"{"}</span>
      </>
    ),
  },
  {
    number: "02",
    content: (
      <>
        {"  "}
        <span className="hero-code-property">name</span>
        <span className="hero-code-punctuation">:</span>{" "}
        <span className="hero-code-string">&quot;Shalom Ndahiriwe&quot;</span>
        <span className="hero-code-punctuation">,</span>
      </>
    ),
  },
  {
    number: "03",
    content: (
      <>
        {"  "}
        <span className="hero-code-property">role</span>
        <span className="hero-code-punctuation">:</span>{" "}
        <span className="hero-code-string">&quot;Full-stack developer&quot;</span>
        <span className="hero-code-punctuation">,</span>
      </>
    ),
  },
  {
    number: "04",
    content: (
      <>
        {"  "}
        <span className="hero-code-property">focus</span>
        <span className="hero-code-punctuation">:</span>{" "}
        <span className="hero-code-string">&quot;Web applications&quot;</span>
        <span className="hero-code-punctuation">,</span>
      </>
    ),
  },
  {
    number: "05",
    content: (
      <>
        {"  "}
        <span className="hero-code-property">stack</span>
        <span className="hero-code-punctuation">:</span>{" "}
        <span className="hero-code-punctuation">[</span>
      </>
    ),
  },
  {
    number: "06",
    content: (
      <>
        {"    "}
        <span className="hero-code-string">&quot;React&quot;</span>
        <span className="hero-code-punctuation">,</span>{" "}
        <span className="hero-code-string">&quot;Next.js&quot;</span>
        <span className="hero-code-punctuation">,</span>
      </>
    ),
  },
  {
    number: "07",
    content: (
      <>
        {"    "}
        <span className="hero-code-string">&quot;TypeScript&quot;</span>
        <span className="hero-code-punctuation">,</span>{" "}
        <span className="hero-code-string">&quot;Supabase&quot;</span>
      </>
    ),
  },
  {
    number: "08",
    content: (
      <>
        {"  "}
        <span className="hero-code-punctuation">]</span>
      </>
    ),
  },
  {
    number: "09",
    content: <span className="hero-code-punctuation">{"};"}</span>,
  },
] as const;

export function HeroLaptop({ reducedMotion }: { reducedMotion: boolean }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const pointerQueryRef = useRef<MediaQueryList | null>(null);
  const tiltFrame = useRef(0);
  const pointerX = useRef(0);
  const pointerY = useRef(0);

  const resetTilt = useCallback(() => {
    const scene = sceneRef.current;
    const tilt = tiltRef.current;
    if (tiltFrame.current) {
      window.cancelAnimationFrame(tiltFrame.current);
      tiltFrame.current = 0;
    }
    scene?.removeAttribute("data-tilting");
    tilt?.style.setProperty("--hero-tilt-x", "0deg");
    tilt?.style.setProperty("--hero-tilt-y", "0deg");
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      pointerQueryRef.current = null;
      resetTilt();
      return;
    }

    pointerQueryRef.current = window.matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine)"
    );
    const handleWindowBlur = () => resetTilt();
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      window.removeEventListener("blur", handleWindowBlur);
      pointerQueryRef.current = null;
      resetTilt();
    };
  }, [reducedMotion, resetTilt]);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (
      reducedMotion ||
      event.pointerType === "touch" ||
      !pointerQueryRef.current?.matches
    ) {
      return;
    }

    const scene = sceneRef.current;
    if (!scene || !tiltRef.current) return;

    const bounds = scene.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    pointerX.current = Math.max(
      -1,
      Math.min(1, (event.clientX - bounds.left - bounds.width / 2) / (bounds.width / 2))
    );
    pointerY.current = Math.max(
      -1,
      Math.min(1, (event.clientY - bounds.top - bounds.height / 2) / (bounds.height / 2))
    );

    if (!tiltFrame.current) {
      tiltFrame.current = window.requestAnimationFrame(() => {
        tiltFrame.current = 0;
        const tilt = tiltRef.current;
        if (!tilt) return;
        tilt.style.setProperty("--hero-tilt-x", `${pointerY.current * -3.5}deg`);
        tilt.style.setProperty("--hero-tilt-y", `${pointerX.current * 4.5}deg`);
        scene.dataset.tilting = "true";
      });
    }
  };

  return (
    <figure
      ref={sceneRef}
      className="hero-laptop-scene"
      role="img"
      aria-label="Decorative 3D laptop displaying a TypeScript profile with Shalom's role, focus, and technology stack."
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <div className="hero-laptop-idle">
        <div ref={tiltRef} className="hero-laptop-tilt">
          <div className="hero-laptop-device">
            <div className="hero-laptop-screen">
              <div className="hero-laptop-bezel">
                <div className="hero-laptop-camera" />
                <div className="hero-editor">
                  <div className="hero-editor-bar">
                    <div className="hero-editor-lights" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </div>
                    <span className="hero-editor-tab">profile.ts</span>
                    <span className="hero-editor-language">TypeScript</span>
                  </div>
                  <div className="hero-editor-body" aria-hidden="true">
                    <div className="hero-editor-gutter">
                      {CODE_LINES.map(({ number }) => (
                        <span key={number}>{number}</span>
                      ))}
                    </div>
                    <pre>
                      <code>
                        {CODE_LINES.map(({ number, content }) => (
                          <span className="hero-code-line" key={number}>
                            {content}
                          </span>
                        ))}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-laptop-hinge" aria-hidden="true" />
            <div className="hero-laptop-base" aria-hidden="true">
              <div className="hero-laptop-keyboard" />
              <div className="hero-laptop-trackpad" />
            </div>
            <div className="hero-laptop-shadow" aria-hidden="true" />
          </div>
        </div>
      </div>
      <figcaption className="sr-only">
        The code shown summarizes the developer information presented alongside
        this laptop.
      </figcaption>
    </figure>
  );
}
