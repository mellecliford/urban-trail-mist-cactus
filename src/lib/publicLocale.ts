export type PublicLocale = "en" | "fr";

export function getPublicLocale(search: string): PublicLocale {
  return new URLSearchParams(search.startsWith("?") ? search.slice(1) : search).get("lang") === "fr" ? "fr" : "en";
}

export function withPublicLocale(href: string, locale: PublicLocale) {
  const [pathname, rawSearch = ""] = href.split("?");
  const search = new URLSearchParams(rawSearch);
  if (locale === "fr") search.set("lang", "fr"); else search.delete("lang");
  const nextSearch = search.toString();
  return `${pathname}${nextSearch ? `?${nextSearch}` : ""}`;
}

export const localeText = {
  en: { language: "Language", english: "English", french: "Français", brief: "Brief", discuss: "Discuss", downloadTemplate: "Download brief template", serviceNotFound: "Service not found", backToServices: "Back to services" },
  fr: { language: "Langue", english: "English", french: "Français", brief: "Demander un brief", discuss: "Échanger sur", downloadTemplate: "Télécharger le modèle de brief", serviceNotFound: "Service introuvable", backToServices: "Retour aux services" },
} as const;
