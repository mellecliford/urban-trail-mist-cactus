import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { useSession } from "@tanstack/react-start/server";

const scryptAsync = promisify(scrypt);
const SESSION_PASSWORD =
  process.env.ADMIN_SESSION_SECRET && process.env.ADMIN_SESSION_SECRET.length >= 32
    ? process.env.ADMIN_SESSION_SECRET
    : "eveops-group-desk-session-v1-key!!";

const sessionConfig = {
  password: SESSION_PASSWORD,
  name: "eveops-member",
  maxAge: 60 * 60 * 24 * 60,
  cookie: {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  },
};

type Member = { id: string; username: string };

export async function hashDeskPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const key = (await scryptAsync(password, salt, 32)) as Buffer;
  return `${salt}:${key.toString("hex")}`;
}

export async function verifyDeskPassword(password: string, stored: string) {
  const [salt, hex] = stored.split(":");
  if (!salt || !hex) return false;
  const key = (await scryptAsync(password, salt, 32)) as Buffer;
  const expected = Buffer.from(hex, "hex");
  if (expected.length !== key.length) return false;
  return timingSafeEqual(expected, key);
}

export async function readDeskSession(): Promise<Member | null> {
  const session = await useSession<Member>(sessionConfig);
  if (!session.data.id || !session.data.username) return null;
  return { id: session.data.id, username: session.data.username };
}

export async function writeDeskSession(member: Member) {
  const session = await useSession<Member>(sessionConfig);
  await session.update(member);
}

export async function clearDeskSession() {
  const session = await useSession<Member>(sessionConfig);
  await session.clear();
}
