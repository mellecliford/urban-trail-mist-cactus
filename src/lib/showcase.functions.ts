import { createServerFn } from "@tanstack/react-start";
import type { ShowcaseInput, ShowcaseItem, ShowcaseResult } from "@/lib/showcase";

type Row = {
  id: string;
  division: string;
  name: string;
  slug: string;
  category: string;
  status: string;
  summary: string;
  summary_fr: string;
  href: string;
  has_media: boolean;
  published: boolean;
  sort_order: number;
};

function mapRow(row: Row): ShowcaseItem {
  return {
    id: row.id,
    division: row.division === "unity" ? "unity" : "edevops",
    name: row.name,
    slug: row.slug,
    category: row.category,
    status: row.status,
    summary: row.summary,
    summaryFr: row.summary_fr,
    href: row.href,
    hasMedia: row.has_media === true,
    published: row.published === true,
    sortOrder: Number(row.sort_order) || 0,
  };
}

async function assertAdmin() {
  const { readAdminSession } = await import("@/lib/admin.session.server");
  const session = await readAdminSession();
  if (!session) throw new Error("Unauthorized");
}

function clean(value: unknown, max: number) {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

function parseInput(input: unknown): { value?: ShowcaseInput; error?: string } {
  const raw = input && typeof input === "object" ? (input as Record<string, unknown>) : null;
  if (!raw) return { error: "Missing details." };
  const division = raw.division === "unity" ? "unity" : raw.division === "edevops" ? "edevops" : null;
  const name = clean(raw.name, 80);
  const slug = clean(raw.slug, 80).toLowerCase();
  const href = clean(raw.href, 240);
  if (!division) return { error: "Choose Unity or eveDev Ops." };
  if (name.length < 2) return { error: "Add a name." };
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return { error: "Use a short slug: letters, numbers, and hyphens." };
  if (href && !href.startsWith("/") && !/^https:\/\//i.test(href)) return { error: "Link must start with / or https://." };
  const sort = Number(raw.sortOrder);
  return {
    value: {
      id: clean(raw.id, 80) || undefined,
      division,
      name,
      slug,
      category: clean(raw.category, 80),
      status: clean(raw.status, 40) || "In development",
      summary: clean(raw.summary, 320),
      summaryFr: clean(raw.summaryFr, 320),
      href,
      published: raw.published !== false,
      sortOrder: Number.isFinite(sort) ? Math.max(0, Math.min(999, Math.round(sort))) : 0,
    },
  };
}

export const listPublishedShowcase = createServerFn({ method: "GET" }).handler(async (): Promise<ShowcaseItem[]> => {
  const { getSql } = await import("@/lib/db");
  const sql = await getSql();
  const rows = await sql<Row>`
    select id, division, name, slug, category, status, summary, summary_fr, href, has_media, published, sort_order
    from showcase_items
    where published = true
    order by sort_order asc, name asc
  `;
  return rows.map(mapRow);
});

export const getPublishedShowcase = createServerFn({ method: "GET" })
  .validator((slug: string) => clean(slug, 80))
  .handler(async ({ data }): Promise<ShowcaseItem | null> => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql<Row>`
      select id, division, name, slug, category, status, summary, summary_fr, href, has_media, published, sort_order
      from showcase_items
      where slug = ${data} and published = true
      limit 1
    `;
    return rows[0] ? mapRow(rows[0]) : null;
  });

export const listShowcaseAdmin = createServerFn({ method: "GET" })
  .handler(async (): Promise<ShowcaseItem[]> => {
    await assertAdmin();
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql<Row>`
      select id, division, name, slug, category, status, summary, summary_fr, href, has_media, published, sort_order
      from showcase_items
      order by division asc, sort_order asc, name asc
    `;
    return rows.map(mapRow);
  });

export const saveShowcase = createServerFn({ method: "POST" })
  .validator((input: unknown) => input)
  .handler(async ({ data }): Promise<ShowcaseResult> => {
    await assertAdmin();
    const parsed = parseInput(data);
    if (!parsed.value) return { ok: false, error: parsed.error || "Check the form." };
    const item = parsed.value;
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const clash = await sql<{ id: string }>`select id from showcase_items where slug = ${item.slug} limit 1`;
    if (clash[0] && clash[0].id !== item.id) return { ok: false, error: "That slug is already used." };

    if (item.id) {
      const existing = await sql<{ id: string }>`select id from showcase_items where id = ${item.id} limit 1`;
      if (!existing[0]) return { ok: false, error: "That entry no longer exists." };
      await sql`
        update showcase_items
        set division = ${item.division},
            name = ${item.name},
            slug = ${item.slug},
            category = ${item.category},
            status = ${item.status},
            summary = ${item.summary},
            summary_fr = ${item.summaryFr},
            href = ${item.href},
            published = ${item.published},
            sort_order = ${item.sortOrder},
            updated_at = now()
        where id = ${item.id}
      `;
      return { ok: true, id: item.id };
    }

    const id = crypto.randomUUID();
    await sql`
      insert into showcase_items (
        id, division, name, slug, category, status, summary, summary_fr, href, published, sort_order
      ) values (
        ${id}, ${item.division}, ${item.name}, ${item.slug}, ${item.category}, ${item.status},
        ${item.summary}, ${item.summaryFr}, ${item.href}, ${item.published}, ${item.sortOrder}
      )
    `;
    return { ok: true, id };
  });

export const deleteShowcase = createServerFn({ method: "POST" })
  .validator((id: string) => clean(id, 80))
  .handler(async ({ data }): Promise<ShowcaseResult> => {
    await assertAdmin();
    if (!data) return { ok: false, error: "Missing entry." };
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    await sql`delete from showcase_items where id = ${data}`;
    return { ok: true, id: data };
  });

const MAX_MEDIA = 1_500_000;

function mediaMime(bytes: Uint8Array): string | null {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg";
  if (bytes.length >= 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return "image/png";
  if (bytes.length >= 6 && bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) return "image/gif";
  if (
    bytes.length >= 12 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return "image/webp";
  }
  return null;
}

export const uploadShowcaseMedia = createServerFn({ method: "POST" })
  .validator((input: unknown) => input)
  .handler(async ({ data }): Promise<ShowcaseResult> => {
    await assertAdmin();
    const raw = data && typeof data === "object" ? (data as Record<string, unknown>) : null;
    const id = clean(raw?.id, 80);
    if (!id) return { ok: false, error: "Save the entry before uploading." };
    const encoded = String(raw?.base64 ?? "").replace(/\s/g, "");
    let bytes: Uint8Array;
    try {
      bytes = Uint8Array.from(Buffer.from(encoded, "base64"));
    } catch {
      return { ok: false, error: "That file could not be read." };
    }
    if (!bytes.length || bytes.length > MAX_MEDIA) return { ok: false, error: "Use an image under 1.5 MB." };
    const mime = mediaMime(bytes);
    if (!mime) return { ok: false, error: "Use a JPG, PNG, WEBP, or GIF." };
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const existing = await sql<{ id: string }>`select id from showcase_items where id = ${id} limit 1`;
    if (!existing[0]) return { ok: false, error: "Save the entry before uploading." };
    await sql`
      insert into showcase_media (item_id, mime, bytes)
      values (${id}, ${mime}, ${bytes})
      on conflict (item_id) do update set mime = excluded.mime, bytes = excluded.bytes
    `;
    await sql`update showcase_items set has_media = true, updated_at = now() where id = ${id}`;
    return { ok: true, id };
  });

export const clearShowcaseMedia = createServerFn({ method: "POST" })
  .validator((id: string) => clean(id, 80))
  .handler(async ({ data }): Promise<ShowcaseResult> => {
    await assertAdmin();
    if (!data) return { ok: false, error: "Missing entry." };
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    await sql`delete from showcase_media where item_id = ${data}`;
    await sql`update showcase_items set has_media = false, updated_at = now() where id = ${data}`;
    return { ok: true, id: data };
  });

