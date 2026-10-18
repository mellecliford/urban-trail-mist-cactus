import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as useLocale, t as LocaleLink } from "./LocaleLink-D3SyrwIH.mjs";
import { D as ArrowUpRight, O as ArrowRight, T as Bot, _ as Earth, b as CodeXml, g as FileText, h as Languages, n as Workflow, o as Smartphone, r as UsersRound, s as ShieldCheck, x as Cloud, y as Database } from "../_libs/lucide-react.mjs";
import { h as getServiceDisplay } from "./router-DwJ3Use9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useDocumentMeta-Dz_-QrJz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var iconMap = {
	language: Languages,
	data: Database,
	research: Earth,
	team: UsersRound,
	procurement: Workflow,
	content: FileText,
	web: CodeXml,
	mobile: Smartphone,
	software: CodeXml,
	ai: Bot,
	automation: Workflow,
	cloud: Cloud,
	security: ShieldCheck,
	api: Workflow
};
function Eyebrow({ children, theme = "parent" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: `eyebrow eyebrow--${theme}`,
		children
	});
}
function SectionHeading({ eyebrow, title, description, theme = "parent" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `section-heading section-heading--${theme}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, {
				theme,
				children: eyebrow
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: title }),
			description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: description })
		]
	});
}
function ArrowLink({ href, children, dark = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LocaleLink, {
		to: href,
		className: `arrow-link ${dark ? "arrow-link--light" : ""}`,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
			size: 17,
			"aria-hidden": "true"
		})]
	});
}
function ServiceGrid({ division, services, limit }) {
	const visible = limit ? services.slice(0, limit) : services;
	const locale = useLocale();
	const fr = locale === "fr";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `service-grid service-grid--${division}`,
		children: visible.map((service, index) => {
			const Icon = iconMap[service.icon];
			const displayService = getServiceDisplay(division, service, locale);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LocaleLink, {
				className: "service-card",
				to: `/${division}/${service.slug}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "service-card__topline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["0", index + 1] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							size: 19,
							strokeWidth: 1.7
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: displayService.title }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: displayService.summary }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "service-card__link",
						children: [
							fr ? "Explorer le périmètre" : "Explore scope",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
								size: 16,
								"aria-hidden": "true"
							})
						]
					})
				]
			}, service.slug);
		})
	});
}
function Breadcrumbs({ items, dark = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: `breadcrumbs ${dark ? "breadcrumbs--light" : ""}`,
		"aria-label": "Breadcrumb",
		children: items.map(([label, href], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleLink, {
			to: href,
			children: label
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-current": "page",
			children: label
		}), index < items.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": "true",
			children: "/"
		})] }, `${label}-${index}`))
	});
}
function CTASection({ division = "parent", title, body, primary, secondary }) {
	const locale = useLocale();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: `cta-section cta-section--${division}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container cta-section__inner",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, {
				theme: division === "parent" ? "parent" : division,
				children: locale === "fr" ? "Démarrer la conversation" : "Start the conversation"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: title })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "cta-section__copy",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: body }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "cta-section__actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LocaleLink, {
						to: primary[1],
						className: "button button--solid",
						children: [
							primary[0],
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 17 })
						]
					}), secondary && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LocaleLink, {
						to: secondary[1],
						className: "button button--text",
						children: [
							secondary[0],
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 17 })
						]
					})]
				})]
			})]
		})
	});
}
function useDocumentMeta(title, description) {
	(0, import_react.useEffect)(() => {
		document.title = title;
		const meta = document.querySelector("meta[name=\"description\"]");
		if (meta) meta.setAttribute("content", description);
	}, [title, description]);
}
//#endregion
export { SectionHeading as a, Eyebrow as i, Breadcrumbs as n, ServiceGrid as o, CTASection as r, useDocumentMeta as s, ArrowLink as t };
