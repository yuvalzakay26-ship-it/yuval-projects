"use client";

import { useEffect, useState } from "react";

/**
 * Small floating "scroll to top" utility, mounted globally so it works on every
 * page (home, project detail, project book) without per-page wiring.
 *
 * It is purely a client-side convenience — no content, links, screenshots,
 * Project Book text, PWA behaviour or reorder/edit state are touched. The
 * button:
 *   - stays hidden while the visitor is near the top (< THRESHOLD px),
 *   - fades in once they scroll past it, and
 *   - smoothly scrolls back to the top on click.
 *
 * Placement is fixed to the start/bottom corner. The site is RTL, so the visual
 * start is the right edge; we anchor with `right` and respect mobile safe-area
 * insets so it never sits under a rounded corner or home indicator.
 *
 * Z-index is deliberately low (z-40): the full-screen reorder manager portals an
 * opaque `z-[60]` panel to <body>, so it always covers this button — no special
 * "is the modal open?" wiring is needed, and the reorder flow is untouched.
 */

/**
 * Scroll distance (px) past which the button becomes visible. Kept fairly low so
 * the control is useful on shorter pages (home, project detail) and not just on
 * very long Project Book pages.
 */
const THRESHOLD = 220;

export default function ScrollToTopButton() {
  // Render nothing until mounted so SSR and the first client render match
  // (avoids hydration mismatch). Visibility itself depends on `window`.
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);

    const update = () => setVisible(window.scrollY > THRESHOLD);

    // Sync once on mount in case the page is loaded already scrolled down
    // (e.g. browser scroll restoration on a long Project Book page).
    update();

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  if (!mounted) return null;

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="חזרה לראש הדף"
      title="חזרה לראש הדף"
      // Fixed, RTL start (right) + bottom corner, honouring safe-area insets so
      // it clears the home indicator / rounded corners on mobile. The low z-40
      // keeps it beneath the opaque reorder manager overlay (z-[60]).
      className={`fixed bottom-[max(1.5rem,calc(env(safe-area-inset-bottom)+0.75rem))] right-[max(1.5rem,calc(env(safe-area-inset-right)+0.75rem))] z-40 inline-flex h-14 w-14 items-center justify-center rounded-full border border-border bg-surface text-fg/80 shadow-lg transition-all duration-200 hover:border-accent/50 hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg active:scale-95 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      {/* Icon-only round control; the accessible label lives on the button. */}
      <span aria-hidden className="text-2xl leading-none">
        ↑
      </span>
    </button>
  );
}
