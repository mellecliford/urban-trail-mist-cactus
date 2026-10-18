import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/showcase-media/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const id = String(params.id || "").slice(0, 80);
        if (!id) return new Response("Not found", { status: 404 });
        const { getSql } = await import("@/lib/db");
        const sql = await getSql();
        const rows = await sql<{ mime: string; bytes: unknown }>`
          select mime, bytes from showcase_media where item_id = ${id} limit 1
        `;
        const row = rows[0];
        if (!row) return new Response("Not found", { status: 404 });
        const allowed = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
        const mime = allowed.has(row.mime) ? row.mime : "";
        if (!mime) return new Response("Not found", { status: 404 });
        const bytes = toBytes(row.bytes);
        const body = new ArrayBuffer(bytes.byteLength);
        new Uint8Array(body).set(bytes);
        return new Response(body, {
          headers: {
            "content-type": mime,
            "cache-control": "public, max-age=0, must-revalidate",
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
