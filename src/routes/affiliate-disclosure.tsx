import { Link, createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { isPartnerActive, partnerConfig } from "@/config/partner";
import { siteConfig } from "@/config/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/affiliate-disclosure")({
  head: () =>
    pageHead({
      title: "Affiliate Disclosure | RoofCost UK",
      description:
        "How RoofCost UK may earn commission from quote-request partners. The calculator remains free.",
      path: "/affiliate-disclosure",
    }),
  component: AffiliatePage,
});

function AffiliatePage() {
  const active = isPartnerActive();
  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ label: "Affiliate disclosure", path: "/affiliate-disclosure" }]} />
      <h1 className="font-display text-4xl font-semibold">Affiliate disclosure</h1>
      <p className="mt-2 text-sm text-muted">Last updated {siteConfig.lastReviewed}.</p>

      <p className="mt-6">
        RoofCost UK provides free information and a free roofing cost calculator.
        You are not charged by RoofCost UK for using those tools.
      </p>
      <p className="mt-3">
        The site may earn a commission when a visitor submits an enquiry through
        selected commercial partners. Commercial relationships do not change the
        calculator result.
      </p>
      {active ? (
        <p className="mt-3">
          A quote-request partnership with {partnerConfig.partnerName} is active
          for pitched roof replacement enquiries. Where that form is shown, a
          short commission disclosure appears before you enter personal
          details. RoofCost UK does not publish commission amounts. Submitting
          a quote request does not change the calculator estimate.
        </p>
      ) : (
        <p className="mt-3">
          No quote-request partner is active on the public pages at the moment.
          We will not present an inactive relationship as a live service.
        </p>
      )}
      <p className="mt-3">
        Third-party providers set their own prices. RoofCost UK does not promise
        how they will quote, or that any particular trader will be available.
      </p>
      <p className="mt-8">
        See{" "}
        <Link to="/about" className="underline">
          about
        </Link>{" "}
        and{" "}
        <Link to="/privacy" className="underline">
          privacy
        </Link>
        .
      </p>
    </main>
  );
}
