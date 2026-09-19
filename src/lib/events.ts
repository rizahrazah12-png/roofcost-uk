import { analyticsConfig, type AnalyticsEventName } from "@/config/analytics";

type EventPayload = Record<string, string | number | boolean | undefined>;

export function track(name: AnalyticsEventName, payload?: EventPayload): void {
  if (typeof window === "undefined") return;
  const detail = { name, payload: payload ?? {}, at: Date.now() };
  window.dispatchEvent(new CustomEvent("roofcost:event", { detail }));
  if (!analyticsConfig.enabled) return;
}
