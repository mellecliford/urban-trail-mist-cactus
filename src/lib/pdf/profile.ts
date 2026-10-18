import { divisions, getServiceDisplay } from "@/content/site";
import { Doc, bone, cobalt, copper, cyan, ink, muted, white, type RGB } from "./draw";

const contact = "support@eveopsgroup.com   ·   +237 671 361 513";

const copy = {
  en: {
    kicker: "COMPANY PROFILE",
    year: "2026",
    statement: "One group. Two ways to build what comes next.",
    deck: "eveOps Group is a multidisciplinary operations and technology group. It brings professional human expertise and software engineering together without collapsing them into one offering.",
    facts: [
      ["01", "Divisions", "Unity Integrated Solutions and eveDev Ops"],
      ["02", "Model", "Professional services and engineered systems"],
      ["03", "Start", "A clear brief, then the right division"],
    ],
    unityLine: "Professional workforce and business services across language, AI data, research, operations, and procurement.",
    eveLine: "Software engineering and digital products across web, mobile, SaaS, AI, automation, cloud, and APIs.",
    groupTitle: "The group",
    groupLead: "Independent disciplines work better when their roles are clear. Each division has its own area of focus and the same standard for thoughtful delivery.",
    groupBody: "The group structure creates a direct route into each division, and leaves room for professional services and technology to support one another when a project needs both.",
    principlesTitle: "Operating principles",
    principles: ["Clarity in the brief.", "Care in the build.", "Focus on the delivery."],
    startTitle: "How a project starts",
    starts: [
      "Name the outcome. What needs to be delivered, or what should work better afterwards.",
      "Share the inputs. Materials, users, systems, languages, or the workflow as it stands.",
      "Set the quality bar. Acceptance criteria, review, or the decision the work must support.",
      "Give the timing. The first useful date, and any fixed handover or launch point.",
    ],
    servicesIntro: "The division is engaged directly. These are the service lines a brief can start from.",
    shweng: "Shweng is a cross-network exchange application in development by eveDev Ops. It is a product of the group, not a client engagement. Product detail stays high-level until the work is ready to say more.",
    closeTitle: "Talk to the group",
    close: "Use the division that owns the work. Unity for professional services. eveDev Ops for software, AI, and digital products. If a project needs both, say so in the first note. There is no need to arrive with a finished specification.",
    footer: "Company profile",
    pageWord: "Page",
  },
  fr: {
    kicker: "PROFIL DU GROUPE",
    year: "2026",
    statement: "Un groupe. Deux façons de construire la suite.",
    deck: "eveOps Group est un groupe pluridisciplinaire d’opérations et de technologie. Il réunit expertise professionnelle et ingénierie logicielle sans les réduire à une seule offre.",
    facts: [
      ["01", "Divisions", "Unity Integrated Solutions et eveDev Ops"],
      ["02", "Modèle", "Services professionnels et systèmes conçus"],
      ["03", "Départ", "Un brief clair, puis la bonne division"],
    ],
    unityLine: "Services professionnels et équipes pour les langues, les données IA, la recherche, les opérations et les achats.",
    eveLine: "Ingénierie logicielle et produits numériques : web, mobile, SaaS, IA, automatisation, cloud et API.",
    groupTitle: "Le groupe",
    groupLead: "Des disciplines indépendantes fonctionnent mieux lorsque leurs rôles sont clairs. Chaque division a son domaine et le même niveau d’exigence pour une livraison réfléchie.",
    groupBody: "La structure du groupe ouvre un accès direct à chaque division, tout en laissant les services professionnels et la technologie se soutenir lorsqu’un projet a besoin des deux.",
    principlesTitle: "Principes opérationnels",
    principles: ["De la clarté dans le brief.", "Du soin dans la réalisation.", "Une attention à la livraison."],
    startTitle: "Comment un projet commence",
    starts: [
      "Nommer le résultat. Ce qui doit être livré, ou ce qui doit mieux fonctionner ensuite.",
      "Partager les éléments. Documents, utilisateurs, systèmes, langues, ou le flux tel qu’il existe.",
      "Fixer le niveau de qualité. Critères d’acceptation, revue, ou décision que le travail doit éclairer.",
      "Donner le calendrier. La première date utile, et tout point de remise ou de lancement.",
    ],
    servicesIntro: "La division se saisit directement. Voici les lignes de service par lesquelles un brief peut commencer.",
    shweng: "Shweng est une application d’échange inter-réseaux en développement chez eveDev Ops. C’est un produit du groupe, pas une mission client. Le détail reste volontairement synthétique tant que le travail n’est pas prêt à en dire plus.",
    closeTitle: "Échanger avec le groupe",
    close: "Adressez-vous à la division qui porte le travail. Unity pour les services professionnels. eveDev Ops pour le logiciel, l’IA et les produits numériques. Si un projet a besoin des deux, dites-le dès la première note. Une spécification déjà close n’est pas nécessaire.",
    footer: "Profil du groupe",
    pageWord: "Page",
  },
} as const;

