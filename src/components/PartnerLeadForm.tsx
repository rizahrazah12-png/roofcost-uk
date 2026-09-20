import { isPartnerActive, partnerConfig, showPartnerComingSoon } from "@/config/partner";
import { track } from "@/lib/events";
import { loadPartnerWidget } from "@/lib/partnerWidget";
import { Button } from "@/components/ui/button";
import { useId, useRef, useState } from "react";

type LoadState = "idle" | "loading" | "ready" | "error";

export function PartnerLeadForm({ placement }: { placement: "result" | "guide" }) {
  const headingId = useId();
  const statusId = useId();
  const mountRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const [state, setState] = useState<LoadState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (partnerConfig.partnerStatus === "disabled") return null;

  if (showPartnerComingSoon()) {
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

  if (!isPartnerActive()) return null;

  async function openWidget() {
    if (startedRef.current || state === "loading" || state === "ready") return;
    startedRef.current = true;
    track("quote_cta_clicked", { placement });
    setErrorMessage("");
    setState("loading");
    const mount = mountRef.current;
    if (!mount) {
      startedRef.current = false;
      setState("error");
      setErrorMessage("The quote form could not be opened. Please try again.");
      return;
    }
    try {
      await loadPartnerWidget(mount);
      track("partner_form_loaded", { placement });
      setState("ready");
      mount.scrollIntoView({ block: "nearest", behavior: "smooth" });
    } catch {
      startedRef.current = false;
      setState("error");
      setErrorMessage(
        "The quote form could not be loaded. Check your connection and try again.",
      );
    }
  }

  return (
    <aside
      id="quotes"
      className="rounded-lg border border-primary/30 bg-surface p-5"
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className="font-display text-lg font-semibold">
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
            Read the {partnerConfig.partnerName}{" "}
            <a
              href={partnerConfig.partnerPrivacyUrl}
              className="underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              privacy notice
            </a>
            .
          </>
        ) : null}
      </p>

      {state !== "ready" ? (
        <div className="mt-4">
          <Button
            type="button"
            onClick={() => void openWidget()}
            disabled={state === "loading"}
            aria-describedby={statusId}
            aria-busy={state === "loading"}
          >
            {state === "loading" ? "Loading quote form…" : "Compare Roofing Quotes"}
          </Button>
        </div>
      ) : null}

      <p id={statusId} className="mt-3 text-sm text-muted" role="status" aria-live="polite">
        {state === "loading"
          ? "Loading the quote comparison form. This stays on this page."
          : null}
        {state === "error" ? errorMessage : null}
      </p>

      {state === "error" ? (
        <Button type="button" variant="secondary" className="mt-2" onClick={() => void openWidget()}>
          Try again
        </Button>
      ) : null}

      <div
        ref={mountRef}
        className="mt-4 w-full max-w-full overflow-x-auto [-webkit-overflow-scrolling:touch]"
        style={{ maxWidth: partnerConfig.partnerWidgetMaxWidthPx }}
      />
    </aside>
  );
}
