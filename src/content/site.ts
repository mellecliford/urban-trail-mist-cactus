/**
 * Meridian Convergence content architecture: structured, extendable division, service, and product data.
 */
export type DivisionKey = "unity" | "edevops";

export type Service = {
  title: string;
  slug: string;
  summary: string;
  capabilities: string[];
  icon: "language" | "data" | "research" | "team" | "procurement" | "content" | "web" | "mobile" | "software" | "ai" | "automation" | "cloud" | "security" | "api";
};

export type LanguageSubservice = {
  title: string;
  briefLabel: string;
  description: string;
  detail: string;
};

export type ServiceCapabilityBrief = {
  title: string;
  canonicalTitle: string;
  briefLabel: string;
  description: string;
  detail: string;
};

export type Division = {
  key: DivisionKey;
  name: string;
  shortName: string;
  eyebrow: string;
  strapline: string;
  description: string;
  image: string;
  services: Service[];
};

export const assets = {
  mark: "/assets/eveops-mark.png",
  unityMark: "/assets/unity-compass-fold-mark.png",
  parentHero: "/assets/eveops-parent-hero.webp",
  unity: "/assets/unity-editorial-operations-hero.webp",
  edevops: "/assets/edevops-engineering.webp",
};

export const brand = {
  name: "eveOps Group",
  shortName: "eveOps",
};

export const languageSubservices: LanguageSubservice[] = [
  { title: "Translation", briefLabel: "Translation", description: "Accurate translation for documents, product content, communications, and operational material.", detail: "We align terminology, tone, target language, and intended use before work begins so the translation supports the decision, publication, or workflow it is meant to serve." },
  { title: "Localization", briefLabel: "Localization", description: "Market-ready adaptation that goes beyond literal language conversion.", detail: "Localization adapts language, currency, formats, cultural references, product context, and user-facing details so the content feels appropriate and functional in its destination market." },
  { title: "Transcreation", briefLabel: "Transcreation", description: "Creative adaptation for messages where impact matters as much as accuracy.", detail: "This is suited to brand, campaign, and high-visibility messaging. The work preserves intent, emotional effect, and strategic meaning while giving the new language permission to work naturally." },
  { title: "Proofreading & editing", briefLabel: "Proofreading & editing", description: "A precise review pass for content that needs clarity, consistency, and confidence.", detail: "We review grammar, punctuation, terminology, style, flow, and consistency against the standards that matter for your audience, brand, or operational use." },
  { title: "Linguistic QA", briefLabel: "Linguistic QA", description: "Structured language quality assurance for content, interfaces, and release-ready material.", detail: "Linguistic QA checks the complete experience: terminology, layout context, truncation, functional text, consistency, and defects that only appear when language meets the final product." },
  { title: "Subtitling & captioning", briefLabel: "Subtitling & captioning", description: "Readable time-coded subtitles and captions for video, training, media, and accessibility needs.", detail: "We work from the source recording and intended audience to shape timing, line length, speaker clarity, localization needs, and the final delivery format." },
];

const capabilityEngagementGuidance: Record<DivisionKey, { description: string; detail: string }> = {
  unity: {
    description: "a focused operational path within a coordinated professional-service delivery",
    detail: "For a focused brief, share the materials or work queue, the expected volume, the quality standard, and the handover point you need. Unity can then assess the most practical support route without asking you for a finished specification.",
  },
  edevops: {
    description: "a focused engineering capability connected to the wider product, system, or operating workflow",
    detail: "For a focused project conversation, share the users or team affected, the current workflow or system, the outcome that matters, and any important integrations or constraints. eveDev Ops can then shape the right technical starting point without requiring a completed feature list.",
  },
};

