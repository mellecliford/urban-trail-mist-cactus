import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as useLocationSearch, n as getPublicLocale, r as localeText } from "./LocaleLink-D3SyrwIH.mjs";
import { S as CircleCheck, c as Send } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as getContactRoutePresentation } from "./router-DwJ3Use9.mjs";
import { i as Eyebrow, s as useDocumentMeta } from "./useDocumentMeta-Dz_-QrJz.mjs";
import { t as saveLead } from "./leads-DWx-u2wJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ContactPage-9Vel0z9l.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function getServiceBriefContext(search, isUnityScope) {
	const parameters = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
	const route = isUnityScope ? "unity" : parameters.get("division") === "edevops" ? "edevops" : "unity";
	const capability = parameters.get("capability")?.trim().slice(0, 160) || "";
	const attributionChannel = parameters.get("source") === "capability_cta" && capability ? "capability_cta" : "direct";
	return {
		route,
		service: parameters.get("service")?.trim().slice(0, 160) || "",
		attributionChannel,
		attributedCapability: attributionChannel === "capability_cta" ? capability : "",
		locale: getPublicLocale(search)
	};
}
var unityServices = [
	"Language Services",
	"Transcription Services",
	"Data Annotation & AI Training",
	"Research & Data Services",
	"Virtual Workforce",
	"Content Operations",
	"Procurement Support"
];
var engineeringServices = [
	"Web Development",
	"Mobile Development",
	"Software Engineering",
	"AI Development",
	"Automation",
	"Cloud & DevOps",
	"Application Security",
	"API & Integrations"
];
function ContactPage({ scope = "eveops" }) {
	const isUnityScope = scope === "unity";
	const search = useLocationSearch();
	const briefContext = (0, import_react.useMemo)(() => getServiceBriefContext(search, isUnityScope), [search, isUnityScope]);
	const initialRoute = briefContext.route;
	const [route, setRoute] = (0, import_react.useState)(initialRoute);
	const [pending, setPending] = (0, import_react.useState)(false);
	const prefilledService = briefContext.service;
	const locale = briefContext.locale;
	const fr = locale === "fr";
	const text = localeText[locale];
	const hasPrefilledService = Boolean(prefilledService) && route === initialRoute;
	const serviceOptions = route === "unity" ? unityServices : engineeringServices;
	const routeName = route === "unity" ? "Unity Integrated Solutions" : "EveDev Ops";
	const routePresentation = getContactRoutePresentation(route, locale);
	useDocumentMeta(isUnityScope ? "Contact Unity Integrated Solutions | Request a Service" : "Contact EveOps | Start a Project Conversation", isUnityScope ? "Tell Unity Integrated Solutions about your professional service requirement and start a service intake." : "Tell EveOps whether you need professional services or software development and start a project intake conversation.");
	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		const data = new FormData(form);
		setPending(true);
		saveLead({
			name: String(data.get("name") || ""),
			company: String(data.get("company") || "") || void 0,
			email: String(data.get("email") || ""),
			phone: String(data.get("phone") || "") || void 0,
			country: String(data.get("country") || "") || void 0,
			division: route,
			service: String(data.get("service") || "") || void 0,
			estimatedVolume: String(data.get("volume") || "") || void 0,
			deadline: String(data.get("deadline") || "") || void 0,
			preferredCommunication: String(data.get("communication") || "") || void 0,
			message: String(data.get("description") || "")
		});
		form.reset();
		setPending(false);
		toast.success(locale === "fr" ? "Votre brief a bien été reçu." : "Your brief has been received.", { description: locale === "fr" ? "Il est enregistré pour un suivi par l’équipe." : "It is stored for follow-up by the EveOps team." });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `${isUnityScope ? "contact-page contact-page--unity" : "contact-page"} ${routePresentation.className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "contact-hero",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container contact-hero__grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: hasPrefilledService ? `${routeName} · ${locale === "fr" ? "brief de service" : "service brief"}` : isUnityScope ? locale === "fr" ? "Demande de service Unity" : "Unity service intake" : routePresentation.eyebrow }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: hasPrefilledService ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						locale === "fr" ? "Parlez-nous de votre besoin en " : "Tell us about your ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: prefilledService }),
						"."
					] }) : isUnityScope ? locale === "fr" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Comment Unity peut-elle soutenir le ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "travail\xA0?" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["How can Unity support the ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "work?" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						routePresentation.headlineLead,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: routePresentation.headlineEmphasis })
					] }) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: hasPrefilledService ? locale === "fr" ? "Le service est déjà sélectionné. Partagez uniquement le contexte nécessaire pour rendre notre première réponse utile." : "The service is already selected. Share only the context that will help us make the first response useful." : isUnityScope ? locale === "fr" ? "Un premier brief clair reste court : le travail, votre e-mail et le contexte de livraison que vous connaissez déjà." : "A clear first brief is short: the work, your email, and the delivery context you already know." : routePresentation.description }),
					isUnityScope ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "contact-hero__field-note",
						"aria-hidden": "true",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: locale === "fr" ? "Note terrain / 01" : "Field note / 01" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: locale === "fr" ? "Les briefs utiles commencent par le résultat, non par une spécification parfaite." : "Useful briefs begin with the outcome, not a perfect specification." })
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "contact-hero__route-rail",
						"aria-hidden": "true",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "01" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "02" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: locale === "fr" ? "Point de rencontre" : "Meeting point" })
						]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "contact-intake section-pad",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container contact-intake__grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "contact-intake__aside",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "contact-intake__label",
							children: isUnityScope ? fr ? "Parcours de travail" : "Working route" : fr ? "Choisissez un parcours" : "Choose a route"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: route === "unity" ? "intake-route intake-route--active intake-route--unity" : "intake-route intake-route--unity",
							onClick: () => setRoute("unity"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "01" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: isUnityScope ? fr ? "Brief de service" : "Service brief" : fr ? "Services professionnels" : "Professional services" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Unity Integrated Solutions" })
							]
						}),
						!isUnityScope && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: route === "edevops" ? "intake-route intake-route--active intake-route--edevops" : "intake-route intake-route--edevops",
							onClick: () => setRoute("edevops"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "02" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: fr ? "Développement logiciel" : "Software development" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "EveDev Ops" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "contact-intake__note",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: fr ? "Trois éléments suffisent pour commencer : votre nom, votre e-mail et une description concise du travail." : "Three essentials are enough to begin: your name, email, and a concise description of the work." })]
						}),
						isUnityScope && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "unity-contact-details",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fr ? "Échanger avec Unity" : "Speak with Unity" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "mailto:support@eveopsgroup.com",
									children: "support@eveopsgroup.com"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "tel:+237671361513",
									children: "+237 671 361 513"
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: `intake-form intake-form--${route}`,
					onSubmit: handleSubmit,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "intake-form__heading",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: hasPrefilledService ? `${routeName} · ${prefilledService}` : `${routeName} · ${locale === "fr" ? "Premier brief" : "First brief"}` }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: hasPrefilledService ? `${text.brief} ${prefilledService}.` : route === "unity" ? locale === "fr" ? "Qu’est-ce qui doit avancer ?" : "What needs to move forward?" : locale === "fr" ? "Qu’est-ce qui doit mieux fonctionner ?" : "What needs to work better?" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: locale === "fr" ? "Les champs obligatoires sont marqués d’un astérisque. Ajoutez les détails de livraison uniquement s’ils sont utiles maintenant." : "Required fields are marked with an asterisk. Add delivery detail only if it is useful now." })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "form-grid form-grid--essential",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
								locale === "fr" ? "Nom" : "Name",
								" *",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									required: true,
									name: "name",
									autoComplete: "name",
									placeholder: locale === "fr" ? "Votre nom" : "Your name"
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["E-mail *", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								type: "email",
								name: "email",
								autoComplete: "email",
								placeholder: "name@company.com"
							})] })]
						}),
						hasPrefilledService ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "hidden",
							name: "service",
							value: prefilledService
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "form-service",
							children: [route === "unity" ? fr ? "Service souhaité *" : "Service needed *" : fr ? "Que souhaitez-vous construire ? *" : "What are you looking to build? *", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								required: true,
								name: "service",
								defaultValue: "",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									disabled: true,
									children: route === "unity" ? fr ? "Sélectionnez un service" : "Select a service" : fr ? "Sélectionnez un domaine de service" : "Select a service area"
								}), serviceOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: option }, option))]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "form-textarea",
							children: [route === "unity" ? fr ? "Que faut-il livrer ? *" : "What needs to be delivered? *" : fr ? "Qu’est-ce qui doit mieux fonctionner ? *" : "What needs to work better? *", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								required: true,
								name: "description",
								rows: 5,
								placeholder: route === "unity" ? fr ? "Par exemple : le matériel, le périmètre, les langues, le niveau de qualité attendu et le résultat recherché." : "For example: the material, scope, languages, expected quality, and the outcome you need." : fr ? "Par exemple : le processus ou le problème, les personnes concernées et le résultat recherché." : "For example: the workflow or problem, the people involved, and the outcome you need."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
							className: "intake-details",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: [
								fr ? "Ajouter des détails de livraison" : "Add delivery details",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fr ? "Facultatif" : "Optional" })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "form-grid",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [fr ? "Organisation" : "Company", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										name: "company",
										autoComplete: "organization",
										placeholder: fr ? "Entreprise ou organisation" : "Company or organization"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [fr ? "Téléphone" : "Phone", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										name: "phone",
										autoComplete: "tel",
										placeholder: fr ? "Indicatif pays et numéro" : "Country code and phone number"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [fr ? "Pays" : "Country", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										name: "country",
										autoComplete: "country-name",
										placeholder: fr ? "Pays" : "Country"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [fr ? "Volume ou budget estimé" : "Expected volume or budget", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										name: "volume",
										placeholder: route === "unity" ? fr ? "Fichiers, heures ou volume" : "Files, hours, or volume" : fr ? "Fourchette ou échelle facultative" : "Optional range or scale"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [fr ? "Calendrier idéal" : "Ideal timing", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "date",
										name: "deadline"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [fr ? "Mode de communication préféré" : "Preferred communication", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										name: "communication",
										defaultValue: "",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												children: fr ? "Aucune préférence" : "No preference"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "E-mail" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: fr ? "Appel vidéo" : "Video call" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: fr ? "Messagerie" : "Messaging" })
										]
									})] })
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "button button--solid",
							type: "submit",
							disabled: pending,
							children: [
								pending ? locale === "fr" ? "Envoi du brief…" : "Sending brief…" : locale === "fr" ? "Envoyer le brief" : "Send the brief",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { size: 16 })
							]
						})
					]
				})]
			})
		})]
	});
}
//#endregion
export { ContactPage as t };
