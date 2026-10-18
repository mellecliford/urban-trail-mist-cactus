import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as useLocale, t as LocaleLink } from "./LocaleLink-D3SyrwIH.mjs";
import { D as ArrowUpRight, O as ArrowRight, m as Layers, s as ShieldCheck, u as Network } from "../_libs/lucide-react.mjs";
import { c as divisions, i as DivisionLoadMark, l as edevopsTech, o as getDivisionHeroHeadline, s as assets } from "./router-DwJ3Use9.mjs";
import { a as SectionHeading, i as Eyebrow, o as ServiceGrid, r as CTASection, s as useDocumentMeta, t as ArrowLink } from "./useDocumentMeta-Dz_-QrJz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/DivisionPage-CPPeBSyW.js
var import_jsx_runtime = require_jsx_runtime();
var localizedUnityProcess = {
	en: [
		[
			"01",
			"Tell us what you need",
			"Share the work, scope, requirements, and practical constraints."
		],
		[
			"02",
			"Assemble the right workforce",
			"Match the project with the appropriate professional capacity."
		],
		[
			"03",
			"Work begins",
			"Teams execute against the agreed brief and delivery expectations."
		],
		[
			"04",
			"Quality assurance",
			"Deliverables are reviewed against the project’s requirements."
		],
		[
			"05",
			"Delivery",
			"Final work is prepared for handover."
		]
	],
	fr: [
		[
			"01",
			"Présentez le besoin",
			"Partagez le travail, le périmètre, les exigences et les contraintes pratiques."
		],
		[
			"02",
			"Réunir la bonne équipe",
			"Associez le projet à la capacité professionnelle adaptée."
		],
		[
			"03",
			"Lancer le travail",
			"Les équipes réalisent le travail selon le brief et les attentes de livraison convenus."
		],
		[
			"04",
			"Assurer la qualité",
			"Les livrables sont examinés au regard des exigences du projet."
		],
		[
			"05",
			"Remettre le résultat",
			"Le travail final est préparé pour une transmission claire."
		]
	]
};
function DivisionPage({ division }) {
	const item = divisions[division];
	const isUnity = division === "unity";
	const locale = useLocale();
	const fr = locale === "fr";
	useDocumentMeta(fr ? `${item.name} | Services professionnels et numériques` : `${item.name} | eveOps Group`, fr ? `${item.name} accompagne les organisations avec des services professionnels, des systèmes numériques et une livraison structurée.` : item.description);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: `division-hero division-hero--${division}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "division-hero__media",
					style: { backgroundImage: `url(${item.image})` }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DivisionLoadMark, { theme: isUnity ? "unity" : "edevops" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container division-hero__inner",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "division-hero__rail",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isUnity ? "01" : "02" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isUnity ? "Unity" : "EveDev" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "division-hero__copy",
							children: [
								isUnity && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LocaleLink, {
									to: "/unity/contact",
									className: "unity-hero__brand-entry",
									"aria-label": "Start a Unity service brief",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: assets.unityMark,
										alt: ""
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Unity Integrated Solutions" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
										fr ? "Démarrer un brief de service" : "Start a service brief",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 15 })
									] })] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, {
									theme: division,
									children: isUnity ? fr ? "Services professionnels · Main-d’œuvre internationale" : "Professional services · Global workforce" : fr ? "Ingénierie logicielle · IA · produits numériques" : item.eyebrow
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: getDivisionHeroHeadline(division, locale) }),
								isUnity && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "division-hero__manifesto",
									children: fr ? "Des équipes professionnelles. Des solutions intégrées." : "Professional Workforces. Integrated Solutions."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: fr ? isUnity ? "Des équipes professionnelles structurées pour les services linguistiques, les données IA, la recherche, la transcription, les opérations et les achats." : "Des sites web, applications mobiles, plateformes SaaS, systèmes d’IA, automatisations, API et produits numériques conçus pour un usage concret." : item.description }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "division-hero__actions",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LocaleLink, {
										to: isUnity ? "/unity/contact" : "/contact",
										className: "button button--solid",
										children: [
											isUnity ? fr ? "Demander un service" : "Request a service" : fr ? "Démarrer un projet logiciel" : "Start a software project",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 17 })
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: "#services",
										className: "button button--text",
										children: [
											fr ? "Explorer les services" : "Explore services",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 17 })
										]
									})]
								})
							]
						}),
						!isUnity && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "division-hero__stamp",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fr ? "Une division de" : "Part of" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
								"eveOps",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Group"
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "division-hero__system-label",
							"aria-hidden": "true",
							children: isUnity ? fr ? "ORIENTER / COORDONNER / LIVRER" : "ROUTE / COORDINATE / DELIVER" : fr ? "CADRER / CONSTRUIRE / DÉPLOYER" : "FRAME / BUILD / DEPLOY"
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "services",
			className: `division-services section-pad division-services--${division}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					theme: division,
					eyebrow: isUnity ? fr ? "Une main-d’œuvre flexible, adaptée au travail" : "A flexible workforce, shaped around the work" : fr ? "Une capacité d’ingénierie organisée autour du système" : "Engineering capability, organized by the system",
					title: isUnity ? fr ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Une expertise qui prolonge ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "votre capacité opérationnelle." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Expertise that extends ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "your operating capacity." })] }) : fr ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Construire sur une ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "base technique solide." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Build from a solid technical ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "foundation." })] }),
					description: isUnity ? fr ? "Unity propose un accompagnement pratique, aligné sur vos projets. Explorez un domaine de service pour voir les types de travaux qu’il peut inclure." : "Unity is structured around practical, project-aligned support. Explore a service area to see the kinds of work it can include." : fr ? "EveDev Ops associe réflexion produit et pratique d’ingénierie pour des systèmes numériques qui doivent être performants au-delà du lancement." : "EveDev Ops brings product thinking and engineering practice to digital systems that need to perform beyond launch."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceGrid, {
					division,
					services: item.services
				})]
			})
		}),
		isUnity ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "unity-process section-pad",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container unity-process__grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, {
						theme: "unity",
						children: fr ? "Un parcours de livraison clair" : "A clear delivery path"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: fr ? "Conçu autour du brief de travail, et non comme une place de marché de talents générique." : "Designed around the working brief, not a generic talent marketplace." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: fr ? "Unity organise ses services professionnels comme un soutien structuré aux équipes et aux opérations. L’engagement commence par les exigences et progresse vers une remise définie." : "Unity positions its professional services as structured workforce and operational support. The engagement begins with the requirements and moves toward a defined handover." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLink, {
						href: "/unity/contact",
						children: fr ? "Démarrer une conversation de service" : "Start a service conversation"
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "process-list",
					children: localizedUnityProcess[locale].map(([number, title, copy]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: number }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: copy })] })] }, number))
				})]
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "tech-ecosystem section-pad",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container tech-ecosystem__grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, {
						theme: "edevops",
						children: fr ? "Écosystème technologique" : "Technology ecosystem"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: fr ? "Des outils choisis autour du produit, du flux de travail et de l’environnement d’exploitation." : "Tooling chosen around the product, the workflow, and the operating environment." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: fr ? "Les capacités techniques peuvent être réunies dans une base de livraison cohérente, sans traiter une liste de technologies comme un substitut au jugement d’ingénierie." : "Technical capabilities can be combined into a practical delivery stack without treating a technology list as a substitute for engineering judgment." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "tech-orbit",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "tech-orbit__core",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Network, { size: 26 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fr ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"Systèmes",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"produit"
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"Product",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"systems"
						] }) })]
					}), edevopsTech.map((tech, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `tech-orbit__item tech-orbit__item--${index + 1}`,
						children: tech
					}, tech))]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: `division-positioning division-positioning--${division}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container division-positioning__grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "division-positioning__signal",
						children: isUnity ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { size: 24 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 24 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "division-positioning__eyebrow",
						children: fr ? "La raison d’être de cette division" : "Why this division exists"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: isUnity ? fr ? "Pas seulement des tâches isolées. Une façon plus structurée d’intégrer des personnes compétentes au travail." : "Not just individual tasks. A more organized way to bring capable people into the work." : fr ? "Pas seulement la livraison d’un projet. Une façon plus réfléchie de transformer des besoins métier en logiciel opérationnel." : "Not just project delivery. A more considered way to turn business requirements into working software." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: isUnity ? fr ? "Unity aide les organisations à accéder à des équipes structurées et à un soutien spécialisé dans les langues, les données IA, la recherche, le contenu et les opérations." : "Unity helps organizations access structured teams and specialist support across language, AI data, research, content, and operations." : fr ? "EveDev Ops se concentre sur les logiciels, systèmes, automatisations et produits technologiques dont les décisions d’ingénierie doivent rester reliées aux résultats opérationnels." : "EveDev Ops focuses on software, systems, automation, and technology products where engineering decisions need to remain connected to operational outcomes." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLink, {
						href: isUnity ? "/unity/services" : "/about",
						children: isUnity ? fr ? "Explorer les services Unity" : "Explore Unity services" : fr ? "À propos d’eveOps Group" : "About eveOps Group"
					})] })
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CTASection, {
			division,
			title: isUnity ? fr ? "Apportez la bonne capacité humaine au travail." : "Bring the right workforce to the work." : fr ? "Transformez le problème opérationnel en plan produit." : "Turn the operating problem into a product plan.",
			body: isUnity ? fr ? "Parlez-nous du service, du volume, du calendrier et des exigences de travail. Nous orienterons l’échange vers la capacité adaptée." : "Tell us about the service, volume, timeline, and working requirements. We’ll help route the conversation to the appropriate capability." : fr ? "Partagez le produit, la plateforme, l’automatisation ou le système envisagé. Nous vous aiderons à organiser la prochaine étape utile." : "Share the product, platform, automation, or system you are considering. We’ll help establish the next working step.",
			primary: [isUnity ? fr ? "Demander un service" : "Request a service" : fr ? "Démarrer un projet logiciel" : "Start a software project", isUnity ? "/unity/contact" : "/contact"],
			secondary: [isUnity ? fr ? "Explorer les services Unity" : "Explore Unity services" : fr ? "Explorer eveOps Group" : "Explore eveOps Group", isUnity ? "/unity/services" : "/about"]
		})
	] });
}
//#endregion
export { DivisionPage as t };
