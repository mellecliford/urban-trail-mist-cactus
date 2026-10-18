import { useEffect, useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { getAdminSession, loginAdmin, logoutAdmin } from "@/lib/admin.functions";

export function StudioGate({ title, children }: { title: string; children: React.ReactNode }) {
  const [user, setUser] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    let live = true;
    getAdminSession()
      .then((session) => {
        if (live) setUser(session?.username ?? null);
      })
      .catch(() => {
        if (live) setUser(null);
      });
    return () => {
      live = false;
    };
  }, []);

  if (user === undefined) {
    return (
      <main className="studio">
        <p className="studio__wait">Opening the studio…</p>
      </main>
    );
  }
  if (!user) return <AdminLogin onSuccess={setUser} />;
  return (
    <main className="studio">
      <header className="studio__bar">
        <div>
          <p>eveOps studio</p>
          <h1>{title}</h1>
        </div>
        <nav className="studio__nav">
          <Link to="/admin">Products</Link>
          <Link to="/admin/customers">Customers</Link>
          <Link to="/admin/desk">Journal</Link>
          <Link to="/admin/settings">Settings</Link>
          <Link to="/products">View the site</Link>
          <button
            type="button"
            onClick={() => {
              void logoutAdmin().then(() => setUser(null));
            }}
          >
            Sign out
          </button>
        </nav>
      </header>
      {children}
    </main>
  );
}

function AdminLogin({ onSuccess }: { onSuccess: (username: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [screen, setScreen] = useState(false);
  const router = useRouter();

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setScreen(true);
    setError("");
    const started = Date.now();
    const result = await loginAdmin({ data: { username, password } });
    const remain = 900 - (Date.now() - started);
    if (remain > 0) await new Promise((resolve) => window.setTimeout(resolve, remain));
    if (!result.ok) {
      setScreen(false);
      setError(result.error);
      return;
    }
    onSuccess(result.username);
    void router.invalidate();
  }

  if (screen) {
    return (
      <main className="studio-lock" role="status" aria-live="polite">
        <p>eveOps studio</p>
        <h1>Opening the studio</h1>
        <span className="studio-lock__bar" />
      </main>
    );
  }

  return (
    <main className="studio">
      <form className="studio__panel studio__login" onSubmit={onSubmit}>
        <p>eveOps studio</p>
        <h1>Sign in</h1>
        <label>
          Username
          <input value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required />
        </label>
        {error ? <p className="studio__notice">{error}</p> : null}
        <button type="submit">Sign in</button>
      </form>
    </main>
  );
}
