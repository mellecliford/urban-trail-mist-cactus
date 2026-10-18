import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as useLocale, t as LocaleLink } from "./LocaleLink-D3SyrwIH.mjs";
import { C as ChevronDown, D as ArrowUpRight, O as ArrowRight, S as CircleCheck, a as Sparkles, c as Send, d as MessageCircle, g as FileText, r as UsersRound, t as X, u as Network } from "../_libs/lucide-react.mjs";
import { a as DialogOverlay, c as DialogTrigger, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as divisions, s as assets } from "./router-DwJ3Use9.mjs";
import { a as SectionHeading, i as Eyebrow, s as useDocumentMeta, t as ArrowLink } from "./useDocumentMeta-Dz_-QrJz.mjs";
import { t as saveLead } from "./leads-DWx-u2wJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D1baZ4P5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CompanyProfileDownload() {
	const fr = useLocale() === "fr";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "company-profile-download",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container company-profile-download__grid",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "company-profile-download__signal",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { size: 26 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PDF" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "company-profile-download__copy",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: fr ? "Profil du groupe" : "Group profile"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: fr ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Un aperçu clair d’", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "eveOps Group." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["A concise view of ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "eveOps Group." })] }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: fr ? "Demandez le profil du groupe pour présenter Unity Integrated Solutions et EveDev Ops à vos équipes internes." : "Request the group profile to brief internal teams on Unity Integrated Solutions and EveDev Ops." })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "company-profile-download__action",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleLink, {
						to: "/contact",
						className: "company-profile-download__button",
						children: fr ? "Demander le profil" : "Request the profile"
					})
				})
			]
		})
	});
}
function clamp(n, min, max) {
	return Math.max(min, Math.min(max, n));
}
function polygonPath(ctx, sides, radius, time, vel) {
	ctx.beginPath();
	for (let i = 0; i < sides; i++) {
		const a = i / sides * Math.PI * 2;
		const r = radius * (1 + Math.sin(time * 3 + i * 1.7) * .18 * vel);
		const px = Math.cos(a) * r;
		const py = Math.sin(a) * r;
		if (i === 0) ctx.moveTo(px, py);
		else ctx.lineTo(px, py);
	}
	ctx.closePath();
}
function strokePrism(ctx, x, y, sides, radius, rotation, time, vel, lineWidth, hue, alpha, chromatic) {
	ctx.save();
	ctx.translate(x, y);
	ctx.rotate(rotation);
	ctx.globalCompositeOperation = "lighter";
	if (chromatic) {
		ctx.save();
		ctx.translate(-1.2, 0);
		polygonPath(ctx, sides, radius, time, vel);
		ctx.strokeStyle = `hsla(${hue + 18}, 92%, 68%, ${alpha * .4})`;
		ctx.lineWidth = Math.max(.6, lineWidth * .75);
		ctx.stroke();
		ctx.restore();
	}
	polygonPath(ctx, sides, radius, time, vel);
	ctx.fillStyle = `hsla(${hue}, 80%, 58%, ${alpha * .035})`;
	ctx.fill();
	ctx.strokeStyle = `hsla(${hue}, 90%, 72%, ${alpha})`;
	ctx.lineWidth = lineWidth;
	ctx.stroke();
	ctx.restore();
}
function PrismaCanvas() {
	const containerRef = (0, import_react.useRef)(null);
	const canvasRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		const container = containerRef.current;
		if (!canvas || !container) return;
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const finePointer = window.matchMedia("(pointer: fine)").matches;
		const mobile = window.matchMedia("(max-width: 760px)").matches;
		const ctx = canvas.getContext("2d", {
			alpha: false,
			desynchronized: true
		});
		if (!ctx) return;
		let raf = 0;
		let paused = false;
		let w = 1;
		let h = 1;
		let dpr = 1;
		const frameMs = 1e3 / (mobile ? 24 : 36);
		let lastPaint = 0;
		const mouse = {
			x: 0,
			y: 0,
			tx: 0,
			ty: 0,
			vx: 0,
			vy: 0,
			lastX: 0,
			lastY: 0,
			lastT: 0,
			hasPointer: false
		};
		const bursts = [];
		const trail = [];
		const trailMax = mobile ? 2 : 4;
		const t0 = performance.now();
		const resize = () => {
			const rect = container.getBoundingClientRect();
			w = Math.max(1, Math.floor(rect.width));
			h = Math.max(1, Math.floor(rect.height));
			dpr = mobile ? 1 : Math.min(1.25, window.devicePixelRatio || 1);
			canvas.width = Math.floor(w * dpr);
			canvas.height = Math.floor(h * dpr);
			canvas.style.width = `${w}px`;
			canvas.style.height = `${h}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			if (!mouse.hasPointer) {
				mouse.x = mouse.tx = mouse.lastX = w * .68;
				mouse.y = mouse.ty = mouse.lastY = h * .48;
				mouse.lastT = performance.now();
			}
		};
		const paintFrame = (time, intro) => {
			ctx.fillStyle = "#07111f";
			ctx.fillRect(0, 0, w, h);
			const speedMag = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);
			const vel = clamp(speedMag / 1500, 0, 1);
			const sides = clamp(4 + Math.round(clamp(mouse.vx / 700 + mouse.vy / 700, -4, 4) * vel), 3, 12);
			const radius = (28 + speedMag * .016) * intro;
			const hue = 188 + time * 18 % 42;
			const rotation = time * .85 + vel * .35;
			if (!mobile && time > .45) {
				const ambientX = w * .72;
				const ambientY = h * .46;
				strokePrism(ctx, ambientX, ambientY, 6, Math.min(160, w * .12) * intro, time * .12, time, .08, 1, 200, .1 * intro, false);
			}
			if (mouse.hasPointer && !mobile) {
				trail.push({
					x: mouse.x,
					y: mouse.y,
					sides,
					r: radius,
					hue
				});
				if (trail.length > trailMax) trail.shift();
				for (let i = 0; i < trail.length; i++) {
					const p = trail[i];
					const t = (i + 1) / trail.length;
					strokePrism(ctx, p.x, p.y, p.sides, p.r * (.75 + t * .25), rotation - (1 - t) * .4, time, vel, 1, p.hue, .1 * t * intro, false);
				}
			}
			strokePrism(ctx, mouse.x, mouse.y, sides, radius, rotation, time, vel, 2, hue, .92 * intro, !mobile && vel > .18);
			for (let i = bursts.length - 1; i >= 0; i--) {
				const b = bursts[i];
				b.r += 3.4;
				b.life -= .028;
				if (b.life <= 0) {
					bursts.splice(i, 1);
					continue;
				}
				strokePrism(ctx, b.x, b.y, b.sides, b.r, time * .6, time, .4, 1.15, b.hue, b.life * .5 * intro, false);
			}
		};
		resize();
		paintFrame(.04, .22);
		container.classList.add("is-live");
		const ro = new ResizeObserver(resize);
		ro.observe(container);
		const onMove = (e) => {
			const rect = container.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			const now = performance.now();
			const dt = Math.max(8, now - (mouse.lastT || now));
			mouse.tx = x;
			mouse.ty = y;
			mouse.vx = clamp((x - mouse.lastX) / dt * 1e3, -2500, 2500);
			mouse.vy = clamp((y - mouse.lastY) / dt * 1e3, -2500, 2500);
			mouse.lastX = x;
			mouse.lastY = y;
			mouse.lastT = now;
			mouse.hasPointer = true;
		};
		const onLeave = () => {
			mouse.hasPointer = false;
			mouse.vx *= .4;
			mouse.vy *= .4;
		};
		const onDown = (e) => {
			const rect = container.getBoundingClientRect();
			bursts.push({
				x: e.clientX - rect.left,
				y: e.clientY - rect.top,
				r: 16,
				life: 1,
				sides: 4 + Math.floor(Math.random() * 4),
				hue: 198 + Math.random() * 28
			});
		};
		if (finePointer) {
			container.addEventListener("pointermove", onMove, { passive: true });
			container.addEventListener("pointerleave", onLeave, { passive: true });
		}
		container.addEventListener("pointerdown", onDown, { passive: true });
		const io = new IntersectionObserver((entries) => {
			paused = !entries[0]?.isIntersecting;
		}, { threshold: .02 });
		io.observe(container);
		const onVisibility = () => {
			paused = document.hidden;
		};
		document.addEventListener("visibilitychange", onVisibility);
		if (reduced) return () => {
			ro.disconnect();
			io.disconnect();
			document.removeEventListener("visibilitychange", onVisibility);
			container.removeEventListener("pointermove", onMove);
			container.removeEventListener("pointerleave", onLeave);
			container.removeEventListener("pointerdown", onDown);
		};
		const loop = (now) => {
			raf = window.requestAnimationFrame(loop);
			if (paused) return;
			if (now - lastPaint < frameMs) return;
			lastPaint = now;
			const time = (now - t0) / 1e3;
			const intro = clamp(time / .7, .22, 1);
			mouse.vx *= .92;
			mouse.vy *= .92;
			if (!mouse.hasPointer) {
				mouse.tx = w * .7 + Math.cos(time * .35) * Math.min(140, w * .12);
				mouse.ty = h * .48 + Math.sin(time * .28) * Math.min(90, h * .1);
			}
			mouse.x += (mouse.tx - mouse.x) * .16;
			mouse.y += (mouse.ty - mouse.y) * .16;
			paintFrame(time, intro);
		};
		raf = window.requestAnimationFrame(loop);
		return () => {
			window.cancelAnimationFrame(raf);
			ro.disconnect();
			io.disconnect();
			document.removeEventListener("visibilitychange", onVisibility);
			container.removeEventListener("pointermove", onMove);
			container.removeEventListener("pointerleave", onLeave);
			container.removeEventListener("pointerdown", onDown);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: containerRef,
		className: "prisma-canvas",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "prisma-canvas__fallback" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", { ref: canvasRef })]
	});
}
function QuickContactModal({ locale }) {
	const fr = locale === "fr";
	const [open, setOpen] = (0, import_react.useState)(false);
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const [pending, setPending] = (0, import_react.useState)(false);
	const titleId = (0, import_react.useId)();
	const descId = (0, import_react.useId)();
	const label = fr ? "Parler à eveOps Group" : "Talk to eveOps Group";
	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		const data = new FormData(form);
		setPending(true);
		saveLead({
			name: String(data.get("name") || ""),
			email: String(data.get("email") || ""),
			division: "group",
			service: "Homepage quick contact",
			message: String(data.get("message") || "")
		});
		form.reset();
		setSubmitted(true);
		setPending(false);
		toast.success(fr ? "Votre message a bien été reçu." : "Your message has been received.", { description: fr ? "Il est enregistré pour suivi par l’équipe eveOps Group." : "It has been recorded for follow-up by the eveOps Group team." });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: (next) => {
			setOpen(next);
			if (next) setSubmitted(false);
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "hero-talk",
				type: "button",
				"aria-label": label,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
						size: 16,
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hero-talk__full",
						children: label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hero-talk__short",
						children: fr ? "Parlons-en" : "Talk to us"
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "qc-overlay" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "quick-contact-modal",
			"aria-describedby": descId,
			"aria-labelledby": titleId,
			onOpenAutoFocus: (event) => {
				if (window.matchMedia("(pointer: coarse)").matches) event.preventDefault();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "quick-contact-modal__handle",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
					className: "quick-contact-modal__close",
					"aria-label": fr ? "Fermer" : "Close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
				}),
				submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "quick-contact-modal__success",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "quick-contact-modal__success-icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 25 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "quick-contact-modal__eyebrow",
							children: fr ? "Message reçu" : "Message received"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							id: titleId,
							className: "quick-contact-modal__title",
							children: fr ? "Merci de nous avoir écrit." : "Thank you for getting in touch."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
							id: descId,
							className: "quick-contact-modal__copy",
							children: fr ? "Notre équipe dispose maintenant de votre message et reviendra vers vous avec la suite appropriée." : "Our team now has your message and will follow up with the appropriate next step."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
							className: "quick-contact-modal__done",
							children: fr ? "Fermer" : "Close"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "quick-contact-modal__sheet",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "quick-contact-modal__head",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "quick-contact-modal__eyebrow",
								children: fr ? "Un premier échange simple" : "A simple first conversation"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								id: titleId,
								className: "quick-contact-modal__title",
								children: fr ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Parlons de ce qui doit ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "avancer." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Let’s discuss what needs to ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "move forward." })] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
								id: descId,
								className: "quick-contact-modal__copy",
								children: fr ? "Donnez-nous juste l’essentiel. Nous vous orienterons vers Unity, EveDev Ops, ou la bonne combinaison." : "Share only the essentials. We will route you to Unity, EveDev Ops, or the right combination."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "quick-contact-modal__form",
						onSubmit: handleSubmit,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "quick-contact-modal__fields",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
									fr ? "Nom" : "Name",
									" *",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										name: "name",
										autoComplete: "name",
										placeholder: fr ? "Votre nom" : "Your name"
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["E-mail *", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									required: true,
									type: "email",
									name: "email",
									autoComplete: "email",
									placeholder: "name@company.com"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [
									fr ? "Comment pouvons-nous vous aider ?" : "How can we help?",
									" *",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										required: true,
										name: "message",
										rows: 3,
										minLength: 10,
										placeholder: fr ? "Le besoin, l’objectif ou la question à traiter." : "The need, outcome, or question you would like to address."
									})
								] })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "quick-contact-modal__form-footer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: fr ? "Utilisé uniquement pour répondre à votre demande." : "Used only to respond to this enquiry." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "button button--solid",
								type: "submit",
								disabled: pending,
								children: [
									pending ? fr ? "Envoi…" : "Sending…" : fr ? "Envoyer" : "Send message",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { size: 16 })
								]
							})]
						})]
					})]
				})
			]
		})] })]
	});
}
function HomeHero({ locale }) {
	const fr = locale === "fr";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "prisma-hero",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrismaCanvas, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "prisma-hero__veil" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container prisma-hero__content",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "prisma-hero__intro",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "prisma-hero__stagger",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: fr ? "Des capacités indépendantes conçues pour travailler ensemble" : "Independent capabilities, designed to work together" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "prisma-hero__stagger prisma-hero__stagger--2",
								children: fr ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									"Un groupe.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Deux façons" }),
									" de construire la suite."
								] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									"One group.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Two ways" }),
									" to build what’s next."
								] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "prisma-hero__stagger prisma-hero__stagger--3",
								children: fr ? "eveOps Group relie des solutions professionnelles de main-d’œuvre internationale à l’ingénierie logicielle, l’IA et la création de produits numériques." : "eveOps Group connects professional global workforce solutions with software engineering, AI, and digital product development."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "prisma-hero__dock prisma-hero__stagger prisma-hero__stagger--4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickContactModal, { locale }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "prisma-hero__hint",
									children: fr ? "Le prisme suit le curseur." : "The prism follows the cursor."
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "prisma-hero__anchor",
						"aria-hidden": "true",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "01" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "02" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						className: "prisma-hero__scroll",
						href: "#divisions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fr ? "Explorer les divisions" : "Explore divisions" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 16 })]
					})
				]
			})
		]
	});
}
function Home() {
	const locale = useLocale();
	const fr = locale === "fr";
	useDocumentMeta(fr ? "eveOps Group | Services professionnels, logiciels et solutions IA" : "eveOps Group | Professional Services, Software & AI Solutions", fr ? "eveOps Group combine solutions de main-d’œuvre, services de données IA, achats et ingénierie logicielle par l’intermédiaire de Unity Integrated Solutions et EveDev Ops." : "eveOps Group combines professional workforce solutions, AI data services, procurement support, and software engineering through Unity Integrated Solutions and EveDev Ops.");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeHero, { locale }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			id: "divisions",
			className: "division-gateway",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "division-gateway__heading container",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: fr ? "Choisissez votre parcours" : "Choose your route" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: fr ? "Deux modèles opérationnels distincts. Une même organisation, conçue pour les entreprises qui ont besoin d’expertise humaine, de systèmes conçus sur mesure, ou des deux." : "Two distinct operating models. One parent company built for organizations that need human expertise, engineered systems, or both." })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "division-gateway__cards",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LocaleLink, {
					to: "/unity",
					className: "division-panel division-panel--unity",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "division-panel__image",
							style: { backgroundImage: `url(${assets.unity})` }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "division-panel__shade" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "division-panel__content",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "division-panel__index",
									children: fr ? "01 — Équipes et opérations" : "01 — People & operations"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
									"Unity",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Integrated Solutions" })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: fr ? "Services professionnels coordonnés" : divisions.unity.eyebrow }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "division-panel__keywords",
									children: fr ? "Traduction · données IA · recherche · annotation · achats · équipes" : "Translation · AI data · research · annotation · procurement · workforce"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "division-panel__cta",
									children: [
										fr ? "Explorer Unity" : "Explore Unity",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 18 })
									]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LocaleLink, {
					to: "/edevops",
					className: "division-panel division-panel--edevops",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "division-panel__image",
							style: { backgroundImage: `url(${assets.edevops})` }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "division-panel__shade" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "division-panel__content",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "division-panel__index",
									children: fr ? "02 — Systèmes et produits" : "02 — Systems & products"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
									"EveDev",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Ops" })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: fr ? "Ingénierie logicielle · IA · produits numériques" : divisions.edevops.eyebrow }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "division-panel__keywords",
									children: fr ? "Logiciel · IA · SaaS · mobile · automatisation · cloud · DevOps" : "Software · AI · SaaS · mobile · automation · cloud · DevOps"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "division-panel__cta",
									children: [
										fr ? "Explorer EveDev Ops" : "Explore EveDev Ops",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 18 })
									]
								})
							]
						})
					]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "parent-intro section-pad",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container parent-intro__grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "parent-intro__rail",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Group" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
						eyebrow: fr ? "Qu’est-ce qu’eveOps Group ?" : "What is eveOps Group?",
						title: fr ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Un partenaire opérationnel pour ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "un travail exigeant." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["An operating partner for ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "serious work." })] }),
						description: fr ? "eveOps Group est un groupe pluridisciplinaire qui réunit expertise professionnelle, ingénierie logicielle et innovation numérique. Notre structure par division facilite l’accès à la bonne capacité pour le bon enjeu opérationnel." : "eveOps Group is a multidisciplinary group combining professional human expertise with software engineering and digital innovation. Our division structure makes it easier to bring the right capability to the right operating problem."
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "parent-intro__capabilities",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "parent-intro__icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, { size: 21 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "parent-intro__type",
								children: fr ? "Services professionnels" : "Professional services"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: fr ? "Une expertise humaine structurée pour la livraison." : "Human expertise, structured for delivery." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: fr ? "Unity Integrated Solutions propose un soutien professionnel pour les données IA, les services linguistiques, la recherche, la transcription, les achats et les opérations métiers." : "Unity Integrated Solutions provides professional workforce support across AI data, language services, research, transcription, procurement, and business operations." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLink, {
								href: "/unity",
								children: fr ? "Explorer Unity Integrated Solutions" : "Explore Unity Integrated Solutions"
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "parent-intro__icon parent-intro__icon--tech",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Network, { size: 21 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "parent-intro__type",
								children: fr ? "Technologie et logiciel" : "Technology & software"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: fr ? "Des systèmes numériques conçus pour faire avancer le travail." : "Digital systems designed to move the work forward." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: fr ? "EveDev Ops conçoit et construit des sites web, applications mobiles, plateformes SaaS, API, systèmes d’IA, solutions d’automatisation, infrastructures cloud et produits numériques." : "EveDev Ops designs and builds websites, mobile applications, SaaS platforms, APIs, AI systems, automation solutions, cloud infrastructure, and digital products." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLink, {
								href: "/edevops",
								children: fr ? "Explorer EveDev Ops" : "Explore EveDev Ops"
							})
						] })]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "connection-band",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container connection-band__grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "connection-band__marker",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 22 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fr ? "Au point de rencontre" : "At the seam" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "connection-band__large",
						children: fr ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"Les meilleures solutions ont souvent besoin d’une équipe compétente ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "et" }),
							" d’un système capable."
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"The best solutions often need both a capable team ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "and" }),
							" a capable system."
						] })
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: fr ? "La structure du groupe ouvre un parcours clair vers chaque division tout en laissant les services professionnels et la technologie se soutenir lorsque le projet l’exige." : "Our group structure creates a clear route into each division while leaving room for professional services and technology work to support one another when a project calls for it." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLink, {
						href: "/about",
						dark: true,
						children: fr ? "Comment EveOps est organisé" : "How EveOps is organized"
					})] })
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompanyProfileDownload, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "section-pad parent-products",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container parent-products__grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: fr ? "Produits par EveOps" : "Products by EveOps" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: fr ? "Conçus pour le marché, pas seulement pour un brief client." : "Built for the market, not just a client brief." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "product-preview",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "product-preview__status",
								children: fr ? "En développement" : "In development"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "product-preview__name",
								children: "Shweng"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: fr ? "Une infrastructure d’échange inter-réseaux actuellement développée par EveDev Ops." : "Cross-network exchange infrastructure currently being developed by EveDev Ops." })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleLink, {
							to: "/products/shweng",
							className: "round-arrow",
							"aria-label": "View Shweng",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 20 })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "parent-products__link",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LocaleLink, {
							to: "/products",
							children: [
								fr ? "Voir les produits" : "View products",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 16 })
							]
						})
					})
				]
			})
		})
	] });
}
var SplitComponent = Home;
//#endregion
export { SplitComponent as component };
