import { Link, createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PartnerLeadForm, QuoteCtaButton } from "@/components/PartnerLeadForm";
import { SourcesBlock } from "@/components/SourcesBlock";
import { Button } from "@/components/ui/button";
import { isPartnerActive } from "@/config/partner";
import { LAST_REVIEWED_LABEL } from "@/config/pricingData";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/terraced-house-roof-replacement-cost")({
  head: () =>
    pageHead({
      title: "Terraced House Roof Replacement Cost UK (2026)",
      description:
        "Typical UK cost to reroof a terraced house, including mid-terrace planning ranges, shared boundaries, chimneys and awkward front or rear access.",
      path: "/terraced-house-roof-replacement-cost",
    }),
  component: TerracePage,
});

function TerracePage() {
  const partner = isPartnerActive();
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does it cost to reroof a terraced house in the UK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "RoofCost UK plans a typical mid-terrace pitched replacement at about £5,000–£10,000 in concrete tiles and £8,000–£16,000 in natural slate. A 55 m² simple concrete example currently returns £5,400–£10,200 in the calculator once scaffolding is included. Access down a rear alley can close that saving.",
        },
      },
      {
        "@type": "Question",
        name: "Is an end terrace priced like a semi-detached house?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An end terrace has an exposed gable, so scaffold and covering can sit closer to a small semi than to a mid-terrace. Mid-terrace jobs are dominated by two slopes, party walls and getting materials through the house or a back lane.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need neighbour permission to re-roof a terrace?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You often need practical access along a shared alley or over a neighbour’s yard even when the covering is only yours. Party-wall issues arise when work affects a shared structure. That is a legal and neighbour question, not something a cost webpage can settle.",
        },
      },
      {
        "@type": "Question",
        name: "Why isn’t a terrace always cheaper than a semi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The covering area is usually smaller, and RoofCost UK’s terrace scaffold band is a little lower than a semi. Victorian stacks, rear additions and no side access can eat the difference. Compare written quotes, not bedroom counts.",
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
          { label: "Terraced house", path: "/terraced-house-roof-replacement-cost" },
        ]}
      />
      <p className="text-sm text-muted">Last reviewed: {LAST_REVIEWED_LABEL}</p>
      <h1 className="mt-2 font-display text-4xl font-semibold">
        Terraced house roof replacement cost in the UK
      </h1>
      <p className="mt-4 text-lg text-muted">
        A typical mid-terrace re-roof is planned at about{" "}
        <strong>£5,000–£10,000</strong> in concrete tiles and{" "}
        <strong>£8,000–£16,000</strong> in natural slate. The house is narrower
        than a semi, but you only have the front door or a rear alley to get
        a scaffold and a skip in. That access problem is the terrace-specific
        cost, not the bedroom count.
      </p>

      <h2 className="mt-12 font-display text-2xl font-semibold">
        Mid-terrace planning ranges
      </h2>
      <p className="mt-3">
        Figures match the mid-terrace row on the{" "}
        <Link to="/new-roof-cost" className="underline">
          new roof cost
        </Link>{" "}
        table (about 45–65 m² of covering). End terraces with an exposed gable
        can sit higher.
      </p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[28rem] border-collapse text-sm">
          <caption className="mb-2 text-left text-muted">
            Terraced pitched replacement (planning, typical UK)
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
              <td className="py-2 pr-3">£5,000–£10,000</td>
              <td className="py-2">Mid-terrace, ~45–65 m²</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-3">Natural slate</td>
              <td className="py-2 pr-3">£8,000–£16,000</td>
              <td className="py-2">Same roof area; more labour per m²</td>
            </tr>
            <tr>
              <td className="py-2 pr-3">Scaffolding (model band)</td>
              <td className="py-2 pr-3">£550–£1,400</td>
              <td className="py-2">Often one main elevation; still material on a full re-roof</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-sm text-muted">
        Unknown roof area uses a 40–70 m² covering band. That is not a measured
        survey of a two-up two-down.
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
        No contact details required to see your estimate. Pick “terraced house”
        so the access allowance is not taken from a detached property.
      </p>

      <h2 className="mt-12 font-display text-2xl font-semibold">
        What is specific to a terraced re-roof
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        <li>
          <strong>Shared boundaries</strong> — the covering is yours; the
          abutments are not a private detached gable. Flashings against a
          neighbour wall have to be done once, properly.
        </li>
        <li>
          <strong>Front or rear access only</strong> — there is no side drive.
          Poles, a skip and tile packs often come through the house or a
          shared back lane.
        </li>
        <li>
          <strong>Scaffold arrangement</strong> — a mid-terrace may look like
          one elevation, but rear additions and a back bedroom roof still
          need a working platform. Pavement licences on a street frontage
          add time.
        </li>
        <li>
          <strong>Chimneys</strong> — older terraces stack flues on the party
          line. Leadwork around those stacks is a large part of a “small” roof.
        </li>
        <li>
          <strong>Party-wall context</strong> — not every re-cover is a party-wall
          job, but work that affects a shared wall or needs neighbour access
          should be talked through before a start date, not on the morning
          the scaffold arrives.
        </li>
      </ul>

      <h2 className="mt-12 font-display text-2xl font-semibold">Worked planning example</h2>
      <p className="mt-3">
        Full pitched replacement, terraced house, 55 m², concrete tiles, simple
        shape, scaffolding likely. The RoofCost UK calculator currently returns{" "}
        <strong>£5,400–£10,200</strong> (midpoint about £7,800). The same
        terrace in natural slate plans at £8,400–£15,100. Adding “some
        complexity” for chimneys or a rear valley on the concrete example
        lifts the top to about £11,200 — which is how a “cheap terrace”
        catches a semi-detached budget.
      </p>
      <p className="mt-3 text-sm text-muted">
        Worked planning example from the RoofCost UK model — not a quotation.
      </p>

      <h2 className="mt-12 font-display text-2xl font-semibold">
        What a terrace quote should include
      </h2>
      <p className="mt-3">
        Check for scaffolding (front and rear as needed), strip-off, waste
        from a street that may not take a large skip, new underlay and battens,
        covering, ridge and verge, flashing to chimneys and neighbour abutments,
        and VAT. Protection of shared passageways and making good internally
        after materials have come through the house are worth a line of their
        own.
      </p>

      <h2 className="mt-12 font-display text-2xl font-semibold">
        Planning range versus a quote
      </h2>
      <p className="mt-3">
        RoofCost UK is an indicative planning range. A contractor quote is
        measured on that terrace: alley width, stacks, and whether the rear
        addition is in the same job. A{" "}
        <Link to="/semi-detached-roof-replacement-cost" className="underline">
          3-bed semi
        </Link>{" "}
        is a different access problem; a{" "}
        <Link to="/bungalow-roof-replacement-cost" className="underline">
          bungalow
        </Link>{" "}
        is a different height-versus-area problem.
      </p>

      <div className="mt-10">
        <PartnerLeadForm placement="guide" />
      </div>
      <SourcesBlock />
    </main>
  );
}
