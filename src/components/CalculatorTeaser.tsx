import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function CalculatorTeaser({
  title = "Estimate your roofing cost",
  copy = "Use the free UK roof cost calculator. You do not need to give a name, email or phone number to see a planning range.",
  variant = "default",
}: {
  title?: string;
  copy?: string;
  variant?: "default" | "hero";
}) {
  if (variant === "hero") {
    return (
      <aside className="rounded-lg border border-border bg-surface p-5">
        <h2 className="font-display text-lg font-semibold">Free UK roof cost calculator</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
          <li>No signup</li>
          <li>Takes about 1 minute</li>
          <li>Indicative UK planning range</li>
        </ul>
        <Button asChild className="mt-4">
          <Link to="/roof-cost-calculator" className="no-underline text-primary-fg">
            Start Free Estimate
          </Link>
        </Button>
      </aside>
    );
  }
  return (
    <aside className="rounded-lg border border-border bg-surface p-5">
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-muted">{copy}</p>
      <Button asChild className="mt-4">
        <Link to="/roof-cost-calculator" className="no-underline text-primary-fg">
          Open the roof cost calculator
        </Link>
      </Button>
    </aside>
  );
}
