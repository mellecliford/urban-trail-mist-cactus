import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as useLocale } from "./LocaleLink-D3SyrwIH.mjs";
import { i as Eyebrow, s as useDocumentMeta } from "./useDocumentMeta-Dz_-QrJz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/LegalPage-vwEUNhk2.js
var import_jsx_runtime = require_jsx_runtime();
function LegalPage({ type }) {
	const fr = useLocale() === "fr";
	const title = type === "privacy" ? fr ? "Confidentialité" : "Privacy" : fr ? "Conditions" : "Terms";
	useDocumentMeta(`${title} | eveOps Group`, fr ? `Informations relatives à ${title.toLowerCase()} pour eveOps Group.` : `${title} information for eveOps Group.`);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "simple-page section-pad",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container simple-page__content",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: title }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: fr ? `Les informations ${type === "privacy" ? "de confidentialité" : "relatives aux conditions"} seront publiées ici.` : `${title} information will be published here.` }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: fr ? `Cette page est réservée à la ${type === "privacy" ? "politique de confidentialité" : "version formelle des conditions d’utilisation"} d’eveOps Group. Le site actuel n’invente pas de conditions juridiques ni de pratiques de collecte qui n’ont pas été fournies.` : `This page is reserved for eveOps Group’s formal ${type === "privacy" ? "privacy policy" : "terms of use"}. The current site does not invent legal terms or collection practices that have not been provided.` })
			]
		})
	});
}
//#endregion
export { LegalPage as t };
