"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { primaryNavItems } from "@/config/nav";

export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  // The header this renders next to has `backdrop-blur`, which creates a
  // new containing block for `position: fixed` descendants — without a
  // portal straight to <body>, this overlay gets trapped inside the
  // header's small box instead of covering the viewport. `document.body`
  // only exists client-side, so the portal target can't be resolved
  // during the server render — this mount flag is the standard way to
  // defer to the client for exactly that reason.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          initial={{ clipPath: "circle(0% at 90% 5%)" }}
          animate={{ clipPath: "circle(150% at 90% 5%)" }}
          exit={{ clipPath: "circle(0% at 90% 5%)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[60] flex flex-col bg-bg md:hidden"
        >
          <div className="flex h-16 items-center justify-end px-4 sm:px-6">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              data-cursor-label="close menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink"
            >
              <span className="sr-only">Close menu</span>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav
            aria-label="Primary"
            className="flex flex-1 flex-col justify-center gap-2 px-8"
          >
            {primaryNavItems.map((item, i) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={active ? "page" : undefined}
                    className={`block py-2 font-display text-4xl font-semibold tracking-tight ${
                      active ? "text-primary" : "text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
