"use client";

import { motion } from "framer-motion";
import {
  Children,
  isValidElement,
  useLayoutEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

/**
 * Scroll-triggered build-in that stays correct with JS disabled, on
 * crawlers, and on hidden tabs: children render fully visible by
 * default (both in SSR markup, since <motion.div> with no explicit
 * `initial` renders at its `animate` target on mount, and on first
 * paint). Only armed into a hidden-then-reveal state if a layout
 * effect confirms, before the browser paints, that the element starts
 * below the fold and the visitor allows motion. Always the same DOM
 * node throughout — critical, because the IntersectionObserver set up
 * below has to keep watching the exact element it started with.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const rect = el.getBoundingClientRect();
    const alreadyInView = rect.top < window.innerHeight * 0.92;
    if (alreadyInView) return;

    setVisible(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Wraps a list of elements so each one reveals in sequence. Pass plain
 * elements as children; each gets an incrementing delay.
 */
export function Stagger({
  children,
  step = 0.08,
  className,
}: {
  children: ReactNode;
  step?: number;
  className?: string;
}) {
  const items = Children.toArray(children).filter(isValidElement) as ReactElement[];

  return (
    <div className={className}>
      {items.map((child, i) => (
        <Reveal key={child.key ?? i} delay={i * step}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
