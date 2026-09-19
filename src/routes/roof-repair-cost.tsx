import { Link, createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalculatorTeaser } from "@/components/CalculatorTeaser";
import { JsonLd } from "@/components/JsonLd";
import { PartnerLeadForm } from "@/components/PartnerLeadForm";
import { SourcesBlock } from "@/components/SourcesBlock";
import { LAST_REVIEWED_LABEL } from "@/config/pricingData";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/roof-repair-cost")({
  head: () =>
    pageHead({
      title: "Roof Repair Cost UK | Typical Roofing Repair Prices",
      description:
        "Typical UK roof repair prices for tiles, leaks and flashing, plus when to get a professional inspection. Not DIY instructions.",
      path: "/roof-repair-cost",
    }),
  component: RepairPage,
});

function RepairPage() {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does a roof repair cost in the UK?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Many small domestic repairs in 2026 fall between about £150 and £800 if access is straightforward. Flashing, ridge work or several damaged areas often run from several hundred pounds into the low thousands. Scaffolding can exceed the repair itself.",
        },
      },
    ],
  };

  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd data={faq} />
      <Breadcrumbs items={[{ label: "Roof repair cost", path: "/roof-repair-cost" }]} />
      <p className="text-sm text-muted">Last reviewed: {LAST_REVIEWED_LABEL}</p>
      <h1 className="mt-2 font-display text-4xl font-semibold">Roof repair cost in the UK</h1>
      <p className="mt-4 text-lg text-muted">
        Roof repairs are priced by access and extent, not by a neat national
        average. A slipped tile on a bungalow is a different job from a leaking
        valley on a three-storey terrace.
      </p>
      <div className="mt-8">
        <CalculatorTeaser title="Estimate a repair range" />
      </div>
      <div className="mt-8 rounded-lg border border-border bg-warn-bg p-4 text-sm text-fg">
        Working at height is dangerous. This page does not give DIY roofing
        instructions. If there is structural damage, unsafe access, or water
        entering the house, arrange a professional assessment.
      </div>
      <h2 className="mt-12 font-display text-2xl font-semibold">When a professional inspection matters</h2>
      <p className="mt-3">
        Use a competent roofing professional if you can see sagging, missing
        large sections, storm damage, water pouring in, or you are not sure
        whether the structure is sound. A website cannot diagnose that. Do not
        climb the roof to “have a look”.
      </p>
      <h2 className="mt-12 font-display text-2xl font-semibold">Typical repair bands</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[28rem] border-collapse text-sm">
          <caption className="mb-2 text-left text-muted">Planning ranges for common domestic repairs (access extra)</caption>
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-2 pr-3 font-semibold">Job</th>
              <th className="py-2 font-semibold">Indicative range</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["A few tiles or slates, easy access", "£150–£500"],
              ["Up to around 10 tiles, or awkward matching", "£300–£800"],
              ["Minor leak once the cause is found", "£200–£700"],
              ["Lead flashing (chimney or abutment)", "£300–£1,500"],
              ["Ridge re-bedding or replacement", "£400–£1,500"],
              ["Larger damaged section / several areas", "£800–£3,000+"],
              ["Emergency attendance", "Often £250–£1,200 before the lasting repair"],
            ].map(([job, cost]) => (
              <tr key={job} className="border-b border-border">
                <td className="py-2 pr-3">{job}</td>
                <td className="py-2">{cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-sm text-muted">
        Trade guides often quote repair rates per m² exclusive of VAT and
        without access equipment. Homeowner invoices usually look higher once
        those are added.
      </p>
      <h2 className="mt-12 font-display text-2xl font-semibold">What the job actually is</h2>
      <h3 className="mt-6 font-display text-xl font-semibold">Minor or localised work</h3>
      <p className="mt-2">A small number of cracked or slipped tiles, a short mortar failure, or an obvious puncture. Cost is dominated by getting a competent person onto the roof safely, not by the price of one tile.</p>
      <h3 className="mt-6 font-display text-xl font-semibold">Tile or slate replacement</h3>
      <p className="mt-2">Matching older coverings can take time. Reclaimed or heritage pieces cost more than a standard concrete interlocking tile.</p>
      <h3 className="mt-6 font-display text-xl font-semibold">Flashing and valleys</h3>
      <p className="mt-2">Water often enters where the roof meets a chimney, wall or valley, not through the middle of a slope. Lead work is skilled and is priced by the detail, not by a single “leak fee”.</p>
      <h3 className="mt-6 font-display text-xl font-semibold">Leak investigation</h3>
      <p className="mt-2">Staining on a ceiling does not always sit under the hole. A roofer may need to inspect from inside and outside before quoting a lasting fix. Temporary weatherproofing is not the same as a completed repair.</p>
      <h3 className="mt-6 font-display text-xl font-semibold">Larger damaged sections</h3>
      <p className="mt-2">Once underlay, battens or a whole slope are failing, quotes start to resemble a partial re-roof. At that point, compare the repair with a <Link to="/new-roof-cost" className="underline">full replacement</Link>.</p>
      <h2 className="mt-12 font-display text-2xl font-semibold">Scaffolding</h2>
      <p className="mt-3">Many two-storey repairs need more than a ladder. Scaffold or tower hire can run from a few hundred pounds to over £2,000 depending on the elevation. If two quotes differ wildly, check whether access is included.</p>
      <p className="mt-8">For membranes rather than tiles, see <Link to="/flat-roof-cost" className="underline">flat roof costs</Link>. To turn the details of your job into a planning band, use the <Link to="/roof-cost-calculator" className="underline">roof cost calculator</Link>.</p>
      <div className="mt-10"><PartnerLeadForm placement="guide" /></div>
      <SourcesBlock />
    </main>
  );
}
