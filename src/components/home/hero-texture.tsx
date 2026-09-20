/**
 * A two-tone dot grid plus three soft color glows behind the whole home-page
 * section (this is rendered once in the outer, full-height wrapper — not
 * just the inner hero box — so both span the page's own top/bottom padding
 * too, instead of stopping abruptly at the hero's edges). The coral
 * (primary) glow is off-center rather than dead-center behind the headline,
 * and is deliberately pulled up so its peak sits right at the very top of
 * the page — flush against the sticky header's translucent edge, which
 * reads as an intentional bleed rather than a clipped shape, unlike the
 * old version that got clipped mid-blur out in the middle of empty space.
 * The amber (secondary) and teal (tertiary) glows sit in opposite corners
 * so the wash feels like a spread gradient rather than one spot, and the bg
 * token itself stays pure white per the No-Cream Rule — this is a
 * translucent accent layered on top.
 */
export function HeroTexture() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 select-none overflow-hidden">
      <div className="absolute left-[38%] top-0 h-[420px] w-[860px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/[0.16] blur-2xl dark:bg-primary/[0.22]" />
      <div className="absolute left-[3%] top-[16%] h-[260px] w-[260px] rounded-full bg-secondary/[0.14] blur-xl dark:bg-secondary/[0.2]" />
      <div className="absolute bottom-[10%] right-[4%] h-[260px] w-[260px] rounded-full bg-tertiary/[0.14] blur-xl dark:bg-tertiary/[0.2]" />
      <div
        className="absolute inset-0 text-primary opacity-[0.1]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1.5px, transparent 1.5px)",
          backgroundSize: "34px 34px",
        }}
      />
      <div
        className="absolute inset-0 text-tertiary opacity-[0.1]"
        style={{
          backgroundImage: "radial-gradient(currentColor 1.5px, transparent 1.5px)",
          backgroundSize: "34px 34px",
          backgroundPosition: "17px 17px",
        }}
      />
    </div>
  );
}
