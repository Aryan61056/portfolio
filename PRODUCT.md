# Product

## Register

brand

## Users

Two audiences in sequence, on one site:

1. **Right now — ISM teacher/grader.** Reviews the site against a fixed rubric (8 required tabs, specific content per page). Needs to find each required section fast and confirm it's actually there and working. Not the audience the design is trying to impress with personality — the audience it must not slow down.
2. **After ISM ends — employers, collaborators, and other people in ML/AI.** Landing here to quickly figure out who this person is, what they've built, and whether to reach out. Skimming, time-limited, evaluating competence and taste simultaneously.

The site has to satisfy audience 1 without being built *for* audience 1 — the grading structure is a checklist layered on top of a site designed for audience 2.

## Product Purpose

A personal portfolio that starts life as a required deliverable for a high school Independent Study & Mentorship (ISM) course, but is built from day one as the owner's permanent personal/professional site. Success during ISM means all 8 graded pages exist, work, and contain the required content. Success afterward means the site reads as a credible, memorable personal portfolio for someone in machine learning and AI — not as a repurposed school assignment.

## Brand Personality

**Curious, sharp, playful.**

Playful-technical, not crafty-handmade: the personality comes from code-native, systems-flavored details — a custom cursor, glitch-style hover states, monospace accents, small interactive easter eggs — rather than scrapbook/paper-collage flourishes. Explicitly **not** cold-hacker/terminal-green-on-black; the reference lane is warm generative-art and creative-coding (canvas/particle-driven interactivity, playfulness built into the medium itself, sunset-warm tones rather than neon-on-black), reinterpreted rather than copied. The technical texture should feel personable and inviting, not clinical.

The ML/AI focus should show up as aesthetic texture (signals, systems, computation, terminal-adjacent motifs) woven into the interaction design — not just stated as a topic label on the home page, and never via literal AI clichés (robot mascots, neural-net stock art, circuit-board backgrounds).

## Anti-references

- Generic Wix/Squarespace template feel (the other ISM student sites this project's content structure was studied from — structure only, never look)
- Corporate SaaS polish: glassmorphism, gradient-text heroes, the hero-metric template, generic bento grids used as decoration rather than structure
- Stiff resume/CV formality — buttoned-up, objective-statement, Times-New-Roman energy
- Minimalist/Apple-style emptiness — large whitespace with one muted accent, restrained to the point of feeling like there's nothing there

## Design Principles

1. **Substance first, personality in the details.** Fun lives in transitions, hover states, and microcopy — never in the path to content. A grader skimming for the required section and a recruiter skimming for proof of work both need to find things immediately.
2. **ML/AI as texture, not costume.** Technical motifs (terminal, signal, computation) should feel like a genuine expression of the subject, not a decorative skin. No literal AI iconography.
3. **Built to outlive the assignment.** Nav structure, content schemas, and page composition treat "ISM requirements" as a removable/demotable layer over a permanent personal site — not as the site's identity. Nothing ISM-specific should be load-bearing in the architecture.
4. **Respect the reader's time.** Motion and chaos are additive, never a gate. Comprehension and navigation must work identically with every animation stripped out.
5. **Craft over gimmick.** Every playful flourish (cursor, glitch, easter egg) degrades gracefully for keyboard users, reduced-motion users, and screen readers. The dual audience — a grader and a professional visitor — can't be alienated by inaccessible novelty.

## Accessibility & Inclusion

- WCAG AA baseline across all pages, including within dark mode and any glitch/motion-styled states.
- Full `prefers-reduced-motion` fallback for every animation (cursor trail, glitch hovers, page transitions, scroll reveals): crossfade or instant equivalents, not just "less" motion.
- Full keyboard navigation, including for any custom cursor, hidden easter eggs, and the light/dark toggle.
- Alt text required on every image (photos, graphics, project screenshots).
- Color contrast held to AA minimums in both themes even where the palette leans expressive/dark.
