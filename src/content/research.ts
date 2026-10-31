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
    {
      title: "Assessment #3 — Parking Occupancy Detectors & the Random-Split Trap",
      date: "2026-09-25",
      description:
        "A paper comparing five object detectors scored above 0.985 mAP on a random split, then nearly reversed its ranking on new dates and a new camera angle, because half the test frames sat within 15 minutes of a training frame.",
      href: "/research/assessment-3-parking-occupancy-detectors.pdf",
    },
    {
      title: "Assessment #4 — Annotated Bibliography: Generalization & Reliability in ML",
      date: "2026-10-05",
      description:
        "Five sources on when to trust a model's score: Domingos on practical lessons, Henderson on reproducibility in deep RL, Hendrycks and Dietterich on robustness to corruptions, Sculley on hidden technical debt, and Zhang et al. on how networks generalize.",
      href: "/research/assessment-4-annotated-bibliography-generalization.pdf",
    },
    {
      title: "Assessment #5 — YOLO on Jetson: Generated Code vs. Native Implementation",
      date: "2026-10-16",
      description:
        "The same YOLOv8 and YOLOv9 weights gave different accuracy, latency, and startup time depending on the toolchain that ran them, with the gap widening at strict IoU thresholds like 0.8 and 0.9.",
      href: "/research/assessment-5-yolo-generated-vs-native.pdf",
    },
    {
      title: "Assessment #6 — Benchmarking YOLOv8 Variants on Jetson Orin NX",
      date: "2026-10-25",
      description:
        "TensorRT cut inference time by 52–63% without retraining, but crashed at a batch size of 8, and the paper's \"optimal\" batch of 4 measures throughput when a robot reading one live camera needs latency.",
      href: "/research/assessment-6-yolov8-jetson-orin-nx.pdf",
    },
  ],
  Interview: [],
  "Mentor Visit": [],
  Observation: [],
};
