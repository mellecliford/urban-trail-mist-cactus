import { createFileRoute } from "@tanstack/react-router";
import CustomersPage from "@/pages/CustomersPage";

export const Route = createFileRoute("/admin/customers")({
  component: CustomersPage,
});