const serviceCapabilityGuidance: Record<string, { description: string; detail: string }> = {
  "unity:transcription": { description: "a focused transcription task shaped around source quality, speakers, terminology, and the output format", detail: "For a focused transcription brief, share the recording type, languages or speakers, expected accuracy, timestamps or speaker labels, and the use of the finished transcript." },
  "unity:ai-data": { description: "a defined human-in-the-loop task within a controlled annotation or evaluation workflow", detail: "For a focused data-work brief, share the input type, task definition, examples of acceptable and unacceptable output, volume, quality checks, and the required delivery format." },
  "unity:research-data": { description: "a focused research or data operation designed to support a specific decision", detail: "For a focused research brief, share the question to answer, target markets or source types, fields to collect, verification standard, and the format in which the result should be delivered." },
  "unity:virtual-workforce": { description: "a defined support responsibility within a practical operating rhythm", detail: "For a focused workforce brief, share the recurring tasks, tools, volumes, coverage hours, escalation path, and the standard that makes completed work ready for handover." },
  "unity:content-services": { description: "a structured content operation with a defined review, classification, or publishing purpose", detail: "For a focused content brief, share the content type, rules or examples, quality threshold, volume, edge cases, and where completed items should return in the workflow." },
  "unity:procurement": { description: "a focused sourcing or supplier-comparison workstream built around your decision criteria", detail: "For a focused procurement brief, share the sourcing objective, markets or regions, supplier criteria, comparison format, timing, and any logistics or approval constraints." },
  "edevops:web-development": { description: "a focused web-delivery capability connected to the audience journey and wider business objective", detail: "For a focused web brief, share what visitors need to accomplish, the key pages or workflow, existing content or systems, success criteria, and the next launch or decision point." },
  "edevops:mobile-development": { description: "a focused mobile-product capability shaped around the real-world user scenario and device context", detail: "For a focused mobile brief, share the user task, target platforms or devices, the role of the app in the operating workflow, needed integrations, and the measure of successful adoption." },
  "edevops:software-development": { description: "a focused software capability connected to a bottleneck, workflow, or internal operating system", detail: "For a focused software brief, share the current process, people affected, systems that must connect, the pain to remove, and the outcome the new workflow should create." },
  "edevops:ai-development": { description: "a focused applied-AI capability that still needs a practical evaluation and human-review model", detail: "For a focused AI brief, share the task to improve, representative inputs, acceptable outputs, human review requirements, privacy constraints, and the measure of reliable performance." },
  "edevops:automation": { description: "a focused automation capability built around a repeated trigger, handoff, or operational exception", detail: "For a focused automation brief, share the trigger, systems involved, manual steps to reduce, exceptions that require a person, and the business result the workflow should improve." },
  "edevops:cloud-devops": { description: "a focused infrastructure capability tied to reliable, observable, and maintainable software delivery", detail: "For a focused cloud or DevOps brief, share the current deployment picture, environments, reliability or visibility concern, access constraints, and the operational standard to achieve." },
  "edevops:application-security": { description: "a focused security capability applied to a specific asset, access model, or release concern", detail: "For a focused security brief, share the application or asset, user and access model, current concern, relevant compliance context, and the decision a review or hardening effort should inform." },
  "edevops:api-integrations": { description: "a focused integration capability that connects data, events, and ownership boundaries between systems", detail: "For a focused integration brief, share the systems involved, data to exchange, triggering event, reliability requirement, ownership boundaries, and the outcome for users or operators." },
};

type FrenchServiceContent = { title: string; summary: string; context: string; capabilityDescription: string; capabilityDetail: string };

