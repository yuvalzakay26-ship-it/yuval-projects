"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

/**
 * Inline theme switch. The actual class is applied to <html> by an inline
 * script in the layout (before paint) to avoid a flash; this component just
 * reads the current state on mount, flips it, and persists to localStorage.
 *
 * It is rendered inside {@link PageToolbar} (in normal document flow) rather
 * than fixed-positioned, so it never floats over headings, screenshots or
 * cards.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  // Read the real theme only after mount so SSR and first client render match.
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      // localStorage can be unavailable (private mode) — ignore.
    }
  }

  const isDark = theme === "dark";
  // Button switches *to* the opposite theme, so label/icon describe the target.
  const label = isDark ? "מצב בהיר" : "מצב כהה";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-2 text-xs font-medium text-fg/80 shadow-sm backdrop-blur transition-colors hover:border-accent/50 hover:text-fg"
    >
      {/* Keep markup identical pre/mount; only swap the glyph once mounted. */}
      <span aria-hidden className="text-sm leading-none">
        {mounted ? (isDark ? "☀️" : "🌙") : "🌙"}
      </span>
      <span suppressHydrationWarning>{mounted ? label : "מצב בהיר"}</span>
    </button>
  );
}
