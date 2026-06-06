"use client";

import { useEffect, useRef, useState } from "react";
import { useReorder } from "./ReorderProvider";

/**
 * Edit-mode entry point, rendered as a circular app-control inside the header
 * (next to the theme toggle) — but only when local edit mode is active
 * (`?edit=1`). It is invisible to normal visitors.
 *
 * Tapping it opens a tiny dropdown menu whose single option, "סידור פרויקטים",
 * opens a mobile bottom sheet for reordering. No reorder controls ever appear
 * on the project cards themselves.
 */
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

  // Lock background scroll and support Escape while the bottom sheet is open.
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
                // Close everything and drop out of edit mode immediately. The
                // saved project order is intentionally left untouched.
                setMenuOpen(false);
                setPanelOpen(false);
                disableEditMode();
              }}
              className="flex w-full items-center gap-2 border-t border-border px-4 py-3 text-right text-sm font-medium text-fg/60 transition-colors hover:bg-surface-2 hover:text-fg"
            >
              <span aria-hidden className="text-base leading-none">
                ✕
              </span>
              כבה מצב עריכה
            </button>
          </div>
        )}
      </div>

      {panelOpen && (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-labelledby="reorder-panel-title">
          {/* Backdrop */}
          <button
            type="button"
            aria-label="סגור"
            onClick={() => setPanelOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-black/50 backdrop-blur-sm"
          />

          {/* Bottom sheet */}
          <div className="absolute inset-x-0 bottom-0 mx-auto flex max-h-[85vh] w-full max-w-lg flex-col rounded-t-2xl border border-border bg-surface shadow-2xl">
            <div className="flex flex-col gap-2 border-b border-border px-5 pb-4 pt-4">
              {/* Grab handle */}
              <span
                aria-hidden
                className="mx-auto mb-1 h-1.5 w-10 rounded-full bg-fg/15"
              />
              <div className="flex items-center justify-between gap-3">
                <h2
                  id="reorder-panel-title"
                  className="inline-flex items-center gap-2 text-base font-semibold text-fg"
                >
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  סידור פרויקטים
                </h2>
              </div>
              <p className="text-sm leading-relaxed text-fg/50">
                הסדר נשמר בדפדפן הזה בלבד. אם תרצה להפוך אותו לסדר הקבוע באתר,
                נעדכן אחר כך את קובץ הפרויקטים.
              </p>
            </div>

            {/* Project rows */}
            <ul className="flex-1 space-y-2 overflow-y-auto overscroll-contain px-4 py-4">
              {order.map((project, index) => (
                <li
                  key={project.slug}
                  className="flex items-center gap-3 rounded-xl border border-border bg-surface-2/60 p-2 pr-3"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm font-medium text-fg/80">
                    {project.title}
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

            {/* Actions */}
            <div className="flex items-center justify-between gap-3 border-t border-border px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
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
          </div>
        </div>
      )}
    </>
  );
}
