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
 * controls: edit mode is opt-in via the `?edit=1` query string only, and the
 * custom order lives entirely in this browser's localStorage. The canonical
 * order always remains the array in `lib/projects.ts`.
 *
 * State lives here (rather than inside the grid) so that the header menu
 * button, the reorder panel and the grid can all read and mutate the same
 * order without prop-drilling across the page tree.
 */

/** Bump the suffix if the stored shape ever changes. */
const ORDER_KEY = "yuval-projects:project-order:v1";

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
  /** True only after mount when `?edit=1` is present in the URL. */
  editMode: boolean;
  /** Move the project at `index` up (-1) or down (+1). */
  move: (index: number, direction: -1 | 1) => void;
  /** Clear the saved order and restore the default from `lib/projects.ts`. */
  reset: () => void;
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
    const params = new URLSearchParams(window.location.search);
    setEditMode(params.get("edit") === "1");

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

  const value = useMemo<ReorderContextValue>(
    () => ({ order, editMode, move, reset }),
    [order, editMode, move, reset],
  );

  return (
    <ReorderContext.Provider value={value}>{children}</ReorderContext.Provider>
  );
}
