import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as useLocale, t as LocaleLink } from "./LocaleLink-D3SyrwIH.mjs";
import { O as ArrowRight, r as UsersRound, u as Network } from "../_libs/lucide-react.mjs";
import { i as Eyebrow, s as useDocumentMeta } from "./useDocumentMeta-Dz_-QrJz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-DtbaxtnO.js
var import_jsx_runtime = require_jsx_runtime();
function AboutPage() {
	const fr = useLocale() === "fr";
	useDocumentMeta(fr ? "À propos d’eveOps Group | Services professionnels et ingénierie logicielle" : "About eveOps Group | Professional Services & Software Engineering", fr ? "eveOps Group est un groupe pluridisciplinaire d’opérations et de technologie qui associe expertise professionnelle, ingénierie logicielle et innovation numérique." : "eveOps Group is a multidisciplinary operations and technology group combining professional human expertise with software engineering and digital innovation.");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "about-hero",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container about-hero__grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: fr ? "À propos d’eveOps Group" : "About eveOps Group" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: fr ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Un groupe construit autour d’une vision plus complète de ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "la manière dont le travail se réalise." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["One group, built around a more complete view of ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "how work gets done." })] }) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: fr ? "eveOps Group est un groupe pluridisciplinaire d’opérations et de technologie qui associe expertise professionnelle, ingénierie logicielle et innovation numérique." : "eveOps Group is a multidisciplinary operations and technology group combining professional human expertise with software engineering and digital innovation." })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "about-structure section-pad",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "about-structure__intro",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fr ? "Structure du groupe" : "Group structure" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: fr ? "Les disciplines indépendantes fonctionnent mieux lorsque leurs rôles sont clairs. eveOps Group est organisé autour de deux divisions distinctes, chacune avec un domaine de priorité propre et un même niveau d’exigence pour une livraison réfléchie." : "Independent disciplines work better when their roles are clear. eveOps Group is organized around two distinct divisions, each with an ownable area of focus and a shared standard for thoughtful delivery." })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "about-division-row about-division-row--unity",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "about-division-row__icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, { size: 25 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "about-division-row__number",
								children: "01"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Unity Integrated Solutions" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: fr ? "Des équipes professionnelles et des services métiers couvrant les données IA, les langues, la recherche, le soutien aux entreprises, les achats et les opérations." : "Professional workforce and business services across AI data, language, research, business support, procurement, and operations." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleLink, {
								to: "/unity",
								className: "round-arrow",
								"aria-label": "Explore Unity",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 19 })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "about-division-row about-division-row--edevops",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "about-division-row__icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Network, { size: 25 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "about-division-row__number",
								children: "02"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "EveDev Ops" })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: fr ? "De l’ingénierie logicielle et des produits numériques pour le web, le mobile, le SaaS, l’IA, l’automatisation, les API, le cloud et le DevOps." : "Software engineering and digital products across web, mobile, SaaS, AI, automation, APIs, cloud, and DevOps." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleLink, {
								to: "/edevops",
								className: "round-arrow",
								"aria-label": "Explore EveDev Ops",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 19 })
							})
						]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "about-principles",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container about-principles__grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "about-principles__label",
						children: fr ? "Principes opérationnels" : "Operating principles"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: fr ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						"De la clarté dans le brief.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Du soin dans la réalisation.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Une attention à la livraison." })
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						"Clarity in the brief.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Care in the build.",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Focus on the delivery." })
					] }) }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: fr ? "eveOps Group réunit services professionnels et capacités technologiques sans les réduire à une seule offre. La structure du groupe permet de travailler directement avec la bonne division et de reconnaître la valeur d’une expertise connectée lorsqu’un projet en a besoin." : "eveOps Group brings together professional services and technology capability without collapsing them into the same offering. The group structure makes it possible to work with the right division directly—and to recognize the value of connected expertise when a project needs it." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LocaleLink, {
						to: "/contact",
						className: "arrow-link arrow-link--light",
						children: [
							fr ? "Échanger avec eveOps Group" : "Talk to eveOps Group",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 17 })
						]
					})] })
				]
			})
		})
	] });
}
var SplitComponent = AboutPage;
//#endregion
export { SplitComponent as component };
