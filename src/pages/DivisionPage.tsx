import { ArrowRight, ArrowUpRight, Layers3, Network, ShieldCheck } from "lucide-react";
import { assets, divisions, edevopsTech, type DivisionKey } from "@/content/site";
import { ArrowLink, CTASection, Eyebrow, SectionHeading, ServiceGrid } from "@/components/ContentBlocks";
import { DivisionLoadMark } from "@/components/PageMotion";
import { DivisionReach } from "@/components/DivisionReach";
import { LocaleLink } from "@/components/LocaleLink";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useLocale } from "@/lib/locale";
import { getDivisionHeroHeadline } from "@/lib/publicPresentation";

const localizedUnityProcess = {
  en: [
    ["01", "Tell us what you need", "Share the work, scope, requirements, and practical constraints."],
    ["02", "Assemble the right workforce", "Match the project with the appropriate professional capacity."],
    ["03", "Work begins", "Teams execute against the agreed brief and delivery expectations."],
    ["04", "Quality assurance", "Deliverables are reviewed against the project’s requirements."],
    ["05", "Delivery", "Final work is prepared for handover."],
  ],
  fr: [
    ["01", "Présentez le besoin", "Partagez le travail, le périmètre, les exigences et les contraintes pratiques."],
    ["02", "Réunir la bonne équipe", "Associez le projet à la capacité professionnelle adaptée."],
    ["03", "Lancer le travail", "Les équipes réalisent le travail selon le brief et les attentes de livraison convenus."],
    ["04", "Assurer la qualité", "Les livrables sont examinés au regard des exigences du projet."],
    ["05", "Remettre le résultat", "Le travail final est préparé pour une transmission claire."],
  ],
} as const;

