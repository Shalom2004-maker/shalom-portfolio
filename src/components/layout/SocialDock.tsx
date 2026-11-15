"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Mail } from "lucide-react";
import { animate } from "animejs";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/Shalom2004-maker",
    icon: "github",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/shalom-ndahiriwe-747944380/",
    icon: "linkedin",
    external: true,
  },
  {
    label: "Email",
    href: "mailto:shalomndahi@gmail.com",
    icon: "email",
    external: false,
  },
] as const;

export function SocialDock() {
  const reducedMotion = useReducedMotion();
  const dockRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const dock = dockRef.current;
    if (reducedMotion || !dock) return;

    const entrance = animate(dock, {
      opacity: [0, 1],
      duration: 450,
      delay: 850,
      ease: "outCubic",
    });

    return () => {
      entrance.revert();
    };
  }, [reducedMotion]);

  return (
    <nav ref={dockRef} className="social-dock" aria-label="Social links">
      {SOCIAL_LINKS.map(({ label, href, icon, external }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          title={label}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="social-dock-link"
        >
          {icon === "github" ? (
            <Image src="/icons/github.svg" alt="" width={18} height={18} />
          ) : icon === "linkedin" ? (
            <LinkedInIcon />
          ) : (
            <Mail aria-hidden="true" />
          )}
        </a>
      ))}
    </nav>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7 20.45H3.67V9H7v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0h.01Z"
      />
    </svg>
  );
}
