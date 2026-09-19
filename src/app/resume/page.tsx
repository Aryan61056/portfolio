import { siteConfig } from "@/config/site";
import { PlaceholderNote } from "@/components/ui/placeholder-note";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border py-8 first:border-t-0 first:pt-0">
      <h2 className="font-mono text-xs uppercase tracking-wide text-muted">
        {title}
      </h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Résumé
          </h1>
          <p className="mt-2 text-muted">{siteConfig.name}</p>
        </div>
        <a
          href="/resume.pdf"
          download
          data-cursor-label="grab the pdf"
          className="rounded-full bg-primary px-5 py-2.5 font-mono text-sm font-semibold text-primary-ink transition-transform hover:-translate-y-0.5"
        >
          Download PDF
        </a>
      </div>

      <div className="mt-8">
        <PlaceholderNote label="In progress">
          <p className="text-sm">
            The résumé below is a placeholder — the final version is on its
            way.
          </p>
        </PlaceholderNote>
      </div>

      <div className="mt-10">
        <Section title="Education">
          <div>
            <p className="font-semibold text-ink">[School Name]</p>
            <p className="text-sm text-muted">[Expected graduation year] · [GPA / honors, if relevant]</p>
          </div>
        </Section>

        <Section title="Experience">
          <div>
            <p className="font-semibold text-ink">
              [Role / Organization]{" "}
              <span className="font-mono text-xs font-normal text-muted">
                [Dates]
              </span>
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-ink">
              <li>[What you did, phrased as an outcome.]</li>
              <li>[Another concrete responsibility or result.]</li>
            </ul>
          </div>
        </Section>

        <Section title="Skills">
          <div className="flex flex-wrap gap-2">
            {["[Skill]", "[Skill]", "[Skill]", "[Skill]"].map((skill, i) => (
              <span
                key={i}
                className="rounded-full bg-surface px-3 py-1 font-mono text-xs text-ink"
              >
                {skill}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Activities & Honors">
          <ul className="list-disc space-y-1 pl-5 text-ink">
            <li>[Club, award, or activity worth listing.]</li>
            <li>[Another one.]</li>
          </ul>
        </Section>
      </div>
    </div>
  );
}
