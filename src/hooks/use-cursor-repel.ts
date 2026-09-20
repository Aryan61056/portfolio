"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const RADIUS = 110;
const STRENGTH = 26;

/**
 * Nudges an element away from a nearby mouse cursor, spring-eased back to
 * rest. Returns a ref for the element whose own box should be measured, plus
 * motion values to feed into `style={{ x, y }}` on that same element.
 *
 * Must be applied to a plain (non-positioned) wrapper, not the absolutely
 * positioned `top`/`left` element itself — a CSS transform creates a new
 * containing block, which would break percentage-based descendant layout.
 */
export function useCursorRepel<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 220, damping: 20, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 220, damping: 20, mass: 0.5 });

  useEffect(() => {
    if (reduced) return;

    function handlePointerMove(e: PointerEvent) {
      if (e.pointerType !== "mouse" || !ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = cx - e.clientX;
      const dy = cy - e.clientY;
      const dist = Math.hypot(dx, dy);

      if (dist < RADIUS && dist > 0.01) {
        const factor = (1 - dist / RADIUS) * STRENGTH;
        rawX.set((dx / dist) * factor);
        rawY.set((dy / dist) * factor);
      } else {
        rawX.set(0);
        rawY.set(0);
      }
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reduced, rawX, rawY]);

  return { ref, x, y };
}
