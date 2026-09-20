import { Link, createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalculatorTeaser } from "@/components/CalculatorTeaser";
import { JsonLd } from "@/components/JsonLd";
import { SourcesBlock } from "@/components/SourcesBlock";
import { LAST_REVIEWED_LABEL } from "@/config/pricingData";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/flat-roof-cost")({
  head: () =>
    pageHead({
      title: "Flat Roof Cost UK | Replacement Cost per m²",
      description:
        "UK flat roof covering costs per m² for felt, EPDM and GRP. These figures are for replacing a roof covering, not building an extension.",
      path: "/flat-roof-cost",
    }),
  component: FlatRoofPage,
});

function FlatRoofPage() {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does a flat roof cost per m² in the UK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In 2026, fitted domestic bands are often around £50–£85 per m² for felt, £72–£110 for EPDM and £88–£135 for GRP on a reasonably sound deck, before insulation upgrades, new boarding or awkward access.",
        },
      },
    ],
  };

  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={faq} />
      <Breadcrumbs items={[{ label: "Flat roof cost", path: "/flat-roof-cost" }]} />
      <p className="text-sm text-muted">Last reviewed: {LAST_REVIEWED_LABEL}</p>
      <h1 className="mt-2 font-display text-4xl font-semibold">Flat roof cost in the UK</h1>
      <p className="mt-4 text-lg text-muted">
        Flat roofs on garages, dormers and extensions are usually priced per
        square metre, then adjusted for edges, outlets, the condition of the
        deck and whether insulation has to be brought up to current standards.
      </p>

      <div className="mt-8">
        <CalculatorTeaser title="Estimate a flat roof range" />
      </div>

      <h2 className="mt-12 font-display text-2xl font-semibold">Covering cost, not construction cost</h2>
      <p className="mt-3">
        The figures on this page are for replacing a <strong>flat roof covering</strong> on
        an existing garage, dormer or extension. They are not the cost of
        building a new extension, adding a storey, or constructing a new
        structure from the walls up. Those are different projects with
        different budgets.
      </p>

      <h2 className="mt-12 font-display text-2xl font-semibold">Cost per m² by system</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[30rem] border-collapse text-sm">
          <caption className="mb-2 text-left text-muted">
            Fitted covering on a sound deck — Checkatrade-style planning bands, extras excluded
          </caption>
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-2 pr-3 font-semibold">System</th>
              <th className="py-2 pr-3 font-semibold">Planning £/m²</th>
              <th className="py-2 font-semibold">Typical service life</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="py-2 pr-3">Felt / bitumen</td>
              <td className="py-2 pr-3">£50–£80</td>
              <td className="py-2">About 15–20 years</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-3">EPDM rubber</td>
              <td className="py-2 pr-3">£80–£100</td>
              <td className="py-2">Often 20–40+ years if detailed well</td>
            </tr>
            <tr>
              <td className="py-2 pr-3">GRP / fibreglass</td>
              <td className="py-2">£95–£120</td>
              <td className="py-2">Often 20–30 years</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 font-display text-2xl font-semibold">Worked size examples</h2>
      <p className="mt-3">
        A single garage of about 20 m² in EPDM often plans around £1,500–£2,800
        before a rotten deck or full scaffold. A 35 m² rear extension is more
        commonly £2,500–£5,500 depending on system and insulation. Small bays
        and dormers can look expensive per m² because edge work dominates.
      </p>

      <h2 className="mt-12 font-display text-2xl font-semibold">The three common systems</h2>
      <h3 className="mt-6 font-display text-xl font-semibold">Felt</h3>
      <p className="mt-2">
        Built-up or torch-on bitumen is still widely used, especially on
        simpler, lower-budget roofs. Lifespan is shorter than EPDM or GRP when
        specified cheaply. Hot-works rules may apply to torch-on systems.
      </p>
      <h3 className="mt-6 font-display text-xl font-semibold">EPDM rubber</h3>
      <p className="mt-2">
        A flexible single-ply sheet, often chosen for garages and extensions.
        Performance depends on seams, corners, outlets and upstands — not just
        the membrane brand.
      </p>
      <h3 className="mt-6 font-display text-xl font-semibold">GRP / fibreglass</h3>
      <p className="mt-2">
        A resin laminate with trims, often chosen where a harder finish or
        more complex shape is needed. It has to be laid in suitable conditions.
        Walk-on terraces are a different specification from a simple garage.
      </p>

      <h2 className="mt-12 font-display text-2xl font-semibold">What else changes the price</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        <li>Roof area and how interrupted it is by lanterns, pipes or walls.</li>
        <li>Stripping the existing covering and whether the deck is sound.</li>
        <li>Firring pieces or new falls if water is ponding.</li>
        <li>Insulation to meet Building Regulations on a replacement.</li>
        <li>Edge trims, drip details and guttering while access is up.</li>
        <li>Scaffolding or tower access, especially above a first floor.</li>
      </ul>

      <p className="mt-8">
        If the rest of the house is pitched, read{" "}
        <Link to="/new-roof-cost" className="underline">
          new roof costs
        </Link>{" "}
        as well. Localised leaks may still be a{" "}
        <Link to="/roof-repair-cost" className="underline">
          repair
        </Link>
        . The{" "}
        <Link to="/roof-cost-calculator" className="underline">
          calculator
        </Link>{" "}
        can combine area, system and access into a planning range.
      </p>

      <SourcesBlock />
    </main>
  );
}
