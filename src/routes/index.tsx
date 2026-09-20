import { Link, createFileRoute } from "@tanstack/react-router";
import { CalculatorTeaser } from "@/components/CalculatorTeaser";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/button";
import { canonicalUrl, siteConfig } from "@/config/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "RoofCost UK | UK Roof Cost Calculator & Roofing Cost Guides",
      description:
        "Free UK roofing cost calculator and guides for repairs, replacements and flat roofs. Indicative planning ranges — not contractor quotations.",
      path: "/",
    }),
  component: Home,
});

function Home() {
  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: canonicalUrl("/"),
    description: siteConfig.description,
    inLanguage: "en-GB",
  };

  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-10">
      <JsonLd data={websiteLd} />
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-dark">
            UK homeowners
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">
            How much could your roof cost?
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Get a quick UK roofing cost estimate for a repair, replacement or
            flat-roof project. The calculator is free and does not ask for your
            name, email or phone number.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button asChild size="lg">
              <Link to="/roof-cost-calculator" className="no-underline text-primary-fg">
                Calculate My Roof Cost
              </Link>
            </Button>
            <Link to="/new-roof-cost" className="text-sm font-medium underline">
              See UK roof cost guides
            </Link>
          </div>
        </div>
        <CalculatorTeaser variant="hero" />
      </section>

      <section className="mt-14" aria-labelledby="steps-heading">
        <h2 id="steps-heading" className="font-display text-2xl font-semibold">
          Three simple steps
        </h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { n: "1", t: "Tell us about the roof", d: "Job type, property, covering and whether scaffolding is likely." },
            { n: "2", t: "Get an indicative cost range", d: "A rounded planning band, not a single made-up figure." },
            { n: "3", t: "Optionally compare roofing quotes", d: "After a full pitched-roof replacement estimate you can request property-specific quotes. A click is not a lead, and quotes do not change the calculator range." },
          ].map((s) => (
            <li key={s.n} className="rounded-lg border border-border bg-surface p-5">
              <p className="text-sm font-semibold text-primary-dark">Step {s.n}</p>
              <h3 className="mt-1 font-display text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14" aria-labelledby="guides-heading">
        <h2 id="guides-heading" className="font-display text-2xl font-semibold">
          UK roof cost guides
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            { to: "/roof-cost-calculator" as const, t: "Roof cost calculator", d: "Interactive UK planning range for repair, replacement or a flat roof." },
            { to: "/new-roof-cost" as const, t: "New roof cost", d: "What a pitched roof replacement typically costs and what drives the price." },
            { to: "/roof-repair-cost" as const, t: "Roof repair cost", d: "Leaks, tiles, flashing and when a repair is no longer enough." },
            { to: "/flat-roof-cost" as const, t: "Flat roof cost", d: "Felt, EPDM and GRP, including cost per m² and extras such as insulation." },
          ].map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="rounded-lg border border-border bg-surface p-5 text-fg no-underline hover:border-primary"
            >
              <h3 className="font-display text-lg font-semibold">{c.t}</h3>
              <p className="mt-2 text-sm text-muted">{c.d}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14 max-w-3xl" aria-labelledby="how-heading">
        <h2 id="how-heading" className="font-display text-2xl font-semibold">
          How our estimates work
        </h2>
        <p className="mt-3 text-muted">
          RoofCost UK is an information website. We combine the details you
          enter with 2026 UK market cost benchmarks — covering type, typical
          roof area, complexity and access. If you do not know the roof area,
          we use a wider property-type band rather than pretending to know the
          exact size.
        </p>
        <p className="mt-3 text-muted">
          Results are rounded planning ranges. They are not quotations, and
          they are not based on a visit to your property.
        </p>
      </section>

      <section className="mt-10 rounded-lg border border-border bg-warn-bg p-5 text-warn-fg" aria-labelledby="trust-heading">
        <h2 id="trust-heading" className="font-display text-xl font-semibold text-fg">
          Estimates are indicative
        </h2>
        <p className="mt-2 text-sm text-fg">
          Actual roofing quotations depend on inspection, roof condition,
          access, materials, scaffolding, location and job complexity. RoofCost
          UK does not inspect roofs, employ roofers or guarantee prices.
        </p>
      </section>
    </main>
  );
}
