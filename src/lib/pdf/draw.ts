/** Small A4 PDF writer. Standard Helvetica, WinAnsi, no fake client metrics. */

export type RGB = readonly [number, number, number];

export const ink: RGB = [0.027, 0.067, 0.122];
export const cobalt: RGB = [0.169, 0.361, 1];
export const cyan: RGB = [0.38, 0.843, 0.894];
export const bone: RGB = [0.984, 0.98, 0.969];
export const white: RGB = [1, 1, 1];
export const muted: RGB = [0.29, 0.36, 0.46];
export const line: RGB = [0.82, 0.84, 0.86];
export const copper: RGB = [0.64, 0.427, 0.271];

const W = 595.28;
const H = 841.89;

const HELV: Record<string, number> = {
  " ": 278, "!": 278, '"': 355, "#": 556, $: 556, "%": 889, "&": 667, "'": 191,
  "(": 333, ")": 333, "*": 389, "+": 584, ",": 278, "-": 333, ".": 278, "/": 278,
  "0": 556, "1": 556, "2": 556, "3": 556, "4": 556, "5": 556, "6": 556, "7": 556, "8": 556, "9": 556,
  ":": 278, ";": 278, "<": 584, "=": 584, ">": 584, "?": 556, "@": 1015,
  A: 667, B: 667, C: 722, D: 722, E: 667, F: 611, G: 778, H: 722, I: 278, J: 500, K: 667, L: 556, M: 833, N: 722, O: 778, P: 667, Q: 778, R: 722, S: 667, T: 611, U: 722, V: 667, W: 944, X: 667, Y: 667, Z: 611,
  "[": 278, "\\": 278, "]": 278, "^": 469, _: 556, "`": 333,
  a: 556, b: 556, c: 500, d: 556, e: 556, f: 278, g: 556, h: 556, i: 222, j: 222, k: 500, l: 222, m: 833, n: 556, o: 556, p: 556, q: 556, r: 333, s: 500, t: 278, u: 556, v: 500, w: 722, x: 500, y: 500, z: 500,
  "{": 334, "|": 260, "}": 334, "~": 584,
};

const EXTRA: Record<string, number> = {
  "\u00e9": 556, "\u00e8": 556, "\u00ea": 556, "\u00eb": 556, "\u00e0": 556, "\u00e2": 556, "\u00f9": 556, "\u00fb": 556, "\u00ee": 222, "\u00ef": 222, "\u00f4": 556, "\u00e7": 500, "\u0153": 890, "\u2019": 191, "\u2018": 191, "\u201c": 333, "\u201d": 333, "\u2013": 556, "\u2014": 1000, "\u2022": 350, "\u00c9": 667, "\u00c0": 667,
};

function glyphWidth(ch: string) {
  if (HELV[ch]) return HELV[ch];
  if (EXTRA[ch]) return EXTRA[ch];
  const base = ch.normalize("NFD")[0];
  return HELV[base] ?? 560;
}

export function textWidth(text: string, size: number, bold = false) {
  const scale = (bold ? 1.06 : 1) * size / 1000;
  let w = 0;
  for (const ch of text) w += glyphWidth(ch) * scale;
  return w;
}

export function wrapText(text: string, max: number, size: number, bold = false) {
  const words = text.replace(/\s+/g, " ").trim().split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (line && textWidth(next, size, bold) > max) {
      lines.push(line);
      line = word;
    } else line = next;
  }
  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

function pdfString(value: string) {
  let out = "";
  for (const ch of value) {
    const code = ch.codePointAt(0) ?? 63;
    const byte = code <= 255 ? code : 63;
    const mapped = ch === "\u2019" || ch === "\u2018" ? 0x92 : ch === "\u201c" ? 0x93 : ch === "\u201d" ? 0x94 : ch === "\u2013" ? 0x96 : ch === "\u2014" ? 0x97 : ch === "\u2022" ? 0x95 : ch === "\u0153" ? 0x3f : byte;
    if (mapped === 0x28 || mapped === 0x29 || mapped === 0x5c) out += `\\${String.fromCharCode(mapped)}`;
    else if (mapped < 32 || mapped > 126) out += `\\${mapped.toString(8).padStart(3, "0")}`;
    else out += String.fromCharCode(mapped);
  }
  return out;
}

function rgb(color: RGB) {
  return color.map((n) => (Math.round(n * 1000) / 1000).toString()).join(" ");
}

type Page = string[];

export class Doc {
  readonly W = W;
  readonly H = H;
  readonly margin = 48;
  pages: Page[] = [];
  private ops: Page = [];
  y = 72;

  constructor(private info: { title: string; author?: string; subject: string }) {}

  start() {
    this.ops = [];
    this.pages.push(this.ops);
    this.y = 78;
    this.rect(0, 0, W, H, bone);
  }

  private cmd(value: string) {
    this.ops.push(value);
  }

