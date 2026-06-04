import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug, projects } from "@/lib/projects";
import TechBadge from "@/components/TechBadge";
import StatusBadge from "@/components/StatusBadge";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "פרויקט לא נמצא" };
  }

  return {
    title: `${project.title} • יובל פרויקטים`,
    description: project.shortDescription,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-5 pb-20 pt-8 sm:px-8 sm:pt-12">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-fg/60 transition-colors hover:text-fg"
      >
        <span aria-hidden>→</span>
        חזרה לפרויקטים
      </Link>

      {/* Title + status */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">
          {project.title}
        </h1>
        <StatusBadge status={project.status} />
      </div>

      {/* Large project screenshot */}
      <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface-2 to-bg">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-cover object-top"
          priority
        />
      </div>

      {/* About */}
      <Section title="על הפרויקט">
        <p className="text-base leading-relaxed text-fg/70">
          {project.longDescription}
        </p>
      </Section>

      {/* What I built */}
      <Section title="מה בניתי">
        <ul className="space-y-3">
          {project.whatIBuilt.map((item) => (
            <li key={item} className="flex gap-3 text-fg/70">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Tech stack */}
      <Section title="טכנולוגיות">
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
        </div>
      </Section>

      {/* Links */}
      <Section title="קישורים">
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            פתח פרויקט
            <span aria-hidden>↗</span>
          </a>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-semibold text-fg transition-colors hover:border-accent/50"
            >
              קוד מקור
              <span aria-hidden>↗</span>
            </a>
          )}
        </div>
      </Section>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="mb-4 text-xl font-bold text-fg">{title}</h2>
      {children}
    </section>
  );
}
