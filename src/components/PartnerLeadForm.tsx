import { isPartnerActive, partnerConfig, showPartnerComingSoon } from "@/config/partner";
import { track } from "@/lib/events";
import { useEffect } from "react";

export function PartnerLeadForm({ placement }: { placement: "result" | "guide" }) {
  const active = isPartnerActive();
  const pending = showPartnerComingSoon();

  useEffect(() => {
    if (active) track("partner_form_loaded", { placement });
  }, [active, placement]);

  if (partnerConfig.partnerStatus === "disabled") return null;

  if (pending) {
    return (
      <aside
        className="rounded-lg border border-border bg-surface p-5"
        aria-labelledby={`quotes-soon-${placement}`}
      >
        <h2 id={`quotes-soon-${placement}`} className="font-display text-lg font-semibold">
          Quote comparison coming soon
        </h2>
        <p className="mt-2 text-sm text-muted">
          Quote comparison is not active on this site yet. You can still use the
          free calculator and cost guides. When a quote-request partner is
          approved, a form will appear here — we will not load any partner
          scripts until then.
        </p>
      </aside>
    );
  }

  if (!active) return null;

  function onCta() {
    track("quote_cta_clicked", { placement });
  }

  return (
    <aside
      id="quotes"
      className="rounded-lg border border-primary/30 bg-surface p-5"
      aria-labelledby={`quotes-${placement}`}
    >
      <h2 id={`quotes-${placement}`} className="font-display text-lg font-semibold">
        Compare local roofing quotes
      </h2>
      <p className="mt-2 text-sm text-muted">
        Want pricing based on your actual property? You can request quotes from
        roofing professionals serving your area.
      </p>
      <p className="mt-3 text-xs text-muted">
        RoofCost UK may receive a commission when you submit a quote request
        through one of our partners. This does not increase the price you pay.
        {partnerConfig.partnerPrivacyUrl ? (
          <>
            {" "}
            Read the partner{" "}
            <a href={partnerConfig.partnerPrivacyUrl} className="underline">
              privacy notice
            </a>
            .
          </>
        ) : null}
      </p>
      {partnerConfig.partnerEmbedCode ? (
        <div
          className="mt-4"
          onClick={onCta}
          dangerouslySetInnerHTML={{ __html: partnerConfig.partnerEmbedCode }}
        />
      ) : partnerConfig.partnerTrackingUrl ? (
        <a
          href={partnerConfig.partnerTrackingUrl}
          className="mt-4 inline-flex min-h-11 items-center rounded-md bg-primary px-4 font-semibold text-primary-fg no-underline"
          onClick={onCta}
          rel="noopener noreferrer"
        >
          Get roofing quotes
        </a>
      ) : null}
    </aside>
  );
}