  rect(x: number, top: number, w: number, h: number, color: RGB) {
    const y = H - top - h;
    this.cmd(`${rgb(color)} rg ${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re f`);
  }

  stroke(x: number, top: number, w: number, weight: number, color: RGB) {
    this.rect(x, top, w, weight, color);
  }

  text(value: string, x: number, top: number, size: number, opts?: { bold?: boolean; color?: RGB; oblique?: boolean }) {
    const font = opts?.oblique ? "F3" : opts?.bold ? "F2" : "F1";
    const color = opts?.color ?? ink;
    const baseline = H - top - size;
    this.cmd(`BT /${font} ${size} Tf ${rgb(color)} rg 1 0 0 1 ${x.toFixed(2)} ${baseline.toFixed(2)} Tm (${pdfString(value)}) Tj ET`);
  }

  textRight(value: string, right: number, top: number, size: number, opts?: { bold?: boolean; color?: RGB }) {
    const x = right - textWidth(value, size, opts?.bold);
    this.text(value, x, top, size, opts);
  }

  tracked(value: string, x: number, top: number, size: number, tracking: number, opts?: { bold?: boolean; color?: RGB }) {
    const font = opts?.bold ? "F2" : "F1";
    const color = opts?.color ?? ink;
    const baseline = H - top - size;
    const parts = [...value].map((ch) => `(${pdfString(ch)}) ${-tracking}`).join(" ");
    this.cmd(`BT /${font} ${size} Tf ${rgb(color)} rg 1 0 0 1 ${x.toFixed(2)} ${baseline.toFixed(2)} Tm [${parts}] TJ ET`);
  }

  paragraph(value: string, x: number, max: number, size: number, leading: number, opts?: { bold?: boolean; color?: RGB }) {
    const lines = wrapText(value, max, size, opts?.bold);
    for (const line of lines) {
      this.text(line, x, this.y, size, opts);
      this.y += leading;
    }
    return lines.length;
  }

  mark(x: number, top: number, size: number, light: boolean) {
    const s = size / 48;
    const y0 = H - top - size;
    const cobaltFill = rgb(cobalt);
    const main = rgb(light ? white : ink);
    const cyanFill = rgb(cyan);
    const path = (pts: Array<[number, number]>, fill: string) => {
      const [x1, y1] = pts[0];
      let d = `${(x + x1 * s).toFixed(2)} ${(y0 + (48 - y1) * s).toFixed(2)} m`;
      for (const [px, py] of pts.slice(1)) d += ` ${(x + px * s).toFixed(2)} ${(y0 + (48 - py) * s).toFixed(2)} l`;
      this.cmd(`${fill} rg ${d} h f`);
    };
    path([[13.5, 8], [8, 13.5], [20.5, 26], [8, 38.5], [13.5, 44], [31.5, 26]], cobaltFill);
    path([[28, 8], [22.5, 13.5], [35, 26], [22.5, 38.5], [28, 44], [46, 26]], main);
    path([[30.5, 18], [24.5, 24], [30.5, 30], [34.5, 26], [32.5, 24], [34.5, 22]], cyanFill);
  }

  bytes() {
    const pageObjs: string[] = [];
    const kids: string[] = [];
    const objects: string[] = [];
    const pageStart = 7;
    this.pages.forEach((ops, index) => {
      const pageId = pageStart + index * 2;
      const streamId = pageId + 1;
      kids.push(`${pageId} 0 R`);
      const stream = ops.join("\n");
      const payload = `${stream}\n`;
      pageObjs.push(`${pageId} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Contents ${streamId} 0 R /Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >> >> >>\nendobj\n`);
      pageObjs.push(`${streamId} 0 obj\n<< /Length ${payload.length} >>\nstream\n${payload}endstream\nendobj\n`);
    });
    const font = (id: number, name: string) => `${id} 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /${name} /Encoding /WinAnsiEncoding >>\nendobj\n`;
    objects.push("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");
    objects.push(`2 0 obj\n<< /Type /Pages /Count ${this.pages.length} /Kids [${kids.join(" ")}] >>\nendobj\n`);
    objects.push(font(3, "Helvetica"));
    objects.push(font(4, "Helvetica-Bold"));
    objects.push(font(5, "Helvetica-Oblique"));
    objects.push(`6 0 obj\n<< /Title (${pdfString(this.info.title)}) /Author (${pdfString(this.info.author ?? "eveOps Group")}) /Subject (${pdfString(this.info.subject)}) /Creator (eveOps Group) >>\nendobj\n`);
    objects.push(...pageObjs);

    let out = "%PDF-1.4\n";
    const offsets = [0];
    for (const obj of objects) {
      offsets.push(out.length);
      out += obj;
    }
    const xref = out.length;
    let table = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    for (let i = 1; i < offsets.length; i++) table += `${offsets[i].toString().padStart(10, "0")} 00000 n \n`;
    out += table;
    out += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R /Info 6 0 R >>\nstartxref\n${xref}\n%%EOF`;
    return new TextEncoder().encode(out);
  }
}
