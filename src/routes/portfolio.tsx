import { createFileRoute } from "@tanstack/react-router";
import PortfolioPage from "@/pages/PortfolioPage";

export const Route = createFileRoute("/portfolio")({ component: PortfolioPage });
