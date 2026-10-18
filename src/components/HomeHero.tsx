import { ArrowUpRight } from "lucide-react";
import { LocaleLink } from "./LocaleLink";
import { QuickContactModal } from "./QuickContactModal";
import type { PublicLocale } from "@/lib/publicLocale";

export function HomeHero({ locale }: { locale: PublicLocale }) {
  const fr = locale === "fr";
  return (
    <section className="gate-hero">
      <div className="gate-hero__glow" aria-hidden="true" />
      <div className="container gate-hero__layout">
        <div className="gate-hero__copy">
          <p className="gate-hero__kicker">eveOps Group</p>
          <h1>
            {fr ? (
              <>
                Deux métiers.
                <br />
                <em>Un groupe.</em>
              </>
            ) : (
              <>
                Two practices.
                <br />
                <em>One group.</em>
              </>
            )}
          </h1>
          <p>
            {fr
              ? "Unity Integrated Solutions pour les équipes et les opérations. eveDev Ops pour le logiciel, l’IA et les produits."
              : "Unity Integrated Solutions for people and operations. eveDev Ops for software, AI, and products."}
          </p>
          <div className="gate-hero__actions">
            <QuickContactModal locale={locale} />
            <a className="gate-hero__textlink" href="#divisions">
              {fr ? "Voir les deux" : "See both"}
            </a>
          </div>
        </div>
        <div className="gate-hero__boards">
          <i className="gate-hero__seam" aria-hidden="true" />
          <LocaleLink to="/unity" className="gate-board gate-board--unity">
            <span>01</span>
            <strong>Unity</strong>
            <em>Integrated Solutions</em>
            <small>{fr ? "Équipes · langues · données · achats" : "People · language · data · procurement"}</small>
            <ArrowUpRight size={18} />
          </LocaleLink>
          <LocaleLink to="/edevops" className="gate-board gate-board--dev">
            <span>02</span>
            <strong>eveDev</strong>
            <em>Ops</em>
            <small>{fr ? "Logiciel · IA · produits" : "Software · AI · products"}</small>
            <ArrowUpRight size={18} />
          </LocaleLink>
        </div>
      </div>
    </section>
  );
}
