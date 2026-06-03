import Link from "next/link";
import type { Project } from "@/lib/projects";
import TechBadge from "./TechBadge";
import StatusBadge from "./StatusBadge";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent/50">
      {/* Visual placeholder */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-surface-2 to-bg">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-fg/10">
            {project.title}
          </span>
        </div>
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
          {project.techStack.map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          צפה בפרויקט
          <span aria-hidden>←</span>
        </Link>
      </div>
    </article>
  );
}