const frenchServiceContent: Record<string, FrenchServiceContent> = {
  "unity:translation": { title: "Services linguistiques", summary: "Des flux multilingues organisés autour de la qualité, de la clarté et de la cohérence des contenus.", context: "Les bons projets linguistiques commencent par les contenus sources, les langues ou marchés visés, le ton attendu et le mode de relecture ou de publication.", capabilityDescription: "une capacité linguistique précise, adaptée au contenu, aux langues et au résultat attendu", capabilityDetail: "Partagez les contenus disponibles, les langues de départ et d’arrivée, le public, le ton, les exigences de qualité et la date de remise utile." },
  "unity:transcription": { title: "Services de transcription", summary: "Une transcription structurée pour les enregistrements audio, vidéo, entretiens, réunions et processus de validation.", context: "Indiquez le format de l’enregistrement, les langues ou intervenants, le niveau de précision, les repères temporels et l’usage prévu du livrable.", capabilityDescription: "une étape de transcription structurée autour de la qualité de la source et du format de sortie", capabilityDetail: "Précisez le type d’enregistrement, les intervenants ou langues, le niveau de fidélité attendu, les horodatages, les étiquettes de locuteur et l’usage final." },
  "unity:ai-data": { title: "Annotation de données et entraînement IA", summary: "Un travail de données avec intervention humaine qui soutient le développement et l’évaluation de systèmes d’IA.", context: "Les premières décisions portent sur le type de données, la tâche d’annotation ou d’évaluation, les exemples de sortie acceptable, les contrôles qualité et le volume.", capabilityDescription: "une tâche encadrée dans un flux d’annotation ou d’évaluation avec intervention humaine", capabilityDetail: "Décrivez le type d’entrée, la définition de tâche, des exemples de résultats acceptables ou non, le volume, les vérifications qualité et le format de livraison." },
  "unity:research-data": { title: "Recherche et services de données", summary: "De la recherche, de la vérification et des opérations de données pour soutenir des décisions concrètes.", context: "Un brief utile précise la décision à soutenir, les sources ou marchés recherchés, les champs à collecter et le format du résultat.", capabilityDescription: "une opération de recherche ou de données conçue pour éclairer une décision définie", capabilityDetail: "Partagez la question à traiter, les marchés ou sources visés, les informations à collecter, le niveau de vérification et le format de restitution." },
  "unity:virtual-workforce": { title: "Main-d’œuvre virtuelle", summary: "Un soutien opérationnel aligné sur les projets, l’administration, le contenu, la qualité et les opérations numériques.", context: "Décrivez les tâches récurrentes, les outils, le volume, les horaires ou la couverture souhaitée, ainsi que les règles de remise et d’escalade.", capabilityDescription: "une responsabilité de soutien définie dans un rythme opérationnel concret", capabilityDetail: "Indiquez les tâches, outils, volumes, horaires, règles d’escalade et critères qui rendent le travail prêt à être remis." },
  "unity:content-services": { title: "Opérations de contenu", summary: "Un soutien structuré pour la révision, la modération, la classification, l’édition et la localisation de contenus.", context: "Un bon point de départ précise le type de contenu, les règles de révision ou de classification, le seuil qualité, le volume et le flux de retour.", capabilityDescription: "une opération de contenu avec un objectif de révision, de classification ou de publication défini", capabilityDetail: "Partagez le type de contenu, les règles ou exemples, le niveau de qualité, le volume, les cas particuliers et le point de retour dans votre flux." },
  "unity:procurement": { title: "Soutien aux achats", summary: "Un accompagnement d’achats et de sourcing pour la recherche, la comparaison, la coordination et la vérification de fournisseurs.", context: "Précisez l’objectif d’approvisionnement, les marchés ou régions, les critères fournisseurs, le format de comparaison et les contraintes de délai ou de logistique.", capabilityDescription: "un volet de sourcing ou de comparaison construit autour de critères de décision clairs", capabilityDetail: "Décrivez l’objectif, les régions, les critères fournisseurs, le format de comparaison, les échéances ainsi que les contraintes logistiques ou d’approbation." },
  "edevops:web-development": { title: "Développement web", summary: "Des sites, plateformes, portails et applications web conçus autour d’objectifs métier clairs.", context: "Commencez par l’objectif métier, le public, les actions attendues des visiteurs, les contenus ou systèmes existants et le critère de réussite.", capabilityDescription: "une capacité web reliée au parcours utilisateur et à l’objectif métier", capabilityDetail: "Partagez ce que les visiteurs doivent accomplir, les pages ou flux clés, les contenus ou systèmes existants, les critères de réussite et le prochain jalon." },
  "edevops:mobile-development": { title: "Développement mobile", summary: "Des expériences mobiles et systèmes associés conçus pour les usages réels des personnes.", context: "Clarifiez le scénario utilisateur, les appareils ou plateformes, le rôle de l’application dans le flux de travail, les intégrations et l’adoption visée.", capabilityDescription: "une capacité produit mobile façonnée par le scénario utilisateur et le contexte d’appareil", capabilityDetail: "Indiquez la tâche utilisateur, les plateformes ou appareils visés, le rôle de l’application dans le flux, les intégrations utiles et le signe d’une adoption réussie." },
  "edevops:software-development": { title: "Ingénierie logicielle", summary: "Une architecture logicielle sur mesure pour les systèmes internes, plateformes SaaS et flux métier connectés.", context: "Décrivez le frein opérationnel, les personnes concernées, le processus actuel, les systèmes à connecter et le résultat du nouveau flux.", capabilityDescription: "une capacité logicielle reliée à un frein, un flux ou un système d’exploitation interne", capabilityDetail: "Partagez le processus actuel, les personnes concernées, les systèmes qui doivent communiquer, le problème à éliminer et le résultat attendu." },
  "edevops:ai-development": { title: "Développement IA", summary: "Des systèmes d’IA appliquée conçus avec un contexte opérationnel, une évaluation et des flux utilisateurs concrets.", context: "Commencez par la décision ou la tâche à améliorer, des exemples d’entrée, les sorties acceptables, la revue humaine, la confidentialité et l’évaluation.", capabilityDescription: "une capacité d’IA appliquée qui exige une évaluation pratique et un modèle de supervision humaine", capabilityDetail: "Précisez la tâche, des exemples représentatifs, les résultats acceptables, la revue humaine, les contraintes de confidentialité et le niveau de fiabilité attendu." },
  "edevops:automation": { title: "Automatisation", summary: "Des processus connectés qui réduisent les tâches répétitives et rassemblent les systèmes dans un même flux de travail.", context: "Identifiez le déclencheur répété, les systèmes impliqués, les étapes manuelles ou passages de relais à réduire, les exceptions et le résultat métier.", capabilityDescription: "une capacité d’automatisation construite autour d’un déclencheur, d’un relais ou d’une exception opérationnelle", capabilityDetail: "Décrivez le déclencheur, les systèmes, les étapes manuelles à réduire, les exceptions qui nécessitent une personne et le résultat métier recherché." },
  "edevops:cloud-devops": { title: "Cloud et DevOps", summary: "Des pratiques de déploiement et d’infrastructure pour des logiciels sûrs, observables et maintenables.", context: "Partagez la situation de déploiement actuelle, les environnements, le sujet de fiabilité ou de visibilité, les contraintes d’accès et la norme à atteindre.", capabilityDescription: "une capacité d’infrastructure reliée à une livraison logicielle fiable, observable et maintenable", capabilityDetail: "Indiquez l’architecture de déploiement actuelle, les environnements, le problème de fiabilité ou de visibilité, les accès et la norme opérationnelle recherchée." },
  "edevops:application-security": { title: "Sécurité applicative", summary: "Une architecture et des pratiques de sécurité intégrées à l’ingénierie produit.", context: "Expliquez l’application ou l’actif à protéger, les rôles et accès, le sujet actuel, le cadre de conformité éventuel et la décision à éclairer.", capabilityDescription: "une capacité de sécurité appliquée à un actif, un modèle d’accès ou une préoccupation de mise en production précise", capabilityDetail: "Partagez l’application ou l’actif, les utilisateurs et accès, le risque ou sujet actuel, le contexte de conformité et la décision attendue du contrôle." },
  "edevops:api-integrations": { title: "API et intégrations", summary: "Des API et intégrations qui permettent aux systèmes métier critiques d’échanger des données et de fonctionner ensemble.", context: "Définissez les systèmes concernés, les données et événements critiques, la fiabilité requise, les responsabilités et le résultat pour les utilisateurs.", capabilityDescription: "une capacité d’intégration qui relie données, événements et responsabilités entre des systèmes", capabilityDetail: "Décrivez les systèmes à connecter, les données échangées, l’événement déclencheur, le niveau de fiabilité, les responsabilités et le résultat pour les utilisateurs." },
};

