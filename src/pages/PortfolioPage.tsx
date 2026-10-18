import { ArrowRight, Boxes, LockKeyhole } from "lucide-react";
import { Eyebrow } from "@/components/ContentBlocks";
import { LocaleLink } from "@/components/LocaleLink";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useLocale } from "@/lib/locale";

export default function PortfolioPage() {
  const locale = useLocale();
  const fr = locale === "fr";
  useDocumentMeta(
    fr ? "Réalisations eveOps Group | Produits et solutions clients" : "eveOps Group Portfolio | Products & Client Solutions",
    fr
      ? "Découvrez comment eveOps Group distingue ses propres produits technologiques des solutions logicielles et numériques développées pour des organisations clientes."
      : "Explore how eveOps Group differentiates its own technology products from software and digital solutions developed for client organizations.",
  );
  return (
    <>
      <section className="portfolio-hero">
        <div className="container portfolio-hero__grid">
          <div>
            <Eyebrow>{fr ? "Réalisations" : "Portfolio"}</Eyebrow>
            <h1>{fr ? <>Des produits, des systèmes et des <em>logiciels opérationnels.</em></> : <>Products, systems, and <em>working software.</em></>}</h1>
          </div>
          <p>
            {fr
              ? "Nos réalisations sont organisées pour clarifier une distinction importante : la technologie détenue ou opérée par eveOps Group est différente des solutions clients développées dans le cadre d’une mission."
              : "Our portfolio is organized to make one important distinction clear: technology owned or operated by eveOps Group is different from client solutions developed under an engagement."}
          </p>
        </div>
      </section>
      <section className="portfolio-paths section-pad">
        <div className="container portfolio-paths__grid">
          <article className="portfolio-path portfolio-path--product">
            <Boxes size={30} />
            <p className="portfolio-path__type">{fr ? "Produits" : "Products"}</p>
            <h2>{fr ? "Des produits logiciels par eveOps Group." : "Software products by eveOps Group."}</h2>
            <p>
              {fr
                ? "Des produits détenus ou opérés par eveOps Group, y compris les travaux développés par eveDev Ops."
                : "Products owned or operated by eveOps Group, including work developed through eveDev Ops."}
            </p>
            <LocaleLink to="/products" className="arrow-link">
              {fr ? "Explorer les produits" : "Explore products"} <ArrowRight size={17} />
            </LocaleLink>
          </article>
          <article className="portfolio-path portfolio-path--client">
            <LockKeyhole size={30} />
            <p className="portfolio-path__type">{fr ? "Solutions clients" : "Client solutions"}</p>
            <h2>{fr ? "Conçues en tenant compte du contexte client." : "Built with client context in mind."}</h2>
            <p>
              {fr
                ? "Les logiciels et produits numériques développés pour des clients peuvent être présentés ici lorsque les détails sont approuvés pour publication."
                : "Software and digital products developed for clients can be presented here where details are approved for publication."}
            </p>
            <LocaleLink to="/contact" className="arrow-link arrow-link--light">
              {fr ? "Échanger sur une solution client" : "Discuss a client solution"} <ArrowRight size={17} />
            </LocaleLink>
          </article>
        </div>
      </section>
      <section className="portfolio-standards">
        <div className="container portfolio-standards__grid">
          <span>{fr ? "Exigence de présentation" : "Portfolio standard"}</span>
          <p>
            {fr
              ? "Lorsqu’un projet peut être partagé, il peut présenter la catégorie de produit, le problème, la solution, les technologies, le résultat approuvé, des captures d’écran et une prochaine étape claire, sans inventer de résultats ni exposer d’informations client confidentielles."
              : "When a project is ready to be shared, it can include the product category, problem, solution, technologies, approved outcome, screenshots, and a clear next step—without inventing results or exposing confidential client information."}
          </p>
        </div>
      </section>
    </>
  );
}
