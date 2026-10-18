import { createFileRoute } from "@tanstack/react-router";
import ContactPage from "@/pages/ContactPage";

export const Route = createFileRoute("/unity/contact")({
  component: () => <ContactPage scope="unity" />,
});
