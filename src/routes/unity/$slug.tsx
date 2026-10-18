import { createFileRoute } from "@tanstack/react-router";
import ServiceDetailPage from "@/pages/ServiceDetailPage";

export const Route = createFileRoute("/unity/$slug")({
  component: ServiceDetail,
});

function ServiceDetail() {
  const { slug } = Route.useParams();
  return <ServiceDetailPage division="unity" slug={slug} />;
}
