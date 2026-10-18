import { createFileRoute } from "@tanstack/react-router";
import LegalPage from "@/pages/LegalPage";

export const Route = createFileRoute("/privacy")({
  component: () => <LegalPage type="privacy" />,
});
