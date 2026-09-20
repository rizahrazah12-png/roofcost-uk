import { Link, createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PartnerLeadForm, QuoteCtaButton } from "@/components/PartnerLeadForm";
import { SourcesBlock } from "@/components/SourcesBlock";
import { Button } from "@/components/ui/button";
import { isPartnerActive } from "@/config/partner";
import { LAST_REVIEWED_LABEL } from "@/config/pricingData";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/bungalow-roof-replacement-cost")({
  head: () =>
    pageHead({
      title: "Bungalow Roof Replacement Cost UK (2026)",
      description:
        "Typical UK cost to reroof a bungalow. Lower working height does not always mean a smaller bill — bungalow roofs can have a large footprint.",
      path: "/bungalow-roof-replacement-cost",
    }),
  component: BungalowPage,
});

function BungalowPage() {
  const partner = isPartnerActive();
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does it cost to reroof a bungalow in the UK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "RoofCost UK plans a typical bungalow pitched replacement at about £5,500–£12,000 in concrete tiles and £9,000–£20,000 in natural slate. A 70 m² simple concrete example currently returns £6,500–£12,300. A larger hipped bungalow roof can sit well above that.",
        },
      },
      {
        "@type": "Question",
        name: "Is a bungalow cheaper to re-roof because it is only one storey?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Access is often cheaper — the model’s bungalow scaffold band is £400–£1,200, and some jobs use a tower. The roof itself can still be large: a bungalow spreads living space over one floor, so the covering area is frequently closer to a semi than a mid-terrace.",
        },
      },
      {
        "@type": "Question",
        name: "Do hipped bungalow roofs cost more?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Hips on all four sides mean more cutting, more ridge and more waste than a simple gable. In the calculator, describing the shape as having some complexity on a 90 m² concrete bungalow currently plans at £8,200–£17,000 versus £6,500–£12,300 for a simpler 70 m² roof.",
        },
      },
      {
        "@type": "Question",
        name: "What if the bungalow has a loft conversion?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dormers, veluxes and a raised ceiling change both the covering area and the detailing. Treat that as extra complexity, not as a standard bungalow row on a price table. It still needs an inspection, not a webpage diagnosis.",
        },
      },
    ],
  };

  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={faq} />
      <Breadcrumbs
        items={[
          { label: "New roof cost", path: "/new-roof-cost" },
          { label: "Bungalow", path: "/bungalow-roof-replacement-cost" },
        ]}
      />
      <p className="text-sm text-muted">Last reviewed: {LAST_REVIEWED_LABEL}</p>
      <h1 className="mt-2 font-display text-4xl font-semibold">
        Bungalow roof replacement cost in the UK
      </h1>
      <p className="mt-4 text-lg text-muted">
        RoofCost UK currently plans a typical bungalow re-roof at{" "}
        <strong>£5,500–£12,000</strong> in concrete tiles and{" "}
        <strong>£9,000–£20,000</strong> in natural slate. Single-storey working
        is easier than a two-storey semi. It is not automatically a smaller
        roof: the covering often spans the whole footprint of the house.
      </p>

      <h2 className="mt-12 font-display text-2xl font-semibold">
        Bungalow planning ranges
      </h2>
      <p className="mt-3">
        Whole-job bands below are the bungalow row from the{" "}
        <Link to="/new-roof-cost" className="underline">
          new roof cost
        </Link>{" "}
        table (about 50–95 m²). The wide area band exists because published
        bungalow m² samples are thinner than 3-bed semi examples.
      </p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[28rem] border-collapse text-sm">
          <caption className="mb-2 text-left text-muted">
            Bungalow pitched replacement (planning, typical UK)
          </caption>
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-2 pr-3 font-semibold">Covering</th>
              <th className="py-2 pr-3 font-semibold">Planning range</th>
              <th className="py-2 font-semibold">Assumptions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="py-2 pr-3">Concrete tiles</td>
              <td className="py-2 pr-3">£5,500–£12,000</td>
              <td className="py-2">Typical bungalow, ~50–95 m²</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-3">Natural slate</td>
              <td className="py-2 pr-3">£9,000–£20,000</td>
              <td className="py-2">Same footprint; higher covering rate</td>
            </tr>
            <tr>
              <td className="py-2 pr-3">Access (model band)</td>
              <td className="py-2 pr-3">£400–£1,200</td>
              <td className="py-2">Lower height; a tower may suffice on some jobs</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-sm text-muted">
        A cheap access line does not cap the job if the roof is a large hip.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link to="/roof-cost-calculator" className="no-underline text-primary-fg">
            Calculate My Roof Cost
          </Link>
        </Button>
        {partner ? <QuoteCtaButton variant="secondary" /> : null}
      </div>
      <p className="mt-3 text-sm text-muted">
        No contact details required to see your estimate. Choose “bungalow”
        and enter roof area if you have it — height is not a substitute for
        square metres.
      </p>

      <h2 className="mt-12 font-display text-2xl font-semibold">
        Lower height, larger footprint
      </h2>
      <p className="mt-3">
        On a two-storey semi the first floor sits under part of the roof. On
        a bungalow almost every habitable room sits under it. A 3-bed bungalow
        can therefore need as much covering as a 3-bed semi even though nobody
        is working at eaves three metres higher. That is the planning trap:
        “it’s only one storey” describes the ladder, not the roof.
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        <li>
          <strong>Roof footprint</strong> — unknown area uses 50–95 m², overlapping
          the semi band on purpose.
        </li>
        <li>
          <strong>Hip versus gable</strong> — many bungalows are hipped on all
          sides. That is extra labour compared with two simple gables.
        </li>
        <li>
          <strong>Easier height</strong> — scaffold or a tower is still in the
          budget; it is just a smaller lump than a two-storey semi.
        </li>
        <li>
          <strong>Ceiling and insulation</strong> — bungalow ceilings are the
          roof. Insulation upgrades and any loft room are often extra to a
          re-cover.
        </li>
      </ul>

      <h2 className="mt-12 font-display text-2xl font-semibold">Worked planning example</h2>
      <p className="mt-3">
        Two calculator runs, both concrete tiles with scaffolding likely.
        A simple 70 m² bungalow currently plans at{" "}
        <strong>£6,500–£12,300</strong> (midpoint about £9,400). A 90 m² roof
        described as having some complexity — a common hip-and-valley bungalow
        — currently plans at <strong>£8,200–£17,000</strong>. The extra is
        area and shape, not storeys.
      </p>
      <p className="mt-3 text-sm text-muted">
        Worked planning examples from the RoofCost UK model — not quotations.
      </p>
      <p className="mt-3">
        The same 70 m² in natural slate currently plans at £10,300–£18,500,
        which is why covering choice still dominates even when access is cheap.
      </p>

      <h2 className="mt-12 font-display text-2xl font-semibold">
        What a bungalow quote should include
      </h2>
      <p className="mt-3">
        Written quotes should still list access (tower or scaffold), strip-off,
        skip, underlay and battens, covering, ridge and hip detailing, flashing
        where disturbed, and VAT. Because so much of a bungalow is ceiling,
        ask what happens if insulation or plasterboard is disturbed, and
        whether rooflights are in or out of the price.
      </p>

      <h2 className="mt-12 font-display text-2xl font-semibold">
        Planning range versus a quote
      </h2>
      <p className="mt-3">
        RoofCost UK is an indicative planning range. A quote measures that
        bungalow: hips, footprint and how the access actually sets up on the
        plot. Compare{" "}
        <Link to="/semi-detached-roof-replacement-cost" className="underline">
          semi-detached costs
        </Link>{" "}
        if you are weighing a two-storey house, or{" "}
        <Link to="/roof-replacement-cost-per-m2" className="underline">
          cost per m²
        </Link>{" "}
        if you already have a roof survey in square metres.
      </p>

      <div className="mt-10">
        <PartnerLeadForm placement="guide" />
      </div>
      <SourcesBlock />
    </main>
  );
}
