import { useId, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CheckCircle2, MessageCircle, Send, X } from "lucide-react";
import { toast } from "sonner";
import { usePublicContact } from "@/hooks/usePublicContact";
import { submitEnquiry } from "@/lib/site.functions";
import { enquirySchema, fieldErrors } from "@/lib/formSecurity";
import { LocaleLink } from "@/components/LocaleLink";
import type { PublicLocale } from "@/lib/publicLocale";

export function QuickContactModal({ locale }: { locale: PublicLocale }) {
  const fr = locale === "fr";
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const titleId = useId();
  const descId = useId();
  const label = fr ? "Parler à eveOps Group" : "Talk to eveOps Group";
  const contact = usePublicContact();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setPending(true);
    const parsed = enquirySchema(fr).safeParse({
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      phone: "",
      message: String(data.get("message") || ""),
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
        email: parsed.data.email,
        message: parsed.data.message,
        division: "group",
        service: "Homepage quick contact",
      },
    });
    setPending(false);
    if (!result.ok) {
      setErrors({ form: result.error });
      return;
    }
    form.reset();
    setSubmitted(true);
    toast.success(fr ? "Message reçu." : "Message received.", {
      description: result.mailed
        ? fr
          ? "L’équipe en a été informée."
          : "The team has been notified."
        : fr
          ? "Il est dans le studio."
          : "It is in the studio.",
    });
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) {
          setSubmitted(false);
          setErrors({});
        }
      }}
    >
      <Dialog.Trigger asChild>
        <button className="hero-talk" type="button" aria-label={label}>
          <MessageCircle size={16} aria-hidden="true" />
          <span className="hero-talk__full">{label}</span>
          <span className="hero-talk__short">{fr ? "Parlons-en" : "Talk to us"}</span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="qc-overlay" />
        <Dialog.Content
          className="quick-contact-modal"
          aria-describedby={descId}
          aria-labelledby={titleId}
          onOpenAutoFocus={(event) => {
            if (window.matchMedia("(pointer: coarse)").matches) event.preventDefault();
          }}
        >
          <div className="quick-contact-modal__handle" aria-hidden="true" />
          <Dialog.Close className="quick-contact-modal__close" aria-label={fr ? "Fermer" : "Close"}>
            <X size={18} />
          </Dialog.Close>
          {submitted ? (
            <div className="quick-contact-modal__success">
              <div className="quick-contact-modal__success-icon">
                <CheckCircle2 size={25} />
              </div>
              <p className="quick-contact-modal__eyebrow">{fr ? "Message reçu" : "Message received"}</p>
              <Dialog.Title id={titleId} className="quick-contact-modal__title">
                {fr ? "Merci de nous avoir écrit." : "Thank you for getting in touch."}
              </Dialog.Title>
              <Dialog.Description id={descId} className="quick-contact-modal__copy">
                {fr
                  ? "Notre équipe dispose maintenant de votre message et reviendra vers vous avec la suite appropriée."
                  : "Our team now has your message and will follow up with the appropriate next step."}
              </Dialog.Description>
              <Dialog.Close className="quick-contact-modal__done">{fr ? "Fermer" : "Close"}</Dialog.Close>
            </div>
          ) : (
            <div className="quick-contact-modal__sheet">
              <header className="quick-contact-modal__head">
                <p className="quick-contact-modal__eyebrow">{fr ? "Un premier échange simple" : "A simple first conversation"}</p>
                <Dialog.Title id={titleId} className="quick-contact-modal__title">
                  {fr ? (
                    <>
                      Parlons de ce qui doit <em>avancer.</em>
                    </>
                  ) : (
                    <>
                      Let’s discuss what needs to <em>move forward.</em>
                    </>
                  )}
                </Dialog.Title>
                <Dialog.Description id={descId} className="quick-contact-modal__copy">
                  {fr
                    ? "Donnez-nous juste l’essentiel. eveOps Group vous orientera vers Unity, eveDev Ops, ou la bonne combinaison."
                    : "Share only the essentials. eveOps Group will route you to Unity, eveDev Ops, or the right combination."}
                </Dialog.Description>
                <a className="quick-contact-modal__whatsapp" href="https://wa.me/message/NG7LRS7O2LIYM1" target="_blank" rel="noreferrer">
                  {fr ? "WhatsApp eveOps Group" : "WhatsApp eveOps Group"}
                </a>
              </header>
              <form className="quick-contact-modal__form" onSubmit={handleSubmit}>
                <div className="quick-contact-modal__fields">
                  <label>
                    {fr ? "Nom" : "Name"} *
                    <input required name="name" autoComplete="name" maxLength={120} placeholder={fr ? "Votre nom" : "Your name"} />
                  </label>
                  <label>
                    E-mail *
                    <input required type="email" name="email" autoComplete="email" maxLength={180} placeholder="name@company.com" />
                  </label>
                  <label>
                    {fr ? "Comment pouvons-nous vous aider ?" : "How can we help?"} *
                    <textarea
                      required
                      name="message"
                      rows={3}
                      minLength={10}
                      maxLength={4000}
                      placeholder={fr ? "Le besoin, l’objectif ou la question à traiter." : "The need, outcome, or question you would like to address."}
                    />
                  </label>
                </div>
                <p className="intake-form__note">
                  <LocaleLink to="/privacy">{fr ? "Notice de confidentialité" : "Privacy notice"}</LocaleLink>
                </p>
                {Object.keys(errors).length > 0 && (
                  <ul className="form-errors" role="alert">
                    {Object.entries(errors).map(([key, message]) => (
                      <li key={key}>{message}</li>
                    ))}
                  </ul>
                )}
                <div className="quick-contact-modal__form-footer">
                  <p>
                    {fr ? "Transmis à l’équipe. " : "Sent to the team. "}
                    <a href={`mailto:${contact.group.email}`}>{contact.group.email}</a>
                  </p>
                  <button className="button button--solid" type="submit" disabled={pending}>
                    {pending ? (fr ? "Envoi…" : "Sending…") : fr ? "Envoyer" : "Send message"} <Send size={16} />
                  </button>
                </div>
              </form>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
