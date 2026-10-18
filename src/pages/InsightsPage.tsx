import { useEffect, useState } from "react";
import { askDesk, deskSession, listDesk, type DeskPost } from "@/lib/desk.functions";
import { MemberBar, VoiceControl } from "@/components/DeskParts";
import { LocaleLink } from "@/components/LocaleLink";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useLocale, useLocationSearch } from "@/lib/locale";
import { withPublicLocale } from "@/lib/publicLocale";

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || "").split(",")[1] || "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function topicLabel(topic: string, fr: boolean) {
  if (topic === "Technology") return fr ? "Technologie" : "Technology";
  if (topic === "Business") return fr ? "Entreprise" : "Business";
  return topic;
}

export default function InsightsPage({ initial }: { initial: DeskPost[] }) {
  const locale = useLocale();
  const fr = locale === "fr";
  const search = useLocationSearch();
  const q = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search).get("q") || "";
  const [posts, setPosts] = useState<DeskPost[] | null>(initial);
  const [topic, setTopic] = useState("All");
  const [sort, setSort] = useState<"top" | "new">("top");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [member, setMember] = useState("");
  useDocumentMeta(
    fr ? "Journal | Technologie et entreprise | eveOps Group" : "Journal | Technology and business | eveOps Group",
    fr
      ? "Un forum public sur la technologie et l’entreprise. Posez une question ou répondez, par écrit ou en message vocal, avec ou sans compte."
      : "A public forum for technology and business. Ask or answer in writing or by voice, with or without an account.",
  );

  useEffect(() => {
    setPosts(initial);
  }, [initial]);

  useEffect(() => {
    void deskSession().then((row) => setMember(row?.username ?? ""));
  }, [open]);

  useEffect(() => {
    if (posts !== null) return;
    let live = true;
    void listDesk({ data: { q } })
      .then((rows) => {
        if (live) setPosts(rows);
      })
      .catch(() => {
        if (live) setPosts([]);
      });
    return () => {
      live = false;
    };
  }, [posts, q]);

  const list = (posts ?? []).filter((post) => topic === "All" || post.topic === topic);
  const pinned = list.filter((post) => post.kind === "essay");
  const rest = list
    .filter((post) => post.kind !== "essay")
    .sort((a, b) => (sort === "new" ? +new Date(b.createdAt) - +new Date(a.createdAt) : b.score - a.score || +new Date(b.createdAt) - +new Date(a.createdAt)));

  return (
    <section className="desk">
      <div className="container desk__board">
        <header className="desk__intro">
          <div className="desk__topline">
            <p>eveOps Group</p>
            <MemberBar fr={fr} />
          </div>
          <h1>{fr ? "Un forum public." : "A public forum."}</h1>
          <p>
            {fr
              ? "Technologie et entreprise. N’importe qui peut poser une question et partir. N’importe qui peut répondre et partir. Un compte est facultatif : un nom et un mot de passe, sans e-mail."
              : "Technology and business. Anyone can ask a question and leave. Anyone can answer and leave. An account is optional: a username and a password, with no email."}
          </p>
        </header>
        <form className="desk__search" method="get" action={withPublicLocale("/insights", locale)}>
          {fr ? <input type="hidden" name="lang" value="fr" /> : null}
          <input name="q" defaultValue={q} placeholder={fr ? "Chercher une question" : "Search questions"} aria-label={fr ? "Chercher" : "Search"} />
          <button type="submit">{fr ? "Chercher" : "Search"}</button>
        </form>
        <div className="desk__tools">
          <div>
            {["All", "Technology", "Business"].map((item) => (
              <button key={item} type="button" className={topic === item ? "is-on" : ""} onClick={() => setTopic(item)}>
                {item === "All" ? (fr ? "Tout" : "All") : topicLabel(item, fr)}
              </button>
            ))}
          </div>
          <div>
            <button type="button" className={sort === "top" ? "is-on" : ""} onClick={() => setSort("top")}>{fr ? "Utiles" : "Useful"}</button>
            <button type="button" className={sort === "new" ? "is-on" : ""} onClick={() => setSort("new")}>{fr ? "Récents" : "Recent"}</button>
          </div>
        </div>
        <button className="desk__open" type="button" onClick={() => setOpen((value) => !value)}>
          {open ? (fr ? "Fermer" : "Close") : fr ? "Ouvrir un fil" : "Start a thread"}
        </button>
        {open ? (
          <AskBox
            fr={fr}
            member={member}
            error={error}
            onError={setError}
            onDone={() => {
              setOpen(false);
              setPosts(null);
            }}
          />
        ) : null}
        {q ? <p className="desk__meta">{fr ? `Résultats pour « ${q} ».` : `Results for “${q}”.`}</p> : null}
        {[...pinned, ...rest].length === 0 ? <p>{fr ? "Aucune question ne correspond." : "No questions match."}</p> : null}
        {[...pinned, ...rest].map((post) => {
          const title = fr && post.titleFr ? post.titleFr : post.title;
          const body = fr && post.bodyFr ? post.bodyFr : post.body;
          return (
            <article className="desk__row" key={post.id}>
              <p className="desk__meta">
                {post.kind === "essay" ? (fr ? "Épinglé" : "Pinned") : topicLabel(post.topic, fr)}
                {" · "}
                {post.author}
                {" · "}
                {post.score}
              </p>
              <h2>
                <LocaleLink to={`/insights/${post.slug}`}>{title}</LocaleLink>
              </h2>
              <p>{body.replace(/\s+/g, " ").slice(0, 180)}</p>
              <LocaleLink className="desk__count" to={`/insights/${post.slug}`}>
                {post.replies.length} {fr ? "réponses" : post.replies.length === 1 ? "reply" : "replies"}
                {post.hasAudio ? (fr ? " · vocal" : " · voice") : ""}
              </LocaleLink>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function AskBox({
  fr,
  member,
  error,
  onError,
  onDone,
}: {
  fr: boolean;
  member: string;
  error: string;
  onError: (value: string) => void;
  onDone: () => void;
}) {
  const [pending, setPending] = useState(false);
  const [audio, setAudio] = useState<Blob | null>(null);
  return (
    <form
      className="desk__ask"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const file = data.get("image");
        setPending(true);
        onError("");
        const result = await askDesk({
          data: {
            author: member || String(data.get("author") || ""),
            title: String(data.get("title") || ""),
            body: String(data.get("body") || ""),
            topic: String(data.get("topic") || "Business"),
            website: String(data.get("website") || ""),
            audio: audio ? await fileToBase64(new File([audio], "note.webm", { type: audio.type })) : "",
            image: file instanceof File && file.size ? await fileToBase64(file) : "",
          },
        });
        setPending(false);
        if (!result.ok) {
          onError(result.error);
          return;
        }
        form.reset();
        setAudio(null);
        onDone();
      }}
    >
      <label>
        {fr ? "Sujet" : "Topic"}
        <select name="topic">
          <option value="Business">{fr ? "Entreprise" : "Business"}</option>
          <option value="Technology">{fr ? "Technologie" : "Technology"}</option>
        </select>
      </label>
      <label>
        {fr ? "Question" : "Question"}
        <input name="title" required minLength={8} maxLength={160} placeholder={fr ? "La question, en une phrase" : "The question, in one sentence"} />
      </label>
      <label>
        {fr ? "Détail" : "Detail"}
        <textarea name="body" rows={4} maxLength={4000} />
      </label>
      <VoiceControl fr={fr} onBlob={setAudio} />
      <label>
        {fr ? "Image" : "Picture"}
        <input name="image" type="file" accept="image/jpeg,image/png,image/webp,image/gif" />
      </label>
      {member ? null : (
        <label>
          {fr ? "Nom, si vous voulez" : "Name, if you want one"}
          <input name="author" maxLength={80} placeholder={fr ? "Ou laissez vide" : "Or leave this blank"} />
        </label>
      )}
      <input className="desk__trap" name="website" tabIndex={-1} autoComplete="off" />
      {error ? <p className="desk__error">{error}</p> : null}
      <button type="submit" disabled={pending}>{pending ? "…" : fr ? "Publier le fil" : "Post the thread"}</button>
    </form>
  );
}
