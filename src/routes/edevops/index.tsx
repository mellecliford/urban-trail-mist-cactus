import { createFileRoute } from "@tanstack/react-router";
import DivisionPage from "@/pages/DivisionPage";

export const Route = createFileRoute("/edevops/")({
  component: () => <DivisionPage division="edevops" />,
});
