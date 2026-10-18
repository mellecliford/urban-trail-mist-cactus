import { divisions, type DivisionKey, type Service, type ServiceCapabilityBrief } from "@/content/site";
import { Doc, bone, cobalt, copper, cyan, ink, muted, white } from "./draw";

const contact = "support@eveopsgroup.com   ·   +237 671 361 513";

function prompts(division: DivisionKey, locale: "en" | "fr") {
  if (locale === "fr") {
    return division === "unity"
      ? ["Quel résultat doit être livré ?", "Quels documents, fichiers ou sources sont disponibles ?", "Quelles sont les exigences de qualité ou de validation ?", "Quel volume, calendrier et point de remise prévoir ?"]
      : ["Qu’est-ce qui doit mieux fonctionner après ce projet ?", "Quels utilisateurs et quel flux de travail sont concernés ?", "Quels systèmes, intégrations ou contraintes doivent être respectés ?", "Quel calendrier, quelles priorités et quel point de décision prévoir ?"];
  }
  return division === "unity"
    ? ["What needs to be delivered?", "Which materials, files, or sources are available?", "What quality or review standard applies?", "What volume, timing, and handover point should we plan for?"]
    : ["What should work better after this project?", "Which users and workflow are involved?", "Which systems, integrations, or constraints must be respected?", "What timing, priorities, and decision point should we plan for?"];
}

function lines(doc: Doc, x: number, width: number, count: number) {
  for (let i = 0; i < count; i++) {
    doc.y += 18;
    doc.stroke(x, doc.y, width, 0.45, [0.78, 0.81, 0.85]);
  }
  doc.y += 8;
}

export function buildWorkingBrief(division: DivisionKey, service: Service, brief: ServiceCapabilityBrief, locale: "en" | "fr") {
  const fr = locale === "fr";
  const divisionName = divisions[division].name;
  const accent = division === "unity" ? copper : cyan;
  const doc = new Doc({
    title: `${brief.briefLabel} — ${fr ? "Brief de travail" : "Working brief"}`,
    subject: `${divisionName} · ${service.title}`,
  });
  const questions = prompts(division, locale);

  doc.start();
  doc.rect(0, 0, doc.W, 118, ink);
  doc.rect(0, 118, doc.W, 4, accent);
  doc.tracked(fr ? "BRIEF DE TRAVAIL" : "WORKING BRIEF", 40, 28, 8, 42, { bold: true, color: accent });
  doc.textRight(division === "unity" ? "UNITY" : "EVEDEV OPS", doc.W - 40, 28, 8, { bold: true, color: white });
  doc.text(brief.title, 40, 48, 18, { bold: true, color: white });
  doc.text(`${divisionName}   ·   ${service.title}`, 40, 78, 9, { color: [0.76, 0.83, 0.92] });
  doc.text(fr ? "Document à compléter. Un brief en ligne suffit aussi." : "A document to complete. An online brief is equally welcome.", 40, 96, 8, { color: [0.62, 0.7, 0.82] });

  doc.y = 146;
  doc.tracked(fr ? "OBJET" : "PURPOSE", 40, doc.y, 8, 36, { bold: true, color: cobalt });
  doc.y += 16;
  doc.paragraph(brief.description, 40, 515, 11, 15.5);
  doc.y += 4;
  doc.paragraph(brief.detail, 40, 515, 10, 14.5, { color: muted });

  doc.y += 16;
  doc.tracked(fr ? "QUESTIONS DE DÉPART" : "STARTING QUESTIONS", 40, doc.y, 8, 36, { bold: true, color: cobalt });
  doc.y += 8;
  questions.forEach((question, index) => {
    doc.y += 16;
    doc.text(String(index + 1).padStart(2, "0"), 40, doc.y, 9, { bold: true, color: accent });
    doc.text(question, 64, doc.y, 10.5, { bold: true });
    lines(doc, 64, doc.W - 104, 2);
  });

  doc.y += 6;
  doc.stroke(40, doc.H - 40, doc.W - 80, 0.4, [0.78, 0.81, 0.85]);
  doc.text(contact, 40, doc.H - 28, 8, { color: muted });
  doc.textRight(fr ? "01 / 02" : "01 / 02", doc.W - 40, doc.H - 28, 8, { color: muted });

  doc.start();
  doc.rect(0, 0, doc.W, 36, ink);
  doc.text(brief.title, 40, 12, 10, { bold: true, color: white });
  doc.textRight("02 / 02", doc.W - 40, 13, 8, { color: accent });
  doc.y = 60;
  doc.tracked(fr ? "CONTEXTE" : "CONTEXT", 40, doc.y, 8, 36, { bold: true, color: cobalt });
  doc.y += 18;

  const fields = fr
    ? ["Organisation", "Contact principal", "E-mail", "Téléphone", "Mode de réponse préféré"]
    : ["Organization", "Main contact", "Email", "Phone", "Preferred response"];
  for (const field of fields) {
    doc.text(field, 40, doc.y, 9, { bold: true, color: muted });
    doc.y += 6;
    lines(doc, 40, doc.W - 80, 1);
    doc.y += 6;
  }

  doc.y += 6;
  doc.tracked(fr ? "NOTES" : "NOTES", 40, doc.y, 8, 36, { bold: true, color: cobalt });
  lines(doc, 40, doc.W - 80, 7);

  doc.rect(40, doc.y + 8, doc.W - 80, 72, bone);
  doc.rect(40, doc.y + 8, 3, 72, cobalt);
  doc.y += 20;
  doc.text(fr ? "Ce modèle est facultatif." : "This template is optional.", 56, doc.y, 10, { bold: true });
  doc.y += 16;
  doc.paragraph(
    fr
      ? "Vous pouvez le remplir et le joindre à votre message, ou envoyer le brief en ligne avec votre nom, votre e-mail et une courte description. N’ajoutez que ce qui aide à préparer une première réponse."
      : "Complete it and attach it to your note, or send the online brief with your name, email, and a short description. Include only what helps prepare a useful first response.",
    56,
    doc.W - 120,
    9.5,
    13,
    { color: muted },
  );

  doc.stroke(40, doc.H - 40, doc.W - 80, 0.4, [0.78, 0.81, 0.85]);
  doc.text("eveOps Group", 40, doc.H - 28, 8, { bold: true, color: muted });
  doc.textRight(contact, doc.W - 40, doc.H - 28, 8, { color: muted });
  return doc.bytes();
}
