import { z } from "zod";

function text(fr: boolean, en: string, french: string) {
  return fr ? french : en;
}

/** Strip tags, even when they are nested to survive one pass, and control characters. */
export function sanitizeText(value: string) {
  let next = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
  for (let pass = 0; pass < 6; pass += 1) {
    const stripped = next.replace(/<[^>]*>/g, "");
    if (stripped === next) break;
    next = stripped;
  }
  return next.replace(/[<>]/g, "").replace(/\s+/g, " ").trim();
}

const phoneOk = (value: string) => {
  if (!value) return true;
  const digits = value.replace(/\D/g, "");
  return /^[+\d\s().-]{7,40}$/.test(value) && digits.length >= 7 && digits.length <= 15;
};

export function enquirySchema(fr: boolean) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(2, text(fr, "Name must be at least 2 characters.", "Le nom doit contenir au moins 2 caractères."))
      .max(120, text(fr, "Name is too long.", "Le nom est trop long."))
      .regex(/^[\p{L}\p{M}\s.'-]+$/u, text(fr, "Use letters in the name.", "Utilisez des lettres dans le nom.")),
    email: z
      .string()
      .trim()
      .email(text(fr, "Enter a valid email address.", "Entrez une adresse e-mail valide."))
      .max(180)
      .transform((value) => value.toLowerCase()),
    phone: z
      .string()
      .trim()
      .max(40)
      .refine(phoneOk, text(fr, "Enter a valid phone number, or leave it blank.", "Entrez un numéro valide, ou laissez le champ vide.")),
    message: z
      .string()
      .trim()
      .min(10, text(fr, "Describe the work in at least 10 characters.", "Décrivez le travail en au moins 10 caractères."))
      .max(4000, text(fr, "The message is too long.", "Le message est trop long.")),
    company: z.string().trim().max(160).optional(),
    country: z.string().trim().max(80).optional(),
    service: z.string().trim().max(160).optional(),
    volume: z.string().trim().max(160).optional(),
    deadline: z.string().trim().max(120).optional(),
    communication: z.string().trim().max(80).optional(),
  });
}

export function fieldErrors(error: z.ZodError) {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}
