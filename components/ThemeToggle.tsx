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
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-fg/80 shadow-sm transition-colors hover:border-accent/50 hover:text-fg active:scale-95"
    >
      {/* Icon-only, round app-control. Keep glyph identical pre/mount; only
          swap once mounted so SSR and first client render match. The text
          label stays accessible via aria-label / title. */}
      <span aria-hidden className="text-base leading-none">
        {mounted ? (isDark ? "☀️" : "🌙") : "🌙"}
      </span>
    </button>
  );
}
