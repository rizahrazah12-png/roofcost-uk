import { Link, createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PartnerLeadForm, QuoteCtaButton } from "@/components/PartnerLeadForm";
import { SourcesBlock } from "@/components/SourcesBlock";
import { Button } from "@/components/ui/button";
import { isPartnerActive } from "@/config/partner";
import { LAST_REVIEWED_LABEL } from "@/config/pricingData";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/slate-roof-replacement-cost")({
  head: () =>
    pageHead({
      title: "Slate Roof Replacement Cost UK (2026)",
      description:
        "Typical UK cost of a new natural slate roof, including £/m² rates and whole-house planning ranges. Full re-roof figures, not isolated slate repairs.",
      path: "/slate-roof-replacement-cost",
    }),
  component: SlatePage,
});

function SlatePage() {
  const partner = isPartnerActive();
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does a new slate roof cost in the UK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "RoofCost UK plans natural slate pitched replacement at about £140–£230/m². Whole-house bands currently run from about £8,000–£16,000 on a mid-terrace to £11,000–£22,000 on a 3-bed semi. An 80 m² simple semi example returns £12,000–£21,300 in the calculator. Welsh heritage slate can exceed the planning band.",
        },
      },
      {
        "@type": "Question",
        name: "Why is natural slate more than concrete?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Slates are smaller units, slower to lay, and need more skilled detailing at hips, valleys and verges. The material itself costs more. That is why natural slate sits above concrete (£85–£145/m²) and clay (£110–£175/m²) in the RoofCost UK model.",
        },
      },
      {
        "@type": "Question",
        name: "Is replacing a few slipped slates a new roof?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Isolated slate repairs are a different job and a different RoofCost UK path. This page is a complete re-cover: strip, new underlay and battens, and a new slate covering. Patching a handful of slates does not tell you the price of that.",
        },
      },
      {
        "@type": "Question",
        name: "Is artificial slate the same price as natural slate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Not in this model. Fibre-cement or synthetic slate is planned at about £95–£160/m², between concrete and clay. Do not use the natural-slate band for a man-made product, and do not assume an artificial slate will be accepted on a heritage roof.",
        },
      },
      {
        "@type": "Question",
        name: "Can you match old Welsh slate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Matching a particular quarry, size and weathering is a specification problem and can sit above the RoofCost UK planning band. The published range is for typical natural slate, not a listed-building quotation.",
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
          { label: "Natural slate", path: "/slate-roof-replacement-cost" },
        ]}
      />
      <p className="text-sm text-muted">Last reviewed: {LAST_REVIEWED_LABEL}</p>
      <h1 className="mt-2 font-display text-4xl font-semibold">
        Slate roof replacement cost in the UK
      </h1>
      <p className="mt-4 text-lg text-muted">
        A full natural slate re-roof is the upper pitched covering in the
        RoofCost UK model: about <strong>£140–£230 per m²</strong>, or
        whole-house planning totals such as <strong>£11,000–£22,000</strong>{" "}
        on a typical 3-bed semi. That is a complete replacement, not the cost
        of clipping a few slipped slates back into place.
      </p>

      <h2 className="mt-12 font-display text-2xl font-semibold">
        Natural slate rates and house totals
      </h2>
      <p className="mt-3">
        House totals are the slate column from the{" "}
        <Link to="/new-roof-cost" className="underline">
          new roof cost
        </Link>{" "}
        table. The £/m² rate is the model’s natural-slate covering band, not
        a heritage Welsh extra.
      </p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[28rem] border-collapse text-sm">
          <caption className="mb-2 text-left text-muted">
            Natural slate pitched replacement (planning)
          </caption>
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-2 pr-3 font-semibold">Measure</th>
              <th className="py-2 pr-3 font-semibold">Planning band</th>
              <th className="py-2 font-semibold">Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="py-2 pr-3">Natural slate covering</td>
              <td className="py-2 pr-3">£140–£230/m²</td>
              <td className="py-2">Typical natural slate, not listed-building extras</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-3">Artificial slate covering</td>
              <td className="py-2 pr-3">£95–£160/m²</td>
              <td className="py-2">Different product; do not mix the bands</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-3">Mid-terrace total</td>
              <td className="py-2 pr-3">£8,000–£16,000</td>
              <td className="py-2">~45–65 m² typical covering</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-3">3-bed semi total</td>
              <td className="py-2 pr-3">£11,000–£22,000</td>
              <td className="py-2">~60–90 m² typical covering</td>
            </tr>
            <tr>
              <td className="py-2 pr-3">Bungalow total</td>
              <td className="py-2 pr-3">£9,000–£20,000</td>
              <td className="py-2">~50–95 m²; large hips still add labour</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-sm text-muted">
        Concrete on the same houses is the lower column of that table — see{" "}
        <Link to="/concrete-tile-roof-replacement-cost" className="underline">
          concrete tile replacement
        </Link>
        .
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
        No contact details required to see your estimate. Choose natural slate
        only if that is the covering you mean; artificial slate is a separate
        option in the calculator.
      </p>

      <h2 className="mt-12 font-display text-2xl font-semibold">
        Why slate sits above concrete
      </h2>
      <p className="mt-3">
        Natural slates are small, heavy, and laid with more laps and fixings
        per square metre than an interlocking concrete tile. Hips, valleys
        and verges need cutting rather than a standard dry-verge tray. The
        labour content is the main reason RoofCost UK does not let slate
        collapse into the concrete band. Material cost is the other.
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        <li>
          <strong>Natural versus other “slate”</strong> — fibre-cement looks
          similar in a photo and is planned far lower. Specify the product.
        </li>
        <li>
          <strong>Labour intensity</strong> — more units per m², more time on
          the roof, more skill at the details.
        </li>
        <li>
          <strong>Detailing</strong> — valleys, dormers and chimneys multiply
          on a slate roof because every cut is visible.
        </li>
        <li>
          <strong>Matching</strong> — a mixed repair of old and new slates is
          a different problem from a full re-cover in one consistent product.
        </li>
        <li>
          <strong>Roof complexity</strong> — a cut-up Victorian slate roof is
          not the simple 80 m² gable used in the worked example below.
        </li>
      </ul>

      <h2 className="mt-12 font-display text-2xl font-semibold">Worked planning example</h2>
      <p className="mt-3">
        Full replacement, semi-detached, 80 m², natural slate, simple shape,
        scaffolding likely. Covering at £140–£230/m² is £11,200–£18,400
        before access. The calculator currently returns{" "}
        <strong>£12,000–£21,300</strong> (midpoint about £16,700) after
        semi-detached scaffold and waste. The same house in concrete tiles
        returns £7,600–£14,200. The gap is the covering, not a second chimney
        invented for the example.
      </p>
      <p className="mt-3 text-sm text-muted">
        Worked planning example from the RoofCost UK model — not a quotation,
        and not a price for matching salvaged Welsh slate.
      </p>

      <h2 className="mt-12 font-display text-2xl font-semibold">
        What a slate re-roof quote should include
      </h2>
      <p className="mt-3">
        The written quote should name the slate (origin, size, grading),
        scaffolding, strip-off, skip, new underlay and battens, the slates,
        ridges, hips and verges, flashing where disturbed, and VAT. Salvage
        of reusable slates, sorting, and any upgrade to leadwork are easy
        to leave out and expensive to add later.
      </p>

      <h2 className="mt-12 font-display text-2xl font-semibold">
        Planning range versus a quote
      </h2>
      <p className="mt-3">
        RoofCost UK is an indicative planning range for a full natural-slate
        replacement. A quote is measured on that roof, with a named product.
        A few slipped slates belong on the{" "}
        <Link to="/roof-repair-cost" className="underline">
          repair
        </Link>{" "}
        guide. For how the £/m² rate is meant to be used, see{" "}
        <Link to="/roof-replacement-cost-per-m2" className="underline">
          roof replacement cost per m²
        </Link>
        .
      </p>

      <div className="mt-10">
        <PartnerLeadForm placement="guide" />
      </div>
      <SourcesBlock />
    </main>
  );
}
