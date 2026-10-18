import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as useLocale, t as LocaleLink } from "./LocaleLink-D3SyrwIH.mjs";
import { O as ArrowRight, p as LockKeyhole, w as Boxes } from "../_libs/lucide-react.mjs";
import { i as Eyebrow, s as useDocumentMeta } from "./useDocumentMeta-Dz_-QrJz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/portfolio-Ct2ykaTX.js
var import_jsx_runtime = require_jsx_runtime();
function PortfolioPage() {
	const fr = useLocale() === "fr";
	useDocumentMeta(fr ? "Réalisations EveOps | Produits et solutions clients" : "EveOps Portfolio | Products & Client Solutions", fr ? "Découvrez comment EveOps distingue ses propres produits technologiques des solutions logicielles et numériques développées pour des organisations clientes." : "Explore how EveOps differentiates its own technology products from software and digital solutions developed for client organizations.");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "portfolio-hero",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container portfolio-hero__grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: fr ? "Réalisations" : "Portfolio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: fr ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Des produits, des systèmes et des ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "logiciels opérationnels." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Products, systems, and ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "working software." })] }) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: fr ? "Nos réalisations sont organisées pour clarifier une distinction importante : la technologie détenue ou opérée par EveOps est différente des solutions clients développées dans le cadre d’une mission." : "Our portfolio is organized to make one important distinction clear: technology owned or operated by EveOps is different from client solutions developed under an engagement." })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "portfolio-paths section-pad",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container portfolio-paths__grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "portfolio-path portfolio-path--product",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boxes, { size: 30 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "portfolio-path__type",
							children: fr ? "Produits" : "Products"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: fr ? "Des produits logiciels par EveOps." : "Software products by EveOps." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: fr ? "Des produits détenus ou opérés par EveOps, y compris les travaux développés par EveDev Ops." : "Products owned or operated by EveOps, including work developed through EveDev Ops." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LocaleLink, {
							to: "/products",
							className: "arrow-link",
							children: [
								fr ? "Explorer les produits" : "Explore products",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 17 })
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "portfolio-path portfolio-path--client",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { size: 30 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "portfolio-path__type",
							children: fr ? "Solutions clients" : "Client solutions"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: fr ? "Conçues en tenant compte du contexte client." : "Built with client context in mind." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: fr ? "Les logiciels et produits numériques développés pour des clients peuvent être présentés ici lorsque les détails sont approuvés pour publication." : "Software and digital products developed for clients can be presented here where details are approved for publication." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LocaleLink, {
							to: "/contact",
							className: "arrow-link arrow-link--light",
							children: [
								fr ? "Échanger sur une solution client" : "Discuss a client solution",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 17 })
							]
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "portfolio-standards",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container portfolio-standards__grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fr ? "Exigence de présentation" : "Portfolio standard" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: fr ? "Lorsqu’un projet peut être partagé, il peut présenter la catégorie de produit, le problème, la solution, les technologies, le résultat approuvé, des captures d’écran et une prochaine étape claire, sans inventer de résultats ni exposer d’informations client confidentielles." : "When a project is ready to be shared, it can include the product category, problem, solution, technologies, approved outcome, screenshots, and a clear next step—without inventing results or exposing confidential client information." })]
			})
		})
	] });
}
var SplitComponent = PortfolioPage;
//#endregion
export { SplitComponent as component };