const frenchCapabilityTitles: Record<string, string> = {
  "Translation": "Traduction", "Localization": "Localisation", "Transcreation": "Transcréation", "Proofreading & editing": "Révision et correction", "Linguistic QA": "Assurance qualité linguistique", "Subtitling & captioning": "Sous-titrage et légendage",
  "Audio transcription": "Transcription audio", "Video transcription": "Transcription vidéo", "Multilingual transcription": "Transcription multilingue", "Timestamping": "Horodatage", "Interview transcription": "Transcription d’entretiens", "Speech-to-text validation": "Validation parole-texte",
  "Text, image & video annotation": "Annotation de textes, images et vidéos", "Audio annotation": "Annotation audio", "Intent & entity classification": "Classification des intentions et des entités", "AI response evaluation": "Évaluation de réponses IA", "Search relevance evaluation": "Évaluation de la pertinence de recherche", "Dataset preparation": "Préparation de jeux de données",
  "Web & market research": "Recherche web et études de marché", "Data collection": "Collecte de données", "Data verification": "Vérification de données", "Data enrichment": "Enrichissement de données", "Competitive research": "Analyse concurrentielle", "Data cleansing": "Nettoyage de données",
  "Virtual assistance": "Assistance virtuelle", "Administrative support": "Soutien administratif", "Customer support": "Support client", "Back-office operations": "Opérations back-office", "Document processing": "Traitement de documents", "Quality assurance": "Assurance qualité",
  "Content review": "Révision de contenu", "Content moderation": "Modération de contenu", "Content classification": "Classification de contenu", "Copy editing": "Révision rédactionnelle", "SEO content operations": "Opérations de contenu SEO", "Product descriptions": "Descriptions de produits",
  "Supplier sourcing": "Recherche de fournisseurs", "Vendor identification": "Identification de prestataires", "RFQ support": "Assistance aux appels d’offres", "Supplier comparison": "Comparaison de fournisseurs", "International sourcing": "Sourcing international", "Logistics coordination": "Coordination logistique",
  "Corporate websites": "Sites web d’entreprise", "Web applications": "Applications web", "Customer portals": "Portails clients", "Dashboards": "Tableaux de bord", "E-commerce platforms": "Plateformes e-commerce", "CMS development": "Développement CMS",
  "Android applications": "Applications Android", "iOS applications": "Applications iOS", "Cross-platform applications": "Applications multiplateformes", "Flutter": "Flutter", "React Native": "React Native", "API integrations": "Intégrations API",
  "Custom software": "Logiciels sur mesure", "SaaS platforms": "Plateformes SaaS", "Enterprise applications": "Applications d’entreprise", "Workflow systems": "Systèmes de workflow", "Backend development": "Développement backend", "Database architecture": "Architecture de bases de données",
  "AI applications": "Applications IA", "LLM integrations": "Intégrations LLM", "AI agents": "Agents IA", "RAG": "RAG", "Document intelligence": "Intelligence documentaire", "AI chatbots": "Chatbots IA",
  "Workflow automation": "Automatisation de workflows", "API automation": "Automatisation d’API", "AI automation": "Automatisation IA", "Data pipelines": "Pipelines de données", "Webhooks": "Webhooks", "Third-party integrations": "Intégrations tierces",
  "Cloud deployment": "Déploiement cloud", "CI/CD": "CI/CD", "Containerization": "Conteneurisation", "Cloud architecture": "Architecture cloud", "Monitoring": "Supervision", "Infrastructure automation": "Automatisation d’infrastructure",
  "Security reviews": "Audits de sécurité", "Authentication": "Authentification", "Authorization": "Autorisation", "API security": "Sécurité des API", "Secure deployment practices": "Pratiques de déploiement sécurisé", "Vulnerability assessment": "Évaluation des vulnérabilités",
  "REST APIs": "API REST", "GraphQL": "GraphQL", "Payment integrations": "Intégrations de paiement", "Messaging integrations": "Intégrations de messagerie", "Authentication integrations": "Intégrations d’authentification", "Data synchronization": "Synchronisation de données",
};

