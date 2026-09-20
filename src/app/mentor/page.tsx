import type { Metadata } from "next";
import Image from "next/image";
import { mentor } from "@/content/mentor";

export const metadata: Metadata = {
  title: "Mentor",
};

export default function MentorPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        Mentor
      </h1>

      {mentor === null ? (
        <div className="mt-10 flex flex-col items-start gap-3 rounded-2xl border border-dashed border-border bg-surface p-8">
          <span className="rounded-full bg-secondary px-3 py-1 font-mono text-xs font-semibold text-secondary-ink">
            Still finding a mentor
          </span>
          <p className="max-w-prose text-ink">
            I don&apos;t have an ISM mentor lined up yet. Once one&apos;s
            assigned, their bio and photo will be right here.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 sm:grid-cols-[200px_1fr]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface">
            {mentor.photo && (
              <Image
                src={mentor.photo}
                alt={mentor.name}
                fill
                className="object-cover"
                sizes="200px"
              />
            )}
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold">
              {mentor.name}
            </h2>
            <p className="mt-1 font-mono text-sm text-muted">{mentor.title}</p>
            <p className="mt-4 text-lg text-ink">{mentor.bio}</p>
          </div>
        </div>
      )}
    </div>
  );
}
