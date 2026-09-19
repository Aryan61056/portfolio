"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

const IDLE_SIZE = 34;
const ACTIVE_SIZE = 46;

function defaultLabelFor(el: Element): string {
  const tag = el.tagName.toLowerCase();
  if (tag === "a") {
    const href = el.getAttribute("href") ?? "";
    if (href.startsWith("http")) return "leaving the site";
    return "this way";
  }
  if (tag === "button") return "on it";
  if (tag === "input" || tag === "textarea") return "type here";
  return "detected";
}

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [target, setTarget] = useState<{ label: string; confidence: number } | null>(
    null
  );
  const [pressed, setPressed] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 28, stiffness: 400, mass: 0.4 });
  const springY = useSpring(cursorY, { damping: 28, stiffness: 400, mass: 0.4 });
  // A softer, laggier spring on the same source point gives the trailing
  // dot its "left behind" feel — the brief specifically asks for a
  // cursor trail, not just a replacement cursor.
  const trailX = useSpring(cursorX, { damping: 20, stiffness: 120, mass: 0.8 });
  const trailY = useSpring(cursorY, { damping: 20, stiffness: 120, mass: 0.8 });

  const targetElRef = useRef<Element | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    // Feature-detection result, only knowable client-side — this is a
    // one-time mount decision, not a value that can be computed during
    // render, so it can't be moved out of the effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    const handleMove = (e: PointerEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleOver = (e: PointerEvent) => {
      const el = (e.target as Element)?.closest?.(
        "a, button, input, textarea, [data-cursor-label]"
      );
      if (!el || el === targetElRef.current) return;
      targetElRef.current = el;
      const explicit = el.getAttribute("data-cursor-label");
      const label = explicit && explicit.trim() ? explicit : defaultLabelFor(el);
      setTarget({ label, confidence: 87 + Math.floor(Math.random() * 13) });
    };

    const handleOut = (e: PointerEvent) => {
      const related = e.relatedTarget as Element | null;
      const stillInside =
        targetElRef.current && related && targetElRef.current.contains(related);
      if (stillInside) return;
      if (
        related?.closest?.("a, button, input, textarea, [data-cursor-label]") ===
        targetElRef.current
      ) {
        return;
      }
      targetElRef.current = null;
      setTarget(null);
    };

    const handleDown = () => setPressed(true);
    const handleUp = () => setPressed(false);

    window.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerover", handleOver);
    document.addEventListener("pointerout", handleOut);
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerover", handleOver);
      document.removeEventListener("pointerout", handleOut);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  const size = target ? ACTIVE_SIZE : IDLE_SIZE;
  const scale = pressed ? 0.85 : 1;

  return (
    <>
      {/* Trailing dot — sits behind the reticle, always visible against
          either theme via a real token color rather than a blend mode. */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 h-2 w-2 rounded-full bg-tertiary"
        style={{ x: trailX, y: trailY, translateX: "-50%", translateY: "-50%", zIndex: 9998 }}
        animate={{ opacity: target ? 0 : 0.7, scale: pressed ? 1.6 : 1 }}
        transition={{ duration: 0.2 }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0"
        style={{ x: springX, y: springY, zIndex: 9999 }}
      >
        <motion.svg
          viewBox="0 0 40 40"
          animate={{
            width: size,
            height: size,
            x: -size / 2,
            y: -size / 2,
            scale,
            rotate: target ? 0 : [0, 6, 0, -6, 0],
          }}
          transition={{
            width: { type: "spring", damping: 22, stiffness: 380 },
            height: { type: "spring", damping: 22, stiffness: 380 },
            x: { type: "spring", damping: 22, stiffness: 380 },
            y: { type: "spring", damping: 22, stiffness: 380 },
            scale: { type: "spring", damping: 22, stiffness: 380 },
            rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
          className="absolute"
        >
          <g
            fill="none"
            stroke={target ? "var(--color-primary)" : "var(--color-ink)"}
            strokeOpacity={target ? 1 : 0.55}
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M2 12V4a2 2 0 0 1 2-2h8" />
            <path d="M38 12V4a2 2 0 0 1-2-2h-8" />
            <path d="M2 28v8a2 2 0 0 0 2 2h8" />
            <path d="M38 28v8a2 2 0 0 1-2 2h-8" />
          </g>
        </motion.svg>

        <AnimatePresence>
          {target && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="absolute top-6 left-6 whitespace-nowrap rounded-full bg-primary px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-primary-ink shadow-ambient"
            >
              {target.confidence}% {target.label}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
