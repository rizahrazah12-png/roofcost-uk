import { Link, createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PartnerLeadForm, QuoteCtaButton } from "@/components/PartnerLeadForm";
import { SourcesBlock } from "@/components/SourcesBlock";
import { Button } from "@/components/ui/button";
import { isPartnerActive } from "@/config/partner";
import { LAST_REVIEWED_LABEL } from "@/config/pricingData";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/roof-replacement-cost-per-m2")({
  head: () =>
    pageHead({
      title: "Roof Replacement Cost per m² UK (2026) | RoofCost UK",
      description:
        "UK roof replacement cost per m² for concrete, clay and natural slate. What a rate includes, why floor area is the wrong starting point, and how to turn m² into a planning range.",
      path: "/roof-replacement-cost-per-m2",
    }),
  component: CostPerM2Page,
});

function CostPerM2Page() {
  const partner = isPartnerActive();
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does roof replacement cost per m² in the UK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "RoofCost UK’s 2026 pitched-replacement planning rates are about £85–£145/m² for concrete tiles, £110–£175/m² for clay tiles and £140–£230/m² for natural slate. Those bands are covering-related planning rates, not a finished quotation, and scaffolding, waste and awkward roof shapes sit on top.",
        },
      },
      {
        "@type": "Question",
        name: "Can I multiply my house floor area by a £/m² rate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Not if you want a useful number. Pitched roof area is usually larger than the ground-floor footprint because of slope, overhangs and hips. Using floor area understates the covering, then ignores scaffold and strip-out.",
        },
      },
      {
        "@type": "Question",
        name: "Does cost per m² include scaffolding?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In the RoofCost UK calculator it does not. Scaffolding is added as a separate access lump so a bungalow and a two-storey semi are not given the same access cost. Always check whether a contractor’s £/m² rate already bundles access.",
        },
      },
      {
        "@type": "Question",
        name: "Why do some published supply-and-fit rates look higher?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Trade-marketplace covering rates sometimes sit above whole-job tables once you add a full scaffold. RoofCost UK calibrates £/m² so that a typical simple re-roof plus access lands near published whole-job bands, rather than stacking the highest covering rate on top of the highest scaffold figure.",
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
          { label: "Cost per m²", path: "/roof-replacement-cost-per-m2" },
        ]}
      />
      <p className="text-sm text-muted">Last reviewed: {LAST_REVIEWED_LABEL}</p>
      <h1 className="mt-2 font-display text-4xl font-semibold">
        Roof replacement cost per m² in the UK
      </h1>
      <p className="mt-4 text-lg text-muted">
        A useful UK planning rate for a pitched re-roof is roughly{" "}
        <strong>£85–£145 per m²</strong> in concrete tiles,{" "}
        <strong>£110–£175</strong> in clay and <strong>£140–£230</strong> in
        natural slate. Treat those as covering-related bands, not a price for
        your house. The calculator still has to add access, waste and shape.
      </p>

      <h2 className="mt-12 font-display text-2xl font-semibold">
        Planning rates by covering
      </h2>
      <p className="mt-3">
        These are the pitched-replacement £/m² assumptions currently used in
        the RoofCost UK model. They are planning bands, VAT-aware in the same
        sense as the rest of the site, and they are not contractor day-rates.
      </p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[28rem] border-collapse text-sm">
          <caption className="mb-2 text-left text-muted">
            Pitched replacement covering rates (planning £/m²)
          </caption>
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-2 pr-3 font-semibold">Covering</th>
              <th className="py-2 pr-3 font-semibold">Planning £/m²</th>
              <th className="py-2 font-semibold">What this rate is for</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="py-2 pr-3">Concrete tiles</td>
              <td className="py-2 pr-3">£85–£145</td>
              <td className="py-2">Typical interlocking concrete re-cover</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-3">Clay tiles</td>
              <td className="py-2 pr-3">£110–£175</td>
              <td className="py-2">Sits above concrete and below natural slate</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-3">Natural slate</td>
              <td className="py-2 pr-3">£140–£230</td>
              <td className="py-2">Typical natural slate, not heritage Welsh extras</td>
            </tr>
            <tr>
              <td className="py-2 pr-3">Artificial / fibre-cement slate</td>
              <td className="py-2 pr-3">£95–£160</td>
              <td className="py-2">Interpolated between concrete and clay</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-sm text-muted">
        Unknown covering uses the full concrete-to-slate span so the model
        does not silently pick the cheapest product.
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
        No contact details required to see your estimate. Enter an approximate
        roof area in m² if you have one; if you do not, the calculator uses a
        wider property-type band instead of inventing a size.
      </p>

      <h2 className="mt-12 font-display text-2xl font-semibold">
        Why floor area × rate is the wrong quote
      </h2>
      <p className="mt-3">
        Homeowners often take the ground-floor footprint — say 70 m² for a
        3-bed semi — and multiply it by a rate found online. A pitched roof
        is a slope, not a ceiling. Pitch, hips and overhangs mean the covering
        area is larger than the rooms below. On many houses the roof is tens
        of percent bigger than the floor plate.
      </p>
      <p className="mt-3">
        Even a correct roof m² still misses the parts that are not “per metre”.
        Scaffolding on a two-storey semi is a lump, not a rate. Strip-out and
        a skip are lumps. Valleys, chimneys and a rotten batten run are time,
        not square metres. A £/m² figure is a planning tool for the covering
        layer, not a substitute for those extras.
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        <li>
          <strong>Roof slope</strong> — steeper pitches need more covering for
          the same plan area and slower working.
        </li>
        <li>
          <strong>Actual roof area</strong> — measure slopes, or let the
          calculator use a property band if you cannot.
        </li>
        <li>
          <strong>Access and scaffold</strong> — hired by elevation and duration,
          not by m².
        </li>
        <li>
          <strong>Valleys, chimneys and detailing</strong> — cutting and flashing
          do not scale linearly with area.
        </li>
        <li>
          <strong>Strip-out and timber</strong> — found after the old covering
          comes off, so they cannot live inside a tidy rate.
        </li>
      </ul>

      <h2 className="mt-12 font-display text-2xl font-semibold">Worked planning example</h2>
      <p className="mt-3">
        Take a simple 80 m² concrete-tile roof on a semi-detached house, with
        scaffolding allowed for. Covering at £85–£145/m² is £6,800–£11,600
        before anything else. The RoofCost UK calculator then adds the
        semi-detached scaffold band and replacement waste, and rounds to the
        nearest £100. The on-screen planning range for that input is currently{" "}
        <strong>£7,600–£14,200</strong> (midpoint about £10,900).
      </p>
      <p className="mt-3 text-sm text-muted">
        That is a worked planning example from the RoofCost UK model, not a
        contractor quotation and not a survey of a real roof.
      </p>
      <p className="mt-3">
        The same 80 m² in{" "}
        <Link to="/slate-roof-replacement-cost" className="underline">
          natural slate
        </Link>{" "}
        currently plans at £12,000–£21,300 once access is included — which is
        why a single “average £/m²” for every covering is not usable.
      </p>

      <h2 className="mt-12 font-display text-2xl font-semibold">
        What a quotation should spell out
      </h2>
      <p className="mt-3">
        If a roofer quotes “£X per m²”, ask what area they measured and what
        sits outside that rate. A comparable written quote usually says whether
        scaffolding, strip of the existing covering, skip, new underlay and
        battens, the covering itself, ridge and verge, flashing where disturbed,
        and VAT are inside the number. Timber repairs and extras found on strip
        are often provisional.
      </p>

      <h2 className="mt-12 font-display text-2xl font-semibold">
        Planning range versus a quote
      </h2>
      <p className="mt-3">
        RoofCost UK turns the area and covering you enter into an indicative
        planning range. A quote for a pitched roof replacement is about the
        actual property: access, condition and a measured roof. See the{" "}
        <Link to="/new-roof-cost" className="underline">
          new roof cost
        </Link>{" "}
        overview or{" "}
        <Link to="/concrete-tile-roof-replacement-cost" className="underline">
          concrete tile replacement
        </Link>{" "}
        if you already know the covering.
      </p>

      <div className="mt-10">
        <PartnerLeadForm placement="guide" />
      </div>
      <SourcesBlock />
    </main>
  );
}
