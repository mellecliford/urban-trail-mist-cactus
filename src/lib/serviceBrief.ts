import { getPublicLocale, type PublicLocale } from "@/lib/publicLocale";

export type BriefRoute = "unity" | "edevops";

export function getServiceBriefContext(search: string, isUnityScope: boolean): { route: BriefRoute; service: string; attributionChannel: "direct" | "capability_cta"; attributedCapability: string; locale: PublicLocale } {
  const parameters = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  const route: BriefRoute = isUnityScope ? "unity" : parameters.get("division") === "edevops" ? "edevops" : "unity";
  const capability = parameters.get("capability")?.trim().slice(0, 160) || "";
  const attributionChannel = parameters.get("source") === "capability_cta" && capability ? "capability_cta" : "direct";
  return { route, service: parameters.get("service")?.trim().slice(0, 160) || "", attributionChannel, attributedCapability: attributionChannel === "capability_cta" ? capability : "", locale: getPublicLocale(search) };
}
