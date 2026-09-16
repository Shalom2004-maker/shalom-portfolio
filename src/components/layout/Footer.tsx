import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

// ─── Nav links (mirror main nav) ─────────────────────────────────────────────

const FOOTER_LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/Shalom2004-maker" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/shalom-ndahiriwe-747944380/" },
  { label: "Email", href: "mailto:shalomndahi@gmail.com" },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Footer — spec §25.
 *
 * Contains:
 *   - Wordmark / name.
 *   - Navigation links.
 *   - Social links.
 *   - Copyright notice.
 *   - Back to top link.
 *
 * Server component — no interactivity required.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "border-t border-[var(--color-border)]",
        "bg-[var(--color-surface)]"
      )}
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto w-full px-6 md:px-10 py-14">

        {/* Top row: wordmark + nav */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-12">

          {/* Wordmark */}
          <div className="flex flex-col gap-2">
            <a
              href="/"
              className="text-sm font-semibold tracking-wide text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors duration-[var(--duration-base)]"
              style={{ fontFamily: "var(--font-mono)" }}
              aria-label="Shalom Ndahiriwe — home"
            >
              SN
            </a>
            <p
              className="text-xs max-w-[16rem] leading-relaxed"
              style={{ color: "var(--color-text-muted)" }}
            >
              Frontend developer building polished digital experiences.
            </p>
          </div>

          {/* Links grid */}
          <div className="flex flex-col sm:flex-row gap-10">
            {/* Navigation */}
            <div className="flex flex-col gap-3">
              <p
                className="text-[10px] tracking-[0.2em] uppercase mb-1"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-accent)",
                }}
              >
                Navigation
              </p>
              <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                {FOOTER_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors duration-[var(--duration-base)]"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div className="flex flex-col gap-3">
              <p
                className="text-[10px] tracking-[0.2em] uppercase mb-1"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-accent)",
                }}
              >
                Social
              </p>
              <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                {SOCIAL_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group inline-flex items-center gap-1 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors duration-[var(--duration-base)]"
                    >
                      {label}
                      <ArrowRight
                        className="w-3 h-3 -rotate-45 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-[var(--duration-base)]"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-6"
          style={{ backgroundColor: "var(--color-border)" }}
          aria-hidden="true"
        />

        {/* Bottom row: copyright + back to top */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p
            className="text-xs"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-text-muted)",
            }}
          >
            © {year} Shalom Ndahiriwe. All rights reserved.
          </p>

          <a
            href="#"
            className={cn(
              "group inline-flex items-center gap-1.5",
              "text-xs transition-colors duration-[var(--duration-base)]",
              "text-[var(--color-text-muted)] hover:text-[var(--color-accent)]"
            )}
            style={{ fontFamily: "var(--font-mono)" }}
            aria-label="Back to top"
          >
            Back to top
            <ArrowRight
              className="w-3 h-3 -rotate-90 transition-transform duration-[var(--duration-base)] group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
