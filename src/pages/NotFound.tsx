import { ArrowRight } from "lucide-react";
import { LocaleLink } from "@/components/LocaleLink";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useLocale, useLocationSearch, usePathname } from "@/lib/locale";
import { resolveSeo } from "@/lib/seo";

export default function NotFound() {
  const locale = useLocale();
  const fr = locale === "fr";
  const seo = resolveSeo(usePathname(), useLocationSearch());
  useDocumentMeta(seo.title, seo.description, { noindex: true });
  return (
    <section className="not-found section-pad">
      <div className="container">
        <span>404</span>
        <h1>{fr ? "Cette page a été déplacée ou n’existe pas." : "This route has moved or does not exist."}</h1>
        <p>
          {fr
            ? "Utilisez les parcours de division pour découvrir les services professionnels ou l’ingénierie logicielle, ou revenez à l’accueil d’eveOps Group."
            : "Use the division routes to explore professional services or software engineering, or return to the eveOps Group homepage."}
        </p>
        <LocaleLink to="/" className="button button--solid">
          {fr ? "Retour à eveOps Group" : "Return to eveOps Group"} <ArrowRight size={17} />
        </LocaleLink>
      </div>
    </section>
  );
}
