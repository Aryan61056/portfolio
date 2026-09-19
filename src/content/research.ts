export type AssessmentType = "Research" | "Interview" | "Mentor Visit" | "Observation";

export type ResearchEntry = {
  title: string;
  date: string; // ISO date, e.g. "2025-09-15"
  description: string;
  /** Link to the actual document (Google Doc, PDF, etc). */
  href: string;
};

/**
 * One array per assessment type. Add a new entry by pushing an object
 * into the matching array — the /research page groups and sorts
 * automatically, no layout changes needed.
 */
export const researchEntries: Record<AssessmentType, ResearchEntry[]> = {
  Research: [
    {
      title: "Assessment #1 — Industry Trends & Future Outlook",
      date: "2026-09-04",
      description:
        "A look at where the machine learning industry actually stands right now — record investment, the rise of agents, and the gap between the productivity gains workers report and the earnings companies can point to.",
      href: "/research/assessment-1-industry-trends-future-outlook.pdf",
    },
    {
      title: "Assessment #2 — Annotated Bibliography: Ethics & Deployment Risk in AI",
      date: "2026-09-11",
      description:
        "Five sources on fairness and accountability in deployed AI systems, including the Gender Shades study, model cards, the NIST AI Risk Management Framework, and a healthcare algorithm that learned racial bias from its target variable.",
      href: "/research/assessment-2-annotated-bibliography.pdf",
    },
  ],
  Interview: [],
  "Mentor Visit": [],
  Observation: [],
};
