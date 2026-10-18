import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/ContentBlocks";
import { LocaleLink } from "@/components/LocaleLink";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useLocale } from "@/lib/locale";
import { isExternalHref, showcaseHref, type ShowcaseItem } from "@/lib/showcase";

const divisions = [
  {
    key: "unity" as const,
    index: "01",
    name: "Unity Integrated Solutions",
    href: "/unity",
    en: "Language, data, research, operations, and procurement work that can be shown.",
    fr: "Travaux de langue, de données, de recherche, d’opérations et d’achats qui peuvent être montrés.",
  },
  {
    key: "edevops" as const,
    index: "02",
    name: "eveDev Ops",
    href: "/edevops",
    en: "Software, products, and systems built by eveDev Ops.",
    fr: "Logiciels, produits et systèmes construits par eveDev Ops.",
  },
];

function statusLabel(status: string, fr: boolean) {
  if (!fr) return status;
  if (status === "In development") return "En développement";
  if (status === "Live") return "En ligne";
  if (status === "Completed") return "Livré";
  return status;
}

function WorkLink({ item, label }: { item: ShowcaseItem; label: string }) {
  const href = showcaseHref(item);
  if (isExternalHref(href)) {
    return (
      <a className="showcase-card__go" href={href} target="_blank" rel="noopener noreferrer">
        {label} <ArrowUpRight size={16} />
      </a>
    );
  }
  return (
    <LocaleLink to={href} className="showcase-card__go">
      {label} <ArrowUpRight size={16} />
    </LocaleLink>
  );
}

export default function ProductsPage({ items }: { items: ShowcaseItem[] }) {
  const locale = useLocale();
  const fr = locale === "fr";
  useDocumentMeta(
    fr ? "Réalisations | Unity et eveDev Ops | eveOps Group" : "Work | Unity and eveDev Ops | eveOps Group",
    fr
      ? "Une page pour le travail des deux activités d’eveOps Group : Unity Integrated Solutions et eveDev Ops."
      : "One page for work from both eveOps Group businesses: Unity Integrated Solutions and eveDev Ops.",
  );

  return (
    <>
      <section className="products-hero">
        <div className="container products-hero__grid">
          <div>
            <Eyebrow>{fr ? "Réalisations" : "Work"}</Eyebrow>
            <h1>{fr ? <>Le travail des deux <em>activités.</em></> : <>Work from both <em>businesses.</em></>}</h1>
            <p>
              {fr
                ? "Une seule page. Unity Integrated Solutions et eveDev Ops restent distincts, sans être séparés sur deux adresses."
                : "One page. Unity Integrated Solutions and eveDev Ops stay distinct, without being split onto two addresses."}
            </p>
          </div>
        </div>
      </section>
      {divisions.map((division) => {
        const rows = items.filter((item) => item.division === division.key);
        return (
          <section className={`showcase${division.key === "edevops" ? " showcase--tech" : ""}`} key={division.key}>
            <div className="container">
              <header className="showcase__head">
                <span>{division.index}</span>
                <div>
                  <h2>{division.name}</h2>
                  <p>{fr ? division.fr : division.en}</p>
                </div>
                <LocaleLink to={division.href}>{fr ? "La division" : "The division"}</LocaleLink>
              </header>
              {rows.length === 0 ? (
                <p className="showcase__empty">{fr ? "Rien n’est publié pour cette activité pour le moment." : "Nothing from this business is published yet."}</p>
              ) : (
                <div className="showcase__grid">
                  {rows.map((item) => (
                    <article className="showcase-card" key={item.id}>
                      {item.hasMedia ? <img src={`/api/showcase-media/${item.id}`} alt="" width={640} height={400} loading="lazy" decoding="async" /> : null}
                      <p>{statusLabel(item.status, fr)}</p>
                      <h3>{item.name}</h3>
                      {item.category ? <span>{item.category}</span> : null}
                      <p>{fr && item.summaryFr ? item.summaryFr : item.summary}</p>
                      <WorkLink item={item} label={fr ? "Voir" : "View"} />
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })}
      <section className="products-note">
        <div className="container products-note__grid">
          <p className="products-note__label">{fr ? "Publication" : "Publication"}</p>
          <p>
            {fr
              ? "Un travail n’apparaît ici que lorsqu’il peut être montré. Le détail client reste hors de la page tant qu’il n’est pas approuvé."
              : "A piece of work appears here only when it can be shown. Client detail stays off the page until it is approved."}
          </p>
        </div>
      </section>
    </>
  );
}
