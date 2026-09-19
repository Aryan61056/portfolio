"use client";

import { motion, useReducedMotion } from "framer-motion";

type Chip = {
  text: string;
  top: string;
  left: string;
  rotate: number;
  duration: number;
  color: "primary" | "secondary" | "tertiary";
};

const CHIPS: Chip[] = [
  { text: "Machine Learning", top: "4%", left: "6%", rotate: -6, duration: 5.5, color: "primary" },
  { text: "draft mode: permanent", top: "10%", left: "78%", rotate: 4, duration: 6.5, color: "secondary" },
  { text: "confidence: fluctuating", top: "40%", left: "88%", rotate: -3, duration: 5, color: "tertiary" },
  { text: "margin note #3", top: "62%", left: "3%", rotate: 5, duration: 7, color: "secondary" },
  { text: "still calibrating", top: "80%", left: "70%", rotate: -4, duration: 6, color: "primary" },
  { text: "subject to revision", top: "90%", left: "12%", rotate: 3, duration: 5.8, color: "tertiary" },
];

const colorClass: Record<Chip["color"], string> = {
  primary: "bg-primary text-primary-ink",
  secondary: "bg-secondary text-secondary-ink",
  tertiary: "bg-tertiary text-tertiary-ink",
};

export function FloatingChips() {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden select-none sm:block"
    >
      {CHIPS.map((chip, i) => (
        <motion.span
          key={chip.text}
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
              ? { duration: 0.4, delay: i * 0.06 }
              : {
                  opacity: { duration: 0.4, delay: i * 0.06 },
                  scale: { duration: 0.4, delay: i * 0.06 },
                  y: {
                    duration: chip.duration,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: i * 0.3,
                  },
                }
          }
          style={{ top: chip.top, left: chip.left }}
          className={`absolute whitespace-nowrap rounded-full px-3 py-1.5 font-mono text-xs font-semibold shadow-ambient ${colorClass[chip.color]}`}
        >
          {chip.text}
        </motion.span>
      ))}
    </div>
  );
}
