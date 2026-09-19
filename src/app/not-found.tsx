import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-start justify-center gap-4 px-4 py-24 sm:px-6">
      <span className="rounded-full bg-surface px-3 py-1 font-mono text-xs uppercase tracking-wide text-muted">
        0% confidence
      </span>
      <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        I&apos;ve got nothing at this address.
      </h1>
      <p className="max-w-prose text-lg text-muted">
        Whatever you were looking for isn&apos;t here. Either I moved it, I
        haven&apos;t built it yet, or you typed something wrong — I&apos;m
        building this one page at a time, so it&apos;s probably the second
        one.
      </p>
      <Link
        href="/"
        data-cursor-label="back to known territory"
        className="mt-2 rounded-full bg-primary px-5 py-2.5 font-mono text-sm font-semibold text-primary-ink transition-transform hover:-translate-y-0.5"
      >
        Take me home
      </Link>
    </div>
  );
}
