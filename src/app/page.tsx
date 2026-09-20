import { Reveal } from "@/components/motion/reveal";
import { VisionMarks } from "@/components/home/vision-marks";
import { FloatingChips } from "@/components/home/floating-chips";
import { HeroTexture } from "@/components/home/hero-texture";
import { QuoteReroll } from "@/components/home/quote-reroll";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  const nameParts = siteConfig.name.split(" ");
  const lastWord = nameParts.at(-1);
  const leadingWords = nameParts.slice(0, -1).join(" ");

  return (
    <div className="relative overflow-x-hidden py-16 sm:py-24">
      <HeroTexture />
      <div className="relative flex min-h-[max(70vh,640px)] items-center justify-center">
        <FloatingChips />
        <VisionMarks />

        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-4 text-center sm:px-6">
          <p className="font-mono text-sm uppercase tracking-wide text-primary">
            {siteConfig.tagline}
          </p>

          <h1 className="mt-4 font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
            {leadingWords && <>{leadingWords} </>}
            <span className="text-primary">{lastWord}</span>
          </h1>

          <Reveal delay={0.1}>
            <div className="flex justify-center">
              <QuoteReroll />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a
                href="/about"
                data-cursor-label="the short version of me"
                className="rounded-full bg-primary px-5 py-2.5 font-mono text-sm font-semibold text-primary-ink transition-transform hover:-translate-y-0.5"
              >
                About me
              </a>
              <a
                href="/projects"
                data-cursor-label="what I've actually made"
                className="rounded-full border-2 border-tertiary px-5 py-2.5 font-mono text-sm font-semibold text-ink transition-colors hover:bg-tertiary hover:text-tertiary-ink"
              >
                See the work
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
