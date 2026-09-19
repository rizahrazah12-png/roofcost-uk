import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-fg", className)}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect width="32" height="32" rx="7" className="fill-primary" />
        <path
          d="M6 16.5 L16 8 l10 8.5"
          stroke="white"
          strokeWidth="2.1"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path d="M10 16.2 V23.5 H22 V16.2" stroke="white" strokeWidth="2.1" />
        <path d="M14.2 23.5 V19.2 H17.8 V23.5" stroke="white" strokeWidth="1.8" />
      </svg>
      <span className="font-display text-[1.05rem] font-semibold tracking-tight">
        RoofCost UK
      </span>
    </span>
  );
}
