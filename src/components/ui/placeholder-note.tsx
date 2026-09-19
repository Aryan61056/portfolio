import type { ReactNode } from "react";

/**
 * A "this is a stand-in" callout with a bit of handmade personality —
 * used anywhere real content (bio, program description, résumé copy)
 * hasn't been dropped in yet.
 */
export function PlaceholderNote({
  label = "Placeholder",
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative rounded-2xl border-2 border-dashed border-secondary/50 bg-surface p-6 sm:-rotate-1">
      <span className="absolute -top-3 left-5 rounded-full bg-secondary px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide text-secondary-ink shadow-ambient">
        {label}
      </span>
      <div className="text-lg text-ink">{children}</div>
    </div>
  );
}
