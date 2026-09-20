/**
 * Partner / CPL integration.
 *
 * Widget IDs and script URLs live only in this file so a later partner can
 * replace Leads Do Work without hunting through components.
 * Do not load third-party scripts until status is active AND the visitor
 * has chosen to open the quote form.
 */
export type PartnerStatus = "pending" | "active" | "disabled";

export const partnerConfig = {
  partnerStatus: "active" as PartnerStatus,
  /** Shown on-site only when status is active. */
  partnerName: "Leads Do Work",
  /**
   * Approved Leads Do Work widget configuration id (`id_conf`).
   * Do not duplicate this string in components.
   */
  partnerWidgetConfigId: "af248316a218e4bee91296a19adc1e32",
  /** HTTPS only. Do not duplicate this URL in components. */
  partnerWidgetScriptUrl: "https://widget.leads.work/js/prefilled-form-load.js",
  /**
   * Approximate native width of the current Leads Do Work widget.
   * Used only for the host container max-width.
   */
  partnerWidgetMaxWidthPx: 535,
  /** Optional hosted-form URL for a future partner that does not use a widget. */
  partnerTrackingUrl: "",
  /**
   * Privacy notice linked from the widget HTML for this configuration.
   * local-quotes.co.uk is the UK brand presented inside the approved form.
   */
  partnerPrivacyUrl: "https://www.local-quotes.co.uk/advice/privacy-policy/?sqn=9221",
  partnerTermsUrl: "",
  /**
   * When true AND status is active, the widget may load on high-intent
   * surfaces only (after a click — never site-wide, never on first paint).
   */
  partnerScriptEnabled: true,
} as const;

export function isPartnerActive(): boolean {
  if (partnerConfig.partnerStatus !== "active" || !partnerConfig.partnerScriptEnabled) {
    return false;
  }
  return Boolean(
    (partnerConfig.partnerWidgetConfigId && partnerConfig.partnerWidgetScriptUrl) ||
      partnerConfig.partnerTrackingUrl,
  );
}

export function showPartnerComingSoon(): boolean {
  return partnerConfig.partnerStatus === "pending";
}
