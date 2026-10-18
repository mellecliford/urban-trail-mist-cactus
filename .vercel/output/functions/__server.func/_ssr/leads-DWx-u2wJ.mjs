//#region node_modules/.nitro/vite/services/ssr/assets/leads-DWx-u2wJ.js
var KEY = "eveops-leads";
function saveLead(lead) {
	if (typeof window === "undefined") return;
	const next = {
		...lead,
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	try {
		const prev = JSON.parse(localStorage.getItem(KEY) || "[]");
		localStorage.setItem(KEY, JSON.stringify([next, ...prev].slice(0, 50)));
	} catch {}
}
//#endregion
export { saveLead as t };
