import { useEffect, useState } from "react";
import { StudioGate } from "@/components/StudioGate";
import { getAdminSession, saveAdminSettings } from "@/lib/admin.functions";
import { getStudioSettings, saveContactSettings, saveSmtpSettings, sendTestEmail } from "@/lib/site.functions";

const emptyContact = {
  groupEmail: "",
  groupPhone: "",
  groupWhatsapp: "",
  groupAddress: "",
  groupHours: "",
  unityEmail: "",
  unityPhone: "",
  unityWhatsapp: "",
  unityAddress: "",
  unityHours: "",
  unityNotify: "",
  edevopsEmail: "",
  edevopsPhone: "",
  edevopsWhatsapp: "",
  edevopsAddress: "",
  edevopsHours: "",
  edevopsNotify: "",
  notifyEmail: "",
};

export default function AdminSettingsPage() {
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [contact, setContact] = useState(emptyContact);
  const [smtp, setSmtp] = useState({ host: "", port: 587, user: "", password: "", from: "", secure: false, enabled: false, hasPassword: false });
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getAdminSession()
      .then((session) => {
        if (session?.username) setUsername(session.username);
      })
      .catch(() => undefined);
    getStudioSettings()
      .then((settings) => {
        setContact(settings.contact);
        setSmtp((current) => ({ ...current, ...settings.smtp, password: "" }));
      })
      .catch(() => undefined);
  }, []);

  function patch(key: keyof typeof emptyContact, value: string) {
    setContact((current) => ({ ...current, [key]: value }));
  }

  async function saveSignIn(event: React.FormEvent) {
    event.preventDefault();
    if (newPassword !== confirm) {
      setNotice("The new passwords do not match.");
      return;
    }
    setBusy(true);
    const result = await saveAdminSettings({ data: { username, currentPassword, newPassword } });
    setBusy(false);
    setNotice(result.ok ? "Sign-in details saved." : result.error);
    if (result.ok) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirm("");
    }
  }

  async function saveContact(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    const result = await saveContactSettings({ data: contact });
    setBusy(false);
    setNotice(result.ok ? "Contact details saved. The site is using them now." : result.error);
  }

  async function saveMail(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    const result = await saveSmtpSettings({ data: smtp });
    setBusy(false);
    if (result.ok) {
      setSmtp((current) => ({ ...current, password: "", hasPassword: current.hasPassword || Boolean(smtp.password) }));
      setNotice("Mail settings saved.");
    } else setNotice(result.error);
  }

  async function testMail() {
    setBusy(true);
    const result = await sendTestEmail();
    setBusy(false);
    setNotice(result.ok ? "Test email sent to the inbox." : result.error);
  }

  return (
    <StudioGate title="Settings">
      <div className="studio__stack">
        {notice ? <p className="studio__notice">{notice}</p> : null}
        <form className="studio__panel" onSubmit={saveSignIn}>
          <h2>Sign-in</h2>
          <p>Change the username and password for this studio. Leave the new password blank to keep the current one.</p>
          <label>
            Username
            <input value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" required />
          </label>
          <label>
            Current password
            <input type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} autoComplete="current-password" required />
          </label>
          <label>
            New password
            <input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} autoComplete="new-password" />
          </label>
          <label>
            Confirm new password
            <input type="password" value={confirm} onChange={(event) => setConfirm(event.target.value)} autoComplete="new-password" />
          </label>
          <button type="submit" disabled={busy}>Save sign-in</button>
        </form>

        <form className="studio__panel" onSubmit={saveContact}>
          <h2>Group contact</h2>
          <p>This is what the site shows until a division has its own details. The inbox receives new enquiries.</p>
          <div className="studio__fields">
            <label>
              Email
              <input value={contact.groupEmail} onChange={(event) => patch("groupEmail", event.target.value)} required />
            </label>
            <label>
              Phone
              <input value={contact.groupPhone} onChange={(event) => patch("groupPhone", event.target.value)} />
            </label>
            <label>
              WhatsApp number
              <input value={contact.groupWhatsapp} onChange={(event) => patch("groupWhatsapp", event.target.value)} placeholder="+237…" />
            </label>
            <label>
              Hours
              <input value={contact.groupHours} onChange={(event) => patch("groupHours", event.target.value)} placeholder="Mon–Fri, 9:00–17:00 WAT" />
            </label>
          </div>
          <label>
            Address
            <input value={contact.groupAddress} onChange={(event) => patch("groupAddress", event.target.value)} />
          </label>
          <label>
            Inbox for new enquiries
            <input value={contact.notifyEmail} onChange={(event) => patch("notifyEmail", event.target.value)} placeholder="Leave blank to use the group email" />
          </label>

          <h2>Unity Integrated Solutions</h2>
          <p>Leave a field blank to keep using the group contact for that line.</p>
          <div className="studio__fields">
            <label>
              Email
              <input value={contact.unityEmail} onChange={(event) => patch("unityEmail", event.target.value)} />
            </label>
            <label>
              Phone
              <input value={contact.unityPhone} onChange={(event) => patch("unityPhone", event.target.value)} />
            </label>
            <label>
              WhatsApp
              <input value={contact.unityWhatsapp} onChange={(event) => patch("unityWhatsapp", event.target.value)} />
            </label>
          </div>
          <label>
            Address
            <input value={contact.unityAddress} onChange={(event) => patch("unityAddress", event.target.value)} />
          </label>
          <div className="studio__fields">
            <label>
              Hours
              <input value={contact.unityHours} onChange={(event) => patch("unityHours", event.target.value)} placeholder="Uses group hours if blank" />
            </label>
            <label>
              Inbox for Unity enquiries
              <input value={contact.unityNotify} onChange={(event) => patch("unityNotify", event.target.value)} placeholder="Uses the group inbox if blank" />
            </label>
          </div>

          <h2>eveDev Ops</h2>
          <p>Same rule. Fill these in when that division has its own line.</p>
          <div className="studio__fields">
            <label>
              Email
              <input value={contact.edevopsEmail} onChange={(event) => patch("edevopsEmail", event.target.value)} />
            </label>
            <label>
              Phone
              <input value={contact.edevopsPhone} onChange={(event) => patch("edevopsPhone", event.target.value)} />
            </label>
            <label>
              WhatsApp
              <input value={contact.edevopsWhatsapp} onChange={(event) => patch("edevopsWhatsapp", event.target.value)} />
            </label>
          </div>
          <label>
            Address
            <input value={contact.edevopsAddress} onChange={(event) => patch("edevopsAddress", event.target.value)} />
          </label>
          <div className="studio__fields">
            <label>
              Hours
              <input value={contact.edevopsHours} onChange={(event) => patch("edevopsHours", event.target.value)} placeholder="Uses group hours if blank" />
            </label>
            <label>
              Inbox for eveDev enquiries
              <input value={contact.edevopsNotify} onChange={(event) => patch("edevopsNotify", event.target.value)} placeholder="Uses the group inbox if blank" />
            </label>
          </div>
          <button type="submit" disabled={busy}>Save contact</button>
        </form>

        <form className="studio__panel" onSubmit={saveMail}>
          <h2>Email</h2>
          <p>Connect the mailbox that should send enquiry notices. Leave the password blank to keep the one already saved.</p>
          <div className="studio__fields">
            <label>
              Server
              <input value={smtp.host} onChange={(event) => setSmtp({ ...smtp, host: event.target.value })} placeholder="smtp.example.com" />
            </label>
            <label>
              Port
              <input type="number" value={smtp.port} onChange={(event) => setSmtp({ ...smtp, port: Number(event.target.value) })} />
            </label>
            <label>
              Username
              <input value={smtp.user} onChange={(event) => setSmtp({ ...smtp, user: event.target.value })} autoComplete="off" />
            </label>
            <label>
              Password
              <input type="password" value={smtp.password} onChange={(event) => setSmtp({ ...smtp, password: event.target.value })} autoComplete="new-password" placeholder={smtp.hasPassword ? "Saved" : ""} />
            </label>
          </div>
          <label>
            From address
            <input value={smtp.from} onChange={(event) => setSmtp({ ...smtp, from: event.target.value })} placeholder="eveOps Group <support@eveopsgroup.com>" />
          </label>
          <label className="studio__check">
            <input type="checkbox" checked={smtp.secure} onChange={(event) => setSmtp({ ...smtp, secure: event.target.checked })} />
            SSL on connect (usually port 465)
          </label>
          <label className="studio__check">
            <input type="checkbox" checked={smtp.enabled} onChange={(event) => setSmtp({ ...smtp, enabled: event.target.checked })} />
            Send an email when a new enquiry arrives
          </label>
          <div className="studio__actions">
            <button type="submit" disabled={busy}>Save email</button>
            <button type="button" disabled={busy} onClick={() => void testMail()}>Send a test</button>
          </div>
        </form>
      </div>
    </StudioGate>
  );
}
