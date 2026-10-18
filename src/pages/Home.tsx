import { ArrowRight, ArrowUpRight, Network, Sparkles, UsersRound } from "lucide-react";
import { assets, divisions } from "@/content/site";
import { ArrowLink, Eyebrow, SectionHeading } from "@/components/ContentBlocks";
import { CompanyProfileDownload } from "@/components/CompanyProfileDownload";
import { HomeHero } from "@/components/HomeHero";
import { LocaleLink } from "@/components/LocaleLink";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useLocale } from "@/lib/locale";

export default function Home() {
  const locale = useLocale();
  const fr = locale === "fr";
  useDocumentMeta(
    fr ? "eveOps Group | Services professionnels, logiciels et solutions IA" : "eveOps Group | Professional Services, Software & AI Solutions",
    fr
      ? "eveOps Group combine solutions de main-d’œuvre, services de données IA, achats et ingénierie logicielle par l’intermédiaire de Unity Integrated Solutions et eveDev Ops."
      : "eveOps Group combines professional workforce solutions, AI data services, procurement support, and software engineering through Unity Integrated Solutions and eveDev Ops.",
  );

  return (
    <>
      <HomeHero locale={locale} />

      <section id="divisions" className="division-gateway">
        <div className="division-gateway__heading container">
          <Eyebrow>{fr ? "Choisissez votre parcours" : "Choose your route"}</Eyebrow>
          <p>
            {fr
              ? "Deux modèles opérationnels distincts. Une même organisation, conçue pour les entreprises qui ont besoin d’expertise humaine, de systèmes conçus sur mesure, ou des deux."
              : "Two distinct operating models. One parent company built for organizations that need human expertise, engineered systems, or both."}
          </p>
        </div>
        <div className="division-gateway__cards">
          <LocaleLink to="/unity" className="division-panel division-panel--unity">
            <div className="division-panel__image" style={{ backgroundImage: `url(${assets.unity})` }} />
            <div className="division-panel__shade" />
            <div className="division-panel__content">
              <span className="division-panel__index">{fr ? "01 — Équipes et opérations" : "01 — People & operations"}</span>
              <h2>
                Unity
                <br />
                <em>Integrated Solutions</em>
              </h2>
              <p>{fr ? "Services professionnels coordonnés" : divisions.unity.eyebrow}</p>
              <span className="division-panel__keywords">
                {fr ? "Traduction · données IA · recherche · annotation · achats · équipes" : "Translation · AI data · research · annotation · procurement · workforce"}
              </span>
              <span className="division-panel__cta">
                {fr ? "Explorer Unity" : "Explore Unity"} <ArrowUpRight size={18} />
              </span>
            </div>
          </LocaleLink>
          <LocaleLink to="/edevops" className="division-panel division-panel--edevops">
            <div className="division-panel__image" style={{ backgroundImage: `url(${assets.edevops})` }} />
            <div className="division-panel__shade" />
            <div className="division-panel__content">
              <span className="division-panel__index">{fr ? "02 — Systèmes et produits" : "02 — Systems & products"}</span>
              <h2>
                eveDev
                <br />
                <em>Ops</em>
              </h2>
              <p>{fr ? "Ingénierie logicielle · IA · produits numériques" : divisions.edevops.eyebrow}</p>
              <span className="division-panel__keywords">
                {fr ? "Logiciel · IA · SaaS · mobile · automatisation · cloud · DevOps" : "Software · AI · SaaS · mobile · automation · cloud · DevOps"}
              </span>
              <span className="division-panel__cta">
                {fr ? "Explorer eveDev Ops" : "Explore eveDev Ops"} <ArrowUpRight size={18} />
              </span>
            </div>
          </LocaleLink>
        </div>
      </section>

      <section className="parent-intro section-pad">
        <div className="container parent-intro__grid">
          <div className="parent-intro__rail">
            <span>Group</span>
            <i />
          </div>
          <div>
            <SectionHeading
              eyebrow={fr ? "Qu’est-ce qu’eveOps Group ?" : "What is eveOps Group?"}
              title={fr ? <>Un partenaire opérationnel pour <em>un travail exigeant.</em></> : <>An operating partner for <em>serious work.</em></>}
              description={
                fr
                  ? "eveOps Group est un groupe pluridisciplinaire qui réunit expertise professionnelle, ingénierie logicielle et innovation numérique. Notre structure par division facilite l’accès à la bonne capacité pour le bon enjeu opérationnel."
                  : "eveOps Group is a multidisciplinary group combining professional human expertise with software engineering and digital innovation. Our division structure makes it easier to bring the right capability to the right operating problem."
              }
            />
          </div>
          <div className="parent-intro__capabilities">
            <article>
              <div className="parent-intro__icon">
                <UsersRound size={21} />
              </div>
              <p className="parent-intro__type">{fr ? "Services professionnels" : "Professional services"}</p>
              <h3>{fr ? "Une expertise humaine structurée pour la livraison." : "Human expertise, structured for delivery."}</h3>
              <p>
                {fr
                  ? "Unity Integrated Solutions propose un soutien professionnel pour les données IA, les services linguistiques, la recherche, la transcription, les achats et les opérations métiers."
                  : "Unity Integrated Solutions provides professional workforce support across AI data, language services, research, transcription, procurement, and business operations."}
              </p>
              <ArrowLink href="/unity">{fr ? "Explorer Unity Integrated Solutions" : "Explore Unity Integrated Solutions"}</ArrowLink>
            </article>
            <article>
              <div className="parent-intro__icon parent-intro__icon--tech">
                <Network size={21} />
              </div>
              <p className="parent-intro__type">{fr ? "Technologie et logiciel" : "Technology & software"}</p>
              <h3>{fr ? "Des systèmes numériques conçus pour faire avancer le travail." : "Digital systems designed to move the work forward."}</h3>
              <p>
                {fr
                  ? "eveDev Ops conçoit et construit des sites web, applications mobiles, plateformes SaaS, API, systèmes d’IA, solutions d’automatisation, infrastructures cloud et produits numériques."
                  : "eveDev Ops designs and builds websites, mobile applications, SaaS platforms, APIs, AI systems, automation solutions, cloud infrastructure, and digital products."}
              </p>
              <ArrowLink href="/edevops">{fr ? "Explorer eveDev Ops" : "Explore eveDev Ops"}</ArrowLink>
            </article>
          </div>
        </div>
      </section>

      <section className="connection-band">
        <div className="container connection-band__grid">
          <div className="connection-band__marker">
            <Sparkles size={22} />
            <span>{fr ? "Au point de rencontre" : "At the seam"}</span>
          </div>
          <div>
            <p className="connection-band__large">
              {fr ? (
                <>Les meilleures solutions ont souvent besoin d’une équipe compétente <em>et</em> d’un système capable.</>
              ) : (
                <>The best solutions often need both a capable team <em>and</em> a capable system.</>
              )}
            </p>
          </div>
          <div>
            <p>
              {fr
                ? "La structure du groupe ouvre un parcours clair vers chaque division tout en laissant les services professionnels et la technologie se soutenir lorsque le projet l’exige."
                : "Our group structure creates a clear route into each division while leaving room for professional services and technology work to support one another when a project calls for it."}
            </p>
            <ArrowLink href="/about" dark>
              {fr ? "Comment eveOps Group est organisé" : "How eveOps Group is organized"}
            </ArrowLink>
          </div>
        </div>
      </section>

      <CompanyProfileDownload />

      <section className="section-pad parent-products">
        <div className="container parent-products__grid">
          <div>
            <Eyebrow>{fr ? "Produits par eveOps Group" : "Products by eveOps Group"}</Eyebrow>
            <h2>{fr ? "Conçus pour le marché, pas seulement pour un brief client." : "Built for the market, not just a client brief."}</h2>
          </div>
          <div className="product-preview">
            <div>
              <span className="product-preview__status">{fr ? "En développement" : "In development"}</span>
              <p className="product-preview__name">Shweng</p>
              <p>
                {fr
                  ? "Une infrastructure d’échange inter-réseaux actuellement développée par eveDev Ops."
                  : "Cross-network exchange infrastructure currently being developed by eveDev Ops."}
              </p>
            </div>
            <LocaleLink to="/products/shweng" className="round-arrow" aria-label="View Shweng">
              <ArrowUpRight size={20} />
            </LocaleLink>
          </div>
          <div className="parent-products__link">
            <LocaleLink to="/products">
              {fr ? "Voir les produits" : "View products"} <ArrowRight size={16} />
            </LocaleLink>
          </div>
        </div>
      </section>
    </>
  );
}
