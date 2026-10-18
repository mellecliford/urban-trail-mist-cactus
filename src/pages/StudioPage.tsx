import { useEffect, useState } from "react";
import { StudioGate } from "@/components/StudioGate";
import { deleteShowcase, listShowcaseAdmin, saveShowcase, uploadShowcaseMedia, clearShowcaseMedia } from "@/lib/showcase.functions";
import type { ShowcaseDivision, ShowcaseItem } from "@/lib/showcase";

const empty = {
  id: "",
  division: "edevops" as ShowcaseDivision,
  name: "",
  slug: "",
  category: "",
  status: "In development",
  summary: "",
  summaryFr: "",
  href: "",
  published: true,
  sortOrder: 1,
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function readFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || "");
      resolve(text.slice(text.indexOf(",") + 1));
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export default function StudioPage() {
  const [items, setItems] = useState<ShowcaseItem[] | null>(null);
  const [draft, setDraft] = useState(empty);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [removeMedia, setRemoveMedia] = useState(false);
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  async function refresh() {
    try {
      const rows = await listShowcaseAdmin();
      setItems(rows);
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      setItems([]);
      if (!/unauthorized/i.test(message)) setNotice(message || "The studio could not open.");
    }
  }

  useEffect(() => {
    void refresh();
  }, []);

  function edit(item: ShowcaseItem) {
    setNotice("");
    setFile(null);
    setRemoveMedia(false);
    setPreview(item.hasMedia ? `/api/showcase-media/${item.id}?v=${item.sortOrder}` : "");
    setDraft({
      id: item.id,
      division: item.division,
      name: item.name,
      slug: item.slug,
      category: item.category,
      status: item.status,
      summary: item.summary,
      summaryFr: item.summaryFr,
      href: item.href,
      published: item.published,
      sortOrder: item.sortOrder,
    });
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setNotice("");
    const result = await saveShowcase({ data: draft });
    setBusy(false);
    if (!result.ok) {
      setNotice(result.error);
      return;
    }
    if (removeMedia) {
      await clearShowcaseMedia({ data: result.id });
    } else if (file) {
      const base64 = await readFile(file);
      const uploaded = await uploadShowcaseMedia({ data: { id: result.id, base64 } });
      if (!uploaded.ok) {
        setNotice(uploaded.error);
        setBusy(false);
        await refresh();
        return;
      }
    }
    setNotice("Saved.");
    setDraft(empty);
    setFile(null);
    setPreview("");
    setRemoveMedia(false);
    await refresh();
  }

  async function onDelete(id: string) {
    if (!window.confirm("Remove this entry from the products page?")) return;
    setBusy(true);
    const result = await deleteShowcase({ data: id });
    setBusy(false);
    if (!result.ok) {
      setNotice(result.error);
      return;
    }
    if (draft.id === id) setDraft(empty);
    await refresh();
  }

  return (
    <StudioGate title="Products">
      <div className="studio__grid">
          <section className="studio__panel">
            <div className="studio__panel-head">
              <h2>On the page</h2>
              <button type="button" onClick={() => { setDraft(empty); setFile(null); setPreview(""); setRemoveMedia(false); setNotice(""); }}>New</button>
            </div>
            {!items ? <p>Opening…</p> : null}
            {items?.length === 0 ? <p>No entries yet.</p> : null}
            <ul>
              {items?.map((item) => (
                <li key={item.id}>
                  <button type="button" onClick={() => edit(item)}>
                    <strong>{item.name}</strong>
                    <span>{item.division === "unity" ? "Unity" : "eveDev Ops"} · {item.published ? "Published" : "Hidden"}</span>
                  </button>
                  <button type="button" onClick={() => void onDelete(item.id)} disabled={busy}>Remove</button>
                </li>
              ))}
            </ul>
          </section>
          <form className="studio__panel" onSubmit={onSubmit}>
            <h2>{draft.id ? "Edit entry" : "New entry"}</h2>
            <label>
              Business
              <select value={draft.division} onChange={(event) => setDraft({ ...draft, division: event.target.value as ShowcaseDivision })}>
                <option value="unity">Unity Integrated Solutions</option>
                <option value="edevops">eveDev Ops</option>
              </select>
            </label>
            <label>
              Name
              <input
                value={draft.name}
                onChange={(event) => {
                  const name = event.target.value;
                  setDraft((current) => ({ ...current, name, slug: current.id ? current.slug : slugify(name) }));
                }}
                required
              />
            </label>
            <label>
              Slug
              <input value={draft.slug} onChange={(event) => setDraft({ ...draft, slug: slugify(event.target.value) })} required />
            </label>
            <label>
              Category
              <input value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })} />
            </label>
            <label>
              Status
              <input value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value })} />
            </label>
            <label>
              Summary
              <textarea value={draft.summary} onChange={(event) => setDraft({ ...draft, summary: event.target.value })} rows={3} />
            </label>
            <label>
              Résumé français
              <textarea value={draft.summaryFr} onChange={(event) => setDraft({ ...draft, summaryFr: event.target.value })} rows={3} />
            </label>
            <label>
              Image
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={(event) => {
                  const next = event.target.files?.[0] ?? null;
                  setFile(next);
                  setRemoveMedia(false);
                  setPreview(next ? URL.createObjectURL(next) : draft.id ? `/api/showcase-media/${draft.id}` : "");
                }}
              />
            </label>
            {preview && !removeMedia ? <img className="studio__preview" src={preview} alt="" /> : null}
            {draft.id ? (
              <label className="studio__check">
                <input type="checkbox" checked={removeMedia} onChange={(event) => setRemoveMedia(event.target.checked)} />
                Remove the current image
              </label>
            ) : null}
            <label>
              Link
              <input value={draft.href} onChange={(event) => setDraft({ ...draft, href: event.target.value })} placeholder="/products/shweng or https://" />
            </label>
            <label>
              Order
              <input type="number" min={0} max={999} value={draft.sortOrder} onChange={(event) => setDraft({ ...draft, sortOrder: Number(event.target.value) })} />
            </label>
            <label className="studio__check">
              <input type="checkbox" checked={draft.published} onChange={(event) => setDraft({ ...draft, published: event.target.checked })} />
              Published on the products page
            </label>
            {notice ? <p className="studio__notice">{notice}</p> : null}
            <button type="submit" disabled={busy}>{busy ? "Saving…" : "Save"}</button>
          </form>
        </div>
    </StudioGate>
  );
}
