/**
 * Measurement configuration. All IDs start empty so nothing is loaded.
 * The calculator still fires in-memory events for later wiring.
 */
export const analyticsConfig = {
  googleAnalyticsId: "",
  googleTagManagerId: "",
  googleSearchConsoleVerification: "",
  enabled: false,
} as const;

export type AnalyticsEventName =
  | "calculator_started"
  | "calculator_step_completed"
  | "calculator_completed"
  | "quote_cta_clicked"
  | "partner_form_loaded"
  | "lead_submitted";
