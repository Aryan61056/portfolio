import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        About
      </h1>

      <div className="mt-10 grid gap-10 sm:grid-cols-[200px_1fr]">
        <div
          data-cursor-label="that's me"
          className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-surface"
        >
          <Image
            src="/images/aryan-professional.jpg"
            alt={siteConfig.name}
            fill
            className="object-cover"
            sizes="(min-width: 640px) 200px, 100vw"
            priority
          />
        </div>

        <Reveal>
          <div className="space-y-6">
            <p className="text-lg text-ink">
              Based in Frisco, TX, with a growing interest in finance,
              business, and entrepreneurship. Diving deep into machine
              learning right now.
            </p>

            <div className="rounded-2xl bg-surface p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-muted">
                Mission statement
              </p>
              <p className="mt-2 text-base text-ink">
                I want to use computer science to solve problems that
                actually matter.
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="mt-12 border-t border-border pt-8">
          <p className="font-mono text-xs uppercase tracking-wide text-muted">
            Get in touch
          </p>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
            <a
              href={`mailto:${siteConfig.email}`}
              data-cursor-label="say hi"
              className="text-primary underline decoration-dotted underline-offset-4"
            >
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted underline decoration-dotted underline-offset-4 hover:text-primary"
            >
              GitHub
            </a>
            {siteConfig.social.linkedin ? (
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted underline decoration-dotted underline-offset-4 hover:text-primary"
              >
                LinkedIn
              </a>
            ) : (
              <span className="text-muted/60">LinkedIn (work in progress)</span>
            )}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
