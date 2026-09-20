import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { researchEntries, type AssessmentType } from "@/content/research";

export const metadata: Metadata = {
  title: "Research",
};

const SECTION_ORDER: AssessmentType[] = [
  "Research",
  "Interview",
  "Mentor Visit",
  "Observation",
];

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        Research
      </h1>
      <p className="mt-3 max-w-prose text-muted">
        Everything I&apos;ve logged for ISM assessment, grouped by type:
        research, interviews, mentor visits, and observations.
      </p>

      <div className="mt-12 space-y-12">
        {SECTION_ORDER.map((type) => {
          const entries = researchEntries[type];
          return (
            <section key={type}>
              <h2 className="font-mono text-xs uppercase tracking-wide text-primary">
                {type}
              </h2>
              {entries.length === 0 ? (
                <p className="mt-3 text-muted">
                  Nothing here yet — more coming as the semester goes on.
                </p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {entries.map((entry, i) => (
                    <Reveal key={entry.title + i} delay={i * 0.04}>
                      <li>
                        <a
                          href={entry.href}
                          data-cursor-label="open document"
                          className="group block rounded-2xl border border-border p-4 transition-colors hover:border-primary"
                        >
                          <div className="flex items-baseline justify-between gap-4">
                            <p className="font-semibold text-ink group-hover:text-primary">
                              {entry.title}
                            </p>
                            <time
                              dateTime={entry.date}
                              className="shrink-0 font-mono text-xs text-muted"
                            >
                              {formatDate(entry.date)}
                            </time>
                          </div>
                          <p className="mt-1 text-sm text-muted">
                            {entry.description}
                          </p>
                        </a>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
