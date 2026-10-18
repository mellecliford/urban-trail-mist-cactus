import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { i as useLocale, t as LocaleLink } from "./_ssr/LocaleLink-D3SyrwIH.mjs";
import { O as ArrowRight } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_-Dk1Vp_gb.js
var import_jsx_runtime = require_jsx_runtime();
function NotFound() {
	const fr = useLocale() === "fr";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "not-found section-pad",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "404" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: fr ? "Cette page a été déplacée ou n’existe pas." : "This route has moved or does not exist." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: fr ? "Utilisez les parcours de division pour découvrir les services professionnels ou l’ingénierie logicielle, ou revenez à l’accueil d’eveOps Group." : "Use the division routes to explore professional services or software engineering, or return to the eveOps Group homepage." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LocaleLink, {
					to: "/",
					className: "button button--solid",
					children: [
						fr ? "Retour à eveOps Group" : "Return to eveOps Group",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 17 })
					]
				})
			]
		})
	});
}
var SplitComponent = NotFound;
//#endregion
export { SplitComponent as component };
