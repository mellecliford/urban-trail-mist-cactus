import { policies, type PolicyId } from "@/content/policies";
import { Eyebrow } from "@/components/ContentBlocks";
import { LocaleLink } from "@/components/LocaleLink";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useLocale } from "@/lib/locale";

const order: PolicyId[] = ["privacy", "cookies", "terms"];

export default function LegalPage({ type }: { type: PolicyId }) {
  const locale = useLocale();
  const doc = policies[type][locale];
  useDocumentMeta(`${doc.title} | eveOps Group`, doc.lede);
  return (
    <article className="legal-page">
      <div className="container legal-page__inner">
        <Eyebrow>{doc.kicker}</Eyebrow>
        <h1>{doc.title}</h1>
        <p className="legal-page__updated">{locale === "fr" ? `Mis à jour le ${doc.updated}` : `Updated ${doc.updated}`}</p>
        <p className="legal-page__lede">{doc.lede}</p>
        <nav className="legal-page__nav" aria-label={locale === "fr" ? "Documents" : "Documents"}>
          {order.map((id) => (
            <LocaleLink key={id} to={`/${id}`} aria-current={id === type ? "page" : undefined}>
              {policies[id][locale].title}
            </LocaleLink>
          ))}
        </nav>
        {doc.sections.map((section) => (
          <section key={section.heading} className="legal-page__section">
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
