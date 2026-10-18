import { mkdirSync, writeFileSync } from "node:fs";
import { createServer } from "vite";

const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
});

const profile = await vite.ssrLoadModule("/src/lib/pdf/profile.ts");
const briefMod = await vite.ssrLoadModule("/src/lib/pdf/brief.ts");
const site = await vite.ssrLoadModule("/src/content/site.ts");

const dir = new URL("../public/documents/", import.meta.url);
mkdirSync(dir, { recursive: true });

for (const locale of ["en", "fr"] as const) {
  const bytes = profile.buildCompanyProfile(locale) as Uint8Array;
  const file = new URL(`eveops-group-profile.${locale}.pdf`, dir);
  writeFileSync(file, bytes);
  const header = new TextDecoder().decode(bytes.slice(0, 8));
  if (header !== "%PDF-1.4") throw new Error(`bad header ${header}`);
  console.log(file.pathname, bytes.length);
}

const sample = site.divisions.unity.services[0];
const brief = briefMod.buildWorkingBrief("unity", sample, {
  title: "Translation",
  canonicalTitle: "Translation",
  briefLabel: "Language Services — Translation",
  description: "Accurate translation for documents, product content, communications, and operational material.",
  detail: "Share the source, the audience, and how the finished text will be used.",
}, "en") as Uint8Array;
writeFileSync("/tmp/eveops-sample-brief.pdf", brief);
console.log("sample brief", brief.length);
await vite.close();
