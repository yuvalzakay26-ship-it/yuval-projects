import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import CurrentDate from "./CurrentDate";

interface PageToolbarProps {
  /** Optional back link target. When present, a small back-link pill is shown
   *  just *below* the app bar (aligned to the RTL start / right). When omitted
   *  (e.g. the home page) only the app bar is rendered. */
  backHref?: string;
  backLabel?: string;
  /** Optional circular control(s) shown at the end (left in RTL), before the
   *  theme toggle. The home page passes its edit-mode menu button here; it is
   *  self-gating and renders nothing for normal visitors. */
  actions?: React.ReactNode;
}

const BRAND = "יובל פרויקטים";

/**
 * Full-width mobile app header (LifeVault-style), rendered in normal document
 * flow at the top of a page.
 *
 * The bar bleeds to the container edges via negative margins that cancel the
 * page's own horizontal + top padding, so it reads as a real edge-to-edge top
 * app bar with a subtle bottom border — not a pair of floating pills. Because
 * it is inline (not fixed) it never overlaps the hero, title, screenshot or
 * cards below it.
 *
 * Layout (RTL): the start (right) holds the muted brand label with the current
 * Hebrew date underneath; the end (left) holds the circular theme-toggle
 * control. On internal pages a compact back-link pill sits just below the bar.
 */
export default function PageToolbar({
  backHref,
  backLabel,
  actions,
}: PageToolbarProps) {
  return (
    <>
      <header className="-mx-5 -mt-4 border-b border-border bg-surface/80 backdrop-blur sm:-mx-8 sm:-mt-6">
        <div className="flex items-center justify-between gap-3 px-5 pb-3 pt-[max(0.875rem,env(safe-area-inset-top))] sm:px-8">
          {/* Brand + date (start / right in RTL) */}
          <div className="flex min-w-0 flex-col text-right">
            <span className="text-xs font-medium text-fg/45">{BRAND}</span>
            <CurrentDate className="mt-0.5 text-[0.8rem] font-medium text-fg/80" />
          </div>

          {/* Circular control(s) (end / left in RTL) */}
          <div className="flex shrink-0 items-center gap-2">
            {actions}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {backHref && (
        <div className="mt-4">
          <Link
            href={backHref}
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1.5 text-xs font-medium text-fg/70 shadow-sm backdrop-blur transition-colors hover:border-accent/50 hover:text-fg"
          >
            <span aria-hidden>→</span>
            <span className="truncate">{backLabel ?? "חזרה"}</span>
          </Link>
        </div>
      )}
    </>
  );
}
