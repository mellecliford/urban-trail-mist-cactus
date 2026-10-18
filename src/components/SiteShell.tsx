import { useEffect, useId, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { assets, brand, navItems } from "@/content/site";
import { useLocale, useLocationSearch, usePathname } from "@/lib/locale";
import { withPublicLocale } from "@/lib/publicLocale";
import { shouldShowDivisionRouteBar } from "@/lib/publicPresentation";
import { EveOpsBrandMark } from "./EveOpsBrandMark";
import { LocaleLink } from "./LocaleLink";
import { PageMotion, themeFromPath } from "./PageMotion";

function BackgroundPrefetch({ pathname }: { pathname: string }) {
  const router = useRouter();
  useEffect(() => {
    const targets = pathname.startsWith("/unity")
      ? ["/edevops", "/contact", "/unity/services", "/about"]
      : pathname.startsWith("/edevops")
        ? ["/unity", "/contact", "/products", "/about"]
        : ["/unity", "/edevops", "/contact", "/about", "/products"];
    const run = () => {
      for (const to of targets) {
        if (to === pathname) continue;
        void router.preloadRoute({ to }).catch(() => undefined);
      }
    };
    const idle = window.requestIdleCallback?.(run, { timeout: 1200 });
    if (idle != null) return () => window.cancelIdleCallback(idle);
    const timer = window.setTimeout(run, 400);
    return () => window.clearTimeout(timer);
  }, [pathname, router]);
  return null;
}

function localizeNavigation(label: string, locale: "en" | "fr") {
  if (locale === "en") return label;
  return (
    (
      {
        Home: "Accueil",
        Products: "Produits",
        Portfolio: "Réalisations",
        About: "À propos",
        Contact: "Contact",
        Services: "Services",
        Language: "Langues",
        "AI Data": "Données IA",
        "Research & Data": "Recherche et données",
        Procurement: "Achats",
        Workforce: "Équipes",
        Divisions: "Divisions",
        Work: "Réalisations",
      } as Record<string, string>
    )[label] || label
  );
}

function LanguageControl({ locale, inverted = false }: { locale: "en" | "fr"; inverted?: boolean }) {
  const pathname = usePathname();
  const search = useLocationSearch();
  const currentHref = `${pathname}${search}`;
  return (
    <div className={`lang-switch ${inverted ? "lang-switch--light" : ""}`} aria-label="Language">
      <a href={withPublicLocale(currentHref, "en")} className={locale === "en" ? "is-active" : ""} lang="en">
        EN
      </a>
      <a href={withPublicLocale(currentHref, "fr")} className={locale === "fr" ? "is-active" : ""} lang="fr">
        FR
      </a>
    </div>
  );
}

function EveOpsBrandLockup({ footer = false }: { footer?: boolean }) {
  return (
    <LocaleLink to="/" className={`brand-lockup${footer ? " brand-lockup--footer" : ""}`} aria-label={`${brand.name} home`}>
      <EveOpsBrandMark />
      <span className="brand-lockup__word">
        <span>eve</span>
        <span className="wordmark-o">Ops</span>
      </span>
      <span className="brand-lockup__group">Group</span>
    </LocaleLink>
  );
}

const parentNav = [
  ["Home", "/"],
  ["Products", "/products"],
  ["Work", "/portfolio"],
  ["About", "/about"],
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const locale = useLocale();
  const fr = locale === "fr";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [divisionsOpen, setDivisionsOpen] = useState(false);
  const isHome = pathname === "/";
  const isDark = pathname.startsWith("/edevops") || isHome;
  const megaId = useId();

  useEffect(() => {
    setOpen(false);
    setDivisionsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const chromeClass = [
    "site-chrome",
    isDark ? "site-chrome--dark" : "site-chrome--light",
    isHome ? "site-chrome--over-hero" : "",
    scrolled || !isHome ? "site-chrome--solid" : "",
    open ? "site-chrome--open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={chromeClass}>
      <div className="site-chrome__bar">
        <EveOpsBrandLockup />
        <nav className="site-chrome__nav" aria-label="Primary">
          {parentNav.map(([label, href]) => (
            <LocaleLink
              key={href}
              to={href}
              className={pathname === href ? "site-chrome__link is-active" : "site-chrome__link"}
            >
              {localizeNavigation(label, locale)}
            </LocaleLink>
          ))}
          <div
            className={`site-chrome__mega-wrap ${divisionsOpen ? "is-open" : ""}`}
            onMouseEnter={() => setDivisionsOpen(true)}
            onMouseLeave={() => setDivisionsOpen(false)}
          >
            <button
              type="button"
              className={`site-chrome__link site-chrome__link--btn ${pathname.startsWith("/unity") || pathname.startsWith("/edevops") ? "is-active" : ""}`}
              aria-expanded={divisionsOpen}
              aria-controls={megaId}
              onClick={() => setDivisionsOpen((v) => !v)}
            >
              {fr ? "Divisions" : "Divisions"}
              <ChevronDown size={14} />
            </button>
            <div className="site-chrome__mega" id={megaId} hidden={!divisionsOpen}>
              <LocaleLink to="/unity" className="mega-card mega-card--unity">
                <span className="mega-card__index">01</span>
                <strong>Unity Integrated Solutions</strong>
                <small>{fr ? "Services professionnels coordonnés" : "Coordinated professional services"}</small>
                <em>{fr ? "Langues · données IA · recherche · achats · équipes" : "Language · AI data · research · procurement · workforce"}</em>
                <span className="mega-card__go">
                  {fr ? "Explorer Unity" : "Explore Unity"} <ArrowUpRight size={14} />
                </span>
              </LocaleLink>
              <LocaleLink to="/edevops" className="mega-card mega-card--edevops">
                <span className="mega-card__index">02</span>
                <strong>eveDev Ops</strong>
                <small>{fr ? "Ingénierie logicielle · IA · produits" : "Software engineering · AI · products"}</small>
                <em>{fr ? "Web · mobile · SaaS · automatisation · cloud" : "Web · mobile · SaaS · automation · cloud"}</em>
                <span className="mega-card__go">
                  {fr ? "Explorer eveDev Ops" : "Explore eveDev Ops"} <ArrowUpRight size={14} />
                </span>
              </LocaleLink>
            </div>
          </div>
        </nav>
        <div className="site-chrome__tools">
          <LanguageControl locale={locale} inverted={isDark && (isHome ? !scrolled : true)} />
          <LocaleLink to="/contact" className="site-chrome__cta">
            {fr ? "Démarrer un projet" : "Start a project"} <ArrowUpRight size={15} />
          </LocaleLink>
          <button
            className="site-chrome__menu"
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="site-chrome__drawer">
          <nav aria-label="Mobile navigation" className="site-chrome__drawer-nav">
            {navItems.map(([label, href], index) => (
              <LocaleLink to={href} key={href} className="site-chrome__drawer-link">
                <span>0{index + 1}</span>
                {localizeNavigation(label, locale)}
              </LocaleLink>
            ))}
          </nav>
          <div className="site-chrome__drawer-foot">
            <LanguageControl locale={locale} />
            <LocaleLink to="/contact" className="site-chrome__cta">
              {fr ? "Démarrer un projet" : "Start a project"} <ArrowUpRight size={15} />
            </LocaleLink>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  const locale = useLocale();
  const fr = locale === "fr";
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <EveOpsBrandLockup footer />
            <p>
              {fr
                ? "Des services professionnels et une ingénierie numérique exigeante, réunis au sein d’un même groupe."
                : "Professional services and production-grade digital engineering, connected through one group."}
            </p>
          </div>
          <div className="site-footer__columns">
            <div>
              <p className="footer-label">eveOps</p>
              <LocaleLink to="/about">{fr ? "À propos" : "About"}</LocaleLink>
              <LocaleLink to="/contact">Contact</LocaleLink>
              <LocaleLink to="/insights">{fr ? "Réflexions" : "Insights"}</LocaleLink>
            </div>
            <div>
              <p className="footer-label footer-label--unity">Unity Integrated Solutions</p>
              <LocaleLink to="/unity/services">{fr ? "Services professionnels" : "Professional services"}</LocaleLink>
              <LocaleLink to="/unity/ai-data">AI data</LocaleLink>
              <LocaleLink to="/unity/procurement">{fr ? "Soutien aux achats" : "Procurement support"}</LocaleLink>
            </div>
            <div>
              <p className="footer-label footer-label--edevops">eveDev Ops</p>
              <LocaleLink to="/edevops/web-development">{fr ? "Développement web" : "Web development"}</LocaleLink>
              <LocaleLink to="/edevops/ai-development">{fr ? "Développement IA" : "AI development"}</LocaleLink>
              <LocaleLink to="/products">{fr ? "Produits" : "Products"}</LocaleLink>
            </div>
          </div>
        </div>
        <div className="site-footer__bottom">
          <span>© {new Date().getFullYear()} eveOps Group</span>
          <div>
            <LocaleLink to="/privacy">{fr ? "Confidentialité" : "Privacy"}</LocaleLink>
            <LocaleLink to="/cookies">{fr ? "Cookies" : "Cookies"}</LocaleLink>
            <LocaleLink to="/terms">{fr ? "Conditions" : "Terms"}</LocaleLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

const unityNav = [
  ["Services", "/unity/services"],
  ["Language", "/unity/translation"],
  ["AI Data", "/unity/ai-data"],
  ["Research & Data", "/unity/research-data"],
  ["Procurement", "/unity/procurement"],
  ["Workforce", "/unity/virtual-workforce"],
] as const;

function DivisionRouteBar({ current }: { current: "unity" | "edevops" }) {
  const locale = useLocale();
  const other =
    current === "unity"
      ? {
          label: locale === "fr" ? "Explorer eveDev Ops" : "Explore eveDev Ops",
          href: "/edevops",
          note: locale === "fr" ? "Logiciels et technologie" : "Software & technology",
        }
      : {
          label: locale === "fr" ? "Explorer Unity" : "Explore Unity",
          href: "/unity",
          note: locale === "fr" ? "Services intégrés" : "Integrated services",
        };
  const currentLabel = current === "unity" ? "Unity Integrated Solutions" : "eveDev Ops";
  return (
    <nav className={`division-route-bar division-route-bar--${current}`} aria-label="Division and group navigation">
      <div className="container division-route-bar__inner">
        <span className="division-route-bar__current">
          {locale === "fr" ? "Vous êtes dans" : "You are in"} <strong>{currentLabel}</strong>
        </span>
        <div className="division-route-bar__links">
          <LocaleLink to={other.href}>
            <span>{other.label}</span>
            <small>{other.note}</small>
            <ArrowUpRight size={14} aria-hidden="true" />
          </LocaleLink>
          <LocaleLink to="/" className="division-route-bar__home">
            {locale === "fr" ? "Accueil eveOps Group" : "eveOps Group home"} <ArrowUpRight size={14} aria-hidden="true" />
          </LocaleLink>
        </div>
      </div>
    </nav>
  );
}

export function UnityHeader() {
  const pathname = usePathname();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`unity-chrome ${scrolled ? "unity-chrome--solid" : ""} ${open ? "is-open" : ""}`}>
      <div className="unity-chrome__topline">
        <div className="container">
          <span>{locale === "fr" ? "Services professionnels coordonnés" : "Coordinated professional services"}</span>
          <span>{locale === "fr" ? "Parcours de livraison internationaux" : "Global delivery routes"}</span>
        </div>
      </div>
      <div className="container unity-chrome__bar">
        <LocaleLink to="/unity" className="unity-lockup" aria-label="Unity Integrated Solutions home">
          <img src={assets.unityMark} alt="" className="unity-lockup__mark" />
          <span className="unity-lockup__text">
            <strong>UNITY</strong>
            <small>Integrated Solutions</small>
          </span>
        </LocaleLink>
        <nav className="unity-chrome__nav" aria-label="Unity Integrated Solutions navigation">
          {unityNav.map(([label, href]) => (
            <LocaleLink key={href} to={href} className={pathname === href ? "is-active" : ""}>
              {localizeNavigation(label, locale)}
            </LocaleLink>
          ))}
        </nav>
        <div className="unity-chrome__tools">
          <LanguageControl locale={locale} />
          <LocaleLink to="/unity/contact" className="unity-chrome__cta">
            {locale === "fr" ? "Demander un service" : "Request a service"} <ArrowUpRight size={15} />
          </LocaleLink>
          <button
            className="unity-chrome__menu"
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close Unity navigation" : "Open Unity navigation"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="unity-chrome__drawer">
          <nav aria-label="Unity mobile navigation">
            {unityNav.map(([label, href], index) => (
              <LocaleLink to={href} key={href}>
                <span>0{index + 1}</span>
                {localizeNavigation(label, locale)}
              </LocaleLink>
            ))}
          </nav>
          <div className="unity-chrome__drawer-foot">
            <LanguageControl locale={locale} />
            <LocaleLink to="/unity/contact" className="unity-chrome__cta">
              {locale === "fr" ? "Demander un service" : "Request a service"} <ArrowUpRight size={15} />
            </LocaleLink>
          </div>
        </div>
      )}
    </header>
  );
}

export function UnityFooter() {
  const locale = useLocale();
  const fr = locale === "fr";
  return (
    <footer className="unity-footer">
      <div className="container">
        <div className="unity-footer__main">
          <div>
            <LocaleLink to="/unity" className="unity-lockup unity-lockup--footer">
              <img src={assets.unityMark} alt="" className="unity-lockup__mark" />
              <span className="unity-lockup__text">
                <strong>UNITY</strong>
                <small>Integrated Solutions</small>
              </span>
            </LocaleLink>
            <p>
              {fr
                ? "Des services professionnels et un soutien coordonné aux équipes pour un travail qui exige une livraison réfléchie."
                : "Professional services and coordinated workforce support for work that needs thoughtful delivery."}
            </p>
          </div>
          <div className="unity-footer__links">
            <div>
              <span>{fr ? "Services" : "Services"}</span>
              <LocaleLink to="/unity/translation">{fr ? "Langues" : "Language"}</LocaleLink>
              <LocaleLink to="/unity/ai-data">AI data</LocaleLink>
              <LocaleLink to="/unity/research-data">{fr ? "Recherche et données" : "Research & data"}</LocaleLink>
            </div>
            <div>
              <span>{fr ? "Capacités" : "Capabilities"}</span>
              <LocaleLink to="/unity/procurement">{fr ? "Achats" : "Procurement"}</LocaleLink>
              <LocaleLink to="/unity/virtual-workforce">{fr ? "Équipes" : "Workforce"}</LocaleLink>
              <LocaleLink to="/unity/contact">Contact</LocaleLink>
            </div>
          </div>
        </div>
        <div className="unity-footer__bottom">
          <span>© {new Date().getFullYear()} Unity Integrated Solutions</span>
          <div>
            <LocaleLink to="/privacy">{fr ? "Confidentialité" : "Privacy"}</LocaleLink>
            <LocaleLink to="/cookies">{fr ? "Cookies" : "Cookies"}</LocaleLink>
            <LocaleLink to="/terms">{fr ? "Conditions" : "Terms"}</LocaleLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isEveDev = pathname.startsWith("/edevops");
  const locale = useLocale();
  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">
        {locale === "fr" ? "Aller au contenu" : "Skip to content"}
      </a>
      <SiteHeader />
      <BackgroundPrefetch pathname={pathname} />
      {isEveDev && shouldShowDivisionRouteBar("edevops") && <DivisionRouteBar current="edevops" />}
      <main id="main-content">
        <PageMotion theme={themeFromPath(pathname)}>{children}</PageMotion>
      </main>
      <SiteFooter />
    </div>
  );
}

export function UnityShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = useLocale();
  const route = unityNav.find(([, href]) => pathname === href)?.[0] ?? (pathname === "/unity" ? "Unity" : "Services");
  return (
    <div className="unity-shell">
      <a href="#main-content" className="skip-link">
        {locale === "fr" ? "Aller au contenu" : "Skip to content"}
      </a>
      <UnityHeader />
      <BackgroundPrefetch pathname={pathname} />
      <DivisionRouteBar current="unity" />
      <aside className="unity-location-cue" aria-label={locale === "fr" ? "Position actuelle dans Unity" : "Current Unity location"}>
        <div className="container">
          <span>{locale === "fr" ? "Vous êtes ici" : "You are at"}</span>
          <strong>Unity Integrated Solutions</strong>
          <i aria-hidden="true" />
          <small>{localizeNavigation(route, locale)}</small>
        </div>
      </aside>
      <main id="main-content">
        <PageMotion theme="unity">{children}</PageMotion>
      </main>
      <UnityFooter />
    </div>
  );
}
