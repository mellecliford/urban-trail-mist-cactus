import { ArrowRight, BookOpenText } from "lucide-react";
import { Eyebrow } from "@/components/ContentBlocks";
import { LocaleLink } from "@/components/LocaleLink";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useLocale } from "@/lib/locale";

export default function InsightsPage() {
  const locale = useLocale();
  const fr = locale === "fr";
  useDocumentMeta(
    fr ? "Réflexions | eveOps Group" : "Insights | eveOps Group",
    fr
      ? "Le futur espace éditorial eveOps Group pour les services professionnels, les données IA, l’ingénierie logicielle, l’automatisation, le cloud et les produits numériques."
      : "A future-focused eveOps Group editorial hub for professional services, AI data, software engineering, automation, cloud, and product development insights.",
  );
  return (
    <>
      <section className="insights-hero">
        <div className="container insights-hero__grid">
          <div>
            <Eyebrow>{fr ? "Réflexions" : "Insights"}</Eyebrow>
            <h1>
              {fr ? (
                <>Des réflexions pratiques pour le travail qui relie <em>les personnes et les systèmes.</em></>
              ) : (
                <>Practical thinking for work that connects <em>people and systems.</em></>
              )}
            </h1>
          </div>
          <BookOpenText size={44} />
        </div>
      </section>
      <section className="insights-empty section-pad">
        <div className="container insights-empty__grid">
          <div>
            <span>{fr ? "Fondation éditoriale" : "Editorial foundation"}</span>
            <h2>{fr ? "Un espace prêt pour le SEO et des idées utiles, précises." : "An SEO-ready home for useful, specific ideas."}</h2>
          </div>
          <div>
            <p>
              {fr
                ? "Les futurs articles pourront aborder les données IA, l’externalisation, les services linguistiques, les équipes, les achats et la recherche avec Unity, ainsi que l’ingénierie logicielle, l’IA, le SaaS, l’automatisation, le cloud, le DevOps et le développement produit avec eveDev Ops."
                : "Future articles can cover Unity topics such as AI data, outsourcing, language services, workforce, procurement, and research, alongside eveDev Ops topics such as software engineering, AI, SaaS, automation, cloud, DevOps, and product development."}
            </p>
            <LocaleLink to="/contact" className="arrow-link">
              {fr ? "Échanger sur une capacité eveOps Group" : "Discuss an eveOps Group capability"} <ArrowRight size={17} />
            </LocaleLink>
          </div>
        </div>
      </section>
    </>
  );
}
