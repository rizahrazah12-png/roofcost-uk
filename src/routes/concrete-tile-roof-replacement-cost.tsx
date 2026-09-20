import { Link, createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PartnerLeadForm, QuoteCtaButton } from "@/components/PartnerLeadForm";
import { SourcesBlock } from "@/components/SourcesBlock";
import { Button } from "@/components/ui/button";
import { isPartnerActive } from "@/config/partner";
import { LAST_REVIEWED_LABEL } from "@/config/pricingData";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/concrete-tile-roof-replacement-cost")({
  head: () =>
    pageHead({
      title: "Concrete Tile Roof Replacement Cost UK (2026)",
      description:
        "UK cost to replace a concrete tile roof, including £/m² planning rates and whole-house ranges. This is a full re-cover guide, not a tile-repair page.",
      path: "/concrete-tile-roof-replacement-cost",
    }),
  component: ConcretePage,
});

function ConcretePage() {
  const partner = isPartnerActive();
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does a concrete tile roof replacement cost in the UK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "RoofCost UK uses a covering rate of about £85–£145/m² for concrete tiles. Whole-house planning totals currently run from about £5,000–£10,000 on a mid-terrace to £6,500–£13,000 on a 3-bed semi, with access included in those published bands. An 80 m² simple semi example returns £7,600–£14,200 in the calculator.",
        },
      },
      {
        "@type": "Question",
        name: "Why is concrete usually the lower-cost pitched covering?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Interlocking concrete tiles are widely stocked, relatively quick to lay on a simple roof, and cheaper to buy than clay or natural slate. That is why they sit at the bottom of the RoofCost UK pitched-material table. Profile, colour matching and a cut-up roof can still push a concrete job up the band.",
        },
      },
      {
        "@type": "Question",
        name: "Is replacing a few concrete tiles the same as a new roof?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. A handful of broken tiles is a repair. This page is about stripping and re-covering the pitched roof. Repair bands on RoofCost UK start far lower — often a few hundred pounds plus access — and are the wrong tool for a full replacement.",
        },
      },
      {
        "@type": "Question",
        name: "Can I overlay new concrete tiles on the old ones?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Some systems allow overlay in limited cases; many roofs still need a strip so underlay and battens can be renewed. RoofCost UK does not assume overlay savings on a pitched replacement. That decision belongs to an inspection of weight, structure and the existing build-up.",
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
          { label: "Concrete tiles", path: "/concrete-tile-roof-replacement-cost" },
        ]}
      />
      <p className="text-sm text-muted">Last reviewed: {LAST_REVIEWED_LABEL}</p>
      <h1 className="mt-2 font-display text-4xl font-semibold">
        Concrete tile roof replacement cost in the UK
      </h1>
      <p className="mt-4 text-lg text-muted">
        Concrete is the workhorse covering in the RoofCost UK model: about{" "}
        <strong>£85–£145 per m²</strong> for a pitched replacement, and
        whole-house planning totals from roughly <strong>£5,000</strong> on a
        mid-terrace up to the mid-teens on a larger or more awkward roof.
        This page is a full re-cover, not a price for swapping a few tiles.
      </p>

      <h2 className="mt-12 font-display text-2xl font-semibold">
        Concrete tile rates and house totals
      </h2>
      <p className="mt-3">
        Per-m² figures are the model’s covering rate. House totals are the
        same illustrative bands as the concrete column on the{" "}
        <Link to="/new-roof-cost" className="underline">
          new roof cost
        </Link>{" "}
        table.
      </p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[28rem] border-collapse text-sm">
          <caption className="mb-2 text-left text-muted">
            Concrete tile pitched replacement (planning)
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
              <td className="py-2 pr-3">Covering rate</td>
              <td className="py-2 pr-3">£85–£145/m²</td>
              <td className="py-2">Does not include scaffold as a rate</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-3">Mid-terrace total</td>
              <td className="py-2 pr-3">£5,000–£10,000</td>
              <td className="py-2">~45–65 m² typical covering</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-3">3-bed semi total</td>
              <td className="py-2 pr-3">£6,500–£13,000</td>
              <td className="py-2">~60–90 m² typical covering</td>
            </tr>
            <tr>
              <td className="py-2 pr-3">Bungalow total</td>
              <td className="py-2 pr-3">£5,500–£12,000</td>
              <td className="py-2">~50–95 m²; access cheaper, area may not be</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-sm text-muted">
        The same roofs in{" "}
        <Link to="/slate-roof-replacement-cost" className="underline">
          natural slate
        </Link>{" "}
        sit clearly above these totals in the model.
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
        No contact details required to see your estimate. Choose concrete tiles
        as the pitched covering so the range is not widened to slate.
      </p>

      <h2 className="mt-12 font-display text-2xl font-semibold">
        Why concrete sits at the low end of the model
      </h2>
      <p className="mt-3">
        Interlocking concrete tiles cover a roof in larger units than slate.
        They are the default covering on many post-war UK houses, so profiles
        are widely available and labour per square metre is usually lower than
        clay or natural slate. RoofCost UK therefore places concrete at
        £85–£145/m², clay above it, and natural slate higher still. That
        ranking is a planning observation, not a claim that every concrete
        roof is “cheap”.
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        <li>
          <strong>Tile profile</strong> — a modern interlocking tile is faster
          than a small plain tile. Matching an older profile can slow the job.
        </li>
        <li>
          <strong>Roof area</strong> — the rate still multiplies by actual
          covering area, not by downstairs floor space.
        </li>
        <li>
          <strong>Ridge and verge</strong> — dry-fix or mortar, plus bargeboards
          if they are in the same visit.
        </li>
        <li>
          <strong>Weight and specification</strong> — concrete is heavy. Unusual
          specifications or a structure that needs checking are inspection
          items, not a webpage adder.
        </li>
        <li>
          <strong>Labour and access</strong> — a simple gable keeps you near the
          bottom of the band; poor access does not care that the tile is cheap.
        </li>
      </ul>

      <h2 className="mt-12 font-display text-2xl font-semibold">Worked planning example</h2>
      <p className="mt-3">
        Full replacement, semi-detached, 80 m², concrete tiles, simple shape,
        scaffolding likely. Covering at the model rate is £6,800–£11,600
        before access. The calculator currently returns{" "}
        <strong>£7,600–£14,200</strong> once semi-detached scaffold and waste
        are included (midpoint about £10,900). The identical inputs in natural
        slate return £12,000–£21,300 — the covering gap, not a different house.
      </p>
      <p className="mt-3 text-sm text-muted">
        Worked planning example from the RoofCost UK model — not a quotation.
      </p>

      <h2 className="mt-12 font-display text-2xl font-semibold">
        What a concrete re-cover quote should include
      </h2>
      <p className="mt-3">
        A comparable quote names the tile (profile and finish), scaffolding,
        strip of the old covering, skip, new underlay and battens, the tiles,
        ridge and verge, flashing where disturbed, and VAT. Mixing a few
        leftover tiles into a “repair” line is not a replacement quotation.
      </p>

      <h2 className="mt-12 font-display text-2xl font-semibold">
        Planning range versus a quote
      </h2>
      <p className="mt-3">
        RoofCost UK is an indicative planning range for a full concrete-tile
        replacement. A quote is for the actual roof: the profile, the area and
        what is under the existing tiles. Isolated broken tiles belong on the{" "}
        <Link to="/roof-repair-cost" className="underline">
          repair
        </Link>{" "}
        guide. For the rate itself, see{" "}
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
