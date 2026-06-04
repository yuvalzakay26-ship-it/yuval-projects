import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/projects";
import TechBadge from "./TechBadge";
import StatusBadge from "./StatusBadge";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent/50">
      {/* Project screenshot */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-surface-2 to-bg">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
        />
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
