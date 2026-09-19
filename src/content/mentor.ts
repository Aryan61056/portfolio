export type Mentor = {
  name: string;
  title: string;
  bio: string;
  photo: string | null;
};

/**
 * No mentor assigned yet (ISM 1). Once one is assigned, replace `null`
 * with a Mentor object — the /mentor page renders whichever shape this
 * is without any code changes.
 */
export const mentor: Mentor | null = null;

// Example of the shape to drop in once a mentor is assigned:
// export const mentor: Mentor | null = {
//   name: "[Mentor Name]",
//   title: "[Mentor's Role / Organization]",
//   bio: "[A few sentences on their background and how they're guiding this ISM project.]",
//   photo: "/mentor.jpg",
// };
