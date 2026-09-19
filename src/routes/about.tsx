import { Link, createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LAST_REVIEWED_LABEL } from "@/config/pricingData";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: "About RoofCost UK | Independent Roofing Cost Information",
      description:
        "RoofCost UK is an independent information website that helps UK homeowners understand roofing costs. We are not a contractor or surveyor.",
      path: "/about",
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ label: "About", path: "/about" }]} />
      <h1 className="font-display text-4xl font-semibold">About RoofCost UK</h1>
      <p className="mt-4 text-lg text-muted">
        RoofCost UK exists to make typical UK roofing costs easier to understand
        before you ask anyone to climb on your house.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold">How estimates are produced</h2>
      <p className="mt-3">
        The calculator applies published 2026 UK market cost benchmarks to the
        job type, property, covering, complexity and access you enter. Assumptions
        live in a dedicated pricing file so they can be updated without rewriting
        the pages. Last reviewed {LAST_REVIEWED_LABEL}.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold">What this site is not</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        <li>Not a roofing contractor and not a brokerage for a named roofer.</li>
        <li>Not a surveyor, structural engineer or building inspector.</li>
        <li>Not a substitute for an inspection of your actual roof.</li>
      </ul>

      <h2 className="mt-10 font-display text-2xl font-semibold">How the site may be funded</h2>
      <p className="mt-3">
        The calculator and guides are free. RoofCost UK may later earn a
        commission if you choose to request quotes through an approved partner.
        That relationship does not change the calculator result. See the{" "}
        <Link to="/affiliate-disclosure" className="underline">
          affiliate disclosure
        </Link>
        .
      </p>

      <p className="mt-8 text-sm text-muted">
        There is no invented editorial team and no fabricated review count on
        this website.
      </p>
    </main>
  );
}
