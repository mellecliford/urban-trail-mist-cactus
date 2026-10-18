import { useEffect, useState } from "react";
import { deskSession, listDesk, type DeskPost, type DeskReply } from "@/lib/desk.functions";
import { MemberBar, ReplyForm, Vote } from "@/components/DeskParts";
import { LocaleLink } from "@/components/LocaleLink";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useLocale } from "@/lib/locale";

function topicLabel(topic: string, fr: boolean) {
  if (topic === "Technology") return fr ? "Technologie" : "Technology";
  return fr ? "Entreprise" : "Business";
}

export default function DeskThreadPage({ initial }: { initial: DeskPost | null }) {
  const locale = useLocale();
  const fr = locale === "fr";
  const [post, setPost] = useState<DeskPost | null>(initial);
  const [member, setMember] = useState("");
  const title = post ? (fr && post.titleFr ? post.titleFr : post.title) : fr ? "Fil introuvable" : "Thread not found";
  useDocumentMeta(
    `${title} | Journal | eveOps Group`,
    post
      ? (fr && post.bodyFr ? post.bodyFr : post.body).replace(/\s+/g, " ").slice(0, 160)
      : fr
        ? "Ce fil n’est plus sur le journal."
        : "This thread is no longer on the journal.",
    post ? undefined : { noindex: true },
  );

  useEffect(() => {
    void deskSession().then((row) => setMember(row?.username ?? ""));
  }, []);

  async function refresh() {
    if (!post) return;
    const rows = await listDesk({ data: { q: "" } });
    setPost(rows.find((row) => row.id === post.id) ?? null);
  }

  if (!post) {
    return (
      <section className="desk">
        <div className="container desk__board">
          <LocaleLink to="/insights">{fr ? "Retour au journal" : "Back to the journal"}</LocaleLink>
          <h1>{fr ? "Ce fil n’est plus là." : "This thread is no longer here."}</h1>
        </div>
      </section>
    );
  }

  const body = fr && post.bodyFr ? post.bodyFr : post.body;
  const roots = post.replies.filter((reply) => !reply.parentId);

  return (
    <section className="desk">
      <div className="container desk__board">
        <div className="desk__topline">
          <LocaleLink to="/insights">{fr ? "Journal" : "Journal"}</LocaleLink>
          <MemberBar fr={fr} />
        </div>
        <article className="desk__thread">
          <p className="desk__meta">
            {post.kind === "essay" ? (fr ? "Épinglé" : "Pinned") : topicLabel(post.topic, fr)} · {post.author}
          </p>
          <h1>{title}</h1>
          <Vote id={post.id} kind="post" score={post.score} fr={fr} onChange={() => void refresh()} />
          {post.hasAudio ? <audio controls src={`/api/desk-audio/${post.id}`} /> : null}
          {body.split(/\n{2,}/).filter(Boolean).map((part) => (
            <p key={part.slice(0, 40)}>{part}</p>
          ))}
          {post.hasImage ? <img src={`/api/desk-image/${post.id}`} alt="" /> : null}
        </article>
        <h2>{fr ? "Réponses" : "Replies"}</h2>
        {roots.map((reply) => (
          <ReplyNode key={reply.id} reply={reply} all={post.replies} postId={post.id} fr={fr} member={member} onChange={() => void refresh()} depth={0} />
        ))}
        <ReplyForm postId={post.id} fr={fr} member={member} onDone={() => void refresh()} />
      </div>
    </section>
  );
}

function ReplyNode({
  reply,
  all,
  postId,
  fr,
  member,
  onChange,
  depth,
}: {
  reply: DeskReply;
  all: DeskReply[];
  postId: string;
  fr: boolean;
  member: string;
  onChange: () => void;
  depth: number;
}) {
  const [open, setOpen] = useState(false);
  const children = all.filter((item) => item.parentId === reply.id);
  return (
    <article className="desk__reply-item" style={{ marginLeft: depth ? 28 : 0 }}>
      <p className="desk__meta">{reply.author}</p>
      <Vote id={reply.id} kind="reply" score={reply.score} fr={fr} onChange={onChange} />
      {reply.body ? <p>{reply.body}</p> : null}
      {reply.hasAudio ? <audio controls src={`/api/desk-audio/${reply.id}`} /> : null}
      {reply.hasImage ? <img src={`/api/desk-image/${reply.id}`} alt="" /> : null}
      {depth < 3 ? (
        <button className="desk__count" type="button" onClick={() => setOpen((value) => !value)}>
          {open ? (fr ? "Fermer" : "Close") : fr ? "Répondre" : "Reply"}
        </button>
      ) : null}
      {open ? <ReplyForm postId={postId} parentId={reply.id} fr={fr} member={member} onDone={onChange} /> : null}
      {children.map((child) => (
        <ReplyNode key={child.id} reply={child} all={all} postId={postId} fr={fr} member={member} onChange={onChange} depth={depth + 1} />
      ))}
    </article>
  );
}
