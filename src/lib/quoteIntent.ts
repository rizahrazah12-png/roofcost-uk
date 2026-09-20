/** Single commercial section id. Multiple CTAs may target this; never a second widget. */
export const QUOTES_SECTION_ID = "quotes";
export const OPEN_QUOTES_EVENT = "roofcost:open-quotes";

/**
 * Scroll to the on-page quote section and ask it to load the partner form.
 * Safe to call from any CTA on a page that mounts one PartnerLeadForm.
 */
export function requestQuoteForm(): void {
  if (typeof window === "undefined") return;
  const el = document.getElementById(QUOTES_SECTION_ID);
  el?.scrollIntoView({ block: "start", behavior: "smooth" });
  window.dispatchEvent(new Event(OPEN_QUOTES_EVENT));
}
