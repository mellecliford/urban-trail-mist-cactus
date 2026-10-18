import { b as Link, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/LocaleLink-D3SyrwIH.js
var import_jsx_runtime = require_jsx_runtime();
function getPublicLocale(search) {
	return new URLSearchParams(search.startsWith("?") ? search.slice(1) : search).get("lang") === "fr" ? "fr" : "en";
}
function withPublicLocale(href, locale) {
	const [pathname, rawSearch = ""] = href.split("?");
	const search = new URLSearchParams(rawSearch);
	if (locale === "fr") search.set("lang", "fr");
	else search.delete("lang");
	const nextSearch = search.toString();
	return `${pathname}${nextSearch ? `?${nextSearch}` : ""}`;
}
var localeText = {
	en: {
		language: "Language",
		english: "English",
		french: "Français",
		brief: "Brief",
		discuss: "Discuss",
		downloadTemplate: "Download brief template",
		serviceNotFound: "Service not found",
		backToServices: "Back to services"
	},
	fr: {
		language: "Langue",
		english: "English",
		french: "Français",
		brief: "Demander un brief",
		discuss: "Échanger sur",
		downloadTemplate: "Télécharger le modèle de brief",
		serviceNotFound: "Service introuvable",
		backToServices: "Retour aux services"
	}
};
function useLocale() {
	return getPublicLocale(useRouterState({ select: (s) => s.location.searchStr }));
}
function usePathname() {
	return useRouterState({ select: (s) => s.location.pathname });
}
function useLocationSearch() {
	return useRouterState({ select: (s) => s.location.searchStr });
}
function LocaleLink({ to, className, children, ...rest }) {
	const href = withPublicLocale(to, useLocale());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: href,
		className,
		...rest,
		children
	});
}
//#endregion
export { useLocationSearch as a, useLocale as i, getPublicLocale as n, usePathname as o, localeText as r, withPublicLocale as s, LocaleLink as t };
