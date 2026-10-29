import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CURRENTLY = [
  { label: "Building", value: "Web applications" },
  { label: "Exploring", value: "New technologies and systems" },
  { label: "Learning", value: "C#, ASP.NET, Java" },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * About — editorial biography with a naturally proportioned portrait.
 */
export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mx-auto w-full max-w-[1200px] px-6 py-24 md:px-10 md:py-32"
    >
      <div
        className="mb-12 h-px w-full md:mb-16"
        style={{ backgroundColor: "var(--color-border)" }}
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 items-start gap-y-12 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-x-14">
        <div>
          <SectionHeading
            index="03"
            heading="About"
            as="h2"
            id="about-heading"
          />
          <h3
            className="mt-7 max-w-[24ch] text-[clamp(2.25rem,3.8vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.04em]"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-text-primary)",
            }}
          >
            I enjoy building software to solve practical problems.
          </h3>
        </div>

        <div className="flex max-w-2xl flex-col gap-5 lg:pt-[6.5rem]">
          <p
            className="text-base leading-[1.85] sm:text-lg"
            style={{ color: "var(--color-text-primary)" }}
          >
            I’m a B.Tech (IT) student and full-stack developer interested in
            understanding how systems work, learning new technologies, and
            turning what I learn into working applications.
          </p>
          <p
            className="text-base leading-[1.85]"
            style={{ color: "var(--color-text-muted)" }}
          >
            I like going deeper than simply making something work. I want to
            understand the logic, concepts, and systems behind what I build.
            When I encounter something difficult, I research it, learn from
            different sources, put the knowledge into practice, and observe the
            results.
          </p>
          <p
            className="text-base leading-[1.85]"
            style={{ color: "var(--color-text-muted)" }}
          >
            My approach is simple: understand the problem, learn what is
            required, build the solution, test it, and improve it.
          </p>
        </div>
      </div>

      <div
        className="mt-16 grid grid-cols-1 items-start gap-8 border-t pt-8 md:mt-[4.25rem] md:grid-cols-[minmax(0,0.32fr)_minmax(0,0.68fr)] md:items-center md:gap-x-10 md:pt-10"
        style={{ borderColor: "var(--color-border)" }}
      >
        <figure className="w-[190px] max-w-full md:w-full md:max-w-[210px] lg:max-w-[270px] xl:max-w-[310px]">
          <Image
            src="/images/Portrait.png"
            alt="Shalom Ndahiriwe"
            width={941}
            height={1672}
            sizes="(min-width: 1280px) 310px, (min-width: 1024px) 270px, (min-width: 768px) 210px, 190px"
            className="block h-auto w-full border border-[var(--color-border)] object-contain"
          />
        </figure>

        <div className="flex max-w-xl flex-col gap-8 md:justify-self-start">
          <p
            className="text-xs tracking-[0.16em] uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-text-muted)",
            }}
          >
            EXPECTED GRADUATION · MAY 2028
          </p>
          <div className="border-t border-[var(--color-border)] pt-6">
            <h3
              className="mb-5 text-sm tracking-[0.16em] uppercase"
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-accent)",
              }}
            >
              Currently
            </h3>
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
              {CURRENTLY.map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-2">
                  <dt
                    className="text-xs tracking-[0.14em] uppercase"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    {label}
                  </dt>
                  <dd
                    className="text-base font-medium leading-snug"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
