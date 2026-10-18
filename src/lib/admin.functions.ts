import { createServerFn } from "@tanstack/react-start";

const attempts = new Map<string, { count: number; until: number }>();

function clientKey() {
  return "studio";
}

export const getAdminSession = createServerFn({ method: "GET" }).handler(async () => {
  const { readAdminSession } = await import("@/lib/admin.session.server");
  return readAdminSession();
});

export const loginAdmin = createServerFn({ method: "POST" })
  .validator((input: unknown) => input)
  .handler(async ({ data }) => {
    const now = Date.now();
    const gate = attempts.get(clientKey());
    if (gate && gate.count >= 6 && gate.until > now) return { ok: false as const, error: "Too many attempts. Wait a moment and try again." };
    const raw = data && typeof data === "object" ? (data as Record<string, unknown>) : {};
    const { loginAdminAccount } = await import("@/lib/admin.session.server");
    const user = await loginAdminAccount(String(raw.username ?? ""), String(raw.password ?? ""));
    if (!user) {
      const count = gate && gate.until > now ? gate.count + 1 : 1;
      attempts.set(clientKey(), { count, until: now + (count >= 6 ? 30_000 : 60_000) });
      return { ok: false as const, error: "Those details are not correct." };
    }
    attempts.delete(clientKey());
    return { ok: true as const, username: user.username };
  });

export const logoutAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const { logoutAdminAccount } = await import("@/lib/admin.session.server");
  await logoutAdminAccount();
  return { ok: true as const };
});

export const saveAdminSettings = createServerFn({ method: "POST" })
  .validator((input: unknown) => input)
  .handler(async ({ data }) => {
    const raw = data && typeof data === "object" ? (data as Record<string, unknown>) : {};
    const { updateAdminAccount } = await import("@/lib/admin.session.server");
    return updateAdminAccount({
      currentPassword: String(raw.currentPassword ?? ""),
      username: String(raw.username ?? ""),
      newPassword: String(raw.newPassword ?? ""),
    });
  });
