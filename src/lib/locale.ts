import { useRouterState } from "@tanstack/react-router";
import { getPublicLocale, type PublicLocale } from "./publicLocale";

export function useLocale(): PublicLocale {
  const search = useRouterState({ select: (s) => s.location.searchStr });
  return getPublicLocale(search);
}

export function usePathname() {
  return useRouterState({ select: (s) => s.location.pathname });
}

export function useLocationSearch() {
  return useRouterState({ select: (s) => s.location.searchStr });
}
