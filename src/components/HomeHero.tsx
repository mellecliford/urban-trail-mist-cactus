import { ArrowUpRight } from "lucide-react";
import { LocaleLink } from "./LocaleLink";
import { QuickContactModal } from "./QuickContactModal";
import type { PublicLocale } from "@/lib/publicLocale";

export function HomeHero({ locale }: { locale: PublicLocale }) {
  const fr = locale === "fr";
  return (
    <section className="firm-hero">
      <div className="container firm-hero__layout">
        <div className="firm-hero__copy">
          <p className="firm-hero__kicker">eveOps Group</p>
          <h1>
            {fr ? "L’expertise humaine et le logiciel, dans un seul groupe." : "Human expertise and software, in one group."}
          </h1>
          <p>
            {fr
              ? "Unity Integrated Solutions mène les services professionnels. eveDev Ops construit le logiciel, l’IA et les produits."
              : "Unity Integrated Solutions runs the professional services. eveDev Ops builds the software, AI, and products."}
          </p>
          <div className="firm-hero__actions">
            <QuickContactModal locale={locale} />
          </div>
        </div>
        <nav className="firm-hero__routes" aria-label={fr ? "Divisions" : "Divisions"}>
          <LocaleLink to="/unity">
            <span>Unity Integrated Solutions</span>
            <small>{fr ? "Équipes, langues, données, achats" : "People, language, data, procurement"}</small>
            <ArrowUpRight size={18} />
          </LocaleLink>
          <LocaleLink to="/edevops">
            <span>eveDev Ops</span>
            <small>{fr ? "Logiciel, IA et produits" : "Software, AI, and products"}</small>
            <ArrowUpRight size={18} />
          </LocaleLink>
        </nav>
      </div>
    </section>
  );
}
