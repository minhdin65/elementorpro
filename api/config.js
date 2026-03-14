const CONFIG_PATH = "redirect-config.json";
const DEFAULT_CONFIG = { enabled: true, redirectUrl: "https://href.li/?https://be.elementor.com/visit/?bta=204253&nci=5758" };

async function getConfig() {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { get } = await import("@vercel/blob");
      const result = await get(CONFIG_PATH, { access: "private" });
      if (result?.statusCode === 200) {
        const text = await new Response(result.stream).text();
        return JSON.parse(text);
      }
    } catch (e) {}
  }
  return {
    enabled: process.env.REDIRECT_ENABLED !== "false",
    redirectUrl: process.env.REDIRECT_URL || DEFAULT_CONFIG.redirectUrl,
  };
}

async function saveConfig(cfg) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("Add Vercel Blob storage in Project Settings to enable saving. Or set REDIRECT_ENABLED, REDIRECT_URL in Environment Variables.");
  }
  const { put } = await import("@vercel/blob");
  await put(CONFIG_PATH, JSON.stringify(cfg), { access: "private", allowOverwrite: true });
  return cfg;
}

function auth(req) {
  const auth = req.headers.authorization;
  const token = auth?.replace("Bearer ", "");
  const cookie = req.headers.cookie?.match(/admin_token=([^;]+)/)?.[1];
  const t = token || cookie;
  if (!t) return false;
  const secret = process.env.ADMIN_SECRET || "change-me";
  return t.startsWith(secret + "-");
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.json(await getConfig());
  }
  if (req.method === "POST") {
    if (!auth(req)) return res.status(401).json({ error: "Unauthorized" });
    const cfg = await getConfig();
    if (typeof req.body?.enabled === "boolean") cfg.enabled = req.body.enabled;
    if (typeof req.body?.redirectUrl === "string" && req.body.redirectUrl.trim())
      cfg.redirectUrl = req.body.redirectUrl.trim();
    try {
      await saveConfig(cfg);
      return res.json(cfg);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
  res.status(405).end();
}
