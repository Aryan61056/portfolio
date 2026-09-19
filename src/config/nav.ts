export type NavItem = {
  /** Shown in nav, mobile menu, and page headings. */
  label: string;
  href: string;
  /**
   * Whether this shows in the primary nav right now. Flip to `false` to
   * demote a page into a footer link (or drop it entirely) without
   * deleting the route or touching any layout component.
   */
  showInNav: boolean;
  /**
   * Marks a page as ISM-coursework-specific. Doesn't change behavior on
   * its own today — it's a flag for the future non-ISM pass, so "hide
   * every ISM-only page" is a one-line filter instead of a rewrite.
   */
  ismOnly: boolean;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/", showInNav: true, ismOnly: false },
  { label: "About", href: "/about", showInNav: true, ismOnly: false },
  { label: "Résumé", href: "/resume", showInNav: true, ismOnly: false },
  { label: "About ISM", href: "/about-ism", showInNav: true, ismOnly: true },
  { label: "Mentor", href: "/mentor", showInNav: true, ismOnly: true },
  { label: "Research", href: "/research", showInNav: true, ismOnly: true },
  { label: "Blog", href: "/blog", showInNav: true, ismOnly: true },
  { label: "Projects", href: "/projects", showInNav: true, ismOnly: false },
];

export const primaryNavItems = navItems.filter((item) => item.showInNav);
