import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as useLocale, r as localeText, t as LocaleLink } from "./LocaleLink-D3SyrwIH.mjs";
import { C as ChevronDown, D as ArrowUpRight, O as ArrowRight, v as Download } from "../_libs/lucide-react.mjs";
import { c as divisions, d as getCapabilityBriefTemplate, f as getCapabilityBriefTemplateFilename, g as getServicePathContext, h as getServiceDisplay, m as getServiceCapabilityBriefs, p as getServiceCapabilityBriefHref, u as findService } from "./router-DwJ3Use9.mjs";
import { i as Eyebrow, n as Breadcrumbs, r as CTASection, s as useDocumentMeta } from "./useDocumentMeta-Dz_-QrJz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ServiceDetailPage-CzgDwB8d.js
var import_jsx_runtime = require_jsx_runtime();
function ServiceDetailPage({ division, slug }) {
	const service = findService(division, slug);
	const isUnity = division === "unity";
	const locale = useLocale();
	const fr = locale === "fr";
	const text = localeText[locale];
	const displayService = service ? getServiceDisplay(division, service, locale) : void 0;
	const intakeHref = isUnity ? `/unity/contact?service=${encodeURIComponent(service?.title ?? "")}` : `/contact?division=edevops&service=${encodeURIComponent(service?.title ?? "")}`;
	const workingContext = fr ? isUnity ? [
		"Le résultat : ce qui doit être livré et les personnes qui l’utiliseront.",
		"Les éléments disponibles : documents, langues, sources ou flux de travail à traiter.",
		"Le niveau de qualité : critères d’acceptation, références ou processus de validation.",
		"Le calendrier : première date de livraison utile et éventuels jalons de remise."
	] : [
		"Le résultat : ce qui doit être plus simple, plus rapide, plus sûr ou plus fiable après le projet.",
		"Les utilisateurs et le flux : qui utilisera la solution et comment cela fonctionne aujourd’hui.",
		"Le contexte technique : systèmes, intégrations ou contraintes à respecter.",
		"Le calendrier : prochain point de décision, fenêtre de lancement ou échéance opérationnelle."
	] : isUnity ? [
		"The outcome: what needs to be delivered and who will use it.",
		"The inputs: the materials, languages, sources, or workflow that need attention.",
		"The quality bar: any acceptance criteria, reference material, or review process.",
		"The timing: the first useful delivery date and any fixed handover points."
	] : [
		"The outcome: what should be easier, faster, safer, or more reliable after the work.",
		"The users and workflow: who will use it, and what happens today.",
		"The technical context: the current systems, integrations, or constraints we should respect.",
		"The timing: the next decision point, launch window, or operational deadline."
	];
	const serviceContext = service ? getServicePathContext(division, service, locale) : "";
	const capabilityBriefs = service ? getServiceCapabilityBriefs(division, service, locale) : [];
	const downloadTemplate = (capability) => {
		if (!service || typeof window === "undefined") return;
		const blob = new Blob([getCapabilityBriefTemplate(division, service, capability, locale)], { type: "text/markdown;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const anchor = document.createElement("a");
		anchor.href = url;
		anchor.download = getCapabilityBriefTemplateFilename(capability.briefLabel, locale);
		document.body.appendChild(anchor);
		anchor.click();
		anchor.remove();
		window.setTimeout(() => URL.revokeObjectURL(url), 0);
	};
	useDocumentMeta(service ? `${displayService?.title ?? service.title} | ${divisions[division].name}` : `Service | ${isUnity ? "Unity Integrated Solutions" : "EveOps"}`, displayService?.summary ?? service?.summary ?? `Explore ${isUnity ? "Unity Integrated Solutions" : "EveOps"} services.`);
	if (!service) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "simple-page section-pad",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: text.serviceNotFound }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: locale === "fr" ? "Cet itinéraire a peut-être changé. Découvrez plutôt l’aperçu des services de la division." : "The route may have changed. Explore the division’s service overview instead." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleLink, {
					to: `/${division}`,
					className: "button button--solid",
					children: text.backToServices
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: `service-hero service-hero--${division}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Breadcrumbs, {
					dark: !isUnity,
					items: isUnity ? [[fr ? "Services Unity" : "Unity services", "/unity/services"], [displayService?.title ?? service.title]] : [
						[fr ? "Accueil" : "Home", "/"],
						[divisions[division].shortName, `/${division}`],
						[displayService?.title ?? service.title]
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "service-hero__grid",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, {
							theme: division,
							children: isUnity ? fr ? "Parcours de capacité Unity" : "Unity capability route" : fr ? "Ingénierie logicielle · IA · produits numériques" : divisions[division].eyebrow
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: displayService?.title ?? service.title }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: displayService?.summary ?? service.summary }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LocaleLink, {
							to: intakeHref,
							className: "button button--solid",
							children: [
								isUnity ? `${text.brief} ${(displayService?.title ?? service.title).toLowerCase()}` : `${text.discuss} ${(displayService?.title ?? service.title).toLowerCase()}`,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 17 })
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "service-hero__aside",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isUnity ? fr ? "Approche de livraison" : "Delivery approach" : fr ? "Parcours de capacité" : "Capability route" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: isUnity ? fr ? "Service professionnel coordonné" : "Coordinated professional service" : fr ? "Logiciels et technologie" : "Software & technology" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: isUnity ? fr ? "Commencez par le contexte, les éléments, les contraintes et les attentes de remise qui structurent une livraison bien orientée." : "Begin with the context, materials, constraints, and handover expectations that shape a well-routed delivery." : fr ? "Une page de service EveOps ciblée, prête à soutenir une conversation de projet directe." : "A focused EveOps service page, ready to support a direct project conversation." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "unity-route-note",
								"aria-hidden": !isUnity,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), isUnity ? fr ? "Brief → orienter → livrer" : "Brief → route → deliver" : ""]
							})
						]
					})]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: `service-scope section-pad service-scope--${division}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container service-scope__grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, {
						theme: division,
						children: isUnity ? fr ? "Parcours de service" : "Service path" : fr ? "Périmètre habituel" : "Typical scope"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: isUnity ? fr ? "Commencez par le brief de travail, puis adaptez le soutien nécessaire." : "Start with the working brief, then fit the support to it." : fr ? "Configurez le travail autour de ce qui doit réellement être livré." : "Configure the work around what actually needs to be delivered." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: serviceContext }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "service-scope__hint",
						children: fr ? "Chaque capacité affiche son explication, les éléments utiles à partager et un brief direct." : "Every capability shows its explanation, useful starting context, and a direct brief CTA."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `capability-accordion capability-accordion--${division}`,
					children: capabilityBriefs.map((capability, index) => {
						const capabilityIntakeHref = getServiceCapabilityBriefHref(division, capability.briefLabel, capability.canonicalTitle, locale);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
							className: "capability-accordion__item",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
								"aria-label": `${fr ? "Ouvrir ou réduire le contexte et le brief pour" : "Open or collapse context and brief for"} ${capability.title}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "capability-accordion__index",
										children: String(index + 1).padStart(2, "0")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "capability-accordion__heading",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: capability.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: capability.description })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "capability-accordion__open-label",
										children: fr ? "Contexte et brief direct" : "Context & direct brief"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 18 })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "capability-accordion__body",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "capability-accordion__detail-label",
										children: fr ? "À préciser dans le brief" : "Useful starting context"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: capability.detail }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "capability-accordion__actions",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LocaleLink, {
											to: capabilityIntakeHref,
											className: "capability-accordion__cta",
											children: [
												isUnity ? `${text.brief} ${capability.title}` : `${text.discuss} ${capability.title}`,
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 15 })
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => downloadTemplate(capability),
											className: "capability-accordion__template",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 14 }),
												" ",
												text.downloadTemplate
											]
										})]
									})
								]
							})]
						}, capability.canonicalTitle);
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: `service-context section-pad service-context--${division}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container service-context__grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, {
						theme: division,
						children: isUnity ? fr ? "Rendre le premier échange utile" : "Make the first conversation useful" : fr ? "Un point de départ pratique" : "A practical starting point"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: isUnity ? fr ? `Un brief ${(displayService?.title ?? service.title).toLowerCase()} plus clair commence par quatre éléments simples.` : `A clearer ${(displayService?.title ?? service.title).toLowerCase()} brief begins with four simple things.` : fr ? `Un échange ${(displayService?.title ?? service.title).toLowerCase()} utile commence par le contexte opérationnel.` : `A useful ${(displayService?.title ?? service.title).toLowerCase()} conversation starts with operating context.` }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: isUnity ? fr ? "Vous n’avez pas besoin d’une spécification finalisée. Une courte description du travail et les décisions ci-dessous suffisent à bien orienter la demande." : "You do not need a finished specification. A short description of the work and the decisions below are enough to route the request well." : fr ? "Vous n’avez pas besoin d’une liste de fonctionnalités définitive avant d’échanger avec EveDev Ops. Une description concise du problème opérationnel prépare mieux la conversation d’ingénierie." : "You do not need a final feature list before speaking with EveDev Ops. A concise description of the operating problem gives the engineering conversation a better starting point." })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "service-context__list",
					children: workingContext.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["0", index + 1] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item })] }, item))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "service-bridge",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container service-bridge__grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isUnity ? fr ? "Note de parcours" : "Route note" : fr ? "Comment cela s’articule" : "How it connects" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: isUnity ? fr ? "Des éléments clairs, des contraintes pratiques et un contexte de livraison créent un parcours de travail plus solide." : "Clear materials, practical constraints, and delivery context make a stronger route through the work." : fr ? "De bons produits commencent par la compréhension du flux opérationnel, et non par une simple liste de fonctionnalités." : "Strong product outcomes start with an understanding of the operating workflow, not merely a list of features." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: isUnity ? fr ? "Partagez les exigences de service, le volume, les contraintes et le calendrier afin que la bonne capacité professionnelle soit envisagée." : "Share the service requirements, volume, constraints, and timeline so the right professional capacity can be considered." : fr ? "Partagez l’objectif métier, les utilisateurs, les systèmes existants, les contraintes et les priorités pour que la conversation d’ingénierie commence au bon endroit." : "Share the business objective, users, existing systems, constraints, and priorities so the engineering conversation starts in the right place." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LocaleLink, {
					to: isUnity ? "/unity/contact" : "/contact",
					className: "arrow-link",
					children: [
						isUnity ? fr ? "Orienter ce brief de service" : "Route this service brief" : fr ? "Démarrer la conversation" : "Start the conversation",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 17 })
					]
				})] })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CTASection, {
			division,
			title: isUnity ? fr ? "Apportez-nous le brief de travail." : "Bring us the working brief." : fr ? "Prêt à définir le système ?" : "Ready to define the system?",
			body: isUnity ? fr ? "Indiquez à Unity ce qui doit être livré, à quelle date et quelles conditions de qualité guideront le travail." : "Tell Unity what needs to be delivered, when it is needed, and what quality conditions will guide the work." : fr ? "Utilisez le brief de projet pour décrire le contexte, le résultat souhaité et le calendrier." : "Use the project intake to describe the context, desired outcome, and timing.",
			primary: [isUnity ? `${text.brief} ${displayService?.title ?? service.title}` : `${text.discuss} ${displayService?.title ?? service.title}`, intakeHref]
		})
	] });
}
//#endregion
export { ServiceDetailPage as t };
