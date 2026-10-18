import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { r as Route$7 } from "./_ssr/router-DwJ3Use9.mjs";
import { t as ServiceDetailPage } from "./_ssr/ServiceDetailPage-CzgDwB8d.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-kYX1eRCs.js
var import_jsx_runtime = require_jsx_runtime();
function ServiceDetail() {
	const { slug } = Route$7.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceDetailPage, {
		division: "edevops",
		slug
	});
}
//#endregion
export { ServiceDetail as component };
