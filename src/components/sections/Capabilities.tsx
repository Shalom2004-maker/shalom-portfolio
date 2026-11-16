import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MaskedTextReveal } from "@/components/ui/MaskedTextReveal";

type Technology = {
  name: string;
  logo: string;
};

const TECHNOLOGIES: Technology[] = [
  { name: "React", logo: "react" },
  { name: "Next.js", logo: "nextjs" },
  { name: "TypeScript", logo: "typescript" },
  { name: "JavaScript", logo: "javascript" },
  { name: "HTML", logo: "html" },
  { name: "CSS", logo: "css" },
  { name: "Tailwind CSS", logo: "tailwind" },
  { name: "Bootstrap", logo: "bootstrap" },
  { name: "PHP", logo: "php" },
  { name: "Supabase", logo: "supabase" },
  { name: "PostgreSQL", logo: "postgresql" },
  { name: "MySQL", logo: "mysql" },
  { name: "Flutter", logo: "flutter" },
  { name: "Dart", logo: "dart" },
  { name: "Git", logo: "git" },
  { name: "GitHub", logo: "github" },
  { name: "GitHub Desktop", logo: "github-desktop" },
  { name: "VS Code", logo: "vscode" },
  { name: "Vercel", logo: "vercel" },
  { name: "Figma", logo: "figma" },
  { name: "Drupal", logo: "drupal" },
  { name: "Wordpress", logo: "wordpress" },
  { name: "Wix", logo: "wix" },
  { name: "Joomla", logo: "joomla" },
];

const LEARNING_TECHNOLOGIES: Technology[] = [
  { name: "C#", logo: "csharp" },
  { name: "ASP.NET", logo: "dotnet" },
  { name: "Java", logo: "java" },
  { name: "SQL Server", logo: "sqlserver" },
];

export function Capabilities() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="mx-auto w-full max-w-[1200px] px-6 pt-24 pb-16 md:px-10 md:pt-32 md:pb-20"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div
        className="mb-16 h-px"
        style={{ backgroundColor: "var(--color-border)" }}
        aria-hidden="true"
      />

      <MaskedTextReveal className="mb-14">
        <SectionHeading
          index="04"
          heading="Capabilities"
          subheading="Technologies and tools I work with — grouped by domain."
          as="h2"
          id="capabilities-heading"
        />
      </MaskedTextReveal>

      <MaskedTextReveal staggerChildren>
        <ul
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 xl:grid-cols-5"
          aria-label="Technologies and tools"
        >
          {TECHNOLOGIES.map((technology) => (
            <TechnologyItem key={technology.name} technology={technology} />
          ))}
        </ul>
      </MaskedTextReveal>

      <section
        aria-labelledby="capabilities-learning-heading"
        className="mt-14 max-w-[460px] border-t pt-8 md:mt-16 md:pt-9"
        style={{ borderColor: "var(--color-border)" }}
      >
        <h3
          id="capabilities-learning-heading"
          className="mb-7 text-xs font-medium uppercase tracking-[0.18em]"
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--color-accent)",
          }}
        >
          Currently Learning
        </h3>
        <MaskedTextReveal staggerChildren>
          <ul
            className="grid grid-cols-3 gap-x-4 gap-y-7 sm:gap-x-6"
            aria-label="Currently learning technologies"
          >
            {LEARNING_TECHNOLOGIES.map((technology) => (
              <TechnologyItem key={technology.name} technology={technology} />
            ))}
          </ul>
        </MaskedTextReveal>
      </section>
    </section>
  );
}

function TechnologyItem({ technology }: { technology: Technology }) {
  return (
    <li className="group min-w-0" data-stagger-reveal>
      <div className="flex min-h-[7.5rem] flex-col items-center justify-center gap-3 rounded-[var(--radius-large)] border border-[var(--color-border)] bg-[rgba(13,17,23,0.48)] px-2.5 py-3 text-center transition-colors duration-[var(--duration-base)] hover:border-[rgba(77,163,255,0.28)] hover:bg-[rgba(17,24,32,0.72)]">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[var(--radius-medium)] border border-[var(--color-border)] bg-[rgba(255,255,255,0.025)] transition-colors duration-[var(--duration-base)] group-hover:border-[rgba(77,163,255,0.32)]">
          <Image
            src={`/icons/${technology.logo}.svg`}
            alt=""
            aria-hidden="true"
            width={48}
            height={48}
            sizes="(min-width: 1280px) 48px, (min-width: 640px) 44px, 40px"
            className={`h-10 w-10 shrink-0 object-contain sm:h-12 sm:w-12 xl:h-[52px] xl:w-[52px] ${
              technology.logo === "github" || technology.logo === "nextjs"
                ? "rounded-full bg-white p-1"
                : ""
            }`}
          />
        </span>
        <span className="block max-w-full text-xs leading-snug text-[var(--color-text-muted)] transition-colors duration-[var(--duration-base)] group-hover:text-[var(--color-text-primary)] sm:text-sm">
          {technology.name}
        </span>
      </div>
    </li>
  );
}
