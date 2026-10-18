import { FileText } from "lucide-react";
import { useLocale } from "@/lib/locale";
import { LocaleLink } from "./LocaleLink";

export function CompanyProfileDownload() {
  const locale = useLocale();
  const fr = locale === "fr";
  const file = fr ? "/documents/eveops-group-profile.fr.pdf" : "/documents/eveops-group-profile.en.pdf";
  return (
    <section className="company-profile-download">
      <div className="container company-profile-download__grid">
        <div className="company-profile-download__signal">
          <FileText size={26} />
          <span>PDF</span>
        </div>
        <div className="company-profile-download__copy">
          <p className="eyebrow">{fr ? "Profil du groupe" : "Group profile"}</p>
          <h2>
            {fr ? <>Un aperçu clair d’<em>eveOps Group.</em></> : <>A concise view of <em>eveOps Group.</em></>}
          </h2>
          <p>
            {fr
              ? "Le profil du groupe, en quatre pages, pour présenter Unity Integrated Solutions et eveDev Ops à une équipe interne."
              : "The group profile, in four pages, for briefing an internal team on Unity Integrated Solutions and eveDev Ops."}
          </p>
        </div>
        <div className="company-profile-download__action">
          <a className="company-profile-download__button" href={file} download>
            {fr ? "Télécharger le profil" : "Download the profile"}
          </a>
          <LocaleLink to="/contact" className="company-profile-download__alternate">
            {fr ? "Ou en parler" : "Or talk to us"}
          </LocaleLink>
          <span>{fr ? "PDF · A4 · 4 pages" : "PDF · A4 · 4 pages"}</span>
        </div>
      </div>
    </section>
  );
}
