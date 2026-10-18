import { createServerFn } from "@tanstack/react-start";

export type DeskReply = {
  id: string;
  author: string;
  body: string;
  official: boolean;
  score: number;
  hasAudio: boolean;
  hasImage: boolean;
  parentId: string;
};

export type DeskPost = {
  id: string;
  kind: "essay" | "question";
  slug: string;
  title: string;
  titleFr: string;
  body: string;
  bodyFr: string;
  author: string;
  topic: string;
  official: boolean;
  score: number;
  createdAt: string;
  hasAudio: boolean;
  hasImage: boolean;
  replies: DeskReply[];
};

export type DeskMember = { id: string; username: string; createdAt: string };

type PostRow = {
  id: string;
  kind: string;
  slug: string;
  title: string;
  title_fr: string;
  body: string;
  body_fr: string;
  author: string;
  topic: string;
  official: boolean;
  score: number;
  created_at: string | Date;
  has_audio: boolean;
  has_image: boolean;
};

type ReplyRow = {
  id: string;
  post_id: string;
  author: string;
  body: string;
  official: boolean;
  score: number;
  has_audio: boolean;
  has_image: boolean;
  parent_id: string;
};

const hits = new Map<string, { count: number; until: number }>();

function clip(value: unknown, max: number) {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

function plain(value: unknown, max: number) {
  return String(value ?? "").replace(/\u0000/g, "").trim().slice(0, max);
}

function allow(key: string) {
  const now = Date.now();
  const hit = hits.get(key);
  const count = hit && hit.until > now ? hit.count + 1 : 1;
  hits.set(key, { count, until: now + 10 * 60_000 });
  return count <= 8;
}

function imageMime(bytes: Uint8Array) {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg";
  if (bytes.length >= 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return "image/png";
  if (bytes.length >= 6 && bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) return "image/gif";
  if (bytes.length >= 12 && bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50) return "image/webp";
  return "";
}

function audioMime(bytes: Uint8Array) {
  if (bytes.length >= 4 && bytes[0] === 0x1a && bytes[1] === 0x45 && bytes[2] === 0xdf && bytes[3] === 0xa3) return "audio/webm";
  if (bytes.length >= 4 && bytes[0] === 0x4f && bytes[1] === 0x67 && bytes[2] === 0x67 && bytes[3] === 0x53) return "audio/ogg";
  if (bytes.length >= 12 && bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 && bytes[8] === 0x57 && bytes[9] === 0x41 && bytes[10] === 0x56 && bytes[11] === 0x45) return "audio/wav";
  if (bytes.length >= 8 && bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70) return "audio/mp4";
  return "";
}

function decode(value: unknown, max: number) {
  const encoded = String(value ?? "").replace(/\s/g, "");
  if (!encoded) return null;
  const bytes = Uint8Array.from(Buffer.from(encoded, "base64"));
  if (!bytes.length || bytes.length > max) return undefined;
  return bytes;
}

async function assertAdmin() {
  const { readAdminSession } = await import("@/lib/admin.session.server");
  const session = await readAdminSession();
  if (!session) throw new Error("Unauthorized");
}

async function loadDesk(query = "") {
  const { getSql } = await import("@/lib/db");
  const sql = await getSql();
  const q = query.trim().slice(0, 80);
  const like = `%${q}%`;
  const posts = await sql<PostRow>`
    select id, kind, slug, title, title_fr, body, body_fr, author, topic, official, score, created_at, has_audio, has_image
    from desk_posts
    where published = true
      and (
        ${q} = ''
        or title ilike ${like}
        or title_fr ilike ${like}
        or body ilike ${like}
        or body_fr ilike ${like}
        or author ilike ${like}
      )
    order by created_at desc
  `;
  const replies = await sql<ReplyRow>`
    select id, post_id, author, body, official, score, has_audio, has_image, parent_id
    from desk_replies
    where published = true
    order by created_at asc
  `;
  return posts.map((post) => ({
    id: post.id,
    kind: post.kind === "essay" ? ("essay" as const) : ("question" as const),
    slug: post.slug,
    title: post.title,
    titleFr: post.title_fr,
    body: post.body,
    bodyFr: post.body_fr,
    author: post.author,
    topic: post.topic,
    official: post.official === true,
    score: Number(post.score) || 0,
    createdAt: new Date(post.created_at).toISOString(),
    hasAudio: post.has_audio === true,
    hasImage: post.has_image === true,
    replies: replies
      .filter((reply) => reply.post_id === post.id)
      .map((reply) => ({
        id: reply.id,
        author: reply.author,
        body: reply.body,
        official: reply.official === true,
        score: Number(reply.score) || 0,
        hasAudio: reply.has_audio === true,
        hasImage: reply.has_image === true,
        parentId: reply.parent_id || "",
      })),
  }));
}

async function speaker(fallback: string) {
  const { readDeskSession } = await import("@/lib/desk.session.server");
  const member = await readDeskSession();
  if (member) return { author: member.username, userId: member.id };
  const name = fallback.trim();
  return { author: name || "Visitor", userId: "" };
}

export const listDesk = createServerFn({ method: "GET" })
  .validator((input: unknown) => {
    const raw = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
    return { q: String(raw.q ?? "").slice(0, 80) };
  })
  .handler(async ({ data }) => loadDesk(data.q));

export const getDeskThread = createServerFn({ method: "GET" })
  .validator((input: unknown) => String(input ?? "").slice(0, 80))
  .handler(async ({ data }) => {
    const posts = await loadDesk();
    return posts.find((post) => post.slug === data) ?? null;
  });

export const deskSession = createServerFn({ method: "GET" }).handler(async () => {
  const { readDeskSession } = await import("@/lib/desk.session.server");
  const member = await readDeskSession();
  return member ? { username: member.username } : null;
});

export const registerDesk = createServerFn({ method: "POST" })
  .validator((input: unknown) => input)
  .handler(async ({ data }) => {
    if (!allow("register")) return { ok: false as const, error: "Too many attempts. Wait a moment and try again." };
    const raw = data && typeof data === "object" ? (data as Record<string, unknown>) : {};
    const username = clip(raw.username, 20);
    const password = String(raw.password ?? "");
    if (!/^[a-zA-Z0-9._-]{3,20}$/.test(username)) {
      return { ok: false as const, error: "Use 3–20 letters, numbers, dots, or hyphens." };
    }
    if (password.length < 8 || password.length > 72) {
      return { ok: false as const, error: "Use a password of at least 8 characters." };
    }
    const { getSql } = await import("@/lib/db");
    const { hashDeskPassword, writeDeskSession } = await import("@/lib/desk.session.server");
    const sql = await getSql();
    const taken = await sql<{ id: string }>`select id from desk_users where lower(username) = lower(${username}) limit 1`;
    if (taken[0]) return { ok: false as const, error: "That username is already in use." };
    const id = `u-${crypto.randomUUID().slice(0, 8)}`;
    const passwordHash = await hashDeskPassword(password);
    await sql`insert into desk_users (id, username, password_hash) values (${id}, ${username}, ${passwordHash})`;
    await writeDeskSession({ id, username });
    return { ok: true as const, username };
  });

export const loginDesk = createServerFn({ method: "POST" })
  .validator((input: unknown) => input)
  .handler(async ({ data }) => {
    if (!allow("login")) return { ok: false as const, error: "Too many attempts. Wait a moment and try again." };
    const raw = data && typeof data === "object" ? (data as Record<string, unknown>) : {};
    const username = clip(raw.username, 20);
    const password = String(raw.password ?? "");
    const { getSql } = await import("@/lib/db");
    const { verifyDeskPassword, writeDeskSession } = await import("@/lib/desk.session.server");
    const sql = await getSql();
    const rows = await sql<{ id: string; username: string; password_hash: string }>`
      select id, username, password_hash from desk_users where lower(username) = lower(${username}) limit 1
    `;
    const row = rows[0];
    if (!row || !(await verifyDeskPassword(password, row.password_hash))) {
      return { ok: false as const, error: "Those details are not correct." };
    }
    await writeDeskSession({ id: row.id, username: row.username });
    return { ok: true as const, username: row.username };
  });

export const logoutDesk = createServerFn({ method: "POST" }).handler(async () => {
  const { clearDeskSession } = await import("@/lib/desk.session.server");
  await clearDeskSession();
  return { ok: true as const };
});

export const askDesk = createServerFn({ method: "POST" })
  .validator((input: unknown) => input)
  .handler(async ({ data }) => {
    if (!allow("ask")) return { ok: false as const, error: "Too many notes in a short time. Try again shortly." };
    const raw = data && typeof data === "object" ? (data as Record<string, unknown>) : {};
    if (clip(raw.website, 80)) return { ok: true as const };
    const title = clip(raw.title, 160);
    const body = plain(raw.body, 4000);
    const author = clip(raw.author, 80) || "Visitor";
    if (title.length < 8) return { ok: false as const, error: "Ask the question in a full sentence." };
    const image = decode(raw.image, 1_200_000);
    const audio = decode(raw.audio, 900_000);
    if (image === undefined) return { ok: false as const, error: "Use an image under 1.2 MB." };
    if (audio === undefined) return { ok: false as const, error: "Keep the voice note under about a minute." };
    const mime = image ? imageMime(image) : "";
    const audioType = audio ? audioMime(audio) : "";
    if (image && !mime) return { ok: false as const, error: "Use a JPG, PNG, WEBP, or GIF." };
    if (audio && !audioType) return { ok: false as const, error: "That voice note could not be read." };
    const topic = raw.topic === "Technology" ? "Technology" : "Business";
    const id = `q-${crypto.randomUUID().slice(0, 8)}`;
    const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 42) || "question"}-${id.slice(-4)}`;
    const who = await speaker(author);
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    await sql`
      insert into desk_posts (
        id, kind, slug, title, body, author, topic, official, published, user_id,
        has_image, image_mime, image, has_audio, audio_mime, audio
      )
      values (
        ${id}, 'question', ${slug}, ${title}, ${body}, ${who.author}, ${topic}, false, true, ${who.userId},
        ${Boolean(mime)}, ${mime}, ${image}, ${Boolean(audioType)}, ${audioType}, ${audio}
      )
    `;
    return { ok: true as const };
  });

export const replyDesk = createServerFn({ method: "POST" })
  .validator((input: unknown) => input)
  .handler(async ({ data }) => {
    if (!allow("reply")) return { ok: false as const, error: "Too many replies in a short time. Try again shortly." };
    const raw = data && typeof data === "object" ? (data as Record<string, unknown>) : {};
    if (clip(raw.website, 80)) return { ok: true as const };
    const postId = clip(raw.postId, 40);
    const author = clip(raw.author, 80) || "Visitor";
    const body = plain(raw.body, 4000);
    const audio = decode(raw.audio, 900_000);
    const image = decode(raw.image, 1_200_000);
    if (audio === undefined) return { ok: false as const, error: "Keep the voice note under about a minute." };
    if (image === undefined) return { ok: false as const, error: "Use an image under 1.2 MB." };
    const audioType = audio ? audioMime(audio) : "";
    const imageType = image ? imageMime(image) : "";
    if (audio && !audioType) return { ok: false as const, error: "That voice note could not be read." };
    if (image && !imageType) return { ok: false as const, error: "Use a JPG, PNG, WEBP, or GIF." };
    if (body.length < 2 && !audioType && !imageType) return { ok: false as const, error: "Write an answer, or leave a voice note." };
    const parentId = clip(raw.parentId, 40);
    const who = await speaker(author);
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const posts = await sql<{ id: string }>`select id from desk_posts where id = ${postId} and published = true limit 1`;
    if (!posts[0]) return { ok: false as const, error: "That thread is no longer open." };
    if (parentId) {
      const parent = await sql<{ id: string }>`
        select id from desk_replies where id = ${parentId} and post_id = ${postId} and published = true limit 1
      `;
      if (!parent[0]) return { ok: false as const, error: "That reply is no longer there." };
    }
    const id = `r-${crypto.randomUUID().slice(0, 8)}`;
    await sql`
      insert into desk_replies (
        id, post_id, parent_id, author, body, official, published, user_id,
        has_audio, audio_mime, audio, has_image, image_mime, image
      )
      values (
        ${id}, ${postId}, ${parentId}, ${who.author}, ${body}, false, true, ${who.userId},
        ${Boolean(audioType)}, ${audioType}, ${audio}, ${Boolean(imageType)}, ${imageType}, ${image}
      )
    `;
    return { ok: true as const };
  });

export const voteDesk = createServerFn({ method: "POST" })
  .validator((input: unknown) => input)
  .handler(async ({ data }) => {
    if (!allow("vote")) return { ok: false as const, error: "Too many votes. Try again shortly." };
    const raw = data && typeof data === "object" ? (data as Record<string, unknown>) : {};
    const voter = clip(raw.voter, 40);
    const target = clip(raw.target, 40);
    const kind = raw.kind === "reply" ? "reply" : "post";
    const asked = Number(raw.direction) === -1 ? -1 : 1;
    if (!/^[a-zA-Z0-9-]{8,40}$/.test(voter) || !target) return { ok: false as const, error: "Vote could not be saved." };
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const existing = await sql<{ direction: number }>`select direction from desk_votes where voter = ${voter} and target = ${target} limit 1`;
    const previous = Number(existing[0]?.direction) || 0;
    const next = previous === asked ? 0 : asked;
    if (next === 0) await sql`delete from desk_votes where voter = ${voter} and target = ${target}`;
    else if (previous === 0) await sql`insert into desk_votes (voter, target, direction) values (${voter}, ${target}, ${next})`;
    else await sql`update desk_votes set direction = ${next} where voter = ${voter} and target = ${target}`;
    const delta = next - previous;
    if (kind === "reply") await sql`update desk_replies set score = score + ${delta} where id = ${target}`;
    else await sql`update desk_posts set score = score + ${delta} where id = ${target}`;
    return { ok: true as const, direction: next };
  });

export const listDeskAdmin = createServerFn({ method: "GET" }).handler(async () => {
  await assertAdmin();
  return loadDesk();
});

export const hideDeskPost = createServerFn({ method: "POST" })
  .validator((input: unknown) => input)
  .handler(async ({ data }) => {
    await assertAdmin();
    const id = clip(data, 40);
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    await sql`update desk_posts set published = false where id = ${id} and official = false`;
    return { ok: true as const };
  });

export const hideDeskReply = createServerFn({ method: "POST" })
  .validator((input: unknown) => input)
  .handler(async ({ data }) => {
    await assertAdmin();
    const id = clip(data, 40);
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    await sql`update desk_replies set published = false where id = ${id}`;
    return { ok: true as const };
  });

export const listDeskMembers = createServerFn({ method: "GET" }).handler(async () => {
  await assertAdmin();
  const { getSql } = await import("@/lib/db");
  const sql = await getSql();
  const rows = await sql<{ id: string; username: string; created_at: string | Date }>`
    select id, username, created_at from desk_users order by created_at desc
  `;
  return rows.map((row) => ({
    id: row.id,
    username: row.username,
    createdAt: new Date(row.created_at).toISOString(),
  }));
});

export const removeDeskMember = createServerFn({ method: "POST" })
  .validator((input: unknown) => input)
  .handler(async ({ data }) => {
    await assertAdmin();
    const id = clip(data, 40);
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    await sql`delete from desk_users where id = ${id}`;
    return { ok: true as const };
  });

export const answerDesk = createServerFn({ method: "POST" })
  .validator((input: unknown) => input)
  .handler(async ({ data }) => {
    await assertAdmin();
    const raw = data && typeof data === "object" ? (data as Record<string, unknown>) : {};
    const postId = clip(raw.postId, 40);
    const body = plain(raw.body, 4000);
    if (body.length < 2) return { ok: false as const, error: "Write the answer first." };
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const posts = await sql<{ id: string }>`select id from desk_posts where id = ${postId} and published = true limit 1`;
    if (!posts[0]) return { ok: false as const, error: "That thread is not on the forum." };
    const id = `r-${crypto.randomUUID().slice(0, 8)}`;
    await sql`
      insert into desk_replies (id, post_id, author, body, official, published)
      values (${id}, ${postId}, 'eveOps Group', ${body}, true, true)
    `;
    return { ok: true as const };
  });
