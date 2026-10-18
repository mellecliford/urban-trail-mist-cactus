import { LocaleLink } from "@/components/LocaleLink";
import { usePublicContact } from "@/hooks/usePublicContact";
import { useLocale } from "@/lib/locale";
import { telHref, whatsappHref, type Channel } from "@/lib/site-settings";

export function DivisionReach({ division }: { division: "unity" | "edevops" }) {
  const locale = useLocale();
  const fr = locale === "fr";
  const contact = usePublicContact();
  const channel: Channel & { hours: string } = division === "unity" ? contact.unity : contact.edevops;
  const name = division === "unity" ? "Unity Integrated Solutions" : "eveDev Ops";

  return (
    <section className={`division-reach division-reach--${division}`}>
      <div className="container division-reach__grid">
        <div>
          <p>{name}</p>
          <h2>{fr ? "Joindre cette division" : "Reach this division"}</h2>
        </div>
        <div className="division-reach__lines">
          {channel.email ? <a href={`mailto:${channel.email}`}>{channel.email}</a> : null}
          {channel.phone ? <a href={telHref(channel.phone)}>{channel.phone}</a> : null}
          {channel.whatsapp && whatsappHref(channel.whatsapp) ? <a href={whatsappHref(channel.whatsapp)}>WhatsApp</a> : null}
          {channel.address ? <span>{channel.address}</span> : null}
          {channel.hours ? <span>{channel.hours}</span> : null}
        </div>
        <LocaleLink to={division === "unity" ? "/unity/contact" : "/contact"}>{fr ? "Écrire" : "Write"}</LocaleLink>
      </div>
    </section>
  );
}
