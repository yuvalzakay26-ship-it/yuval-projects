import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

interface PageToolbarProps {
  /** Optional back link target. When present, a back link is shown on the
   *  right (the RTL start). When omitted, only the theme toggle is shown. */
  backHref?: string;
  backLabel?: string;
}

/**
 * A clean top toolbar shown in normal document flow at the top of a page.
 *
 * Layout (RTL): the back link sits on the right (start), the theme toggle on
 * the left (end). Because the bar is inline — not fixed — it never overlaps the
 * title, screenshot, content or cards below it. Top spacing respects the device
 * safe-area inset so the controls clear notches / rounded corners.
 */
export default function PageToolbar({ backHref, backLabel }: PageToolbarProps) {
  return (
    <div
      className={`flex items-center gap-3 pt-[env(safe-area-inset-top)] ${
        backHref ? "justify-between" : "justify-end"
      }`}
    >
      {backHref && (
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-2 text-xs font-medium text-fg/70 shadow-sm backdrop-blur transition-colors hover:border-accent/50 hover:text-fg"
        >
          <span aria-hidden>→</span>
          {backLabel ?? "חזרה"}
        </Link>
      )}
      <ThemeToggle />
    </div>
  );
}
