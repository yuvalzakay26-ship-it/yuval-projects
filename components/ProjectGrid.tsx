"use client";

import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/lib/projects";

/**
 * Home-page project grid with an optional, local-only reordering tool.
 *
 * This is purely a browser convenience for the site owner — there is no
 * database, auth, admin or CMS involved. Normal visitors never see any
 * controls: edit mode is opt-in via the `?edit=1` query string only, and the
 * custom order lives entirely in this browser's localStorage. The canonical
 * order always remains the array in `lib/projects.ts`.
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

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  // First render must match SSR: default order, no edit controls. Everything
  // browser-specific (URL flag + saved order) is applied after mount.
  const [order, setOrder] = useState<Project[]>(projects);
  const [editMode, setEditMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

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

  function persist(next: Project[]) {
    setOrder(next);
    try {
      localStorage.setItem(
        ORDER_KEY,
        JSON.stringify(next.map((p) => p.slug)),
      );
    } catch {
      // Ignore storage failures — the visual order still updates this session.
    }
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= order.length) return;
    const next = order.slice();
    [next[index], next[target]] = [next[target], next[index]];
    persist(next);
  }

  function resetOrder() {
    try {
      localStorage.removeItem(ORDER_KEY);
    } catch {
      // Ignore — we still restore the default order in memory below.
    }
    setOrder(projects);
  }

  const showControls = mounted && editMode;

  return (
    <>
      {showControls && (
        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-border bg-surface/80 p-4 backdrop-blur sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
            <span className="inline-flex items-center gap-2 text-base font-semibold text-fg">
              <span className="h-2 w-2 rounded-full bg-accent" />
              סידור פרויקטים
            </span>
            <button
              type="button"
              onClick={resetOrder}
              className="inline-flex min-h-[44px] items-center rounded-xl border border-border bg-surface px-4 text-sm font-medium text-fg/70 shadow-sm transition-colors hover:border-accent/50 hover:text-fg active:scale-95"
            >
              איפוס סדר
            </button>
          </div>
          <p className="text-sm leading-relaxed text-fg/50">
            מצב סידור מקומי — הסדר נשמר בדפדפן הזה בלבד.
          </p>
        </div>
      )}

      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {order.map((project, index) => (
          <div key={project.slug} className="flex flex-col gap-2">
            {showControls && (
              <div className="flex items-center gap-3 rounded-xl border border-border bg-surface-2/60 p-2 pr-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm font-medium text-fg/75">
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
              </div>
            )}
            <ProjectCard project={project} />
          </div>
        ))}
      </section>
    </>
  );
}
