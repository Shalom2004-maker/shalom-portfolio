import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

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
  { name: "VS Code", logo: "vscode" },
  { name: "Vercel", logo: "vercel" },
  { name: "Figma", logo: "figma" },
];

const LEARNING_TECHNOLOGIES: Technology[] = [
  { name: "C#", logo: "csharp" },
  { name: "ASP.NET", logo: "dotnet" },
  { name: "Java", logo: "java" },
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

      <div className="mb-14">
        <SectionHeading
          index="04"
          heading="Capabilities"
          subheading="Technologies and tools I work with — grouped by domain."
          as="h2"
          id="capabilities-heading"
        />
      </div>

      <ul
        className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 md:gap-x-8 md:gap-y-11 xl:grid-cols-5"
        aria-label="Technologies and tools"
      >
        {TECHNOLOGIES.map((technology) => (
          <TechnologyItem key={technology.name} technology={technology} />
        ))}
      </ul>

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
        <ul
          className="grid grid-cols-3 gap-x-4 gap-y-7 sm:gap-x-6"
          aria-label="Currently learning technologies"
        >
          {LEARNING_TECHNOLOGIES.map((technology) => (
            <TechnologyItem key={technology.name} technology={technology} />
          ))}
        </ul>
      </section>
    </section>
  );
}

function TechnologyItem({ technology }: { technology: Technology }) {
  return (
    <li className="min-w-0">
      <div className="flex min-h-24 flex-col items-center gap-3 text-center">
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
        <span className="block max-w-full text-sm leading-snug text-[var(--color-text-muted)] sm:text-[15px]">
          {technology.name}
        </span>
      </div>
    </li>
  );
}
