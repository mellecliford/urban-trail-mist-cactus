import { sanitizeText } from "@/lib/formSecurity";

export type LeadRecord = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  country?: string;
  division: string;
  service?: string;
  message: string;
  estimatedVolume?: string;
  deadline?: string;
  preferredCommunication?: string;
  createdAt: string;
};

const KEY = "eveops-leads";

function clip(value: string | undefined, max: number) {
  return sanitizeText(value ?? "").slice(0, max);
}

export function saveLead(lead: Omit<LeadRecord, "createdAt">) {
  if (typeof window === "undefined") return;
  const next: LeadRecord = {
    name: clip(lead.name, 120),
    email: clip(lead.email, 180),
    company: clip(lead.company, 160) || undefined,
    phone: clip(lead.phone, 40) || undefined,
    country: clip(lead.country, 80) || undefined,
    division: clip(lead.division, 40),
    service: clip(lead.service, 160) || undefined,
    message: clip(lead.message, 4000),
    estimatedVolume: clip(lead.estimatedVolume, 160) || undefined,
    deadline: clip(lead.deadline, 120) || undefined,
    preferredCommunication: clip(lead.preferredCommunication, 80) || undefined,
    createdAt: new Date().toISOString(),
  };
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || "[]") as unknown;
    const prev = Array.isArray(parsed) ? (parsed as LeadRecord[]) : [];
    localStorage.setItem(KEY, JSON.stringify([next, ...prev].slice(0, 50)));
  } catch {
    /* ignore quota */
  }
}
