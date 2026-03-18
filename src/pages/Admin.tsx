import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, LogOut, Save, ExternalLink, Settings } from "lucide-react";

const API = "/api";

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem("admin_token"));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [config, setConfig] = useState<{ enabled: boolean; redirectUrl: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [editUrl, setEditUrl] = useState("");

  const fetchConfig = async () => {
    try {
      const r = await fetch(API + "/config");
      if (r.ok) {
        const d = await r.json();
        setConfig(d);
        setEditUrl(d.redirectUrl);
      }
    } catch (e) {
      const fallbackRedirect =
        "https://elementor.com/pages/plugin-special/?cxd=204253_1849629&utm_source=elementor&utm_medium=affiliate&utm_campaign=204253&utm_content=cx&affid=204253";
      setConfig({ enabled: true, redirectUrl: fallbackRedirect });
      setEditUrl(fallbackRedirect);
    }
  };

  useEffect(() => {
    if (token) fetchConfig();
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const r = await fetch(API + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const d = await r.json();
      if (r.ok && d.token) {
        localStorage.setItem("admin_token", d.token);
        setToken(d.token);
        setUsername("");
        setPassword("");
        fetchConfig();
      } else {
        setLoginError("Invalid username or password");
      }
    } catch (err) {
      setLoginError("Cannot connect to server. Is the API running?");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
    setConfig(null);
  };

  const handleSave = async () => {
    if (!token || !config) return;
    setSaving(true);
    setMessage("");
    try {
      const r = await fetch(API + "/config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          enabled: config.enabled,
          redirectUrl: editUrl.trim(),
        }),
      });
      if (r.ok) {
        const d = await r.json();
        setConfig(d);
        setEditUrl(d.redirectUrl);
        setMessage("Saved successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Failed to save. Session may have expired.");
      }
    } catch (err) {
      setMessage("Error saving. Is the API running?");
    }
    setSaving(false);
  };

  const toggleEnabled = () => {
    if (config) setConfig({ ...config, enabled: !config.enabled });
  };

  if (!token) {
    return (
      <div className="max-w-md mx-auto py-16">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Settings className="w-6 h-6" /> Admin Login
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>
            {loginError && <p className="text-red-600 text-sm">{loginError}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Log in
            </button>
          </form>
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 text-sm mt-6 hover:text-indigo-600">
            <ArrowLeft className="w-4 h-4" /> Back to site
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700">
          <ArrowLeft className="w-4 h-4" /> Back to site
        </Link>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Redirect Control</h1>

        {config && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Redirect status</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleEnabled}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    config.enabled ? "bg-indigo-600" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow transition-all ${
                      config.enabled ? "left-7" : "left-1"
                    }`}
                  />
                </button>
                <span className="font-medium text-slate-700">
                  {config.enabled ? "Redirect ON" : "Redirect OFF"}
                </span>
                <span className="text-sm text-slate-500">
                  {config.enabled
                    ? "(Ad traffic will be redirected)"
                    : "(No redirect for any visitor)"}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Redirect URL (affiliate link)</label>
              <input
                type="url"
                value={editUrl}
                onChange={(e) => setEditUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <p className="text-xs text-slate-500 mt-1">
                Visitors from ads (Google, Facebook, Bing, TikTok) will be redirected to this URL
              </p>
            </div>

            {message && (
              <p className={`text-sm ${message.includes("success") ? "text-emerald-600" : "text-amber-600"}`}>
                {message}
              </p>
            )}

            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-colors"
            >
              <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        )}

        {!config && (
          <p className="text-slate-500">Loading...</p>
        )}
      </div>

      <p className="text-xs text-slate-400 mt-6 text-center">
        On Vercel: add Vercel Blob storage to save changes. Or set REDIRECT_ENABLED, REDIRECT_URL in Environment Variables.
      </p>
    </div>
  );
}
