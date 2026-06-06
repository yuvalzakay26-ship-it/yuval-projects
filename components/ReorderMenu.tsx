"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Project, ProjectStatus } from "@/lib/projects";
import { useReorder } from "./ReorderProvider";

/**
 * Edit-mode entry point, rendered as a circular app-control inside the header
 * (next to the theme toggle) — but only when local edit mode is active. It is
 * invisible to normal visitors.
 *
 * Tapping it opens a tiny dropdown menu. "סידור פרויקטים" opens a full-screen
 * reorder manager (not a bottom sheet — that collapsed unreliably on mobile).
 * No reorder controls ever appear on the project cards themselves.
 */

/** Short, muted status label shown next to each row's title. */
const STATUS_LABEL: Record<ProjectStatus, string> = {
  live: "באוויר",
  "in-progress": "בפיתוח",
  concept: "קונספט",
};

/** Grip glyph that marks a row as draggable. */
function GripIcon() {
  return (
    <span
      aria-hidden
      className="text-lg leading-none text-fg/40 transition-colors group-hover:text-fg/60"
    >
      ☰
    </span>
  );
}

/**
 * The visual content of a reorder row, shared between the live sortable row and
 * the floating {@link DragOverlay} clone so the dragged item looks identical to
 * the one it left behind.
 */
function RowInner({
  project,
  index,
  dragHandleProps,
}: {
  project: Project;
  index: number;
  dragHandleProps?: React.HTMLAttributes<HTMLButtonElement>;
}) {
  return (
    <>
      {/* Drag handle — large touch target, the only reorder control. */}
      <button
        type="button"
        // `touch-none` stops the browser from claiming the gesture as a scroll
        // so the pointer/touch sensors can start a drag on mobile.
        className="inline-flex h-11 w-9 shrink-0 cursor-grab touch-none items-center justify-center rounded-lg text-fg/40 transition-colors hover:bg-surface hover:text-fg/70 active:cursor-grabbing"
        aria-label={`גרור כדי לשנות את מיקום ${project.title}`}
        title="גרור לשינוי הסדר"
        {...dragHandleProps}
      >
        <GripIcon />
      </button>

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
    </>
  );
}

/** A single draggable, sortable project row. */
function SortableProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.slug });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      // While this row is the drag source it's hidden under the floating
      // overlay clone, so drop its opacity to leave a clean gap.
      className={`group flex touch-pan-y items-center gap-2 rounded-xl border bg-surface-2/60 p-2 pr-2 ${
        isDragging
          ? "border-accent/60 opacity-40"
          : "border-border"
      }`}
    >
      <RowInner
        project={project}
        index={index}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </li>
  );
}

export default function ReorderMenu() {
  const { editMode, order, reorder, reset } = useReorder();
  const [menuOpen, setMenuOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Sensors tuned for both desktop mouse and mobile touch. The small
  // pointer/touch activation distances/delays let a tap-and-scroll stay a
  // scroll while a deliberate press-drag on the handle starts a reorder.
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 120, tolerance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveSlug(String(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveSlug(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const from = order.findIndex((p) => p.slug === active.id);
    const to = order.findIndex((p) => p.slug === over.id);
    if (from === -1 || to === -1) return;
    reorder(from, to);
  }

  const activeProject = activeSlug
    ? order.find((p) => p.slug === activeSlug)
    : null;
  const activeIndex = activeSlug
    ? order.findIndex((p) => p.slug === activeSlug)
    : -1;

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
              flex child actually shrink and scroll inside the flex column.
              Drag-and-drop is the primary interaction; the up/down buttons in
              each row stay as an accessible fallback. */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={() => setActiveSlug(null)}
          >
            <SortableContext
              items={order.map((p) => p.slug)}
              strategy={verticalListSortingStrategy}
            >
              <ul className="min-h-0 flex-1 select-none space-y-2 overflow-y-auto overscroll-contain px-4 py-4">
                {order.map((project, index) => (
                  <SortableProjectRow
                    key={project.slug}
                    project={project}
                    index={index}
                  />
                ))}
              </ul>
            </SortableContext>

            {/* Floating clone shown under the pointer/finger while dragging —
                gives the lift/shadow/accent active state. */}
            {createPortal(
              <DragOverlay>
                {activeProject ? (
                  <ul className="select-none">
                    <li className="flex scale-[1.02] items-center gap-2 rounded-xl border border-accent bg-surface-2 p-2 pr-2 shadow-2xl ring-1 ring-accent/40">
                      <RowInner
                        project={activeProject}
                        index={activeIndex}
                      />
                    </li>
                  </ul>
                ) : null}
              </DragOverlay>,
              document.body,
            )}
          </DndContext>

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
