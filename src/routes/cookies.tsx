import { createFileRoute } from "@tanstack/react-router";
import LegalPage from "@/pages/LegalPage";

export const Route = createFileRoute("/cookies")({
  component: () => <LegalPage type="cookies" />,
});
