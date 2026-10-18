import { useEffect, useState } from "react";
import { LocaleLink } from "./LocaleLink";
import { useLocale } from "@/lib/locale";

const KEY = "eveops-cookie-notice";

export function CookieNotice() {
  const locale = useLocale();
  const fr = locale === "fr";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  if (!open) return null;

  const accept = () => {
    try {
      localStorage.setItem(KEY, "essential");
    } catch {
      /* storage blocked */
    }
    setOpen(false);
  };

  return (
    <div className="cookie-notice" role="dialog" aria-labelledby="cookie-notice-title">
      <div>
        <p id="cookie-notice-title">
          {fr
            ? "Ce site n’utilise pas de cookies publicitaires. Un cookie de session n’existe que si vous vous connectez. Une demande de formulaire est transmise à l’équipe."
            : "This site does not use advertising cookies. A session cookie exists only if you sign in. A form enquiry is sent to the team."}
        </p>
        <p className="cookie-notice__links">
          <LocaleLink to="/cookies">{fr ? "Cookies" : "Cookies"}</LocaleLink>
          <LocaleLink to="/privacy">{fr ? "Confidentialité" : "Privacy"}</LocaleLink>
        </p>
      </div>
      <button type="button" onClick={accept}>
        {fr ? "Compris" : "Understood"}
      </button>
    </div>
  );
}
