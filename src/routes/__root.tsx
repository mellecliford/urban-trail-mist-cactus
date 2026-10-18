import { createRootRoute, HeadContent, Outlet, Scripts, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { AppShell, UnityShell } from "@/components/SiteShell";
import { CookieNotice } from "@/components/CookieNotice";
import { Toaster } from "sonner";
import { getPublicLocale } from "@/lib/publicLocale";
import { absoluteUrl, OG_IMAGE, resolveSeo, structuredData } from "@/lib/seo";
import { assets } from "@/content/site";
import appCss from "../styles.css?url";

const APP_NAME = "eveOps Group";

function RoutedShell() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const search = useRouterState({ select: (s) => s.location.searchStr });
  const locale = getPublicLocale(search);
  const studio = pathname.startsWith("/admin");
  const Shell = pathname.startsWith("/unity") ? UnityShell : AppShell;

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  if (studio) return <Outlet />;

  return (
    <Shell>
      <Outlet />
    </Shell>
  );
}

export const Route = createRootRoute({
  beforeLoad: ({ location }) => ({
    pathname: location.pathname,
    searchStr: location.searchStr,
  }),
  headers: () => ({
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
  }),
  head: ({ match }) => {
    const ctx = match.context as { pathname?: string; searchStr?: string };
    const pathname = ctx.pathname || "/";
    const search = ctx.searchStr || "";
    const locale = getPublicLocale(search);
    const seo = resolveSeo(pathname, search);
    const canonical = absoluteUrl(seo.canonicalPath, locale);
    const robots = seo.noindex
      ? "noindex, follow"
      : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";
    const imagePreload =
      pathname === "/unity" || pathname === "/unity/services"
        ? assets.unity
        : pathname === "/edevops" || pathname === "/edevops/services"
          ? assets.edevops
          : "";
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "referrer", content: "strict-origin-when-cross-origin" },
        { title: seo.title },
        { name: "description", content: seo.description },
        { name: "robots", content: robots },
        { name: "theme-color", content: "#07111F" },
        { property: "og:title", content: seo.title },
        { property: "og:description", content: seo.description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonical },
        { property: "og:image", content: OG_IMAGE },
        { property: "og:site_name", content: APP_NAME },
        { property: "og:locale", content: locale === "fr" ? "fr_FR" : "en_US" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: seo.title },
        { name: "twitter:description", content: seo.description },
        { name: "twitter:image", content: OG_IMAGE },
      ],
      links: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "stylesheet", href: appCss },
        { rel: "manifest", href: "/__grok/manifest.webmanifest" },
        { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
        { rel: "alternate", type: "text/plain", href: "/llms.txt", title: "LLM guidance for eveOps Group" },
        ...(imagePreload ? [{ rel: "preload" as const, as: "image" as const, href: imagePreload }] : []),
        { rel: "alternate", hreflang: "en", href: absoluteUrl(seo.canonicalPath, "en") },
        { rel: "alternate", hreflang: "fr", href: absoluteUrl(seo.canonicalPath, "fr") },
        { rel: "alternate", hreflang: "x-default", href: absoluteUrl(seo.canonicalPath, "en") },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "preload",
          as: "style",
          href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Manrope:wght@400;500;600;700;800&family=Source+Serif+4:opsz,wght@8..60,500;8..60,600&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Manrope:wght@400;500;600;700;800&family=Source+Serif+4:opsz,wght@8..60,500;8..60,600&display=swap",
          media: "print",
        },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(structuredData(pathname, search)),
        },
        {
          children:
            "document.querySelectorAll('link[rel=stylesheet][media=print]').forEach(function(l){function a(){l.media='all'} if(l.sheet){a()} else {l.addEventListener('load',a)}})",
        },
        {
          type: "speculationrules",
          children: JSON.stringify({
            prefetch: [
              {
                source: "list",
                urls: pathname.startsWith("/unity")
                  ? ["/edevops", "/contact", "/about"]
                  : pathname.startsWith("/edevops")
                    ? ["/unity", "/contact", "/products"]
                    : ["/unity", "/edevops", "/contact", "/about"],
              },
            ],
          }),
        },
      ],
    };
  },
  component: RootDocument,
});

function RootDocument() {
  const search = useRouterState({ select: (s) => s.location.searchStr });
  const locale = getPublicLocale(search);
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <RoutedShell />
          <CookieNotice />
          <Toaster position="top-right" richColors />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
