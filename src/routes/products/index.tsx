import { createFileRoute } from "@tanstack/react-router";
import ProductsPage from "@/pages/ProductsPage";
import { listPublishedShowcase } from "@/lib/showcase.functions";

export const Route = createFileRoute("/products/")({
  loader: () => listPublishedShowcase(),
  component: function ProductsRoute() {
    return <ProductsPage items={Route.useLoaderData()} />;
  },
});
