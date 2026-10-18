import { createFileRoute } from "@tanstack/react-router";
import StudioPage from "@/pages/StudioPage";

export const Route = createFileRoute("/admin/")({
  headers: () => ({
    "X-Frame-Options": "DENY",
    "Cache-Control": "no-store",
  }),
  component: StudioPage,
});
