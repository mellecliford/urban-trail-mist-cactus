import { createFileRoute } from "@tanstack/react-router";
import DivisionPage from "@/pages/DivisionPage";

export const Route = createFileRoute("/edevops/services")({
  component: () => <DivisionPage division="edevops" />,
});
