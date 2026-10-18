import { ArrowLeft, ArrowUpRight, Orbit } from "lucide-react";
import { Breadcrumbs, Eyebrow } from "@/components/ContentBlocks";
import { LocaleLink } from "@/components/LocaleLink";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useLocale } from "@/lib/locale";

export default function ShwengPage() {
  const locale = useLocale();
  const fr = locale === "fr";
  useDocumentMeta(
    fr ? "Shweng | Produit d’échange inter-réseaux | eveOps Group" : "Shweng | Cross-Network Exchange Product | eveOps Group",
    fr
      ? "Shweng est une application d’échange de valeur inter-réseaux actuellement développée par eveDev Ops."
      : "Shweng is a cross-network money and value exchange application currently being developed by eveDev Ops.",
  );
  return (
    <>
      <section className="shweng-hero">
        <div className="container">
          <Breadcrumbs dark items={[[fr ? "Accueil" : "Home", "/"], [fr ? "Produits" : "Products", "/products"], ["Shweng"]]} />
          <div className="shweng-hero__grid">
            <div>
              <Eyebrow theme="edevops">{fr ? "Un produit technologique eveOps Group" : "An eveOps Group technology product"}</Eyebrow>
              <span className="shweng-status">{fr ? "En développement" : "In development"}</span>
              <h1>Shweng</h1>
              <p className="shweng-hero__strap">{fr ? "Échange inter-réseaux." : "Cross-network exchange."}</p>
              <p className="shweng-hero__copy">
                {fr
                  ? "Shweng est une application d’échange de valeur inter-réseaux actuellement développée par eveDev Ops. Les capacités et détails opérationnels du produit seront présentés à mesure que le travail avance."
                  : "Shweng is a cross-network money and value exchange application currently being developed by eveDev Ops. The product’s capabilities and operating details will be introduced as the work progresses."}
              </p>
              <div className="shweng-hero__metadata">
                <span>
                  <b>01</b>
                  {fr ? "Contexte réseau" : "Network context"}
                </span>
                <span>
                  <b>02</b>
                  {fr ? "Développement produit" : "Product development"}
                </span>
                <span>
                  <b>03</b>eveDev Ops
                </span>
              </div>
              <LocaleLink to="/contact" className="button button--solid">
                {fr ? "Échanger avec l’équipe produit" : "Talk to the product team"} <ArrowUpRight size={17} />
              </LocaleLink>
            </div>
            <div className="shweng-device">
              <div className="shweng-device__route" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <div className="shweng-device__screen">
                <span>SW</span>
                <i />
                <i />
                <i />
                <strong>{fr ? <>Échange<br />inter-réseaux</> : <>Cross-network<br />exchange</>}</strong>
                <small>{fr ? "En développement" : "Developing"}</small>
              </div>
              <Orbit size={44} />
            </div>
          </div>
        </div>
      </section>
      <section className="product-truth section-pad">
        <div className="container product-truth__grid">
          <div>
            <Eyebrow>{fr ? "Espace de mise à jour produit" : "Product update area"}</Eyebrow>
            <h2>{fr ? "Une base claire pour les informations produit au fur et à mesure de leur disponibilité." : "A clear foundation for product information as it becomes available."}</h2>
          </div>
          <div>
            <p>
              {fr
                ? "Cette page évite volontairement toute promesse de fonctionnalité non finalisée. Elle est conçue pour évoluer avec des informations vérifiées sur l’objectif, l’expérience, l’approche technique, la disponibilité et les mises à jour de Shweng."
                : "This page deliberately avoids unfinished feature claims. It is structured to grow with verified information about Shweng’s purpose, experience, technical approach, availability, and updates."}
            </p>
            <LocaleLink to="/products" className="arrow-link">
              {fr ? "Retour aux produits" : "Back to products"} <ArrowLeft size={17} />
            </LocaleLink>
          </div>
        </div>
      </section>
    </>
  );
}
