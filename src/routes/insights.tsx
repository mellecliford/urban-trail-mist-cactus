import { createFileRoute } from "@tanstack/react-router";
import InsightsPage from "@/pages/InsightsPage";
import { listDesk } from "@/lib/desk.functions";

export const Route = createFileRoute("/insights")({
  loader: ({ location }) => {
    const q = new URLSearchParams(location.searchStr).get("q") || "";
    return listDesk({ data: { q } });
  },
  component: function InsightsRoute() {
    return <InsightsPage initial={Route.useLoaderData()} />;
  },
});


