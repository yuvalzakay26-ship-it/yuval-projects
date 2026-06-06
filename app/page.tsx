import ProjectCard from "@/components/ProjectCard";
import PageToolbar from "@/components/PageToolbar";
import { projects } from "@/lib/projects";

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-5 pb-20 pt-4 sm:px-8 sm:pt-6">
      <PageToolbar />

      {/* Hero */}
      <header className="mb-12 mt-6 space-y-4 text-center sm:mb-16 sm:mt-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-fg/60">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          תיק עבודות
        </div>
        <h1 className="bg-gradient-to-b from-fg to-fg/60 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl">
          יובל פרויקטים
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-fg/60 sm:text-lg">
          תיק עבודות אישי שמרכז פרויקטים שבניתי בפיתוח אתרים, מערכות ניהול
          וממשקי משתמש בעברית.
        </p>
      </header>

      {/* Project grid */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>

      <footer className="mt-16 text-center text-sm text-fg/30">
        © {new Date().getFullYear()} יובל • נבנה ב-Next.js
      </footer>
    </main>
  );
}
