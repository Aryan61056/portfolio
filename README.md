# Personal Portfolio

A personal portfolio site built for an ISM (Independent Study & Mentorship)
course, architected to keep growing into a permanent personal site after
the class ends. Next.js (App Router) + TypeScript + Tailwind CSS + Framer
Motion, with content stored as data/MDX files so new entries don't require
touching layout code.

See [`PRODUCT.md`](PRODUCT.md) and [`DESIGN.md`](DESIGN.md) for the
strategic and visual system this was built against.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build (static-exportable, all routes prerendered)
npm run lint    # ESLint
```

## Project structure

```
src/
  app/                 Routes (one folder per page, App Router conventions)
  components/          UI, grouped by area (layout, cursor, theme, motion, home, ui)
  config/
    nav.ts             Nav items — label, href, show/hide, ISM-only flag
    site.ts            Name, tagline, email, social links
  content/
    mentor.ts           Mentor bio (or null)
    research.ts         Research/Interview/Mentor Visit/Observation entries
    projects.ts          Project cards
    blog/*.mdx           One file per weekly post
  lib/
    blog.ts             Reads/parses blog posts from src/content/blog
    theme-context.tsx   Light/dark theme provider + toggle
```

## Adding content

### A new blog post

Add a file to `src/content/blog/`, named however you like (the convention
so far is `YYYY-MM-DD-week-n-title.mdx`):

```mdx
---
title: "Week 2: Something Happened"
date: "2025-09-15"
excerpt: "One or two sentences summarizing the week."
---

Whatever you want in Markdown/MDX — headings, lists, links all work.
```

It shows up on `/blog` automatically, newest first, no other files need
to change.

### A new research entry

Open `src/content/research.ts` and push an object into the matching
array (`Research`, `Interview`, `Mentor Visit`, or `Observation`):

```ts
Research: [
  // ...existing entries
  {
    title: "New research entry",
    date: "2025-10-01",
    description: "What this covered.",
    href: "https://link-to-the-actual-document",
  },
],
```

### A new project card

Open `src/content/projects.ts` and add an object to the `projects` array:

```ts
{
  id: "unique-id",
  title: "Project title",
  description: "What it is.",
  image: "/projects/my-project.png", // or null
  links: [{ label: "View project", href: "https://..." }],
  tags: ["React", "ML"],
  category: "original-work", // or "final-product", or anything else
}
```

`category` is intentionally open-ended — `"original-work"` and
`"final-product"` are the two sections ISM grades on, but any other string
renders under "Other Work" automatically, so this file can keep holding
new projects after ISM ends without a schema change.

### The mentor page

`src/content/mentor.ts` exports `mentor`, which is either `null` (renders
the "still finding a mentor" empty state) or a `{ name, title, bio, photo }`
object. The file has a commented-out example of the shape to fill in once
a mentor is assigned.

### The résumé

`src/app/resume/page.tsx` renders the résumé content directly — replace
the bracketed placeholders with the real thing. Replace
`public/resume.pdf` with the real export for the download button (it's
currently a placeholder PDF stating as much).

## Hiding or renaming ISM-specific pages later

`src/config/nav.ts` is the single source of truth for navigation. Each
entry has:

- `showInNav` — flip to `false` to remove a page from the nav without
  deleting the route.
- `ismOnly` — flags About ISM, Mentor, Research, and Blog as
  ISM-coursework-specific, so they can be filtered, hidden, or demoted
  into a subsection later with a one-line change, without touching any
  layout component.

## Design system

- **Colors**: OKLCH tokens in `src/app/globals.css` (`:root` for light,
  `:root[data-theme="dark"]` for dark). Warm coral/amber primary +
  secondary, a cool teal tertiary reserved for focus states and accents.
- **Type**: Bricolage Grotesque (display + body) paired with Space Mono
  (labels, tags, metadata) — loaded via `next/font/google` in
  `src/app/layout.tsx`.
- **Dark mode**: manual toggle (`src/components/theme/theme-toggle.tsx`),
  light by default, persisted to `localStorage`, with a circular reveal +
  brief flicker transition via the native View Transitions API.
- **Motion**: page-to-page transitions use React's `<ViewTransition>`
  (native browser View Transitions API, wired in `src/app/template.tsx`);
  everything else (cursor, hover states, scroll reveals, the mobile menu)
  uses Framer Motion. Every animation has a `prefers-reduced-motion`
  fallback.

## Deploying to Vercel with a custom domain

1. Push this repo to GitHub (or GitLab/Bitbucket).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
   Vercel auto-detects Next.js — no config needed.
3. Deploy. You'll get a `*.vercel.app` URL immediately.
4. To add a custom domain: in the Vercel project, go to **Settings →
   Domains**, add your domain, and follow the DNS instructions it gives
   you (usually an `A`/`CNAME` record at your domain registrar).
5. Every push to the main branch redeploys automatically; pull requests
   get their own preview URLs.

If your ISM course requires the domain to contain your first and last
name (check your assignment sheet), pick that as your custom domain or as
the project name for the default `*.vercel.app` URL before adding a
custom one.
