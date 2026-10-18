import { ArrowRight, ArrowUpRight, ChevronDown, Download } from "lucide-react";
import {
  divisions,
  findService,
  getCapabilityBriefTemplateFilename,
  getServiceCapabilityBriefHref,
  getServiceCapabilityBriefs,
  getServiceDisplay,
  getServicePathContext,
  type DivisionKey,
  type ServiceCapabilityBrief,
} from "@/content/site";
import { buildWorkingBrief } from "@/lib/pdf/brief";
import { Breadcrumbs, CTASection, Eyebrow } from "@/components/ContentBlocks";
import { LocaleLink } from "@/components/LocaleLink";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useLocale } from "@/lib/locale";
import { localeText } from "@/lib/publicLocale";

export default function ServiceDetailPage({ division, slug }: { division: DivisionKey; slug: string }) {
  const service = findService(division, slug);
  const isUnity = division === "unity";
  const locale = useLocale();
  const fr = locale === "fr";
  const text = localeText[locale];
  const displayService = service ? getServiceDisplay(division, service, locale) : undefined;
  const intakeHref = isUnity
    ? `/unity/contact?service=${encodeURIComponent(service?.title ?? "")}`
    : `/contact?division=edevops&service=${encodeURIComponent(service?.title ?? "")}`;
  const workingContext = fr
    ? isUnity
      ? [
          "Le résultat : ce qui doit être livré et les personnes qui l’utiliseront.",
          "Les éléments disponibles : documents, langues, sources ou flux de travail à traiter.",
          "Le niveau de qualité : critères d’acceptation, références ou processus de validation.",
          "Le calendrier : première date de livraison utile et éventuels jalons de remise.",
        ]
      : [
          "Le résultat : ce qui doit être plus simple, plus rapide, plus sûr ou plus fiable après le projet.",
          "Les utilisateurs et le flux : qui utilisera la solution et comment cela fonctionne aujourd’hui.",
          "Le contexte technique : systèmes, intégrations ou contraintes à respecter.",
          "Le calendrier : prochain point de décision, fenêtre de lancement ou échéance opérationnelle.",
        ]
    : isUnity
      ? [
          "The outcome: what needs to be delivered and who will use it.",
          "The inputs: the materials, languages, sources, or workflow that need attention.",
          "The quality bar: any acceptance criteria, reference material, or review process.",
          "The timing: the first useful delivery date and any fixed handover points.",
        ]
      : [
          "The outcome: what should be easier, faster, safer, or more reliable after the work.",
          "The users and workflow: who will use it, and what happens today.",
          "The technical context: the current systems, integrations, or constraints we should respect.",
          "The timing: the next decision point, launch window, or operational deadline.",
        ];
  const serviceContext = service ? getServicePathContext(division, service, locale) : "";
  const capabilityBriefs = service ? getServiceCapabilityBriefs(division, service, locale) : [];

  const downloadTemplate = (capability: ServiceCapabilityBrief) => {
    if (!service || typeof window === "undefined") return;
    const bytes = buildWorkingBrief(division, service, capability, locale);
    const blob = new Blob([bytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = getCapabilityBriefTemplateFilename(capability.briefLabel, locale);
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  useDocumentMeta(
    service ? `${displayService?.title ?? service.title} | ${divisions[division].name}` : `Service | ${isUnity ? "Unity Integrated Solutions" : "eveOps Group"}`,
    displayService?.summary ?? service?.summary ?? `Explore ${isUnity ? "Unity Integrated Solutions" : "eveOps Group"} services.`,
  );

  if (!service) {
    return (
      <section className="simple-page section-pad">
        <div className="container">
          <h1>{text.serviceNotFound}</h1>
          <p>
            {locale === "fr"
              ? "Cet itinéraire a peut-être changé. Découvrez plutôt l’aperçu des services de la division."
              : "The route may have changed. Explore the division’s service overview instead."}
          </p>
          <LocaleLink to={`/${division}`} className="button button--solid">
            {text.backToServices}
          </LocaleLink>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className={`service-hero service-hero--${division}`}>
        <div className="container">
          <Breadcrumbs
            dark={!isUnity}
            items={
              isUnity
                ? [[fr ? "Services Unity" : "Unity services", "/unity/services"], [displayService?.title ?? service.title]]
                : [[fr ? "Accueil" : "Home", "/"], [divisions[division].shortName, `/${division}`], [displayService?.title ?? service.title]]
            }
          />
          <div className="service-hero__grid">
            <div>
              <Eyebrow theme={division}>
                {isUnity
                  ? fr
                    ? "Parcours de capacité Unity"
                    : "Unity capability route"
                  : fr
                    ? "Ingénierie logicielle · IA · produits numériques"
                    : divisions[division].eyebrow}
              </Eyebrow>
              <h1>{displayService?.title ?? service.title}</h1>
              <p>{displayService?.summary ?? service.summary}</p>
              <LocaleLink to={intakeHref} className="button button--solid">
                {isUnity
                  ? `${text.brief} ${(displayService?.title ?? service.title).toLowerCase()}`
                  : `${text.discuss} ${(displayService?.title ?? service.title).toLowerCase()}`}{" "}
                <ArrowUpRight size={17} />
              </LocaleLink>
            </div>
            <aside className="service-hero__aside">
              <span>{isUnity ? (fr ? "Approche de livraison" : "Delivery approach") : fr ? "Parcours de capacité" : "Capability route"}</span>
              <strong>
                {isUnity
                  ? fr
                    ? "Service professionnel coordonné"
                    : "Coordinated professional service"
                  : fr
                    ? "Logiciels et technologie"
                    : "Software & technology"}
              </strong>
              <p>
                {isUnity
                  ? fr
                    ? "Commencez par le contexte, les éléments, les contraintes et les attentes de remise qui structurent une livraison bien orientée."
                    : "Begin with the context, materials, constraints, and handover expectations that shape a well-routed delivery."
                  : fr
                    ? "Une page de service eveOps Group ciblée, prête à soutenir une conversation de projet directe."
                    : "A focused eveOps Group service page, ready to support a direct project conversation."}
              </p>
              <div className="unity-route-note" aria-hidden={!isUnity}>
                <i />
                {isUnity ? (fr ? "Brief → orienter → livrer" : "Brief → route → deliver") : ""}
              </div>
            </aside>
          </div>
        </div>
      </section>
      <section className={`service-scope section-pad service-scope--${division}`}>
        <div className="container service-scope__grid">
          <div>
            <Eyebrow theme={division}>{isUnity ? (fr ? "Parcours de service" : "Service path") : fr ? "Périmètre habituel" : "Typical scope"}</Eyebrow>
            <h2>
              {isUnity
                ? fr
                  ? "Commencez par le brief de travail, puis adaptez le soutien nécessaire."
                  : "Start with the working brief, then fit the support to it."
                : fr
                  ? "Configurez le travail autour de ce qui doit réellement être livré."
                  : "Configure the work around what actually needs to be delivered."}
            </h2>
            <p>{serviceContext}</p>
            <p className="service-scope__hint">
              {fr
                ? "Chaque capacité affiche son explication, les éléments utiles à partager et un brief direct."
                : "Every capability shows its explanation, useful starting context, and a direct brief CTA."}
            </p>
          </div>
          <div className={`capability-accordion capability-accordion--${division}`}>
            {capabilityBriefs.map((capability, index) => {
              const capabilityIntakeHref = getServiceCapabilityBriefHref(division, capability.briefLabel, capability.canonicalTitle, locale);
              return (
                <details key={capability.canonicalTitle} className="capability-accordion__item">
                  <summary aria-label={`${fr ? "Ouvrir ou réduire le contexte et le brief pour" : "Open or collapse context and brief for"} ${capability.title}`}>
                    <span className="capability-accordion__index">{String(index + 1).padStart(2, "0")}</span>
                    <span className="capability-accordion__heading">
                      <strong>{capability.title}</strong>
                      <small>{capability.description}</small>
                    </span>
                    <span className="capability-accordion__open-label">{fr ? "Contexte et brief direct" : "Context & direct brief"}</span>
                    <ChevronDown size={18} />
                  </summary>
                  <div className="capability-accordion__body">
                    <p className="capability-accordion__detail-label">{fr ? "À préciser dans le brief" : "Useful starting context"}</p>
                    <p>{capability.detail}</p>
                    <div className="capability-accordion__actions">
                      <LocaleLink to={capabilityIntakeHref} className="capability-accordion__cta">
                        {isUnity ? `${text.brief} ${capability.title}` : `${text.discuss} ${capability.title}`} <ArrowUpRight size={15} />
                      </LocaleLink>
                      <button type="button" onClick={() => downloadTemplate(capability)} className="capability-accordion__template">
                        <Download size={14} /> {text.downloadTemplate}
                      </button>
                    </div>
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      </section>
      <section className={`service-context section-pad service-context--${division}`}>
        <div className="container service-context__grid">
          <div>
            <Eyebrow theme={division}>
              {isUnity ? (fr ? "Rendre le premier échange utile" : "Make the first conversation useful") : fr ? "Un point de départ pratique" : "A practical starting point"}
            </Eyebrow>
            <h2>
              {isUnity
                ? fr
                  ? `Un brief ${(displayService?.title ?? service.title).toLowerCase()} plus clair commence par quatre éléments simples.`
                  : `A clearer ${(displayService?.title ?? service.title).toLowerCase()} brief begins with four simple things.`
                : fr
                  ? `Un échange ${(displayService?.title ?? service.title).toLowerCase()} utile commence par le contexte opérationnel.`
                  : `A useful ${(displayService?.title ?? service.title).toLowerCase()} conversation starts with operating context.`}
            </h2>
            <p>
              {isUnity
                ? fr
                  ? "Vous n’avez pas besoin d’une spécification finalisée. Une courte description du travail et les décisions ci-dessous suffisent à bien orienter la demande."
                  : "You do not need a finished specification. A short description of the work and the decisions below are enough to route the request well."
                : fr
                  ? "Vous n’avez pas besoin d’une liste de fonctionnalités définitive avant d’échanger avec eveDev Ops. Une description concise du problème opérationnel prépare mieux la conversation d’ingénierie."
                  : "You do not need a final feature list before speaking with eveDev Ops. A concise description of the operating problem gives the engineering conversation a better starting point."}
            </p>
          </div>
          <ol className="service-context__list">
            {workingContext.map((item, index) => (
              <li key={item}>
                <span>0{index + 1}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="service-bridge">
        <div className="container service-bridge__grid">
          <div>
            <span>{isUnity ? (fr ? "Note de parcours" : "Route note") : fr ? "Comment cela s’articule" : "How it connects"}</span>
            <h2>
              {isUnity
                ? fr
                  ? "Des éléments clairs, des contraintes pratiques et un contexte de livraison créent un parcours de travail plus solide."
                  : "Clear materials, practical constraints, and delivery context make a stronger route through the work."
                : fr
                  ? "De bons produits commencent par la compréhension du flux opérationnel, et non par une simple liste de fonctionnalités."
                  : "Strong product outcomes start with an understanding of the operating workflow, not merely a list of features."}
            </h2>
          </div>
          <div>
            <p>
              {isUnity
                ? fr
                  ? "Partagez les exigences de service, le volume, les contraintes et le calendrier afin que la bonne capacité professionnelle soit envisagée."
                  : "Share the service requirements, volume, constraints, and timeline so the right professional capacity can be considered."
                : fr
                  ? "Partagez l’objectif métier, les utilisateurs, les systèmes existants, les contraintes et les priorités pour que la conversation d’ingénierie commence au bon endroit."
                  : "Share the business objective, users, existing systems, constraints, and priorities so the engineering conversation starts in the right place."}
            </p>
            <LocaleLink to={isUnity ? "/unity/contact" : "/contact"} className="arrow-link">
              {isUnity ? (fr ? "Orienter ce brief de service" : "Route this service brief") : fr ? "Démarrer la conversation" : "Start the conversation"}{" "}
              <ArrowRight size={17} />
            </LocaleLink>
          </div>
        </div>
      </section>
      <CTASection
        division={division}
        title={isUnity ? (fr ? "Apportez-nous le brief de travail." : "Bring us the working brief.") : fr ? "Prêt à définir le système ?" : "Ready to define the system?"}
        body={
          isUnity
            ? fr
              ? "Indiquez à Unity ce qui doit être livré, à quelle date et quelles conditions de qualité guideront le travail."
              : "Tell Unity what needs to be delivered, when it is needed, and what quality conditions will guide the work."
            : fr
              ? "Utilisez le brief de projet pour décrire le contexte, le résultat souhaité et le calendrier."
              : "Use the project intake to describe the context, desired outcome, and timing."
        }
        primary={[
          isUnity ? `${text.brief} ${displayService?.title ?? service.title}` : `${text.discuss} ${displayService?.title ?? service.title}`,
          intakeHref,
        ]}
      />
    </>
  );
}
