import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { StudioGate } from "@/components/StudioGate";
import {
  answerDesk,
  hideDeskPost,
  hideDeskReply,
  listDeskAdmin,
  listDeskMembers,
  removeDeskMember,
  type DeskMember,
  type DeskPost,
  type DeskReply,
} from "@/lib/desk.functions";

export default function DeskAdminPage() {
  const [posts, setPosts] = useState<DeskPost[] | null>(null);
  const [members, setMembers] = useState<DeskMember[]>([]);
  const [picked, setPicked] = useState("");
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [answer, setAnswer] = useState("");

  async function refresh() {
    try {
      const [threads, accounts] = await Promise.all([listDeskAdmin(), listDeskMembers()]);
      setPosts(threads);
      setMembers(accounts);
      setPicked((current) => current || threads[0]?.id || "");
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      setPosts([]);
      if (!/unauthorized/i.test(message)) setNotice(message || "The journal could not be opened.");
    }
  }

  useEffect(() => {
    void refresh();
  }, []);

  const needle = query.trim().toLowerCase();
  const visible = (posts ?? []).filter((post) => {
    if (!needle) return true;
    const blob = [post.title, post.author, post.topic, post.body, ...post.replies.map((reply) => `${reply.author} ${reply.body}`)].join(" ").toLowerCase();
    return blob.includes(needle);
  });
  const thread = visible.find((post) => post.id === picked) ?? visible[0];

  return (
    <StudioGate title="Journal">
      <p className="studio__notice">
        Review public threads, play voice notes, remove a reply, answer as eveOps Group, and close member accounts. Closing an account does not delete what that person already posted.
      </p>
      {notice ? <p className="studio__notice">{notice}</p> : null}
      <div className="studio__grid">
        <section className="studio__panel">
          <div className="studio__panel-head">
            <h2>Threads</h2>
            <span>{visible.length}</span>
          </div>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search threads and replies" aria-label="Search threads" />
          <ul>
            {visible.map((post) => (
              <li key={post.id}>
                <button className="desk-admin-pick" type="button" onClick={() => setPicked(post.id)}>
                  <strong>{post.title}</strong>
                  <span>
                    {post.topic} · {post.author} · {post.replies.length} replies · {post.score}
                    {post.hasAudio ? " · voice" : ""}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
        {thread ? (
          <section className="studio__panel">
            <div className="studio__panel-head">
              <h2>{thread.title}</h2>
              <Link to={`/insights/${thread.slug}`}>Open</Link>
            </div>
            <p>{thread.author} · {thread.topic} · useful {thread.score}</p>
            {thread.hasAudio ? <audio controls src={`/api/desk-audio/${thread.id}`} /> : null}
            {thread.hasImage ? <img src={`/api/desk-image/${thread.id}`} alt="" /> : null}
            <p>{thread.body}</p>
            {!thread.official ? (
              <button type="button" onClick={() => void hideDeskPost({ data: thread.id }).then(refresh)}>Remove thread</button>
            ) : null}
            <ul>
              {thread.replies.map((reply) => (
                <AdminReply key={reply.id} reply={reply} replies={thread.replies} onRemove={() => void hideDeskReply({ data: reply.id }).then(refresh)} />
              ))}
            </ul>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                void answerDesk({ data: { postId: thread.id, body: answer } }).then((result) => {
                  if (!result.ok) {
                    setNotice(result.error);
                    return;
                  }
                  setAnswer("");
                  setNotice("Answer posted as eveOps Group.");
                  void refresh();
                });
              }}
            >
              <label>
                Answer as eveOps Group
                <textarea value={answer} onChange={(event) => setAnswer(event.target.value)} rows={4} />
              </label>
              <button type="submit">Post answer</button>
            </form>
          </section>
        ) : (
          <section className="studio__panel">
            <h2>Nothing matches</h2>
          </section>
        )}
      </div>
      <section className="studio__panel">
        <div className="studio__panel-head">
          <h2>Accounts</h2>
          <span>{members.length}</span>
        </div>
        {members.length === 0 ? <p>No one has created a username yet.</p> : null}
        <ul>
          {members.map((member) => (
            <li key={member.id}>
              <span>
                <strong>{member.username}</strong>
                <span>{member.createdAt.slice(0, 10)}</span>
              </span>
              <button type="button" onClick={() => void removeDeskMember({ data: member.id }).then(refresh)}>Close account</button>
            </li>
          ))}
        </ul>
      </section>
    </StudioGate>
  );
}

function AdminReply({ reply, replies, onRemove }: { reply: DeskReply; replies: DeskReply[]; onRemove: () => void }) {
  const parent = replies.find((item) => item.id === reply.parentId);
  return (
    <li style={{ marginLeft: reply.parentId ? 16 : 0 }}>
      <span>
        <strong>{reply.author}</strong>
        {reply.official ? " · eveOps Group" : ""}
        {parent ? ` · replying to ${parent.author}` : ""}
        {reply.hasAudio ? " · voice" : ""}
        {reply.hasImage ? " · picture" : ""}
        <span>{reply.body || (reply.hasAudio ? "Voice note" : "Picture")}</span>
        {reply.hasAudio ? <audio controls src={`/api/desk-audio/${reply.id}`} /> : null}
      </span>
      <button type="button" onClick={onRemove}>Remove</button>
    </li>
  );
}
