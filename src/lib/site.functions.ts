import { createServerFn } from "@tanstack/react-start";
import { enquirySchema } from "@/lib/formSecurity";
import { defaultContact, resolveChannel, type PublicContact } from "@/lib/site-settings";

type SettingsRow = {
  group_email: string;
  group_phone: string;
  group_whatsapp: string;
  group_address: string;
  group_hours: string;
  unity_hours: string;
  edevops_hours: string;
  unity_notify: string;
  edevops_notify: string;
  unity_email: string;
  unity_phone: string;
  unity_whatsapp: string;
  unity_address: string;
  edevops_email: string;
  edevops_phone: string;
  edevops_whatsapp: string;
  edevops_address: string;
  notify_email: string;
  smtp_host: string;
  smtp_port: number;
  smtp_user: string;
  smtp_password: string;
  smtp_from: string;
  smtp_secure: boolean;
  smtp_enabled: boolean;
};

const hits = new Map<string, { count: number; until: number }>();

function clip(value: unknown, max: number) {
  return String(value ?? "").replace(/[<>]/g, "").trim().slice(0, max);
}

function channel(email: string, phone: string, whatsapp: string, address: string) {
  return { email, phone, whatsapp, address };
}

function toPublic(row: SettingsRow): PublicContact {
  const group = {
    ...channel(row.group_email, row.group_phone, row.group_whatsapp, row.group_address),
    hours: row.group_hours,
  };
  const unity = resolveChannel(channel(row.unity_email, row.unity_phone, row.unity_whatsapp, row.unity_address), group);
  const edevops = resolveChannel(channel(row.edevops_email, row.edevops_phone, row.edevops_whatsapp, row.edevops_address), group);
  return {
    group,
    unity: { ...unity, hours: row.unity_hours || group.hours },
    edevops: { ...edevops, hours: row.edevops_hours || group.hours },
  };
}

async function loadSettings() {
  const { getSql } = await import("@/lib/db");
  const sql = await getSql();
  const rows = await sql<SettingsRow>`select * from site_settings where id = 'site' limit 1`;
  if (rows[0]) return { sql, row: rows[0] };
  const seed = defaultContact;
  await sql`
    insert into site_settings (
      id, group_email, group_phone, group_whatsapp, group_address, group_hours
    ) values (
      'site', ${seed.group.email}, ${seed.group.phone}, '', '', ''
    )
  `;
  const created = await sql<SettingsRow>`select * from site_settings where id = 'site' limit 1`;
  return { sql, row: created[0] };
}

async function requireAdmin() {
  const { readAdminSession } = await import("@/lib/admin.session.server");
  const session = await readAdminSession();
  if (!session) throw new Error("Unauthorized");
}

export const getPublicContact = createServerFn({ method: "GET" }).handler(async () => {
  const { row } = await loadSettings();
  return toPublic(row);
});

export const getStudioSettings = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const { row } = await loadSettings();
  return {
    contact: {
      groupEmail: row.group_email,
      groupPhone: row.group_phone,
      groupWhatsapp: row.group_whatsapp,
      groupAddress: row.group_address,
      groupHours: row.group_hours,
      unityEmail: row.unity_email,
      unityPhone: row.unity_phone,
      unityWhatsapp: row.unity_whatsapp,
      unityAddress: row.unity_address,
      unityHours: row.unity_hours,
      unityNotify: row.unity_notify,
      edevopsEmail: row.edevops_email,
      edevopsPhone: row.edevops_phone,
      edevopsWhatsapp: row.edevops_whatsapp,
      edevopsAddress: row.edevops_address,
      edevopsHours: row.edevops_hours,
      edevopsNotify: row.edevops_notify,
      notifyEmail: row.notify_email,
    },
    smtp: {
      host: row.smtp_host,
      port: Number(row.smtp_port) || 587,
      user: row.smtp_user,
      from: row.smtp_from,
      secure: row.smtp_secure === true,
      enabled: row.smtp_enabled === true,
      hasPassword: Boolean(row.smtp_password),
    },
  };
});

