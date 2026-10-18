import { divisions, findService, getServiceDisplay } from "@/content/site";
import { policies } from "@/content/policies";
import { getPublicLocale, type PublicLocale } from "@/lib/publicLocale";

/** Public site. Email stays on eveopsgroup.com; the site is hosted on eveopsgroup.cloud. */
export const SITE_ORIGIN = (
  String(import.meta.env.VITE_PUBLIC_HOSTNAME || "").trim()
    ? `https://${String(import.meta.env.VITE_PUBLIC_HOSTNAME).replace(/^https?:\/\//, "").replace(/\/$/, "")}`
    : "https://eveopsgroup.cloud"
).replace(/\/$/, "");

export const OG_IMAGE = `${SITE_ORIGIN}/og.jpg`;

export type SeoMeta = {
  title: string;
  description: string;
  canonicalPath: string;
  noindex: boolean;
};

function clip(value: string, max = 160) {
  const text = value.replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}

export function absoluteUrl(path: string, locale: PublicLocale = "en") {
  const pathname = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(pathname, SITE_ORIGIN);
  if (locale === "fr") url.searchParams.set("lang", "fr");
  return url.toString();
}

export function resolveSeo(pathname: string, search = ""): SeoMeta {
  const locale = getPublicLocale(search);
  const fr = locale === "fr";
  const path = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  let canonicalPath = path || "/";
  let noindex = false;

  const pages: Record<string, { title: string; description: string }> = {
    "/": {
      title: fr ? "eveOps Group | Services professionnels, logiciels et solutions IA" : "eveOps Group | Professional Services, Software & AI Solutions",
      description: fr
        ? "eveOps Group combine solutions de main-d’œuvre, services de données IA, achats et ingénierie logicielle par l’intermédiaire de Unity Integrated Solutions et eveDev Ops."
        : "eveOps Group connects professional global workforce solutions with software engineering, AI, and digital product development.",
    },
    "/about": {
      title: fr ? "À propos d’eveOps Group | Services professionnels et ingénierie logicielle" : "About eveOps Group | Professional Services & Software Engineering",
      description: fr
        ? "eveOps Group est un groupe pluridisciplinaire d’opérations et de technologie qui associe expertise professionnelle, ingénierie logicielle et innovation numérique."
        : "eveOps Group is a multidisciplinary operations and technology group combining professional human expertise with software engineering and digital innovation.",
    },
    "/contact": {
      title: fr ? "Contact eveOps Group | Démarrer une conversation" : "Contact eveOps Group | Start a Project Conversation",
      description: fr
        ? "Dites à eveOps si vous avez besoin de services professionnels ou de développement logiciel."
        : "Tell eveOps Group whether you need professional services or software development and start a project intake conversation.",
    },
    "/unity/contact": {
      title: fr ? "Contacter Unity Integrated Solutions | Demander un service" : "Contact Unity Integrated Solutions | Request a Service",
      description: fr
        ? "Décrivez votre besoin de service professionnel à Unity Integrated Solutions."
        : "Tell Unity Integrated Solutions about your professional service requirement and start a service intake.",
    },
    "/insights": {
      title: fr ? "Réflexions | eveOps Group" : "Insights | eveOps Group",
      description: fr
        ? "Le futur espace éditorial eveOps Group pour les services professionnels, les données IA, l’ingénierie logicielle, l’automatisation, le cloud et les produits numériques."
        : "A future-focused eveOps Group editorial hub for professional services, AI data, software engineering, automation, cloud, and product development insights.",
    },
    "/portfolio": {
      title: fr ? "Réalisations eveOps Group | Produits et solutions clients" : "eveOps Group Portfolio | Products & Client Solutions",
      description: fr
        ? "Découvrez comment eveOps Group distingue ses propres produits technologiques des solutions logicielles et numériques développées pour des organisations clientes."
        : "Explore how eveOps Group differentiates its own technology products from software and digital solutions developed for client organizations.",
    },
    "/products": {
      title: fr ? "Réalisations | Unity et eveDev Ops | eveOps Group" : "Work | Unity and eveDev Ops | eveOps Group",
      description: fr
        ? "Une page pour le travail des deux activités d’eveOps Group : Unity Integrated Solutions et eveDev Ops."
        : "One page for work from both eveOps Group businesses: Unity Integrated Solutions and eveDev Ops.",
    },
    "/products/shweng": {
      title: fr ? "Shweng | Produit d’échange inter-réseaux | eveOps Group" : "Shweng | Cross-Network Exchange Product | eveOps Group",
      description: fr
        ? "Shweng est une application d’échange de valeur inter-réseaux actuellement développée par eveDev Ops."
        : "Shweng is a cross-network value exchange application currently being developed by eveDev Ops.",
    },
    "/privacy": { title: `${policies.privacy[locale].title} | eveOps Group`, description: policies.privacy[locale].lede },
    "/cookies": { title: `${policies.cookies[locale].title} | eveOps Group`, description: policies.cookies[locale].lede },
    "/terms": { title: `${policies.terms[locale].title} | eveOps Group`, description: policies.terms[locale].lede },
  };

  if (path === "/unity/services") canonicalPath = "/unity";
  if (path === "/edevops/services") canonicalPath = "/edevops";
  if (path === "/unity/data-annotation") canonicalPath = "/unity/ai-data";

  if (path === "/unity" || path === "/unity/services" || path === "/edevops" || path === "/edevops/services") {
    const division = path.startsWith("/unity") ? "unity" : "edevops";
    const item = divisions[division];
    return {
      title: fr ? `${item.name} | Services professionnels et numériques` : `${item.name} | eveOps Group`,
      description: clip(fr ? `${item.name} accompagne les organisations avec des services professionnels, des systèmes numériques et une livraison structurée.` : item.description),
      canonicalPath,
      noindex: false,
    };
  }

  const serviceMatch = path.match(/^\/(unity|edevops)\/([^/]+)$/);
  if (serviceMatch && serviceMatch[2] !== "contact" && serviceMatch[2] !== "services") {
    const division = serviceMatch[1] as "unity" | "edevops";
    const service = findService(division, serviceMatch[2]);
    if (!service) {
      return {
        title: fr ? "Page introuvable | eveOps Group" : "Page not found | eveOps Group",
        description: fr ? "Cette page n’existe pas sur le site eveOps Group." : "This page does not exist on the eveOps Group website.",
        canonicalPath: path,
        noindex: true,
      };
    }
    const display = getServiceDisplay(division, service, locale);
    return {
      title: `${display.title} | ${divisions[division].name}`,
      description: clip(display.summary),
      canonicalPath,
      noindex: false,
    };
  }

  if (path === "/admin" || path.startsWith("/admin/")) {
    return {
      title: "Studio | eveOps Group",
      description: "Private studio for eveOps Group.",
      canonicalPath: path,
      noindex: true,
    };
  }

  const known = pages[path];
  if (!known) {
    return {
      title: fr ? "Page introuvable | eveOps Group" : "Page not found | eveOps Group",
      description: fr ? "Cette page n’existe pas sur le site eveOps Group." : "This page does not exist on the eveOps Group website.",
      canonicalPath: path,
      noindex: true,
    };
  }

  return { title: known.title, description: clip(known.description), canonicalPath, noindex };
}

