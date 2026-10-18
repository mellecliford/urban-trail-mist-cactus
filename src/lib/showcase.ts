export type ShowcaseDivision = "unity" | "edevops";

export type ShowcaseItem = {
  id: string;
  division: ShowcaseDivision;
  name: string;
  slug: string;
  category: string;
  status: string;
  summary: string;
  summaryFr: string;
  href: string;
  hasMedia: boolean;
  published: boolean;
  sortOrder: number;
};

export type ShowcaseInput = {
  id?: string;
  division: ShowcaseDivision;
  name: string;
  slug: string;
  category: string;
  status: string;
  summary: string;
  summaryFr: string;
  href: string;
  published: boolean;
  sortOrder: number;
};

export type ShowcaseResult = { ok: true; id: string } | { ok: false; error: string };

export function showcaseHref(item: Pick<ShowcaseItem, "href" | "slug">) {
  const href = item.href.trim();
  if (!href) return `/products/${item.slug}`;
  return href;
}

export function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}
