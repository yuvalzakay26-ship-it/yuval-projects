import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import CurrentDate from "./CurrentDate";

interface PageToolbarProps {
  /** Optional back link target. When present, a back link pill is shown on the
   *  right (the RTL start) in place of the plain brand label. When omitted
   *  (e.g. the home page) the brand label is shown instead. */
  backHref?: string;
  backLabel?: string;
}

const BRAND = "יובל פרויקטים";

/**
 * A clean top header shown in normal document flow at the top of a page.
 *
 * Layout (RTL): the start (right) holds a brand block — a back link pill when
 * {@link PageToolbarProps.backHref} is given, otherwise the plain product
 * label — with the current Hebrew date in small muted text underneath. The end
 * (left) holds the theme toggle. Because the bar is inline — not fixed — it
 * never overlaps the title, screenshot, content or cards below it. Top spacing
 * respects the device safe-area inset so the controls clear notches / rounded
 * corners.
 */
export default function PageToolbar({ backHref, backLabel }: PageToolbarProps) {
  return (
    <div className="flex items-start justify-between gap-3 pt-[env(safe-area-inset-top)]">
      {/* Brand block (start / right in RTL) */}
      <div className="flex min-w-0 flex-col gap-1.5">
        {backHref ? (
          <Link
            href={backHref}
            className="inline-flex max-w-full items-center gap-2 self-start rounded-full border border-border bg-surface/80 px-3 py-2 text-xs font-medium text-fg/70 shadow-sm backdrop-blur transition-colors hover:border-accent/50 hover:text-fg"
          >
            <span aria-hidden>→</span>
            <span className="truncate">{backLabel ?? "חזרה"}</span>
          </Link>
        ) : (
          <span className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-surface/80 px-3 py-2 text-xs font-semibold text-fg/80 shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {BRAND}
          </span>
        )}
        <CurrentDate className="px-1" />
      </div>

      <ThemeToggle />
    </div>
  );
}