function chrome(doc: Doc, label: string, page: number, total: number, footer: string) {
  doc.rect(0, 0, 14, doc.H, ink);
  doc.rect(14, 0, 3, doc.H, cobalt);
  doc.text("eveOps Group", 40, 32, 9, { bold: true, color: ink });
  doc.textRight(label, doc.W - 40, 32, 9, { color: muted });
  doc.stroke(40, 50, doc.W - 80, 0.6, ink);
  doc.stroke(40, doc.H - 42, doc.W - 80, 0.4, [0.75, 0.78, 0.82]);
  doc.text(contact, 40, doc.H - 30, 8, { color: muted });
  doc.textRight(`${footer}  ${String(page).padStart(2, "0")} / ${String(total).padStart(2, "0")}`, doc.W - 40, doc.H - 30, 8, { color: muted });
  doc.y = 74;
}

function serviceList(doc: Doc, key: "unity" | "edevops", locale: "en" | "fr", accent: RGB) {
  const division = divisions[key];
  division.services.forEach((service, index) => {
    const display = getServiceDisplay(key, service, locale);
    const top = doc.y;
    doc.text(String(index + 1).padStart(2, "0"), 40, top, 9, { bold: true, color: accent });
    doc.text(display.title, 68, top - 2, 12, { bold: true });
    doc.y = top + 16;
    doc.paragraph(display.summary, 68, 450, 9.5, 13, { color: muted });
    doc.y += 8;
    doc.stroke(68, doc.y - 6, doc.W - 108, 0.4, [0.86, 0.88, 0.9]);
  });
}

