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
 * controls. Edit mode turns on when any of three things is true:
 *   1. the URL opts in this visit (`?edit=1`), which also persists a flag;
 *   2. that flag was persisted by an earlier `?edit=1` visit; or
 *   3. the page is running as an installed / standalone PWA.
 * The standalone branch is what makes the controls available straight from the
 * phone home-screen icon — an installed PWA launches at the manifest
 * `start_url` (`/`) with no query string, so the URL alone can't be relied on.
 * Normal browser tabs are never standalone, so plain-website visitors stay
 * clean. The custom order also lives entirely in this browser's localStorage.
 * The owner can additionally pin the current order as a per-device "default"
 * (also local only); "איפוס סדר" then restores that default instead of the code
 * order. The canonical public order always remains the array in `lib/projects.ts`.
 *
 * State lives here (rather than inside the grid) so that the header menu
 * button, the reorder panel and the grid can all read and mutate the same
 * order without prop-drilling across the page tree.
 */

/** Bump the suffix if the stored shape ever changes. */
const ORDER_KEY = "yuval-projects:project-order:v1";
/**
 * Per-device "default" order. This is the owner's own baseline on this browser:
 * "איפוס סדר" restores *this* order rather than the code order, when present.
 * Saved separately from {@link ORDER_KEY} so the active order and the saved
 * default are independent — saving a default never disturbs the active order,
 * and resetting the active order never disturbs the saved default. Still a
 * purely local convenience: the canonical public order remains the array in
 * `lib/projects.ts`, which the client never touches.
 */
const DEFAULT_ORDER_KEY = "yuval-projects:project-default-order:v1";
/**
 * Persisted "edit mode is on in this browser" flag. Kept separate from the
 * order key so turning edit mode off never disturbs a saved custom order.
 */
const EDIT_MODE_KEY = "yuval-projects:edit-mode:v1";

/**
 * True when the page is running as an installed / standalone PWA rather than in
 * a normal browser tab. Covers the standard `display-mode: standalone` media
 * query plus iOS Safari's non-standard `navigator.standalone`. Always called
 * after mount, so `window` is guaranteed to exist; still fully guarded so a
 * missing `matchMedia` (very old browsers) degrades to "not standalone".
 */
function isStandalone(): boolean {
  try {
    const mql = window.matchMedia?.("(display-mode: standalone)");
    if (mql?.matches) return true;
    // iOS Safari home-screen apps: non-standard boolean, typed loosely.
    if (
      (window.navigator as Navigator & { standalone?: boolean }).standalone ===
      true
    ) {
      return true;
    }
  } catch {
    // Any access failure → treat as a normal browser tab.
  }
  return false;
}

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

/**
 * Read the saved per-device default order as a clean slug list, or `null` if
 * none is saved / the stored value is missing, corrupt or empty. Shared by the
 * mount effect and {@link ReorderProvider.reset} so both agree on what "a valid
 * local default exists" means.
 */