export const saveContactSettings = createServerFn({ method: "POST" })
  .validator((input: unknown) => input)
  .handler(async ({ data }) => {
    await requireAdmin();
    const raw = data && typeof data === "object" ? (data as Record<string, unknown>) : {};
    const email = (value: unknown) => {
      const next = clip(value, 180);
      if (next && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next)) return null;
      return next;
    };
    const groupEmail = email(raw.groupEmail);
    const notifyEmail = email(raw.notifyEmail);
    const unityEmail = email(raw.unityEmail);
    const edevopsEmail = email(raw.edevopsEmail);
    const unityNotify = email(raw.unityNotify);
    const edevopsNotify = email(raw.edevopsNotify);
    if (groupEmail === null || notifyEmail === null || unityEmail === null || edevopsEmail === null || unityNotify === null || edevopsNotify === null) {
      return { ok: false as const, error: "Check the email addresses." };
    }
    if (!groupEmail) return { ok: false as const, error: "The group needs an email address." };
    const { sql } = await loadSettings();
    await sql`
      update site_settings set
        group_email = ${groupEmail},
        group_phone = ${clip(raw.groupPhone, 40)},
        group_whatsapp = ${clip(raw.groupWhatsapp, 40)},
        group_address = ${clip(raw.groupAddress, 240)},
        group_hours = ${clip(raw.groupHours, 120)},
        unity_email = ${unityEmail},
        unity_phone = ${clip(raw.unityPhone, 40)},
        unity_whatsapp = ${clip(raw.unityWhatsapp, 40)},
        unity_address = ${clip(raw.unityAddress, 240)},
        unity_hours = ${clip(raw.unityHours, 120)},
        unity_notify = ${unityNotify},
        edevops_email = ${edevopsEmail},
        edevops_phone = ${clip(raw.edevopsPhone, 40)},
        edevops_whatsapp = ${clip(raw.edevopsWhatsapp, 40)},
        edevops_address = ${clip(raw.edevopsAddress, 240)},
        edevops_hours = ${clip(raw.edevopsHours, 120)},
        edevops_notify = ${edevopsNotify},
        notify_email = ${notifyEmail}
      where id = 'site'
    `;
    return { ok: true as const };
  });

export const saveSmtpSettings = createServerFn({ method: "POST" })
  .validator((input: unknown) => input)
  .handler(async ({ data }) => {
    await requireAdmin();
    const raw = data && typeof data === "object" ? (data as Record<string, unknown>) : {};
    const host = clip(raw.host, 180);
    const port = Number(raw.port);
    if (raw.enabled && !host) return { ok: false as const, error: "Add the mail server host before turning mail on." };
    if (!Number.isInteger(port) || port < 1 || port > 65535) return { ok: false as const, error: "Port must be between 1 and 65535." };
    const { sql, row } = await loadSettings();
    const password = String(raw.password ?? "").slice(0, 200);
    let stored = row.smtp_password;
    if (password) {
      const { sealSecret } = await import("@/lib/mail.server");
      stored = sealSecret(password);
    }
    await sql`
      update site_settings set
        smtp_host = ${host},
        smtp_port = ${port},
        smtp_user = ${clip(raw.user, 180)},
        smtp_password = ${stored},
        smtp_from = ${clip(raw.from, 180)},
        smtp_secure = ${raw.secure === true},
        smtp_enabled = ${raw.enabled === true}
      where id = 'site'
    `;
    return { ok: true as const };
  });

async function mailConfig(row: SettingsRow) {
  const { openSecret } = await import("@/lib/mail.server");
  return {
    host: row.smtp_host,
    port: Number(row.smtp_port) || 587,
    user: row.smtp_user,
    password: row.smtp_password ? openSecret(row.smtp_password) : "",
    from: row.smtp_from || row.group_email,
    secure: row.smtp_secure === true,
  };
}

