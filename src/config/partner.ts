/**
 * Partner / CPL integration.
 *
 * Keep `partnerStatus` as "pending" until an approved partner has supplied
 * real embed code, a tracking URL, or a widget snippet.
 * Do not load third-party scripts while status is pending.
 *
 * Intended first partner: Leads Do Work — do not name them on the public
 * website until the partnership is actually approved.
 */
export type PartnerStatus = "pending" | "active" | "disabled";

export const partnerConfig = {
  partnerStatus: "pending" as PartnerStatus,
  partnerName: "",
  partnerEmbedCode: "",
  partnerTrackingUrl: "",
  partnerPrivacyUrl: "",
  partnerTermsUrl: "",
  partnerScriptEnabled: false,
} as const;

export function isPartnerActive(): boolean {
  return (
    partnerConfig.partnerStatus === "active" &&
    partnerConfig.partnerScriptEnabled &&
    Boolean(partnerConfig.partnerEmbedCode || partnerConfig.partnerTrackingUrl)
  );
}

export function showPartnerComingSoon(): boolean {
  return partnerConfig.partnerStatus === "pending";
}
