import { Link, createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteConfig } from "@/config/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () =>
    pageHead({
      title: "Terms and Disclaimer | RoofCost UK",
      description:
        "Terms of use and important disclaimer for RoofCost UK calculator results and cost guides.",
      path: "/terms",
    }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ label: "Terms", path: "/terms" }]} />
      <h1 className="font-display text-4xl font-semibold">Terms and disclaimer</h1>
      <p className="mt-2 text-sm text-muted">Last updated {siteConfig.lastReviewed}.</p>

      <h2 className="mt-10 font-display text-2xl font-semibold">Using the site</h2>
      <p className="mt-3">
        These pages are for general information about typical UK roofing costs.
        They are not a contract to carry out work, and they are not professional
        advice.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold">Calculator results</h2>
      <p className="mt-3">
        Calculator results are indicative estimates only. They are not
        quotations. Actual costs vary. A physical inspection may reveal
        additional work. Figures are rounded planning ranges based on public
        UK cost benchmarks and the answers you enter.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold">No professional services</h2>
      <p className="mt-3">
        RoofCost UK does not provide roofing, surveying, structural-engineering
        or professional building advice. You should obtain appropriate
        professional advice where needed, especially where there is water
        ingress, unsafe access or possible structural damage.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold">Third parties</h2>
      <p className="mt-3">
        If you follow a partner quote request, that company’s terms apply to
        the enquiry you submit. RoofCost UK does not guarantee that any trader
        will quote, or what they will charge.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold">Liability</h2>
      <p className="mt-3">
        To the fullest extent permitted by UK law, RoofCost UK is not liable
        for decisions made solely on the basis of a planning range or article
        on this website. Nothing here excludes liability that cannot legally be
        excluded, including for death or personal injury caused by negligence
        or for fraud.
      </p>

      <p className="mt-8">
        Related:{" "}
        <Link to="/privacy" className="underline">
          privacy policy
        </Link>
        .
      </p>
    </main>
  );
}