const frenchLanguageCapabilityContent: Record<string, { title: string; description: string; detail: string }> = {
  "Translation": { title: "Traduction", description: "Une traduction exacte pour les documents, contenus produit, communications et supports opérationnels.", detail: "Indiquez les langues de départ et d’arrivée, le public, le ton, la terminologie éventuelle et l’usage final afin d’aligner le travail sur la décision, la publication ou le flux concerné." },
  "Localization": { title: "Localisation", description: "Une adaptation prête pour le marché, au-delà de la simple conversion littérale.", detail: "Précisez le marché cible, les formats, devises, références culturelles, contexte produit et éléments destinés aux utilisateurs afin que le contenu soit naturel et fonctionnel dans sa destination." },
  "Transcreation": { title: "Transcréation", description: "Une adaptation créative pour les messages où l’impact compte autant que l’exactitude.", detail: "Partagez le message source, l’objectif de marque ou de campagne, le public et l’effet recherché afin de préserver l’intention stratégique tout en laissant la nouvelle langue fonctionner naturellement." },
  "Proofreading & editing": { title: "Révision et correction", description: "Une relecture précise pour des contenus qui demandent clarté, cohérence et assurance.", detail: "Indiquez le public, le guide de style ou la terminologie, le niveau de correction souhaité et l’usage final pour cadrer la grammaire, le ton, le flux et la cohérence." },
  "Linguistic QA": { title: "Assurance qualité linguistique", description: "Une assurance qualité structurée pour les contenus, interfaces et éléments prêts à être publiés.", detail: "Partagez l’environnement de test, les langues, les parcours utilisateurs critiques, les règles de terminologie et les critères de validation afin de repérer les défauts de langue, de contexte ou d’affichage." },
  "Subtitling & captioning": { title: "Sous-titrage et légendage", description: "Des sous-titres et légendes lisibles, synchronisés et adaptés à la vidéo, la formation ou l’accessibilité.", detail: "Précisez la vidéo source, le public, les langues, le format de livraison, les règles de lecture et les besoins d’accessibilité pour ajuster le timing, les locuteurs et la longueur des lignes." },
};

export function getServiceDisplay(division: DivisionKey, service: Service, locale: "en" | "fr" = "en") {
  const localized = locale === "fr" ? frenchServiceContent[`${division}:${service.slug}`] : undefined;
  return localized ? { title: localized.title, summary: localized.summary } : { title: service.title, summary: service.summary };
}

export function getServicePathContext(division: DivisionKey, service: Service, locale: "en" | "fr" = "en") {
  return locale === "fr" ? frenchServiceContent[`${division}:${service.slug}`]?.context ?? "Ouvrez chaque capacité pour consulter son contexte, les éléments utiles à partager et un accès direct au brief correspondant." : servicePathContext[`${division}:${service.slug}`] ?? "Open any capability to see its delivery context, useful starting information, and a direct route into that exact brief.";
}

