---
name: Personal Portfolio (ISM → permanent site)
description: A warm, playful-technical portfolio for someone in machine learning and AI — generative-art energy, not corporate SaaS or cold terminal.
colors:
  primary: "oklch(0.62 0.19 32)"
  primary-ink: "oklch(1 0 0)"
  secondary: "oklch(0.74 0.15 80)"
  secondary-ink: "oklch(1 0 0)"
  tertiary: "oklch(0.6 0.16 185)"
  tertiary-ink: "oklch(1 0 0)"
  bg: "oklch(1 0 0)"
  surface: "oklch(0.97 0.004 32)"
  surface-raised: "oklch(0.94 0.006 32)"
  ink: "oklch(0.18 0.02 32)"
  muted: "oklch(0.5 0.015 32)"
  border: "oklch(0.9 0.01 32)"
  bg-dark: "oklch(0.14 0.012 32)"
  surface-dark: "oklch(0.2 0.014 32)"
  ink-dark: "oklch(0.96 0.006 32)"
typography:
  display:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 600
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 400
  label:
    fontFamily: "Space Mono, ui-monospace, SFMono-Regular, monospace"
    fontWeight: 400
rounded:
  sm: "8px"
  md: "16px"
  lg: "24px"
  full: "9999px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-ink}"
    rounded: "{rounded.full}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.primary}"
---

# Design System: Personal Portfolio

## 1. Overview

**Creative North Star: "The Warm Lab Notebook"**

A personal notebook kept by someone who builds things with computers and can't help decorating the margins — sketches, half-finished diagrams, a coffee ring, a sticky note that says "fix this later." The energy is generative-art and creative-coding: canvas-driven playfulness, particles and interactivity woven into the medium itself, warm sunset tones instead of neon-on-black. Machine learning shows up as texture — the fingerprints of someone who thinks in systems — never as a mascot, a robot icon, or a neural-net stock photo.

This system explicitly rejects: generic Wix/template polish, corporate SaaS gloss (glassmorphism, gradient-text heroes, hero-metric stat blocks), stiff resume/CV formality, minimalist/Apple-style emptiness, and — importantly — the cold-terminal/hacker-green-on-black cliché that "technical portfolio" usually defaults to. Warmth is carried by color and typography, not by a cream/beige backdrop; a saturated warm accent and confident type do the work that a "cozy neutral" background would otherwise be asked to fake.

**Key Characteristics:**
- Warm, coral/red-orange-anchored palette carrying real surface weight — not a pastel accent on white
- Display type with real personality paired with monospace for technical/label texture
- Choreographed motion: scroll-driven builds, a bounding-box-reticle custom cursor with a trailing dot, glitch-flavored hover states — all with full reduced-motion fallbacks
- Playful without sacrificing findability: the 8 required ISM pages must be locatable in seconds

## 2. Colors

**Strategy: Full palette.** Three named roles, each with a deliberate job, plus warm/cool/neutral support colors — enough range for different content types (home/personality, research/projects, blog) to carry distinct identity without becoming visual noise.

### Primary
- **Coral** (`oklch(0.62 0.19 32)`, dark mode `oklch(0.68 0.18 32)`): the signature color. Carries real surface weight — buttons, active nav state, the cursor's hover label chip, the theme-toggle reveal. White text on fills.

### Secondary
- **Amber/gold** (`oklch(0.74 0.15 80)`, dark mode `oklch(0.8 0.13 80)`): supporting warmth — tags, the mobile-menu active state accent, placeholder-note badges. White text on fills.

### Tertiary
- **Teal** (`oklch(0.6 0.16 185)`, dark mode `oklch(0.66 0.15 185)`): the cool contrast pop — focus rings, the cursor's idle trailing dot, nav-hover flicker's mid-tone. Deliberately cool against the warm base so the palette doesn't read muddy.

### Neutral
- **Ink** (`oklch(0.18 0.02 32)` light / `oklch(0.96 0.006 32)` dark): primary text, tinted toward the primary hue at near-zero chroma rather than a generic gray.
- **Bg** (`oklch(1 0 0)` light / `oklch(0.14 0.012 32)` dark): pure white in light mode (see the No-Cream Rule), a warm-tinted near-black in dark mode.
- **Surface** (`oklch(0.97 0.004 32)` light / `oklch(0.2 0.014 32)` dark): cards, panels, placeholder blocks.
- **Border** (`oklch(0.9 0.01 32)` light / `oklch(0.3 0.02 32)` dark): dividers, dashed placeholder-note outlines.

### Named Rules
**The No-Cream Rule.** The warmth in this system comes from the primary/secondary accents and typography, never from a cream, sand, parchment, or beige-tinted body background. Light mode's `bg` is literal pure white (`oklch(1 0 0)`) for exactly this reason.

**The Warm-Not-Cold Rule.** No terminal green, no neon-on-black, no matrix/hacker visual language. The technical/ML personality is expressed through the mono type, the bounding-box cursor, and interaction design — not through a cold color language.

**The White-Text Rule.** Every saturated fill (primary, secondary, tertiary) takes white text — all three sit in the mid-lightness/high-chroma band where white reads cleanest regardless of hue.

## 3. Typography

**Display Font:** Bricolage Grotesque (variable) — a quirky, warm grotesque, not a corporate-neutral sans.
**Body Font:** Bricolage Grotesque, regular weight — same family as display (see the Two-Voice Rule), loaded via `next/font/google`.
**Label/Mono Font:** Space Mono — used for tags, dates, nav labels, cursor confidence labels.

