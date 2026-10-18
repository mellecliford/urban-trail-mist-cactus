import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { useSession } from "@tanstack/react-start/server";

const scryptAsync = promisify(scrypt);
const SESSION_PASSWORD =
  process.env.ADMIN_SESSION_SECRET && process.env.ADMIN_SESSION_SECRET.length >= 32
    ? process.env.ADMIN_SESSION_SECRET
    : "eveops-group-admin-session-v1-key";

const sessionConfig = {
  password: SESSION_PASSWORD,
  name: "eveops-admin",
  maxAge: 60 * 60 * 24 * 14,
  cookie: {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  },
};

type AdminRow = { id: string; username: string; password_hash: string };

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const key = (await scryptAsync(password, salt, 32)) as Buffer;
  return `${salt}:${key.toString("hex")}`;
}

async function verifyPassword(password: string, stored: string) {
  const [salt, hex] = stored.split(":");
  if (!salt || !hex) return false;
  const key = (await scryptAsync(password, salt, 32)) as Buffer;
  const expected = Buffer.from(hex, "hex");
  if (expected.length !== key.length) return false;
  return timingSafeEqual(expected, key);
}

async function account() {
  const { getSql } = await import("@/lib/db");
  const sql = await getSql();
  const rows = await sql<AdminRow>`select id, username, password_hash from admin_account limit 1`;
  if (rows[0]) return { sql, row: rows[0] };
  const password_hash = await hashPassword("admin");
  await sql`
    insert into admin_account (id, username, password_hash)
    values ('admin', 'admin', ${password_hash})
  `;
  return { sql, row: { id: "admin", username: "admin", password_hash } };
}

export async function readAdminSession() {
  const session = await useSession<{ username: string }>(sessionConfig);
  const username = session.data.username;
  return username ? { username } : null;
}

export async function loginAdminAccount(username: string, password: string) {
  const { sql, row } = await account();
  const name = username.trim();
  const ok = name === row.username && (await verifyPassword(password, row.password_hash));
  if (!ok) return null;
  const session = await useSession<{ username: string }>(sessionConfig);
  await session.update({ username: row.username });
  return { username: row.username };
}

export async function logoutAdminAccount() {
  const session = await useSession<{ username: string }>(sessionConfig);
  await session.clear();
}

export async function updateAdminAccount(input: { currentPassword: string; username: string; newPassword: string }) {
  const session = await useSession<{ username: string }>(sessionConfig);
  if (!session.data.username) return { ok: false as const, error: "Sign in again." };
  const { sql, row } = await account();
  if (!(await verifyPassword(input.currentPassword, row.password_hash))) {
    return { ok: false as const, error: "Current password is not correct." };
  }
  const username = input.username.trim();
  if (!/^[a-zA-Z0-9._-]{3,40}$/.test(username)) {
    return { ok: false as const, error: "Username must be 3–40 letters, numbers, dots, or hyphens." };
  }
  const nextPassword = input.newPassword.trim();
  if (nextPassword && nextPassword.length < 8) {
    return { ok: false as const, error: "New password must be at least 8 characters." };
  }
  const password_hash = nextPassword ? await hashPassword(nextPassword) : row.password_hash;
  await sql`
    update admin_account
    set username = ${username}, password_hash = ${password_hash}, updated_at = now()
    where id = ${row.id}
  `;
  await session.update({ username });
  return { ok: true as const };
}
