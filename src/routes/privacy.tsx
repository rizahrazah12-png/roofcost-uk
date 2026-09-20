import { Link, createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { isPartnerActive, partnerConfig } from "@/config/partner";
import { analyticsConfig } from "@/config/analytics";
import { siteConfig } from "@/config/site";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead({
      title: "Privacy Policy | RoofCost UK",
      description:
        "How RoofCost UK handles information. The calculator runs in your browser and does not require personal details.",
      path: "/privacy",
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const analyticsOn = analyticsConfig.enabled && Boolean(analyticsConfig.googleAnalyticsId || analyticsConfig.googleTagManagerId);
  const partnerOn = isPartnerActive();

  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ label: "Privacy", path: "/privacy" }]} />
      <h1 className="font-display text-4xl font-semibold">Privacy policy</h1>
      <p className="mt-2 text-sm text-muted">Last updated {siteConfig.lastReviewed}.</p>

      <h2 className="mt-10 font-display text-2xl font-semibold">Who we are</h2>
      <p className="mt-3">
        RoofCost UK is an independent information website. It is not a roofing
        contractor.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold">The calculator</h2>
      <p className="mt-3">
        The roof cost calculator runs in your browser. Answers are used to
        produce an on-screen planning range. They are not sent to RoofCost UK
        servers as part of the estimate, and you do not have to give a name,
        email address or telephone number to see a result.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold">Contact</h2>
      <p className="mt-3">
        If you use the contact page, your message is sent using your own email
        application to the address configured by the site operator. That email
        then follows ordinary email handling.
      </p>

      <h2 className="mt-10 font-display text-2xl font-semibold">Cookies and analytics</h2>
      {analyticsOn ? (
        <p className="mt-3">
          Analytics identifiers are configured. Non-essential tracking should
          only load after a lawful consent mechanism is in place.
        </p>
      ) : (
        <p className="mt-3">
          This website does not currently load Google Analytics, advertising
          pixels or a tag manager. No non-essential cookies are set by RoofCost
          UK for measurement.
        </p>
      )}

      <h2 className="mt-10 font-display text-2xl font-semibold">Quote-comparison partners</h2>
      {partnerOn ? (
        <>
          <p className="mt-3">
            RoofCost UK calculator data and partner quote-request data are
            handled separately.
          </p>
          <p className="mt-3">
            The calculator runs in your browser. The answers you enter there
            (job type, property, covering, area and similar details) are used
            only to show an on-screen planning range. RoofCost UK does not
            require your name, email, telephone number or postcode to produce
            that estimate, and those calculator answers are not sent to{" "}
            {partnerConfig.partnerName} unless you later choose to complete
            their form.
          </p>
          <p className="mt-3">
            The quote request form is supplied by {partnerConfig.partnerName}.
            Personal information you type into that form is transmitted
            directly to {partnerConfig.partnerName} so they can handle the
            enquiry. RoofCost UK may receive a commission for qualifying
            enquiries. This does not increase the price you pay. Requesting
            quotes does not change the calculator estimate.
          </p>
          <p className="mt-3">
            Please read the privacy information presented by{" "}
            {partnerConfig.partnerName} in or next to the form before you
            submit personal details.
            {partnerConfig.partnerPrivacyUrl ? (
              <>
                {" "}
                Their privacy notice is also linked here:{" "}
                <a
                  href={partnerConfig.partnerPrivacyUrl}
                  className="underline"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {partnerConfig.partnerName} privacy information
                </a>
                .
              </>
            ) : null}
          </p>
        </>
      ) : (
        <p className="mt-3">
          No partner quote form is active on this site at present, so RoofCost
          UK does not pass calculator answers or contact details to a
          lead-generation company. If that changes, this policy will be updated
          and the partner’s privacy notice will be linked from the form.
        </p>
      )}

      <h2 className="mt-10 font-display text-2xl font-semibold">Your rights</h2>
      <p className="mt-3">
        UK GDPR rights (access, correction, erasure, restriction, objection and
        complaint to the ICO) apply to personal data we actually hold. Because
        the calculator does not collect account data, those rights mainly arise
        if you email us or later use a partner form.
      </p>
      <p className="mt-3">
        See also our{" "}
        <Link to="/terms" className="underline">
          terms
        </Link>{" "}
        and{" "}
        <Link to="/affiliate-disclosure" className="underline">
          affiliate disclosure
        </Link>
        .
      </p>
    </main>
  );
}