export function structuredData(pathname: string, search = "") {
  const seo = resolveSeo(pathname, search);
  const locale = getPublicLocale(search);
  const organization = {
    "@type": "Organization",
    name: "eveOps Group",
    url: SITE_ORIGIN,
    logo: `${SITE_ORIGIN}/favicon.svg`,
    email: "support@eveopsgroup.com",
    telephone: "+237671361513",
    description: "eveOps Group connects professional workforce solutions with software engineering, AI, and digital product development.",
    department: [
      { "@type": "Organization", name: "Unity Integrated Solutions", url: `${SITE_ORIGIN}/unity` },
      { "@type": "Organization", name: "eveDev Ops", url: `${SITE_ORIGIN}/edevops` },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@eveopsgroup.com",
      telephone: "+237671361513",
      url: `${SITE_ORIGIN}/contact`,
      availableLanguage: ["English", "French"],
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "eveOps Group services",
      itemListElement: [...divisions.unity.services, ...divisions.edevops.services].map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service.title, description: service.summary },
      })),
    },
  };
  const website = {
    "@type": "WebSite",
    name: "eveOps Group",
    url: SITE_ORIGIN,
    description: organization.description,
    inLanguage: locale === "fr" ? "fr" : "en",
  };
  const page = {
    "@type": "WebPage",
    name: seo.title,
    description: seo.description,
    url: absoluteUrl(seo.canonicalPath, locale),
    inLanguage: locale === "fr" ? "fr" : "en",
    isPartOf: { "@type": "WebSite", name: "eveOps Group", url: SITE_ORIGIN },
  };
  const graph: object[] = [organization, website, page];
  const trail = breadcrumbs(seo.canonicalPath, locale);
  if (trail) graph.push(trail);
  if (seo.canonicalPath === "/contact" || seo.canonicalPath === "/unity/contact") {
    graph.push({
      "@type": "FAQPage",
      mainEntity: contactFaqs(locale).map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }
  const serviceMatch = seo.canonicalPath.match(/^\/(unity|edevops)\/([^/]+)$/);
  if (serviceMatch && !["contact", "services"].includes(serviceMatch[2])) {
    const division = serviceMatch[1] as "unity" | "edevops";
    const service = findService(division, serviceMatch[2]);
    if (service) {
      const display = getServiceDisplay(division, service, locale);
      graph.push({
        "@type": "Service",
        name: display.title,
        description: display.summary,
        url: absoluteUrl(seo.canonicalPath, locale),
        provider: { "@type": "Organization", name: divisions[division].name, url: `${SITE_ORIGIN}/${division}` },
      });
    }
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

export function contactFaqs(locale: PublicLocale) {
  if (locale === "fr") {
    return [
      {
        question: "Comment joindre eveOps Group ?",
        answer: "Écrivez à support@eveopsgroup.com ou appelez le +237 671 361 513. Le formulaire du site transmet le brief à l’équipe.",
      },
      {
        question: "Quelle est la différence entre Unity et eveDev Ops ?",
        answer: "Unity Integrated Solutions couvre les services professionnels : langues, données IA, recherche, équipes et achats. eveDev Ops couvre l’ingénierie logicielle, l’IA, le cloud et les produits numériques.",
      },
      {
        question: "Shweng est-il déjà lancé ?",
        answer: "Non. Shweng est une application d’échange inter-réseaux en cours de développement par eveDev Ops. Les pages restent générales tant que le produit n’est pas prêt.",
      },
    ];
  }
  return [
    {
      question: "How do I reach eveOps Group?",
      answer: "Email support@eveopsgroup.com or call +237 671 361 513. The website form sends the brief to the team.",
    },
    {
      question: "What is the difference between Unity and eveDev Ops?",
      answer: "Unity Integrated Solutions covers professional services: language, AI data, research, workforce, and procurement. eveDev Ops covers software engineering, AI, cloud, and digital products.",
    },
    {
      question: "Is Shweng already launched?",
      answer: "No. Shweng is a cross-network exchange application still being developed by eveDev Ops. The pages stay high-level until the product is ready.",
    },
  ];
}

function crumbName(part: string, locale: PublicLocale) {
  const labels: Record<string, [string, string]> = {
    about: ["About", "À propos"],
    contact: ["Contact", "Contact"],
    unity: ["Unity", "Unity"],
    edevops: ["eveDev Ops", "eveDev Ops"],
    services: ["Services", "Services"],
    products: ["Products", "Produits"],
    shweng: ["Shweng", "Shweng"],
    insights: ["Insights", "Réflexions"],
    portfolio: ["Portfolio", "Réalisations"],
    privacy: ["Privacy", "Confidentialité"],
    cookies: ["Cookies", "Cookies"],
    terms: ["Terms", "Conditions"],
  };
  const known = labels[part];
  if (known) return locale === "fr" ? known[1] : known[0];
  const unity = findService("unity", part);
  if (unity) return getServiceDisplay("unity", unity, locale).title;
  const engineering = findService("edevops", part);
  if (engineering) return getServiceDisplay("edevops", engineering, locale).title;
  return part;
}

function breadcrumbs(path: string, locale: PublicLocale) {
  const parts = path.split("/").filter(Boolean);
  if (parts.length === 0) return null;
  const items = [{ name: locale === "fr" ? "Accueil" : "Home", path: "/" as string | undefined }];
  let current = "";
  parts.forEach((part, index) => {
    current += `/${part}`;
    const last = index === parts.length - 1;
    items.push({ name: crumbName(part, locale), path: last ? undefined : current });
  });
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: absoluteUrl(item.path) } : {}),
    })),
  };
}

export const INDEXABLE_PATHS = [
  "/",
  "/about",
  "/contact",
  "/insights",
  "/portfolio",
  "/privacy",
  "/cookies",
  "/terms",
  "/products",
  "/products/shweng",
  "/unity",
  "/unity/contact",
  "/edevops",
  ...divisions.unity.services.map((service) => `/unity/${service.slug}`),
  ...divisions.edevops.services.map((service) => `/edevops/${service.slug}`),
];
