"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const BURST_COLORS = ["var(--color-primary)", "var(--color-secondary)", "var(--color-tertiary)"];

type Confetto = {
  id: number;
  x: number;
  y: number;
  rotate: number;
  color: string;
};

export function KonamiListener() {
  const [found, setFound] = useState(false);
  const [confetti, setConfetti] = useState<Confetto[]>([]);
  const progress = useRef(0);

  const reveal = useCallback(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setFound(true);

    if (!reduced) {
      const burst: Confetto[] = Array.from({ length: 24 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 480,
        y: Math.random() * -320 - 40,
        rotate: Math.random() * 360,
        color: BURST_COLORS[i % BURST_COLORS.length],
      }));
      setConfetti(burst);
      window.setTimeout(() => setConfetti([]), 1400);
    }

    window.setTimeout(() => setFound(false), 4000);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const expected = KONAMI_CODE[progress.current];
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === expected) {
        progress.current += 1;
        if (progress.current === KONAMI_CODE.length) {
          progress.current = 0;
          reveal();
        }
      } else {
        progress.current = key === KONAMI_CODE[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [reveal]);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex flex-col items-center gap-2"
    >
      <div className="pointer-events-none fixed inset-x-0 top-0 flex justify-center overflow-hidden">
        <AnimatePresence>
          {confetti.map((c) => (
            <motion.span
              key={c.id}
              initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
              animate={{ x: c.x, y: c.y * -1, opacity: 0, rotate: c.rotate }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ background: c.color }}
              className="absolute top-24 h-3 w-3 rounded-sm"
            />
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {found && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="pointer-events-auto rounded-full border border-border bg-surface px-4 py-2 font-mono text-xs text-ink shadow-lift"
          >
            You found it. There&apos;s nothing else here — I just liked the
            idea of leaving something to find.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
