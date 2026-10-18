import { ArrowRight, Network, UsersRound } from "lucide-react";
import { Eyebrow } from "@/components/ContentBlocks";
import { LocaleLink } from "@/components/LocaleLink";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useLocale } from "@/lib/locale";

export default function AboutPage() {
  const locale = useLocale();
  const fr = locale === "fr";
  useDocumentMeta(
    fr ? "À propos d’eveOps Group | Services professionnels et ingénierie logicielle" : "About eveOps Group | Professional Services & Software Engineering",
    fr
      ? "eveOps Group est un groupe pluridisciplinaire d’opérations et de technologie qui associe expertise professionnelle, ingénierie logicielle et innovation numérique."
      : "eveOps Group is a multidisciplinary operations and technology group combining professional human expertise with software engineering and digital innovation.",
  );
  return (
    <>
      <section className="about-hero">
        <div className="container about-hero__grid">
          <div>
            <Eyebrow>{fr ? "À propos d’eveOps Group" : "About eveOps Group"}</Eyebrow>
            <h1>
              {fr ? (
                <>Un groupe construit autour d’une vision plus complète de <em>la manière dont le travail se réalise.</em></>
              ) : (
                <>One group, built around a more complete view of <em>how work gets done.</em></>
              )}
            </h1>
          </div>
          <p>
            {fr
              ? "eveOps Group est un groupe pluridisciplinaire d’opérations et de technologie qui associe expertise professionnelle, ingénierie logicielle et innovation numérique."
              : "eveOps Group is a multidisciplinary operations and technology group combining professional human expertise with software engineering and digital innovation."}
          </p>
        </div>
      </section>
      <section className="about-structure section-pad">
        <div className="container">
          <div className="about-structure__intro">
            <span>{fr ? "Structure du groupe" : "Group structure"}</span>
            <p>
              {fr
                ? "Les disciplines indépendantes fonctionnent mieux lorsque leurs rôles sont clairs. eveOps Group est organisé autour de deux divisions distinctes, chacune avec un domaine de priorité propre et un même niveau d’exigence pour une livraison réfléchie."
                : "Independent disciplines work better when their roles are clear. eveOps Group is organized around two distinct divisions, each with an ownable area of focus and a shared standard for thoughtful delivery."}
            </p>
          </div>
          <div className="about-division-row about-division-row--unity">
            <div className="about-division-row__icon">
              <UsersRound size={25} />
            </div>
            <div>
              <p className="about-division-row__number">01</p>
              <h2>Unity Integrated Solutions</h2>
            </div>
            <p>
              {fr
                ? "Des équipes professionnelles et des services métiers couvrant les données IA, les langues, la recherche, le soutien aux entreprises, les achats et les opérations."
                : "Professional workforce and business services across AI data, language, research, business support, procurement, and operations."}
            </p>
            <LocaleLink to="/unity" className="round-arrow" aria-label="Explore Unity">
              <ArrowRight size={19} />
            </LocaleLink>
          </div>
          <div className="about-division-row about-division-row--edevops">
            <div className="about-division-row__icon">
              <Network size={25} />
            </div>
            <div>
              <p className="about-division-row__number">02</p>
              <h2>eveDev Ops</h2>
            </div>
            <p>
              {fr
                ? "De l’ingénierie logicielle et des produits numériques pour le web, le mobile, le SaaS, l’IA, l’automatisation, les API, le cloud et le DevOps."
                : "Software engineering and digital products across web, mobile, SaaS, AI, automation, APIs, cloud, and DevOps."}
            </p>
            <LocaleLink to="/edevops" className="round-arrow" aria-label="Explore eveDev Ops">
              <ArrowRight size={19} />
            </LocaleLink>
          </div>
        </div>
      </section>
      <section className="about-principles">
        <div className="container about-principles__grid">
          <p className="about-principles__label">{fr ? "Principes opérationnels" : "Operating principles"}</p>
          <div>
            <h2>
              {fr ? (
                <>
                  De la clarté dans le brief.
                  <br />
                  Du soin dans la réalisation.
                  <br />
                  <em>Une attention à la livraison.</em>
                </>
              ) : (
                <>
                  Clarity in the brief.
                  <br />
                  Care in the build.
                  <br />
                  <em>Focus on the delivery.</em>
                </>
              )}
            </h2>
          </div>
          <div>
            <p>
              {fr
                ? "eveOps Group réunit services professionnels et capacités technologiques sans les réduire à une seule offre. La structure du groupe permet de travailler directement avec la bonne division et de reconnaître la valeur d’une expertise connectée lorsqu’un projet en a besoin."
                : "eveOps Group brings together professional services and technology capability without collapsing them into the same offering. The group structure makes it possible to work with the right division directly—and to recognize the value of connected expertise when a project needs it."}
            </p>
            <LocaleLink to="/contact" className="arrow-link arrow-link--light">
              {fr ? "Échanger avec eveOps Group" : "Talk to eveOps Group"} <ArrowRight size={17} />
            </LocaleLink>
          </div>
        </div>
      </section>
    </>
  );
}
