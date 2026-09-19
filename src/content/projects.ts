export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string | null;
  links: ProjectLink[];
  tags: string[];
  /**
   * Generic on purpose — not an ISM-specific field. "original-work" and
   * "final-product" are the two categories ISM grades on today; add any
   * other string here for future (non-ISM) work and it renders in the
   * "Other Work" section automatically, no layout changes required.
   */
  category: "original-work" | "final-product" | (string & {});
};

export const projects: Project[] = [];