export function buildCompanyProfile(locale: "en" | "fr") {
  const t = copy[locale];
  const doc = new Doc({
    title: locale === "fr" ? "eveOps Group - Profil du groupe" : "eveOps Group - Company profile",
    subject: t.deck,
  });

  doc.start();
  doc.rect(0, 0, doc.W, doc.H, bone);
  doc.rect(0, 0, 14, doc.H, ink);
  doc.rect(14, 0, 3, doc.H, cobalt);
  doc.tracked(t.kicker, 40, 42, 9, 46, { bold: true, color: cobalt });
  doc.textRight(t.year, doc.W - 40, 42, 9, { bold: true, color: muted });
  doc.mark(40, 78, 36, false);
  doc.text("eveOps", 86, 80, 22, { bold: true });
  doc.text("Group", 168, 86, 12, { color: cobalt });
  doc.stroke(40, 128, 86, 2, cobalt);

  doc.y = 156;
  const lines = t.statement.split(". ");
  doc.text(lines[0] + (lines.length > 1 ? "." : ""), 40, doc.y, 26, { bold: true });
  doc.y += 32;
  if (lines[1]) {
    doc.text(lines.slice(1).join(". "), 40, doc.y, 26, { bold: true });
    doc.y += 40;
  }
  doc.paragraph(t.deck, 40, 470, 11, 16, { color: muted });

  doc.y += 14;
  const col = 168;
  t.facts.forEach((fact, i) => {
    const x = 40 + i * col;
    doc.stroke(x, doc.y, 28, 2, i === 2 ? copper : cobalt);
    doc.text(fact[0], x, doc.y + 12, 8, { bold: true, color: cobalt });
    doc.text(fact[1], x, doc.y + 26, 11, { bold: true });
    doc.y += 0;
    const hold = doc.y;
    doc.y = hold + 42;
    doc.paragraph(fact[2], x, 150, 8.5, 11.5, { color: muted });
    doc.y = hold;
  });

  doc.rect(0, 560, doc.W, 282, ink);
  doc.rect(14, 560, 3, 282, cyan);
  doc.text("01", 40, 586, 9, { bold: true, color: cyan });
  doc.text("Unity Integrated Solutions", 40, 602, 14, { bold: true, color: white });
  doc.y = 626;
  doc.paragraph(t.unityLine, 40, 240, 9.5, 13, { color: [0.78, 0.84, 0.92] });
  doc.text("02", 320, 586, 9, { bold: true, color: cyan });
  doc.text("eveDev Ops", 320, 602, 14, { bold: true, color: white });
  const saved = doc.y;
  doc.y = 626;
  doc.paragraph(t.eveLine, 320, 230, 9.5, 13, { color: [0.78, 0.84, 0.92] });
  doc.y = saved;
  doc.stroke(40, 760, doc.W - 80, 0.4, [0.2, 0.28, 0.4]);
  doc.text(contact, 40, 776, 9, { color: cyan });
  doc.textRight(t.footer, doc.W - 40, 776, 8, { color: [0.62, 0.7, 0.8] });

  doc.start();
  chrome(doc, t.footer, 2, 4, t.pageWord);
  doc.tracked("01", 40, doc.y, 9, 40, { bold: true, color: cobalt });
  doc.y += 22;
  doc.text(t.groupTitle, 40, doc.y, 22, { bold: true });
  doc.y += 36;
  doc.paragraph(t.groupLead, 40, 500, 12, 17);
  doc.y += 8;
  doc.paragraph(t.groupBody, 40, 500, 11, 16, { color: muted });
  doc.y += 18;
  doc.tracked(t.principlesTitle.toUpperCase(), 40, doc.y, 8, 36, { bold: true, color: cobalt });
  doc.y += 18;
  t.principles.forEach((principle) => {
    doc.rect(40, doc.y + 3, 8, 8, cobalt);
    doc.text(principle, 58, doc.y, 13, { bold: true });
    doc.y += 24;
  });
  doc.y += 12;
  doc.tracked(t.startTitle.toUpperCase(), 40, doc.y, 8, 36, { bold: true, color: cobalt });
  doc.y += 20;
  t.starts.forEach((item, index) => {
    doc.text(String(index + 1).padStart(2, "0"), 40, doc.y, 9, { bold: true, color: copper });
    const hold = doc.y;
    doc.y = hold - 1;
    doc.paragraph(item, 68, 460, 10.5, 14.5);
    doc.y = Math.max(doc.y, hold + 28) + 6;
  });

  doc.start();
  chrome(doc, "Unity Integrated Solutions", 3, 4, t.pageWord);
  doc.tracked("02", 40, doc.y, 9, 40, { bold: true, color: cobalt });
  doc.y += 22;
  doc.text("Unity Integrated Solutions", 40, doc.y, 20, { bold: true });
  doc.y += 30;
  doc.paragraph(t.servicesIntro, 40, 500, 11, 15, { color: muted });
  doc.y += 12;
  serviceList(doc, "unity", locale, copper);

  doc.start();
  chrome(doc, "eveDev Ops", 4, 4, t.pageWord);
  doc.tracked("03", 40, doc.y, 9, 40, { bold: true, color: cyan });
  doc.y += 22;
  doc.text("eveDev Ops", 40, doc.y, 20, { bold: true });
  doc.y += 30;
  doc.paragraph(t.servicesIntro, 40, 500, 11, 15, { color: muted });
  doc.y += 10;
  serviceList(doc, "edevops", locale, cobalt);

  doc.y += 8;
  const boxTop = doc.y;
  const boxH = locale === "fr" ? 108 : 96;
  doc.rect(40, boxTop, doc.W - 80, boxH, ink);
  doc.text("SHWENG", 56, boxTop + 14, 8, { bold: true, color: cyan });
  doc.y = boxTop + 30;
  doc.paragraph(t.shweng, 56, doc.W - 112, 9, 12.5, { color: white });
  doc.y = boxTop + boxH + 18;
  doc.text(t.closeTitle, 40, doc.y, 14, { bold: true });
  doc.y += 20;
  doc.paragraph(t.close, 40, 500, 10.5, 15, { color: muted });

  return doc.bytes();
}
