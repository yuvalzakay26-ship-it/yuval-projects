import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/projects";
import TechBadge from "./TechBadge";
import StatusBadge from "./StatusBadge";

interface ProjectCardProps {
  project: Project;
}

// Keep cards from turning into a messy block of tech tags: show a handful on
// the card and summarise the rest with a "+N" pill. The full list still appears
// on the project detail page.
const MAX_VISIBLE_TECH = 4;

export default function ProjectCard({ project }: ProjectCardProps) {
  const visibleTech = project.techStack.slice(0, MAX_VISIBLE_TECH);
  const hiddenCount = project.techStack.length - visibleTech.length;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5">
      {/* Project screenshot — fixed aspect ratio for a consistent grid */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-surface-2 to-bg">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {/* Soft top gradient so the status badge always stays readable */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/25 to-transparent" />
        <div className="absolute right-3 top-3">
          <StatusBadge status={project.status} />
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-fg">{project.title}</h2>
          <p className="text-sm leading-relaxed text-fg/60">
            {project.shortDescription}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {visibleTech.map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
          {hiddenCount > 0 && (
            <span
              dir="ltr"
              className="inline-flex items-center rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-medium text-fg/50"
            >
              +{hiddenCount}
            </span>
          )}
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-90 hover:shadow-md hover:shadow-accent/20"
        >
          צפה בפרויקט
          <span aria-hidden>←</span>
        </Link>
      </div>
    </article>
  );
}
