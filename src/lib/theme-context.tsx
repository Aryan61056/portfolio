"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { STORAGE_KEY } from "@/lib/theme-script";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  /** Pass the triggering pointer event so the reveal wipe originates there. */
  toggleTheme: (origin?: { x: number; y: number }) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const transitionInFlight = useRef(false);

  useEffect(() => {
    // Reads the value the pre-hydration script (themeInitScript) already
    // wrote to the DOM from localStorage, so React's state matches what's
    // already painted. That script runs before hydration specifically to
    // avoid a flash of the wrong theme, which means this value can't be
    // known during the initial render — only after mount.
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "dark" || current === "light") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(current);
    }
  }, []);

  const applyTheme = useCallback((next: Theme) => {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode, disabled cookies) —
      // the toggle still works for the session, it just won't persist.
    }
    setTheme(next);
  }, []);

  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) => {
      // A transition already in flight can't be interrupted by another
      // startViewTransition() call — the browser throws InvalidStateError.
      // Ignore rapid re-clicks instead of racing it.
      if (transitionInFlight.current) return;

      const next = theme === "dark" ? "light" : "dark";
      const root = document.documentElement;

      if (origin) {
        root.style.setProperty("--vt-x", `${origin.x}px`);
        root.style.setProperty("--vt-y", `${origin.y}px`);
      }

      if (!document.startViewTransition || prefersReducedMotion()) {
        applyTheme(next);
        return;
      }

      transitionInFlight.current = true;
      root.classList.add("theme-transition");
      const transition = document.startViewTransition(() => applyTheme(next));

      // The ViewTransition object exposes three promises (ready, finished,
      // updateCallbackDone) and each can reject independently — e.g. if the
      // tab is backgrounded mid-flight. The DOM update already happened
      // synchronously inside the callback above regardless of whether the
      // animation itself succeeds, so there's nothing to recover in any of
      // these cases; they just need a catch so a rejection on any one of
      // them doesn't surface as an unhandled promise rejection.
      const noop = () => {};
      transition.ready.catch(noop);
      transition.updateCallbackDone.catch(noop);
      transition.finished.catch(noop).finally(() => {
        transitionInFlight.current = false;
        root.classList.remove("theme-transition");
      });
    },
    [theme, applyTheme]
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
