import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Recursively extract the plain text out of rendered children so we can build
// stable heading ids that match the markdown's own table-of-contents anchors.
function textContent(node: React.ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") {
    return "";
  }
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(textContent).join("");
  }
  if (React.isValidElement(node)) {
    return textContent((node.props as { children?: React.ReactNode }).children);
  }
  return "";
}

// GitHub-style slug: lowercase, strip punctuation (keep letters/digits/spaces/
// hyphens, including Hebrew), then spaces -> hyphens. This matches the in-doc
// `#חלק-1--...` links so the table of contents is clickable.
function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s/g, "-");
}

// hast node shape (only the bits we read). react-markdown passes `node` to each
// renderer so we can inspect the original tree without re-parsing.
type HastNode = {
  type?: string;
  tagName?: string;
  children?: HastNode[];
};

// A table-of-contents list is an ordered list whose every item is just a single
// anchor link (e.g. `1. [סקירת הפרויקט](#...)`). Body lists, by contrast, mix
// text and emphasis. Detecting the shape — rather than the heading text — keeps
// the styling robust and leaves every anchor/href untouched.
function isTocList(node: HastNode | undefined): boolean {
  if (!node || !Array.isArray(node.children)) return false;
  const items = node.children.filter(
    (c) => c.type === "element" && c.tagName === "li"
  );
  if (items.length === 0) return false;
  return items.every((li) => {
    const elements = (li.children ?? []).filter((c) => c.type === "element");
    return elements.length === 1 && elements[0].tagName === "a";
  });
}

function Heading({
  level,
  children,
  className,
}: {
  level: 1 | 2 | 3 | 4;
  children: React.ReactNode;
  className: string;
}) {
  const id = slugify(textContent(children));
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";
  return (
    <Tag id={id} className={`scroll-mt-24 ${className}`}>
      {children}
    </Tag>
  );
}

/**
 * Minimal, safe markdown renderer. react-markdown does not allow raw HTML by
 * default, so untrusted input cannot inject markup. Styling is mapped per
 * element with Tailwind so it matches the portfolio design language without a
 * global typography plugin.
 */
export default function Markdown({ content }: { content: string }) {
  return (
    // `min-w-0` lets this block shrink below its content's intrinsic width when
    // nested in a flex/grid ancestor, and `[overflow-wrap:anywhere]` (an
    // inherited property) makes every descendant break long unbreakable tokens
    // — file paths, package names, URLs — instead of forcing the page wider
    // than the mobile viewport.
    <div className="min-w-0 text-start text-[0.95rem] leading-7 text-fg/80 [overflow-wrap:anywhere] sm:text-base">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <Heading
              level={1}
              className="mb-6 mt-2 text-2xl font-extrabold tracking-tight text-fg sm:text-3xl"
            >
              {children}
            </Heading>
          ),
          h2: ({ children }) => {
            // The TOC heading drops its underline so it reads as the header of
            // the styled TOC card that follows it.
            const isToc = textContent(children) === "תוכן עניינים";
            return (
              <Heading
                level={2}
                className={
                  isToc
                    ? "mb-3 mt-12 text-xl font-bold text-fg sm:text-2xl"
                    : "mb-4 mt-12 border-b border-border pb-2 text-xl font-bold text-fg sm:text-2xl"
                }
              >
                {children}
              </Heading>
            );
          },
          h3: ({ children }) => (
            <Heading
              level={3}
              className="mb-3 mt-8 text-lg font-bold text-fg sm:text-xl"
            >
              {children}
            </Heading>
          ),
          h4: ({ children }) => (
            <Heading
              level={4}
              className="mb-2 mt-6 text-base font-semibold text-fg sm:text-lg"
            >
              {children}
            </Heading>
          ),
          p: ({ children }) => (
            <p className="my-4 text-start leading-7 text-fg/80 sm:leading-relaxed">
              {children}
            </p>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="font-medium text-accent underline-offset-2 hover:underline"
              {...(href && /^https?:\/\//.test(href)
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="my-4 space-y-2 ps-5 [list-style:disc]">{children}</ul>
          ),
          ol: ({ node, children }) => {
            // Render the table of contents as a real card component: subtle
            // surface, border, rounded corners and roomy, tappable links.
            if (isTocList(node as HastNode | undefined)) {
              return (
                <nav
                  aria-label="תוכן עניינים"
                  className="my-8 rounded-2xl border border-border bg-surface-2/60 p-5 shadow-sm sm:p-6"
                >
                  <ol className="grid gap-0.5 ps-5 [list-style:decimal] marker:text-accent/70 [&_a]:inline-block [&_a]:py-1 [&_a]:no-underline [&_li]:leading-relaxed">
                    {children}
                  </ol>
                </nav>
              );
            }
            return (
              <ol className="my-4 space-y-2 ps-5 [list-style:decimal]">
                {children}
              </ol>
            );
          },
          li: ({ children }) => (
            <li className="leading-relaxed text-fg/80 marker:text-accent">
              {children}
            </li>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-fg">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          blockquote: ({ children }) => (
            <blockquote className="my-6 rounded-xl border-s-4 border-accent bg-surface-2 px-5 py-3 text-fg/70">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-10 border-border" />,
          code: ({ className, children }) => {
            const isBlock = /language-/.test(className ?? "");
            if (isBlock) {
              return <code className={className}>{children}</code>;
            }
            return (
              <code
                dir="ltr"
                className="rounded-md bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-accent-soft [overflow-wrap:anywhere]"
              >
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre
              dir="ltr"
              className="my-6 max-w-full overflow-x-auto rounded-xl border border-border bg-surface-2 p-4 font-mono text-sm leading-relaxed text-fg/80"
            >
              {children}
            </pre>
          ),
          img: ({ src, alt }) => (
            // eslint-disable-next-line @next/next/no-img-element -- markdown images are author-controlled content, not app UI
            <img
              src={typeof src === "string" ? src : undefined}
              alt={alt ?? ""}
              className="my-6 h-auto max-w-full rounded-xl"
            />
          ),
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto rounded-xl border border-border">
              <table className="w-full border-collapse text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-surface-2">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="border-b border-border px-4 py-2 text-start font-semibold text-fg">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-border px-4 py-2 align-top text-fg/80">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
