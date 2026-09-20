import { Link, createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PartnerLeadForm, QuoteCtaButton } from "@/components/PartnerLeadForm";
import { SourcesBlock } from "@/components/SourcesBlock";
import { Button } from "@/components/ui/button";
import { isPartnerActive } from "@/config/partner";
import { LAST_REVIEWED_LABEL } from "@/config/pricingData";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/semi-detached-roof-replacement-cost")({
  head: () =>
    pageHead({
      title: "Semi-Detached Roof Replacement Cost UK (2026)",
      description:
        "Typical UK cost to reroof a semi-detached house, including a 3-bed semi in concrete tiles or natural slate. Planning ranges, not contractor quotations.",
      path: "/semi-detached-roof-replacement-cost",
    }),
  component: SemiPage,
});

function SemiPage() {
  const partner = isPartnerActive();
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does it cost to reroof a 3-bed semi in the UK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "RoofCost UK plans a typical 3-bed semi pitched replacement at about £6,500–£13,000 in concrete tiles and £11,000–£22,000 in natural slate, including a scaffolding allowance. An 80 m² simple concrete example currently returns £7,600–£14,200 in the calculator. These are planning ranges, not quotes.",
        },
      },
      {
        "@type": "Question",
        name: "Does a hipped semi cost more than a gable?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Usually, yes. A simple gable is mostly two planes. Hips, valleys and an exposed side elevation add cutting, ridge work and more scaffold faces. The RoofCost UK model widens the top of the range when the roof is described as having some complexity.",
        },
      },
      {
        "@type": "Question",
        name: "Is £10,000 enough for a semi-detached new roof?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It can be, for a straightforward concrete-tile re-cover on a modest semi with normal access. It is often short for natural slate, a large or cut-up roof, or a job that needs long scaffold hire. Use the calculator with your area and covering rather than a round national average.",
        },
      },
      {
        "@type": "Question",
        name: "What roof area does a typical semi-detached house have?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "RoofCost UK uses a 60–95 m² covering band when the area is unknown, drawn from whole-job 3-bed semi examples around 60–90 m². That is a planning band, not a measured survey of your house.",
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
          { label: "Semi-detached", path: "/semi-detached-roof-replacement-cost" },
        ]}
      />
      <p className="text-sm text-muted">Last reviewed: {LAST_REVIEWED_LABEL}</p>
      <h1 className="mt-2 font-display text-4xl font-semibold">
        Semi-detached roof replacement cost in the UK
      </h1>
      <p className="mt-4 text-lg text-muted">
        For a typical 3-bed semi, RoofCost UK currently plans a full pitched
        replacement at about <strong>£6,500–£13,000</strong> in concrete tiles
        and <strong>£11,000–£22,000</strong> in natural slate. Those bands
        assume an ordinary two-storey house and a scaffolding allowance. A
        small gable at the low end is not the same job as a hipped roof with
        two chimneys.
      </p>

      <h2 className="mt-12 font-display text-2xl font-semibold">
        Typical 3-bed semi planning ranges
      </h2>
      <p className="mt-3">
        Whole-job figures below are the same illustrative bands used on the{" "}
        <Link to="/new-roof-cost" className="underline">
          new roof cost
        </Link>{" "}
        overview for a 3-bed semi (about 60–90 m² of covering). They are
        planning totals, not quotations.
      </p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[28rem] border-collapse text-sm">
          <caption className="mb-2 text-left text-muted">
            Semi-detached pitched replacement (planning, typical UK)
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
              <td className="py-2 pr-3">£6,500–£13,000</td>
              <td className="py-2">3-bed semi, ~60–90 m², access included in the band</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-3">Natural slate</td>
              <td className="py-2 pr-3">£11,000–£22,000</td>
              <td className="py-2">Same house type; labour-heavy covering</td>
            </tr>
            <tr>
              <td className="py-2 pr-3">Clay tiles</td>
              <td className="py-2 pr-3">Usually between the two</td>
              <td className="py-2">£110–£175/m² covering rate in the model</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-sm text-muted">
        Scaffolding for a semi-detached re-roof is treated separately in the
        calculator as about £650–£1,600, because a two-storey side elevation
        is not a bungalow hire.
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
        No contact details required to see your estimate. Choose “semi-detached
        house” and, if you know it, the roof area rather than guessing from
        the number of bedrooms.
      </p>

      <h2 className="mt-12 font-display text-2xl font-semibold">
        What is specific to a semi-detached roof
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        <li>
          <strong>Roof area of a 3-bed semi</strong> — more covering than a
          mid-terrace, less than most detached houses. Unknown area uses a
          60–95 m² band, not a fake “65 m² exactly”.
        </li>
        <li>
          <strong>Hip versus gable</strong> — a pair of gables is the simple
          case. Hips on the exposed side add ridges, hips and more cuts.
        </li>
        <li>
          <strong>Exposed side elevation</strong> — the detached face needs
          scaffold in its own right, and parking on that side can extend hire.
        </li>
        <li>
          <strong>Valleys and chimneys</strong> — a rear wing or two stacks
          are common on older semis and do not show up in a bedroom count.
        </li>
        <li>
          <strong>Neighbour boundary</strong> — one elevation is shared. That
          is simpler than a terrace of chimneys, but still needs a civil
          conversation about access and waste.
        </li>
      </ul>

      <h2 className="mt-12 font-display text-2xl font-semibold">Worked planning example</h2>
      <p className="mt-3">
        A homeowner enters: full pitched replacement, semi-detached, 80 m²,
        concrete tiles, simple shape, scaffolding likely. The RoofCost UK
        calculator currently returns <strong>£7,600–£14,200</strong> (midpoint
        about £10,900). That sits inside the published 3-bed semi concrete
        band. Adding “some complexity” for valleys or chimneys lifts the top
        of the same example to about £15,700.
      </p>
      <p className="mt-3 text-sm text-muted">
        Worked planning example from the RoofCost UK model — not a quotation
        for a named house.
      </p>

      <h2 className="mt-12 font-display text-2xl font-semibold">
        What a semi-detached quote should include
      </h2>
      <p className="mt-3">
        Ask whether the written figure includes a full scaffold (not only the
        front), strip-off, skip, new underlay and battens, the covering, ridge
        and verge, flashing where the new work meets chimneys or the neighbour
        wall, and VAT. Side-access parking, a rear extension roof, and timber
        found on strip are the usual extras on a 3-bed semi.
      </p>

      <h2 className="mt-12 font-display text-2xl font-semibold">
        Planning range versus a quote
      </h2>
      <p className="mt-3">
        The calculator range is an indicative planning estimate for the details
        you type in. A quote is a price for that semi: measured slopes, the
        exposed gable, and what is under the tiles. Compare this page with{" "}
        <Link to="/terraced-house-roof-replacement-cost" className="underline">
          terraced house roof replacement costs
        </Link>{" "}
        if you are deciding between house types, or with{" "}
        <Link to="/roof-replacement-cost-per-m2" className="underline">
          cost per m²
        </Link>{" "}
        if you already have a measured roof area.
      </p>

      <div className="mt-10">
        <PartnerLeadForm placement="guide" />
      </div>
      <SourcesBlock />
    </main>
  );
}
