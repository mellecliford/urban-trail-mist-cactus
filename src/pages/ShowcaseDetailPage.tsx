import { ArrowLeft } from "lucide-react";
import { LocaleLink } from "@/components/LocaleLink";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useLocale } from "@/lib/locale";
import type { ShowcaseItem } from "@/lib/showcase";
import NotFound from "@/pages/NotFound";

export default function ShowcaseDetailPage({ item }: { item: ShowcaseItem | null }) {
  const locale = useLocale();
  const fr = locale === "fr";
  useDocumentMeta(
    item ? `${item.name} | eveOps Group` : fr ? "Page introuvable | eveOps Group" : "Page not found | eveOps Group",
    item ? (fr && item.summaryFr ? item.summaryFr : item.summary) : fr ? "Cette page n’existe pas." : "This page does not exist.",
    item ? undefined : { noindex: true },
  );
  if (!item) return <NotFound />;
  const division = item.division === "unity" ? "Unity Integrated Solutions" : "eveDev Ops";
  return (
    <section className="showcase-detail section-pad">
      <div className="container">
        <LocaleLink to="/products" className="showcase-detail__back">
          <ArrowLeft size={16} /> {fr ? "Toutes les réalisations" : "All work"}
        </LocaleLink>
        <p className="showcase-detail__division">{division}</p>
        <h1>{item.name}</h1>
        {item.hasMedia ? <img className="showcase-detail__media" src={`/api/showcase-media/${item.id}`} alt="" /> : null}
        {item.category ? <p className="showcase-detail__meta">{item.category}</p> : null}
        <p className="showcase-detail__summary">{fr && item.summaryFr ? item.summaryFr : item.summary}</p>
      </div>
    </section>
  );
}
