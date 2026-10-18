import { createFileRoute } from "@tanstack/react-router";
import DivisionPage from "@/pages/DivisionPage";

export const Route = createFileRoute("/unity/")({
  component: () => <DivisionPage division="unity" />,
});
