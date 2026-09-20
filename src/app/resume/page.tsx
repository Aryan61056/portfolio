import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Résumé",
};

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Résumé
          </h1>
          <p className="mt-2 text-muted">{siteConfig.name}</p>
        </div>
        <a
          href="/resume.pdf"
          download
          data-cursor-label="grab the pdf"
          className="rounded-full bg-primary px-5 py-2.5 font-mono text-sm font-semibold text-primary-ink transition-transform hover:-translate-y-0.5"
        >
          Download PDF
        </a>
      </div>

      <div className="relative mx-auto mt-10 aspect-[1700/2200] w-full max-w-xl overflow-hidden rounded-2xl border border-border shadow-lift">
        <Image
          src="/images/resume/page-1.png"
          alt={`${siteConfig.name}'s résumé`}
          fill
          priority
          className="object-cover"
          sizes="(min-width: 640px) 576px, 100vw"
        />
      </div>
    </div>
  );
}
