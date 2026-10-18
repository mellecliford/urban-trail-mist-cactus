import { createFileRoute } from "@tanstack/react-router";
import ServiceDetailPage from "@/pages/ServiceDetailPage";

export const Route = createFileRoute("/edevops/$slug")({
  component: ServiceDetail,
});

function ServiceDetail() {
  const { slug } = Route.useParams();
  return <ServiceDetailPage division="edevops" slug={slug} />;
}
