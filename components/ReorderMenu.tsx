"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ProjectStatus } from "@/lib/projects";
import { useReorder } from "./ReorderProvider";

/**
 * Edit-mode entry point, rendered as a circular app-control inside the header
 * (next to the theme toggle) — but only when local edit mode is active. It is
 * invisible to normal visitors.
 *
 * Tapping it opens a tiny dropdown menu. "סידור פרויקטים" opens a full-screen
 * reorder manager (not a bottom sheet — that collapsed unreliably on mobile);
 * "הסתר כלי עריכה" hides the edit tools for the session. No reorder controls
 * ever appear on the project cards themselves.
 */

/** Short, muted status label shown next to each row's title. */
const STATUS_LABEL: Record<ProjectStatus, string> = {
  live: "באוויר",
  "in-progress": "בפיתוח",
  concept: "קונספט",
};

export default function ReorderMenu() {
  const { editMode, order, move, reset, disableEditMode } = useReorder();
  const [menuOpen, setMenuOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close the dropdown on outside click or Escape.
  useEffect(() => {
    if (!menuOpen) return;

    function onPointerDown(e: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  // Lock background scroll and support Escape while the manager is open.
  useEffect(() => {
    if (!panelOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setPanelOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [panelOpen]);

  // Normal visitors (and the server / first client render) get nothing.
  if (!editMode) return null;

  return (
    <>
      <div ref={menuRef} className="relative">
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          aria-label="תפריט עריכה"
          title="תפריט עריכה"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-fg/80 shadow-sm transition-colors hover:border-accent/60 hover:text-fg active:scale-95"
        >
          {/* kebab / "more" glyph */}
          <span aria-hidden className="text-lg leading-none">
            ⋮
          </span>
        </button>

        {menuOpen && (
          <div
            role="menu"
            className="absolute left-0 top-12 z-50 min-w-[12rem] overflow-hidden rounded-xl border border-border bg-surface shadow-lg"
          >
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setMenuOpen(false);
                setPanelOpen(true);
              }}
              className="flex w-full items-center gap-2 px-4 py-3 text-right text-sm font-medium text-fg/80 transition-colors hover:bg-surface-2 hover:text-fg"
            >
              <span aria-hidden className="text-base leading-none">
                ☰
              </span>
              סידור פרויקטים
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                // Hide the edit tools for the session. The saved project order
                // is intentionally left untouched.
                setMenuOpen(false);
                setPanelOpen(false);
                disableEditMode();
              }}
              className="flex w-full items-center gap-2 border-t border-border px-4 py-2.5 text-right text-xs font-medium text-fg/50 transition-colors hover:bg-surface-2 hover:text-fg/80"
            >
              <span aria-hidden className="text-sm leading-none">
                ✕
              </span>
              הסתר כלי עריכה
            </button>
          </div>
        )}
      </div>

      {/*
        Portal to <body>: the header uses `backdrop-blur`, which creates its own
        stacking context. A `fixed z-[60]` overlay rendered inside the header
        would be trapped in that context and end up *below* the project grid that
        follows the header in the DOM (its click targets would be intercepted by
        the cards behind it). Portaling to <body> lets the full-screen manager
        sit above everything regardless of where this menu lives in the tree.
        `panelOpen` only flips true on a user click, so this runs client-side
        where `document.body` is guaranteed to exist.
      */}
      {panelOpen &&
        createPortal(
          <div
            // Full-screen manager. `100dvh` (with a `100vh` fallback) keeps it
            // exactly viewport-tall on mobile despite the dynamic browser
            // toolbar, so the list never gets squeezed off-screen like the old
            // sheet did.
            className="fixed inset-0 z-[60] flex h-screen max-h-[100dvh] w-screen flex-col bg-surface"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reorder-panel-title"
          >
          {/* Header (fixed at top, never scrolls) */}
          <div className="flex shrink-0 flex-col gap-2 border-b border-border px-5 pb-4 pt-[max(1rem,env(safe-area-inset-top))]">
            <div className="flex items-start justify-between gap-3">
              <h2
                id="reorder-panel-title"
                className="inline-flex items-center gap-2 text-base font-semibold text-fg"
              >
                <span className="h-2 w-2 rounded-full bg-accent" />
                סידור פרויקטים
              </h2>
              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                className="inline-flex min-h-[40px] shrink-0 items-center rounded-lg border border-border bg-surface px-3 text-sm font-medium text-fg/70 shadow-sm transition-colors hover:border-accent/50 hover:text-fg active:scale-95"
              >
                סגור
              </button>
            </div>
            <p className="text-sm leading-relaxed text-fg/50">
              הסדר נשמר במכשיר הזה בלבד. אם תרצה להפוך אותו לסדר הקבוע באתר,
              נעדכן אחר כך את קובץ הפרויקטים.
            </p>
          </div>

          {/* Project rows — the only scrolling region. `min-h-0` lets this
              flex child actually shrink and scroll inside the flex column. */}
          <ul className="min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain px-4 py-4">
            {order.map((project, index) => (
              <li
                key={project.slug}
                className="flex items-center gap-3 rounded-xl border border-border bg-surface-2/60 p-2 pr-3"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                  {index + 1}
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="truncate text-sm font-medium text-fg/80">
                    {project.title}
                  </span>
                  <span className="truncate text-xs text-fg/40">
                    {STATUS_LABEL[project.status]}
                  </span>
                </span>
                <div className="flex shrink-0 items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    aria-label={`הזז את ${project.title} למעלה`}
                    title="למעלה"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface text-lg text-fg/80 shadow-sm transition-colors hover:border-accent/50 hover:text-fg active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 disabled:shadow-none disabled:hover:border-border disabled:hover:text-fg/80"
                  >
                    <span aria-hidden>↑</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => move(index, 1)}
                    disabled={index === order.length - 1}
                    aria-label={`הזז את ${project.title} למטה`}
                    title="למטה"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-surface text-lg text-fg/80 shadow-sm transition-colors hover:border-accent/50 hover:text-fg active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 disabled:shadow-none disabled:hover:border-border disabled:hover:text-fg/80"
                  >
                    <span aria-hidden>↓</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Footer actions (fixed at bottom, never scrolls) */}
          <div className="flex shrink-0 items-center justify-between gap-3 border-t border-border px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-[44px] items-center rounded-xl border border-border bg-surface px-4 text-sm font-medium text-fg/70 shadow-sm transition-colors hover:border-accent/50 hover:text-fg active:scale-95"
            >
              איפוס סדר
            </button>
            <button
              type="button"
              onClick={() => setPanelOpen(false)}
              className="inline-flex min-h-[44px] items-center rounded-xl bg-accent px-5 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-90 active:scale-95"
            >
              סגור
            </button>
          </div>
          </div>,
          document.body,
        )}
    </>
  );
}
