import { Button } from "@/components/ui/button";
import { isPartnerActive, partnerConfig, showPartnerComingSoon } from "@/config/partner";
import { track } from "@/lib/events";
import { loadPartnerWidget } from "@/lib/partnerWidget";
import { OPEN_QUOTES_EVENT, QUOTES_SECTION_ID, requestQuoteForm } from "@/lib/quoteIntent";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useId, useRef, useState } from "react";

type LoadState = "idle" | "loading" | "ready" | "error";

/**
 * Single Leads Do Work mount for a page. Other CTAs must call `requestQuoteForm()`
 * rather than rendering a second instance.
 */
export function PartnerLeadForm({ placement }: { placement: "result" | "guide" }) {
  const headingId = useId();
  const statusId = useId();
  const mountRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const [state, setState] = useState<LoadState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const openWidget = useCallback(async () => {
    document.getElementById(QUOTES_SECTION_ID)?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
    if (startedRef.current) return;
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
  }, [placement]);

  useEffect(() => {
    const onOpen = () => {
      void openWidget();
    };
    window.addEventListener(OPEN_QUOTES_EVENT, onOpen);
    if (placement === "guide" && window.location.hash === `#${QUOTES_SECTION_ID}`) {
      void openWidget();
    }
    return () => window.removeEventListener(OPEN_QUOTES_EVENT, onOpen);
  }, [openWidget, placement]);

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

  const copy =
    placement === "result"
      ? {
          heading: "Want pricing for your actual property?",
          body: "Your RoofCost UK result is an indicative planning estimate. If you're considering a full roof replacement, you can request roofing quotes based on your actual property.",
        }
      : {
          heading: "Planning to replace your roof?",
          body: "A RoofCost UK figure is an indicative planning estimate. Property-specific roofing quotes come from a quote request about your actual roof, not from the calculator.",
        };

  return (
    <aside
      id={QUOTES_SECTION_ID}
      className="scroll-mt-24 rounded-lg border border-primary/30 bg-surface p-5"
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className="font-display text-lg font-semibold sm:text-xl">
        {copy.heading}
      </h2>
      <p className="mt-2 text-sm text-muted">{copy.body}</p>
      <p className="mt-3 text-xs text-muted">
        RoofCost UK may receive a commission when you submit a quote request
        through one of our partners. This does not increase the price you pay.
        Requesting quotes does not change the RoofCost UK calculator estimate.
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
            </a>{" "}
            before entering personal details.
          </>
        ) : (
          <> Read the privacy notice shown in the form before entering personal details.</>
        )}
      </p>

      {state !== "ready" ? (
        <div className="mt-4">
          <Button
            type="button"
            onClick={() => void openWidget()}
            disabled={state === "loading"}
            aria-describedby={statusId}
            aria-busy={state === "loading"}
            className="w-full min-h-12 sm:w-auto"
          >
            {state === "loading" ? "Loading quote form…" : "Compare Roofing Quotes"}
          </Button>
        </div>
      ) : null}

      <p id={statusId} className="mt-3 text-sm text-muted" role="status" aria-live="polite">
        {state === "loading"
          ? "Loading the quote request form. This stays on this page."
          : null}
        {state === "error" ? errorMessage : null}
      </p>

      {state === "error" ? (
        <Button type="button" variant="secondary" className="mt-2 min-h-12" onClick={() => void openWidget()}>
          Try again
        </Button>
      ) : null}

      <div
        ref={mountRef}
        className="partner-widget-mount mt-4 w-full max-w-full overflow-x-auto [-webkit-overflow-scrolling:touch]"
        style={{ maxWidth: partnerConfig.partnerWidgetMaxWidthPx }}
      />
    </aside>
  );
}

/** Page-level CTA that opens the single on-page quote section. */
export function QuoteCtaButton({
  variant = "primary",
  className,
}: {
  variant?: "primary" | "secondary";
  className?: string;
}) {
  if (!isPartnerActive()) return null;
  return (
    <Button type="button" variant={variant} className={cn("min-h-12", className)} onClick={() => requestQuoteForm()}>
      Compare Roofing Quotes
    </Button>
  );
}
