import { useEffect } from "react";
import { usePathname, useLocationSearch } from "@/lib/locale";
import { absoluteUrl, OG_IMAGE, SITE_ORIGIN, resolveSeo } from "@/lib/seo";
import { getPublicLocale } from "@/lib/publicLocale";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let node = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!node) {
    node = document.createElement("meta");
    node.setAttribute(attr, key);
    document.head.appendChild(node);
  }
  node.setAttribute("content", content);
}

function upsertLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`;
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement("link");
    node.setAttribute("rel", rel);
    if (hreflang) node.setAttribute("hreflang", hreflang);
    document.head.appendChild(node);
  }
  node.setAttribute("href", href);
}

export function useDocumentMeta(title: string, description: string, options?: { noindex?: boolean }) {
  const pathname = usePathname();
  const search = useLocationSearch();
  useEffect(() => {
    const locale = getPublicLocale(search);
    const seo = resolveSeo(pathname, search);
    const noindex = options?.noindex ?? seo.noindex;
    const canonical = absoluteUrl(seo.canonicalPath, locale);
    document.title = title;
    document.documentElement.lang = locale;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noindex ? "noindex, follow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", OG_IMAGE);
    upsertMeta("property", "og:site_name", "eveOps Group");
    upsertMeta("property", "og:locale", locale === "fr" ? "fr_FR" : "en_US");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", OG_IMAGE);
    upsertLink("canonical", canonical);
    upsertLink("alternate", absoluteUrl(seo.canonicalPath, "en"), "en");
    upsertLink("alternate", absoluteUrl(seo.canonicalPath, "fr"), "fr");
    upsertLink("alternate", absoluteUrl(seo.canonicalPath, "en"), "x-default");
  }, [title, description, options?.noindex, pathname, search]);
}

export function siteOrigin() {
  return SITE_ORIGIN;
}
