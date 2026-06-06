import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug, projects } from "@/lib/projects";
import TechBadge from "@/components/TechBadge";
import StatusBadge from "@/components/StatusBadge";
import PageToolbar from "@/components/PageToolbar";

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
    <main className="mx-auto min-h-screen w-full max-w-3xl px-5 pb-20 pt-4 sm:px-8 sm:pt-6">
      <PageToolbar backHref="/" backLabel="חזרה לפרויקטים" />

      {/* Case-study header */}
      <header className="mt-8 space-y-4">
        <StatusBadge status={project.status} />
        <h1 className="text-2xl font-extrabold tracking-tight text-fg sm:text-4xl">
          {project.title}
        </h1>
        <p className="text-[0.95rem] leading-relaxed text-fg/60 sm:text-lg">
          {project.shortDescription}
        </p>
      </header>

      {/* Large project screenshot */}
      <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface-2 to-bg shadow-sm">
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
        <p className="text-[0.95rem] leading-7 text-fg/70 sm:text-base sm:leading-relaxed">
          {project.longDescription}
        </p>
      </Section>

      {/* What I built */}
      <Section title="מה בניתי">
        <ul className="space-y-3">
          {project.whatIBuilt.map((item) => (
            <li key={item} className="flex gap-3 text-[0.95rem] text-fg/70 sm:text-base">
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

      {/* What the project proves */}
      {project.proof && (
        <Section title="מה הפרויקט מוכיח">
          <p className="text-[0.95rem] leading-7 text-fg/70 sm:text-base sm:leading-relaxed">
            {project.proof}
          </p>
        </Section>
      )}

      {/* Links */}
      <Section title="קישורים">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-90 hover:shadow-md hover:shadow-accent/20"
          >
            פתח פרויקט
            <span aria-hidden>↗</span>
          </a>

          {project.projectBookHref && (
            <Link
              href={project.projectBookHref}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-semibold text-fg shadow-sm transition-colors hover:border-accent/50"
            >
              קרא את ספר הפרויקט
              <span aria-hidden>←</span>
            </Link>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-semibold text-fg shadow-sm transition-colors hover:border-accent/50"
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
    <section className="mt-6 rounded-2xl border border-border bg-surface p-5 shadow-sm sm:mt-8 sm:p-6">
      <h2 className="mb-4 text-lg font-bold text-fg sm:text-xl">{title}</h2>
      {children}
    </section>
  );
}
