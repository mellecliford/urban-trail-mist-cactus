import { createFileRoute } from "@tanstack/react-router";
import ShowcaseDetailPage from "@/pages/ShowcaseDetailPage";
import { getPublishedShowcase } from "@/lib/showcase.functions";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => getPublishedShowcase({ data: params.slug }),
  component: function ShowcaseRoute() {
    return <ShowcaseDetailPage item={Route.useLoaderData()} />;
  },
});
