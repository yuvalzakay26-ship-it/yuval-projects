interface TechBadgeProps {
  label: string;
}

export default function TechBadge({ label }: TechBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-medium text-accent-soft">
      {label}
    </span>
  );
}