export function getServiceCapabilityBriefs(division: DivisionKey, service: Service, locale: "en" | "fr" = "en"): ServiceCapabilityBrief[] {
  if (division === "unity" && service.slug === "translation") return languageSubservices.map(brief => {
    const localized = locale === "fr" ? frenchLanguageCapabilityContent[brief.title] : undefined;
    return { title: localized?.title ?? brief.title, canonicalTitle: brief.title, briefLabel: brief.briefLabel, description: localized?.description ?? brief.description, detail: localized?.detail ?? brief.detail };
  });
  const guidance = serviceCapabilityGuidance[`${division}:${service.slug}`] ?? capabilityEngagementGuidance[division];
  const french = frenchServiceContent[`${division}:${service.slug}`];
  return service.capabilities.map(capability => ({
    title: locale === "fr" ? frenchCapabilityTitles[capability] ?? capability : capability,
    canonicalTitle: capability,
    briefLabel: `${service.title} — ${capability}`,
    description: locale === "fr" ? `${frenchCapabilityTitles[capability] ?? capability} : ${french?.capabilityDescription ?? "une capacité ciblée reliée à un résultat opérationnel défini"}.` : `${capability} is ${guidance.description}.`,
    detail: locale === "fr" ? french?.capabilityDetail ?? "Décrivez le contexte, le résultat attendu, les contraintes utiles, le volume et le calendrier afin de préparer un premier échange pertinent." : guidance.detail,
  }));
}

export function getServiceCapabilityBriefHref(division: DivisionKey, briefLabel: string, capability?: string, locale: "en" | "fr" = "en") {
  const parameters = new URLSearchParams({ service: briefLabel, source: "capability_cta", capability: capability || briefLabel });
  if (division === "edevops") parameters.set("division", "edevops");
  if (locale === "fr") parameters.set("lang", "fr");
  return `${division === "unity" ? "/unity/contact" : "/contact"}?${parameters.toString()}`;
}

export function getCapabilityBriefTemplate(division: DivisionKey, service: Service, brief: ServiceCapabilityBrief, locale: "en" | "fr" = "en") {
  const divisionName = divisions[division].name;
  const prompt = locale === "fr" ? (division === "unity"
    ? ["Quel résultat doit être livré ?", "Quels documents, fichiers ou sources sont disponibles ?", "Quelles sont les exigences de qualité ou de validation ?", "Quel volume, calendrier et point de remise prévoir ?"]
    : ["Qu'est-ce qui doit mieux fonctionner après ce projet ?", "Quels utilisateurs et quel flux de travail sont concernés ?", "Quels systèmes, intégrations ou contraintes techniques doivent être respectés ?", "Quel calendrier, quelles priorités et quel point de décision prévoir ?"])
    : division === "unity"
    ? ["What needs to be delivered?", "Materials, files, or sources available", "Quality or review requirements", "Volume, timing, and handover point"]
    : ["What should work better after this project?", "Users and current workflow", "Systems, integrations, or technical constraints", "Timing, priorities, and decision point"];
  if (locale === "fr") return `# ${brief.briefLabel} — Brief de travail\n\n**Division :** ${divisionName}\n**Service :** ${service.title}\n**Capacité :** ${brief.title}\n\nCe brief porte sur la capacité « ${brief.title} » dans le cadre du service ${service.title}. Décrivez le résultat attendu, le contexte et les contraintes utiles afin que l’équipe puisse préparer une première réponse adaptée.\n\n## Questions de départ\n${prompt.map(item => `- ${item} : `).join("\n")}\n\n## Contexte\n- Organisation : \n- Contact principal : \n- Mode de réponse préféré : \n\n> Ce modèle est facultatif. Vous pouvez aussi soumettre le brief en ligne avec votre nom, votre e-mail et une courte description.\n`;
  return `# ${brief.briefLabel} — Working Brief\n\n**Division:** ${divisionName}\n**Service:** ${service.title}\n**Capability:** ${brief.title}\n\n${brief.description}\n\n## Starting prompts\n${prompt.map(item => `- ${item}: `).join("\n")}\n\n## Context\n- Organization: \n- Main contact: \n- Preferred response method: \n\n> This template is optional. You may instead submit the concise online brief with your name, email, and a short description.\n`;
}

export function getCapabilityBriefTemplateFilename(briefLabel: string, locale: "en" | "fr" = "en") {
  return `${briefLabel.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-brief-template.${locale}.pdf`;
}

