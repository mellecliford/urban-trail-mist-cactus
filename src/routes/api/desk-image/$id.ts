import { createFileRoute } from "@tanstack/react-router";

const allowed = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export const Route = createFileRoute("/api/desk-image/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const id = String(params.id || "").slice(0, 40);
        const kind = id.startsWith("r-") ? "reply" : "post";
        const { getSql } = await import("@/lib/db");
        const sql = await getSql();
        const rows =
          kind === "reply"
            ? await sql<{ mime: string; image: unknown }>`
                select r.image_mime as mime, r.image
                from desk_replies r
                join desk_posts p on p.id = r.post_id
                where r.id = ${id} and r.published = true and p.published = true and r.has_image = true
                limit 1
              `
            : await sql<{ mime: string; image: unknown }>`
                select image_mime as mime, image from desk_posts
                where id = ${id} and published = true and has_image = true
                limit 1
              `;
        const row = rows[0];
        if (!row || !allowed.has(row.mime)) return new Response("Not found", { status: 404 });
        const bytes = toBytes(row.image);
        const body = new ArrayBuffer(bytes.byteLength);
        new Uint8Array(body).set(bytes);
        return new Response(body, {
          headers: {
            "content-type": row.mime,
            "cache-control": "public, max-age=3600",
            "x-content-type-options": "nosniff",
          },
        });
      },
    },
  },
});

function toBytes(value: unknown): Uint8Array {
  if (value instanceof Uint8Array) return value;
  if (typeof Buffer !== "undefined" && Buffer.isBuffer(value)) return new Uint8Array(value);
  if (typeof value === "string") {
    const hex = value.startsWith("\\x") ? value.slice(2) : value;
    return Uint8Array.from(Buffer.from(hex, value.startsWith("\\x") ? "hex" : "base64"));
  }
  return new Uint8Array();
}
