"use client";

import ProjectCard from "./ProjectCard";
import { useReorder } from "./ReorderProvider";

/**
 * Home-page project grid.
 *
 * The grid simply renders the projects in whatever order the shared
 * {@link useReorder} context provides. Reordering itself happens in the
 * header's edit menu / bottom sheet ({@link ReorderMenu}) — there are no
 * controls on the cards. Normal visitors always see the default order with a
 * perfectly clean grid; edit mode only swaps the order, never the card chrome.
 */
export default function ProjectGrid() {
  const { order, editMode } = useReorder();

  return (
    <section
      // A subtle accent ring is the only hint that local edit mode is active;
      // the cards themselves stay identical to normal mode.
      className={
        editMode
          ? "grid grid-cols-1 gap-5 rounded-2xl p-2 ring-1 ring-accent/30 sm:grid-cols-2"
          : "grid grid-cols-1 gap-5 sm:grid-cols-2"
      }
    >
      {order.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </section>
  );
}