export const sendTestEmail = createServerFn({ method: "POST" }).handler(async () => {
  await requireAdmin();
  const { row } = await loadSettings();
  const to = row.notify_email || row.group_email;
  if (!row.smtp_host || !to) return { ok: false as const, error: "Add a mail server and an inbox first." };
  try {
    const { sendMail } = await import("@/lib/mail.server");
    await sendMail(await mailConfig(row), {
      to,
      subject: "eveOps studio test",
      text: "This is a test from the eveOps studio. Mail is reaching the inbox you set.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Mail could not be sent.";
    return { ok: false as const, error: message.slice(0, 180) };
  }
  return { ok: true as const };
});

export const submitEnquiry = createServerFn({ method: "POST" })
  .validator((input: unknown) => input)
  .handler(async ({ data }) => {
    const now = Date.now();
    const gate = hits.get("enquiry");
    if (gate && gate.count >= 12 && gate.until > now) return { ok: false as const, error: "Please wait a moment before sending another brief." };
    const parsed = enquirySchema(false).safeParse(data);
    if (!parsed.success) return { ok: false as const, error: parsed.error.issues[0]?.message || "Check the form." };
    const raw = data && typeof data === "object" ? (data as Record<string, unknown>) : {};
    const division = raw.division === "unity" || raw.division === "edevops" ? raw.division : "group";
    const item = parsed.data;
    const { sql, row } = await loadSettings();
    const id = crypto.randomUUID();
    await sql`
      insert into customers (
        id, name, email, company, phone, country, division, service, message, volume, deadline, communication
      ) values (
        ${id}, ${item.name}, ${item.email}, ${item.company || ""}, ${item.phone || ""}, ${item.country || ""},
        ${division}, ${item.service || ""}, ${item.message}, ${item.volume || ""}, ${item.deadline || ""}, ${item.communication || ""}
      )
    `;
    hits.set("enquiry", { count: gate && gate.until > now ? gate.count + 1 : 1, until: now + 10 * 60 * 1000 });
    let mailed = false;
    if (row.smtp_enabled && row.smtp_host) {
      const to =
        division === "unity"
          ? row.unity_notify || row.notify_email || row.group_email
          : division === "edevops"
            ? row.edevops_notify || row.notify_email || row.group_email
            : row.notify_email || row.group_email;
      try {
        const { sendMail } = await import("@/lib/mail.server");
        await sendMail(await mailConfig(row), {
          to,
          replyTo: item.email,
          subject: `New ${division} enquiry from ${item.name}`,
          text: [
            `Name: ${item.name}`,
            `Email: ${item.email}`,
            item.phone ? `Phone: ${item.phone}` : "",
            item.company ? `Organisation: ${item.company}` : "",
            item.country ? `Country: ${item.country}` : "",
            `Division: ${division}`,
            item.service ? `Service: ${item.service}` : "",
            item.volume ? `Volume: ${item.volume}` : "",
            item.deadline ? `Timing: ${item.deadline}` : "",
            "",
            item.message,
          ]
            .filter(Boolean)
            .join("\n"),
        });
        mailed = true;
      } catch {
        mailed = false;
      }
    }
    return { ok: true as const, mailed };
  });

export type Customer = {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  country: string;
  division: string;
  service: string;
  message: string;
  volume: string;
  deadline: string;
  communication: string;
  status: string;
  notes: string;
  createdAt: string;
};

export const listCustomers = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdmin();
  const { getSql } = await import("@/lib/db");
  const sql = await getSql();
  const rows = await sql<{
    id: string;
    name: string;
    email: string;
    company: string;
    phone: string;
    country: string;
    division: string;
    service: string;
    message: string;
    volume: string;
    deadline: string;
    communication: string;
    status: string;
    notes: string;
    created_at: string;
  }>`
    select id, name, email, company, phone, country, division, service, message, volume, deadline, communication, status, notes, created_at
    from customers
    order by created_at desc
    limit 200
  `;
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    company: row.company,
    phone: row.phone,
    country: row.country,
    division: row.division,
    service: row.service,
    message: row.message,
    volume: row.volume,
    deadline: row.deadline,
    communication: row.communication,
    status: row.status,
    notes: row.notes,
    createdAt: String(row.created_at),
  }));
});

export const updateCustomer = createServerFn({ method: "POST" })
  .validator((input: unknown) => input)
  .handler(async ({ data }) => {
    await requireAdmin();
    const raw = data && typeof data === "object" ? (data as Record<string, unknown>) : {};
    const id = clip(raw.id, 80);
    const status = raw.status === "replied" || raw.status === "closed" ? raw.status : "new";
    if (!id) return { ok: false as const, error: "Missing customer." };
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    await sql`update customers set status = ${status}, notes = ${clip(raw.notes, 2000)} where id = ${id}`;
    return { ok: true as const };
  });

export const deleteCustomer = createServerFn({ method: "POST" })
  .validator((id: string) => clip(id, 80))
  .handler(async ({ data }) => {
    await requireAdmin();
    if (!data) return { ok: false as const, error: "Missing customer." };
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    await sql`delete from customers where id = ${data}`;
    return { ok: true as const };
  });

export const bulkCustomers = createServerFn({ method: "POST" })
  .validator((input: unknown) => input)
  .handler(async ({ data }) => {
    await requireAdmin();
    const raw = data && typeof data === "object" ? (data as Record<string, unknown>) : {};
    const ids = Array.isArray(raw.ids) ? raw.ids.map((id) => clip(id, 80)).filter(Boolean).slice(0, 200) : [];
    if (!ids.length) return { ok: false as const, error: "Select at least one enquiry." };
    const action = String(raw.action || "");
    const status = raw.status === "replied" || raw.status === "closed" || raw.status === "new" ? raw.status : "";
    const division = raw.division === "unity" || raw.division === "edevops" || raw.division === "group" ? raw.division : "";
    if (action === "status" && !status) return { ok: false as const, error: "Choose a status." };
    if (action === "division" && !division) return { ok: false as const, error: "Choose a division." };
    if (action !== "status" && action !== "division" && action !== "delete") return { ok: false as const, error: "That action is not available." };
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    for (const id of ids) {
      if (action === "delete") await sql`delete from customers where id = ${id}`;
      if (action === "status") await sql`update customers set status = ${status} where id = ${id}`;
      if (action === "division") await sql`update customers set division = ${division} where id = ${id}`;
    }
    return { ok: true as const, count: ids.length };
  });
