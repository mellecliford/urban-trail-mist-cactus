import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocale, usePathname } from "@/lib/locale";
import type { PublicLocale } from "@/lib/publicLocale";

export type MotionTheme = "parent" | "unity" | "edevops";

export function themeFromPath(pathname: string): MotionTheme {
  if (pathname.startsWith("/unity")) return "unity";
  if (pathname.startsWith("/edevops")) return "edevops";
  return "parent";
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const LOADER_COPY: Record<MotionTheme, { title: Record<PublicLocale, string>; note: Record<PublicLocale, string> }> = {
  parent: {
    title: { en: "eveOps Group", fr: "eveOps Group" },
    note: { en: "Independent capabilities", fr: "Des capacités indépendantes" },
  },
  unity: {
    title: { en: "Unity Integrated Solutions", fr: "Unity Integrated Solutions" },
    note: { en: "Coordinated professional services", fr: "Services professionnels coordonnés" },
  },
  edevops: {
    title: { en: "eveDev Ops", fr: "eveDev Ops" },
    note: { en: "Software · AI · products", fr: "Logiciel · IA · produits" },
  },
};

const WHATSAPP = "https://wa.me/message/NG7LRS7O2LIYM1";
const FLIGHT_STEP = 1.15;
const FLIGHT_LINES: Record<PublicLocale, string[]> = {
  en: [
    "Alpha Centauri. 4.37 light-years.",
    "Engines on. No one is rushing.",
    "Travelling at the speed of light.",
    "Server identified. It waved.",
    "Planet Eve has green water.",
    "Welcome to eveOps Group.",
  ],
  fr: [
    "Alpha Centauri. 4,37 années-lumière.",
    "Moteurs on. Rien ne presse.",
    "À la vitesse de la lumière.",
    "Serveur identifié. Il a salué.",
    "La planète Eve a de l’eau verte.",
    "Bienvenue chez eveOps Group.",
  ],
};

type IntroState = { theme: MotionTheme; mode: "signature" | "pass"; id: number };

export function RouteLoader() {
  const pathname = usePathname();
  const locale = useLocale();
  const prevPath = useRef<string | null>(null);
  const parentSite = themeFromPath(pathname) === "parent";
  const [cover, setCover] = useState(parentSite);
  const [depart, setDepart] = useState(false);
  const [intro, setIntro] = useState<IntroState | null>(null);
  const flight = FLIGHT_LINES[locale];

  useEffect(() => {
    if (!cover) return;
    if (prefersReducedMotion()) {
      setCover(false);
      return;
    }
    const hold = flight.length * FLIGHT_STEP * 1000;
    const go = window.setTimeout(() => setDepart(true), hold);
    const done = window.setTimeout(() => setCover(false), hold + 760);
    return () => {
      window.clearTimeout(go);
      window.clearTimeout(done);
    };
  }, [cover, flight.length]);

  useLayoutEffect(() => {
    const next = themeFromPath(pathname);
    const previous = prevPath.current;
    prevPath.current = pathname;

    if (prefersReducedMotion()) {
      setIntro(null);
      return;
    }

    if (previous === null && next === "parent") return;

    const mode: IntroState["mode"] = previous === null || themeFromPath(previous) !== next ? "signature" : "pass";
    const id = Date.now();
    setIntro({ theme: next, mode, id });
    const hide = window.setTimeout(() => setIntro(null), mode === "signature" ? 560 : 480);
    return () => window.clearTimeout(hide);
  }, [pathname]);

  return (
    <>
      {cover ? (
        <div className={`approach${depart ? " is-depart" : ""}`} role="status" aria-live="polite" aria-label={locale === "fr" ? "Chargement" : "Loading"}>
          <svg className="approach__scene" viewBox="0 0 360 150" aria-hidden="true">
            <g className="approach__stars" fill="#f4f7ff">
              <circle cx="28" cy="26" r="1.1" />
              <circle cx="70" cy="48" r="0.8" />
              <circle cx="120" cy="22" r="1" />
              <circle cx="168" cy="40" r="0.7" />
              <circle cx="210" cy="18" r="1.1" />
              <circle cx="250" cy="36" r="0.8" />
              <circle cx="40" cy="96" r="0.7" />
              <circle cx="150" cy="112" r="0.9" />
            </g>
            <g className="approach__planet">
              <circle cx="308" cy="76" r="42" fill="none" stroke="#8fd7b0" strokeWidth="1" opacity="0.45" />
              <circle cx="308" cy="76" r="32" fill="#1f8a62" />
              <circle cx="296" cy="66" r="11" fill="#8fd7b0" />
              <circle cx="318" cy="86" r="6" fill="#14664a" />
            </g>
            <g className="approach__ship">
              <path className="approach__flame" d="M8 78h16l-6 4 6 4H8z" fill="#61d7e4" />
              <path d="M22 74h52l16-12h22l12 12h20v8H22z" fill="#e8eef8" />
              <path d="M78 70h16v4H86z" fill="#2b5cff" />
            </g>
          </svg>
          <p className="approach__name">
            eve<span>Ops</span>
          </p>
          <p className="approach__mark">Alpha Centauri</p>
          <ol className="approach__log">
            {flight.map((entry, index) => (
              <li key={entry} style={{ animationDelay: `${index * FLIGHT_STEP}s` }}>
                {entry}
              </li>
            ))}
          </ol>
          <i className="approach__bar" />
        </div>
      ) : (
        <a
          className="ship-dock"
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={locale === "fr" ? "Écrire à eveOps Group sur WhatsApp" : "Message eveOps Group on WhatsApp"}
        >
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M6 16h10l3-2h4l2 2h3" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="24" cy="10" r="3" fill="#1f8a62" />
          </svg>
        </a>
      )}
      {intro?.mode === "pass" ? (
        <div className={`route-pass route-pass--${intro.theme}`} key={intro.id} aria-hidden="true">
          <span>{LOADER_COPY[intro.theme].title[locale]}</span>
        </div>
      ) : null}
      {intro?.mode === "signature" ? (
        <div className={`sig sig--${intro.theme}`} key={intro.id} role="presentation" aria-hidden="true">
          {intro.theme === "parent" && (
            <div className="sig-parent">
              <i className="sig-parent__hex sig-parent__hex--a" />
              <i className="sig-parent__hex sig-parent__hex--b" />
              <i className="sig-parent__hex sig-parent__hex--c" />
              <b />
            </div>
          )}
          {intro.theme === "unity" && (
            <div className="sig-unity">
              <i className="sig-unity__sheet" />
              <b />
              <i className="sig-unity__rule" />
            </div>
          )}
          {intro.theme === "edevops" && (
            <div className="sig-edev">
              <i className="sig-edev__grid" />
              <i className="sig-edev__scan" />
              <span />
              <b />
            </div>
          )}
          <p className="sig__title">{LOADER_COPY[intro.theme].title[locale]}</p>
          <small className="sig__note">{LOADER_COPY[intro.theme].note[locale]}</small>
        </div>
      ) : null}
    </>
  );
}

export function PageMotion({ children, theme }: { children: React.ReactNode; theme: MotionTheme }) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    node.classList.remove("is-entered");
    if (prefersReducedMotion()) {
      node.classList.add("is-entered", "is-reduced");
      node.querySelectorAll("section").forEach((section) => section.classList.add("is-in"));
      return;
    }
    void node.offsetWidth;
    node.classList.add("is-entered");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );

    const sections = node.querySelectorAll("section");
    sections.forEach((section, index) => {
      if (index === 0) {
        section.classList.add("is-in");
        return;
      }
      section.classList.add("reveal-block");
      io.observe(section);
    });

    return () => {
      io.disconnect();
    };
  }, [pathname]);

  return (
    <div ref={ref} className={`page-motion page-motion--${theme}`} data-path={pathname}>
      {children}
    </div>
  );
}

export function DivisionLoadMark({ theme }: { theme: Exclude<MotionTheme, "parent"> }) {
  return (
    <div className={`division-load-mark division-load-mark--${theme}`} aria-hidden="true">
      <i />
      <i />
      <i />
    </div>
  );
}
