import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as useLocale, t as LocaleLink } from "./LocaleLink-D3SyrwIH.mjs";
import { D as ArrowUpRight, O as ArrowRight, l as Orbit } from "../_libs/lucide-react.mjs";
import { _ as products } from "./router-DwJ3Use9.mjs";
import { i as Eyebrow, s as useDocumentMeta } from "./useDocumentMeta-Dz_-QrJz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products-ePKVVtCI.js
var import_jsx_runtime = require_jsx_runtime();
function ProductsPage() {
	const fr = useLocale() === "fr";
	useDocumentMeta(fr ? "Produits par EveOps | Shweng et futurs produits numériques" : "Products by EveOps | Shweng & Future Digital Products", fr ? "Découvrez les produits développés et opérés par EveOps, dont Shweng, une application d’échange inter-réseaux en cours de développement." : "Explore products built and operated by EveOps, including Shweng, a cross-network exchange application in development.");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "products-hero",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container products-hero__grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: fr ? "Produits par EveOps" : "Products by EveOps" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: fr ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["La technologie que nous créons pour le ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "marché." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Technology we build for the ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "market." })] }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: fr ? "Notre portefeuille de produits est distinct des solutions clients. Il rassemble les logiciels qu’EveOps construit, développe ou opère comme activité produit." : "Our product portfolio is distinct from client solutions. It is the place for software EveOps builds, develops, or operates as a product business." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "products-hero__orbit",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Orbit, { size: 34 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fr ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						"Écosystème",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"produit"
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						"Product",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"ecosystem"
					] }) })]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "products-list section-pad",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "products-list__lead",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fr ? "Produit actuel" : "Current product" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: fr ? "Les informations restent volontairement synthétiques tant que le travail est en cours." : "Product information is kept intentionally high-level while work is in progress." })]
				}), products.map((product, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "product-row",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "product-row__index",
							children: ["0", index + 1]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "product-row__status",
								children: fr && product.status === "In development" ? "En développement" : product.status
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: product.name }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "product-row__category",
								children: fr && product.slug === "shweng" ? "Échange inter-réseaux" : product.category
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "product-row__description",
							children: fr && product.slug === "shweng" ? "Une application d’échange de valeur inter-réseaux actuellement développée par EveDev Ops. Les informations produit évolueront avec le travail vérifié." : product.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleLink, {
							to: `/products/${product.slug}`,
							className: "round-arrow",
							"aria-label": `View ${product.name}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 20 })
						})
					]
				}, product.slug))]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "products-note",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container products-note__grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "products-note__label",
						children: fr ? "Solutions clients" : "Client solutions"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: fr ? "Vous avez besoin d’un système numérique pour votre organisation plutôt que d’un produit détenu par EveOps ? Ce travail est présenté séparément comme solution client via EveDev Ops." : "Need a digital system developed for your organization rather than an EveOps-owned product? That work is presented separately as a client solution through EveDev Ops." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LocaleLink, {
						to: "/portfolio",
						children: [
							fr ? "Voir les réalisations" : "View the portfolio",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 17 })
						]
					})
				]
			})
		})
	] });
}
var SplitComponent = ProductsPage;
//#endregion
export { SplitComponent as component };
