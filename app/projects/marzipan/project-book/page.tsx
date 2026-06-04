import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import type { Metadata } from "next";
import Markdown from "@/components/Markdown";
import { getProjectBySlug } from "@/lib/projects";

const LIVE_URL = getProjectBySlug("marzipan")?.liveUrl ?? "/";
const BOOK_PATH = path.join(
  process.cwd(),
  "content",
  "project-books",
  "marzipan.md"
);

export const metadata: Metadata = {
  title: "מרציפן — ספר פרויקט • יובל פרויקטים",
  description:
    "ספר הפרויקט המלא של מאפיית מרציפן — תיעוד טכני ומוצרי מקצה לקצה: ארכיטקטורה, ראוטים, קומפוננטות, קטלוג, מסחר, SEO, ביצועים ופריסה.",
};

async function getBookContent(): Promise<string> {
  return fs.readFile(BOOK_PATH, "utf8");
}

export default async function MarzipanProjectBookPage() {
  const content = await getBookContent();

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-5 pb-20 pt-8 sm:px-8 sm:pt-12">
      {/* Back link */}
      <Link
        href="/projects/marzipan"
        className="inline-flex items-center gap-2 text-sm font-medium text-fg/60 transition-colors hover:text-fg"
      >
        <span aria-hidden>→</span>
        חזרה למרציפן
      </Link>

      {/* Title */}
      <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">
        מרציפן — ספר פרויקט
      </h1>

      {/* Intro */}
      <p className="mt-4 text-base leading-relaxed text-fg/70">
        זהו ספר הפרויקט הטכני והמוצרי המלא של מאפיית מרציפן. הוא מתעד את האתר
        מקצה לקצה — ארכיטקטורה, ראוטים, קומפוננטות, קטלוג, סל ומסחר, נגישות,
        SEO, ביצועים ופריסה — בדיוק כפי שהם קיימים בקוד המקור.
      </p>

      {/* Live site button */}
      <div className="mt-6">
        <a
          href={LIVE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          פתח את האתר
          <span aria-hidden>↗</span>
        </a>
      </div>

      {/* Project book content */}
      <article className="mt-10 border-t border-border pt-8">
        <Markdown content={content} />
      </article>

      {/* Back link (bottom) */}
      <div className="mt-12 border-t border-border pt-8">
        <Link
          href="/projects/marzipan"
          className="inline-flex items-center gap-2 text-sm font-medium text-fg/60 transition-colors hover:text-fg"
        >
          <span aria-hidden>→</span>
          חזרה למרציפן
        </Link>
      </div>
    </main>
  );
}