function readDefaultSlugs(): string[] | null {
  try {
    const raw = localStorage.getItem(DEFAULT_ORDER_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    const slugs = parsed.filter((s): s is string => typeof s === "string");
    return slugs.length > 0 ? slugs : null;
  } catch {
    // Unavailable storage (private mode) or corrupt JSON — treat as "no default".
    return null;
  }
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
  /**
   * Move the project from `fromIndex` to `toIndex`, shifting the rest. Used by
   * drag-and-drop, where a row can jump several positions in one gesture.
   */
  reorder: (fromIndex: number, toIndex: number) => void;
  /**
   * Reset the active order. If a per-device default has been saved, restore
   * that; otherwise fall back to the original order from `lib/projects.ts`.
   */
  reset: () => void;
  /**
   * Save the current active order as this device's default. The active order
   * itself is left untouched.
   */
  setAsDefault: () => void;
  /**
   * Forget the per-device default *and* the active order, restoring the
   * original order from `lib/projects.ts`.
   */
  resetToOriginal: () => void;
  /** True when a per-device default order is currently saved. */
  hasDefault: boolean;
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
  // Whether a per-device default order is currently saved. Drives the optional
  // "restore original" control in the UI. Applied after mount like the order.
  const [hasDefault, setHasDefault] = useState(false);

  useEffect(() => {
    // Edit mode is active if ANY of these hold:
    //   - the URL opts in this visit (`?edit=1`),
    //   - it was persisted by an earlier `?edit=1` visit, or
    //   - the app is running as an installed/standalone PWA.
    //
    // The standalone branch is what makes edit controls available straight from
    // the phone home-screen icon: an installed PWA launches at the manifest
    // `start_url` (`/`) with no query string, so we detect the standalone
    // display mode instead of relying on the URL. Normal browser tabs are never
    // standalone, so plain-website visitors stay clean.
    const params = new URLSearchParams(window.location.search);
    const urlOptIn = params.get("edit") === "1";

    let persisted = false;
    try {
      persisted = localStorage.getItem(EDIT_MODE_KEY) === "1";
    } catch {
      // Storage unavailable (private mode) — fall back to URL-only this session.
    }

    const standalone = isStandalone();

    if (urlOptIn && !persisted) {
      try {
        localStorage.setItem(EDIT_MODE_KEY, "1");
      } catch {
        // Ignore — edit mode still works for this session via the URL flag.
      }
    }

    setEditMode(urlOptIn || persisted || standalone);

    setHasDefault(readDefaultSlugs() !== null);

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

  const reorder = useCallback((fromIndex: number, toIndex: number) => {
    setOrder((current) => {
      if (
        fromIndex === toIndex ||
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= current.length ||
        toIndex >= current.length
      ) {
        return current;
      }
      const next = current.slice();
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
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
    // Prefer a saved per-device default; only fall back to the code order when
    // none exists. When restoring a default we persist it as the active order
    // too, so a refresh keeps showing it.
    const defaultSlugs = readDefaultSlugs();
    if (defaultSlugs) {
      const next = orderFromSlugs(defaultSlugs, projects);
      try {
        localStorage.setItem(
          ORDER_KEY,
          JSON.stringify(next.map((p) => p.slug)),
        );
      } catch {
        // Ignore storage failures — the in-memory order still updates.
      }
      setOrder(next);
      return;
    }

    try {
      localStorage.removeItem(ORDER_KEY);
    } catch {
      // Ignore — we still restore the original order in memory below.
    }
    setOrder(projects);
  }, [projects]);

  const setAsDefault = useCallback(() => {
    // Snapshot the *current* active order into the default slot, leaving the
    // active order untouched. Read it via the functional updater to avoid a
    // stale closure over `order`.
    setOrder((current) => {
      try {
        localStorage.setItem(
          DEFAULT_ORDER_KEY,
          JSON.stringify(current.map((p) => p.slug)),
        );
        setHasDefault(true);
      } catch {
        // Storage unavailable (private mode) — nothing saved, order unchanged.
      }
      return current;
    });
  }, []);

  const resetToOriginal = useCallback(() => {
    // Forget both the saved default and the active order, returning to the
    // canonical code order from `lib/projects.ts`.
    try {
      localStorage.removeItem(DEFAULT_ORDER_KEY);
      localStorage.removeItem(ORDER_KEY);
    } catch {
      // Ignore — we still restore the original order in memory below.
    }
    setHasDefault(false);
    setOrder(projects);
  }, [projects]);

  const value = useMemo<ReorderContextValue>(
    () => ({
      order,
      editMode,
      move,
      reorder,
      reset,
      setAsDefault,
      resetToOriginal,
      hasDefault,
    }),
    [
      order,
      editMode,
      move,
      reorder,
      reset,
      setAsDefault,
      resetToOriginal,
      hasDefault,
    ],
  );

  return (
    <ReorderContext.Provider value={value}>{children}</ReorderContext.Provider>
  );
}
