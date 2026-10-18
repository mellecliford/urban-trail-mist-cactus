import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { n as Route$2 } from "./_ssr/router-DwJ3Use9.mjs";
import { t as ServiceDetailPage } from "./_ssr/ServiceDetailPage-CzgDwB8d.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-zg5MV8cH.js
var import_jsx_runtime = require_jsx_runtime();
function ServiceDetail() {
	const { slug } = Route$2.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceDetailPage, {
		division: "unity",
		slug
	});
}
//#endregion
export { ServiceDetail as component };
