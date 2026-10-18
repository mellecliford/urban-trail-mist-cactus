import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from "node:crypto";
import nodemailer from "nodemailer";

const secret =
  process.env.ADMIN_SESSION_SECRET && process.env.ADMIN_SESSION_SECRET.length >= 32
    ? process.env.ADMIN_SESSION_SECRET
    : "eveops-group-admin-session-v1-key";

function key() {
  return scryptSync(secret, "eveops-smtp", 32);
}

export function sealSecret(value: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key(), iv);
  const body = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  return `v1:${iv.toString("hex")}:${cipher.getAuthTag().toString("hex")}:${body.toString("hex")}`;
}

export function openSecret(value: string) {
  if (!value.startsWith("v1:")) return value;
  const [, iv, tag, body] = value.split(":");
  if (!iv || !tag || !body) return "";
  const decipher = createDecipheriv("aes-256-gcm", key(), Buffer.from(iv, "hex"));
  decipher.setAuthTag(Buffer.from(tag, "hex"));
  return Buffer.concat([decipher.update(Buffer.from(body, "hex")), decipher.final()]).toString("utf8");
}

export type MailConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  from: string;
  secure: boolean;
};

export async function sendMail(config: MailConfig, message: { to: string; replyTo?: string; subject: string; text: string }) {
  const transport = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure || config.port === 465,
    auth: config.user ? { user: config.user, pass: config.password } : undefined,
  });
  await transport.sendMail({
    from: config.from || config.user,
    to: message.to,
    replyTo: message.replyTo,
    subject: message.subject,
    text: message.text,
  });
}