export const divisions: Record<DivisionKey, Division> = {
  unity: {
    key: "unity",
    name: "Unity Integrated Solutions",
    shortName: "Unity",
    eyebrow: "Coordinated professional services",
    strapline: "Professional Workforces. Integrated Solutions.",
    description:
      "Access skilled professionals and structured teams for language, AI data, research, digital operations, procurement, and specialized business services.",
    image: assets.unity,
    services: [
      {
        title: "Language Services",
        slug: "translation",
        summary: "Multilingual language workflows shaped around content quality, clarity, and consistency.",
        capabilities: ["Translation", "Localization", "Transcreation", "Proofreading & editing", "Linguistic QA", "Subtitling & captioning"],
        icon: "language",
      },
      {
        title: "Transcription Services",
        slug: "transcription",
        summary: "Structured transcription support for audio, video, interviews, meetings, and validation workflows.",
        capabilities: ["Audio transcription", "Video transcription", "Multilingual transcription", "Timestamping", "Interview transcription", "Speech-to-text validation"],
        icon: "content",
      },
      {
        title: "Data Annotation & AI Training",
        slug: "ai-data",
        summary: "Human-in-the-loop data work that supports the development and evaluation of AI systems.",
        capabilities: ["Text, image & video annotation", "Audio annotation", "Intent & entity classification", "AI response evaluation", "Search relevance evaluation", "Dataset preparation"],
        icon: "data",
      },
      {
        title: "Research & Data Services",
        slug: "research-data",
        summary: "Research, verification, and data operations for teams that need dependable operational support.",
        capabilities: ["Web & market research", "Data collection", "Data verification", "Data enrichment", "Competitive research", "Data cleansing"],
        icon: "research",
      },
      {
        title: "Virtual Workforce",
        slug: "virtual-workforce",
        summary: "Project-aligned business support across administrative, content, quality, and digital operations.",
        capabilities: ["Virtual assistance", "Administrative support", "Customer support", "Back-office operations", "Document processing", "Quality assurance"],
        icon: "team",
      },
      {
        title: "Content Operations",
        slug: "content-services",
        summary: "Structured support for content review, moderation, classification, editing, and localization.",
        capabilities: ["Content review", "Content moderation", "Content classification", "Copy editing", "SEO content operations", "Product descriptions"],
        icon: "content",
      },
      {
        title: "Procurement Support",
        slug: "procurement",
        summary: "Procurement and sourcing support for supplier research, comparison, coordination, and verification.",
        capabilities: ["Supplier sourcing", "Vendor identification", "RFQ support", "Supplier comparison", "International sourcing", "Logistics coordination"],
        icon: "procurement",
      },
    ],
  },
  edevops: {
    key: "edevops",
    name: "eveDev Ops",
    shortName: "eveDev Ops",
    eyebrow: "Software engineering · AI · digital products",
    strapline: "We Build Software That Moves Businesses Forward.",
    description:
      "From websites and mobile applications to SaaS platforms, AI systems, and automation infrastructure, eveDev Ops turns ideas into production-ready digital products.",
    image: assets.edevops,
    services: [
      {
        title: "Web Development",
        slug: "web-development",
        summary: "Websites, platforms, portals, and applications designed around clear business objectives.",
        capabilities: ["Corporate websites", "Web applications", "Customer portals", "Dashboards", "E-commerce platforms", "CMS development"],
        icon: "web",
      },
      {
        title: "Mobile Development",
        slug: "mobile-development",
        summary: "Mobile experiences and supporting systems planned for the way people use products in the real world.",
        capabilities: ["Android applications", "iOS applications", "Cross-platform applications", "Flutter", "React Native", "API integrations"],
        icon: "mobile",
      },
      {
        title: "Software Engineering",
        slug: "software-development",
        summary: "Custom software architecture for internal systems, SaaS platforms, and connected business workflows.",
        capabilities: ["Custom software", "SaaS platforms", "Enterprise applications", "Workflow systems", "Backend development", "Database architecture"],
        icon: "software",
      },
      {
        title: "AI Development",
        slug: "ai-development",
        summary: "Applied AI systems designed with practical operational context, evaluation, and user workflows in mind.",
        capabilities: ["AI applications", "LLM integrations", "AI agents", "RAG", "Document intelligence", "AI chatbots"],
        icon: "ai",
      },
      {
        title: "Automation",
        slug: "automation",
        summary: "Connected processes that reduce repetitive work and bring important systems into one working flow.",
        capabilities: ["Workflow automation", "API automation", "AI automation", "Data pipelines", "Webhooks", "Third-party integrations"],
        icon: "automation",
      },
      {
        title: "Cloud & DevOps",
        slug: "cloud-devops",
        summary: "Deployment and infrastructure practices planned to support secure, observable, and maintainable software.",
        capabilities: ["Cloud deployment", "CI/CD", "Containerization", "Cloud architecture", "Monitoring", "Infrastructure automation"],
        icon: "cloud",
      },
      {
        title: "Application Security",
        slug: "application-security",
        summary: "Security-minded architecture and application practices integrated into product engineering.",
        capabilities: ["Security reviews", "Authentication", "Authorization", "API security", "Secure deployment practices", "Vulnerability assessment"],
        icon: "security",
      },
      {
        title: "API & Integrations",
        slug: "api-integrations",
        summary: "APIs and integrations that help critical business systems exchange data and work together.",
        capabilities: ["REST APIs", "GraphQL", "Payment integrations", "Messaging integrations", "Authentication integrations", "Data synchronization"],
        icon: "api",
      },
    ],
  },
};

