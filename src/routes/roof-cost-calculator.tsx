import { Link, createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Calculator } from "@/components/Calculator";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/roof-cost-calculator")({
  head: () =>
    pageHead({
      title: "Roof Cost Calculator UK | Estimate Roofing Costs",
      description:
        "Estimate the potential cost of a UK roof repair, roof replacement or flat roof project with our free indicative roofing cost calculator.",
      path: "/roof-cost-calculator",
    }),
  component: CalculatorPage,
});

function CalculatorPage() {
  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ label: "Roof cost calculator", path: "/roof-cost-calculator" }]} />
      <h1 className="font-display text-4xl font-semibold">UK Roof Cost Calculator</h1>
      <p className="mt-4 text-muted">
        Estimate the potential cost of repairing or replacing a roof in the UK.
        The result is an indicative planning range, not a contractor quotation.
      </p>
      <p className="mt-2 text-sm text-muted">
        You do not need to provide personal details to see a range. Read the{" "}
        <Link to="/new-roof-cost" className="underline">
          new roof
        </Link>
        ,{" "}
        <Link to="/roof-repair-cost" className="underline">
          repair
        </Link>{" "}
        and{" "}
        <Link to="/flat-roof-cost" className="underline">
          flat roof
        </Link>{" "}
        guides if you want the context first.
      </p>
      <div className="mt-8">
        <Calculator />
      </div>
    </main>
  );
}
