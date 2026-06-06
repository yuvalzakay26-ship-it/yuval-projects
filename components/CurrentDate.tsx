"use client";

import { useEffect, useState } from "react";

/** Formats "today" in natural Hebrew, e.g. "יום שבת, 6 ביוני 2026". */
function formatHebrewDate(date: Date): string {
  return new Intl.DateTimeFormat("he-IL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/**
 * Client-only current date, shown as small muted text in {@link PageToolbar}.
 *
 * The date is computed from `new Date()` only *after* mount (in an effect), so
 * the server-rendered / static HTML and the first client render are identical
 * (empty) — this avoids both a hydration mismatch and a stale build-time date
 * being baked into the exported HTML. A reserved-height placeholder keeps the
 * header from shifting when the date appears.
 */
export default function CurrentDate({
  className = "",
}: {
  className?: string;
}) {
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    setToday(formatHebrewDate(new Date()));
  }, []);

  return (
    <time
      // No dateTime until mounted — keeps SSR/CSR markup matched.
      suppressHydrationWarning
      className={`block text-xs leading-none text-fg/45 ${className}`}
      // Reserve a line of height so the toolbar doesn't jump once the date sets.
      style={{ minHeight: "1rem" }}
    >
      {today ?? " "}
    </time>
  );
}
