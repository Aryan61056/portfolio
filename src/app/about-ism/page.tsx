import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About ISM",
};

export default function AboutIsmPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        About ISM
      </h1>

      <div className="mt-8 rounded-2xl bg-surface p-6">
        <p className="text-lg text-ink">
          Frisco ISD&apos;s Independent Study and Mentorship program is a
          program for which students must apply, interview, and be
          recommended during their junior and/or senior year. Gifted and
          high-achieving students focus their study on a topic or career of
          their choice. They develop a research portfolio that has a
          collection of resources, including interviews and observations
          with people who work in their chosen field or topic of study.
        </p>
      </div>

      <div className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-wide text-muted">
          What that looks like
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-lg text-ink">
          <li>
            Apply, interview, and get selected as a junior or senior — it
            isn&apos;t an automatic elective.
          </li>
          <li>
            Choose a topic, then spend the fall researching it in depth:
            secondary sources, interviews, and observations with people who
            actually work in the field.
          </li>
          <li>
            In the spring, work with a mentor at their place of business for
            real-world experience, and build an original, advanced product
            related to the topic.
          </li>
          <li>
            Practice time management, communication, and presentation
            skills along the way, building up to a formal presentation of
            the product and mentorship in May.
          </li>
        </ul>
        <p className="mt-4 text-lg text-ink">
          The goal is to leave ISM knowing a lot more about a chosen
          profession — and whether it&apos;s actually the path worth taking
          into college and beyond.
        </p>
      </div>

      <div className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-wide text-muted">
          My focus area
        </h2>
        <p className="mt-3 text-lg text-ink">
          I&apos;m studying machine learning within ISM, exploring different
          applications to find where I can make the most impact.
        </p>
      </div>
    </div>
  );
}
