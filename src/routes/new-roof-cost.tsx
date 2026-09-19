import { Link, createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalculatorTeaser } from "@/components/CalculatorTeaser";
import { JsonLd } from "@/components/JsonLd";
import { PartnerLeadForm } from "@/components/PartnerLeadForm";
import { SourcesBlock } from "@/components/SourcesBlock";
import { LAST_REVIEWED_LABEL } from "@/config/pricingData";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/new-roof-cost")({
  head: () =>
    pageHead({
      title: "New Roof Cost UK | Roof Replacement Price Guide",
      description:
        "Typical UK roof replacement costs, what drives the price, and when a repair may still make sense. Indicative planning ranges, not quotations.",
      path: "/new-roof-cost",
    }),
  component: NewRoofPage,
});

function NewRoofPage() {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does a new roof cost in the UK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most domestic pitched roof replacements in 2026 fall somewhere between about £5,500 and £22,000, depending on size, covering and access. A typical 3-bed semi in concrete tiles is often planned around £6,500–£13,000 including scaffolding.",
        },
      },
      {
        "@type": "Question",
        name: "Is a new roof cheaper than repairing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A small repair is usually cheaper. Replacement starts to make sense when coverings, underlay and battens are failing across the roof, when leaks keep returning, or when a surveyor or roofer advises that patching will not last.",
        },
      },
    ],
  };

  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={faq} />
      <Breadcrumbs items={[{ label: "New roof cost", path: "/new-roof-cost" }]} />
      <p className="text-sm text-muted">Last reviewed: {LAST_REVIEWED_LABEL}</p>
      <h1 className="mt-2 font-display text-4xl font-semibold">New roof cost in the UK</h1>
      <p className="mt-4 text-lg text-muted">
        A full pitched roof replacement on a typical UK house is often a
        five-figure job once scaffolding, strip-out, new underlay, battens and
        coverings are included. The spread is wide because slate is not concrete,
        and a simple gable is not a cut-up Victorian roof.
      </p>
      <div className="mt-8">
        <CalculatorTeaser title="Estimate a replacement range" />
      </div>
      <h2 className="mt-12 font-display text-2xl font-semibold">Typical UK cost range</h2>
      <p className="mt-3">
        Published 2026 guides commonly place a full re-roof between about{" "}
        <strong>£5,500 and £22,000</strong> for ordinary houses, with many
        3-bed semis landing near the middle of that spread in concrete tiles.
        Natural slate sits higher. These are planning bands, not quotes.
      </p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[28rem] border-collapse text-sm">
          <caption className="mb-2 text-left text-muted">
            Illustrative pitched replacement totals (planning, typical UK, VAT-inclusive bands)
          </caption>
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-2 pr-3 font-semibold">Property (typical roof area)</th>
              <th className="py-2 pr-3 font-semibold">Concrete tiles</th>
              <th className="py-2 font-semibold">Natural slate</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="py-2 pr-3">Mid-terrace (~45–65 m²)</td>
              <td className="py-2 pr-3">£5,000–£10,000</td>
              <td className="py-2">£8,000–£16,000</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-3">3-bed semi (~60–90 m²)</td>
              <td className="py-2 pr-3">£6,500–£13,000</td>
              <td className="py-2">£11,000–£22,000</td>
            </tr>
            <tr className="border-b border-border">
              <td className="py-2 pr-3">Detached (~90–140 m²)</td>
              <td className="py-2 pr-3">£9,000–£18,000</td>
              <td className="py-2">£15,000–£30,000</td>
            </tr>
            <tr>
              <td className="py-2 pr-3">Bungalow (~50–95 m²)</td>
              <td className="py-2 pr-3">£5,500–£12,000</td>
              <td className="py-2">£9,000–£20,000</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-sm text-muted">
        Clay tiles usually sit between concrete and slate. London and the South
        East often quote above these national planning bands.
      </p>
      <h2 className="mt-12 font-display text-2xl font-semibold">What usually drives the price</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        <li><strong>Roof area and pitch</strong> — more square metres, steeper work, more labour.</li>
        <li><strong>Covering</strong> — concrete is the budget workhorse; clay costs more to buy and lay; natural slate needs skilled labour.</li>
        <li><strong>Shape</strong> — hips, valleys, dormers and chimneys add cutting, flashing and time.</li>
        <li><strong>Scaffolding and access</strong> — a typical two-storey house often needs a full scaffold; parking or rear access can add hire days.</li>
        <li><strong>Strip-out and waste</strong> — old coverings, felt and battens have to leave the site.</li>
        <li><strong>What is found underneath</strong> — rotten timber, failed underlay or a deck that will not take a new covering.</li>
      </ul>
      <h2 className="mt-12 font-display text-2xl font-semibold">What is normally included</h2>
      <p className="mt-3">
        A proper replacement quotation should say whether it includes
        scaffolding, skip, strip of the existing covering, new underlay and
        battens, new covering, ridge and verge detailing, flashing where
        disturbed, and VAT. If a line is missing, ask. Structural timber,
        insulation upgrades, fascias, guttering and rooflights are often extra.
      </p>
      <h2 className="mt-12 font-display text-2xl font-semibold">Repair or replace?</h2>
      <p className="mt-3">
        A handful of slipped tiles or a short run of flashing is usually a{" "}
        <Link to="/roof-repair-cost" className="underline">repair</Link>.
        Replacement is more often considered when the covering is at the end
        of its life, leaks keep returning in different places, or the underlay
        and battens would not survive another winter of patching. That decision
        belongs to a competent inspection, not a webpage.
      </p>
      <p className="mt-3">
        Flat coverings are a different product — see{" "}
        <Link to="/flat-roof-cost" className="underline">flat roof costs</Link>.
      </p>
      <h2 className="mt-12 font-display text-2xl font-semibold">How to obtain actual quotes</h2>
      <p className="mt-3">
        Ask for written quotations that you can compare line by line. Check
        insurance, waste licences and whether the installer can self-certify
        relevant work. Do not work at height yourself to “save a survey”.
      </p>
      <div className="mt-10">
        <PartnerLeadForm placement="guide" />
      </div>
      <SourcesBlock />
    </main>
  );
}