**Character:** Display + mono. The display face carries the personality and warmth; mono is the technical texture layer (labels, metadata, small UI chrome) — not the voice of the whole page.

### Hierarchy
- **Display** (600 weight, `clamp` up to ~text-7xl, tracking -0.02em): the Home hero name, page `<h1>`s.
- **Headline** (600 weight, text-2xl–4xl): section headers within pages.
- **Title** (600 weight, text-xl–2xl): card titles (projects, research entries, blog post titles).
- **Body** (400 weight, max 65–75ch): bios, descriptions, blog content (via `prose` on MDX).
- **Label** (mono, text-xs, uppercase only for short tags/badges): dates, tags, metadata, nav items.

### Named Rules
**The Two-Voice Rule.** Every page speaks in exactly two type voices: Bricolage Grotesque for personality/emphasis, Space Mono for technical/metadata texture. A third family is never introduced.

## 4. Elevation

Layered, not flat-and-dead: soft warm-tinted shadows under cards and interactive elements, strengthening on hover — a response to state, not decoration on every box.

### Shadow Vocabulary
- **`shadow-ambient`** (`0 1px 2px oklch(0.3 0.04 32 / 0.08), 0 6px 20px oklch(0.3 0.04 32 / 0.1)`; pure black at higher opacity in dark mode): default rest state for cards, the cursor's label chip.
- **`shadow-lift`** (`0 2px 4px oklch(0.3 0.04 32 / 0.1), 0 16px 32px oklch(0.3 0.04 32 / 0.16)`): hover/active state for interactive cards.

### Named Rules
**The Warm Shadow Rule.** Shadows are tinted toward the primary hue in light mode (never neutral gray-black); dark mode uses true black since the surface itself already carries the warm tint.

## 5. Components

### Buttons
- **Shape:** fully rounded (`rounded-full`) — confident pill shape, used consistently for every CTA.
- **Primary:** coral background, white text, `px-5 py-2.5`.
- **Hover / Focus:** primary buttons lift (`-translate-y-0.5`); nav links get a quick digital color-flicker (`nav-flicker` keyframes) plus a spring-driven tilt via Framer Motion — deliberately more than a plain color swap. Focus-visible ring uses the tertiary color.

### Cards / Containers
- Project cards alternate a subtle `rotate-1`/`-rotate-1` tilt (straightening on hover) rather than sitting in a perfectly uniform grid — avoids the "identical repeated card grid" anti-pattern.
- `PlaceholderNote` (`src/components/ui/placeholder-note.tsx`): the sticky-note treatment for stand-in content — dashed secondary-colored border, slight rotation, a pinned badge label. Used on About ISM and Résumé.

### Navigation
- Config-driven from `src/config/nav.ts`. Desktop: horizontal mono-label links with an active-state underline. Mobile (below 768px): a full-screen overlay (portalled to `<body>` — the header's `backdrop-blur` would otherwise trap a `position: fixed` child) with a circular reveal wipe and staggered link entrance.

### Custom Cursor (signature component)
- `src/components/cursor/custom-cursor.tsx`. A bounding-box/object-detection-style reticle (four corner brackets) that snaps to `ACTIVE_SIZE` and shows a "N% <label>" confidence chip on interactive elements, plus a small softer-spring trailing dot for the "cursor trail" brief requirement. Idle brackets use `var(--color-ink)` at reduced opacity (not a blend-mode trick) so they stay visible in both themes. Fully disabled under `prefers-reduced-motion` or on coarse/touch pointers — the system cursor is the fallback, never removed by default.

### Page & Theme Transitions
- Route changes: React's native `<ViewTransition>` (`src/app/template.tsx`), a plain crossfade — the browser's default snapshot-resize morph is disabled (`::view-transition-group(*) { animation-duration: 0 }`) since it looked like stretching between differently-sized pages.
- Theme toggle: raw `document.startViewTransition()` with a circular clip-path reveal from the toggle button plus a brief brightness/contrast flicker, scoped via a `.theme-transition` class on `<html>` so it doesn't collide with the page-transition rules.

## 6. Do's and Don'ts

### Do:
- **Do** anchor the palette in the committed warm coral/red-orange, carrying real surface weight, not a thin accent line.
- **Do** pair the personable Bricolage Grotesque display/body voice with Space Mono for labels — exactly two voices.
- **Do** build every animation (cursor, glitch hover, scroll reveal, page transition, theme toggle) with a full `prefers-reduced-motion` alternative from day one.
- **Do** keep the 8 required ISM pages fast to locate and read — personality lives in transitions and details, not in obscuring navigation or content.
- **Do** tint light-mode shadows and neutrals toward the palette's own hue rather than defaulting to gray-black.

### Don't:
- **Don't** default the body background to a cream/sand/beige near-white "for warmth" — light mode `bg` is pure white; warmth comes from accent + type.
- **Don't** reach for terminal green, neon-on-black, or matrix/hacker visual language anywhere in the system.
- **Don't** use glassmorphism, gradient-text headings, or the hero-metric template — corporate SaaS anti-reference from PRODUCT.md.
- **Don't** default to stiff resume/CV formality (Times-New-Roman energy, objective-statement tone).
- **Don't** default to Apple-style minimalist emptiness (huge whitespace, one muted accent, nothing else happening).
- **Don't** use identical repeated card grids as the default layout — Projects cards carry a slight alternating tilt for exactly this reason.
- **Don't** introduce a third type family beyond the Bricolage Grotesque + Space Mono pairing.
