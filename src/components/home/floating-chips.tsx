"use client";

import { motion, useReducedMotion } from "framer-motion";

import { useCursorRepel } from "@/hooks/use-cursor-repel";

type Breakpoint = "xs" | "sm" | "lg" | "xl";

type Chip = {
  text: string;
  top: string;
  left: string;
  rotate: number;
  duration: number;
  color: "primary" | "secondary" | "tertiary";
  minBreak: Breakpoint;
};

// `minBreak` controls how much screen real estate has to be available before
// a chip joins the scene — even phone-width viewports get a couple of "xs"
// chips (they sit in the top/bottom bands outside the centered text column,
// where they're clear regardless of width), "sm" and up fill out further,
// so the wider the hero gets, the less empty it feels.
const CHIPS: Chip[] = [
  { text: "Machine Learning", top: "4%", left: "6%", rotate: -6, duration: 5.5, color: "primary", minBreak: "xs" },
  { text: "confidence: fluctuating", top: "90%", left: "74%", rotate: -3, duration: 5, color: "tertiary", minBreak: "sm" },
  { text: "subject to revision", top: "90%", left: "12%", rotate: 3, duration: 5.8, color: "tertiary", minBreak: "xs" },
  { text: "draft mode: permanent", top: "10%", left: "78%", rotate: 4, duration: 6.5, color: "secondary", minBreak: "lg" },
  { text: "margin note #3", top: "62%", left: "3%", rotate: 5, duration: 7, color: "secondary", minBreak: "lg" },
  { text: "still calibrating", top: "80%", left: "70%", rotate: -4, duration: 6, color: "primary", minBreak: "lg" },
  { text: "loss: 0.0231", top: "16%", left: "93%", rotate: 5, duration: 6.8, color: "primary", minBreak: "xl" },
  { text: "epoch 42/100", top: "68%", left: "91%", rotate: -3, duration: 6.1, color: "secondary", minBreak: "xl" },
  { text: "p < 0.05", top: "50%", left: "13%", rotate: -5, duration: 5.4, color: "tertiary", minBreak: "xl" },
];

const colorClass: Record<Chip["color"], string> = {
  primary: "bg-primary text-primary-ink",
  secondary: "bg-secondary text-secondary-ink",
  tertiary: "bg-tertiary text-tertiary-ink",
};

const visibilityClass: Record<Breakpoint, string> = {
  xs: "",
  sm: "hidden sm:block",
  lg: "hidden lg:block",
  xl: "hidden xl:block",
};

function ChipView({ chip, index }: { chip: Chip; index: number }) {
  const reduced = useReducedMotion();
  const { ref: repelRef, x: repelX, y: repelY } = useCursorRepel<HTMLSpanElement>();

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8, rotate: chip.rotate }}
      animate={
        reduced
          ? { opacity: 1, scale: 1, rotate: chip.rotate }
          : {
              opacity: 1,
              scale: 1,
              rotate: chip.rotate,
              y: [0, -10, 0],
            }
      }
      transition={
        reduced
          ? { duration: 0.4, delay: index * 0.06 }
          : {
              opacity: { duration: 0.4, delay: index * 0.06 },
              scale: { duration: 0.4, delay: index * 0.06 },
              y: {
                duration: chip.duration,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: index * 0.3,
              },
            }
      }
      style={{ top: chip.top, left: chip.left }}
      className={`absolute ${visibilityClass[chip.minBreak]}`}
    >
      <motion.span
        ref={repelRef}
        style={{ x: repelX, y: repelY }}
        className={`block whitespace-nowrap rounded-full px-3 py-1.5 font-mono text-xs font-semibold shadow-ambient ${colorClass[chip.color]}`}
      >
        {chip.text}
      </motion.span>
    </motion.span>
  );
}

export function FloatingChips() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 select-none">
      {CHIPS.map((chip, i) => (
        <ChipView key={chip.text} chip={chip} index={i} />
      ))}
    </div>
  );
}
