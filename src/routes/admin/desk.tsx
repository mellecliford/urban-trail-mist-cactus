import { createFileRoute } from "@tanstack/react-router";
import DeskAdminPage from "@/pages/DeskAdminPage";

export const Route = createFileRoute("/admin/desk")({
  headers: () => ({
    "X-Frame-Options": "DENY",
    "Cache-Control": "no-store",
  }),
  component: DeskAdminPage,
});
