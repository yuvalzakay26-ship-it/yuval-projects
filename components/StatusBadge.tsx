import type { ProjectStatus } from "@/lib/projects";

interface StatusBadgeProps {
  status: ProjectStatus;
}

const statusConfig: Record<
  ProjectStatus,
  { label: string; dot: string; text: string; ring: string }
> = {
  live: {
    label: "באוויר",
    dot: "bg-emerald-400",
    text: "text-emerald-300",
    ring: "border-emerald-400/30 bg-emerald-400/10",
  },
  "in-progress": {
    label: "בפיתוח",
    dot: "bg-amber-400",
    text: "text-amber-300",
    ring: "border-amber-400/30 bg-amber-400/10",
  },
  concept: {
    label: "קונספט",
    dot: "bg-sky-400",
    text: "text-sky-300",
    ring: "border-sky-400/30 bg-sky-400/10",
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${config.ring} ${config.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}
