import { useEffect, useRef, useState } from "react";
import { deskSession, loginDesk, logoutDesk, registerDesk, replyDesk, voteDesk } from "@/lib/desk.functions";

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || "").split(",")[1] || "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function voterId() {
  const key = "eveops-desk-voter";
  const current = localStorage.getItem(key) || "";
  if (/^[a-zA-Z0-9-]{8,40}$/.test(current)) return current;
  const next = crypto.randomUUID();
  localStorage.setItem(key, next);
  return next;
}

function savedVote(id: string) {
  try {
    const votes = JSON.parse(localStorage.getItem("eveops-desk-votes") || "{}") as Record<string, number>;
    return votes[id] === -1 ? -1 : votes[id] === 1 ? 1 : 0;
  } catch {
    return 0;
  }
}

function rememberVote(id: string, direction: number) {
  const votes = JSON.parse(localStorage.getItem("eveops-desk-votes") || "{}") as Record<string, number>;
  if (direction === 0) delete votes[id];
  else votes[id] = direction;
  localStorage.setItem("eveops-desk-votes", JSON.stringify(votes));
}

export function MemberBar({ fr }: { fr: boolean }) {
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    void deskSession().then((member) => setUsername(member?.username ?? ""));
  }, []);

  async function submit(mode: "in" | "up", form: HTMLFormElement) {
    const data = new FormData(form);
    setPending(true);
    setError("");
    const payload = { data: { username: String(data.get("username") || ""), password: String(data.get("password") || "") } };
    const result = mode === "up" ? await registerDesk(payload) : await loginDesk(payload);
    setPending(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setUsername(result.username);
    setOpen(false);
  }

  return (
    <div className="desk__member">
      {username ? (
        <>
          <span>{username}</span>
          <button
            type="button"
            onClick={() => {
              void logoutDesk().then(() => setUsername(""));
            }}
          >
            {fr ? "Quitter" : "Sign out"}
          </button>
        </>
      ) : (
        <button type="button" onClick={() => setOpen((value) => !value)}>
          {open ? (fr ? "Fermer" : "Close") : fr ? "Compte" : "Account"}
        </button>
      )}
      {open && !username ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void submit("in", event.currentTarget);
          }}
        >
          <p>{fr ? "Sans e-mail. Le mot de passe sert seulement à retrouver ce nom." : "No email. The password is only how you return to this name."}</p>
          <input name="username" required minLength={3} maxLength={20} placeholder={fr ? "Nom d’utilisateur" : "Username"} autoComplete="username" />
          <input name="password" required minLength={8} maxLength={72} type="password" placeholder={fr ? "Mot de passe" : "Password"} autoComplete="current-password" />
          {error ? <p className="desk__error">{error}</p> : null}
          <div>
            <button type="submit" disabled={pending}>{fr ? "Entrer" : "Sign in"}</button>
            <button
              type="button"
              disabled={pending}
              onClick={(event) => {
                const form = event.currentTarget.form;
                if (form) void submit("up", form);
              }}
            >{fr ? "Créer le compte" : "Create account"}</button>
          </div>
        </form>
      ) : null}
    </div>
  );
}

export function Vote({ id, kind, score, fr, onChange }: { id: string; kind: "post" | "reply"; score: number; fr: boolean; onChange: () => void }) {
  const [mine, setMine] = useState(0);
  useEffect(() => setMine(savedVote(id)), [id]);
  async function cast(direction: 1 | -1) {
    const result = await voteDesk({ data: { voter: voterId(), target: id, kind, direction } });
    if (!result.ok) return;
    rememberVote(id, result.direction);
    setMine(result.direction);
    onChange();
  }
  return (
    <div className="desk__vote">
      <button type="button" className={mine === 1 ? "is-on" : ""} onClick={() => void cast(1)}>{fr ? "Utile" : "Useful"}</button>
      <span>{score}</span>
      <button type="button" className={mine === -1 ? "is-on" : ""} onClick={() => void cast(-1)}>{fr ? "Moins" : "Less"}</button>
    </div>
  );
}

export function VoiceControl({ fr, onBlob }: { fr: boolean; onBlob: (blob: Blob | null) => void }) {
  const [recording, setRecording] = useState(false);
  const [audio, setAudio] = useState<Blob | null>(null);
  const [error, setError] = useState("");
  const recorder = useRef<MediaRecorder | null>(null);

  async function toggle() {
    if (recorder.current && recorder.current.state === "recording") {
      recorder.current.stop();
      return;
    }
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mime = MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "";
      const rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      const chunks: Blob[] = [];
      rec.ondataavailable = (event) => {
        if (event.data.size) chunks.push(event.data);
      };
      rec.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        const blob = new Blob(chunks, { type: rec.mimeType || "audio/webm" });
        setAudio(blob);
        onBlob(blob);
        setRecording(false);
        recorder.current = null;
      };
      recorder.current = rec;
      rec.start();
      setRecording(true);
      window.setTimeout(() => {
        if (rec.state === "recording") rec.stop();
      }, 60_000);
    } catch {
      setError(fr ? "Le micro n’est pas disponible." : "The microphone is not available.");
    }
  }

  return (
    <div className="desk__voice">
      <button type="button" onClick={() => void toggle()}>
        {recording ? (fr ? "Arrêter" : "Stop") : fr ? "Message vocal" : "Voice note"}
      </button>
      {audio ? <audio controls src={URL.createObjectURL(audio)} /> : null}
      {error ? <p className="desk__error">{error}</p> : null}
    </div>
  );
}

export function ReplyForm({
  postId,
  parentId = "",
  fr,
  member,
  onDone,
}: {
  postId: string;
  parentId?: string;
  fr: boolean;
  member: string;
  onDone: () => void;
}) {
  const [pending, setPending] = useState(false);
  const [audio, setAudio] = useState<Blob | null>(null);
  const [error, setError] = useState("");
  return (
    <form
      className="desk__reply"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const file = data.get("image");
        setPending(true);
        const result = await replyDesk({
          data: {
            postId,
            parentId,
            author: member || String(data.get("author") || ""),
            body: String(data.get("body") || ""),
            website: String(data.get("website") || ""),
            audio: audio ? await fileToBase64(new File([audio], "note.webm", { type: audio.type })) : "",
            image: file instanceof File && file.size ? await fileToBase64(file) : "",
          },
        });
        setPending(false);
        if (!result.ok) {
          setError(result.error);
          return;
        }
        form.reset();
        setAudio(null);
        onDone();
      }}
    >
      <label>
        {parentId ? (fr ? "Réponse dans le fil" : "Reply in the thread") : fr ? "Réponse" : "Answer"}
        <textarea name="body" rows={3} maxLength={4000} placeholder={fr ? "Écrivez, ou laissez un message vocal." : "Write it, or leave a voice note."} />
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
      <button type="submit" disabled={pending}>{pending ? "…" : fr ? "Publier" : "Post"}</button>
    </form>
  );
}
