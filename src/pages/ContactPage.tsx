import { useMemo, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { toast } from "sonner";
import { Eyebrow } from "@/components/ContentBlocks";
import { LocaleLink } from "@/components/LocaleLink";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { usePublicContact } from "@/hooks/usePublicContact";
import { submitEnquiry } from "@/lib/site.functions";
import { telHref, whatsappHref } from "@/lib/site-settings";
import { useLocationSearch } from "@/lib/locale";
import { localeText } from "@/lib/publicLocale";
import { getContactRoutePresentation } from "@/lib/publicPresentation";
import { getServiceBriefContext } from "@/lib/serviceBrief";
import { resolveSeo, contactFaqs } from "@/lib/seo";
import { enquirySchema, fieldErrors } from "@/lib/formSecurity";

type Intake = "unity" | "edevops";

const unityServices = [
  "Language Services",
  "Transcription Services",
  "Data Annotation & AI Training",
  "Research & Data Services",
  "Virtual Workforce",
  "Content Operations",
  "Procurement Support",
];
const engineeringServices = [
  "Web Development",
  "Mobile Development",
  "Software Engineering",
  "AI Development",
  "Automation",
  "Cloud & DevOps",
  "Application Security",
  "API & Integrations",
];

export default function ContactPage({ scope = "eveops" }: { scope?: "eveops" | "unity" }) {
  const isUnityScope = scope === "unity";
  const search = useLocationSearch();
  const briefContext = useMemo(() => getServiceBriefContext(search, isUnityScope), [search, isUnityScope]);
  const initialRoute: Intake = briefContext.route;
  const [route, setRoute] = useState<Intake>(initialRoute);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const prefilledService = briefContext.service;
  const locale = briefContext.locale;
  const fr = locale === "fr";
  const text = localeText[locale];
  const hasPrefilledService = Boolean(prefilledService) && route === initialRoute;
  const serviceOptions = route === "unity" ? unityServices : engineeringServices;
  const routeName = route === "unity" ? "Unity Integrated Solutions" : "eveDev Ops";
  const routePresentation = getContactRoutePresentation(route, locale);
  const contact = usePublicContact();
  const channel = route === "unity" ? contact.unity : contact.edevops;

  const seo = resolveSeo(isUnityScope ? "/unity/contact" : "/contact", search);
  useDocumentMeta(seo.title, seo.description);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setPending(true);
    const parsed = enquirySchema(fr).safeParse({
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      message: String(data.get("description") || ""),
      company: String(data.get("company") || "") || undefined,
      country: String(data.get("country") || "") || undefined,
      service: String(data.get("service") || "") || undefined,
      volume: String(data.get("volume") || "") || undefined,
      deadline: String(data.get("deadline") || "") || undefined,
      communication: String(data.get("communication") || "") || undefined,
    });
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      setPending(false);
      return;
    }
    setErrors({});
    const result = await submitEnquiry({
      data: {
        name: parsed.data.name,
        company: parsed.data.company,
        email: parsed.data.email,
        phone: parsed.data.phone || undefined,
        country: parsed.data.country,
        division: route,
        service: parsed.data.service,
        volume: parsed.data.volume,
        deadline: parsed.data.deadline,
        communication: parsed.data.communication,
        message: parsed.data.message,
      },
    });
    setPending(false);
    if (!result.ok) {
      setErrors({ form: result.error });
      return;
    }
    form.reset();
    toast.success(locale === "fr" ? "Brief reçu." : "Brief received.", {
      description: result.mailed
        ? locale === "fr"
          ? "L’équipe en a été informée."
          : "The team has been notified."
        : locale === "fr"
          ? "Il est dans le studio. L’équipe le verra là."
          : "It is in the studio. The team will see it there.",
    });
  };

  return (
    <div className={`${isUnityScope ? "contact-page contact-page--unity" : "contact-page"} ${routePresentation.className}`}>
      <section className="contact-hero">
        <div className="container contact-hero__grid">
          <div>
            <Eyebrow>
              {hasPrefilledService
                ? `${routeName} · ${locale === "fr" ? "brief de service" : "service brief"}`
                : isUnityScope
                  ? locale === "fr"
                    ? "Demande de service Unity"
                    : "Unity service intake"
                  : routePresentation.eyebrow}
            </Eyebrow>
            <h1>
              {hasPrefilledService ? (
                <>
                  {locale === "fr" ? "Parlez-nous de votre besoin en " : "Tell us about your "}
                  <em>{prefilledService}</em>.
                </>
              ) : isUnityScope ? (
                locale === "fr" ? (
                  <>Comment Unity peut-elle soutenir le <em>travail&nbsp;?</em></>
                ) : (
                  <>How can Unity support the <em>work?</em></>
                )
              ) : (
                <>
                  {routePresentation.headlineLead} <em>{routePresentation.headlineEmphasis}</em>
                </>
              )}
            </h1>
          </div>
          <p>
            {hasPrefilledService
              ? locale === "fr"
                ? "Le service est déjà sélectionné. Partagez uniquement le contexte nécessaire pour rendre notre première réponse utile."
                : "The service is already selected. Share only the context that will help us make the first response useful."
              : isUnityScope
                ? locale === "fr"
                  ? "Un premier brief clair reste court : le travail, votre e-mail et le contexte de livraison que vous connaissez déjà."
                  : "A clear first brief is short: the work, your email, and the delivery context you already know."
                : routePresentation.description}
          </p>
          {isUnityScope ? (
            <div className="contact-hero__field-note" aria-hidden="true">
              <span>{locale === "fr" ? "Note terrain / 01" : "Field note / 01"}</span>
              <i />
              <small>
                {locale === "fr"
                  ? "Les briefs utiles commencent par le résultat, non par une spécification parfaite."
                  : "Useful briefs begin with the outcome, not a perfect specification."}
              </small>
            </div>
          ) : (
            <div className="contact-hero__route-rail" aria-hidden="true">
              <span>01</span>
              <i />
              <span>02</span>
              <small>{locale === "fr" ? "Point de rencontre" : "Meeting point"}</small>
            </div>
          )}
        </div>
      </section>
      <section className="contact-intake section-pad">
        <div className="container contact-intake__grid">
          <aside className="contact-intake__aside">
            <p className="contact-intake__label">{isUnityScope ? (fr ? "Parcours de travail" : "Working route") : fr ? "Choisissez un parcours" : "Choose a route"}</p>
            <button
              type="button"
              className={route === "unity" ? "intake-route intake-route--active intake-route--unity" : "intake-route intake-route--unity"}
              onClick={() => setRoute("unity")}
            >
              <span>01</span>
              <strong>{isUnityScope ? (fr ? "Brief de service" : "Service brief") : fr ? "Services professionnels" : "Professional services"}</strong>
              <small>Unity Integrated Solutions</small>
            </button>
            {!isUnityScope && (
              <button
                type="button"
                className={route === "edevops" ? "intake-route intake-route--active intake-route--edevops" : "intake-route intake-route--edevops"}
                onClick={() => setRoute("edevops")}
              >
                <span>02</span>
                <strong>{fr ? "Développement logiciel" : "Software development"}</strong>
                <small>eveDev Ops</small>
              </button>
            )}
            <div className="contact-intake__note">
              <CheckCircle2 size={18} />
              <p>
                {fr
                  ? "Trois éléments suffisent pour commencer : votre nom, votre e-mail et une description concise du travail."
                  : "Three essentials are enough to begin: your name, email, and a concise description of the work."}
              </p>
            </div>
            <div className="unity-contact-details">
              <span>{route === "unity" ? (fr ? "Échanger avec Unity" : "Speak with Unity") : fr ? "Échanger avec eveDev Ops" : "Speak with eveDev Ops"}</span>
              {channel.email ? <a href={`mailto:${channel.email}`}>{channel.email}</a> : null}
              {channel.phone ? <a href={telHref(channel.phone)}>{channel.phone}</a> : null}
              {channel.whatsapp && whatsappHref(channel.whatsapp) ? <a href={whatsappHref(channel.whatsapp)}>WhatsApp</a> : null}
              {channel.address ? <p>{channel.address}</p> : null}
              {channel.hours ? <p>{channel.hours}</p> : null}
            </div>
          </aside>
          <form className={`intake-form intake-form--${route}`} onSubmit={handleSubmit}>
            <div className="intake-form__heading">
              <span>{hasPrefilledService ? `${routeName} · ${prefilledService}` : `${routeName} · ${locale === "fr" ? "Premier brief" : "First brief"}`}</span>
              <h2>
                {hasPrefilledService
                  ? `${text.brief} ${prefilledService}.`
                  : route === "unity"
                    ? locale === "fr"
                      ? "Qu’est-ce qui doit avancer ?"
                      : "What needs to move forward?"
                    : locale === "fr"
                      ? "Qu’est-ce qui doit mieux fonctionner ?"
                      : "What needs to work better?"}
              </h2>
              <p>
                {locale === "fr"
                  ? "Les champs obligatoires sont marqués d’un astérisque. Ajoutez les détails de livraison uniquement s’ils sont utiles maintenant."
                  : "Required fields are marked with an asterisk. Add delivery detail only if it is useful now."}
              </p>
            </div>
            <div className="form-grid form-grid--essential">
              <label>
                {locale === "fr" ? "Nom" : "Name"} *
                <input required name="name" autoComplete="name" maxLength={120} placeholder={locale === "fr" ? "Votre nom" : "Your name"} />
              </label>
              <label>
                E-mail *
                <input required type="email" name="email" autoComplete="email" maxLength={180} placeholder="name@company.com" />
              </label>
            </div>
            {hasPrefilledService ? (
              <input type="hidden" name="service" value={prefilledService} />
            ) : (
              <label className="form-service">
                {route === "unity"
                  ? fr
                    ? "Service souhaité *"
                    : "Service needed *"
                  : fr
                    ? "Que souhaitez-vous construire ? *"
                    : "What are you looking to build? *"}
                <select required name="service" defaultValue="">
                  <option value="" disabled>
                    {route === "unity"
                      ? fr
                        ? "Sélectionnez un service"
                        : "Select a service"
                      : fr
                        ? "Sélectionnez un domaine de service"
                        : "Select a service area"}
                  </option>
                  {serviceOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
            )}
            <label className="form-textarea">
              {route === "unity"
                ? fr
                  ? "Que faut-il livrer ? *"
                  : "What needs to be delivered? *"
                : fr
                  ? "Qu’est-ce qui doit mieux fonctionner ? *"
                  : "What needs to work better? *"}
              <textarea
                required
                name="description"
                rows={5}
                maxLength={4000}
                placeholder={
                  route === "unity"
                    ? fr
                      ? "Par exemple : le matériel, le périmètre, les langues, le niveau de qualité attendu et le résultat recherché."
                      : "For example: the material, scope, languages, expected quality, and the outcome you need."
                    : fr
                      ? "Par exemple : le processus ou le problème, les personnes concernées et le résultat recherché."
                      : "For example: the workflow or problem, the people involved, and the outcome you need."
                }
              />
            </label>
            <details className="intake-details">
              <summary>
                {fr ? "Ajouter des détails de livraison" : "Add delivery details"} <span>{fr ? "Facultatif" : "Optional"}</span>
              </summary>
              <div className="form-grid">
                <label>
                  {fr ? "Organisation" : "Company"}
                  <input name="company" autoComplete="organization" placeholder={fr ? "Entreprise ou organisation" : "Company or organization"} />
                </label>
                <label>
                  {fr ? "Téléphone" : "Phone"}
                  <input name="phone" autoComplete="tel" placeholder={fr ? "Indicatif pays et numéro" : "Country code and phone number"} />
                </label>
                <label>
                  {fr ? "Pays" : "Country"}
                  <input name="country" autoComplete="country-name" placeholder={fr ? "Pays" : "Country"} />
                </label>
                <label>
                  {fr ? "Volume ou budget estimé" : "Expected volume or budget"}
                  <input
                    name="volume"
                    placeholder={
                      route === "unity"
                        ? fr
                          ? "Fichiers, heures ou volume"
                          : "Files, hours, or volume"
                        : fr
                          ? "Fourchette ou échelle facultative"
                          : "Optional range or scale"
                    }
                  />
                </label>
                <label>
                  {fr ? "Calendrier idéal" : "Ideal timing"}
                  <input type="date" name="deadline" />
                </label>
                <label>
                  {fr ? "Mode de communication préféré" : "Preferred communication"}
                  <select name="communication" defaultValue="">
                    <option value="">{fr ? "Aucune préférence" : "No preference"}</option>
                    <option>E-mail</option>
                    <option>{fr ? "Appel vidéo" : "Video call"}</option>
                    <option>{fr ? "Messagerie" : "Messaging"}</option>
                  </select>
                </label>
              </div>
            </details>
            <p className="intake-form__note">
              {fr ? "Le brief est transmis à l’équipe. " : "The brief is sent to the team. "}
              <LocaleLink to="/privacy">{fr ? "Notice de confidentialité" : "Privacy notice"}</LocaleLink>
            </p>
            {Object.keys(errors).length > 0 && (
              <ul className="form-errors" role="alert">
                {Object.entries(errors).map(([key, message]) => (
                  <li key={key}>{message}</li>
                ))}
              </ul>
            )}
            <p className="intake-form__privacy">
              {fr
                ? `Transmis à l’équipe. Vous pouvez aussi écrire à ${channel.email}. `
                : `Sent to the team. You can also write to ${channel.email}. `}
              <LocaleLink to="/privacy">{fr ? "Confidentialité" : "Privacy"}</LocaleLink>
            </p>
            <button className="button button--solid" type="submit" disabled={pending}>
              {pending ? (locale === "fr" ? "Envoi…" : "Sending…") : locale === "fr" ? "Envoyer le brief" : "Send the brief"} <Send size={16} />
            </button>
          </form>
        </div>
      </section>
      <section className="contact-faq section-pad">
        <div className="container contact-faq__grid">
          <h2>{fr ? "Questions directes" : "Direct answers"}</h2>
          <div>
            {contactFaqs(locale).map((item) => (
              <article key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
