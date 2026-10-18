import { createFileRoute } from "@tanstack/react-router";
import DeskThreadPage from "@/pages/DeskThreadPage";
import { getDeskThread } from "@/lib/desk.functions";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => getDeskThread({ data: params.slug }),
  component: function ThreadRoute() {
    return <DeskThreadPage initial={Route.useLoaderData()} />;
  },
});
