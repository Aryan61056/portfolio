"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { primaryNavItems } from "@/config/nav";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { MobileNav } from "@/components/layout/mobile-nav";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduced = useReducedMotion();
  const isHome = pathname === "/";

  return (
    <header
      className={`top-0 z-40 ${
        // On the home page the header floats transparently over the hero's
        // own top padding (exactly as tall as this header) instead of
        // pushing it down, so the hero's background glow shows straight
        // through behind the nav instead of stopping at an opaque bar.
        isHome
          ? "fixed inset-x-0 bg-bg/10 backdrop-blur-sm"
          : "sticky border-b border-border bg-bg/85 backdrop-blur"
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-4 focus-visible:top-4 focus-visible:z-50 focus-visible:rounded-full focus-visible:bg-primary focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-semibold focus-visible:text-primary-ink"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          data-cursor-label="home base"
          className={`font-mono text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:text-primary ${
            // The hero's own giant "Aryan Patel" h1 sits right below the
            // header on mobile home — showing the name again in the corner
            // reads as redundant clutter, so it's skipped there (kept from
            // sm up, where there's enough width for it not to feel doubled).
            isHome ? "invisible sm:visible" : ""
          }`}
        >
          {siteConfig.name}
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 md:flex"
        >
          {primaryNavItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                data-cursor-label={`${item.label.toLowerCase()}, ${active ? "you're here" : "let's go"}`}
                aria-current={active ? "page" : undefined}
                className={`nav-link relative rounded-full px-3 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors ${
                  active ? "text-primary" : "text-muted hover:text-ink"
                }`}
              >
                <motion.span
                  className="nav-label inline-block"
                  whileHover={reduced ? undefined : { rotate: -6, y: -1 }}
                  transition={{ type: "spring", stiffness: 450, damping: 12 }}
                >
                  {item.label}
                </motion.span>
                {active && (
                  <span className="absolute inset-x-3 -bottom-px h-px bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            data-cursor-label="open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-ink shadow-ambient md:hidden"
          >
            <span className="sr-only">Open menu</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
