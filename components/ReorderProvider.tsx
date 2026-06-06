"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Project } from "@/lib/projects";

/**
 * Local-only project reordering, shared across the home page.
 *
 * This is purely a browser convenience for the site owner — there is no
 * database, auth, admin or CMS involved. Normal visitors never see any
 * controls. Edit mode is opt-in: visiting `?edit=1` once activates it and
 * persists a flag in this browser's localStorage, so it keeps working on plain
 * `/` visits afterwards — including inside the installed PWA, which always
 * launches at the manifest `start_url` (`/`) without the query string. The
 * custom order also lives entirely in this browser's localStorage. The
 * canonical order always remains the array in `lib/projects.ts`.
 *
 * State lives here (rather than inside the grid) so that the header menu
 * button, the reorder panel and the grid can all read and mutate the same
 * order without prop-drilling across the page tree.
 */

/** Bump the suffix if the stored shape ever changes. */
const ORDER_KEY = "yuval-projects:project-order:v1";
/**
 * Persisted "edit mode is on in this browser" flag. Kept separate from the
 * order key so turning edit mode off never disturbs a saved custom order.
 */
const EDIT_MODE_KEY = "yuval-projects:edit-mode:v1";

/**
 * Build the display order from a list of saved slugs, recovering gracefully:
 *   - keep known saved slugs in their saved order
 *   - append any projects not present in the saved list (new projects)
 *   - ignore unknown / old slugs that no longer exist
 */
function orderFromSlugs(savedSlugs: string[], projects: Project[]): Project[] {
  const bySlug = new Map(projects.map((p) => [p.slug, p]));
  const seen = new Set<string>();
  const ordered: Project[] = [];

  for (const slug of savedSlugs) {
    const project = bySlug.get(slug);
    if (project && !seen.has(slug)) {
      ordered.push(project);
      seen.add(slug);
    }
  }
  for (const project of projects) {
    if (!seen.has(project.slug)) ordered.push(project);
  }
  return ordered;
}

interface ReorderContextValue {
  /** Projects in the current display order. */
  order: Project[];
  /**
   * True after mount when edit mode is active — either because `?edit=1` is in
   * the URL, or because it was persisted from an earlier `?edit=1` visit.
   */
  editMode: boolean;
  /** Move the project at `index` up (-1) or down (+1). */
  move: (index: number, direction: -1 | 1) => void;
  /** Clear the saved order and restore the default from `lib/projects.ts`. */
  reset: () => void;
  /**
   * Turn edit mode off for this browser: remove the persisted flag and hide all
   * edit controls immediately. Leaves any saved custom order untouched.
   */
  disableEditMode: () => void;
}

const ReorderContext = createContext<ReorderContextValue | null>(null);

export function useReorder(): ReorderContextValue {
  const ctx = useContext(ReorderContext);
  if (!ctx) {
    throw new Error("useReorder must be used within a ReorderProvider");
  }
  return ctx;
}

interface ReorderProviderProps {
  projects: Project[];
  children: React.ReactNode;
}

export default function ReorderProvider({
  projects,
  children,
}: ReorderProviderProps) {
  // First render must match SSR: default order, no edit controls. Everything
  // browser-specific (URL flag + saved order) is applied after mount.
  const [order, setOrder] = useState<Project[]>(projects);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Edit mode is active if the URL opts in this visit, OR it was persisted by
    // an earlier `?edit=1` visit. Opting in via the URL also persists the flag
    // so plain `/` visits (and the installed PWA, which always starts at `/`)
    // keep showing the controls.
    const params = new URLSearchParams(window.location.search);
    const urlOptIn = params.get("edit") === "1";

    let persisted = false;
    try {
      persisted = localStorage.getItem(EDIT_MODE_KEY) === "1";
    } catch {
      // Storage unavailable (private mode) — fall back to URL-only this session.
    }

    if (urlOptIn && !persisted) {
      try {
        localStorage.setItem(EDIT_MODE_KEY, "1");
      } catch {
        // Ignore — edit mode still works for this session via the URL flag.
      }
    }

    setEditMode(urlOptIn || persisted);

    try {
      const raw = localStorage.getItem(ORDER_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          const slugs = parsed.filter(
            (s): s is string => typeof s === "string",
          );
          setOrder(orderFromSlugs(slugs, projects));
        }
      }
    } catch {
      // Corrupt JSON or unavailable storage (private mode) — fall back to default.
    }
  }, [projects]);

  const move = useCallback((index: number, direction: -1 | 1) => {
    setOrder((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.length) return current;
      const next = current.slice();
      [next[index], next[target]] = [next[target], next[index]];
      try {
        localStorage.setItem(
          ORDER_KEY,
          JSON.stringify(next.map((p) => p.slug)),
        );
      } catch {
        // Ignore storage failures — the visual order still updates this session.
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(ORDER_KEY);
    } catch {
      // Ignore — we still restore the default order in memory below.
    }
    setOrder(projects);
  }, [projects]);

  const disableEditMode = useCallback(() => {
    try {
      // Only the edit-mode flag — never the order key, so a saved custom order
      // survives turning edit mode off (and reappears if it's switched on again).
      localStorage.removeItem(EDIT_MODE_KEY);
    } catch {
      // Ignore — we still drop out of edit mode in memory below.
    }
    setEditMode(false);
  }, []);

  const value = useMemo<ReorderContextValue>(
    () => ({ order, editMode, move, reset, disableEditMode }),
    [order, editMode, move, reset, disableEditMode],
  );

  return (
    <ReorderContext.Provider value={value}>{children}</ReorderContext.Provider>
  );
}