export default function DivisionPage({ division }: { division: DivisionKey }) {
  const item = divisions[division];
  const isUnity = division === "unity";
  const locale = useLocale();
  const fr = locale === "fr";
  useDocumentMeta(
    fr ? `${item.name} | Services professionnels et numériques` : `${item.name} | eveOps Group`,
    fr
      ? `${item.name} accompagne les organisations avec des services professionnels, des systèmes numériques et une livraison structurée.`
      : item.description,
  );

  return (
    <>
      <section className={`division-hero division-hero--${division}`}>
        <div className="division-hero__media">
          <img
            src={item.image}
            srcSet={`${item.image.replace(".webp", "-800.webp")} 800w, ${item.image} 1800w`}
            sizes="(max-width: 760px) 100vw, 60vw"
            alt={fr ? `Illustration du travail ${item.name}` : `${item.name} work`}
            width={1800}
            height={1013}
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <DivisionLoadMark theme={isUnity ? "unity" : "edevops"} />
        <div className="container division-hero__inner">
          <div className="division-hero__rail">
            <span>{isUnity ? "01" : "02"}</span>
            <i />
            <span>{isUnity ? "Unity" : "eveDev"}</span>
          </div>
          <div className="division-hero__copy">
            {isUnity && (
              <LocaleLink to="/unity/contact" className="unity-hero__brand-entry" aria-label="Start a Unity service brief">
                <img src={assets.unityMark} alt="" width={48} height={48} decoding="async" />
                <span>
                  <small>Unity Integrated Solutions</small>
                  <strong>
                    {fr ? "Démarrer un brief de service" : "Start a service brief"} <ArrowUpRight size={15} />
                  </strong>
                </span>
              </LocaleLink>
            )}
            <Eyebrow theme={division}>
              {isUnity
                ? fr
                  ? "Services professionnels · Main-d’œuvre internationale"
                  : "Professional services · Global workforce"
                : fr
                  ? "Ingénierie logicielle · IA · produits numériques"
                  : item.eyebrow}
            </Eyebrow>
            <h1>{getDivisionHeroHeadline(division, locale)}</h1>
            {isUnity && (
              <p className="division-hero__manifesto">
                {fr ? "Des équipes professionnelles. Des solutions intégrées." : "Professional Workforces. Integrated Solutions."}
              </p>
            )}
            <p>
              {fr
                ? isUnity
                  ? "Des équipes professionnelles structurées pour les services linguistiques, les données IA, la recherche, la transcription, les opérations et les achats."
                  : "Des sites web, applications mobiles, plateformes SaaS, systèmes d’IA, automatisations, API et produits numériques conçus pour un usage concret."
                : item.description}
            </p>
            <div className="division-hero__actions">
              <LocaleLink to={isUnity ? "/unity/contact" : "/contact"} className="button button--solid">
                {isUnity ? (fr ? "Demander un service" : "Request a service") : fr ? "Démarrer un projet logiciel" : "Start a software project"}{" "}
                <ArrowUpRight size={17} />
              </LocaleLink>
              <a href="#services" className="button button--text">
                {fr ? "Explorer les services" : "Explore services"} <ArrowRight size={17} />
              </a>
            </div>
          </div>
          {!isUnity && (
            <div className="division-hero__stamp">
              <span>{fr ? "Une division de" : "Part of"}</span>
              <strong>
                eveOps
                <br />
                Group
              </strong>
            </div>
          )}
          <div className="division-hero__system-label" aria-hidden="true">
            {isUnity ? (fr ? "ORIENTER / COORDONNER / LIVRER" : "ROUTE / COORDINATE / DELIVER") : fr ? "CADRER / CONSTRUIRE / DÉPLOYER" : "FRAME / BUILD / DEPLOY"}
          </div>
        </div>
      </section>

      <section id="services" className={`division-services section-pad division-services--${division}`}>
        <div className="container">
          <SectionHeading
            theme={division}
            eyebrow={
              isUnity
                ? fr
                  ? "Une main-d’œuvre flexible, adaptée au travail"
                  : "A flexible workforce, shaped around the work"
                : fr
                  ? "Une capacité d’ingénierie organisée autour du système"
                  : "Engineering capability, organized by the system"
            }
            title={
              isUnity
                ? fr
                  ? <>Une expertise qui prolonge <em>votre capacité opérationnelle.</em></>
                  : <>Expertise that extends <em>your operating capacity.</em></>
                : fr
                  ? <>Construire sur une <em>base technique solide.</em></>
                  : <>Build from a solid technical <em>foundation.</em></>
            }
            description={
              isUnity
                ? fr
                  ? "Unity propose un accompagnement pratique, aligné sur vos projets. Explorez un domaine de service pour voir les types de travaux qu’il peut inclure."
                  : "Unity is structured around practical, project-aligned support. Explore a service area to see the kinds of work it can include."
                : fr
                  ? "eveDev Ops associe réflexion produit et pratique d’ingénierie pour des systèmes numériques qui doivent être performants au-delà du lancement."
                  : "eveDev Ops brings product thinking and engineering practice to digital systems that need to perform beyond launch."
            }
          />
          <ServiceGrid division={division} services={item.services} />
        </div>
      </section>

      {isUnity ? (
        <section className="unity-process section-pad">
          <div className="container unity-process__grid">
            <div>
              <Eyebrow theme="unity">{fr ? "Un parcours de livraison clair" : "A clear delivery path"}</Eyebrow>
              <h2>
                {fr
                  ? "Conçu autour du brief de travail, et non comme une place de marché de talents générique."
                  : "Designed around the working brief, not a generic talent marketplace."}
              </h2>
              <p>
                {fr
                  ? "Unity organise ses services professionnels comme un soutien structuré aux équipes et aux opérations. L’engagement commence par les exigences et progresse vers une remise définie."
                  : "Unity positions its professional services as structured workforce and operational support. The engagement begins with the requirements and moves toward a defined handover."}
              </p>
              <ArrowLink href="/unity/contact">{fr ? "Démarrer une conversation de service" : "Start a service conversation"}</ArrowLink>
            </div>
            <ol className="process-list">
              {localizedUnityProcess[locale].map(([number, title, copy]) => (
                <li key={number}>
                  <span>{number}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : (
        <section className="tech-ecosystem section-pad">
          <div className="container tech-ecosystem__grid">
            <div>
              <Eyebrow theme="edevops">{fr ? "Écosystème technologique" : "Technology ecosystem"}</Eyebrow>
              <h2>
                {fr
                  ? "Des outils choisis autour du produit, du flux de travail et de l’environnement d’exploitation."
                  : "Tooling chosen around the product, the workflow, and the operating environment."}
              </h2>
              <p>
                {fr
                  ? "Les capacités techniques peuvent être réunies dans une base de livraison cohérente, sans traiter une liste de technologies comme un substitut au jugement d’ingénierie."
                  : "Technical capabilities can be combined into a practical delivery stack without treating a technology list as a substitute for engineering judgment."}
              </p>
            </div>
            <div className="tech-orbit">
              <div className="tech-orbit__core">
                <Network size={26} />
                <span>{fr ? <>Systèmes<br />produit</> : <>Product<br />systems</>}</span>
              </div>
              {edevopsTech.map((tech, index) => (
                <span key={tech} className={`tech-orbit__item tech-orbit__item--${index + 1}`}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={`division-positioning division-positioning--${division}`}>
        <div className="container division-positioning__grid">
          <div className="division-positioning__signal">{isUnity ? <Layers3 size={24} /> : <ShieldCheck size={24} />}</div>
          <div>
            <p className="division-positioning__eyebrow">{fr ? "La raison d’être de cette division" : "Why this division exists"}</p>
            <h2>
              {isUnity
                ? fr
                  ? "Pas seulement des tâches isolées. Une façon plus structurée d’intégrer des personnes compétentes au travail."
                  : "Not just individual tasks. A more organized way to bring capable people into the work."
                : fr
                  ? "Pas seulement la livraison d’un projet. Une façon plus réfléchie de transformer des besoins métier en logiciel opérationnel."
                  : "Not just project delivery. A more considered way to turn business requirements into working software."}
            </h2>
          </div>
          <div>
            <p>
              {isUnity
                ? fr
                  ? "Unity aide les organisations à accéder à des équipes structurées et à un soutien spécialisé dans les langues, les données IA, la recherche, le contenu et les opérations."
                  : "Unity helps organizations access structured teams and specialist support across language, AI data, research, content, and operations."
                : fr
                  ? "eveDev Ops se concentre sur les logiciels, systèmes, automatisations et produits technologiques dont les décisions d’ingénierie doivent rester reliées aux résultats opérationnels."
                  : "eveDev Ops focuses on software, systems, automation, and technology products where engineering decisions need to remain connected to operational outcomes."}
            </p>
            <ArrowLink href={isUnity ? "/unity/services" : "/about"}>
              {isUnity ? (fr ? "Explorer les services Unity" : "Explore Unity services") : fr ? "À propos d’eveOps Group" : "About eveOps Group"}
            </ArrowLink>
          </div>
        </div>
      </section>

      <DivisionReach division={division} />

      <CTASection
        division={division}
        title={
          isUnity
            ? fr
              ? "Apportez la bonne capacité humaine au travail."
              : "Bring the right workforce to the work."
            : fr
              ? "Transformez le problème opérationnel en plan produit."
              : "Turn the operating problem into a product plan."
        }
        body={
          isUnity
            ? fr
              ? "Parlez-nous du service, du volume, du calendrier et des exigences de travail. Nous orienterons l’échange vers la capacité adaptée."
              : "Tell us about the service, volume, timeline, and working requirements. We’ll help route the conversation to the appropriate capability."
            : fr
              ? "Partagez le produit, la plateforme, l’automatisation ou le système envisagé. Nous vous aiderons à organiser la prochaine étape utile."
              : "Share the product, platform, automation, or system you are considering. We’ll help establish the next working step."
        }
        primary={[
          isUnity ? (fr ? "Demander un service" : "Request a service") : fr ? "Démarrer un projet logiciel" : "Start a software project",
          isUnity ? "/unity/contact" : "/contact",
        ]}
        secondary={[
          isUnity ? (fr ? "Explorer les services Unity" : "Explore Unity services") : fr ? "Explorer eveOps Group" : "Explore eveOps Group",
          isUnity ? "/unity/services" : "/about",
        ]}
      />
    </>
  );
}