export const products = [
  {
    name: "Shweng",
    slug: "shweng",
    category: "Cross-Network Exchange",
    description:
      "A cross-network money and value exchange application currently being developed by eveDev Ops. Product information will evolve as the work progresses.",
    status: "In development",
  },
];

export const servicePathContext: Record<string, string> = {
  "unity:translation": "For translation and localization work, the useful starting point is the source material, target language or market, desired tone, and how the final content will be reviewed or published.",
  "unity:transcription": "For transcription work, a first conversation is strongest when it covers the recording format, languages or speakers, expected accuracy, timestamps, and the use of the final transcript.",
  "unity:ai-data": "For AI data work, the early decisions are the data type, annotation or evaluation task, examples of acceptable output, quality controls, and the scale of the dataset.",
  "unity:research-data": "For research and data support, the key context is the decision the research must support, the desired sources or markets, the fields to collect, and how the result should be delivered.",
  "unity:virtual-workforce": "For workforce support, it helps to describe the recurring work, tools, volume, hours or coverage needed, and the handover or escalation expectations.",
  "unity:content-services": "For content operations, define the content type, review or classification rules, quality threshold, volume, and the workflow where completed work should return.",
  "unity:procurement": "For procurement support, a useful brief includes the sourcing objective, markets or regions, supplier criteria, comparison format, and any timing or logistics constraints.",
  "edevops:web-development": "For web work, the best starting point is the business goal, the audience, what visitors need to accomplish, existing content or systems, and the decision that will define success.",
  "edevops:mobile-development": "For mobile work, clarify the user scenario, devices or platforms in scope, the role of the app within your operating workflow, integrations, and how the team will measure adoption.",
  "edevops:software-development": "For custom software, begin with the operational bottleneck, the people affected, the current process, the systems that must connect, and the outcome the new workflow should create.",
  "edevops:ai-development": "For applied AI, start with the decision or task to improve, representative inputs, acceptable outputs, human review requirements, privacy constraints, and how performance will be evaluated.",
  "edevops:automation": "For automation, identify the repeated trigger, the systems involved, the manual steps or handoffs to reduce, exception handling, and the business result that matters most.",
  "edevops:cloud-devops": "For cloud and DevOps work, share the current deployment picture, reliability or visibility concern, environments in scope, access constraints, and the operational standard to achieve.",
  "edevops:application-security": "For application security, explain the application or asset to protect, user and access model, current concern, compliance context if relevant, and the decision a review needs to inform.",
  "edevops:api-integrations": "For integrations, define the systems that need to exchange information, the critical data and triggering event, required reliability, ownership boundaries, and the outcome for users or operators.",
};

export const unityProcess = [
  ["01", "Tell us what you need", "Share the work, scope, requirements, and practical constraints."],
  ["02", "Assemble the right workforce", "Match the project with the appropriate professional capacity."],
  ["03", "Work begins", "Teams execute against the agreed brief and delivery expectations."],
  ["04", "Quality assurance", "Deliverables are reviewed against the project’s requirements."],
  ["05", "Delivery", "Final work is prepared for handover."],
];

export const edevopsTech = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "Flutter",
  "PostgreSQL",
  "Docker",
  "Kubernetes",
  "AWS",
  "Google Cloud",
  "Azure",
  "CI/CD",
  "AI/LLM APIs",
];

export const navItems = [
  ["Home", "/"],
  ["Unity", "/unity"],
  ["eveDev Ops", "/edevops"],
  ["Products", "/products"],
  ["Portfolio", "/portfolio"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;

export function findService(division: DivisionKey, slug: string) {
  if (division === "unity" && slug === "data-annotation") {
    return divisions.unity.services.find((service) => service.slug === "ai-data");
  }
  return divisions[division].services.find((service) => service.slug === slug);
}
