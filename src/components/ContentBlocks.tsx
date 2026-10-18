import { ArrowRight, ArrowUpRight, Bot, Cloud, Code2, Database, FileText, Globe2, Languages, ShieldCheck, Smartphone, UsersRound, Workflow } from "lucide-react";
import { getServiceDisplay, type DivisionKey, type Service } from "@/content/site";
import { useLocale } from "@/lib/locale";
import { LocaleLink } from "./LocaleLink";

const iconMap = {
  language: Languages,
  data: Database,
  research: Globe2,
  team: UsersRound,
  procurement: Workflow,
  content: FileText,
  web: Code2,
  mobile: Smartphone,
  software: Code2,
  ai: Bot,
  automation: Workflow,
  cloud: Cloud,
  security: ShieldCheck,
  api: Workflow,
};

export function Eyebrow({ children, theme = "parent" }: { children: React.ReactNode; theme?: "parent" | DivisionKey }) {
  return <p className={`eyebrow eyebrow--${theme}`}>{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  theme = "parent",
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  theme?: "parent" | DivisionKey;
}) {
  return (
    <div className={`section-heading section-heading--${theme}`}>
      <Eyebrow theme={theme}>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export function ArrowLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <LocaleLink to={href} className={`arrow-link ${dark ? "arrow-link--light" : ""}`}>
      {children}
      <ArrowRight size={17} aria-hidden="true" />
    </LocaleLink>
  );
}

export function ServiceGrid({ division, services, limit }: { division: DivisionKey; services: Service[]; limit?: number }) {
  const visible = limit ? services.slice(0, limit) : services;
  const locale = useLocale();
  const fr = locale === "fr";
  return (
    <div className={`service-grid service-grid--${division}`}>
      {visible.map((service, index) => {
        const Icon = iconMap[service.icon];
        const displayService = getServiceDisplay(division, service, locale);
        return (
          <LocaleLink className="service-card" to={`/${division}/${service.slug}`} key={service.slug}>
            <div className="service-card__topline">
              <span>0{index + 1}</span>
              <Icon size={19} strokeWidth={1.7} />
            </div>
            <h3>{displayService.title}</h3>
            <p>{displayService.summary}</p>
            <span className="service-card__link">
              {fr ? "Explorer le périmètre" : "Explore scope"} <ArrowUpRight size={16} aria-hidden="true" />
            </span>
          </LocaleLink>
        );
      })}
    </div>
  );
}

export function Breadcrumbs({ items, dark = false }: { items: Array<[string, string?]>; dark?: boolean }) {
  return (
    <nav className={`breadcrumbs ${dark ? "breadcrumbs--light" : ""}`} aria-label="Breadcrumb">
      {items.map(([label, href], index) => (
        <span key={`${label}-${index}`}>
          {href ? <LocaleLink to={href}>{label}</LocaleLink> : <span aria-current="page">{label}</span>}
          {index < items.length - 1 && <span aria-hidden="true">/</span>}
        </span>
      ))}
    </nav>
  );
}

export function CTASection({
  division = "parent",
  title,
  body,
  primary,
  secondary,
}: {
  division?: "parent" | DivisionKey;
  title: string;
  body: string;
  primary: [string, string];
  secondary?: [string, string];
}) {
  const locale = useLocale();
  return (
    <section className={`cta-section cta-section--${division}`}>
      <div className="container cta-section__inner">
        <div>
          <Eyebrow theme={division === "parent" ? "parent" : division}>
            {locale === "fr" ? "Démarrer la conversation" : "Start the conversation"}
          </Eyebrow>
          <h2>{title}</h2>
        </div>
        <div className="cta-section__copy">
          <p>{body}</p>
          <div className="cta-section__actions">
            <LocaleLink to={primary[1]} className="button button--solid">
              {primary[0]} <ArrowUpRight size={17} />
            </LocaleLink>
            {secondary && (
              <LocaleLink to={secondary[1]} className="button button--text">
                {secondary[0]} <ArrowRight size={17} />
              </LocaleLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
