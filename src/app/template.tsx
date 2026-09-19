import { ViewTransition } from "react";

/**
 * Runs on every top-level route change (templates remount per segment,
 * unlike layouts). Wrapping children in an unnamed <ViewTransition>
 * gives every navigation the native browser crossfade automatically;
 * the actual "12px settle" motion is defined once in globals.css via
 * ::view-transition-old/new(root), so no per-page wiring is needed.
 * Falls back to an instant swap in browsers without View Transitions
 * support, and is fully muted under prefers-reduced-motion (also in
 * globals.css).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <ViewTransition>{children}</ViewTransition>;
}
