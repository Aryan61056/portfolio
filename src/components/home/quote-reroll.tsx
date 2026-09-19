"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLayoutEffect, useState } from "react";

const QUOTES: { text: string; author: string }[] = [
  { text: "What I cannot create, I do not understand.", author: "Richard Feynman" },
  { text: "Somewhere, something incredible is waiting to be known.", author: "Carl Sagan" },
  { text: "The important thing is not to stop questioning.", author: "Albert Einstein" },
  {
    text: "We can only see a short distance ahead, but we can see plenty there that needs to be done.",
    author: "Alan Turing",
  },
  {
    text: "The most dangerous phrase in the language is, “We’ve always done it this way.”",
    author: "Grace Hopper",
  },
  { text: "Nothing in life is to be feared, it is only to be understood.", author: "Marie Curie" },
  { text: "Learning never exhausts the mind.", author: "Leonardo da Vinci" },
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  {
    text: "A ship in harbor is safe, but that is not what ships are built for.",
    author: "John A. Shedd",
  },
  {
    text: "Science and everyday life cannot and should not be separated.",
    author: "Rosalind Franklin",
  },
  {
    text: "The people who are crazy enough to think they can change the world are the ones who do.",
    author: "Steve Jobs",
  },
  {
    text: "That brain of mine is something more than merely mortal; as time will show.",
    author: "Ada Lovelace",
  },
];

const ACCENTS = [
  { border: "border-primary/50", bg: "bg-primary/10", tag: "text-primary" },
  { border: "border-secondary/50", bg: "bg-secondary/10", tag: "text-secondary" },
  { border: "border-tertiary/50", bg: "bg-tertiary/10", tag: "text-tertiary" },
] as const;

function randomIndex(exclude?: number) {
  if (QUOTES.length <= 1) return 0;
  let next = Math.floor(Math.random() * QUOTES.length);
  while (next === exclude) {
    next = Math.floor(Math.random() * QUOTES.length);
  }
  return next;
}

export function QuoteReroll() {
  const [index, setIndex] = useState(0);

  // Randomize on every page load/refresh — but only after the layout
  // effect runs, so the server-rendered / first-paint markup is
  // deterministic and there's no hydration mismatch. Math.random() can't
  // be moved out of the effect; it's the whole point of this one.
  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIndex((current) => randomIndex(current));
  }, []);

  const accent = ACCENTS[index % ACCENTS.length];
  const quote = QUOTES[index];

  return (
    <div className="mt-8 flex max-w-xl items-start gap-3">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 6, rotate: -1 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, y: -6, rotate: 1 }}
          transition={{ duration: 0.25 }}
          className={`rounded-2xl border-2 ${accent.border} ${accent.bg} px-5 py-4 text-left`}
        >
          <blockquote className="font-display text-lg italic text-ink sm:text-xl">
            &ldquo;{quote.text}&rdquo;
          </blockquote>
          <p className={`mt-2 font-mono text-xs font-semibold uppercase tracking-wide ${accent.tag}`}>
            — {quote.author}
          </p>
        </motion.div>
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setIndex((current) => randomIndex(current))}
        data-cursor-label="another one"
        aria-label="Show another quote"
        className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-primary hover:text-primary"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
        </svg>
      </button>
    </div>
  );
}
