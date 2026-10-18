import { useEffect, useState } from "react";
import { StudioGate } from "@/components/StudioGate";
import { bulkCustomers, listCustomers, updateCustomer, type Customer } from "@/lib/site.functions";

export default function CustomersPage() {
  const [rows, setRows] = useState<Customer[] | null>(null);
  const [picked, setPicked] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  async function refresh() {
    try {
      setRows(await listCustomers());
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      setRows([]);
      if (!/unauthorized/i.test(message)) setNotice(message || "Customers could not be opened.");
    }
  }

  useEffect(() => {
    void refresh();
  }, []);

  function toggle(id: string) {
    setPicked((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  async function save(row: Customer) {
    const result = await updateCustomer({ data: { id: row.id, status: row.status, notes: row.notes } });
    setNotice(result.ok ? "Saved." : result.error);
  }

  async function run(action: "status" | "division" | "delete", extra: { status?: string; division?: string } = {}) {
    if (!picked.length) return;
    if (action === "delete" && !window.confirm(`Remove ${picked.length} ${picked.length === 1 ? "enquiry" : "enquiries"}?`)) return;
    setBusy(true);
    const result = await bulkCustomers({ data: { ids: picked, action, ...extra } });
    setBusy(false);
    if (!result.ok) {
      setNotice(result.error);
      return;
    }
    setPicked([]);
    setNotice(action === "delete" ? "Removed." : "Updated.");
    await refresh();
  }

  const allPicked = Boolean(rows?.length) && picked.length === rows?.length;

  return (
    <StudioGate title="Customers">
      <div className="studio__stack">
        {notice ? <p className="studio__notice">{notice}</p> : null}
        {rows && rows.length > 0 ? (
          <div className="studio__bulk">
            <label className="studio__check">
              <input
                type="checkbox"
                checked={allPicked}
                onChange={() => setPicked(allPicked ? [] : rows.map((row) => row.id))}
              />
              {picked.length ? `${picked.length} selected` : "Select all"}
            </label>
            <button type="button" disabled={!picked.length || busy} onClick={() => void run("status", { status: "replied" })}>Mark replied</button>
            <button type="button" disabled={!picked.length || busy} onClick={() => void run("status", { status: "closed" })}>Mark closed</button>
            <button type="button" disabled={!picked.length || busy} onClick={() => void run("status", { status: "new" })}>Mark new</button>
            <button type="button" disabled={!picked.length || busy} onClick={() => void run("division", { division: "unity" })}>Move to Unity</button>
            <button type="button" disabled={!picked.length || busy} onClick={() => void run("division", { division: "edevops" })}>Move to eveDev</button>
            <button type="button" disabled={!picked.length || busy} onClick={() => void run("delete")}>Remove</button>
          </div>
        ) : null}
        {!rows ? <p>Opening…</p> : null}
        {rows?.length === 0 ? <p className="studio__panel">No enquiries yet. They appear here when someone uses the contact form.</p> : null}
        {rows?.map((row) => (
          <article className="studio__panel" key={row.id}>
            <div className="studio__panel-head">
              <label className="studio__check">
                <input type="checkbox" checked={picked.includes(row.id)} onChange={() => toggle(row.id)} />
                <h2>{row.name}</h2>
              </label>
            </div>
            <p>
              {row.email}
              {row.phone ? ` · ${row.phone}` : ""}
              {row.company ? ` · ${row.company}` : ""}
            </p>
            <p>
              {row.division} · {new Date(row.createdAt).toLocaleString()}
              {row.service ? ` · ${row.service}` : ""}
              {row.country ? ` · ${row.country}` : ""}
            </p>
            <p>{row.message}</p>
            {row.volume || row.deadline ? <p>{[row.volume, row.deadline, row.communication].filter(Boolean).join(" · ")}</p> : null}
            <label>
              Status
              <select
                value={row.status}
                onChange={(event) => setRows((current) => current?.map((item) => (item.id === row.id ? { ...item, status: event.target.value } : item)) ?? null)}
              >
                <option value="new">New</option>
                <option value="replied">Replied</option>
                <option value="closed">Closed</option>
              </select>
            </label>
            <label>
              Notes
              <textarea
                rows={3}
                value={row.notes}
                onChange={(event) => setRows((current) => current?.map((item) => (item.id === row.id ? { ...item, notes: event.target.value } : item)) ?? null)}
              />
            </label>
            <button type="button" onClick={() => void save(row)}>Save</button>
          </article>
        ))}
      </div>
    </StudioGate>
  );
}
