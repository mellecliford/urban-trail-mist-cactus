import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as lazyRouteComponent, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, x as useRouter, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as useLocationSearch, i as useLocale, n as getPublicLocale, o as usePathname, s as withPublicLocale, t as LocaleLink } from "./LocaleLink-D3SyrwIH.mjs";
import { C as ChevronDown, D as ArrowUpRight, f as Menu, i as TriangleAlert, t as X } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DwJ3Use9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var assets = {
	mark: "/assets/eveops-mark.png",
	unityMark: "/assets/unity-compass-fold-mark.png",
	parentHero: "/assets/eveops-parent-hero.webp",
	unity: "/assets/unity-editorial-operations-hero.webp",
	edevops: "/assets/edevops-engineering.webp"
};
var brand = {
	name: "eveOps Group",
	shortName: "eveOps"
};
var languageSubservices = [
	{
		title: "Translation",
		briefLabel: "Translation",
		description: "Accurate translation for documents, product content, communications, and operational material.",
		detail: "We align terminology, tone, target language, and intended use before work begins so the translation supports the decision, publication, or workflow it is meant to serve."
	},
	{
		title: "Localization",
		briefLabel: "Localization",
		description: "Market-ready adaptation that goes beyond literal language conversion.",
		detail: "Localization adapts language, currency, formats, cultural references, product context, and user-facing details so the content feels appropriate and functional in its destination market."
	},
	{
		title: "Transcreation",
		briefLabel: "Transcreation",
		description: "Creative adaptation for messages where impact matters as much as accuracy.",
		detail: "This is suited to brand, campaign, and high-visibility messaging. The work preserves intent, emotional effect, and strategic meaning while giving the new language permission to work naturally."
	},
	{
		title: "Proofreading & editing",
		briefLabel: "Proofreading & editing",
		description: "A precise review pass for content that needs clarity, consistency, and confidence.",
		detail: "We review grammar, punctuation, terminology, style, flow, and consistency against the standards that matter for your audience, brand, or operational use."
	},
	{
		title: "Linguistic QA",
		briefLabel: "Linguistic QA",
		description: "Structured language quality assurance for content, interfaces, and release-ready material.",
		detail: "Linguistic QA checks the complete experience: terminology, layout context, truncation, functional text, consistency, and defects that only appear when language meets the final product."
	},
	{
		title: "Subtitling & captioning",
		briefLabel: "Subtitling & captioning",
		description: "Readable time-coded subtitles and captions for video, training, media, and accessibility needs.",
		detail: "We work from the source recording and intended audience to shape timing, line length, speaker clarity, localization needs, and the final delivery format."
	}
];
var capabilityEngagementGuidance = {
	unity: {
		description: "a focused operational path within a coordinated professional-service delivery",
		detail: "For a focused brief, share the materials or work queue, the expected volume, the quality standard, and the handover point you need. Unity can then assess the most practical support route without asking you for a finished specification."
	},
	edevops: {
		description: "a focused engineering capability connected to the wider product, system, or operating workflow",
		detail: "For a focused project conversation, share the users or team affected, the current workflow or system, the outcome that matters, and any important integrations or constraints. EveDev Ops can then shape the right technical starting point without requiring a completed feature list."
	}
};
var serviceCapabilityGuidance = {
	"unity:transcription": {
		description: "a focused transcription task shaped around source quality, speakers, terminology, and the output format",
		detail: "For a focused transcription brief, share the recording type, languages or speakers, expected accuracy, timestamps or speaker labels, and the use of the finished transcript."
	},
	"unity:ai-data": {
		description: "a defined human-in-the-loop task within a controlled annotation or evaluation workflow",
		detail: "For a focused data-work brief, share the input type, task definition, examples of acceptable and unacceptable output, volume, quality checks, and the required delivery format."
	},
	"unity:research-data": {
		description: "a focused research or data operation designed to support a specific decision",
		detail: "For a focused research brief, share the question to answer, target markets or source types, fields to collect, verification standard, and the format in which the result should be delivered."
	},
	"unity:virtual-workforce": {
		description: "a defined support responsibility within a practical operating rhythm",
		detail: "For a focused workforce brief, share the recurring tasks, tools, volumes, coverage hours, escalation path, and the standard that makes completed work ready for handover."
	},
	"unity:content-services": {
		description: "a structured content operation with a defined review, classification, or publishing purpose",
		detail: "For a focused content brief, share the content type, rules or examples, quality threshold, volume, edge cases, and where completed items should return in the workflow."
	},
	"unity:procurement": {
		description: "a focused sourcing or supplier-comparison workstream built around your decision criteria",
		detail: "For a focused procurement brief, share the sourcing objective, markets or regions, supplier criteria, comparison format, timing, and any logistics or approval constraints."
	},
	"edevops:web-development": {
		description: "a focused web-delivery capability connected to the audience journey and wider business objective",
		detail: "For a focused web brief, share what visitors need to accomplish, the key pages or workflow, existing content or systems, success criteria, and the next launch or decision point."
	},
	"edevops:mobile-development": {
		description: "a focused mobile-product capability shaped around the real-world user scenario and device context",
		detail: "For a focused mobile brief, share the user task, target platforms or devices, the role of the app in the operating workflow, needed integrations, and the measure of successful adoption."
	},
	"edevops:software-development": {
		description: "a focused software capability connected to a bottleneck, workflow, or internal operating system",
		detail: "For a focused software brief, share the current process, people affected, systems that must connect, the pain to remove, and the outcome the new workflow should create."
	},
	"edevops:ai-development": {
		description: "a focused applied-AI capability that still needs a practical evaluation and human-review model",
		detail: "For a focused AI brief, share the task to improve, representative inputs, acceptable outputs, human review requirements, privacy constraints, and the measure of reliable performance."
	},
	"edevops:automation": {
		description: "a focused automation capability built around a repeated trigger, handoff, or operational exception",
		detail: "For a focused automation brief, share the trigger, systems involved, manual steps to reduce, exceptions that require a person, and the business result the workflow should improve."
	},
	"edevops:cloud-devops": {
		description: "a focused infrastructure capability tied to reliable, observable, and maintainable software delivery",
		detail: "For a focused cloud or DevOps brief, share the current deployment picture, environments, reliability or visibility concern, access constraints, and the operational standard to achieve."
	},
	"edevops:application-security": {
		description: "a focused security capability applied to a specific asset, access model, or release concern",
		detail: "For a focused security brief, share the application or asset, user and access model, current concern, relevant compliance context, and the decision a review or hardening effort should inform."
	},
	"edevops:api-integrations": {
		description: "a focused integration capability that connects data, events, and ownership boundaries between systems",
		detail: "For a focused integration brief, share the systems involved, data to exchange, triggering event, reliability requirement, ownership boundaries, and the outcome for users or operators."
	}
};
var frenchServiceContent = {
	"unity:translation": {
		title: "Services linguistiques",
		summary: "Des flux multilingues organisés autour de la qualité, de la clarté et de la cohérence des contenus.",
		context: "Les bons projets linguistiques commencent par les contenus sources, les langues ou marchés visés, le ton attendu et le mode de relecture ou de publication.",
		capabilityDescription: "une capacité linguistique précise, adaptée au contenu, aux langues et au résultat attendu",
		capabilityDetail: "Partagez les contenus disponibles, les langues de départ et d’arrivée, le public, le ton, les exigences de qualité et la date de remise utile."
	},
	"unity:transcription": {
		title: "Services de transcription",
		summary: "Une transcription structurée pour les enregistrements audio, vidéo, entretiens, réunions et processus de validation.",
		context: "Indiquez le format de l’enregistrement, les langues ou intervenants, le niveau de précision, les repères temporels et l’usage prévu du livrable.",
		capabilityDescription: "une étape de transcription structurée autour de la qualité de la source et du format de sortie",
		capabilityDetail: "Précisez le type d’enregistrement, les intervenants ou langues, le niveau de fidélité attendu, les horodatages, les étiquettes de locuteur et l’usage final."
	},
	"unity:ai-data": {
		title: "Annotation de données et entraînement IA",
		summary: "Un travail de données avec intervention humaine qui soutient le développement et l’évaluation de systèmes d’IA.",
		context: "Les premières décisions portent sur le type de données, la tâche d’annotation ou d’évaluation, les exemples de sortie acceptable, les contrôles qualité et le volume.",
		capabilityDescription: "une tâche encadrée dans un flux d’annotation ou d’évaluation avec intervention humaine",
		capabilityDetail: "Décrivez le type d’entrée, la définition de tâche, des exemples de résultats acceptables ou non, le volume, les vérifications qualité et le format de livraison."
	},
	"unity:research-data": {
		title: "Recherche et services de données",
		summary: "De la recherche, de la vérification et des opérations de données pour soutenir des décisions concrètes.",
		context: "Un brief utile précise la décision à soutenir, les sources ou marchés recherchés, les champs à collecter et le format du résultat.",
		capabilityDescription: "une opération de recherche ou de données conçue pour éclairer une décision définie",
		capabilityDetail: "Partagez la question à traiter, les marchés ou sources visés, les informations à collecter, le niveau de vérification et le format de restitution."
	},
	"unity:virtual-workforce": {
		title: "Main-d’œuvre virtuelle",
		summary: "Un soutien opérationnel aligné sur les projets, l’administration, le contenu, la qualité et les opérations numériques.",
		context: "Décrivez les tâches récurrentes, les outils, le volume, les horaires ou la couverture souhaitée, ainsi que les règles de remise et d’escalade.",
		capabilityDescription: "une responsabilité de soutien définie dans un rythme opérationnel concret",
		capabilityDetail: "Indiquez les tâches, outils, volumes, horaires, règles d’escalade et critères qui rendent le travail prêt à être remis."
	},
	"unity:content-services": {
		title: "Opérations de contenu",
		summary: "Un soutien structuré pour la révision, la modération, la classification, l’édition et la localisation de contenus.",
		context: "Un bon point de départ précise le type de contenu, les règles de révision ou de classification, le seuil qualité, le volume et le flux de retour.",
		capabilityDescription: "une opération de contenu avec un objectif de révision, de classification ou de publication défini",
		capabilityDetail: "Partagez le type de contenu, les règles ou exemples, le niveau de qualité, le volume, les cas particuliers et le point de retour dans votre flux."
	},
	"unity:procurement": {
		title: "Soutien aux achats",
		summary: "Un accompagnement d’achats et de sourcing pour la recherche, la comparaison, la coordination et la vérification de fournisseurs.",
		context: "Précisez l’objectif d’approvisionnement, les marchés ou régions, les critères fournisseurs, le format de comparaison et les contraintes de délai ou de logistique.",
		capabilityDescription: "un volet de sourcing ou de comparaison construit autour de critères de décision clairs",
		capabilityDetail: "Décrivez l’objectif, les régions, les critères fournisseurs, le format de comparaison, les échéances ainsi que les contraintes logistiques ou d’approbation."
	},
	"edevops:web-development": {
		title: "Développement web",
		summary: "Des sites, plateformes, portails et applications web conçus autour d’objectifs métier clairs.",
		context: "Commencez par l’objectif métier, le public, les actions attendues des visiteurs, les contenus ou systèmes existants et le critère de réussite.",
		capabilityDescription: "une capacité web reliée au parcours utilisateur et à l’objectif métier",
		capabilityDetail: "Partagez ce que les visiteurs doivent accomplir, les pages ou flux clés, les contenus ou systèmes existants, les critères de réussite et le prochain jalon."
	},
	"edevops:mobile-development": {
		title: "Développement mobile",
		summary: "Des expériences mobiles et systèmes associés conçus pour les usages réels des personnes.",
		context: "Clarifiez le scénario utilisateur, les appareils ou plateformes, le rôle de l’application dans le flux de travail, les intégrations et l’adoption visée.",
		capabilityDescription: "une capacité produit mobile façonnée par le scénario utilisateur et le contexte d’appareil",
		capabilityDetail: "Indiquez la tâche utilisateur, les plateformes ou appareils visés, le rôle de l’application dans le flux, les intégrations utiles et le signe d’une adoption réussie."
	},
	"edevops:software-development": {
		title: "Ingénierie logicielle",
		summary: "Une architecture logicielle sur mesure pour les systèmes internes, plateformes SaaS et flux métier connectés.",
		context: "Décrivez le frein opérationnel, les personnes concernées, le processus actuel, les systèmes à connecter et le résultat du nouveau flux.",
		capabilityDescription: "une capacité logicielle reliée à un frein, un flux ou un système d’exploitation interne",
		capabilityDetail: "Partagez le processus actuel, les personnes concernées, les systèmes qui doivent communiquer, le problème à éliminer et le résultat attendu."
	},
	"edevops:ai-development": {
		title: "Développement IA",
		summary: "Des systèmes d’IA appliquée conçus avec un contexte opérationnel, une évaluation et des flux utilisateurs concrets.",
		context: "Commencez par la décision ou la tâche à améliorer, des exemples d’entrée, les sorties acceptables, la revue humaine, la confidentialité et l’évaluation.",
		capabilityDescription: "une capacité d’IA appliquée qui exige une évaluation pratique et un modèle de supervision humaine",
		capabilityDetail: "Précisez la tâche, des exemples représentatifs, les résultats acceptables, la revue humaine, les contraintes de confidentialité et le niveau de fiabilité attendu."
	},
	"edevops:automation": {
		title: "Automatisation",
		summary: "Des processus connectés qui réduisent les tâches répétitives et rassemblent les systèmes dans un même flux de travail.",
		context: "Identifiez le déclencheur répété, les systèmes impliqués, les étapes manuelles ou passages de relais à réduire, les exceptions et le résultat métier.",
		capabilityDescription: "une capacité d’automatisation construite autour d’un déclencheur, d’un relais ou d’une exception opérationnelle",
		capabilityDetail: "Décrivez le déclencheur, les systèmes, les étapes manuelles à réduire, les exceptions qui nécessitent une personne et le résultat métier recherché."
	},
	"edevops:cloud-devops": {
		title: "Cloud et DevOps",
		summary: "Des pratiques de déploiement et d’infrastructure pour des logiciels sûrs, observables et maintenables.",
		context: "Partagez la situation de déploiement actuelle, les environnements, le sujet de fiabilité ou de visibilité, les contraintes d’accès et la norme à atteindre.",
		capabilityDescription: "une capacité d’infrastructure reliée à une livraison logicielle fiable, observable et maintenable",
		capabilityDetail: "Indiquez l’architecture de déploiement actuelle, les environnements, le problème de fiabilité ou de visibilité, les accès et la norme opérationnelle recherchée."
	},
	"edevops:application-security": {
		title: "Sécurité applicative",
		summary: "Une architecture et des pratiques de sécurité intégrées à l’ingénierie produit.",
		context: "Expliquez l’application ou l’actif à protéger, les rôles et accès, le sujet actuel, le cadre de conformité éventuel et la décision à éclairer.",
		capabilityDescription: "une capacité de sécurité appliquée à un actif, un modèle d’accès ou une préoccupation de mise en production précise",
		capabilityDetail: "Partagez l’application ou l’actif, les utilisateurs et accès, le risque ou sujet actuel, le contexte de conformité et la décision attendue du contrôle."
	},
	"edevops:api-integrations": {
		title: "API et intégrations",
		summary: "Des API et intégrations qui permettent aux systèmes métier critiques d’échanger des données et de fonctionner ensemble.",
		context: "Définissez les systèmes concernés, les données et événements critiques, la fiabilité requise, les responsabilités et le résultat pour les utilisateurs.",
		capabilityDescription: "une capacité d’intégration qui relie données, événements et responsabilités entre des systèmes",
		capabilityDetail: "Décrivez les systèmes à connecter, les données échangées, l’événement déclencheur, le niveau de fiabilité, les responsabilités et le résultat pour les utilisateurs."
	}
};
var frenchCapabilityTitles = {
	"Translation": "Traduction",
	"Localization": "Localisation",
	"Transcreation": "Transcréation",
	"Proofreading & editing": "Révision et correction",
	"Linguistic QA": "Assurance qualité linguistique",
	"Subtitling & captioning": "Sous-titrage et légendage",
	"Audio transcription": "Transcription audio",
	"Video transcription": "Transcription vidéo",
	"Multilingual transcription": "Transcription multilingue",
	"Timestamping": "Horodatage",
	"Interview transcription": "Transcription d’entretiens",
	"Speech-to-text validation": "Validation parole-texte",
	"Text, image & video annotation": "Annotation de textes, images et vidéos",
	"Audio annotation": "Annotation audio",
	"Intent & entity classification": "Classification des intentions et des entités",
	"AI response evaluation": "Évaluation de réponses IA",
	"Search relevance evaluation": "Évaluation de la pertinence de recherche",
	"Dataset preparation": "Préparation de jeux de données",
	"Web & market research": "Recherche web et études de marché",
	"Data collection": "Collecte de données",
	"Data verification": "Vérification de données",
	"Data enrichment": "Enrichissement de données",
	"Competitive research": "Analyse concurrentielle",
	"Data cleansing": "Nettoyage de données",
	"Virtual assistance": "Assistance virtuelle",
	"Administrative support": "Soutien administratif",
	"Customer support": "Support client",
	"Back-office operations": "Opérations back-office",
	"Document processing": "Traitement de documents",
	"Quality assurance": "Assurance qualité",
	"Content review": "Révision de contenu",
	"Content moderation": "Modération de contenu",
	"Content classification": "Classification de contenu",
	"Copy editing": "Révision rédactionnelle",
	"SEO content operations": "Opérations de contenu SEO",
	"Product descriptions": "Descriptions de produits",
	"Supplier sourcing": "Recherche de fournisseurs",
	"Vendor identification": "Identification de prestataires",
	"RFQ support": "Assistance aux appels d’offres",
	"Supplier comparison": "Comparaison de fournisseurs",
	"International sourcing": "Sourcing international",
	"Logistics coordination": "Coordination logistique",
	"Corporate websites": "Sites web d’entreprise",
	"Web applications": "Applications web",
	"Customer portals": "Portails clients",
	"Dashboards": "Tableaux de bord",
	"E-commerce platforms": "Plateformes e-commerce",
	"CMS development": "Développement CMS",
	"Android applications": "Applications Android",
	"iOS applications": "Applications iOS",
	"Cross-platform applications": "Applications multiplateformes",
	"Flutter": "Flutter",
	"React Native": "React Native",
	"API integrations": "Intégrations API",
	"Custom software": "Logiciels sur mesure",
	"SaaS platforms": "Plateformes SaaS",
	"Enterprise applications": "Applications d’entreprise",
	"Workflow systems": "Systèmes de workflow",
	"Backend development": "Développement backend",
	"Database architecture": "Architecture de bases de données",
	"AI applications": "Applications IA",
	"LLM integrations": "Intégrations LLM",
	"AI agents": "Agents IA",
	"RAG": "RAG",
	"Document intelligence": "Intelligence documentaire",
	"AI chatbots": "Chatbots IA",
	"Workflow automation": "Automatisation de workflows",
	"API automation": "Automatisation d’API",
	"AI automation": "Automatisation IA",
	"Data pipelines": "Pipelines de données",
	"Webhooks": "Webhooks",
	"Third-party integrations": "Intégrations tierces",
	"Cloud deployment": "Déploiement cloud",
	"CI/CD": "CI/CD",
	"Containerization": "Conteneurisation",
	"Cloud architecture": "Architecture cloud",
	"Monitoring": "Supervision",
	"Infrastructure automation": "Automatisation d’infrastructure",
	"Security reviews": "Audits de sécurité",
	"Authentication": "Authentification",
	"Authorization": "Autorisation",
	"API security": "Sécurité des API",
	"Secure deployment practices": "Pratiques de déploiement sécurisé",
	"Vulnerability assessment": "Évaluation des vulnérabilités",
	"REST APIs": "API REST",
	"GraphQL": "GraphQL",
	"Payment integrations": "Intégrations de paiement",
	"Messaging integrations": "Intégrations de messagerie",
	"Authentication integrations": "Intégrations d’authentification",
	"Data synchronization": "Synchronisation de données"
};
var frenchLanguageCapabilityContent = {
	"Translation": {
		title: "Traduction",
		description: "Une traduction exacte pour les documents, contenus produit, communications et supports opérationnels.",
		detail: "Indiquez les langues de départ et d’arrivée, le public, le ton, la terminologie éventuelle et l’usage final afin d’aligner le travail sur la décision, la publication ou le flux concerné."
	},
	"Localization": {
		title: "Localisation",
		description: "Une adaptation prête pour le marché, au-delà de la simple conversion littérale.",
		detail: "Précisez le marché cible, les formats, devises, références culturelles, contexte produit et éléments destinés aux utilisateurs afin que le contenu soit naturel et fonctionnel dans sa destination."
	},
	"Transcreation": {
		title: "Transcréation",
		description: "Une adaptation créative pour les messages où l’impact compte autant que l’exactitude.",
		detail: "Partagez le message source, l’objectif de marque ou de campagne, le public et l’effet recherché afin de préserver l’intention stratégique tout en laissant la nouvelle langue fonctionner naturellement."
	},
	"Proofreading & editing": {
		title: "Révision et correction",
		description: "Une relecture précise pour des contenus qui demandent clarté, cohérence et assurance.",
		detail: "Indiquez le public, le guide de style ou la terminologie, le niveau de correction souhaité et l’usage final pour cadrer la grammaire, le ton, le flux et la cohérence."
	},
	"Linguistic QA": {
		title: "Assurance qualité linguistique",
		description: "Une assurance qualité structurée pour les contenus, interfaces et éléments prêts à être publiés.",
		detail: "Partagez l’environnement de test, les langues, les parcours utilisateurs critiques, les règles de terminologie et les critères de validation afin de repérer les défauts de langue, de contexte ou d’affichage."
	},
	"Subtitling & captioning": {
		title: "Sous-titrage et légendage",
		description: "Des sous-titres et légendes lisibles, synchronisés et adaptés à la vidéo, la formation ou l’accessibilité.",
		detail: "Précisez la vidéo source, le public, les langues, le format de livraison, les règles de lecture et les besoins d’accessibilité pour ajuster le timing, les locuteurs et la longueur des lignes."
	}
};
function getServiceDisplay(division, service, locale = "en") {
	const localized = locale === "fr" ? frenchServiceContent[`${division}:${service.slug}`] : void 0;
	return localized ? {
		title: localized.title,
		summary: localized.summary
	} : {
		title: service.title,
		summary: service.summary
	};
}
function getServicePathContext(division, service, locale = "en") {
	return locale === "fr" ? frenchServiceContent[`${division}:${service.slug}`]?.context ?? "Ouvrez chaque capacité pour consulter son contexte, les éléments utiles à partager et un accès direct au brief correspondant." : servicePathContext[`${division}:${service.slug}`] ?? "Open any capability to see its delivery context, useful starting information, and a direct route into that exact brief.";
}
function getServiceCapabilityBriefs(division, service, locale = "en") {
	if (division === "unity" && service.slug === "translation") return languageSubservices.map((brief) => {
		const localized = locale === "fr" ? frenchLanguageCapabilityContent[brief.title] : void 0;
		return {
			title: localized?.title ?? brief.title,
			canonicalTitle: brief.title,
			briefLabel: brief.briefLabel,
			description: localized?.description ?? brief.description,
			detail: localized?.detail ?? brief.detail
		};
	});
	const guidance = serviceCapabilityGuidance[`${division}:${service.slug}`] ?? capabilityEngagementGuidance[division];
	const french = frenchServiceContent[`${division}:${service.slug}`];
	return service.capabilities.map((capability) => ({
		title: locale === "fr" ? frenchCapabilityTitles[capability] ?? capability : capability,
		canonicalTitle: capability,
		briefLabel: `${service.title} — ${capability}`,
		description: locale === "fr" ? `${frenchCapabilityTitles[capability] ?? capability} : ${french?.capabilityDescription ?? "une capacité ciblée reliée à un résultat opérationnel défini"}.` : `${capability} is ${guidance.description}.`,
		detail: locale === "fr" ? french?.capabilityDetail ?? "Décrivez le contexte, le résultat attendu, les contraintes utiles, le volume et le calendrier afin de préparer un premier échange pertinent." : guidance.detail
	}));
}
function getServiceCapabilityBriefHref(division, briefLabel, capability, locale = "en") {
	const parameters = new URLSearchParams({
		service: briefLabel,
		source: "capability_cta",
		capability: capability || briefLabel
	});
	if (division === "edevops") parameters.set("division", "edevops");
	if (locale === "fr") parameters.set("lang", "fr");
	return `${division === "unity" ? "/unity/contact" : "/contact"}?${parameters.toString()}`;
}
function getCapabilityBriefTemplate(division, service, brief, locale = "en") {
	const divisionName = divisions[division].name;
	const prompt = locale === "fr" ? division === "unity" ? [
		"Quel résultat doit être livré ?",
		"Quels documents, fichiers ou sources sont disponibles ?",
		"Quelles sont les exigences de qualité ou de validation ?",
		"Quel volume, calendrier et point de remise prévoir ?"
	] : [
		"Qu'est-ce qui doit mieux fonctionner après ce projet ?",
		"Quels utilisateurs et quel flux de travail sont concernés ?",
		"Quels systèmes, intégrations ou contraintes techniques doivent être respectés ?",
		"Quel calendrier, quelles priorités et quel point de décision prévoir ?"
	] : division === "unity" ? [
		"What needs to be delivered?",
		"Materials, files, or sources available",
		"Quality or review requirements",
		"Volume, timing, and handover point"
	] : [
		"What should work better after this project?",
		"Users and current workflow",
		"Systems, integrations, or technical constraints",
		"Timing, priorities, and decision point"
	];
	if (locale === "fr") return `# ${brief.briefLabel} — Brief de travail\n\n**Division :** ${divisionName}\n**Service :** ${service.title}\n**Capacité :** ${brief.title}\n\nCe brief porte sur la capacité « ${brief.title} » dans le cadre du service ${service.title}. Décrivez le résultat attendu, le contexte et les contraintes utiles afin que l’équipe puisse préparer une première réponse adaptée.\n\n## Questions de départ\n${prompt.map((item) => `- ${item} : `).join("\n")}\n\n## Contexte\n- Organisation : \n- Contact principal : \n- Mode de réponse préféré : \n\n> Ce modèle est facultatif. Vous pouvez aussi soumettre le brief en ligne avec votre nom, votre e-mail et une courte description.\n`;
	return `# ${brief.briefLabel} — Working Brief\n\n**Division:** ${divisionName}\n**Service:** ${service.title}\n**Capability:** ${brief.title}\n\n${brief.description}\n\n## Starting prompts\n${prompt.map((item) => `- ${item}: `).join("\n")}\n\n## Context\n- Organization: \n- Main contact: \n- Preferred response method: \n\n> This template is optional. You may instead submit the concise online brief with your name, email, and a short description.\n`;
}
function getCapabilityBriefTemplateFilename(briefLabel, locale = "en") {
	return `${briefLabel.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-brief-template.${locale}.md`;
}
var divisions = {
	unity: {
		key: "unity",
		name: "Unity Integrated Solutions",
		shortName: "Unity",
		eyebrow: "Coordinated professional services",
		strapline: "Professional Workforces. Integrated Solutions.",
		description: "Access skilled professionals and structured teams for language, AI data, research, digital operations, procurement, and specialized business services.",
		image: assets.unity,
		services: [
			{
				title: "Language Services",
				slug: "translation",
				summary: "Multilingual language workflows shaped around content quality, clarity, and consistency.",
				capabilities: [
					"Translation",
					"Localization",
					"Transcreation",
					"Proofreading & editing",
					"Linguistic QA",
					"Subtitling & captioning"
				],
				icon: "language"
			},
			{
				title: "Transcription Services",
				slug: "transcription",
				summary: "Structured transcription support for audio, video, interviews, meetings, and validation workflows.",
				capabilities: [
					"Audio transcription",
					"Video transcription",
					"Multilingual transcription",
					"Timestamping",
					"Interview transcription",
					"Speech-to-text validation"
				],
				icon: "content"
			},
			{
				title: "Data Annotation & AI Training",
				slug: "ai-data",
				summary: "Human-in-the-loop data work that supports the development and evaluation of AI systems.",
				capabilities: [
					"Text, image & video annotation",
					"Audio annotation",
					"Intent & entity classification",
					"AI response evaluation",
					"Search relevance evaluation",
					"Dataset preparation"
				],
				icon: "data"
			},
			{
				title: "Research & Data Services",
				slug: "research-data",
				summary: "Research, verification, and data operations for teams that need dependable operational support.",
				capabilities: [
					"Web & market research",
					"Data collection",
					"Data verification",
					"Data enrichment",
					"Competitive research",
					"Data cleansing"
				],
				icon: "research"
			},
			{
				title: "Virtual Workforce",
				slug: "virtual-workforce",
				summary: "Project-aligned business support across administrative, content, quality, and digital operations.",
				capabilities: [
					"Virtual assistance",
					"Administrative support",
					"Customer support",
					"Back-office operations",
					"Document processing",
					"Quality assurance"
				],
				icon: "team"
			},
			{
				title: "Content Operations",
				slug: "content-services",
				summary: "Structured support for content review, moderation, classification, editing, and localization.",
				capabilities: [
					"Content review",
					"Content moderation",
					"Content classification",
					"Copy editing",
					"SEO content operations",
					"Product descriptions"
				],
				icon: "content"
			},
			{
				title: "Procurement Support",
				slug: "procurement",
				summary: "Procurement and sourcing support for supplier research, comparison, coordination, and verification.",
				capabilities: [
					"Supplier sourcing",
					"Vendor identification",
					"RFQ support",
					"Supplier comparison",
					"International sourcing",
					"Logistics coordination"
				],
				icon: "procurement"
			}
		]
	},
	edevops: {
		key: "edevops",
		name: "EveDev Ops",
		shortName: "EveDev Ops",
		eyebrow: "Software engineering · AI · digital products",
		strapline: "We Build Software That Moves Businesses Forward.",
		description: "From websites and mobile applications to SaaS platforms, AI systems, and automation infrastructure, EveDev Ops turns ideas into production-ready digital products.",
		image: assets.edevops,
		services: [
			{
				title: "Web Development",
				slug: "web-development",
				summary: "Websites, platforms, portals, and applications designed around clear business objectives.",
				capabilities: [
					"Corporate websites",
					"Web applications",
					"Customer portals",
					"Dashboards",
					"E-commerce platforms",
					"CMS development"
				],
				icon: "web"
			},
			{
				title: "Mobile Development",
				slug: "mobile-development",
				summary: "Mobile experiences and supporting systems planned for the way people use products in the real world.",
				capabilities: [
					"Android applications",
					"iOS applications",
					"Cross-platform applications",
					"Flutter",
					"React Native",
					"API integrations"
				],
				icon: "mobile"
			},
			{
				title: "Software Engineering",
				slug: "software-development",
				summary: "Custom software architecture for internal systems, SaaS platforms, and connected business workflows.",
				capabilities: [
					"Custom software",
					"SaaS platforms",
					"Enterprise applications",
					"Workflow systems",
					"Backend development",
					"Database architecture"
				],
				icon: "software"
			},
			{
				title: "AI Development",
				slug: "ai-development",
				summary: "Applied AI systems designed with practical operational context, evaluation, and user workflows in mind.",
				capabilities: [
					"AI applications",
					"LLM integrations",
					"AI agents",
					"RAG",
					"Document intelligence",
					"AI chatbots"
				],
				icon: "ai"
			},
			{
				title: "Automation",
				slug: "automation",
				summary: "Connected processes that reduce repetitive work and bring important systems into one working flow.",
				capabilities: [
					"Workflow automation",
					"API automation",
					"AI automation",
					"Data pipelines",
					"Webhooks",
					"Third-party integrations"
				],
				icon: "automation"
			},
			{
				title: "Cloud & DevOps",
				slug: "cloud-devops",
				summary: "Deployment and infrastructure practices planned to support secure, observable, and maintainable software.",
				capabilities: [
					"Cloud deployment",
					"CI/CD",
					"Containerization",
					"Cloud architecture",
					"Monitoring",
					"Infrastructure automation"
				],
				icon: "cloud"
			},
			{
				title: "Application Security",
				slug: "application-security",
				summary: "Security-minded architecture and application practices integrated into product engineering.",
				capabilities: [
					"Security reviews",
					"Authentication",
					"Authorization",
					"API security",
					"Secure deployment practices",
					"Vulnerability assessment"
				],
				icon: "security"
			},
			{
				title: "API & Integrations",
				slug: "api-integrations",
				summary: "APIs and integrations that help critical business systems exchange data and work together.",
				capabilities: [
					"REST APIs",
					"GraphQL",
					"Payment integrations",
					"Messaging integrations",
					"Authentication integrations",
					"Data synchronization"
				],
				icon: "api"
			}
		]
	}
};
var products = [{
	name: "Shweng",
	slug: "shweng",
	category: "Cross-Network Exchange",
	description: "A cross-network money and value exchange application currently being developed by EveDev Ops. Product information will evolve as the work progresses.",
	status: "In development"
}];
var servicePathContext = {
	"unity:translation": "For translation and localization work, the useful starting point is the source material, target language or market, desired tone, and how the final content will be reviewed or published.",
	"unity:transcription": "For transcription work, a first conversation is strongest when it covers the recording format, languages or speakers, expected accuracy, timestamps, and the use of the final transcript.",
	"unity:ai-data": "For AI data work, the early decisions are the data type, annotation or evaluation task, examples of acceptable output, quality controls, and the scale of the dataset.",
	"unity:research-data": "For research and data support, the key context is the decision the research must support, the desired sources or markets, the fields to collect, and how the result should be delivered.",
	"unity:virtual-workforce": "For workforce support, it helps to describe the recurring work, tools, volume, hours or coverage needed, and the handover or escalation expectations.",
	"unity:content-services": "For content operations, define the content type, review or classification rules, quality threshold, volume, and the workflow where completed work should return.",
	"unity:procurement": "For procurement support, a useful brief includes the sourcing objective, markets or regions, supplier criteria, comparison format, and any timing or logistics constraints.",
	"edevops:web-development": "For web work, the best starting point is the business goal, the audience, what visitors need to accomplish, existing content or systems, and the decision that will define success.",
	"edevops:mobile-development": "For mobile work, clarify the user scenario, devices or platforms in scope, the role of the app within your operating workflow, integrations, and how the team will measure adoption.",
	"edevops:software-development": "For custom software, begin with the operational bottleneck, the people affected, the current process, the systems that must connect, and the outcome the new workflow should create.",
	"edevops:ai-development": "For applied AI, start with the decision or task to improve, representative inputs, acceptable outputs, human review requirements, privacy constraints, and how performance will be evaluated.",
	"edevops:automation": "For automation, identify the repeated trigger, the systems involved, the manual steps or handoffs to reduce, exception handling, and the business result that matters most.",
	"edevops:cloud-devops": "For cloud and DevOps work, share the current deployment picture, reliability or visibility concern, environments in scope, access constraints, and the operational standard to achieve.",
	"edevops:application-security": "For application security, explain the application or asset to protect, user and access model, current concern, compliance context if relevant, and the decision a review needs to inform.",
	"edevops:api-integrations": "For integrations, define the systems that need to exchange information, the critical data and triggering event, required reliability, ownership boundaries, and the outcome for users or operators."
};
var edevopsTech = [
	"React",
	"Next.js",
	"TypeScript",
	"Node.js",
	"Python",
	"Flutter",
	"PostgreSQL",
	"Docker",
	"Kubernetes",
	"AWS",
	"Google Cloud",
	"Azure",
	"CI/CD",
	"AI/LLM APIs"
];
var navItems = [
	["Home", "/"],
	["Unity", "/unity"],
	["EveDev Ops", "/edevops"],
	["Products", "/products"],
	["Portfolio", "/portfolio"],
	["About", "/about"],
	["Contact", "/contact"]
];
function findService(division, slug) {
	if (division === "unity" && slug === "data-annotation") return divisions.unity.services.find((service) => service.slug === "ai-data");
	return divisions[division].services.find((service) => service.slug === slug);
}
function shouldShowDivisionRouteBar(division) {
	return division === "unity" || division === "edevops";
}
function getDivisionHeroHeadline(division, locale) {
	if (division === "unity") return "Unity Integrated Solutions";
	return locale === "fr" ? "Planifiez les systèmes qui font avancer le travail." : "Plan the systems that move the work forward.";
}
function getContactRoutePresentation(route, locale) {
	const isFrench = locale === "fr";
	return {
		className: `contact-page--route-${route}`,
		eyebrow: isFrench ? "Brief de projet" : "Project brief",
		headlineLead: isFrench ? "Commencez par un" : "Start with a",
		headlineEmphasis: isFrench ? "brief utile." : "useful brief.",
		description: isFrench ? "Choisissez le parcours correspondant au travail. Décrivez le résultat attendu, les personnes concernées et les contraintes importantes ; nous vous aiderons à organiser la suite." : "Choose the route that matches the work. Describe the outcome, the people involved, and the constraints that matter; we will help organize the next working step."
	};
}
function EveOpsBrandMark({ className = "brand-lockup__mark" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		className,
		viewBox: "0 0 48 48",
		role: "img",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			transform: "translate(48 0) scale(-1 1)",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M34.5 8 40 13.5 27.5 26 40 38.5 34.5 44 16.5 26z",
					fill: "#2765f5"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M20 8 25.5 13.5 13 26 25.5 38.5 20 44 2 26z",
					fill: "currentColor"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "m17.5 18 6 6-6 6-4-4 2-2-2-2z",
					fill: "#61d7e4"
				})
			]
		})
	});
}
function themeFromPath(pathname) {
	if (pathname.startsWith("/unity")) return "unity";
	if (pathname.startsWith("/edevops")) return "edevops";
	return "parent";
}
function prefersReducedMotion() {
	return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
var LOADER_COPY = {
	parent: {
		title: {
			en: "eveOps Group",
			fr: "eveOps Group"
		},
		note: {
			en: "Independent capabilities",
			fr: "Des capacités indépendantes"
		}
	},
	unity: {
		title: {
			en: "Unity Integrated Solutions",
			fr: "Unity Integrated Solutions"
		},
		note: {
			en: "Coordinated professional services",
			fr: "Services professionnels coordonnés"
		}
	},
	edevops: {
		title: {
			en: "EveDev Ops",
			fr: "EveDev Ops"
		},
		note: {
			en: "Software · AI · products",
			fr: "Logiciel · IA · produits"
		}
	}
};
function RouteLoader() {
	const pathname = usePathname();
	const locale = useLocale();
	const prevPath = (0, import_react.useRef)(null);
	const [intro, setIntro] = (0, import_react.useState)(null);
	(0, import_react.useLayoutEffect)(() => {
		const next = themeFromPath(pathname);
		const previous = prevPath.current;
		prevPath.current = pathname;
		if (prefersReducedMotion()) {
			setIntro(null);
			return;
		}
		if (previous === null && pathname === "/") {
			setIntro(null);
			return;
		}
		const mode = !previous || themeFromPath(previous) !== next ? "signature" : "pass";
		setIntro({
			theme: next,
			mode,
			id: Date.now()
		});
		const hide = window.setTimeout(() => setIntro(null), mode === "signature" ? 560 : 480);
		return () => window.clearTimeout(hide);
	}, [pathname]);
	if (!intro) return null;
	const copy = LOADER_COPY[intro.theme];
	if (intro.mode === "pass") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `route-pass route-pass--${intro.theme}`,
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copy.title[locale] })
	}, intro.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `sig sig--${intro.theme}`,
		role: "presentation",
		"aria-hidden": "true",
		children: [
			intro.theme === "parent" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sig-parent",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "sig-parent__hex sig-parent__hex--a" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "sig-parent__hex sig-parent__hex--b" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "sig-parent__hex sig-parent__hex--c" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {})
				]
			}),
			intro.theme === "unity" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sig-unity",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "sig-unity__sheet" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "sig-unity__rule" })
				]
			}),
			intro.theme === "edevops" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sig-edev",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "sig-edev__grid" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "sig-edev__scan" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "sig__title",
				children: copy.title[locale]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
				className: "sig__note",
				children: copy.note[locale]
			})
		]
	}, intro.id);
}
function PageMotion({ children, theme }) {
	const pathname = usePathname();
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useLayoutEffect)(() => {
		const node = ref.current;
		if (!node) return;
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "instant"
		});
		node.classList.remove("is-entered");
		if (prefersReducedMotion()) {
			node.classList.add("is-entered", "is-reduced");
			node.querySelectorAll("section").forEach((section) => section.classList.add("is-in"));
			return;
		}
		node.offsetWidth;
		node.classList.add("is-entered");
		const io = new IntersectionObserver((entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				entry.target.classList.add("is-in");
				io.unobserve(entry.target);
			}
		}, {
			threshold: .08,
			rootMargin: "0px 0px -4% 0px"
		});
		node.querySelectorAll("section").forEach((section, index) => {
			if (index === 0) {
				section.classList.add("is-in");
				return;
			}
			section.classList.add("reveal-block");
			io.observe(section);
		});
		return () => {
			io.disconnect();
		};
	}, [pathname]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		className: `page-motion page-motion--${theme}`,
		"data-path": pathname,
		children
	});
}
function DivisionLoadMark({ theme }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `division-load-mark division-load-mark--${theme}`,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
		]
	});
}
function localizeNavigation(label, locale) {
	if (locale === "en") return label;
	return {
		Home: "Accueil",
		Products: "Produits",
		Portfolio: "Réalisations",
		About: "À propos",
		Contact: "Contact",
		Services: "Services",
		Language: "Langues",
		"AI Data": "Données IA",
		"Research & Data": "Recherche et données",
		Procurement: "Achats",
		Workforce: "Équipes",
		Divisions: "Divisions",
		Work: "Réalisations"
	}[label] || label;
}
function LanguageControl({ locale, inverted = false }) {
	const currentHref = `${usePathname()}${useLocationSearch()}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `lang-switch ${inverted ? "lang-switch--light" : ""}`,
		"aria-label": "Language",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: withPublicLocale(currentHref, "en"),
			className: locale === "en" ? "is-active" : "",
			lang: "en",
			children: "EN"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: withPublicLocale(currentHref, "fr"),
			className: locale === "fr" ? "is-active" : "",
			lang: "fr",
			children: "FR"
		})]
	});
}
function EveOpsBrandLockup({ footer = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LocaleLink, {
		to: "/",
		className: `brand-lockup${footer ? " brand-lockup--footer" : ""}`,
		"aria-label": `${brand.name} home`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EveOpsBrandMark, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "brand-lockup__word",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "eve" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "wordmark-o",
					children: "Ops"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "brand-lockup__group",
				children: "Group"
			})
		]
	});
}
var parentNav = [
	["Home", "/"],
	["Products", "/products"],
	["Work", "/portfolio"],
	["About", "/about"]
];
function SiteHeader() {
	const pathname = usePathname();
	const locale = useLocale();
	const fr = locale === "fr";
	const [open, setOpen] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [divisionsOpen, setDivisionsOpen] = (0, import_react.useState)(false);
	const isHome = pathname === "/";
	const isDark = pathname.startsWith("/edevops") || isHome;
	const megaId = (0, import_react.useId)();
	(0, import_react.useEffect)(() => {
		setOpen(false);
		setDivisionsOpen(false);
	}, [pathname]);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 18);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);
	const chromeClass = [
		"site-chrome",
		isDark ? "site-chrome--dark" : "site-chrome--light",
		isHome ? "site-chrome--over-hero" : "",
		scrolled || !isHome ? "site-chrome--solid" : "",
		open ? "site-chrome--open" : ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: chromeClass,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "site-chrome__bar",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EveOpsBrandLockup, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "site-chrome__nav",
					"aria-label": "Primary",
					children: [parentNav.map(([label, href]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleLink, {
						to: href,
						className: pathname === href ? "site-chrome__link is-active" : "site-chrome__link",
						children: localizeNavigation(label, locale)
					}, href)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `site-chrome__mega-wrap ${divisionsOpen ? "is-open" : ""}`,
						onMouseEnter: () => setDivisionsOpen(true),
						onMouseLeave: () => setDivisionsOpen(false),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: `site-chrome__link site-chrome__link--btn ${pathname.startsWith("/unity") || pathname.startsWith("/edevops") ? "is-active" : ""}`,
							"aria-expanded": divisionsOpen,
							"aria-controls": megaId,
							onClick: () => setDivisionsOpen((v) => !v),
							children: [fr ? "Divisions" : "Divisions", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 14 })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "site-chrome__mega",
							id: megaId,
							hidden: !divisionsOpen,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LocaleLink, {
								to: "/unity",
								className: "mega-card mega-card--unity",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mega-card__index",
										children: "01"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Unity Integrated Solutions" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: fr ? "Services professionnels coordonnés" : "Coordinated professional services" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: fr ? "Langues · données IA · recherche · achats · équipes" : "Language · AI data · research · procurement · workforce" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "mega-card__go",
										children: [
											fr ? "Explorer Unity" : "Explore Unity",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 14 })
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LocaleLink, {
								to: "/edevops",
								className: "mega-card mega-card--edevops",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mega-card__index",
										children: "02"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "EveDev Ops" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: fr ? "Ingénierie logicielle · IA · produits" : "Software engineering · AI · products" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: fr ? "Web · mobile · SaaS · automatisation · cloud" : "Web · mobile · SaaS · automation · cloud" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "mega-card__go",
										children: [
											fr ? "Explorer EveDev Ops" : "Explore EveDev Ops",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 14 })
										]
									})
								]
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "site-chrome__tools",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageControl, {
							locale,
							inverted: isDark && (isHome ? !scrolled : true)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LocaleLink, {
							to: "/contact",
							className: "site-chrome__cta",
							children: [
								fr ? "Démarrer un projet" : "Start a project",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 15 })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "site-chrome__menu",
							type: "button",
							onClick: () => setOpen((v) => !v),
							"aria-label": open ? "Close menu" : "Open menu",
							"aria-expanded": open,
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 20 })
						})
					]
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "site-chrome__drawer",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				"aria-label": "Mobile navigation",
				className: "site-chrome__drawer-nav",
				children: navItems.map(([label, href], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LocaleLink, {
					to: href,
					className: "site-chrome__drawer-link",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["0", index + 1] }), localizeNavigation(label, locale)]
				}, href))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "site-chrome__drawer-foot",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageControl, { locale }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LocaleLink, {
					to: "/contact",
					className: "site-chrome__cta",
					children: [
						fr ? "Démarrer un projet" : "Start a project",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 15 })
					]
				})]
			})]
		})]
	});
}
function SiteFooter() {
	const fr = useLocale() === "fr";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "site-footer",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "site-footer__top",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "site-footer__brand",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EveOpsBrandLockup, { footer: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: fr ? "Des services professionnels et une ingénierie numérique exigeante, réunis au sein d’un même groupe." : "Professional services and production-grade digital engineering, connected through one group." })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "site-footer__columns",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "footer-label",
								children: "eveOps"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleLink, {
								to: "/about",
								children: fr ? "À propos" : "About"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleLink, {
								to: "/contact",
								children: "Contact"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleLink, {
								to: "/insights",
								children: fr ? "Réflexions" : "Insights"
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "footer-label footer-label--unity",
								children: "Unity Integrated Solutions"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleLink, {
								to: "/unity/services",
								children: fr ? "Services professionnels" : "Professional services"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleLink, {
								to: "/unity/ai-data",
								children: "AI data"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleLink, {
								to: "/unity/procurement",
								children: fr ? "Soutien aux achats" : "Procurement support"
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "footer-label footer-label--edevops",
								children: "EveDev Ops"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleLink, {
								to: "/edevops/web-development",
								children: fr ? "Développement web" : "Web development"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleLink, {
								to: "/edevops/ai-development",
								children: fr ? "Développement IA" : "AI development"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleLink, {
								to: "/products",
								children: fr ? "Produits" : "Products"
							})
						] })
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "site-footer__bottom",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" eveOps Group"
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleLink, {
					to: "/privacy",
					children: fr ? "Confidentialité" : "Privacy"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleLink, {
					to: "/terms",
					children: fr ? "Conditions" : "Terms"
				})] })]
			})]
		})
	});
}
var unityNav = [
	["Services", "/unity/services"],
	["Language", "/unity/translation"],
	["AI Data", "/unity/ai-data"],
	["Research & Data", "/unity/research-data"],
	["Procurement", "/unity/procurement"],
	["Workforce", "/unity/virtual-workforce"]
];
function DivisionRouteBar({ current }) {
	const locale = useLocale();
	const other = current === "unity" ? {
		label: locale === "fr" ? "Explorer EveDev Ops" : "Explore EveDev Ops",
		href: "/edevops",
		note: locale === "fr" ? "Logiciels et technologie" : "Software & technology"
	} : {
		label: locale === "fr" ? "Explorer Unity" : "Explore Unity",
		href: "/unity",
		note: locale === "fr" ? "Services intégrés" : "Integrated services"
	};
	const currentLabel = current === "unity" ? "Unity Integrated Solutions" : "EveDev Ops";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: `division-route-bar division-route-bar--${current}`,
		"aria-label": "Division and group navigation",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container division-route-bar__inner",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "division-route-bar__current",
				children: [
					locale === "fr" ? "Vous êtes dans" : "You are in",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: currentLabel })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "division-route-bar__links",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LocaleLink, {
					to: other.href,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: other.label }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: other.note }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
							size: 14,
							"aria-hidden": "true"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LocaleLink, {
					to: "/",
					className: "division-route-bar__home",
					children: [
						locale === "fr" ? "Accueil eveOps Group" : "eveOps Group home",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {
							size: 14,
							"aria-hidden": "true"
						})
					]
				})]
			})]
		})
	});
}
function UnityHeader() {
	const pathname = usePathname();
	const locale = useLocale();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setOpen(false), [pathname]);
	(0, import_react.useEffect)(() => {
		const onScroll = () => setScrolled(window.scrollY > 12);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: `unity-chrome ${scrolled ? "unity-chrome--solid" : ""} ${open ? "is-open" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "unity-chrome__topline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: locale === "fr" ? "Services professionnels coordonnés" : "Coordinated professional services" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: locale === "fr" ? "Parcours de livraison internationaux" : "Global delivery routes" })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container unity-chrome__bar",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LocaleLink, {
						to: "/unity",
						className: "unity-lockup",
						"aria-label": "Unity Integrated Solutions home",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: assets.unityMark,
							alt: "",
							className: "unity-lockup__mark"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "unity-lockup__text",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "UNITY" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Integrated Solutions" })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "unity-chrome__nav",
						"aria-label": "Unity Integrated Solutions navigation",
						children: unityNav.map(([label, href]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleLink, {
							to: href,
							className: pathname === href ? "is-active" : "",
							children: localizeNavigation(label, locale)
						}, href))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "unity-chrome__tools",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageControl, { locale }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LocaleLink, {
								to: "/unity/contact",
								className: "unity-chrome__cta",
								children: [
									locale === "fr" ? "Demander un service" : "Request a service",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 15 })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "unity-chrome__menu",
								type: "button",
								onClick: () => setOpen((v) => !v),
								"aria-label": open ? "Close Unity navigation" : "Open Unity navigation",
								"aria-expanded": open,
								children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 20 })
							})
						]
					})
				]
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "unity-chrome__drawer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					"aria-label": "Unity mobile navigation",
					children: unityNav.map(([label, href], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LocaleLink, {
						to: href,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["0", index + 1] }), localizeNavigation(label, locale)]
					}, href))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "unity-chrome__drawer-foot",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageControl, { locale }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LocaleLink, {
						to: "/unity/contact",
						className: "unity-chrome__cta",
						children: [
							locale === "fr" ? "Demander un service" : "Request a service",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 15 })
						]
					})]
				})]
			})
		]
	});
}
function UnityFooter() {
	const fr = useLocale() === "fr";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "unity-footer",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "unity-footer__main",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LocaleLink, {
					to: "/unity",
					className: "unity-lockup unity-lockup--footer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: assets.unityMark,
						alt: "",
						className: "unity-lockup__mark"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "unity-lockup__text",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "UNITY" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Integrated Solutions" })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: fr ? "Des services professionnels et un soutien coordonné aux équipes pour un travail qui exige une livraison réfléchie." : "Professional services and coordinated workforce support for work that needs thoughtful delivery." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "unity-footer__links",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fr ? "Services" : "Services" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleLink, {
							to: "/unity/translation",
							children: fr ? "Langues" : "Language"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleLink, {
							to: "/unity/ai-data",
							children: "AI data"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleLink, {
							to: "/unity/research-data",
							children: fr ? "Recherche et données" : "Research & data"
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fr ? "Capacités" : "Capabilities" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleLink, {
							to: "/unity/procurement",
							children: fr ? "Achats" : "Procurement"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleLink, {
							to: "/unity/virtual-workforce",
							children: fr ? "Équipes" : "Workforce"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleLink, {
							to: "/unity/contact",
							children: "Contact"
						})
					] })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "unity-footer__bottom",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Unity Integrated Solutions"
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleLink, {
					to: "/privacy",
					children: fr ? "Confidentialité" : "Privacy"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleLink, {
					to: "/terms",
					children: fr ? "Conditions" : "Terms"
				})] })]
			})]
		})
	});
}
function AppShell({ children }) {
	const pathname = usePathname();
	const isEveDev = pathname.startsWith("/edevops");
	const locale = useLocale();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "app-shell",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main-content",
				className: "skip-link",
				children: locale === "fr" ? "Aller au contenu" : "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			isEveDev && shouldShowDivisionRouteBar("edevops") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DivisionRouteBar, { current: "edevops" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "main-content",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageMotion, {
					theme: themeFromPath(pathname),
					children
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
function UnityShell({ children }) {
	const pathname = usePathname();
	const locale = useLocale();
	const route = unityNav.find(([, href]) => pathname === href)?.[0] ?? (pathname === "/unity" ? "Unity" : "Services");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "unity-shell",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main-content",
				className: "skip-link",
				children: locale === "fr" ? "Aller au contenu" : "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnityHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DivisionRouteBar, { current: "unity" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "unity-location-cue",
				"aria-label": locale === "fr" ? "Position actuelle dans Unity" : "Current Unity location",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: locale === "fr" ? "Vous êtes ici" : "You are at" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Unity Integrated Solutions" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { "aria-hidden": "true" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: localizeNavigation(route, locale) })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "main-content",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageMotion, {
					theme: "unity",
					children
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnityFooter, {})
		]
	});
}
var styles_default = "/assets/styles-D66aFgvW.css";
var APP_NAME = "eveOps Group";
function RoutedShell() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const search = useRouterState({ select: (s) => s.location.searchStr });
	const locale = getPublicLocale(search);
	const Shell = pathname.startsWith("/unity") ? UnityShell : AppShell;
	(0, import_react.useEffect)(() => {
		document.documentElement.lang = locale;
	}, [locale]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouteLoader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })] });
}
var Route$17 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#07111F"
			},
			{
				name: "description",
				content: "eveOps Group connects professional global workforce solutions with software engineering, AI, and digital product development."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Manrope:wght@400;500;600;700;800&family=Source+Serif+4:opsz,wght@8..60,500;8..60,600&display=swap"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoutedShell, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "top-right",
				richColors: true
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$16 = () => import("./routes-D1baZ4P5.mjs");
var Route$16 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("../_-Dk1Vp_gb.mjs");
var Route$15 = createFileRoute("/$")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./about-DtbaxtnO.mjs");
var Route$14 = createFileRoute("/about")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./contact-BtYx0OVf.mjs");
var Route$13 = createFileRoute("/contact")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./insights-DjDpGEaE.mjs");
var Route$12 = createFileRoute("/insights")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./portfolio-Ct2ykaTX.mjs");
var Route$11 = createFileRoute("/portfolio")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./privacy-BhkK9V5i.mjs");
var Route$10 = createFileRoute("/privacy")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./terms-Cp6acvKT.mjs");
var Route$9 = createFileRoute("/terms")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./edevops-5VQrYIok.mjs");
var Route$8 = createFileRoute("/edevops/")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("../_slug-kYX1eRCs.mjs");
var Route$7 = createFileRoute("/edevops/$slug")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./services-Bcexurxq.mjs");
var Route$6 = createFileRoute("/edevops/services")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./products-ePKVVtCI.mjs");
var Route$5 = createFileRoute("/products/")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./shweng-BR2wSH5b.mjs");
var Route$4 = createFileRoute("/products/shweng")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./unity-BwOsEMnj.mjs");
var Route$3 = createFileRoute("/unity/")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("../_slug-zg5MV8cH.mjs");
var Route$2 = createFileRoute("/unity/$slug")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./contact-327IluRd.mjs");
var Route$1 = createFileRoute("/unity/contact")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./services-C9_2qMd2.mjs");
var Route = createFileRoute("/unity/services")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$16.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$17
});
var SplatRoute = Route$15.update({
	id: "/$",
	path: "/$",
	getParentRoute: () => Route$17
});
var AboutRoute = Route$14.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$17
});
var ContactRoute = Route$13.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$17
});
var InsightsRoute = Route$12.update({
	id: "/insights",
	path: "/insights",
	getParentRoute: () => Route$17
});
var PortfolioRoute = Route$11.update({
	id: "/portfolio",
	path: "/portfolio",
	getParentRoute: () => Route$17
});
var PrivacyRoute = Route$10.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$17
});
var TermsRoute = Route$9.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$17
});
var EdevopsIndexRoute = Route$8.update({
	id: "/edevops/",
	path: "/edevops/",
	getParentRoute: () => Route$17
});
var EdevopsSlugRoute = Route$7.update({
	id: "/edevops/$slug",
	path: "/edevops/$slug",
	getParentRoute: () => Route$17
});
var EdevopsServicesRoute = Route$6.update({
	id: "/edevops/services",
	path: "/edevops/services",
	getParentRoute: () => Route$17
});
var ProductsIndexRoute = Route$5.update({
	id: "/products/",
	path: "/products/",
	getParentRoute: () => Route$17
});
var ProductsShwengRoute = Route$4.update({
	id: "/products/shweng",
	path: "/products/shweng",
	getParentRoute: () => Route$17
});
var UnityIndexRoute = Route$3.update({
	id: "/unity/",
	path: "/unity/",
	getParentRoute: () => Route$17
});
var rootRouteChildren = {
	IndexRoute,
	SplatRoute,
	AboutRoute,
	ContactRoute,
	InsightsRoute,
	PortfolioRoute,
	PrivacyRoute,
	TermsRoute,
	EdevopsSlugRoute,
	EdevopsServicesRoute,
	ProductsShwengRoute,
	UnitySlugRoute: Route$2.update({
		id: "/unity/$slug",
		path: "/unity/$slug",
		getParentRoute: () => Route$17
	}),
	UnityContactRoute: Route$1.update({
		id: "/unity/contact",
		path: "/unity/contact",
		getParentRoute: () => Route$17
	}),
	UnityServicesRoute: Route.update({
		id: "/unity/services",
		path: "/unity/services",
		getParentRoute: () => Route$17
	}),
	EdevopsIndexRoute,
	ProductsIndexRoute,
	UnityIndexRoute
};
var routeTree = Route$17._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		scrollRestoration: true
	});
}
//#endregion
export { products as _, getContactRoutePresentation as a, divisions as c, getCapabilityBriefTemplate as d, getCapabilityBriefTemplateFilename as f, getServicePathContext as g, getServiceDisplay as h, DivisionLoadMark as i, edevopsTech as l, getServiceCapabilityBriefs as m, Route$2 as n, getDivisionHeroHeadline as o, getServiceCapabilityBriefHref as p, Route$7 as r, assets as s, router_exports as t, findService as u };
