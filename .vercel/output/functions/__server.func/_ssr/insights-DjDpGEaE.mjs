import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as useLocale, t as LocaleLink } from "./LocaleLink-D3SyrwIH.mjs";
import { E as BookOpenText, O as ArrowRight } from "../_libs/lucide-react.mjs";
import { i as Eyebrow, s as useDocumentMeta } from "./useDocumentMeta-Dz_-QrJz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/insights-DjDpGEaE.js
var import_jsx_runtime = require_jsx_runtime();
function InsightsPage() {
	const fr = useLocale() === "fr";
	useDocumentMeta(fr ? "Réflexions | EveOps" : "Insights | EveOps", fr ? "Le futur espace éditorial EveOps pour les services professionnels, les données IA, l’ingénierie logicielle, l’automatisation, le cloud et les produits numériques." : "A future-focused EveOps editorial hub for professional services, AI data, software engineering, automation, cloud, and product development insights.");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "insights-hero",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container insights-hero__grid",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: fr ? "Réflexions" : "Insights" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: fr ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Des réflexions pratiques pour le travail qui relie ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "les personnes et les systèmes." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Practical thinking for work that connects ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "people and systems." })] }) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpenText, { size: 44 })]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "insights-empty section-pad",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container insights-empty__grid",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fr ? "Fondation éditoriale" : "Editorial foundation" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: fr ? "Un espace prêt pour le SEO et des idées utiles, précises." : "An SEO-ready home for useful, specific ideas." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: fr ? "Les futurs articles pourront aborder les données IA, l’externalisation, les services linguistiques, les équipes, les achats et la recherche avec Unity, ainsi que l’ingénierie logicielle, l’IA, le SaaS, l’automatisation, le cloud, le DevOps et le développement produit avec EveDev Ops." : "Future articles can cover Unity topics such as AI data, outsourcing, language services, workforce, procurement, and research, alongside EveDev Ops topics such as software engineering, AI, SaaS, automation, cloud, DevOps, and product development." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LocaleLink, {
				to: "/contact",
				className: "arrow-link",
				children: [
					fr ? "Échanger sur une capacité EveOps" : "Discuss an EveOps capability",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 17 })
				]
			})] })]
		})
	})] });
}
var SplitComponent = InsightsPage;
//#endregion
export { SplitComponent as component };
